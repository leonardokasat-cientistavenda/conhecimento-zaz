---
id: BKL-034
nome: Spec bpmn_ms_agente
versao: "1.0"
tipo: Spec
vertente: M3.P
status: Draft
sprint_ref: S026
template_ref: _catalogo/templates/M3_P_BPMN.md
artefatos_produzidos:
  - "bpmn_ms_agente.bpmn"
  - "test/bpmn/ms_agente.feature"
---

# M3.P.01 - Spec bpmn_ms_agente

## 1. Processo

```
┌─────────────────────────────────────────────────────────────────┐
│                      bpmn_ms_agente                              │
│                      Agent Loop Genérico                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Start]                                                         │
│     │ vars: agente_id, user_id, user_login, channel_id, input    │
│     ▼                                                            │
│  [Montar Contexto]                                               │
│     │ topic: agente-contexto                                     │
│     ▼                                                            │
│  [Chamar LLM]  <────────────────────────────────────────┐    │
│     │ topic: workerAnthropic                              │    │
│     ▼                                                     │    │
│  <stopReason?>                                            │    │
│     │                                                     │    │
│     ├── "end_turn" ──► [Responder MM] ─► [Persistir] ─► [End] │    │
│     │                   topic:            topic:          │    │
│     │                   sendMessage       agente-persistir│    │
│     │                                                     │    │
│     └── "tool_use" ──► [Executar Tool] ──────────────────┘    │
│                         topic: agente-tool                       │
│                         (github, mongodb, etc)                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Definições

### 2.1 Lanes

```yaml
lanes:
  - id: "lane_sistema"
    nome: "Sistema"
    responsavel: "sistema"
```

### 2.2 Tasks

```yaml
tasks:
  - id: "task_contexto"
    nome: "Montar Contexto"
    tipo: "service"
    lane_ref: "lane_sistema"
    worker_topic: "agente-contexto"
    error_handling:
      retry: {attempts: 3, backoff: "PT1M"}
      fallback: "boundary_error_contexto"
      alerta: "Falha ao montar contexto do agente"

  - id: "task_llm"
    nome: "Chamar LLM"
    tipo: "service"
    lane_ref: "lane_sistema"
    worker_topic: "workerAnthropic"
    error_handling:
      retry: {attempts: 3, backoff: "PT30S"}
      fallback: "boundary_error_llm"
      alerta: "Falha na chamada Anthropic após 3 tentativas"

  - id: "task_tool"
    nome: "Executar Tool"
    tipo: "service"
    lane_ref: "lane_sistema"
    worker_topic: "agente-tool"
    error_handling:
      retry: {attempts: 2, backoff: "PT10S"}
      fallback: "continue_sem_tool"  # Retorna erro como tool_result
      alerta: "Falha ao executar tool"

  - id: "task_responder"
    nome: "Responder Mattermost"
    tipo: "service"
    lane_ref: "lane_sistema"
    worker_topic: "sendMessage"
    error_handling:
      retry: {attempts: 5, backoff: "PT5S"}
      alerta: "Falha ao enviar mensagem para Mattermost"

  - id: "task_persistir"
    nome: "Persistir Execução"
    tipo: "service"
    lane_ref: "lane_sistema"
    worker_topic: "agente-persistir"
    error_handling:
      retry: {attempts: 3, backoff: "PT5S"}
      alerta: "Falha ao persistir execução (não crítico)"
```

### 2.3 Gateways

```yaml
gateways:
  - id: "gw_stop_reason"
    nome: "Verificar Stop Reason"
    tipo: "exclusive"
    condicoes:
      - branch: "end_turn"
        expressao: "stopReason == 'end_turn'"
        destino: "task_responder"
      - branch: "tool_use"
        expressao: "stopReason == 'tool_use'"
        destino: "task_tool"
```

### 2.4 Events

```yaml
events:
  - id: "start"
    nome: "Mensagem Recebida"
    tipo: "start"
    subtipo: "none"
  
  - id: "end_success"
    nome: "Resposta Enviada"
    tipo: "end"
    subtipo: "none"
  
  - id: "boundary_error_contexto"
    nome: "Erro Contexto"
    tipo: "intermediate"
    subtipo: "error"
    attached_to: "task_contexto"
  
  - id: "boundary_error_llm"
    nome: "Erro LLM"
    tipo: "intermediate"
    subtipo: "error"
    attached_to: "task_llm"
```

## 3. Variáveis

### 3.1 Entrada

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|-------------|----------|
| agente_id | string | ✅ | ID do agente (genesis, zarah) |
| user_id | string | ✅ | ID do usuário Mattermost |
| user_login | string | ✅ | Login do usuário |
| channel_id | string | ✅ | Canal Mattermost |
| input | string | ✅ | Mensagem do usuário |

### 3.2 Internas (durante execução)

| Variável | Tipo | Origem | Descrição |
|----------|------|--------|----------|
| messages | string (JSON) | task_contexto | Array de mensagens para API |
| modelo | string | task_contexto | Modelo a usar |
| tools | string (JSON) | task_contexto | Tools disponíveis |
| system_prompt | string | task_contexto | System prompt carregado |
| resposta | string | task_llm | Texto da resposta |
| toolCalls | string (JSON) | task_llm | Tools chamadas pelo LLM |
| stopReason | string | task_llm | end_turn ou tool_use |
| tokens_input | int | task_llm | Tokens de entrada |
| tokens_output | int | task_llm | Tokens de saída |
| latencia_ms | int | task_llm | Latência da chamada |
| tool_results | string (JSON) | task_tool | Resultados das tools |

### 3.3 Saída

| Variável | Tipo | Descrição |
|----------|------|----------|
| execucao_id | string | ObjectId da execução persistida |

## 4. Schema TDD

### 4.1 Classes de Equivalência

| Gateway | Partição | Valores Exemplo | Válida |
|---------|----------|-----------------|--------|
| gw_stop_reason | end_turn | {stopReason: "end_turn"} | ✅ |
| gw_stop_reason | tool_use | {stopReason: "tool_use", toolCalls: [...]} | ✅ |

### 4.2 Paths

```
PATH01 (Happy Path - Resposta Direta):
  Start → Contexto → LLM → [end_turn] → Responder → Persistir → End

PATH02 (Tool Use - Uma Tool):
  Start → Contexto → LLM → [tool_use] → Tool → LLM → [end_turn] → Responder → Persistir → End

PATH03 (Tool Use - Múltiplas Tools):
  Start → Contexto → LLM → [tool_use] → Tool → LLM → [tool_use] → Tool → LLM → [end_turn] → Responder → Persistir → End

PATH04 (Erro no Contexto):
  Start → Contexto → [ERRO] → Boundary Error → End_Error

PATH05 (Erro no LLM):
  Start → Contexto → LLM → [ERRO] → Boundary Error → End_Error
```

### 4.3 Critérios de Aceite

| ID | Path | Given | When | Then |
|----|------|-------|------|------|
| CA01 | PATH01 | agente_id=genesis, input="oi" | processo inicia | LLM responde direto, mensagem enviada, execução persistida |
| CA02 | PATH02 | agente_id=genesis, input="status sprint" | processo inicia | LLM chama github:get_file_contents, recebe resultado, responde, persiste |
| CA03 | PATH03 | agente_id=genesis, input="criar arquivo e salvar" | processo inicia | LLM chama múltiplas tools em sequência, responde ao final |
| CA04 | PATH04 | agente_id=inexistente | processo inicia | Erro "agente não encontrado", processo termina com erro |
| CA05 | PATH05 | API Anthropic fora do ar | processo inicia | Retry 3x, após falhar boundary error dispara |
| CA06 | LOOP | input que gera 5 tool calls | processo inicia | Loop executa 5x, responde ao final |

### 4.4 Cobertura

- **Estratégia:** manual (paths críticos)
- **Combinações estimadas:** 6

## 5. Migration Plan

```yaml
migration_plan: null  # Primeira versão, não há versão anterior
```

## 6. Error Handling Consolidado

| Task | Retry | Backoff | Fallback | Alerta |
|------|-------|---------|----------|--------|
| agente-contexto | 3 | PT1M | boundary_error | Falha ao montar contexto |
| workerAnthropic | 3 | PT30S | boundary_error | Falha API Anthropic |
| agente-tool | 2 | PT10S | erro como tool_result | Falha ao executar tool |
| sendMessage | 5 | PT5S | - | Falha envio Mattermost |
| agente-persistir | 3 | PT5S | - | Falha persistência (não crítico) |

## 7. Checklist

| ID | Verificação | Status |
|----|-------------|--------|
| CK01 | Todas tasks têm tipo definido | ✅ |
| CK02 | Todas tasks têm lane_ref válido | ✅ |
| CK03 | Todas tasks têm error_handling | ✅ |
| CK04 | Gateway exclusivo com condições exclusivas | ✅ |
| CK05 | Gateway tem ≥2 saídas | ✅ |
| CK06 | Existe 1 start event | ✅ |
| CK07 | Existe ≥1 end event | ✅ |
| CK08 | Todos paths têm critério de aceite | ✅ |
| CK09 | Variáveis de entrada documentadas | ✅ |
| CK10 | Variáveis de saída documentadas | ✅ |
| CK11 | Cobertura definida | ✅ |
| CK12 | combinacoes_estimadas calculado | ✅ |
| CK13 | migration_plan (N/A - v1) | ✅ |
| CK14 | Retry configurado | ✅ |

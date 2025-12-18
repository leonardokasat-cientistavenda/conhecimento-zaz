---
nome: S026_M2_MS_Agente
versao: "1.0"
tipo: Objeto
classe_ref: MS_Agente
origem: interno
status: Draft
etapa: M2
sprint_ref: S026
camada: C2
---

# S026 - M2 Objeto: MS_Agente

> **Sprint:** S026  
> **Etapa:** M2 (Objeto)  
> **Status:** Validado  
> **Próximo:** M3.* (Especificações)

---

## 1. Contexto de Recuperação

### 1.1 Problema Original (M0)

GENESIS roda em Claude Desktop + MCP (LLM Mode), excelente para prototipar mas não escala. Necessita migração para infraestrutura ZAZ (Mattermost + Camunda).

### 1.2 Quadro Teórico (M1) - Validado

**Fontes internas analisadas (repos ZAZ-vendas):**
- `Orquestrador-Zarah/config/camunda/index.js` - startProcessCamundaV2, sendSignalCamundaV2
- `Orquestrador-Zarah/controller/mattermostController.js` - webhook → Camunda
- `Orquestrador-Zarah/database/index.js` - database layer MongoDB
- `Orquestrador-Zarah/utils/validations.js` - getListaVariaveis, setarVariaveisCamunda
- `Orquestrador-Zarah/worker/llama/index.js` - padrão worker LLM
- `Orquestrador-Zarah/worker/sistemas/mattermost/index.js` - sendMessage

**Padrão Worker descoberto:**
```javascript
module.exports = {
  nomeDoWorker: async ({ task, taskService }) => {
    const { var1, var2 } = getListaVariaveis({ var1: "", var2: "" }, task);
    const response = await algumaAPI(...);
    await taskService.complete(task, setarVariaveisCamunda({ resultado }));
  }
}
```

**Decisão tomada:** Outgoing Webhook para MVP (só canais públicos). DM/privado no backlog BKL-027.

---

## 2. Definição do Objeto

**MS_Agente** é o Meta System que implementa Agent Loop genérico, reutilizável por múltiplos bots.

```
┌─────────────────────────────────────────────────────────────────┐
│                    MS_Agente (genérico)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Entrada: { agente_id, user_id, user_login, channel_id, input } │
│                                                                 │
│  Loop:                                                          │
│    [Montar Contexto] → [Chamar LLM] → <tool_use?> → [Executar]  │
│                                                                 │
│  Saída: resposta + persistência em agente.execucoes             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
          │
          │ consome
          ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   GENESIS    │  │   Zarah v2   │  │  Futuro Bot  │
│  agente_id:  │  │  agente_id:  │  │  agente_id:  │
│  "genesis"   │  │  "zarah"     │  │  "xxx"       │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 3. Fronteiras

### 3.1 O que É

| Aspecto | Descrição |
|---------|----------|
| Meta System | Módulo reutilizável para Agent Loop |
| Entry Point | Outgoing Webhook Mattermost (MVP) |
| Orquestrador | Camunda BPMN |
| Workers | Node.js seguindo padrão ZAZ |
| Persistência | MongoDB (agente.execucoes) + GitHub |

### 3.2 O que NÃO É

| Aspecto | Descrição |
|---------|----------|
| Bot específico | É genérico, GENESIS consome |
| DM/Privado | Só canais públicos no MVP (BKL-027) |
| Multi-modelo | Modelo fixo no MVP (BKL-028) |
| Prompt caching | Otimização futura (BKL-029) |

---

## 4. Componentes a Especificar

### 4.1 Vertente M3.E (POO) - Workers

| ID | Componente | Topic Camunda | Descrição |
|----|------------|---------------|----------|
| M3.E.01 | workerAnthropic | workerAnthropic | Chama API Anthropic |
| M3.E.02 | agente-contexto | agente-contexto | Monta payload LLM |
| M3.E.03 | agente-persistir | agente-persistir | Salva execução |
| M3.E.04 | agente-github | agente-github | Operações GitHub |

### 4.2 Vertente M3.P (BPMN) - Processo

| ID | Componente | Descrição |
|----|------------|-----------|
| M3.P.01 | bpmn_ms_agente | Workflow Agent Loop |

### 4.3 Vertente M3.D (DMN) - Decisão

| ID | Componente | Descrição |
|----|------------|-----------|
| M3.D.01 | dmn_entrada_genesis | Linha no DMN existente |

### 4.4 Vertente M3.C (Config) - Schema

| ID | Componente | Descrição |
|----|------------|-----------|
| M3.C.01 | schema_execucoes | Schema agente.execucoes |

---

## 5. Schemas Definidos

### 5.1 agente.execucoes

```javascript
{
  _id: ObjectId,
  agente_id: "genesis",              // Qual bot/agente
  channel_id: "abc123",              // Canal MM
  user_id: "mm_user_id_xxx",         // ID do usuário Mattermost
  user_login: "leonardo",            // Login MM (vem do webhook)
  input: "status do sprint",
  output: "Sprint S026 está em 67%...",
  tokens_input: 1523,
  tokens_output: 847,
  tokens_total: 2370,
  custo_usd: 0.0355,
  modelo: "claude-sonnet-4-20250514",
  latencia_ms: 2340,
  tool_calls: ["github:get_file_contents", "mongodb:find"],
  created_at: ISODate("2025-12-17T20:15:00Z")
}
```

### 5.2 genesis.agentes (config)

```javascript
{
  agente_id: "genesis",
  nome: "GENESIS",
  descricao: "Assistente de gestão de conhecimento",
  system_prompt_ref: "genesis/GENESIS.md",
  modelo: "claude-sonnet-4-20250514",
  tools: [
    { name: "github:get_file_contents", ... },
    { name: "github:push_files", ... },
    { name: "mongodb:find", ... },
    { name: "mongodb:aggregate", ... },
    { name: "mongodb:insert-many", ... },
  ],
  limites: {
    contexto_maximo: 150000,
    tokens_diarios_usuario: 500000,
  },
  created_at: ISODate(),
  updated_at: ISODate(),
}
```

---

## 6. Fluxo BPMN Proposto

```
[Start]
   │ vars: agente_id, user_id, user_login, channel_id, input
   ▼
[Montar Contexto]
   │ topic: agente-contexto
   │ busca: system prompt (GitHub), histórico (MongoDB), config agente
   ▼
[Chamar LLM]
   │ topic: workerAnthropic
   │ input: messages, modelo, tools
   │ output: resposta, toolCalls, stopReason, tokens, latencia
   ▼
<Gateway: stopReason?>
   │
   ├── "end_turn" ──► [Responder MM] ──► [Persistir] ──► [End]
   │                   topic: sendMessage   topic: agente-persistir
   │
   └── "tool_use" ──► [Executar Tool] ─────────────────┐
                       topic: agente-tool              │
                       │                               │
                       └───────────────────────────────┘
                                    (loop para Montar Contexto)
```

---

## 7. Dependências e Bloqueios

### 7.1 Templates Disponíveis

| Template | Vertente | Status |
|----------|----------|--------|
| `_catalogo/templates/M3_E_POO.md` | M3.E | ✅ Disponível |
| `_catalogo/templates/M3_P_BPMN.md` | M3.P | ✅ Disponível |
| `M3_D_DMN.md` | M3.D | ❌ Não existe |
| `M3_C_Config.md` | M3.C | ❌ Não existe |

### 7.2 Plano de Resolução

1. Especificar M3.E.* e M3.P.* (templates existem)
2. Criar templates M3.D e M3.C via ciclo epistemológico
3. Especificar M3.D.01 e M3.C.01 após templates criados

---

## 8. Backlog Relacionado

| ID | Título | Tipo | Status |
|----|--------|------|--------|
| BKL-027 | Bot + WebSocket para DM/privado | Melhoria | Backlog |
| BKL-028 | Multi-modelo dinâmico | Melhoria | Backlog |
| BKL-029 | Prompt Caching | Melhoria | Backlog |

---

## 9. Referências

### 9.1 Internas

| Documento | Relação |
|-----------|---------|
| genesis/specs/S026_Agent_Runtime_Spec.md | Spec consolidada |
| genesis/specs/BKL027_Bot_WebSocket.md | DM/privado |
| genesis/specs/BKL028_Multi_Modelo.md | Multi-modelo |
| docs/00_E/00_E_Epistemologia.md | Framework base |
| _catalogo/templates/M3_E_POO.md | Template POO |
| _catalogo/templates/M3_P_BPMN.md | Template BPMN |

### 9.2 Repos ZAZ-vendas

| Arquivo | Conteúdo |
|---------|----------|
| Orquestrador-Zarah/config/camunda/index.js | startProcessCamundaV2 |
| Orquestrador-Zarah/controller/mattermostController.js | Webhook handler |
| Orquestrador-Zarah/database/index.js | Database layer |
| Orquestrador-Zarah/utils/validations.js | Helpers |
| Orquestrador-Zarah/worker/llama/index.js | Padrão worker |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-17 | M2 validado. Fronteiras definidas. Componentes identificados. Sprint S026. |

---
nome: MS_Agente
versao: "1.0"
tipo: Especificação
classe_ref: MetaSystem
origem: interno
status: Publicado
etapa: M4
sprint_ref: S026
camada: C2
data_publicacao: 2025-12-17
---

# MS_Agente v1.0 - Agent Runtime

## 1. Sumário Executivo

**MS_Agente** é um Meta System genérico que implementa Agent Loop para bots conversacionais, permitindo:
- Múltiplos agentes (GENESIS, Zarah, futuros) reutilizarem a mesma infraestrutura
- Integração com Mattermost via Outgoing Webhook
- Orquestração via Camunda BPMN
- Persistência de execuções em MongoDB
- Chamadas a LLM via API Anthropic

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        MS_Agente v1.0                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Mattermost      Camunda           Workers          MongoDB      │
│  ┌────────┐     ┌───────────┐     ┌──────────┐     ┌────────┐   │
│  │Outgoing│────►│  DMN     │────►│ Anthropic│     │execucoes│   │
│  │Webhook │     │  BPMN    │     │ Contexto │────►│agentes │   │
│  └────────┘     │  Agent   │     │ Persistir│     └────────┘   │
│       ▲         │  Loop    │     │ GitHub   │                     │
│       │         └───────────┘     └──────────┘                     │
│       │              │              │                             │
│       └──────────────┴──────────────┘                             │
│              sendMessage                                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Componentes

### 3.1 Workers (M3.E)

| Worker | Topic | Arquivo | Descrição |
|--------|-------|---------|----------|
| workerAnthropic | workerAnthropic | worker/anthropic/index.js | Chama API Anthropic |
| agente-contexto | agente-contexto | worker/agente/contexto.js | Monta payload LLM |
| agente-persistir | agente-persistir | worker/agente/persistir.js | Salva execução |
| agente-github | agente-github-* | worker/agente/github.js | Operações GitHub |

### 3.2 BPMN (M3.P)

| Processo | Arquivo | Descrição |
|----------|---------|----------|
| bpmn_ms_agente | bpmn_ms_agente.bpmn | Agent Loop genérico |

### 3.3 DMN (M3.D)

| Decisão | Alteração |
|---------|----------|
| dmn_processo_iniciar_orquestrador | +1 linha: genesis → bpmn_ms_agente |

### 3.4 Schema (M3.C)

| Collection | Database | Descrição |
|------------|----------|----------|
| execucoes | agente | Histórico de execuções |
| agentes | genesis | Config dos agentes |

---

## 4. Fluxo BPMN

```
[Start]
   │ vars: agente_id, user_id, user_login, channel_id, input
   ▼
[Montar Contexto] topic: agente-contexto
   │ busca config, system prompt, histórico
   ▼
[Chamar LLM] topic: workerAnthropic  <─────────────────────┐
   │                                                     │
   ▼                                                     │
<stopReason?>                                            │
   │                                                     │
   ├── end_turn ─► [Responder MM] ─► [Persistir] ─► [End] │
   │                                                     │
   └── tool_use ─► [Executar Tool] ─────────────────────┘
```

---

## 5. Schemas

### 5.1 agente.execucoes

```javascript
{
  _id: ObjectId,
  agente_id: "genesis" | "zarah",
  user_id: string,
  user_login: string,
  channel_id: string,
  input: string,
  output: string,
  modelo: string,
  tokens_input: int,
  tokens_output: int,
  tokens_total: int,
  custo_usd: float,
  latencia_ms: int,
  tool_calls: string[],
  created_at: Date
}
```

### 5.2 genesis.agentes

```javascript
{
  agente_id: "genesis",
  nome: "GENESIS",
  system_prompt_ref: "genesis/GENESIS.md",
  modelo: "claude-sonnet-4-20250514",
  tools: [...],
  limites: {
    contexto_maximo: 150000,
    tokens_diarios_usuario: 500000
  }
}
```

---

## 6. Specs por Vertente

### 6.1 M3.E - Workers

| Spec | Arquivo | Status |
|------|---------|--------|
| workerAnthropic | _drafts/S026_M3E_workerAnthropic.md | ✅ |
| agente-contexto | _drafts/S026_M3E_agenteContexto.md | ✅ |
| agente-persistir | _drafts/S026_M3E_agentePersistir.md | ✅ |
| agente-github | _drafts/S026_M3E_agenteGithub.md | ✅ |

### 6.2 M3.P - BPMN

| Spec | Arquivo | Status |
|------|---------|--------|
| bpmn_ms_agente | _drafts/S026_M3P_bpmn_ms_agente.md | ✅ |

### 6.3 M3.D - DMN

| Spec | Arquivo | Status |
|------|---------|--------|
| dmn_entrada_genesis | _drafts/S026_M3D_dmn_entrada_genesis.md | ✅ |

### 6.4 M3.C - Schema

| Spec | Arquivo | Status |
|------|---------|--------|
| schema_execucoes | _drafts/S026_M3C_schema_execucoes.md | ✅ |

---

## 7. Dependências

### 7.1 NPM

```json
{
  "@anthropic-ai/sdk": "latest",
  "@octokit/rest": "latest"
}
```

### 7.2 Environment Variables

```bash
ANTHROPIC_API_KEY=sk-ant-...
GITHUB_TOKEN=ghp_...
MATTERMOST_TOKEN_GENESIS=...
```

---

## 8. Backlog Relacionado

| ID | Título | Status |
|----|--------|--------|
| BKL-027 | Bot + WebSocket (DM/privado) | Backlog |
| BKL-028 | Multi-modelo dinâmico | Backlog |
| BKL-029 | Prompt Caching | Backlog |

---

## 9. Próximos Passos

1. **Sprint S027 (PROMETHEUS):** Desenvolver artefatos a partir das specs
2. **Deploy:** Configurar ambiente, criar collections, registrar workers
3. **Teste:** Validar fluxo end-to-end
4. **Produção:** Configurar Outgoing Webhook apontando para GENESIS

---

## 10. Referências

| Documento | Relação |
|-----------|---------|
| _drafts/S026_M2_MS_Agente.md | M2 (Objeto) |
| _sprints/S026_MS_Agente.md | Sprint session |
| genesis/GENESIS.md | System prompt GENESIS |
| genesis/PROMETHEUS.md | Fábrica que desenvolverá |
| _catalogo/templates/M3_E_POO.md | Template M3.E |
| _catalogo/templates/M3_P_BPMN.md | Template M3.P |
| _catalogo/templates/M3_D_DMN.md | Template M3.D |
| _catalogo/templates/M3_C_Config.md | Template M3.C |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-17 | **Publicação M4.** Especificação completa MS_Agente. Sprint S026. |

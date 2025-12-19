---
nome: MS_Pantheon
versao: "1.0"
tipo: M4 - Documento Final (Spec)
classe_ref: MetaSystem
origem: interno
status: Aprovado
etapa: M4
sprint_ref: S029
camada: C2
data_criacao: 2025-12-19
m0_ref: _drafts/S029_M0_MS_Pantheon.md
m1_ref: _drafts/S029_M1_MS_Pantheon.md
m2_ref: _drafts/S029_M2_MS_Pantheon.md
m3_ref: _drafts/S029_M3_MS_Pantheon.md
---

# MS_Pantheon - Especificação v1.0

> **Multi-Agent Orchestration System**
> 
> Sistema de orquestração de múltiplos agentes inteligentes que coexistem no Mattermost, acessíveis de múltiplos canais, com contexto isolado por origem.

---

## 1. Resumo Executivo

### 1.1 Problema

Criar um ecossistema de agentes inteligentes que coexistem, cada um com seu propósito, acessíveis de múltiplos canais (Mattermost, WhatsApp, Home Assistant, API), mantendo contexto separado por origem mas consciência unificada.

### 1.2 Solução

**Pantheon** - uma arquitetura multi-agente onde:
- **Mattermost** é o "lar" dos agentes (onde vivem e interagem)
- **Webhook único** é o ponto de entrada para todas as fontes
- **DMN** roteia mensagens para o agente correto
- **Camunda BPMN** orquestra o Agent Loop
- **Workers** executam tarefas especializadas
- **Pino + ClickHouse** fornecem observabilidade

### 1.3 Agentes

| Agente | Propósito | Modelo Default |
|--------|-----------|----------------|
| **GENESIS** | Sistema principal, inteligência híbrida | claude-sonnet-4-20250514 |
| **PROMETHEUS** | Pipeline CI/CD, fábrica de software | claude-sonnet-4-20250514 |
| **ASCLEPIUS** | Gestão de produtos (MS_Produto) | claude-sonnet-4-20250514 |
| **ATLAS** | Gestão de backlog (MS_Backlog) | claude-haiku-3-5-20241022 |
| **KAIROS** | Gestão de sprints (MS_Sprint) | claude-haiku-3-5-20241022 |

---

## 2. Decisões Arquiteturais

| ID | Decisão | Justificativa |
|----|---------|---------------|
| **D001** | Isolamento total de Zarah | Sistema em produção, risco de derrubar |
| **D002** | Zarah como referência | Aprender patterns, não copiar código |
| **D003** | Pino + ClickHouse | Logs estruturados, análise em tempo real |

---

## 3. Arquitetura

### 3.1 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FLUXO DE ENTRADA                               │
├─────────────────────────────────────────────────────────────────────────┤
│   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐                 │
│   │WhatsApp │   │Home Asst│   │ API_LLM │   │   MM    │                 │
│   │ (Zap)   │   │  (HA)   │   │         │   │Outgoing │                 │
│   └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘                 │
│        └─────────────┴──────┬──────┴─────────────┘                       │
│                             ▼                                            │
│              ┌──────────────────────────────┐                            │
│              │  POST /api/pantheon/webhook  │                            │
│              │  + Pino Logger               │                            │
│              │  + Normalizer                │                            │
│              └──────────────┬───────────────┘                            │
│                             ▼                                            │
│              ┌──────────────────────────────┐                            │
│              │     DMN ROTEAMENTO IN        │                            │
│              └──────────────┬───────────────┘                            │
│                             ▼                                            │
│              ┌──────────────────────────────┐                            │
│              │      CAMUNDA (BPMN)          │                            │
│              │      Agent Loop              │                            │
│              └──────────────┬───────────────┘                            │
│                             ▼                                            │
│              ┌──────────────────────────────┐                            │
│              │         WORKERS              │                            │
│              │  contexto → anthropic →      │                            │
│              │  tool (loop) → send →        │                            │
│              │  persistir                   │                            │
│              └──────────────┬───────────────┘                            │
│                             ▼                                            │
│              ┌──────────────────────────────┐                            │
│              │     DMN ROTEAMENTO OUT       │                            │
│              └──────────────┬───────────────┘                            │
│                             ▼                                            │
│        ┌─────────────┬──────┴──────┬─────────────┐                       │
│        ▼             ▼             ▼             ▼                       │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐                 │
│   │WhatsApp │   │Home Asst│   │ API_LLM │   │   MM    │                 │
│   └─────────┘   └─────────┘   └─────────┘   └─────────┘                 │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Stack Tecnológica

| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Runtime | Node.js | 20 LTS |
| HTTP | Express | 4.x |
| Logger | Pino | 8.x |
| Orquestração | Camunda | 7 CE |
| Workers | camunda-external-task-client-js | 3.x |
| LLM | @anthropic-ai/sdk | latest |
| DB Transacional | MongoDB | 7.x |
| DB Analítico | ClickHouse | latest |

---

## 4. Estrutura do Projeto

```
pantheon/
├── src/
│   ├── index.js                    # Entry point
│   ├── config/
│   │   ├── logger.js               # Pino setup
│   │   └── camunda.js              # Camunda client
│   ├── controllers/
│   │   └── webhookController.js    # POST /api/pantheon/webhook
│   ├── services/
│   │   ├── camunda/                # startProcess, evaluate
│   │   ├── mattermost/             # posts, users
│   │   ├── anthropic/              # Claude API
│   │   └── clickhouse/             # Log transport
│   ├── workers/
│   │   ├── agente-contexto.js
│   │   ├── agente-anthropic.js
│   │   ├── agente-tool.js
│   │   ├── agente-persistir.js
│   │   ├── agente-sendMessage.js
│   │   └── tools/
│   │       ├── github-get.js
│   │       ├── github-push.js
│   │       └── mongodb-query.js
│   ├── middleware/
│   │   ├── requestLogger.js
│   │   ├── traceId.js
│   │   └── rateLimiter.js
│   └── utils/
│       ├── normalizer.js
│       └── validators.js
├── camunda/
│   ├── bpmn/
│   │   ├── bpmn_agent_loop.bpmn
│   │   └── bpmn_criar_agente.bpmn
│   └── dmn/
│       ├── dmn_pantheon_roteamento_in.dmn
│       └── dmn_pantheon_roteamento_out.dmn
└── scripts/
    ├── deploy-camunda.sh
    └── setup-clickhouse.sql
```

---

## 5. Interfaces Principais

### 5.1 IChannelNormalizer

```typescript
interface IChannelNormalizer {
  readonly channelId: string;
  canHandle(body: object, query: object): boolean;
  normalize(body: object, query: object): NormalizedInput;
}
```

### 5.2 IWorker

```typescript
interface IWorker {
  readonly topic: string;
  readonly config: WorkerConfig;
  handle(task: ExternalTask, taskService: TaskService): Promise<void>;
}
```

### 5.3 ITool

```typescript
interface ITool {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: JSONSchema;
  execute(input: object, context: ToolContext): Promise<ToolResult>;
}
```

---

## 6. Workers

| Worker | Topic | Responsabilidade |
|--------|-------|------------------|
| **agente-contexto** | `agente-contexto` | Busca system prompt, monta histórico |
| **agente-anthropic** | `agente-anthropic` | Chama API Claude |
| **agente-tool** | `agente-tool` | Executa tools (loop) |
| **agente-sendMessage** | `agente-sendMessage` | Envia resposta ao canal |
| **agente-persistir** | `agente-persistir` | Salva contexto e execução |

---

## 7. MongoDB Collections

### 7.1 genesis.contextos

```javascript
{
  context_id: "ctx_xxx",
  agent: "genesis",
  channel: "mm",
  channel_id: "abc",
  user_id: "user123",
  messages: [
    { role: "user", content: "...", timestamp: ISODate },
    { role: "assistant", content: "...", timestamp: ISODate }
  ],
  config: { max_history: 20 },
  created_at: ISODate,
  updated_at: ISODate
}
```

### 7.2 genesis.execucoes

```javascript
{
  execution_id: "exec_xxx",
  trace_id: "uuid",
  context_id: "ctx_xxx",
  agent: "genesis",
  channel: "mm",
  user_message: "...",
  assistant_message: "...",
  usage: { input_tokens: 150, output_tokens: 25 },
  duration_ms: 1234,
  tools_used: [],
  created_at: ISODate
}
```

---

## 8. DMN Roteamento

### 8.1 dmn_pantheon_roteamento_in

| agent | channel | command | → process | → token | → config |
|-------|---------|---------|-----------|---------|----------|
| genesis | - | criar agente | bpmn_criar_agente | ${GENESIS_TOKEN} | {} |
| genesis | - | - | bpmn_agent_loop | ${GENESIS_TOKEN} | {"model":"claude-sonnet-4-20250514"} |
| prometheus | - | - | bpmn_agent_loop | ${PROMETHEUS_TOKEN} | {"model":"claude-sonnet-4-20250514"} |
| asclepius | - | - | bpmn_agent_loop | ${ASCLEPIUS_TOKEN} | {"model":"claude-sonnet-4-20250514"} |
| atlas | - | - | bpmn_agent_loop | ${ATLAS_TOKEN} | {"model":"claude-haiku-3-5-20241022"} |
| kairos | - | - | bpmn_agent_loop | ${KAIROS_TOKEN} | {"model":"claude-haiku-3-5-20241022"} |

---

## 9. Observabilidade

### 9.1 Pino Logger

```javascript
logger.info({
  trace_id: traceId,
  agent: 'genesis',
  channel: 'mm',
  event: 'message_received'
}, 'Incoming message');
```

### 9.2 ClickHouse Schema

```sql
CREATE TABLE pantheon.logs (
    timestamp DateTime64(3),
    level LowCardinality(String),
    trace_id String,
    agent LowCardinality(String),
    channel LowCardinality(String),
    event LowCardinality(String),
    duration_ms Nullable(UInt32),
    tokens_input Nullable(UInt32),
    tokens_output Nullable(UInt32)
) ENGINE = MergeTree()
ORDER BY (timestamp, agent, trace_id);
```

---

## 10. Infraestrutura Existente

### 10.1 Agentes no Mattermost

| Agente | user_id | webhook_id |
|--------|---------|------------|
| genesis | noecbzw95bbnub84f8gs5xtiey | yigo8se5rin8pg4oarymerfacc |
| prometheus | 8o5w6p39zind8ptiqohttjtqyo | panciqbkobbejrjnqipsapr3fa |
| asclepius | 4kb997sanjbgmci79mfm6efu8e | w17884yqtbb3d8c4x3e5ghcbnh |
| atlas | pk5a91uzwtrm9fyzbu7q554q4a | 3tppxoe6qjr5bybrgwbpc51h4r |
| kairos | iapa7h6sztd8pj66598enaxb1e | rapmxw69xiyzp8y169ouswhqto |

### 10.2 Credenciais

- **Config:** `genesis/config/panteao_credenciais.json`
- **Postman:** `genesis/tools/postman_pantheon_users.json`

---

## 11. Backlog de Implementação

| ID | Fase | Título | Esforço | Status |
|----|------|--------|---------|--------|
| BKL-029 | 0 | Criação de Novos Agentes | 8h | Pendente |
| BKL-030 | 1 | Comunicação MM Básica | 4h | Bloqueado |
| BKL-031 | 2 | Roteamento DMN In/Out | 6h | Bloqueado |
| BKL-032 | 3 | Integração APIs (Camunda + LLM) | 8h | Bloqueado |
| BKL-033 | 4.1 | Agent Loop - Contexto | 6h | Bloqueado |
| BKL-034 | 4.2 | Agent Loop - Tool Execution | 8h | Bloqueado |
| BKL-035 | 4.3 | Agent Loop - Persistência | 4h | Bloqueado |
| | | **TOTAL** | **44h** | |

### 11.1 Cadeia de Dependências

```
BKL-029 (Pendente) ← PRIMEIRO
    └── BKL-030 (Bloqueado)
        └── BKL-031 (Bloqueado)
            └── BKL-032 (Bloqueado)
                └── BKL-033 (Bloqueado)
                    └── BKL-034 (Bloqueado)
                        └── BKL-035 (Bloqueado)
```

---

## 12. Extensibilidade

### 12.1 Adicionar Novo Canal

1. Criar `XxxNormalizer extends BaseChannelNormalizer`
2. Criar `XxxSender implements IMessageSender`
3. Registrar nas factories

### 12.2 Adicionar Novo Agente

1. Criar system prompt em `genesis/agents/{name}/system_prompt.md`
2. Criar usuário no Mattermost
3. Adicionar regra no DMN

### 12.3 Adicionar Nova Tool

1. Criar `XxxTool extends BaseTool`
2. Registrar no `ToolRegistry`

---

## 13. Referências

| Documento | Path |
|-----------|------|
| M0 - Dor | `_drafts/S029_M0_MS_Pantheon.md` |
| M1 - Teoria | `_drafts/S029_M1_MS_Pantheon.md` |
| M2 - Objeto | `_drafts/S029_M2_MS_Pantheon.md` |
| M3 - Classe | `_drafts/S029_M3_MS_Pantheon.md` |
| Credenciais | `genesis/config/panteao_credenciais.json` |
| Postman Tools | `genesis/tools/postman_pantheon_users.json` |
| Zarah (Ref) | `ZAZ-vendas/Orquestrador-Zarah` |

---

## 14. Aprovação

| Role | Nome | Data | Status |
|------|------|------|--------|
| Arquiteto | Leonardo | 2025-12-19 | ✅ Aprovado |
| Product Owner | Leonardo | 2025-12-19 | ✅ Aprovado |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-19 | Spec consolidada. Ciclo M0→M4 completo. Pronto para implementação via BKL-029 a BKL-035. |

---
nome: MS_Pantheon
versao: "0.1"
tipo: M1 - Referencial Teórico
classe_ref: MetaSystem
origem: interno
status: Em Análise
etapa: M1
sprint_ref: S029
camada: C2
data_criacao: 2025-12-19
m0_ref: _drafts/S029_M0_MS_Pantheon.md
---

# M1 - MS_Pantheon: Referencial Teórico

## 1. Fundamentação

### 1.1 Problema Endereçado

> Como criar um ecossistema de agentes inteligentes que coexistem, cada um com seu propósito, acessíveis de múltiplos canais, mantendo contexto separado por origem mas consciência unificada?

### 1.2 Paradigmas Aplicados

| Paradigma | Aplicação no MS_Pantheon |
|-----------|--------------------------|
| **Multi-Agent System (MAS)** | 5 agentes especializados com domínios distintos |
| **Event-Driven Architecture** | Webhooks como entrada, signals para comunicação |
| **Orchestration Pattern** | Camunda BPMN como orquestrador central |
| **Decision Tables** | DMN para roteamento dinâmico |
| **Structured Logging** | Pino + ClickHouse para observabilidade |

---

## 2. Arquitetura de Referência

### 2.1 Camadas do Sistema

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CAMADA DE APRESENTAÇÃO                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│  │   MM    │  │WhatsApp │  │Home Asst│  │   API   │  │  Slack  │      │
│  │Outgoing │  │Evolution│  │Webhook  │  │  REST   │  │ (futuro)│      │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘      │
│       └────────────┴───────────┴────────────┴────────────┘             │
│                                │                                        │
├────────────────────────────────┼────────────────────────────────────────┤
│                         CAMADA DE ENTRADA                               │
│                                ▼                                        │
│              ┌─────────────────────────────────┐                        │
│              │     EXPRESS SERVER (Node.js)    │                        │
│              │  ┌───────────────────────────┐  │                        │
│              │  │  POST /api/pantheon/webhook│  │                        │
│              │  │  + Pino Logger             │  │                        │
│              │  │  + Request Validation      │  │                        │
│              │  └───────────────────────────┘  │                        │
│              └─────────────────┬───────────────┘                        │
│                                │                                        │
├────────────────────────────────┼────────────────────────────────────────┤
│                         CAMADA DE DECISÃO                               │
│                                ▼                                        │
│              ┌─────────────────────────────────┐                        │
│              │      DMN ROTEAMENTO IN          │                        │
│              │  Input: agent, channel, command │                        │
│              │  Output: process, token, config │                        │
│              └─────────────────┬───────────────┘                        │
│                                │                                        │
├────────────────────────────────┼────────────────────────────────────────┤
│                       CAMADA DE ORQUESTRAÇÃO                            │
│                                ▼                                        │
│              ┌─────────────────────────────────┐                        │
│              │         CAMUNDA ENGINE          │                        │
│              │  ┌───────────────────────────┐  │                        │
│              │  │    BPMN Agent Loop        │  │                        │
│              │  │  - Receive Message        │  │                        │
│              │  │  - Build Context          │  │                        │
│              │  │  - Call LLM               │  │                        │
│              │  │  - Execute Tools (loop)   │  │                        │
│              │  │  - Send Response          │  │                        │
│              │  │  - Persist Execution      │  │                        │
│              │  └───────────────────────────┘  │                        │
│              └─────────────────┬───────────────┘                        │
│                                │                                        │
├────────────────────────────────┼────────────────────────────────────────┤
│                        CAMADA DE EXECUÇÃO                               │
│                                ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                        WORKERS                                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │   │
│  │  │ contexto │  │anthropic │  │   tool   │  │ persistir│        │   │
│  │  │  worker  │  │  worker  │  │  router  │  │  worker  │        │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │   │
│  │  │  github  │  │ mongodb  │  │   mm     │  │ whatsapp │        │   │
│  │  │  worker  │  │  worker  │  │  worker  │  │  worker  │        │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                        CAMADA DE PERSISTÊNCIA                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │   MongoDB    │  │   GitHub     │  │  ClickHouse  │                  │
│  │ (transações) │  │ (definições) │  │   (logs)     │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Stack Tecnológica

| Camada | Tecnologia | Versão | Propósito |
|--------|------------|--------|-----------|
| Runtime | Node.js | 20 LTS | Execução JavaScript |
| HTTP | Express | 4.x | Servidor web, rotas |
| Logger | Pino | 8.x | Logs estruturados JSON |
| Orquestração | Camunda | 7 CE | BPMN, DMN, Workers |
| Workers | camunda-external-task-client-js | 3.x | Conexão com Camunda |
| LLM | @anthropic-ai/sdk | latest | API Claude |
| DB Transacional | MongoDB | 7.x | Contexto, execuções |
| DB Analítico | ClickHouse | latest | Logs, métricas |
| Versionamento | GitHub API | v4 | System prompts, specs |

---

## 3. Padrões de Comunicação

### 3.1 Webhook Único de Entrada

**Pattern:** Single Entry Point

```
POST /api/pantheon/webhook
Content-Type: application/json

{
  "source": "mattermost",           // mm | wa | ha | api
  "agent": "genesis",               // Identificado via @mention ou explícito
  "channel_id": "xxx",              // ID do canal de origem
  "user_id": "yyy",                 // ID do usuário
  "message": "texto da mensagem",
  "files": [],                      // Anexos (URLs)
  "metadata": {
    "team_id": "...",
    "post_id": "...",
    "wa_id": "...",                  // Se WhatsApp
    "thread_id": "..."              // Se thread/reply
  }
}
```

**Resposta imediata (acknowledge):**

```json
{
  "status": "accepted",
  "trace_id": "uuid-v4",
  "process_instance_id": "camunda-id"
}
```

### 3.2 Normalização de Entrada

Cada canal tem formato diferente. O webhook normaliza para formato interno:

| Canal | Campo Original | Campo Normalizado |
|-------|----------------|-------------------|
| MM | `channel_id` | `channel_id` |
| MM | `user_id` | `user_id` |
| MM | `text` | `message` |
| MM | `trigger_word` | `agent` (extraído) |
| WA | `from` | `user_id` |
| WA | `wa_id` | `metadata.wa_id` |
| HA | `entity_id` | `channel_id` |
| API | (explícito) | (direto) |

### 3.3 Roteamento DMN

**DMN: dmn_pantheon_roteamento_in**

| agent | channel | command | → process | → token | → config |
|-------|---------|---------|-----------|---------|----------|
| genesis | * | criar agente | bpmn_criar_agente | $GENESIS_TOKEN | {} |
| genesis | * | * | bpmn_agent_loop | $GENESIS_TOKEN | {model: opus} |
| prometheus | * | * | bpmn_agent_loop | $PROMETHEUS_TOKEN | {model: sonnet} |
| asclepius | * | * | bpmn_agent_loop | $ASCLEPIUS_TOKEN | {model: sonnet} |
| atlas | * | * | bpmn_agent_loop | $ATLAS_TOKEN | {model: haiku} |
| kairos | * | * | bpmn_agent_loop | $KAIROS_TOKEN | {model: haiku} |

### 3.4 Signals Camunda

Para comunicação assíncrona entre processos:

```javascript
// Enviar signal
await camunda.signal({
  name: `sig_${channel_id}_${user_id}`,
  variables: {
    input: { value: message, type: "String" },
    inputFiles: { value: JSON.stringify(files), type: "Json" }
  }
});

// Aguardar signal (no BPMN)
// Intermediate Catch Event: sig_${channel_id}_${user_id}
```

---

## 4. Agent Loop Pattern

### 4.1 Fluxo BPMN

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        BPMN: bpmn_agent_loop                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │  Start  │───►│   Montar    │───►│  Chamar     │───►│  Tool Use?  │  │
│  │  Event  │    │  Contexto   │    │    LLM      │    │  (Gateway)  │  │
│  └─────────┘    │  (worker)   │    │  (worker)   │    └──────┬──────┘  │
│                 └─────────────┘    └─────────────┘           │         │
│                                                              │         │
│                 ┌────────────────────────────────────────────┼─────┐   │
│                 │                                            │     │   │
│                 │  SIM                                       │ NÃO │   │
│                 ▼                                            │     │   │
│        ┌─────────────┐    ┌─────────────┐                   │     │   │
│        │  Executar   │───►│  Chamar     │───────────────────┘     │   │
│        │    Tool     │    │    LLM      │                         │   │
│        │  (worker)   │    │  (worker)   │◄────────────────────────┘   │
│        └─────────────┘    └─────────────┘                             │
│                                  │                                     │
│                                  ▼                                     │
│                          ┌─────────────┐    ┌─────────────┐           │
│                          │   Enviar    │───►│  Persistir  │───►[End]  │
│                          │  Resposta   │    │  Execução   │           │
│                          │  (worker)   │    │  (worker)   │           │
│                          └─────────────┘    └─────────────┘           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Workers Especificados

#### 4.2.1 Worker: agente-contexto

**Topic:** `agente-contexto`

**Input:**
- `agent`: string - Nome do agente
- `channel`: string - Canal de origem
- `channel_id`: string - ID do canal
- `user_id`: string - ID do usuário
- `message`: string - Mensagem do usuário

**Output:**
- `system_prompt`: string - Carregado do GitHub
- `messages`: array - Histórico de mensagens
- `context_id`: string - ID do contexto (para persistência)

**Lógica:**
1. Buscar system prompt em `genesis/agents/{agent}/system_prompt.md`
2. Buscar histórico em MongoDB `genesis.contextos` filtrado por `channel_id + user_id`
3. Limitar histórico a N mensagens mais recentes
4. Montar array de mensagens no formato Anthropic

#### 4.2.2 Worker: workerAnthropic

**Topic:** `workerAnthropic`

**Input:**
- `system_prompt`: string
- `messages`: array
- `model`: string (default: claude-sonnet-4-20250514)
- `max_tokens`: number (default: 4096)
- `tools`: array (opcional)

**Output:**
- `response`: object - Resposta completa da API
- `content`: array - content blocks
- `stop_reason`: string - end_turn | tool_use
- `usage`: object - tokens consumidos

#### 4.2.3 Worker: agente-tool

**Topic:** `agente-tool`

**Input:**
- `tool_use`: object - { id, name, input }
- `agent`: string - Agente executando
- `context_id`: string - Contexto atual

**Output:**
- `tool_result`: object - { tool_use_id, content, is_error }

**Tools Disponíveis:**

| Tool | Descrição | Worker Interno |
|------|-----------|----------------|
| `github_get` | Ler arquivo do GitHub | agente-github-get |
| `github_push` | Escrever arquivo no GitHub | agente-github-push |
| `mongodb_query` | Consultar MongoDB | agente-mongodb |
| `mattermost_post` | Postar no MM | agente-mm-post |
| `web_search` | Buscar na web | agente-web-search |

#### 4.2.4 Worker: agente-persistir

**Topic:** `agente-persistir`

**Input:**
- `context_id`: string
- `agent`: string
- `channel`: string
- `channel_id`: string
- `user_id`: string
- `user_message`: string
- `assistant_message`: string
- `usage`: object
- `tools_used`: array
- `duration_ms`: number

**Output:**
- `execution_id`: string

**Persistência:**
- Atualiza `genesis.contextos` com nova mensagem
- Insere em `genesis.execucoes` registro completo
- Log estruturado para ClickHouse

#### 4.2.5 Worker: sendMessage

**Topic:** `sendMessage`

**Input:**
- `channel`: string - mm | wa | ha
- `channel_id`: string
- `message`: string
- `token`: string - Token do agente
- `attachments`: array (opcional)

**Output:**
- `post_id`: string (se MM)
- `message_id`: string (se WA)

---

## 5. Multi-Contexto

### 5.1 Schema de Contexto

```javascript
// Collection: genesis.contextos
{
  _id: ObjectId,
  context_id: "ctx_uuid",
  
  // Identificação
  agent: "genesis",
  user_id: "user_123",
  
  // Multi-canal
  channel: "mattermost",        // mm | wa | ha | api
  channel_id: "channel_abc",
  
  // Chave única: agent + user_id + channel + channel_id
  
  // Histórico
  messages: [
    { role: "user", content: "...", timestamp: ISODate },
    { role: "assistant", content: "...", timestamp: ISODate }
  ],
  
  // Metadados
  created_at: ISODate,
  updated_at: ISODate,
  message_count: 42,
  
  // Configurações do contexto
  config: {
    max_history: 20,
    model_override: null
  }
}
```

### 5.2 Isolamento de Contexto

| Cenário | Contexto |
|---------|----------|
| User A + MM + Genesis | Contexto 1 |
| User A + WA + Genesis | Contexto 2 |
| User A + MM + Prometheus | Contexto 3 |
| User B + MM + Genesis | Contexto 4 |

Cada combinação `(user_id, channel, channel_id, agent)` tem contexto isolado.

### 5.3 Consciência Unificada (Futuro)

Para permitir que agente "lembre" de outros canais:

```javascript
// Buscar todos contextos do usuário com este agente
const allContexts = await db.contextos.find({
  agent: "genesis",
  user_id: "user_123"
});

// Resumir contextos de outros canais
const crossChannelSummary = summarize(allContexts);

// Incluir no system prompt
system_prompt += `\n\nContexto de outros canais:\n${crossChannelSummary}`;
```

---

## 6. Observabilidade

### 6.1 Pino Logger

**Configuração:**

```javascript
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: {
    service: 'pantheon',
    version: process.env.APP_VERSION
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label })
  }
});

// Uso
logger.info({
  trace_id: req.traceId,
  agent: 'genesis',
  channel: 'mattermost',
  event: 'message_received',
  user_id: req.body.user_id,
  message_length: req.body.message.length
}, 'Incoming message');
```

### 6.2 Schema ClickHouse

```sql
CREATE TABLE pantheon.logs (
    timestamp DateTime64(3),
    level LowCardinality(String),
    service LowCardinality(String),
    version String,
    
    -- Contexto
    trace_id String,
    agent LowCardinality(String),
    channel LowCardinality(String),
    channel_id String,
    user_id String,
    
    -- Evento
    event LowCardinality(String),
    message String,
    
    -- Métricas
    duration_ms Nullable(UInt32),
    tokens_input Nullable(UInt32),
    tokens_output Nullable(UInt32),
    
    -- Erro
    error_code Nullable(String),
    error_message Nullable(String),
    
    -- Metadata (JSON flexível)
    metadata String
    
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp, service, agent, trace_id)
TTL timestamp + INTERVAL 90 DAY;
```

### 6.3 Métricas Derivadas

| Métrica | Query ClickHouse |
|---------|------------------|
| Mensagens/hora | `SELECT count() FROM logs WHERE event='message_received' AND timestamp > now() - INTERVAL 1 HOUR` |
| Latência P95 | `SELECT quantile(0.95)(duration_ms) FROM logs WHERE event='response_sent'` |
| Tokens/dia | `SELECT sum(tokens_input + tokens_output) FROM logs WHERE timestamp > today()` |
| Erros/agente | `SELECT agent, count() FROM logs WHERE level='error' GROUP BY agent` |

---

## 7. Segurança

### 7.1 Autenticação

| Canal | Método |
|-------|--------|
| MM Outgoing | Token no query param (validado) |
| WhatsApp | Webhook signature verification |
| API REST | Bearer token |
| Home Assistant | Webhook secret |

### 7.2 Tokens dos Agentes

Armazenados em:
- **Produção:** Variáveis de ambiente / Vault
- **Desenvolvimento:** `genesis/config/panteao_credenciais.json` (git-ignored em prod)

### 7.3 Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 30,             // 30 requests/minuto por IP
  keyGenerator: (req) => req.body.user_id || req.ip,
  message: { error: 'Too many requests' }
});

app.use('/api/pantheon/webhook', limiter);
```

---

## 8. Referências Técnicas

### 8.1 Documentação Oficial

| Tecnologia | URL |
|------------|-----|
| Camunda 7 | https://docs.camunda.org/manual/7.21/ |
| Pino | https://getpino.io/ |
| ClickHouse | https://clickhouse.com/docs |
| Anthropic API | https://docs.anthropic.com/claude/reference |
| Mattermost API | https://api.mattermost.com/ |

### 8.2 Padrões Arquiteturais

| Padrão | Referência |
|--------|------------|
| Event-Driven Architecture | https://martinfowler.com/articles/201701-event-driven.html |
| Saga Pattern | https://microservices.io/patterns/data/saga.html |
| External Task Pattern | https://docs.camunda.org/manual/7.21/user-guide/process-engine/external-tasks/ |

### 8.3 Análise de Referência (Zarah)

| Arquivo | Patterns Extraídos |
|---------|-------------------|
| `mattermostV2Controller.js` | Webhook único, query params para contexto |
| `src/services/camunda/` | evaluate(), startProcessCamundaV2() |
| `src/services/sistemas/rabbitmq/` | safeSendToQueue() para signals assíncronos |

---

## 9. Glossário

| Termo | Definição |
|-------|-----------|
| **Agent** | Entidade autônoma com propósito específico (Genesis, Prometheus, etc) |
| **Channel** | Canal de comunicação (MM, WA, HA, API) |
| **Context** | Histórico de conversação isolado por user+channel+agent |
| **Tool** | Capacidade executável pelo agente (github_get, mongodb_query) |
| **Signal** | Mensagem assíncrona entre processos Camunda |
| **Trace ID** | Identificador único para correlacionar logs de uma requisição |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-19 | M1 criado. Arquitetura em camadas, stack tecnológica, padrões de comunicação, agent loop, multi-contexto, observabilidade. |

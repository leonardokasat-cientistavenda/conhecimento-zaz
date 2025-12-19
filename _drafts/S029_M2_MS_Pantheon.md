---
nome: MS_Pantheon
versao: "0.1"
tipo: M2 - Objeto/Instância
classe_ref: MetaSystem
origem: interno
status: Em Análise
etapa: M2
sprint_ref: S029
camada: C2
data_criacao: 2025-12-19
m0_ref: _drafts/S029_M0_MS_Pantheon.md
m1_ref: _drafts/S029_M1_MS_Pantheon.md
---

# M2 - MS_Pantheon: Objeto/Instância

## 1. Estrutura do Projeto

### 1.1 Repositório

```
pantheon/
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── README.md
│
├── src/
│   ├── index.js                    # Entry point
│   ├── config/
│   │   ├── index.js                # Configurações centralizadas
│   │   ├── logger.js               # Pino setup
│   │   └── camunda.js              # Camunda client setup
│   │
│   ├── controllers/
│   │   └── webhookController.js    # POST /api/pantheon/webhook
│   │
│   ├── services/
│   │   ├── camunda/
│   │   │   ├── index.js            # startProcess, sendSignal, evaluate
│   │   │   └── client.js           # Camunda REST client
│   │   ├── mattermost/
│   │   │   ├── index.js            # posts, users, channels
│   │   │   └── client.js           # MM REST client
│   │   ├── anthropic/
│   │   │   └── index.js            # Claude API wrapper
│   │   ├── github/
│   │   │   └── index.js            # GitHub API wrapper
│   │   └── clickhouse/
│   │       └── index.js            # ClickHouse log transport
│   │
│   ├── workers/
│   │   ├── index.js                # Inicializa todos workers
│   │   ├── agente-contexto.js
│   │   ├── agente-anthropic.js
│   │   ├── agente-tool.js
│   │   ├── agente-persistir.js
│   │   ├── agente-sendMessage.js
│   │   └── tools/
│   │       ├── github-get.js
│   │       ├── github-push.js
│   │       ├── mongodb-query.js
│   │       └── mattermost-post.js
│   │
│   ├── middleware/
│   │   ├── requestLogger.js        # Log de requisições
│   │   ├── traceId.js              # Gera trace_id
│   │   └── rateLimiter.js          # Rate limiting
│   │
│   └── utils/
│       ├── normalizer.js           # Normaliza input dos canais
│       └── validators.js           # Validação de schemas
│
├── camunda/
│   ├── bpmn/
│   │   ├── bpmn_agent_loop.bpmn
│   │   └── bpmn_criar_agente.bpmn
│   ├── dmn/
│   │   ├── dmn_pantheon_roteamento_in.dmn
│   │   └── dmn_pantheon_roteamento_out.dmn
│   └── forms/
│       └── (futuro)
│
├── scripts/
│   ├── deploy-camunda.sh           # Deploy BPMN/DMN
│   └── setup-clickhouse.sql        # Schema ClickHouse
│
└── tests/
    ├── unit/
    └── integration/
```

### 1.2 Package.json

```json
{
  "name": "pantheon",
  "version": "0.1.0",
  "description": "MS_Pantheon - Multi-Agent Orchestration System",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "deploy:camunda": "./scripts/deploy-camunda.sh"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pino": "^8.17.2",
    "pino-http": "^9.0.0",
    "camunda-external-task-client-js": "^3.0.0",
    "@anthropic-ai/sdk": "^0.32.1",
    "mongodb": "^6.3.0",
    "@clickhouse/client": "^0.2.9",
    "axios": "^1.6.2",
    "uuid": "^9.0.1",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  }
}
```

### 1.3 Variáveis de Ambiente

```bash
# .env.example

# Server
PORT=3031
NODE_ENV=development
LOG_LEVEL=info

# Camunda
CAMUNDA_BASE_URL=https://camunda.zaz.vc/engine-rest
CAMUNDA_WORKER_ID=pantheon-worker

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net
MONGODB_DATABASE=genesis

# ClickHouse
CLICKHOUSE_HOST=clickhouse.zaz.vc
CLICKHOUSE_PORT=8443
CLICKHOUSE_DATABASE=pantheon
CLICKHOUSE_USER=pantheon
CLICKHOUSE_PASSWORD=***

# Anthropic
ANTHROPIC_API_KEY=sk-ant-***

# GitHub
GITHUB_TOKEN=ghp_***
GITHUB_OWNER=leonardokasat-cientistavenda
GITHUB_REPO=conhecimento-zaz

# Mattermost
MATTERMOST_BASE_URL=https://mattermost.zaz.vc
MATTERMOST_ADMIN_TOKEN=***

# Agent Tokens (carregados do config ou env)
GENESIS_TOKEN=5g65c5kwj38hdbfuox3y34benr
PROMETHEUS_TOKEN=gr6pskjfx7fgdxjyggazrocuew
ASCLEPIUS_TOKEN=rfayfmx7pfbufgka5tbipxrfjy
ATLAS_TOKEN=obxacdxwff8cmx1gpsbh9dsspc
KAIROS_TOKEN=g4seynz1wffbpbd4gy9hf3g4qy
```

---

## 2. Implementação Core

### 2.1 Entry Point (src/index.js)

```javascript
require('dotenv').config();

const express = require('express');
const { logger } = require('./config/logger');
const { initCamundaWorkers } = require('./workers');
const webhookController = require('./controllers/webhookController');
const { requestLogger } = require('./middleware/requestLogger');
const { traceId } = require('./middleware/traceId');
const { rateLimiter } = require('./middleware/rateLimiter');

const app = express();

// Middleware
app.use(express.json());
app.use(traceId);
app.use(requestLogger);

// Routes
app.use('/api/pantheon', rateLimiter, webhookController);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'pantheon', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3031;
app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Pantheon server started');
  
  // Initialize Camunda workers
  initCamundaWorkers();
});
```

### 2.2 Logger (src/config/logger.js)

```javascript
const pino = require('pino');
const { ClickHouseTransport } = require('../services/clickhouse');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: {
    service: 'pantheon',
    version: process.env.npm_package_version || '0.1.0',
    env: process.env.NODE_ENV
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label })
  }
});

// ClickHouse transport (async)
if (process.env.NODE_ENV === 'production') {
  const clickhouseTransport = new ClickHouseTransport();
  // Pipe logs to ClickHouse in background
  // Implementation depends on pino-abstract-transport
}

module.exports = { logger };
```

### 2.3 Webhook Controller (src/controllers/webhookController.js)

```javascript
const express = require('express');
const router = express.Router();
const { logger } = require('../config/logger');
const { normalizeInput } = require('../utils/normalizer');
const { validateWebhookInput } = require('../utils/validators');
const { evaluate, startProcess } = require('../services/camunda');

router.post('/webhook', async (req, res) => {
  const traceId = req.traceId;
  
  try {
    // 1. Normalizar input
    const normalized = normalizeInput(req.body, req.query);
    
    logger.info({
      trace_id: traceId,
      agent: normalized.agent,
      channel: normalized.channel,
      user_id: normalized.user_id,
      event: 'message_received'
    }, 'Incoming message');
    
    // 2. Validar
    const validation = validateWebhookInput(normalized);
    if (!validation.valid) {
      logger.warn({ trace_id: traceId, errors: validation.errors }, 'Validation failed');
      return res.status(400).json({ error: 'Invalid input', details: validation.errors });
    }
    
    // 3. Consultar DMN para roteamento
    const routing = await evaluate({
      key: 'dmn_pantheon_roteamento_in',
      variables: {
        agent: { value: normalized.agent, type: 'String' },
        channel: { value: normalized.channel, type: 'String' },
        command: { value: normalized.command || '', type: 'String' }
      }
    });
    
    if (!routing || !routing.process) {
      logger.warn({ trace_id: traceId, agent: normalized.agent }, 'No routing found');
      return res.status(404).json({ error: 'Agent not found' });
    }
    
    // 4. Iniciar processo Camunda
    const processInstance = await startProcess({
      processDefinitionKey: routing.process,
      businessKey: `${normalized.channel_id}_${normalized.user_id}`,
      variables: {
        trace_id: { value: traceId, type: 'String' },
        agent: { value: normalized.agent, type: 'String' },
        channel: { value: normalized.channel, type: 'String' },
        channel_id: { value: normalized.channel_id, type: 'String' },
        user_id: { value: normalized.user_id, type: 'String' },
        message: { value: normalized.message, type: 'String' },
        files: { value: JSON.stringify(normalized.files || []), type: 'Json' },
        metadata: { value: JSON.stringify(normalized.metadata || {}), type: 'Json' },
        agent_token: { value: routing.token, type: 'String' },
        config: { value: JSON.stringify(routing.config || {}), type: 'Json' }
      }
    });
    
    logger.info({
      trace_id: traceId,
      process_instance_id: processInstance.id,
      event: 'process_started'
    }, 'Process started');
    
    // 5. Resposta imediata
    res.status(202).json({
      status: 'accepted',
      trace_id: traceId,
      process_instance_id: processInstance.id
    });
    
  } catch (error) {
    logger.error({
      trace_id: traceId,
      error: error.message,
      stack: error.stack,
      event: 'webhook_error'
    }, 'Webhook processing failed');
    
    res.status(500).json({ error: 'Internal server error', trace_id: traceId });
  }
});

module.exports = router;
```

### 2.4 Normalizer (src/utils/normalizer.js)

```javascript
/**
 * Normaliza input de diferentes canais para formato interno
 */
function normalizeInput(body, query) {
  // Detectar source pelo formato do body
  const source = detectSource(body, query);
  
  switch (source) {
    case 'mattermost':
      return normalizeMattermost(body, query);
    case 'whatsapp':
      return normalizeWhatsApp(body, query);
    case 'homeassistant':
      return normalizeHomeAssistant(body, query);
    case 'api':
    default:
      return normalizeApi(body, query);
  }
}

function detectSource(body, query) {
  if (body.trigger_word !== undefined) return 'mattermost';
  if (body.entry && body.object === 'whatsapp_business_account') return 'whatsapp';
  if (body.event_type && body.entity_id) return 'homeassistant';
  return 'api';
}

function normalizeMattermost(body, query) {
  const { channel_id, user_id, text, file_ids, team_id, post_id, user_name } = body;
  
  // Extrair @agent do texto
  const agentMatch = text.match(/@(\w+)/);
  const agent = agentMatch ? agentMatch[1].toLowerCase() : 'genesis';
  const message = text.replace(/@\w+\s*/, '').trim();
  
  return {
    source: 'mattermost',
    channel: 'mm',
    agent,
    channel_id,
    user_id: query.user_id || user_id,  // Preferir user_id do bot (query)
    message,
    files: file_ids ? file_ids.split(',') : [],
    metadata: {
      team_id,
      post_id,
      user_name,
      original_user_id: user_id
    }
  };
}

function normalizeWhatsApp(body, query) {
  // Estrutura Evolution API / WhatsApp Cloud API
  const entry = body.entry?.[0];
  const change = entry?.changes?.[0]?.value;
  const message = change?.messages?.[0];
  
  return {
    source: 'whatsapp',
    channel: 'wa',
    agent: query.agent || 'genesis',
    channel_id: message?.from || query.wa_id,
    user_id: message?.from || query.wa_id,
    message: message?.text?.body || '',
    files: [],
    metadata: {
      wa_id: message?.from,
      message_id: message?.id,
      timestamp: message?.timestamp
    }
  };
}

function normalizeHomeAssistant(body, query) {
  return {
    source: 'homeassistant',
    channel: 'ha',
    agent: query.agent || 'kairos',
    channel_id: body.entity_id,
    user_id: body.user_id || 'ha_system',
    message: body.message || body.event_data?.message || '',
    files: [],
    metadata: {
      entity_id: body.entity_id,
      event_type: body.event_type,
      state: body.state
    }
  };
}

function normalizeApi(body, query) {
  return {
    source: 'api',
    channel: 'api',
    agent: body.agent || query.agent || 'genesis',
    channel_id: body.channel_id || 'api_default',
    user_id: body.user_id || 'api_user',
    message: body.message || '',
    files: body.files || [],
    metadata: body.metadata || {}
  };
}

module.exports = { normalizeInput, detectSource };
```

---

## 3. Workers

### 3.1 Worker Initializer (src/workers/index.js)

```javascript
const { Client, logger: camundaLogger } = require('camunda-external-task-client-js');
const { logger } = require('../config/logger');

const agenteContexto = require('./agente-contexto');
const agenteAnthropic = require('./agente-anthropic');
const agenteTool = require('./agente-tool');
const agentePersistir = require('./agente-persistir');
const agenteSendMessage = require('./agente-sendMessage');

function initCamundaWorkers() {
  const client = new Client({
    baseUrl: process.env.CAMUNDA_BASE_URL,
    workerId: process.env.CAMUNDA_WORKER_ID || 'pantheon-worker',
    maxTasks: 10,
    asyncResponseTimeout: 30000,
    use: (logger) => {
      // Integrar logs do Camunda client com Pino
    }
  });

  // Registrar workers
  agenteContexto(client);
  agenteAnthropic(client);
  agenteTool(client);
  agentePersistir(client);
  agenteSendMessage(client);

  logger.info({ workerId: process.env.CAMUNDA_WORKER_ID }, 'Camunda workers initialized');
  
  return client;
}

module.exports = { initCamundaWorkers };
```

### 3.2 Worker: agente-contexto (src/workers/agente-contexto.js)

```javascript
const { logger } = require('../config/logger');
const { getCollection } = require('../services/mongodb');
const { getFile } = require('../services/github');

module.exports = function(client) {
  client.subscribe('agente-contexto', async ({ task, taskService }) => {
    const traceId = task.variables.get('trace_id');
    const agent = task.variables.get('agent');
    const channel = task.variables.get('channel');
    const channelId = task.variables.get('channel_id');
    const userId = task.variables.get('user_id');
    const message = task.variables.get('message');

    try {
      logger.info({ trace_id: traceId, agent, event: 'context_building' }, 'Building context');

      // 1. Buscar system prompt do GitHub
      const systemPromptPath = `genesis/agents/${agent}/system_prompt.md`;
      let systemPrompt;
      try {
        systemPrompt = await getFile(systemPromptPath);
      } catch (e) {
        // Fallback para prompt genérico
        systemPrompt = `Você é ${agent}, um agente do sistema GENESIS.`;
        logger.warn({ trace_id: traceId, agent, path: systemPromptPath }, 'System prompt not found, using fallback');
      }

      // 2. Buscar histórico do MongoDB
      const contextos = await getCollection('contextos');
      const contextKey = { agent, channel, channel_id: channelId, user_id: userId };
      
      let context = await contextos.findOne(contextKey);
      
      if (!context) {
        // Criar novo contexto
        context = {
          ...contextKey,
          context_id: `ctx_${Date.now()}`,
          messages: [],
          created_at: new Date(),
          updated_at: new Date(),
          message_count: 0,
          config: { max_history: 20 }
        };
        await contextos.insertOne(context);
      }

      // 3. Montar messages para API Anthropic
      const maxHistory = context.config?.max_history || 20;
      const historyMessages = context.messages.slice(-maxHistory);
      
      // Adicionar mensagem atual
      const messages = [
        ...historyMessages,
        { role: 'user', content: message }
      ];

      // 4. Completar task
      await taskService.complete(task, {
        system_prompt: systemPrompt,
        messages: JSON.stringify(messages),
        context_id: context.context_id
      });

      logger.info({ 
        trace_id: traceId, 
        context_id: context.context_id,
        history_length: historyMessages.length,
        event: 'context_built' 
      }, 'Context built successfully');

    } catch (error) {
      logger.error({ trace_id: traceId, error: error.message, event: 'context_error' }, 'Context building failed');
      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: 5000
      });
    }
  });
};
```

### 3.3 Worker: agente-anthropic (src/workers/agente-anthropic.js)

```javascript
const Anthropic = require('@anthropic-ai/sdk');
const { logger } = require('../config/logger');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

module.exports = function(client) {
  client.subscribe('agente-anthropic', async ({ task, taskService }) => {
    const traceId = task.variables.get('trace_id');
    const systemPrompt = task.variables.get('system_prompt');
    const messagesJson = task.variables.get('messages');
    const configJson = task.variables.get('config') || '{}';
    const toolsJson = task.variables.get('tools') || '[]';

    try {
      const messages = JSON.parse(messagesJson);
      const config = JSON.parse(configJson);
      const tools = JSON.parse(toolsJson);

      logger.info({ 
        trace_id: traceId, 
        model: config.model || 'claude-sonnet-4-20250514',
        messages_count: messages.length,
        event: 'llm_calling' 
      }, 'Calling Anthropic API');

      const startTime = Date.now();

      const response = await anthropic.messages.create({
        model: config.model || 'claude-sonnet-4-20250514',
        max_tokens: config.max_tokens || 4096,
        system: systemPrompt,
        messages: messages,
        tools: tools.length > 0 ? tools : undefined
      });

      const durationMs = Date.now() - startTime;

      logger.info({ 
        trace_id: traceId,
        stop_reason: response.stop_reason,
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
        duration_ms: durationMs,
        event: 'llm_response' 
      }, 'Anthropic API responded');

      // Extrair resposta de texto
      const textContent = response.content.find(c => c.type === 'text');
      const toolUseContent = response.content.find(c => c.type === 'tool_use');

      await taskService.complete(task, {
        response: JSON.stringify(response),
        content: JSON.stringify(response.content),
        assistant_message: textContent?.text || '',
        stop_reason: response.stop_reason,
        usage: JSON.stringify(response.usage),
        duration_ms: durationMs,
        has_tool_use: response.stop_reason === 'tool_use',
        tool_use: toolUseContent ? JSON.stringify(toolUseContent) : null
      });

    } catch (error) {
      logger.error({ trace_id: traceId, error: error.message, event: 'llm_error' }, 'Anthropic API failed');
      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: 10000
      });
    }
  });
};
```

### 3.4 Worker: agente-sendMessage (src/workers/agente-sendMessage.js)

```javascript
const { logger } = require('../config/logger');
const { postMessage } = require('../services/mattermost');

module.exports = function(client) {
  client.subscribe('agente-sendMessage', async ({ task, taskService }) => {
    const traceId = task.variables.get('trace_id');
    const channel = task.variables.get('channel');
    const channelId = task.variables.get('channel_id');
    const message = task.variables.get('assistant_message');
    const agentToken = task.variables.get('agent_token');
    const metadataJson = task.variables.get('metadata') || '{}';

    try {
      const metadata = JSON.parse(metadataJson);

      logger.info({ 
        trace_id: traceId, 
        channel,
        channel_id: channelId,
        message_length: message.length,
        event: 'sending_message' 
      }, 'Sending message');

      let result;

      switch (channel) {
        case 'mm':
        case 'mattermost':
          result = await postMessage({
            channel_id: channelId,
            message: message,
            token: agentToken,
            root_id: metadata.post_id // Reply na thread se houver
          });
          break;

        case 'wa':
        case 'whatsapp':
          // TODO: Implementar WhatsApp
          logger.warn({ trace_id: traceId }, 'WhatsApp not implemented yet');
          result = { status: 'not_implemented' };
          break;

        case 'ha':
        case 'homeassistant':
          // TODO: Implementar Home Assistant
          logger.warn({ trace_id: traceId }, 'Home Assistant not implemented yet');
          result = { status: 'not_implemented' };
          break;

        default:
          logger.warn({ trace_id: traceId, channel }, 'Unknown channel');
          result = { status: 'unknown_channel' };
      }

      await taskService.complete(task, {
        send_result: JSON.stringify(result),
        post_id: result.id || null
      });

      logger.info({ 
        trace_id: traceId,
        post_id: result.id,
        event: 'message_sent' 
      }, 'Message sent successfully');

    } catch (error) {
      logger.error({ trace_id: traceId, error: error.message, event: 'send_error' }, 'Send message failed');
      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: 5000
      });
    }
  });
};
```

### 3.5 Worker: agente-persistir (src/workers/agente-persistir.js)

```javascript
const { logger } = require('../config/logger');
const { getCollection } = require('../services/mongodb');

module.exports = function(client) {
  client.subscribe('agente-persistir', async ({ task, taskService }) => {
    const traceId = task.variables.get('trace_id');
    const contextId = task.variables.get('context_id');
    const agent = task.variables.get('agent');
    const channel = task.variables.get('channel');
    const channelId = task.variables.get('channel_id');
    const userId = task.variables.get('user_id');
    const userMessage = task.variables.get('message');
    const assistantMessage = task.variables.get('assistant_message');
    const usageJson = task.variables.get('usage') || '{}';
    const durationMs = task.variables.get('duration_ms') || 0;

    try {
      const usage = JSON.parse(usageJson);

      logger.info({ trace_id: traceId, context_id: contextId, event: 'persisting' }, 'Persisting execution');

      // 1. Atualizar contexto com novas mensagens
      const contextos = await getCollection('contextos');
      await contextos.updateOne(
        { context_id: contextId },
        {
          $push: {
            messages: {
              $each: [
                { role: 'user', content: userMessage, timestamp: new Date() },
                { role: 'assistant', content: assistantMessage, timestamp: new Date() }
              ]
            }
          },
          $inc: { message_count: 2 },
          $set: { updated_at: new Date() }
        }
      );

      // 2. Criar registro de execução
      const execucoes = await getCollection('execucoes');
      const execution = {
        execution_id: `exec_${Date.now()}`,
        trace_id: traceId,
        context_id: contextId,
        agent,
        channel,
        channel_id: channelId,
        user_id: userId,
        user_message: userMessage,
        assistant_message: assistantMessage,
        usage: {
          input_tokens: usage.input_tokens || 0,
          output_tokens: usage.output_tokens || 0,
          total_tokens: (usage.input_tokens || 0) + (usage.output_tokens || 0)
        },
        duration_ms: durationMs,
        tools_used: [],
        created_at: new Date()
      };

      await execucoes.insertOne(execution);

      await taskService.complete(task, {
        execution_id: execution.execution_id
      });

      logger.info({ 
        trace_id: traceId,
        execution_id: execution.execution_id,
        tokens: execution.usage.total_tokens,
        event: 'persisted' 
      }, 'Execution persisted');

    } catch (error) {
      logger.error({ trace_id: traceId, error: error.message, event: 'persist_error' }, 'Persist failed');
      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: 5000
      });
    }
  });
};
```

---

## 4. Services

### 4.1 Camunda Service (src/services/camunda/index.js)

```javascript
const axios = require('axios');
const { logger } = require('../../config/logger');

const baseUrl = process.env.CAMUNDA_BASE_URL;

async function startProcess({ processDefinitionKey, businessKey, variables }) {
  const response = await axios.post(
    `${baseUrl}/process-definition/key/${processDefinitionKey}/start`,
    { businessKey, variables }
  );
  return response.data;
}

async function sendSignal({ name, variables }) {
  const response = await axios.post(
    `${baseUrl}/signal`,
    { name, variables }
  );
  return response.data;
}

async function evaluate({ key, variables }) {
  const response = await axios.post(
    `${baseUrl}/decision-definition/key/${key}/evaluate`,
    { variables }
  );
  
  // Extrair resultado do DMN
  if (response.data && response.data.length > 0) {
    const result = response.data[0];
    return {
      process: result.process?.value,
      token: result.token?.value,
      config: result.config?.value ? JSON.parse(result.config.value) : {}
    };
  }
  return null;
}

module.exports = { startProcess, sendSignal, evaluate };
```

### 4.2 Mattermost Service (src/services/mattermost/index.js)

```javascript
const axios = require('axios');

const baseUrl = process.env.MATTERMOST_BASE_URL;

async function postMessage({ channel_id, message, token, root_id }) {
  const response = await axios.post(
    `${baseUrl}/api/v4/posts`,
    {
      channel_id,
      message,
      root_id: root_id || undefined
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
}

async function getUser(userId, token) {
  const response = await axios.get(
    `${baseUrl}/api/v4/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
}

async function getChannel(channelId, token) {
  const response = await axios.get(
    `${baseUrl}/api/v4/channels/${channelId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
}

module.exports = { postMessage, getUser, getChannel };
```

---

## 5. MongoDB Collections

### 5.1 Collection: genesis.contextos

```javascript
// Index
db.contextos.createIndex(
  { agent: 1, channel: 1, channel_id: 1, user_id: 1 },
  { unique: true, name: 'idx_context_key' }
);
db.contextos.createIndex({ context_id: 1 }, { unique: true });
db.contextos.createIndex({ updated_at: -1 });

// Schema example
{
  _id: ObjectId("..."),
  context_id: "ctx_1703001234567",
  agent: "genesis",
  channel: "mm",
  channel_id: "abc123",
  user_id: "user456",
  messages: [
    { role: "user", content: "Olá", timestamp: ISODate("...") },
    { role: "assistant", content: "Olá! Como posso ajudar?", timestamp: ISODate("...") }
  ],
  message_count: 2,
  config: { max_history: 20 },
  created_at: ISODate("..."),
  updated_at: ISODate("...")
}
```

### 5.2 Collection: genesis.execucoes

```javascript
// Index
db.execucoes.createIndex({ execution_id: 1 }, { unique: true });
db.execucoes.createIndex({ trace_id: 1 });
db.execucoes.createIndex({ agent: 1, created_at: -1 });
db.execucoes.createIndex({ user_id: 1, created_at: -1 });

// Schema example
{
  _id: ObjectId("..."),
  execution_id: "exec_1703001234567",
  trace_id: "uuid-v4",
  context_id: "ctx_1703001234567",
  agent: "genesis",
  channel: "mm",
  channel_id: "abc123",
  user_id: "user456",
  user_message: "Olá",
  assistant_message: "Olá! Como posso ajudar?",
  usage: {
    input_tokens: 150,
    output_tokens: 25,
    total_tokens: 175
  },
  duration_ms: 1234,
  tools_used: [],
  created_at: ISODate("...")
}
```

---

## 6. BPMN/DMN

### 6.1 DMN: dmn_pantheon_roteamento_in

| agent | channel | command | → process | → token | → config |
|-------|---------|---------|-----------|---------|----------|
| genesis | - | criar agente | bpmn_criar_agente | ${GENESIS_TOKEN} | {} |
| genesis | - | - | bpmn_agent_loop | ${GENESIS_TOKEN} | {"model":"claude-sonnet-4-20250514"} |
| prometheus | - | - | bpmn_agent_loop | ${PROMETHEUS_TOKEN} | {"model":"claude-sonnet-4-20250514"} |
| asclepius | - | - | bpmn_agent_loop | ${ASCLEPIUS_TOKEN} | {"model":"claude-sonnet-4-20250514"} |
| atlas | - | - | bpmn_agent_loop | ${ATLAS_TOKEN} | {"model":"claude-haiku-3-5-20241022"} |
| kairos | - | - | bpmn_agent_loop | ${KAIROS_TOKEN} | {"model":"claude-haiku-3-5-20241022"} |

### 6.2 BPMN: bpmn_agent_loop

Ver diagrama na seção 4.1 do M1.

**Service Tasks:**
1. `agente-contexto` - Montar contexto
2. `agente-anthropic` - Chamar LLM
3. `agente-tool` - Executar tool (se tool_use)
4. `agente-sendMessage` - Enviar resposta
5. `agente-persistir` - Persistir execução

---

## 7. Deploy

### 7.1 PM2 Ecosystem

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'pantheon',
    script: 'src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```

### 7.2 Deploy Camunda Script

```bash
#!/bin/bash
# scripts/deploy-camunda.sh

CAMUNDA_URL=${CAMUNDA_BASE_URL:-"https://camunda.zaz.vc"}

# Deploy BPMN
for file in camunda/bpmn/*.bpmn; do
  echo "Deploying $file..."
  curl -X POST "$CAMUNDA_URL/deployment/create" \
    -F "deployment-name=pantheon" \
    -F "deployment-source=script" \
    -F "data=@$file"
done

# Deploy DMN
for file in camunda/dmn/*.dmn; do
  echo "Deploying $file..."
  curl -X POST "$CAMUNDA_URL/deployment/create" \
    -F "deployment-name=pantheon" \
    -F "deployment-source=script" \
    -F "data=@$file"
done

echo "Deploy complete!"
```

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-19 | M2 criado. Estrutura completa do projeto, implementação core, workers, services, MongoDB schemas, deploy config. |

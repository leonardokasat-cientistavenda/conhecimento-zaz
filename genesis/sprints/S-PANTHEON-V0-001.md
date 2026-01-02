---
sprint_id: S-PANTHEON-V0-001
nome: Pantheon V0 - Claude Desktop no MM
versao: "1.1"
tipo: Sprint
status: Pausado
data_criacao: 2025-12-30
data_pausa: 2026-01-02
spec_ref: genesis/specs/PANTHEON_V0_SPEC.md
bloqueios:
  - id: BLK-001
    tipo: Dependência
    descricao: "Infra-Bot necessário para ciclo code/deploy/test via Claude Desktop"
    impacto: "Sem Infra-Bot, Claude não consegue testar código implantado"
    resolucao: "Criar Infra-Bot como Sprint S-INFRA-BOT-001"
---

# Sprint S-PANTHEON-V0-001

> **Pantheon V0 - Claude Desktop no Mattermost**
> 
> Chat com @genesis no MM com contexto, streaming e web search.

---

## ⚠️ SPRINT PAUSADA

**Data:** 2026-01-02
**Motivo:** Bloqueio BLK-001 - Infra-Bot

### Contexto

Durante análise de como desenvolver o Prometheus via Claude Desktop, identificou-se que:

1. **Claude Desktop consegue:** Desenvolver código (GitHub MCP) e fazer deploy (push → webhook)
2. **Claude Desktop NÃO consegue:** Ver resultados de testes, logs, status de serviços

### Solução

Criar **Infra-Bot** no Mattermost que:
- Executa comandos (`test`, `lint`, `logs`, `status`, `restart`, `call`)
- Posta resultados no canal
- Claude lê via MCP MM

### Dependência

```
S-INFRA-BOT-001 (criar) → S-PANTHEON-V0-001 (retomar)
```

---

## 1. Objetivo

Implementar MVP do Pantheon onde usuário menciona `@genesis` no Mattermost
e recebe resposta do Claude com:
- Contexto de conversa (histórico do canal/thread)
- Streaming (edição de mensagem em tempo real)
- Web Search (busca automática quando necessário)
- Suporte a threads

---

## 2. Critério de Sucesso

```
[Leonardo]: @genesis qual a cotação do dólar hoje?
[genesis]:  ⏳ Pensando...
[genesis]:  🔍 Buscando informações atuais...
[genesis]:  A cotação do dólar hoje (30/12/2025) está em R$ 6,18.
            [fonte: bcb.gov.br]
```

---

## 3. Informações Técnicas

### 3.1 Repositório
- **Código:** `ZAZ-vendas/Orquestrador-Zarah` (branch: main)
- **Pasta:** `pantheon/`
- **Docs:** `leonardokasat-cientistavenda/conhecimento-zaz`

### 3.2 Credenciais

| Item | Valor |
|------|-------|
| MM Base URL | https://mattermost.zaz.vc |
| MM Token Genesis | 5g65c5kwj38hdbfuox3y34benr |
| MM Webhook Token | 45kcb8754pfjfcw1tkpuciw5mh |
| MM User ID Genesis | noecbzw95bbnub84f8gs5xtiey |
| Anthropic API Key | sk-ant-api03-MQ3moWQ... (ver .env) |
| Server Port | 3100 |

### 3.3 Webhook Existente

O outgoing webhook do @genesis já existe no MM:
- **Trigger:** @genesis
- **Token:** 45kcb8754pfjfcw1tkpuciw5mh
- **Callback atual:** https://zaz.vc/webhook?user_id=noecbzw95bbnub84f8gs5xtiey
- **Callback novo:** http://IP:3100/api/pantheon/webhook

---

## 4. Tasks

### T01 - Setup Inicial
**Esforço:** 30min | **Prioridade:** P0

- [ ] Clonar/acessar repo Orquestrador-Zarah
- [ ] Criar pasta `pantheon/` se não existir
- [ ] Criar `package.json` com dependências
- [ ] Criar `.env` com credenciais
- [ ] Criar `.env.example` (sem secrets)
- [ ] `npm install`

**Dependências:** Nenhuma

**Arquivos:**
```
pantheon/
├── package.json
├── .env
└── .env.example
```

---

### T02 - Estrutura Base
**Esforço:** 30min | **Prioridade:** P0

- [ ] Criar `index.js` (entry point)
- [ ] Criar `config/env.js` (validação de env vars)
- [ ] Criar `config/logger.js` (Pino)
- [ ] Criar `config/genesis.js` (system prompt)

**Dependências:** T01

**Arquivos:**
```
pantheon/
├── index.js
└── config/
    ├── env.js
    ├── logger.js
    └── genesis.js
```

---

### T03 - Mattermost Client
**Esforço:** 30min | **Prioridade:** P0

- [ ] Criar `services/mattermost/_client.js` (HTTP base)
- [ ] Criar `services/mattermost/posts.js` (create, update, get)
- [ ] Criar `services/mattermost/channels.js` (getPosts)
- [ ] Criar `services/mattermost/index.js` (re-exports)
- [ ] Testar: criar post, editar post, buscar posts

**Dependências:** T02

**Arquivos:**
```
pantheon/services/mattermost/
├── _client.js
├── posts.js
├── channels.js
└── index.js
```

**Teste:**
```javascript
// Deve criar e editar um post
const post = await mm.posts.create({ channel_id, message: "teste" });
await mm.posts.update(post.id, { message: "editado" });
```

---

### T04 - API Server + Webhook
**Esforço:** 45min | **Prioridade:** P0

- [ ] Criar `api/server.js` (Express app)
- [ ] Criar `api/routes/webhook.js` (POST /api/pantheon/webhook)
- [ ] Validar token do webhook
- [ ] Extrair dados: text, user_id, channel_id, root_id
- [ ] Remover trigger word (@genesis) do texto
- [ ] Criar `api/routes/health.js` (GET /health)

**Dependências:** T02

**Arquivos:**
```
pantheon/api/
├── server.js
└── routes/
    ├── webhook.js
    └── health.js
```

**Payload MM Webhook:**
```json
{
  "token": "45kcb8754pfjfcw1tkpuciw5mh",
  "team_id": "xxx",
  "channel_id": "xxx",
  "user_id": "xxx",
  "user_name": "leonardo",
  "post_id": "xxx",
  "root_id": "",
  "text": "@genesis pergunta aqui",
  "trigger_word": "@genesis"
}
```

---

### T05 - Context Manager
**Esforço:** 1h | **Prioridade:** P0

- [ ] Criar `core/contextManager.js`
- [ ] Implementar `getContext(channel_id, root_id)`
- [ ] Se root_id presente: buscar thread via MM API
- [ ] Se não: buscar últimos N posts do canal
- [ ] Filtrar posts do próprio bot (evitar loop)
- [ ] Converter para formato Anthropic messages[]
- [ ] Truncar se exceder limite de tokens

**Dependências:** T03

**Arquivos:**
```
pantheon/core/
└── contextManager.js
```

**Interface:**
```javascript
const messages = await contextManager.getContext(channel_id, root_id);
// Retorna: [{ role: "user", content: "..." }, { role: "assistant", content: "..." }]
```

---

### T06 - Anthropic Client
**Esforço:** 45min | **Prioridade:** P0

- [ ] Criar `services/anthropic/client.js`
- [ ] Implementar `createStream(messages, options)`
- [ ] Incluir web_search tool por padrão
- [ ] Configurar model, max_tokens, system prompt
- [ ] Retornar AsyncIterable de chunks

**Dependências:** T02

**Arquivos:**
```
pantheon/services/anthropic/
└── client.js
```

**Interface:**
```javascript
const stream = await anthropic.createStream(messages, {
  system: GENESIS_SYSTEM_PROMPT,
  webSearch: true
});

for await (const chunk of stream) {
  console.log(chunk.text);
}
```

---

### T07 - Streamer
**Esforço:** 1h | **Prioridade:** P0

- [ ] Criar `core/streamer.js`
- [ ] Implementar `Streamer` class
- [ ] `start()` - cria post inicial "⏳ Pensando..."
- [ ] `update(text)` - edita post (throttle 500ms)
- [ ] `finish(text)` - edita com resposta final
- [ ] `error(message)` - edita com erro formatado
- [ ] Guardar post_id para edições

**Dependências:** T03

**Arquivos:**
```
pantheon/core/
└── streamer.js
```

**Interface:**
```javascript
const streamer = new Streamer(mm, channel_id, root_id);
await streamer.start();
await streamer.update("Parte da resposta...");
await streamer.update("Mais conteúdo...");
await streamer.finish("Resposta completa.");
```

---

### T08 - Executor (Integração)
**Esforço:** 1h | **Prioridade:** P0

- [ ] Criar `core/executor.js`
- [ ] Integrar: webhook → context → anthropic → streamer
- [ ] Tratar erros graciosamente
- [ ] Log de execução (trace_id, duração, tokens)

**Dependências:** T04, T05, T06, T07

**Arquivos:**
```
pantheon/core/
└── executor.js
```

**Fluxo:**
```javascript
async function execute(webhookData) {
  const { channel_id, root_id, text, user_id } = webhookData;
  
  // 1. Criar streamer
  const streamer = new Streamer(mm, channel_id, root_id);
  await streamer.start();
  
  // 2. Buscar contexto
  const context = await contextManager.getContext(channel_id, root_id);
  const messages = [...context, { role: "user", content: text }];
  
  // 3. Chamar Anthropic com streaming
  const stream = await anthropic.createStream(messages);
  
  // 4. Processar stream
  let buffer = "";
  for await (const chunk of stream) {
    buffer += chunk.text;
    await streamer.update(buffer);
  }
  
  // 5. Finalizar
  await streamer.finish(buffer);
}
```

---

### T09 - Webhook URL no MM
**Esforço:** 15min | **Prioridade:** P1

- [ ] Acessar MM Admin → Integrations → Outgoing Webhooks
- [ ] Localizar webhook do @genesis
- [ ] Atualizar Callback URL para: `http://IP:3100/api/pantheon/webhook`
- [ ] Ou configurar nginx proxy: `https://zaz.vc/api/pantheon/webhook`

**Dependências:** T08, Deploy

**Opções de URL:**
1. Direto: `http://10.100.X.X:3100/api/pantheon/webhook`
2. Via nginx: `https://zaz.vc/api/pantheon/webhook` → proxy para 3100

---

### T10 - Deploy
**Esforço:** 30min | **Prioridade:** P1

- [ ] SSH no servidor
- [ ] Clonar/pull repo
- [ ] Configurar `.env` com credenciais reais
- [ ] `npm install`
- [ ] Testar: `node index.js`
- [ ] Configurar PM2: `pm2 start index.js --name pantheon`
- [ ] Verificar logs: `pm2 logs pantheon`

**Dependências:** T08

**Comandos:**
```bash
cd /path/to/Orquestrador-Zarah/pantheon
npm install
node index.js  # teste manual

# Produção
pm2 start index.js --name pantheon
pm2 save
pm2 logs pantheon
```

---

### T11 - Teste E2E
**Esforço:** 30min | **Prioridade:** P1

- [ ] Postar no MM: `@genesis olá, quem é você?`
- [ ] Verificar: resposta aparece com streaming
- [ ] Postar: `@genesis qual a cotação do dólar hoje?`
- [ ] Verificar: web search é usado, resposta com fonte
- [ ] Postar em thread: `@genesis continue`
- [ ] Verificar: contexto da thread é mantido
- [ ] Testar com outro usuário
- [ ] Verificar logs no servidor

**Dependências:** T09, T10

**Checklist:**
- [ ] ✅ Resposta básica funciona
- [ ] ✅ Streaming (mensagem atualiza)
- [ ] ✅ Web search (busca quando necessário)
- [ ] ✅ Threads (contexto mantido)
- [ ] ✅ Multi-usuário (outros podem usar)
- [ ] ✅ Erros tratados graciosamente

---

## 5. Estrutura Final

```
pantheon/
├── package.json
├── index.js
├── .env
├── .env.example
├── README.md
├── config/
│   ├── env.js
│   ├── logger.js
│   └── genesis.js
├── api/
│   ├── server.js
│   └── routes/
│       ├── webhook.js
│       └── health.js
├── core/
│   ├── contextManager.js
│   ├── streamer.js
│   └── executor.js
└── services/
    ├── anthropic/
    │   └── client.js
    └── mattermost/
        ├── _client.js
        ├── posts.js
        ├── channels.js
        └── index.js
```

---

## 6. Dependências (package.json)

```json
{
  "name": "pantheon",
  "version": "0.1.0",
  "description": "Multi-agent orchestration for Mattermost",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.52.0",
    "axios": "^1.6.0",
    "dotenv": "^16.3.0",
    "express": "^4.18.2",
    "pino": "^8.17.0",
    "pino-http": "^8.6.0"
  }
}
```

---

## 7. Variáveis de Ambiente (.env.example)

```bash
# Server
PORT=3100
NODE_ENV=development

# Mattermost
MM_BASE_URL=https://mattermost.zaz.vc
MM_TOKEN_GENESIS=your_token_here
MM_WEBHOOK_TOKEN=your_webhook_token_here
MM_BOT_USER_ID=noecbzw95bbnub84f8gs5xtiey

# Anthropic
ANTHROPIC_API_KEY=your_api_key_here

# Context
CONTEXT_MAX_MESSAGES=20
CONTEXT_MAX_TOKENS=8000

# Streaming
STREAM_UPDATE_INTERVAL_MS=500
STREAM_MIN_CHARS=50

# Web Search
WEB_SEARCH_ENABLED=true
WEB_SEARCH_MAX_USES=5

# Logging
LOG_LEVEL=info
```

---

## 8. Cronograma

| Task | Esforço | Acumulado |
|------|---------|-----------|
| T01 - Setup | 30min | 30min |
| T02 - Estrutura | 30min | 1h |
| T03 - MM Client | 30min | 1h30 |
| T04 - API Server | 45min | 2h15 |
| T05 - Context Manager | 1h | 3h15 |
| T06 - Anthropic Client | 45min | 4h |
| T07 - Streamer | 1h | 5h |
| T08 - Executor | 1h | 6h |
| T09 - Webhook URL | 15min | 6h15 |
| T10 - Deploy | 30min | 6h45 |
| T11 - Teste E2E | 30min | 7h15 |
| **Buffer** | 45min | **8h** |

**Total estimado: ~8h**

---

## 9. Riscos

| Risco | Mitigação |
|-------|-----------|
| Rate limit MM API | Throttle no streamer (500ms) |
| Webhook não chega | Verificar firewall, testar com curl |
| Timeout Anthropic | Timeout generoso (60s), retry |
| Contexto muito grande | Truncar histórico, limit tokens |

---

## 10. Definition of Done

- [ ] @genesis responde no MM
- [ ] Streaming funciona (mensagem atualiza)
- [ ] Web search funciona quando necessário
- [ ] Threads funcionam (contexto mantido)
- [ ] Múltiplos usuários podem usar
- [ ] Erros são tratados graciosamente
- [ ] Logs estão funcionando
- [ ] Deploy em produção com PM2

---

## 11. Referências

| Documento | Path |
|-----------|------|
| Spec V0 | `genesis/specs/PANTHEON_V0_SPEC.md` |
| Backlog | `genesis/backlog/BACKLOG_PANTHEON.md` |
| MM API | https://api.mattermost.com/ |
| Anthropic Streaming | https://docs.anthropic.com/en/api/streaming |
| Web Search Tool | https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/web-search-tool |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-30 | Sprint criada com 11 tasks |
| 1.1 | 2026-01-02 | **PAUSADA** - Bloqueio BLK-001 (Infra-Bot) |

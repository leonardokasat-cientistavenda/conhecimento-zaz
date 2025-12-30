---
nome: PANTHEON_V0_SPEC
versao: "0.1"
tipo: Spec
status: Aprovado
data_criacao: 2025-12-30
---

# Pantheon V0 - Spec

> **Claude Desktop no Mattermost**
> 
> Chat com @genesis no MM com mesma experiência do Claude Desktop,
> aproveitando recursos nativos do MM (threads, multi-usuário, histórico)
> e capacidades built-in da API Anthropic (web search).

---

## 1. Objetivo

Usuário menciona `@genesis` no Mattermost e recebe resposta do Claude,
com contexto de conversa, suporte a threads, web search automático,
e feedback visual de "digitando" via edição de mensagem.

### Critério de Sucesso

```
[Leonardo]: @genesis qual a cotação do dólar hoje?
[genesis]:  ⏳ Pensando...
[genesis]:  A cotação do dólar hoje (30/12/2025) está em R$ 6,18
            para compra e R$ 6,19 para venda, segundo o Banco Central.
            [fonte: bcb.gov.br]
```

---

## 2. Escopo

### 2.1 Entrega (V0)

| Capacidade | Descrição | Implementação |
|------------|-----------|---------------|
| Chat texto | @genesis responde perguntas | Anthropic API |
| Contexto | Histórico do canal/thread | MM API → busca posts |
| System prompt | Personalidade GENESIS | Configurável |
| Threads | Responde em thread se pergunta foi em thread | root_id do MM |
| Streaming fake | Edita mensagem conforme resposta chega | PUT /posts/{id} |
| **Web Search** | Busca na internet quando necessário | Anthropic built-in |
| Markdown | Code blocks, tables, formatting | MM nativo |
| Multi-usuário | Qualquer um no canal pode interagir | MM nativo |

### 2.2 Não Entrega (V0)

| Capacidade | Versão Futura |
|------------|---------------|
| Upload arquivos/imagens | V0.1 |
| Seleção de modelo | V0.2 |
| MCP (GitHub, MongoDB) | V1 |
| Outros bots (prometheus, atlas...) | V2 |
| Camunda/DMN | V2+ |

---

## 3. Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      MATTERMOST                             │
│                                                             │
│  [User]: @genesis pergunta                                  │
│                    │                                        │
│                    ▼                                        │
│           Outgoing Webhook                                  │
│    Token: 45kcb8754pfjfcw1tkpuciw5mh                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    PANTHEON V0                              │
│                    Port: 3100                               │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Webhook   │─▶│   Context   │─▶│     Anthropic       │ │
│  │   Handler   │  │   Manager   │  │  + Web Search Tool  │ │
│  └─────────────┘  └─────────────┘  └──────────┬──────────┘ │
│                                               │             │
│                                               ▼             │
│                                    ┌─────────────────────┐ │
│                                    │      Streamer       │ │
│                                    │   (create + edit)   │ │
│                                    └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Componentes

### 4.1 Webhook Handler (`api/routes/webhook.js`)
- Recebe POST do MM Outgoing Webhook
- Extrai: text, user_id, channel_id, root_id (se thread)
- Valida token do webhook
- Remove trigger word (@genesis) do texto

### 4.2 Context Manager (`core/contextManager.js`)
- Busca histórico do canal via MM API
- Se thread (root_id presente): GET /posts/{root_id}/thread
- Se canal: GET /channels/{channel_id}/posts?per_page=20
- Filtra posts do bot para evitar loop
- Monta array de messages para Anthropic
- Trunca se exceder limite de tokens

### 4.3 Anthropic Client (`services/anthropic/client.js`)
- Chama API com streaming habilitado
- Model: claude-sonnet-4-20250514
- Inclui web_search tool built-in
- System prompt: configuração do @genesis

### 4.4 Streamer (`core/streamer.js`)
- Cria post inicial "⏳ Pensando..."
- Edita post conforme chunks chegam (throttle 500ms)
- Finaliza com resposta completa

---

## 5. Fluxo Detalhado

```
1. User posta: "@genesis qual a cotação do dólar?"
   
2. MM dispara Outgoing Webhook
   POST /api/pantheon/webhook
   {
     text: "@genesis qual a cotação do dólar?",
     user_id: "abc123",
     channel_id: "xyz789",
     root_id: "",           // vazio se não é thread
     trigger_word: "@genesis",
     token: "45kcb8754pfjfcw1tkpuciw5mh"
   }

3. Webhook Handler
   - Valida token
   - Remove trigger word → "qual a cotação do dólar?"
   - Identifica se é thread (root_id presente)

4. Context Manager
   - Se root_id: GET /posts/{root_id}/thread
   - Se não: GET /channels/{channel_id}/posts?per_page=20
   - Filtra posts do próprio bot
   - Monta messages[] no formato Anthropic

5. Cria post inicial
   POST /posts { 
     channel_id, 
     root_id,  // mantém na thread se veio de thread
     message: "⏳ Pensando..." 
   }
   → Retorna post_id

6. Anthropic Stream (com web search)
   - Inicia stream com messages[] + web_search tool
   - Claude decide se precisa buscar na web
   - Se sim, Anthropic executa busca automaticamente
   - Para cada chunk de texto:
     - Acumula em buffer
     - A cada 500ms: PUT /posts/{post_id} { message: buffer }

7. Finaliza
   - PUT /posts/{post_id} { message: resposta_completa }
   - Resposta inclui citações se usou web search
```

---

## 6. Configuração

### 6.1 Variáveis de Ambiente

```bash
# Server
PORT=3100
NODE_ENV=production

# Mattermost
MM_BASE_URL=https://mattermost.zaz.vc
MM_TOKEN_GENESIS=5g65c5kwj38hdbfuox3y34benr
MM_WEBHOOK_TOKEN=45kcb8754pfjfcw1tkpuciw5mh

# Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-...

# Contexto
CONTEXT_MAX_MESSAGES=20
CONTEXT_MAX_TOKENS=8000

# Streaming
STREAM_UPDATE_INTERVAL_MS=500
STREAM_MIN_CHARS=50

# Web Search
WEB_SEARCH_ENABLED=true
WEB_SEARCH_MAX_USES=5
```

### 6.2 System Prompt (@genesis)

```markdown
Você é GENESIS, o sistema de inteligência híbrida da ZAZ.

Sua missão é amplificar a capacidade cognitiva humana combinando:
- Intenção humana (o que precisa ser feito)
- Fluência de LLM (como expressar e processar)
- Estrutura de sistema (como organizar e persistir)

Regras:
- Responda de forma concisa, útil e acionável
- Use markdown para formatação quando apropriado
- Se não souber algo, diga claramente
- Se precisar de mais contexto, pergunte
- Quando buscar na web, cite as fontes
- Mantenha tom profissional mas amigável

Contexto: Você está em um canal do Mattermost da ZAZ, 
uma empresa de vendas porta-a-porta. Os usuários são 
principalmente da equipe de tecnologia e operações.
```

---

## 7. API

### 7.1 POST /api/pantheon/webhook

**Request (MM Outgoing Webhook):**
```json
{
  "token": "45kcb8754pfjfcw1tkpuciw5mh",
  "team_id": "wj5que7njfygpxdq4sijrdjwnr",
  "channel_id": "u16s8tyrm7y7zccaji5wfsjkpe",
  "channel_name": "town-square",
  "user_id": "abc123",
  "user_name": "leonardo",
  "post_id": "",
  "root_id": "",
  "text": "@genesis qual a cotação do dólar?",
  "trigger_word": "@genesis"
}
```

**Response:**
```json
{
  "status": "processing"
}
```

> Nota: Resposta real é enviada via MM API (create + edit post),
> não no response do webhook. Isso permite streaming.

### 7.2 GET /health

```json
{
  "status": "ok",
  "service": "pantheon",
  "version": "0.1.0",
  "features": {
    "web_search": true,
    "streaming": true
  }
}
```

---

## 8. Chamada Anthropic

```javascript
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 4096,
  system: GENESIS_SYSTEM_PROMPT,
  messages: contextMessages,
  stream: true,
  tools: [{
    type: "web_search_20250305",
    name: "web_search",
    max_uses: 5
  }]
});
```

---

## 9. Estrutura de Arquivos

```
pantheon/
├── package.json
├── index.js                    # Entry point
├── .env.example
├── README.md
├── config/
│   ├── env.js                  # Validação de env vars
│   ├── logger.js               # Pino + ClickHouse
│   └── genesis.js              # System prompt
├── api/
│   ├── server.js               # Express app
│   └── routes/
│       └── webhook.js          # POST /api/pantheon/webhook
├── core/
│   ├── contextManager.js       # Busca histórico MM
│   └── streamer.js             # Create + edit post loop
└── services/
    ├── anthropic/
    │   └── client.js           # Stream API + web search
    └── mattermost/
        ├── _client.js          # HTTP client base
        ├── posts.js            # CRUD posts
        └── index.js            # Re-exports
```

---

## 10. Dependências

```json
{
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

## 11. MM Webhook Configurado

| Campo | Valor |
|-------|-------|
| Bot | GENESIS |
| Trigger Word | @genesis |
| Token | 45kcb8754pfjfcw1tkpuciw5mh |
| Callback URL | http://IP:3100/api/pantheon/webhook |
| User ID | noecbzw95bbnub84f8gs5xtiey |

---

## 12. Custos Estimados

| Item | Custo | Volume Estimado/mês |
|------|-------|---------------------|
| Claude Sonnet (input) | $3/1M tokens | ~500k tokens → $1.50 |
| Claude Sonnet (output) | $15/1M tokens | ~200k tokens → $3.00 |
| Web Search | $10/1k buscas | ~200 buscas → $2.00 |
| **Total** | | **~$6.50/mês** |

---

## 13. Limitações Conhecidas

| Limitação | Mitigação |
|-----------|-----------|
| Rate limit MM API (edit) | Throttle 500ms entre edits |
| Contexto máximo Anthropic | Truncar histórico antigo |
| Sem upload de arquivos | Mencionar limitação, V0.1 |
| Bot só edita próprios posts | Criar post primeiro, depois editar |
| Web search pode demorar | Mostrar "🔍 Buscando..." durante busca |

---

## 14. Métricas de Sucesso

| Métrica | Target |
|---------|--------|
| Tempo primeira resposta | < 2s |
| Tempo resposta completa | < 30s (maioria) |
| Taxa de erro | < 1% |
| Uptime | > 99% |

---

## 15. Comparativo com Claude Desktop

| Capacidade | Claude Desktop | Pantheon V0 |
|------------|----------------|-------------|
| Chat texto | ✅ | ✅ |
| Contexto | ✅ | ✅ |
| Streaming | ✅ | ✅ (via edit) |
| Web Search | ✅ | ✅ (Anthropic built-in) |
| Markdown | ✅ | ✅ |
| Threads | ❌ | ✅ ⭐ |
| Multi-usuário | ❌ | ✅ ⭐ |
| @mentions | ❌ | ✅ ⭐ |
| Histórico pesquisável | ✅ | ✅ (MM nativo) |
| Upload arquivos | ✅ | ❌ (V0.1) |
| MCP/Tools | ✅ | ❌ (V1) |

**V0 = Claude Desktop + vantagens de colaboração do MM**

---

## 16. Referências

| Documento | Path |
|-----------|------|
| Backlog | genesis/backlog/BACKLOG_PANTHEON.md |
| Sprint V0 | genesis/sprints/S-PANTHEON-V0-001.md |
| Código | Orquestrador-Zarah/pantheon/ |
| MM API | https://api.mattermost.com/ |
| Anthropic API | https://docs.anthropic.com/ |
| Web Search Tool | https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/web-search-tool |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-30 | Spec inicial V0 com web search built-in |

# Sprint S-PANTHEON-001

> **Objetivo:** MVP Bot Funcional - @genesis respondendo no Mattermost via Claude
> **Esforço:** ~5 horas
> **Status:** Pendente

---

## Escopo

| BKL | Descrição | Fase |
|-----|-----------|------|
| BKL-040 | Estrutura Pantheon + Migração | 1 |
| BKL-041 | API Webhook + Outgoing Webhook MM | 2 |
| BKL-042 | Executor MVP (Anthropic direto) | 3 |

---

## Critério de Sucesso

```
Usuário no MM: @genesis olá, quem é você?
                    ↓
Genesis responde: Olá! Sou GENESIS, o sistema de inteligência 
                  híbrida da ZAZ. Como posso ajudar?
```

---

## Tasks

### T01: Criar estrutura pantheon/
**Esforço:** 15 min | **BKL:** 040

Criar estrutura base de pastas:
```
pantheon/
├── package.json
├── index.js
├── config/
├── api/
├── core/
└── services/
```

**Critério:** Estrutura existe no GitHub

---

### T02: Migrar services/mattermost
**Esforço:** 15 min | **BKL:** 040

Copiar `genesis/services/mattermost/` para `pantheon/services/mattermost/`

**Critério:** Import `require('./services/mattermost')` funciona

---

### T03: Migrar e adaptar logger
**Esforço:** 10 min | **BKL:** 040

Copiar `genesis/lib/logger.js` para `pantheon/config/logger.js`

**Critério:** Logger funcionando com ClickHouse

---

### T04: Criar config/agents.js
**Esforço:** 20 min | **BKL:** 040

Configuração dos agentes:
```javascript
module.exports = {
  genesis: {
    user_id: 'noecbzw95bbnub84f8gs5xtiey',
    token: process.env.MM_TOKEN_GENESIS,
    model: 'claude-sonnet-4-20250514',
    system_prompt: '...'
  },
  // ... outros agentes
};
```

**Critério:** Agentes carregados corretamente

---

### T05: Criar api/server.js
**Esforço:** 30 min | **BKL:** 041

Express server básico:
```javascript
const express = require('express');
const app = express();
app.use(express.json());
app.use('/api/pantheon', require('./routes/webhook'));
app.listen(3100);
```

**Critério:** Server rodando na porta 3100

---

### T06: Criar api/routes/webhook.js
**Esforço:** 30 min | **BKL:** 041

Endpoint POST /api/pantheon/webhook:
```javascript
router.post('/webhook', async (req, res) => {
  const { text, user_id, channel_id, trigger_word } = req.body;
  // Normaliza e processa
  await executor.run({ text, user_id, channel_id, agent: trigger_word });
  res.json({ ok: true });
});
```

**Critério:** Webhook recebe POST e loga

---

### T07: Configurar Outgoing Webhook MM
**Esforço:** 15 min | **BKL:** 041

No Mattermost Admin:
- Criar Outgoing Webhook
- Trigger words: `@genesis`
- Callback URL: `http://10.100.x.x:3100/api/pantheon/webhook`

**Critério:** @genesis no MM dispara webhook

---

### T08: Criar services/anthropic/client.js
**Esforço:** 30 min | **BKL:** 042

Wrapper do SDK Anthropic:
```javascript
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

module.exports = {
  chat: async (messages, options = {}) => {
    return client.messages.create({
      model: options.model || 'claude-sonnet-4-20250514',
      max_tokens: options.max_tokens || 4096,
      messages
    });
  }
};
```

**Critério:** Chamada Anthropic funciona

---

### T09: Criar core/executor.js
**Esforço:** 1h | **BKL:** 042

Loop principal (MVP sem tools):
```javascript
async function run({ text, user_id, channel_id, agent }) {
  // 1. Identifica agente
  const config = agents[agent] || agents.genesis;
  
  // 2. Monta mensagens (MVP: sem histórico)
  const messages = [
    { role: 'user', content: text }
  ];
  
  // 3. Chama Anthropic
  const response = await anthropic.chat(messages, {
    model: config.model,
    system: config.system_prompt
  });
  
  // 4. Responde no MM
  await mm.posts.create({
    channel_id,
    message: response.content[0].text
  });
  
  // 5. Log
  logger.info({ agent, user_id, channel_id }, 'Execução completa');
}
```

**Critério:** Executor processa mensagem end-to-end

---

### T10: Teste E2E
**Esforço:** 30 min | **BKL:** 042

Teste completo:
1. Enviar @genesis no MM
2. Verificar log no servidor
3. Verificar resposta no MM
4. Verificar log no ClickHouse

**Critério:** 🎉 Bot funcionando!

---

## Arquitetura MVP

```
┌─────────────────────────────────────────────────────────────┐
│                         FLUXO MVP                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   @genesis no MM                                            │
│         │                                                   │
│         ▼                                                   │
│   ┌─────────────────┐                                       │
│   │ Outgoing        │                                       │
│   │ Webhook MM      │                                       │
│   └────────┬────────┘                                       │
│            ▼                                                │
│   ┌─────────────────┐                                       │
│   │ POST /webhook   │                                       │
│   │ (api/routes)    │                                       │
│   └────────┬────────┘                                       │
│            ▼                                                │
│   ┌─────────────────┐     ┌─────────────────┐              │
│   │ executor.js     │────►│ anthropic/      │              │
│   │ (core)          │     │ client.js       │              │
│   └────────┬────────┘     └─────────────────┘              │
│            ▼                                                │
│   ┌─────────────────┐                                       │
│   │ mattermost/     │                                       │
│   │ posts.create()  │                                       │
│   └────────┬────────┘                                       │
│            ▼                                                │
│   Resposta no MM ✅                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Estrutura Final (após sprint)

```
Orquestrador-Zarah/
└── pantheon/
    ├── package.json
    ├── index.js
    ├── config/
    │   ├── agents.js
    │   ├── logger.js
    │   └── env.js
    ├── api/
    │   ├── server.js
    │   └── routes/
    │       └── webhook.js
    ├── core/
    │   └── executor.js
    └── services/
        ├── mattermost/    # (20 módulos migrados)
        └── anthropic/
            └── client.js
```

---

## Dependências npm

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "@anthropic-ai/sdk": "^0.52.0",
    "axios": "^1.6.0",
    "pino": "^8.17.0",
    "pino-http": "^8.6.0",
    "dotenv": "^16.3.0"
  }
}
```

---

## Variáveis de Ambiente

```bash
# Mattermost
MM_BASE_URL=https://mattermost.zaz.vc
MM_TOKEN_GENESIS=5g65c5kwj38hdbfuox3y34benr

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# ClickHouse
CLICKHOUSE_HOST=10.100.12.19
CLICKHOUSE_PORT=8123
CLICKHOUSE_USER=genesis
CLICKHOUSE_PASSWORD=...

# Server
PORT=3100
```

---

## Credenciais de Referência

| Item | Valor |
|------|-------|
| MM Token Genesis | `5g65c5kwj38hdbfuox3y34benr` |
| MM User ID Genesis | `noecbzw95bbnub84f8gs5xtiey` |
| MM Team ID | `wj5que7njfygpxdq4sijrdjwnr` |
| MM Channel Town Square | `u16s8tyrm7y7zccaji5wfsjkpe` |

---

## Bloqueadores Conhecidos

| Bloqueador | Mitigação |
|------------|-----------|
| Rede Claude → MM bloqueada | Usar MCP para validação |
| API Key Anthropic | Solicitar ao Leonardo |
| IP servidor para webhook | Confirmar com Gabriel |

---

## Referências

| Documento | Path |
|-----------|------|
| Backlog Pantheon | `genesis/backlog/BACKLOG_PANTHEON.md` |
| Spec Original | `_drafts/S029_M4_MS_Pantheon_Spec.md` |
| Services MM | `Orquestrador-Zarah/genesis/services/mattermost/` |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-29 | Sprint criada |

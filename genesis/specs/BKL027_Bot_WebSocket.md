# BKL-027 - Bot + WebSocket para DM e Canais Privados

> **Backlog:** BKL-027  
> **Tipo:** Melhoria  
> **Prioridade:** 🟡 Média  
> **Status:** Backlog  
> **Descoberto em:** S026 - Análise M1

---

## Problema

Outgoing Webhook do Mattermost **não funciona** em:
- DMs (mensagens diretas)
- Canais privados

Isso limita o GENESIS a interações em canais públicos.

---

## Solução Proposta

Implementar **Bot Account + WebSocket** como entry point alternativo.

### Comparação

| Feature | Outgoing Webhook | Bot + WebSocket |
|---------|------------------|------------------|
| Canais públicos | ✅ | ✅ |
| DMs | ❌ | ✅ |
| Canais privados | ❌ | ✅ |
| Editar mensagens | ❌ | ✅ |
| Mostrar "typing" | ❌ | ✅ |
| Código necessário | 0 | ~150 linhas |

### Arquitetura

```
┌─────────────────────────────────────────────────────┐
│  Bot WebSocket Listener (Node.js)           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  const Client = require('mattermost-client');       │
│  const client = new Client(MM_URL, BOT_TOKEN);      │
│                                                     │
│  client.on('message', async (msg) => {              │
│    if (msg.data.mentions?.includes(BOT_USER_ID)) {  │
│      // Dispara processo Camunda                    │
│      await startProcessCamundaV2('bpmn_agente', {   │
│        agente_id: 'genesis',                        │
│        channel_id: msg.channel_id,                  │
│        user_id: msg.user_id,                        │
│        input: msg.data.post.message                 │
│      });                                            │
│    }                                                │
│  });                                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Dependências

```json
{
  "mattermost-client": "^4.0.0"
}
```

### Variáveis de Ambiente

```
MM_URL=wss://mm.zaz.vc/api/v4/websocket
MM_BOT_TOKEN=xxx
MM_BOT_USER_ID=xxx
```

---

## Critérios de Aceitação

- [ ] Bot responde em DMs
- [ ] Bot responde em canais privados
- [ ] Bot mostra "typing" enquanto processa
- [ ] Bot pode editar mensagens (mostrar progresso)
- [ ] Coexiste com Outgoing Webhook (canais públicos)

---

## Esforço Estimado

~4h (150 linhas + testes + deploy)

---

## Referências

- [Mattermost Bot Accounts](https://developers.mattermost.com/integrate/reference/bot-accounts/)
- [mattermost-client npm](https://www.npmjs.com/package/mattermost-client)

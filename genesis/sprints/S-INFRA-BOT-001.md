---
sprint_id: S-INFRA-BOT-001
nome: Infra-Bot - Ponte para Testes via Claude Desktop
versao: "1.0"
tipo: Sprint
status: Ativo
data_criacao: 2026-01-02
prioridade: P0
desbloqueia:
  - S-PANTHEON-V0-001
  - (futuro) Desenvolvimento do Prometheus via Claude Desktop
---

# Sprint S-INFRA-BOT-001

> **Infra-Bot - Ponte para Testes via Claude Desktop**
> 
> Bot no MM que executa comandos de teste/logs/status e posta resultados.
> Permite que Claude Desktop tenha visibilidade do ciclo code/deploy/test.

---

## 1. Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GARGALO ATUAL                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Claude Desktop consegue:                                                  │
│   ✅ Escrever código (GitHub MCP)                                          │
│   ✅ Fazer deploy (push → webhook → PM2)                                   │
│                                                                             │
│   Claude Desktop NÃO consegue:                                             │
│   ❌ Rodar npm test remotamente                                            │
│   ❌ Ver logs do PM2                                                       │
│   ❌ Verificar se serviço subiu                                            │
│   ❌ Fazer chamadas HTTP de teste                                          │
│                                                                             │
│   RESULTADO: Claude fica "cego" após deploy                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Solução

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           INFRA-BOT                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Claude Desktop                                                            │
│        │                                                                    │
│        │ mm-genesis: post("@infra test pantheon")                          │
│        │                                                                    │
│        ▼                                                                    │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                         INFRA-BOT                                   │  │
│   │                                                                     │  │
│   │  • Escuta canal via WebSocket                                       │  │
│   │  • Parseia comandos @infra {cmd} {args}                            │  │
│   │  • Executa no servidor                                              │  │
│   │  • Posta resultado no canal                                         │  │
│   │                                                                     │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│        │                                                                    │
│        │ Resultado postado no MM                                           │
│        ▼                                                                    │
│   Claude lê via mm-genesis: get_posts() / search_posts()                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Informações Técnicas

### 3.1 Repositório
- **Código:** `ZAZ-vendas/Orquestrador-Zarah`
- **Pasta:** `pantheon/infra-bot/`

### 3.2 Bot do Mattermost

**AÇÃO MANUAL NECESSÁRIA:** Criar bot `@infra` no MM Admin Console

| Item | Valor |
|------|-------|
| Username | infra |
| Display Name | Infra Bot |
| Description | Bot para execução de comandos de infra |
| Role | Member (não precisa admin) |

Após criar, anotar o **Bot Token** gerado.

### 3.3 Permissões Necessárias

O bot precisa estar nos canais:
- `prometheus` (ou onde Claude vai comandar)
- Ou usar canal dedicado `infra-ops`

---

## 4. Comandos

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `@infra test {path}` | Roda npm test | `@infra test pantheon` |
| `@infra lint {path}` | Roda npm run lint | `@infra lint pantheon` |
| `@infra logs {app}` | Últimas 50 linhas PM2 | `@infra logs pantheon` |
| `@infra status` | PM2 status de todos apps | `@infra status` |
| `@infra restart {app}` | PM2 restart | `@infra restart pantheon` |
| `@infra call {url}` | curl para testar endpoint | `@infra call http://localhost:3100/health` |
| `@infra help` | Lista comandos | `@infra help` |

---

## 5. Tasks

### T01 - Criar Bot no MM (MANUAL)
**Esforço:** 10min | **Prioridade:** P0

- [ ] Acessar MM Admin Console
- [ ] System Console → Integrations → Bot Accounts
- [ ] Create Bot Account
  - Username: `infra`
  - Display Name: `Infra Bot`
  - Description: `Executa comandos de infraestrutura`
- [ ] Copiar Bot Token gerado
- [ ] Adicionar bot aos canais necessários

**Output:** Bot Token para usar no código

---

### T02 - Setup Projeto
**Esforço:** 15min | **Prioridade:** P0

- [ ] Criar pasta `pantheon/infra-bot/`
- [ ] Criar `package.json`
- [ ] Criar `.env` com token
- [ ] `npm install`

**Arquivos:**
```
pantheon/infra-bot/
├── package.json
├── .env
├── .env.example
└── index.js
```

**package.json:**
```json
{
  "name": "infra-bot",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@mattermost/client": "^9.0.0",
    "dotenv": "^16.3.0"
  }
}
```

**Dependências:** T01 (precisa do token)

---

### T03 - Implementar Bot
**Esforço:** 1h | **Prioridade:** P0

- [ ] Criar `index.js` com WebSocket listener
- [ ] Parsear comandos `@infra {cmd} {args}`
- [ ] Implementar handlers para cada comando
- [ ] Postar resultados no canal
- [ ] Tratamento de erros

**Dependências:** T02

**Código Base:**

```javascript
// pantheon/infra-bot/index.js
require('dotenv').config();
const { Client4, WebSocketClient } = require('@mattermost/client');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

const BASE_PATH = '/home/camunda-orquestrador/Orquestrador-Zarah';
const BOT_USER_ID = process.env.MM_BOT_USER_ID;

// Cliente HTTP para postar mensagens
const client = new Client4();
client.setUrl(process.env.MM_BASE_URL);
client.setToken(process.env.MM_BOT_TOKEN);

// Comandos disponíveis
const commands = {
  test: async (path) => {
    const fullPath = `${BASE_PATH}/${path}`;
    const { stdout, stderr } = await execAsync(`cd ${fullPath} && npm test 2>&1`);
    return stdout || stderr;
  },

  lint: async (path) => {
    const fullPath = `${BASE_PATH}/${path}`;
    const { stdout, stderr } = await execAsync(`cd ${fullPath} && npm run lint 2>&1`);
    return stdout || stderr;
  },

  logs: async (app) => {
    const { stdout } = await execAsync(`pm2 logs ${app} --lines 50 --nostream 2>&1`);
    return stdout;
  },

  status: async () => {
    const { stdout } = await execAsync('pm2 jlist 2>&1');
    try {
      const apps = JSON.parse(stdout);
      return apps.map(a => `${a.name}: ${a.pm2_env.status} (pid: ${a.pid})`).join('\n');
    } catch {
      return stdout;
    }
  },

  restart: async (app) => {
    const { stdout } = await execAsync(`pm2 restart ${app} 2>&1`);
    return stdout;
  },

  call: async (url) => {
    const { stdout, stderr } = await execAsync(`curl -s -w "\\n\\nHTTP Status: %{http_code}" ${url} 2>&1`);
    return stdout || stderr;
  },

  help: async () => {
    return `**Comandos disponíveis:**
• \`@infra test {path}\` - Roda npm test
• \`@infra lint {path}\` - Roda npm run lint
• \`@infra logs {app}\` - Últimas 50 linhas PM2
• \`@infra status\` - Status de todos apps
• \`@infra restart {app}\` - Reinicia app
• \`@infra call {url}\` - Faz curl no endpoint`;
  }
};

// Handler de mensagens
async function handleMessage(msg) {
  // Ignorar próprias mensagens
  if (msg.user_id === BOT_USER_ID) return;
  
  // Verificar se menciona @infra
  if (!msg.message || !msg.message.includes('@infra')) return;

  // Parsear comando
  const match = msg.message.match(/@infra\s+(\w+)\s*(.*)/);
  if (!match) return;

  const [, cmd, args] = match;
  const arg = args.trim();

  console.log(`[INFRA] Comando: ${cmd}, Args: ${arg}`);

  // Verificar se comando existe
  if (!commands[cmd]) {
    await client.createPost({
      channel_id: msg.channel_id,
      root_id: msg.root_id || msg.id,
      message: `❌ Comando desconhecido: \`${cmd}\`\nUse \`@infra help\` para ver comandos disponíveis.`
    });
    return;
  }

  try {
    // Avisar que está processando
    await client.createPost({
      channel_id: msg.channel_id,
      root_id: msg.root_id || msg.id,
      message: `⏳ Executando \`${cmd} ${arg}\`...`
    });

    // Executar comando
    const result = await commands[cmd](arg);

    // Postar resultado (truncar se muito grande)
    const truncated = result.length > 3500 
      ? result.slice(0, 3500) + '\n\n... (truncado)'
      : result;

    await client.createPost({
      channel_id: msg.channel_id,
      root_id: msg.root_id || msg.id,
      message: `✅ **${cmd}** concluído:\n\`\`\`\n${truncated}\n\`\`\``
    });

  } catch (error) {
    console.error(`[INFRA] Erro em ${cmd}:`, error);
    await client.createPost({
      channel_id: msg.channel_id,
      root_id: msg.root_id || msg.id,
      message: `❌ Erro em \`${cmd}\`:\n\`\`\`\n${error.message}\n\`\`\``
    });
  }
}

// Inicialização
async function main() {
  console.log('[INFRA] Iniciando Infra Bot...');

  // Obter user_id do bot
  const me = await client.getMe();
  console.log(`[INFRA] Bot ID: ${me.id}`);
  process.env.MM_BOT_USER_ID = me.id;

  // Conectar WebSocket
  const wsClient = new WebSocketClient();
  const wsUrl = process.env.MM_BASE_URL.replace('https://', 'wss://').replace('http://', 'ws://');
  
  wsClient.initialize(wsUrl, process.env.MM_BOT_TOKEN);
  
  wsClient.addMessageListener((event) => {
    if (event.event === 'posted') {
      const post = JSON.parse(event.data.post);
      handleMessage(post);
    }
  });

  console.log('[INFRA] Bot conectado e escutando...');
}

main().catch(console.error);
```

---

### T04 - Testar Localmente
**Esforço:** 15min | **Prioridade:** P0

- [ ] `node index.js` no servidor
- [ ] Postar `@infra help` no MM
- [ ] Verificar resposta
- [ ] Testar `@infra status`
- [ ] Testar `@infra logs 0`

**Dependências:** T03

---

### T05 - Deploy PM2
**Esforço:** 15min | **Prioridade:** P0

- [ ] `pm2 start index.js --name infra-bot`
- [ ] `pm2 save`
- [ ] Verificar `pm2 status`

**Dependências:** T04

---

### T06 - Teste E2E via Claude Desktop
**Esforço:** 30min | **Prioridade:** P1

- [ ] No Claude Desktop, usar MCP MM
- [ ] `mm-genesis: post` → `@infra status`
- [ ] `mm-genesis: get_posts` → ver resultado
- [ ] Simular ciclo code/test:
  1. Claude escreve arquivo via GitHub
  2. Claude posta `@infra test {path}`
  3. Claude lê resultado
  4. Claude ajusta código se necessário

**Dependências:** T05

---

## 6. Estrutura Final

```
pantheon/infra-bot/
├── package.json
├── index.js
├── .env
├── .env.example
└── README.md
```

---

## 7. Variáveis de Ambiente

```bash
# .env.example
MM_BASE_URL=https://mattermost.zaz.vc
MM_BOT_TOKEN=seu_token_aqui
```

---

## 8. Cronograma

| Task | Esforço | Acumulado |
|------|---------|-----------|
| T01 - Criar Bot (manual) | 10min | 10min |
| T02 - Setup Projeto | 15min | 25min |
| T03 - Implementar Bot | 1h | 1h25 |
| T04 - Testar Local | 15min | 1h40 |
| T05 - Deploy PM2 | 15min | 1h55 |
| T06 - Teste E2E | 30min | 2h25 |
| **Buffer** | 35min | **3h** |

**Total estimado: ~3h**

---

## 9. Definition of Done

- [ ] Bot `@infra` criado no MM
- [ ] Bot responde a comandos
- [ ] Comandos `test`, `logs`, `status`, `restart`, `call` funcionam
- [ ] Resultados aparecem no canal
- [ ] Claude Desktop consegue comandar via MCP MM
- [ ] Claude Desktop consegue ler resultados via MCP MM
- [ ] Rodando em PM2

---

## 10. Impacto

Após conclusão desta sprint:

1. **S-PANTHEON-V0-001** pode ser retomada
2. **Desenvolvimento do Prometheus** via Claude Desktop fica viável
3. Qualquer futuro desenvolvimento via Claude tem visibilidade do ciclo completo

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2026-01-02 | Sprint criada - bloqueador de S-PANTHEON-V0-001 |

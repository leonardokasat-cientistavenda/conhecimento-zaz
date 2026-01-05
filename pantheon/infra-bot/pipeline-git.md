# Pipeline GitHub via @infra

> Documentação da arquitetura para operações GitHub através do bot @infra no Mattermost.

## Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ARQUITETURA                                    │
│                                                                             │
│  @infra <comando>                                                           │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │  infra-bot/index.js                                             │        │
│  │                                                                 │        │
│  │  1. Parseia comando                                             │        │
│  │  2. Consulta DMN Router ──────────────────────────────────┐     │        │
│  │       │                                                   │     │        │
│  │       ├── type: "camunda" ──→ startCamundaProcess() ──→ BPMN    │        │
│  │       │                                                   │     │        │
│  │       └── type: "handler" ──→ commands/*.js (legado)      │     │        │
│  │                                                                 │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                      │                                      │
│                                      │ (se Camunda)                         │
│                                      ▼                                      │
│                        ┌─────────────────────────┐                          │
│                        │  BPMN github-ops        │                          │
│                        │                         │                          │
│                        │  Start                  │                          │
│                        │    ↓                    │                          │
│                        │  DMN Task ──────────────┼──→ DMN github-operations │
│                        │    ↓                    │    (operation → topic)   │
│                        │  Service Task           │                          │
│                        │    ↓                    │                          │
│                        │  Notify                 │                          │
│                        │    ↓                    │                          │
│                        │  End                    │                          │
│                        └─────────────────────────┘                          │
│                                      │                                      │
│                                      ▼                                      │
│                        ┌─────────────────────────┐                          │
│                        │  Workers                │                          │
│                        │  (execução + logs CH)   │                          │
│                        └─────────────────────────┘                          │
│                                      │                                      │
│                                      ▼                                      │
│                        ┌─────────────────────────┐                          │
│                        │  Notify Worker          │                          │
│                        │  (resposta no MM)       │                          │
│                        └─────────────────────────┘                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Estratégia de Migração Gradual

O infra-bot possui sistema legado de comandos (`commands/*.js`). Para migração incremental sem breaking changes, o infra-bot consulta a DMN Router **ANTES** de executar qualquer comando.

### Fluxo de Decisão

```
@infra <comando>
       │
       ▼
┌──────────────────────────────────┐
│  DMN Router (commands.json)      │
│                                  │
│  Busca rota para:                │
│  { command: "infra",             │
│    subcommand: "<comando>" }     │
└──────────────────────────────────┘
       │
       ├── Encontrou rota type: "camunda"
       │   → Inicia processo Camunda
       │   → Resposta assíncrona via notify worker
       │
       └── Não encontrou OU type: "handler"
           → Executa commands/*.js (legado)
           → Resposta síncrona
```

### Benefícios

- **Zero breaking change** - comandos existentes continuam funcionando
- **Migração gradual** - adiciona na DMN, funciona via Camunda
- **Coexistência** - legado e novo convivem no mesmo bot
- **Rollback fácil** - remove da DMN, volta pro handler legado

### Exemplo de Migração

Para migrar o comando `github`:

1. Adicionar rota na DMN (`commands.json`):
```json
{
  "id": "slash-infra-github",
  "match": { "type": "slash", "command": "infra", "subcommand": "github" },
  "action": { "type": "camunda", "process": "github-ops" },
  "enabled": true
}
```

2. Criar BPMN `github-ops` no Camunda
3. O infra-bot automaticamente roteia para Camunda

## Modificações no Infra-bot

### Arquivo: `pantheon/infra-bot/index.js`

Adicionar consulta ao DMN Router antes de `executeCommand()`:

```javascript
const dmnRouter = require('../dmn/router');

// ANTES de chamar executeCommand:
const route = dmnRouter.route({
  type: 'slash',
  command: 'infra',
  subcommand: commandName,
  args
});

// Se DMN manda para Camunda, executa lá
if (route.type === 'camunda' && route._matched) {
  const result = await startCamundaProcess(route.process, { 
    commandName, 
    args, 
    context 
  });
  return result;
}

// Senão, usa sistema antigo (commands/*.js)
var result = await executeCommand(commandName, args, fullText, context);
```

### Arquivo: `pantheon/infra-bot/lib/camunda.js` (NOVO)

Funções para integração com Camunda:

| Função | Descrição |
|--------|-----------|
| `startCamundaProcess(processKey, variables)` | Inicia processo via REST API |
| `buildVariables(commandName, args, context)` | Monta variáveis do Camunda |

### Arquivo: `pantheon/infra-bot/lib/github-parser.js` (NOVO)

Parser específico para argumentos do comando github:

| Função | Descrição |
|--------|-----------|
| `parseGithubArgs(args)` | Parseia `owner/repo path content` |
| `parseOwnerRepo(str)` | Extrai owner e repo de `owner/repo` |

## Arquitetura de Duas Camadas DMN

### Camada 1: DMN Pantheon

**Arquivo:** `pantheon/dmn/commands.json`

**Responsabilidade:** Qual processo/handler atende o comando

```json
{
  "id": "slash-infra-github",
  "match": { "type": "slash", "command": "infra", "subcommand": "github" },
  "action": { "type": "camunda", "process": "github-ops" },
  "enabled": true
}
```

### Camada 2: DMN Processo

**Arquivo:** `Zarah-Camunda/Genesis/dmn/github-operations.dmn`

**Responsabilidade:** Como executar dentro do processo (qual worker chamar)

| operation | topic | needsContent | needsSha |
|-----------|-------|--------------|----------|
| create | createGithubFile | true | false |
| replace | createGithubFile | true | true |
| get | getGithubFile | false | false |
| patch | patchGithubFile | true | false |
| delete | deleteGithubFile | false | true |
| list | listGithubFiles | false | false |
| push | pushGithubFiles | true | false |

## Fluxo Detalhado

### Etapa 1: Entrada

```
Usuário digita no Mattermost:
┌────────────────────────────────────────────────────────────────────┐
│ @infra github create ZAZ-vendas/conhecimento-zaz test.md "# Oi"   │
└────────────────────────────────────────────────────────────────────┘

Mattermost envia webhook para:
POST https://zaz.vc/api/infra/webhook
```

### Etapa 2: Infra-bot Recebe

**Arquivo:** `pantheon/infra-bot/index.js`

- Recebe POST do Mattermost
- Extrai: `command="infra"`, `text="github create ZAZ-vendas/..."`
- Parseia: `subcommand="github"`, `args=["create", "ZAZ-vendas/...", ...]`

### Etapa 3: DMN Router (NOVO)

**Arquivo:** `pantheon/dmn/router.js` + `commands.json`

```javascript
Input: {
  type: "slash",
  command: "infra",
  subcommand: "github",
  args: ["create", "ZAZ-vendas/conhecimento-zaz", "test.md", "# Oi"]
}

// Router busca em commands.json
Output: { type: "camunda", process: "github-ops", _matched: true }
```

### Etapa 4: Iniciar Processo Camunda

**Arquivo:** `pantheon/infra-bot/lib/camunda.js`

```
POST http://localhost:8080/engine-rest/process-definition/key/github-ops/start

Body: {
  "variables": {
    "operation": { "value": "create", "type": "String" },
    "owner": { "value": "ZAZ-vendas", "type": "String" },
    "repo": { "value": "conhecimento-zaz", "type": "String" },
    "path": { "value": "test.md", "type": "String" },
    "content": { "value": "# Oi", "type": "String" },
    "channel_id": { "value": "xxx", "type": "String" },
    "user_id": { "value": "yyy", "type": "String" }
  }
}

Resposta imediata ao usuário: "⏳ Processando github create..."
```

### Etapa 5: BPMN Executa

**Arquivo:** `Zarah-Camunda/Genesis/bpmn/github-operations.bpmn`

1. Start Event recebe variáveis
2. DMN Task consulta `github-operations.dmn` → retorna `topic`
3. Service Task executa worker com `topic` dinâmico
4. Notify Task posta resultado no Mattermost
5. End Event

### Etapa 6: Worker Executa

**Arquivo:** `orquestrador-Zarah/worker/genesis/github/index.js`

1. Recebe task do Camunda (polling)
2. Extrai variáveis: owner, repo, path, content
3. Chama GitHub API via Octokit
4. Loga no ClickHouse (`genesis.worker_logs`)
5. Completa task com resultado

### Etapa 7: Notificação

**Arquivo:** `orquestrador-Zarah/worker/genesis/notify/index.js`

```
┌────────────────────────────────────────────────────────────────────┐
│ ✅ Arquivo criado com sucesso!                                     │
│ 📄 test.md                                                         │
│ 🔗 https://github.com/ZAZ-vendas/conhecimento-zaz/blob/main/test.md│
│ 📝 Commit: abc123                                                  │
└────────────────────────────────────────────────────────────────────┘
```

## Comandos Disponíveis

```bash
@infra github create <owner/repo> <path> "<conteúdo>"
@infra github replace <owner/repo> <path> "<conteúdo novo>"
@infra github get <owner/repo> <path>
@infra github patch <owner/repo> <path> "<old>" "<new>"
@infra github delete <owner/repo> <path>
@infra github list <owner/repo> <path>
@infra github push <owner/repo> "<msg>" <file1>:<content1> <file2>:<content2>
```

## Workers

| Topic | Status | Descrição |
|-------|--------|-----------|
| createGithubFile | ✅ Implementado | Cria ou substitui arquivo |
| getGithubFile | ✅ Implementado | Lê conteúdo de arquivo |
| patchGithubFile | ❌ Pendente | str_replace cirúrgico |
| deleteGithubFile | ❌ Pendente | Remove arquivo |
| listGithubFiles | ❌ Pendente | Lista diretório |
| pushGithubFiles | ❌ Pendente | Múltiplos arquivos em 1 commit |

## Logs

Todos os workers logam no ClickHouse:

**Tabela:** `genesis.worker_logs`

**Campos:**
- `trace_id`: ID único da execução
- `topic`: Nome do worker
- `duration_ms`: Tempo de execução
- `status`: success | error
- `error_message`: Mensagem de erro (se houver)
- `metadata`: JSON com detalhes da operação

## Componentes

| Componente | Localização | Status |
|------------|-------------|--------|
| DMN Pantheon | `pantheon/dmn/commands.json` | ✅ Existe |
| DMN Router | `pantheon/dmn/router.js` | ✅ Existe |
| Infra-bot | `pantheon/infra-bot/index.js` | 🔄 Modificar |
| Camunda lib | `pantheon/infra-bot/lib/camunda.js` | ❌ Criar |
| GitHub parser | `pantheon/infra-bot/lib/github-parser.js` | ❌ Criar |
| DMN Processo | `Zarah-Camunda/Genesis/dmn/github-operations.dmn` | ❌ Criar |
| BPMN | `Zarah-Camunda/Genesis/bpmn/github-operations.bpmn` | ❌ Criar |
| Workers GitHub | `worker/genesis/github/index.js` | 🔄 Expandir |
| Worker Notify | `worker/genesis/notify/index.js` | ✅ Existe |

## Ordem de Implementação

```
BKL-GH-010 ─→ BKL-GH-011 ─→ BKL-GH-012 ─→ BKL-GH-001
    │             │             │             │
    │             │             │             └─ Rota DMN Pantheon
    │             │             └─ Parser args github
    │             └─ lib/camunda.js
    └─ Derivação no index.js

         ─→ BKL-GH-002 ─→ BKL-GH-003 ─→ BKL-GH-004...007
                │             │              │
                │             │              └─ Workers novos
                │             └─ BPMN github-ops
                └─ DMN github-operations

         ─→ BKL-GH-008 ─→ BKL-GH-009 ─→ BKL-GH-013
                │             │              │
                │             │              └─ README infra-bot
                │             └─ README worker
                └─ Testes E2E
```

## Referências

- [Pantheon README](../README.md)
- [DMN Commands](../dmn/README.md)
- [Infra-bot README](./README.md)
- [Worker GitHub README](../../worker/genesis/github/README.md)

# Pipeline GitHub via @infra

> Documentação da arquitetura para operações GitHub através do bot @infra no Mattermost.

## Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ARQUITETURA                                    │
│                                                                             │
│  @infra github <op> <args>                                                  │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────────────┐                                                    │
│  │ DMN Pantheon        │  ← "Qual processo atende?"                         │
│  │ (commands.json)     │                                                    │
│  └──────────┬──────────┘                                                    │
│             │ processo: github-ops                                          │
│             ▼                                                               │
│  ┌─────────────────────┐                                                    │
│  │ BPMN github-ops     │  ← Orquestração (limpo, genérico)                  │
│  │                     │                                                    │
│  │  Start              │                                                    │
│  │    ↓                │                                                    │
│  │  DMN Task ──────────┼───→ DMN github-operations.dmn                      │
│  │    ↓                │     "Como executar?" → topic                       │
│  │  Service Task       │     (topic dinâmico)                               │
│  │    ↓                │                                                    │
│  │  Notify             │                                                    │
│  │    ↓                │                                                    │
│  │  End                │                                                    │
│  └──────────┬──────────┘                                                    │
│             │                                                               │
│             ▼                                                               │
│  ┌─────────────────────┐                                                    │
│  │ Workers             │  ← Execução (reutilizáveis)                        │
│  │ (github/index.js)   │     + Logs → ClickHouse                            │
│  └─────────────────────┘                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

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

### Etapa 3: DMN Router

**Arquivo:** `pantheon/dmn/router.js` + `commands.json`

```javascript
Input: {
  type: "slash",
  command: "infra",
  subcommand: "github",
  args: ["create", "ZAZ-vendas/conhecimento-zaz", "test.md", "# Oi"]
}

Output: { type: "camunda", process: "github-ops" }
```

### Etapa 4: Iniciar Processo Camunda

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

Resposta imediata: "⏳ Processando github create..."
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

| Componente | Localização |
|------------|-------------|
| DMN Pantheon | `pantheon/dmn/commands.json` |
| DMN Router | `pantheon/dmn/router.js` |
| DMN Processo | `Zarah-Camunda/Genesis/dmn/github-operations.dmn` |
| BPMN | `Zarah-Camunda/Genesis/bpmn/github-operations.bpmn` |
| Workers | `orquestrador-Zarah/worker/genesis/github/index.js` |
| Infra-bot | `orquestrador-Zarah/pantheon/infra-bot/` |

## Referências

- [Pantheon README](../../README.md)
- [DMN Commands](../dmn/README.md)
- [Worker GitHub README](../../../worker/genesis/github/README.md)

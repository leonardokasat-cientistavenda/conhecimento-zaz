# Pantheon v2.0 - Specs para Futuros Backlogs

---

```yaml
documento: Specs para Futuros Backlogs
versao: "1.0"
data: "2026-01-06"
status: Rascunho
contexto: Sessão epistemológica preparatória para MS_Pantheon
```

---

## 1. Objetivo Final

**Pantheon** é o ecossistema onde os agentes de IA convivem no Mattermost.

O objetivo é permitir a **migração de LLM externos operando por MCP servers, para LLM 100% internas dentro do MM**.

```
HOJE (LLM Externo):
┌─────────────┐
│ Claude      │ ───MCP───► MongoDB
│ Desktop     │ ───MCP───► GitHub
│ (externo)   │ ───MCP───► MM (mm-prometheus:*)
└─────────────┘
      │
      │ Lento, erra, lota contexto
      ▼
┌─────────────┐
│ Pantheon    │ ───Bot───► @infra (determinístico)
│ (interno)   │
└─────────────┘

FUTURO (LLM Interno):
┌─────────────┐
│ Claude      │ ───MM───► @genesis bootstrap
│ Desktop     │                    │
│ (só MM!)    │                    ▼
└─────────────┘           ┌─────────────┐
                          │ LLM Interno │ ───Camunda───► Workers
                          │ (Pantheon)  │ ───MongoDB───► Dados
                          │             │ ───GitHub────► Código
                          └─────────────┘

BENEFÍCIOS:
• Claude só usa MM (um MCP)
• Toda inteligência DENTRO do MM
• Contexto não lota (respostas concisas)
• Rastreabilidade total
• Velocidade (workers determinísticos)
```

---

## 2. Arquitetura Atual (Mapeada)

### 2.1 Fluxo de Mensagens

```
Mattermost
    │
    │ Outgoing Webhook
    ▼
pantheon/api/routes/webhook.js  ◄─── QUEM RECEBE O WEBHOOK
    │
    ├── @genesis, @prometheus, @asclepius, @atlas, @kairos
    │       └── executor.js (streaming LLM)
    │
    └── @infra (interceptado)
            │
            ├── DMN Router (commands.json)
            │       │
            │       ├── type: handler → infra-bot/commands/*.js
            │       ├── type: camunda → Camunda BPMN
            │       └── type: llm → executor.js (fallback IA)
            │
            └── infra-bot/ (PROCESSO SEPARADO - PM2)
                    └── 13KB index.js + 70KB commands/
```

### 2.2 Processos PM2 Atuais

| Processo | Porta | Função |
|----------|-------|--------|
| `pantheon` | 3100 | Webhook principal, agentes LLM |
| `infra-bot` | 3101 | Bot @infra separado |

### 2.3 Estrutura de Código (Orquestrador-Zarah)

```
pantheon/
├── index.js                    # Entry point
├── api/
│   ├── server.js               # Express server
│   └── routes/
│       └── webhook.js          # RECEBE OUTGOING WEBHOOK (11KB)
├── agents/
│   └── infra.js                # Handler @infra
├── core/
│   └── executor.js             # Streaming LLM
├── dmn/
│   ├── router.js               # DMN Router (4KB)
│   ├── commands.json           # Rotas (11KB)
│   └── sync.js                 # Sincronização
├── config/
├── services/
└── prompts/

pantheon/infra-bot/             # PROCESSO SEPARADO
├── index.js                    # Entry point (13KB)
├── commands/
│   ├── index.js                # Registro de comandos
│   ├── clickhouse.js           # 10KB
│   ├── metrics.js              # 13KB
│   ├── mm-admin.js             # 20KB ← MAIOR
│   ├── env.js                  # 6KB
│   ├── files.js                # 4KB
│   ├── git.js                  # 2KB
│   ├── nginx.js                # 2KB
│   ├── pm2.js                  # 2KB
│   ├── system.js               # 4KB
│   └── dmn.js                  # 3KB
└── lib/
    ├── config.js
    ├── helpers.js
    ├── clickhouse.js
    └── camunda.js

genesis/
├── lib/
├── services/
└── workers/
```

### 2.4 DMN Router Atual (commands.json)

```json
{
  "version": "1.3.0",
  "routes": [
    { "match": { "command": "infra", "subcommand": "github" }, "action": { "type": "camunda", "process": "github-ops" } },
    { "match": { "command": "infra", "subcommand": "status" }, "action": { "type": "handler", "handler": "status" } },
    { "match": { "command": "infra", "subcommand": "logs" }, "action": { "type": "handler", "handler": "logs" } },
    { "match": { "command": "infra", "subcommand": "*" }, "action": { "type": "llm", "model": "sonnet" } }
  ]
}
```

---

## 3. Problemas Identificados

### P1: Logging Incompleto

**Sintoma:** Não conseguimos rastrear end-to-end o que aconteceu com uma mensagem.

**Causa:** Logging inconsistente, sem trace_id unificado, sem padrão de entrada/saída.

**Solução Proposta:**

```javascript
// PADRÃO OBRIGATÓRIO EM TODO CÓDIGO PANTHEON

// 1. ENTRADA (recebeu request/mensagem)
logger.info({ trace_id, source, input_preview }, 'Iniciando processamento');

// 2. SAÍDA (terminou e vai responder)
logger.info({ trace_id, duration_ms, output_preview }, 'Processamento concluído');

// 3. ERRO (se falhou)
logger.error({ trace_id, error: err.message, stack }, 'Erro no processamento');
```

**Invariante:** `INV-LOGGING` - Todo código Pantheon DEVE logar entrada e saída via pino+clickhouse com trace_id.

---

### P2: Sem Feature Flags

**Sintoma:** Não tem como testar versão nova sem afetar produção.

**Causa:** `webhook.js` processa direto, não tem DMN de roteamento por contexto.

**Solução Proposta:**

```
webhook.js → DMN Feature Router → decide versão
                 │
                 │ Input: { user_id, channel_id, team_id }
                 │
                 ├── v1 (produção) → código atual
                 ├── v2 (beta) → código novo
                 └── canary (5%) → código experimental

DMN permite:
• leonardo.kasat → sempre v2
• canal #dev → v2
• team genesis → canary
• resto → v1
```

**Onde inserir:** Após `webhook.js` receber o outgoing webhook, ANTES de processar.

---

### P3: @infra Gigantesco (Bot Monolítico)

**Sintoma:** Um único bot com ~80KB de código, difícil de manter.

**Causa:** Todas as capacidades (@infra status, @infra ch-query, @infra mm-admin) em um único processo.

**Tamanho Atual:**

| Arquivo | Tamanho | Domínio |
|---------|---------|---------|
| index.js | 13KB | Core |
| commands/mm-admin.js | 20KB | Mattermost |
| commands/metrics.js | 13KB | ClickHouse |
| commands/clickhouse.js | 10KB | ClickHouse |
| commands/env.js | 6KB | Ambiente |
| commands/files.js | 4KB | Arquivos |
| commands/system.js | 4KB | Sistema |
| commands/git.js | 2KB | Git |
| commands/pm2.js | 2KB | PM2 |
| commands/nginx.js | 2KB | Nginx |
| **TOTAL** | **~80KB** | |

**Solução Proposta (1 bot por domínio):**

| Bot | Comandos | Domínio |
|-----|----------|---------|
| @infra-pm2 | status, logs, restart | PM2 |
| @infra-git | git-status, git-pull, git-log | Git |
| @infra-ch | ch-tables, ch-query, ch-logs | ClickHouse |
| @infra-mm | mm-admin (criar canais, webhooks) | Mattermost |
| @infra-files | file, file-edit, file-append | Arquivos |
| @infra-env | env, env-set, env-del | Ambiente |

**Benefícios:**
- Código menor e focado
- Deploy independente
- Falha isolada (se @infra-ch cai, @infra-pm2 continua)
- Permissões granulares

---

### P4: Dois Processos Desconectados

**Sintoma:** `pantheon` (porta 3100) e `infra-bot` (porta 3101) são processos separados.

**Causa:** Evolução orgânica, @infra começou separado.

**Problemas:**
- Duplicação de código (logger, config, DMN)
- Portas diferentes
- Logging não unificado
- Manutenção dobrada

**Solução Proposta:** Unificar em um único processo com módulos.

---

### P5: @genesis Bootstrap Não Implementado

**Contexto:** PROTOCOLO_AGENT_LOOP v2.0 define que @genesis deve fornecer contexto via DMN Router.

**O que falta:**
1. @genesis bot implementado
2. DMN Router retornar contexto bootstrap (sprint, capacidades, instruções)
3. Worker para buscar sprint_session do MongoDB
4. Instruções LLM inline no contexto

**Referência:** docs/04_S/PROTOCOLO_AGENT_LOOP.md

---

## 4. Backlog Items Sugeridos

| ID | Título | Prioridade | Esforço | Dependência |
|----|--------|------------|---------|-------------|
| BKL-PANTHEON-020 | Padrão Logging (pino+clickhouse, trace_id) | 🔴 | 4h | - |
| BKL-PANTHEON-021 | DMN Feature Router (após webhook) | 🔴 | 3h | P020 |
| BKL-PANTHEON-022 | Separar @infra em micro-bots | 🟡 | 8h | P020 |
| BKL-PANTHEON-023 | Unificar pantheon + infra-bot | 🟡 | 4h | P022 |
| BKL-PANTHEON-024 | @genesis bootstrap (DMN + MongoDB) | 🔴 | 6h | P020, P021 |
| BKL-PANTHEON-025 | Migrar capacidades LLM → determinístico | 🟡 | ongoing | P024 |

---

## 5. Invariantes Propostas para MS_Pantheon

| Invariante | Descrição |
|------------|-----------|
| **INV-LOGGING** | Todo código loga entrada/saída via pino+clickhouse com trace_id |
| **INV-DMN-SSOT** | DMN Router é fonte única de verdade para roteamento |
| **INV-FEATURE-FLAGS** | Toda mudança major passa por feature flag antes de produção |
| **INV-BOT-FOCADO** | Cada bot tem responsabilidade única (Single Responsibility) |
| **INV-WEBHOOK-UNICO** | Um único endpoint recebe todos os webhooks, DMN roteia |

---

## 6. Arquitetura Alvo (v2)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA PANTHEON v2.0                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Mattermost                                                                 │
│      │                                                                      │
│      │ Outgoing Webhook (único)                                             │
│      ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ webhook.js                                                          │    │
│  │ • Log entrada (trace_id)                                            │    │
│  │ • Validar token                                                     │    │
│  └───────────────────────────────┬─────────────────────────────────────┘    │
│                                  │                                          │
│                                  ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ DMN Feature Router                                                  │    │
│  │ • Input: user_id, channel_id, team_id                               │    │
│  │ • Output: versão (v1, v2, canary)                                   │    │
│  └───────────────────────────────┬─────────────────────────────────────┘    │
│                                  │                                          │
│                                  ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ DMN Command Router                                                  │    │
│  │ • Input: trigger_word, text                                         │    │
│  │ • Output: bot, action (handler | camunda | llm)                     │    │
│  └───────────────────────────────┬─────────────────────────────────────┘    │
│                                  │                                          │
│              ┌───────────────────┼───────────────────┐                      │
│              │                   │                   │                      │
│              ▼                   ▼                   ▼                      │
│       ┌──────────┐        ┌──────────┐        ┌──────────┐                  │
│       │ Handler  │        │ Camunda  │        │   LLM    │                  │
│       │ (rápido) │        │ (BPMN)   │        │(streaming)│                  │
│       └────┬─────┘        └────┬─────┘        └────┬─────┘                  │
│            │                   │                   │                        │
│            └───────────────────┼───────────────────┘                        │
│                                │                                            │
│                                ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Response Handler                                                    │    │
│  │ • Formatar resposta                                                 │    │
│  │ • Log saída (trace_id, duration)                                    │    │
│  │ • Postar no MM                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  BOTS (módulos, não processos):                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│  │@genesis│ │@infra- │ │@infra- │ │@infra- │ │@kairos │ │@atlas  │         │
│  │        │ │pm2     │ │ch      │ │mm      │ │        │ │        │         │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Próximos Passos

1. **M0-M4 para MS_Pantheon** - Define conceito, fronteiras, arquitetura alvo
2. **Criar backlog items** - Um para cada problema
3. **Priorizar** - Logging primeiro (habilita debug de todo o resto)
4. **Sprint** - Executar iterativamente

---

## 8. Referências

| Documento | Path |
|-----------|------|
| PROTOCOLO_AGENT_LOOP v2.0 | docs/04_S/PROTOCOLO_AGENT_LOOP.md |
| BKL-PANTHEON-V1 | _backlog/BKL-PANTHEON-V1_Arquitetura_Camunda.md |
| DMN Router | Orquestrador-Zarah/pantheon/dmn/commands.json |
| Webhook Handler | Orquestrador-Zarah/pantheon/api/routes/webhook.js |
| Infra Bot | Orquestrador-Zarah/pantheon/infra-bot/ |

---

## 9. Contexto da Sessão

**Data:** 2026-01-06
**Participantes:** Leonardo + Claude (Prometheus)
**Objetivo:** Preparar contexto para M0-M4 do MS_Pantheon

**O que foi feito:**
1. Mapeamento completo da arquitetura atual
2. Identificação de 5 problemas principais
3. Proposta de soluções para cada problema
4. Definição de backlog items
5. Esboço da arquitetura alvo v2

**Próximo:** Executar M0-M4 para MS_Pantheon

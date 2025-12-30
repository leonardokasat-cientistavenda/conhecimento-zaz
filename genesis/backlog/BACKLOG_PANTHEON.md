# Backlog Pantheon - Multi-Agent Orchestration

> **Sistema:** GENESIS
> **Componente:** Pantheon (Multi-Agent)
> **Versão:** 3.0 (roadmap consolidado)
> **Data:** 2025-12-30

---

## Visão Geral

Pantheon é a arquitetura que permite agentes inteligentes no Mattermost,
começando com @genesis e evoluindo para um ecossistema multi-agente.

**Filosofia:** Começar simples, validar, escalar.

---

## Roadmap

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           ROADMAP PANTHEON                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  V0 ────► V0.1 ────► V0.2 ────► V1 ────► V2                            │
│   │        │          │         │        │                              │
│   │        │          │         │        └─► Multi-agentes              │
│   │        │          │         │            Camunda/DMN                │
│   │        │          │         │                                       │
│   │        │          │         └─► MCP Tools                           │
│   │        │          │             GitHub, MongoDB, MM                 │
│   │        │          │                                                 │
│   │        │          └─► Seleção de modelo                             │
│   │        │              Sonnet, Haiku, Opus                           │
│   │        │                                                            │
│   │        └─► Upload arquivos                                          │
│   │            Imagens, PDFs, código                                    │
│   │                                                                     │
│   └─► Chat + Contexto + Streaming + Web Search                          │
│       Claude Desktop no MM                                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## V0 - Claude Desktop no MM

> **Status:** 🟡 Em desenvolvimento
> **Spec:** `genesis/specs/PANTHEON_V0_SPEC.md`
> **Esforço:** ~8h

### Escopo

| Capacidade | Descrição | Implementação |
|------------|-----------|---------------|
| Chat texto | @genesis responde | Anthropic API |
| Contexto | Histórico canal/thread | MM API |
| Streaming | Resposta em tempo real | Edit post loop |
| Web Search | Busca na internet | Anthropic built-in |
| Threads | Responde em thread | root_id MM |
| Markdown | Formatação rica | MM nativo |

### Comparativo com Claude Desktop

| Capacidade | Claude Desktop | Pantheon V0 |
|------------|----------------|-------------|
| Chat | ✅ | ✅ |
| Contexto | ✅ | ✅ |
| Streaming | ✅ | ✅ |
| Web Search | ✅ | ✅ |
| Threads | ❌ | ✅ ⭐ |
| Multi-usuário | ❌ | ✅ ⭐ |
| Upload arquivos | ✅ | ❌ |
| MCP Tools | ✅ | ❌ |

### Entregáveis

- `pantheon/api/server.js` - Express server
- `pantheon/api/routes/webhook.js` - Handler
- `pantheon/core/contextManager.js` - Histórico MM
- `pantheon/core/streamer.js` - Edit post loop
- `pantheon/services/anthropic/client.js` - API + web search
- `pantheon/services/mattermost/*` - MM API client

---

## V0.1 - Upload de Arquivos

> **Status:** 📋 Planejado
> **Dependência:** V0 completo
> **Esforço:** ~4h

### Escopo

| Capacidade | Descrição |
|------------|-----------|
| Upload imagens | Análise visual (Claude Vision) |
| Upload PDFs | Extração e análise de texto |
| Upload código | Análise e review |
| Download | Bot envia arquivos gerados |

### Fluxo

```
1. User posta arquivo + @genesis "analisa isso"
2. MM webhook inclui file_ids
3. Pantheon baixa arquivo via MM API
4. Converte para base64
5. Envia para Anthropic com type: "image" ou document
6. Claude analisa e responde
```

### Entregáveis

- `pantheon/core/fileHandler.js` - Download/upload MM
- `pantheon/services/anthropic/vision.js` - Chamada com imagens
- Atualização do webhook handler

### Limitações

- Tamanho máximo: 20MB (limite Anthropic)
- Formatos imagem: PNG, JPEG, GIF, WebP
- PDFs: Convertidos para imagem por página

---

## V0.2 - Seleção de Modelo

> **Status:** 📋 Planejado
> **Dependência:** V0.1 completo
> **Esforço:** ~2h

### Escopo

| Capacidade | Descrição |
|------------|-----------|
| Modelo padrão | Sonnet (atual) |
| Comando modelo | `@genesis /haiku pergunta rápida` |
| Modelo por canal | Config por canal no MongoDB |

### Modelos Disponíveis

| Modelo | Comando | Uso |
|--------|---------|-----|
| claude-sonnet-4-20250514 | (padrão) | Geral |
| claude-haiku-3-5-20241022 | /haiku | Rápido, barato |
| claude-opus-4-1-20250805 | /opus | Complexo |

### Fluxo

```
@genesis /haiku qual a capital da França?
         ^^^^^^
         Detecta comando, usa Haiku
```

### Entregáveis

- `pantheon/core/modelSelector.js` - Parser de comandos
- `pantheon/config/models.js` - Configuração de modelos
- Collection `genesis.channel_config` - Config por canal

---

## V1 - MCP Tools

> **Status:** 📋 Planejado
> **Dependência:** V0.2 completo
> **Esforço:** ~14h
> **Spec:** `genesis/specs/PANTHEON_V1_SPEC.md` (a criar)

### Escopo

| Tool | Operações |
|------|-----------|
| **GitHub** | get_file, list_files, create_file, search |
| **MongoDB** | find, findOne, aggregate, insertOne |
| **Mattermost** | search_posts, get_user, get_channel |

### Exemplos

```
[User]: @genesis qual o status do sprint atual?
[genesis]: 🔧 Consultando MongoDB...
           Sprint S-PANTHEON-V0-001: 80% completo

[User]: @genesis lê o GENESIS.md e resume
[genesis]: 🔧 Buscando no GitHub...
           GENESIS é um sistema de inteligência híbrida...

[User]: @genesis quem mais postou hoje?
[genesis]: 🔧 Consultando Mattermost...
           Leonardo: 23 mensagens
```

### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    TOOL REGISTRY                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  GitHub  │ │ MongoDB  │ │Mattermost│ │ (futuras)│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    TOOL EXECUTOR                            │
│           (loop até stop_reason != tool_use)                │
└─────────────────────────────────────────────────────────────┘
```

### Entregáveis

- `pantheon/core/toolRegistry.js` - Registro de tools
- `pantheon/core/toolExecutor.js` - Loop de execução
- `pantheon/tools/github.js` - GitHub tool
- `pantheon/tools/mongodb.js` - MongoDB tool
- `pantheon/tools/mattermost.js` - MM tool

---

## V2 - Multi-Agentes + Camunda

> **Status:** 📋 Planejado
> **Dependência:** V1 completo
> **Esforço:** ~20h
> **Spec:** `genesis/specs/PANTHEON_V2_SPEC.md` (a criar)

### Agentes

| Agente | Propósito | Modelo |
|--------|-----------|--------|
| **@genesis** | Sistema principal | Sonnet |
| **@prometheus** | CI/CD, deploy | Sonnet |
| **@asclepius** | Gestão de produtos | Sonnet |
| **@atlas** | Gestão de backlog | Haiku |
| **@kairos** | Gestão de sprints | Haiku |

### Escopo

| Capacidade | Descrição |
|------------|-----------|
| Multi-bot | Cada @agente com personalidade |
| System prompts | Específico por agente |
| Roteamento | DMN decide fluxo |
| Workflows | BPMN para processos complexos |
| Handoff | Agente passa para outro |

### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        MATTERMOST                           │
│   @genesis  @prometheus  @asclepius  @atlas  @kairos        │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    ROUTER (DMN)                             │
│              Decide qual agente responde                    │
└─────────────────────────────────────────────────────────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐
      │  Rápido  │  │ Camunda  │  │ Handoff  │
      │ (direto) │  │  (BPMN)  │  │ (outro)  │
      └──────────┘  └──────────┘  └──────────┘
```

### Entregáveis

- `pantheon/config/agents/*.md` - System prompts
- `pantheon/core/router.js` - Roteamento por @menção
- `pantheon/services/camunda/client.js` - Integração
- `camunda/dmn/pantheon_routing.dmn` - Regras
- `camunda/bpmn/agent_loop.bpmn` - Workflow

---

## Resumo de Esforço

| Versão | Escopo | Esforço | Acumulado |
|--------|--------|---------|-----------|
| V0 | Chat + Web Search | ~8h | 8h |
| V0.1 | Upload arquivos | ~4h | 12h |
| V0.2 | Seleção modelo | ~2h | 14h |
| V1 | MCP Tools | ~14h | 28h |
| V2 | Multi-agentes | ~20h | 48h |

---

## Sprints

| Sprint | Versão | Status |
|--------|--------|--------|
| S-PANTHEON-V0-001 | V0 | 🟡 Em andamento |
| S-PANTHEON-V0.1-001 | V0.1 | 📋 Planejado |
| S-PANTHEON-V0.2-001 | V0.2 | 📋 Planejado |
| S-PANTHEON-V1-001 | V1 | 📋 Planejado |
| S-PANTHEON-V2-001 | V2 | 📋 Planejado |

---

## Referências

| Documento | Path |
|-----------|------|
| Spec V0 | `genesis/specs/PANTHEON_V0_SPEC.md` |
| Spec Original (S029) | `_drafts/S029_M4_MS_Pantheon_Spec.md` |
| Sprint V0 | `genesis/sprints/S-PANTHEON-V0-001.md` |
| Código | `Orquestrador-Zarah/pantheon/` |
| Credenciais | `genesis/config/panteao_credenciais.json` |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-19 | Backlog original (BKL-030 a BKL-035) |
| 2.0 | 2025-12-29 | Revisão. Simplificação arquitetura. |
| 3.0 | 2025-12-30 | Roadmap consolidado V0→V2. Specs por versão. |

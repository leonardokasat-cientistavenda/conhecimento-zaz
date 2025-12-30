# Backlog Pantheon - Multi-Agent Orchestration

> **Sistema:** GENESIS
> **Componente:** Pantheon (Multi-Agent)
> **Versão:** 4.0 (roadmap completo até V2)
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
│  V0 ───► V0.1 ───► V0.2 ───► V1 ───► V1.1 ───► V1.2 ───► V2            │
│   │       │         │        │        │         │         │             │
│   │       │         │        │        │         │         └─► Multi-agent│
│   │       │         │        │        │         │             Camunda    │
│   │       │         │        │        │         │             WA/Telegram│
│   │       │         │        │        │         │                        │
│   │       │         │        │        │         └─► Memory               │
│   │       │         │        │        │             Persistente          │
│   │       │         │        │        │                                  │
│   │       │         │        │        └─► Extended Thinking              │
│   │       │         │        │            Deep reasoning                 │
│   │       │         │        │                                           │
│   │       │         │        └─► MCP Tools                               │
│   │       │         │            GitHub, MongoDB, MM                     │
│   │       │         │                                                    │
│   │       │         └─► Seleção de modelo                                │
│   │       │             Sonnet, Haiku, Opus                              │
│   │       │                                                              │
│   │       └─► Upload arquivos                                            │
│   │           Imagens, PDFs, código                                      │
│   │                                                                      │
│   └─► Chat + Contexto + Streaming + Web Search                           │
│       Claude Desktop no MM                                               │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                    ▲ MM "TININDO" - FEATURE COMPLETE ▲                   │
│                           (após V1.2)                                    │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Comparativo Final (Após V1.2)

| Capacidade | Claude Desktop | Pantheon V1.2 |
|------------|----------------|---------------|
| Chat + Streaming | ✅ | ✅ |
| Web Search | ✅ | ✅ |
| Upload arquivos | ✅ | ✅ |
| Seleção modelo | ✅ | ✅ |
| Extended thinking | ✅ | ✅ |
| Memory | ✅ | ✅ |
| GitHub | ✅ | ✅ |
| MongoDB | ❌ | ✅ ⭐ |
| Mattermost | ❌ | ✅ ⭐ |
| Threads | ❌ | ✅ ⭐ |
| Multi-usuário | ❌ | ✅ ⭐ |
| Self-hosted | ❌ | ✅ ⭐ |
| Code execution | ✅ | ❌ |
| Artifacts | ✅ | ❌ |

**V1.2 ≈ 90% Claude Desktop + vantagens exclusivas de colaboração**

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

### Entregáveis

- `pantheon/core/modelSelector.js` - Parser de comandos
- `pantheon/config/models.js` - Configuração de modelos

---

## V1 - MCP Tools

> **Status:** 📋 Planejado
> **Dependência:** V0.2 completo
> **Esforço:** ~16h
> **Spec:** `genesis/specs/PANTHEON_V1_SPEC.md`

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
```

### Entregáveis

- `pantheon/core/toolRegistry.js` - Registro de tools
- `pantheon/core/toolExecutor.js` - Loop de execução
- `pantheon/tools/github.js` - GitHub tool
- `pantheon/tools/mongodb.js` - MongoDB tool
- `pantheon/tools/mattermost.js` - MM tool

---

## V1.1 - Extended Thinking

> **Status:** 📋 Planejado
> **Dependência:** V1 completo
> **Esforço:** ~2h

### Escopo

| Capacidade | Descrição |
|------------|-----------|
| Deep reasoning | Claude "pensa" antes de responder |
| Comando | `@genesis /think [pergunta complexa]` |
| Budget | Configurável (default 10k tokens) |

### Implementação

```javascript
// Flag na chamada Anthropic
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  messages,
  thinking: {
    type: "enabled",
    budget_tokens: 10000
  }
});
```

### Entregáveis

- `pantheon/core/thinkingMode.js` - Parser do comando /think
- Atualização do Anthropic client

---

## V1.2 - Memory

> **Status:** 📋 Planejado
> **Dependência:** V1.1 completo
> **Esforço:** ~6h

### Escopo

| Capacidade | Descrição |
|------------|-----------|
| Memory por usuário | Lembra preferências entre sessões |
| Memory por canal | Contexto específico do canal |
| Memory controls | `/remember X`, `/forget X`, `/memories` |

### Arquitetura

```
Collection: genesis.memories
{
  user_id: "abc123",
  channel_id: "xyz789",      // opcional
  type: "preference",        // preference, fact, instruction
  content: "Prefere respostas concisas",
  created_at: ISODate,
  expires_at: ISODate        // opcional, para facts temporários
}
```

### Comandos

```
@genesis /remember Meu nome é Leonardo
@genesis /remember Prefiro respostas curtas
@genesis /forget Prefiro respostas curtas
@genesis /memories
```

### Entregáveis

- `pantheon/core/memoryManager.js` - CRUD de memórias
- `pantheon/core/commandParser.js` - Parser de /comandos
- Collection `genesis.memories` no MongoDB

---

## V2 - Multi-Agentes + Camunda + Canais Externos

> **Status:** 📋 Planejado
> **Dependência:** V1.2 completo (MM "tinindo")
> **Esforço:** ~24h
> **Spec:** `genesis/specs/PANTHEON_V2_SPEC.md` (a criar)

### Agentes

| Agente | Propósito | Modelo |
|--------|-----------|--------|
| **@genesis** | Sistema principal | Sonnet |
| **@prometheus** | CI/CD, deploy | Sonnet |
| **@asclepius** | Gestão de produtos | Sonnet |
| **@atlas** | Gestão de backlog | Haiku |
| **@kairos** | Gestão de sprints | Haiku |

### Canais Externos

| Canal | Integração |
|-------|------------|
| WhatsApp | Via Evolution API ou Z-API |
| Telegram | Bot API |
| Home Assistant | REST API |

### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│              CANAIS EXTERNOS                                │
│   WhatsApp │ Telegram │ Home Assistant │ API               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    GATEWAY                                  │
│                 (Normalização)                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              MATTERMOST (SSOT/Consciência)                  │
│   @genesis │ @prometheus │ @asclepius │ @atlas │ @kairos   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ROUTER (DMN)                             │
│              Decide qual agente responde                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │  Rápido  │  │ Camunda  │  │ Handoff  │
       │ (direto) │  │  (BPMN)  │  │ (outro)  │
       └──────────┘  └──────────┘  └──────────┘
```

### Entregáveis

- `pantheon/config/agents/*.md` - System prompts por agente
- `pantheon/core/router.js` - Roteamento por @menção
- `pantheon/gateway/*` - Normalizers por canal
- `pantheon/services/camunda/client.js` - Integração Camunda
- `camunda/dmn/pantheon_routing.dmn` - Regras de roteamento
- `camunda/bpmn/agent_loop.bpmn` - Workflow

---

## Resumo de Esforço

| Versão | Escopo | Esforço | Acumulado |
|--------|--------|---------|-----------|
| V0 | Chat + Contexto + Streaming + Web Search | ~8h | 8h |
| V0.1 | Upload arquivos | ~4h | 12h |
| V0.2 | Seleção modelo | ~2h | 14h |
| V1 | MCP Tools | ~16h | 30h |
| V1.1 | Extended Thinking | ~2h | 32h |
| V1.2 | Memory | ~6h | 38h |
| | **MM "TININDO"** | | **38h** |
| V2 | Multi-agentes + Camunda | ~24h | 62h |

---

## Sprints

| Sprint | Versão | Status |
|--------|--------|--------|
| S-PANTHEON-V0-001 | V0 | 🟡 Em andamento |
| S-PANTHEON-V0.1-001 | V0.1 | 📋 Planejado |
| S-PANTHEON-V0.2-001 | V0.2 | 📋 Planejado |
| S-PANTHEON-V1-001 | V1 | 📋 Planejado |
| S-PANTHEON-V1.1-001 | V1.1 | 📋 Planejado |
| S-PANTHEON-V1.2-001 | V1.2 | 📋 Planejado |
| S-PANTHEON-V2-001 | V2 | 📋 Planejado |

---

## Referências

| Documento | Path |
|-----------|------|
| Spec V0 | `genesis/specs/PANTHEON_V0_SPEC.md` |
| Spec V1 | `genesis/specs/PANTHEON_V1_SPEC.md` |
| Spec Original (S029) | `_drafts/S029_M4_MS_Pantheon_Spec.md` |
| Código | `Orquestrador-Zarah/pantheon/` |
| Credenciais | `genesis/config/panteao_credenciais.json` |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-19 | Backlog original (BKL-030 a BKL-035) |
| 2.0 | 2025-12-29 | Revisão. Simplificação arquitetura. |
| 3.0 | 2025-12-30 | Roadmap consolidado V0→V2. |
| 4.0 | 2025-12-30 | Adicionar V1.1 (Extended Thinking) e V1.2 (Memory). Marco "MM Tinindo". |

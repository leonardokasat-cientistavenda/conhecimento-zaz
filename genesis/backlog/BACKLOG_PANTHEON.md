# Backlog Pantheon - Multi-Agent Orchestration

> **Sistema:** GENESIS
> **Componente:** Pantheon (Multi-Agent)
> **Versão:** 5.0 (atualizado com implementações reais)
> **Data:** 2026-01-03

---

## Visão Geral

Pantheon é a arquitetura que permite agentes inteligentes no Mattermost,
começando com @genesis e evoluindo para um ecossistema multi-agente.

**Filosofia:** Começar simples, validar, escalar.

---

## Status Atual

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      STATUS ATUAL - 2026-01-03                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  V0 ✓ ──► V0.1 ✓ ──► V0.2 ✓ ──► V0.3 ✓ ──► V1 □ ─► V1.1 □ ─► V1.2 □ ─► V2 □   │
│   │       │         │         │        │       │        │        │    │
│   │       │         │         │        │       │        │        └► Multi  │
│   │       │         │         │        │       │        │           Camunda│
│   │       │         │         │        │       │        │                  │
│   │       │         │         │        │       │        └► Memory          │
│   │       │         │         │        │       │           Persistente     │
│   │       │         │         │        │       │                          │
│   │       │         │         │        │       └► Extended Thinking       │
│   │       │         │         │        │                                  │
│   │       │         │         │        └► MCP Tools                      │
│   │       │         │         │           GitHub, MongoDB, MM           │
│   │       │         │         │                                          │
│   │       │         │         └► Multi-Agente + @infra híbrido   ✓       │
│   │       │         │            (BONÚS - não planejado)                  │
│   │       │         │                                                    │
│   │       │         └► Seleção de modelo ✓                               │
│   │       │             /haiku, /opus, /sonnet                          │
│   │       │                                                              │
│   │       └► Upload arquivos ✓ (código pronto, aguarda teste)            │
│   │                                                                      │
│   └► Chat + Contexto + Streaming ✓                                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## O que foi IMPLEMENTADO

### V0 - MVP ✅ CONCLUÍDO (Sprint S-PANTHEON-001)

| Capacidade | Status | Implementação |
|------------|--------|---------------|
| Chat texto | ✅ | @genesis responde via Anthropic API |
| Contexto | ✅ | Histórico canal/thread via MM API |
| Streaming | ✅ | Edit post loop (500ms throttle) |
| System prompt | ✅ | Configurável em config/agents.js |
| Threads | ✅ | Responde em thread se root_id presente |
| Markdown | ✅ | MM nativo |
| Multi-usuário | ✅ | MM nativo |

**Commits:** Sprints S-PANTHEON-001
**Código:** `pantheon/`

---

### V0.1 - Upload de Arquivos ✅ CÓDIGO PRONTO

| Capacidade | Status | Implementação |
|------------|--------|---------------|
| Download arquivo MM | ✅ | `pantheon/services/mattermost/files.js` |
| Conversão base64 | ✅ | Para imagens e PDFs |
| Integração Vision | ✅ | Código pronto |
| Teste E2E | ⏳ | **Aguardando validação** |

---

### V0.2 - Seleção de Modelo ✅ CONCLUÍDO

| Capacidade | Status | Implementação |
|------------|--------|---------------|
| Modelo padrão | ✅ | claude-sonnet-4-20250514 |
| /haiku | ✅ | claude-3-haiku-20240307 (rápido/barato) |
| /opus | ✅ | claude-opus-4-20250514 (complexo) |
| /sonnet | ✅ | claude-sonnet-4-20250514 (padrão) |

**Parser:** `pantheon/core/executor.js` detecta prefixo e remove da mensagem

---

### V0.3 - Multi-Agente ✅ CONCLUÍDO (BÔNUS)

> **Nota:** Não estava no roadmap original, implementado como evolução natural.

| Agente | User ID | Token | Função |
|--------|---------|-------|--------|
| @genesis | noecbzw95bbnub84f8gs5xtiey | MM_TOKEN_GENESIS | IA geral, assistente principal |
| @prometheus | 8o5w6p39zind8ptiqohttjtqyo | MM_TOKEN_PROMETHEUS | Pipeline CI/CD, DevOps |
| @asclepius | 4kb997sanjbgmci79mfm6efu8e | MM_TOKEN_ASCLEPIUS | Gestão de Produtos |
| @atlas | pk5a91uzwtrm9fyzbu7q554q4a | MM_TOKEN_ATLAS | Gestão de Backlog |
| @kairos | iapa7h6sztd8pj66598enaxb1e | MM_TOKEN_KAIROS | Gestão de Sprints |

**System Prompts:** Cada agente tem personalidade e foco específico
**Tokens:** Cada agente responde como seu próprio usuário no MM

---

### V0.4 - @infra Híbrido ✅ CONCLUÍDO (BÔNUS)

> **Nota:** Não estava no roadmap original.

| Modo | Comportamento | Tempo |
|------|---------------|-------|
| Comando conhecido | Executa direto (PM2, Git, métricas) | ~3ms |
| Pergunta desconhecida | Claude Haiku responde | ~3s |

**Comandos disponíveis:**
- PM2: `status`, `logs`, `restart`
- Git: `git-status`, `git-pull`, `git-reset`, `git-log`, `git-diff`
- Métricas: `metrics`, `metrics-today`, `metrics-agent`
- Sistema: `health`, `test`, `lint`

**System Prompt:** Especializado em DevOps/infraestrutura
**Modelo:** Claude Haiku (barato: ~$0.0003/pergunta)

---

## O que FALTA implementar

### Pendências Técnicas (V0.X)

| Item | Prioridade | Esforço | Status |
|------|------------|---------|--------|
| Testar upload arquivos | P0 | 1h | ⏳ Aguardando |
| Configurar CLICKHOUSE_PASSWORD | P1 | 10min | □ Pendente |
| Verificar Web Search (built-in) | P1 | 30min | □ Pendente |
| Atualizar README.md do Pantheon | P2 | 1h | □ Pendente |

---

### V1 - MCP Tools □ PENDENTE

> **Status:** 📋 Planejado
> **Dependência:** Pendências técnicas
> **Esforço:** ~16h
> **Spec:** `genesis/specs/PANTHEON_V1_SPEC.md`

| Tool | Operações | Esforço |
|------|-----------|---------|
| Tool Registry | Registro central de tools | 2h |
| Tool Executor | Loop de execução | 3h |
| **GitHub** | get_file, list_files, search, create, update | 3h |
| **MongoDB** | find, findOne, aggregate, insert, update | 3h |
| **Mattermost** | search_posts, get_user, get_channel | 2h |
| Testes | Validação E2E | 3h |

---

### V1.1 - Extended Thinking □ PENDENTE

> **Status:** 📋 Planejado
> **Dependência:** V1 completo
> **Esforço:** ~2h

| Capacidade | Descrição |
|------------|-----------|
| Comando /think | Ativa deep reasoning |
| Budget tokens | Configurável (default 10k) |

---

### V1.2 - Memory □ PENDENTE

> **Status:** 📋 Planejado
> **Dependência:** V1.1 completo
> **Esforço:** ~6h

| Capacidade | Descrição |
|------------|-----------|
| Memory por usuário | Lembra preferências entre sessões |
| Memory por canal | Contexto específico do canal |
| /remember X | Salva informação |
| /forget X | Remove informação |
| /memories | Lista memórias |

---

### V2 - Camunda + Canais Externos □ PENDENTE

> **Status:** 📋 Planejado
> **Dependência:** V1.2 completo (MM "tinindo")
> **Esforço:** ~24h

| Capacidade | Descrição |
|------------|-----------|
| Router DMN | Regras de roteamento entre agentes |
| Camunda BPMN | Workflows complexos |
| WhatsApp | Via Evolution API ou Z-API |
| Telegram | Bot API |

---

## Comparativo (Atual vs Final)

| Capacidade | Claude Desktop | Pantheon Atual | Pantheon V1.2 |
|------------|----------------|----------------|---------------|
| Chat + Streaming | ✅ | ✅ | ✅ |
| Web Search | ✅ | ❓ verificar | ✅ |
| Upload arquivos | ✅ | ✅ código | ✅ |
| Seleção modelo | ✅ | ✅ | ✅ |
| Extended thinking | ✅ | ❌ | ✅ |
| Memory | ✅ | ❌ | ✅ |
| GitHub | ✅ | ❌ | ✅ |
| MongoDB | ❌ | ❌ | ✅ ⭐ |
| Mattermost | ❌ | ❌ | ✅ ⭐ |
| Threads | ❌ | ✅ ⭐ | ✅ ⭐ |
| Multi-usuário | ❌ | ✅ ⭐ | ✅ ⭐ |
| Multi-agente | ❌ | ✅ ⭐ | ✅ ⭐ |
| Self-hosted | ❌ | ✅ ⭐ | ✅ ⭐ |
| Code execution | ✅ | ❌ | ❌ |
| Artifacts | ✅ | ❌ | ❌ |

**Atual:** ~70% Claude Desktop + vantagens exclusivas
**V1.2:** ~90% Claude Desktop + vantagens exclusivas

---

## Resumo de Esforço

| Versão | Escopo | Esforço | Status |
|--------|--------|---------|--------|
| V0 | Chat + Contexto + Streaming | ~8h | ✅ Concluído |
| V0.1 | Upload arquivos | ~4h | ✅ Código (testar) |
| V0.2 | Seleção modelo | ~2h | ✅ Concluído |
| V0.3 | Multi-agente (bônus) | ~4h | ✅ Concluído |
| V0.4 | @infra híbrido (bônus) | ~2h | ✅ Concluído |
| **Total V0.X** | | **~20h** | **✅ Concluído** |
| V1 | MCP Tools | ~16h | □ Pendente |
| V1.1 | Extended Thinking | ~2h | □ Pendente |
| V1.2 | Memory | ~6h | □ Pendente |
| **Total até V1.2** | | **~44h** | **MM "Tinindo"** |
| V2 | Multi-agentes + Camunda | ~24h | □ Pendente |

---

## Sprints

| Sprint | Versão | Status | Data |
|--------|--------|--------|------|
| S-PANTHEON-001 | V0 | ✅ Concluída | 2025-12-30 |
| S-PANTHEON-002 | V0.1 + V0.2 + V0.3 + V0.4 | ✅ Concluída | 2026-01-03 |
| S-PANTHEON-003 | Pendências + V1 (parte 1) | 📋 Planejada | - |
| S-PANTHEON-004 | V1 (parte 2) + V1.1 | 📋 Planejada | - |
| S-PANTHEON-005 | V1.2 | 📋 Planejada | - |
| S-PANTHEON-006+ | V2 | 📋 Planejada | - |

---

## Próxima Sprint Sugerida (S-PANTHEON-003)

### Escopo

| Prioridade | Item | Esforço |
|------------|------|---------|
| P0 | Testar upload de arquivos | 1h |
| P1 | Verificar/habilitar Web Search | 30min |
| P1 | Configurar CLICKHOUSE_PASSWORD | 10min |
| P2 | Tool Registry + Tool Executor | 5h |
| P2 | GitHub Tool (read-only) | 2h |
| **Total** | | **~8.5h** |

### Critério de Sucesso

```
[Leonardo]: @genesis lê o arquivo genesis/GENESIS.md e me faz um resumo
[genesis]:  🔧 Buscando no GitHub...
            GENESIS é um sistema de inteligência híbrida com 3 capacidades...
```

---

## Referências

| Documento | Path |
|-----------|------|
| Spec V0 | `genesis/specs/PANTHEON_V0_SPEC.md` |
| Spec V1 | `genesis/specs/PANTHEON_V1_SPEC.md` |
| Sprint 001 | `genesis/sprints/S-PANTHEON-001.md` |
| Sprint 002 | `genesis/sprints/S-PANTHEON-002.md` |
| Código | `Orquestrador-Zarah/pantheon/` |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-19 | Backlog original (BKL-030 a BKL-035) |
| 2.0 | 2025-12-29 | Revisão. Simplificação arquitetura. |
| 3.0 | 2025-12-30 | Roadmap consolidado V0→V2. |
| 4.0 | 2025-12-30 | V1.1 (Extended Thinking), V1.2 (Memory). Marco "MM Tinindo". |
| 5.0 | 2026-01-03 | **Atualização com implementações reais.** V0-V0.4 concluídos. Multi-agente + @infra híbrido como bônus. Status detalhado. Próxima sprint sugerida. |

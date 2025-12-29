# Backlog Pantheon - Multi-Agent Orchestration

> **Sistema:** GENESIS
> **Componente:** Pantheon (Multi-Agent)
> **Versão:** 2.0 (revisado)
> **Data:** 2025-12-29

---

## Visão Geral

Pantheon é a arquitetura multi-agente do GENESIS que permite múltiplos bots inteligentes coexistirem no Mattermost, cada um com propósito específico, acessíveis via menção (@genesis, @prometheus, etc).

### Agentes

| Agente | Propósito | Modelo |
|--------|-----------|--------|
| **GENESIS** | Sistema principal, inteligência híbrida | claude-sonnet-4-20250514 |
| **PROMETHEUS** | Pipeline CI/CD, fábrica de software | claude-sonnet-4-20250514 |
| **ASCLEPIUS** | Gestão de produtos (MS_Produto) | claude-sonnet-4-20250514 |
| **ATLAS** | Gestão de backlog (MS_Backlog) | claude-haiku-3-5-20241022 |
| **KAIROS** | Gestão de sprints (MS_Sprint) | claude-haiku-3-5-20241022 |

---

## Backlog Items

### BKL-040: Estrutura Pantheon + Migração

**Descrição:** Criar estrutura de pastas `pantheon/` e migrar services existentes de `genesis/`.

**Entregáveis:**
- `pantheon/package.json`
- `pantheon/index.js`
- `pantheon/config/` (logger, agents, env)
- `pantheon/services/mattermost/` (migrado)

**Esforço:** 1h
**Dependências:** Nenhuma
**Fase:** 1 - Estrutura

---

### BKL-041: API Webhook + Outgoing Webhook MM

**Descrição:** Criar servidor Express com endpoint POST /api/pantheon/webhook e configurar Outgoing Webhook no Mattermost para trigger @agente.

**Entregáveis:**
- `pantheon/api/server.js`
- `pantheon/api/routes/webhook.js`
- Outgoing Webhook configurado no MM

**Esforço:** 2h
**Dependências:** BKL-040
**Fase:** 2 - API

---

### BKL-042: Executor MVP (Anthropic direto)

**Descrição:** Criar executor que recebe mensagem do webhook, chama Anthropic API, e responde no MM. Sem contexto persistente, sem tools.

**Entregáveis:**
- `pantheon/services/anthropic/client.js`
- `pantheon/core/executor.js`
- Bot respondendo no MM

**Esforço:** 2h
**Dependências:** BKL-041
**Fase:** 3 - MVP

**Critério de Sucesso:**
```
Usuário: @genesis olá!
Genesis: Olá! Sou GENESIS, como posso ajudar?
```

---

### BKL-043: Contexto Persistente (MongoDB)

**Descrição:** Implementar gestão de contexto com histórico de mensagens persistido no MongoDB.

**Entregáveis:**
- `pantheon/services/mongodb/contexts.js`
- `pantheon/core/context.js`
- Collection `genesis.contextos`

**Esforço:** 2h
**Dependências:** BKL-042
**Fase:** 4 - Features

---

### BKL-044: Multi-Agente (System Prompts)

**Descrição:** Implementar roteamento para múltiplos agentes com system prompts específicos.

**Entregáveis:**
- `pantheon/agents/genesis.md`
- `pantheon/agents/prometheus.md`
- `pantheon/agents/asclepius.md`
- `pantheon/agents/atlas.md`
- `pantheon/agents/kairos.md`
- Roteamento por @menção

**Esforço:** 2h
**Dependências:** BKL-043
**Fase:** 4 - Features

---

### BKL-045: Tools (GitHub, MongoDB)

**Descrição:** Implementar tools que o LLM pode usar durante execução.

**Entregáveis:**
- `pantheon/core/tools.js` (registry)
- `pantheon/tools/github.js`
- `pantheon/tools/mongodb.js`
- `pantheon/tools/mattermost.js`

**Esforço:** 3h
**Dependências:** BKL-044
**Fase:** 4 - Features

---

### BKL-046: Feedback UX

**Descrição:** Melhorar UX com indicadores de "digitando" e edição de mensagem em tempo real.

**Entregáveis:**
- Typing indicator
- Edit message conforme resposta chega
- Tratamento de erros amigável

**Esforço:** 2h
**Dependências:** BKL-045
**Fase:** 5 - Polish

---

### BKL-047: Camunda Integration (Opcional)

**Descrição:** Integrar com Camunda para workflows complexos que precisam de orquestração BPMN.

**Entregáveis:**
- `pantheon/services/camunda/client.js`
- BPMN agent_loop (opcional)
- DMN roteamento (opcional)

**Esforço:** 4h
**Dependências:** BKL-046
**Fase:** 5 - Polish

---

## Fases

```
Fase 1: Estrutura (BKL-040)
    └── Fase 2: API (BKL-041)
        └── Fase 3: MVP (BKL-042) ← Bot funcionando!
            └── Fase 4: Features (BKL-043, 044, 045)
                └── Fase 5: Polish (BKL-046, 047)
```

---

## Sprints Planejadas

| Sprint | Escopo | Esforço | Entrega |
|--------|--------|---------|---------|
| S-PANTHEON-001 | BKL-040 a BKL-042 | 5h | MVP funcionando |
| S-PANTHEON-002 | BKL-043 a BKL-045 | 7h | Multi-agente + tools |
| S-PANTHEON-003 | BKL-046 a BKL-047 | 6h | UX + Camunda |

---

## Referências

| Documento | Path |
|-----------|------|
| Spec Original | `_drafts/S029_M4_MS_Pantheon_Spec.md` |
| Sprint 001 | `genesis/sprints/S-PANTHEON-001.md` |
| Contexto Retomada | `Orquestrador-Zarah/genesis/CONTEXTO_RETOMADA.md` |
| Credenciais | `genesis/config/panteao_credenciais.json` |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-19 | Backlog original (BKL-030 a BKL-035) |
| 2.0 | 2025-12-29 | Revisão completa. Simplificação arquitetura. Redução 36h → 18h. |

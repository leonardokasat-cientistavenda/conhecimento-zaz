---
titulo: "Genesis - Arquitetura Técnica"
versao: "0.3.0"
tipo: Documentação
status: Draft
data_atualizacao: 2025-12-13
---

# Genesis - Arquitetura Técnica v0.3.0

## 1. Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USUÁRIO                                        │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             MATTERMOST                                      │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     │
│   │   Thread    │    │   Thread    │    │   Canal     │                     │
│   │  Conversa   │    │  Projeto    │    │  Notifica   │                     │
│   └─────────────┘    └─────────────┘    └─────────────┘                     │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │ Websocket
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MM BOT                                         │
│                         (Listener/Publisher)                                │
│   • Escuta mensagens via websocket                                          │
│   • Publica respostas                                                       │
│   • Nenhuma lógica de negócio                                               │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │ REST
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CAMUNDA ENGINE                                  │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                         KERNEL (imutável)                          │     │
│  │   conversation.bpmn    artifact_lifecycle.bpmn    tool_exec.bpmn   │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                      GENERATED (Genesis cria)                      │     │
│  │   novos processos, decisões, subfluxos                             │     │
│  └────────────────────────────────────────────────────────────────────┘     │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │ External Tasks
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              WORKERS                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Contexto: intent_analyzer, context_retriever, capability_matcher   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  LLM: llm_generator, llm_fixer, llm_responder                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CI/CD: git_ops, docker_build, camunda_deploy, mongo_deploy         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Validação: python_lint, python_test, bpmn_validate                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Integração: mm_notify, capability_index, history_persist           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└──────────┬─────────────────────┬─────────────────────┬──────────────────────┘
           │                     │                     │
           ▼                     ▼                     ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   ANTHROPIC     │   │     MONGODB     │   │     GITHUB      │
│     API         │   │                 │   │                 │
│  • Opus 4.5     │   │  • users        │   │  • prompts/     │
│  • Web search   │   │  • capabilities │   │  • workers/     │
│  • Tools        │   │  • history      │   │  • workflows/   │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

---

## 2. MCP como Adapter

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ANTHROPIC API                                     │
│   LLM (Opus 4.5)                                                            │
│    │  Tools habilitadas:                                                    │
│    │  ├── web_search (nativo Anthropic)                                     │
│    │  ├── web_fetch (nativo Anthropic)                                      │
│    │  └── genesis_tools (custom) ───────────────────┐                       │
└────┼────────────────────────────────────────────────┼───────────────────────┘
     │                                                │
     │                                                ▼
     │                                    ┌─────────────────────┐
     │                                    │    MCP SERVER       │
     │                                    │    (adapter fino)   │
     │                                    │  search_capabilities│
     │                                    │  read_code          │
     │                                    │  query_history      │
     │                                    │  start_process      │
     │                                    └──────────┬──────────┘
     │                                               │
     │                                               ▼
     │                                    ┌─────────────────────┐
     │                                    │      CAMUNDA        │
     │                                    │  tool_execution.bpmn│
     │                                    └──────────┬──────────┘
     │                                               │
     │                                               ▼
     │                                    ┌─────────────────────┐
     │                                    │      WORKERS        │
     │                                    │  (reusados)         │
     │                                    └─────────────────────┘
     ▼
  Resposta para usuário via MM
```

---

## 3. Decisões Arquiteturais

### ADR-001: Mattermost como Interface

**Status:** Aceito

**Contexto:** Genesis precisa de interface para interação com usuários.

**Decisão:** Mattermost será a interface principal.

**Motivos:**
- Self-hosted (controle total)
- Threads nativas (contexto visual)
- Webhooks e websockets (integração)
- Playbooks (metodologia M0-M4 como checklist)
- Já em uso na organização

**Consequências:**
- (+) Ambiente familiar ao usuário
- (+) Threads organizam conversas naturalmente
- (-) Streaming de resposta requer workaround
- (-) Artifacts limitados a markdown

---

### ADR-002: Camunda como Orquestrador

**Status:** Aceito

**Contexto:** Genesis executa processos complexos: conversas, pipelines M0-M4, CI/CD.

**Decisão:** Camunda será o orquestrador central.

**Motivos:**
- BPMN visual (processos legíveis)
- DMN para decisões (tabelas de decisão)
- External tasks (workers desacoplados)
- Já operacional na organização

**Consequências:**
- (+) Processos são artefatos versionáveis (XML)
- (+) Genesis pode gerar novos processos (auto-recursão)
- (+) Cockpit para observabilidade
- (-) Overhead para tarefas simples
- (-) Latência adicional vs código direto

---

### ADR-003: Workers Reusáveis

**Status:** Aceito

**Decisão:** Workers serão unidades atômicas reusáveis, organizados por domínio.

**Domínios:**
- Contexto: intent_analyzer, context_retriever, capability_matcher
- LLM: llm_generator, llm_fixer, llm_responder
- CI/CD: git_ops, docker_build, camunda_deploy, mongo_deploy
- Validação: python_lint, python_test, bpmn_validate
- Integração: mm_notify, capability_index, history_persist

**Consequências:**
- (+) Mesmo worker serve múltiplos processos
- (+) MCP pode reusar workers
- (-) Mais workers para manter

---

### ADR-004: MCP via Camunda

**Status:** Aceito

**Decisão:** MCP Server será um adapter fino que traduz chamadas de tools para jobs Camunda.

**Fluxo:**
1. LLM decide usar tool (ex: search_capabilities)
2. MCP Server recebe chamada
3. MCP dispara processo Camunda (tool_execution.bpmn)
4. Worker executa (mesmo worker usado em pipelines)
5. Resultado volta para LLM

**Consequências:**
- (+) Reuso total de workers
- (+) Observabilidade única via Camunda
- (-) Latência: hop adicional (MCP → Camunda → Worker)

---

### ADR-005: CI/CD via Camunda

**Status:** Aceito

**Decisão:** Camunda orquestrará o CI/CD do Genesis (não GitHub Actions).

**Processo:** artifact_lifecycle.bpmn
1. Identify artifact type
2. Route to specific lifecycle
3. Validate
4. Commit to Git
5. Deploy to target
6. Index as capability
7. Notify MM

**Consequências:**
- (+) Auto-recursão real: Genesis deploya novos processos Camunda
- (+) Controle total, não depende de serviço externo
- (-) Bootstrap: Kernel precisa de deploy manual inicial

---

### ADR-006: Kernel Imutável

**Status:** Aceito

**Decisão:** Genesis terá um kernel imutável — processos fundamentais deployados manualmente.

**Kernel:**
```
genesis/
├── kernel/                    ← Deploy manual, nunca muda
│   ├── conversation.bpmn
│   ├── artifact_lifecycle.bpmn
│   ├── tool_execution.bpmn
│   └── m0_m4_pipeline.bpmn
│
└── generated/                 ← Genesis cria e deploya
    ├── prompts/
    ├── workers/
    ├── workflows/
    └── decisions/
```

**Regras:**
1. Mínimo possível
2. Genérico (serve qualquer domínio)
3. Estável (mudanças raras)
4. Versionado (Git tag para cada versão)

---

## 4. Componentes por Fase

### Fase 0: Kernel
- MM Bot (listener/publisher via websocket)
- conversation.bpmn
- Worker: llm_responder
- Conexão Anthropic API

### Fase 1: Memória
- MongoDB: collections users, conversations
- Worker: context_retriever
- Worker: history_persist

### Fase 2: Consciência
- MongoDB: collection capabilities
- Embeddings para busca semântica
- Worker: capability_matcher
- Worker: capability_index

### Fase 3: Roteamento
- Worker: intent_analyzer
- DMN: route_intent.dmn
- DMN: match_capability.dmn
- Gateways em conversation.bpmn

### Fase 4: Construção
- m0_m4_pipeline.bpmn
- artifact_lifecycle.bpmn
- Workers: llm_generator, llm_fixer
- Workers: git_ops, docker_build, camunda_deploy
- Workers: python_lint, python_test, bpmn_validate

### Fase 5: MCP
- MCP Server (adapter fino)
- tool_execution.bpmn
- Tools: search_capabilities, read_code, query_history, start_process

### Fase 6: Auto-recursão
- Worker: meta_analyzer
- Capacidade de gerar prompts, workflows, workers para si mesmo
- Versionamento de evolução no Git

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.3.0 | 2025-12-13 | Migração de genesis/architecture/ para MS_Produto |

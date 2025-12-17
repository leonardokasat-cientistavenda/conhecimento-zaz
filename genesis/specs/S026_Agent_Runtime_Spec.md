# S026 - Agent Runtime para GENESIS no Mattermost

> **Sprint:** S026  
> **Status:** Em andamento (67% - T05 pendente)  
> **Backlog:** BKL-026 (tipo: ciclo_epistemologico)  
> **Esforço estimado:** 4h

---

## M0 - Problema

### Dor
GENESIS roda em LLM Mode (Claude Desktop + MCP), excelente para prototipar mas não escala. Necessita migração para infraestrutura ZAZ.

### Causas
- Dependência MCP (tools locais)
- Interface local single-user
- Sem persistência de código
- Alucinação por entropia (contexto cresce sem controle)

### Consequências
- Não escala (só Leonardo usa)
- Sem visibilidade de custos
- Sem controle/limites
- Sem auditoria
- Perda de precisão em conversas longas

### Requisitos Funcionais
- Paridade 100% com capacidades atuais em spec/markdown
- Workers Node.js (padrão ZAZ)
- Interação conversacional como Claude Desktop
- Bifurcação LLM mode vs Code mode via db.capacidades.maturidade.fase
- System prompt carregado na primeira chamada Camunda
- Agent loop: LLM processa → tool_call → worker executa → retorna → loop

### Requisitos de Segurança
- Limite consumo (tokens por usuário/período)
- Contexto máximo (prevenir custos explosivos)
- Observabilidade (registrar execuções com custeio)
- Tratamento de 429 (exponential backoff)
- Compressão de histórico (resumir conversas longas)

### Requisitos Anti-Entropia
- Contexto curado (só necessário)
- Histórico comprimido
- Validação intermediária
- System prompt fresco a cada chamada

### Glossário

| Termo | Definição |
|-------|-----------|
| Agent Loop | Ciclo LLM processa → decide (tool_call/resposta) → executa tool → volta até resposta final |
| Tool Call | Solicitação LLM para ferramenta externa (buscar arquivo, query banco) |
| Worker | Processo Node.js executando tarefa específica no Camunda |
| LLM Mode | Capacidade via LLM interpretando specs (fase draft/spec) |
| Code Mode | Capacidade via código determinístico (fase code/prod) |
| Entry Point | Recebe mensagem, decide roteamento (Bot MM) |
| Context | Payload API Anthropic (system prompt + histórico + mensagem + tools) |
| Execução | Registro chamada LLM com métricas (tokens, latência, capacidade, custo) |
| Rate Limit | Limite de requisições/tokens por período imposto pela API |
| 429 Error | Resposta HTTP indicando que limite foi excedido |
| Token Bucket | Algoritmo que distribui chamadas em intervalos menores |
| Prompt Caching | Reutilização de contexto entre chamadas para reduzir custo/latência |
| Custeio | Cálculo do custo em USD de cada execução baseado em tokens × pricing |

---

## M1 - Quadro Teórico

### Stack Confirmada (Padrão ZAZ)
- **Interface:** Mattermost (Bot Account + WebSocket)
- **Orquestrador:** Camunda 7 + BPMN
- **Workers:** Node.js + camunda-external-task-client-js
- **LLM:** Anthropic API (modelo configurável por capacidade)
- **Persistência:** MongoDB + GitHub

### Padrões ZAZ a Seguir
- Workers = microsserviços de função única
- Sempre via worker, nunca connector
- External Task Pattern (polling por topic)
- Variáveis em camelCase, datas ISO 8601
- Tokens/secrets via env vars (12-factor)
- Processos modulares e reutilizáveis
- Instâncias não ficam abertas para sempre (timeout)

### Gerenciamento de Quotas Anthropic

**Limites API:**
- RPM (Requests per Minute)
- ITPM (Input Tokens per Minute)
- OTPM (Output Tokens per Minute)
- Spend Limit (custo máximo mensal)

**Estratégias:**
- Smart Context Management: system prompt + últimas N mensagens no budget
- Token Bucket Algorithm: distribuir requisições
- Exponential Backoff: retry ao receber 429

**Pricing (referência):**
| Modelo | Input/1M | Output/1M | Uso |
|--------|----------|-----------|-----|
| Haiku | $0.25 | $1.25 | Tarefas simples |
| Sonnet | $3.00 | $15.00 | Default, uso geral |
| Opus | $15.00 | $75.00 | Tarefas complexas |

### Decisão: Bot Account + WebSocket

**Opções analisadas:**

| Opção | Recebe | Envia | DM | Privado | Código |
|-------|--------|-------|-----|---------|--------|
| Outgoing Webhook | ✅ | ✅ | ❌ | ❌ | Zero |
| Slash Command | ✅ | ✅ | ✅ | ✅ | Zero |
| Bot + WebSocket | ✅ | ✅ | ✅ | ✅ | ~150 linhas |

**Limitações descobertas:**
- Outgoing Webhook: NÃO funciona em DM ou canais privados
- Slash Command: timeout 3s, response_url máx 30min/5 msgs

**Decisão:** Bot Account + WebSocket (padrão similar Zarah)
- UX natural (sem `/genesis` obrigatório)
- Funciona em DM e canais privados
- Sem limites de resposta
- Pode editar mensagens, mostrar progresso

---

## M2 - Fronteiras

### O que É (Escopo)
- Bot Mattermost: escuta websocket, posta REST
- Workflow Agent Loop: BPMN orquestra ciclo LLM ↔ Tools
- Worker Opus: chama API Anthropic, persiste métricas
- Worker GitHub: get_file_contents, push_files, create_branch
- Worker MongoDB: find, aggregate, insert, update
- Worker Responder MM: posta resposta canal/thread correto
- Observabilidade: db.execucoes com tokens, latência, modo, custo
- Validação pré-chamada: limite contexto e consumo por usuário
- Bifurcação LLM/Code: entry point consulta db.capacidades.maturidade.fase

### O que NÃO É (Fora do Escopo)
- Alterar specs dos MS (permanecem iguais)
- LLM Router (vai direto pro modelo configurado)
- Voice/STT/TTS (só texto)
- WhatsApp/Meta (só Mattermost)
- Prometheus code mode (workers determinísticos fase futura)
- Multi-tenant (um bot, uma org)
- Prompt caching (otimização futura)

### Schemas

**db.execucoes (com custeio):**
```javascript
{
  _id: ObjectId,
  conversa_id: "conv-123",
  user_id: "leonardo",
  capacidade_id: "sprint_status",
  sprint_id: "S026",
  tokens_input: 1523,
  tokens_output: 847,
  tokens_total: 2370,
  custo_input: 0.02284,    // USD
  custo_output: 0.01270,   // USD
  custo_total: 0.03554,    // USD
  pricing: {
    modelo: "claude-sonnet-4-20250514",
    input_per_million: 3.00,
    output_per_million: 15.00
  },
  modo: "llm",
  latencia_ms: 2340,
  timestamp: ISODate("2025-12-17T20:15:00Z")
}
```

**db.capacidades (modelo por capacidade):**
```javascript
{
  "id": "ms_sprint",
  "maturidade": {
    "fase": "draft",
    "prometheus_ref": null
  },
  "llm_config": {
    "modelo": "claude-sonnet-4-20250514",
    "modelo_fallback": null
  }
}
```

**db.configuracoes (defaults globais):**
```javascript
{
  "tipo": "llm_defaults",
  "modelo_padrao": "claude-sonnet-4-20250514",
  "modelos_disponiveis": [
    { "id": "claude-haiku-...", "pricing": {...} },
    { "id": "claude-sonnet-...", "pricing": {...} },
    { "id": "claude-opus-...", "pricing": {...} }
  ]
}
{
  "tipo": "limites",
  "contexto_maximo": 150000,
  "limite_diario_usuario": 500000,
  "limite_mensal_organizacao": 10000000
}
```

---

## M3 - Especificação

### Arquitetura de Componentes

```
BOT MM (Node.js + mattermostdriver)
  ↓ POST /engine-rest/process-definition/.../start
CAMUNDA WORKFLOW: genesis-agent-loop.bpmn
  [Start] → [Montar Contexto] → [Validar Limites] →
  [Chamar LLM] → <Gateway> → [Executar Tool] ─┐
      │                        │               │
      │ (resposta final)       │ (loop)        │
      ▼                        │               │
  [Responder MM] ← ───────────┘               │
      │                                        │
  [Persistir Execução] → [End]                │
  ↓ External Tasks (polling)                  │
WORKERS (Node.js)                             │
  - worker-opus (topic: genesis-llm)          │
  - worker-github (topic: genesis-git)        │
  - worker-mongodb (topic: genesis-db)        │
  - worker-responder-mm (topic: genesis-mm)   │
  - worker-montar-contexto                    │
  - worker-validar-limites                    │
  - worker-persistir                          │
```

### Workers Especificados

**Worker: Montar Contexto** (topic: genesis-montar-contexto)
- Busca system prompt (GitHub)
- Busca histórico conversa (MongoDB)
- Adiciona mensagem nova
- Busca capacidade para modelo
- Monta payload Anthropic

**Worker: Validar Limites** (topic: genesis-validar-limites)
- Conta tokens estimados
- Verifica contexto máximo
- Verifica consumo diário usuário
- Retorna validado (boolean) + erro (string)

**Worker: Chamar LLM** (topic: genesis-llm)
- Chama anthropic.messages.create(payload)
- Extrai tool calls se houver
- Extrai texto resposta
- Trata erro 429 com retry/backoff
- Retorna resposta, toolCalls, stopReason, tokens, latência

**Worker: GitHub** (topic: genesis-git)
- Implementa github:get_file_contents
- Implementa github:push_files
- Implementa github:create_branch
- Retorna tool_result formatado

**Worker: MongoDB** (topic: genesis-db)
- Implementa mongodb:find
- Implementa mongodb:aggregate
- Implementa mongodb:insert-many
- Implementa mongodb:update-many
- Retorna tool_result formatado

**Worker: Responder MM** (topic: genesis-mm)
- Posta mensagem via mm.posts.create_post
- Mantém na thread (root_id)

**Worker: Persistir Execução** (topic: genesis-persistir)
- Busca pricing do modelo
- Calcula custo_input, custo_output
- Insere em db.execucoes

### Estrutura de Diretórios (Proposta)
```
genesis-code/
├── bot/
│   ├── src/index.js           # Bot MM listener
│   ├── package.json
│   └── Dockerfile
├── workers/
│   ├── src/
│   │   ├── index.js           # Entry point
│   │   ├── montar-contexto.js
│   │   ├── validar-limites.js
│   │   ├── llm.js
│   │   ├── github.js
│   │   ├── mongodb.js
│   │   ├── responder-mm.js
│   │   └── persistir.js
│   ├── package.json
│   └── Dockerfile
├── bpmn/
│   └── genesis-agent-loop.bpmn
└── config/
    └── tools-definitions.json
```

### Variáveis de Ambiente
```
MM_URL=https://mm.zaz.vc
MM_BOT_TOKEN=xxx
CAMUNDA_URL=http://10.100.12.24:8080/engine-rest
ANTHROPIC_API_KEY=xxx
GITHUB_TOKEN=xxx
GITHUB_OWNER=leonardokasat-cientistavenda
GITHUB_REPO=conhecimento-zaz
MONGODB_URI=mongodb+srv://...
MONGODB_DATABASE=genesis
```

---

## Decisões Arquiteturais

| # | Decisão | Rationale |
|---|---------|-----------|
| 1 | Bot MM é entry point | Dispara processos Camunda, recebe callbacks |
| 2 | Montar contexto é código (não LLM) | Determinístico: busca prompt, histórico, monta payload |
| 3 | Observabilidade via db.execucoes | Tokens, custo, latência, capacidade, modo |
| 4 | Segurança como requisito | Limites de consumo, contexto máximo, validações |
| 5 | Modelo LLM configurável por capacidade | Default Sonnet, override em db.capacidades.llm_config |
| 6 | Anti-entropia via Camunda | Contexto curado, histórico comprimido, prompt fresco |
| 7 | Bot + WebSocket (não Slash Command) | UX natural, DMs, sem limites de resposta |

---

## Próximos Passos

- [ ] **T05:** Finalizar M3 com detalhes de implementação
- [ ] **T06:** M4 - Documento final
- [ ] Investigar código Zarah (repo ZAZ) para reusar padrões
- [ ] Criar Bot Account no MM
- [ ] Implementar MVP do agent loop

---

## Referências

- Mattermost Bot API: https://developers.mattermost.com/integrate/reference/bot-accounts/
- Camunda External Task: https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/
- Anthropic API: https://docs.anthropic.com/en/api/messages

# S026 - MS_Agente: Agent Runtime Reutilizável

> **Sprint:** S026  
> **Status:** Em andamento (M1 ✅, M2 ✅, M3-M4 pendentes)  
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
| MS_Agente | Meta System reutilizável que implementa Agent Loop genérico |

---

## M1 - Quadro Teórico ✅

> **Status:** Validado (Zarah em produção confirma padrões)

### Fontes Internas (Repos ZAZ) - VALIDADAS

#### Estrutura Orquestrador-Zarah
```
ZAZ-vendas/Orquestrador-Zarah
├── config/camunda/index.js      # initCamunda, startProcessCamundaV2, sendSignalCamundaV2
├── controller/mattermostController.js  # Webhook handler MM → Camunda
├── database/index.js            # MongoDB abstraction layer (database layer)
├── utils/validations.js         # getListaVariaveis, setarVariaveisCamunda
└── worker/
    ├── llama/index.js           # Padrão worker LLM
    ├── openAI/index.js          # Worker OpenAI
    └── sistemas/mattermost/     # sendMessage, atualizarPost
```

#### Padrão de Worker (confirmado)
```javascript
module.exports = {
  nomeDoWorker: async ({ task, taskService }) => {
    const { var1, var2 } = getListaVariaveis({ var1: "", var2: "" }, task);
    const response = await algumaAPI(...);
    await taskService.complete(task, setarVariaveisCamunda({ resultado }));
  }
}
```

#### Database Layer (database/index.js)
Camada de abstração MongoDB que gerencia conexões e expõe operações padronizadas:
```javascript
findOne, find, insertOne, insertMany, updateOne, updateMany, 
deleteOne, deleteMany, countDocuments, aggregateCustom
```

### Stack Confirmada
- **Interface:** Mattermost (Outgoing Webhook → Controller → Camunda)
- **Orquestrador:** Camunda 7 + BPMN
- **Workers:** Node.js + camunda-external-task-client-js
- **LLM:** API externa (Llama, OpenAI → adicionar Anthropic)
- **Persistência:** MongoDB + GitHub

### Decisão: Outgoing Webhook para MVP

**Decisão tomada:** Seguir padrão Zarah (Outgoing Webhook) para MVP.

**Limitação aceita:** Só funciona em canais públicos (DM/privado no backlog BKL-027).

**Fluxo:**
```
@genesis mensagem → Outgoing Webhook → mattermostController.js → DMN → Camunda → Workers
```

### Backlog Relacionado

| ID | Título | Status |
|----|--------|--------|
| BKL-027 | Bot + WebSocket para DM e canais privados | Backlog |
| BKL-028 | Multi-modelo dinâmico por capacidade | Backlog |
| BKL-029 | Prompt Caching para redução de custos | Backlog |

---

## M2 - Fronteiras ✅

> **Status:** Validado

### Visão Arquitetural: MS_Agente

**Decisão:** Agent Loop como Meta System reutilizável, não específico do GENESIS.

```
┌─────────────────────────────────────────────────────────────────┐
│                    MS_Agente (genérico)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Entrada: { agente_id, user_id, user_login, channel_id, input } │
│                                                                 │
│  Loop:                                                          │
│    [Montar Contexto] → [Chamar LLM] → <tool_use?> → [Executar]  │
│                                                                 │
│  Saída: resposta + persistência em agente.execucoes             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
          │
          │ consome
          ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   GENESIS    │  │   Zarah v2   │  │  Futuro Bot  │
│  agente_id:  │  │  agente_id:  │  │  agente_id:  │
│  "genesis"   │  │  "zarah"     │  │  "xxx"       │
└──────────────┘  └──────────────┘  └──────────────┘
```

### O que É (Escopo MVP)

```
REUSAR (0 código novo)
├── mattermostController.js (só add case DMN)
├── database/index.js
├── utils/validations.js
├── config/camunda/index.js
└── worker/sistemas/mattermost/sendMessage

CRIAR
├── worker/anthropic/index.js      (~50 linhas)
├── worker/agente/github.js        (~80 linhas)
├── worker/agente/contexto.js      (~40 linhas)
├── worker/agente/persistir.js     (~30 linhas)
├── bpmn_ms_agente.bpmn            (diagrama)
└── Linha no DMN existente         (1 linha)

TOTAL: ~200 linhas de código novo
```

### O que NÃO É (Fora do Escopo MVP)

- ❌ Alterar mattermostController.js (só DMN)
- ❌ Criar novo database layer (reusar)
- ❌ Bot + WebSocket (BKL-027)
- ❌ Multi-modelo dinâmico (BKL-028)
- ❌ Prompt caching (BKL-029)
- ❌ WhatsApp/Telegram
- ❌ Code mode (só LLM mode)

### Schema: agente.execucoes

```javascript
{
  _id: ObjectId,
  agente_id: "genesis",              // Qual bot/agente
  channel_id: "abc123",              // Canal MM
  user_id: "mm_user_id_xxx",         // ID do usuário Mattermost
  user_login: "leonardo",            // Login MM (vem do webhook)
  input: "status do sprint",
  output: "Sprint S026 está em 67%...",
  tokens_input: 1523,
  tokens_output: 847,
  tokens_total: 2370,
  custo_usd: 0.0355,
  modelo: "claude-sonnet-4-20250514",
  latencia_ms: 2340,
  tool_calls: ["github:get_file_contents", "mongodb:find"],
  created_at: ISODate("2025-12-17T20:15:00Z")
}
```

---

## M3 - Especificação

### Fluxo BPMN: bpmn_ms_agente

```
[Start]
   │ vars: agente_id, user_id, user_login, channel_id, input
   ▼
[Montar Contexto]
   │ topic: agente-contexto
   │ busca: system prompt (GitHub), histórico (MongoDB), config agente
   ▼
[Chamar LLM]
   │ topic: workerAnthropic
   │ input: messages, modelo, tools
   │ output: resposta, toolCalls, stopReason, tokens, latencia
   ▼
<Gateway: stopReason?>
   │
   ├── "end_turn" ──► [Responder MM] ──► [Persistir] ──► [End]
   │                   topic: sendMessage   topic: agente-persistir
   │
   └── "tool_use" ──► [Executar Tool] ─────────────────┐
                       topic: agente-tool              │
                       │                               │
                       └───────────────────────────────┘
                                    (loop para Montar Contexto)
```

### Workers a Criar

#### workerAnthropic (topic: workerAnthropic)
```javascript
// worker/anthropic/index.js
const Anthropic = require("@anthropic-ai/sdk");

module.exports = {
  workerAnthropic: async ({ task, taskService }) => {
    const { messages, modelo, tools } = getListaVariaveis({
      messages: [],
      modelo: "claude-sonnet-4-20250514",
      tools: [],
    }, task);
    
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const startTime = Date.now();
    
    const response = await client.messages.create({
      model: modelo,
      max_tokens: 4096,
      messages,
      tools: tools.length > 0 ? tools : undefined,
    });
    
    const latencia_ms = Date.now() - startTime;
    const resposta = response.content.find(c => c.type === "text")?.text || "";
    const toolCalls = response.content.filter(c => c.type === "tool_use");
    
    await taskService.complete(task, setarVariaveisCamunda({
      resposta,
      toolCalls: JSON.stringify(toolCalls),
      stopReason: response.stop_reason,
      tokens_input: response.usage.input_tokens,
      tokens_output: response.usage.output_tokens,
      latencia_ms,
    }));
  }
};
```

#### agente-contexto (topic: agente-contexto)
```javascript
// worker/agente/contexto.js
module.exports = {
  montarContextoAgente: async ({ task, taskService }) => {
    const { agente_id, input, channel_id } = getListaVariaveis({...}, task);
    
    // 1. Buscar config do agente (system prompt, tools, modelo)
    const config = await findOne({ 
      query: { agente_id }, 
      collection: "agentes", 
      db: "genesis" 
    });
    
    // 2. Buscar histórico da conversa (últimas N mensagens)
    const historico = await find({
      query: { channel_id, agente_id },
      collection: "execucoes",
      db: "agente",
      limit: 10,
      sort: { created_at: -1 }
    });
    
    // 3. Montar messages array
    const messages = [
      ...historico.reverse().flatMap(h => [
        { role: "user", content: h.input },
        { role: "assistant", content: h.output }
      ]),
      { role: "user", content: input }
    ];
    
    await taskService.complete(task, setarVariaveisCamunda({
      messages: JSON.stringify(messages),
      systemPrompt: config.system_prompt,
      modelo: config.modelo || "claude-sonnet-4-20250514",
      tools: JSON.stringify(config.tools || []),
    }));
  }
};
```

#### agente-persistir (topic: agente-persistir)
```javascript
// worker/agente/persistir.js
module.exports = {
  persistirExecucaoAgente: async ({ task, taskService }) => {
    const vars = getListaVariaveis({
      agente_id: "",
      channel_id: "",
      user_id: "",
      user_login: "",
      input: "",
      resposta: "",
      tokens_input: 0,
      tokens_output: 0,
      modelo: "",
      latencia_ms: 0,
      toolCalls: "[]",
    }, task);
    
    // Calcular custo
    const pricing = { "claude-sonnet-4-20250514": { input: 3, output: 15 } };
    const p = pricing[vars.modelo] || { input: 3, output: 15 };
    const custo_usd = (vars.tokens_input * p.input + vars.tokens_output * p.output) / 1000000;
    
    await insertOne({
      insert: {
        agente_id: vars.agente_id,
        channel_id: vars.channel_id,
        user_id: vars.user_id,
        user_login: vars.user_login,
        input: vars.input,
        output: vars.resposta,
        tokens_input: vars.tokens_input,
        tokens_output: vars.tokens_output,
        tokens_total: vars.tokens_input + vars.tokens_output,
        custo_usd,
        modelo: vars.modelo,
        latencia_ms: vars.latencia_ms,
        tool_calls: JSON.parse(vars.toolCalls).map(t => t.name),
        created_at: new Date(),
      },
      collection: "execucoes",
      db: "agente",
    });
    
    await taskService.complete(task);
  }
};
```

### Entrada no DMN

Adicionar linha em `dmn_processo_iniciar_orquestrador`:

| tipo_orquestrador | processo | token_orquestrador |
|-------------------|----------|-------------------|
| genesis | bpmn_ms_agente | MATTERMOST_TOKEN_BOT |

### Config do Agente GENESIS

```javascript
// db.genesis.agentes
{
  agente_id: "genesis",
  nome: "GENESIS",
  descricao: "Assistente de gestão de conhecimento",
  system_prompt_ref: "genesis/GENESIS.md",  // GitHub path
  modelo: "claude-sonnet-4-20250514",
  tools: [
    { name: "github:get_file_contents", ... },
    { name: "github:push_files", ... },
    { name: "mongodb:find", ... },
    { name: "mongodb:aggregate", ... },
    { name: "mongodb:insert-many", ... },
  ],
  limites: {
    contexto_maximo: 150000,
    tokens_diarios_usuario: 500000,
  },
  created_at: ISODate(),
  updated_at: ISODate(),
}
```

---

## Decisões Arquiteturais

| # | Decisão | Rationale |
|---|---------|-----------|
| 1 | MS_Agente como módulo | Reutilizável por outros bots (Zarah v2, futuros) |
| 2 | workerAnthropic (não perguntaAnthropic) | Nomenclatura padrão worker* |
| 3 | agente.execucoes genérico | agente_id distingue qual bot, user_login do MM |
| 4 | Outgoing Webhook MVP | Reusar infra Zarah, DM no backlog |
| 5 | Config por agente em db | system_prompt, modelo, tools por agente |
| 6 | Reusar database/index.js | Database layer já abstrai MongoDB |

---

## Próximos Passos

- [x] **M0:** Problema ✅
- [x] **M1:** Quadro teórico (validado - Zarah em prod) ✅
- [x] **M2:** Fronteiras (validado) ✅
- [ ] **M3:** Detalhar workers restantes (agente-tool, github)
- [ ] **M4:** Documento final
- [ ] Implementar:
  - [ ] worker/anthropic/index.js
  - [ ] worker/agente/contexto.js
  - [ ] worker/agente/persistir.js
  - [ ] worker/agente/github.js
  - [ ] bpmn_ms_agente.bpmn
  - [ ] Entrada no DMN
  - [ ] Config agente GENESIS em db

---

## Referências

### Externas
- Camunda External Task: https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/
- Anthropic API: https://docs.anthropic.com/en/api/messages

### Internas (GitHub ZAZ-vendas)
- Orquestrador-Zarah/config/camunda/index.js
- Orquestrador-Zarah/controller/mattermostController.js
- Orquestrador-Zarah/database/index.js
- Orquestrador-Zarah/utils/validations.js
- Orquestrador-Zarah/worker/llama/index.js (padrão)
- Zarah-Camunda/DMNs/

### Backlog Specs
- genesis/specs/BKL027_Bot_WebSocket.md
- genesis/specs/BKL028_Multi_Modelo.md

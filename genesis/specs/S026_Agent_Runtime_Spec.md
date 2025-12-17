# S026 - Agent Runtime para GENESIS no Mattermost

> **Sprint:** S026  
> **Status:** Em andamento (M1 concluído, M2-M4 pendentes)  
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

### Fontes Externas

**Mattermost Bot API:**
- Bot accounts via personal access tokens
- Não contam para licenciamento
- WebSocket para eventos, REST para posting

**Camunda External Task:**
- Task aguarda worker externo sem chamar explicitamente
- Configurado por topic
- Benefícios: temporal decoupling, polyglot, scaling, avoid timeouts

**Anthropic API:**
- Limites: RPM, ITPM, OTPM, Spend Limit
- Headers `anthropic-ratelimit-tokens-*` mostram limite mais restritivo
- Erro 429 se excedido

### Fontes Internas (Repos ZAZ)

#### Estrutura Orquestrador-Zarah
```
ZAZ-vendas/Orquestrador-Zarah
├── config/
│   └── camunda/index.js      # initCamunda, startProcessCamundaV2, sendSignalCamundaV2
├── controller/
│   └── mattermostController.js  # Webhook handler MM → Camunda
├── database/
│   └── index.js              # MongoDB abstraction layer
├── utils/
│   └── validations.js        # getListaVariaveis, setarVariaveisCamunda
└── worker/
    ├── llama/index.js        # Worker LLM existente
    ├── openAI/index.js       # Worker OpenAI existente
    ├── sistemas/
    │   └── mattermost/index.js  # sendMessage, atualizarPostMattermost
    └── interno/
        └── mongo/index.js    # Workers MongoDB
```

#### Padrão de Worker (descoberto)
```javascript
module.exports = {
  nomeDoWorker: async ({ task, taskService }) => {
    // 1. Extrair variáveis
    const { var1, var2 } = getListaVariaveis({ var1: "", var2: "" }, task);
    
    // 2. Executar lógica
    const response = await algumaAPI(...);
    
    // 3. Completar task com retorno
    await taskService.complete(task, setarVariaveisCamunda({ resultado }));
  }
}
```

#### Helpers Críticos (utils/validations.js)
```javascript
// Extrai variáveis do processo Camunda
getListaVariaveis: (lista, task) => {
  const dados = {};
  Object.keys(lista).forEach((nome) => {
    dados[nome] = !task.variables.get(nome) ? lista[nome] : task.variables.get(nome);
  });
  return dados;
}

// Formata variáveis para retornar ao Camunda
setarVariaveisCamunda: (lista) => {
  const processVariables = new Variables();
  Object.keys(lista).forEach((item, index) => {
    processVariables.set(item, Object.values(lista)[index]);
  });
  return processVariables;
}
```

#### Database Layer (database/index.js)
```javascript
// Operações disponíveis
findOne({ query, collection, db })
find({ query, limit, skip, sort, collection, db })
findCustom({ query, collection, db })
insertOne({ insert, collection, db })
insertMany({ insert, collection, db })
updateOne({ query, update, collection, db })
updateMany({ query, update, collection, db })
deleteOne({ query, collection, db })
deleteMany({ query, collection, db })
countDocuments({ query, collection, db })
aggregateCustom({ pipeline, collection, db })
```

#### Config Camunda (config/camunda/index.js)
```javascript
// Client setup
const client = new Client({
  baseUrl: process.env.CAMUNDA_BASE_URL,
  workerId: uuidv4(),
  asyncResponseTimeout: 10000,
  maxParallelExecutions: 32,
  lockDuration: 30000,
  interval: 2000,
  maxTasks: 32,
});

// Iniciar processo
startProcessCamundaV2: async (processDefinitionKey, variables, tenantId) => {
  const url = `${CAMUNDA_BASE_URL}/process-definition/key/${processDefinitionKey}/start`;
  await axios.post(url, { variables });
}

// Enviar signal para processo existente
sendSignalCamundaV2: async ({ signalName, variables }) => {
  await axios.post(`${CAMUNDA_BASE_URL}/signal`, { name: signalName, variables });
}
```

#### Controller MM → Camunda (mattermostController.js)
```javascript
// Fluxo descoberto:
// 1. Outgoing Webhook do MM chama /api/mattermost/webhook
// 2. Controller extrai: channel_id, user_id, text, file_ids
// 3. DMN decide qual processo iniciar: dmn_processo_iniciar_orquestrador
// 4. Se processo existe → sendSignalCamundaV2 (continua conversa)
// 5. Se não existe → startProcessCamundaV2 (nova conversa)

// Variáveis padrão enviadas ao processo:
{
  channel_id: { value, type: "String" },
  user_id: { value, type: "String" },
  login: { value, type: "String" },
  input: { value, type: "String" },
  tipo_orquestrador: { value, type: "String" },
  token_orquestrador: { value, type: "String" },
  inputFiles: { value: JSON.stringify(files), type: "Json" },
}
```

#### Workers LLM Existentes
```javascript
// worker/llama/index.js - padrão para GENESIS seguir
perguntaLlama: async ({ task, taskService }) => {
  const { pergunta } = getListaVariaveis({ pergunta: "" }, task);
  
  const messages = [
    { role: "system", content: "..." },
    { role: "user", content: pergunta },
  ];
  
  const response = await consultarLlama(messages, "llama3");
  const resposta = response?.message?.content;
  
  await taskService.complete(task, setarVariaveisCamunda({ resposta }));
}
```

#### Workers MM Existentes (reusar)
```javascript
// worker/sistemas/mattermost/index.js
sendMessage              // Envia mensagem simples
sendMessageMultipleChoice // Envia com botões
sendMessageCustom        // Payload customizado
atualizarPostMattermost  // Edita mensagem existente ✅
consultarPostMattermost  // Busca post por ID
```

### Stack Confirmada (Padrão ZAZ)
- **Interface:** Mattermost (Outgoing Webhook → Controller → Camunda)
- **Orquestrador:** Camunda 7 + BPMN
- **Workers:** Node.js + camunda-external-task-client-js
- **LLM:** API externa (já tem OpenAI, Llama → adicionar Anthropic)
- **Persistência:** MongoDB (database/index.js) + GitHub

### Padrões ZAZ a Seguir
- Workers = microsserviços de função única
- Sempre via worker, nunca connector
- External Task Pattern (polling por topic)
- Variáveis em camelCase, datas ISO 8601
- Tokens/secrets via env vars (12-factor)
- Processos modulares e reutilizáveis
- Instâncias não ficam abertas para sempre (timeout)
- `getListaVariaveis()` para entrada, `setarVariaveisCamunda()` para saída

### O que Existe vs O que Criar

| Componente | Status | Onde |
|------------|--------|------|
| Controller MM → Camunda | ✅ Existe | mattermostController.js |
| startProcessCamundaV2 | ✅ Existe | config/camunda/index.js |
| sendSignalCamundaV2 | ✅ Existe | config/camunda/index.js |
| sendMessage MM | ✅ Existe | worker/sistemas/mattermost |
| atualizarPostMattermost | ✅ Existe | worker/sistemas/mattermost |
| database/index.js | ✅ Existe | database/index.js |
| Worker Llama | ✅ Existe | worker/llama |
| Worker OpenAI | ✅ Existe | worker/openAI |
| **Worker Anthropic** | ❌ Criar | worker/anthropic |
| **Worker GitHub** | ❌ Criar | worker/github |
| **Agent Loop BPMN** | ❌ Criar | bpmn/genesis-agent-loop.bpmn |
| **Entrada DMN genesis** | ❌ Criar | DMNs/dmn_processo_iniciar_orquestrador |

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

### Decisão: Outgoing Webhook (padrão Zarah)

**Descoberta importante:** Zarah já usa Outgoing Webhook, não Bot + WebSocket.

**Fluxo atual Zarah:**
```
@zarah mensagem
  ↓
Mattermost (Outgoing Webhook)
  ↓ POST /api/mattermost/webhook
mattermostController.js
  ↓ DMN decide processo
  ↓ startProcessCamundaV2 ou sendSignalCamundaV2
Camunda (BPMN)
  ↓ Workers executam
  ↓ sendMessage responde
```

**Limitação:** Outgoing Webhook não funciona em DM ou canais privados.

**Opções para GENESIS:**
1. **Seguir padrão Zarah** (Outgoing Webhook) → Menos esforço, só canais públicos
2. **Bot + WebSocket** → Mais código, mas funciona em DM/privado

**Decisão pendente:** Depende se DM é requisito.

---

## M2 - Fronteiras

### O que É (Escopo)
- Entrada no DMN para `@genesis` → processo `bpmn_genesis_agent_loop`
- Workflow Agent Loop: BPMN orquestra ciclo LLM ↔ Tools
- Worker Anthropic: chama API, persiste métricas (seguindo padrão worker/llama)
- Worker GitHub: get_file_contents, push_files (novo)
- Reusar: database/index.js, sendMessage, helpers
- Observabilidade: db.execucoes com tokens, latência, modo, custo
- Validação pré-chamada: limite contexto e consumo por usuário

### O que NÃO É (Fora do Escopo)
- Alterar specs dos MS (permanecem iguais)
- Alterar mattermostController.js (só adicionar case no DMN)
- Criar novo database layer (reusar existente)
- Voice/STT/TTS (só texto)
- WhatsApp/Meta (só Mattermost)
- Multi-tenant (um bot, uma org)

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
  custo_input: 0.02284,
  custo_output: 0.01270,
  custo_total: 0.03554,
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

---

## M3 - Especificação

### Arquitetura de Componentes

```
@genesis mensagem no MM
  ↓
Mattermost (Outgoing Webhook existente)
  ↓ POST /api/mattermost/webhook
mattermostController.js (existente)
  ↓ DMN: dmn_processo_iniciar_orquestrador
  ↓ tipo_orquestrador = "genesis" → processo = "bpmn_genesis_agent_loop"
  ↓
CAMUNDA WORKFLOW: bpmn_genesis_agent_loop.bpmn (CRIAR)
  [Start] → [Montar Contexto] → [Validar Limites] →
  [Chamar LLM] → <Gateway> → [Executar Tool] ─┐
      │                        │               │
      │ (resposta final)       │ (loop)        │
      ▼                        │               │
  [Responder MM] ← ───────────┘               │
      │                                        │
  [Persistir Execução] → [End]                │
  ↓
WORKERS (adicionar ao Orquestrador-Zarah)
  - worker/anthropic/index.js      (CRIAR)
  - worker/genesis/github.js       (CRIAR)
  - worker/genesis/montar-contexto.js (CRIAR)
  - worker/genesis/validar-limites.js (CRIAR)
  - worker/genesis/persistir.js    (CRIAR)
  - worker/sistemas/mattermost     (REUSAR sendMessage)
  - database/index.js              (REUSAR)
```

### Workers a Criar

**Worker: Anthropic** (topic: perguntaAnthropic)
```javascript
// worker/anthropic/index.js - seguindo padrão worker/llama
const Anthropic = require("@anthropic-ai/sdk");

module.exports = {
  perguntaAnthropic: async ({ task, taskService }) => {
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
      tools,
    });
    
    const latencia_ms = Date.now() - startTime;
    const resposta = response.content[0]?.text || "";
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

**Worker: GitHub** (topic: githubGetFile, githubPushFiles)
```javascript
// worker/genesis/github.js
const { Octokit } = require("@octokit/rest");

module.exports = {
  githubGetFile: async ({ task, taskService }) => {
    const { owner, repo, path, branch } = getListaVariaveis({...}, task);
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    
    const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    const content = Buffer.from(data.content, "base64").toString();
    
    await taskService.complete(task, setarVariaveisCamunda({ content, sha: data.sha }));
  },
  
  githubPushFiles: async ({ task, taskService }) => {
    // Similar...
  }
};
```

### Entrada no DMN

Adicionar linha em `dmn_processo_iniciar_orquestrador`:

| tipo_orquestrador | processo | token_orquestrador |
|-------------------|----------|-------------------|
| genesis | bpmn_genesis_agent_loop | MATTERMOST_TOKEN_BOT |

---

## Decisões Arquiteturais

| # | Decisão | Rationale |
|---|---------|-----------|
| 1 | Reusar mattermostController | Já tem fluxo webhook → Camunda |
| 2 | Reusar database/index.js | Abstração MongoDB pronta |
| 3 | Reusar sendMessage | Workers MM funcionando |
| 4 | Criar worker/anthropic | Seguir padrão worker/llama |
| 5 | Adicionar no DMN existente | Menor impacto, padrão ZAZ |
| 6 | Novo BPMN para agent loop | Lógica específica do ciclo LLM ↔ Tools |

---

## Próximos Passos

- [x] **M0:** Glossário, dor, causas, requisitos ✅
- [x] **M1:** Quadro teórico com fontes internas ZAZ ✅
- [ ] **M2:** Validar fronteiras
- [ ] **M3:** Finalizar especificação de workers
- [ ] **M4:** Documento final
- [ ] Implementar:
  - [ ] worker/anthropic/index.js
  - [ ] worker/genesis/github.js
  - [ ] bpmn_genesis_agent_loop.bpmn
  - [ ] Entrada no DMN

---

## Referências

### Externas
- Mattermost Bot API: https://developers.mattermost.com/integrate/reference/bot-accounts/
- Camunda External Task: https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/
- Anthropic API: https://docs.anthropic.com/en/api/messages

### Internas (GitHub ZAZ-vendas)
- Orquestrador-Zarah/config/camunda/index.js
- Orquestrador-Zarah/controller/mattermostController.js
- Orquestrador-Zarah/database/index.js
- Orquestrador-Zarah/utils/validations.js
- Orquestrador-Zarah/worker/llama/index.js (padrão LLM)
- Orquestrador-Zarah/worker/sistemas/mattermost/index.js
- Zarah-Camunda/DMNs/
- Zarah-Camunda/Zarah-Mattermost/Processos/

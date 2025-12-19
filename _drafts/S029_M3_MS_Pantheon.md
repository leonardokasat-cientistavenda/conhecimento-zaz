---
nome: MS_Pantheon
versao: "0.1"
tipo: M3 - Classe/Abstração
classe_ref: MetaSystem
origem: interno
status: Em Análise
etapa: M3
sprint_ref: S029
camada: C2
data_criacao: 2025-12-19
m0_ref: _drafts/S029_M0_MS_Pantheon.md
m1_ref: _drafts/S029_M1_MS_Pantheon.md
m2_ref: _drafts/S029_M2_MS_Pantheon.md
---

# M3 - MS_Pantheon: Classe/Abstração

## 1. Visão Geral

Este documento abstrai os padrões identificados no M2 em **interfaces reutilizáveis** e **contratos** que permitem extensibilidade do sistema.

### 1.1 Princípios de Abstração

| Princípio | Aplicação |
|-----------|-----------|
| **Open/Closed** | Aberto para extensão (novos agentes, canais), fechado para modificação |
| **Dependency Inversion** | Módulos dependem de abstrações, não implementações |
| **Single Responsibility** | Cada worker/service tem uma responsabilidade |
| **Interface Segregation** | Interfaces pequenas e específicas |

---

## 2. Interfaces Core

### 2.1 IChannelNormalizer

Contrato para normalizar input de diferentes canais.

```typescript
interface IChannelNormalizer {
  /**
   * Identificador do canal
   */
  readonly channelId: string;  // 'mm' | 'wa' | 'ha' | 'api'
  
  /**
   * Detecta se o payload pertence a este canal
   */
  canHandle(body: object, query: object): boolean;
  
  /**
   * Normaliza o payload para formato interno
   */
  normalize(body: object, query: object): NormalizedInput;
}

interface NormalizedInput {
  source: string;
  channel: string;
  agent: string;
  channel_id: string;
  user_id: string;
  message: string;
  command?: string;
  files: string[];
  metadata: Record<string, any>;
}
```

**Implementações:**
- `MattermostNormalizer`
- `WhatsAppNormalizer`
- `HomeAssistantNormalizer`
- `ApiNormalizer`

### 2.2 IWorker

Contrato para workers Camunda.

```typescript
interface IWorker {
  /**
   * Topic que o worker escuta
   */
  readonly topic: string;
  
  /**
   * Configurações do worker
   */
  readonly config: WorkerConfig;
  
  /**
   * Handler principal
   */
  handle(task: ExternalTask, taskService: TaskService): Promise<void>;
}

interface WorkerConfig {
  lockDuration?: number;      // Default: 30000ms
  maxRetries?: number;        // Default: 3
  retryTimeout?: number;      // Default: 5000ms
  asyncResponseTimeout?: number;
}
```

**Implementações:**
- `ContextoWorker`
- `AnthropicWorker`
- `ToolWorker`
- `PersistirWorker`
- `SendMessageWorker`

### 2.3 ITool

Contrato para tools executáveis pelos agentes.

```typescript
interface ITool {
  /**
   * Nome único da tool (usado no tool_use)
   */
  readonly name: string;
  
  /**
   * Descrição para o LLM
   */
  readonly description: string;
  
  /**
   * Schema dos parâmetros (JSON Schema)
   */
  readonly inputSchema: JSONSchema;
  
  /**
   * Executa a tool
   */
  execute(input: object, context: ToolContext): Promise<ToolResult>;
}

interface ToolContext {
  trace_id: string;
  agent: string;
  user_id: string;
  channel: string;
  channel_id: string;
}

interface ToolResult {
  tool_use_id: string;
  content: string | object;
  is_error: boolean;
}
```

**Implementações:**
- `GitHubGetTool`
- `GitHubPushTool`
- `MongoDBQueryTool`
- `MattermostPostTool`
- `WebSearchTool`

### 2.4 IMessageSender

Contrato para enviar mensagens a diferentes canais.

```typescript
interface IMessageSender {
  /**
   * Canal suportado
   */
  readonly channel: string;
  
  /**
   * Envia mensagem
   */
  send(params: SendParams): Promise<SendResult>;
}

interface SendParams {
  channel_id: string;
  message: string;
  token: string;
  attachments?: Attachment[];
  reply_to?: string;
  metadata?: Record<string, any>;
}

interface SendResult {
  success: boolean;
  message_id?: string;
  error?: string;
}
```

**Implementações:**
- `MattermostSender`
- `WhatsAppSender`
- `HomeAssistantSender`

### 2.5 IContextProvider

Contrato para gerenciamento de contexto.

```typescript
interface IContextProvider {
  /**
   * Busca ou cria contexto
   */
  getOrCreate(key: ContextKey): Promise<Context>;
  
  /**
   * Atualiza contexto com novas mensagens
   */
  appendMessages(contextId: string, messages: Message[]): Promise<void>;
  
  /**
   * Busca system prompt do agente
   */
  getSystemPrompt(agent: string): Promise<string>;
}

interface ContextKey {
  agent: string;
  channel: string;
  channel_id: string;
  user_id: string;
}

interface Context {
  context_id: string;
  messages: Message[];
  config: ContextConfig;
  created_at: Date;
  updated_at: Date;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ContextConfig {
  max_history: number;
  model_override?: string;
}
```

---

## 3. Abstract Classes

### 3.1 BaseWorker

Classe base para todos os workers.

```typescript
abstract class BaseWorker implements IWorker {
  abstract readonly topic: string;
  
  readonly config: WorkerConfig = {
    lockDuration: 30000,
    maxRetries: 3,
    retryTimeout: 5000
  };
  
  protected logger: Logger;
  
  constructor(logger: Logger) {
    this.logger = logger;
  }
  
  /**
   * Template method - implementado pelas subclasses
   */
  abstract process(variables: TaskVariables): Promise<TaskOutput>;
  
  /**
   * Handler padrão com logging e error handling
   */
  async handle(task: ExternalTask, taskService: TaskService): Promise<void> {
    const traceId = task.variables.get('trace_id');
    
    try {
      this.logger.info({
        trace_id: traceId,
        topic: this.topic,
        event: 'worker_started'
      });
      
      const variables = this.extractVariables(task);
      const output = await this.process(variables);
      
      await taskService.complete(task, output);
      
      this.logger.info({
        trace_id: traceId,
        topic: this.topic,
        event: 'worker_completed'
      });
      
    } catch (error) {
      this.logger.error({
        trace_id: traceId,
        topic: this.topic,
        error: error.message,
        event: 'worker_failed'
      });
      
      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: this.config.retryTimeout
      });
    }
  }
  
  protected extractVariables(task: ExternalTask): TaskVariables {
    // Extrai todas variáveis do task
    return {
      trace_id: task.variables.get('trace_id'),
      agent: task.variables.get('agent'),
      channel: task.variables.get('channel'),
      channel_id: task.variables.get('channel_id'),
      user_id: task.variables.get('user_id'),
      message: task.variables.get('message'),
      // ... outras variáveis comuns
    };
  }
}
```

### 3.2 BaseTool

Classe base para tools.

```typescript
abstract class BaseTool implements ITool {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly inputSchema: JSONSchema;
  
  protected logger: Logger;
  
  constructor(logger: Logger) {
    this.logger = logger;
  }
  
  /**
   * Template method - implementado pelas subclasses
   */
  abstract run(input: object, context: ToolContext): Promise<string | object>;
  
  /**
   * Wrapper com logging e error handling
   */
  async execute(input: object, context: ToolContext): Promise<ToolResult> {
    const startTime = Date.now();
    
    try {
      this.logger.info({
        trace_id: context.trace_id,
        tool: this.name,
        event: 'tool_started'
      });
      
      const result = await this.run(input, context);
      
      this.logger.info({
        trace_id: context.trace_id,
        tool: this.name,
        duration_ms: Date.now() - startTime,
        event: 'tool_completed'
      });
      
      return {
        tool_use_id: context.tool_use_id,
        content: result,
        is_error: false
      };
      
    } catch (error) {
      this.logger.error({
        trace_id: context.trace_id,
        tool: this.name,
        error: error.message,
        event: 'tool_failed'
      });
      
      return {
        tool_use_id: context.tool_use_id,
        content: `Error: ${error.message}`,
        is_error: true
      };
    }
  }
  
  /**
   * Retorna definição da tool para API Anthropic
   */
  toAnthropicTool(): AnthropicTool {
    return {
      name: this.name,
      description: this.description,
      input_schema: this.inputSchema
    };
  }
}
```

### 3.3 BaseChannelNormalizer

Classe base para normalizers.

```typescript
abstract class BaseChannelNormalizer implements IChannelNormalizer {
  abstract readonly channelId: string;
  
  abstract canHandle(body: object, query: object): boolean;
  
  abstract extractAgent(body: object, query: object): string;
  abstract extractMessage(body: object): string;
  abstract extractUserId(body: object, query: object): string;
  abstract extractChannelId(body: object): string;
  abstract extractFiles(body: object): string[];
  abstract extractMetadata(body: object, query: object): Record<string, any>;
  
  normalize(body: object, query: object): NormalizedInput {
    const message = this.extractMessage(body);
    
    return {
      source: this.channelId,
      channel: this.channelId,
      agent: this.extractAgent(body, query),
      channel_id: this.extractChannelId(body),
      user_id: this.extractUserId(body, query),
      message: message,
      command: this.extractCommand(message),
      files: this.extractFiles(body),
      metadata: this.extractMetadata(body, query)
    };
  }
  
  protected extractCommand(message: string): string | undefined {
    // Extrai comando após @agent (ex: "@genesis criar agente" → "criar agente")
    const match = message.match(/^(\w+)\s+(.+)/);
    return match ? match[1] : undefined;
  }
}
```

---

## 4. Factories

### 4.1 NormalizerFactory

```typescript
class NormalizerFactory {
  private normalizers: IChannelNormalizer[] = [];
  
  register(normalizer: IChannelNormalizer): void {
    this.normalizers.push(normalizer);
  }
  
  getNormalizer(body: object, query: object): IChannelNormalizer {
    for (const normalizer of this.normalizers) {
      if (normalizer.canHandle(body, query)) {
        return normalizer;
      }
    }
    // Default: API normalizer
    return new ApiNormalizer();
  }
  
  normalize(body: object, query: object): NormalizedInput {
    const normalizer = this.getNormalizer(body, query);
    return normalizer.normalize(body, query);
  }
}

// Uso
const factory = new NormalizerFactory();
factory.register(new MattermostNormalizer());
factory.register(new WhatsAppNormalizer());
factory.register(new HomeAssistantNormalizer());
factory.register(new ApiNormalizer());
```

### 4.2 ToolRegistry

```typescript
class ToolRegistry {
  private tools: Map<string, ITool> = new Map();
  
  register(tool: ITool): void {
    this.tools.set(tool.name, tool);
  }
  
  get(name: string): ITool | undefined {
    return this.tools.get(name);
  }
  
  getAll(): ITool[] {
    return Array.from(this.tools.values());
  }
  
  /**
   * Retorna tools no formato Anthropic
   */
  toAnthropicTools(): AnthropicTool[] {
    return this.getAll().map(tool => ({
      name: tool.name,
      description: tool.description,
      input_schema: tool.inputSchema
    }));
  }
  
  /**
   * Executa uma tool pelo nome
   */
  async execute(name: string, input: object, context: ToolContext): Promise<ToolResult> {
    const tool = this.get(name);
    if (!tool) {
      return {
        tool_use_id: context.tool_use_id,
        content: `Tool not found: ${name}`,
        is_error: true
      };
    }
    return tool.execute(input, context);
  }
}

// Uso
const registry = new ToolRegistry();
registry.register(new GitHubGetTool(logger));
registry.register(new GitHubPushTool(logger));
registry.register(new MongoDBQueryTool(logger));
```

### 4.3 SenderFactory

```typescript
class SenderFactory {
  private senders: Map<string, IMessageSender> = new Map();
  
  register(sender: IMessageSender): void {
    this.senders.set(sender.channel, sender);
  }
  
  get(channel: string): IMessageSender | undefined {
    return this.senders.get(channel);
  }
  
  async send(channel: string, params: SendParams): Promise<SendResult> {
    const sender = this.get(channel);
    if (!sender) {
      return {
        success: false,
        error: `No sender for channel: ${channel}`
      };
    }
    return sender.send(params);
  }
}
```

---

## 5. Padrões de Extensibilidade

### 5.1 Adicionar Novo Canal

1. **Criar Normalizer:**

```typescript
class SlackNormalizer extends BaseChannelNormalizer {
  readonly channelId = 'slack';
  
  canHandle(body: object, query: object): boolean {
    return body.type === 'event_callback' && body.api_app_id !== undefined;
  }
  
  extractAgent(body: object, query: object): string {
    // Extrair do mention ou query
    return query.agent || 'genesis';
  }
  
  extractMessage(body: object): string {
    return body.event?.text || '';
  }
  
  // ... outros métodos
}
```

2. **Criar Sender:**

```typescript
class SlackSender implements IMessageSender {
  readonly channel = 'slack';
  
  async send(params: SendParams): Promise<SendResult> {
    // Implementar via Slack API
  }
}
```

3. **Registrar:**

```typescript
normalizerFactory.register(new SlackNormalizer());
senderFactory.register(new SlackSender());
```

### 5.2 Adicionar Novo Agente

1. **Criar System Prompt:**

```markdown
<!-- genesis/agents/hermes/system_prompt.md -->
# Hermes - O Mensageiro

Você é Hermes, o agente responsável por comunicações e notificações no sistema GENESIS.

## Responsabilidades
- Enviar notificações
- Gerenciar templates de mensagem
- Rotear comunicações entre agentes
```

2. **Criar no Mattermost** (via Postman ou workflow):
   - Criar usuário
   - Gerar token
   - Criar webhook

3. **Atualizar DMN:**

| agent | channel | command | → process | → token | → config |
|-------|---------|---------|-----------|---------|----------|
| hermes | - | - | bpmn_agent_loop | ${HERMES_TOKEN} | {"model":"claude-haiku-3-5-20241022"} |

### 5.3 Adicionar Nova Tool

1. **Criar Tool:**

```typescript
class WebSearchTool extends BaseTool {
  readonly name = 'web_search';
  readonly description = 'Busca informações na web';
  
  readonly inputSchema = {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Termo de busca'
      },
      max_results: {
        type: 'number',
        description: 'Número máximo de resultados',
        default: 5
      }
    },
    required: ['query']
  };
  
  async run(input: { query: string; max_results?: number }, context: ToolContext): Promise<object> {
    // Implementar busca
    const results = await searchApi.search(input.query, input.max_results || 5);
    return { results };
  }
}
```

2. **Registrar:**

```typescript
toolRegistry.register(new WebSearchTool(logger));
```

3. **Habilitar por Agente** (opcional - via config):

```javascript
// genesis/agents/genesis/config.json
{
  "tools": ["github_get", "github_push", "mongodb_query", "web_search"],
  "model": "claude-sonnet-4-20250514"
}
```

---

## 6. Contratos de Dados

### 6.1 DTO: WebhookRequest

```typescript
interface WebhookRequest {
  // Raw input (variável por canal)
  body: object;
  query: Record<string, string>;
  headers: Record<string, string>;
  
  // Gerado
  traceId: string;
  timestamp: Date;
}
```

### 6.2 DTO: ProcessVariables

```typescript
interface ProcessVariables {
  // Identificação
  trace_id: string;
  agent: string;
  channel: string;
  channel_id: string;
  user_id: string;
  
  // Input
  message: string;
  files: string[];        // JSON array
  metadata: string;       // JSON object
  
  // Routing (do DMN)
  agent_token: string;
  config: string;         // JSON object
  
  // Context (após agente-contexto)
  context_id?: string;
  system_prompt?: string;
  messages?: string;      // JSON array
  
  // LLM Response (após agente-anthropic)
  response?: string;      // JSON object
  assistant_message?: string;
  stop_reason?: string;
  usage?: string;         // JSON object
  has_tool_use?: boolean;
  tool_use?: string;      // JSON object
  
  // Tool Execution (após agente-tool)
  tool_result?: string;   // JSON object
  
  // Output (após agente-sendMessage)
  send_result?: string;   // JSON object
  post_id?: string;
  
  // Persistence (após agente-persistir)
  execution_id?: string;
}
```

### 6.3 Events (para ClickHouse)

```typescript
interface PantheonEvent {
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error';
  service: 'webhook' | 'worker' | 'tool' | 'sender';
  
  // Context
  trace_id: string;
  agent: string;
  channel: string;
  channel_id: string;
  user_id: string;
  
  // Event
  event: string;
  message: string;
  
  // Metrics (optional)
  duration_ms?: number;
  tokens_input?: number;
  tokens_output?: number;
  
  // Error (optional)
  error_code?: string;
  error_message?: string;
  
  // Extensível
  metadata?: Record<string, any>;
}
```

---

## 7. Diagrama de Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              INTERFACES                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │IChannelNormalizer│  │     IWorker      │  │      ITool       │          │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤          │
│  │+channelId        │  │+topic            │  │+name             │          │
│  │+canHandle()      │  │+config           │  │+description      │          │
│  │+normalize()      │  │+handle()         │  │+inputSchema      │          │
│  └────────┬─────────┘  └────────┬─────────┘  │+execute()        │          │
│           │                     │            └────────┬─────────┘          │
│           │                     │                     │                     │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│           │            ABSTRACT CLASSES               │                     │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│           ▼                     ▼                     ▼                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │BaseChannel       │  │   BaseWorker     │  │    BaseTool      │          │
│  │Normalizer        │  ├──────────────────┤  ├──────────────────┤          │
│  ├──────────────────┤  │#logger           │  │#logger           │          │
│  │#extractAgent()   │  │+handle()         │  │+execute()        │          │
│  │#extractMessage() │  │#process()*       │  │#run()*           │          │
│  │#extractUserId()  │  │#extractVariables│  │+toAnthropicTool()│          │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                     │                     │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│           │            IMPLEMENTATIONS                │                     │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│           ▼                     ▼                     ▼                     │
│  ┌────────────────┐    ┌────────────────┐    ┌────────────────┐            │
│  │Mattermost      │    │ContextoWorker │    │GitHubGetTool   │            │
│  │Normalizer      │    ├────────────────┤    ├────────────────┤            │
│  ├────────────────┤    │topic="agente-  │    │name="github_   │            │
│  │channelId="mm"  │    │contexto"       │    │get"            │            │
│  └────────────────┘    └────────────────┘    └────────────────┘            │
│                                                                              │
│  ┌────────────────┐    ┌────────────────┐    ┌────────────────┐            │
│  │WhatsApp        │    │AnthropicWorker │    │GitHubPushTool  │            │
│  │Normalizer      │    ├────────────────┤    ├────────────────┤            │
│  ├────────────────┤    │topic="agente-  │    │name="github_   │            │
│  │channelId="wa"  │    │anthropic"      │    │push"           │            │
│  └────────────────┘    └────────────────┘    └────────────────┘            │
│                                                                              │
│  ┌────────────────┐    ┌────────────────┐    ┌────────────────┐            │
│  │HomeAssistant   │    │ToolWorker      │    │MongoDBQuery    │            │
│  │Normalizer      │    ├────────────────┤    │Tool            │            │
│  ├────────────────┤    │topic="agente-  │    ├────────────────┤            │
│  │channelId="ha"  │    │tool"           │    │name="mongodb_  │            │
│  └────────────────┘    └────────────────┘    │query"          │            │
│                                              └────────────────┘            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FACTORIES                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │  NormalizerFactory   │  │    ToolRegistry      │  │  SenderFactory   │  │
│  ├──────────────────────┤  ├──────────────────────┤  ├──────────────────┤  │
│  │-normalizers[]        │  │-tools: Map           │  │-senders: Map     │  │
│  │+register()           │  │+register()           │  │+register()       │  │
│  │+getNormalizer()      │  │+get()                │  │+get()            │  │
│  │+normalize()          │  │+toAnthropicTools()   │  │+send()           │  │
│  └──────────────────────┘  │+execute()            │  └──────────────────┘  │
│                            └──────────────────────┘                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Resumo de Extensibilidade

| Extensão | Interface | Factory | Registro |
|----------|-----------|---------|----------|
| Novo Canal | `IChannelNormalizer` + `IMessageSender` | `NormalizerFactory` + `SenderFactory` | `factory.register()` |
| Novo Agente | System prompt + MM user | - | DMN + GitHub |
| Nova Tool | `ITool` | `ToolRegistry` | `registry.register()` |
| Novo Worker | `IWorker` | - | `client.subscribe()` |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-19 | M3 criado. Interfaces (IChannelNormalizer, IWorker, ITool, IMessageSender, IContextProvider), Abstract Classes (BaseWorker, BaseTool, BaseChannelNormalizer), Factories, Contratos de Dados, Diagrama de Classes. |

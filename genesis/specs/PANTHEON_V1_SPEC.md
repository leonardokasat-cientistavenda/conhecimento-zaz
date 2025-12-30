---
nome: PANTHEON_V1_SPEC
versao: "1.0"
tipo: Spec
status: Draft
data_criacao: 2025-12-30
dependencia: V0.2
---

# Pantheon V1 - Spec

> **MCP Tools - GitHub, MongoDB, Mattermost**
> 
> Claude com acesso a ferramentas para ler/escrever no GitHub,
> consultar MongoDB e buscar informações no Mattermost.

---

## 1. Objetivo

Usuário menciona `@genesis` e pode pedir para ele interagir com
sistemas externos (GitHub, MongoDB, Mattermost) de forma natural.

### Critérios de Sucesso

```
[Leonardo]: @genesis qual o status do sprint atual?
[genesis]:  🔧 Consultando MongoDB...
            Sprint S-PANTHEON-V0-001 está em 80% de conclusão.
            Tasks pendentes: T07, T10.

[Leonardo]: @genesis lê o arquivo genesis/GENESIS.md e me faz um resumo
[genesis]:  🔧 Buscando no GitHub...
            GENESIS é um sistema de inteligência híbrida com 3 capacidades
            principais: CONHECER, DECIDIR e GERENCIAR...

[Leonardo]: @genesis quem postou mais mensagens hoje no #dev?
[genesis]:  🔧 Consultando Mattermost...
            Ranking de mensagens hoje em #dev:
            1. Leonardo: 23 mensagens
            2. Gabriel: 12 mensagens
            3. Ana: 8 mensagens
```

---

## 2. Escopo

### 2.1 Entrega (V1)

| Tool | Operações | Descrição |
|------|-----------|-----------|
| **GitHub** | get_file | Ler arquivo do repo |
| | list_files | Listar arquivos de diretório |
| | search_code | Buscar código no repo |
| | create_file | Criar arquivo novo |
| | update_file | Atualizar arquivo existente |
| **MongoDB** | find | Query com filtro |
| | findOne | Buscar documento único |
| | aggregate | Pipeline de agregação |
| | insertOne | Inserir documento |
| | updateOne | Atualizar documento |
| **Mattermost** | search_posts | Buscar mensagens |
| | get_user | Info de usuário |
| | get_channel | Info de canal |
| | get_channel_posts | Posts recentes do canal |

### 2.2 Não Entrega (V1)

| Capacidade | Versão |
|------------|--------|
| Extended thinking | V1.1 |
| Memory persistente | V1.2 |
| Multi-agentes | V2 |
| Camunda/DMN | V2 |
| Canais externos (WA, Telegram) | V2 |

---

## 3. Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    PANTHEON V1                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 ANTHROPIC CLIENT                     │   │
│  │           (messages + tools + web_search)            │   │
│  └───────────────────────┬─────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  TOOL EXECUTOR                       │   │
│  │         (loop enquanto stop_reason = tool_use)       │   │
│  └───────────────────────┬─────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  TOOL REGISTRY                       │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │   │
│  │  │  GitHub  │ │ MongoDB  │ │Mattermost│            │   │
│  │  │  Tool    │ │  Tool    │ │  Tool    │            │   │
│  │  └──────────┘ └──────────┘ └──────────┘            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Fluxo de Tool Use

```
1. User: "@genesis qual o status do sprint atual?"

2. Anthropic recebe com tools definidas
   → Claude decide: preciso consultar MongoDB

3. Response com stop_reason: "tool_use"
   {
     type: "tool_use",
     name: "mongodb_find",
     input: {
       database: "genesis",
       collection: "sprint_sessions",
       filter: { status: "active" }
     }
   }

4. Tool Executor intercepta
   → Executa query no MongoDB
   → Retorna resultado

5. Anthropic recebe tool_result
   → Claude formata resposta final

6. Response com stop_reason: "end_turn"
   → Streamer envia para MM
```

### 4.1 Loop de Múltiplas Tools

```
┌─────────────────────────────────────────────────────────────┐
│  Claude pode chamar MÚLTIPLAS tools em sequência            │
│                                                             │
│  Exemplo: "compara o sprint atual com o anterior"           │
│                                                             │
│  1. tool_use: mongodb_find (sprint atual)                   │
│  2. tool_result: { sprint: "S-001", progress: 80 }          │
│  3. tool_use: mongodb_find (sprint anterior)                │
│  4. tool_result: { sprint: "S-000", progress: 100 }         │
│  5. end_turn: "O sprint atual está em 80%, o anterior..."   │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Definição das Tools

### 5.1 GitHub Tool

```javascript
const githubTools = [
  {
    name: "github_get_file",
    description: "Lê o conteúdo de um arquivo do repositório GitHub",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Caminho do arquivo (ex: genesis/GENESIS.md)"
        },
        repo: {
          type: "string",
          description: "Nome do repositório",
          default: "conhecimento-zaz"
        }
      },
      required: ["path"]
    }
  },
  {
    name: "github_list_files",
    description: "Lista arquivos de um diretório no repositório",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Caminho do diretório (ex: genesis/specs)"
        },
        repo: {
          type: "string",
          default: "conhecimento-zaz"
        }
      },
      required: ["path"]
    }
  },
  {
    name: "github_search_code",
    description: "Busca código no repositório",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Termo de busca"
        },
        repo: {
          type: "string",
          default: "conhecimento-zaz"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "github_create_file",
    description: "Cria um novo arquivo no repositório",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
        content: { type: "string" },
        message: { type: "string", description: "Mensagem do commit" },
        repo: { type: "string", default: "conhecimento-zaz" }
      },
      required: ["path", "content", "message"]
    }
  },
  {
    name: "github_update_file",
    description: "Atualiza um arquivo existente no repositório",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
        content: { type: "string" },
        message: { type: "string" },
        repo: { type: "string", default: "conhecimento-zaz" }
      },
      required: ["path", "content", "message"]
    }
  }
];
```

### 5.2 MongoDB Tool

```javascript
const mongodbTools = [
  {
    name: "mongodb_find",
    description: "Busca documentos em uma collection do MongoDB",
    input_schema: {
      type: "object",
      properties: {
        database: {
          type: "string",
          description: "Nome do database",
          default: "genesis"
        },
        collection: {
          type: "string",
          description: "Nome da collection"
        },
        filter: {
          type: "object",
          description: "Filtro da query (MongoDB query syntax)"
        },
        limit: {
          type: "number",
          description: "Limite de documentos",
          default: 10
        }
      },
      required: ["collection"]
    }
  },
  {
    name: "mongodb_findOne",
    description: "Busca um único documento",
    input_schema: {
      type: "object",
      properties: {
        database: { type: "string", default: "genesis" },
        collection: { type: "string" },
        filter: { type: "object" }
      },
      required: ["collection", "filter"]
    }
  },
  {
    name: "mongodb_aggregate",
    description: "Executa pipeline de agregação",
    input_schema: {
      type: "object",
      properties: {
        database: { type: "string", default: "genesis" },
        collection: { type: "string" },
        pipeline: {
          type: "array",
          description: "Array de estágios do pipeline"
        }
      },
      required: ["collection", "pipeline"]
    }
  },
  {
    name: "mongodb_insertOne",
    description: "Insere um documento na collection",
    input_schema: {
      type: "object",
      properties: {
        database: { type: "string", default: "genesis" },
        collection: { type: "string" },
        document: { type: "object" }
      },
      required: ["collection", "document"]
    }
  },
  {
    name: "mongodb_updateOne",
    description: "Atualiza um documento na collection",
    input_schema: {
      type: "object",
      properties: {
        database: { type: "string", default: "genesis" },
        collection: { type: "string" },
        filter: { type: "object" },
        update: { type: "object" }
      },
      required: ["collection", "filter", "update"]
    }
  }
];
```

### 5.3 Mattermost Tool

```javascript
const mattermostTools = [
  {
    name: "mattermost_search_posts",
    description: "Busca mensagens no Mattermost",
    input_schema: {
      type: "object",
      properties: {
        terms: {
          type: "string",
          description: "Termos de busca"
        },
        channel: {
          type: "string",
          description: "Nome do canal (opcional)"
        },
        from: {
          type: "string",
          description: "Username do autor (opcional)"
        },
        date_range: {
          type: "string",
          description: "today, yesterday, this_week, last_week"
        }
      },
      required: ["terms"]
    }
  },
  {
    name: "mattermost_get_user",
    description: "Obtém informações de um usuário",
    input_schema: {
      type: "object",
      properties: {
        username: { type: "string" }
      },
      required: ["username"]
    }
  },
  {
    name: "mattermost_get_channel",
    description: "Obtém informações de um canal",
    input_schema: {
      type: "object",
      properties: {
        channel_name: { type: "string" }
      },
      required: ["channel_name"]
    }
  },
  {
    name: "mattermost_get_channel_posts",
    description: "Obtém posts recentes de um canal",
    input_schema: {
      type: "object",
      properties: {
        channel_name: { type: "string" },
        limit: { type: "number", default: 20 }
      },
      required: ["channel_name"]
    }
  }
];
```

---

## 6. Estrutura de Arquivos

```
pantheon/
├── core/
│   ├── toolRegistry.js       # Registro de todas as tools
│   └── toolExecutor.js       # Loop de execução
├── tools/
│   ├── index.js              # Re-exports
│   ├── github.js             # GitHub tool implementation
│   ├── mongodb.js            # MongoDB tool implementation
│   └── mattermost.js         # Mattermost tool implementation
└── services/
    ├── github/
    │   └── client.js         # GitHub API client
    └── mongodb/
        └── client.js         # MongoDB client
```

---

## 7. Tool Registry

```javascript
// core/toolRegistry.js

class ToolRegistry {
  constructor() {
    this.tools = new Map();
  }

  register(name, definition, handler) {
    this.tools.set(name, { definition, handler });
  }

  getDefinitions() {
    return Array.from(this.tools.values()).map(t => t.definition);
  }

  async execute(name, input) {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Tool not found: ${name}`);
    return await tool.handler(input);
  }
}

// Uso
const registry = new ToolRegistry();

registry.register(
  'github_get_file',
  githubTools[0],
  async (input) => {
    const content = await github.getFile(input.repo, input.path);
    return { success: true, content };
  }
);
```

---

## 8. Tool Executor

```javascript
// core/toolExecutor.js

async function executeWithTools(messages, registry, streamer) {
  const tools = [
    // Web search built-in
    { type: "web_search_20250305", name: "web_search", max_uses: 5 },
    // Custom tools
    ...registry.getDefinitions()
  ];

  let response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    messages,
    tools,
    stream: true
  });

  // Loop enquanto Claude pedir tools
  while (response.stop_reason === "tool_use") {
    const toolUse = response.content.find(c => c.type === "tool_use");
    
    // Feedback visual
    await streamer.update(`🔧 Executando ${toolUse.name}...`);
    
    // Executar tool
    const result = await registry.execute(toolUse.name, toolUse.input);
    
    // Continuar conversa com resultado
    response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      messages: [
        ...messages,
        { role: "assistant", content: response.content },
        {
          role: "user",
          content: [{
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify(result)
          }]
        }
      ],
      tools,
      stream: true
    });
  }

  return response;
}
```

---

## 9. Configuração

### 9.1 Variáveis de Ambiente (adicionais)

```bash
# GitHub (já existe no MCP)
GITHUB_TOKEN=ghp_xxx
GITHUB_OWNER=leonardokasat-cientistavenda
GITHUB_REPO_DEFAULT=conhecimento-zaz

# MongoDB (já existe)
MONGODB_URI=mongodb+srv://...

# Tools
TOOLS_ENABLED=github,mongodb,mattermost
TOOLS_MAX_ITERATIONS=10
```

---

## 10. Segurança

### 10.1 Permissões por Tool

| Tool | Leitura | Escrita | Restrição |
|------|---------|---------|-----------|
| GitHub | ✅ | ⚠️ | Só repos autorizados |
| MongoDB | ✅ | ⚠️ | Só collections permitidas |
| Mattermost | ✅ | ❌ | Só leitura |

### 10.2 Rate Limits

| Tool | Limite |
|------|--------|
| GitHub API | 5000 req/hora |
| MongoDB | 100 queries/minuto |
| Mattermost | 60 req/minuto |

### 10.3 Sanitização

```javascript
// Validar inputs antes de executar
function validateMongoFilter(filter) {
  // Bloquear operadores perigosos
  const dangerous = ['$where', '$function'];
  const str = JSON.stringify(filter);
  for (const op of dangerous) {
    if (str.includes(op)) {
      throw new Error(`Operador não permitido: ${op}`);
    }
  }
}
```

---

## 11. Estimativa de Esforço

| Componente | Esforço |
|------------|---------|
| Tool Registry | 2h |
| Tool Executor (loop) | 3h |
| GitHub Tool | 3h |
| MongoDB Tool | 3h |
| Mattermost Tool | 2h |
| Testes | 3h |
| **Total** | **~16h** |

---

## 12. Dependências

```json
{
  "dependencies": {
    "@octokit/rest": "^20.0.0",
    "mongodb": "^6.3.0"
  }
}
```

> Nota: MM client já existe de V0

---

## 13. Roadmap Pós-V1

### V1.1 - Extended Thinking (~2h)

```javascript
// Adicionar flag na chamada
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  messages,
  thinking: {
    type: "enabled",
    budget_tokens: 10000
  }
});
```

| Capacidade | Descrição |
|------------|-----------|
| Deep reasoning | Claude "pensa" antes de responder |
| Comando | `@genesis /think [pergunta complexa]` |
| Uso | Problemas complexos, análise profunda |

### V1.2 - Memory (~6h)

| Capacidade | Descrição |
|------------|-----------|
| Memory por usuário | Lembra preferências entre sessões |
| Memory por canal | Contexto específico do canal |
| Memory controls | `/remember`, `/forget` |

**Arquitetura:**
```
Collection: genesis.memories
{
  user_id: "abc123",
  channel_id: "xyz789",  // opcional
  type: "preference",    // preference, fact, instruction
  content: "Prefere respostas concisas",
  created_at: ISODate,
  expires_at: ISODate    // opcional
}
```

---

## 14. Comparativo Final (Após V1.2)

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
| Code execution | ✅ | ❌ |
| Artifacts | ✅ | ❌ |

**V1.2 ≈ 90% Claude Desktop + vantagens exclusivas**

---

## 15. Referências

| Documento | Path |
|-----------|------|
| Spec V0 | `genesis/specs/PANTHEON_V0_SPEC.md` |
| Backlog | `genesis/backlog/BACKLOG_PANTHEON.md` |
| Anthropic Tool Use | https://docs.anthropic.com/en/docs/agents-and-tools/tool-use |
| GitHub API | https://docs.github.com/en/rest |
| MongoDB Node.js | https://www.mongodb.com/docs/drivers/node/current/ |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-30 | Spec inicial V1 - MCP Tools |

---
id: BKL-038
nome: Spec schema_execucoes
versao: "1.0"
tipo: Spec
vertente: M3.C
status: Draft
sprint_ref: S026
template_ref: _catalogo/templates/M3_C_Config.md
artefatos_produzidos:
  - "db.agente.execucoes (collection)"
  - "schemas/execucoes.json"
---

# M3.C.01 - Spec schema_execucoes

## 1. Contexto

Definição do schema da coleção `agente.execucoes` que armazena o histórico de execuções dos agentes.

## 2. Schema

### 2.1 Definição

```yaml
collection_nome: "execucoes"
database: "agente"
versao: "1.0"

campos:
  - nome: "_id"
    tipo: "ObjectId"
    obrigatorio: true
    descricao: "ID único do documento"

  - nome: "agente_id"
    tipo: "string"
    obrigatorio: true
    enum: ["genesis", "zarah"]
    descricao: "Identificador do agente"

  - nome: "user_id"
    tipo: "string"
    obrigatorio: true
    descricao: "ID do usuário no Mattermost"

  - nome: "user_login"
    tipo: "string"
    obrigatorio: true
    descricao: "Login do usuário no Mattermost"

  - nome: "channel_id"
    tipo: "string"
    obrigatorio: true
    descricao: "ID do canal Mattermost"

  - nome: "input"
    tipo: "string"
    obrigatorio: true
    descricao: "Mensagem original do usuário"

  - nome: "output"
    tipo: "string"
    obrigatorio: true
    descricao: "Resposta gerada pelo agente"

  - nome: "modelo"
    tipo: "string"
    obrigatorio: true
    enum: ["claude-sonnet-4-20250514", "claude-haiku-4-20250514", "claude-opus-4-20250514"]
    descricao: "Modelo LLM utilizado"

  - nome: "tokens_input"
    tipo: "int"
    obrigatorio: true
    min: 0
    descricao: "Tokens de entrada consumidos"

  - nome: "tokens_output"
    tipo: "int"
    obrigatorio: true
    min: 0
    descricao: "Tokens de saída gerados"

  - nome: "tokens_total"
    tipo: "int"
    obrigatorio: true
    min: 0
    descricao: "Total de tokens (input + output)"

  - nome: "custo_usd"
    tipo: "float"
    obrigatorio: true
    min: 0
    descricao: "Custo em USD da execução"

  - nome: "latencia_ms"
    tipo: "int"
    obrigatorio: true
    min: 0
    descricao: "Latência da chamada LLM em ms"

  - nome: "tool_calls"
    tipo: "array"
    obrigatorio: false
    default: []
    descricao: "Lista de tools chamadas (nomes)"

  - nome: "created_at"
    tipo: "date"
    obrigatorio: true
    default: "$$NOW"
    descricao: "Data/hora da execução"
```

### 2.2 Índices

```yaml
indices:
  - nome: "idx_agente_channel"
    campos: ["agente_id", "channel_id"]
    tipo: "compound"
    justificativa: "Busca de histórico por agente e canal"

  - nome: "idx_created_at"
    campos: ["created_at"]
    tipo: "single"
    ordem: -1
    justificativa: "Ordenação por data"

  - nome: "idx_user_id"
    campos: ["user_id"]
    tipo: "single"
    justificativa: "Busca por usuário"

  - nome: "idx_agente_created"
    campos: ["agente_id", "created_at"]
    tipo: "compound"
    ordem: [-1]
    justificativa: "Métricas por agente ordenadas por data"
```

## 3. Exemplo de Documento

```javascript
{
  _id: ObjectId("6759..."),
  agente_id: "genesis",
  user_id: "mm_user_abc123",
  user_login: "leonardo",
  channel_id: "channel_xyz789",
  input: "status do sprint S026",
  output: "Sprint S026 está em andamento com 7 itens...",
  modelo: "claude-sonnet-4-20250514",
  tokens_input: 1523,
  tokens_output: 847,
  tokens_total: 2370,
  custo_usd: 0.0355,
  latencia_ms: 2340,
  tool_calls: ["github:get_file_contents", "mongodb:find"],
  created_at: ISODate("2025-12-17T20:15:00Z")
}
```

## 4. Schema TDD

### 4.1 Classes de Equivalência

| Atributo | Partição | Valores Exemplo | Válida |
|----------|----------|-----------------|--------|
| agente_id | genesis | "genesis" | ✅ |
| agente_id | zarah | "zarah" | ✅ |
| agente_id | invalido | "xxx", "" | ❌ |
| agente_id | null | null | ❌ |
| tokens_input | positivo | 100, 1000 | ✅ |
| tokens_input | zero | 0 | ✅ |
| tokens_input | negativo | -1 | ❌ |
| modelo | sonnet | claude-sonnet-4-20250514 | ✅ |
| modelo | invalido | gpt-4 | ❌ |
| tool_calls | com_tools | ["github:..."] | ✅ |
| tool_calls | vazio | [] | ✅ |
| tool_calls | null | null | ✅ (usa default []) |

### 4.2 Critérios de Aceite

| ID | Given | When | Then |
|----|-------|------|------|
| CA01 | documento com todos campos válidos | insertOne() | documento inserido com sucesso |
| CA02 | documento sem agente_id | insertOne() | erro: agente_id obrigatório |
| CA03 | documento com agente_id="xxx" | insertOne() | erro: agente_id deve ser genesis ou zarah |
| CA04 | documento com tokens_input=-1 | insertOne() | erro: tokens_input deve ser >= 0 |
| CA05 | documento sem tool_calls | insertOne() | inserido com tool_calls=[] (default) |
| CA06 | busca por agente_id+channel_id | find() | usa índice idx_agente_channel |

### 4.3 Cobertura

- **Estratégia:** pairwise
- **Combinações:** 12

## 5. JSON Schema (MongoDB Validator)

```javascript
db.createCollection("execucoes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["agente_id", "user_id", "user_login", "channel_id", "input", "output", "modelo", "tokens_input", "tokens_output", "tokens_total", "custo_usd", "latencia_ms", "created_at"],
      properties: {
        agente_id: {
          bsonType: "string",
          enum: ["genesis", "zarah"],
          description: "ID do agente"
        },
        user_id: {
          bsonType: "string",
          description: "ID do usuário Mattermost"
        },
        user_login: {
          bsonType: "string",
          description: "Login do usuário"
        },
        channel_id: {
          bsonType: "string",
          description: "ID do canal"
        },
        input: {
          bsonType: "string",
          description: "Mensagem do usuário"
        },
        output: {
          bsonType: "string",
          description: "Resposta do agente"
        },
        modelo: {
          bsonType: "string",
          enum: ["claude-sonnet-4-20250514", "claude-haiku-4-20250514", "claude-opus-4-20250514"],
          description: "Modelo utilizado"
        },
        tokens_input: {
          bsonType: "int",
          minimum: 0,
          description: "Tokens de entrada"
        },
        tokens_output: {
          bsonType: "int",
          minimum: 0,
          description: "Tokens de saída"
        },
        tokens_total: {
          bsonType: "int",
          minimum: 0,
          description: "Total de tokens"
        },
        custo_usd: {
          bsonType: "double",
          minimum: 0,
          description: "Custo em USD"
        },
        latencia_ms: {
          bsonType: "int",
          minimum: 0,
          description: "Latência em ms"
        },
        tool_calls: {
          bsonType: "array",
          description: "Tools chamadas"
        },
        created_at: {
          bsonType: "date",
          description: "Data da execução"
        }
      }
    }
  }
});
```

## 6. Checklist

| ID | Verificação | Status |
|----|-------------|--------|
| CK01 | Todos campos tipados | ✅ |
| CK02 | Campos obrigatórios marcados | ✅ |
| CK03 | Índices definidos | ✅ |
| CK04 | Defaults definidos | ✅ |
| CK05 | Enum para valores fixos | ✅ |
| CK06 | JSON Schema válido | ✅ |

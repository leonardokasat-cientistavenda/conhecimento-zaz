---
titulo: "MongoDB - Persistência Transacional"
versao: "1.2"
data_publicacao: "2025-12-08"
camada: 2
tipo: "Infraestrutura"
dominio: "Persistência"
tags:
  - mongodb
  - persistencia
  - banco-dados
  - infraestrutura
depende_de: []
---

# MongoDB - Persistência Transacional v1.2

## 1. Contexto

### 1.1 Papel na Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PERSISTÊNCIA                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS.persistir(dado, tipo_dado)                                         │
│  │                                                                          │
│  ├─ SE tipo == definição (.md)                                              │
│  │     └─ GitHub.persistir_md() → criar() | editar() | substituir()         │
│  │                                                                          │
│  └─ SE tipo == transação                                                    │
│        └─ MongoDB.persistir() → inserir() | atualizar()                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GITHUB (Definições)                 MONGODB (Transações)                   │
│  ────────────────────                ───────────────────                    │
│  • GENESIS.md                        • catalogo                             │
│  • Epistemologia.md                  • backlog_items                        │
│  • Módulos (.md)                     • sprints                              │
│  • Prompts                           • decisoes                             │
│                                                                             │
│  Muda pouco, versionado              Muda frequentemente, queries rápidas   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Conexão

| Campo | Valor |
|-------|-------|
| Provider | MongoDB Atlas (Google Cloud) |
| Região | São Paulo (southamerica-east1) |
| Cluster | Genesis |
| Database | `genesis_db` |
| User | `genesis_app` |

**Connection String (template):**
```
mongodb+srv://genesis_app:<PASSWORD>@genesis.27zbngf.mongodb.net/genesis_db?retryWrites=true&w=majority&appName=Genesis
```

---

## 2. Database: genesis_db

### 2.1 Collections

| Collection | Propósito | Migra de |
|------------|-----------|----------|
| `catalogo` | Índice semântico para busca | `_catalogo/indice.yaml` |
| `backlog_items` | Itens de trabalho | `_backlog/*.md` |
| `sprints` | Ciclos de execução | `_sprints/*.md` |
| `decisoes` | Histórico de decisões | (novo) |

---

## 3. Métodos

### 3.1 Método Orquestrador: persistir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    persistir(collection, documento)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADE: Decidir COMO persistir transação no MongoDB              │
│  CHAMADO POR: GENESIS.persistir() quando tipo == transação                  │
│                                                                             │
│  Input:                                                                     │
│  - collection: string (catalogo | backlog_items | sprints | decisoes)       │
│  - documento: object (dados a persistir)                                    │
│                                                                             │
│  Output:                                                                    │
│  - Resultado: {sucesso: bool, metodo: string, id: string}                   │
│                                                                             │
│  Fluxo de Decisão:                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │  SE documento._id não existe E documento.id não existe no banco:    │    │
│  │     → inserir(collection, documento)                                │    │
│  │                                                                     │    │
│  │  SE documento._id existe OU documento.id existe no banco:           │    │
│  │     → atualizar(collection, documento)                              │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Método: inserir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      inserir(collection, documento)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  QUANDO USAR: Documento NÃO existe                                          │
│                                                                             │
│  Input:                                                                     │
│  - collection: string                                                       │
│  - documento: object                                                        │
│                                                                             │
│  Comportamento:                                                             │
│  1. Adicionar created_at = now()                                            │
│  2. Adicionar updated_at = now()                                            │
│  3. mongodb:insert-many(collection, [documento])                            │
│                                                                             │
│  Output: {sucesso: true, metodo: "inserir", id: documento.id}               │
│                                                                             │
│  API: mongodb:insert-many                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Método: atualizar()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     atualizar(collection, documento)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  QUANDO USAR: Documento JÁ existe                                           │
│                                                                             │
│  Input:                                                                     │
│  - collection: string                                                       │
│  - documento: object (deve conter _id ou id para filtro)                    │
│                                                                             │
│  Comportamento:                                                             │
│  1. Atualizar updated_at = now()                                            │
│  2. mongodb:update-many(collection, filter, update)                         │
│                                                                             │
│  Output: {sucesso: true, metodo: "atualizar", id: documento.id}             │
│                                                                             │
│  API: mongodb:update-many                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Tabela de Decisão

| Dado | Collection | Operação |
|------|------------|----------|
| Novo item catálogo | catalogo | inserir() |
| Atualizar catálogo | catalogo | atualizar() |
| Capturar backlog | backlog_items | inserir() |
| Promover backlog | backlog_items | atualizar() |
| Criar sprint | sprints | inserir() |
| Atualizar task | sprints | atualizar() |
| Registrar decisão | decisoes | inserir() |
| Incrementar uso | decisoes | atualizar() |

---

## 4. Schemas

### 4.1 catalogo

Armazena índice semântico para busca rápida.

```javascript
{
  _id: ObjectId,
  
  // Identificação
  id: String,           // "ms_epistemologia", "bl_autonomia", "sp_010"
  tipo: String,         // "docs" | "backlog" | "sprint"
  nome: String,         // "Epistemologia"
  
  // Busca Semântica
  chave: String,        // palavras-chave para matching
  triggers: [String],   // frases que ativam o item
  
  // Localização
  arquivo: String,      // "docs/00_E/00_E_Epistemologia.md"
  
  // Metadata específica por tipo
  metadata: {
    versao: String,     // "3.4" (docs)
    camada: String,     // "C3" (docs)
    status: String,     // "Publicado" | "Pendente" | "Ativa" | "Concluida"
    prioridade: String, // "alta" | "media" | "baixa" (backlog)
    origem: String,     // "S009" (backlog)
    data_inicio: Date,  // (sprint)
    data_fim: Date      // (sprint)
  },
  
  // Capability (opcional, para discovery)
  capability: {
    id: String,
    nome_amigavel: String,
    descricao: String,
    exemplos: [String]
  },
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ id: 1 }` - único
- `{ tipo: 1, "metadata.status": 1 }` - busca por tipo e status
- `{ chave: "text", nome: "text", triggers: "text" }` - busca textual

---

### 4.2 backlog_items

Armazena itens de trabalho com histórico completo.

```javascript
{
  _id: ObjectId,
  
  // Identificação
  id: String,           // "bl_persistencia_hibrida"
  titulo: String,       // "Arquitetura de Persistência Híbrida"
  slug: String,         // "persistencia-hibrida"
  
  // Classificação
  tipo: String,         // "Feature" | "Bug" | "Minor"
  prioridade: String,   // "alta" | "media" | "baixa"
  sistema_afetado: String, // "Infraestrutura"
  
  // Ciclo de Vida
  status: String,       // "Pendente" | "Promovido" | "Resolvido" | "Merged"
  promovido_em: String, // "S010" (código da sprint)
  data_promocao: Date,
  resolvido_em: String, // "S010"
  data_resolucao: Date,
  
  // Merge (quando status = "Merged")
  merged_into: String,  // ID do item que absorveu este (ex: "bl_tools_externas")
  merged_from: [String], // IDs dos itens absorvidos por este (ex: ["bl_mcp_server"])
  
  // Rastreabilidade
  origens: [{
    sprint: String,     // "S009"
    data: Date,
    contexto: String    // descrição breve de onde surgiu
  }],
  
  // Conteúdo (resumo)
  descricao: String,    // descrição breve
  
  // Referência ao arquivo detalhado (se existir)
  arquivo_detalhado: String, // "_backlog/Persistencia_Hibrida.md"
  
  // Dependências
  depende_de: [String], // ["bl_outro_item"]
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ id: 1 }` - único
- `{ status: 1, prioridade: 1 }` - busca por status e prioridade
- `{ slug: 1 }` - busca por slug

---

### 4.3 sprints

Armazena ciclos de execução com tasks.

```javascript
{
  _id: ObjectId,
  
  // Identificação
  id: String,           // "sp_010"
  codigo: String,       // "S010"
  nome: String,         // "Persistência Híbrida"
  
  // Ciclo de Vida
  status: String,       // "Ativa" | "Concluida"
  data_inicio: Date,
  data_prevista: Date,
  data_fim: Date,
  
  // Origem
  backlog_origem: [String], // ["bl_persistencia_hibrida"]
  tipo_projeto: String, // "Infra" | "Documentação" | "Feature"
  
  // Objetivo
  objetivo: String,     // descrição do objetivo
  entregavel: String,   // o que será entregue
  
  // Tasks
  tasks: [{
    id: String,         // "T01"
    descricao: String,  // "Setup MongoDB Atlas"
    status: String,     // "Pendente" | "Em Progresso" | "Concluida"
    artefatos: [String] // ["docs/00_I/00_I_1_3_MongoDB.md"]
  }],
  
  // Referência ao arquivo detalhado
  arquivo: String,      // "_sprints/S010_Persistencia_Hibrida.md"
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ id: 1 }` - único
- `{ codigo: 1 }` - único
- `{ status: 1 }` - busca por status

---

### 4.4 decisoes

Armazena histórico de decisões do módulo Raciocínio.

```javascript
{
  _id: ObjectId,
  
  // Identificação
  id: String,           // "dec_001"
  
  // Contexto
  contexto: String,     // "Qual banco usar para persistência?"
  sprint_origem: String, // "S009"
  
  // Ciclo H-E-I-D
  hipoteses: [{
    id: String,         // "H1"
    descricao: String,  // "PostgreSQL"
    evidencias: [{
      tipo: String,     // "a_favor" | "contra"
      texto: String
    }]
  }],
  
  // Inferência e Decisão
  inferencia: String,   // análise comparativa
  decisao: {
    escolha: String,    // "H2"
    justificativa: String,
    data: Date
  },
  
  // Uso (para tracking de "força" da decisão)
  uso_count: Number,    // quantas vezes foi reutilizada
  ultimo_uso: Date,
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ id: 1 }` - único
- `{ contexto: "text" }` - busca textual
- `{ sprint_origem: 1 }` - busca por sprint

---

## 5. Operações Comuns

### 5.1 Catálogo

```javascript
// Buscar por tipo
db.catalogo.find({ tipo: "docs", "metadata.status": "Publicado" })

// Busca textual
db.catalogo.find({ $text: { $search: "epistemologia conhecimento" } })

// Buscar sprint ativa
db.catalogo.findOne({ tipo: "sprint", "metadata.status": "Ativa" })
```

### 5.2 Backlog

```javascript
// Listar pendentes por prioridade
db.backlog_items.find({ status: "Pendente" }).sort({ prioridade: 1 })

// Promover item
db.backlog_items.updateOne(
  { id: "bl_persistencia_hibrida" },
  { 
    $set: { 
      status: "Promovido", 
      promovido_em: "S010",
      data_promocao: new Date(),
      updated_at: new Date()
    }
  }
)

// Merge de itens (item absorvido)
db.backlog_items.updateOne(
  { id: "bl_mcp_server" },
  { 
    $set: { 
      status: "Merged",
      merged_into: "bl_tools_externas",
      updated_at: new Date()
    }
  }
)

// Merge de itens (item principal)
db.backlog_items.updateOne(
  { id: "bl_tools_externas" },
  { 
    $set: { 
      descricao: "Integrar sistemas externos via MCP Server próprio...",
      updated_at: new Date()
    },
    $push: { 
      merged_from: "bl_mcp_server",
      origens: {
        sprint: "S010",
        data: new Date(),
        contexto: "Merge: MCP Server incorporado"
      }
    }
  }
)
```

### 5.3 Sprints

```javascript
// Buscar sprint ativa
db.sprints.findOne({ status: "Ativa" })

// Atualizar status de task
db.sprints.updateOne(
  { codigo: "S010", "tasks.id": "T01" },
  { 
    $set: { 
      "tasks.$.status": "Concluida",
      updated_at: new Date()
    }
  }
)
```

---

## 6. Migração

### 6.1 De YAML para MongoDB

| Origem | Destino | Método |
|--------|---------|--------|
| `_catalogo/indice.yaml` | `catalogo` | Script de migração |
| `_backlog/*.md` (frontmatter) | `backlog_items` | Script de migração |
| `_sprints/*.md` (frontmatter) | `sprints` | Script de migração |

### 6.2 Coexistência (Fase Transição)

Durante a migração, manter ambas as fontes sincronizadas:
1. MongoDB como fonte primária para leitura
2. GitHub atualizado para backup e versionamento
3. Após validação, eliminar YAML/frontmatter

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| `genesis/GENESIS.md` | GENESIS.persistir() roteia para MongoDB |
| `docs/00_I/00_I_1_1_GitHub.md` | GitHub.persistir_md() para definições |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Spec do Catálogo |
| `docs/00_I/00_I_2_Gestao_Projetos.md` | Gestão de Projetos |
| `docs/00_I/00_I_2_1_Backlog.md` | Métodos do Backlog |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação com schemas das 4 collections. Sprint S010/T02. |
| 1.1 | 2025-12-08 | Adicionados campos merged_into, merged_from e status "Merged" no schema backlog_items. Exemplo de operação merge. |
| 1.2 | 2025-12-08 | **MÉTODOS ORQUESTRADORES**: Seção 3 adicionada com persistir(), inserir(), atualizar(). Alinhamento com GitHub.md v3.0. Sprint S011/T04. |

---
titulo: "MongoDB - Persistência Transacional"
versao: "1.0"
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

# MongoDB - Persistência Transacional v1.0

## 1. Contexto

### 1.1 Papel na Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PERSISTÊNCIA                              │
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

## 3. Schemas

### 3.1 catalogo

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

### 3.2 backlog_items

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
  status: String,       // "Pendente" | "Promovido" | "Resolvido"
  promovido_em: String, // "S010" (código da sprint)
  data_promocao: Date,
  resolvido_em: String, // "S010"
  data_resolucao: Date,
  
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

### 3.3 sprints

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

### 3.4 decisoes

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

## 4. Operações Comuns

### 4.1 Catálogo

```javascript
// Buscar por tipo
db.catalogo.find({ tipo: "docs", "metadata.status": "Publicado" })

// Busca textual
db.catalogo.find({ $text: { $search: "epistemologia conhecimento" } })

// Buscar sprint ativa
db.catalogo.findOne({ tipo: "sprint", "metadata.status": "Ativa" })
```

### 4.2 Backlog

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
```

### 4.3 Sprints

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

## 5. Migração

### 5.1 De YAML para MongoDB

| Origem | Destino | Método |
|--------|---------|--------|
| `_catalogo/indice.yaml` | `catalogo` | Script de migração |
| `_backlog/*.md` (frontmatter) | `backlog_items` | Script de migração |
| `_sprints/*.md` (frontmatter) | `sprints` | Script de migração |

### 5.2 Coexistência (Fase Transição)

Durante a migração, manter ambas as fontes sincronizadas:
1. MongoDB como fonte primária para leitura
2. GitHub atualizado para backup e versionamento
3. Após validação, eliminar YAML/frontmatter

---

## 6. Referências

| Documento | Relação |
|-----------|---------|
| `_backlog/Persistencia_Hibrida.md` | Contexto e motivação |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Spec do Catálogo |
| `docs/00_I/00_I_2_Gestao_Projetos.md` | Gestão de Projetos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação com schemas das 4 collections. Sprint S010/T02. |

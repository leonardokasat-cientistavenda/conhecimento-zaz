---
titulo: "MongoDB - Persistência Transacional"
versao: "3.0"
data_publicacao: "2025-12-16"
camada: 2
tipo: "Infraestrutura"
dominio: "Persistência"
tags:
  - mongodb
  - persistencia
  - banco-dados
  - infraestrutura
  - specs
  - tracking
  - metricas
  - event-sourcing
  - saga
depende_de: []
---

# MongoDB - Persistência Transacional v3.0

## 1. Contexto

### 1.1 Papel na Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PERSISTÊNCIA v3.0                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_Backlog.persistir(backlog_item)                                         │
│  │                                                                          │
│  └─ MongoDB.persistir() → backlog_items (Event-Driven)                      │
│                         → sagas (rastreamento)                              │
│                                                                             │
│  GENESIS.persistir(dado, tipo_dado)                                         │
│  │                                                                          │
│  ├─ SE tipo == definição (.md, .yaml)                                       │
│  │     └─ GitHub.persistir_md() → criar() | editar() | substituir()         │
│  │                                                                          │
│  └─ SE tipo == transação                                                    │
│        └─ MongoDB.persistir() → inserir() | atualizar()                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GITHUB (Definições)                 MONGODB (Transações)                   │
│  ────────────────────                ───────────────────                    │
│  • GENESIS.md                        • backlog_items (v3 Event-Driven)      │
│  • Epistemologia.md                  • sagas (v3 NOVO)                      │
│  • Módulos (.md)                     • sprints                              │
│  • Prompts                           • catalogo                             │
│  • M3/*.yaml (specs)  ───sync───────►• specs                                │
│                                      • classes_equivalencia                 │
│                                      • criterios_aceite                     │
│                                      • ciclo_tracking                       │
│                                      • decisoes                             │
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

| Collection | Propósito | Versão | Migra de |
|------------|-----------|--------|----------|
| `backlog_items` | BacklogItems Event-Driven (MS_Backlog) | **v3** | v2 + campos saga |
| `sagas` | Rastreamento de fluxos completos | **v3 NOVO** | (novo) |
| `sprints` | Ciclos de execução com métricas | v2 | `_sprints/*.md` |
| `catalogo` | Índice semântico para busca | v1 | `_catalogo/indice.yaml` |
| `decisoes` | Histórico de decisões H-E-I-D | v1 | (novo) |
| `specs` | Specs M3.x parseadas | v2 | M3/*.yaml |
| `classes_equivalencia` | Valores de teste por atributo | v2 | M3.E.yaml |
| `criterios_aceite` | Comportamentos esperados | v2 | M3.*.yaml |
| `ciclo_tracking` | Timestamps de etapas M0-M4 | v2 | (novo) |

### 2.2 Diagrama de Relações

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RELAÇÕES ENTRE COLLECTIONS v3.0                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐         ┌─────────────┐                                    │
│  │   sagas     │◄────────│  backlog_   │                                    │
│  │             │    N:1  │   items     │                                    │
│  └─────────────┘         └──────┬──────┘                                    │
│                                 │                                           │
│                                 │ pai_ref (árvore)                          │
│                                 ▼                                           │
│                          ┌─────────────┐                                    │
│                          │  backlog_   │ (self-reference)                   │
│                          │   items     │                                    │
│                          └─────────────┘                                    │
│                                                                             │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐            │
│  │   specs     │────────►│  classes_   │         │ criterios_  │            │
│  │   (M3.x)    │    1:N  │equivalencia │         │   aceite    │            │
│  └──────┬──────┘         └─────────────┘         └──────▲──────┘            │
│         │                                               │                   │
│         └───────────────────────────────────────────────┘                   │
│                                1:N                                          │
│                                                                             │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐            │
│  │  backlog_   │────────►│   ciclo_    │◄────────│   sprints   │            │
│  │   items     │    1:1  │  tracking   │    N:1  │             │            │
│  └─────────────┘         └─────────────┘         └─────────────┘            │
│                                                                             │
│  ┌─────────────┐                                                            │
│  │  catalogo   │ ◄──── indexa todos os tipos                                │
│  └─────────────┘                                                            │
│                                                                             │
│  ┌─────────────┐                                                            │
│  │  decisoes   │ ◄──── standalone (módulo Raciocínio)                       │
│  └─────────────┘                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Schemas Event-Driven (v3)

### 3.1 backlog_items (v3 - Event-Driven)

Armazena BacklogItems como eventos do MS_Backlog.

```javascript
{
  _id: ObjectId,
  
  // === IDENTIFICAÇÃO ===
  id: String,               // "bkl_001" (gerado automaticamente)
  titulo: String,           // "Entrevistar dor: problema X"
  
  // === EVENT-DRIVEN (v3 NOVO) ===
  
  // Tipagem Event-Driven
  tipo: String,             // ENUM: ver tabela abaixo
  
  // Saga (rastreabilidade)
  saga_id: String,          // "saga_001" - herdado do pai ou gerado
  pai_ref: String,          // "bkl_000" - item que gerou este (null se raiz)
  filhos: [String],         // ["bkl_002", "bkl_003"] - items gerados por este
  
  // Referências de domínio
  refs: {
    prontuario_ref: String, // "pront_001"
    produto_ref: String,    // "prod_001"
    feature_ref: String,    // "feat_001"
    spec_ref: String,       // "spec_001"
    release_ref: String     // "rel_001"
  },
  
  // Produtor/Consumidor
  produtor: String,         // "GENESIS" | "MS_Produto" | "Epistemologia" | "PROMETHEUS" | "PO"
  consumidor: String,       // sistema que deve processar (null se pendente)
  
  // Status Event-Driven
  status: String,           // "Pendente" | "EmProcessamento" | "Concluido" | "Erro" | "Cancelado"
  
  // Timestamps Event-Driven
  consumido_em: Date,       // quando consumidor pegou
  concluido_em: Date,       // quando processamento terminou
  
  // Resultado do processamento
  resultado: Object,        // payload de retorno (específico por tipo)
  erro: String,             // mensagem de erro (se status == Erro)
  items_gerados: [String],  // IDs dos BacklogItems gerados ao concluir
  
  // Configuração
  prioridade: String,       // "🔴" | "🟡" | "🟢"
  timeout_minutos: Number,  // timeout para processamento
  requer_aprovacao: Boolean,// true se humano precisa aprovar
  
  // === CAMPOS LEGADOS (mantidos para compatibilidade) ===
  
  slug: String,
  sistema_afetado: String,
  descricao: String,
  origens: [{
    sprint: String,
    data: Date,
    contexto: String
  }],
  
  // Promoção/Resolução (gestão humana)
  promovido_em: String,     // "S018" (sprint)
  data_promocao: Date,
  resolvido_em: String,
  data_resolucao: Date,
  
  // Contexto adicional
  contexto: Object,         // payload de entrada (específico por tipo)
  
  // === CONTROLE ===
  created_at: Date,
  updated_at: Date
}
```

**Tipos de BacklogItem (ENUM):**

| Tipo | Consumidor | Descrição |
|------|------------|-----------|
| `entrevistar_dor` | GENESIS | Capturar dor do usuário |
| `estruturar_produto` | MS_Produto | Criar Produto + Feature |
| `criar_feature` | MS_Produto | Criar Feature adicional |
| `ciclo_epistemologico` | Epistemologia | Executar M0-M4 |
| `desenvolvimento` | PROMETHEUS | Implementar spec (TDD) |
| `worker_*` | PROMETHEUS | Tasks internas (automático) |
| `corrigir_bug` | PROMETHEUS | Corrigir erro técnico |
| `aprovar_release` | PO | Validar release |
| `implantar` | MS_Produto | Deploy + Treinamento |
| `avaliar_efetividade` | GENESIS | Avaliar JTD |
| `iterar_feature` | Epistemologia | Iterar hipótese |

**Índices:**
- `{ id: 1 }` - único
- `{ tipo: 1, status: 1 }` - consumo por tipo
- `{ saga_id: 1 }` - busca por saga
- `{ pai_ref: 1 }` - busca filhos
- `{ created_at: 1, prioridade: -1 }` - ordenação FIFO + prioridade
- `{ consumidor: 1, status: 1 }` - consumo por sistema
- `{ status: 1, prioridade: 1 }` - busca legada

---

### 3.2 sagas (v3 - NOVO)

Rastreia fluxos completos de dor → produção.

```javascript
{
  _id: ObjectId,
  
  // Identificação
  id: String,               // "saga_001"
  titulo: String,           // "Dor: problema X → Produto Y"
  
  // Item raiz
  item_raiz: String,        // "bkl_001" (primeiro BacklogItem)
  produtor_inicial: String, // "GENESIS" (quem iniciou)
  
  // Rastreamento
  items: [String],          // ["bkl_001", "bkl_002", ...] todos items da saga
  items_count: Number,      // total de items
  profundidade_maxima: Number, // níveis de aninhamento
  
  // Estado
  status: String,           // "EmAndamento" | "Concluida" | "Erro" | "Cancelada"
  conclusao: String,        // "SUCESSO" | "ITERAR" | "BUG" | "THRESHOLD_INADEQUADO"
  
  // Timestamps
  concluida_em: Date,
  tempo_total_minutos: Number,
  
  // Aprendizados (após conclusão)
  aprendizados: {
    padrao_sucesso: Boolean,
    tags: [String],
    score_reuso: Number
  },
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ id: 1 }` - único
- `{ status: 1 }` - busca por status
- `{ item_raiz: 1 }` - busca por item inicial
- `{ "aprendizados.tags": 1 }` - busca por padrão

---

## 4. Métodos MS_Backlog

### 4.1 produzir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                MS_Backlog.produzir(tipo, titulo, contexto, refs)            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADE: Criar novo BacklogItem na fila                           │
│                                                                             │
│  Input:                                                                     │
│  - tipo: string (enum TipoBacklogItem)                                      │
│  - titulo: string                                                           │
│  - contexto: object (payload específico por tipo)                           │
│  - refs: object (prontuario_ref, produto_ref, etc.)                         │
│  - pai_ref?: string (se gerado por outro item)                              │
│                                                                             │
│  Comportamento:                                                             │
│  1. Gerar id único (bkl_XXX)                                                │
│  2. SE pai_ref: herdar saga_id do pai                                       │
│     SENÃO: gerar nova saga_id                                               │
│  3. Definir consumidor pela tabela de roteamento                            │
│  4. Inserir em backlog_items                                                │
│  5. SE nova saga: criar documento em sagas                                  │
│  6. Atualizar saga.items com novo item                                      │
│                                                                             │
│  Output: { item_id: string, saga_id: string }                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 consumir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     MS_Backlog.consumir(tipos[])                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADE: Buscar próximo item para processamento                   │
│                                                                             │
│  Input:                                                                     │
│  - tipos: [string] (tipos que o consumidor processa)                        │
│                                                                             │
│  Comportamento:                                                             │
│  1. Buscar item com:                                                        │
│     - tipo IN tipos                                                         │
│     - status == "Pendente"                                                  │
│     - ORDER BY prioridade DESC, created_at ASC (FIFO)                       │
│  2. SE encontrou:                                                           │
│     - Atualizar status = "EmProcessamento"                                  │
│     - Atualizar consumido_em = now()                                        │
│  3. Retornar item ou null                                                   │
│                                                                             │
│  Output: BacklogItem | null                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 concluir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              MS_Backlog.concluir(item_id, resultado, items_gerados)         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADE: Marcar item como concluído                               │
│                                                                             │
│  Input:                                                                     │
│  - item_id: string                                                          │
│  - resultado: object (payload de retorno)                                   │
│  - items_gerados: [{tipo, titulo, contexto, refs}] (novos items)            │
│                                                                             │
│  Comportamento:                                                             │
│  1. Atualizar item:                                                         │
│     - status = "Concluido"                                                  │
│     - concluido_em = now()                                                  │
│     - resultado = resultado                                                 │
│  2. PARA CADA item em items_gerados:                                        │
│     - MS_Backlog.produzir(..., pai_ref=item_id)                             │
│     - Adicionar id em item.filhos                                           │
│  3. Atualizar saga com novos items                                          │
│                                                                             │
│  Output: { item_id, filhos_criados: [string] }                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 falhar()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_Backlog.falhar(item_id, erro)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADE: Marcar item com erro                                     │
│                                                                             │
│  Input:                                                                     │
│  - item_id: string                                                          │
│  - erro: string (mensagem de erro)                                          │
│                                                                             │
│  Comportamento:                                                             │
│  1. Atualizar item:                                                         │
│     - status = "Erro"                                                       │
│     - concluido_em = now()                                                  │
│     - erro = erro                                                           │
│  2. Avaliar compensação (Saga Pattern)                                      │
│                                                                             │
│  Output: { item_id, compensacao_necessaria: boolean }                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Operações Event-Driven

### 5.1 Produzir BacklogItem

```javascript
// GENESIS produz após entrevistar dor
db.backlog_items.insertOne({
  id: "bkl_001",
  tipo: "estruturar_produto",
  titulo: "Estruturar produto para dor X",
  saga_id: "saga_001",
  pai_ref: "bkl_000",  // item entrevistar_dor que gerou este
  filhos: [],
  refs: {
    prontuario_ref: "pront_001"
  },
  produtor: "GENESIS",
  consumidor: "MS_Produto",
  status: "Pendente",
  prioridade: "🔴",
  requer_aprovacao: true,
  contexto: {
    dor_cliente: "Demora 4min para reportar venda",
    sintomas: ["ligação longa", "frustração"]
  },
  created_at: new Date(),
  updated_at: new Date()
})
```

### 5.2 Consumir BacklogItem

```javascript
// MS_Produto consome
db.backlog_items.findOneAndUpdate(
  { 
    tipo: { $in: ["estruturar_produto", "criar_feature", "implantar"] },
    status: "Pendente"
  },
  { 
    $set: { 
      status: "EmProcessamento",
      consumido_em: new Date(),
      updated_at: new Date()
    }
  },
  { 
    sort: { prioridade: -1, created_at: 1 },
    returnDocument: "after"
  }
)
```

### 5.3 Concluir BacklogItem

```javascript
// MS_Produto conclui e gera novo item
db.backlog_items.updateOne(
  { id: "bkl_001" },
  { 
    $set: { 
      status: "Concluido",
      concluido_em: new Date(),
      resultado: {
        produto_id: "prod_001",
        feature_id: "feat_001"
      },
      items_gerados: ["bkl_002"],
      updated_at: new Date()
    },
    $push: {
      filhos: "bkl_002"
    }
  }
)

// Criar item filho automaticamente
db.backlog_items.insertOne({
  id: "bkl_002",
  tipo: "ciclo_epistemologico",
  titulo: "Especificar feature: reporte por voz",
  saga_id: "saga_001",  // herdado
  pai_ref: "bkl_001",
  filhos: [],
  refs: {
    prontuario_ref: "pront_001",
    produto_ref: "prod_001",
    feature_ref: "feat_001"
  },
  produtor: "MS_Produto",
  consumidor: "Epistemologia",
  status: "Pendente",
  // ...
})
```

### 5.4 Consultar Saga

```javascript
// Ver todos items de uma saga
db.backlog_items.find({ saga_id: "saga_001" })
  .sort({ created_at: 1 })

// Ver árvore de items (pai → filhos)
db.backlog_items.aggregate([
  { $match: { saga_id: "saga_001" } },
  { $graphLookup: {
    from: "backlog_items",
    startWith: "$id",
    connectFromField: "filhos",
    connectToField: "id",
    as: "descendentes"
  }}
])

// Métricas da saga
db.sagas.findOne({ id: "saga_001" })
```

---

## 6. Schemas Existentes (v2)

### 6.1 catalogo

(Mantido conforme v2 - índice semântico)

### 6.2 sprints

(Mantido conforme v2 - ciclos de execução)

### 6.3 decisoes

(Mantido conforme v1 - módulo Raciocínio)

### 6.4 specs

(Mantido conforme v2 - specs M3.x)

### 6.5 classes_equivalencia

(Mantido conforme v2 - testes)

### 6.6 criterios_aceite

(Mantido conforme v2 - validação)

### 6.7 ciclo_tracking

(Mantido conforme v2 - timestamps M0-M4)

---

## 7. Migração v2 → v3

### 7.1 Adicionar campos Event-Driven

```javascript
// Adicionar campos Event-Driven em backlog_items existentes
db.backlog_items.updateMany(
  { saga_id: { $exists: false } },
  { 
    $set: {
      saga_id: null,
      pai_ref: null,
      filhos: [],
      refs: {},
      produtor: "legado",
      consumidor: null,
      consumido_em: null,
      concluido_em: null,
      resultado: null,
      erro: null,
      items_gerados: [],
      timeout_minutos: 60,
      requer_aprovacao: true
    }
  }
)
```

### 7.2 Criar índices novos

```javascript
// Índices Event-Driven
db.backlog_items.createIndex({ tipo: 1, status: 1 }, { name: "idx_tipo_status" })
db.backlog_items.createIndex({ saga_id: 1 }, { name: "idx_saga_id" })
db.backlog_items.createIndex({ pai_ref: 1 }, { name: "idx_pai_ref" })
db.backlog_items.createIndex({ created_at: 1, prioridade: -1 }, { name: "idx_prioridade_created" })

// Índices sagas
db.sagas.createIndex({ status: 1 }, { name: "idx_status" })
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| `docs/04_B/MS_Backlog.md` | Definição do MS_Backlog |
| `docs/04_B/MS_Backlog_Arquitetura.md` | Contratos e roteamento |
| `genesis/GENESIS.md` | Entrada + Validação |
| `docs/04_P/MS_Produto.md` | Produtor/Consumidor |
| `docs/00_I/00_I_1_1_GitHub.md` | Persistência de definições |
| `docs/00_I/00_I_2_1_Backlog.md` | ⚠️ DEPRECATED → MS_Backlog |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0-1.2 | 2025-12-08 | Versões anteriores |
| 2.0 | 2025-12-16 | Extensão v2: specs, classes_equivalencia, criterios_aceite, ciclo_tracking |
| 3.0 | 2025-12-16 | **EVENT-DRIVEN**: (1) backlog_items v3 com saga_id, pai_ref, filhos, refs, produtor/consumidor, status Event-Driven. (2) Nova collection sagas para rastreamento. (3) Métodos MS_Backlog: produzir(), consumir(), concluir(), falhar(). (4) Índices Event-Driven. Sprint S018. |

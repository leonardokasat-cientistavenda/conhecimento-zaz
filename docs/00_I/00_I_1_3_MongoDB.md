# MongoDB - Persistência Transacional v2.0

---

```yaml
titulo: "MongoDB - Persistência Transacional"
versao: "2.0"
data_publicacao: "2025-12-16"
nivel: C2
camadas: [L0, L1, L2]
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
depende_de: []
```

---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Collection** | Tabela no MongoDB (conjunto de documentos) |
| **Spec** | Especificação M3.x parseada e armazenada |
| **Classe de Equivalência** | Conjunto de valores de teste para um atributo |
| **Critério de Aceite** | Comportamento esperado de um método |
| **Ciclo Tracking** | Registro temporal de execução M0-M4 |
| **Lead Time** | Tempo total: criação → conclusão |
| **Cycle Time** | Tempo em execução: promoção → conclusão |
| **Wait Time** | Tempo parado: criação → promoção |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como persistir specs M3.x, rastrear ciclos epistemológicos,               │
│   e calcular métricas de backlog/sprint de forma queryável?"                │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUBPROBLEMAS                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  SPECS M3.x         │  │  TRACKING           │  │  MÉTRICAS           │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Onde armazenar      │  │ Como rastrear       │  │ Como calcular       │  │
│  │ specs estruturadas  │  │ timestamps de       │  │ lead/cycle time     │  │
│  │ para PROMETHEUS?    │  │ cada etapa M0-M4?   │  │ de qualquer item?   │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Solução:            │  │ Solução:            │  │ Solução:            │  │
│  │ Collection specs    │  │ ciclo_tracking      │  │ timestamps em       │  │
│  │ + classes_equiv     │  │ com etapas          │  │ backlog_items       │  │
│  │ + criterios_aceite  │  │                     │  │ + sprints           │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **MongoDB v2.0 estende a persistência transacional para suportar o ciclo completo de Epistemologia v4.0: specs M3.x queryáveis, tracking de ciclos com timestamps, e métricas de produtividade deriváveis automaticamente.**

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Aplicação |
|----------|-----------|
| **Document Store** | Specs M3.x como documentos flexíveis |
| **Referências** | Collections relacionadas via _ref |
| **Índices Compostos** | Queries eficientes por tipo + status |
| **Agregações** | Cálculo de métricas em tempo real |

### 2.2 Papel na Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PERSISTÊNCIA v2                           │
├─────────────────────────────────────────────────────────────────────────────┤
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
│  GITHUB (Definições)                 MONGODB (Transações + Specs)           │
│  ────────────────────                ─────────────────────────────          │
│  • MS_X.md (narrativa)               • specs (M3.x parseados)               │
│  • M3/*.yaml (specs)  ───sync───────►• classes_equivalencia                 │
│  • Epistemologia.md                  • criterios_aceite                     │
│  • Prompts                           • ciclo_tracking                       │
│                                      • catalogo                             │
│                                      • backlog_items                        │
│                                      • sprints                              │
│                                      • decisoes                             │
│                                                                             │
│  Versionado, legível                 Queryável, processável                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Conexão

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

## 3. Objeto (M2)

### 3.1 Collections

| Collection | Propósito | Versão |
|------------|-----------|--------|
| `catalogo` | Índice semântico para busca | v1 |
| `backlog_items` | Itens de trabalho com tracking | **v2** |
| `sprints` | Ciclos de execução com métricas | **v2** |
| `decisoes` | Histórico de decisões H-E-I-D | v1 |
| `specs` | Specs M3.x parseadas | **NOVO** |
| `classes_equivalencia` | Valores de teste por atributo | **NOVO** |
| `criterios_aceite` | Comportamentos esperados | **NOVO** |
| `ciclo_tracking` | Timestamps de etapas M0-M4 | **NOVO** |

### 3.2 Diagrama de Relações

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RELAÇÕES ENTRE COLLECTIONS                               │
├─────────────────────────────────────────────────────────────────────────────┤
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
│  └──────┬──────┘         └─────────────┘         └──────┬──────┘            │
│         │                                               │                   │
│         └───────────────────────────────────────────────┘                   │
│                           N:1 (sprint_ref)                                  │
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

### 3.3 Fronteiras

| MongoDB É | MongoDB NÃO É |
|-----------|---------------|
| Persistência de transações | Versionamento (isso é GitHub) |
| Queries rápidas | Fonte de verdade para narrativa |
| Métricas em tempo real | Backup primário |
| Specs processáveis | Editor de specs (humano edita .yaml) |

---

## 4. Classe (M3.E) - Schemas

### 4.1 specs

Armazena specs M3.x parseadas para consumo por PROMETHEUS.

```javascript
{
  _id: ObjectId,
  
  // Identificação
  ms_ref: String,           // "MS_X" - Meta Sistema pai
  vertente: String,         // "M3.E" | "M3.P" | "M3.D" | "M3.I" | "M3.C"
  versao: String,           // "1.0.0"
  
  // Conteúdo (específico por vertente)
  conteudo: {
    // M3.E: classes, atributos, metodos
    // M3.P: processos, atividades, gateways, fluxo
    // M3.D: tabelas, inputs, outputs, regras
    // M3.I: containers, redes, volumes
    // M3.C: variaveis, parametros
  },
  
  // Estado
  status: String,           // "rascunho" | "publicado" | "deprecado"
  
  // Rastreabilidade
  arquivo_origem: String,   // "docs/04_X/MS_X/M3/M3.E.yaml"
  sync_hash: String,        // hash do arquivo para detectar mudanças
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ ms_ref: 1, vertente: 1 }` - único composto
- `{ status: 1 }` - busca por status
- `{ ms_ref: 1 }` - todas specs de um MS

---

### 4.2 classes_equivalencia

Armazena classes de equivalência para geração de testes.

```javascript
{
  _id: ObjectId,
  
  // Referência
  spec_ref: ObjectId,       // ref para specs (M3.E)
  ms_ref: String,           // "MS_X" (desnormalizado para query)
  
  // Localização
  classe: String,           // "Release"
  atributo: String,         // "status"
  
  // Definição
  nome: String,             // "pendente"
  valor: Mixed,             // "PENDENTE" | 123 | null | ...
  valido: Boolean,          // true | false
  descricao: String,        // opcional
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ spec_ref: 1, classe: 1, atributo: 1, nome: 1 }` - único composto
- `{ ms_ref: 1, classe: 1 }` - busca por MS e classe
- `{ valido: 1 }` - filtrar válidos/inválidos

---

### 4.3 criterios_aceite

Armazena critérios de aceite para validação.

```javascript
{
  _id: ObjectId,
  
  // Referência
  spec_ref: ObjectId,       // ref para specs (M3.E, M3.P, M3.D)
  ms_ref: String,           // "MS_X" (desnormalizado)
  vertente: String,         // "M3.E" | "M3.P" | "M3.D"
  
  // Localização
  classe: String,           // "Release" (M3.E)
  metodo: String,           // "aprovar" (M3.E) | processo/regra (M3.P/D)
  
  // Definição
  descricao: String,        // "status muda para APROVADA"
  ordem: Number,            // ordem de verificação
  
  // Cobertura
  coberto_por_teste: Boolean,
  teste_ref: String,        // "test_release.py::test_aprovar_status"
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ spec_ref: 1, classe: 1, metodo: 1, ordem: 1 }` - único composto
- `{ ms_ref: 1, coberto_por_teste: 1 }` - cobertura por MS
- `{ coberto_por_teste: 1 }` - critérios não cobertos

---

### 4.4 ciclo_tracking

Rastreia execução de ciclos M0-M4.

```javascript
{
  _id: ObjectId,
  
  // Referência
  backlog_item_ref: ObjectId,  // ref para backlog_items
  ms_ref: String,              // "MS_X" (output do ciclo)
  
  // Etapas (timestamps)
  etapas: {
    M0: { 
      inicio: Date, 
      fim: Date, 
      responsavel: String,
      preenchido_auto: Boolean  // true se derivado do pai
    },
    M1: { inicio: Date, fim: Date, responsavel: String },
    M2: { inicio: Date, fim: Date, responsavel: String },
    M3E: { inicio: Date, fim: Date, responsavel: String },
    M3P: { inicio: Date, fim: Date, responsavel: String },  // opcional
    M3D: { inicio: Date, fim: Date, responsavel: String },  // opcional
    M3I: { inicio: Date, fim: Date, responsavel: String },
    M3C: { inicio: Date, fim: Date, responsavel: String },
    M4: { inicio: Date, fim: Date, responsavel: String },
    validacao: { inicio: Date, fim: Date, responsavel: String }
  },
  
  // Métricas calculadas (após conclusão)
  metricas: {
    lead_time_min: Number,     // total: criado → concluído
    cycle_time_min: Number,    // execução: promovido → concluído
    wait_time_min: Number,     // espera: criado → promovido
    tempo_por_etapa: {
      M0: Number,
      M1: Number,
      M2: Number,
      M3E: Number,
      M3P: Number,
      M3D: Number,
      M3I: Number,
      M3C: Number,
      M4: Number,
      validacao: Number
    }
  },
  
  // Resultado
  resultado: String,           // "aprovado" | "rejeitado"
  motivo_rejeicao: String,     // se rejeitado
  
  // Ciclos filhos gerados
  filhos_gerados: [String],    // ["bl_xxx", "bl_yyy"]
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ backlog_item_ref: 1 }` - único
- `{ ms_ref: 1 }` - busca por MS
- `{ resultado: 1 }` - filtrar por resultado
- `{ "metricas.lead_time_min": 1 }` - ordenar por tempo

---

### 4.5 backlog_items (v2)

Estende v1 com tracking genérico.

```javascript
{
  _id: ObjectId,
  
  // === CAMPOS EXISTENTES (v1) ===
  id: String,
  titulo: String,
  slug: String,
  prioridade: String,
  sistema_afetado: String,
  status: String,
  promovido_em: String,
  data_promocao: Date,
  resolvido_em: String,
  data_resolucao: Date,
  merged_into: String,
  merged_from: [String],
  origens: [{ sprint: String, data: Date, contexto: String }],
  descricao: String,
  arquivo_detalhado: String,
  depende_de: [String],
  
  // === NOVOS CAMPOS (v2) ===
  
  // Tipo de item
  tipo: String,             // "ciclo_epistemologico" | "desenvolvimento" | 
                            // "bug" | "melhoria" | "documentacao"
  
  // Timestamps completos (tracking genérico)
  timestamps: {
    criado_em: Date,
    promovido_em: Date,
    iniciado_em: Date,
    validado_em: Date,
    concluido_em: Date
  },
  
  // Origem (para ciclos epistemológicos)
  origem_ciclo: {
    ms_pai: String,         // "MS_Release"
    etapa: String,          // "M3.E"
    atributo: String,       // "criterios"
    cardinalidade: String   // "1:N"
  },
  
  // Referência para tracking detalhado
  ciclo_tracking_ref: ObjectId,  // ref para ciclo_tracking (se tipo == ciclo_epistemologico)
  
  // Métricas calculadas (após conclusão)
  metricas: {
    lead_time_min: Number,
    cycle_time_min: Number,
    wait_time_min: Number
  },
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Novos Índices:**
- `{ tipo: 1, status: 1 }` - busca por tipo e status
- `{ "timestamps.criado_em": 1 }` - ordenar por criação
- `{ "origem_ciclo.ms_pai": 1 }` - ciclos filhos de um MS
- `{ "metricas.lead_time_min": 1 }` - ordenar por tempo

---

### 4.6 sprints (v2)

Estende v1 com métricas agregadas.

```javascript
{
  _id: ObjectId,
  
  // === CAMPOS EXISTENTES (v1) ===
  id: String,
  codigo: String,
  nome: String,
  status: String,
  data_inicio: Date,
  data_prevista: Date,
  data_fim: Date,
  backlog_origem: [String],
  tipo_projeto: String,
  objetivo: String,
  entregavel: String,
  tasks: [{ id, descricao, status, artefatos }],
  arquivo: String,
  
  // === NOVOS CAMPOS (v2) ===
  
  // Métricas agregadas
  metricas: {
    // Contadores
    total_itens: Number,
    concluidos: Number,
    rejeitados: Number,
    em_progresso: Number,
    
    // Tempos médios
    lead_time_medio_min: Number,
    cycle_time_medio_min: Number,
    wait_time_medio_min: Number,
    
    // Throughput
    throughput_dia: Number,       // itens/dia
    
    // Por tipo
    por_tipo: {
      ciclo_epistemologico: { 
        total: Number, 
        concluidos: Number,
        lead_time_medio_min: Number
      },
      desenvolvimento: { 
        total: Number, 
        concluidos: Number,
        lead_time_medio_min: Number
      },
      bug: { 
        total: Number, 
        concluidos: Number,
        lead_time_medio_min: Number
      },
      melhoria: { 
        total: Number, 
        concluidos: Number,
        lead_time_medio_min: Number
      },
      documentacao: { 
        total: Number, 
        concluidos: Number,
        lead_time_medio_min: Number
      }
    },
    
    // Qualidade (para ciclos epistemológicos)
    taxa_aprovacao_primeira: Number,  // % aprovados sem retrabalho
    retrabalhos: Number
  },
  
  // Itens da sprint (referências)
  itens: [ObjectId],           // refs para backlog_items
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Novos Índices:**
- `{ "metricas.throughput_dia": -1 }` - ranking de produtividade
- `{ "metricas.taxa_aprovacao_primeira": -1 }` - ranking de qualidade

---

### 4.7 catalogo (v1 - mantido)

```javascript
{
  _id: ObjectId,
  id: String,
  tipo: String,
  nome: String,
  chave: String,
  triggers: [String],
  arquivo: String,
  metadata: { versao, camada, status, prioridade, origem, data_inicio, data_fim },
  capability: { id, nome_amigavel, descricao, exemplos },
  created_at: Date,
  updated_at: Date
}
```

---

### 4.8 decisoes (v1 - mantido)

```javascript
{
  _id: ObjectId,
  id: String,
  contexto: String,
  sprint_origem: String,
  hipoteses: [{ id, descricao, evidencias: [{ tipo, texto }] }],
  inferencia: String,
  decisao: { escolha, justificativa, data },
  uso_count: Number,
  ultimo_uso: Date,
  created_at: Date,
  updated_at: Date
}
```

---

## 5. Métodos

### 5.1 Método Orquestrador: persistir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    persistir(collection, documento)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADE: Decidir COMO persistir transação no MongoDB              │
│  CHAMADO POR: GENESIS.persistir() quando tipo == transação                  │
│                                                                             │
│  Input:                                                                     │
│  - collection: string                                                       │
│  - documento: object                                                        │
│                                                                             │
│  Output:                                                                    │
│  - Resultado: {sucesso: bool, metodo: string, id: string}                   │
│                                                                             │
│  Fluxo:                                                                     │
│  SE documento._id não existe E documento.id não existe no banco:            │
│     → inserir(collection, documento)                                        │
│  SENÃO:                                                                     │
│     → atualizar(collection, documento)                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Métodos de Escrita

| Método | Quando usar | API |
|--------|-------------|-----|
| `inserir()` | Documento novo | `mongodb:insert-many` |
| `atualizar()` | Documento existe | `mongodb:update-many` |

### 5.3 Métodos de Métricas (NOVOS)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    calcular_metricas_item(backlog_item_id)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: backlog_item_id                                                     │
│  Output: { lead_time_min, cycle_time_min, wait_time_min }                   │
│                                                                             │
│  Cálculo:                                                                   │
│  lead_time  = timestamps.concluido_em - timestamps.criado_em                │
│  cycle_time = timestamps.concluido_em - timestamps.promovido_em             │
│  wait_time  = timestamps.promovido_em - timestamps.criado_em                │
│                                                                             │
│  Pré-condição: status == "concluido"                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    agregar_metricas_sprint(sprint_id)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: sprint_id                                                           │
│  Output: SprintMetricas (objeto completo)                                   │
│                                                                             │
│  Cálculo:                                                                   │
│  1. Buscar todos backlog_items com sprint_ref == sprint_id                  │
│  2. Agrupar por tipo                                                        │
│  3. Calcular médias de tempo                                                │
│  4. Calcular throughput = concluidos / dias_sprint                          │
│  5. Calcular taxa_aprovacao = aprovados_primeira / total_ciclos             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    sync_spec_from_yaml(arquivo_yaml)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: caminho do arquivo .yaml (GitHub)                                   │
│  Output: { spec_id, classes_count, criterios_count }                        │
│                                                                             │
│  Fluxo:                                                                     │
│  1. Ler arquivo do GitHub                                                   │
│  2. Calcular hash do conteúdo                                               │
│  3. SE hash != sync_hash existente:                                         │
│     3.1. Parsear YAML                                                       │
│     3.2. Upsert em specs                                                    │
│     3.3. Upsert classes_equivalencia (delete antigas, insert novas)         │
│     3.4. Upsert criterios_aceite (delete antigos, insert novos)             │
│  4. Retornar contadores                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Operações Comuns

### 6.1 Specs

```javascript
// Buscar todas specs de um MS
db.specs.find({ ms_ref: "MS_X" })

// Buscar spec específica
db.specs.findOne({ ms_ref: "MS_X", vertente: "M3.E" })

// Classes de equivalência de um atributo
db.classes_equivalencia.find({ 
  ms_ref: "MS_X", 
  classe: "Release", 
  atributo: "status" 
})

// Critérios não cobertos por teste
db.criterios_aceite.find({ 
  ms_ref: "MS_X", 
  coberto_por_teste: false 
})
```

### 6.2 Tracking

```javascript
// Criar tracking para ciclo epistemológico
db.ciclo_tracking.insertOne({
  backlog_item_ref: ObjectId("..."),
  ms_ref: "MS_Y",
  etapas: {
    M0: { inicio: new Date(), preenchido_auto: true }
  },
  created_at: new Date(),
  updated_at: new Date()
})

// Registrar fim de etapa
db.ciclo_tracking.updateOne(
  { backlog_item_ref: ObjectId("...") },
  { 
    $set: { 
      "etapas.M1.fim": new Date(),
      "etapas.M2.inicio": new Date(),
      updated_at: new Date()
    }
  }
)

// Calcular métricas após conclusão
db.ciclo_tracking.updateOne(
  { backlog_item_ref: ObjectId("...") },
  { 
    $set: { 
      "metricas.lead_time_min": 65,
      "metricas.cycle_time_min": 58,
      "metricas.wait_time_min": 7,
      "metricas.tempo_por_etapa": {
        M0: 0, M1: 14, M2: 15, M3E: 22, M4: 5, validacao: 2
      },
      resultado: "aprovado",
      updated_at: new Date()
    }
  }
)
```

### 6.3 Backlog (v2)

```javascript
// Criar item de ciclo epistemológico
db.backlog_items.insertOne({
  id: "bl_ms_criterio",
  titulo: "Ciclo MS_Criterio",
  tipo: "ciclo_epistemologico",
  status: "pendente",
  timestamps: { criado_em: new Date() },
  origem_ciclo: {
    ms_pai: "MS_Release",
    etapa: "M3.E",
    atributo: "criterios",
    cardinalidade: "1:N"
  },
  created_at: new Date(),
  updated_at: new Date()
})

// Promover para sprint
db.backlog_items.updateOne(
  { id: "bl_ms_criterio" },
  { 
    $set: { 
      status: "em_sprint",
      promovido_em: "S015",
      "timestamps.promovido_em": new Date(),
      updated_at: new Date()
    }
  }
)

// Listar por tipo
db.backlog_items.find({ tipo: "ciclo_epistemologico", status: "pendente" })

// Métricas de um item
db.backlog_items.aggregate([
  { $match: { id: "bl_ms_criterio" } },
  { $project: {
    titulo: 1,
    lead_time: { 
      $divide: [
        { $subtract: ["$timestamps.concluido_em", "$timestamps.criado_em"] },
        60000  // ms → min
      ]
    }
  }}
])
```

### 6.4 Sprints (v2)

```javascript
// Agregar métricas da sprint
db.backlog_items.aggregate([
  { $match: { promovido_em: "S015" } },
  { $group: {
    _id: "$tipo",
    total: { $sum: 1 },
    concluidos: { 
      $sum: { $cond: [{ $eq: ["$status", "concluido"] }, 1, 0] }
    },
    lead_time_medio: { $avg: "$metricas.lead_time_min" }
  }}
])

// Atualizar métricas agregadas na sprint
db.sprints.updateOne(
  { codigo: "S015" },
  { 
    $set: { 
      "metricas.total_itens": 12,
      "metricas.concluidos": 10,
      "metricas.lead_time_medio_min": 58,
      "metricas.throughput_dia": 2.5,
      "metricas.por_tipo.ciclo_epistemologico": {
        total: 4, concluidos: 4, lead_time_medio_min: 65
      },
      updated_at: new Date()
    }
  }
)
```

---

## 7. Validações

### 7.1 Regras de Integridade

| Collection | Regra | Validação |
|------------|-------|-----------|
| specs | ms_ref + vertente único | Índice único |
| classes_equivalencia | spec_ref deve existir | Aplicação |
| criterios_aceite | spec_ref deve existir | Aplicação |
| ciclo_tracking | backlog_item_ref único | Índice único |
| backlog_items | id único | Índice único |
| sprints | codigo único | Índice único |

### 7.2 Transições de Status

```
backlog_items.status:
  pendente → em_sprint → em_progresso → validando → concluido
                                      → rejeitado → pendente (loop)
                                      
sprints.status:
  ativa → concluida
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | GENESIS.persistir() roteia para MongoDB |
| genesis/PROMETHEUS.md | Consome specs para geração de código/testes |
| docs/00_E/00_E_Epistemologia.md | Define estrutura M3.x |
| docs/00_I/00_I_1_1_GitHub.md | GitHub.persistir_md() para definições |
| docs/00_I/00_I_2_1_Backlog.md | Métodos do Backlog |
| docs/00_I/00_I_2_2_Sprint.md | Métodos da Sprint |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação com schemas das 4 collections. Sprint S010/T02. |
| 1.1 | 2025-12-08 | Campos merged_into, merged_from e status "Merged". |
| 1.2 | 2025-12-08 | Métodos orquestradores: persistir(), inserir(), atualizar(). |
| 2.0 | 2025-12-16 | **Specs M3.x**: novas collections (specs, classes_equivalencia, criterios_aceite, ciclo_tracking). **Tracking genérico**: backlog_items v2 com timestamps e métricas. **Sprints v2**: métricas agregadas por tipo. Métodos de métricas. |

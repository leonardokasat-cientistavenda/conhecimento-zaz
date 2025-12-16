---
titulo: "MongoDB - Persistência Transacional"
versao: "2.0"
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
depende_de: []
---

# MongoDB - Persistência Transacional v2.0

## 1. Contexto

### 1.1 Papel na Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PERSISTÊNCIA                              │
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
│  GITHUB (Definições)                 MONGODB (Transações)                   │
│  ────────────────────                ───────────────────                    │
│  • GENESIS.md                        • catalogo                             │
│  • Epistemologia.md                  • backlog_items                        │
│  • Módulos (.md)                     • sprints                              │
│  • Prompts                           • decisoes                             │
│  • M3/*.yaml (specs)  ───sync───────►• specs (v2)                           │
│                                      • classes_equivalencia (v2)            │
│                                      • criterios_aceite (v2)                │
│                                      • ciclo_tracking (v2)                  │
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
| `catalogo` | Índice semântico para busca | v1 | `_catalogo/indice.yaml` |
| `backlog_items` | Itens de trabalho com tracking | **v2** | `_backlog/*.md` |
| `sprints` | Ciclos de execução com métricas | **v2** | `_sprints/*.md` |
| `decisoes` | Histórico de decisões H-E-I-D | v1 | (novo) |
| `specs` | Specs M3.x parseadas | **v2 NOVO** | M3/*.yaml |
| `classes_equivalencia` | Valores de teste por atributo | **v2 NOVO** | M3.E.yaml |
| `criterios_aceite` | Comportamentos esperados | **v2 NOVO** | M3.*.yaml |
| `ciclo_tracking` | Timestamps de etapas M0-M4 | **v2 NOVO** | (novo) |

### 2.2 Diagrama de Relações

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
│  - collection: string (catalogo | backlog_items | sprints | decisoes |      │
│                        specs | classes_equivalencia | criterios_aceite |    │
│                        ciclo_tracking)                                      │
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
| Sincronizar spec M3.x | specs | inserir() ou atualizar() |
| Classe de equivalência | classes_equivalencia | inserir() |
| Critério de aceite | criterios_aceite | inserir() |
| Iniciar ciclo | ciclo_tracking | inserir() |
| Registrar etapa | ciclo_tracking | atualizar() |

### 3.5 Métodos de Métricas (v2)

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

### 4.2 backlog_items (v2)

Armazena itens de trabalho com histórico completo e tracking genérico.

```javascript
{
  _id: ObjectId,
  
  // === CAMPOS v1 (mantidos) ===
  
  // Identificação
  id: String,           // "bl_persistencia_hibrida"
  titulo: String,       // "Arquitetura de Persistência Híbrida"
  slug: String,         // "persistencia-hibrida"
  
  // Classificação
  tipo: String,         // "Feature" | "Bug" | "Minor" | 
                        // "ciclo_epistemologico" | "desenvolvimento" | "melhoria" | "documentacao"
  prioridade: String,   // "alta" | "media" | "baixa"
  sistema_afetado: String, // "Infraestrutura"
  
  // Ciclo de Vida
  status: String,       // "Pendente" | "Promovido" | "Resolvido" | "Merged" |
                        // "em_sprint" | "em_progresso" | "validando" | "concluido" | "rejeitado"
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
  
  // === CAMPOS v2 (novos) ===
  
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
  
  // Referência para tracking detalhado (se tipo == ciclo_epistemologico)
  ciclo_tracking_ref: ObjectId,
  
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

**Índices:**
- `{ id: 1 }` - único
- `{ status: 1, prioridade: 1 }` - busca por status e prioridade
- `{ slug: 1 }` - busca por slug
- `{ tipo: 1, status: 1 }` - busca por tipo e status (v2)
- `{ "timestamps.criado_em": 1 }` - ordenar por criação (v2)
- `{ "origem_ciclo.ms_pai": 1 }` - ciclos filhos de um MS (v2)
- `{ "metricas.lead_time_min": 1 }` - ordenar por tempo (v2)

---

### 4.3 sprints (v2)

Armazena ciclos de execução com tasks e métricas agregadas.

```javascript
{
  _id: ObjectId,
  
  // === CAMPOS v1 (mantidos) ===
  
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
  
  // === CAMPOS v2 (novos) ===
  
  // Itens da sprint (referências)
  itens: [ObjectId],    // refs para backlog_items
  
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
  
  // Controle
  created_at: Date,
  updated_at: Date
}
```

**Índices:**
- `{ id: 1 }` - único
- `{ codigo: 1 }` - único
- `{ status: 1 }` - busca por status
- `{ "metricas.throughput_dia": -1 }` - ranking de produtividade (v2)
- `{ "metricas.taxa_aprovacao_primeira": -1 }` - ranking de qualidade (v2)

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

### 4.5 specs (v2 - NOVO)

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

### 4.6 classes_equivalencia (v2 - NOVO)

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

### 4.7 criterios_aceite (v2 - NOVO)

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

### 4.8 ciclo_tracking (v2 - NOVO)

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
      "timestamps.promovido_em": new Date(),
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

// Listar por tipo (v2)
db.backlog_items.find({ tipo: "ciclo_epistemologico", status: "pendente" })

// Criar item de ciclo epistemológico (v2)
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

// Agregar métricas da sprint (v2)
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
```

### 5.4 Specs (v2)

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

### 5.5 Tracking (v2)

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

---

## 6. Validações

### 6.1 Regras de Integridade

| Collection | Regra | Validação |
|------------|-------|-----------|
| catalogo | id único | Índice único |
| backlog_items | id único | Índice único |
| sprints | codigo único | Índice único |
| decisoes | id único | Índice único |
| specs | ms_ref + vertente único | Índice único |
| classes_equivalencia | spec_ref deve existir | Aplicação |
| criterios_aceite | spec_ref deve existir | Aplicação |
| ciclo_tracking | backlog_item_ref único | Índice único |

### 6.2 Transições de Status

```
backlog_items.status:
  Pendente → Promovido → Resolvido
                      → Merged
  
  pendente → em_sprint → em_progresso → validando → concluido
                                      → rejeitado → pendente (loop)

sprints.status:
  Ativa → Concluida
```

---

## 7. Migração

### 7.1 De YAML para MongoDB

| Origem | Destino | Método |
|--------|---------|--------|
| `_catalogo/indice.yaml` | `catalogo` | Script de migração |
| `_backlog/*.md` (frontmatter) | `backlog_items` | Script de migração |
| `_sprints/*.md` (frontmatter) | `sprints` | Script de migração |
| `M3/*.yaml` | `specs` | sync_spec_from_yaml() |

### 7.2 Coexistência (Fase Transição)

Durante a migração, manter ambas as fontes sincronizadas:
1. MongoDB como fonte primária para leitura
2. GitHub atualizado para backup e versionamento
3. Após validação, eliminar YAML/frontmatter

### 7.3 Migração de Campos v1 → v2

Para backlog_items e sprints existentes:

```javascript
// Adicionar timestamps baseado em campos existentes
db.backlog_items.updateMany(
  { timestamps: { $exists: false } },
  [{
    $set: {
      timestamps: {
        criado_em: "$created_at",
        promovido_em: "$data_promocao",
        concluido_em: "$data_resolucao"
      }
    }
  }]
)

// Inicializar métricas vazias nas sprints
db.sprints.updateMany(
  { metricas: { $exists: false } },
  { $set: { metricas: {} } }
)
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| `genesis/GENESIS.md` | GENESIS.persistir() roteia para MongoDB |
| `genesis/PROMETHEUS.md` | Consome specs para geração de código/testes |
| `docs/00_I/00_I_1_1_GitHub.md` | GitHub.persistir_md() para definições |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Spec do Catálogo |
| `docs/00_I/00_I_2_Gestao_Projetos.md` | Gestão de Projetos |
| `docs/00_I/00_I_2_1_Backlog.md` | Métodos do Backlog |
| `docs/00_I/00_I_2_2_Sprint.md` | Métodos da Sprint |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação com schemas das 4 collections. Sprint S010/T02. |
| 1.1 | 2025-12-08 | Adicionados campos merged_into, merged_from e status "Merged" no schema backlog_items. Exemplo de operação merge. |
| 1.2 | 2025-12-08 | **MÉTODOS ORQUESTRADORES**: Seção 3 adicionada com persistir(), inserir(), atualizar(). Alinhamento com GitHub.md v3.0. Sprint S011/T04. |
| 2.0 | 2025-12-16 | **EXTENSÃO v2**: (1) Novas collections: specs, classes_equivalencia, criterios_aceite, ciclo_tracking. (2) backlog_items v2: +timestamps, +origem_ciclo, +metricas. (3) sprints v2: +metricas agregadas, +itens[]. (4) Métodos de métricas. (5) Seção Migração v1→v2. Mantida estrutura original de Infraestrutura. |

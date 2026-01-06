# MS_Backlog v1.3

---

```yaml
nome: MS_Backlog
versao: "1.3"
tipo: Meta Sistema
status: Publicado
camada: 4
dominio: Orquestração
data_publicacao: "2026-01-06"
pai: genesis/GENESIS.md
depende_de:
  - genesis/GENESIS.md
  - docs/00_E/00_E_1_4_Catalogo.md
arquitetura: docs/04_B/MS_Backlog_Arquitetura.md
```

---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Backlog** | Fila de itens aguardando processamento |
| **BacklogItem** | Unidade de trabalho tipada com contexto |
| **Tipo** | Classificação que define sistema consumidor |
| **Produtor** | Sistema que cria BacklogItem |
| **Consumidor** | Sistema que processa BacklogItem de seu tipo |
| **Polling** | Ato de consumidor buscar itens de seu tipo |
| **Roteamento** | Direcionamento de item para consumidor correto |
| **Saga** | Fluxo completo composto de múltiplos BacklogItems |
| **Origem** | Rastreabilidade de onde/como item foi criado (v1.1) |
| **auto_pull** | Flag que indica se Sprint deve puxar item automaticamente (v1.1) |
| **esforco_estimado** | Estimativa de horas para completar o item (v1.2) |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PROBLEMA                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MODELO ANTERIOR (Híbrido):                                                 │
│  ──────────────────────────                                                 │
│                                                                             │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐                               │
│  │ GENESIS │────►│MS_Prod  │────►│Epistemo │                               │
│  └─────────┘     └─────────┘     └─────────┘                               │
│       │               │               │                                     │
│       │               │               │                                     │
│       └───────────────┼───────────────┘                                     │
│                       │                                                     │
│                       ▼                                                     │
│                  ┌─────────┐                                                │
│                  │ Backlog │ ← usado às vezes                               │
│                  └─────────┘                                                │
│                                                                             │
│  PROBLEMAS:                                                                 │
│  • MS se conhecem diretamente (acoplamento)                                 │
│  • Comunicação inconsistente (às vezes Backlog, às vezes direto)            │
│  • Rastreabilidade parcial                                                  │
│  • Difícil interceptar/auditar fluxos                                       │
│  • Human-in-the-loop apenas em alguns pontos                                │
│  • Sem estimativa de esforço (impossível planejar)                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **MS_Backlog é o Meta Sistema que orquestra comunicação entre todos os outros Meta Sistemas através de uma fila tipada de trabalho.**
>
> **Princípios:**
> - **Desacoplamento total** - MS só conhecem MS_Backlog, não outros MS
> - **Tipagem define roteamento** - tipo do item → sistema consumidor
> - **Human-in-the-loop universal** - todo item pode ser aprovado/rejeitado
> - **Rastreabilidade completa** - tudo é documento persistido
> - **Saga como fluxo** - sequência de items forma processo completo
> - **Estimativa obrigatória** - todo item nasce com esforço estimado (v1.2)
>
> **Padrão:** Event Sourcing + Saga Pattern

### 1.4 Escopo

| MS_Backlog FAZ | MS_Backlog NÃO FAZ |
|----------------|-------------------|
| Recebe BacklogItems de produtores | Executa lógica de domínio |
| Roteia para consumidores por tipo | Processa conteúdo do item |
| Persiste histórico completo | Toma decisões de negócio |
| Permite interceptação/auditoria | Implementa regras específicas |
| Gerencia status de items | Substitui validação humana |
| Rastreia origem (sprint/task) | Decide se deve puxar (isso é Sprint) |
| Valida estimativa obrigatória | Executa o trabalho estimado |

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Event Sourcing** | Fowler | Todo estado é sequência de eventos |
| **Message Broker** | EIP | Intermediário desacopla produtores/consumidores |
| **Saga Pattern** | Garcia-Molina | Transações distribuídas via compensação |
| **CQRS** | Young | Separar escrita (produzir) de leitura (consumir) |
| **Publish-Subscribe** | EIP | Produtores publicam, consumidores assinam tipos |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MS_BACKLOG: SÍNTESE TEÓRICA                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EVENT SOURCING              MESSAGE BROKER            SAGA                 │
│  ┌───────────────┐          ┌───────────────┐         ┌───────────────┐     │
│  │ BacklogItem = │          │ MS_Backlog =  │         │ Fluxo =       │     │
│  │ Evento        │   ───►   │ Intermediário │  ───►   │ Sequência de  │     │
│  │ imutável      │          │ desacoplador  │         │ BacklogItems  │     │
│  └───────────────┘          └───────────────┘         └───────────────┘     │
│         │                          │                         │              │
│         │                          │                         │              │
│         ▼                          ▼                         ▼              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                           MS_BACKLOG                                │    │
│  │                                                                     │    │
│  │  Produtor ──► BacklogItem(tipo) ──► Fila ──► Consumidor(tipo)      │    │
│  │                                                                     │    │
│  │  Cada item é evento persistido que compõe saga rastreável          │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| MS_Backlog É | MS_Backlog NÃO É |
|--------------|------------------|
| Message Broker entre MS | Executor de lógica de domínio |
| Roteador por tipagem | Processador de conteúdo |
| Persistidor de histórico | Decisor de negócio |
| Ponto de interceptação | Substituto de validação humana |
| Orquestrador de sagas | Implementador de regras |
| SSOT de origem de items | Gerenciador de sprints |
| Validador de estimativa | Executor do trabalho |

### 3.2 Modelo de Comunicação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MODELO: BACKLOG COMO MESSAGE BROKER                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐               │
│  │ GENESIS │     │MS_Prod  │     │Epistemo │     │PROMETHEUS               │
│  │         │     │  uto    │     │ logia   │     │         │               │
│  └────┬────┘     └────┬────┘     └────┬────┘     └────┬────┘               │
│       │               │               │               │                     │
│       │ produz        │ produz        │ produz        │ produz              │
│       │ consome       │ consome       │ consome       │ consome             │
│       ▼               ▼               ▼               ▼                     │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                          MS_BACKLOG                                   ║  │
│  ║                                                                       ║  │
│  ║  ┌─────────────────────────────────────────────────────────────────┐  ║  │
│  ║  │                     FILA TIPADA                                 │  ║  │
│  ║  │                                                                 │  ║  │
│  ║  │  tipo: entrevistar_dor     → GENESIS consome                   │  ║  │
│  ║  │  tipo: estruturar_produto  → MS_Produto consome                │  ║  │
│  ║  │  tipo: criar_feature       → MS_Produto consome                │  ║  │
│  ║  │  tipo: ciclo_epistemo      → Epistemologia consome             │  ║  │
│  ║  │  tipo: desenvolvimento     → PROMETHEUS consome                │  ║  │
│  ║  │  tipo: aprovar_release     → PO (humano) consome               │  ║  │
│  ║  │  tipo: implantar           → MS_Produto consome                │  ║  │
│  ║  │  tipo: avaliar_efetividade → GENESIS consome                   │  ║  │
│  ║  │                                                                 │  ║  │
│  ║  └─────────────────────────────────────────────────────────────────┘  ║  │
│  ║                                                                       ║  │
│  ╚═══════════════════════════════════════════════════════════════════════╝  │
│                                                                             │
│  MS NÃO SE CONHECEM - só conhecem MS_Backlog                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Relações

| Componente | Relação |
|------------|---------|
| **GENESIS** | Produtor (entrada) + Consumidor (avaliação) |
| **MS_Produto** | Produtor + Consumidor (múltiplos tipos) |
| **Epistemologia** | Produtor + Consumidor (ciclo_epistemo) |
| **PROMETHEUS** | Produtor + Consumidor (desenvolvimento, workers) |
| **MS_Sprint** | Consumidor de interface (listar_filhos, transferir) |
| **Catálogo** | Dependência - indexação de items |
| **Humano** | Consumidor especial - aprovações |

---

## 4. Classe (M3)

### 4.1 Classe: BacklogItem

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLASSE: BACKLOG_ITEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Core                                                             │
│  ──────────────                                                             │
│  + id: String                        # Identificador único                  │
│  + tipo: TipoBacklogItem             # Define consumidor                    │
│  + titulo: String                    # Descrição curta                      │
│  + contexto: Object                  # Dados para processamento             │
│  + status: StatusBacklogItem         # Pendente|EmProcessamento|Concluido|  │
│  +                                   # Cancelado|Erro                       │
│  + prioridade: Enum                  # 🔴|🟡|🟢                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Esforço [v1.2]                                                   │
│  ────────────────────────                                                   │
│  + esforco_estimado_horas: Number    # OBRIGATÓRIO - estimativa do produtor │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Rastreabilidade                                                  │
│  ─────────────────────────                                                  │
│  + produtor: String                  # Sistema que criou                    │
│  + consumidor: String?               # Sistema que processou                │
│  + saga_id: String?                  # Agrupa items do mesmo fluxo          │
│  + pai_ref: String?                  # BacklogItem que originou este        │
│  + filhos: [String]                  # BacklogItems gerados por este        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Origem (Sprint) [v1.1]                                           │
│  ────────────────────────────────                                           │
│  + origem: {                         # Rastreabilidade de criação           │
│      tipo: Enum,                     # sprint_task | manual | ms_producao   │
│      sprint_id: String?,             # Ex: S022                             │
│      task_codigo: String?,           # Ex: T01                              │
│      ms_origem: String?,             # Epistemologia, PROMETHEUS, etc.      │
│      auto_pull: Boolean,             # true = sprint puxa automaticamente   │
│      criado_em: DateTime             # Timestamp de criação                 │
│    }?                                # Opcional (items manuais não têm)     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Referência                                                       │
│  ────────────────────                                                       │
│  + prontuario_ref: String?           # Prontuário relacionado               │
│  + produto_ref: String?              # Produto relacionado                  │
│  + feature_ref: String?              # Feature relacionada                  │
│  + spec_ref: String?                 # Spec relacionada                     │
│  + release_ref: String?              # Release relacionada                  │
│  + avaliacao_ref: String?            # Avaliação relacionada                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Temporais                                                        │
│  ───────────────────                                                        │
│  + created_at: DateTime              # Quando foi criado                    │
│  + updated_at: DateTime              # Última atualização                   │
│  + started_at: DateTime?             # Quando começou processamento         │
│  + completed_at: DateTime?           # Quando concluiu                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Resultado                                                        │
│  ───────────────────                                                        │
│  + resultado: Object?                # Output do processamento              │
│  + erro: String?                     # Mensagem de erro se falhou           │
│  + items_gerados: [String]           # IDs dos items criados                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Enum: TipoBacklogItem

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ENUM: TIPO_BACKLOG_ITEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TIPO                      CONSUMIDOR         DESCRIÇÃO                     │
│  ────                      ──────────         ─────────                     │
│                                                                             │
│  # Entrada                                                                  │
│  entrevistar_dor       →   GENESIS            Iniciar entrevista de dor     │
│                                                                             │
│  # Fluxo de Produto                                                         │
│  estruturar_produto    →   MS_Produto         Prontuário → Produto          │
│  criar_feature         →   MS_Produto         Produto → Feature             │
│  implantar             →   MS_Produto         Release → Implantação         │
│                                                                             │
│  # Fluxo Epistemológico                                                     │
│  ciclo_epistemologico  →   Epistemologia      Executar M0-M4                │
│                                                                             │
│  # Fluxo de Desenvolvimento                                                 │
│  desenvolvimento       →   PROMETHEUS         Spec → Código                 │
│  worker_estrutura      →   PROMETHEUS.W_E     Worker de estrutura           │
│  worker_processo       →   PROMETHEUS.W_P     Worker de processo            │
│  worker_dados          →   PROMETHEUS.W_D     Worker de dados               │
│  worker_interface      →   PROMETHEUS.W_I     Worker de interface           │
│  worker_integracao     →   PROMETHEUS.W_C     Worker de integração          │
│  corrigir_bug          →   PROMETHEUS         Correção técnica              │
│                                                                             │
│  # Fluxo de Release                                                         │
│  aprovar_release       →   PO (humano)        Validação humana              │
│                                                                             │
│  # Fluxo de Validação                                                       │
│  avaliar_efetividade   →   GENESIS            Release → Avaliação           │
│  iterar_feature        →   Epistemologia      Refinar solução               │
│                                                                             │
│  # Genérico                                                                 │
│  minor                 →   (configurável)     Tarefas pequenas              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Classe: MS_Backlog (Gerenciador)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CLASSE: MS_BACKLOG                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + roteamento: Map<Tipo, Consumidor>   # Tabela de roteamento               │
│  + catalogo: Catalogo                  # Para indexação                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Públicos                                                           │
│  ────────────────                                                           │
│  + produzir(item: BacklogItem): BacklogItem                                 │
│  + consumir(tipos: [Tipo]): BacklogItem?                                    │
│  + concluir(item_id, resultado, items_gerados?): void                       │
│  + falhar(item_id, erro): void                                              │
│  + cancelar(item_id, motivo): void                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos de Consulta                                                        │
│  ───────────────────                                                        │
│  + listar_pendentes(tipos?: [Tipo]): [BacklogItem]                          │
│  + listar_saga(saga_id): [BacklogItem]                                      │
│  + obter_item(item_id): BacklogItem                                         │
│  + obter_filhos(item_id): [BacklogItem]                                     │
│  + obter_historico(filtros): [BacklogItem]                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos de Saga                                                            │
│  ───────────────                                                            │
│  + iniciar_saga(titulo): saga_id                                            │
│  + obter_status_saga(saga_id): SagaStatus                                   │
│  + compensar_saga(saga_id): void                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Interface Sprint [v1.1]                                            │
│  ───────────────────────────────                                            │
│  + listar_filhos(sprint_id, task_codigo?): [BacklogItem]                    │
│  + transferir_para_sprint(item_id, sprint_id, task_pai?): BacklogItem       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Métodos

#### produzir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MÉTODO: produzir()                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: BacklogItem (parcial)                                               │
│  Output: BacklogItem (completo, persistido)                                 │
│                                                                             │
│  Validação [v1.2]:                                                          │
│  ─────────────────                                                          │
│  SE esforco_estimado_horas não fornecido OU <= 0:                           │
│      ERRO: "esforco_estimado_horas é obrigatório e deve ser > 0"            │
│                                                                             │
│  Passos:                                                                    │
│  1. Validar esforco_estimado_horas (obrigatório) [v1.2]                     │
│  2. Gerar ID único                                                          │
│  3. Definir timestamps (created_at, updated_at)                             │
│  4. Status = Pendente                                                       │
│  5. SE saga_id não fornecido E pai_ref existe:                              │
│        saga_id = pai.saga_id                                                │
│  6. Persistir no MongoDB                                                    │
│  7. Indexar no Catálogo                                                     │
│  8. Retornar item completo                                                  │
│                                                                             │
│  Exemplo:                                                                   │
│  MS_Backlog.produzir({                                                      │
│    tipo: "ciclo_epistemologico",                                            │
│    titulo: "Especificar Feature Reporte por Voz",                           │
│    produtor: "MS_Produto",                                                  │
│    esforco_estimado_horas: 4,              # OBRIGATÓRIO [v1.2]             │
│    contexto: {problema: "...", criterios: [...]},                           │
│    feature_ref: "feat_001",                                                 │
│    saga_id: "saga_001"                                                      │
│  })                                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### consumir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MÉTODO: consumir()                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: tipos (lista de tipos que o consumidor processa)                    │
│  Output: BacklogItem? (próximo item ou null se fila vazia)                  │
│                                                                             │
│  Passos:                                                                    │
│  1. Buscar item mais antigo com:                                            │
│     - tipo IN tipos                                                         │
│     - status = Pendente                                                     │
│     - ordenado por prioridade DESC, created_at ASC                          │
│  2. SE encontrou:                                                           │
│     - Atualizar status = EmProcessamento                                    │
│     - Atualizar started_at = agora                                          │
│     - Atualizar consumidor = sistema_chamador                               │
│     - Retornar item                                                         │
│  3. SE não encontrou:                                                       │
│     - Retornar null                                                         │
│                                                                             │
│  Exemplo:                                                                   │
│  # Epistemologia consome                                                    │
│  item = MS_Backlog.consumir(["ciclo_epistemologico", "iterar_feature"])     │
│  IF item:                                                                   │
│      processar(item)                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### concluir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MÉTODO: concluir()                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - item_id: String                                                          │
│  - resultado: Object (output do processamento)                              │
│  - items_gerados?: [BacklogItem] (novos items a produzir)                   │
│                                                                             │
│  Output: void                                                               │
│                                                                             │
│  Passos:                                                                    │
│  1. Buscar item por ID                                                      │
│  2. Atualizar:                                                              │
│     - status = Concluido                                                    │
│     - completed_at = agora                                                  │
│     - resultado = input.resultado                                           │
│  3. SE items_gerados:                                                       │
│     PARA CADA novo_item:                                                    │
│       - Validar esforco_estimado_horas [v1.2]                               │
│       - novo_item.pai_ref = item_id                                         │
│       - novo_item.saga_id = item.saga_id                                    │
│       - MS_Backlog.produzir(novo_item)                                      │
│       - item.filhos.append(novo_item.id)                                    │
│  4. Persistir                                                               │
│                                                                             │
│  Exemplo:                                                                   │
│  # Epistemologia conclui e gera item de desenvolvimento                     │
│  MS_Backlog.concluir(                                                       │
│    item_id: "bkl_001",                                                      │
│    resultado: {spec_id: "spec_001", vertentes: ["M3.E", "M3.I"]},           │
│    items_gerados: [{                                                        │
│      tipo: "desenvolvimento",                                               │
│      titulo: "Desenvolver Feature Reporte por Voz",                         │
│      produtor: "Epistemologia",                                             │
│      esforco_estimado_horas: 8,            # OBRIGATÓRIO [v1.2]             │
│      spec_ref: "spec_001"                                                   │
│    }]                                                                       │
│  )                                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### listar_filhos() [v1.1]

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MÉTODO: listar_filhos() [v1.1]                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - sprint_id: String              # Ex: "S022"                              │
│  - task_codigo?: String           # Ex: "T01" (opcional)                    │
│                                                                             │
│  Output: [BacklogItem]            # Items com origem na sprint/task         │
│                                                                             │
│  Passos:                                                                    │
│  1. Construir filtro:                                                       │
│     - "origem.sprint_id": sprint_id                                         │
│     - SE task_codigo: "origem.task_codigo": task_codigo                     │
│     - status: "pendente"                                                    │
│  2. Buscar no MongoDB                                                       │
│  3. Retornar lista                                                          │
│                                                                             │
│  Query MongoDB:                                                             │
│  db.backlog.find({                                                          │
│    "origem.sprint_id": "S022",                                              │
│    "origem.task_codigo": "T01",    // opcional                              │
│    "status": "pendente"                                                     │
│  })                                                                         │
│                                                                             │
│  Exemplo:                                                                   │
│  # Sprint consulta filhos da task T01                                       │
│  filhos = MS_Backlog.listar_filhos("S022", "T01")                           │
│  # Retorna: [{id: "BKL-042", titulo: "Validar spec", auto_pull: true}]      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### transferir_para_sprint() [v1.1]

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   MÉTODO: transferir_para_sprint() [v1.1]                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - item_id: String                # ID do BacklogItem                       │
│  - sprint_id: String              # Sprint destino                          │
│  - task_pai?: String              # Task pai (para gerar código subtask)    │
│                                                                             │
│  Output: BacklogItem              # Item atualizado                         │
│                                                                             │
│  Passos:                                                                    │
│  1. Buscar item por ID                                                      │
│  2. Atualizar:                                                              │
│     - status = "em_sprint"                                                  │
│     - sprint_ref = sprint_id                                                │
│     - updated_at = agora                                                    │
│  3. Persistir                                                               │
│  4. Retornar item atualizado                                                │
│                                                                             │
│  Exemplo:                                                                   │
│  # Sprint puxa item filho                                                   │
│  item = MS_Backlog.transferir_para_sprint("BKL-042", "S022", "T01")         │
│  # Sprint usa item.titulo para criar subtask T01.1                          │
│  # Sprint herda item.esforco_estimado_horas para a task [v1.2]              │
│                                                                             │
│  Nota: A criação da subtask (T01.1) é responsabilidade do MS_Sprint,        │
│        não do MS_Backlog. MS_Backlog apenas atualiza status do item.        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Fluxo de Saga Completa

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SAGA: DOR → PRODUÇÃO (via Backlog)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  saga_id: "saga_001"                                                        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 1. ENTRADA                                                          │    │
│  │    USUÁRIO: "Tenho uma dor"                                         │    │
│  │    → produzir({tipo: entrevistar_dor, saga_id: saga_001,            │    │
│  │               esforco_estimado_horas: 1})                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                          │                                                  │
│                          ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 2. GENESIS consome(entrevistar_dor)                                 │    │
│  │    → Executa entrevista, cria Prontuário                            │    │
│  │    → concluir(resultado: {prontuario_id}, items_gerados: [          │    │
│  │        {tipo: estruturar_produto, prontuario_ref,                   │    │
│  │         esforco_estimado_horas: 2}                                  │    │
│  │      ])                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                          │                                                  │
│                          ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 3. MS_PRODUTO consome(estruturar_produto)                           │    │
│  │    → Cria Produto + Feature                                         │    │
│  │    → concluir(resultado: {produto_id, feature_id}, items_gerados: [ │    │
│  │        {tipo: ciclo_epistemologico, feature_ref,                    │    │
│  │         esforco_estimado_horas: 4}                                  │    │
│  │      ])                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                          │                                                  │
│                          ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 4. EPISTEMOLOGIA consome(ciclo_epistemologico)                      │    │
│  │    → Executa M0-M4, gera Spec                                       │    │
│  │    → SE não-folha: items_gerados inclui ciclo_epistemo (recursivo)  │    │
│  │    → concluir(resultado: {spec_id}, items_gerados: [                │    │
│  │        {tipo: desenvolvimento, spec_ref,                            │    │
│  │         esforco_estimado_horas: 8}                                  │    │
│  │      ])                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                          │                                                  │
│                          ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 5. PROMETHEUS consome(desenvolvimento)                              │    │
│  │    → Executa TDD, gera Release                                      │    │
│  │    → Internamente: produz worker_* para cada vertente               │    │
│  │    → concluir(resultado: {release_id}, items_gerados: [             │    │
│  │        {tipo: aprovar_release, release_ref,                         │    │
│  │         esforco_estimado_horas: 0.5}                                │    │
│  │      ])                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                          │                                                  │
│                          ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 6. PO consome(aprovar_release)                                      │    │
│  │    → Humano valida release                                          │    │
│  │    → concluir(resultado: {aprovado: true}, items_gerados: [         │    │
│  │        {tipo: implantar, release_ref,                               │    │
│  │         esforco_estimado_horas: 2}                                  │    │
│  │      ])                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                          │                                                  │
│                          ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 7. MS_PRODUTO consome(implantar)                                    │    │
│  │    → Setup + Treinamento                                            │    │
│  │    → concluir(resultado: {implantacao_id}, items_gerados: [         │    │
│  │        {tipo: avaliar_efetividade, release_ref, produto_ref,        │    │
│  │         esforco_estimado_horas: 1}                                  │    │
│  │      ])                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                          │                                                  │
│                          ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 8. GENESIS consome(avaliar_efetividade)                             │    │
│  │    → Coleta métricas, avalia                                        │    │
│  │    → SE sucesso: concluir(resultado: {conclusao: SUCESSO})          │    │
│  │    → SE iterar: items_gerados: [{tipo: iterar_feature,              │    │
│  │                                  esforco_estimado_horas: 4}]        │    │
│  │    → SE bug: items_gerados: [{tipo: corrigir_bug,                   │    │
│  │                               esforco_estimado_horas: 2}]           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Invariantes

| Invariante | Descrição |
|------------|-----------|
| **TIPO-OBRIGATORIO** | Todo BacklogItem deve ter tipo definido |
| **PRODUTOR-OBRIGATORIO** | Todo BacklogItem deve ter produtor |
| **ESTIMATIVA-OBRIGATORIA** | Todo BacklogItem deve ter esforco_estimado_horas > 0 [v1.2] |
| **SAGA-HERANCA** | Item filho herda saga_id do pai |
| **STATUS-TRANSICAO** | Pendente → EmProcessamento → Concluido/Erro |
| **CONSUMIDOR-UNICO** | Item só pode ser consumido por um sistema |
| **RASTREABILIDADE** | Todo item deve ser persistido antes de processar |
| **ORIGEM-OPCIONAL** | Campo origem é opcional (items manuais não têm) [v1.1] |
| **SSOT-ORIGEM** | Origem persiste apenas no BacklogItem [v1.1] |

---

## 7. Triggers de Roteamento

```yaml
# MS_Backlog não tem triggers de usuário direto
# Usuário interage com GENESIS, que produz primeiro item

problema_que_resolve: "Como orquestrar comunicação entre Meta Sistemas"

consumidores:
  GENESIS:
    - entrevistar_dor
    - avaliar_efetividade
  
  MS_Produto:
    - estruturar_produto
    - criar_feature
    - implantar
  
  Epistemologia:
    - ciclo_epistemologico
    - iterar_feature
  
  PROMETHEUS:
    - desenvolvimento
    - worker_estrutura
    - worker_processo
    - worker_dados
    - worker_interface
    - worker_integracao
    - corrigir_bug
  
  PO:
    - aprovar_release
```

---

## 8. Ciclo de Vida de Documentos (v1.3)

### 8.1 Estrutura de Pastas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ESTRUTURA DE PASTAS - BACKLOG                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  conhecimento-zaz/                                                          │
│  ├── _backlog/                    # Specs de itens BKL-* PENDENTES          │
│  │   ├── BKL-P05_Sprint_v2.md     # Item aguardando priorização             │
│  │   ├── BKL-GH-008_Testes.md     # Item em execução na sprint              │
│  │   └── ...                                                                │
│  │                                                                          │
│  ├── _arquivo/                    # Documentos ARQUIVADOS                   │
│  │   └── backlog/                 # BKL promovidos ou cancelados            │
│  │       ├── BKL-XXX.md           # Item concluído/cancelado                │
│  │       └── ...                                                            │
│  │                                                                          │
│  └── docs/04_B/                   # Meta Sistema Backlog (este documento)   │
│      ├── MS_Backlog.md                                                      │
│      └── MS_Backlog_Arquitetura.md                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Ciclo de Vida

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CICLO DE VIDA: BACKLOG ITEM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                          ┌──────────────────┐                               │
│                          │    CRIAÇÃO       │                               │
│                          │                  │                               │
│                          │  1. Criar spec   │                               │
│                          │     _backlog/    │                               │
│                          │     BKL-XXX.md   │                               │
│                          │                  │                               │
│                          │  2. Criar doc    │                               │
│                          │     MongoDB      │                               │
│                          │     backlog_items│                               │
│                          └────────┬─────────┘                               │
│                                   │                                         │
│                                   ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                         _backlog/BKL-XXX.md                        │     │
│  │                         status: pendente                           │     │
│  │                                                                    │     │
│  │  Item aguarda priorização e seleção para sprint                    │     │
│  │  MongoDB: backlog_items.status = "pendente"                        │     │
│  └────────────────────────────────┬───────────────────────────────────┘     │
│                                   │                                         │
│                                   │ promover() - selecionado para sprint    │
│                                   ▼                                         │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                         _backlog/BKL-XXX.md                        │     │
│  │                         status: em_sprint                          │     │
│  │                                                                    │     │
│  │  Item em execução na sprint                                        │     │
│  │  MongoDB: backlog_items.status = "em_sprint"                       │     │
│  │  MongoDB: backlog_items.sprint_ref = "S-XXX"                       │     │
│  └────────────────────────────────┬───────────────────────────────────┘     │
│                                   │                                         │
│                    ┌──────────────┼──────────────┐                          │
│                    │              │              │                          │
│                    ▼              ▼              ▼                          │
│              concluir()      cancelar()     devolver()                      │
│                    │              │              │                          │
│                    ▼              ▼              │                          │
│  ┌─────────────────────────────────────────┐    │                          │
│  │        _arquivo/backlog/BKL-XXX.md      │    │                          │
│  │        status: concluido | cancelado    │    │                          │
│  │                                         │    │                          │
│  │  Item arquivado (histórico)             │    │                          │
│  │  MongoDB: status = "concluido|cancelado"│    │                          │
│  └─────────────────────────────────────────┘    │                          │
│                                                 │                          │
│                                                 ▼                          │
│                                   ┌─────────────────────────┐              │
│                                   │  _backlog/BKL-XXX.md    │              │
│                                   │  status: pendente       │              │
│                                   │                         │              │
│                                   │  Item devolvido ao      │              │
│                                   │  backlog (volta à fila) │              │
│                                   └─────────────────────────┘              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Regras de Movimentação

| Transição | Origem | Destino | Ação MongoDB |
|-----------|--------|---------|--------------|
| **promover()** | `_backlog/` | permanece | `status = "em_sprint"`, `sprint_ref = S-XXX` |
| **concluir()** | `_backlog/` | `_arquivo/backlog/` | `status = "concluido"` |
| **cancelar()** | `_backlog/` | `_arquivo/backlog/` | `status = "cancelado"` |
| **devolver()** | `_backlog/` | permanece | `status = "pendente"`, `sprint_ref = null` |

**Notas:**
- O arquivo `.md` só é movido para `_arquivo/` quando o item é **concluído** ou **cancelado**
- Durante a execução na sprint, o arquivo permanece em `_backlog/` com status atualizado
- MongoDB é SSOT para status; arquivo é documentação complementar

### 8.4 Formato do Arquivo de Spec

```yaml
# _backlog/BKL-XXX.md

---
codigo: BKL-GH-008
titulo: "Testes E2E GitHub Pipeline"
tipo: desenvolvimento
status: pendente           # pendente | em_sprint | concluido | cancelado
prioridade: alta           # alta | media | baixa
sistema_afetado: pantheon
saga_id: SAGA-PANTHEON
esforco_estimado_horas: 2
mongodb_ref: "backlog_items.codigo = 'BKL-GH-008'"
---

## Contexto
[Descrição do problema/necessidade]

## Critérios de Aceite
- [ ] Critério 1
- [ ] Critério 2

## Referências
- Sprint: S-PANTHEON-003 (se em execução)
- Documentos relacionados

## Estimativa
- Esforço: 2h
- Complexidade: Média
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Produtor/Consumidor |
| docs/04_B/MS_Backlog_Arquitetura.md | Detalhes técnicos |
| docs/04_P/MS_Produto.md | Produtor/Consumidor |
| docs/00_E/00_E_Epistemologia.md | Consumidor |
| genesis/PROMETHEUS.md | Consumidor |
| docs/04_S/MS_Sprint.md | Consumidor de interface (listar_filhos, transferir) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | Criação inicial. Promoção de Backlog (Infra C2) para MS_Backlog (Meta Sistema C4). Modelo Event Sourcing + Saga. Tipagem expandida. Métodos produzir/consumir/concluir. |
| 1.1 | 2025-12-17 | **Interface Sprint**: +campo `origem` em BacklogItem (sprint_id, task_codigo, auto_pull). +métodos `listar_filhos()`, `transferir_para_sprint()`. +invariantes ORIGEM-OPCIONAL, SSOT-ORIGEM. Sprint S022/T02. |
| 1.2 | 2025-12-17 | **Estimativa obrigatória**: +campo `esforco_estimado_horas` obrigatório em BacklogItem. +invariante ESTIMATIVA-OBRIGATORIA. +validação em produzir(). MS_Sprint herda estimativa ao puxar item. Sprint S023/T02. |
| 1.3 | 2026-01-06 | **Ciclo de Vida de Documentos**: Seção 8 documenta estrutura de pastas (_backlog/, _arquivo/backlog/), ciclo de vida (pendente → em_sprint → concluido/cancelado), regras de movimentação, formato de spec. Sprint S-PANTHEON-003. |

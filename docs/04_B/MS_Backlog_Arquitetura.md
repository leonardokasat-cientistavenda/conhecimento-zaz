# MS_Backlog Arquitetura v1.0

---

```yaml
nome: MS_Backlog_Arquitetura
versao: "1.0"
tipo: Documento
status: Publicado
camada: 4
data_publicacao: "2025-12-16"
pai: docs/04_B/MS_Backlog.md
depende_de:
  - docs/04_B/MS_Backlog.md
```

---

Este documento detalha a arquitetura técnica do MS_Backlog. Para visão de propósito, ver MS_Backlog.md.

---

## 1. Contratos

### 1.1 Interface Produtor

```yaml
# Qualquer MS pode produzir BacklogItem
produzir:
  input:
    tipo: TipoBacklogItem           # Obrigatório
    titulo: string                  # Obrigatório
    contexto: object                # Dados para processamento
    prioridade?: "🔴" | "🟡" | "🟢" # Default: 🟡
    saga_id?: string                # Herda do pai se não fornecido
    pai_ref?: string                # BacklogItem que originou
    # Refs opcionais
    prontuario_ref?: string
    produto_ref?: string
    feature_ref?: string
    spec_ref?: string
    release_ref?: string
    avaliacao_ref?: string
  
  output:
    item_id: string
    status: "Pendente"
    saga_id: string
    created_at: datetime
```

### 1.2 Interface Consumidor

```yaml
# MS consome tipos específicos
consumir:
  input:
    tipos: [TipoBacklogItem]        # Lista de tipos que processa
  
  output:
    item?: BacklogItem              # Próximo item ou null
    # Se item retornado:
    #   status = EmProcessamento
    #   started_at = agora
    #   consumidor = sistema_chamador

# Após processar
concluir:
  input:
    item_id: string
    resultado: object               # Output do processamento
    items_gerados?: [BacklogItem]   # Novos items a criar
  
  output: void
  # Side effects:
  #   item.status = Concluido
  #   item.completed_at = agora
  #   item.resultado = input.resultado
  #   item.items_gerados = [novos_ids]
  #   Cada novo item criado com pai_ref = item_id

# Se falha
falhar:
  input:
    item_id: string
    erro: string
  
  output: void
  # Side effects:
  #   item.status = Erro
  #   item.erro = input.erro
```

### 1.3 Contratos por Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONTRATOS: MS ↔ MS_BACKLOG                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS                                                                    │
│  ───────                                                                    │
│  Consome: [entrevistar_dor, avaliar_efetividade]                            │
│  Produz:  [estruturar_produto] após entrevista                              │
│           [iterar_feature | corrigir_bug] após avaliação                    │
│                                                                             │
│  MS_PRODUTO                                                                 │
│  ──────────                                                                 │
│  Consome: [estruturar_produto, criar_feature, implantar]                    │
│  Produz:  [ciclo_epistemologico] para especificar feature                   │
│           [avaliar_efetividade] após implantação                            │
│                                                                             │
│  EPISTEMOLOGIA                                                              │
│  ─────────────                                                              │
│  Consome: [ciclo_epistemologico, iterar_feature]                            │
│  Produz:  [ciclo_epistemologico] para ciclos recursivos (não-folha)         │
│           [desenvolvimento] quando spec pronta                              │
│                                                                             │
│  PROMETHEUS                                                                 │
│  ──────────                                                                 │
│  Consome: [desenvolvimento, worker_*, corrigir_bug]                         │
│  Produz:  [worker_*] internamente por vertente                              │
│           [aprovar_release] quando release pronta                           │
│                                                                             │
│  PO (Humano)                                                                │
│  ───────────                                                                │
│  Consome: [aprovar_release]                                                 │
│  Produz:  [implantar] se aprovado                                           │
│           [corrigir_bug | iterar_feature] se rejeitado                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Fluxo de Dados

### 2.1 Ciclo de Vida do BacklogItem

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ESTADOS DO BACKLOG ITEM                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    produzir()                                               │
│                        │                                                    │
│                        ▼                                                    │
│                  ┌──────────┐                                               │
│                  │ Pendente │                                               │
│                  └────┬─────┘                                               │
│                       │                                                     │
│                       │ consumir()                                          │
│                       ▼                                                     │
│               ┌───────────────┐                                             │
│               │EmProcessamento│                                             │
│               └───────┬───────┘                                             │
│                       │                                                     │
│          ┌────────────┼────────────┐                                        │
│          │            │            │                                        │
│          ▼            ▼            ▼                                        │
│    ┌──────────┐ ┌──────────┐ ┌──────────┐                                   │
│    │Concluido │ │   Erro   │ │Cancelado │                                   │
│    └──────────┘ └──────────┘ └──────────┘                                   │
│          │                                                                  │
│          │ (pode gerar filhos)                                              │
│          ▼                                                                  │
│    ┌──────────┐                                                             │
│    │ Pendente │ (novos items)                                               │
│    └──────────┘                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Propagação de Saga

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROPAGAÇÃO DE SAGA_ID                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Item Raiz (saga_id gerado)                                                 │
│  │                                                                          │
│  │  saga_id: "saga_001"                                                     │
│  │  pai_ref: null                                                           │
│  │                                                                          │
│  └─► Item Filho 1                                                           │
│      │                                                                      │
│      │  saga_id: "saga_001" (herdado)                                       │
│      │  pai_ref: "item_raiz_id"                                             │
│      │                                                                      │
│      └─► Item Neto 1                                                        │
│          │                                                                  │
│          │  saga_id: "saga_001" (herdado)                                   │
│          │  pai_ref: "item_filho_1_id"                                      │
│          │                                                                  │
│          └─► ...                                                            │
│                                                                             │
│  REGRA: saga_id propaga automaticamente de pai para filho                   │
│         permite rastrear todo o fluxo de uma dor até produção               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Árvore de Items (Exemplo Real)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ÁRVORE: SAGA "Reporte por Voz"                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  bkl_001 (entrevistar_dor)                                                  │
│  │ saga_id: saga_001                                                        │
│  │ status: Concluido                                                        │
│  │ resultado: {prontuario_id: "pron_001"}                                   │
│  │                                                                          │
│  └─► bkl_002 (estruturar_produto)                                           │
│      │ saga_id: saga_001                                                    │
│      │ pai_ref: bkl_001                                                     │
│      │ status: Concluido                                                    │
│      │ resultado: {produto_id: "prod_001", feature_id: "feat_001"}          │
│      │                                                                      │
│      └─► bkl_003 (ciclo_epistemologico)                                     │
│          │ saga_id: saga_001                                                │
│          │ pai_ref: bkl_002                                                 │
│          │ feature_ref: feat_001                                            │
│          │ status: Concluido                                                │
│          │                                                                  │
│          ├─► bkl_004 (ciclo_epistemologico) ← recursivo para Transcricao    │
│          │   │ saga_id: saga_001                                            │
│          │   │ pai_ref: bkl_003                                             │
│          │   │ status: Concluido                                            │
│          │   │                                                              │
│          │   └─► bkl_006 (desenvolvimento)                                  │
│          │       status: Concluido                                          │
│          │                                                                  │
│          └─► bkl_005 (desenvolvimento) ← feature principal                  │
│              │ saga_id: saga_001                                            │
│              │ pai_ref: bkl_003                                             │
│              │ spec_ref: spec_001                                           │
│              │ status: Concluido                                            │
│              │                                                              │
│              └─► bkl_007 (aprovar_release)                                  │
│                  │ status: Concluido                                        │
│                  │                                                          │
│                  └─► bkl_008 (implantar)                                    │
│                      │ status: Concluido                                    │
│                      │                                                      │
│                      └─► bkl_009 (avaliar_efetividade)                      │
│                          status: Concluido                                  │
│                          resultado: {conclusao: "SUCESSO"}                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Roteamento

### 3.1 Tabela de Roteamento

```yaml
roteamento:
  # Entrada
  entrevistar_dor:
    consumidor: GENESIS
    prioridade_default: 🔴
    timeout_minutos: null  # Interação humana
  
  # Produto
  estruturar_produto:
    consumidor: MS_Produto
    prioridade_default: 🔴
    timeout_minutos: null
  
  criar_feature:
    consumidor: MS_Produto
    prioridade_default: 🟡
    timeout_minutos: null
  
  implantar:
    consumidor: MS_Produto
    prioridade_default: 🟡
    timeout_minutos: null
  
  # Epistemologia
  ciclo_epistemologico:
    consumidor: Epistemologia
    prioridade_default: 🔴
    timeout_minutos: null
  
  iterar_feature:
    consumidor: Epistemologia
    prioridade_default: 🔴
    timeout_minutos: null
  
  # Desenvolvimento
  desenvolvimento:
    consumidor: PROMETHEUS
    prioridade_default: 🔴
    timeout_minutos: 60
  
  worker_estrutura:
    consumidor: PROMETHEUS.Worker_E
    prioridade_default: 🟡
    timeout_minutos: 30
  
  worker_processo:
    consumidor: PROMETHEUS.Worker_P
    prioridade_default: 🟡
    timeout_minutos: 30
  
  worker_dados:
    consumidor: PROMETHEUS.Worker_D
    prioridade_default: 🟡
    timeout_minutos: 30
  
  worker_interface:
    consumidor: PROMETHEUS.Worker_I
    prioridade_default: 🟡
    timeout_minutos: 30
  
  worker_integracao:
    consumidor: PROMETHEUS.Worker_C
    prioridade_default: 🟡
    timeout_minutos: 30
  
  corrigir_bug:
    consumidor: PROMETHEUS
    prioridade_default: 🔴
    timeout_minutos: 60
  
  # Release
  aprovar_release:
    consumidor: PO
    prioridade_default: 🔴
    timeout_minutos: null  # Decisão humana
  
  # Validação
  avaliar_efetividade:
    consumidor: GENESIS
    prioridade_default: 🟡
    timeout_minutos: null
  
  # Genérico
  minor:
    consumidor: null  # Configurável por item
    prioridade_default: 🟢
    timeout_minutos: null
```

### 3.2 Algoritmo de Consumo

```python
def consumir(tipos: List[str]) -> Optional[BacklogItem]:
    """
    Retorna próximo item disponível para os tipos especificados.
    Prioriza por: prioridade DESC, created_at ASC
    """
    
    # Query MongoDB
    item = db.backlog_items.find_one_and_update(
        filter={
            "tipo": {"$in": tipos},
            "status": "Pendente"
        },
        update={
            "$set": {
                "status": "EmProcessamento",
                "started_at": datetime.now(),
                "consumidor": get_current_system()
            }
        },
        sort=[
            ("prioridade", -1),  # 🔴 > 🟡 > 🟢
            ("created_at", 1)    # FIFO dentro da prioridade
        ],
        return_document=True
    )
    
    return item
```

---

## 4. Persistência

### 4.1 MongoDB Collections

```yaml
# Collection: backlog_items
backlog_items:
  _id: ObjectId
  id: string           # ID legível (bkl_001)
  tipo: string
  titulo: string
  contexto: object
  status: string
  prioridade: string
  
  # Rastreabilidade
  produtor: string
  consumidor: string?
  saga_id: string
  pai_ref: string?
  filhos: [string]
  
  # Refs
  prontuario_ref: string?
  produto_ref: string?
  feature_ref: string?
  spec_ref: string?
  release_ref: string?
  avaliacao_ref: string?
  
  # Temporal
  created_at: datetime
  updated_at: datetime
  started_at: datetime?
  completed_at: datetime?
  
  # Resultado
  resultado: object?
  erro: string?
  items_gerados: [string]

# Índices
indexes:
  - {tipo: 1, status: 1, prioridade: -1, created_at: 1}  # Para consumir()
  - {saga_id: 1}                                          # Para listar_saga()
  - {pai_ref: 1}                                          # Para obter_filhos()
  - {status: 1, created_at: 1}                            # Para histórico

# Collection: sagas
sagas:
  _id: ObjectId
  saga_id: string
  titulo: string
  status: string       # EmAndamento | Concluida | Falha | Cancelada
  item_raiz: string    # ID do primeiro item
  created_at: datetime
  completed_at: datetime?
  items_count: number
  items_concluidos: number
```

### 4.2 Regra de Ouro

```
MS_Backlog SEMPRE persiste em MongoDB (transacional)
Não usa GitHub (não é definição, é instância/transação)
```

---

## 5. Observabilidade

### 5.1 Métricas

```yaml
metricas:
  # Por tipo
  items_por_tipo:
    query: "COUNT GROUP BY tipo"
    uso: "Volume por tipo de trabalho"
  
  tempo_medio_processamento:
    query: "AVG(completed_at - started_at) GROUP BY tipo"
    uso: "Performance por tipo"
  
  taxa_erro:
    query: "COUNT(status=Erro) / COUNT(*) GROUP BY tipo"
    uso: "Qualidade por tipo"
  
  # Por saga
  tempo_saga:
    query: "MAX(completed_at) - MIN(created_at) WHERE saga_id"
    uso: "Lead time end-to-end"
  
  profundidade_saga:
    query: "MAX(depth) WHERE saga_id"
    uso: "Complexidade do fluxo"
  
  # Fila
  items_pendentes:
    query: "COUNT WHERE status=Pendente GROUP BY tipo"
    uso: "Tamanho da fila"
  
  idade_fila:
    query: "MAX(NOW - created_at) WHERE status=Pendente"
    uso: "Item mais antigo aguardando"
```

### 5.2 Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DASHBOARD MS_BACKLOG                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FILA ATUAL                                                                 │
│  ──────────                                                                 │
│  🔴 ciclo_epistemologico: 3 pendentes                                       │
│  🔴 desenvolvimento: 1 pendente                                             │
│  🟡 implantar: 2 pendentes                                                  │
│  🟢 minor: 5 pendentes                                                      │
│                                                                             │
│  PROCESSANDO AGORA                                                          │
│  ─────────────────                                                          │
│  • bkl_042 (ciclo_epistemo) → Epistemologia (há 5 min)                      │
│  • bkl_045 (desenvolvimento) → PROMETHEUS (há 12 min)                       │
│                                                                             │
│  ÚLTIMAS 24H                                                                │
│  ───────────                                                                │
│  Produzidos: 23                                                             │
│  Concluídos: 21                                                             │
│  Erros: 1 (bkl_039 - timeout)                                               │
│  Tempo médio: 8 min                                                         │
│                                                                             │
│  SAGAS ATIVAS                                                               │
│  ────────────                                                               │
│  saga_012: "MS_CRM" - 15/20 items (75%)                                     │
│  saga_015: "Reporte Voz" - 8/12 items (67%)                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Human-in-the-Loop

### 6.1 Pontos de Aprovação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HUMAN-IN-THE-LOOP                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AUTOMÁTICO (sistema consome sem aprovação):                                │
│  • worker_* (internos ao PROMETHEUS)                                        │
│                                                                             │
│  REQUER APROVAÇÃO HUMANA:                                                   │
│  • entrevistar_dor (interação direta)                                       │
│  • estruturar_produto (validar entendimento)                                │
│  • ciclo_epistemologico (validar M0-M4)                                     │
│  • desenvolvimento (validar spec)                                           │
│  • aprovar_release (decisão de negócio)                                     │
│  • implantar (decisão de rollout)                                           │
│  • avaliar_efetividade (interpretar métricas)                               │
│                                                                             │
│  CONFIGURÁVEL:                                                              │
│  • minor (depende do contexto)                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Fluxo de Aprovação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE APROVAÇÃO                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. Item chega na fila (status: Pendente)                                   │
│                                                                             │
│  2. Sistema notifica humano:                                                │
│     "Novo item aguardando: [titulo]"                                        │
│     "Tipo: [tipo], Prioridade: [prioridade]"                                │
│     "[Aprovar] [Rejeitar] [Ver detalhes]"                                   │
│                                                                             │
│  3. SE humano aprova:                                                       │
│     → Sistema consome e processa                                            │
│                                                                             │
│  4. SE humano rejeita:                                                      │
│     → MS_Backlog.cancelar(item_id, motivo)                                  │
│     → Saga pode compensar ou parar                                          │
│                                                                             │
│  5. SE timeout (configurável):                                              │
│     → Depende da política:                                                  │
│       - AUTO_APROVAR: processa                                              │
│       - AUTO_REJEITAR: cancela                                              │
│       - ESCALAR: notifica outro humano                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Compensação (Saga Pattern)

### 7.1 Estratégias de Compensação

```yaml
compensacao:
  # Se desenvolvimento falha
  desenvolvimento_erro:
    acao: "Criar item iterar_feature"
    destino: Epistemologia
    contexto: "Refinar spec baseado no erro"
  
  # Se release rejeitada
  aprovar_release_rejeitada:
    acao: "Criar item conforme motivo"
    motivo_bug: "corrigir_bug"
    motivo_spec: "iterar_feature"
    motivo_negocio: "criar_feature"
  
  # Se avaliação indica falha
  avaliar_efetividade_falha:
    conclusao_bug: "corrigir_bug"
    conclusao_iterar: "iterar_feature"
    conclusao_threshold: "ajustar threshold (manual)"
```

### 7.2 Método compensar_saga()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       compensar_saga()                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: saga_id                                                             │
│  Output: void                                                               │
│                                                                             │
│  Uso: Quando saga precisa ser revertida/compensada                          │
│                                                                             │
│  Passos:                                                                    │
│  1. Obter todos items da saga ordenados por created_at DESC                 │
│  2. PARA CADA item com status = Concluido:                                  │
│     - SE tem compensacao definida:                                          │
│       - Executar compensação                                                │
│     - Marcar item como Compensado                                           │
│  3. Atualizar saga.status = Compensada                                      │
│                                                                             │
│  Nota: Na prática, GENESIS prefere avançar (iterar) a reverter              │
│        Compensação é usado para casos graves                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Integração com Sprint Existente

### 8.1 Relação MS_Backlog ↔ Sprint

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_BACKLOG vs SPRINT                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_BACKLOG                          SPRINT (atual)                         │
│  ──────────                          ──────────────                         │
│  Fila de items entre MS              Container de trabalho humano           │
│  Automático (sistemas consomem)      Manual (humano gerencia)               │
│  Granularidade fina                  Granularidade grossa                   │
│  Rastreabilidade técnica             Planejamento de capacidade             │
│                                                                             │
│  COEXISTÊNCIA:                                                              │
│  ─────────────                                                              │
│  • Sprint continua para trabalho humano (documentação, decisões)            │
│  • MS_Backlog para orquestração entre sistemas                              │
│  • Sprint pode "empacotar" múltiplos items de uma saga                      │
│                                                                             │
│  Exemplo:                                                                   │
│  Sprint S017:                                                               │
│    - Objetivo: "Implementar MS_CRM"                                         │
│    - Saga: saga_012                                                         │
│    - Items MS_Backlog processados: bkl_050 a bkl_065                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_B/MS_Backlog.md | Documento pai - propósito |
| genesis/GENESIS.md | Produtor/Consumidor |
| docs/04_P/MS_Produto.md | Produtor/Consumidor |
| docs/00_E/00_E_Epistemologia.md | Consumidor |
| genesis/PROMETHEUS.md | Consumidor |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | Criação inicial. Contratos produtor/consumidor. Roteamento por tipo. Persistência MongoDB. Observabilidade. Human-in-the-loop. Compensação (Saga Pattern). |

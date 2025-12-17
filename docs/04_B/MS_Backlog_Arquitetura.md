# MS_Backlog Arquitetura v1.1

---

```yaml
nome: MS_Backlog_Arquitetura
versao: "1.1"
tipo: Documento
status: Publicado
camada: 4
data_publicacao: "2025-12-17"
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
    produtor?: string               # Sistema que produziu (v1.1)
    depende_de?: [string]           # IDs de items que bloqueiam este (v1.1)
    status?: string                 # "Pendente" | "Bloqueado" (v1.1)
    # Refs opcionais
    prontuario_ref?: string
    produto_ref?: string
    feature_ref?: string
    spec_ref?: string
    release_ref?: string
    avaliacao_ref?: string
  
  output:
    item_id: string
    status: "Pendente" | "Bloqueado"
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
  
  # IMPORTANTE: Só retorna items com status = "Pendente"
  # Items "Bloqueado" não são consumíveis

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
  #   CHAMA verificar_desbloqueio(item_id) (v1.1)

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

### 1.3 Contratos por Sistema (v1.1 Atualizado)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONTRATOS: MS ↔ MS_BACKLOG v1.1                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS                                                                    │
│  ───────                                                                    │
│  Consome: [entrevistar_dor, avaliar_efetividade]                            │
│  Produz:  [estruturar_produto] após entrevista                              │
│           [iterar_feature | corrigir_bug] após avaliação                    │
│                                                                             │
│  NOTA v1.1: entrevistar_dor pode ter produtor: "PROMETHEUS"                 │
│             Nesse caso, GENESIS gera prontuário direto do contexto          │
│                                                                             │
│  MS_PRODUTO                                                                 │
│  ──────────                                                                 │
│  Consome: [estruturar_produto, criar_feature, aprovar_orcamento,            │
│            aprovar_release, validar_implantacao]                            │
│  Produz:  [ciclo_epistemologico] para especificar feature                   │
│           [desenvolvimento] após aprovar orçamento                          │
│           [implantar] após aprovar release                                  │
│           [ajustar_spec] se orçamento rejeitado                             │
│           [avaliar_efetividade] após validar implantação                    │
│                                                                             │
│  EPISTEMOLOGIA                                                              │
│  ─────────────                                                              │
│  Consome: [ciclo_epistemologico, iterar_feature, ajustar_spec]              │
│  Produz:  [ciclo_epistemologico] para ciclos recursivos (não-folha)         │
│           [orcar_spec] quando spec pronta (v1.1)                            │
│                                                                             │
│  PROMETHEUS (v1.1 Atualizado)                                               │
│  ────────────────────────────                                               │
│  Consome: [orcar_spec, desenvolvimento, implantar, corrigir_bug]            │
│  Produz:  [aprovar_orcamento] com orçamento calculado                       │
│           [entrevistar_dor] com produtor: "PROMETHEUS" (GAPs)               │
│           [aprovar_release] quando release pronta                           │
│           [validar_implantacao] após deploy                                 │
│           [worker_*] internamente por vertente                              │
│                                                                             │
│  PO (Humano)                                                                │
│  ───────────                                                                │
│  Consome: [aprovar_release] (legado, agora via MS_Produto)                  │
│  Nota: Aprovações agora passam por MS_Produto que inclui PO                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tipos de BacklogItem (v1.1 Completo)

### 2.1 Tabela de Tipos

| Tipo | Produtor | Consumidor | Descrição |
|------|----------|------------|-----------|
| **entrevistar_dor** | Usuário, PROMETHEUS | GENESIS | Capturar dor (humano ou sistema) |
| **estruturar_produto** | GENESIS | MS_Produto | Criar produto/feature |
| **criar_feature** | Usuário, MS_Produto | MS_Produto | Adicionar feature a produto |
| **ciclo_epistemologico** | MS_Produto, Epistemologia | Epistemologia | Especificar via M0-M4 |
| **iterar_feature** | GENESIS | Epistemologia | Refinar spec após avaliação |
| **ajustar_spec** | MS_Produto | Epistemologia | Reduzir scope (orçamento alto) |
| **orcar_spec** | Epistemologia | PROMETHEUS | Spec pronta para precificação |
| **aprovar_orcamento** | PROMETHEUS | MS_Produto | Orçamento para aprovação |
| **desenvolvimento** | MS_Produto | PROMETHEUS | Orçamento aprovado, desenvolver |
| **aprovar_release** | PROMETHEUS | MS_Produto | Release para aprovação |
| **implantar** | MS_Produto | PROMETHEUS | Deploy em produção |
| **validar_implantacao** | PROMETHEUS | MS_Produto | Deploy concluído, validar |
| **avaliar_efetividade** | MS_Produto | GENESIS | Medir sucesso |
| **corrigir_bug** | GENESIS, MS_Produto | PROMETHEUS | Fix técnico |
| **worker_*** | PROMETHEUS | PROMETHEUS.Worker_* | Interno por vertente |
| **minor** | Qualquer | Configurável | Tarefas menores |

### 2.2 Fluxo Típico (v1.1)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO TÍPICO v1.1 (com Orçamento)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  entrevistar_dor ──► estruturar_produto ──► ciclo_epistemologico            │
│       (GENESIS)          (MS_Produto)           (Epistemologia)             │
│                                                      │                      │
│                                                      ▼                      │
│                                                 orcar_spec                  │
│                                                  (PROMETHEUS)               │
│                                                      │                      │
│                          ┌───────────────────────────┼───────────┐          │
│                          │                           │           │          │
│                          ▼                           ▼           ▼          │
│                   aprovar_orcamento          entrevistar_dor (GAPs)         │
│                     (depende_de: [gaps])     produtor: PROMETHEUS           │
│                     status: Bloqueado              │                        │
│                          │                         │                        │
│                          │◄────────────────────────┘                        │
│                          │ (após GAPs resolvidos, desbloqueia)              │
│                          ▼                                                  │
│                   aprovar_orcamento                                         │
│                     status: Pendente                                        │
│                     (MS_Produto consome)                                    │
│                          │                                                  │
│            ┌─────────────┴─────────────┐                                    │
│            ▼                           ▼                                    │
│      desenvolvimento              ajustar_spec                              │
│       (PROMETHEUS)               (Epistemologia)                            │
│            │                                                                │
│            ▼                                                                │
│      aprovar_release                                                        │
│       (MS_Produto)                                                          │
│            │                                                                │
│            ▼                                                                │
│        implantar                                                            │
│       (PROMETHEUS)                                                          │
│            │                                                                │
│            ▼                                                                │
│   validar_implantacao                                                       │
│       (MS_Produto)                                                          │
│            │                                                                │
│            ▼                                                                │
│   avaliar_efetividade                                                       │
│        (GENESIS)                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Desbloqueio por Dependência (v1.1 Novo)

### 3.1 Estados com Dependência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ESTADOS COM DEPENDÊNCIA                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  produzir(depende_de: [gap_001, gap_002])                                   │
│       │                                                                     │
│       ▼                                                                     │
│  ┌──────────┐                                                               │
│  │BLOQUEADO │◄─────────────────────────────────────────┐                    │
│  └────┬─────┘                                          │                    │
│       │                                                │                    │
│       │ verificar_desbloqueio()                        │                    │
│       │ (todas deps concluídas?)                       │                    │
│       │                                                │                    │
│       ├── NÃO ─────────────────────────────────────────┘                    │
│       │                                                                     │
│       └── SIM                                                               │
│           │                                                                 │
│           ▼                                                                 │
│     ┌──────────┐                                                            │
│     │ PENDENTE │                                                            │
│     └────┬─────┘                                                            │
│          │                                                                  │
│          │ consumir()                                                       │
│          ▼                                                                  │
│   ┌───────────────┐                                                         │
│   │EmProcessamento│                                                         │
│   └───────┬───────┘                                                         │
│           │                                                                 │
│           │ concluir()                                                      │
│           ▼                                                                 │
│     ┌──────────┐                                                            │
│     │CONCLUIDO │───► verificar_desbloqueio() para dependentes               │
│     └──────────┘                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Algoritmo de Desbloqueio

```python
def verificar_desbloqueio(item_concluido_id: str):
    """
    Quando um item é concluído, verifica se desbloqueia outros.
    Chamado automaticamente pelo MS_Backlog.concluir()
    """
    
    # Buscar items que dependem deste
    dependentes = db.backlog_items.find({
        "depende_de": item_concluido_id,
        "status": "Bloqueado"
    })
    
    for dep in dependentes:
        # Verificar se TODAS as dependências estão resolvidas
        todas_resolvidas = True
        
        for dep_id in dep["depende_de"]:
            dep_item = db.backlog_items.find_one({"id": dep_id})
            if dep_item["status"] != "Concluido":
                todas_resolvidas = False
                break
        
        if todas_resolvidas:
            # Desbloquear
            db.backlog_items.update_one(
                {"id": dep["id"]},
                {
                    "$set": {
                        "status": "Pendente",
                        "desbloqueado_em": datetime.now(),
                        "desbloqueado_por": item_concluido_id
                    }
                }
            )
            
            # Log para auditoria
            db.eventos.insert_one({
                "tipo": "desbloqueio",
                "item_desbloqueado": dep["id"],
                "item_que_desbloqueou": item_concluido_id,
                "timestamp": datetime.now()
            })
```

### 3.3 Exemplo: PROMETHEUS com GAPs

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EXEMPLO: SPEC COM 2 GAPS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROMETHEUS precifica spec_001:                                             │
│  - Precisa: Whisper API (não tem)                                           │
│  - Precisa: GPU runtime (não tem)                                           │
│                                                                             │
│  PRODUZ:                                                                    │
│  gap_001: {tipo: entrevistar_dor, produtor: "PROMETHEUS",                   │
│            contexto: {sintoma: "Falta Whisper API"}}                        │
│  gap_002: {tipo: entrevistar_dor, produtor: "PROMETHEUS",                   │
│            contexto: {sintoma: "Falta GPU runtime"}}                        │
│  orc_001: {tipo: aprovar_orcamento, depende_de: [gap_001, gap_002],         │
│            status: "Bloqueado"}                                             │
│                                                                             │
│  ESTADO INICIAL:                                                            │
│  gap_001: Pendente                                                          │
│  gap_002: Pendente                                                          │
│  orc_001: Bloqueado                                                         │
│                                                                             │
│  APÓS gap_001 resolvido (saga completa):                                    │
│  gap_001: Concluido ───► verificar_desbloqueio(orc_001)                     │
│  gap_002: EmProcessamento                                                   │
│  orc_001: Bloqueado      └── gap_002 não concluído, mantém                  │
│                                                                             │
│  APÓS gap_002 resolvido:                                                    │
│  gap_001: Concluido                                                         │
│  gap_002: Concluido ───► verificar_desbloqueio(orc_001)                     │
│  orc_001: Pendente       └── todas deps OK, DESBLOQUEIA!                    │
│                                                                             │
│  MS_PRODUTO pode consumir orc_001                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Roteamento

### 4.1 Tabela de Roteamento (v1.1 Atualizada)

```yaml
roteamento:
  # Entrada
  entrevistar_dor:
    consumidor: GENESIS
    prioridade_default: 🔴
    timeout_minutos: null
    nota: "Se produtor == PROMETHEUS, GENESIS gera prontuário direto"
  
  # Produto
  estruturar_produto:
    consumidor: MS_Produto
    prioridade_default: 🔴
    timeout_minutos: null
  
  criar_feature:
    consumidor: MS_Produto
    prioridade_default: 🟡
    timeout_minutos: null
  
  aprovar_orcamento:  # v1.1 NOVO
    consumidor: MS_Produto
    prioridade_default: 🔴
    timeout_minutos: null
    nota: "Pode estar Bloqueado até GAPs resolvidos"
  
  aprovar_release:
    consumidor: MS_Produto
    prioridade_default: 🔴
    timeout_minutos: null
  
  validar_implantacao:  # v1.1 NOVO
    consumidor: MS_Produto
    prioridade_default: 🟡
    timeout_minutos: null
  
  implantar:
    consumidor: PROMETHEUS
    prioridade_default: 🟡
    timeout_minutos: 30
  
  # Epistemologia
  ciclo_epistemologico:
    consumidor: Epistemologia
    prioridade_default: 🔴
    timeout_minutos: null
  
  iterar_feature:
    consumidor: Epistemologia
    prioridade_default: 🔴
    timeout_minutos: null
  
  ajustar_spec:  # v1.1 NOVO
    consumidor: Epistemologia
    prioridade_default: 🟡
    timeout_minutos: null
    nota: "Quando orçamento rejeitado, reduzir scope"
  
  # PROMETHEUS (v1.1 Atualizado)
  orcar_spec:  # v1.1 NOVO
    consumidor: PROMETHEUS
    prioridade_default: 🔴
    timeout_minutos: 30
    nota: "PROMETHEUS precifica e identifica GAPs"
  
  desenvolvimento:
    consumidor: PROMETHEUS
    prioridade_default: 🔴
    timeout_minutos: 60
  
  corrigir_bug:
    consumidor: PROMETHEUS
    prioridade_default: 🔴
    timeout_minutos: 60
  
  # Workers internos PROMETHEUS
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
  
  # Validação
  avaliar_efetividade:
    consumidor: GENESIS
    prioridade_default: 🟡
    timeout_minutos: null
  
  # Genérico
  minor:
    consumidor: null
    prioridade_default: 🟢
    timeout_minutos: null
```

### 4.2 Algoritmo de Consumo (v1.1 Atualizado)

```python
def consumir(tipos: List[str]) -> Optional[BacklogItem]:
    """
    Retorna próximo item disponível para os tipos especificados.
    Prioriza por: prioridade DESC, created_at ASC
    
    v1.1: Só retorna items com status = "Pendente"
          Items "Bloqueado" não são consumíveis
    """
    
    # Query MongoDB
    item = db.backlog_items.find_one_and_update(
        filter={
            "tipo": {"$in": tipos},
            "status": "Pendente"  # v1.1: Bloqueado não é consumível
        },
        update={
            "$set": {
                "status": "EmProcessamento",
                "started_at": datetime.now(),
                "consumidor": get_current_system()
            }
        },
        sort=[
            ("prioridade", -1),
            ("created_at", 1)
        ],
        return_document=True
    )
    
    return item


def concluir(item_id: str, resultado: dict, items_gerados: List[dict] = None):
    """
    Conclui item e dispara desbloqueio de dependentes.
    
    v1.1: Chama verificar_desbloqueio após conclusão
    """
    
    # Atualizar item
    db.backlog_items.update_one(
        {"id": item_id},
        {
            "$set": {
                "status": "Concluido",
                "completed_at": datetime.now(),
                "resultado": resultado
            }
        }
    )
    
    # Criar items gerados
    novos_ids = []
    for item_data in (items_gerados or []):
        item_data["pai_ref"] = item_id
        item_data["saga_id"] = get_saga_id(item_id)
        
        # v1.1: Se tem depende_de e não vazio, status = Bloqueado
        if item_data.get("depende_de"):
            item_data["status"] = "Bloqueado"
        else:
            item_data["status"] = "Pendente"
        
        novo_id = produzir(item_data)
        novos_ids.append(novo_id)
    
    # Atualizar items_gerados no item pai
    db.backlog_items.update_one(
        {"id": item_id},
        {"$set": {"items_gerados": novos_ids}}
    )
    
    # v1.1: Verificar desbloqueio de dependentes
    verificar_desbloqueio(item_id)
```

---

## 5. Persistência

### 5.1 MongoDB Collections (v1.1 Atualizada)

```yaml
# Collection: backlog_items
backlog_items:
  _id: ObjectId
  id: string
  tipo: string
  titulo: string
  contexto: object
  status: string           # Pendente | Bloqueado | EmProcessamento | Concluido | Erro | Cancelado
  prioridade: string
  
  # Rastreabilidade
  produtor: string         # v1.1: Sistema que produziu (GENESIS, PROMETHEUS, etc.)
  consumidor: string?
  saga_id: string
  pai_ref: string?
  filhos: [string]
  
  # Dependências (v1.1 Novo)
  depende_de: [string]     # IDs de items que bloqueiam este
  desbloqueado_em: datetime?
  desbloqueado_por: string?
  
  # Refs
  prontuario_ref: string?
  produto_ref: string?
  feature_ref: string?
  spec_ref: string?
  release_ref: string?
  avaliacao_ref: string?
  spec_recursos_ref: string?  # v1.1 Novo
  
  # Temporal
  created_at: datetime
  updated_at: datetime
  started_at: datetime?
  completed_at: datetime?
  
  # Resultado
  resultado: object?
  erro: string?
  items_gerados: [string]

# Índices (v1.1 Atualizado)
indexes:
  - {tipo: 1, status: 1, prioridade: -1, created_at: 1}  # Para consumir()
  - {saga_id: 1}                                          # Para listar_saga()
  - {pai_ref: 1}                                          # Para obter_filhos()
  - {status: 1, created_at: 1}                            # Para histórico
  - {depende_de: 1, status: 1}                            # v1.1: Para verificar_desbloqueio()
  - {produtor: 1}                                         # v1.1: Para filtrar por produtor

# Collection: eventos (v1.1 Novo)
eventos:
  _id: ObjectId
  tipo: string             # desbloqueio, erro, compensacao
  item_ref: string
  dados: object
  timestamp: datetime
```

---

## 6. Observabilidade

### 6.1 Métricas (v1.1 Atualizada)

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
  
  # v1.1: Métricas de Bloqueio
  items_bloqueados:
    query: "COUNT WHERE status=Bloqueado"
    uso: "Quantos items aguardam dependências"
  
  tempo_medio_bloqueio:
    query: "AVG(desbloqueado_em - created_at) WHERE desbloqueado_em != null"
    uso: "Quanto tempo items ficam bloqueados"
  
  gaps_por_spec:
    query: "AVG(COUNT WHERE tipo=entrevistar_dor AND produtor=PROMETHEUS GROUP BY spec_origem_ref)"
    uso: "Média de GAPs por spec"
  
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

---

## 7. Human-in-the-Loop

### 7.1 Pontos de Aprovação (v1.1 Atualizado)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HUMAN-IN-THE-LOOP v1.1                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AUTOMÁTICO (sistema consome sem aprovação):                                │
│  • worker_* (internos ao PROMETHEUS)                                        │
│  • orcar_spec (PROMETHEUS precifica automaticamente)                        │
│  • validar_implantacao (após deploy, validação automática)                  │
│                                                                             │
│  REQUER APROVAÇÃO HUMANA:                                                   │
│  • entrevistar_dor (interação direta, exceto produtor=PROMETHEUS)           │
│  • estruturar_produto (validar entendimento)                                │
│  • ciclo_epistemologico (validar M0-M4)                                     │
│  • aprovar_orcamento (decisão de investimento) ◄── v1.1 NOVO                │
│  • desenvolvimento (validar spec antes de executar)                         │
│  • aprovar_release (decisão de qualidade)                                   │
│  • implantar (decisão de rollout)                                           │
│  • avaliar_efetividade (interpretar métricas)                               │
│                                                                             │
│  CONFIGURÁVEL:                                                              │
│  • minor (depende do contexto)                                              │
│  • ajustar_spec (pode ser automático se regras claras)                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Compensação (Saga Pattern)

### 8.1 Estratégias de Compensação (v1.1 Atualizada)

```yaml
compensacao:
  # Se orçamento rejeitado
  aprovar_orcamento_rejeitado:
    acao: "Criar item ajustar_spec"
    destino: Epistemologia
    contexto: "Reduzir scope/cobertura para caber no orçamento"
  
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
  
  # Se GAP não resolvível
  gap_nao_resolvivel:
    acao: "Cancelar aprovar_orcamento dependente"
    alternativa: "Ajustar spec para não precisar do recurso"
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_B/MS_Backlog.md | Documento pai - propósito |
| genesis/GENESIS.md | Produtor/Consumidor |
| genesis/PROMETHEUS.md | Produtor/Consumidor (v1.1: orcar_spec) |
| genesis/PROMETHEUS_Arquitetura.md | Detalhes do ciclo PROMETHEUS |
| docs/04_P/MS_Produto.md | Produtor/Consumidor |
| docs/00_E/00_E_Epistemologia.md | Consumidor |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | Criação inicial. Contratos produtor/consumidor. Roteamento por tipo. Persistência MongoDB. Observabilidade. Human-in-the-loop. Compensação (Saga Pattern). |
| 1.1 | 2025-12-17 | **Tipos novos PROMETHEUS v3.0**: orcar_spec, aprovar_orcamento, ajustar_spec, validar_implantacao. **Desbloqueio por dependência**: status Bloqueado, depende_de[], verificar_desbloqueio(). **Produtor**: campo produtor para identificar origem (PROMETHEUS para GAPs). Sprint S020/E04. |

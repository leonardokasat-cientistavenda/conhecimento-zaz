# PROMETHEUS Arquitetura v1.1

---

```yaml
nome: PROMETHEUS_Arquitetura
versao: "1.1"
tipo: Documento
status: Publicado
camada: C2
data_publicacao: "2025-12-17"
pai: genesis/PROMETHEUS.md
depende_de:
  - genesis/PROMETHEUS.md
  - docs/04_B/MS_Backlog.md
  - docs/04_B/MS_Backlog_Arquitetura.md
```

---

Este documento detalha a arquitetura técnica do PROMETHEUS v3.0. Para visão de propósito, ver PROMETHEUS.md.

---

## 1. Ciclo Completo via MS_Backlog

### 1.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CICLO PROMETHEUS v3.0                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐                                                           │
│  │ EPISTEMOLOGIA│                                                           │
│  │ produz spec  │                                                           │
│  └──────┬───────┘                                                           │
│         │ tipo: orcar_spec                                                  │
│         ▼                                                                   │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                          MS_BACKLOG                                   ║  │
│  ╚═══════════════════════════════════════════════════════════════════════╝  │
│         │                                                                   │
│         ▼                                                                   │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                │
│  │  PRECIFICAR  │────►│  GAPS?       │────►│  DESENVOLVER │                │
│  │              │     │              │     │              │                │
│  │ • Recursos   │     │ SIM: bloqueia│     │ • Workers    │                │
│  │ • Esforço    │     │      + dor   │     │ • TDD        │                │
│  │ • Deps       │     │              │     │ • Build      │                │
│  └──────────────┘     │ NÃO: libera  │     └──────┬───────┘                │
│                       └──────────────┘            │                        │
│                                                   ▼                        │
│                       ┌──────────────┐     ┌──────────────┐                │
│                       │   DEPLOYAR   │◄────│    TESTAR    │                │
│                       │              │     │              │                │
│                       │ • Infra      │     │ • Schema TDD │                │
│                       │ • Config     │     │ • Gates      │                │
│                       │ • Rollout    │     │              │                │
│                       └──────┬───────┘     └──────────────┘                │
│                              │                                              │
│                              ▼                                              │
│                       ┌──────────────┐                                      │
│                       │  MS_PRODUTO  │                                      │
│                       │  valida      │                                      │
│                       └──────────────┘                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Fluxo Detalhado com Backlog

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO DETALHADO                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 1: PRECIFICAÇÃO                                                       │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  EPISTEMOLOGIA.concluir()                                                   │
│       │                                                                     │
│       └──► MS_Backlog.produzir({                                            │
│                tipo: "orcar_spec",                                          │
│                spec_ref: "spec_001"                                         │
│            })                                                               │
│                │                                                            │
│                ▼                                                            │
│  PROMETHEUS.consumir(["orcar_spec"])                                        │
│       │                                                                     │
│       └──► precificar(spec)                                                 │
│            │                                                                │
│            ├── Analisa spec_tdd                                             │
│            ├── Calcula runtime (CPU, RAM, APIs, tokens)                     │
│            ├── Calcula teste (classes_equiv, combinações)                   │
│            ├── Calcula carga (TPS, usuários)                                │
│            ├── Calcula esforço (horas dev/teste/deploy)                     │
│            ├── Identifica workers necessários                               │
│            │                                                                │
│            └──► identificar_gaps(spec)                                      │
│                 │                                                           │
│                 ├── PARA CADA recurso em spec.runtime:                      │
│                 │       SE NOT capacidades_disponiveis.contains(recurso):   │
│                 │           gaps.append(recurso)                            │
│                 │                                                           │
│                 └── RETORNA gaps[]                                          │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 2: PRODUÇÃO DE ORÇAMENTO + GAPS                                       │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  SE gaps.length == 0:                                                       │
│  ─────────────────────                                                      │
│       MS_Backlog.concluir(item_id, resultado, [                             │
│           {                                                                 │
│               tipo: "aprovar_orcamento",                                    │
│               spec_ref: spec.id,                                            │
│               spec_recursos: spec_recursos,                                 │
│               status: "Pendente"           ◄── LIBERADO                     │
│           }                                                                 │
│       ])                                                                    │
│                                                                             │
│  SE gaps.length > 0:                                                        │
│  ───────────────────                                                        │
│       gap_ids = []                                                          │
│                                                                             │
│       PARA CADA gap em gaps:                                                │
│           gap_item = MS_Backlog.produzir({                                  │
│               tipo: "entrevistar_dor",                                      │
│               produtor: "PROMETHEUS",      ◄── GENESIS detecta              │
│               contexto: {                                                   │
│                   sintoma: gap.descricao,                                   │
│                   frequencia: "Sempre que spec usa " + gap.recurso,         │
│                   afetados: [spec.id],                                      │
│                   impacto: "Spec bloqueada",                                │
│                   tentativas: gap.alternativas,                             │
│                   criterio_sucesso: gap.criterio                            │
│               }                                                             │
│           })                                                                │
│           gap_ids.append(gap_item.id)                                       │
│                                                                             │
│       MS_Backlog.concluir(item_id, resultado, [                             │
│           {                                                                 │
│               tipo: "aprovar_orcamento",                                    │
│               spec_ref: spec.id,                                            │
│               spec_recursos: spec_recursos,                                 │
│               depende_de: gap_ids,         ◄── DEPENDÊNCIAS                 │
│               status: "Bloqueado"          ◄── BLOQUEADO                    │
│           }                                                                 │
│       ])                                                                    │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 3: RESOLUÇÃO DE GAPS (ciclo recursivo)                                │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  gap (entrevistar_dor, produtor: PROMETHEUS)                                │
│       │                                                                     │
│       ▼                                                                     │
│  GENESIS.consumir(["entrevistar_dor"])                                      │
│       │                                                                     │
│       └──► IF produtor != "humano":                                         │
│                prontuario = Prontuario.from_contexto(item.contexto)         │
│            ELSE:                                                            │
│                prontuario = entrevistar_humano()                            │
│       │                                                                     │
│       └──► MS_Backlog.produzir({tipo: "estruturar_produto", ...})           │
│                │                                                            │
│                ▼                                                            │
│            MS_PRODUTO → EPISTEMOLOGIA → PROMETHEUS                          │
│                │                                                            │
│                ▼                                                            │
│            GAP resolvido (infra instalada/configurada)                      │
│                │                                                            │
│                ▼                                                            │
│            MS_Backlog.verificar_desbloqueio()                               │
│                │                                                            │
│                └── SE todas depende_de resolvidas:                          │
│                        aprovar_orcamento.status = "Pendente"                │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 4: APROVAÇÃO E DESENVOLVIMENTO                                        │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  MS_PRODUTO.consumir(["aprovar_orcamento"])                                 │
│       │                                                                     │
│       └──► PO avalia:                                                       │
│            • Esforço aceitável?                                             │
│            • Recursos disponíveis?                                          │
│            • Prioridade justifica?                                          │
│       │                                                                     │
│       ├── APROVA:                                                           │
│       │       MS_Backlog.produzir({                                         │
│       │           tipo: "desenvolvimento",                                  │
│       │           spec_ref: spec.id,                                        │
│       │           spec_recursos: spec_recursos                              │
│       │       })                                                            │
│       │                                                                     │
│       └── AJUSTA:                                                           │
│               MS_Backlog.produzir({                                         │
│                   tipo: "ajustar_spec",                                     │
│                   spec_ref: spec.id,                                        │
│                   motivo: "Reduzir scope/cobertura"                         │
│               })                                                            │
│               → volta para EPISTEMOLOGIA                                    │
│                                                                             │
│  PROMETHEUS.consumir(["desenvolvimento"])                                   │
│       │                                                                     │
│       └──► desenvolver(spec, spec_recursos)                                 │
│            │                                                                │
│            ├── Distribui para workers                                       │
│            ├── Executa TDD                                                  │
│            ├── Build artefatos                                              │
│            │                                                                │
│            └──► testar(artefatos, schema_tdd)                               │
│                 │                                                           │
│                 └── Valida conforme critérios                               │
│       │                                                                     │
│       └──► MS_Backlog.produzir({                                            │
│                tipo: "aprovar_release",                                     │
│                release_ref: release.id                                      │
│            })                                                               │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 5: APROVAÇÃO E DEPLOY                                                 │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  MS_PRODUTO.consumir(["aprovar_release"])                                   │
│       │                                                                     │
│       ├── APROVA:                                                           │
│       │       MS_Backlog.produzir({tipo: "implantar", release_ref})         │
│       │                                                                     │
│       └── REJEITA:                                                          │
│               MS_Backlog.produzir({tipo: "corrigir_bug", ...})              │
│                                                                             │
│  PROMETHEUS.consumir(["implantar"])                                         │
│       │                                                                     │
│       └──► deployar(release)                                                │
│            │                                                                │
│            ├── Provisiona infra                                             │
│            ├── Configura ambiente                                           │
│            ├── Executa rollout                                              │
│            │                                                                │
│            └──► MS_Backlog.produzir({                                       │
│                     tipo: "validar_implantacao",                            │
│                     release_ref: release.id                                 │
│                 })                                                          │
│                                                                             │
│  MS_PRODUTO.consumir(["validar_implantacao"])                               │
│       │                                                                     │
│       └──► Valida e produz: {tipo: "avaliar_efetividade", ...}              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Contratos com MS_Backlog

### 2.1 Tipos Consumidos

```yaml
# PROMETHEUS consome estes tipos:
tipos_consumidos:
  
  orcar_spec:
    produtor: Epistemologia
    descricao: "Spec pronta, precificar antes de desenvolver"
    contexto_esperado:
      spec_ref: string         # ID da spec
    resultado:
      spec_recursos: object    # Orçamento calculado
    items_gerados:
      - tipo: aprovar_orcamento
      - tipo: entrevistar_dor  # Para cada GAP (produtor: PROMETHEUS)
  
  desenvolvimento:
    produtor: MS_Produto
    descricao: "Orçamento aprovado, pode desenvolver"
    contexto_esperado:
      spec_ref: string
      spec_recursos: object
    resultado:
      release_ref: string
      artefatos: [string]
    items_gerados:
      - tipo: aprovar_release
  
  implantar:
    produtor: MS_Produto
    descricao: "Release aprovada, fazer deploy"
    contexto_esperado:
      release_ref: string
    resultado:
      implantacao_ref: string
      ambiente: string
    items_gerados:
      - tipo: validar_implantacao
  
  corrigir_bug:
    produtor: GENESIS | MS_Produto
    descricao: "Bug identificado, corrigir"
    contexto_esperado:
      feature_ref: string
      erro: string
      stack_trace?: string
    resultado:
      release_ref: string
    items_gerados:
      - tipo: aprovar_release
```

### 2.2 Tipos Produzidos

```yaml
# PROMETHEUS produz estes tipos:
tipos_produzidos:
  
  aprovar_orcamento:
    consumidor: MS_Produto
    descricao: "Orçamento para aprovação do PO"
    payload:
      spec_ref: string
      spec_recursos: object
      depende_de?: [string]    # IDs dos gaps
      status: "Pendente" | "Bloqueado"
  
  entrevistar_dor:
    consumidor: GENESIS
    descricao: "GAP de infra como dor de PROMETHEUS"
    payload:
      produtor: "PROMETHEUS"   # GENESIS detecta e pula entrevista
      contexto:
        sintoma: string
        frequencia: string
        afetados: [string]
        impacto: string
        tentativas: [string]
        criterio_sucesso: string
      spec_origem_ref: string
      bloqueando: [string]     # IDs dos items bloqueados
  
  aprovar_release:
    consumidor: MS_Produto
    descricao: "Release para aprovação do PO"
    payload:
      release_ref: string
      spec_ref: string
      artefatos: [string]
      testes_passaram: boolean
      cobertura: number
  
  validar_implantacao:
    consumidor: MS_Produto
    descricao: "Deploy concluído, MS_Produto valida"
    payload:
      release_ref: string
      implantacao_ref: string
      ambiente: string
      url?: string
```

---

## 3. Regra de Desbloqueio

### 3.1 Algoritmo

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

### 3.2 Diagrama de Estados

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

---

## 4. Workers por Vertente

### 4.1 Arquitetura de Workers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WORKERS POR VERTENTE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROMETHEUS.desenvolver()                                                   │
│       │                                                                     │
│       └──► Analisa spec_tdd                                                 │
│            │                                                                │
│            ├── vertente: "E" (Estrutural)                                   │
│            │       └──► WORKER_E                                            │
│            │                                                                │
│            ├── vertente: "P" (Processual)                                   │
│            │       └──► WORKER_P                                            │
│            │                                                                │
│            ├── vertente: "D" (Decisional)                                   │
│            │       └──► WORKER_D                                            │
│            │                                                                │
│            ├── vertente: "I" (Interface)                                    │
│            │       └──► WORKER_I                                            │
│            │                                                                │
│            └── vertente: "C" (Integração)                                   │
│                    └──► WORKER_C                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Especificação dos Workers

| Worker | Vertente | Input | Output | Templates |
|--------|----------|-------|--------|-----------|
| **WORKER_E** | Estrutural (POO) | spec_poo | Código Python + testes | _catalogo/templates/M3_E_POO.md |
| **WORKER_P** | Processual (BPMN) | spec_bpmn | Workflow Camunda + testes | _catalogo/templates/M3_P_BPMN.md |
| **WORKER_D** | Decisional (DMN) | spec_dmn | Tabelas DMN + testes | _catalogo/templates/M3_D_DMN.md |
| **WORKER_I** | Interface | spec_interface | UI components + testes | (a definir) |
| **WORKER_C** | Integração | spec_integracao | Conectores + mocks | (a definir) |

---

## 5. Método precificar()

### 5.1 Algoritmo

```python
def precificar(self, spec: Spec) -> SpecRecursos:
    """
    Analisa spec e calcula orçamento
    """
    spec_recursos = SpecRecursos(spec_ref=spec.id)
    
    # 1. RUNTIME
    spec_recursos.runtime = {
        "cpu": self.estimar_cpu(spec),
        "ram": self.estimar_ram(spec),
        "gpu": self.precisa_gpu(spec),
        "apis_externas": self.identificar_apis(spec),
        "tokens_llm_estimado": self.estimar_tokens(spec),
        "containers": self.estimar_containers(spec)
    }
    
    # 2. TESTE
    classes_equiv = spec.schema_tdd.contar_classes_equivalencia()
    spec_recursos.teste = {
        "classes_equivalencia": classes_equiv,
        "combinacoes_estimadas": self.calcular_pairwise(classes_equiv),
        "cobertura": spec.schema_tdd.cobertura or "pairwise",
        "tempo_execucao_estimado": self.estimar_tempo_teste(classes_equiv)
    }
    
    # 3. CARGA
    spec_recursos.carga = {
        "tps_esperado": spec.requisitos_nao_funcionais.get("tps", 10),
        "usuarios_simultaneos": spec.requisitos_nao_funcionais.get("usuarios", 50),
        "pico_estimado": spec.requisitos_nao_funcionais.get("pico", "não definido")
    }
    
    # 4. ESFORÇO
    workers = self.identificar_workers(spec)
    spec_recursos.esforco = {
        "horas_dev": self.estimar_horas_dev(spec, workers),
        "horas_teste": self.estimar_horas_teste(spec_recursos.teste),
        "horas_deploy": self.estimar_horas_deploy(spec),
        "total": None,
        "workers": workers
    }
    spec_recursos.esforco["total"] = (
        spec_recursos.esforco["horas_dev"] +
        spec_recursos.esforco["horas_teste"] +
        spec_recursos.esforco["horas_deploy"]
    )
    
    # 5. CUSTO ESTIMADO (v1.1)
    spec_recursos.custo = self.calcular_custo_estimado(spec_recursos)
    
    # 6. DEPENDÊNCIAS
    gaps = self.identificar_gaps(spec)
    spec_recursos.dependencias = {
        "specs_pre_requisito": spec.depende_de or [],
        "gaps_infra": [g.id for g in gaps],
        "status": "bloqueado" if gaps else "liberado"
    }
    
    return spec_recursos, gaps
```

---

## 6. Persistência

### 6.1 Regra de Ouro

```
SE é DEFINIÇÃO (template, spec, framework) → GitHub
SE é INSTÂNCIA (dado real, transação, estado) → MongoDB
```

### 6.2 Collections PROMETHEUS

| Collection | Conteúdo | Tipo |
|------------|----------|------|
| `specs_recursos` | Orçamentos calculados (estimado) | MongoDB |
| `execucoes` | Execuções com estimado vs realizado (v1.1) | MongoDB |
| `releases` | Releases geradas | MongoDB |
| `implantacoes` | Histórico de deploys | MongoDB |
| `capacidades` | Capacidades disponíveis | MongoDB |

### 6.3 Schema: execucoes (v1.1 NOVO)

```yaml
# Collection: execucoes
# Persiste estimado vs realizado para cada execução
# Registrada automaticamente ao final de cada fase

execucoes:
  _id: ObjectId
  id: string                   # exec_001
  
  # Referências
  spec_ref: string
  release_ref: string
  backlog_item_ref: string     # Item de desenvolvimento que originou
  saga_id: string
  
  # ════════════════════════════════════════════════════════════════════════
  # ESTIMADO (copiado do spec_recursos no início)
  # ════════════════════════════════════════════════════════════════════════
  estimado:
    horas:
      dev: number              # Horas estimadas desenvolvimento
      teste: number            # Horas estimadas teste
      deploy: number           # Horas estimadas deploy
      total: number            # Soma
    recursos:
      tokens_llm: number       # Tokens LLM estimados
      cpu_horas: number        # CPU-horas estimadas
      ram_gb_horas: number     # RAM GB-horas estimadas
      chamadas_api: object     # {api_name: count_estimado}
      storage_mb: number       # Storage estimado
    custo:
      total: number            # Custo total estimado em R$
      breakdown:               # Detalhamento
        llm: number
        infra: number
        apis: number
    cobertura_testes: number   # % cobertura planejada
  
  # ════════════════════════════════════════════════════════════════════════
  # REALIZADO (preenchido durante/após execução)
  # ════════════════════════════════════════════════════════════════════════
  realizado:
    horas:
      dev: number              # Calculado: dev_fim - dev_inicio
      teste: number            # Calculado: teste_fim - teste_inicio
      deploy: number           # Calculado: deploy_fim - deploy_inicio
      total: number            # Soma
    recursos:
      tokens_llm: number       # Soma de tokens consumidos
      cpu_horas: number        # CPU real consumida
      ram_gb_horas: number     # RAM real consumida
      chamadas_api: object     # {api_name: count_real}
      storage_mb: number       # Storage real usado
    custo:
      total: number            # Custo real em R$
      breakdown:
        llm: number
        infra: number
        apis: number
    cobertura_testes: number   # % cobertura atingida
    tentativas_correcao: number # Loops de correção
    passou_primeira: boolean   # Passou testes na primeira?
  
  # ════════════════════════════════════════════════════════════════════════
  # PRECISÃO (calculado: realizado / estimado)
  # ════════════════════════════════════════════════════════════════════════
  precisao:
    horas:
      dev: number              # realizado.horas.dev / estimado.horas.dev
      teste: number
      deploy: number
      total: number
    recursos:
      tokens_llm: number
      custo: number            # realizado.custo.total / estimado.custo.total
    geral: number              # Média ponderada
  
  # ════════════════════════════════════════════════════════════════════════
  # TIMESTAMPS (para calcular duração)
  # ════════════════════════════════════════════════════════════════════════
  timestamps:
    # Spec/Orçamento
    spec_criada_at: datetime
    orcamento_aprovado_at: datetime
    
    # Desenvolvimento
    dev_inicio_at: datetime
    dev_fim_at: datetime
    
    # Teste
    teste_inicio_at: datetime
    teste_fim_at: datetime
    
    # Deploy
    deploy_inicio_at: datetime
    deploy_fim_at: datetime
    
    # Geral
    created_at: datetime
    updated_at: datetime
  
  # ════════════════════════════════════════════════════════════════════════
  # QUALIDADE
  # ════════════════════════════════════════════════════════════════════════
  qualidade:
    bugs_encontrados: number   # Durante teste
    bugs_producao: number      # Após deploy (atualizado posteriormente)
    severidade_bugs: object    # {critico: n, alto: n, medio: n, baixo: n}
  
  # ════════════════════════════════════════════════════════════════════════
  # WORKERS (detalhamento por vertente)
  # ════════════════════════════════════════════════════════════════════════
  workers:
    - worker: string           # "WORKER_E"
      vertente: string         # "Estrutural"
      inicio_at: datetime
      fim_at: datetime
      duracao_minutos: number
      tokens_consumidos: number
      tentativas: number
      passou_primeira: boolean
      artefatos: [string]

# Índices
indexes:
  - {spec_ref: 1}
  - {release_ref: 1}
  - {saga_id: 1}
  - {"timestamps.deploy_fim_at": -1}
  - {"precisao.geral": 1}
```

### 6.4 Método: registrar_execucao()

```python
def registrar_execucao(self, fase: str, spec_ref: str, dados: dict):
    """
    Registra dados de execução em cada fase.
    Chamado automaticamente pelo PROMETHEUS durante processamento.
    
    Fases: "inicio", "dev", "teste", "deploy", "fim"
    """
    
    execucao = db.execucoes.find_one({"spec_ref": spec_ref, "status": "em_andamento"})
    
    if fase == "inicio":
        # Criar novo registro com estimado
        spec_recursos = dados["spec_recursos"]
        execucao = {
            "id": gerar_id("exec"),
            "spec_ref": spec_ref,
            "backlog_item_ref": dados["backlog_item_ref"],
            "saga_id": dados["saga_id"],
            "status": "em_andamento",
            
            # Copiar estimado
            "estimado": {
                "horas": spec_recursos["esforco"],
                "recursos": {
                    "tokens_llm": spec_recursos["runtime"]["tokens_llm_estimado"],
                    "cpu_horas": spec_recursos["runtime"].get("cpu_horas", 0),
                    "ram_gb_horas": spec_recursos["runtime"].get("ram_gb_horas", 0),
                    "chamadas_api": spec_recursos["runtime"].get("apis_externas", {}),
                    "storage_mb": spec_recursos["runtime"].get("storage_mb", 0)
                },
                "custo": spec_recursos.get("custo", {}),
                "cobertura_testes": spec_recursos["teste"]["cobertura"]
            },
            
            # Inicializar realizado
            "realizado": {
                "horas": {"dev": 0, "teste": 0, "deploy": 0, "total": 0},
                "recursos": {
                    "tokens_llm": 0,
                    "cpu_horas": 0,
                    "ram_gb_horas": 0,
                    "chamadas_api": {},
                    "storage_mb": 0
                },
                "custo": {"total": 0, "breakdown": {}},
                "cobertura_testes": 0,
                "tentativas_correcao": 0,
                "passou_primeira": None
            },
            
            "timestamps": {
                "spec_criada_at": dados.get("spec_criada_at"),
                "orcamento_aprovado_at": datetime.now(),
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            },
            
            "workers": [],
            "qualidade": {"bugs_encontrados": 0, "bugs_producao": 0}
        }
        db.execucoes.insert_one(execucao)
    
    elif fase == "dev_inicio":
        db.execucoes.update_one(
            {"id": execucao["id"]},
            {"$set": {"timestamps.dev_inicio_at": datetime.now()}}
        )
    
    elif fase == "dev_fim":
        dev_inicio = execucao["timestamps"]["dev_inicio_at"]
        dev_duracao = (datetime.now() - dev_inicio).total_seconds() / 3600
        
        db.execucoes.update_one(
            {"id": execucao["id"]},
            {
                "$set": {
                    "timestamps.dev_fim_at": datetime.now(),
                    "realizado.horas.dev": dev_duracao,
                    "realizado.recursos.tokens_llm": dados.get("tokens_consumidos", 0),
                    "realizado.tentativas_correcao": dados.get("tentativas", 0)
                },
                "$push": {
                    "workers": dados.get("workers_detalhes", [])
                }
            }
        )
    
    elif fase == "teste_inicio":
        db.execucoes.update_one(
            {"id": execucao["id"]},
            {"$set": {"timestamps.teste_inicio_at": datetime.now()}}
        )
    
    elif fase == "teste_fim":
        teste_inicio = execucao["timestamps"]["teste_inicio_at"]
        teste_duracao = (datetime.now() - teste_inicio).total_seconds() / 3600
        
        db.execucoes.update_one(
            {"id": execucao["id"]},
            {
                "$set": {
                    "timestamps.teste_fim_at": datetime.now(),
                    "realizado.horas.teste": teste_duracao,
                    "realizado.cobertura_testes": dados.get("cobertura", 0),
                    "realizado.passou_primeira": dados.get("passou_primeira", False),
                    "qualidade.bugs_encontrados": dados.get("bugs_encontrados", 0)
                }
            }
        )
    
    elif fase == "deploy_inicio":
        db.execucoes.update_one(
            {"id": execucao["id"]},
            {"$set": {"timestamps.deploy_inicio_at": datetime.now()}}
        )
    
    elif fase == "deploy_fim":
        deploy_inicio = execucao["timestamps"]["deploy_inicio_at"]
        deploy_duracao = (datetime.now() - deploy_inicio).total_seconds() / 3600
        
        db.execucoes.update_one(
            {"id": execucao["id"]},
            {
                "$set": {
                    "timestamps.deploy_fim_at": datetime.now(),
                    "realizado.horas.deploy": deploy_duracao,
                    "release_ref": dados.get("release_ref")
                }
            }
        )
    
    elif fase == "fim":
        # Calcular totais e precisão
        execucao = db.execucoes.find_one({"spec_ref": spec_ref, "status": "em_andamento"})
        
        total_horas = (
            execucao["realizado"]["horas"]["dev"] +
            execucao["realizado"]["horas"]["teste"] +
            execucao["realizado"]["horas"]["deploy"]
        )
        
        # Calcular precisão
        precisao = {
            "horas": {
                "dev": safe_div(execucao["realizado"]["horas"]["dev"], 
                               execucao["estimado"]["horas"]["dev"]),
                "teste": safe_div(execucao["realizado"]["horas"]["teste"],
                                 execucao["estimado"]["horas"]["teste"]),
                "deploy": safe_div(execucao["realizado"]["horas"]["deploy"],
                                  execucao["estimado"]["horas"]["deploy"]),
                "total": safe_div(total_horas, execucao["estimado"]["horas"]["total"])
            },
            "recursos": {
                "tokens_llm": safe_div(execucao["realizado"]["recursos"]["tokens_llm"],
                                       execucao["estimado"]["recursos"]["tokens_llm"])
            }
        }
        
        # Precisão geral (média ponderada)
        precisao["geral"] = (
            precisao["horas"]["total"] * 0.5 +
            precisao["recursos"]["tokens_llm"] * 0.3 +
            (1.0 if execucao["realizado"]["passou_primeira"] else 0.7) * 0.2
        )
        
        db.execucoes.update_one(
            {"id": execucao["id"]},
            {
                "$set": {
                    "status": "concluido",
                    "realizado.horas.total": total_horas,
                    "precisao": precisao,
                    "timestamps.updated_at": datetime.now()
                }
            }
        )


def safe_div(a, b):
    """Divisão segura, retorna 1.0 se denominador é 0"""
    return a / b if b and b > 0 else 1.0
```

---

## 7. Loop de Consumo (v1.1 com Registro)

### 7.1 Implementação Atualizada

```python
class PROMETHEUS:
    tipos_consumidos = [
        "orcar_spec",
        "desenvolvimento", 
        "implantar",
        "corrigir_bug"
    ]
    
    def processar_desenvolver(self, item):
        spec = carregar_spec(item.contexto["spec_ref"])
        spec_recursos = item.contexto["spec_recursos"]
        
        # ══════════════════════════════════════════════════════════════
        # v1.1: REGISTRAR INÍCIO
        # ══════════════════════════════════════════════════════════════
        self.registrar_execucao("inicio", spec.id, {
            "spec_recursos": spec_recursos,
            "backlog_item_ref": item.id,
            "saga_id": item.saga_id,
            "spec_criada_at": spec.created_at
        })
        
        # ══════════════════════════════════════════════════════════════
        # DESENVOLVIMENTO
        # ══════════════════════════════════════════════════════════════
        self.registrar_execucao("dev_inicio", spec.id, {})
        
        artefatos = []
        workers_detalhes = []
        tokens_total = 0
        tentativas_total = 0
        
        for worker_tipo in spec_recursos["esforco"]["workers"]:
            worker = self.get_worker(worker_tipo)
            
            worker_inicio = datetime.now()
            resultado = worker.executar(spec, spec_recursos)
            worker_fim = datetime.now()
            
            artefatos.extend(resultado["artefatos"])
            tokens_total += resultado.get("tokens_consumidos", 0)
            tentativas_total += resultado.get("tentativas", 0)
            
            workers_detalhes.append({
                "worker": worker_tipo,
                "vertente": worker.vertente,
                "inicio_at": worker_inicio,
                "fim_at": worker_fim,
                "duracao_minutos": (worker_fim - worker_inicio).total_seconds() / 60,
                "tokens_consumidos": resultado.get("tokens_consumidos", 0),
                "tentativas": resultado.get("tentativas", 0),
                "passou_primeira": resultado.get("tentativas", 0) == 0,
                "artefatos": resultado["artefatos"]
            })
        
        self.registrar_execucao("dev_fim", spec.id, {
            "tokens_consumidos": tokens_total,
            "tentativas": tentativas_total,
            "workers_detalhes": workers_detalhes
        })
        
        # ══════════════════════════════════════════════════════════════
        # TESTE
        # ══════════════════════════════════════════════════════════════
        self.registrar_execucao("teste_inicio", spec.id, {})
        
        resultado_testes = self.testar(artefatos, spec.schema_tdd)
        
        self.registrar_execucao("teste_fim", spec.id, {
            "cobertura": resultado_testes.cobertura,
            "passou_primeira": resultado_testes.passou,
            "bugs_encontrados": len(resultado_testes.falhas)
        })
        
        # ══════════════════════════════════════════════════════════════
        # RELEASE
        # ══════════════════════════════════════════════════════════════
        release = Release.criar(
            spec_ref=spec.id,
            artefatos=artefatos,
            testes=resultado_testes
        )
        db.releases.insert_one(release.to_dict())
        
        # Produzir aprovação
        MS_Backlog.concluir(item.id, {"release_ref": release.id}, [{
            "tipo": "aprovar_release",
            "release_ref": release.id,
            "testes_passaram": resultado_testes.passou,
            "cobertura": resultado_testes.cobertura
        }])
    
    def processar_implantar(self, item):
        release = db.releases.find_one({"id": item.contexto["release_ref"]})
        spec_ref = release["spec_ref"]
        
        # ══════════════════════════════════════════════════════════════
        # v1.1: REGISTRAR DEPLOY
        # ══════════════════════════════════════════════════════════════
        self.registrar_execucao("deploy_inicio", spec_ref, {})
        
        # Deploy
        implantacao = self.deployar(release)
        db.implantacoes.insert_one(implantacao.to_dict())
        
        self.registrar_execucao("deploy_fim", spec_ref, {
            "release_ref": release["id"]
        })
        
        # ══════════════════════════════════════════════════════════════
        # v1.1: FINALIZAR EXECUÇÃO
        # ══════════════════════════════════════════════════════════════
        self.registrar_execucao("fim", spec_ref, {})
        
        # Produzir validação
        MS_Backlog.concluir(item.id, {"implantacao_ref": implantacao.id}, [{
            "tipo": "validar_implantacao",
            "release_ref": release["id"],
            "implantacao_ref": implantacao.id,
            "ambiente": implantacao.ambiente
        }])
```

---

## 8. Métricas Completas (v1.1)

### 8.1 Precisão de Orçamento

| Métrica | Cálculo | Uso | Collection |
|---------|---------|-----|------------|
| **Precisão Esforço (geral)** | Σ horas_real / Σ horas_estimado | Calibração global | execucoes |
| **Precisão Dev** | horas_dev_real / horas_dev_estimado | Calibrar estimativa dev | execucoes |
| **Precisão Teste** | horas_teste_real / horas_teste_estimado | Calibrar estimativa teste | execucoes |
| **Precisão Deploy** | horas_deploy_real / horas_deploy_estimado | Calibrar estimativa deploy | execucoes |
| **Variância** | stddev(precisao) por período | Confiança nas estimativas | execucoes |
| **Tendência** | slope(precisao) ao longo do tempo | Melhoria contínua | execucoes |

### 8.2 Consumo de Recursos

| Métrica | Cálculo | Uso | Collection |
|---------|---------|-----|------------|
| **Tokens LLM** | tokens_real / tokens_estimado | Custo LLM | execucoes |
| **CPU-horas** | cpu_real / cpu_estimado | Custo infra | execucoes |
| **RAM-horas** | ram_real / ram_estimado | Custo infra | execucoes |
| **Chamadas API** | chamadas_real por API | Custo APIs externas | execucoes |
| **Storage** | mb_real / mb_estimado | Custo storage | execucoes |

### 8.3 Custo

| Métrica | Cálculo | Uso | Collection |
|---------|---------|-----|------------|
| **Custo por Spec** | Σ(recursos × preço_unitário) | Budget | execucoes |
| **Custo por Release** | Σ custos da release | Budget | execucoes |
| **Custo por Worker** | custos agrupados por worker | Otimização | execucoes |
| **Precisão Custo** | custo_real / custo_estimado | Calibrar preços | execucoes |

### 8.4 Qualidade

| Métrica | Cálculo | Uso | Collection |
|---------|---------|-----|------------|
| **Cobertura Real vs Planejada** | cobertura_real / cobertura_spec | Qualidade | execucoes |
| **Taxa Sucesso 1ª Tentativa** | passou_primeira / total | Eficiência | execucoes |
| **Taxa de Retrabalho** | corrigir_bug / total_releases | Qualidade | backlog_items |
| **Bugs por Severidade** | count GROUP BY severidade | Risco | execucoes |
| **MTTR** | avg(fix_at - bug_at) | Agilidade | backlog_items |

### 8.5 Velocidade / Throughput

| Métrica | Cálculo | Uso | Collection |
|---------|---------|-----|------------|
| **Lead Time** | deploy_fim - spec_criada | Eficiência E2E | execucoes |
| **Cycle Time** | concluido - iniciado | Eficiência por fase | execucoes |
| **Throughput Specs/Semana** | count specs por período | Capacidade | execucoes |
| **Throughput Releases/Semana** | count releases por período | Capacidade | releases |
| **Deploys/Dia** | count deploys por dia | Frequência | implantacoes |

### 8.6 Infraestrutura / GAPs

| Métrica | Cálculo | Uso | Collection |
|---------|---------|-----|------------|
| **Taxa de GAPs** | specs_com_gap / total_specs | Maturidade infra | backlog_items |
| **Tempo Médio Desbloqueio** | avg(desbloq - bloq) | Velocidade resolução | backlog_items |
| **GAPs por Tipo** | count GROUP BY tipo_recurso | Priorização | backlog_items |
| **Capacidades Adicionadas** | count novas/mês | Evolução | capacidades |
| **Backlog de GAPs** | count GAPs pendentes | Dívida técnica | backlog_items |

### 8.7 Workers

| Métrica | Cálculo | Uso | Collection |
|---------|---------|-----|------------|
| **Tempo Médio por Vertente** | avg(duracao) GROUP BY worker | Capacidade | execucoes.workers |
| **Taxa Sucesso por Worker** | passou_primeira / total | Qualidade | execucoes.workers |
| **Tentativas de Correção** | avg(tentativas) por worker | Eficiência | execucoes.workers |
| **Tokens por Worker** | avg(tokens) por worker | Custo | execucoes.workers |

### 8.8 Queries de Métricas

```javascript
// Precisão média de orçamento (últimos 30 dias)
db.execucoes.aggregate([
  {$match: {
    status: "concluido",
    "timestamps.deploy_fim_at": {$gte: ISODate("2025-11-17")}
  }},
  {$group: {
    _id: null,
    precisao_media: {$avg: "$precisao.geral"},
    precisao_horas: {$avg: "$precisao.horas.total"},
    precisao_tokens: {$avg: "$precisao.recursos.tokens_llm"},
    total_execucoes: {$sum: 1}
  }}
])

// Tempo médio por worker
db.execucoes.aggregate([
  {$unwind: "$workers"},
  {$group: {
    _id: "$workers.worker",
    tempo_medio_min: {$avg: "$workers.duracao_minutos"},
    tokens_medio: {$avg: "$workers.tokens_consumidos"},
    taxa_sucesso_primeira: {$avg: {$cond: ["$workers.passou_primeira", 1, 0]}},
    total: {$sum: 1}
  }},
  {$sort: {tempo_medio_min: -1}}
])

// Lead time por semana
db.execucoes.aggregate([
  {$match: {status: "concluido"}},
  {$project: {
    semana: {$week: "$timestamps.deploy_fim_at"},
    lead_time_horas: {
      $divide: [
        {$subtract: ["$timestamps.deploy_fim_at", "$timestamps.spec_criada_at"]},
        3600000
      ]
    }
  }},
  {$group: {
    _id: "$semana",
    lead_time_medio: {$avg: "$lead_time_horas"},
    count: {$sum: 1}
  }},
  {$sort: {_id: 1}}
])

// Taxa de GAPs por período
db.backlog_items.aggregate([
  {$match: {
    tipo: "orcar_spec",
    status: "Concluido"
  }},
  {$lookup: {
    from: "backlog_items",
    localField: "items_gerados",
    foreignField: "id",
    as: "filhos"
  }},
  {$project: {
    tem_gap: {
      $gt: [
        {$size: {$filter: {
          input: "$filhos",
          cond: {$and: [
            {$eq: ["$$this.tipo", "entrevistar_dor"]},
            {$eq: ["$$this.produtor", "PROMETHEUS"]}
          ]}
        }}},
        0
      ]
    }
  }},
  {$group: {
    _id: null,
    total: {$sum: 1},
    com_gap: {$sum: {$cond: ["$tem_gap", 1, 0]}}
  }},
  {$project: {
    taxa_gaps: {$divide: ["$com_gap", "$total"]}
  }}
])
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| genesis/PROMETHEUS.md | Documento pai - propósito |
| docs/04_B/MS_Backlog.md | Message Broker |
| docs/04_B/MS_Backlog_Arquitetura.md | Contratos de comunicação |
| docs/04_P/MS_Produto.md | Aprova orçamento e release |
| docs/00_E/00_E_Epistemologia.md | Produz specs |
| genesis/GENESIS_Arquitetura.md | Fluxo de saga |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-17 | Criação inicial. Ciclo precificar→gap→desenvolver. Workers por vertente. Contratos MS_Backlog. Regra de desbloqueio. Loop de consumo. Sprint S020/E02. |
| 1.1 | 2025-12-17 | **Collection execucoes**: Persistência de estimado vs realizado. **Métricas completas**: 8 categorias (Precisão, Recursos, Custo, Qualidade, Velocidade, Infra, Workers). **registrar_execucao()**: Método para coleta automática durante processamento. **Queries agregação**: Exemplos de consultas para métricas. |

# PROMETHEUS Arquitetura v1.0

---

```yaml
nome: PROMETHEUS_Arquitetura
versao: "1.0"
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

### 3.3 Exemplo Prático

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
│  ────────                                                                   │
│  gap_001: {tipo: entrevistar_dor, contexto: {sintoma: "Falta Whisper"}}     │
│  gap_002: {tipo: entrevistar_dor, contexto: {sintoma: "Falta GPU"}}         │
│  orc_001: {tipo: aprovar_orcamento, depende_de: [gap_001, gap_002],         │
│            status: "Bloqueado"}                                             │
│                                                                             │
│  ESTADO INICIAL:                                                            │
│  ────────────────                                                           │
│  gap_001: Pendente                                                          │
│  gap_002: Pendente                                                          │
│  orc_001: Bloqueado (deps: gap_001, gap_002)                                │
│                                                                             │
│  APÓS gap_001 concluído:                                                    │
│  ─────────────────────────                                                  │
│  gap_001: Concluido ───► verificar_desbloqueio(orc_001)                     │
│  gap_002: Pendente       │                                                  │
│  orc_001: Bloqueado      └── gap_002 não concluído, mantém bloqueado        │
│                                                                             │
│  APÓS gap_002 concluído:                                                    │
│  ─────────────────────────                                                  │
│  gap_001: Concluido                                                         │
│  gap_002: Concluido ───► verificar_desbloqueio(orc_001)                     │
│  orc_001: Pendente       └── todas deps concluídas, DESBLOQUEIA!            │
│                                                                             │
│  AGORA MS_PRODUTO pode consumir orc_001                                     │
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
│  Cada worker pode produzir items internos:                                  │
│  tipo: worker_estrutura, worker_processo, worker_dados, etc.                │
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

### 4.3 Fluxo Interno de Worker

```python
class Worker:
    def executar(self, spec, spec_recursos):
        """
        Fluxo padrão de qualquer worker
        """
        # 1. Carregar template da vertente
        template = carregar_template(self.vertente)
        
        # 2. Gerar código baseado na spec
        codigo = self.gerar_codigo(spec, template)
        
        # 3. Gerar testes baseado no schema_tdd
        testes = self.gerar_testes(spec.schema_tdd)
        
        # 4. Executar testes
        resultado = self.executar_testes(codigo, testes)
        
        # 5. Se falhar, tentar corrigir (loop limitado)
        tentativas = 0
        while not resultado.passou and tentativas < 3:
            codigo = self.corrigir(codigo, resultado.erros)
            resultado = self.executar_testes(codigo, testes)
            tentativas += 1
        
        # 6. Retornar artefatos
        return {
            "codigo": codigo,
            "testes": testes,
            "resultado": resultado,
            "tentativas": tentativas
        }
```

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
        "total": None,  # calculado abaixo
        "workers": workers
    }
    spec_recursos.esforco["total"] = (
        spec_recursos.esforco["horas_dev"] +
        spec_recursos.esforco["horas_teste"] +
        spec_recursos.esforco["horas_deploy"]
    )
    
    # 5. DEPENDÊNCIAS
    gaps = self.identificar_gaps(spec)
    spec_recursos.dependencias = {
        "specs_pre_requisito": spec.depende_de or [],
        "gaps_infra": [g.id for g in gaps],
        "status": "bloqueado" if gaps else "liberado"
    }
    
    return spec_recursos, gaps
```

### 5.2 Identificação de GAPs

```python
def identificar_gaps(self, spec: Spec) -> List[Gap]:
    """
    Verifica quais recursos a spec precisa que PROMETHEUS não tem
    """
    gaps = []
    
    # Verificar APIs externas
    for api in spec.runtime.apis_externas:
        if api not in self.capacidades_disponiveis["apis"]:
            gaps.append(Gap(
                tipo="api_externa",
                recurso=api,
                descricao=f"API {api} não configurada",
                criterio=f"{api} funcional com credenciais válidas",
                alternativas=self.buscar_alternativas(api)
            ))
    
    # Verificar GPU
    if spec.runtime.gpu and not self.capacidades_disponiveis["gpu"]:
        gaps.append(Gap(
            tipo="hardware",
            recurso="gpu",
            descricao="GPU não disponível",
            criterio="GPU CUDA funcional",
            alternativas=["CPU (mais lento)", "API externa"]
        ))
    
    # Verificar containers base
    for container in spec.runtime.containers_necessarios:
        if container not in self.capacidades_disponiveis["containers"]:
            gaps.append(Gap(
                tipo="container",
                recurso=container,
                descricao=f"Container {container} não disponível",
                criterio=f"Container {container} rodando",
                alternativas=[]
            ))
    
    return gaps
```

---

## 6. Persistência

### 6.1 Regra de Ouro

```
SE é DEFINIÇÃO (template, spec, framework) → GitHub
SE é INSTÂNCIA (dado real, transação, estado) → MongoDB
```

### 6.2 O que PROMETHEUS Persiste

| Collection | Conteúdo | Tipo |
|------------|----------|------|
| `specs_recursos` | Orçamentos calculados | MongoDB |
| `releases` | Releases geradas | MongoDB |
| `implantacoes` | Histórico de deploys | MongoDB |
| `capacidades` | Capacidades disponíveis | MongoDB |
| `metricas_build` | Tempo de build, testes, etc. | MongoDB |

### 6.3 O que PROMETHEUS Lê

| Collection/Arquivo | Sistema Dono | Uso |
|-------------------|--------------|-----|
| specs (GitHub) | Epistemologia | Input para precificar/desenvolver |
| templates (GitHub) | Epistemologia | Templates por vertente |
| backlog_items | MS_Backlog | Consumo/Produção |
| produtos, features | MS_Produto | Contexto |

---

## 7. Loop de Consumo

### 7.1 Implementação

```python
class PROMETHEUS:
    tipos_consumidos = [
        "orcar_spec",
        "desenvolvimento", 
        "implantar",
        "corrigir_bug"
    ]
    
    def run(self):
        """Loop principal de consumo"""
        while True:
            # Buscar próximo item
            item = MS_Backlog.consumir(self.tipos_consumidos)
            
            if item is None:
                aguardar(segundos=5)
                continue
            
            try:
                # Processar conforme tipo
                if item.tipo == "orcar_spec":
                    self.processar_orcar(item)
                
                elif item.tipo == "desenvolvimento":
                    self.processar_desenvolver(item)
                
                elif item.tipo == "implantar":
                    self.processar_implantar(item)
                
                elif item.tipo == "corrigir_bug":
                    self.processar_corrigir(item)
                
            except Exception as e:
                MS_Backlog.falhar(item.id, str(e))
    
    def processar_orcar(self, item):
        spec = carregar_spec(item.contexto["spec_ref"])
        
        # Precificar
        spec_recursos, gaps = self.precificar(spec)
        
        # Persistir orçamento
        db.specs_recursos.insert_one(spec_recursos.to_dict())
        
        # Produzir GAPs
        gap_ids = []
        for gap in gaps:
            gap_item = MS_Backlog.produzir({
                "tipo": "entrevistar_dor",
                "produtor": "PROMETHEUS",
                "contexto": gap.to_contexto_dor(),
                "spec_origem_ref": spec.id
            })
            gap_ids.append(gap_item["id"])
        
        # Produzir orçamento
        items_gerados = [{
            "tipo": "aprovar_orcamento",
            "spec_ref": spec.id,
            "spec_recursos": spec_recursos.to_dict(),
            "depende_de": gap_ids,
            "status": "Bloqueado" if gap_ids else "Pendente"
        }]
        
        MS_Backlog.concluir(item.id, {"spec_recursos_id": spec_recursos.id}, items_gerados)
    
    def processar_desenvolver(self, item):
        spec = carregar_spec(item.contexto["spec_ref"])
        spec_recursos = item.contexto["spec_recursos"]
        
        # Desenvolver via workers
        artefatos = []
        for worker_tipo in spec_recursos["esforco"]["workers"]:
            worker = self.get_worker(worker_tipo)
            resultado = worker.executar(spec, spec_recursos)
            artefatos.extend(resultado["artefatos"])
        
        # Testar
        resultado_testes = self.testar(artefatos, spec.schema_tdd)
        
        # Criar release
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
        
        # Deploy
        implantacao = self.deployar(release)
        db.implantacoes.insert_one(implantacao.to_dict())
        
        # Produzir validação
        MS_Backlog.concluir(item.id, {"implantacao_ref": implantacao.id}, [{
            "tipo": "validar_implantacao",
            "release_ref": release["id"],
            "implantacao_ref": implantacao.id,
            "ambiente": implantacao.ambiente
        }])
    
    def processar_corrigir(self, item):
        # Similar a desenvolver, mas focado no bug
        feature = db.features.find_one({"id": item.contexto["feature_ref"]})
        spec = carregar_spec(feature["spec_ref"])
        
        # Corrigir
        artefatos = self.corrigir_bug(spec, item.contexto["erro"])
        
        # Testar
        resultado_testes = self.testar(artefatos, spec.schema_tdd)
        
        # Criar release de correção
        release = Release.criar(
            spec_ref=spec.id,
            artefatos=artefatos,
            testes=resultado_testes,
            tipo="hotfix"
        )
        db.releases.insert_one(release.to_dict())
        
        MS_Backlog.concluir(item.id, {"release_ref": release.id}, [{
            "tipo": "aprovar_release",
            "release_ref": release.id
        }])
```

---

## 8. Métricas

### 8.1 Métricas de Fábrica

| Métrica | Cálculo | Uso |
|---------|---------|-----|
| **Precisão de Orçamento** | esforço_real / esforço_estimado | Calibrar estimativas |
| **Taxa de GAPs** | specs_com_gap / total_specs | Maturidade da infra |
| **Tempo de Desbloqueio** | média(desbloqueio - bloqueio) | Velocidade de resolução |
| **Lead Time Desenvolvimento** | concluido_at - inicio_at | Eficiência |
| **Taxa de Retrabalho** | corrigir_bug / total_releases | Qualidade |

### 8.2 Métricas por Worker

| Métrica | Descrição |
|---------|-----------|
| **Tempo médio por vertente** | Quanto tempo cada worker leva |
| **Taxa de sucesso de testes** | % de testes que passam na primeira |
| **Tentativas de correção** | Média de loops de correção |

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

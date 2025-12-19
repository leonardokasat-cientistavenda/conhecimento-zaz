# PROMETHEUS v3.1

---

```yaml
nome: PROMETHEUS
versao: "3.1"
tipo: Framework
classe_ref: Framework
origem: interno
status: Publicado
nivel: C2
camadas: [L0, L1, L2, L3]
data_publicacao: 2025-12-19

# INTERFACE EVENT-DRIVEN (v3.0)
tipos_consumidos:
  - orcar_spec              # Epistemologia produz spec, PROMETHEUS orça
  - desenvolvimento         # MS_Produto aprova orçamento, PROMETHEUS desenvolve
  - implantar               # MS_Produto aprova release, PROMETHEUS deploya
  - corrigir_bug            # GENESIS identifica bug, PROMETHEUS corrige

tipos_produzidos:
  - aprovar_orcamento       # Orçamento pronto para aprovação
  - gap_infra               # Falta capacidade, vira dor de PROMETHEUS
  - aprovar_release         # Release pronta para aprovação
  - validar_implantacao     # Deploy concluído, MS_Produto valida
```

---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **PROMETHEUS** | Fábrica que transforma specs em artefatos implantados |
| **Fábrica** | Sistema que precifica, desenvolve, testa e deploya |
| **Precificar** | Estimar recursos, esforço e identificar dependências |
| **GAP** | Capacidade faltante que bloqueia desenvolvimento |
| **Spec** | Especificação comportamental (Schema TDD) vinda de Epistemologia |
| **Spec Recursos** | Orçamento: runtime, teste, carga, esforço |
| **Worker** | Executor especializado por vertente (E, P, D, I, C) |
| **Bloco** | Domínio de responsabilidade (INFRA ou PRODUÇÃO) |
| **Pipeline** | Fluxo automatizado de validação, teste e deploy |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Epistemologia especifica O QUÊ. Quem executa COMO?"                       │
│                                                                             │
│  ANTES (v2.0): PROMETHEUS recebia spec e desenvolvia direto                 │
│  ─────────────────────────────────────────────────────────                  │
│  • PO aprovava sem saber esforço/recursos                                   │
│  • GAPs de infra descobertos no meio do desenvolvimento                     │
│  • Sem previsibilidade                                                      │
│                                                                             │
│  DEPOIS (v3.0): PROMETHEUS orça antes de desenvolver                        │
│  ────────────────────────────────────────────────────                       │
│  • Precifica spec (recursos, esforço, dependências)                         │
│  • Identifica GAPs de infra ANTES de iniciar                                │
│  • GAPs viram dor → ciclo resolve → desbloqueia desenvolvimento             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **PROMETHEUS é a Fábrica que transforma specs em artefatos, orçando antes de executar.**
>
> **Funções:**
> - **Precificar**: Estimar recursos, identificar GAPs
> - **Desenvolver**: Executar TDD via workers especializados
> - **Testar**: Validar conforme Schema TDD
> - **Deployar**: Implantar artefato em produção (via Pipeline)
>
> **Diferencial v3.0:**
> - PROMETHEUS orça ANTES de desenvolver
> - GAPs de infra entram no ciclo como dor de PROMETHEUS
> - Desenvolvimento bloqueado até dependências resolvidas
>
> **Diferencial v3.1:**
> - Pipeline automatizado para deploy de artefatos
> - Zero operação manual: push → webhook → deploy
>
> **Resultado:** Previsibilidade, sem surpresas de infra, orçamento aprovado.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação no PROMETHEUS |
|----------|--------|-------------------------|
| **Separação de Concerns** | SOLID | Precificar ≠ Desenvolver ≠ Testar ≠ Deployar |
| **Linha de Produção** | Manufatura | Spec → Orçamento → Aprovação → Produção |
| **Dependency Management** | DevOps | GAPs são dependências bloqueantes |
| **Autopoiesis** | Maturana & Varela | PROMETHEUS constrói sua própria infra |
| **CI/CD** | DevOps | Pipeline automatiza validação e deploy |

### 2.2 Síntese: Fábrica com Orçamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SÍNTESE: FÁBRICA COM ORÇAMENTO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FÁBRICA TRADICIONAL              PROMETHEUS v3.0                           │
│  ───────────────────              ───────────────                           │
│                                                                             │
│  Pedido (projeto)     ─────────►  Spec (comportamento + Schema TDD)         │
│  Orçamento            ─────────►  Spec Recursos (runtime, esforço, deps)    │
│  Aprovação cliente    ─────────►  MS_Produto aprova orçamento               │
│  Linha de Produção    ─────────►  Workers (E, P, D, I, C)                   │
│  Controle Qualidade   ─────────►  Testes (Schema TDD)                       │
│  Entrega              ─────────►  Deploy + validação (via Pipeline)         │
│                                                                             │
│  DIFERENCIAL: Cliente aprova ANTES de iniciar produção                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 PROMETHEUS como Cliente de Si Mesmo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUTOPOIESIS: PROMETHEUS CONSTRÓI PROMETHEUS              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROMETHEUS precifica spec                                                  │
│       │                                                                     │
│       ├── "Tenho essa capacidade?" ──► SIM ──► Continua                     │
│       │                                                                     │
│       └── "Não tenho" ──► GAP_INFRA ──► MS_BACKLOG                          │
│                                              │                              │
│                                              ▼                              │
│                                         GENESIS                             │
│                                    (entrevistar_dor)                        │
│                                    produtor: PROMETHEUS                     │
│                                              │                              │
│                                              ▼                              │
│                                    Fluxo normal:                            │
│                                    Produto → Spec → PROMETHEUS              │
│                                              │                              │
│                                              ▼                              │
│                                    GAP resolvido                            │
│                                    PROMETHEUS ganha capacidade              │
│                                                                             │
│  RESULTADO: PROMETHEUS evolui construindo a si mesmo                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**PROMETHEUS** é a Fábrica que:
- **Recebe** specs de Epistemologia (via MS_Backlog)
- **Precifica** estimando recursos e identificando GAPs
- **Desenvolve** via workers especializados (após aprovação)
- **Testa** conforme Schema TDD
- **Deploya** em produção (via Pipeline automatizado)

### 3.2 Fronteiras

| PROMETHEUS É | PROMETHEUS NÃO É |
|--------------|------------------|
| Fábrica que executa specs | Quem decide O QUÊ construir (GENESIS + MS_Produto) |
| Precificador de esforço | Quem especifica comportamento (Epistemologia) |
| Executor de TDD | Quem aprova orçamento (MS_Produto) |
| Cliente de si mesmo (GAPs) | Quem orquestra fluxo (MS_Backlog) |

### 3.3 Os 2 Blocos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              OS 2 BLOCOS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  INFRA                                                              │    │
│  │  ─────                                                              │    │
│  │  ONDE tudo roda.                                                    │    │
│  │                                                                     │    │
│  │  • Containers (Docker)                                              │    │
│  │  • Redes e volumes                                                  │    │
│  │  • Sistemas base (Git, Mattermost, Camunda, MongoDB, LLM Router)    │    │
│  │  • APIs externas (Whisper, GPT, etc.)                               │    │
│  │  • Secrets e configurações                                          │    │
│  │                                                                     │    │
│  │  Entrada: GAPs identificados na precificação                        │    │
│  │  Saída: Capacidades disponíveis                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PRODUÇÃO                                                           │    │
│  │  ────────                                                           │    │
│  │  COMO artefatos são construídos.                                    │    │
│  │                                                                     │    │
│  │  • Workers por vertente (E, P, D, I, C)                             │    │
│  │  • Templates de artefatos                                           │    │
│  │  • Pipelines de build                                               │    │
│  │  • Testes automatizados                                             │    │
│  │                                                                     │    │
│  │  Entrada: Spec + Orçamento aprovado                                 │    │
│  │  Saída: Artefatos testados                                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Camadas Autopoiéticas (L0-L4)

PROMETHEUS manifesta as camadas L0-L3:

| Camada | Manifesta? | Como |
|--------|------------|------|
| **L0 Existência** | ✅ | PROMETHEUS.md, versão, containers, artefatos |
| **L1 Percepção** | ✅ | Métricas de build, CI/CD, logs, estado de workers |
| **L2 Ação** | ✅ | Precifica, desenvolve, testa, deploya |
| **L3 Validação** | ✅ | Testes automatizados, gates de qualidade |
| **L4 Decisão** | ⚪ Parcial | Decide pipeline, mas não decide O QUÊ construir |

**L4 completo está em GENESIS** (decide iteração) e **MS_Produto** (aprova orçamento).

---

## 4. Classe (M3)

### 4.1 Atributos

| Grupo | Atributo | Tipo | Descrição |
|-------|----------|------|-----------|
| **Identificação** | nome | String | "PROMETHEUS" |
| | versao | SemVer | Versão atual |
| | blocos | [INFRA, PRODUÇÃO] | Domínios de responsabilidade |
| | camadas | [L0, L1, L2, L3] | Camadas que manifesta |
| **Event-Driven** | tipos_consumidos | Array | orcar_spec, desenvolvimento, implantar, corrigir_bug |
| | tipos_produzidos | Array | aprovar_orcamento, gap_infra, aprovar_release, validar_implantacao |
| **Capacidades** | capacidades_disponiveis | Map | Recursos que possui (APIs, containers, etc.) |
| | workers | Array | Workers por vertente [E, P, D, I, C] |

### 4.2 Métodos

| Método | Input | Output | Descrição |
|--------|-------|--------|-----------|
| `precificar()` | spec_tdd | spec_recursos + gaps[] | Estima recursos, identifica GAPs |
| `desenvolver()` | spec_tdd + spec_recursos | release | Executa TDD via workers |
| `testar()` | artefato + schema_tdd | resultado_testes | Valida conforme critérios |
| `deployar()` | release | implantacao | Coloca em produção (via Pipeline) |
| `identificar_gaps()` | spec_tdd | gaps[] | Verifica capacidades faltantes |

### 4.3 Fluxo Completo via MS_Backlog

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO PROMETHEUS v3.0 (via MS_Backlog)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EPISTEMOLOGIA                                                              │
│  produz: {tipo: orcar_spec, spec_ref}                                       │
│       │                                                                     │
│       ▼                                                                     │
│  ══════════════════════════════════════════════════════════════════════     │
│  ║                          MS_BACKLOG                                 ║    │
│  ══════════════════════════════════════════════════════════════════════     │
│       │                                                                     │
│       ▼                                                                     │
│  PROMETHEUS.precificar()                                                    │
│       │                                                                     │
│       ├── Analisa spec_tdd                                                  │
│       ├── Verifica capacidades_disponiveis                                  │
│       ├── Estima: runtime, teste, carga, esforço                            │
│       │                                                                     │
│       ├── SEM GAPS:                                                         │
│       │   produz: {tipo: aprovar_orcamento, spec_recursos}                  │
│       │                                                                     │
│       └── COM GAPS:                                                         │
│           produz: {tipo: aprovar_orcamento, spec_recursos, depende_de: []}  │
│           produz: {tipo: gap_infra, ...} (para cada GAP)                    │
│                │                                                            │
│                ▼                                                            │
│           MS_BACKLOG (aprovar_orcamento fica BLOQUEADO)                     │
│                │                                                            │
│                ▼                                                            │
│           gap_infra → GENESIS.entrevistar_dor(produtor: PROMETHEUS)         │
│                       → MS_PRODUTO → EPISTEMOLOGIA → PROMETHEUS             │
│                       → GAP resolvido                                       │
│                       → aprovar_orcamento DESBLOQUEADO                      │
│       │                                                                     │
│       ▼                                                                     │
│  MS_PRODUTO.aprovar_orcamento()                                             │
│       │                                                                     │
│       ├── APROVA: produz: {tipo: desenvolvimento, spec_ref}                 │
│       │                                                                     │
│       └── AJUSTA: produz: {tipo: ajustar_spec, spec_ref, motivo}            │
│                   → volta para EPISTEMOLOGIA                                │
│       │                                                                     │
│       ▼                                                                     │
│  PROMETHEUS.desenvolver()                                                   │
│       │                                                                     │
│       ├── Distribui para workers por vertente                               │
│       │   ├── Worker_E (código POO)                                         │
│       │   ├── Worker_P (processos BPMN)                                     │
│       │   ├── Worker_D (decisões DMN)                                       │
│       │   ├── Worker_I (interfaces)                                         │
│       │   └── Worker_C (integrações)                                        │
│       │                                                                     │
│       ├── PROMETHEUS.testar()                                               │
│       │   └── Valida conforme Schema TDD                                    │
│       │                                                                     │
│       └── produz: {tipo: aprovar_release, release_ref}                      │
│       │                                                                     │
│       ▼                                                                     │
│  MS_PRODUTO.aprovar_release()                                               │
│       │                                                                     │
│       ├── APROVA: produz: {tipo: implantar, release_ref}                    │
│       │                                                                     │
│       └── REJEITA: produz: {tipo: corrigir_bug, release_ref, motivo}        │
│       │                                                                     │
│       ▼                                                                     │
│  PROMETHEUS.deployar() ◄── VIA PIPELINE AUTOMATIZADO                        │
│       │                                                                     │
│       └── produz: {tipo: validar_implantacao, release_ref}                  │
│       │                                                                     │
│       ▼                                                                     │
│  MS_PRODUTO.validar_implantacao()                                           │
│       │                                                                     │
│       └── produz: {tipo: avaliar_efetividade, ...}                          │
│       │                                                                     │
│       ▼                                                                     │
│  GENESIS.avaliar_efetividade()                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Schema Recursos (Orçamento)

```yaml
spec_recursos:
  spec_ref: "spec_001"
  
  # RUNTIME - O que precisa para rodar
  runtime:
    cpu: "2 cores"
    ram: "4GB"
    gpu: null
    apis_externas: ["whisper", "gpt-4"]
    tokens_llm_estimado: 50000
    containers: 2
  
  # TESTE - Complexidade de validação
  teste:
    classes_equivalencia: 12
    combinacoes_estimadas: 48
    cobertura: "pairwise"
    tempo_execucao_estimado: "15min"
  
  # CARGA - Escala esperada
  carga:
    tps_esperado: 10
    usuarios_simultaneos: 50
    pico_estimado: "seg-sex 8h-10h"
  
  # ESFORÇO - Horas de trabalho
  esforco:
    horas_dev: 16
    horas_teste: 4
    horas_deploy: 2
    total: 22
    workers: ["WORKER_E", "WORKER_I"]
  
  # DEPENDÊNCIAS
  dependencias:
    specs_pre_requisito: []
    gaps_infra: ["gap_001", "gap_002"]
    status: "bloqueado"  # ou "liberado"
```

### 4.5 GAP Infra (Dor de PROMETHEUS)

```yaml
gap_infra:
  tipo: "entrevistar_dor"
  produtor: "PROMETHEUS"
  
  contexto:
    sintoma: "Falta GPU runtime para Whisper local"
    frequencia: "Sempre que spec usa transcrição de áudio"
    afetados: ["specs_audio", "feature_reporte_voz"]
    impacto: "Specs bloqueadas, entregas atrasadas"
    tentativas: ["API externa Whisper (custo alto)"]
    criterio_sucesso: "Whisper local funcional com latência <2s"
  
  spec_origem_ref: "spec_001"
  bloqueando: ["aprovar_orcamento_001"]
```

### 4.6 Workers por Vertente

| Worker | Vertente | Consome | Produz | Artefatos |
|--------|----------|---------|--------|-----------|
| **Worker_E** | Estrutural (POO) | spec_poo | código | .py, test_.py, .feature |
| **Worker_P** | Processual (BPMN) | spec_bpmn | workflow | .bpmn, karate.feature |
| **Worker_D** | Decisional (DMN) | spec_dmn | regras | .dmn, karate.feature |
| **Worker_I** | Interface | spec_interface | UI | .jsx, .css, cypress.spec |
| **Worker_C** | Integração | spec_integracao | conectores | .py, .yaml, mocks |

---

## 5. Pipeline (v3.1)

### 5.1 Visão Geral

O Pipeline automatiza o deploy de artefatos gerados pelo PROMETHEUS.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PROMETHEUS gera artefatos → Pipeline publica → Camunda/Workers executam    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Fluxo

```
┌───────────────┐     webhook      ┌───────────────┐     REST API    ┌───────────────┐
│    GitHub     │ ───────────────► │   Servidor    │ ──────────────► │   Camunda     │
│  push main    │    (HMAC)        │   Worker      │                 │   Engine      │
└───────────────┘                  └───────────────┘                 └───────────────┘
```

### 5.3 Artefatos Suportados

| Tipo | Extensões | Destino |
|------|-----------|---------|
| Processos | `.bpmn` | Camunda Engine |
| Decisões | `.dmn` | Camunda Engine |
| Formulários | `.form`, `.html` | Camunda Engine |
| Workers | `.js` | Servidor Worker (PM2) |

### 5.4 Documentação Detalhada

| Documento | Conteúdo |
|-----------|----------|
| `docs/04_P/MS_Prometheus_Pipeline.md` | Guia de uso |
| `docs/04_P/MS_Prometheus_Pipeline_Arquitetura.md` | Arquitetura técnica |

---

## 6. Integração com MS_Backlog

### 6.1 Loop de Consumo

```python
class PROMETHEUS:
    tipos_consumidos = ["orcar_spec", "desenvolvimento", "implantar", "corrigir_bug"]
    
    def run(self):
        while True:
            item = MS_Backlog.consumir(self.tipos_consumidos)
            
            if item is None:
                aguardar()
                continue
            
            if item.tipo == "orcar_spec":
                self.processar_orcar(item)
            
            elif item.tipo == "desenvolvimento":
                self.processar_desenvolver(item)
            
            elif item.tipo == "implantar":
                self.processar_implantar(item)
            
            elif item.tipo == "corrigir_bug":
                self.processar_corrigir(item)
    
    def processar_orcar(self, item):
        spec = carregar_spec(item.spec_ref)
        
        # Precificar
        spec_recursos = self.precificar(spec)
        gaps = self.identificar_gaps(spec)
        
        # Produzir GAPs como dor de PROMETHEUS
        gap_ids = []
        for gap in gaps:
            gap_item = MS_Backlog.produzir({
                "tipo": "entrevistar_dor",
                "produtor": "PROMETHEUS",
                "contexto": gap.to_contexto_dor()
            })
            gap_ids.append(gap_item.id)
        
        # Produzir orçamento (bloqueado se tiver gaps)
        MS_Backlog.concluir(
            item.id,
            resultado={"spec_recursos": spec_recursos},
            items_gerados=[{
                "tipo": "aprovar_orcamento",
                "spec_ref": item.spec_ref,
                "spec_recursos": spec_recursos,
                "depende_de": gap_ids,
                "status": "Bloqueado" if gap_ids else "Pendente"
            }]
        )
```

### 6.2 Contratos

```yaml
# PROMETHEUS consome:
orcar_spec:
  produtor: Epistemologia
  contexto:
    spec_ref: string
  resultado:
    spec_recursos: object
  items_gerados:
    - tipo: aprovar_orcamento
    - tipo: entrevistar_dor (para cada gap)

desenvolvimento:
  produtor: MS_Produto
  contexto:
    spec_ref: string
    spec_recursos: object
  resultado:
    release_ref: string
  items_gerados:
    - tipo: aprovar_release

implantar:
  produtor: MS_Produto
  contexto:
    release_ref: string
  resultado:
    implantacao_ref: string
  items_gerados:
    - tipo: validar_implantacao

corrigir_bug:
  produtor: GENESIS | MS_Produto
  contexto:
    feature_ref: string
    erro: string
  resultado:
    release_ref: string
  items_gerados:
    - tipo: aprovar_release
```

---

## 7. Referências

### 7.1 Internas

| Documento | Relação |
|-----------|---------|
| **genesis/GENESIS.md** | Propósito maior, camadas L0-L4 |
| genesis/GENESIS_Arquitetura.md | Fluxo de saga |
| docs/04_B/MS_Backlog.md | Message Broker |
| docs/04_B/MS_Backlog_Arquitetura.md | Contratos e roteamento |
| docs/04_P/MS_Produto.md | Aprova orçamento e release |
| **docs/04_P/MS_Prometheus_Pipeline.md** | Pipeline - guia de uso |
| **docs/04_P/MS_Prometheus_Pipeline_Arquitetura.md** | Pipeline - arquitetura |
| docs/00_E/00_E_Epistemologia.md | Produz specs |
| docs/00_E/00_E_1_7_Schema_TDD.md | Estrutura de testes |

### 7.2 Externas

| Fonte | Conceito |
|-------|----------|
| SemVer | Versionamento Semântico |
| SOLID | Separação de responsabilidades |
| Maturana & Varela | Autopoiesis |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-14 | Documento inicial. 4 blocos, 5 camadas. |
| 2.0 | 2025-12-15 | Simplificação: 2 blocos (INFRA, PRODUÇÃO). PROMETHEUS como fábrica instrumental. |
| 3.0 | 2025-12-17 | **Fábrica com Precificação**: tipos_consumidos/produzidos. Ciclo orcar→desenvolver→testar→deployar. Schema Recursos. GAPs como dor de PROMETHEUS (autopoiese). Workers por vertente. Sprint S020/E01. |
| 3.1 | 2025-12-19 | **Pipeline automatizado**: Seção 5 documenta pipeline de deploy. Referências para docs/04_P/MS_Prometheus_Pipeline*.md. Sprint S028. |

# Backlog: Arquitetura v4 - Especificação Orientada a TDD

**Data:** 2025-12-16
**Origem:** Chat "Fábrica de código com LLM e epistemologia"
**Status:** Pendente

---

## 1. Resumo Executivo

### Visão Geral da Arquitetura Definida

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUXO COMPLETO v4                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. CONHECER (Epistemologia)                                                │
│     M0 → M1 → M2 (fecha diamante) → M3.* (vertentes) → M4 (documento)       │
│     Output: Specs orientadas a TDD                                          │
│                                                                             │
│  2. EXECUTAR (PROMETHEUS)                                                   │
│     Recebe Specs → Workers por vertente → TDD (testes primeiro) → Artefatos │
│     Output: Release Candidate                                               │
│                                                                             │
│  3. VALIDAR (GENESIS)                                                       │
│     Recebe RC → Valida contra Specs → Verifica capabilities → Aprova/Rejeita│
│     Output: Release Aprovada ou Backlog de Correções                        │
│                                                                             │
│  4. OPERAR (MS_Produto)                                                     │
│     Produto em produção → Health Score → Feedback → Ciclo contínuo          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Princípios Arquiteturais

| Princípio | Descrição |
|-----------|-----------|
| **Spec = Testes** | Classes de equivalência derivam testes automaticamente |
| **Recursividade** | Atributos complexos geram ciclos epistemológicos filhos |
| **Tracking Universal** | Todo item de backlog tem timestamps e métricas |
| **Capability Discovery** | GENESIS verifica se consegue executar antes de aceitar |

---

## 2. Alterações por Domínio

### 2.1 EPISTEMOLOGIA v4.0

**Problema:** M3 atual é monolítico. Não suporta múltiplas naturezas de especificação nem TDD.

**Solução:** M3 vira vertentes com schemas orientados a testes.

#### Estrutura Nova

```
M0: Problema (igual)
M1: Marco Teórico (igual)
M2: Objeto - fecha diamante, identifica componentes (igual)
M3: Especificações (NOVO - vertentes paralelas com dependências)
    ├── M3.E: Estrutural (POO) - OBRIGATÓRIO
    │   ├── classes_equivalencia por atributo
    │   ├── criterios_aceite por método
    │   ├── exposto: true/false (gera Karate se true)
    │   └── cobertura: cartesiano | pairwise
    │
    ├── M3.P: Processual (BPMN) - opcional, depende de M3.E
    ├── M3.D: Decisional (DMN) - opcional, depende de M3.E
    ├── M3.I: Infraestrutural (IaC) - depende de M3.E, M3.P, M3.D
    └── M3.C: Configuracional (Schema) - depende de M3.E, M3.I

M4: Documento - síntese legível (igual)
```

#### DAG de Dependências M3

```
                           M2
                            │
                            ▼
                         M3.E ─────────────────────┐
                            │                      │
                 ┌──────────┴──────────┐           │
                 ▼                     ▼           │
               M3.P                  M3.D          │
                 │                     │           │
                 └──────────┬──────────┘           │
                            ▼                      │
                         M3.I ◄────────────────────┘
                            │
                            ▼
                         M3.C
                            │
                            ▼
                           M4
```

#### Schema M3.E (Estrutural)

```yaml
M3.E:
  classe: NomeClasse
  
  atributos:
    - nome: attr_name
      tipo: str | int | Enum | List[X]
      obrigatorio: true | false
      validacao: regex | min | max
      classes_equivalencia:          # NOVO
        - nome: identificador
          valor: exemplo
          valido: true | false
      ciclo_ref: MS_Filho?           # NOVO - se complexo, referencia ciclo filho
  
  metodos:
    - nome: method_name
      entrada:
        - nome: param_name
          tipo: str
          classes_equivalencia:      # NOVO
            - { nome: id, valor: ex, valido: bool }
      saida: Tipo
      pre_condicoes: []
      pos_condicoes: []
      criterios_aceite: []           # NOVO - lista de comportamentos esperados
      exposto: true | false          # NOVO - gera Karate se true
      rota: METHOD /path/{param}     # se exposto
      cobertura: cartesiano | pairwise  # NOVO
```

#### Recursividade

Quando atributo não é classe folha (tem comportamento/regras próprias):

```
1. M3.E detecta: atributo.ciclo_ref = MS_Filho
2. GENESIS gera backlog_item:
   - tipo: ciclo_epistemologico
   - M0: pré-preenchido (derivado do pai)
   - M1, M2, M3, M4: pendentes
3. Humano prioriza e executa ciclo filho
4. Repete até todas as classes serem folhas
```

#### Arquivos Impactados

| Arquivo | Ação | Prioridade |
|---------|------|------------|
| docs/00_E/00_E_Epistemologia.md | UPDATE v3.4 → v4.0 | Alta |
| docs/00_E/00_E_1_4_Classe.md | UPDATE - adicionar schemas M3.* | Alta |
| docs/00_E/00_E_1_5_Metodo.md | UPDATE - criterios_aceite, classes_equiv | Alta |
| docs/00_E/00_E_1_6_Documento.md | UPDATE - estrutura híbrida .md + .yaml | Média |

---

### 2.2 BACKLOG & SPRINT v2.0

**Problema:** Não há tracking de ciclos epistemológicos nem métricas de fluxo.

**Solução:** Campos adicionais para rastreabilidade universal.

#### BacklogItem v2

```yaml
backlog_item:
  id: auto
  titulo: string
  descricao: string
  
  # NOVO - tipo expandido
  tipo: ciclo_epistemologico | desenvolvimento | bug | melhoria | documentacao
  
  # NOVO - timestamps completos
  timestamps:
    criado_em: datetime
    promovido_em: datetime?
    iniciado_em: datetime?
    validado_em: datetime?
    concluido_em: datetime?
  
  # NOVO - origem (se tipo == ciclo_epistemologico)
  origem:
    ms_pai: string?
    etapa: string?      # M3.E, M3.P, etc
    atributo: string?
    cardinalidade: string?
  
  # NOVO - referência para tracking detalhado
  ciclo_tracking_ref: ObjectId?
  
  # NOVO - métricas derivadas
  metricas:
    lead_time_min: number    # concluido - criado
    cycle_time_min: number   # concluido - promovido
    wait_time_min: number    # promovido - criado
  
  status: pendente | em_sprint | em_progresso | validando | concluido | rejeitado
  sprint_ref: string?
  prioridade: alta | media | baixa
```

#### Sprint v2

```yaml
sprint:
  codigo: string
  nome: string
  data_inicio: datetime
  data_fim: datetime
  status: ativa | concluida
  
  # NOVO - métricas agregadas
  metricas:
    total_itens: number
    concluidos: number
    rejeitados: number
    lead_time_medio_min: number
    cycle_time_medio_min: number
    throughput_dia: number
    por_tipo:
      ciclo_epistemologico: { total: n, concluidos: n, lead_time_medio: n }
      desenvolvimento: { total: n, concluidos: n, lead_time_medio: n }
      bug: { total: n, concluidos: n, lead_time_medio: n }
```

#### Novos Métodos

```yaml
Backlog:
  criar_ciclo_filho(ms_pai, atributo, M0_preenchido) → BacklogItem
  calcular_metricas(item_id) → Metricas

Sprint:
  agregar_metricas() → SprintMetricas
```

#### Arquivos Impactados

| Arquivo | Ação | Prioridade |
|---------|------|------------|
| docs/00_I/00_I_2_1_Backlog.md | UPDATE v1.x → v2.0 | Alta |
| docs/00_I/00_I_2_2_Sprint.md | UPDATE v1.x → v2.0 | Alta |
| docs/00_I/00_I_2_Gestao_Projetos.md | UPDATE - novos métodos | Média |

---

### 2.3 PROMETHEUS v3.0

**Problema:** Não consome specs orientadas a TDD nem gera testes automaticamente.

**Solução:** Workers por vertente M3.*, fluxo TDD embutido.

#### Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PROMETHEUS v3.0                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  INPUT: Specs [M3.E.yaml, M3.P.yaml?, M3.D.yaml?, M3.I.yaml, M3.C.yaml]     │
│                                                                             │
│  DISPATCHER                                                                 │
│  ├── Constrói DAG de dependências                                           │
│  ├── Roteia para Workers por vertente                                       │
│  └── Controla paralelismo                                                   │
│                                                                             │
│  WORKERS (TDD embutido)                                                     │
│  ├── WORKER_E: M3.E → .py + test_.py + .feature (se exposto)                │
│  │   1. Extrai classes_equivalencia                                         │
│  │   2. Calcula matriz (cartesiano ou pairwise)                             │
│  │   3. Gera testes (pytest + Karate)                                       │
│  │   4. Roda testes (falham)                                                │
│  │   5. Gera código                                                         │
│  │   6. Roda testes (passam)                                                │
│  │                                                                          │
│  ├── WORKER_P: M3.P → .bpmn + Karate (API Camunda)                          │
│  ├── WORKER_D: M3.D → .dmn + Karate (API Camunda)                           │
│  ├── WORKER_I: M3.I → Dockerfile, .yaml + health checks                     │
│  ├── WORKER_C: M3.C → .yaml, .env + validação schema                        │
│  └── WORKER_DOC: M4 → .md (README, CHANGELOG)                               │
│                                                                             │
│  INTEGRADOR                                                                 │
│  ├── Coleta outputs dos Workers                                             │
│  ├── Roda testes de integração                                              │
│  └── Monta Release Candidate                                                │
│                                                                             │
│  PUBLICADOR                                                                 │
│  ├── Cria branch de release                                                 │
│  ├── Gera CHANGELOG                                                         │
│  └── Notifica GENESIS                                                       │
│                                                                             │
│  OUTPUT: Release Candidate + Relatórios de Teste                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Geração de Testes (TDD)

```
Fórmula de Cobertura:
|Testes| = Σ método ∈ M [ ∏ input ∈ método (|classes_equivalencia(input)|) ]

Estratégias:
- Cartesiano: todos os testes (pode explodir)
- Pairwise: cobre pares (90% menos testes, 70-90% detecção bugs)

Ferramentas:
- pytest: sempre (unitário)
- Karate: se exposto == true (API/E2E)
```

#### Arquivos Impactados

| Arquivo | Ação | Prioridade |
|---------|------|------------|
| genesis/PROMETHEUS.md | UPDATE v2.0 → v3.0 | Alta |

---

### 2.4 GENESIS v4.0

**Problema:** Não valida capabilities nem orquestra ciclos epistemológicos.

**Solução:** Validador expandido + capability discovery.

#### Validador de Release

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS: VALIDADOR DE RELEASE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CHECKLIST:                                                                 │
│                                                                             │
│  1. SPEC ATENDIDA                                                           │
│     ├── M3.E: todas classes implementadas?                                  │
│     ├── M3.P: BPMN válido no Camunda?                                       │
│     ├── M3.D: DMN válido no Camunda?                                        │
│     └── M3.I: containers sobem?                                             │
│                                                                             │
│  2. CRITÉRIOS DE ACEITE                                                     │
│     └── Todos criterios_aceite cobertos por testes?                         │
│                                                                             │
│  3. COBERTURA DE TESTES                                                     │
│     ├── pytest: cobertura >= threshold?                                     │
│     ├── Karate: todos endpoints testados?                                   │
│     └── Matriz: cartesiano/pairwise respeitado?                             │
│                                                                             │
│  4. DOCUMENTAÇÃO                                                            │
│     ├── M4 gerado?                                                          │
│     └── README presente?                                                    │
│                                                                             │
│  OUTPUT: APROVADO → merge | REJEITADO → backlog com motivos                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Capability Discovery

```
Quando GENESIS recebe spec de produto (MS_Produto):

1. Analisa Features requeridas
2. Verifica capabilities disponíveis no Catálogo
3. SE capability existe → roteia para existente
4. SE capability NÃO existe → gera backlog:
   - tipo: ciclo_epistemologico
   - objetivo: desenvolver capability GENESIS
   - prioridade: bloqueante para o produto
```

#### Arquivos Impactados

| Arquivo | Ação | Prioridade |
|---------|------|------------|
| genesis/GENESIS.md | UPDATE v3.0 → v4.0 | Média |

---

### 2.5 MS_PRODUTO v2.0

**Problema:** Não integra com ciclo epistemológico nem rastreia capabilities.

**Solução:** Health Score expandido + ciclos pendentes visíveis.

#### Health Score Expandido

```yaml
HealthScore:
  indicadores:
    # Existentes...
    
    # NOVOS
    - nome: velocidade_especificacao
      fonte: ciclo_tracking
      calculo: "média(cycle_time) dos ciclos epistemológicos"
      peso: 0.15
      
    - nome: qualidade_specs
      fonte: ciclo_tracking
      calculo: "taxa aprovação primeira vez"
      peso: 0.10
```

#### Roadmap com Ciclos Pendentes

```yaml
Roadmap:
  ciclos_pendentes:
    - ms: MS_Criterio
      pai: MS_Release
      status: em_backlog
      bloqueando: Release v1.1
```

#### Arquivos Impactados

| Arquivo | Ação | Prioridade |
|---------|------|------------|
| docs/04_P/MS_Produto.md | UPDATE v1.x → v2.0 | Média |

---

### 2.6 MONGODB v2.0

**Problema:** Schemas não suportam specs M3.* nem tracking detalhado.

**Solução:** Novas collections + campos adicionais.

#### Novas Collections

```yaml
# Collection: specs
spec:
  _id: ObjectId
  ms_ref: string
  vertente: M3.E | M3.P | M3.D | M3.I | M3.C
  versao: string
  conteudo: Object
  status: rascunho | publicado | deprecado

# Collection: classes_equivalencia
classe_equivalencia:
  _id: ObjectId
  spec_ref: ObjectId
  classe: string
  atributo: string
  nome: string
  valor: any
  valido: boolean

# Collection: criterios_aceite
criterio_aceite:
  _id: ObjectId
  spec_ref: ObjectId
  classe: string
  metodo: string
  descricao: string
  coberto_por_teste: boolean
  teste_ref: ObjectId?

# Collection: ciclo_tracking
ciclo_tracking:
  _id: ObjectId
  backlog_item_ref: ObjectId
  ms_ref: string
  etapas:
    M0: { inicio: dt, fim: dt, responsavel: str }
    M1: { inicio: dt, fim: dt, responsavel: str }
    M2: { inicio: dt, fim: dt, responsavel: str }
    M3E: { inicio: dt, fim: dt, responsavel: str }
    M3P: { inicio: dt, fim: dt, responsavel: str }
    M3D: { inicio: dt, fim: dt, responsavel: str }
    M3I: { inicio: dt, fim: dt, responsavel: str }
    M3C: { inicio: dt, fim: dt, responsavel: str }
    M4: { inicio: dt, fim: dt, responsavel: str }
  metricas:
    lead_time_min: number
    cycle_time_min: number
    wait_time_min: number
```

#### Collections Alteradas

```yaml
# backlog_items v2
+tipo: enum
+timestamps: { criado_em, promovido_em, iniciado_em, validado_em, concluido_em }
+origem: { ms_pai, etapa, atributo, cardinalidade }
+ciclo_tracking_ref: ObjectId
+metricas: { lead_time_min, cycle_time_min, wait_time_min }

# sprints v2
+metricas: { total_itens, concluidos, rejeitados, lead_time_medio, throughput_dia, por_tipo }
```

#### Arquivos Impactados

| Arquivo | Ação | Prioridade |
|---------|------|------------|
| docs/00_I/00_I_1_3_MongoDB.md | UPDATE v1.2 → v2.0 | Alta |

---

## 3. Pontos Adicionais (não mencionados no seu resumo)

### 3.1 Estrutura Híbrida de Arquivos

```
docs/04_X/MS_Nome/
├── MS_Nome.md          # M0, M1, M2, M4 (narrativa para humanos)
├── M3/
│   ├── M3.E.yaml       # Spec estrutural (para máquina/PROMETHEUS)
│   ├── M3.P.yaml       # Spec processual
│   ├── M3.D.yaml       # Spec decisional
│   ├── M3.I.yaml       # Spec infra
│   └── M3.C.yaml       # Spec config
└── assets/
    └── diagrama.png
```

**Regra de Persistência:**
- `.md` → GitHub (legível)
- `.yaml` → GitHub (versionado) + sync para MongoDB (queryável)

### 3.2 Karate como Padrão para APIs

```
SE metodo.exposto == true:
    gerar pytest (unitário)
    gerar Karate (API/contrato)
SENÃO:
    gerar pytest (unitário apenas)
```

### 3.3 Cobertura Configurável

```yaml
cobertura: cartesiano | pairwise

# cartesiano: todos os testes (3×3×3 = 27)
# pairwise: cobre pares (~9-12 testes, 90% menos)

# Humano decide por método, baseado em criticidade
```

### 3.4 Estados do Backlog Item

```
PENDENTE → EM_SPRINT → EM_PROGRESSO → VALIDANDO → CONCLUIDO
                                        ↓
                                    REJEITADO → PENDENTE (loop)
```

---

## 4. Itens de Backlog Gerados

### Prioridade Alta (Bloqueantes)

| ID | Título | Tipo | Descrição |
|----|--------|------|-----------|
| BKL-001 | Epistemologia v4.0 - M3 Vertentes | doc | Refatorar M3 para suportar vertentes E/P/D/I/C |
| BKL-002 | Epistemologia v4.0 - TDD Schemas | doc | Adicionar classes_equivalencia e criterios_aceite |
| BKL-003 | Backlog v2.0 | doc | Campos tipo, timestamps, origem, metricas |
| BKL-004 | Sprint v2.0 | doc | Métricas agregadas por tipo |
| BKL-005 | MongoDB v2.0 - Schemas | doc+data | Novas collections + campos v2 |
| BKL-006 | MongoDB v2.0 - Migração | script | Migrar dados existentes para v2 |

### Prioridade Média

| ID | Título | Tipo | Descrição |
|----|--------|------|-----------|
| BKL-007 | PROMETHEUS v3.0 - Workers | doc | Workers por vertente M3.* |
| BKL-008 | PROMETHEUS v3.0 - TDD Flow | doc | Fluxo TDD embutido nos workers |
| BKL-009 | GENESIS v4.0 - Validador | doc | Checklist expandido de validação |
| BKL-010 | GENESIS v4.0 - Capability Discovery | doc | Verificação de capabilities |
| BKL-011 | MS_Produto v2.0 | doc | Health Score expandido |

### Prioridade Baixa

| ID | Título | Tipo | Descrição |
|----|--------|------|-----------|
| BKL-012 | Glossário v2.0 | doc | Novos termos (vertentes, TDD, etc) |
| BKL-013 | Gestão Projetos v2.0 | doc | Novos métodos de tracking |

---

## 5. Ordem de Execução Sugerida

```
Sprint S016: Fundação (schemas e tracking)
├── BKL-005: MongoDB v2.0 Schemas
├── BKL-006: MongoDB v2.0 Migração
├── BKL-003: Backlog v2.0
└── BKL-004: Sprint v2.0

Sprint S017: Epistemologia v4.0
├── BKL-001: M3 Vertentes
└── BKL-002: TDD Schemas

Sprint S018: Execução e Validação
├── BKL-007: PROMETHEUS Workers
├── BKL-008: PROMETHEUS TDD Flow
├── BKL-009: GENESIS Validador
└── BKL-010: GENESIS Capability

Sprint S019: Produto
├── BKL-011: MS_Produto v2.0
├── BKL-012: Glossário
└── BKL-013: Gestão Projetos
```

---

## 6. Definições Detalhadas para Execução

Cada item acima terá seu próprio documento de spec em `_backlog/specs/` quando for priorizado para sprint. O documento conterá:

- M0 pré-preenchido (derivado deste backlog)
- Critérios de aceite específicos
- Arquivos a modificar com seções exatas
- Schemas completos quando aplicável

---

## Histórico

| Data | Alteração |
|------|-----------|
| 2025-12-16 | Criação a partir do chat "Fábrica de código com LLM e epistemologia" |

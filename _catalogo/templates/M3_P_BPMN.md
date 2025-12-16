---
nome: Template M3.P - BPMN
id: template_spec_bpmn
versao: "1.0"
tipo: Template
vertente: M3.P
origem: interno
status: Publicado
etapa: M4
sprint_ref: S019
task_ref: T03
camada: C3
artefatos_produzidos:
  - ".bpmn"
  - "karate.feature"
  - "migration.json"
schema_tdd_obrigatorio: true
---

# Template M3.P - Especificação BPMN v1.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Template M3.P** | Modelo de especificação para vertente Processual (BPMN) |
| **Vertente Processual** | Especificação de workflows orquestrados |
| **BPMN** | Business Process Model and Notation |
| **Camunda** | Engine de execução de workflows BPMN |
| **Lane** | Responsável por um conjunto de atividades |
| **Gateway** | Ponto de decisão no fluxo |
| **Incident** | Erro que trava instância do processo |

### 1.2 Tese

> **Template M3.P é conhecimento catalogado que ensina Epistemologia a especificar Processos para implementação como workflows BPMN no Camunda.**
>
> - **Artefatos produzidos:** .bpmn, karate.feature, migration.json
> - **Schema TDD:** partições por gateway, critérios por path
> - **Operação:** migration_plan + error_handling obrigatórios
>
> **Persistência:** Conforme Epistemologia_Arquitetura.md

---

## 2. Marco Teórico (M1)

### 2.1 Referências

| Conceito | Fonte | Aplicação |
|----------|-------|-----------|
| **BPMN 2.0** | OMG Standard | Estrutura: Lanes, Tasks, Gateways, Events |
| **Camunda** | Camunda Docs | Tipos de Task, External Task pattern |
| **Path Coverage** | McCabe (1976) | Cobertura de caminhos no workflow |
| **Karate DSL** | Karate Labs | Formato de teste .feature |
| **Process Versioning** | Camunda Docs | migration_plan obrigatório |
| **Incident Handling** | Camunda Docs | error_handling obrigatório |
| **Schema TDD** | 00_E_1_7_Schema_TDD.md | Estrutura base adaptada |

### 2.2 Versionamento de Processo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VERSIONAMENTO CAMUNDA                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Comportamento:                                                             │
│  • Deploy de .bpmn cria nova versão (v1, v2, v3...)                         │
│  • Novas instâncias usam versão mais recente                                │
│  • Instâncias existentes CONTINUAM na versão antiga                         │
│                                                                             │
│  Problema:                                                                  │
│  • Instâncias em v1 ficam defasadas quando v2 é deployada                   │
│  • Bug fix em v2 não afeta instâncias em v1                                 │
│  • Operação precisa monitorar instâncias em versões antigas                 │
│                                                                             │
│  Solução na Spec:                                                           │
│  • OBRIGATÓRIO: migration_plan se versão > 1                                │
│  • Definir mapeamento de tasks entre versões                                │
│  • Definir estratégia: automático | manual | não_migrar                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Tratamento de Incidents

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INCIDENT HANDLING                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Comportamento:                                                             │
│  • Erro em task → cria Incident → instância TRAVA                           │
│  • Incident requer intervenção manual ou automática                         │
│  • Sem tratamento → instâncias acumulam travadas                            │
│                                                                             │
│  Tipos de erro:                                                             │
│  • Job failure: worker falhou (retry exausto)                               │
│  • Business error: erro esperado (boundary event)                           │
│  • Technical error: infra/timeout                                           │
│                                                                             │
│  Solução na Spec:                                                           │
│  • OBRIGATÓRIO: error_handling por task                                     │
│  • Definir retry policy (attempts, backoff)                                 │
│  • Definir fallback (boundary error event)                                  │
│  • Definir alerta para operação                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Mapeamento BPMN → Schema TDD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ELEMENTO BPMN             │  ELEMENTO SCHEMA TDD                           │
│  ──────────────────────────┼──────────────────────────────────────────────  │
│  Gateway (XOR/OR)          │  ClasseEquivalencia (partições por condição)   │
│  Condição do gateway       │  Particao (cada branch = partição)             │
│  Path (início → fim)       │  CriterioAceite (Given=input, Then=end state)  │
│  Variáveis de entrada      │  CriterioAceite.given                          │
│  Trigger (start event)     │  CriterioAceite.when                           │
│  Estado final              │  CriterioAceite.then                           │
│  Versão anterior           │  migration_plan (elemento adicional)           │
│  Erro em task              │  error_handling (retry, fallback, alerta)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| É | NÃO É |
|---|-------|
| Instruções para especificar BPMN | O arquivo .bpmn em si |
| Conhecimento catalogado | Código do worker |
| Checklist de elementos obrigatórios | Implementação do PROMETHEUS |
| Agnóstico à versão Camunda (7/8) | Específico para Camunda 7 ou 8 |
| Define O QUE extrair do Processo | Define COMO gerar .bpmn |
| Inclui estratégia de migração | Script de migração executável |
| Inclui estratégia de error handling | Código de retry/fallback |

### 3.2 Relações

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Catálogo ──indexa──► TEMPLATE M3.P ◄──consulta── Epistemologia (M3)        │
│                             │                                               │
│                             │ produz                                        │
│                             ▼                                               │
│                       SPEC (BPMN)                                           │
│                       + Schema TDD                                          │
│                       + migration_plan                                      │
│                       + error_handling                                      │
│                             │                                               │
│                             │ consumida por                                 │
│                             ▼                                               │
│                       PROMETHEUS (Worker_P)                                 │
│                             │                                               │
│                             │ gera                                          │
│                             ▼                                               │
│              .bpmn  │  karate.feature  │  migration.json                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3)

### 4.1 Elementos Obrigatórios

| Elemento | Descrição | Mapeamento Schema TDD |
|----------|-----------|----------------------|
| **processo_nome** | Nome do processo | schema_tdd.classe_ref |
| **lanes[]** | Lista de responsáveis | (informativo) |
| **tasks[]** | Atividades com tipo, lane, error_handling | (informativo) |
| **gateways[]** | Decisões com condições | schema_tdd.classes_equivalencia[] |
| **events[]** | Início, fim, intermediários | (informativo) |
| **paths[]** | Caminhos possíveis | schema_tdd.criterios_aceite[] |
| **variaveis_entrada[]** | Dados de input | CriterioAceite.given |
| **variaveis_saida[]** | Dados de output | CriterioAceite.then |
| **migration_plan?** | Se versão > 1 | (operação) |

### 4.2 Tipos Compostos

```yaml
Lane:
  id: string              # Identificador único
  nome: string            # Ex: "Vendedor", "Sistema"
  responsavel: string     # humano | sistema | externo

Task:
  id: string
  nome: string
  tipo: service | user | script | send | receive | business_rule
  lane_ref: string
  worker_topic?: string   # Para service tasks
  error_handling:         # OBRIGATÓRIO
    retry:
      attempts: number
      backoff: string     # ISO 8601 duration (PT5M)
    fallback?: string     # Boundary error event
    alerta?: string       # Quando escalar
    compensation?: string # Task de compensação

Gateway:
  id: string
  nome: string
  tipo: exclusive | parallel | inclusive | event
  condicoes:              # Lista de branches
    - branch: string
      expressao: string   # FEEL/JUEL
      destino: string

Event:
  id: string
  nome: string
  tipo: start | end | intermediate
  subtipo?: message | timer | error | signal | none
  config?: any            # Timer expression, etc.

MigrationPlan:
  versao_origem: string
  versao_destino: string
  estrategia: automatico | manual | nao_migrar
  mapeamento_tasks:
    - task_origem: string
      task_destino: string
      compativel: boolean
  instrucoes_manuais?: string
```

### 4.3 Instruções de Aplicação

#### PASSO 1: IDENTIFICAR LANES

```
Entrada: Processo M3 (diagrama de processo)
Ação: Identificar todos os responsáveis/atores
Saída: Lista de lanes

Perguntas guia:
• Quem são os atores envolvidos?
• Quais são sistemas vs humanos vs externos?
```

#### PASSO 2: MAPEAR TASKS

```
Entrada: Diagrama do processo
Ação: Para cada atividade, identificar tipo e responsável
Saída: Lista de tasks tipadas

Regras por tipo:
┌─────────────────────────────────────────────────────────────────────────────┐
│  ATIVIDADE                       │ TIPO DE TASK                            │
│  ────────────────────────────────┼───────────────────────────────────────  │
│  Sistema processa automaticamente│ service (External Task)                 │
│  Humano precisa agir             │ user                                    │
│  Script simples inline           │ script                                  │
│  Envia mensagem para outro       │ send                                    │
│  Aguarda mensagem externa        │ receive                                 │
│  Consulta regra DMN              │ business_rule                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### PASSO 3: DEFINIR ERROR HANDLING (POR TASK)

```
Entrada: Lista de tasks
Ação: Para cada task, definir estratégia de erro
Saída: error_handling preenchido em cada task

Perguntas guia:
• Quantas tentativas antes de falhar? (retry.attempts)
• Qual intervalo entre tentativas? (retry.backoff)
• O que fazer se falhar definitivamente? (fallback)
• Quando alertar operação? (alerta)
• Precisa compensar ações anteriores? (compensation)

Valores padrão sugeridos:
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIPO TASK     │ RETRY ATTEMPTS │ BACKOFF  │ FALLBACK                      │
│  ──────────────┼────────────────┼──────────┼─────────────────────────────  │
│  service       │ 3              │ PT5M     │ boundary_error ou alerta      │
│  user          │ N/A            │ N/A      │ timeout event                 │
│  business_rule │ 3              │ PT1M     │ default value                 │
│  send/receive  │ 5              │ PT10M    │ dead letter + alerta          │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### PASSO 4: MAPEAR GATEWAYS E CONDIÇÕES

```
Entrada: Diagrama do processo
Ação: Para cada ponto de decisão, identificar condições
Saída: Lista de gateways com condições

Regras por tipo de gateway:
┌─────────────────────────────────────────────────────────────────────────────┐
│  GATEWAY      │ COMPORTAMENTO              │ CONDIÇÕES                     │
│  ─────────────┼────────────────────────────┼─────────────────────────────  │
│  exclusive    │ Um único branch segue      │ Mutuamente exclusivas         │
│  parallel     │ Todos branches seguem      │ Sem condições (split/join)    │
│  inclusive    │ Um ou mais branches seguem │ Não exclusivas                │
│  event        │ Primeiro evento dispara    │ Por tipo de evento            │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### PASSO 5: GERAR CLASSES DE EQUIVALÊNCIA (POR GATEWAY)

```
Entrada: Lista de gateways com condições
Ação: Cada condição de gateway vira uma partição
Saída: schema_tdd.classes_equivalencia[]

Exemplo:
  Gateway: "Aprovação do Gerente" (exclusive)
  Condições: valor > 10000 → "precisa_diretor", else → "aprovado"

  ClasseEquivalencia:
    atributo: "gateway_aprovacao_gerente"
    tipo: "decision"
    particoes:
      - nome: "precisa_diretor"
        valores_exemplo: [{valor: 15000}, {valor: 50000}]
        valida: true
      - nome: "aprovado"
        valores_exemplo: [{valor: 1000}, {valor: 9999}]
        valida: true
      - nome: "fronteira"
        valores_exemplo: [{valor: 10000}, {valor: 10001}]
        valida: true
        fronteira: [10000, 10001]
```

#### PASSO 6: IDENTIFICAR PATHS

```
Entrada: Tasks, Gateways, Events
Ação: Enumerar todos os caminhos possíveis do start ao end
Saída: Lista de paths

Cada path = sequência de tasks/gateways do início ao fim

Exemplo:
  Path 1: Start → Receber Pedido → [valor<=10000] → Aprovar → End_Aprovado
  Path 2: Start → Receber Pedido → [valor>10000] → Escalar → Diretor Aprova → End_Aprovado
  Path 3: Start → Receber Pedido → [valor>10000] → Escalar → Diretor Rejeita → End_Rejeitado
```

#### PASSO 7: GERAR CRITÉRIOS DE ACEITE (POR PATH)

```
Entrada: Lista de paths + variáveis de entrada/saída
Ação: Para cada path, criar Given/When/Then
Saída: schema_tdd.criterios_aceite[]

Formato:
  - id: "PATH01"
    metodo: "processo_completo"
    given: "pedido com valor=5000"
    when: "processo é iniciado"
    then: "processo termina em End_Aprovado, status=aprovado"
    particoes_ref: ["aprovado"]
```

#### PASSO 8: VERIFICAR VERSÃO ANTERIOR

```
Entrada: Nome do processo
Ação: Verificar se existe versão anterior deployada
Saída: migration_plan (se houver versão anterior)

SE versão_anterior EXISTE:
  1. Listar tasks da versão antiga
  2. Mapear para tasks da versão nova
  3. Marcar compatibilidade de cada mapeamento
  4. Escolher estratégia:
     • automatico: se todas tasks compatíveis
     • manual: se algumas incompatíveis mas migráveis
     • nao_migrar: se incompatível (deixar v1 terminar naturalmente)
  5. Se manual: documentar instruções para operação
```

#### PASSO 9: DEFINIR COBERTURA

```
Entrada: Número de paths
Ação: Escolher estratégia de cobertura
Saída: schema_tdd.cobertura

Regras:
• ≤10 paths → cartesiano (testar todos)
• >10 paths → pairwise ou manual (paths críticos)
• Processo crítico (financeiro) → cartesiano sempre
```

#### PASSO 10: VALIDAR SPEC

```
Entrada: Spec completa
Ação: Aplicar checklist de validação
Saída: Spec validada ou lista de erros
```

### 4.4 Checklist de Validação

| ID | Verificação | Obrigatório |
|----|-------------|-------------|
| CK01 | Todas tasks têm tipo definido | ✓ |
| CK02 | Todas tasks têm lane_ref válido | ✓ |
| CK03 | Todas tasks têm error_handling definido | ✓ |
| CK04 | Gateways exclusivos têm condições mutuamente exclusivas | ✓ |
| CK05 | Todos gateways têm ≥2 saídas | ✓ |
| CK06 | Existe exatamente 1 start event | ✓ |
| CK07 | Existe ≥1 end event | ✓ |
| CK08 | Todos paths têm critério de aceite | ✓ |
| CK09 | Variáveis de entrada documentadas | ✓ |
| CK10 | Variáveis de saída documentadas | ✓ |
| CK11 | Cobertura definida | ✓ |
| CK12 | combinacoes_estimadas calculado | ✓ |
| CK13 | migration_plan definido SE versão > 1 | ✓ (condicional) |
| CK14 | Retry configurado para service tasks | ✓ |
| CK15 | Alertas definidos para tasks críticas | ○ |
| CK16 | Compensation definida para transações | ○ |

✓ = Obrigatório | ○ = Opcional

---

## 5. Exemplo de Aplicação

### 5.1 Entrada: Processo Aprovação de Pedido (M3)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    APROVAÇÃO DE PEDIDO                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Lanes: Vendedor, Sistema, Gerente, Diretor                                 │
│                                                                             │
│  Fluxo:                                                                     │
│  [Start] → Receber Pedido → <Valor?>                                        │
│                               │                                             │
│                    ≤10000     │    >10000                                   │
│                       ↓       │       ↓                                     │
│                   Aprovar   Escalar para Gerente                            │
│                       ↓              ↓                                      │
│                       │        <Gerente Aprova?>                            │
│                       │         Sim │  │ Não                                │
│                       │          ↓  │   ↓                                   │
│                       │    <Valor > 50000?>  Rejeitar                       │
│                       │      Sim│    │Não      ↓                            │
│                       │        ↓     ↓      [End_Rejeitado]                 │
│                       │  Escalar  Aprovar                                   │
│                       │  Diretor     │                                      │
│                       │     ↓        │                                      │
│                       │  <Diretor?>  │                                      │
│                       │  Sim │ Não   │                                      │
│                       │   ↓    ↓     │                                      │
│                       │ Aprovar Rej  │                                      │
│                       │   │     │    │                                      │
│                       └───┴─────┴────┘                                      │
│                              ↓                                              │
│                       [End_Aprovado]                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Saída: Spec com Schema TDD

```yaml
processo_nome: "AprovacaoPedido"
versao: "2"
vertente: "M3.P"

lanes:
  - id: "lane_vendedor"
    nome: "Vendedor"
    responsavel: "humano"
  - id: "lane_sistema"
    nome: "Sistema"
    responsavel: "sistema"
  - id: "lane_gerente"
    nome: "Gerente"
    responsavel: "humano"
  - id: "lane_diretor"
    nome: "Diretor"
    responsavel: "humano"

tasks:
  - id: "task_receber"
    nome: "Receber Pedido"
    tipo: "service"
    lane_ref: "lane_sistema"
    worker_topic: "pedido-receiver"
    error_handling:
      retry: {attempts: 3, backoff: "PT5M"}
      fallback: "boundary_error_receber"
      alerta: "Falha ao receber pedido após 3 tentativas"

  - id: "task_aprovar_auto"
    nome: "Aprovar Automaticamente"
    tipo: "service"
    lane_ref: "lane_sistema"
    worker_topic: "pedido-approver"
    error_handling:
      retry: {attempts: 3, backoff: "PT1M"}
      alerta: "Falha na aprovação automática"

  - id: "task_escalar_gerente"
    nome: "Escalar para Gerente"
    tipo: "user"
    lane_ref: "lane_gerente"
    error_handling:
      retry: null
      alerta: "Pedido aguardando gerente há mais de 24h"

  - id: "task_escalar_diretor"
    nome: "Escalar para Diretor"
    tipo: "user"
    lane_ref: "lane_diretor"
    error_handling:
      retry: null
      alerta: "Pedido aguardando diretor há mais de 48h"

  - id: "task_rejeitar"
    nome: "Rejeitar Pedido"
    tipo: "service"
    lane_ref: "lane_sistema"
    worker_topic: "pedido-rejector"
    error_handling:
      retry: {attempts: 3, backoff: "PT1M"}
      compensation: "task_notificar_vendedor"

gateways:
  - id: "gw_valor"
    nome: "Verificar Valor"
    tipo: "exclusive"
    condicoes:
      - branch: "baixo_valor"
        expressao: "valor <= 10000"
        destino: "task_aprovar_auto"
      - branch: "alto_valor"
        expressao: "valor > 10000"
        destino: "task_escalar_gerente"

  - id: "gw_gerente"
    nome: "Decisão Gerente"
    tipo: "exclusive"
    condicoes:
      - branch: "aprovado"
        expressao: "decisao_gerente == 'aprovar'"
        destino: "gw_valor_alto"
      - branch: "rejeitado"
        expressao: "decisao_gerente == 'rejeitar'"
        destino: "task_rejeitar"

  - id: "gw_valor_alto"
    nome: "Verificar Valor Alto"
    tipo: "exclusive"
    condicoes:
      - branch: "muito_alto"
        expressao: "valor > 50000"
        destino: "task_escalar_diretor"
      - branch: "medio"
        expressao: "valor <= 50000"
        destino: "end_aprovado"

  - id: "gw_diretor"
    nome: "Decisão Diretor"
    tipo: "exclusive"
    condicoes:
      - branch: "aprovado"
        expressao: "decisao_diretor == 'aprovar'"
        destino: "end_aprovado"
      - branch: "rejeitado"
        expressao: "decisao_diretor == 'rejeitar'"
        destino: "task_rejeitar"

events:
  - id: "start"
    nome: "Pedido Recebido"
    tipo: "start"
    subtipo: "message"
  - id: "end_aprovado"
    nome: "Pedido Aprovado"
    tipo: "end"
  - id: "end_rejeitado"
    nome: "Pedido Rejeitado"
    tipo: "end"

variaveis_entrada:
  - nome: "pedido_id"
    tipo: "string"
  - nome: "valor"
    tipo: "number"
  - nome: "cliente_id"
    tipo: "string"

variaveis_saida:
  - nome: "status"
    tipo: "string"
    valores: ["aprovado", "rejeitado"]
  - nome: "aprovador"
    tipo: "string"

# ============================================================================
# MIGRATION PLAN (versão 2 - existe versão 1)
# ============================================================================
migration_plan:
  versao_origem: "1"
  versao_destino: "2"
  estrategia: "manual"
  mapeamento_tasks:
    - task_origem: "task_receber_v1"
      task_destino: "task_receber"
      compativel: true
    - task_origem: "task_aprovar_v1"
      task_destino: "task_aprovar_auto"
      compativel: true
    - task_origem: "task_gerente_v1"
      task_destino: "task_escalar_gerente"
      compativel: false  # Mudou formulário
  instrucoes_manuais: |
    1. Identificar instâncias em task_gerente_v1
    2. Exportar dados do formulário antigo
    3. Completar task manualmente com dados migrados
    4. Instância continua na v2 a partir de gw_gerente

# ============================================================================
# SCHEMA TDD
# ============================================================================
schema_tdd:
  classe_ref: "AprovacaoPedido"

  classes_equivalencia:
    - atributo: "gw_valor"
      tipo: "decision"
      particoes:
        - nome: "baixo_valor"
          valores_exemplo: [{valor: 1000}, {valor: 9999}]
          valida: true
        - nome: "alto_valor"
          valores_exemplo: [{valor: 15000}, {valor: 50000}]
          valida: true
        - nome: "fronteira_10000"
          valores_exemplo: [{valor: 10000}, {valor: 10001}]
          valida: true
          fronteira: [10000, 10001]

    - atributo: "gw_gerente"
      tipo: "decision"
      particoes:
        - nome: "aprovado"
          valores_exemplo: [{decisao_gerente: "aprovar"}]
          valida: true
        - nome: "rejeitado"
          valores_exemplo: [{decisao_gerente: "rejeitar"}]
          valida: true

    - atributo: "gw_valor_alto"
      tipo: "decision"
      particoes:
        - nome: "muito_alto"
          valores_exemplo: [{valor: 60000}, {valor: 100000}]
          valida: true
        - nome: "medio"
          valores_exemplo: [{valor: 20000}, {valor: 50000}]
          valida: true
        - nome: "fronteira_50000"
          valores_exemplo: [{valor: 50000}, {valor: 50001}]
          valida: true
          fronteira: [50000, 50001]

    - atributo: "gw_diretor"
      tipo: "decision"
      particoes:
        - nome: "aprovado"
          valores_exemplo: [{decisao_diretor: "aprovar"}]
          valida: true
        - nome: "rejeitado"
          valores_exemplo: [{decisao_diretor: "rejeitar"}]
          valida: true

  criterios_aceite:
    - id: "PATH01"
      metodo: "processo_completo"
      given: "pedido com valor=5000"
      when: "processo é iniciado"
      then: "processo termina em End_Aprovado, aprovador='Sistema'"
      particoes_ref: ["baixo_valor"]

    - id: "PATH02"
      metodo: "processo_completo"
      given: "pedido com valor=20000, gerente aprova"
      when: "processo é iniciado"
      then: "processo termina em End_Aprovado, aprovador='Gerente'"
      particoes_ref: ["alto_valor", "gw_gerente.aprovado", "medio"]

    - id: "PATH03"
      metodo: "processo_completo"
      given: "pedido com valor=20000, gerente rejeita"
      when: "processo é iniciado"
      then: "processo termina em End_Rejeitado"
      particoes_ref: ["alto_valor", "gw_gerente.rejeitado"]

    - id: "PATH04"
      metodo: "processo_completo"
      given: "pedido com valor=60000, gerente aprova, diretor aprova"
      when: "processo é iniciado"
      then: "processo termina em End_Aprovado, aprovador='Diretor'"
      particoes_ref: ["alto_valor", "gw_gerente.aprovado", "muito_alto", "gw_diretor.aprovado"]

    - id: "PATH05"
      metodo: "processo_completo"
      given: "pedido com valor=60000, gerente aprova, diretor rejeita"
      when: "processo é iniciado"
      then: "processo termina em End_Rejeitado"
      particoes_ref: ["alto_valor", "gw_gerente.aprovado", "muito_alto", "gw_diretor.rejeitado"]

    - id: "PATH06_FRONTEIRA"
      metodo: "processo_completo"
      given: "pedido com valor=10000"
      when: "processo é iniciado"
      then: "processo termina em End_Aprovado (baixo valor)"
      particoes_ref: ["fronteira_10000"]

    - id: "PATH07_FRONTEIRA"
      metodo: "processo_completo"
      given: "pedido com valor=10001, gerente aprova"
      when: "processo é iniciado"
      then: "processo termina em End_Aprovado via gerente"
      particoes_ref: ["fronteira_10000", "gw_gerente.aprovado"]

  cobertura: "cartesiano"
  combinacoes_estimadas: 7  # 7 paths identificados
```

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_1_7_Schema_TDD.md | Schema TDD base |
| docs/00_E/00_E_1_4_Classe.md | Processo como Classe M3 |
| _catalogo/templates/M3_E_POO.md | Template irmão (POO) |
| docs/00_E/00_E_Epistemologia.md | Framework pai |

### Externas

| Referência | Aplicação |
|------------|-----------|
| OMG, "BPMN 2.0 Specification" | Elementos BPMN |
| Camunda Docs, "External Tasks" | Service Task pattern |
| Camunda Docs, "Process Versioning" | Migration plan |
| Camunda Docs, "Incidents" | Error handling |
| McCabe, "Cyclomatic Complexity" (1976) | Path coverage |
| Karate Labs, "Karate DSL" | Formato .feature |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | **Publicação M4.** Template para especificação de Processos BPMN. Inclui migration_plan e error_handling obrigatórios. Sprint S019/T03. |

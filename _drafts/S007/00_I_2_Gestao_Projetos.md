# Gestão de Projetos v0.2

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Gestão de Projetos** | Sistema que orquestra o ciclo de vida de entregas: captura → organização → execução → publicação |
| **Projeto** | Trabalho com objetivo e entregável definidos (pode ser documentação, marketing, produto, etc.) |
| **Backlog** | Subsistema de captura e organização de itens para execução futura |
| **Sprint** | Subsistema de execução estruturada com objetivo, tasks e entregáveis |
| **Ciclo de Vida** | Fluxo completo: Captura → Backlog → Sprint → Publicação |
| **Promoção** | Transição de item do Backlog para Sprint (decisão consciente de executar) |
| **Tipo de Projeto** | Classificação do domínio (Documentação, Marketing, CX, Produto, Vendas, Infra) |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como gerenciar o ciclo de vida de entregas (de qualquer tipo),            │
│   desde a captura da ideia até a publicação do resultado?"                  │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  CAPTURA            │  │  ORGANIZAÇÃO        │  │  EXECUÇÃO           │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Ideias se perdem    │  │ Itens sem estrutura │  │ Sem processo claro  │  │
│  │ durante conversas   │  │ priorização confusa │  │ tracking falho      │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                       GESTÃO DE PROJETOS                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │   ┌──────────┐   promover()   ┌──────────┐   publicar()  ┌──────┐  │    │
│  │   │ BACKLOG  │ ─────────────► │  SPRINT  │ ────────────► │ docs │  │    │
│  │   │ captura  │                │ execução │               │      │  │    │
│  │   │ organiza │                │ tasks    │               │      │  │    │
│  │   └──────────┘                └──────────┘               └──────┘  │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Aplicável a qualquer tipo de projeto:                                      │
│  Documentação, Marketing, CX, Produto, Vendas, Infra...                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Gestão de Projetos é o Meta Sistema que orquestra o ciclo de vida de entregas via dois subsistemas:**
>
> - **Backlog** - Captura e organiza itens para execução futura
> - **Sprint** - Executa trabalho de forma estruturada com entregáveis
>
> **A relação entre eles é a promoção:** decisão consciente de transformar ideia em compromisso de execução.
>
> **Agnóstico de domínio:** Funciona para documentação, marketing, produto, vendas, ou qualquer tipo de projeto.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Captura Imediata** | GTD (David Allen) | Backlog captura sem julgar |
| **Fluxo Puxado** | Kanban (Toyota) | Sprint puxa do Backlog quando há capacidade |
| **Timeboxing** | Scrum (Agile) | Sprint tem escopo fechado |
| **Incrementos** | Scrum (Agile) | Cada Sprint entrega algo publicável |
| **Notas Atômicas** | Zettelkasten (Luhmann) | Item de backlog = unidade independente |
| **WIP Limit** | Kanban | Uma Sprint ativa por vez |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MARCO TEÓRICO CONSOLIDADO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BACKLOG (GTD + Zettelkasten)        SPRINT (Scrum + Kanban)                │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ Captura imediata          │       │ Timebox com objetivo      │          │
│  │ Notas atômicas            │       │ WIP limit = 1             │          │
│  │ Sem julgamento inicial    │       │ Entrega incremental       │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                    │                           ▲                            │
│                    │        promover()         │                            │
│                    └───────────────────────────┘                            │
│                                                                             │
│  ORQUESTRAÇÃO: Gestão de Projetos decide QUANDO promover                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Adaptação para Contexto LLM

| Desafio LLM | Solução |
|-------------|---------|
| Contexto não persiste entre chats | Backlog com contexto suficiente para retomada |
| Conversa longa = entropia | Captura descarrega, mantém chat leve |
| Sessões curtas | Sprint com tasks atômicas |
| Múltiplos chats | Sprint file como "âncora" de sessão |

---

## 3. Objeto (M2)

### 3.1 Definição

**Gestão de Projetos** é o Meta Sistema que:
- **Orquestra** o ciclo Backlog → Sprint → Publicação
- **Define** a relação entre os subsistemas
- **Garante** rastreabilidade de origem e destino dos itens
- **Suporta** qualquer tipo de projeto via classificação opcional

### 3.2 Fronteiras

| Gestão de Projetos É | Gestão de Projetos NÃO É |
|-----------------------------|--------------------------------|
| Orquestrador de Backlog + Sprint | O próprio Backlog ou Sprint |
| Define ciclo de vida | Persistência de arquivos (isso é Git) |
| Rastreabilidade entre subsistemas | Estruturação de conhecimento (isso é Epistemologia) |
| Processo para LLM + Humano | Metodologia ágil completa |
| Agnóstico de domínio | Específico para software |

### 3.3 Tipos de Projeto (Lista Sugerida)

| Tipo | Exemplos de Entregáveis |
|------|-------------------------|
| `Documentação` | Specs, guias, manuais, este documento |
| `Marketing` | Campanha, landing page, material publicitário |
| `CX` | Jornada cliente, template atendimento, FAQ |
| `Produto` | Feature spec, protótipo, roadmap |
| `Vendas` | Pitch, proposta comercial, playbook |
| `Infra` | Fix, automação, tooling, scripts |
| `Outro` | Catch-all para casos não listados |

### 3.4 Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       GESTÃO DE PROJETOS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         BACKLOG                                     │    │
│  │                    (Subsistema Filho)                               │    │
│  │                                                                     │    │
│  │  Responsabilidade: Captura e organização                            │    │
│  │  Documento: docs/00_I/00_I_2_1_Backlog.md                           │    │
│  │  Métodos: capturar(), priorizar(), arquivar_item()                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                        │
│                                    │ promover()                             │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         SPRINT                                      │    │
│  │                    (Subsistema Filho)                               │    │
│  │                                                                     │    │
│  │  Responsabilidade: Execução estruturada                             │    │
│  │  Documento: docs/00_I/00_I_2_2_Sprint.md                            │    │
│  │  Métodos: iniciar(), executar(), publicar(), arquivar_sprint()      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Relações

| Componente | Relação | Descrição |
|------------|---------|-----------|
| **Backlog** | Filho | Subsistema de captura e organização |
| **Sprint** | Filho | Subsistema de execução |
| **Git** | Usa | Persistência de arquivos |
| **Epistemologia** | Aplica | Itens seguem M0-M4 quando aplicável |
| **Catálogo** | Indexa em | Itens publicados vão para o Catálogo |
| **GENESIS** | Subordinado a | Parte da infraestrutura que GENESIS orquestra |

---

## 4. Classe (M3)

### 4.1 Diagrama de Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CLASSE: GESTAO_PROJETOS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + backlog: Backlog              # referência ao subsistema                 │
│  + sprint_ativa: Sprint?         # no máximo 1 (WIP limit)                  │
│  + historico_sprints: [Sprint]   # sprints concluídas                       │
│  + tipos_projeto: [String]       # lista sugerida de tipos                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + promover(item: BacklogItem, codigo: String, tipo: String?): Sprint       │
│  + consultar_ciclo(): Diagrama                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  - WIP-SPRINT: Máximo 1 sprint ativa por vez                                │
│  - PROMOVER-CONSCIENTE: Promoção requer decisão explícita do usuário        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Método: promover()

```
┌─────────────────────────────────────────────────────────────────┐
│                        promover()                               │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - item: BacklogItem                                            │
│  - codigo: String (ex: "S008")                                  │
│  - tipo_projeto: String? (opcional, da lista sugerida)          │
│                                                                 │
│  Output: Sprint criada                                          │
│                                                                 │
│  Pré-condição: sprint_ativa == null (WIP limit)                 │
│                                                                 │
│  Passos:                                                        │
│  1. Verificar WIP limit (nenhuma sprint ativa)                  │
│  2. Backlog.atualizar_item(item, promovido_em: codigo,          │
│                            data_promocao: hoje)                 │
│  3. Sprint.iniciar(codigo, backlog_origem: item,                │
│                    tipo_projeto: tipo)                          │
│  4. self.sprint_ativa = nova_sprint                             │
│  5. Commit: [C2] promote: [item] → [sprint]                     │
│                                                                 │
│  IMPORTANTE: Este método ORQUESTRA os dois subsistemas.         │
│  A lógica específica está em Backlog e Sprint.                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Ciclo de Vida Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CICLO DE VIDA                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CAPTURA              ORGANIZAÇÃO           EXECUÇÃO           PUBLICAÇÃO   │
│  ────────             ───────────           ────────           ──────────   │
│                                                                             │
│  ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐   │
│  │ Ideia    │        │ Backlog  │        │  Sprint  │        │  docs/   │   │
│  │ detectada│──────► │ Item     │──────► │  Ativa   │──────► │          │   │
│  │          │capturar│ Pendente │promover│  Tasks   │publicar│          │   │
│  └──────────┘        └──────────┘        └──────────┘        └──────────┘   │
│       │                   │                   │                    │        │
│       ▼                   ▼                   ▼                    ▼        │
│   Backlog            Backlog              Sprint              Catálogo      │
│   .capturar()        (aguarda)            .executar()         .indexar()    │
│   data_criacao       prioridade           .publicar()                       │
│                                           .arquivar()                       │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  RASTREABILIDADE:                                                           │
│  BacklogItem.origem → onde surgiu                                           │
│  BacklogItem.data_criacao → quando capturou                                 │
│  BacklogItem.promovido_em → qual sprint                                     │
│  BacklogItem.data_promocao → quando promoveu                                │
│  BacklogItem.resolvido_em → onde concluiu                                   │
│  BacklogItem.data_resolucao → quando resolveu                               │
│  Sprint.backlog_origem → de onde veio                                       │
│  Sprint.tipo_projeto → classificação do domínio                             │
│  Sprint.data_prevista → deadline/meta                                       │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Artefatos

| Fase | Artefato | Local | Responsável |
|------|----------|-------|-------------|
| Captura | `[slug].md` | `_backlog/` | Backlog |
| Promoção | `[codigo]_[nome].md` | `_sprints/` | Gestão (orquestra) |
| Execução | `TXX_[nome].md` | `_drafts/[sprint]/` | Sprint |
| Publicação | `XX_X_X_[Nome].md` | `docs/` | Sprint |
| Arquivamento | Movimentações | Vários | Backlog + Sprint |

### 4.5 Referências aos Filhos

| Subsistema | Documento | Responsabilidade |
|------------|-----------|------------------|
| **Backlog** | `docs/00_I/00_I_2_1_Backlog.md` | Captura, organização, arquivamento de itens |
| **Sprint** | `docs/00_I/00_I_2_2_Sprint.md` | Execução, tasks, publicação, arquivamento de sprint |

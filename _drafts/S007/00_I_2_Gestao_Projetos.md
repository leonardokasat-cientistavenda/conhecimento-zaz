# Gestão de Projetos v0.3

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Gestão de Projetos** | Sistema orquestrador que disciplina o ciclo de vida de entregas via Backlog e Sprint |
| **Projeto** | Trabalho com objetivo e entregável definidos (pode ser documentação, marketing, produto, etc.) |
| **Backlog** | Subsistema de captura e organização de itens para execução futura |
| **Sprint** | Subsistema de execução estruturada com objetivo, tasks e entregáveis |
| **Ciclo de Vida** | Fluxo completo: Captura → Backlog → Sprint → Publicação |
| **Promoção** | Transição de item do Backlog para Sprint (decisão consciente de executar) |
| **Tipo de Projeto** | Classificação do domínio (Documentação, Marketing, CX, Produto, Vendas, Infra) |
| **Orquestrador** | Componente que coordena outros sem executar o trabalho diretamente |

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
│  │                      ORQUESTRADOR                                   │    │
│  │  - Disciplina regras (WIP limit, ciclo de vida)                     │    │
│  │  - Define relação entre subsistemas                                 │    │
│  │  - Coordena via promover()                                          │    │
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

> **Gestão de Projetos é o orquestrador que disciplina o ciclo de vida de entregas via dois subsistemas:**
>
> - **Backlog** - Captura e organiza itens para execução futura
> - **Sprint** - Executa trabalho de forma estruturada com entregáveis
>
> **Papel do orquestrador:**
> - Define **regras** (WIP limit = 1, ciclo de vida)
> - Define **relação** entre subsistemas (promoção)
> - **Não executa** trabalho diretamente - delega para filhos
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
| **Orquestração** | SOA/Microservices | Coordenador que não executa |

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
│                              ▲                                              │
│                              │                                              │
│                    ┌─────────┴─────────┐                                    │
│                    │   GESTÃO DE       │                                    │
│                    │   PROJETOS        │                                    │
│                    │   (Orquestrador)  │                                    │
│                    │                   │                                    │
│                    │ - Disciplina      │                                    │
│                    │ - Coordena        │                                    │
│                    │ - Não executa     │                                    │
│                    └───────────────────┘                                    │
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

**Gestão de Projetos** é o orquestrador que:
- **Disciplina** as regras do ciclo de vida (WIP limit, estados válidos)
- **Define** a relação entre Backlog e Sprint
- **Coordena** via método `promover()`
- **Não persiste** estado próprio - deriva de `_sprints/` e `_backlog/`

### 3.2 Fronteiras

| Gestão de Projetos É | Gestão de Projetos NÃO É |
|----------------------|--------------------------|
| Orquestrador de Backlog + Sprint | Executor de trabalho |
| Disciplinador de regras | Armazenador de estado |
| Coordenador de promoção | O próprio Backlog ou Sprint |
| Definidor de ciclo de vida | Persistência de arquivos (isso é Git) |
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

### 3.4 Estado Derivado (não persistido)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ESTADO DERIVADO vs PERSISTIDO                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GESTÃO DE PROJETOS não persiste estado próprio.                            │
│  Deriva informação das fontes de verdade:                                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ sprint_ativa                                                        │    │
│  │ ────────────                                                        │    │
│  │ DERIVADO DE: _sprints/*.md onde status == "Ativa"                   │    │
│  │ SSOT: pasta _sprints/                                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ historico_sprints                                                   │    │
│  │ ─────────────────                                                   │    │
│  │ DERIVADO DE: _sprints/*.md onde status == "Concluída"               │    │
│  │ SSOT: pasta _sprints/                                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ backlog_pendente                                                    │    │
│  │ ────────────────                                                    │    │
│  │ DERIVADO DE: _backlog/*.md onde status == "Pendente"                │    │
│  │ SSOT: pasta _backlog/                                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  SSOT = Single Source of Truth                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       GESTÃO DE PROJETOS                                    │
│                        (Orquestrador)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Responsabilidades:                                                         │
│  - Disciplinar regras (WIP limit, ciclo de vida)                            │
│  - Coordenar promoção de Backlog → Sprint                                   │
│  - Definir relação entre subsistemas                                        │
│                                                                             │
│  Documento: docs/00_I/00_I_2_Gestao_Projetos.md                             │
│  Método principal: promover()                                               │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         BACKLOG                                     │    │
│  │                    (Subsistema Filho)                               │    │
│  │                                                                     │    │
│  │  Responsabilidade: Captura e organização                            │    │
│  │  Documento: docs/00_I/00_I_2_1_Backlog.md                           │    │
│  │  SSOT: _backlog/                                                    │    │
│  │  Métodos: capturar(), priorizar(), arquivar_item()                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                        │
│                                    │ promover() [coordenado pelo pai]       │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         SPRINT                                      │    │
│  │                    (Subsistema Filho)                               │    │
│  │                                                                     │    │
│  │  Responsabilidade: Execução estruturada                             │    │
│  │  Documento: docs/00_I/00_I_2_2_Sprint.md                            │    │
│  │  SSOT: _sprints/                                                    │    │
│  │  Métodos: iniciar(), executar(), publicar(), arquivar()             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.6 Relações

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
│                        (Orquestrador)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos (DERIVADOS - não persistidos)                                    │
│  ───────────────────────────────────────                                    │
│  + sprint_ativa: Sprint?         # derivado de _sprints/ (status=Ativa)     │
│  + historico_sprints: [Sprint]   # derivado de _sprints/ (status=Concluída) │
│  + backlog_pendente: [Item]      # derivado de _backlog/ (status=Pendente)  │
│  + tipos_projeto: [String]       # lista sugerida (constante)               │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + promover(item: BacklogItem, codigo: String, tipo: String?): Sprint       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Regras Disciplinadas                                                       │
│  ────────────────────                                                       │
│  - WIP-SPRINT: Máximo 1 sprint ativa por vez                                │
│  - PROMOVER-CONSCIENTE: Promoção requer decisão explícita do usuário        │
│  - CICLO-VIDA: Captura → Backlog → Sprint → Publicação                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Método: promover()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            promover()                                       │
│                  (único método do orquestrador)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - item: BacklogItem                                                        │
│  - codigo: String (ex: "S008")                                              │
│  - tipo_projeto: String? (opcional, da lista sugerida)                      │
│  - data_prevista: Date? (opcional, deadline)                                │
│                                                                             │
│  Output: Sprint criada                                                      │
│                                                                             │
│  Pré-condição: sprint_ativa == null (WIP limit)                             │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ ORQUESTRAÇÃO: Este método COORDENA os dois subsistemas                │  │
│  │               Não executa o trabalho, delega para cada um             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Passos:                                                                    │
│  ────────                                                                   │
│  1. VERIFICAR WIP LIMIT                                                     │
│     Derivar sprint_ativa de _sprints/                                       │
│     Se existe → ERRO: "Conclua sprint ativa antes de promover"              │
│                                                                             │
│  2. DELEGAR PARA BACKLOG                                                    │
│     Backlog.atualizar_item(item,                                            │
│       promovido_em: codigo,                                                 │
│       data_promocao: hoje                                                   │
│     )                                                                       │
│                                                                             │
│  3. DELEGAR PARA SPRINT                                                     │
│     Sprint.iniciar(                                                         │
│       codigo: codigo,                                                       │
│       backlog_origem: item.path,                                            │
│       objetivo: item.titulo,                                                │
│       tipo_projeto: tipo,                                                   │
│       data_prevista: data_prevista                                          │
│     )                                                                       │
│                                                                             │
│  4. COMMIT                                                                  │
│     [C2] promote: [item.titulo] → [codigo]                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Regras Disciplinadas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      REGRAS DISCIPLINADAS                                   │
│            (Gestão de Projetos define, filhos obedecem)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ REGRA: WIP-SPRINT                                                     │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ Definição: Máximo 1 sprint ativa por vez                              │  │
│  │ Quem verifica: Gestão de Projetos (em promover())                     │  │
│  │ Consequência: Foco garantido, sem dispersão                           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ REGRA: PROMOVER-CONSCIENTE                                            │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ Definição: Promoção requer decisão explícita do usuário               │  │
│  │ Quem verifica: Gestão de Projetos                                     │  │
│  │ Consequência: Controle humano sobre o que vira sprint                 │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ REGRA: CICLO-VIDA                                                     │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ Definição: Captura → Backlog → Sprint → Publicação                    │  │
│  │ Quem implementa: Backlog (captura), Sprint (execução/publicação)      │  │
│  │ Consequência: Rastreabilidade completa de origem a destino            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ REGRA: ARQUIVAR-LIMPA                                                 │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ Definição: Arquivar sprint deixa workspace limpo                      │  │
│  │ Quem implementa: Sprint.arquivar()                                    │  │
│  │ Consequência: Entropia zero, pronto para próximo ciclo                │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Ciclo de Vida Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CICLO DE VIDA                                       │
│                  (disciplinado por Gestão de Projetos)                      │
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
│   Backlog            Backlog           Gestão Proj.            Sprint       │
│   .capturar()        (aguarda)         .promover()             .publicar()  │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  RASTREABILIDADE:                                                           │
│  BacklogItem.origem → onde surgiu                                           │
│  BacklogItem.data_criacao → quando capturou                                 │
│  BacklogItem.promovido_em → qual sprint (via promover())                    │
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

### 4.5 Artefatos (SSOT)

| Entidade | SSOT | Descrição |
|----------|------|-----------|
| Backlog Items | `_backlog/` | Pasta é a fonte de verdade |
| Sprints | `_sprints/` | Pasta é a fonte de verdade |
| Drafts | `_drafts/[sprint]/` | Workspace temporário da sprint ativa |
| Publicados | `docs/` | Destino final dos entregáveis |

### 4.6 Referências aos Filhos

| Subsistema | Documento | Responsabilidade |
|------------|-----------|------------------|
| **Backlog** | `docs/00_I/00_I_2_1_Backlog.md` | Captura, organização, arquivamento de itens |
| **Sprint** | `docs/00_I/00_I_2_2_Sprint.md` | Execução, tasks, publicação, arquivamento de sprint |

### 4.7 Extensibilidade Futura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      EXTENSIBILIDADE (YAGNI)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Porta aberta para futuro, não implementado agora:                          │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ ÉPICO (quando precisar)                                               │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ Quando: Múltiplos BacklogItems pertencerem a um mesmo "guarda-chuva"  │  │
│  │ Como: BacklogItem.epico_ref: String? (opcional)                       │  │
│  │ Estrutura futura:                                                     │  │
│  │   Gestão Projetos → Épico → BacklogItem → Sprint                      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Por enquanto: BacklogItem = unidade atômica de trabalho                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

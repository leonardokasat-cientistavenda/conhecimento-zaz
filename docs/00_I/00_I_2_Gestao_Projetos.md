---
titulo: "Gestão de Projetos"
versao: "1.0"
data_publicacao: "2025-12-08"
camada: 2
tipo: "Infraestrutura"
dominio: "Gestão"
tags:
  - gestao
  - projetos
  - backlog
  - sprint
  - orquestrador
depende_de:
  - docs/00_E/00_E_1_4_Catalogo.md
filhos:
  - docs/00_I/00_I_2_1_Backlog.md
  - docs/00_I/00_I_2_2_Sprint.md
---

# Gestão de Projetos v1.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Gestão de Projetos** | Orquestrador que disciplina o ciclo de vida de entregas via Backlog e Sprint |
| **Projeto** | Trabalho com objetivo e entregável definidos |
| **Backlog** | Subsistema de captura e organização |
| **Sprint** | Subsistema de execução estruturada |
| **Promoção** | Transição de item do Backlog para Sprint |
| **Tipo de Projeto** | Classificação do domínio (Documentação, Marketing, CX, Produto, Vendas, Infra) |
| **Orquestrador** | Componente que coordena outros sem executar o trabalho diretamente |
| **SSOT** | Single Source of Truth - fonte única de verdade |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como gerenciar o ciclo de vida de entregas, desde a captura da ideia      │
│   até a publicação do resultado?"                                           │
│                                                                             │
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
│  │  - Usa Catálogo para busca semântica                                │    │
│  │                                                                     │    │
│  │   ┌──────────┐   promover()   ┌──────────┐   publicar()  ┌──────┐  │    │
│  │   │ BACKLOG  │ ─────────────► │  SPRINT  │ ────────────► │ docs │  │    │
│  │   └──────────┘                └──────────┘               └──────┘  │    │
│  │         │                           │                               │    │
│  │         └───────────┬───────────────┘                               │    │
│  │                     ▼                                               │    │
│  │              ┌────────────┐                                         │    │
│  │              │  CATÁLOGO  │  (busca semântica)                      │    │
│  │              └────────────┘                                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Gestão de Projetos é o orquestrador que disciplina o ciclo de vida de entregas via dois subsistemas:**
>
> - **Backlog** - Captura e organiza itens
> - **Sprint** - Executa trabalho de forma estruturada
>
> **Usa Catálogo** como módulo de busca semântica para listar e pesquisar itens.
>
> **Papel:** Define regras, coordena promoção, delega busca para Catálogo.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Captura Imediata** | GTD | Backlog captura sem julgar |
| **Fluxo Puxado** | Kanban | Sprint puxa do Backlog |
| **Timeboxing** | Scrum | Sprint tem escopo fechado |
| **WIP Limit** | Kanban | Uma Sprint ativa por vez |
| **Orquestração** | SOA | Coordenador que não executa |
| **Reuso** | DRY | Catálogo como módulo compartilhado |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ARQUITETURA                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    ┌───────────────────────┐                                │
│                    │   GESTÃO DE PROJETOS  │                                │
│                    │    (Orquestrador)     │                                │
│                    └───────────┬───────────┘                                │
│                                │                                            │
│              ┌─────────────────┼─────────────────┐                          │
│              │                 │                 │                          │
│              ▼                 │                 ▼                          │
│     ┌─────────────┐            │        ┌─────────────┐                     │
│     │   BACKLOG   │  promover()│        │   SPRINT    │                     │
│     │   captura   │ ───────────┼──────► │   executa   │                     │
│     │   organiza  │            │        │   publica   │                     │
│     └──────┬──────┘            │        └──────┬──────┘                     │
│            │                   │               │                            │
│            │    ┌──────────────┴───────────────┘                            │
│            │    │                                                           │
│            ▼    ▼                                                           │
│     ┌─────────────────────────────────────────────┐                         │
│     │                 CATÁLOGO                    │                         │
│     │          (Módulo de Busca Semântica)        │                         │
│     │                                             │                         │
│     │  tipo: docs | backlog | sprint              │                         │
│     │  pesquisar(query, tipo?)                    │                         │
│     └─────────────────────────────────────────────┘                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**Gestão de Projetos** é o orquestrador que:
- **Disciplina** as regras do ciclo de vida
- **Define** a relação entre Backlog e Sprint
- **Coordena** via método `promover()`
- **Usa Catálogo** para busca semântica

### 3.2 Fronteiras

| É | NÃO É |
|---|-------|
| Orquestrador | Executor de trabalho |
| Disciplinador de regras | Implementador de busca |
| Coordenador de promoção | O próprio Backlog ou Sprint |
| Consumidor de Catálogo | Dono do Catálogo |

### 3.3 Tipos de Projeto (Lista Sugerida)

| Tipo | Exemplos |
|------|----------|
| `Documentação` | Specs, guias, manuais |
| `Marketing` | Campanha, landing page |
| `CX` | Jornada cliente, FAQ |
| `Produto` | Feature spec, protótipo |
| `Vendas` | Pitch, proposta |
| `Infra` | Fix, automação |
| `Outro` | Catch-all |

### 3.4 SSOT (Single Source of Truth)

| Entidade | SSOT | Indexado em |
|----------|------|-------------|
| Backlog | `_backlog/` | Catálogo (tipo: backlog) |
| Sprints | `_sprints/` | Catálogo (tipo: sprint) |
| Drafts | `_drafts/[sprint]/` | - |
| Publicados | `docs/` | Catálogo (tipo: docs) |

### 3.5 Relações

| Componente | Relação |
|------------|---------|
| **Backlog** | Filho - captura e organização |
| **Sprint** | Filho - execução |
| **Catálogo** | Usa - busca semântica |
| **Git** | Usa - persistência |
| **Epistemologia** | Aplica - M0-M4 quando aplicável |

---

## 4. Classe (M3)

### 4.1 Diagrama

```
┌─────────────────────────────────────────────────┐
│        CLASSE: GESTAO_PROJETOS                  │
│            (Orquestrador)                       │
├─────────────────────────────────────────────────┤
│  Atributos                                      │
│  ──────────                                     │
│  + tipos_projeto: [String]  # lista sugerida   │
│  + catalogo: Catalogo       # dependência      │
├─────────────────────────────────────────────────┤
│  Métodos                                        │
│  ────────                                       │
│  + listar_backlog(filtro?): [BacklogItem]       │
│  + listar_sprints(filtro?): [Sprint]            │
│  + promover(item, tipo?, data_prevista?): Sprint│
├─────────────────────────────────────────────────┤
│  Regras Disciplinadas                           │
│  ────────────────────                           │
│  - WIP-SPRINT: Máx 1 sprint ativa               │
│  - PROMOVER-CONSCIENTE: Decisão explícita       │
│  - CICLO-VIDA: Captura→Backlog→Sprint→Pub       │
│  - ARQUIVAR-LIMPA: Workspace limpo              │
├─────────────────────────────────────────────────┤
│  SSOT                                           │
│  ────                                           │
│  - Sprints: _sprints/                           │
│  - Backlog: _backlog/                           │
└─────────────────────────────────────────────────┘
```

### 4.2 Métodos

#### listar_backlog(filtro?)

```
┌─────────────────────────────────────────────────────────────────┐
│                     listar_backlog()                            │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - filtro: String? (query semântica opcional)                   │
│                                                                 │
│  Output: [BacklogItem]                                          │
│                                                                 │
│  Implementação:                                                 │
│  → Catalogo.pesquisar(query: filtro, tipo: "backlog")           │
│                                                                 │
│  Exemplo:                                                       │
│  - listar_backlog() → todos os itens pendentes                  │
│  - listar_backlog("infra") → itens relacionados a infra         │
└─────────────────────────────────────────────────────────────────┘
```

#### listar_sprints(filtro?)

```
┌─────────────────────────────────────────────────────────────────┐
│                     listar_sprints()                            │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - filtro: String? (query semântica opcional)                   │
│                                                                 │
│  Output: [Sprint]                                               │
│                                                                 │
│  Implementação:                                                 │
│  → Catalogo.pesquisar(query: filtro, tipo: "sprint")            │
│                                                                 │
│  Exemplo:                                                       │
│  - listar_sprints() → todas as sprints                          │
│  - listar_sprints("documentação") → sprints de docs             │
└─────────────────────────────────────────────────────────────────┘
```

#### promover(item, tipo?, data_prevista?)

```
┌─────────────────────────────────────────────────────────────────┐
│                        promover()                               │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - item: BacklogItem                                            │
│  - tipo_projeto: String? (opcional)                             │
│  - data_prevista: Date? (opcional)                              │
│                                                                 │
│  Output: Sprint criada (código gerado automaticamente)          │
│                                                                 │
│  Pré-condição: Nenhuma sprint ativa (WIP limit)                 │
│                                                                 │
│  Passos:                                                        │
│  1. Catalogo.pesquisar(tipo: "sprint", status: "Ativa")         │
│     Se encontrar → ERRO: "Conclua sprint ativa"                 │
│  2. Backlog.atualizar_item(promovido_em, data_promocao)         │
│  3. Sprint.iniciar(backlog_origem, objetivo, tipo)              │
│     (código gerado automaticamente)                             │
│  4. Commit: [C2] promote: [item] → [codigo]                     │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Regras Disciplinadas

| Regra | Descrição | Quem Implementa |
|-------|-----------|-----------------|
| **WIP-SPRINT** | Máx 1 sprint ativa | promover() verifica via Catálogo |
| **PROMOVER-CONSCIENTE** | Decisão explícita do usuário | promover() exige |
| **CICLO-VIDA** | Captura→Backlog→Sprint→Pub | Backlog + Sprint |
| **ARQUIVAR-LIMPA** | Workspace limpo ao concluir | Sprint.arquivar() |

### 4.4 Ciclo de Vida

```
┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐
│  Ideia   │──────► │ Backlog  │──────► │  Sprint  │──────► │  docs/   │
│          │capturar│          │promover│          │publicar│          │
└──────────┘        └──────────┘        └──────────┘        └──────────┘
                          │                   │                   │
                          └───────────────────┴───────────────────┘
                                              │
                                              ▼
                                       ┌────────────┐
                                       │  CATÁLOGO  │
                                       │  (índice)  │
                                       └────────────┘
```

### 4.5 Dependências

| Módulo | Uso |
|--------|-----|
| **Catálogo** | Busca semântica de backlog e sprints |

### 4.6 Referências aos Filhos

| Subsistema | Documento |
|------------|-----------|
| **Backlog** | `docs/00_I/00_I_2_1_Backlog.md` |
| **Sprint** | `docs/00_I/00_I_2_2_Sprint.md` |

### 4.7 Extensibilidade Futura (YAGNI)

Porta aberta para **Épico** quando necessário:
- `BacklogItem.epico_ref: String?` (opcional, não implementado)
- Estrutura futura: Gestão → Épico → BacklogItem → Sprint

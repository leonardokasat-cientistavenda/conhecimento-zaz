# Sprint v0.2

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Sprint** | Ciclo de trabalho focado com objetivo específico e entregáveis definidos |
| **Task** | Unidade atômica de trabalho dentro de uma Sprint (T01, T02...) |
| **Draft** | Arquivo em desenvolvimento durante Sprint (_drafts/) |
| **Publicação** | Transição de Draft para documento oficial (docs/) |
| **Arquivamento** | Conclusão de Sprint com limpeza do workspace |
| **Backlog Origem** | Item de backlog que originou a sprint |
| **Entregável** | Artefato final que a sprint produz |
| **WIP Limit** | Restrição de 1 sprint ativa por vez |
| **Tipo de Projeto** | Classificação do domínio (Documentação, Marketing, CX, etc.) |
| **Data Prevista** | Deadline/meta para conclusão da sprint |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA                                          │
│                                                                             │
│  "Como executar trabalho de forma estruturada, com tracking entre           │
│   sessões, deadlines claros e entregáveis definidos?"                       │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  SEM FOCO           │  │  TRACKING FALHO     │  │  WORKSPACE SUJO     │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Múltiplas coisas    │  │ Não sei onde parei  │  │ Arquivos de sprints │  │
│  │ ao mesmo tempo      │  │ entre sessões       │  │ antigas acumulam    │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO: SPRINT                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. WIP LIMIT = 1                                                           │
│     Uma sprint ativa por vez → Foco garantido                               │
│                                                                             │
│  2. SPRINT FILE COMO ÂNCORA                                                 │
│     Carrega no início de cada sessão → Retomada fácil                       │
│                                                                             │
│  3. DATA PREVISTA                                                           │
│     Deadline claro → Senso de urgência                                      │
│                                                                             │
│  4. ARQUIVAR LIMPA WORKSPACE                                                │
│     Drafts → docs/ ou backlog, patches → _archive/ → Entropia zero          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Sprint é o subsistema de Gestão de Projetos responsável por executar trabalho de forma estruturada.**
>
> - **WIP Limit** - Uma sprint ativa por vez (foco)
> - **Âncora de Sessão** - Sprint file carregado no início de cada chat
> - **Tipo de Projeto** - Classificação do domínio (opcional)
> - **Data Prevista** - Deadline/meta para manter foco
> - **Limpeza ao Arquivar** - Workspace pronto para próxima sprint
>
> **Relação:** Sprint recebe itens do Backlog via `promover()` e entrega em `docs/`.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação na Sprint |
|----------|--------|---------------------|
| **Timeboxing** | Scrum | Sprint tem escopo fechado e deadline |
| **WIP Limit** | Kanban | Uma coisa por vez |
| **Incrementos** | Agile | Cada sprint entrega algo publicável |
| **Definition of Done** | Scrum | Critérios claros de conclusão |
| **Retrospectiva** | Scrum | Aprender com cada sprint |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SPRINT: FUNDAMENTOS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SCRUM: Timeboxing + DoD             KANBAN: WIP Limit                      │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ Escopo fechado            │       │ Uma sprint por vez        │          │
│  │ Objetivo claro            │       │ Foco total                │          │
│  │ Critérios de conclusão    │       │ Fluxo contínuo            │          │
│  │ Data prevista (deadline)  │       │                           │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                                                                             │
│  ADAPTAÇÃO LLM:                                                             │
│  - Sprint file = âncora entre sessões                                       │
│  - Tasks atômicas = progresso incremental                                   │
│  - Arquivar = limpar contexto para próximo ciclo                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**Sprint** é o subsistema que:
- **Executa** trabalho estruturado com objetivo claro
- **Rastreia** progresso via tasks
- **Classifica** por tipo de projeto (opcional)
- **Define** deadline via data prevista
- **Publica** entregáveis em docs/
- **Limpa** workspace ao arquivar

### 3.2 Fronteiras

| Sprint É | Sprint NÃO É |
|----------|--------------|
| Execução estruturada | Captura de ideias (isso é Backlog) |
| Tasks com tracking | Lista de desejos |
| Entregável definido | Trabalho sem fim |
| Uma por vez (WIP limit) | Múltiplas paralelas |
| Com deadline (data prevista) | Sem prazo |

### 3.3 Tipos de Projeto (Lista Sugerida)

| Tipo | Exemplos de Entregáveis |
|------|-------------------------|
| `Documentação` | Specs, guias, manuais |
| `Marketing` | Campanha, landing page, material publicitário |
| `CX` | Jornada cliente, template atendimento, FAQ |
| `Produto` | Feature spec, protótipo, roadmap |
| `Vendas` | Pitch, proposta comercial, playbook |
| `Infra` | Fix, automação, tooling, scripts |
| `Outro` | Catch-all para casos não listados |

### 3.4 Estrutura de Armazenamento

```
_sprints/
├── S007_Gestao_Projetos.md          ← Sprint file (âncora)
├── S006-C_Catalogo_MVP.md           ← Histórico (concluída)
└── ...

_drafts/
└── S007/                            ← Workspace da sprint ativa
    ├── 00_I_2_Gestao_Projetos.md
    ├── 00_I_2_1_Backlog.md
    └── 00_I_2_2_Sprint.md

_patches/
├── 010_S007_xxx.md                  ← Patches da sprint ativa
├── _archive/
│   └── S006/                        ← Patches de sprints concluídas
│       └── 005_S006_xxx.md
```

### 3.5 Relações

| Componente | Relação | Descrição |
|------------|---------|-----------|
| **Gestão de Projetos** | Pai | Sprint é subsistema filho |
| **Backlog** | Irmão | Fornece itens via promover() |
| **Git** | Usa | Persistência de arquivos |
| **docs/** | Destino | Onde entregáveis são publicados |

---

## 4. Classe (M3)

### 4.1 Classe: Task

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: TASK                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + codigo: String                    # T01, T02, etc.                       │
│  + descricao: String                 # o que fazer                          │
│  + status: Enum                      # ⬜ Pendente | 🔄 Em progresso | ✅    │
│  + artefatos: [Path]                 # arquivos gerados                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Estados                                                                    │
│  ───────                                                                    │
│  ⬜ Pendente ──iniciar()──► 🔄 Em progresso ──concluir()──► ✅ Concluída    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Classe: Sprint

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: SPRINT                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + codigo: String                    # S007, S008, etc.                     │
│  + objetivo: String                  # o que entregar                       │
│  + backlog_origem: Path              # de onde veio                         │
│  + tipo_projeto: String?             # opcional, da lista sugerida          │
│  + status: Enum                      # Ativa | Concluída                    │
│  + tasks: [Task]                     # lista de trabalhos                   │
│  + entregavel: Path                  # onde vai parar em docs/              │
│  + data_inicio: Date                 # quando começou                       │
│  + data_prevista: Date?              # deadline/meta                        │
│  + data_fim: Date?                   # quando terminou                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Estados                                                                    │
│  ───────                                                                    │
│  (não existe) ──iniciar()──► Ativa ──arquivar()──► Concluída                │
│                                │                                            │
│                                │ (WIP limit = 1)                            │
│                                ▼                                            │
│                         Apenas 1 sprint                                     │
│                         ativa por vez                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + iniciar(codigo, backlog_origem, objetivo, tipo?, data_prevista?): Sprint │
│  + executar(task): void                                                     │
│  + publicar(draft, destino): void                                           │
│  + arquivar(): void                                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Estrutura do Sprint File

```yaml
# _sprints/S007_Gestao_Projetos.md
---
codigo: S007
objetivo: "Criar sistema de Gestão de Projetos com Backlog + Sprint"
backlog_origem: _backlog/processo_sprint.md
tipo_projeto: Documentação            # opcional
status: Ativa
data_inicio: 2025-12-07
data_prevista: 2025-12-10             # deadline/meta
data_fim: null                        # preenchido ao arquivar
entregavel: docs/00_I/00_I_2_Gestao_Projetos.md
---

## Contexto

[Repo, branch, instruções de carregamento]

## Tasks

| # | Descrição | Status | Artefatos |
|---|-----------|--------|-----------|
| T01 | M0-M3 Gestão de Projetos | ✅ | _drafts/S007/00_I_2_Gestao_Projetos.md |
| T02 | M0-M3 Backlog | ✅ | _drafts/S007/00_I_2_1_Backlog.md |
| T03 | M0-M3 Sprint | ✅ | _drafts/S007/00_I_2_2_Sprint.md |
| T04 | Revisão e ajustes | ⬜ | |
| T05 | M4 - Publicar | ⬜ | |
| T06 | Arquivar sprint | ⬜ | |

## Referências

[Documentos relacionados]
```

### 4.4 Métodos

#### iniciar(codigo, backlog_origem, objetivo, tipo_projeto?, data_prevista?)

```
┌─────────────────────────────────────────────────────────────────┐
│                        iniciar()                                │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - codigo: String (ex: "S008")                                  │
│  - backlog_origem: Path (item que originou)                     │
│  - objetivo: String                                             │
│  - tipo_projeto: String? (opcional, da lista sugerida)          │
│  - data_prevista: Date? (opcional, deadline)                    │
│                                                                 │
│  Output: Sprint criada                                          │
│                                                                 │
│  Pré-condição: Nenhuma sprint ativa (WIP limit)                 │
│                                                                 │
│  Passos:                                                        │
│  1. Verificar WIP limit                                         │
│  2. Criar _sprints/[codigo]_[nome].md com:                      │
│     - data_inicio: hoje                                         │
│     - data_prevista: informada ou null                          │
│     - tipo_projeto: informado ou null                           │
│  3. Criar pasta _drafts/[codigo]/                               │
│  4. Definir tasks iniciais                                      │
│  5. Commit: [C2] add: Sprint [codigo] - [objetivo]              │
└─────────────────────────────────────────────────────────────────┘
```

#### executar(task)

```
┌─────────────────────────────────────────────────────────────────┐
│                        executar()                               │
├─────────────────────────────────────────────────────────────────┤
│  Input: task (Task)                                             │
│  Output: Artefatos criados, task atualizada                     │
│                                                                 │
│  Contexto: Durante sessão de trabalho                           │
│                                                                 │
│  Passos:                                                        │
│  1. Carregar sprint file no início da sessão                    │
│  2. Identificar task: ⬜ → 🔄                                    │
│  3. Criar artefatos em _drafts/[sprint]/                        │
│  4. Commit por artefato: [CX] add: [desc] - [sprint]/[task]     │
│  5. Ao concluir: 🔄 → ✅                                         │
│  6. Atualizar sprint file                                       │
└─────────────────────────────────────────────────────────────────┘
```

#### publicar(draft, destino)

```
┌─────────────────────────────────────────────────────────────────┐
│                        publicar()                               │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - draft: Path (arquivo em _drafts/)                            │
│  - destino: Path (local em docs/)                               │
│                                                                 │
│  Output: Arquivo publicado em docs/                             │
│                                                                 │
│  Pré-condição: Draft completo                                   │
│                                                                 │
│  Passos:                                                        │
│  1. Validar draft está completo                                 │
│  2. Adicionar frontmatter de roteamento (se aplicável)          │
│  3. Mover _drafts/[sprint]/[arquivo] → docs/[destino]           │
│  4. Atualizar frontmatter: status → Publicado                   │
│  5. Indexar no Catálogo (se aplicável)                          │
│  6. Commit: [CX] publish: [nome] - [sprint]                     │
└─────────────────────────────────────────────────────────────────┘
```

#### arquivar()

```
┌─────────────────────────────────────────────────────────────────┐
│                        arquivar()                               │
├─────────────────────────────────────────────────────────────────┤
│  Input: (self - a sprint sendo arquivada)                       │
│  Output: Workspace limpo, sprint marcada concluída              │
│                                                                 │
│  OBJETIVO: Reduzir entropia, preparar para próxima sprint       │
│                                                                 │
│  Passos:                                                        │
│                                                                 │
│  1. DRAFTS FINALIZADOS                                          │
│     _drafts/[sprint]/*.md (completos) → docs/                   │
│     Usar publicar() para cada                                   │
│                                                                 │
│  2. DRAFTS INCOMPLETOS                                          │
│     _drafts/[sprint]/*.md (incompletos) → _backlog/             │
│     Viram novos itens de backlog (não perde trabalho)           │
│                                                                 │
│  3. PATCHES                                                     │
│     _patches/0XX_[sprint]_*.md → _patches/_archive/[sprint]/    │
│     Histórico preservado, raiz limpa                            │
│                                                                 │
│  4. BACKLOG ORIGEM                                              │
│     Atualizar item:                                             │
│       - resolvido_em: [sprint]                                  │
│       - data_resolucao: hoje                                    │
│     Mover para _backlog/_archive/                               │
│                                                                 │
│  5. SPRINT FILE                                                 │
│     status: Concluída                                           │
│     data_fim: hoje                                              │
│     Mantém em _sprints/ (histórico)                             │
│                                                                 │
│  6. PASTA DRAFTS                                                │
│     Deletar _drafts/[sprint]/ (já vazia)                        │
│                                                                 │
│  7. COMMIT FINAL                                                │
│     [C2] archive: [sprint] concluída                            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  RESULTADO:                                                     │
│  ✅ _drafts/ vazio                                               │
│  ✅ _patches/ raiz limpa                                         │
│  ✅ docs/ atualizado                                             │
│  ✅ _backlog/ atualizado + arquivado                             │
│  ✅ _sprints/ com histórico                                      │
│  ─────────────────────────────────────────────────────────────  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Restrições

| Restrição | Regra | Consequência |
|-----------|-------|--------------|
| **WIP-SPRINT** | Máximo 1 sprint ativa | Foco garantido |
| **BACKLOG-ORIGEM** | Toda sprint tem backlog_origem | Rastreabilidade |
| **ENTREGAVEL-DEFINIDO** | Sprint tem entregável claro | Definition of Done |
| **ARQUIVAR-LIMPA** | Arquivar deixa workspace limpo | Entropia zero |

### 4.6 Ciclo de Vida da Sprint

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CICLO DE VIDA DA SPRINT                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BACKLOG                                                                    │
│     │                                                                       │
│     │ promover()                                                            │
│     ▼                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         SPRINT ATIVA                                 │   │
│  │                                                                      │   │
│  │   iniciar() ──► executar(T01) ──► executar(T02) ──► ... ──►         │   │
│  │                                                                      │   │
│  │   Sessão 1: Carrega sprint file, trabalha em tasks                   │   │
│  │   Sessão 2: Carrega sprint file, continua de onde parou              │   │
│  │   Sessão N: Carrega sprint file, finaliza tasks                      │   │
│  │                                                                      │   │
│  │   ┌─────────────────────────────────────────────────────────────┐    │   │
│  │   │ DATAS                                                       │    │   │
│  │   │ data_inicio: quando começou                                 │    │   │
│  │   │ data_prevista: deadline/meta (foco)                         │    │   │
│  │   │ data_fim: quando arquivou                                   │    │   │
│  │   └─────────────────────────────────────────────────────────────┘    │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│     │                                                                       │
│     │ arquivar()                                                            │
│     ▼                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                       SPRINT CONCLUÍDA                               │   │
│  │                                                                      │   │
│  │   - Entregáveis em docs/                                             │   │
│  │   - Workspace limpo                                                  │   │
│  │   - Histórico preservado                                             │   │
│  │   - Pronto para próxima sprint                                       │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

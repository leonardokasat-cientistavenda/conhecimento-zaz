---
titulo: "Sprint"
versao: "1.0"
data_publicacao: "2025-12-08"
camada: 2
tipo: "Infraestrutura"
dominio: "Gestão"
tags:
  - sprint
  - execucao
  - gestao
  - projetos
pai: docs/00_I/00_I_2_Gestao_Projetos.md
depende_de:
  - docs/00_E/00_E_1_4_Catalogo.md
---

# Sprint v1.0

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
└──────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO: SPRINT                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. WIP LIMIT = 1                                                           │
│     Uma sprint ativa por vez → Foco garantido                               │
│                                                                             │
│  2. CÓDIGO AUTOMÁTICO                                                       │
│     Sistema gera próximo código (S007 → S008)                               │
│                                                                             │
│  3. INDEXAÇÃO NO CATÁLOGO                                                   │
│     Busca semântica via Catálogo (tipo: sprint)                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Sprint é o subsistema de Gestão de Projetos responsável por executar trabalho de forma estruturada.**
>
> - **WIP Limit** - Uma sprint ativa por vez (foco)
> - **Código automático** - Sistema gera sequencialmente
> - **Indexado no Catálogo** - Busca semântica disponível
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
| **Busca Semântica** | IR/NLP | Catálogo permite encontrar sprints |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SPRINT: FUNDAMENTOS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SCRUM + KANBAN                      CATÁLOGO                               │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ Escopo fechado            │       │ Indexa sprints            │          │
│  │ WIP limit = 1             │ ────► │ Busca semântica           │          │
│  │ Data prevista             │       │ tipo: sprint              │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**Sprint** é o subsistema que:
- **Executa** trabalho estruturado com objetivo claro
- **Gera** código automaticamente (sequencial)
- **Rastreia** progresso via tasks
- **Indexa** no Catálogo para busca semântica
- **Publica** entregáveis em docs/

### 3.2 Fronteiras

| Sprint É | Sprint NÃO É |
|----------|--------------|
| Execução estruturada | Captura de ideias (isso é Backlog) |
| Código gerado automaticamente | Código definido manualmente |
| Indexada no Catálogo | Implementador de busca |
| Uma por vez (WIP limit) | Múltiplas paralelas |

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

### 3.4 Estrutura de Armazenamento

```
_sprints/
├── S007_Gestao_Projetos.md          ← Sprint file (âncora)
├── S006_Catalogo_MVP.md             ← Histórico (concluída)
└── ...

_drafts/
└── S007/                            ← Workspace da sprint ativa
    ├── 00_I_2_Gestao_Projetos.md
    ├── 00_I_2_1_Backlog.md
    └── 00_I_2_2_Sprint.md
```

### 3.5 Relações

| Componente | Relação |
|------------|---------|
| **Gestão de Projetos** | Pai - orquestra |
| **Backlog** | Irmão - fornece itens |
| **Catálogo** | Usa - indexação e busca |
| **Git** | Usa - persistência |
| **docs/** | Destino - entregáveis |

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
│  + codigo: String                    # S007, S008 (gerado automaticamente)  │
│  + objetivo: String                  # o que entregar                       │
│  + backlog_origem: Path              # de onde veio                         │
│  + tipo_projeto: String?             # opcional                             │
│  + status: Enum                      # Ativa | Concluída                    │
│  + tasks: [Task]                     # lista de trabalhos                   │
│  + data_inicio: Date                 # quando começou                       │
│  + data_prevista: Date?              # deadline/meta                        │
│  + data_fim: Date?                   # quando terminou                      │
│  + catalogo: Catalogo                # dependência                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Públicos                                                           │
│  ────────────────                                                           │
│  + iniciar(backlog_origem, objetivo, tipo?, data_prevista?): Sprint         │
│  + executar(task): void                                                     │
│  + publicar(draft, destino): void                                           │
│  + arquivar(): void                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Internos                                                           │
│  ────────────────                                                           │
│  - gerar_codigo(): String                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Estrutura do Sprint File

```yaml
# _sprints/S008_Nome_Sprint.md
---
codigo: S008
objetivo: "Descrição do objetivo"
backlog_origem: _backlog/item_origem.md
tipo_projeto: Documentação
status: Ativa
data_inicio: 2025-12-10
data_prevista: 2025-12-15
data_fim: null
---

## Tasks

| # | Descrição | Status | Artefatos |
|---|-----------|--------|-----------|
| T01 | Primeira tarefa | ⬜ | |
| T02 | Segunda tarefa | ⬜ | |

## Referências

[Documentos relacionados]
```

### 4.4 Métodos

#### gerar_codigo() - Interno

```
┌─────────────────────────────────────────────────────────────────┐
│                      gerar_codigo()                             │
│                        (interno)                                │
├─────────────────────────────────────────────────────────────────┤
│  Output: String (ex: "S008")                                    │
│                                                                 │
│  Passos:                                                        │
│  1. Buscar última sprint no Catálogo:                           │
│     Catalogo.pesquisar(                                         │
│       tipo: "sprint",                                           │
│       ordenar: "codigo DESC",                                   │
│       limite: 1                                                 │
│     )                                                           │
│                                                                 │
│  2. Extrair número:                                             │
│     "S007" → 7                                                  │
│                                                                 │
│  3. Incrementar:                                                │
│     7 + 1 = 8                                                   │
│                                                                 │
│  4. Formatar:                                                   │
│     8 → "S008" (zero-padded 3 dígitos)                          │
│                                                                 │
│  Fallback: Se não encontrar nenhuma sprint → "S001"             │
└─────────────────────────────────────────────────────────────────┘
```

#### iniciar() - Público

```
┌─────────────────────────────────────────────────────────────────┐
│                        iniciar()                                │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - backlog_origem: Path                                         │
│  - objetivo: String                                             │
│  - tipo_projeto: String? (opcional)                             │
│  - data_prevista: Date? (opcional)                              │
│                                                                 │
│  Output: Sprint criada                                          │
│                                                                 │
│  Passos:                                                        │
│  1. codigo = gerar_codigo()           # automático              │
│  2. Criar _sprints/[codigo]_[slug].md                           │
│  3. Criar pasta _drafts/[codigo]/                               │
│  4. Indexar no Catálogo (tipo: sprint)                          │
│  5. Commit: [C2] add: Sprint [codigo] - [objetivo]              │
│  6. Confirmar: "Sprint [codigo] criada: [objetivo]"             │
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
│  Passos:                                                        │
│  1. Mover _drafts/[sprint]/[arquivo] → docs/[destino]           │
│  2. Indexar no Catálogo (tipo: docs)                            │
│  3. Commit: [CX] publish: [nome]                                │
└─────────────────────────────────────────────────────────────────┘
```

#### arquivar()

```
┌─────────────────────────────────────────────────────────────────┐
│                        arquivar()                               │
├─────────────────────────────────────────────────────────────────┤
│  OBJETIVO: Reduzir entropia, preparar para próxima sprint       │
│                                                                 │
│  Passos:                                                        │
│                                                                 │
│  1. DRAFTS FINALIZADOS → docs/ (via publicar())                 │
│                                                                 │
│  2. DRAFTS INCOMPLETOS → _backlog/ (não perde trabalho)         │
│                                                                 │
│  3. BACKLOG ORIGEM                                              │
│     - resolvido_em: [sprint]                                    │
│     - data_resolucao: hoje                                      │
│     - Mover para _backlog/_archive/                             │
│                                                                 │
│  4. SPRINT FILE                                                 │
│     - status: Concluída                                         │
│     - data_fim: hoje                                            │
│     - Atualizar índice no Catálogo                              │
│                                                                 │
│  5. PASTA DRAFTS                                                │
│     Deletar _drafts/[sprint]/                                   │
│                                                                 │
│  RESULTADO: Workspace limpo                                     │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Restrições

| Restrição | Regra |
|-----------|-------|
| **WIP-SPRINT** | Máx 1 sprint ativa |
| **CODIGO-AUTOMATICO** | Gerado sequencialmente pelo sistema |
| **BACKLOG-ORIGEM** | Toda sprint tem origem |
| **ARQUIVAR-LIMPA** | Workspace limpo ao concluir |
| **INDEXAR-CATALOGO** | Sprint é indexada ao iniciar |

### 4.6 Dependências

| Módulo | Uso |
|--------|-----|
| **Catálogo** | Busca última sprint + indexação |

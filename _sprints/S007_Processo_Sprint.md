# Sprint S007: Processo de Sprint

## CONTEXTO

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Branch: main

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## SPRINT ATUAL: S007

**Objetivo:** Aplicar método epistemológico (M0-M4) ao conceito de Sprint

**Entregável Final:** `docs/00_I/00_I_2_Processo_Sprint.md`

**Método:** Seguir ciclo M0 → M1 → M2 → M3 → M4, adicionando conteúdo via patch neste documento

---

## CICLO M0-M4

| Etapa | Descrição | Status |
|-------|-----------|--------|
| M0 | Problema + Glossário + Tese | ✅ |
| M1 | Marco Teórico | ✅ |
| M2 | Objeto (fronteiras) | ✅ |
| M3 | Classe (atributos, métodos) | ✅ |
| M4 | Documento Final | ⬜ |

---

## INSTRUÇÕES PARA CADA ETAPA

### M0: Problema

Responder:
1. **Glossário:** Definir Sprint, Task, Backlog, Promover, Arquivar
2. **Problema:** Qual problema Sprint resolve? Por que precisamos disso?
3. **Sintomas:** O que acontece sem processo formal?
4. **Tese:** Uma frase que capture a essência

### M1: Marco Teórico

Responder:
1. **Fundamentos:** Scrum, Kanban, ciclos iterativos
2. **Adaptação:** Como adaptar para contexto LLM + sessões curtas?
3. **Conceitos chave:** Timeboxing, incrementos, retrospectiva

### M2: Objeto

Responder:
1. **É / NÃO É:** O que é uma Sprint GENESIS vs. o que não é
2. **Fronteiras:** Onde termina Sprint e começa Backlog? E Task?
3. **Relações:** Como Sprint se relaciona com outros conceitos

### M3: Classe

Responder:
1. **Atributos:** status, tasks, entregáveis, datas
2. **Estados:** Backlog → Ativa → Concluída
3. **Métodos:** promover(), executar(), arquivar()
4. **Artefatos:** Quais arquivos uma Sprint gera?

### M4: Documento Final

1. Consolidar M0-M3 em documento único
2. Adicionar diagramas e fluxos visuais
3. Publicar em `docs/00_I/00_I_2_Processo_Sprint.md`
4. Indexar no Catálogo

---

## CONTEÚDO

## M0: Problema

### Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Sprint** | Ciclo de trabalho focado com objetivo específico e tasks definidas |
| **Task** | Unidade atômica de trabalho dentro de uma Sprint (T01, T02...) |
| **Backlog** | Fila organizada de itens aguardando execução futura |
| **Captura** | Ação explícita do usuário para persistir contexto/fork no backlog |
| **Fork** | Desvio/descoberta durante conversa que merece trabalho futuro |
| **Promoção** | Transição de item do Backlog para Sprint ativa |
| **Draft** | Arquivo em desenvolvimento durante Sprint (_drafts/) |
| **Publicação** | Transição de Draft para documento oficial (docs/) |
| **Arquivamento** | Conclusão de Sprint com registro histórico |
| **Minor** | Fix pequeno executado inline na sprint atual (sem promover) |
| **Origem** | Sprint(s) onde um item de backlog foi identificado |
| **Sistema Afetado** | Componente da infra impactado por um item (rastreabilidade) |
| **Captura Retroativa** | Registro no backlog de minor já executado (para tracking) |

### Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como gerenciar conhecimento que emerge em conversas, organizá-lo para     │
│   execução futura, e não perder tracking entre sessões e chats?"            │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  FORKS PERDIDOS     │  │ ENTROPIA NO CHAT    │  │ PROCESSO VAGO       │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Descobertas durante │  │ Contexto acumula,   │  │ Como promover?      │  │
│  │ conversa se perdem  │  │ conversa fica       │  │ Como executar?      │  │
│  │ se não capturadas   │  │ pesada e imprecisa  │  │ Como concluir?      │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CAPTURA ────► BACKLOG ────► SPRINT ────► PUBLICAÇÃO                        │
│  (comando      (índice +     (tasks +     (docs/ +                          │
│   explícito)    contexto)     drafts)      arquivar)                        │
│                                                                             │
│  Processo INDEPENDENTE de Git (Git = ferramenta de persistência)            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tese

> **Processo de Sprint é o sistema de gestão de conhecimento que permite:**
>
> 1. **Capturar** - Comando explícito do usuário persiste forks/gaps em backlog
> 2. **Organizar** - Backlog estruturado com índice + arquivos detalhados (input para M0)
> 3. **Promover** - Critérios e passos claros para backlog → sprint
> 4. **Executar** - Sprint com tasks, drafts e tracking entre sessões
> 5. **Publicar** - Conclusão com arquivamento e atualização de índices
>
> **Separação de concerns:** Este processo define O QUE fazer e QUANDO.
> Git (00_I_1_1_GitHub.md) define COMO persistir.

---

## M1: Marco Teórico

### Fundamentos

| Conceito | Teoria | Aplicação no Processo |
|----------|--------|----------------------|
| **Captura Imediata** | GTD (David Allen) | Fork detectado → captura explícita → mente livre para tarefa atual |
| **Fluxo Puxado** | Kanban (Toyota) | Backlog → Sprint quando há capacidade, não por push |
| **Timeboxing** | Scrum (Agile) | Sprint tem escopo fechado e objetivo claro |
| **Incrementos** | Scrum (Agile) | Cada Sprint entrega algo publicável |
| **Notas Atômicas** | Zettelkasten (Luhmann) | Item de backlog = unidade independente com contexto suficiente |
| **WIP Limit** | Kanban | Uma Sprint ativa por vez (foco) |

### Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MARCO TEÓRICO CONSOLIDADO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GTD: CAPTURA                        KANBAN: FLUXO                          │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ "Capture tudo que tem     │       │ Backlog → Sprint → Done   │          │
│  │  significado potencial"   │       │ Puxar, não empurrar       │          │
│  │                           │       │ WIP limit = 1 sprint      │          │
│  │ → Comando explícito       │       │                           │          │
│  │ → Contexto suficiente     │       │ → Promoção consciente     │          │
│  │ → Mente livre             │       │ → Foco em uma coisa       │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                                                                             │
│  SCRUM: EXECUÇÃO                     ZETTELKASTEN: ESTRUTURA                │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ Sprint = timebox          │       │ Cada nota = unidade       │          │
│  │ Objetivo claro            │       │ independente              │          │
│  │ Entrega incremental       │       │                           │          │
│  │                           │       │ → Item backlog autônomo   │          │
│  │ → Tasks definidas         │       │ → Contexto para retomada  │          │
│  │ → Publicação ao final     │       │ → Links para relacionados │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                                                                             │
│  RESULTADO: Processo que captura sem perder foco, organiza para             │
│             retomada futura, executa com clareza, publica incrementos.      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Adaptação para Contexto LLM

| Desafio LLM | Solução do Processo |
|-------------|---------------------|
| Contexto não persiste entre chats | Backlog com contexto suficiente para retomada |
| Conversa longa = entropia | Captura descarrega contexto, mantém chat leve |
| Sessões curtas | Sprint com tasks atômicas, progresso incremental |
| Múltiplos chats | Sprint file como "âncora" - carrega no início de cada sessão |

---

## M2: Objeto

### Definição

**Processo de Sprint** é o sistema que gerencia o ciclo de vida do conhecimento emergente: da captura durante conversas até a publicação como documentação oficial.

### Fronteiras

| Processo de Sprint É | Processo de Sprint NÃO É |
|----------------------|--------------------------|
| Gestão do ciclo Captura → Backlog → Sprint → Publicação | Persistência de arquivos (isso é Git) |
| Definição de O QUE fazer e QUANDO | Definição de COMO estruturar conhecimento (isso é Epistemologia) |
| Rastreabilidade de onde itens surgiram | Busca semântica de itens (isso é Catálogo) |
| Controle de tasks e progresso | Conteúdo de domínio específico |
| Processo para LLM + Humano | Metodologia ágil completa (Scrum/Kanban) |

### Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      COMPONENTES DO PROCESSO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│  │   CAPTURA   │    │   BACKLOG   │    │   SPRINT    │    │ PUBLICAÇÃO  │   │
│  ├─────────────┤    ├─────────────┤    ├─────────────┤    ├─────────────┤   │
│  │ Comando     │    │ Índice      │    │ Objetivo    │    │ Mover para  │   │
│  │ explícito   │───►│ + Arquivos  │───►│ + Tasks     │───►│ docs/       │   │
│  │ do usuário  │    │ detalhados  │    │ + Drafts    │    │ + Arquivar  │   │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   │
│        │                  │                  │                  │           │
│        ▼                  ▼                  ▼                  ▼           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    ITEM DE BACKLOG                                  │    │
│  │  - titulo: String                                                   │    │
│  │  - origem: [Sprint]     ← onde surgiu (rastreabilidade)             │    │
│  │  - status: Pendente | Resolvido                                     │    │
│  │  - resolvido_em: Sprint?                                            │    │
│  │  - tipo: Minor | Feature | Bug                                      │    │
│  │  - sistema_afetado: String                                          │    │
│  │  - contexto: Markdown   ← input para M0 quando desenvolver          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Relações

| Componente | Relação | Descrição |
|------------|---------|-----------|
| **Git** | Usa | Processo usa Git para persistir arquivos |
| **Epistemologia** | Aplica | Itens promovidos seguem M0-M4 |
| **Catálogo** | Indexa em | Itens publicados são indexados no Catálogo |
| **GENESIS** | Subordinado a | Processo é parte da infra que GENESIS orquestra |

### Fluxos Especiais

#### Minor (fix inline)

```
Fork surge → É pequeno? → SIM → Executa direto → Captura retroativa no backlog
                       → NÃO → Captura normal → Aguarda promoção
```

#### Origem múltipla

```
Item surge em S007 → origem: [S007]
Mesmo item surge em S009 → origem: [S007, S009]  ← indica criticidade
```

---

## M3: Classe

### 3.1 Classes do Processo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLASSES DO PROCESSO                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐       ┌─────────────────────┐                      │
│  │    BACKLOG_ITEM     │       │       SPRINT        │                      │
│  ├─────────────────────┤       ├─────────────────────┤                      │
│  │ titulo: String      │       │ codigo: String      │                      │
│  │ origem: [Sprint]    │       │ objetivo: String    │                      │
│  │ status: Enum        │       │ status: Enum        │                      │
│  │ resolvido_em: Sprint│       │ tasks: [Task]       │                      │
│  │ tipo: Enum          │  ◄──  │ entregavel: String  │                      │
│  │ sistema_afetado: Str│       │ data_inicio: Date   │                      │
│  │ contexto: Markdown  │       │ data_fim: Date?     │                      │
│  └─────────────────────┘       └─────────────────────┘                      │
│           │                             │                                   │
│           │                             │                                   │
│           ▼                             ▼                                   │
│  ┌─────────────────────┐       ┌─────────────────────┐                      │
│  │   BACKLOG_ITEM      │       │        TASK         │                      │
│  │      STATUS         │       ├─────────────────────┤                      │
│  ├─────────────────────┤       │ codigo: String      │                      │
│  │ Pendente            │       │ descricao: String   │                      │
│  │ Resolvido           │       │ status: Enum        │                      │
│  └─────────────────────┘       │ artefatos: [Path]   │                      │
│                                └─────────────────────┘                      │
│  ┌─────────────────────┐       ┌─────────────────────┐                      │
│  │   BACKLOG_ITEM      │       │    TASK STATUS      │                      │
│  │       TIPO          │       ├─────────────────────┤                      │
│  ├─────────────────────┤       │ ⬜ Pendente         │                      │
│  │ Minor               │       │ 🔄 Em progresso     │                      │
│  │ Feature             │       │ ✅ Concluída        │                      │
│  │ Bug                 │       └─────────────────────┘                      │
│  └─────────────────────┘                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Estados e Transições

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ESTADOS: BACKLOG_ITEM                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│    ┌──────────┐   promover()   ┌──────────┐   arquivar()   ┌──────────┐    │
│    │ Pendente │ ─────────────► │ Em Sprint│ ─────────────► │Resolvido │    │
│    └──────────┘                └──────────┘                └──────────┘    │
│         │                                                       ▲           │
│         │              executar_minor()                         │           │
│         └───────────────────────────────────────────────────────┘           │
│                   (captura retroativa já resolvido)                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         ESTADOS: SPRINT                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│    ┌──────────┐   iniciar()    ┌──────────┐   arquivar()   ┌──────────┐    │
│    │ Backlog  │ ─────────────► │  Ativa   │ ─────────────► │Concluída │    │
│    └──────────┘                └──────────┘                └──────────┘    │
│                                     │                                       │
│                                     │ (WIP limit = 1)                       │
│                                     ▼                                       │
│                              Apenas 1 sprint                                │
│                              ativa por vez                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Métodos

#### capturar(contexto, tipo, sistema_afetado)

| Campo | Valor |
|-------|-------|
| **Input** | contexto: String, tipo: Enum, sistema_afetado: String |
| **Output** | Backlog_Item criado |
| **Trigger** | Comando explícito do usuário |

```
┌─────────────────────────────────────────────────────────────────┐
│                        capturar()                               │
├─────────────────────────────────────────────────────────────────┤
│  1. Usuário diz: "Captura no backlog: [descrição]"              │
│  2. Extrair: tipo (Minor/Feature/Bug), sistema_afetado          │
│  3. Criar arquivo: _backlog/[slug].md                           │
│  4. Preencher frontmatter:                                      │
│     - titulo                                                    │
│     - origem: [Sprint atual]                                    │
│     - status: Pendente (ou Resolvido se minor já executado)     │
│     - tipo                                                      │
│     - sistema_afetado                                           │
│  5. Adicionar contexto no body                                  │
│  6. Commit: [C2] add: Backlog item - [titulo]                   │
│  7. Confirmar: "Capturado em _backlog/[slug].md"                │
└─────────────────────────────────────────────────────────────────┘
```

#### promover(backlog_item, sprint_codigo)

| Campo | Valor |
|-------|-------|
| **Input** | backlog_item: Path, sprint_codigo: String |
| **Output** | Sprint file criado/atualizado |
| **Pré-condição** | Nenhuma sprint ativa (WIP limit) |

```
┌─────────────────────────────────────────────────────────────────┐
│                        promover()                               │
├─────────────────────────────────────────────────────────────────┤
│  1. Verificar WIP limit (nenhuma sprint ativa)                  │
│  2. Ler backlog item                                            │
│  3. Criar _sprints/[codigo]_[nome].md com:                      │
│     - Contexto (repo, branch)                                   │
│     - Objetivo (do backlog item)                                │
│     - Tasks expandidas (T01, T02...)                            │
│     - Ciclo M0-M4 se aplicável                                  │
│  4. Criar pasta _drafts/[codigo]/                               │
│  5. Atualizar backlog item: status → Em Sprint                  │
│  6. Commit: [C2] promote: [item] → [sprint]                     │
└─────────────────────────────────────────────────────────────────┘
```

#### executar(sprint, task)

| Campo | Valor |
|-------|-------|
| **Input** | sprint: Path, task: String |
| **Output** | Artefatos criados, task atualizada |
| **Contexto** | Durante sessão de trabalho |

```
┌─────────────────────────────────────────────────────────────────┐
│                        executar()                               │
├─────────────────────────────────────────────────────────────────┤
│  1. Carregar sprint file no início da sessão                    │
│  2. Identificar task atual                                      │
│  3. Criar artefatos em _drafts/[sprint]/                        │
│  4. Atualizar status da task: ⬜ → 🔄 → ✅                       │
│  5. Commit por artefato: [CX] add/update: [desc] - [sprint]/TX  │
│  6. Ao concluir task, atualizar sprint file                     │
└─────────────────────────────────────────────────────────────────┘
```

#### publicar(draft_path, destino)

| Campo | Valor |
|-------|-------|
| **Input** | draft_path: Path, destino: Path |
| **Output** | Arquivo em docs/ |
| **Pré-condição** | Draft completo (M4 se aplicável) |

```
┌─────────────────────────────────────────────────────────────────┐
│                        publicar()                               │
├─────────────────────────────────────────────────────────────────┤
│  1. Validar draft está completo                                 │
│  2. Mover _drafts/[sprint]/[arquivo] → docs/[destino]           │
│  3. Atualizar frontmatter: status → Publicado                   │
│  4. Indexar no Catálogo (se aplicável)                          │
│  5. Commit: [CX] publish: [nome] - [sprint]                     │
└─────────────────────────────────────────────────────────────────┘
```

#### arquivar(sprint)

| Campo | Valor |
|-------|-------|
| **Input** | sprint: Path |
| **Output** | Ambiente limpo, sprint marcada concluída |
| **Pós-condição** | Pastas prontas para próxima sprint |

```
┌─────────────────────────────────────────────────────────────────┐
│                        arquivar()                               │
├─────────────────────────────────────────────────────────────────┤
│  OBJETIVO: Limpar ambiente para próxima sprint (reduzir         │
│            entropia do workspace)                               │
│                                                                 │
│  1. DRAFTS FINALIZADOS                                          │
│     _drafts/[sprint]/*.md (completos) → docs/                   │
│     Ação: publicar()                                            │
│                                                                 │
│  2. DRAFTS INCOMPLETOS                                          │
│     _drafts/[sprint]/*.md (incompletos) → _backlog/             │
│     Ação: capturar() com contexto do draft                      │
│     Não perde trabalho, vira item futuro                        │
│                                                                 │
│  3. PATCHES APLICADOS                                           │
│     _patches/0XX_[sprint]_*.md → _patches/_archive/[sprint]/    │
│     Mantém histórico, limpa raiz                                │
│                                                                 │
│  4. BACKLOG ITEMS                                               │
│     Itens da sprint: status → Resolvido, resolvido_em: [sprint] │
│                                                                 │
│  5. SPRINT FILE                                                 │
│     _sprints/[sprint].md: status → Concluída, data_fim: hoje    │
│     Mantém em _sprints/ como histórico                          │
│                                                                 │
│  6. PASTA DRAFTS                                                │
│     Deletar _drafts/[sprint]/ (já está vazia)                   │
│                                                                 │
│  7. COMMIT FINAL                                                │
│     [C2] archive: [sprint] concluída                            │
│                                                                 │
│  RESULTADO:                                                     │
│  - _drafts/ vazio (pronto para próxima sprint)                  │
│  - _patches/ raiz limpa                                         │
│  - docs/ atualizado                                             │
│  - _backlog/ atualizado                                         │
│  - _sprints/ com histórico                                      │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Artefatos por Fase

| Fase | Artefatos Gerados | Local |
|------|-------------------|-------|
| **Captura** | `[slug].md` | `_backlog/` |
| **Promoção** | `[codigo]_[nome].md` | `_sprints/` |
| **Execução** | `TXX_[nome].md`, patches | `_drafts/[sprint]/`, `_patches/` |
| **Publicação** | `XX_X_X_[Nome].md` | `docs/` |
| **Arquivamento** | Movimentações, atualizações | Vários |

### 3.5 Restrições

| Restrição | Regra | Consequência |
|-----------|-------|--------------|
| **WIP-SPRINT** | Máximo 1 sprint ativa | Foco, reduz context switching |
| **ORIGEM-OBRIGATORIA** | Todo backlog item tem origem | Rastreabilidade |
| **CAPTURA-EXPLICITA** | Só captura por comando do usuário | Controle humano |
| **ARQUIVAR-LIMPA** | Arquivar deve deixar workspace limpo | Reduz entropia |

<!-- M4 será adicionado aqui durante execução -->

---

## REFERÊNCIAS

| Arquivo | Para quê |
|---------|----------|
| `docs/00_E/00_E_Epistemologia.md` | Exemplo de M0-M4 completo |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Outro exemplo de M0-M4 |
| `_sprints/S006-C_Catalogo_MVP.md` | Exemplo de sprint concluída |

---

## HISTÓRICO

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-07 | Criação. Promovido do BACKLOG.md. |
| 1.1 | 2025-12-07 | Simplificado. Foco em M0-M4. |
| 1.2 | 2025-12-07 | Corrigido. Conteúdo via patch, não arquivos separados. |

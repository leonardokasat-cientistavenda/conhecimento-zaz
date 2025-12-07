# Backlog v0.1

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Backlog** | Fila organizada de itens aguardando execução futura |
| **Backlog Item** | Unidade atômica de trabalho futuro com contexto suficiente |
| **Captura** | Ação explícita do usuário para persistir contexto/fork |
| **Fork** | Desvio/descoberta durante conversa que merece trabalho futuro |
| **Origem** | Sprint(s) onde um item foi identificado |
| **Minor** | Fix pequeno executado inline, sem virar sprint |
| **Captura Retroativa** | Registro de minor já executado (para tracking) |
| **Priorização** | Ordenação de itens por criticidade/urgência |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA                                          │
│                                                                             │
│  "Como capturar conhecimento emergente em conversas sem perder contexto     │
│   e sem poluir a tarefa atual?"                                             │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  FORKS PERDIDOS     │  │  ENTROPIA NO CHAT   │  │  SEM RASTREIO       │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Descobertas durante │  │ Contexto acumula,   │  │ Não sei onde surgiu │  │
│  │ conversa se perdem  │  │ conversa pesada     │  │ cada ideia          │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO: BACKLOG                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. CAPTURA EXPLÍCITA                                                       │
│     Usuário comanda → Claude persiste → Chat fica leve                      │
│                                                                             │
│  2. CONTEXTO SUFICIENTE                                                     │
│     Item tem tudo para retomada futura (input para M0)                      │
│                                                                             │
│  3. RASTREABILIDADE                                                         │
│     Origem registrada → Sabe onde surgiu cada item                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Backlog é o subsistema de Gestão de Desenvolvimento responsável por capturar e organizar itens para execução futura.**
>
> - **Captura explícita** - Usuário controla o que entra
> - **Contexto suficiente** - Item é autônomo para retomada
> - **Rastreabilidade** - Origem sempre registrada
>
> **Relação:** Backlog fornece itens para Sprint via `promover()`.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação no Backlog |
|----------|--------|----------------------|
| **Captura Imediata** | GTD (David Allen) | Capturar sem julgar, processar depois |
| **Notas Atômicas** | Zettelkasten (Luhmann) | Cada item = unidade independente |
| **Inbox Zero** | Produtividade | Backlog não é lixeira, tem manutenção |
| **FIFO/Prioridade** | Teoria de Filas | Nem tudo é primeiro a entrar, primeiro a sair |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKLOG: FUNDAMENTOS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GTD: "Capture tudo"              ZETTELKASTEN: "Notas atômicas"            │
│  ┌───────────────────────────┐    ┌───────────────────────────┐             │
│  │ Captura sem julgar        │    │ Cada item independente    │             │
│  │ Mente livre               │    │ Contexto auto-contido     │             │
│  │ Processar depois          │    │ Links para relacionados   │             │
│  └───────────────────────────┘    └───────────────────────────┘             │
│                                                                             │
│  RESULTADO:                                                                 │
│  - Nada se perde                                                            │
│  - Cada item pode ser retomado independentemente                            │
│  - Priorização acontece depois, não na captura                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**Backlog** é o subsistema que:
- **Captura** forks e ideias durante conversas
- **Organiza** itens com contexto suficiente para retomada
- **Rastreia** origem de cada item
- **Fornece** itens para promoção a Sprint

### 3.2 Fronteiras

| Backlog É | Backlog NÃO É |
|-----------|---------------|
| Fila de itens para execução futura | Executor de trabalho (isso é Sprint) |
| Captura com contexto | Lixeira de ideias sem estrutura |
| Rastreabilidade de origem | Priorização automática |
| Input para Sprint | A própria Sprint |

### 3.3 Estrutura de Armazenamento

```
_backlog/
├── BACKLOG.md              ← Índice central + itens inline simples
├── [item_complexo].md      ← Arquivo separado para itens grandes
├── [outro_item].md
└── _archive/               ← Itens resolvidos (histórico)
    ├── [item_concluido].md
    └── [outro_concluido].md
```

### 3.4 Relações

| Componente | Relação | Descrição |
|------------|---------|-----------|
| **Gestão de Desenvolvimento** | Pai | Backlog é subsistema filho |
| **Sprint** | Irmão | Recebe itens via promover() |
| **Git** | Usa | Persistência de arquivos |
| **BACKLOG.md** | Índice | Visão consolidada de todos os itens |

---

## 4. Classe (M3)

### 4.1 Classe: BacklogItem

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLASSE: BACKLOG_ITEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + titulo: String                    # descrição curta                      │
│  + origem: [Sprint]                  # onde surgiu (pode ser múltiplas)     │
│  + status: Enum                      # Pendente | Resolvido                 │
│  + promovido_em: Sprint?             # para qual sprint foi (null se minor) │
│  + resolvido_em: Sprint?             # onde foi resolvido                   │
│  + tipo: Enum                        # Minor | Feature | Bug                │
│  + sistema_afetado: String           # qual parte da infra                  │
│  + contexto: Markdown                # descrição completa (input para M0)   │
│  + arquivo: Path?                    # se tem arquivo separado              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Estados                                                                    │
│  ───────                                                                    │
│  Pendente ──promover()──► Em Sprint ──arquivar()──► Resolvido               │
│      │                                                   ▲                  │
│      │              minor executado inline               │                  │
│      └───────────────────────────────────────────────────┘                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Localização por Status                                                     │
│  ──────────────────────                                                     │
│  Pendente  → _backlog/[slug].md ou inline em BACKLOG.md                     │
│  Resolvido → _backlog/_archive/[slug].md                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Estrutura do Arquivo BacklogItem

```yaml
# _backlog/[slug].md
---
titulo: "Descrição curta do item"
origem:
  - S007                    # sprint(s) onde surgiu
status: Pendente            # Pendente | Resolvido
promovido_em: null          # sprint para qual foi promovido
resolvido_em: null          # sprint onde foi resolvido
tipo: Feature               # Minor | Feature | Bug
sistema_afetado: Infra/Git  # componente impactado
---

## Contexto

[Descrição completa do problema/ideia]
[Suficiente para retomada futura]
[Serve como input para M0 quando for desenvolvido]

## Referências

- Conversa onde surgiu
- Documentos relacionados
```

### 4.3 Classe: Backlog (Gerenciador)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: BACKLOG                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + indice: Path = "_backlog/BACKLOG.md"                                     │
│  + itens_pendentes: [BacklogItem]                                           │
│  + arquivo_archive: Path = "_backlog/_archive/"                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + capturar(contexto, tipo, sistema): BacklogItem                           │
│  + listar_pendentes(): [BacklogItem]                                        │
│  + atualizar_item(item, campos): BacklogItem                                │
│  + arquivar_item(item): void                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Métodos

#### capturar(contexto, tipo, sistema_afetado)

```
┌─────────────────────────────────────────────────────────────────┐
│                        capturar()                               │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - contexto: String (descrição do item)                         │
│  - tipo: Enum (Minor | Feature | Bug)                           │
│  - sistema_afetado: String                                      │
│                                                                 │
│  Output: BacklogItem criado                                     │
│                                                                 │
│  Trigger: Comando explícito do usuário                          │
│  Exemplo: "Captura no backlog: [descrição]"                     │
│                                                                 │
│  Passos:                                                        │
│  1. Extrair sprint atual como origem                            │
│  2. Determinar se inline ou arquivo separado:                   │
│     - Simples (< 500 chars) → inline no BACKLOG.md              │
│     - Complexo → arquivo _backlog/[slug].md                     │
│  3. Criar/atualizar arquivo                                     │
│  4. Se resolvido (minor já executado):                          │
│     - status: Resolvido                                         │
│     - resolvido_em: Sprint atual                                │
│     - Criar em _backlog/_archive/                               │
│  5. Commit: [C2] add: Backlog item - [titulo]                   │
│  6. Confirmar: "Capturado: [titulo]"                            │
└─────────────────────────────────────────────────────────────────┘
```

#### arquivar_item(item)

```
┌─────────────────────────────────────────────────────────────────┐
│                      arquivar_item()                            │
├─────────────────────────────────────────────────────────────────┤
│  Input: item (BacklogItem)                                      │
│  Output: void                                                   │
│                                                                 │
│  Pré-condição: item.status == Resolvido                         │
│                                                                 │
│  Passos:                                                        │
│  1. SE item tem arquivo separado:                               │
│     Mover _backlog/[slug].md → _backlog/_archive/[slug].md      │
│  2. SE item é inline no BACKLOG.md:                             │
│     Remover seção do BACKLOG.md                                 │
│     Criar _backlog/_archive/[slug].md                           │
│  3. Atualizar índice do BACKLOG.md                              │
│  4. Commit: [C2] archive: Backlog item - [titulo]               │
│                                                                 │
│  RESULTADO: _backlog/ limpo, histórico preservado               │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Restrições

| Restrição | Regra | Consequência |
|-----------|-------|--------------|
| **CAPTURA-EXPLICITA** | Só captura por comando do usuário | Controle humano, sem captura automática |
| **ORIGEM-OBRIGATORIA** | Todo item tem origem | Rastreabilidade garantida |
| **CONTEXTO-SUFICIENTE** | Item deve ser retomável sem contexto externo | Autonomia do item |
| **ARCHIVE-LIMPO** | Itens resolvidos vão para _archive/ | Backlog principal limpo |

### 4.6 Índice BACKLOG.md

```markdown
# BACKLOG.md

## Índice de Itens Pendentes

| # | Item | Tipo | Prioridade | Arquivo |
|---|------|------|------------|---------|
| 1 | Módulo Autonomia | Feature | 🟡 | _backlog/Modulo_Autonomia.md |
| 2 | Tools Externas | Feature | 🟢 | (inline) |

## Sprints Ativas

| Item | Sprint |
|------|--------|
| Gestão de Desenvolvimento | S007 |

## Itens Inline

### 2. Tools Externas
[M0 aqui para itens simples]

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
```

# Backlog v0.3

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
| **Priorização** | Ordenação de itens por criticidade/urgência |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA                                          │
│                                                                             │
│  "Como capturar ideias emergentes em conversas sem perder contexto          │
│   e sem poluir a tarefa atual?"                                             │
│                                                                             │
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
│  3. INDEXAÇÃO NO CATÁLOGO                                                   │
│     Busca semântica via Catálogo (tipo: backlog)                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Backlog é o subsistema de Gestão de Projetos responsável por capturar e organizar itens para execução futura.**
>
> - **Captura explícita** - Usuário controla o que entra
> - **Contexto suficiente** - Item é autônomo para retomada
> - **Indexado no Catálogo** - Busca semântica disponível
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
| **Busca Semântica** | IR/NLP | Catálogo permite encontrar por significado |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKLOG: FUNDAMENTOS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GTD + ZETTELKASTEN                  CATÁLOGO                               │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ Captura sem julgar        │       │ Indexa itens              │          │
│  │ Cada item independente    │ ────► │ Busca semântica           │          │
│  │ Contexto auto-contido     │       │ tipo: backlog             │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**Backlog** é o subsistema que:
- **Captura** forks e ideias durante conversas
- **Organiza** itens com contexto suficiente para retomada
- **Indexa** no Catálogo para busca semântica
- **Fornece** itens para promoção a Sprint

### 3.2 Fronteiras

| Backlog É | Backlog NÃO É |
|-----------|---------------|
| Fila de itens para execução futura | Executor de trabalho (isso é Sprint) |
| Captura com contexto | Lixeira de ideias sem estrutura |
| Indexado no Catálogo | Implementador de busca |
| Input para Sprint | A própria Sprint |

### 3.3 Estrutura de Armazenamento

```
_backlog/
├── [item].md               ← Arquivo por item
├── [outro_item].md
└── _archive/               ← Itens resolvidos (histórico)
    ├── [item_concluido].md
    └── [outro_concluido].md
```

### 3.4 Relações

| Componente | Relação |
|------------|---------|
| **Gestão de Projetos** | Pai - orquestra |
| **Sprint** | Irmão - recebe itens via promover() |
| **Catálogo** | Usa - indexação e busca |
| **Git** | Usa - persistência |

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
│  + origem: [Sprint]                  # onde surgiu                          │
│  + data_criacao: Date                # quando foi capturado                 │
│  + status: Enum                      # Pendente | Resolvido                 │
│  + promovido_em: Sprint?             # para qual sprint foi                 │
│  + data_promocao: Date?              # quando foi promovido                 │
│  + resolvido_em: Sprint?             # onde foi resolvido                   │
│  + data_resolucao: Date?             # quando foi resolvido                 │
│  + tipo: Enum                        # Minor | Feature | Bug                │
│  + prioridade: Enum                  # 🔴 Alta | 🟡 Média | 🟢 Baixa        │
│  + sistema_afetado: String           # qual componente                      │
│  + contexto: Markdown                # descrição completa                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Estados                                                                    │
│  ───────                                                                    │
│  Pendente ──promover()──► Em Sprint ──arquivar()──► Resolvido               │
├─────────────────────────────────────────────────────────────────────────────┤
│  Localização por Status                                                     │
│  ──────────────────────                                                     │
│  Pendente  → _backlog/[slug].md                                             │
│  Resolvido → _backlog/_archive/[slug].md                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Estrutura do Arquivo BacklogItem

```yaml
# _backlog/[slug].md
---
titulo: "Descrição curta do item"
origem:
  - S007
data_criacao: 2025-12-08
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🟡
sistema_afetado: Componente
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
│  + pasta: Path = "_backlog/"                                                │
│  + catalogo: Catalogo                # dependência                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + capturar(contexto, tipo, sistema, prioridade): BacklogItem               │
│  + atualizar_item(item, campos): BacklogItem                                │
│  + arquivar_item(item): void                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Métodos

#### capturar(contexto, tipo, sistema_afetado, prioridade)

```
┌─────────────────────────────────────────────────────────────────┐
│                        capturar()                               │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - contexto: String (descrição do item)                         │
│  - tipo: Enum (Minor | Feature | Bug)                           │
│  - sistema_afetado: String                                      │
│  - prioridade: Enum (🔴 | 🟡 | 🟢) - default: 🟡                │
│                                                                 │
│  Output: BacklogItem criado                                     │
│                                                                 │
│  Trigger: Comando explícito do usuário                          │
│  Exemplo: "Captura no backlog: [descrição]"                     │
│                                                                 │
│  Passos:                                                        │
│  1. Extrair sprint atual como origem                            │
│  2. Registrar data_criacao = hoje                               │
│  3. Criar arquivo _backlog/[slug].md                            │
│  4. Indexar no Catálogo (tipo: backlog)                         │
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
│  1. Atualizar item: data_resolucao = hoje                       │
│  2. Mover _backlog/[slug].md → _backlog/_archive/[slug].md      │
│  3. Atualizar índice no Catálogo                                │
│  4. Commit: [C2] archive: Backlog item - [titulo]               │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Restrições

| Restrição | Regra |
|-----------|-------|
| **CAPTURA-EXPLICITA** | Só captura por comando do usuário |
| **ORIGEM-OBRIGATORIA** | Todo item tem origem |
| **DATA-CRIACAO-OBRIGATORIA** | Todo item tem data_criacao |
| **CONTEXTO-SUFICIENTE** | Item deve ser retomável sem contexto externo |
| **INDEXAR-CATALOGO** | Todo item capturado é indexado |

### 4.6 Dependências

| Módulo | Uso |
|--------|-----|
| **Catálogo** | Indexação e busca semântica (tipo: backlog) |

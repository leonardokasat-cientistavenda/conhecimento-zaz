---
titulo: "Backlog"
versao: "1.0"
data_publicacao: "2025-12-08"
camada: 2
tipo: "Infraestrutura"
dominio: "Gestão"
tags:
  - backlog
  - captura
  - gestao
  - projetos
pai: docs/00_I/00_I_2_Gestao_Projetos.md
depende_de:
  - docs/00_E/00_E_1_4_Catalogo.md
---

# Backlog v1.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Backlog** | Fila organizada de itens aguardando execução futura |
| **Backlog Item** | Unidade atômica de trabalho futuro com contexto suficiente |
| **Captura** | Fluxo inteligente: verifica similaridade → cria ou enriquece |
| **Enriquecimento** | Adição de contexto a item existente |
| **Fork** | Desvio/descoberta durante conversa que merece trabalho futuro |
| **Origem** | Sprint(s) onde um item foi identificado ou enriquecido |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA                                          │
│                                                                             │
│  "Como capturar ideias emergentes sem duplicar itens existentes             │
│   e sem perder contexto adicional que surge em outras sessões?"             │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO: CAPTURA INTELIGENTE                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. BUSCA SEMÂNTICA ANTES DE CRIAR                                          │
│     Verifica se já existe item similar no Catálogo                          │
│                                                                             │
│  2. DECISÃO DO USUÁRIO                                                      │
│     Se similar existe → pergunta: enriquecer ou criar novo?                 │
│                                                                             │
│  3. ENRIQUECIMENTO RASTREÁVEL                                               │
│     Novos insights são adicionados com origem e data                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Backlog é o subsistema de Gestão de Projetos responsável por capturar e organizar itens para execução futura.**
>
> - **Captura inteligente** - Busca similar antes de criar
> - **Decisão humana** - Usuário decide criar ou enriquecer
> - **Contexto acumulativo** - Enriquecimentos rastreáveis por origem
>
> **Relação:** Backlog fornece itens para Sprint via `promover()`.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação no Backlog |
|----------|--------|----------------------|
| **Captura Imediata** | GTD | Capturar sem julgar, processar depois |
| **Notas Atômicas** | Zettelkasten | Cada item = unidade independente |
| **Deduplicação** | Data Quality | Buscar similar antes de criar |
| **Busca Semântica** | IR/NLP | Catálogo encontra por significado |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKLOG: FUNDAMENTOS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GTD + ZETTELKASTEN                  CATÁLOGO                               │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ Captura sem julgar        │       │ Busca semântica           │          │
│  │ Cada item independente    │ ────► │ Detecta similares         │          │
│  │ Contexto auto-contido     │       │ Evita duplicação          │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**Backlog** é o subsistema que:
- **Captura** forks e ideias com verificação de similaridade
- **Enriquece** itens existentes com novos contextos
- **Indexa** no Catálogo para busca semântica
- **Fornece** itens para promoção a Sprint

### 3.2 Fronteiras

| Backlog É | Backlog NÃO É |
|-----------|---------------|
| Fila de itens para execução futura | Executor de trabalho |
| Captura inteligente com deduplicação | Criador cego de duplicatas |
| Indexado no Catálogo | Implementador de busca |

### 3.3 Estrutura de Armazenamento

```
_backlog/
├── [item].md               ← Arquivo por item
├── [outro_item].md
└── _archive/               ← Itens resolvidos
    └── [item_concluido].md
```

### 3.4 Relações

| Componente | Relação |
|------------|---------|
| **Gestão de Projetos** | Pai - orquestra |
| **Sprint** | Irmão - recebe itens via promover() |
| **Catálogo** | Usa - busca semântica e indexação |

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
│  + origens: [Origem]                 # lista de contribuições               │
│  + data_criacao: Date                # quando foi criado                    │
│  + status: Enum                      # Pendente | Resolvido                 │
│  + promovido_em: Sprint?             # para qual sprint foi                 │
│  + data_promocao: Date?              # quando foi promovido                 │
│  + resolvido_em: Sprint?             # onde foi resolvido                   │
│  + data_resolucao: Date?             # quando foi resolvido                 │
│  + tipo: Enum                        # Minor | Feature | Bug                │
│  + prioridade: Enum                  # 🔴 Alta | 🟡 Média | 🟢 Baixa        │
│  + sistema_afetado: String           # qual componente                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Origem (sub-estrutura)                                                     │
│  ──────────────────────                                                     │
│  + sprint: String                    # S007, S009, etc.                     │
│  + data: Date                        # quando contribuiu                    │
│  + contexto: Markdown                # o que foi adicionado                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Estrutura do Arquivo BacklogItem

```yaml
# _backlog/[slug].md
---
titulo: "Descrição curta do item"
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

### Origem: S007 (2025-12-08)

[Descrição original do problema/ideia]
[Suficiente para retomada futura]

---

### Enriquecimento: S009 (2025-12-15)

[Novo insight que surgiu nesta sessão]
[Complementa o contexto original]

---

### Enriquecimento: S012 (2025-12-20)

[Outro insight adicional]

## Referências

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
│  Métodos Públicos                                                           │
│  ────────────────                                                           │
│  + capturar(descricao, tipo, sistema, prioridade): BacklogItem              │
│  + atualizar_item(item, campos): BacklogItem                                │
│  + arquivar_item(item): void                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Internos                                                           │
│  ────────────────                                                           │
│  - criar(descricao, tipo, sistema, prioridade): BacklogItem                 │
│  - enriquecer(item, contexto_adicional): BacklogItem                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Métodos

#### capturar() - Fluxo Inteligente

```
┌─────────────────────────────────────────────────────────────────┐
│                        capturar()                               │
│                   (fluxo inteligente)                           │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - descricao: String                                            │
│  - tipo: Enum (Minor | Feature | Bug)                           │
│  - sistema_afetado: String                                      │
│  - prioridade: Enum - default: 🟡                               │
│                                                                 │
│  Output: BacklogItem (novo ou enriquecido)                      │
│                                                                 │
│  Trigger: Comando explícito do usuário                          │
│  Exemplo: "Captura no backlog: [descrição]"                     │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ FLUXO                                                     │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  1. BUSCAR SIMILARES                                      │  │
│  │     similares = Catalogo.pesquisar(                       │  │
│  │       query: descricao,                                   │  │
│  │       tipo: "backlog"                                     │  │
│  │     )                                                     │  │
│  │                                                           │  │
│  │  2. SE encontrou similares:                               │  │
│  │     │                                                     │  │
│  │     ├─► Mostrar ao usuário:                               │  │
│  │     │   "Encontrei itens similares:                       │  │
│  │     │    1. [titulo1]                                     │  │
│  │     │    2. [titulo2]                                     │  │
│  │     │                                                     │  │
│  │     │    Deseja:                                          │  │
│  │     │    (A) Enriquecer item existente?                   │  │
│  │     │    (B) Criar novo item?"                            │  │
│  │     │                                                     │  │
│  │     ├─► SE usuário escolhe (A):                           │  │
│  │     │      return enriquecer(item_escolhido, descricao)   │  │
│  │     │                                                     │  │
│  │     └─► SE usuário escolhe (B):                           │  │
│  │            return criar(descricao, tipo, sistema, prio)   │  │
│  │                                                           │  │
│  │  3. SE não encontrou similares:                           │  │
│  │     return criar(descricao, tipo, sistema, prioridade)    │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

#### criar() - Interno

```
┌─────────────────────────────────────────────────────────────────┐
│                        criar()                                  │
│                       (interno)                                 │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - descricao, tipo, sistema_afetado, prioridade                 │
│                                                                 │
│  Output: BacklogItem novo                                       │
│                                                                 │
│  Passos:                                                        │
│  1. Gerar slug a partir do título                               │
│  2. Criar arquivo _backlog/[slug].md com:                       │
│     - data_criacao: hoje                                        │
│     - Origem inicial: sprint atual + data + contexto            │
│  3. Indexar no Catálogo (tipo: backlog)                         │
│  4. Commit: [C2] add: Backlog item - [titulo]                   │
│  5. Confirmar: "Criado: [titulo]"                               │
└─────────────────────────────────────────────────────────────────┘
```

#### enriquecer() - Interno

```
┌─────────────────────────────────────────────────────────────────┐
│                       enriquecer()                              │
│                       (interno)                                 │
├─────────────────────────────────────────────────────────────────┤
│  Input:                                                         │
│  - item: BacklogItem existente                                  │
│  - contexto_adicional: String                                   │
│                                                                 │
│  Output: BacklogItem atualizado                                 │
│                                                                 │
│  Passos:                                                        │
│  1. Ler arquivo existente                                       │
│  2. Adicionar nova seção em ## Contexto:                        │
│     ### Enriquecimento: [sprint] ([data])                       │
│     [contexto_adicional]                                        │
│  3. Re-indexar no Catálogo                                      │
│  4. Commit: [C2] enrich: Backlog item - [titulo]                │
│  5. Confirmar: "Enriquecido: [titulo]"                          │
└─────────────────────────────────────────────────────────────────┘
```

#### arquivar_item()

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
│  1. Atualizar: data_resolucao = hoje                            │
│  2. Mover _backlog/[slug].md → _backlog/_archive/[slug].md      │
│  3. Atualizar índice no Catálogo                                │
│  4. Commit: [C2] archive: Backlog item - [titulo]               │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Restrições

| Restrição | Regra |
|-----------|-------|
| **CAPTURA-EXPLICITA** | Só captura por comando do usuário |
| **BUSCA-ANTES-CRIAR** | Sempre verifica similares antes de criar |
| **DECISAO-HUMANA** | Usuário decide criar ou enriquecer |
| **CONTEXTO-RASTREAVEL** | Todo enriquecimento tem origem e data |
| **INDEXAR-CATALOGO** | Todo item é indexado no Catálogo |

### 4.6 Dependências

| Módulo | Uso |
|--------|-----|
| **Catálogo** | Busca semântica (similaridade) + indexação |

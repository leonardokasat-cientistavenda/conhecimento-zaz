---
titulo: "Backlog"
versao: "1.3"
data_publicacao: "2025-12-16"
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
estendido_por:
  - docs/04_P/MS_Produto.md
---

# Backlog v1.3

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
| **Merge** | Unificação de dois itens relacionados em um único |
| **Tipo** | Classificação do item que determina sistema destino |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA                                          │
│                                                                             │
│  "Como capturar ideias emergentes sem duplicar itens existentes             │
│   e sem perder contexto adicional que surge em outras sessões?              │
│                                                                             │
│   E como rotear cada item para o sistema correto de execução?"              │
│                                                                             │
└──────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO: CAPTURA INTELIGENTE + TIPAGEM         │
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
│  4. TIPAGEM PARA ROTEAMENTO                                                 │
│     Cada item tem tipo que define sistema destino                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Backlog é o subsistema de Gestão de Projetos responsável por capturar, organizar e rotear itens para execução futura.**
>
> - **Captura inteligente** - Busca similar antes de criar
> - **Decisão humana** - Usuário decide criar ou enriquecer
> - **Contexto acumulativo** - Enriquecimentos rastreáveis por origem
> - **Tipagem para roteamento** - Cada tipo vai para sistema específico
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
| **Single Responsibility** | SOLID | Cada tipo = um sistema destino |

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
│  SOLID                               ROTEAMENTO                             │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ Single Responsibility     │       │ tipo → sistema destino    │          │
│  │ Cada tipo = um destino    │ ────► │ Sprint promove            │          │
│  │                           │       │ Sistema executa           │          │
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
- **Tipifica** itens para roteamento correto
- **Indexa** no Catálogo para busca semântica
- **Fornece** itens para promoção a Sprint
- **Unifica** itens relacionados via merge

### 3.2 Fronteiras

| Backlog É | Backlog NÃO É |
|-----------|---------------|
| Fila de itens para execução futura | Executor de trabalho |
| Captura inteligente com deduplicação | Criador cego de duplicatas |
| Roteador via tipagem | Executor de domínio específico |
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
| **MS_Produto** | Estendido por - campos e tipos específicos |
| **Epistemologia** | Destino - recebe tipo ciclo_epistemologico |
| **PROMETHEUS** | Destino - recebe tipo desenvolvimento e bug |

---

## 4. Classe (M3)

### 4.1 Classe: BacklogItem

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLASSE: BACKLOG_ITEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Core                                                             │
│  ──────────────                                                             │
│  + titulo: String                    # descrição curta                      │
│  + origens: [Origem]                 # lista de contribuições               │
│  + data_criacao: Date                # quando foi criado                    │
│  + status: Enum                      # Pendente | Promovido | Resolvido |   │
│  +                                   # Merged                               │
│  + promovido_em: Sprint?             # para qual sprint foi                 │
│  + data_promocao: Date?              # quando foi promovido                 │
│  + resolvido_em: Sprint?             # onde foi resolvido                   │
│  + data_resolucao: Date?             # quando foi resolvido                 │
│  + prioridade: Enum                  # 🔴 Alta | 🟡 Média | 🟢 Baixa        │
│  + sistema_afetado: String           # qual componente                      │
│  + merged_into: String?              # ID do item que absorveu este         │
│  + merged_from: [String]?            # IDs dos itens absorvidos             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Tipagem (v1.3)                                                   │
│  ────────────────────────                                                   │
│  + tipo: Enum                        # Tipo que define roteamento           │
│  +   ciclo_epistemologico            # → Epistemologia (M0-M4)              │
│  +   desenvolvimento                 # → PROMETHEUS (TDD, código)           │
│  +   bug                             # → PROMETHEUS (correção)              │
│  +   feature                         # → MS_Produto (estruturar)            │
│  +   epico                           # → Agrupador de trabalho              │
│  +   minor                           # → Genérico pequeno                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Rastreabilidade (v1.3)                                           │
│  ────────────────────────────────                                           │
│  + feature_ref: String?              # Feature relacionada                  │
│  + produto_ref: String?              # Produto relacionado                  │
│  + spec_ref: String?                 # Spec gerada (pós-epistemologia)      │
│  + pai_ref: String?                  # BacklogItem pai (ciclos recursivos)  │
│  + avaliacao_ref: String?            # Avaliação que originou iteração      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos Extensão MS_Produto (opcionais)                                  │
│  ─────────────────────────────────────────                                  │
│  + epico_ref: String?                # Épico ao qual pertence               │
│  + rice_score: Number?               # Score RICE calculado                 │
│  + rice_reach: Number?               # R - Alcance (usuários impactados)    │
│  + rice_impact: Number?              # I - Impacto (0.25, 0.5, 1, 2, 3)     │
│  + rice_confidence: Number?          # C - Confiança (0-100%)               │
│  + rice_effort: Number?              # E - Esforço (pessoa-semanas)         │
│  + feedback_origem: String?          # ID do feedback CS que originou       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Origem (sub-estrutura)                                                     │
│  ──────────────────────                                                     │
│  + sprint: String                    # S007, S009, etc.                     │
│  + data: Date                        # quando contribuiu                    │
│  + contexto: Markdown                # o que foi adicionado                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Tipos de BacklogItem e Roteamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TIPOS DE BACKLOG ITEM E ROTEAMENTO                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TIPO                      DESTINO            USO                           │
│  ────                      ───────            ───                           │
│                                                                             │
│  ciclo_epistemologico  →   EPISTEMOLOGIA      Especificar feature (M0-M4)  │
│                                               Iterar solução (pós-avaliação)│
│                                               Ciclo recursivo (pai_ref)     │
│                                                                             │
│  desenvolvimento       →   PROMETHEUS         Executar spec TDD             │
│                                               Código + testes               │
│                                                                             │
│  bug                   →   PROMETHEUS         Correção técnica              │
│                                               Pós-avaliação de efetividade  │
│                                                                             │
│  feature               →   MS_PRODUTO         Estruturar nova feature       │
│                                               Definir hipótese + critérios  │
│                                                                             │
│  epico                 →   AGRUPADOR          Container de backlog items    │
│                                               Organização de trabalho       │
│                                                                             │
│  minor                 →   GENÉRICO           Pequenas tarefas              │
│                                               Não requer sistema específico │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Fluxo de Criação por Origem

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ORIGENS E TIPOS DE BACKLOG ITEM                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ORIGEM                        TIPO GERADO             REFS PREENCHIDAS     │
│  ──────                        ───────────             ─────────────────    │
│                                                                             │
│  Feature precisa spec     →    ciclo_epistemologico    feature_ref          │
│                                                        produto_ref          │
│                                                                             │
│  M3.* detecta não-folha   →    ciclo_epistemologico    pai_ref              │
│                                                        feature_ref          │
│                                                                             │
│  Spec pronta              →    desenvolvimento         spec_ref             │
│                                                        feature_ref          │
│                                                                             │
│  Bug em produção          →    bug                     feature_ref          │
│                                                        avaliacao_ref        │
│                                                                             │
│  Feature não atinge       →    ciclo_epistemologico    feature_ref          │
│                                                        avaliacao_ref        │
│                                                                             │
│  Produto não atinge       →    feature                 produto_ref          │
│  (nova feature)                                                             │
│                                                                             │
│  Organizar trabalho       →    epico                   feature_ref          │
│                                                                             │
│  Captura genérica         →    minor                   sistema_afetado      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Estrutura do Arquivo BacklogItem

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
prioridade: 🟡
sistema_afetado: Componente

# Tipagem e Roteamento (v1.3)
tipo: ciclo_epistemologico  # ou desenvolvimento, bug, feature, epico, minor
feature_ref: feat_001       # Feature relacionada
produto_ref: ms_crm         # Produto relacionado
spec_ref: null              # Spec gerada (preenchido pós-epistemologia)
pai_ref: null               # BacklogItem pai (ciclos recursivos)
avaliacao_ref: null         # Avaliação que originou iteração

# Extensão MS_Produto (opcional)
epico_ref: null
rice_score: null
rice_reach: null
rice_impact: null
rice_confidence: null
rice_effort: null
feedback_origem: null
---

## Contexto

### Origem: S007 (2025-12-08)

[Descrição original do problema/ideia]
[Suficiente para retomada futura]

---

### Enriquecimento: S009 (2025-12-15)

[Novo insight que surgiu nesta sessão]
[Complementa o contexto original]

## Referências

- Documentos relacionados
```

### 4.5 Classe: Backlog (Gerenciador)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: BACKLOG                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + pasta: Path = "_backlog/"                                                │
│  + catalogo: Catalogo                # dependência                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Públicos Core                                                      │
│  ─────────────────────                                                      │
│  + capturar(descricao, tipo, sistema, prioridade, refs?): BacklogItem       │
│  + atualizar_item(item, campos): BacklogItem                                │
│  + arquivar_item(item): void                                                │
│  + merge(item_principal, item_absorvido): BacklogItem                       │
│  + listar_por_tipo(tipo): [BacklogItem]                                     │
│  + listar_por_feature(feature_ref): [BacklogItem]                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Extensão MS_Produto (opcionais)                                    │
│  ───────────────────────────────────────                                    │
│  + calcular_rice(item): Number       # (R × I × C) / E                      │
│  + vincular_epico(item, epico_id): BacklogItem                              │
│  + listar_por_epico(epico_id): [BacklogItem]                                │
│  + ordenar_por_rice(): [BacklogItem]                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Internos                                                           │
│  ────────────────                                                           │
│  - criar(descricao, tipo, sistema, prioridade, refs): BacklogItem           │
│  - enriquecer(item, contexto_adicional): BacklogItem                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Métodos

#### capturar() - Fluxo Inteligente

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        capturar()                                           │
│                   (fluxo inteligente)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - descricao: String                                                        │
│  - tipo: Enum (ciclo_epistemologico|desenvolvimento|bug|feature|epico|minor)│
│  - sistema_afetado: String                                                  │
│  - prioridade: Enum - default: 🟡                                           │
│  - refs: Object? - {feature_ref?, produto_ref?, spec_ref?, pai_ref?,        │
│                     avaliacao_ref?}                                         │
│                                                                             │
│  Output: BacklogItem (novo ou enriquecido)                                  │
│                                                                             │
│  Trigger: Comando explícito do usuário ou sistema                           │
│  Exemplo: "Captura no backlog: [descrição]"                                 │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ FLUXO                                                                 │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │                                                                       │  │
│  │  1. BUSCAR SIMILARES                                                  │  │
│  │     similares = Catalogo.pesquisar(                                   │  │
│  │       query: descricao,                                               │  │
│  │       tipo: "backlog"                                                 │  │
│  │     )                                                                 │  │
│  │                                                                       │  │
│  │  2. SE encontrou similares:                                           │  │
│  │     │                                                                 │  │
│  │     ├─► Mostrar ao usuário:                                           │  │
│  │     │   "Encontrei itens similares:                                   │  │
│  │     │    1. [titulo1]                                                 │  │
│  │     │    2. [titulo2]                                                 │  │
│  │     │                                                                 │  │
│  │     │    Deseja:                                                      │  │
│  │     │    (A) Enriquecer item existente?                               │  │
│  │     │    (B) Criar novo item?"                                        │  │
│  │     │                                                                 │  │
│  │     ├─► SE usuário escolhe (A):                                       │  │
│  │     │      return enriquecer(item_escolhido, descricao)               │  │
│  │     │                                                                 │  │
│  │     └─► SE usuário escolhe (B):                                       │  │
│  │            return criar(descricao, tipo, sistema, prio, refs)         │  │
│  │                                                                       │  │
│  │  3. SE não encontrou similares:                                       │  │
│  │     return criar(descricao, tipo, sistema, prioridade, refs)          │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### criar() - Interno

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        criar()                                              │
│                       (interno)                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - descricao, tipo, sistema_afetado, prioridade, refs                       │
│                                                                             │
│  Output: BacklogItem novo                                                   │
│                                                                             │
│  Passos:                                                                    │
│  1. Gerar slug a partir do título                                           │
│  2. Criar arquivo _backlog/[slug].md com:                                   │
│     - data_criacao: hoje                                                    │
│     - tipo: conforme input                                                  │
│     - refs: feature_ref, produto_ref, spec_ref, pai_ref, avaliacao_ref      │
│     - Origem inicial: sprint atual + data + contexto                        │
│  3. Indexar no Catálogo (tipo: backlog)                                     │
│  4. Commit: [C2] add: Backlog item - [titulo]                               │
│  5. Confirmar: "Criado: [titulo] (tipo: [tipo])"                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### enriquecer() - Interno

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       enriquecer()                                          │
│                       (interno)                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - item: BacklogItem existente                                              │
│  - contexto_adicional: String                                               │
│                                                                             │
│  Output: BacklogItem atualizado                                             │
│                                                                             │
│  Passos:                                                                    │
│  1. Ler arquivo existente                                                   │
│  2. Adicionar nova seção em ## Contexto:                                    │
│     ### Enriquecimento: [sprint] ([data])                                   │
│     [contexto_adicional]                                                    │
│  3. Re-indexar no Catálogo                                                  │
│  4. Commit: [C2] enrich: Backlog item - [titulo]                            │
│  5. Confirmar: "Enriquecido: [titulo]"                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### merge() - Unificar Itens

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          merge()                                            │
│                  (unificar itens relacionados)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - item_principal: BacklogItem    # item que absorve                        │
│  - item_absorvido: BacklogItem    # item que será merged                    │
│                                                                             │
│  Output: BacklogItem (principal atualizado)                                 │
│                                                                             │
│  Pré-condições:                                                             │
│  - Ambos itens existem                                                      │
│  - item_absorvido.status == "Pendente"                                      │
│  - Confirmação do usuário                                                   │
│                                                                             │
│  Passos:                                                                    │
│  1. Atualizar item principal (expandir escopo, merged_from)                 │
│  2. Marcar item absorvido (status: Merged, merged_into)                     │
│  3. Atualizar Catálogo                                                      │
│  4. Confirmar: "Merged: {absorvido} → {principal}"                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### calcular_rice() - Extensão MS_Produto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      calcular_rice()                                        │
│                 (Extensão MS_Produto)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: item (BacklogItem com campos RICE preenchidos)                      │
│  Output: Number (score calculado)                                           │
│                                                                             │
│  Fórmula: rice_score = (Reach × Impact × Confidence) / Effort               │
│                                                                             │
│  Uso: Priorização objetiva do backlog                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Restrições

| Restrição | Regra |
|-----------|-------|
| **CAPTURA-EXPLICITA** | Só captura por comando do usuário ou sistema |
| **BUSCA-ANTES-CRIAR** | Sempre verifica similares antes de criar |
| **DECISAO-HUMANA** | Usuário decide criar ou enriquecer |
| **CONTEXTO-RASTREAVEL** | Todo enriquecimento tem origem e data |
| **INDEXAR-CATALOGO** | Todo item é indexado no Catálogo |
| **MERGE-CONFIRMADO** | Merge só executa com confirmação do usuário |
| **TIPO-OBRIGATORIO** | Todo item deve ter tipo definido (v1.3) |
| **REFS-CONSISTENTES** | Refs devem apontar para entidades existentes |

### 4.8 Dependências

| Módulo | Uso |
|--------|-----|
| **Catálogo** | Busca semântica (similaridade) + indexação |
| **MS_Produto** | Extensão (épicos, RICE, feedback, tipos) |
| **Epistemologia** | Destino para tipo ciclo_epistemologico |
| **PROMETHEUS** | Destino para tipos desenvolvimento e bug |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação com métodos capturar, criar, enriquecer, arquivar. |
| 1.1 | 2025-12-08 | Adicionado método merge() para unificar itens relacionados. |
| 1.2 | 2025-12-09 | Extensão MS_Produto: campos opcionais (epico_ref, rice_*, feedback_origem). |
| 1.3 | 2025-12-16 | **Propagação MS_Produto v2.0**: Atributo tipo com enum (ciclo_epistemologico, desenvolvimento, bug, feature, epico, minor). Atributos de rastreabilidade (feature_ref, produto_ref, spec_ref, pai_ref, avaliacao_ref). Tabela de roteamento tipo→sistema. Métodos listar_por_tipo() e listar_por_feature(). |

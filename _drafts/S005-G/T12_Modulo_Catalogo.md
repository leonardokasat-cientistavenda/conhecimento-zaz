---
nome: T12_Modulo_Catalogo
versao: "0.3"
tipo: Draft
classe_ref: Modulo
origem: interno
status: Draft
etapa: M3
sprint_ref: S005-G
task_ref: T12
---

# Módulo Catálogo

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Catálogo** | Repositório com busca semântica para armazenar e recuperar itens |
| **Item** | Qualquer objeto indexado (Meta Sistema, Decisão, Documento, etc.) |
| **Chave Semântica** | Descrição textual que permite busca por significado |
| **Metadata** | Dados adicionais do item (uso_count, confirmacoes, etc.) |
| **Score** | Pontuação de relevância retornada pela busca |

### 1.2 Contexto: Escopo Redefinido

Durante discussão sobre responsabilidades GENESIS ↔ Catálogo, identificamos confusão:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CONFUSÃO IDENTIFICADA                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✗ ESCOPO INFLADO (errado):                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Catálogo que:                                                      │    │
│  │  • Entende problema do usuário         ← Função do GENESIS!         │    │
│  │  • Classifica tipo de problema         ← Função do GENESIS!         │    │
│  │  • Decide se cria novo Meta Sistema    ← Função do GENESIS!         │    │
│  │  • Roteia para trabalhador             ← Função do GENESIS!         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ✓ ESCOPO CORRETO:                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Catálogo que:                                                      │    │
│  │  • Armazena itens com chave semântica                               │    │
│  │  • Busca itens por similaridade                                     │    │
│  │  • Retorna resultados com score                                     │    │
│  │  • Armazena metadata (mas não interpreta)                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│  "Como persistir e recuperar conhecimento de forma que sistemas             │
│   possam consultar sem perder informação (anti-entropia)?"                  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐        │
│  │  CONHECIMENTO     │  │  BUSCA EXATA      │  │  DUPLICAÇÃO       │        │
│  │  PERDIDO          │  │  FALHA            │  │  DE LÓGICA        │        │
│  │ Sessão termina,   │  │ "vendas" não      │  │ Cada módulo       │        │
│  │ conhecimento some │  │ encontra          │  │ implementa sua    │        │
│  │                   │  │ "comercial"       │  │ própria busca     │        │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘        │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SOLUÇÃO                                         │
│  CATÁLOGO: Memória estruturada com busca semântica                          │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  indexar(item, chave, metadata) → void                                │  │
│  │  buscar(query, top_k, threshold) → [{item, score}]                    │  │
│  │  remover(item_id) → void                                              │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Catálogo = Memória | GENESIS = Inteligência que usa a memória              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Relação com GENESIS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS USA CATÁLOGO COMO FERRAMENTA                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Inteligência Orquestradora):                                      │
│  │                                                                          │
│  ├─ ENTENDE problema (M0/Saussure)                                          │
│  │                                                                          │
│  ├─ CONSULTA memória                                                        │
│  │   └─ catalogo.buscar(query) ← USA CATÁLOGO                               │
│  │                                                                          │
│  ├─ CLASSIFICA natureza do problema                                         │
│  │   ├─ Conhecimento existente? → Meta Sistema                              │
│  │   ├─ Criar conhecimento? → Epistemologia                                 │
│  │   └─ Tomar decisão? → Raciocínio                                         │
│  │                                                                          │
│  └─ ROTEIA para trabalhador especializado                                   │
│                                                                             │
│  CATÁLOGO (Memória Estruturada):                                            │
│  │                                                                          │
│  ├─ Armazena Meta Sistemas indexados por triggers                           │
│  ├─ Armazena Decisões indexadas por contexto                                │
│  ├─ Armazena Documentos indexados por conteúdo                              │
│  └─ Não sabe o que é Meta Sistema, Decisão, etc. (agnóstico)                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.5 Tese

> **Módulo Catálogo é infraestrutura de memória estruturada com busca semântica.**
>
> - **Interface genérica:** indexar(), buscar(), remover()
> - **Agnóstico ao domínio:** não sabe o que armazena
> - **Armazena metadata:** mas não interpreta (quem interpreta é o consumidor)
>
> **Princípio:** Catálogo = Memória burra. GENESIS = Inteligência que usa memória.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos de Information Retrieval

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EVOLUÇÃO DE INFORMATION RETRIEVAL                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐        │
│  │  KEYWORD SEARCH │     │ SEMANTIC SEARCH │     │  HYBRID SEARCH  │        │
│  │  (Sparse)       │     │  (Dense)        │     │  (Combinado)    │        │
│  ├─────────────────┤     ├─────────────────┤     ├─────────────────┤        │
│  │ TF-IDF, BM25    │     │ Embeddings      │     │ BM25 + Vector   │        │
│  │ Exact match     │     │ Meaning match   │     │ Best of both    │        │
│  │ Fast, precise   │     │ Context-aware   │     │ RRF fusion      │        │
│  └─────────────────┘     └─────────────────┘     └─────────────────┘        │
│                                                                             │
│  DECISÃO PARA CATÁLOGO: Hybrid Search (BM25 + Embeddings + RRF)             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 BM25 (Keyword Search)

**Fonte:** Robertson & Zaragoza, "The Probabilistic Relevance Framework: BM25 and Beyond" (2009)

- Match exato de termos
- Eficiente, não requer modelo externo
- Bom para termos técnicos específicos

### 2.3 Embeddings (Semantic Search)

**Fonte:** Reimers & Gurevych, "Sentence-BERT" (2019)

- Vetores densos representam significado
- Entende sinônimos e paráfrases
- Requer modelo de embedding (LLM)

### 2.4 Reciprocal Rank Fusion (RRF)

**Fonte:** Cormack et al., "Reciprocal Rank Fusion" (CIKM 2009)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FÓRMULA RRF                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RRF_score(d) = Σ  1 / (k + rank(d))                                        │
│                                                                             │
│  Onde:                                                                      │
│  - k = 60 (constante de suavização, valor empírico padrão)                  │
│  - rank(d) = posição do documento em cada lista                             │
│                                                                             │
│  Vantagem: Não requer normalização de scores entre sistemas diferentes      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.5 Threshold vs Top-K

| Abordagem | Quando Usar | Comportamento |
|-----------|-------------|---------------|
| **Top-K** | "Me dê as K melhores opções" | Sempre retorna K itens |
| **Threshold** | "Existe algo relevante?" | Pode retornar vazio |
| **Combinado** | Recomendado | Top-K filtrado por threshold |

**Valores típicos de threshold (cosine similarity):**
- 0.85+: Alta precisão, poucos resultados
- 0.75: Balanceado (default recomendado)
- 0.60: Alto recall, mais ruído

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| É | NÃO É |
|---|-------|
| Repositório com busca semântica | Orquestrador/Router |
| Agnóstico ao tipo de item | Específico para Meta Sistemas |
| Armazena metadata | Interpreta metadata |
| Infraestrutura (Camada 3) | Inteligência de negócio |
| Usado por GENESIS, Raciocínio, etc. | Ponto de entrada do usuário |

### 3.2 Entradas e Saídas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ENTRADAS E SAÍDAS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  indexar(item, chave, metadata?)                                            │
│  ├─ Input:                                                                  │
│  │   • item: any (objeto a armazenar)                                       │
│  │   • chave: string (descrição semântica para busca)                       │
│  │   • metadata?: object (dados adicionais opcionais)                       │
│  └─ Output: void                                                            │
│                                                                             │
│  buscar(query, options?)                                                    │
│  ├─ Input:                                                                  │
│  │   • query: string (texto de busca)                                       │
│  │   • options?: { top_k?: number, threshold?: float }                      │
│  └─ Output: [{ item, score, metadata }]                                     │
│                                                                             │
│  remover(item_id)                                                           │
│  ├─ Input:                                                                  │
│  │   • item_id: string                                                      │
│  └─ Output: void                                                            │
│                                                                             │
│  atualizar_metadata(item_id, metadata)                                      │
│  ├─ Input:                                                                  │
│  │   • item_id: string                                                      │
│  │   • metadata: object (merge com existente)                               │
│  └─ Output: void                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Quem Usa o Catálogo

| Consumidor | O que indexa | O que busca | Metadata típica |
|------------|--------------|-------------|-----------------|
| **GENESIS** | Meta Sistemas | Query do usuário | cobertura, pai |
| **Raciocínio** | Decisões | Problema similar | uso_count, confirmacoes |
| **Epistemologia** | Documentos | Conteúdo | versao, status |

**Nota sobre metadata de Raciocínio:**
A "força" de uma decisão (uso_count, confirmacoes) é metadata armazenada no Catálogo, mas **interpretada** pelo Raciocínio. Catálogo não sabe o que significa, só guarda.

---

## 4. Classe (M3)

### 4.1 Diagrama da Classe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CATÁLOGO                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  - indice: Map<id, {item, chave, embedding, metadata}>                      │
│  - config: {                                                                │
│      default_top_k: number,      # default: 5                               │
│      default_threshold: float,   # default: 0.75                            │
│      rrf_k: number               # default: 60                              │
│    }                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Públicos                                                           │
│  ────────────────                                                           │
│  + indexar(item, chave, metadata?): void                                    │
│  + buscar(query, options?): ResultadoBusca[]                                │
│  + remover(item_id): void                                                   │
│  + atualizar_metadata(item_id, metadata): void                              │
│  + listar(): ItemIndexado[]                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos Privados                                                           │
│  ────────────────                                                           │
│  - gerar_embedding(texto): float[]                                          │
│  - busca_bm25(query): RankedList                                            │
│  - busca_vector(query_embedding): RankedList                                │
│  - fusao_rrf(listas: RankedList[]): ResultadoBusca[]                        │
│  - gerar_id(item): string                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Tipos                                                                      │
│  ─────                                                                      │
│  ItemIndexado = { id, item, chave, metadata }                               │
│  ResultadoBusca = { item, score, metadata }                                 │
│  RankedList = { id, rank }[]                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Método: indexar()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    indexar(item, chave, metadata?)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. Gerar ID único para o item                                              │
│     └─ id = gerar_id(item) ou hash da chave                                 │
│                                                                             │
│  2. Gerar embedding da chave semântica                                      │
│     └─ embedding = gerar_embedding(chave)                                   │
│                                                                             │
│  3. Armazenar no índice                                                     │
│     └─ indice.set(id, {                                                     │
│          item: item,                                                        │
│          chave: chave,                                                      │
│          embedding: embedding,                                              │
│          metadata: metadata || {}                                           │
│        })                                                                   │
│                                                                             │
│  4. Persistir índice (se configurado)                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Método: buscar()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    buscar(query, options?)                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input:                                                                     │
│  - query: string                                                            │
│  - options: { top_k?: number, threshold?: float }                           │
│                                                                             │
│  1. Extrair parâmetros                                                      │
│     └─ top_k = options.top_k || config.default_top_k                        │
│     └─ threshold = options.threshold || config.default_threshold            │
│                                                                             │
│  2. Executar busca BM25 (keyword)                                           │
│     └─ lista_bm25 = busca_bm25(query)                                       │
│                                                                             │
│  3. Executar busca vetorial (semantic)                                      │
│     └─ query_embedding = gerar_embedding(query)                             │
│     └─ lista_vector = busca_vector(query_embedding)                         │
│                                                                             │
│  4. Fusão via RRF                                                           │
│     └─ resultados = fusao_rrf([lista_bm25, lista_vector])                   │
│                                                                             │
│  5. Filtrar por threshold                                                   │
│     └─ resultados = resultados.filter(r => r.score >= threshold)            │
│                                                                             │
│  6. Limitar a top_k                                                         │
│     └─ resultados = resultados.slice(0, top_k)                              │
│                                                                             │
│  7. Retornar com metadata                                                   │
│     └─ return resultados.map(r => ({                                        │
│          item: indice.get(r.id).item,                                       │
│          score: r.score,                                                    │
│          metadata: indice.get(r.id).metadata                                │
│        }))                                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Método: atualizar_metadata()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    atualizar_metadata(item_id, metadata)                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Propósito: Permitir que consumidores atualizem metadata sem reindexar      │
│                                                                             │
│  Exemplo de uso pelo Raciocínio:                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  // Decisão foi usada novamente                                     │    │
│  │  catalogo.atualizar_metadata(decisao_id, {                          │    │
│  │    uso_count: uso_count + 1                                         │    │
│  │  })                                                                 │    │
│  │                                                                     │    │
│  │  // Decisão foi confirmada como boa                                 │    │
│  │  catalogo.atualizar_metadata(decisao_id, {                          │    │
│  │    confirmacoes: confirmacoes + 1,                                  │    │
│  │    ultima_confirmacao: "2025-12-05"                                 │    │
│  │  })                                                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Implementação:                                                             │
│  1. Obter entrada existente                                                 │
│     └─ entrada = indice.get(item_id)                                        │
│  2. Merge metadata                                                          │
│     └─ entrada.metadata = { ...entrada.metadata, ...metadata }              │
│  3. Persistir                                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Persistência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PERSISTÊNCIA DO ÍNDICE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Opções para MVP:                                                           │
│                                                                             │
│  OPÇÃO A: Arquivo JSON (simples)                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  _catalogo/                                                         │    │
│  │  ├── meta_sistemas.json                                             │    │
│  │  ├── decisoes.json                                                  │    │
│  │  └── documentos.json                                                │    │
│  │                                                                     │    │
│  │  Cada arquivo contém:                                               │    │
│  │  {                                                                  │    │
│  │    "versao": "1.0",                                                 │    │
│  │    "itens": [                                                       │    │
│  │      { "id": "...", "chave": "...", "embedding": [...], "meta": {} }│    │
│  │    ]                                                                │    │
│  │  }                                                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  OPÇÃO B: Inline no documento (SSOT)                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Cada Meta Sistema/Decisão tem sua chave semântica no frontmatter   │    │
│  │  Catálogo lê e monta índice em memória ao inicializar               │    │
│  │  Não há arquivo separado de índice                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  RECOMENDAÇÃO: Opção B (SSOT, menos sincronização)                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Restrições

| Regra | Especificação |
|-------|---------------|
| R1 | chave não pode ser vazia (mínimo 10 caracteres) |
| R2 | item_id deve ser único no catálogo |
| R3 | threshold deve estar entre 0.0 e 1.0 |
| R4 | top_k deve ser >= 1 |

---

## Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_Epistemologia.md | Pai - contém este módulo |
| genesis/GENESIS.md | Principal consumidor |
| _drafts/S005-G/T11_Modulo_Raciocinio.md | Consumidor (indexa decisões) |

### Externas

| Referência | Aplicação |
|------------|-----------|
| Robertson & Zaragoza, "BM25 and Beyond" (2009) | Algoritmo BM25 |
| Cormack et al., "Reciprocal Rank Fusion" (CIKM 2009) | Algoritmo RRF |
| Reimers & Gurevych, "Sentence-BERT" (2019) | Embeddings semânticos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | M0 inicial - Problema e casos de uso |
| 0.2 | 2025-12-05 | M1 Marco Teórico - BM25, Embeddings, Hybrid Search, RRF |
| 0.3 | 2025-12-05 | Refatoração M0-M3: escopo reduzido para repositório com busca |

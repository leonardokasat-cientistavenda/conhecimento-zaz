---
nome: 00_E_2_1_Modulo_Catalogo
versao: "1.3"
tipo: Modulo
classe_ref: Modulo
origem: interno
status: Publicado
etapa: M4
sprint_ref: S019
task_ref: T01
camada: C3
---

# Módulo Catálogo v1.3

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Catálogo** | Repositório com busca semântica para armazenar e recuperar itens |
| **Item** | Qualquer objeto indexado (Meta Sistema, Decisão, Documento, etc.) |
| **Chave Semântica** | Descrição textual que permite busca por significado |
| **Metadata** | Dados adicionais do item (uso_count, confirmacoes, etc.) |
| **Score** | Pontuação de relevância retornada pela busca |
| **Trigger** | Frase que ativa o item na busca (match exato = alta relevância) |
| **Tipo** | Categoria do item indexado (docs, backlog, sprint, templates) |
| **Template** | Modelo de especificação para vertentes M3.* (novo v1.3) |

### 1.2 Diagrama do Problema

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
│  │  buscar(query, options) → [{item, score, metadata}]                   │  │
│  │  atualizar_metadata(item_id, metadata) → void                         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Catálogo = Memória | GENESIS = Inteligência que usa a memória              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

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

### 2.2 Algoritmos

| Algoritmo | Fonte | Aplicação |
|-----------|-------|-----------|
| **BM25** | Robertson & Zaragoza (2009) | Match exato de termos |
| **Embeddings** | Reimers & Gurevych (2019) | Similaridade semântica |
| **RRF** | Cormack et al. (2009) | Fusão de rankings |

### 2.3 Fórmula RRF

```
RRF_score(d) = Σ  1 / (k + rank(d))

Onde:
- k = 60 (constante de suavização)
- rank(d) = posição do documento em cada lista

Vantagem: Não requer normalização de scores entre sistemas diferentes
```

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

### 3.2 Quem Usa o Catálogo

| Consumidor | O que indexa | O que busca | Metadata típica |
|------------|--------------|-------------|-----------------|
| **GENESIS** | Meta Sistemas | Query do usuário | cobertura, pai |
| **Raciocínio** | Decisões | Problema similar | uso_count, confirmacoes |
| **Epistemologia** | Documentos, Templates | Conteúdo, Vertente M3.* | versao, status, vertente |

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
│      default_top_k: number = 5,                                             │
│      default_threshold: float = 0.75,                                       │
│      rrf_k: number = 60                                                     │
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
│  Input:                                                                     │
│  - item: any (objeto a armazenar)                                           │
│  - chave: string (descrição semântica, mín 10 caracteres)                   │
│  - metadata?: object (dados adicionais opcionais)                           │
│                                                                             │
│  Output: void                                                               │
│                                                                             │
│  Passos:                                                                    │
│  1. Gerar ID único para o item                                              │
│  2. Gerar embedding da chave semântica                                      │
│  3. Armazenar no índice: {item, chave, embedding, metadata}                 │
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
│  - query: string (texto de busca)                                           │
│  - options?: {                                                              │
│      top_k?: number,                                                        │
│      threshold?: float,                                                     │
│      tipo?: "docs" | "backlog" | "sprint" | "templates"  # v1.3             │
│    }                                                                        │
│                                                                             │
│  Output: [{ item, score, metadata }]                                        │
│                                                                             │
│  Passos:                                                                    │
│  1. Executar busca BM25 (keyword)                                           │
│  2. Executar busca vetorial (semantic)                                      │
│  3. Fusão via RRF                                                           │
│  4. Filtrar por threshold                                                   │
│  5. Limitar a top_k                                                         │
│  6. Retornar com metadata                                                   │
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
│  │    ultima_confirmacao: "2025-12-06"                                 │    │
│  │  })                                                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Implementação:                                                             │
│  1. Obter entrada existente                                                 │
│  2. Merge metadata: { ...existente, ...novo }                               │
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
│  RECOMENDAÇÃO: Inline no documento (SSOT)                                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Cada Meta Sistema/Decisão tem sua chave semântica no frontmatter   │    │
│  │  Catálogo lê e monta índice em memória ao inicializar               │    │
│  │  Não há arquivo separado de índice                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Vantagem: SSOT (Single Source of Truth), menos sincronização               │
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

### 4.7 Implementação Atual (MVP)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    IMPLEMENTAÇÃO MVP: ÍNDICE YAML                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Arquivo: _catalogo/indice.yaml                                             │
│                                                                             │
│  TIPOS SUPORTADOS (v1.3):                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  docs      → Conhecimento publicado (Meta Sistemas, Infra, etc.)    │    │
│  │  backlog   → Itens de trabalho pendente (_backlog/*.md)             │    │
│  │  sprint    → Ciclos de execução (_sprints/*.md)                     │    │
│  │  templates → Templates de especificação M3.* (NOVO v1.3)            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ESTRUTURA DO ITEM:                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - id: "ms_epistemologia"           # Identificador único            │    │
│  │    tipo: MetaSistema                # Tipo do item                   │    │
│  │    nome: "Epistemologia"            # Nome legível                   │    │
│  │    chave: "criar meta sistemas..."  # Palavras-chave semânticas      │    │
│  │    arquivo: "docs/00_E/..."         # Path do arquivo                │    │
│  │    triggers:                        # Frases que ativam              │    │
│  │      - "como estruturar conhecimento"                               │    │
│  │      - "criar meta sistema"                                         │    │
│  │    metadata:                        # Dados adicionais               │    │
│  │      versao: "3.4"                                                  │    │
│  │      camada: C3                                                     │    │
│  │      status: Publicado                                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ESTRUTURA DO TEMPLATE (NOVO v1.3):                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  - id: "template_spec_poo"                                          │    │
│  │    nome: "Template M3.E - POO"                                      │    │
│  │    chave: "especificar classe python..."                            │    │
│  │    arquivo: "_catalogo/templates/M3_E_POO.md"                       │    │
│  │    triggers:                                                        │    │
│  │      - "especificar classe"                                         │    │
│  │      - "M3.E"                                                       │    │
│  │    metadata:                                                        │    │
│  │      vertente: "M3.E"                                               │    │
│  │      artefatos_produzidos: [".py", "test_.py", ".feature"]          │    │
│  │      schema_tdd: true                                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ALGORITMO DE BUSCA (MVP):                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1. Ler _catalogo/indice.yaml                                       │    │
│  │  2. Para cada item:                                                 │    │
│  │     - Match exato em trigger → ALTA relevância                      │    │
│  │     - Match parcial em chave → MÉDIA relevância                     │    │
│  │     - Sem match → ignorar                                           │    │
│  │  3. Selecionar item com maior relevância                            │    │
│  │  4. Carregar arquivo do item selecionado                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  LIMITAÇÕES DO MVP:                                                         │
│  - Busca por string matching (sem embeddings)                               │
│  - Índice estático (edição manual)                                          │
│  - Sem score numérico (apenas ranking)                                      │
│                                                                             │
│  EVOLUÇÃO FUTURA: Ver _backlog/BKL-C01_Catalogo_v2.md                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| _catalogo/indice.yaml | Implementação MVP do índice |
| _catalogo/templates/ | Templates de especificação M3.* (novo v1.3) |
| _catalogo/README.md | Instruções de uso |
| docs/00_E/00_E_Epistemologia.md | Pai - contém este módulo |
| genesis/GENESIS.md | Principal consumidor |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Consumidor - indexa decisões |
| _backlog/BKL-C01_Catalogo_v2.md | Backlog: reintegração com GENESIS v5.0 |

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
| 0.1-0.3 | 2025-12-05 | Desenvolvimento M0-M3 em _drafts/ |
| 1.0 | 2025-12-06 | **Publicação M4.** Interface consolidada: indexar, buscar, atualizar_metadata. Algoritmo Hybrid Search (BM25 + Embeddings + RRF). Sprint S005-G/T13. |
| 1.1 | 2025-12-07 | **Implementação MVP.** Seção 4.7 com índice YAML (_catalogo/indice.yaml). Termo "trigger" no glossário. Referências ao índice e README. Sprint S006-C/T05. |
| 1.2 | 2025-12-08 | **Multi-tipo.** Catálogo suporta tipos: docs, backlog, sprint. Filtro por tipo no buscar(). Sprint S008/T02. |
| 1.3 | 2025-12-16 | **Tipo templates.** Suporte a templates de especificação M3.* para Epistemologia v4.0. Metadata: vertente, artefatos_produzidos, schema_tdd. Referência BKL-C01 para evolução futura. Sprint S019/T01. |

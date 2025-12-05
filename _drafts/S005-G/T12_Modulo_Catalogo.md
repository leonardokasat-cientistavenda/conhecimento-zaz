---
nome: T12_Modulo_Catalogo
versao: "0.2"
tipo: Draft
classe_ref: Modulo
origem: interno
status: Draft
etapa: M1
sprint_ref: S005-G
task_ref: T12
---

# Módulo Catálogo

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Catálogo** | Índice estruturado que permite busca semântica |
| **Busca Semântica** | Encontrar item por significado, não apenas texto exato |
| **Chave** | Descrição semântica do que um item resolve/contém |
| **Match** | Correspondência entre query e chave com score de relevância |
| **Indexar** | Registrar item no catálogo com sua chave semântica |

### 1.2 Contexto: Por que Catálogo?

Durante desenvolvimento do Módulo Raciocínio (T11), identificamos problema recorrente:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PROBLEMA IDENTIFICADO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS precisa rotear usuário → Meta Sistema correto                      │
│  └─ Como? Busca semântica: problema ↔ domínio do Meta Sistema               │
│                                                                             │
│  Raciocínio precisa reutilizar decisões anteriores                          │
│  └─ Como? Busca semântica: problema+contexto ↔ decisão existente            │
│                                                                             │
│  MESMO PADRÃO, MESMA SOLUÇÃO                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│  "Como encontrar o item certo em um conjunto, usando linguagem natural?"    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐        │
│  │  BUSCA FALHA      │  │  DUPLICAÇÃO       │  │  ACOPLAMENTO      │        │
│  │ Texto exato não   │  │ Cada módulo       │  │ Lógica de busca   │        │
│  │ encontra por      │  │ implementa sua    │  │ espalhada em      │        │
│  │ significado       │  │ própria busca     │  │ vários lugares    │        │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘        │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SOLUÇÃO                                         │
│  MÓDULO CATÁLOGO: Interface genérica de busca semântica                     │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  indexar(item, chave) → registra no catálogo                          │  │
│  │  buscar(query) → item[] com score                                     │  │
│  │  match(query, threshold) → melhor item ou null                        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│  Composição: Qualquer módulo/sistema pode usar Catálogo                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Casos de Uso Identificados

| Quem Usa | Catálogo de | Query | Resultado |
|----------|-------------|-------|-----------|
| **GENESIS** | Meta Sistemas | "como vender mais" | Meta Sistema Vendas |
| **Raciocínio** | Decisões | "desconto cliente ACME" | Decisão anterior similar |
| **Epistemologia** | Documentos | "como criar M0" | Doc 00_E_1_1_Problema.md |
| **[Futuro]** | Qualquer | Qualquer | Item relevante |

### 1.5 Tese

> **Módulo Catálogo é infraestrutura de busca semântica que permite encontrar itens por significado, não apenas por texto exato.**
>
> - Interface genérica: indexar(), buscar(), match()
> - Reutilizável: qualquer módulo/sistema pode compor
> - Centralizado: lógica de busca em um só lugar
>
> **Princípio:** Catálogo é infraestrutura. Outros módulos dependem dele.

### 1.6 Perguntas Abertas para M1

| Pergunta | Impacto |
|----------|---------|
| Como calcular similaridade semântica? | Embeddings? Keywords? Híbrido? |
| Onde persistir o índice? | Arquivo? Memória? |
| Como atualizar índice quando item muda? | Automático? Manual? |
| Qual threshold padrão para match? | 0.7? 0.8? Configurável? |

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos de Information Retrieval

O problema de busca semântica pertence ao campo de **Information Retrieval (IR)**, que estuda como encontrar documentos relevantes dado uma query. A evolução do campo produziu três paradigmas principais:

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
│         ▲                       ▲                       ▲                   │
│         │                       │                       │                   │
│    "apple pie"              "dessert"            "apple pie recipe"         │
│    encontra exato         encontra similar       encontra ambos             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Keyword Search: BM25 (Best Matching 25)

**Fonte:** Robertson & Zaragoza, "The Probabilistic Relevance Framework: BM25 and Beyond" (2009)

BM25 é o algoritmo padrão para busca por palavras-chave, usado em Elasticsearch, Lucene, e engines de busca web. Ele melhora o TF-IDF clássico com três componentes:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FÓRMULA BM25 SIMPLIFICADA                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Score(D, Q) = Σ IDF(qi) × TF_saturado(qi, D)                               │
│                                                                             │
│  Onde:                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ TF (Term Frequency)  │ Quantas vezes termo aparece no documento     │    │
│  │ IDF (Inverse Doc F.) │ Raridade do termo no corpus (raro = +peso)   │    │
│  │ Saturação (k1)       │ Evita que repetição excessiva inflacione     │    │
│  │ Normalização (b)     │ Ajusta por tamanho do documento              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Parâmetros típicos: k1 = 1.2, b = 0.75                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Forças do BM25:**
- Preciso para termos específicos (nomes, códigos, IDs)
- Computacionalmente eficiente
- Não requer treinamento ou modelos externos
- Funciona bem com termos técnicos/domínio

**Fraquezas do BM25:**
- Não entende sinônimos ("carro" ≠ "automóvel")
- Ignora contexto semântico
- Match puramente lexical

### 2.3 Semantic Search: Embeddings

**Fonte:** Manning et al., "Introduction to Information Retrieval" (2008); Reimers & Gurevych, "Sentence-BERT" (2019)

Busca semântica usa embeddings (vetores densos) para representar significado. Textos similares em significado ficam próximos no espaço vetorial.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMO EMBEDDINGS FUNCIONAM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Texto → Modelo de Embedding → Vetor [0.12, -0.45, 0.78, ...]               │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                     ESPAÇO VETORIAL                                 │    │
│  │                                                                     │    │
│  │        "como aumentar vendas"  ●────┐                               │    │
│  │                                      ├─── PRÓXIMOS (similar)        │    │
│  │        "estratégia comercial"  ●────┘                               │    │
│  │                                                                     │    │
│  │                                                                     │    │
│  │        "receita de bolo"       ●──────── DISTANTE (diferente)       │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Similaridade = Cosine(vetor_query, vetor_documento)                        │
│  Range: -1 (oposto) a 1 (idêntico), tipicamente 0.7-1.0 para similares      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Forças dos Embeddings:**
- Entende sinônimos e paráfrases
- Captura contexto semântico
- Funciona com queries em linguagem natural

**Fraquezas dos Embeddings:**
- Requer modelo de embedding (custo, latência)
- Pode falhar com termos fora do vocabulário de treino
- Menos preciso para termos técnicos específicos

### 2.4 Hybrid Search: O Melhor dos Dois Mundos

**Fonte:** Cormack et al., "Reciprocal Rank Fusion" (CIKM 2009); Weaviate, Elastic, Azure AI Search documentation

Hybrid Search combina keyword search (BM25) e semantic search (embeddings) para obter precisão de termos exatos + compreensão semântica.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ARQUITETURA HYBRID SEARCH                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                           Query do Usuário                                  │
│                                 │                                           │
│                    ┌────────────┴────────────┐                              │
│                    ▼                         ▼                              │
│           ┌─────────────────┐       ┌─────────────────┐                     │
│           │  BM25 Search    │       │  Vector Search  │                     │
│           │  (Keywords)     │       │  (Embeddings)   │                     │
│           └────────┬────────┘       └────────┬────────┘                     │
│                    │                         │                              │
│                    ▼                         ▼                              │
│           ┌─────────────────┐       ┌─────────────────┐                     │
│           │ Ranked List A   │       │ Ranked List B   │                     │
│           │ 1. Doc X        │       │ 1. Doc Y        │                     │
│           │ 2. Doc Y        │       │ 2. Doc X        │                     │
│           │ 3. Doc Z        │       │ 3. Doc W        │                     │
│           └────────┬────────┘       └────────┬────────┘                     │
│                    │                         │                              │
│                    └────────────┬────────────┘                              │
│                                 ▼                                           │
│                    ┌─────────────────────────┐                              │
│                    │  Reciprocal Rank Fusion │                              │
│                    │       (RRF)             │                              │
│                    └────────────┬────────────┘                              │
│                                 ▼                                           │
│                    ┌─────────────────────────┐                              │
│                    │   Final Ranked List     │                              │
│                    │   1. Doc X (aparece     │                              │
│                    │      bem em ambos)      │                              │
│                    │   2. Doc Y              │                              │
│                    │   3. Doc Z              │                              │
│                    └─────────────────────────┘                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.5 Reciprocal Rank Fusion (RRF)

**Fonte:** Cormack, Clarke & Grossman, "Reciprocal Rank Fusion" (CIKM 2009)

RRF é o algoritmo padrão para combinar resultados de múltiplos sistemas de busca. Vantagem principal: **não requer normalização de scores** - usa apenas posições (ranks).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FÓRMULA RRF                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RRF_score(d) = Σ  1 / (k + rank(d))                                        │
│                                                                             │
│  Onde:                                                                      │
│  - d = documento                                                            │
│  - k = constante de suavização (tipicamente 60)                             │
│  - rank(d) = posição do documento em cada lista (1, 2, 3...)                │
│                                                                             │
│  EXEMPLO:                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │  Doc X: rank 1 em BM25, rank 2 em Vector                            │    │
│  │  RRF(X) = 1/(60+1) + 1/(60+2) = 0.0164 + 0.0161 = 0.0325            │    │
│  │                                                                     │    │
│  │  Doc Y: rank 3 em BM25, rank 1 em Vector                            │    │
│  │  RRF(Y) = 1/(60+3) + 1/(60+1) = 0.0159 + 0.0164 = 0.0323            │    │
│  │                                                                     │    │
│  │  Doc Z: rank 2 em BM25, não aparece em Vector                       │    │
│  │  RRF(Z) = 1/(60+2) + 0 = 0.0161                                     │    │
│  │                                                                     │    │
│  │  Resultado: X > Y > Z (docs que aparecem em ambos ganham)           │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Por que k=60?                                                              │
│  - Valor empírico que balanceia top-ranks vs consenso                       │
│  - k baixo → prioriza posição #1                                            │
│  - k alto → prioriza consenso entre sistemas                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.6 Threshold de Similaridade

**Fonte:** Análise empírica de múltiplos sistemas de embedding

A escolha de threshold depende do contexto e do modelo de embedding usado:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GUIDELINES PARA THRESHOLD                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  ABORDAGEM TOP-K vs THRESHOLD                                       │    │
│  │                                                                     │    │
│  │  Top-K: Retorna os K melhores, independente de score                │    │
│  │         → Bom para: "Me dê as 3 melhores opções"                    │    │
│  │         → Sempre retorna algo, mesmo irrelevante                    │    │
│  │                                                                     │    │
│  │  Threshold: Retorna apenas scores acima do limite                   │    │
│  │         → Bom para: "Existe algo relevante?"                        │    │
│  │         → Pode retornar vazio (match() → null)                      │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  VALORES TÍPICOS DE THRESHOLD (Cosine Similarity)                   │    │
│  │                                                                     │    │
│  │  0.85+ │ Alta precisão, poucos resultados                           │    │
│  │  0.75  │ Balanceado (recomendado como default)                      │    │
│  │  0.60  │ Alto recall, mais resultados (pode incluir ruído)          │    │
│  │  <0.60 │ Geralmente irrelevante                                     │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  RECOMENDAÇÃO: Threshold configurável com default 0.75                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.7 Decisão de Arquitetura: Qual Abordagem Usar?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 DECISÃO DE ARQUITETURA PARA CATÁLOGO                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CONTEXTO DO GENESIS:                                                       │
│  - Catálogo pequeno (dezenas, não milhões de itens)                         │
│  - Queries em linguagem natural                                             │
│  - Precisa entender sinônimos ("vendas" ≈ "comercial")                      │
│  - Alguns termos técnicos específicos (nomes de Meta Sistemas)              │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                   OPÇÃO ESCOLHIDA: HYBRID SEARCH                    │    │
│  │                                                                     │    │
│  │  1. BM25 para match exato de termos técnicos                        │    │
│  │  2. Embeddings (via LLM) para semântica                             │    │
│  │  3. RRF para fusão dos resultados                                   │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  SIMPLIFICAÇÃO PARA MVP:                                                    │
│  Como o catálogo é pequeno e o LLM já está presente:                        │
│  - Usar LLM para gerar embeddings (sem infra adicional)                     │
│  - Implementar BM25 simples (TF-IDF básico)                                 │
│  - RRF com k=60 (valor padrão)                                              │
│  - Threshold default 0.75, configurável por catálogo                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.8 Síntese: Princípios do Marco Teórico

| Princípio | Fonte | Aplicação no Catálogo |
|-----------|-------|----------------------|
| **Hybrid Search** | IR moderno | Combina precisão (keywords) + compreensão (embeddings) |
| **BM25** | Robertson (2009) | Busca por termos exatos, nomes técnicos |
| **Embeddings** | Sentence-BERT | Busca por significado, sinônimos |
| **RRF** | Cormack (2009) | Fusão de rankings sem normalização |
| **Top-K + Threshold** | Prática IR | Retornar melhores K acima de threshold |

---

## 3. Objeto (M2)

*A definir na próxima etapa.*

---

## 4. Classe (M3)

*A definir na próxima etapa.*

---

## Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_Epistemologia.md | Pai - contém este módulo |
| _drafts/S005-G/T11_Modulo_Raciocinio.md | Depende deste módulo |
| genesis/GENESIS.md | Usa para rotear Meta Sistemas |

### Externas

| Referência | Aplicação |
|------------|-----------|
| Robertson & Zaragoza, "BM25 and Beyond" (2009) | Fundamentação BM25 |
| Cormack et al., "Reciprocal Rank Fusion" (CIKM 2009) | Algoritmo RRF |
| Manning et al., "Introduction to IR" (2008) | Fundamentos gerais |
| Reimers & Gurevych, "Sentence-BERT" (2019) | Embeddings semânticos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | M0 inicial - Problema e casos de uso |
| 0.2 | 2025-12-05 | M1 Marco Teórico - BM25, Embeddings, Hybrid Search, RRF |

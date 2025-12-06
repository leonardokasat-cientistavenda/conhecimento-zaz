---
nome: Evolucao_Catalogo
versao: "1.0"
tipo: Backlog
origem: interno
status: Backlog
camada: C3
prioridade: Media
---

# Evolução do Catálogo - Backlog

## Contexto

O Módulo Catálogo v1.0 foi publicado em `docs/00_E/00_E_2_1_Modulo_Catalogo.md` com especificação completa da interface e algoritmos. O sistema GENESIS funciona hoje com o LLM executando a busca "mentalmente" via ferramentas GitHub.

Este documento registra a evolução planejada para implementação técnica do Catálogo.

---

## Estado Atual (v1.0)

| Aspecto | Status |
|---------|--------|
| Interface definida | ✅ `indexar()`, `buscar()`, `atualizar_metadata()` |
| Algoritmo especificado | ✅ Hybrid Search (BM25 + Embeddings + RRF) |
| Integração GENESIS | ✅ Documentada |
| Integração Raciocínio | ✅ Documentada |
| Implementação técnica | ⬜ Não iniciada |

**Como funciona hoje:** LLM lê os documentos e executa busca via `github:get_file_contents`. Funcional, mas não otimizado.

---

## Evolução Planejada

### Fase 1: Índice Persistido (Prioridade: Alta)

**Objetivo:** Criar arquivo de índice que o LLM possa consultar rapidamente.

```
_catalogo/
├── indice.yaml          # Lista de itens indexados
├── meta_sistemas.yaml   # Índice específico de Meta Sistemas
└── decisoes.yaml        # Índice específico de Decisões
```

**Formato sugerido:**

```yaml
# _catalogo/indice.yaml
items:
  - id: "ms_epistemologia"
    tipo: MetaSistema
    chave: "criar meta sistemas estruturados anti-entrópicos M0-M4"
    arquivo: "docs/00_E/00_E_Epistemologia.md"
    metadata:
      versao: "3.4"
      problema_que_resolve: "estruturar conhecimento"
      
  - id: "dec_composicao_heranca"
    tipo: Decisao
    chave: "usar composição ou herança para módulos"
    arquivo: "_decisoes/D_2025-12-05_composicao-heranca.md"
    metadata:
      uso_count: 3
      confirmacoes: 2
```

**Benefício:** LLM lê um arquivo pequeno em vez de navegar múltiplos diretórios.

---

### Fase 2: Busca Semântica Local (Prioridade: Média)

**Objetivo:** Implementar busca que encontra itens por significado, não só palavras exatas.

**Opções de implementação:**

| Opção | Descrição | Complexidade |
|-------|-----------|--------------|
| A | Embeddings via API (OpenAI/Anthropic) | Média |
| B | Modelo local (sentence-transformers) | Alta |
| C | BM25 puro (keyword match) | Baixa |

**Recomendação:** Começar com **Opção C (BM25)** e evoluir para A se necessário.

**Implementação BM25 simples:**

```python
# Pseudocódigo
def buscar_bm25(query, indice):
    scores = []
    query_terms = tokenize(query)
    for item in indice:
        item_terms = tokenize(item.chave)
        score = calcular_bm25(query_terms, item_terms)
        scores.append((item, score))
    return sorted(scores, key=lambda x: x[1], reverse=True)[:5]
```

---

### Fase 3: Hybrid Search Completo (Prioridade: Baixa)

**Objetivo:** Implementar algoritmo completo conforme especificação v1.0.

```
Query
  │
  ├─► BM25 (keyword) ────► Ranking 1
  │
  ├─► Embeddings (semantic) ────► Ranking 2
  │
  └─► RRF Fusion ────► Ranking Final
```

**Fórmula RRF:**
```
RRF_score(d) = Σ 1/(k + rank(d))
k = 60 (constante de suavização)
```

**Dependências:**
- Serviço de embeddings (API ou local)
- Persistência de vetores
- Cálculo de similaridade cosseno

---

## Instruções para Próxima Sprint

### Pré-requisitos

1. Ler `docs/00_E/00_E_2_1_Modulo_Catalogo.md` (especificação completa)
2. Ler este documento (`_backlog/Evolucao_Catalogo.md`)
3. Decidir qual Fase implementar

### Tasks Sugeridas

| Task | Descrição | Fase |
|------|-----------|------|
| T01 | Criar estrutura `_catalogo/` | 1 |
| T02 | Criar `indice.yaml` com itens existentes | 1 |
| T03 | Atualizar GENESIS para ler índice | 1 |
| T04 | Implementar BM25 básico | 2 |
| T05 | Testar fluxo completo | 2 |
| T06 | Adicionar embeddings | 3 |
| T07 | Implementar RRF | 3 |

### Decisão Necessária

Antes de iniciar, decidir:

1. **Escopo:** Apenas Fase 1? Fases 1+2? Todas?
2. **Linguagem:** Python script? GitHub Action? Manual pelo LLM?
3. **Persistência:** YAML? JSON? SQLite?

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Especificação v1.0 |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Consumidor (indexa decisões) |
| genesis/GENESIS.md | Consumidor (busca Meta Sistemas) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-06 | Criação do documento de evolução. Três fases definidas. Sprint S005-G concluída, Catálogo especificado mas não implementado tecnicamente. |

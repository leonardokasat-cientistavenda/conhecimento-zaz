---
target: docs/00_E/00_E_2_1_Modulo_Catalogo.md
version_from: "1.1"
version_to: "1.2"
commit_message: "[C3] feat: Catálogo suporta múltiplos tipos (docs, backlog, sprint) - S008/T02"
---

## EDITS

### EDIT 1 - Adicionar tipos ao Glossário
FIND:
```
| **Trigger** | Frase que ativa o item na busca (match exato = alta relevância) |
```
REPLACE:
```
| **Trigger** | Frase que ativa o item na busca (match exato = alta relevância) |
| **Tipo** | Categoria do item indexado (docs, backlog, sprint) |
```

### EDIT 2 - Documentar tipos suportados na seção MVP
FIND:
```
│  ESTRUTURA DO ITEM:                                                         │
```
REPLACE:
```
│  TIPOS SUPORTADOS:                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  docs     → Conhecimento publicado (Meta Sistemas, Infra, etc.)     │    │
│  │  backlog  → Itens de trabalho pendente (_backlog/*.md)              │    │
│  │  sprint   → Ciclos de execução (_sprints/*.md)                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ESTRUTURA DO ITEM:                                                         │
```

### EDIT 3 - Adicionar filtro por tipo no buscar()
FIND:
```
│  - options?: { top_k?: number, threshold?: float, tipo?: string }           │
```
REPLACE:
```
│  - options?: {                                                              │
│      top_k?: number,                                                        │
│      threshold?: float,                                                     │
│      tipo?: "docs" | "backlog" | "sprint"  # Filtra por categoria           │
│    }                                                                        │
```

### EDIT 4 - Atualizar versão no frontmatter
FIND:
```
versao: "1.1"
```
REPLACE:
```
versao: "1.2"
```

### EDIT 5 - Adicionar ao histórico
APPEND_AFTER:
```
| 1.1 | 2025-12-07 | **Implementação MVP.** Seção 4.7 com índice YAML (_catalogo/indice.yaml). Termo "trigger" no glossário. Referências ao índice e README. Sprint S006-C/T05. |
```
ADD:
```
| 1.2 | 2025-12-08 | **Multi-tipo.** Catálogo suporta tipos: docs, backlog, sprint. Filtro por tipo no buscar(). Sprint S008/T02. |
```

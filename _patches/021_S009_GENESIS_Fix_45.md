---
target: genesis/GENESIS.md
version_from: "1.7"
version_to: "1.8"
commit_message: "[C1] fix: corrigir seção 4.5 listar_capabilities - S009"
---

## EDITS

### EDIT 1 - Corrigir seção 4.5 completa
FIND:
```
### 4.5 Método: listar_capabilities()
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Arquivo: _catalogo/indice.yaml                                             │
```
REPLACE:
```
### 4.5 Método: listar_capabilities()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        listar_capabilities()                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: -                                                                   │
│  Output: Lista formatada de capabilities                                    │
│                                                                             │
│  Trigger: "O que você sabe fazer?", "Me ajuda com o quê?", "Capabilities"   │
│                                                                             │
│  Implementação:                                                             │
│  1. Ler _catalogo/indice.yaml                                               │
│  2. Filtrar itens que têm atributo capability                               │
│  3. Formatar resposta amigável                                              │
│                                                                             │
│  Exemplo de resposta:                                                       │
│                                                                             │
│    Posso ajudar você a:                                                     │
│                                                                             │
│    • CONHECER - Criar e buscar conhecimento estruturado                     │
│      Ex: "Como estruturar um processo de vendas?"                           │
│                                                                             │
│    • DECIDIR - Tomar decisões de forma estruturada                          │
│      Ex: "Devo contratar mais ou investir em marketing?"                    │
│                                                                             │
│    • GERENCIAR - Organizar trabalho em backlog e sprints                    │
│      Ex: "O que temos no backlog?"                                          │
│                                                                             │
│    Quer saber mais sobre alguma dessas?                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Como Buscar no Catálogo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    IMPLEMENTAÇÃO: BUSCA NO CATÁLOGO                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Arquivo: _catalogo/indice.yaml                                             │
```

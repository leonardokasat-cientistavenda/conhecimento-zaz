---
target: genesis/GENESIS.md
version_from: "1.6"
version_to: "1.7"
commit_message: "[C1] fix: corrigir seções 4.5 e 4.6 do GENESIS - S009"
---

## EDITS

### EDIT 1 - Corrigir título e conteúdo da seção 4.5
FIND:
```
### 4.5 Método: listar_capabilities() (Implementação)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    IMPLEMENTAÇÃO: BUSCA NO CATÁLOGO                         │
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
│    - CONHECER - Criar e buscar conhecimento estruturado                     │
│      Ex: "Como estruturar um processo de vendas?"                           │
│                                                                             │
│    - DECIDIR - Tomar decisões de forma estruturada                          │
│      Ex: "Devo contratar mais ou investir em marketing?"                    │
│                                                                             │
│    - GERENCIAR - Organizar trabalho em backlog e sprints                    │
│      Ex: "O que temos no backlog?"                                          │
│                                                                             │
│    Quer saber mais sobre alguma dessas?                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

### 4.6 Como Buscar no Catálogo (Implementação)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    IMPLEMENTAÇÃO: BUSCA NO CATÁLOGO                         │
```

### EDIT 2 - Atualizar título no documento
FIND:
```
# GENESIS v1.5
```
REPLACE:
```
# GENESIS v1.7
```

### EDIT 3 - Atualizar versão no frontmatter
FIND:
```
versao: "1.6"
```
REPLACE:
```
versao: "1.7"
```

### EDIT 4 - Adicionar ao histórico
APPEND_AFTER:
```
| 1.6 | 2025-12-08 | **Capability Discovery:** método listar_capabilities() para GENESIS explicar o que sabe fazer. Glossário: Capability, Discovery. Sprint S009. |
```
ADD:
```
| 1.7 | 2025-12-08 | **Fix:** Seções 4.5 (listar_capabilities) e 4.6 (Como Buscar) separadas corretamente. Sprint S009. |
```

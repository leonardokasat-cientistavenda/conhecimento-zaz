---
target: genesis/GENESIS.md
version_from: "1.5"
version_to: "1.6"
commit_message: "[C1] feat: adicionar listar_capabilities() - S009/T05"
---

## EDITS

### EDIT 1 - Adicionar Capability e Discovery ao Glossário
FIND:
```
| **Módulo Autonomia** | Módulo opcional que controla nível de autonomia do loop |

### 1.2 Diagrama do Problema
```
REPLACE:
```
| **Módulo Autonomia** | Módulo opcional que controla nível de autonomia do loop |
| **Capability** | Algo que GENESIS sabe fazer (CONHECER, DECIDIR, GERENCIAR) |
| **Discovery** | Usuário descobre capabilities perguntando "o que você sabe fazer?" |

### 1.2 Diagrama do Problema
```

### EDIT 2 - Adicionar método na tabela resumo
FIND:
```
| `rotear()` | resultado_busca | execução | Reutilizar existente ou criar novo |

### 4.5 Como Buscar no Catálogo
```
REPLACE:
```
| `rotear()` | resultado_busca | execução | Reutilizar existente ou criar novo |
| `listar_capabilities()` | - | [Capability] | Explicar o que GENESIS sabe fazer |

### 4.5 Método: listar_capabilities()

```
listar_capabilities()

Input: -
Output: Lista formatada de capabilities

Trigger: "O que você sabe fazer?", "Me ajuda com o quê?", "Capabilities"

Implementação:
1. Ler _catalogo/indice.yaml
2. Filtrar itens que têm atributo capability
3. Formatar resposta amigável

Exemplo de resposta:

  Posso ajudar você a:

  - CONHECER - Criar e buscar conhecimento estruturado
    Ex: "Como estruturar um processo de vendas?"

  - DECIDIR - Tomar decisões de forma estruturada
    Ex: "Devo contratar mais ou investir em marketing?"

  - GERENCIAR - Organizar trabalho em backlog e sprints
    Ex: "O que temos no backlog?"

  Quer saber mais sobre alguma dessas?
```

### 4.6 Como Buscar no Catálogo
```

### EDIT 3 - Atualizar versão no frontmatter
FIND:
```
versao: "1.5"
```
REPLACE:
```
versao: "1.6"
```

### EDIT 4 - Adicionar ao histórico
APPEND_AFTER:
```
| 1.5 | 2025-12-08 | **GERENCIAR adicionado:** terceiro tipo de roteamento para Gestão de Projetos. Referências: Gestão de Projetos, Backlog, Sprint. Sprint S007. |
```
ADD:
```
| 1.6 | 2025-12-08 | **Capability Discovery:** método listar_capabilities() para GENESIS explicar o que sabe fazer. Glossário: Capability, Discovery. Sprint S009. |
```

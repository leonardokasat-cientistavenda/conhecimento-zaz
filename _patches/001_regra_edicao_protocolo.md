---
target: docs/00_I_1_2_Protocolo_LLM.md
version_from: "1.0"
version_to: "1.1"
commit_message: "[C2] update: Adiciona REGRA DE EDIÇÃO ao Protocolo LLM - S005-G/T07"
---

## EDITS

### EDIT 1
APPEND_AFTER:
```
Exemplo: [C3] add: M0 Problema para Vendas
```
ADD:
```

---

## REGRA DE EDIÇÃO

Antes de editar arquivo existente:
1. Avaliar escopo da mudança
2. Confirmar com usuário qual método:
   - **Patch** (`_patches/*.md`): edições cirúrgicas, <20 linhas alteradas
   - **Substituição** (API com SHA): reescritas completas, seções grandes

Sempre perguntar: "Edição pequena (patch) ou reescrita (substituição)?"
```

### EDIT 2
FIND:
```
| 1.0 | 2025-12-05 | Criação - S005-G/T07 |
```
REPLACE:
```
| 1.0 | 2025-12-05 | Criação - S005-G/T07 |
| 1.1 | 2025-12-05 | Adiciona REGRA DE EDIÇÃO - S005-G/T07 |
```

---
target: docs/00_I_1_2_Protocolo_LLM.md
version_from: "1.1"
version_to: "1.2"
commit_message: "[C2] update: Adiciona REGRA DE PATCH ao Protocolo LLM - S005-G/T07"
---

## EDITS

### EDIT 1
APPEND_AFTER:
```
Sempre perguntar: "Edição pequena (patch) ou reescrita (substituição)?"
```
ADD:
```

Após criar patch:
1. Informar usuário: "Patch criado. GitHub Action leva ~15s."
2. Continuar próxima task sem aguardar
3. Verificar aplicação apenas se necessário para próxima ação
```

### EDIT 2
FIND:
```
| 1.1 | 2025-12-05 | Adiciona REGRA DE EDIÇÃO - S005-G/T07 |
```
REPLACE:
```
| 1.1 | 2025-12-05 | Adiciona REGRA DE EDIÇÃO - S005-G/T07 |
| 1.2 | 2025-12-05 | Adiciona comportamento pós-patch - S005-G/T07 |
```

---
target: genesis/GENESIS.md
version_from: "0.2"
version_to: "0.3"
commit_message: "[C2] feat: adiciona método G5 (aplicar_patch) e atualiza índice"
---

## EDITS

### EDIT 1
FIND:
```
| G4 | refatorar_stub | Atualiza GENESIS com conhecimento gerado | descobertas, versão_atual | GENESIS v+1 | Camada 1 |
```
REPLACE:
```
| G4 | refatorar_stub | Atualiza GENESIS com conhecimento gerado | descobertas, versão_atual | GENESIS v+1 | Camada 1 |
| G5 | aplicar_patch | Edita arquivo via _patches/*.md | arquivo_patch | arquivo_atualizado | Camada 2 |
```

### EDIT 2
FIND:
```
| /docs/00_I_1_1_Github_Instructions.md | 1.0 | Estável | 2025-12-02 | 2 | GENESIS.md |
```
REPLACE:
```
| /docs/00_I_1_1_Github_Instructions.md | 1.0 | Estável | 2025-12-02 | 2 | GENESIS.md |
| /docs/00_O/00_O_1_2_6_Patch_System.md | 1.0 | Draft | 2025-12-02 | 2 | GENESIS.md |
```

### EDIT 3
FIND:
```
versao: "0.1"
```
REPLACE:
```
versao: "0.3"
```

### EDIT 4
APPEND_AFTER:
```
| 0.2 | 2025-12-02 | Camada 2 estabilizada. Infraestrutura funcional. |
```
ADD:
```
| 0.3 | 2025-12-02 | Adiciona método G5 (aplicar_patch). Atualiza índice com Patch_System. |
```

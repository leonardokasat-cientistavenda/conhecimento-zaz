---
target: docs/00_E/00_E_1_5_Metodo.md
version_from: "2.0"
version_to: "2.1"
commit_message: "[C3] update: Metodo v2.1 - instruções diagrama e persistência"
---

## EDITS

### EDIT 1
FIND:
```
versao: "2.0"
```
REPLACE:
```
versao: "2.1"
```

### EDIT 2
FIND:
```
### 6.1 Template (copiar e preencher)
```
REPLACE:
```
### 6.1 Diagrama

Ver **00_E_1_4_1_Diagrama.md** para método de seleção.

**Diagramas recomendados para Metodo (M3):**
- Primário: **Fluxo** (sequência de etapas)
- Secundário: **Sequência** (se múltiplos atores)

### 6.2 Template (copiar e preencher)
```

### EDIT 3
FIND:
```
### 6.2 Checklist
```
REPLACE:
```
### 6.3 Checklist
```

### EDIT 4
FIND:
```
- [ ] Submétodos estão ordenados
```
REPLACE:
```
- [ ] Submétodos estão ordenados
- [ ] Diagramas inseridos nas seções (Fluxo)

### 6.4 Persistência

**Ao finalizar M3, persistir o documento:**

1. Criar arquivo `M3_[Nome].md` em `_drafts/SPRINT/TXX/`
2. Preencher frontmatter com `etapa: M3`
3. Commit com mensagem: `[C3] add: M3 [Nome] - especificação POO`

Ver: **00_E_1_6_Documento.md** (ciclo de vida e persistência)
```

### EDIT 5
FIND:
```
| 00_E_1_6_Documento | Próximo (M4) |
```
REPLACE:
```
| 00_E_1_6_Documento | Próximo (M4) / Ciclo de vida |
| 00_E_1_4_1_Diagrama | Seleção de diagramas |
```

### EDIT 6
FIND:
```
| 2.0 | 2025-12-03 | Reestruturação como classe M3. Novo path 00_E_1_5. |
```
REPLACE:
```
| 2.0 | 2025-12-03 | - | Reestruturação como classe M3. Novo path 00_E_1_5. |
| 2.1 | 2025-12-03 | 23:15 | Adiciona instruções de diagrama (ref 00_E_1_4_1_Diagrama) e persistência. |
```

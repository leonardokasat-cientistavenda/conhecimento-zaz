---
target: docs/00_E/00_E_1_3_Objeto.md
version_from: "2.0"
version_to: "2.1"
commit_message: "[C3] update: Objeto v2.1 - instruções diagrama e persistência"
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
### 10.2 Checklist
```
REPLACE:
```
### 10.2 Diagrama

Ver **00_E_1_4_1_Diagrama.md** para método de seleção.

**Diagramas recomendados para Objeto (M2):**
- Primário: **Círculo/Venn** (escopo e fronteiras)
- Secundário: **Contextual** (posição no framework)

### 10.3 Checklist
```

### EDIT 3
FIND:
```
- [ ] validarCompletude() retorna true
```
REPLACE:
```
- [ ] validarCompletude() retorna true
- [ ] Diagramas inseridos nas seções (Círculo, Contextual)

### 10.4 Persistência

**Ao finalizar M2, persistir o documento:**

1. Criar arquivo `M2_[Nome].md` em `_drafts/SPRINT/TXX/`
2. Preencher frontmatter com `etapa: M2`
3. Commit com mensagem: `[C3] add: M2 [Nome] - objeto delimitado`

Ver: **00_E_1_6_Documento.md** (ciclo de vida e persistência)
```

### EDIT 4
FIND:
```
| 00_E_1_4_Classe | Proximo (M3 - especificacao) |
| Matriz_Selecao_Diagramas | Guia para diagramas |
```
REPLACE:
```
| 00_E_1_4_Classe | Proximo (M3 - especificacao) |
| 00_E_1_4_1_Diagrama | Seleção de diagramas |
| 00_E_1_6_Documento | Ciclo de vida (persistência) |
```

### EDIT 5
FIND:
```
| 2.0 | 2025-12-03 | 19:45 | Reestruturacao via M0-M4 recursivo. Marco teorico (Escopo, Fronteiras, Delimitacao, Afunilamento, Ponte). Diagramas UML/Circulo/Contextual conforme Matriz. Metodos delimitar/validarCompletude/verificarConexaoM1. Restricoes R1-R7. Conexao explicita com M0/M1. |
```
REPLACE:
```
| 2.0 | 2025-12-03 | 19:45 | Reestruturacao via M0-M4 recursivo. Marco teorico (Escopo, Fronteiras, Delimitacao, Afunilamento, Ponte). Diagramas UML/Circulo/Contextual conforme Matriz. Metodos delimitar/validarCompletude/verificarConexaoM1. Restricoes R1-R7. Conexao explicita com M0/M1. |
| 2.1 | 2025-12-03 | 23:10 | Adiciona instruções de diagrama (ref 00_E_1_4_1_Diagrama) e persistência ao final de M2. |
```

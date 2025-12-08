---
target: _backlog/BACKLOG.md
version_from: "1.6"
version_to: "1.7"
commit_message: "[C0] add: Plano de Execução ao índice do BACKLOG"
---

## EDITS

### EDIT 1 - Adicionar ao índice
FIND:
```
| 8 | Capability Discovery | 🔴 Alta | - | ⬜ Aguardando |
```
REPLACE:
```
| 8 | Capability Discovery | 🔴 Alta | - | ⬜ Aguardando |
| 9 | Backlog com Plano de Execução | 🟡 Média | - | ⬜ Aguardando |
```

### EDIT 2 - Adicionar seção do item (após Capability Discovery)
FIND:
```
- **Insight:** Quem não criou o sistema não sabe o que pedir

---

## Arquivos Relacionados
```
REPLACE:
```
- **Insight:** Quem não criou o sistema não sabe o que pedir

---

## 9. Backlog com Plano de Execução

**Prioridade:** 🟡 Média
**Dependências:** -
**Arquivo detalhado:** `_backlog/backlog_plano_execucao.md`

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Plano de Execução** | Lista de arquivos a criar/atualizar com método definido |
| **Método** | Criar, Patch, ou Substituição |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| LLM pergunta "patch ou substituição?" | Decisão não está no backlog | Pré-definir método |
| Estimativa de esforço difícil | Não sabe quantos arquivos afeta | Lista de impacto |

### M0.3 Origem

- **Descoberto em:** S008 (teste de Backlog.capturar())
- **Insight:** Definir método antecipadamente reduz fricção

---

## Arquivos Relacionados
```

### EDIT 3 - Atualizar versão
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
| 1.6 | 2025-12-08 | **Capability Discovery capturado.** Item #8 adicionado via Backlog.capturar(). |
```
ADD:
```
| 1.7 | 2025-12-08 | **Plano de Execução capturado.** Item #9 adicionado via Backlog.capturar(). |
```

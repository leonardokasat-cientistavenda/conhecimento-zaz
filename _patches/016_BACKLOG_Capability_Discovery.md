---
target: _backlog/BACKLOG.md
version_from: "1.5"
version_to: "1.6"
commit_message: "[C0] add: Capability Discovery ao índice do BACKLOG"
---

## EDITS

### EDIT 1 - Adicionar ao índice
FIND:
```
| # | Item | Prioridade | Dependências | Status |
|---|------|------------|--------------|--------|
| 2 | Módulo Autonomia | 🟡 Média | - | ⬜ Aguardando |
```
REPLACE:
```
| # | Item | Prioridade | Dependências | Status |
|---|------|------------|--------------|--------|
| 8 | Capability Discovery | 🔴 Alta | - | ⬜ Aguardando |
| 2 | Módulo Autonomia | 🟡 Média | - | ⬜ Aguardando |
```

### EDIT 2 - Adicionar seção do item (antes de Arquivos Relacionados)
FIND:
```
---

## Arquivos Relacionados
```
REPLACE:
```
---

## 8. Capability Discovery

**Prioridade:** 🔴 Alta
**Dependências:** -
**Arquivo detalhado:** `_backlog/capability_discovery.md`

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Capability** | Algo que GENESIS sabe fazer (conhecer, decidir, gerenciar) |
| **Discovery** | Usuário descobre capabilities disponíveis perguntando |
| **Hierarquia** | Capabilities organizadas em pai → filho (DECIDIR → Raciocínio) |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| Usuário novo não sabe o que pedir | Capabilities não são explicáveis | GENESIS explicar o que sabe fazer |
| Sistema subutilizado | Usuário não descobre funcionalidades | Discovery navegável |

### M0.3 Origem

- **Descoberto em:** S008 (discussão sobre Catálogo)
- **Contexto:** Preparar GENESIS para múltiplos usuários
- **Insight:** Quem não criou o sistema não sabe o que pedir

---

## Arquivos Relacionados
```

### EDIT 3 - Atualizar versão
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
| 1.5 | 2025-12-08 | **S008 concluída.** Catálogo Multi-Tipo → Itens Concluídos. Nenhuma sprint ativa. |
```
ADD:
```
| 1.6 | 2025-12-08 | **Capability Discovery capturado.** Item #8 adicionado via Backlog.capturar(). |
```

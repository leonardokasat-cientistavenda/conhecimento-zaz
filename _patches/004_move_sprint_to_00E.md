---
target: genesis/GENESIS.md
version_from: "0.5"
version_to: "0.6"
commit_message: "[C3] refactor: move Sprint para 00_E_Epistemologia.md"
---

## EDITS

### EDIT 1
FIND:
```
## 5. SPRINT ATUAL

| Campo | Valor |
|-------|-------|
| **id** | S002 |
| **objetivo** | Integrar Camada 3 (Framework) ao GENESIS |
| **camada_foco** | Camada 3 (Framework) |
| **inicio** | 2025-12-02 |
| **status** | Em andamento |

### Contexto para próximo chat

**O que já existe:**
- GENESIS.md v0.4 funcional (Camadas 1-2 estáveis)
- Sistema de patch automático funcionando
- Arquivos em `/docs/00_E/` (Epistemologia) e `/docs/00_O/` (Ontologia)

**O que fazer:**
1. Auditar arquivos existentes em `/docs/00_E/`
2. Validar se seguem padrão GENESIS (frontmatter, estrutura)
3. Identificar inconsistências
4. Propor correções via patch
5. Atualizar Seção 6 (Índice) com arquivos validados

**O que NÃO fazer:**
- Não rediscutir decisões já tomadas (Seções 0-4 estão estáveis)
- Não alterar estrutura do GENESIS sem necessidade
- Não criar arquivos novos antes de auditar existentes

**Sequência sugerida:**
- Chat 1: Auditar `/docs/00_E/`
- Chat 2: Auditar `/docs/00_O/`
- Chat 3: Consolidar índice, marcar Camada 3 como Estável

### Tarefas

| id | tarefa | status |
|----|--------|--------|
| T1 | Auditar /docs/00_E/ (Epistemologia) | ⏳ |
| T2 | Auditar /docs/00_O/ (Ontologia) | ⏳ |
| T3 | Validar frontmatter de cada arquivo | ⏳ |
| T4 | Identificar arquivos faltantes no índice | ⏳ |
| T5 | Criar patches de correção | ⏳ |
| T6 | Atualizar Seção 6 (Índice) completa | ⏳ |
| T7 | Marcar Camada 3 como Estável | ⏳ |

### Bloqueios

Nenhum.
```
REPLACE:
```
## 5. SPRINT ATUAL

| Campo | Valor |
|-------|-------|
| **id** | S002-E |
| **camada_foco** | Camada 3 (Framework) |
| **status** | Em andamento |
| **detalhes** | Ver /docs/00_E/00_E_Epistemologia.md (Seção 8) |

Sprint detalhada movida para o arquivo do Meta Sistema.
Cada camada gerencia sua própria sprint.
```

### EDIT 2
FIND:
```
versao: "0.5"
```
REPLACE:
```
versao: "0.6"
```

### EDIT 3
APPEND_AFTER:
```
| 0.5 | 2025-12-02 | Define Sprint S002. Handoff para integração Camada 3. |
```
ADD:
```
| 0.6 | 2025-12-02 | Move Sprint para 00_E_Epistemologia.md. Cada camada gerencia própria sprint. |
```

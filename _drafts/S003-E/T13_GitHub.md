---
nome: 00_I_1_1_GitHub
versao: "2.0"
tipo: Classe
etapa: M0
status: Draft
sprint_ref: S003-E
task_ref: T13
---

# GitHub v2.0

## 1. Problema (M0)

### 1.1 Sintoma

Existem 2 documentos que tratam de "como persistir no Git":
- `00_I_1_1_Github_Instructions.md` (v1.2) - instruções operacionais
- `00_O_1_2_6_Patch_System.md` (v1.0) - sistema de patches

Isso viola SSOT (Single Source of Truth) e gera ambiguidade sobre onde buscar informação.

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto | Ambiguidade Resolvida |
|--------------|-------------------------|----------------------|
| **GitHub** | Infraestrutura de versionamento e persistência | Não é "a empresa GitHub" - é o sistema de operações |
| **persistir** | Transformar conhecimento em arquivo versionado | COMO fazer (commits, patches) |
| **patch** | Método de edição parcial de arquivo | Subconjunto de "editar", não entidade separada |
| **criar** | Novo arquivo que não existia | github:create_or_update_file sem SHA |
| **editar** | Modificar arquivo existente | Patch (parcial) ou substituição (completa) |
| **commit** | Unidade atômica de mudança no Git | [CAMADA] tipo: descrição |

### 1.3 Causa Raiz

Sprint S001 criou Patch_System como documento separado. Github_Instructions foi criado para instruções operacionais. Não houve consolidação.

**Violação de SSOT:**
- Patch é um MÉTODO de GitHub, não uma entidade separada
- Ambos documentos falam de "como operar no Git"

### 1.4 Necessidade

Consolidar em um único documento `00_I_1_1_GitHub.md` que:
1. Absorva Patch_System como método de edição
2. Defina COMO persistir (criar, editar, mover, commitar)
3. Seja referenciado por Documento (que define O QUE persistir)
4. Deprecie Patch_System.md

---

## 2. Escopo da Consolidação

### 2.1 O Que GitHub v2.0 Deve Conter

| Seção | Origem | Conteúdo |
|-------|--------|----------|
| Identity | Github_Instructions | username, repos, branches |
| Permissions | Github_Instructions | allowed, restricted, forbidden |
| Conventions | Github_Instructions | commits, branches, versionamento |
| Structure | Github_Instructions | dirs, naming |
| **Workflows** | Github_Instructions + Patch_System | criar, editar (patch/substituição), mover, commitar |
| Token Efficiency | Github_Instructions | regras de economia |
| **Patch (método)** | Patch_System | estrutura PATCH.md, GitHub Action, script Python |

### 2.2 O Que Depreciar

| Arquivo | Ação |
|---------|------|
| `00_O_1_2_6_Patch_System.md` | Depreciar, redirecionar para GitHub.md |
| `00_I_1_1_Github_Instructions.md` | Substituir por GitHub.md |

### 2.3 Diagrama de Consolidação

```
ANTES (viola SSOT):
┌─────────────────────┐     ┌─────────────────────┐
│ Github_Instructions │     │   Patch_System      │
│      (v1.2)         │     │      (v1.0)         │
├─────────────────────┤     ├─────────────────────┤
│ - identity          │     │ - estrutura PATCH   │
│ - permissions       │     │ - GitHub Action     │
│ - conventions       │     │ - script Python     │
│ - structure         │     │ - diagrama          │
│ - workflows         │     └─────────────────────┘
│ - token_efficiency  │
└─────────────────────┘

DEPOIS (SSOT):
┌─────────────────────────────────────────────────────┐
│                   GitHub (v2.0)                     │
├─────────────────────────────────────────────────────┤
│ - identity                                          │
│ - permissions                                       │
│ - conventions                                       │
│ - structure                                         │
│ - workflows:                                        │
│     - criar (create_or_update_file)                 │
│     - editar:                                       │
│         - patch (parcial) ← absorvido               │
│         - substituição (completa)                   │
│     - mover (draft → docs)                          │
│     - commitar ([CAMADA] tipo: descrição)           │
│ - token_efficiency                                  │
│ - implementação_patch:                              │
│     - estrutura PATCH.md                            │
│     - GitHub Action                                 │
│     - script Python                                 │
└─────────────────────────────────────────────────────┘
         ▲
         │ referencia
┌─────────────────────┐
│    Documento        │
│  (O QUE persistir)  │
└─────────────────────┘
```

---

## 3. Marco Teórico Necessário

Buscar fundamentos para:

| Tópico | Pergunta |
|--------|----------|
| **Atomic Commits** | Qual granularidade ideal para commits? |
| **Patch vs Substituição** | Quando usar cada um? Trade-off de tokens? |
| **Convenções de Commit** | Por que [CAMADA] tipo: descrição? |
| **Estrutura de Pastas** | Por que _drafts/, docs/, _patches/? |

---

## 4. Critérios de Sucesso

| Critério | Verificação |
|----------|-------------|
| SSOT | Existe apenas 1 documento sobre "como persistir" |
| Completude | GitHub.md cobre criar, editar, mover, commitar |
| Patch absorvido | Patch_System.md deprecated |
| Referência funciona | Documento.md cita GitHub.md corretamente |
| Token efficiency | Regras de economia documentadas |

---

## 5. Tarefas Sugeridas

| id | Tarefa | Dependência |
|----|--------|-------------|
| T13.1 | Buscar marco teórico (commits, patches, estrutura) | - |
| T13.2 | Definir objeto GitHub v2.0 | T13.1 |
| T13.3 | Especificar classe GitHub (M3) | T13.2 |
| T13.4 | Absorver Patch_System como método | T13.3 |
| T13.5 | Publicar GitHub.md em docs/ | T13.4 |
| T13.6 | Depreciar Patch_System.md | T13.5 |
| T13.7 | Atualizar GENESIS.md índice | T13.6 |

---

## 6. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_6_Documento | Define O QUE persistir, cita GitHub |
| 00_I_1_1_Github_Instructions | Será substituído |
| 00_O_1_2_6_Patch_System | Será absorvido e deprecated |
| GENESIS.md | Atualizar índice |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 2.0-M0 | 2025-12-04 | 15:10 | Problema definido. Escopo de consolidação. Tarefas sugeridas. |

---
nome: 00_I_1_1_GitHub
versao: "2.0"
tipo: Classe
etapa: M2
status: Draft
sprint_ref: S003-E
task_ref: T13
---

# GitHub v2.0 - Objeto (M2)

## 3. Objeto (M2)

### 3.1 Definição do Objeto

| Campo | Valor |
|-------|-------|
| **nome** | GitHub |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Definir COMO persistir conhecimento: criar, editar, mover, commitar arquivos no repositório |
| **camada** | C2 (Infraestrutura) |

### 3.2 Escopo

| Inclui | Descrição |
|--------|-----------|
| **Identity** | username, repos, branches |
| **Permissions** | allowed, restricted, forbidden |
| **Conventions** | commits, branches, versionamento SemVer |
| **Structure** | dirs (_drafts/, docs/, _patches/), naming |
| **Workflows** | criar, editar, mover, commitar |
| **Edição: Patch** | Método de edição parcial (absorvido de Patch_System) |
| **Edição: Substituição** | Método de edição completa (API exige arquivo inteiro) |
| **Token Efficiency** | Regras de economia (não duplicar chat + GitHub) |
| **Implementação Patch** | Estrutura PATCH.md, GitHub Action, script Python |

### 3.3 Fronteiras

| Não Cobre | Referência |
|-----------|------------|
| O QUE documentar | 00_E_1_6_Documento.md |
| COMO selecionar diagrama | 00_E_1_4_1_Diagrama.md |
| Conteúdo dos domínios | Camada 4 |
| Regras de negócio | Camada 4 |

### 3.4 Diagrama de Escopo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTEXTO: INFRAESTRUTURA (C2)                       │
│                                                                             │
│   FRONTEIRAS                          ┌─────────────────────────────────┐   │
│   ──────────                          │         ESCOPO GITHUB           │   │
│                                       ├─────────────────────────────────┤   │
│   ┌───────────────────┐               │  Identity                       │   │
│   │ Documento.md      │               │  ├─ username                    │   │
│   │ (O QUE documentar)│               │  ├─ repos                       │   │
│   └───────────────────┘               │  └─ branches                    │   │
│                                       │                                 │   │
│   ┌───────────────────┐               │  Permissions                    │   │
│   │ Diagrama.md       │               │  ├─ allowed                     │   │
│   │ (COMO visualizar) │               │  ├─ restricted                  │   │
│   └───────────────────┘               │  └─ forbidden                   │   │
│                                       │                                 │   │
│   ┌───────────────────┐               │  Conventions                    │   │
│   │ Domínios          │               │  ├─ commits: [CAMADA] tipo: desc│   │
│   │ (conteúdo C4)     │               │  ├─ branches: tipo/descricao    │   │
│   └───────────────────┘               │  └─ versionamento: SemVer       │   │
│                                       │                                 │   │
│                                       │  Structure                      │   │
│                                       │  ├─ docs/ (publicado)           │   │
│                                       │  ├─ _drafts/ (M0-M3)            │   │
│                                       │  ├─ _patches/ (sistema)         │   │
│                                       │  └─ naming: NN_X_N_N_Nome.md    │   │
│                                       │                                 │   │
│                                       │  Workflows                      │   │
│                                       │  ├─ criar (create_or_update)    │   │
│                                       │  ├─ editar                      │   │
│                                       │  │   ├─ patch (parcial)         │   │
│                                       │  │   └─ substituição (completa) │   │
│                                       │  ├─ mover (draft → docs)        │   │
│                                       │  └─ commitar ([CAMADA] tipo)    │   │
│                                       │                                 │   │
│                                       │  Token Efficiency               │   │
│                                       │  └─ NÃO duplicar chat + GitHub  │   │
│                                       │                                 │   │
│                                       │  Implementação Patch            │   │
│                                       │  ├─ estrutura PATCH.md          │   │
│                                       │  ├─ GitHub Action               │   │
│                                       │  └─ script Python               │   │
│                                       └─────────────────────────────────┘   │
│                                                                             │
│                                            ▲                                │
│                                            │ referencia                     │
│                                       ┌────┴────┐                           │
│                                       │Documento│                           │
│                                       │(O QUE)  │                           │
│                                       └─────────┘                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Critérios de Sucesso

| Critério | Verificação |
|----------|-------------|
| SSOT | Existe apenas 1 documento sobre "como persistir" |
| Completude | GitHub.md cobre criar, editar, mover, commitar |
| Patch absorvido | Patch_System.md deprecated |
| Referência funciona | Documento.md cita GitHub.md corretamente |
| Token efficiency | Regras de economia documentadas |
| Separação concerns | GitHub (COMO) não fala de O QUE documentar |

### 3.6 Critérios de Insucesso

| Critério | Evidência |
|----------|-----------|
| Duplicação | 2+ documentos sobre persistência |
| Perda de regra | Alguma regra de Github_Instructions ou Patch_System não migrada |
| Mistura concerns | GitHub fala de estrutura de seções (deveria ser Documento) |

---

## Referências

| Documento | Relação |
|-----------|---------|
| T13_GitHub.md (M0) | Problema e escopo de consolidação |
| 00_I_1_1_Github_Instructions | Será substituído |
| 00_O_1_2_6_Patch_System | Será absorvido |
| 00_E_1_6_Documento | Define O QUE persistir |
| GENESIS.md | Atualizar índice |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 2.0-M0 | 2025-12-04 | 15:10 | Problema definido. Escopo de consolidação. |
| 2.0-M2 | 2025-12-04 | 18:45 | Objeto definido. Escopo, fronteiras, critérios. |

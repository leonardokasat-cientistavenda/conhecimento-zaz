---
titulo: "Épico: Construção"
produto_ref: genesis
release_alvo: v0.5.0
status: Backlog
data_criacao: 2025-12-13
---

# Épico: Construção

## Objetivo

Genesis constrói, valida, deploya e absorve artefatos.

---

## Resultado Esperado

```
Usuário: "Crie um meta sistema para controle de frota"
Genesis: [executa M0-M4, gera código, valida, deploya]
Genesis: "MS_Frota criado e disponível. Quer que eu explique como usar?"
```

---

## Componentes

| Componente | Descrição |
|------------|----------|
| m0_m4_pipeline.bpmn | Pipeline de construção guiada |
| artifact_lifecycle.bpmn | CI/CD genérico |
| llm_generator | Worker que gera artefatos |
| llm_fixer | Worker que corrige erros |
| Validadores | python_lint, bpmn_validate, etc |
| Deployers | git_ops, docker_build, camunda_deploy |

---

## Backlog Items

| ID | Título | Prioridade |
|----|--------|------------|
| bl_genesis_m0_m4_pipeline | Pipeline M0-M4 | 🟢 Baixa |
| bl_genesis_artifact_lifecycle | artifact_lifecycle.bpmn | 🟢 Baixa |
| bl_genesis_llm_generator | Worker llm_generator | 🟢 Baixa |
| bl_genesis_validators | Workers de validação | 🟢 Baixa |
| bl_genesis_deployers | Workers de deploy | 🟢 Baixa |

---

## Pipeline M0-M4 Recursivo

```
m0_m4_pipeline.bpmn
│
├── Input: item (Épico, Backlog, Task)
│
├── M0: Problema
│   └── Se sub-itens → spawn m0_m4_pipeline para cada
│
├── M1: Marco Teórico
│
├── M2: Objeto
│   └── Se novos sub-itens → spawn m0_m4_pipeline para cada
│
├── M3: Classes
│
└── M4: Consolidação
    └── Absorver como capacidade
```

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-13 | Épico criado |

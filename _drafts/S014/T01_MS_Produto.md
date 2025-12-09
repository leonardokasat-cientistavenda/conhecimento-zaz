# MS_Produto v0.1

---
nome: MS_Produto
versao: "0.1"
tipo: Framework
status: Draft
etapa: M0
sprint_ref: S014
task_ref: T01
---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Produto** | Meta Sistema Implantado (V0) que resolve dor clara do usuário |
| **Meta Sistema (MS)** | Sistema estruturado via Epistemologia que gera valor específico |
| **Usuário Final** | Equipe interna ZAZ + Clientes externos |
| **Deploy** | Implantação completa (técnico + usuário consegue usar) |
| **CS (Customer Success)** | Área que garante que a dor seja aliviada/resolvida |
| **Backlog** | Fila priorizada de demandas/melhorias |
| **Épico** | Agrupamento de funcionalidades para entrega de valor |
| **Sprint** | Ciclo de desenvolvimento com escopo fechado |
| **Roadmap** | Visão temporal do portfólio de produtos |
| **Portfólio** | Conjunto de MS/Produtos em diferentes estágios |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│   "Como gerenciar o ciclo completo de vida de Produtos (MS), desde a        │
│    captura da demanda até o sucesso contínuo do usuário, de forma           │
│    estruturada e anti-entrópica?"                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  S1: Não há processo definido para ir de "MS pronto" → "usuário usando"     │
│                                                                             │
│  S3: Falta visibilidade do portfólio (o que está em qual estágio)           │
│                                                                             │
│  S4: Não há método para coletar/priorizar feedback pós-implantação          │
│                                                                             │
│  S5: Métodos de backlog/sprint insuficientes para capturar demandas         │
│      e priorizar desenvolvimento adequadamente                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           CICLO DESEJADO                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [A]────────[B]────────[C]────────[D]────────[E]────────[F]────────[G]      │
│  Backlog    Épico     Sprint     Deploy    Implant.   Treinam.    CS        │
│     └──────────DESENVOLVIMENTO──────────┘  └────────PÓS-VENDA────────┘      │
│                                                                             │
│                              ┌────────────────────────────────┐             │
│                              │         FEEDBACK LOOP          │             │
│                              │  CS identifica gaps → Backlog  │             │
│                              └────────────────────────────────┘             │
│                                           │                                 │
│  ┌────────────────────────────────────────┘                                 │
│  │                                                                          │
│  ▼                                                                          │
│  [A] Backlog ◄───────────────────────────────────────────────── [G] CS      │
│                                                                             │
│  O CICLO NUNCA PARA                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Foco histórico em construir MS, não em entregar valor | MS "pronto" mas não implantado |
| Ausência de visão de portfólio | Não sabe o que priorizar |
| Backlog/Sprint como artefatos, não como processo | Captura demandas de forma ad-hoc |
| CS não estruturado | Feedback não retorna ao ciclo |

### 1.4 Necessidade

| Necessidade | Ação |
|-------------|------|
| Processo fim-a-fim | Definir estágios A→G com critérios de transição |
| Visibilidade do portfólio | Dashboard/catálogo de produtos por estágio |
| Método de priorização | Framework para decidir o que desenvolver |
| Loop de feedback | CS alimenta backlog sistematicamente |
| Quebra em módulos | Implementar incrementalmente (A-D primeiro, depois E-G) |

### 1.5 Tese

> **MS_Produto é o Meta Sistema que gerencia o ciclo completo de vida de Produtos, desde a captura estruturada de demandas até o sucesso contínuo do usuário.**
>
> **Resolve:**
> - Transformar MS em Produtos implantados (não apenas "prontos")
> - Visibilidade do portfólio em tempo real
> - Priorização sistemática de desenvolvimento
> - Loop fechado: CS → Feedback → Backlog → Desenvolvimento
>
> **Escopo:** Completo (A-G), implementação modular
>
> **Pré-requisito:** GENESIS (propósito) + Epistemologia (método de criação)

### 1.6 Escopo de Implementação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MÓDULOS DO MS_PRODUTO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FASE 1: DESENVOLVIMENTO (A→D)          FASE 2: PÓS-VENDA (E→G)             │
│  ┌───────────────────────────┐          ┌───────────────────────────┐       │
│  │ • Backlog estruturado     │          │ • Implantação             │       │
│  │ • Épicos e priorização    │          │ • Treinamento             │       │
│  │ • Sprint management       │          │ • Customer Success        │       │
│  │ • Deploy/Release          │          │ • Feedback loop           │       │
│  └───────────────────────────┘          └───────────────────────────┘       │
│                                                                             │
│  TRANSVERSAL                                                                │
│  ┌───────────────────────────────────────────────────────────────────┐      │
│  │ • Roadmap de produto                                              │      │
│  │ • Portfólio (visibilidade de todos os produtos/estágios)          │      │
│  │ • Métricas de sucesso por produto                                 │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Próximos Passos

| Etapa | Ação | Status |
|-------|------|--------|
| M0 | Problema definido | 🔄 Aguardando aprovação |
| M1 | Marco Teórico (Agile, Roadmap, CS) | ⬜ |
| M2 | Objeto (fronteiras, o que é/não é) | ⬜ |
| M3 | Classe (atributos, métodos, módulos) | ⬜ |
| M4 | Documento final | ⬜ |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-09 | M0 criado - Problema, Glossário, Tese, Escopo |

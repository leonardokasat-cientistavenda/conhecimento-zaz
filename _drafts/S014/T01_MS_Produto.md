# MS_Produto v0.2

---
nome: MS_Produto
versao: "0.2"
tipo: Framework
status: Draft
etapa: M1
sprint_ref: S014
task_ref: T01
---

## 1. Problema (M0)

*(Aprovado - ver versão 0.1)*

---

## 2. Marco Teórico (M1)

### 2.1 Ontologia Interna (Já Existe)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ONTOLOGIA INTERNA - JÁ IMPLEMENTADO                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GESTÃO DE PROJETOS (Pai)                                                   │
│  ├── Backlog v1.1                                                           │
│  │   ├── capturar() - busca similar antes de criar                          │
│  │   ├── enriquecer() - contexto acumulativo                                │
│  │   ├── merge() - unificar itens relacionados                              │
│  │   └── Atributos: tipo, prioridade, sistema_afetado, origens              │
│  │                                                                          │
│  └── Sprint v1.0                                                            │
│      ├── iniciar() - código automático (S007→S008)                          │
│      ├── executar() - tasks estruturadas                                    │
│      ├── publicar() - draft → docs                                          │
│      ├── arquivar() - cleanup workspace                                     │
│      └── WIP Limit = 1                                                      │
│                                                                             │
│  CATÁLOGO                                                                   │
│  └── pesquisar() - busca semântica por tipo                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Análise de Gaps:**

| Componente Existente | O que Falta |
|----------------------|-------------|
| Backlog | Épicos, User Stories, priorização estruturada |
| Sprint | Roadmap, releases, visão de portfólio |
| - | Deploy, Implantação, Treinamento |
| - | Customer Success, Feedback Loop |

### 2.2 Ontologia Externa (Melhores Práticas)

#### 2.2.1 Hierarquia Ágil (Atlassian, ProductPlan)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     HIERARQUIA ÁGIL - PADRÃO MERCADO                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  THEME (Tema Estratégico)                                                   │
│  └── INITIATIVE (Iniciativa)                                                │
│      └── EPIC (Épico)                                                       │
│          └── FEATURE (Funcionalidade)                                       │
│              └── USER STORY (História do Usuário)                           │
│                  └── TASK (Tarefa)                                          │
│                                                                             │
│  Exemplo:                                                                   │
│  Theme: "Aumentar retenção de clientes"                                     │
│  └── Initiative: "Melhorar experiência de onboarding"                       │
│      └── Epic: "Onboarding personalizado"                                   │
│          └── Feature: "Wizard de configuração inicial"                      │
│              └── Story: "Como usuário, quero ver tutorial interativo"       │
│                  └── Task: "Implementar tooltip no passo 1"                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Aplicação no MS_Produto:**

| Nível Mercado | Mapeamento GENESIS |
|---------------|-------------------|
| Theme | Produto (MS) |
| Initiative | Épico |
| Epic/Feature | Backlog Item (tipo: Feature) |
| User Story | Backlog Item (tipo: Story) |
| Task | Sprint Task |

#### 2.2.2 Frameworks de Priorização

| Framework | Fórmula/Método | Quando Usar |
|-----------|----------------|-------------|
| **RICE** | (Reach × Impact × Confidence) / Effort | Priorização baseada em dados |
| **MoSCoW** | Must/Should/Could/Won't | Escopo de release |
| **Kano** | Basic/Performance/Delighter | Satisfação do cliente |
| **WSJF** | Cost of Delay / Job Size | SAFe, sequenciamento |
| **OKRs** | Objective + Key Results | Alinhamento estratégico |

**Aplicação no MS_Produto:**

| Contexto | Framework Sugerido |
|----------|-------------------|
| Priorizar backlog | RICE ou WSJF |
| Definir MVP de release | MoSCoW |
| Alinhar com estratégia | OKRs |

#### 2.2.3 Lifecycle de Produto SaaS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     LIFECYCLE SAAS - PADRÃO MERCADO                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐                  │
│  │AWARENESS │──▶│ACQUISITION│──▶│ONBOARDING│──▶│ACTIVATION│                 │
│  │(Conhecer)│   │(Adquirir) │   │(Embarcar) │   │(Ativar)  │                 │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘                  │
│                                                      │                      │
│                                                      ▼                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐                  │
│  │ ADVOCACY │◀──│EXPANSION │◀──│RETENTION │◀──│  VALUE   │                  │
│  │(Advogar) │   │(Expandir)│   │(Reter)   │   │(Valor)   │                  │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘                  │
│       │                                              │                      │
│       └──────────────── FEEDBACK LOOP ──────────────┘                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Aplicação no MS_Produto:**

| Fase Lifecycle | Módulo MS_Produto |
|----------------|-------------------|
| Awareness/Acquisition | (Pré-produto, fora do escopo) |
| Onboarding | Implantação + Treinamento |
| Activation | CS - Time to Value |
| Value/Retention | CS - Health Score |
| Expansion | CS - Upsell/Cross-sell |
| Advocacy | CS - NPS, Referrals |

#### 2.2.4 Customer Success Framework

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CUSTOMER SUCCESS - COMPONENTES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. SEGMENTAÇÃO                                                             │
│     Dividir clientes por: valor, maturidade, necessidade                    │
│                                                                             │
│  2. HEALTH SCORE                                                            │
│     Indicadores: uso do produto, satisfação, engajamento                    │
│                                                                             │
│  3. PLAYBOOKS                                                               │
│     Ações padronizadas por situação (onboarding, risco, expansão)           │
│                                                                             │
│  4. FEEDBACK LOOP                                                           │
│     Coleta → Análise → Ação → Fechamento                                    │
│     (NPS, CSAT, entrevistas, tickets)                                       │
│                                                                             │
│  5. MÉTRICAS                                                                │
│     Churn rate, NRR, Time to Value, CSAT, NPS                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Síntese: Conceitos Consolidados

| Conceito | Teoria/Fonte | Aplicação no MS_Produto |
|----------|--------------|------------------------|
| **Hierarquia Ágil** | Scrum, SAFe | Produto → Épico → Backlog → Sprint → Task |
| **Priorização RICE** | ProductPlan | Score para ordenar backlog |
| **MoSCoW** | DSDM | Definir escopo de releases |
| **OKRs** | Intel/Google | Alinhar épicos com objetivos estratégicos |
| **Lifecycle SaaS** | HubSpot, Userpilot | Fases pós-deploy: Implantação→Ativação→Retenção |
| **Health Score** | Gainsight | Monitorar sucesso do cliente |
| **Feedback Loop** | Lean Startup | CS → Backlog → Desenvolvimento |
| **Roadmap** | Atlassian | Visualização temporal de épicos/releases |
| **Time to Value** | CS Theory | Métrica de sucesso do onboarding |
| **Composição** | SOLID | Módulos opcionais por fase |

### 2.4 Princípios de Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PRINCÍPIOS MS_PRODUTO                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  P1: REUTILIZAR ONTOLOGIA INTERNA                                           │
│      Backlog e Sprint já existem → estender, não recriar                    │
│                                                                             │
│  P2: COMPOSIÇÃO MODULAR                                                     │
│      Cada fase (Dev, Implantação, CS) é módulo opcional                     │
│                                                                             │
│  P3: FEEDBACK LOOP ESTRUTURADO                                              │
│      CS → Backlog é o ciclo que nunca para                                  │
│                                                                             │
│  P4: VISIBILIDADE DE PORTFÓLIO                                              │
│      Dashboard mostra todos os produtos e seus estágios                     │
│                                                                             │
│  P5: PRIORIZAÇÃO BASEADA EM DADOS                                           │
│      Usar RICE/WSJF para ordenar, não opinião                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Próximos Passos

| Etapa | Ação | Status |
|-------|------|--------|
| M0 | Problema definido | ✅ Aprovado |
| M1 | Marco Teórico | 🔄 Aguardando aprovação |
| M2 | Objeto (fronteiras) | ⬜ |
| M3 | Classe (atributos, métodos) | ⬜ |
| M4 | Documento final | ⬜ |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-09 | M0 criado - Problema, Glossário, Tese, Escopo |
| 0.2 | 2025-12-09 | M1 criado - Ontologia interna, externa, síntese, princípios |

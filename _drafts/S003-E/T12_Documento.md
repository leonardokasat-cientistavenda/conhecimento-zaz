---
nome: 00_E_1_6_Documento
versao: "3.0"
tipo: Classe
etapa: M2
status: Draft
sprint_ref: S003-E
task_ref: T12
---

# Documento v3.0

## 1. Problema (M0) ✅

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Documento v2.4 desatualizado | Não segue padrão dos outros docs (M0-M3) |
| Falta marco teórico | Decisões de estrutura sem fundamento |
| Mistura concerns | Documento fala de persistência (GitHub) |
| Não define seções | Quais seções? O que cada uma contém? |
| Viola diagrama-first | Seções com prosa como conteúdo principal |

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **documento** | Artefato atômico com frontmatter + seções + histórico |
| **seção** | Unidade de conteúdo com nome + diagrama obrigatório + contexto |
| **diagrama** | Representação visual estruturada (Tabela, Caixa, Fluxo, Rede, Lista) |
| **diagrama-first** | Diagrama é conteúdo principal; prosa apenas contextualiza |
| **persistência** | COMO persistir = GitHub (separação de concerns) |
| **entropia** | Diagrama reduz entropia vs prosa |
| **separação de concerns** | Documento (O QUE) ≠ GitHub (COMO) |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Não define Seção como subtipo | Seções inconsistentes entre documentos |
| Não postula diagrama-first | Prosa como conteúdo principal = mais entropia |
| Mistura O QUE com COMO | Documento fala de commits/patches (deveria ser GitHub) |

### 1.4 Necessidade

| Necessidade | Ação |
|-------------|------|
| Definir Seção como subtipo | Com diagrama obrigatório |
| Postular diagrama-first | Regra: toda seção tem diagrama; prosa contextualiza |
| Separar concerns | Documento cita GitHub (COMO persistir) e Diagrama.md (COMO visualizar) |
| Definir seções por tipo | Template para Classe, Framework, Metodo, Sprint, Catalogo |

---

## 2. Marco Teórico (M1) ✅

### 2.1 Conceitos Consolidados

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Lifecycle Stages** | DLM | M0→M4, drafts→docs |
| **Atomicidade** | Git Best Practices | 1 commit = 1 mudança lógica |
| **Entropia** | Shannon | Diagrama reduz incerteza vs prosa |
| **Cognitive Load** | Hick-Hyman | Visual processa mais rápido |
| **SSOT** | Information Architecture | 1 lugar para cada verdade |
| **SRP** | SOLID | Cada classe uma responsabilidade |
| **SemVer** | File Naming | Versão como metadado, não no nome |

### 2.2 Postulado Diagrama-First

| Teoria | Suporte |
|--------|---------|
| **Shannon** | Diagrama = estrutura explícita → menos incerteza |
| **Hick-Hyman** | Visual processa mais rápido que texto |
| **SSOT** | Diagrama força estruturação → elimina redundância |
| **Atomicidade** | Seção com diagrama = unidade autocontida |

**Postulado:**
> Toda seção deve ter representação visual estruturada (diagrama). Prosa apenas contextualiza.

---

## 3. Objeto (M2) ✅

### 3.1 Definição do Objeto

| Campo | Valor |
|-------|-------|
| **nome** | Documento |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Definir O QUE documentar: estrutura, seções, tipos, regras |

### 3.2 Escopo

| Inclui | Descrição |
|--------|-----------|
| Frontmatter | Schema YAML obrigatório |
| Seção (subtipo) | Unidade com diagrama obrigatório |
| Tipos de documento | Classe, Framework, Metodo, Sprint, Catalogo |
| Seções por tipo | Template de seções para cada tipo |
| Ciclo de vida | M0→M4, _drafts→docs |
| Nomenclatura | Padrão sem versão no nome |
| Postulado diagrama-first | Regra fundamental |

### 3.3 Fronteiras

| Não cobre | Referência |
|-----------|------------|
| COMO persistir | 00_I_1_1_GitHub.md |
| COMO selecionar diagrama | 00_E_1_4_1_Diagrama.md |
| Conteúdo dos domínios | Camada 4 |

### 3.4 Critérios

| Tipo | Critério |
|------|----------|
| **Sucesso** | Documento criado seguindo Documento.md tem seções padronizadas com diagramas obrigatórios |
| **Insucesso** | Documentos com seções inconsistentes ou prosa sem diagrama |

### 3.5 Diagrama de Escopo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONTEXTO: META SISTEMA                         │
│                                                                             │
│   FRONTEIRAS                          ┌─────────────────────────────────┐   │
│   ──────────                          │         ESCOPO                  │   │
│                                       ├─────────────────────────────────┤   │
│   ┌───────────────────┐               │  Frontmatter                    │   │
│   │ GitHub.md         │               │  ├─ nome                        │   │
│   │ (COMO persistir)  │               │  ├─ versao                      │   │
│   └───────────────────┘               │  ├─ tipo                        │   │
│                                       │  └─ status                      │   │
│   ┌───────────────────┐               │                                 │   │
│   │ Diagrama.md       │               │  Seção (subtipo)                │   │
│   │ (COMO visualizar) │               │  ├─ nome                        │   │
│   └───────────────────┘               │  ├─ diagrama (obrigatório)      │   │
│                                       │  └─ contexto (prosa)            │   │
│   ┌───────────────────┐               │                                 │   │
│   │ Domínios          │               │  Tipos: Classe, Framework,      │   │
│   │ (conteúdo)        │               │         Metodo, Sprint, Catalogo│   │
│   └───────────────────┘               │                                 │   │
│                                       │  Seções por tipo (templates)    │   │
│                                       │                                 │   │
│                                       │  Ciclo: M0→M1→M2→M3→M4          │   │
│                                       │                                 │   │
│                                       │  Nomenclatura (sem versão)      │   │
│                                       │                                 │   │
│                                       │  Postulado diagrama-first       │   │
│                                       └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.6 Diagrama de Composição

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DOCUMENTO                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         FRONTMATTER                                 │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  nome | versao | tipo | status | [etapa] | [sprint_ref] | [task_ref]│    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         CONTEÚDO: Seção[]                           │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                     │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │   Seção 1   │  │   Seção 2   │  │   Seção N   │                  │    │
│  │  ├─────────────┤  ├─────────────┤  ├─────────────┤                  │    │
│  │  │ nome        │  │ nome        │  │ nome        │                  │    │
│  │  │ diagrama ◄──┼──┼─ OBRIGATÓRIO│  │ diagrama    │                  │    │
│  │  │ contexto    │  │ contexto    │  │ contexto    │                  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         HISTÓRICO                                   │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  versão | data | hora | alteração                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.7 Diagrama de Separação de Concerns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SEPARAÇÃO DE CONCERNS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    ┌─────────────────────┐                                  │
│                    │     DOCUMENTO       │                                  │
│                    │  (O QUE documentar) │                                  │
│                    ├─────────────────────┤                                  │
│                    │ - Frontmatter       │                                  │
│                    │ - Seção (subtipo)   │                                  │
│                    │ - Tipos             │                                  │
│                    │ - Seções por tipo   │                                  │
│                    │ - Ciclo de vida     │                                  │
│                    │ - Nomenclatura      │                                  │
│                    │ - Diagrama-first    │                                  │
│                    └──────────┬──────────┘                                  │
│                               │                                             │
│                    ┌──────────┴──────────┐                                  │
│                    │                     │                                  │
│                    ▼                     ▼                                  │
│         ┌─────────────────────┐ ┌─────────────────────┐                     │
│         │       GITHUB        │ │    DIAGRAMA.md      │                     │
│         │  (COMO persistir)   │ │ (COMO visualizar)   │                     │
│         ├─────────────────────┤ ├─────────────────────┤                     │
│         │ - criar arquivo     │ │ - Matriz Seleção    │                     │
│         │ - editar (patch)    │ │ - Tipos diagrama    │                     │
│         │ - mover             │ │ - Metodologias      │                     │
│         │ - commitar          │ │ - Quando usar qual  │                     │
│         └─────────────────────┘ └─────────────────────┘                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3) - PENDENTE

Aguardando validação de M2.

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_4_1_Diagrama | COMO selecionar/criar diagramas |
| 00_I_1_1_GitHub | COMO persistir (commits, patches) |
| GENESIS.md | Define índice de arquivos |

### Externas

| Fonte | Conceito |
|-------|----------|
| Princeton University Records Management | Document Lifecycle |
| Shannon (1948) | Information Theory, Entropy |
| Hick (1952), Hyman (1953) | Cognitive Load |
| SOLID | Single Responsibility Principle |
| SemVer.org | Semantic Versioning |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 3.0-M0 | 2025-12-04 | 14:00 | Problema inicial |
| 3.0-M1 | 2025-12-04 | 14:30 | Marco teórico inicial |
| 3.0-M2 | 2025-12-04 | 14:35 | Objeto inicial |
| 3.0-M3 | 2025-12-04 | 15:00 | Classe inicial |
| 3.0-M0r | 2025-12-04 | 15:45 | REVISÃO M0: 5 sintomas, seção, diagrama-first |
| 3.0-M1r | 2025-12-04 | 16:00 | REVISÃO M1: Validado, suporta diagrama-first |
| 3.0-M2r | 2025-12-04 | 16:05 | REVISÃO M2: Escopo completo, diagramas de composição e separação |

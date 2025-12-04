---
nome: 00_E_1_6_Documento
versao: "3.0"
tipo: Classe
etapa: M0
status: Draft
sprint_ref: S003-E
task_ref: T12
---

# Documento v3.0

## 1. Problema (M0) - REVISADO

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Documento v2.4 desatualizado | Não segue padrão dos outros docs (M0-M3) |
| Falta marco teórico | Decisões de estrutura sem fundamento |
| Mistura concerns | Documento fala de persistência (GitHub) |
| Não define seções | Quais seções? O que cada uma contém? |
| Viola diagrama-first | Seções com prosa como conteúdo principal |

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto | Ambiguidade Resolvida |
|--------------|-------------------------|----------------------|
| **documento** | Artefato atômico com frontmatter + seções + histórico | Unidade de conhecimento persistido |
| **seção** | Unidade de conteúdo com nome + diagrama obrigatório + contexto | Não é "parágrafo" - é estrutura visual |
| **diagrama** | Representação visual estruturada (Tabela, Caixa, Fluxo, Rede, Lista) | Não é opcional - é obrigatório em toda seção |
| **diagrama-first** | Diagrama é conteúdo principal; prosa apenas contextualiza | Inverte prioridade tradicional |
| **persistência** | Transformar conhecimento volátil em estruturado | COMO persistir = GitHub (separação de concerns) |
| **entropia** | Perda de precisão por sobrecarga de contexto | Diagrama reduz entropia vs prosa |
| **token** | Recurso escasso do Claude | Diagrama é mais eficiente que prosa |
| **separação de concerns** | Cada classe sabe sobre sua responsabilidade | Documento (O QUE) ≠ GitHub (COMO) |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Documento v2.4 não tem marco teórico | Decisões arbitrárias, não fundamentadas |
| Não define Seção como subtipo | Seções inconsistentes entre documentos |
| Não postula diagrama-first | Prosa como conteúdo principal = mais entropia |
| Mistura O QUE com COMO | Documento fala de commits/patches (deveria ser GitHub) |

### 1.4 Necessidade

| Necessidade | Ação |
|-------------|------|
| Marco teórico robusto | Fundamentar todas decisões de estrutura |
| Definir Seção como subtipo | Com diagrama obrigatório |
| Postular diagrama-first | Regra: toda seção tem diagrama; prosa contextualiza |
| Separar concerns | Documento (O QUE) cita GitHub (COMO persistir) e Diagrama.md (COMO visualizar) |
| Definir seções por tipo | Template para Classe, Framework, Metodo, Sprint, Catalogo |

---

## 2. Marco Teórico (M1) - A REVISAR

### 2.1 Conceitos Existentes (validados)

| Conceito | Teoria | Aplicação | Status |
|----------|--------|-----------|--------|
| Lifecycle Stages | DLM | M0→M4, drafts→docs | ✅ Mantém |
| Atomicidade | Git Best Practices | 1 commit = 1 mudança lógica | ✅ Mantém |
| Entropia | Shannon | Menos opções = menos incerteza | ✅ Mantém |
| Hick-Hyman | Cognitive Load | Visual processa mais rápido | ✅ Mantém |
| SSOT | Information Architecture | 1 lugar para cada verdade | ✅ Mantém |
| SemVer no frontmatter | File Naming | Versão como metadado | ✅ Mantém |

### 2.2 Conceitos a Adicionar

| Conceito | Teoria Necessária | Aplicação |
|----------|-------------------|-----------|
| **Diagrama-first** | Shannon + Hick-Hyman | Diagrama reduz entropia; processa mais rápido |
| **Seção como estrutura** | Information Architecture | Unidade com diagrama obrigatório |
| **Separação de Concerns** | SOLID (SRP) | Cada classe uma responsabilidade |
| **Template por tipo** | DLM + Patterns | Seções padrão para cada tipo de documento |

### 2.3 Fundamentação do Postulado Diagrama-First

| Teoria | Suporte |
|--------|---------|
| **Shannon (Entropia)** | Diagrama = estrutura explícita → menos incerteza que prosa ambígua |
| **Hick-Hyman (Cognitive Load)** | Visual processa mais rápido que texto sequencial |
| **SSOT** | Diagrama força estruturação → elimina redundância |
| **Atomicidade** | Seção com diagrama = unidade autocontida |

**Postulado validado pelo marco teórico:**
> Toda seção deve ter representação visual estruturada (diagrama). Prosa apenas contextualiza.

---

## 3. Objeto (M2) - A REVISAR

| Campo | Valor Revisado |
|-------|----------------|
| **nome** | Documento |
| **problema_ref** | Seção 1 (revisada) |
| **marco_ref** | Seção 2 (a completar) |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Definir O QUE documentar: estrutura, seções, tipos, regras |
| **escopo** | Frontmatter, Seção (subtipo), Tipos de documento, Ciclo de vida, Nomenclatura, Postulado diagrama-first |
| **fronteiras** | Não cobre: COMO persistir (GitHub), COMO selecionar diagrama (Diagrama.md), conteúdo dos domínios |
| **conceitos_usados** | DLM, Entropia, Hick-Hyman, SSOT, SRP, Diagrama-first |
| **criterio_sucesso** | Qualquer documento criado seguindo Documento.md tem seções padronizadas com diagramas obrigatórios |
| **criterio_insucesso** | Documentos criados têm seções inconsistentes ou prosa sem diagrama |

### 3.1 Diagrama de Escopo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONTEXTO: META SISTEMA                         │
│                                                                             │
│   FRONTEIRAS (não cobre)              ┌─────────────────────────────────┐   │
│   ──────────────────────              │      ESCOPO (Documento)         │   │
│                                       │      ───────────────────        │   │
│   - COMO persistir                    │                                 │   │
│     (ver GitHub.md)                   │   - Frontmatter (schema)        │   │
│                                       │   - Seção (subtipo)             │   │
│   - COMO selecionar diagrama          │     - nome                      │   │
│     (ver Diagrama.md)                 │     - diagrama (obrigatório)    │   │
│                                       │     - contexto (prosa)          │   │
│   - Conteúdo dos domínios             │   - Tipos de documento          │   │
│                                       │   - Seções por tipo             │   │
│   - Sincronização Outline             │   - Ciclo de vida (M0-M4)       │   │
│                                       │   - Nomenclatura                │   │
│                                       │   - Postulado diagrama-first    │   │
│                                       │                                 │   │
│                                       └─────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Diagrama de Separação de Concerns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SEPARAÇÃO DE CONCERNS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐                                                    │
│  │     DOCUMENTO       │                                                    │
│  │   (O QUE documentar)│                                                    │
│  ├─────────────────────┤                                                    │
│  │ - Frontmatter       │                                                    │
│  │ - Seção (subtipo)   │                                                    │
│  │ - Tipos             │                                                    │
│  │ - Ciclo de vida     │                                                    │
│  │ - Nomenclatura      │                                                    │
│  │ - Diagrama-first    │                                                    │
│  └──────────┬──────────┘                                                    │
│             │                                                               │
│             │ referencia                                                    │
│             ▼                                                               │
│  ┌─────────────────────┐     ┌─────────────────────┐                        │
│  │       GITHUB        │     │     DIAGRAMA.md     │                        │
│  │  (COMO persistir)   │     │  (COMO visualizar)  │                        │
│  ├─────────────────────┤     ├─────────────────────┤                        │
│  │ - criar arquivo     │     │ - Matriz Seleção    │                        │
│  │ - editar (patch)    │     │ - Tipos diagrama    │                        │
│  │ - mover             │     │ - Metodologias      │                        │
│  │ - commitar          │     │ - Quando usar qual  │                        │
│  └─────────────────────┘     └─────────────────────┘                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3) - PENDENTE

Aguardando M1 e M2 revisados.

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
| Document360 | Lifecycle Stages |
| Shannon (1948) | Information Theory, Entropy |
| Hick (1952), Hyman (1953) | Cognitive Load |
| SOLID | Single Responsibility Principle |
| SemVer.org | Semantic Versioning |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 3.0-M0 | 2025-12-04 | 14:00 | Problema inicial (entropia, nomenclatura) |
| 3.0-M1 | 2025-12-04 | 14:30 | Marco teórico inicial |
| 3.0-M2 | 2025-12-04 | 14:35 | Objeto inicial |
| 3.0-M3 | 2025-12-04 | 15:00 | Classe inicial (cita GitHub) |
| 3.0-M0r | 2025-12-04 | 15:45 | **REVISÃO M0**: Problema consolidado (5 sintomas). Novos significantes: seção, diagrama-first, separação de concerns. Escopo revisado inclui Seção como subtipo. |

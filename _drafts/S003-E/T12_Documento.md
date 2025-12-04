---
nome: 00_E_1_6_Documento
versao: "3.0"
tipo: Classe
etapa: M3
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

---

## 4. Classe (M3) ✅

### 4.1 Diagrama de Classe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DOCUMENTO                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  - nome: string                    # Identificador único                    │
│  - frontmatter: Frontmatter        # Metadados YAML                         │
│  - secoes: Secao[]                 # Array de seções                        │
│  - historico: Versao[]             # Registro de alterações                 │
│  - ciclo_vida: enum                # M0 | M1 | M2 | M3 | M4                 │
│  - localizacao: enum               # _drafts | docs                         │
│  - tipo: TipoDocumento             # Define seções obrigatórias             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  - frontmatter obrigatório                                                  │
│  - versão no frontmatter, NUNCA no nome do arquivo                          │
│  - toda seção deve ter diagrama (postulado diagrama-first)                  │
│  - seções definidas por tipo de documento                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + validar(): bool                                                          │
│  + promover(): Documento                                                    │
│  + versionar(): Documento                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     │ composto por
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                SEÇÃO                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  - nome: string                    # Ex: "Problema", "Atributos"            │
│  - diagrama: Diagrama              # OBRIGATÓRIO (postulado)                │
│  - contexto: string                # Prosa que contextualiza (opcional)     │
│  - obrigatoria: bool               # Depende do tipo de documento           │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  - diagrama NUNCA é null                                                    │
│  - contexto máximo 3 parágrafos                                             │
│  - para COMO criar diagrama, ver 00_E_1_4_1_Diagrama.md                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     │ contém
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                               DIAGRAMA                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  - tipo: TipoDiagrama              # Tabela | Caixa | Fluxo | Rede | Lista  │
│  - conteudo: string                # ASCII ou Markdown                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Referência                                                                 │
│  ──────────                                                                 │
│  Para COMO selecionar tipo: ver 00_E_1_4_1_Diagrama.md (Matriz de Seleção)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Frontmatter (Schema)

```yaml
---
# OBRIGATÓRIO
nome: string           # Identificador único (ex: 00_E_1_6_Documento)
versao: string         # SemVer (ex: "3.0")
tipo: TipoDocumento    # Classe | Framework | Catalogo | Metodo | Sprint
status: enum           # Draft | Revisao | Publicado

# OPCIONAL (apenas em drafts)
etapa: enum            # M0 | M1 | M2 | M3 | M4
sprint_ref: string     # Ex: S003-E
task_ref: string       # Ex: T12
---
```

### 4.3 Tipos de Documento e Seções

| Tipo | Seções Obrigatórias | Diagrama Esperado |
|------|---------------------|-------------------|
| **Classe** | Problema, Marco Teórico, Objeto, Classe, Referências, Histórico | Caixa POO, Tabelas |
| **Framework** | Definição, Componentes, Fluxo, Referências, Histórico | Fluxo, Rede |
| **Metodo** | Definição, I/O, Submétodos, Referências, Histórico | Fluxo, Tabela I/O |
| **Sprint** | Objetivo, Problema, Tarefas, Drafts, Referências, Histórico | Tabela, Lista |
| **Catalogo** | Definição, Instâncias, Referências, Histórico | Tabela |

### 4.4 Seções por Tipo: Classe

| Seção | Diagrama | Contexto |
|-------|----------|----------|
| **1. Problema (M0)** | Tabela: Sintoma, Causa, Necessidade | O que motivou criar esta classe |
| **2. Marco Teórico (M1)** | Tabela: Conceito, Teoria, Aplicação | Fundamentação teórica |
| **3. Objeto (M2)** | Tabela: Campo, Valor + Diagrama Escopo | Delimitação do objeto |
| **4. Classe (M3)** | Caixa POO: Atributos, Restrições, Métodos | Especificação técnica |
| **5. Referências** | Tabela: Documento, Relação | Links internos e externos |
| **6. Histórico** | Tabela: Versão, Data, Hora, Alteração | Registro de mudanças |

### 4.5 Seções por Tipo: Framework

| Seção | Diagrama | Contexto |
|-------|----------|----------|
| **1. Definição** | Tabela resumo | O que é o framework |
| **2. Componentes** | Rede ou Lista hierárquica | Partes do framework |
| **3. Fluxo** | Fluxo sequencial | Como usar o framework |
| **4. Referências** | Tabela | Links |
| **5. Histórico** | Tabela | Registro |

### 4.6 Seções por Tipo: Metodo

| Seção | Diagrama | Contexto |
|-------|----------|----------|
| **1. Definição** | Tabela resumo | O que o método faz |
| **2. I/O** | Tabela: Input, Output, Tipo | Entrada e saída |
| **3. Submétodos** | Fluxo ou Lista | Passos do método |
| **4. Referências** | Tabela | Links |
| **5. Histórico** | Tabela | Registro |

### 4.7 Seções por Tipo: Sprint

| Seção | Diagrama | Contexto |
|-------|----------|----------|
| **1. Objetivo** | Tabela resumo | Meta do sprint |
| **2. Problema** | Tabela | O que será resolvido |
| **3. Tarefas** | Tabela: ID, Nome, Status, Etapa | Lista de tasks |
| **4. Drafts Ativos** | Tabela: Task, Arquivo, Etapa | Arquivos em progresso |
| **5. Referências** | Tabela | Links |
| **6. Histórico** | Tabela | Registro |

### 4.8 Seções por Tipo: Catalogo

| Seção | Diagrama | Contexto |
|-------|----------|----------|
| **1. Definição** | Tabela resumo | O que o catálogo lista |
| **2. Instâncias** | Tabela: ID, Nome, Atributos | Lista de objetos |
| **3. Referências** | Tabela | Links |
| **4. Histórico** | Tabela | Registro |

### 4.9 Nomenclatura

| Contexto | Padrão | Exemplo |
|----------|--------|---------|
| **docs/** | `[DOM]_[CAM]_[SEQ]_[NOME].md` | `00_E_1_6_Documento.md` |
| **_drafts/** | `TXX_[NOME].md` | `T12_Documento.md` |
| **_sprints/** | `SXXX-Y.md` | `S003-E.md` |

| Regra | Descrição |
|-------|-----------|
| Versão | NUNCA no nome do arquivo (usar frontmatter) |
| Espaços | Proibido (usar underscore) |
| Caracteres | Apenas alfanumérico + underscore |
| Case | PascalCase para nomes |

### 4.10 Ciclo de Vida

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│   M0    │──►│   M1    │──►│   M2    │──►│   M3    │──►│   M4    │
│Problema │   │ Marco   │   │ Objeto  │   │ Classe  │   │Publicar │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
     │             │             │             │             │
     └─────────────┴─────────────┴─────────────┴─────────────┘
                              │
                      _drafts/SPRINT/TXX_Nome.md
                      (1 arquivo que evolui)
                              │
                              ▼ promover()
                      docs/[DOM]_[CAM]_[SEQ]_Nome.md
```

### 4.11 Métodos

#### validar(): bool

| Etapa | Validações |
|-------|------------|
| M0 | sintoma, significantes, causa_raiz, necessidade |
| M1 | conceitos com fonte, aplicação definida |
| M2 | escopo, fronteiras, critérios verificáveis |
| M3 | atributos, restrições, métodos, seções por tipo |
| M4 | frontmatter completo, histórico atualizado, todas seções com diagrama |

#### promover(): Documento

| Passo | Ação |
|-------|------|
| 1 | Verificar: etapa == M4 AND validar() == true |
| 2 | Copiar para docs/ com nome definitivo |
| 3 | Atualizar frontmatter (remover etapa, sprint_ref, task_ref) |
| 4 | Atualizar GENESIS.md índice |
| 5 | Deletar arquivo em _drafts/ |

#### versionar(): Documento

| Passo | Ação |
|-------|------|
| 1 | Incrementar versão no frontmatter |
| 2 | Adicionar entrada no histórico |

---

## 5. Instruções de Uso

### 5.1 Para COMO persistir

Ver: **00_I_1_1_GitHub.md**

| Ação | Método |
|------|--------|
| Criar arquivo | github:create_or_update_file |
| Editar parcial | patch system |
| Editar completo | substituição |
| Commit | [CAMADA] tipo: descrição |

### 5.2 Para COMO criar diagramas

Ver: **00_E_1_4_1_Diagrama.md**

| Recurso | Conteúdo |
|---------|----------|
| Matriz de Seleção | Qual diagrama usar |
| Tipos | Tabela, Caixa, Fluxo, Rede, Lista |
| Metodologias | Semiótica, Temporal, Estrutural |

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_4_1_Diagrama | COMO selecionar/criar diagramas |
| 00_I_1_1_GitHub | COMO persistir |
| GENESIS.md | Índice de arquivos |

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
| 3.0-M1r | 2025-12-04 | 16:00 | REVISÃO M1: Validado |
| 3.0-M2r | 2025-12-04 | 16:05 | REVISÃO M2: Escopo completo, 3 diagramas |
| 3.0-M3r | 2025-12-04 | 16:15 | REVISÃO M3: Seção como subtipo, seções por tipo, diagrama obrigatório |

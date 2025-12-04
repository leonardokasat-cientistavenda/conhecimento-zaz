---
nome: 00_E_1_6_Documento
versao: "3.0"
tipo: Classe
etapa: M1
status: Draft
sprint_ref: S003-E
task_ref: T12
---

# Documento v3.0

## 1. Problema (M0)

### 1.1 Sintoma

Documento v2.4 está desatualizado em relação aos outros docs (M0-M3). Falta marco teórico que justifique decisões de estrutura, nomenclatura e granularidade.

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto | Ambiguidade Resolvida |
|--------------|-------------------------|----------------------|
| **persistência** | Transformar conhecimento volátil (chat) em conhecimento estruturado (arquivo versionado com metadados) | Não é "salvar" - é cristalizar |
| **documento** | Artefato atômico com frontmatter + conteúdo + histórico | Unidade de conhecimento persistido |
| **entropia** | Entropia contextual - perda de precisão por sobrecarga de contexto (GENESIS) | Não entropia termodinâmica |
| **token** | Recurso escasso - cada token gasto reduz contexto disponível | Otimização é survival |
| **granularidade** | Nível de divisão dos arquivos (1 grande vs N pequenos) | Trade-off atomicidade vs overhead |
| **atomicidade** | Commit/arquivo que não pode ser dividido mais sem perder sentido | Unidade mínima de mudança |

### 1.3 Causa Raiz

Documento v2.4 documenta "como" (estrutura, fluxo) mas não "por quê" (fundamento teórico para decisões de nomenclatura, granularidade, versionamento).

### 1.4 Necessidade

Documento v3.0 que incorpore marco teórico para justificar: ciclo de vida, atomicidade, nomenclatura, versionamento no Git.

---

## 2. Marco Teórico (M1)

### 2.1 Document Lifecycle Management (DLM)

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **Lifecycle Stages** | Criação → Revisão → Aprovação → Publicação → Arquivamento | M0→M1→M2→M3 (drafts) → M4 (docs/) |
| **Phase-Gating** | Documento só avança quando fase anterior validada | Cada Mx só persiste se anterior passou validar() |
| **Draft vs Published** | Separação entre trabalho em progresso e versão final | _drafts/ vs docs/ |
| **Version Control Table** | Metadados de versão dentro do documento, não no nome | frontmatter.versao |

**Fonte:** Princeton University Records Management; Document360

**Insight crítico:** Práticas recomendadas sugerem que apenas versões finais sejam mantidas em repositório compartilhado; rascunhos podem ser deletados quando não mais úteis.

### 2.2 Atomic Commits (Git Best Practices)

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **Atomicidade** | Commit impossível de dividir mais; focado em uma única mudança lógica | Cada etapa Mx é um commit atômico |
| **Granularidade** | Trade-off entre commits pequenos (rastreabilidade) e grandes (simplicidade) | 1 arquivo que evolui vs 5 arquivos separados |
| **Revertibilidade** | Mudanças pequenas permitem reverter sem afetar outras | Se M2 falha, não perde M0+M1 |
| **git bisect** | Busca binária para localizar commit que introduziu bug | Localizar onde entropia foi introduzida |

**Fonte:** GitByBit; Stack Overflow; LeanIX Engineering

**Insight crítico:** "Quão pequeno é pequeno?" - a granularidade ideal é um commit = uma mudança lógica completa, não fragmentos sem sentido isolado.

### 2.3 Information Theory + Cognitive Load

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **Entropia (Shannon)** | Medida de incerteza/imprevisibilidade em um sistema | Mais arquivos para escolher = mais incerteza |
| **Lei de Hick-Hyman** | Tempo de resposta aumenta com log do número de opções | Menos arquivos = menos overhead cognitivo |
| **Channel Capacity** | Capacidade máxima de transmissão de informação | Tokens Claude = channel capacity limitado |
| **Cognitive Load** | Carga mental para processar informação (intrínseca, estranha, germinativa) | Reduzir carga estranha (overhead navegação) |

**Fonte:** Hick (1952); Hyman (1953); Shannon (1948); PMC/MDPI reviews

**Insight crítico:** Maior entropia (mais opções) = maior carga cognitiva = mais tempo de resposta = mais tokens gastos.

### 2.4 Single Source of Truth (SSOT)

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **SSOT** | Cada elemento de dado é masterizado em apenas um lugar | Cada conceito tem UM arquivo definitivo em docs/ |
| **Atomic Content** | Conteúdo em componentes atômicos e reutilizáveis | Arquivos pequenos que se referenciam |
| **Monorepo** | Um repositório como fonte única de verdade | conhecimento-zaz como monorepo |

**Fonte:** Wikipedia; Atlassian; Perforce

**Insight crítico:** SSOT elimina versões conflitantes e reduz duplicação.

### 2.5 File Naming Conventions

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **Versão no metadado** | Versão no frontmatter, não no nome do arquivo | frontmatter.versao: "3.0" |
| **Evitar caracteres especiais** | Não usar < > | [ ] & $ + \ / : * ? " | Usar apenas alfanuméricos, hífens, underscores |
| **Tamanho ideal** | 40-50 caracteres máximo | Nomes concisos |
| **Geral → Específico** | Ordenar elementos do mais geral ao mais específico | [DOMINIO]_[CAMADA]_[SEQ]_[NOME] |
| **SemVer** | Formato X.Y.Z (Major.Minor.Patch) | No frontmatter, não no nome |

**Fonte:** Harvard Data Management; Princeton; SemVer.org; Canto

**Insight crítico:** Git já versiona arquivos - versão no nome do arquivo é redundante e causa conflitos.

### 2.6 Conceitos Consolidados

| Conceito | Definição Operacional | Origem | Aplicação |
|----------|----------------------|--------|-----------|
| Lifecycle Stages | Fases sequenciais de maturidade do documento | DLM | M0→M4 |
| Atomicidade | Unidade mínima de mudança com sentido completo | Git | 1 commit = 1 etapa Mx |
| Entropia Contextual | Perda de precisão por excesso de opções/contexto | Shannon + GENESIS | Minimizar arquivos |
| SSOT | Um lugar para cada verdade | SSOT | docs/ como fonte única |
| SemVer no frontmatter | Versão como metadado, não como nome | File Naming | versao: "X.Y" |

---

## 3. Objeto (M2)

| Campo | Valor |
|-------|-------|
| **nome** | Documento |
| **problema_ref** | Seção 1 deste documento |
| **marco_ref** | Seção 2 deste documento |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Estruturar persistência de conhecimento minimizando tokens, reduzindo entropia, preservando rastreabilidade |
| **escopo** | Ciclo de vida (M0-M4), nomenclatura, estrutura de pastas, frontmatter, versionamento |
| **fronteiras** | Não cobre: conteúdo dos domínios, implementação de patches, sincronização com Outline |
| **conceitos_usados** | DLM, Atomic Commits, Entropia, SSOT, SemVer |
| **criterio_sucesso** | Claude consegue persistir conhecimento seguindo convenções sem ambiguidade |
| **criterio_insucesso** | Convenções geram conflito Git ou aumentam tokens gastos |

---

## 4. Classe (M3)

*Pendente - próxima etapa*

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_5_Metodo | Anterior (M3) |
| GENESIS.md | Define índice de arquivos |

### Externas

| Fonte | Conceito |
|-------|----------|
| Princeton University Records Management | Document Lifecycle, Version Control Table |
| Document360 | Lifecycle Stages |
| GitByBit, Stack Overflow, LeanIX | Atomic Commits, Granularity |
| Shannon (1948) | Information Theory, Entropy |
| Hick (1952), Hyman (1953) | Hick-Hyman Law, Cognitive Load |
| Wikipedia, Atlassian | SSOT |
| Harvard Data Management | File Naming Conventions |
| SemVer.org | Semantic Versioning |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 3.0-M0 | 2025-12-04 | 14:00 | Problema definido (sintoma, significantes, causa raiz, necessidade) |
| 3.0-M1 | 2025-12-04 | 14:30 | Marco teórico consolidado (DLM, Atomic Commits, Information Theory, SSOT, File Naming) |
| 3.0-M2 | 2025-12-04 | 14:35 | Objeto delimitado |

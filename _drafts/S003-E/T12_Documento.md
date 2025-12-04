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

### 2.2 Atomic Commits (Git Best Practices)

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **Atomicidade** | Commit impossível de dividir mais; focado em uma única mudança lógica | Cada etapa Mx é um commit atômico |
| **Granularidade** | Trade-off entre commits pequenos (rastreabilidade) e grandes (simplicidade) | 1 arquivo que evolui vs 5 arquivos separados |
| **Revertibilidade** | Mudanças pequenas permitem reverter sem afetar outras | Se M2 falha, não perde M0+M1 |

**Fonte:** GitByBit; Stack Overflow; LeanIX Engineering

### 2.3 Information Theory + Cognitive Load

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **Entropia (Shannon)** | Medida de incerteza/imprevisibilidade em um sistema | Mais arquivos para escolher = mais incerteza |
| **Lei de Hick-Hyman** | Tempo de resposta aumenta com log do número de opções | Menos arquivos = menos overhead cognitivo |
| **Channel Capacity** | Capacidade máxima de transmissão de informação | Tokens Claude = channel capacity limitado |

**Fonte:** Hick (1952); Hyman (1953); Shannon (1948)

### 2.4 Single Source of Truth (SSOT)

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **SSOT** | Cada elemento de dado é masterizado em apenas um lugar | Cada conceito tem UM arquivo definitivo em docs/ |
| **Separação de Concerns** | Cada classe sabe sobre sua própria responsabilidade | Documento sabe O QUE; GitHub sabe COMO |

**Fonte:** Wikipedia; Atlassian

### 2.5 File Naming Conventions

| Conceito | Definição | Aplicação GENESIS |
|----------|-----------|-------------------|
| **Versão no metadado** | Versão no frontmatter, não no nome do arquivo | frontmatter.versao: "3.0" |
| **Evitar caracteres especiais** | Não usar vXX no nome | Causa conflitos Git |
| **Geral → Específico** | Ordenar elementos do mais geral ao mais específico | [DOMINIO]_[CAMADA]_[SEQ]_[NOME] |

**Fonte:** Harvard Data Management; Princeton; SemVer.org

---

## 3. Objeto (M2)

| Campo | Valor |
|-------|-------|
| **nome** | Documento |
| **problema_ref** | Seção 1 deste documento |
| **marco_ref** | Seção 2 deste documento |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Estruturar persistência de conhecimento minimizando tokens, reduzindo entropia, preservando rastreabilidade |
| **escopo** | Ciclo de vida (M0-M4), nomenclatura, estrutura de pastas, frontmatter, tipos de documento |
| **fronteiras** | Não cobre: COMO persistir (ver 00_I_1_1_GitHub), conteúdo dos domínios, sincronização com Outline |
| **conceitos_usados** | DLM, Atomic Commits, Entropia, SSOT, File Naming |
| **criterio_sucesso** | Claude consegue persistir conhecimento seguindo convenções sem ambiguidade |
| **criterio_insucesso** | Convenções geram conflito Git ou aumentam tokens gastos |

---

## 4. Classe (M3)

### 4.1 Definição

Documento é a classe que estrutura O QUE persistir no sistema de conhecimento. Define frontmatter, seções, tipos e ciclo de vida M0-M4.

**Separação de Concerns:**
- **Documento** → O QUE persistir (estrutura, metadados, ciclo de vida)
- **GitHub** → COMO persistir (commits, patches, branches) - ver `00_I_1_1_GitHub.md`

### 4.2 Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                        DOCUMENTO                                │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                                                 │
│  - frontmatter: Frontmatter                                     │
│  - conteudo: Secao[]                                            │
│  - historico: Versao[]                                          │
│  - ciclo_vida: enum [M0, M1, M2, M3, M4]                        │
│  - localizacao: enum [_drafts, docs]                            │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - frontmatter obrigatório                                      │
│  - versão no frontmatter, NUNCA no nome do arquivo              │
│  - nome: [DOMINIO]_[CAMADA]_[SEQ]_[NOME].md                     │
│  - drafts: _drafts/SPRINT/TXX_Nome.md                           │
│  - histórico atualizado a cada versão                           │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + validar(): bool                                              │
│  + promover(): Documento  // _drafts → docs                     │
│  + versionar(): Documento                                       │
└─────────────────────────────────────────────────────────────────┘
         │
         │ Para COMO persistir
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         GITHUB                                  │
│                   (00_I_1_1_GitHub.md)                          │
├─────────────────────────────────────────────────────────────────┤
│  - criar(): github:create_or_update_file                        │
│  - editar(): patch (parcial) ou substituição (completa)         │
│  - mover(): promover draft para docs                            │
│  - commitar(): [CAMADA] tipo: descrição                         │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único, sem versão |
| frontmatter | Frontmatter | Sim | Metadados YAML |
| conteudo | Secao[] | Sim | Seções do documento |
| historico | Versao[] | Sim | Registro de versões com timestamp |
| ciclo_vida | enum | Sim | M0, M1, M2, M3, M4 |
| localizacao | enum | Sim | _drafts ou docs |

### 4.4 Frontmatter (Schema)

```yaml
---
# Obrigatório
nome: string           # Identificador único (ex: 00_E_1_6_Documento)
versao: string         # SemVer (ex: "3.0")
tipo: enum             # Classe | Framework | Catalogo | Metodo | Sprint
status: enum           # Draft | Revisao | Publicado

# Opcional (drafts)
etapa: enum            # M0 | M1 | M2 | M3 | M4
sprint_ref: string     # Ex: S003-E
task_ref: string       # Ex: T12
---
```

### 4.5 Nomenclatura

| Contexto | Padrão | Exemplo |
|----------|--------|---------|
| **docs/** | `[DOM]_[CAM]_[SEQ]_[NOME].md` | `00_E_1_6_Documento.md` |
| **_drafts/** | `TXX_[NOME].md` | `T12_Documento.md` |
| **_sprints/** | `SXXX-Y.md` | `S003-E.md` |

**Regras:**
- Versão NUNCA no nome do arquivo
- Sem espaços, sem caracteres especiais
- PascalCase para nomes

### 4.6 Ciclo de Vida

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

### 4.7 Tipos de Documento

| Tipo | Descrição | Seções Específicas |
|------|-----------|-------------------|
| Classe | Define estrutura POO | Atributos, Restrições, Métodos |
| Framework | Orquestra métodos | Sequência, Etapas |
| Catalogo | Lista instâncias | Tabela de objetos |
| Metodo | Define processo | Input/Output, Submétodos |
| Sprint | Ciclo de trabalho | Objetivo, Tarefas |

### 4.8 Métodos

#### validar(): bool

Verifica se documento está correto para a etapa atual.

| Etapa | Validações |
|-------|------------|
| M0 | sintoma, significantes, causa_raiz, necessidade |
| M1 | conceitos com fonte, aplicação definida |
| M2 | escopo, fronteiras, critérios verificáveis |
| M3 | atributos, restrições, métodos |
| M4 | frontmatter completo, histórico atualizado |

#### promover(): Documento

Move documento de _drafts/ para docs/.

```
Pré-condição: etapa == M4 AND validar() == true
Ação: 
  1. Copiar para docs/ com nome definitivo
  2. Atualizar frontmatter (remover etapa, sprint_ref, task_ref)
  3. Atualizar GENESIS.md índice
  4. Deletar arquivo em _drafts/
```

#### versionar(): Documento

Incrementa versão no frontmatter e registra no histórico.

---

## 5. INSTRUÇÃO: Como usar Documento

### 5.1 Para COMO persistir (criar/editar arquivos)

Ver: **00_I_1_1_GitHub.md**

Inclui:
- Criar arquivo novo
- Editar via patch (parcial) ou substituição (completa)
- Convenções de commit
- Regras de token efficiency

### 5.2 Checklist por Etapa

**M0 (Problema):**
- [ ] Sintoma observável
- [ ] Significantes extraídos
- [ ] Glossário com significados
- [ ] Causa raiz identificada
- [ ] Necessidade acionável

**M1 (Marco Teórico):**
- [ ] Conceitos com fonte rastreável
- [ ] Aplicação no contexto GENESIS
- [ ] Conceitos consolidados

**M2 (Objeto):**
- [ ] Escopo definido
- [ ] Fronteiras claras
- [ ] Critérios verificáveis

**M3 (Classe):**
- [ ] Diagrama POO
- [ ] Atributos com tipos
- [ ] Restrições
- [ ] Métodos com I/O

**M4 (Publicar):**
- [ ] Frontmatter completo
- [ ] Histórico atualizado
- [ ] GENESIS.md atualizado
- [ ] promover() executado

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_5_Metodo | Anterior (M3) |
| 00_I_1_1_GitHub | COMO persistir (commits, patches) |
| GENESIS.md | Define índice de arquivos |

### Externas

| Fonte | Conceito |
|-------|----------|
| Princeton University Records Management | Document Lifecycle |
| Document360 | Lifecycle Stages |
| GitByBit, LeanIX | Atomic Commits |
| Shannon (1948) | Information Theory |
| Hick-Hyman | Cognitive Load |
| SemVer.org | Semantic Versioning |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 3.0-M0 | 2025-12-04 | 14:00 | Problema definido |
| 3.0-M1 | 2025-12-04 | 14:30 | Marco teórico consolidado |
| 3.0-M2 | 2025-12-04 | 14:35 | Objeto delimitado |
| 3.0-M3 | 2025-12-04 | 15:00 | Classe especificada. Separação: Documento (O QUE) cita GitHub (COMO) |

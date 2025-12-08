---
nome: 00_I_1_1_GitHub
versao: "2.2"
tipo: Classe
classe_ref: Classe
origem: interno
status: Publicado
---

# GitHub v2.2

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Violação SSOT | 2 documentos tratam de "como persistir" |
| Ambiguidade | Onde buscar informação? Github_Instructions ou Patch_System? |

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **GitHub** | Infraestrutura de versionamento e persistência de **definições** |
| **persistir** | Transformar conhecimento em arquivo versionado |
| **criar** | Novo arquivo que não existia |
| **editar** | Modificar arquivo existente via substituição |
| **commit** | Unidade atômica de mudança no Git |
| **definição** | Conteúdo estrutural: GENESIS, Epistemologia, Módulos, Prompts |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Sistema de patches era frágil | Falhas frequentes, retrabalho |
| Transações misturadas com definições | Latência, complexidade |

### 1.4 Necessidade

| Necessidade | Solução |
|-------------|---------|
| Separar definições de transações | GitHub (definições) + MongoDB (transações) |
| Simplificar edição | Substituição direta via API |

---

## 2. Marco Teórico (M1)

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Atomic Commits** | Git Best Practices | 1 commit = 1 mudança lógica |
| **SSOT** | Information Architecture | 1 lugar para cada verdade |
| **Token Efficiency** | LLM Context Limits | NÃO duplicar chat + GitHub |
| **SemVer** | Semantic Versioning | MAJOR.MINOR.PATCH |
| **Persistência Híbrida** | GENESIS v1.8 | GitHub para definições, MongoDB para transações |

---

## 3. Objeto (M2)

### 3.1 Definição do Objeto

| Campo | Valor |
|-------|-------|
| **nome** | GitHub |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Definir COMO persistir **definições**: criar, editar, mover, commitar |
| **camada** | C2 (Infraestrutura) |

### 3.2 Escopo

| Inclui | Descrição |
|--------|-----------|
| Identity | username, repos, branches |
| Permissions | allowed, restricted, forbidden |
| Conventions | commits, branches, versionamento |
| Structure | dirs, naming |
| Workflows | criar, editar, mover, commitar |
| Token Efficiency | Regras de economia |

### 3.3 O Que Persiste no GitHub

| Tipo | Exemplos | Característica |
|------|----------|----------------|
| **Framework** | GENESIS.md, Epistemologia.md | Muda pouco, precisa versionar |
| **Meta Sistemas** | Módulos, docs estruturados | Definição, não transação |
| **Prompts** | Instruções para LLM | Precisa histórico |
| **Infraestrutura docs** | Este documento | Referência técnica |

### 3.4 O Que NÃO Persiste no GitHub

| Tipo | Destino | Razão |
|------|---------|-------|
| Catálogo (índice) | MongoDB | Queries rápidas |
| Backlog items | MongoDB | Transações frequentes |
| Sprints (status) | MongoDB | Atualizações frequentes |
| Decisões | MongoDB | Histórico consultável |

**Referência:** `docs/00_I/00_I_1_3_MongoDB.md`

### 3.5 Fronteiras

| Não Cobre | Referência |
|-----------|------------|
| O QUE documentar | 00_E_1_6_Documento.md |
| COMO selecionar diagrama | 00_E_1_4_1_Diagrama.md |
| Persistência transacional | 00_I_1_3_MongoDB.md |
| Conteúdo dos domínios | Camada 4 |

### 3.6 Diagrama de Escopo

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
│   │ MongoDB.md        │               │  ├─ allowed                     │   │
│   │ (Transações)      │               │  ├─ restricted                  │   │
│   └───────────────────┘               │  └─ forbidden                   │   │
│                                       │                                 │   │
│                                       │  Conventions                    │   │
│                                       │  ├─ commits: [CAMADA] tipo: desc│   │
│                                       │  ├─ branches: tipo/descricao    │   │
│                                       │  └─ versionamento: SemVer       │   │
│                                       │                                 │   │
│                                       │  Structure                      │   │
│                                       │  ├─ docs/ (publicado)           │   │
│                                       │  ├─ genesis/ (framework)        │   │
│                                       │  ├─ _drafts/ (M0-M3)            │   │
│                                       │  ├─ _backlog/ (arquivos .md)    │   │
│                                       │  └─ _sprints/ (arquivos .md)    │   │
│                                       │                                 │   │
│                                       │  Workflows                      │   │
│                                       │  ├─ criar                       │   │
│                                       │  ├─ editar (substituição)       │   │
│                                       │  ├─ mover                       │   │
│                                       │  └─ commitar                    │   │
│                                       └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3)

### 4.1 Diagrama de Classe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 GITHUB                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  - identity: Identity                  # username, repos, branches          │
│  - permissions: Permissions            # allowed, restricted, forbidden     │
│  - conventions: Conventions            # commits, branches, versioning      │
│  - structure: Structure                # dirs, naming                       │
│  - token_efficiency: TokenEfficiency   # regras de economia                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  - NÃO duplicar conteúdo (chat + GitHub)                                    │
│  - Commit sempre com formato [CAMADA] tipo: descrição                       │
│  - Versão no frontmatter, NUNCA no nome do arquivo                          │
│  - Push direto em main permitido (TEMPORÁRIO - ver Seção 6)                 │
│  - Deletar arquivos em docs/ requer confirmação explícita                   │
│  - Usar para DEFINIÇÕES, não transações                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(path, content): Arquivo                                            │
│  + editar(path, content): Arquivo                                           │
│  + mover(origem, destino): Arquivo                                          │
│  + commitar(message): Commit                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Subtipos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                               IDENTITY                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  - username: string = "leonardokasat-cientistavenda"                        │
│  - repos: Repo[] = [{name: "conhecimento-zaz", role: "principal"}]          │
│  - default_branch: string = "main"                                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              PERMISSIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  - allowed: string[] = [create_file, update_file, create_branch,            │
│                         create_pull_request, list_contents, list_commits]   │
│  - restricted: Map = {delete_file: "requer confirmação",                    │
│                       merge_pull_request: "requer confirmação"}             │
│  - forbidden: string[] = ["deletar arquivos em docs/ sem confirmação"]      │
│                                                                             │
│  NOTA: Ver Seção 6 sobre autonomia temporária                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONVENTIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  - commit_format: string = "[CAMADA] tipo: descrição"                       │
│  - camadas: Map = {C0: Axiomas, C1: GENESIS, C2: Infra, C3: Framework,      │
│                    C4: Domínios}                                            │
│  - tipos: string[] = [add, update, fix, cleanup, promote, delete]           │
│  - branch_format: string = "tipo/descricao-curta"                           │
│  - versioning: string = "SemVer"                                            │
│  - idioma: string = "português"                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                               STRUCTURE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  - dirs: Dir[] = [                                                          │
│      {path: "docs/", purpose: "publicados", status: "Publicado"},           │
│      {path: "genesis/", purpose: "framework core", status: "Publicado"},    │
│      {path: "_drafts/", purpose: "M0-M3", status: "Draft"},                 │
│      {path: "_sprints/", purpose: "arquivos sprint", status: "Sistema"},    │
│      {path: "_backlog/", purpose: "arquivos backlog", status: "Sistema"}    │
│    ]                                                                        │
│  - naming_pattern: string = "NN_X_N_N_Nome.md"                               │
│  - draft_pattern: string = "_drafts/SPRINT/TXX_Nome.md"                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            TOKEN_EFFICIENCY                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  - regra_principal: string = "NÃO duplicar conteúdo (chat + GitHub)"        │
│  - anti_patterns: string[] = [                                              │
│      "Mostrar conteúdo no chat E depois subir no GitHub",                   │
│      "Preview completo antes de commit",                                    │
│      "Exibir arquivo inteiro para pequenas edições"                         │
│    ]                                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Métodos

#### criar(path, content): Arquivo

| Campo | Valor |
|-------|-------|
| **Descrição** | Cria novo arquivo no repositório |
| **Input** | path: string, content: string |
| **Output** | Arquivo criado |
| **API** | github:create_or_update_file (sem SHA) |

```
┌─────────────────────────────────────────────────────────────────┐
│                         criar()                                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Validar path (não existe)                                   │
│  2. Criar arquivo DIRETO no GitHub                              │
│  3. Informar: "Arquivo criado: [path] - [resumo]"               │
│  4. Usuário valida pelo link                                    │
└─────────────────────────────────────────────────────────────────┘
```

#### editar(path, content): Arquivo

| Campo | Valor |
|-------|-------|
| **Descrição** | Modifica arquivo existente via substituição |
| **Input** | path: string, content: string |
| **Output** | Arquivo atualizado |
| **API** | github:create_or_update_file (com SHA) |

```
┌─────────────────────────────────────────────────────────────────┐
│                         editar()                                │
├─────────────────────────────────────────────────────────────────┤
│  1. Obter SHA do arquivo atual                                  │
│  2. github:create_or_update_file com SHA                        │
│  3. Atualizar versão no frontmatter                             │
│  4. Atualizar histórico                                         │
└─────────────────────────────────────────────────────────────────┘
```

#### mover(origem, destino): Arquivo

| Campo | Valor |
|-------|-------|
| **Descrição** | Move arquivo entre diretórios (tipicamente _drafts → docs) |
| **Input** | origem: string, destino: string |
| **Output** | Arquivo no novo local |

```
┌─────────────────────────────────────────────────────────────────┐
│                         mover()                                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Ler conteúdo de origem                                      │
│  2. Criar em destino                                            │
│  3. Deletar origem                                              │
│  4. Atualizar GENESIS.md índice                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### commitar(message): Commit

| Campo | Valor |
|-------|-------|
| **Descrição** | Registra mudança com mensagem padronizada |
| **Input** | message: string |
| **Output** | Commit SHA |

```
┌─────────────────────────────────────────────────────────────────┐
│                        commitar()                               │
├─────────────────────────────────────────────────────────────────┤
│  Formato: [CAMADA] tipo: descrição                              │
│                                                                 │
│  Camadas:                                                       │
│  ├─ C0: Axiomas                                                 │
│  ├─ C1: GENESIS                                                 │
│  ├─ C2: Infraestrutura                                          │
│  ├─ C3: Framework/Epistemologia                                 │
│  └─ C4: Domínios                                                │
│                                                                 │
│  Tipos:                                                         │
│  ├─ add: novo arquivo                                           │
│  ├─ update: atualização                                         │
│  ├─ fix: correção                                               │
│  ├─ cleanup: limpeza                                            │
│  ├─ delete: remoção                                             │
│  └─ promote: backlog → sprint                                   │
│                                                                 │
│  Exemplo: [C3] add: M0 Problema para Objeto v2                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Integração com MongoDB

### 5.1 Arquitetura de Persistência Híbrida

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PERSISTÊNCIA                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GITHUB (Definições)                 MONGODB (Transações)                   │
│  ────────────────────                ───────────────────                    │
│  • GENESIS.md                        • catalogo                             │
│  • Epistemologia.md                  • backlog_items                        │
│  • Módulos (.md)                     • sprints                              │
│  • Prompts                           • decisoes                             │
│                                                                             │
│  Muda pouco, versionado              Muda frequentemente, queries rápidas   │
│                                                                             │
│  API: github:create_or_update_file   API: mongodb:find, mongodb:insert      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Quando Usar Cada Um

| Operação | Destino | Método |
|----------|---------|--------|
| Criar Meta Sistema | GitHub | criar() |
| Editar definição | GitHub | editar() |
| Buscar no catálogo | MongoDB | mongodb:find |
| Atualizar status sprint | MongoDB | mongodb:update-many |
| Capturar item backlog | MongoDB | mongodb:insert-many |
| Registrar decisão | MongoDB | mongodb:insert-many |

**Referência completa:** `docs/00_I/00_I_1_3_MongoDB.md`

---

## 6. Autonomia Temporária

### 6.1 Contexto

Durante o desenvolvimento inicial do GENESIS (Sprints S001-S010), algumas restrições foram **temporariamente relaxadas** para acelerar iteração:

| Restrição Original | Status Atual | Razão |
|--------------------|--------------|-------|
| Branch obrigatório para mudanças | ⚠️ Suspenso | Iteração rápida em desenvolvimento |
| PR review antes de merge | ⚠️ Suspenso | Único desenvolvedor |
| Push direto em main proibido | ⚠️ Permitido | Desenvolvimento ativo |

### 6.2 Compromisso de Devolução

**Quando devolver:** Após sistema estável (estimativa: S012)

**O que restaurar:**

```
┌─────────────────────────────────────────────────────────────────┐
│                  RESTRIÇÕES A RESTAURAR                         │
├─────────────────────────────────────────────────────────────────┤
│  1. Branch obrigatório para todas as mudanças                   │
│     - Formato: tipo/descricao-curta                             │
│     - Exemplo: feature/catalogo-mvp                             │
│                                                                 │
│  2. Pull Request obrigatório                                    │
│     - Título seguindo convenção de commit                       │
│     - Descrição com contexto                                    │
│                                                                 │
│  3. Push direto em main proibido                                │
│     - Exceção: hotfixes críticos com justificativa              │
│                                                                 │
│  4. Review antes de merge                                       │
│     - Auto-review aceitável para único desenvolvedor            │
│     - Checklist de validação                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| docs/00_I/00_I_1_3_MongoDB.md | Persistência transacional (complemento) |
| docs/00_E/00_E_1_6_Documento.md | Define O QUE persistir |
| genesis/GENESIS.md | Método persistir() - orquestra GitHub vs MongoDB |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-02 | Criação como Github_Instructions |
| 1.1 | 2025-12-02 | Adiciona token_efficiency |
| 1.2 | 2025-12-03 | Refatora token_efficiency, convenções [CAMADA] |
| 2.0 | 2025-12-04 | CONSOLIDAÇÃO: Absorve Patch_System. Reestrutura como Classe M0-M3. |
| 2.1 | 2025-12-07 | CICLO SPRINT: Adiciona Seção 5 (Backlog→Sprint→Publicado), Seção 6 (Autonomia Temporária). |
| 2.2 | 2025-12-08 | **PERSISTÊNCIA HÍBRIDA**: Remove sistema de patches (eliminado em S010). GitHub agora apenas para definições. Transações migradas para MongoDB. Seção 5 atualizada para integração. |

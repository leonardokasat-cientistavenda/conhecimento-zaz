---
nome: 00_I_1_1_GitHub
versao: "3.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Publicado
---

# GitHub v3.0

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Violação SSOT | 2 documentos tratam de "como persistir" |
| Ambiguidade | Onde buscar informação? Github_Instructions ou Patch_System? |
| Patches frágeis | 32 patches acumulados, falhas silenciosas (S010) |

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **GitHub** | Infraestrutura de versionamento e persistência de **definições** |
| **persistir_md** | Método orquestrador que decide criar/editar/substituir |
| **criar** | Novo arquivo que não existia |
| **editar** | Modificar seção específica via âncora (patch) |
| **substituir** | Reescrever arquivo existente por completo |
| **âncora** | Padrão único no arquivo que identifica ponto de edição |
| **commit** | Unidade atômica de mudança no Git |
| **definição** | Conteúdo estrutural: GENESIS, Epistemologia, Módulos, Prompts |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Sistema de patches v1 era frágil | Falhas silenciosas, 32 patches acumulados |
| Matching por string exata | Whitespace quebrava pattern |
| GitHub Action assíncrona | Latência, sem feedback imediato |

### 1.4 Necessidade

| Necessidade | Solução |
|-------------|---------|
| Separar definições de transações | GitHub (definições) + MongoDB (transações) |
| Edição parcial robusta | Patch por âncora, síncrono, feedback explícito |
| Decisão centralizada | `persistir_md()` decide criar/editar/substituir |

---

## 2. Marco Teórico (M1)

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Atomic Commits** | Git Best Practices | 1 commit = 1 mudança lógica |
| **SSOT** | Information Architecture | 1 lugar para cada verdade |
| **Token Efficiency** | LLM Context Limits | NÃO duplicar chat + GitHub |
| **SemVer** | Semantic Versioning | MAJOR.MINOR.PATCH |
| **Persistência Híbrida** | GENESIS v1.8 | GitHub para definições, MongoDB para transações |
| **Âncora** | Markdown Structure | Headers como pontos de referência únicos |

---

## 3. Objeto (M2)

### 3.1 Definição do Objeto

| Campo | Valor |
|-------|-------|
| **nome** | GitHub |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Definir COMO persistir **definições**: criar, editar, substituir |
| **camada** | C2 (Infraestrutura) |

### 3.2 Escopo

| Inclui | Descrição |
|--------|-----------|
| Identity | username, repos, branches |
| Permissions | allowed, restricted, forbidden |
| Conventions | commits, branches, versionamento |
| Structure | dirs, naming |
| Workflows | persistir_md → criar / editar / substituir |
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
│  - Push direto em main permitido (TEMPORÁRIO - ver Seção 7)                 │
│  - Deletar arquivos em docs/ requer confirmação explícita                   │
│  - Usar para DEFINIÇÕES, não transações                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + persistir_md(arquivo, conteudo, instrucao?): Resultado    # orquestrador │
│  + criar(arquivo, conteudo): Arquivo                         # arquivo novo │
│  + editar(arquivo, ancora, operacao, conteudo): Arquivo      # patch        │
│  + substituir(arquivo, conteudo): Arquivo                    # reescrita    │
│  + mover(origem, destino): Arquivo                           # relocação    │
│  - _gerar_commit(tipo, arquivo, ancora?, contexto?): string  # interno      │
│  - _inferir_camada(path): Camada                             # interno      │
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
│  NOTA: Ver Seção 7 sobre autonomia temporária                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONVENTIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  - commit_format: string = "[CAMADA] tipo: descrição"                       │
│  - camadas: Map = {C0: Axiomas, C1: GENESIS, C2: Infra, C3: Framework,      │
│                    C4: Domínios}                                            │
│  - tipos: string[] = [add, update, patch, fix, cleanup, promote, delete]    │
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

### 4.3 Método Orquestrador: persistir_md()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    persistir_md(arquivo, conteudo, instrucao?)              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADE: Decidir COMO persistir arquivo .md no GitHub             │
│  CHAMADO POR: GENESIS.persistir() quando tipo == definição                  │
│                                                                             │
│  Input:                                                                     │
│  - arquivo: string (path no GitHub)                                         │
│  - conteudo: string | {ancora, operacao, conteudo}                          │
│  - instrucao?: "criar" | "editar" | "substituir" | null (auto)              │
│                                                                             │
│  Output:                                                                    │
│  - Resultado: {sucesso: bool, metodo: string, mensagem: string}             │
│                                                                             │
│  Fluxo de Decisão:                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │  SE instrucao == "criar" OU arquivo não existe:                     │    │
│  │     → criar(arquivo, conteudo)                                      │    │
│  │                                                                     │    │
│  │  SE instrucao == "editar" OU conteudo tem {ancora, operacao}:       │    │
│  │     → editar(arquivo, ancora, operacao, conteudo)                   │    │
│  │                                                                     │    │
│  │  SE instrucao == "substituir":                                      │    │
│  │     → substituir(arquivo, conteudo)                                 │    │
│  │                                                                     │    │
│  │  SE instrucao == null (automático):                                 │    │
│  │     → Perguntar ao usuário: "Edição localizada ou reescrita?"       │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Método: criar()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         criar(arquivo, conteudo)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  QUANDO USAR: Arquivo NÃO existe                                            │
│                                                                             │
│  Input:                                                                     │
│  - arquivo: string (path no GitHub)                                         │
│  - conteudo: string (conteúdo completo do arquivo)                          │
│                                                                             │
│  Output:                                                                    │
│  - Resultado: {sucesso: bool, mensagem: string}                             │
│                                                                             │
│  Fluxo:                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1. Validar que arquivo NÃO existe                                  │    │
│  │     SE existe → ERRO "Arquivo já existe. Use editar() ou substituir()"   │
│  │                                                                     │    │
│  │  2. commit_msg = _gerar_commit("add", arquivo)                      │    │
│  │                                                                     │    │
│  │  3. github:create_or_update_file(                                   │    │
│  │        path=arquivo,                                                │    │
│  │        content=conteudo,                                            │    │
│  │        message=commit_msg                                           │    │
│  │     )  # SEM SHA                                                    │    │
│  │                                                                     │    │
│  │  4. RETURN {sucesso: true, mensagem: "Arquivo criado: {arquivo}"}   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  API: github:create_or_update_file (sem SHA)                                │
│  Commit: [CAMADA] add: {arquivo} - {contexto}                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Método: editar() - Patch por Âncora

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   editar(arquivo, ancora, operacao, conteudo)               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  QUANDO USAR: Modificar seção específica de arquivo existente               │
│                                                                             │
│  Input:                                                                     │
│  - arquivo: string (path no GitHub)                                         │
│  - ancora: string (padrão único - header, linha, regex)                     │
│  - operacao: SUBSTITUIR_SECAO | SUBSTITUIR_LINHA | INSERIR_APOS |           │
│              INSERIR_ANTES | DELETAR                                        │
│  - conteudo: string (novo conteúdo)                                         │
│                                                                             │
│  Output:                                                                    │
│  - Resultado: {sucesso: bool, mensagem: string}                             │
│                                                                             │
│  Fluxo:                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1. github:get_file_contents(arquivo) → {content, sha}              │    │
│  │                                                                     │    │
│  │  2. Validar âncora:                                                 │    │
│  │     - Contar ocorrências de ancora em content                       │    │
│  │     - SE 0 → ERRO "Âncora não encontrada: {ancora}"                 │    │
│  │     - SE > 1 → ERRO "Âncora ambígua: {ancora} ocorre {n} vezes"     │    │
│  │                                                                     │    │
│  │  3. Calcular escopo baseado em operacao:                            │    │
│  │     - SUBSTITUIR_SECAO: da âncora até próximo header mesmo nível    │    │
│  │     - SUBSTITUIR_LINHA: apenas a linha da âncora                    │    │
│  │     - INSERIR_APOS: posição logo após a âncora                      │    │
│  │     - INSERIR_ANTES: posição logo antes da âncora                   │    │
│  │     - DELETAR: remove o escopo da âncora                            │    │
│  │                                                                     │    │
│  │  4. Aplicar operação → novo_content                                 │    │
│  │     ════════════════════════════════════════════════════════════    │    │
│  │     ║ REGRA CRÍTICA: PRESERVAR CONTEÚDO ORIGINAL                ║    │    │
│  │     ║                                                           ║    │    │
│  │     ║ • O conteúdo FORA da âncora DEVE permanecer INTACTO       ║    │    │
│  │     ║ • Apenas a região delimitada pela âncora é modificada     ║    │    │
│  │     ║ • NÃO atualizar frontmatter, títulos ou outras seções     ║    │    │
│  │     ║ • Se precisar modificar múltiplas regiões → múltiplas     ║    │    │
│  │     ║   chamadas de editar()                                    ║    │    │
│  │     ║ • Se precisar modificar >30% do arquivo → usar            ║    │    │
│  │     ║   substituir() em vez de editar()                         ║    │    │
│  │     ════════════════════════════════════════════════════════════    │    │
│  │                                                                     │    │
│  │  5. commit_msg = _gerar_commit("patch", arquivo, ancora)            │    │
│  │                                                                     │    │
│  │  6. github:create_or_update_file(                                   │    │
│  │        path=arquivo,                                                │    │
│  │        content=novo_content,                                        │    │
│  │        sha=sha,                                                     │    │
│  │        message=commit_msg                                           │    │
│  │     )                                                               │    │
│  │                                                                     │    │
│  │  7. RETURN {sucesso: true, mensagem: "Editado: {ancora}"}           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         ANTI-PATTERNS                               │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  ✗ Reescrever arquivo inteiro quando operação é INSERIR_APOS       │    │
│  │  ✗ Atualizar versão no frontmatter durante edição por âncora       │    │
│  │  ✗ Modificar seções não relacionadas à âncora                      │    │
│  │  ✗ "Aproveitar" para fazer outras correções no arquivo             │    │
│  │  ✗ Reformatar ou reorganizar conteúdo existente                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  API: GET + manipulação CIRÚRGICA + PUT com SHA                             │
│  Commit: [CAMADA] patch: {operacao} em "{ancora}" - {contexto}              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Método: substituir()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       substituir(arquivo, conteudo)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  QUANDO USAR: Reescrever arquivo existente por completo                     │
│                                                                             │
│  Input:                                                                     │
│  - arquivo: string (path no GitHub)                                         │
│  - conteudo: string (conteúdo completo novo)                                │
│                                                                             │
│  Output:                                                                    │
│  - Resultado: {sucesso: bool, mensagem: string}                             │
│                                                                             │
│  Fluxo:                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1. github:get_file_contents(arquivo) → {sha}                       │    │
│  │     SE não existe → ERRO "Arquivo não existe. Use criar()"          │    │
│  │                                                                     │    │
│  │  2. commit_msg = _gerar_commit("update", arquivo)                   │    │
│  │                                                                     │    │
│  │  3. github:create_or_update_file(                                   │    │
│  │        path=arquivo,                                                │    │
│  │        content=conteudo,                                            │    │
│  │        sha=sha,                                                     │    │
│  │        message=commit_msg                                           │    │
│  │     )                                                               │    │
│  │                                                                     │    │
│  │  4. RETURN {sucesso: true, mensagem: "Substituído: {arquivo}"}      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  API: github:create_or_update_file (com SHA)                                │
│  Commit: [CAMADA] update: {arquivo} - {contexto}                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Método: mover()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         mover(origem, destino)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  QUANDO USAR: Relocar arquivo (tipicamente _drafts → docs)                  │
│                                                                             │
│  Input:                                                                     │
│  - origem: string (path atual)                                              │
│  - destino: string (path novo)                                              │
│                                                                             │
│  Fluxo:                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1. Ler conteúdo de origem                                          │    │
│  │  2. Criar em destino                                                │    │
│  │  3. Deletar origem                                                  │    │
│  │  4. Atualizar índices se necessário                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Commit: [CAMADA] promote: {origem} → {destino} - {contexto}                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.8 Métodos Internos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            MÉTODOS INTERNOS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  _inferir_camada(path) → Camada                                             │
│  ─────────────────────────────────                                          │
│  • genesis/*      → C1                                                      │
│  • docs/00_I/*    → C2                                                      │
│  • docs/00_E/*    → C3                                                      │
│  • docs/00_D/*    → C4                                                      │
│  • _sprints/*     → C2                                                      │
│  • _backlog/*     → C2                                                      │
│                                                                             │
│  _gerar_commit(tipo, arquivo, ancora?, contexto?) → string                  │
│  ─────────────────────────────────────────────────────────                  │
│  Input:                                                                     │
│  • tipo: "add" | "patch" | "update" | "promote" | "delete"                  │
│  • arquivo: path do arquivo                                                 │
│  • ancora: (opcional) âncora usada em editar()                              │
│  • contexto: (opcional) Sprint/Task                                         │
│                                                                             │
│  Output:                                                                    │
│  • "[CAMADA] tipo: descrição - contexto"                                    │
│                                                                             │
│  Exemplos:                                                                  │
│  • criar:      [C3] add: 00_E_Vendas.md - S012/T01                          │
│  • editar:     [C3] patch: SUBSTITUIR_SECAO em "## 3.2" - S011/T04          │
│  • substituir: [C1] update: GENESIS.md - S011/T05                           │
│  • mover:      [C3] promote: _drafts → docs - S011/T06                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Sistema de Edição por Âncora

### 5.1 Tipos de Âncora

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            TIPOS DE ÂNCORA                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  HEADER (Recomendado para seções)                                           │
│  ─────────────────────────────────                                          │
│  ancora: "## 3.2 Fronteiras"                                                │
│  escopo: Da linha da âncora até próximo header de mesmo nível ou superior   │
│  uso: Substituir seções inteiras                                            │
│                                                                             │
│  LINHA_EXATA (Para edições cirúrgicas)                                      │
│  ─────────────────────────────────────                                      │
│  ancora: "| 1.0 | 2025-12-02 | Criação |"                                   │
│  escopo: Apenas a linha que contém o padrão                                 │
│  uso: Atualizar linha específica em tabela                                  │
│                                                                             │
│  REGEX (Para padrões complexos) - uso avançado                              │
│  ─────────────────────────────────────────────                              │
│  ancora: "versao: \"\\d+\\.\\d+\""                                          │
│  escopo: Match do regex                                                     │
│  uso: Atualizar versões, datas dinâmicas                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Operações

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              OPERAÇÕES                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SUBSTITUIR_SECAO                                                           │
│  ────────────────                                                           │
│  • Âncora: Header (##, ###, etc.)                                           │
│  • Remove: Da âncora até próximo header mesmo nível                         │
│  • Insere: Conteúdo novo (DEVE incluir o header)                            │
│  • Exemplo: Reescrever seção "## 3.2 Fronteiras" inteira                    │
│                                                                             │
│  SUBSTITUIR_LINHA                                                           │
│  ────────────────                                                           │
│  • Âncora: Linha exata                                                      │
│  • Remove: Apenas a linha                                                   │
│  • Insere: Conteúdo novo (1 linha)                                          │
│  • Exemplo: Atualizar linha em tabela de histórico                          │
│                                                                             │
│  INSERIR_APOS                                                               │
│  ────────────                                                               │
│  • Âncora: Qualquer tipo                                                    │
│  • Mantém: Âncora intacta                                                   │
│  • Insere: Conteúdo após a âncora                                           │
│  • Exemplo: Adicionar entrada em tabela após header                         │
│                                                                             │
│  INSERIR_ANTES                                                              │
│  ─────────────                                                              │
│  • Âncora: Qualquer tipo                                                    │
│  • Mantém: Âncora intacta                                                   │
│  • Insere: Conteúdo antes da âncora                                         │
│  • Exemplo: Adicionar seção antes de outra                                  │
│                                                                             │
│  DELETAR                                                                    │
│  ───────                                                                    │
│  • Âncora: Header ou linha                                                  │
│  • Remove: Escopo da âncora                                                 │
│  • Exemplo: Remover seção obsoleta                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Tratamento de Erros

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TRATAMENTO DE ERROS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Erro                        │ Mensagem                    │ Ação          │
│  ────────────────────────────┼─────────────────────────────┼─────────────  │
│  Arquivo não existe          │ "Arquivo não encontrado"    │ Aborta        │
│  Âncora não encontrada       │ "Âncora não encontrada: X"  │ Aborta        │
│  Âncora duplicada            │ "Âncora ambígua: X ocorre   │ Aborta        │
│                              │  N vezes"                   │               │
│  SHA desatualizado           │ "Conflito: arquivo mudou"   │ Retry GET     │
│  Permissão negada            │ "Sem permissão para editar" │ Aborta        │
│                                                                             │
│  PRINCÍPIO: Falhar alto e explícito. NUNCA silencioso.                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Exemplo de Uso

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXEMPLO DE USO                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Caso: Atualizar seção "## 3.2 Fronteiras" na Epistemologia                 │
│                                                                             │
│  editar(                                                                    │
│    arquivo: "docs/00_E/00_E_Epistemologia.md",                              │
│    ancora: "## 3.2 Fronteiras",                                             │
│    operacao: SUBSTITUIR_SECAO,                                              │
│    conteudo: """                                                            │
│      ## 3.2 Fronteiras                                                      │
│                                                                             │
│      | É | Não É |                                                          │
│      |---|-------|                                                          │
│      | Método estruturado | Conteúdo de domínio |                           │
│      | Framework | Implementação |                                          │
│    """                                                                       │
│  )                                                                          │
│                                                                             │
│  Resultado:                                                                 │
│  {                                                                          │
│    sucesso: true,                                                           │
│    mensagem: "Editado: ## 3.2 Fronteiras"                                   │
│  }                                                                          │
│                                                                             │
│  Commit gerado:                                                             │
│  [C3] patch: SUBSTITUIR_SECAO em "## 3.2 Fronteiras" - S011/T04             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Integração com GENESIS e MongoDB

### 6.1 Fluxo de Persistência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO: GENESIS → GITHUB/MONGODB                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS.persistir(dado, tipo)                                              │
│  │                                                                          │
│  ├─ SE tipo == "definição" (.md)                                            │
│  │     └─ GitHub.persistir_md(arquivo, conteudo, instrucao?)                │
│  │           │                                                              │
│  │           ├─ arquivo não existe    → criar()                             │
│  │           ├─ instrucao == "editar" → editar() por âncora                 │
│  │           └─ instrucao == "subst"  → substituir() completo               │
│  │                                                                          │
│  └─ SE tipo == "transação"                                                  │
│        └─ MongoDB.persistir(collection, documento)                          │
│              │                                                              │
│              ├─ _id não existe → inserir()                                  │
│              └─ _id existe     → atualizar()                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Tabela de Decisão

| Operação | Destino | Método GitHub | Método MongoDB |
|----------|---------|---------------|----------------|
| Criar Meta Sistema | GitHub | criar() | - |
| Editar seção específica | GitHub | editar() | - |
| Reescrever documento | GitHub | substituir() | - |
| Buscar no catálogo | MongoDB | - | find() |
| Atualizar status sprint | MongoDB | - | atualizar() |
| Capturar item backlog | MongoDB | - | inserir() |

**Referência MongoDB:** `docs/00_I/00_I_1_3_MongoDB.md`

---

## 7. Autonomia Temporária

### 7.1 Contexto

Durante o desenvolvimento inicial do GENESIS (Sprints S001-S011), algumas restrições foram **temporariamente relaxadas** para acelerar iteração:

| Restrição Original | Status Atual | Razão |
|--------------------|--------------|-------|
| Branch obrigatório para mudanças | ⚠️ Suspenso | Iteração rápida em desenvolvimento |
| PR review antes de merge | ⚠️ Suspenso | Único desenvolvedor |
| Push direto em main proibido | ⚠️ Permitido | Desenvolvimento ativo |

### 7.2 Compromisso de Devolução

**Quando devolver:** Após sistema estável (estimativa: S015)

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

## 8. Referências

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
| 2.2 | 2025-12-08 | PERSISTÊNCIA HÍBRIDA: Remove sistema de patches v1. GitHub para definições. |
| 3.0 | 2025-12-08 | **REFATORAÇÃO COMPLETA**: Novo método orquestrador `persistir_md()`. Métodos `criar()`, `editar()` (patch por âncora), `substituir()`. Seção 5 Sistema de Edição por Âncora. Sprint S011/T04. |
| 3.1 | 2025-12-08 | **REGRA CRÍTICA**: Adiciona regra de preservação de conteúdo original e anti-patterns no método editar(). Sprint S011/T05. |

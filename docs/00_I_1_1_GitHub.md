---
nome: 00_I_1_1_GitHub
versao: "2.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Publicado
---

# GitHub v2.0

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Violação SSOT | 2 documentos tratam de "como persistir" |
| Ambiguidade | Onde buscar informação? Github_Instructions ou Patch_System? |

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **GitHub** | Infraestrutura de versionamento e persistência |
| **persistir** | Transformar conhecimento em arquivo versionado |
| **patch** | Método de edição parcial de arquivo |
| **criar** | Novo arquivo que não existia |
| **editar** | Modificar arquivo existente (patch ou substituição) |
| **commit** | Unidade atômica de mudança no Git |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Patch_System criado como documento separado | Duplicação de informação |
| Patch é MÉTODO de GitHub, não entidade | Violação de modelagem |

### 1.4 Necessidade

| Necessidade | Solução |
|-------------|---------|
| Consolidar em documento único | GitHub.md absorve Patch_System |
| Definir COMO persistir | criar, editar, mover, commitar |
| Separar concerns | GitHub (COMO) ≠ Documento (O QUE) |

---

## 2. Marco Teórico (M1)

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Atomic Commits** | Git Best Practices | 1 commit = 1 mudança lógica |
| **SSOT** | Information Architecture | 1 lugar para cada verdade |
| **Token Efficiency** | LLM Context Limits | NÃO duplicar chat + GitHub |
| **SemVer** | Semantic Versioning | MAJOR.MINOR.PATCH |

---

## 3. Objeto (M2)

### 3.1 Definição do Objeto

| Campo | Valor |
|-------|-------|
| **nome** | GitHub |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Definir COMO persistir conhecimento: criar, editar, mover, commitar |
| **camada** | C2 (Infraestrutura) |

### 3.2 Escopo

| Inclui | Descrição |
|--------|-----------|
| Identity | username, repos, branches |
| Permissions | allowed, restricted, forbidden |
| Conventions | commits, branches, versionamento |
| Structure | dirs, naming |
| Workflows | criar, editar, mover, commitar |
| Edição: Patch | Método de edição parcial |
| Edição: Substituição | Método de edição completa |
| Token Efficiency | Regras de economia |
| Implementação Patch | PATCH.md, GitHub Action, script Python |

### 3.3 Fronteiras

| Não Cobre | Referência |
|-----------|------------|
| O QUE documentar | 00_E_1_6_Documento.md |
| COMO selecionar diagrama | 00_E_1_4_1_Diagrama.md |
| Conteúdo dos domínios | Camada 4 |

### 3.4 Diagrama de Escopo

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
│   │ Diagrama.md       │               │  ├─ allowed                     │   │
│   │ (COMO visualizar) │               │  ├─ restricted                  │   │
│   └───────────────────┘               │  └─ forbidden                   │   │
│                                       │                                 │   │
│                                       │  Conventions                    │   │
│                                       │  ├─ commits: [CAMADA] tipo: desc│   │
│                                       │  ├─ branches: tipo/descricao    │   │
│                                       │  └─ versionamento: SemVer       │   │
│                                       │                                 │   │
│                                       │  Structure                      │   │
│                                       │  ├─ docs/ (publicado)           │   │
│                                       │  ├─ _drafts/ (M0-M3)            │   │
│                                       │  ├─ _patches/ (sistema)         │   │
│                                       │  └─ naming: NN_X_N_N_Nome.md    │   │
│                                       │                                 │   │
│                                       │  Workflows                      │   │
│                                       │  ├─ criar                       │   │
│                                       │  ├─ editar (patch/substituição) │   │
│                                       │  ├─ mover                       │   │
│                                       │  └─ commitar                    │   │
│                                       │                                 │   │
│                                       │  Token Efficiency               │   │
│                                       │  └─ NÃO duplicar chat + GitHub  │   │
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
│  - Push direto em main permitido (sem branch obrigatório)                   │
│  - Deletar arquivos em docs/ requer confirmação explícita                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(path, content): Arquivo                                            │
│  + editar(path, content, metodo): Arquivo                                   │
│  + mover(origem, destino): Arquivo                                          │
│  + commitar(message): Commit                                                │
│  + aplicar_patch(patch_file): Arquivo                                       │
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
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONVENTIONS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  - commit_format: string = "[CAMADA] tipo: descrição"                       │
│  - camadas: Map = {C0: Axiomas, C1: Stub, C2: Infra, C3: Framework,         │
│                    C4: Domínios}                                            │
│  - tipos: string[] = [add, update, fix, cleanup]                            │
│  - branch_format: string = "tipo/descricao-curta"                           │
│  - versioning: string = "SemVer"                                            │
│  - idioma: string = "português"                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                               STRUCTURE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  - dirs: Dir[] = [                                                          │
│      {path: "docs/", purpose: "publicados", status: "Publicado"},           │
│      {path: "_drafts/", purpose: "M0-M3", status: "Draft"},                 │
│      {path: "_patches/", purpose: "patches", status: "Sistema"},            │
│      {path: "_sprints/", purpose: "controle sprints", status: "Sistema"},   │
│      {path: "_inbox/", purpose: "triagem", status: "Triagem"}               │
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
│  - preferencia_edicao: string = "patch > substituição"                      │
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

#### editar(path, content, metodo): Arquivo

| Campo | Valor |
|-------|-------|
| **Descrição** | Modifica arquivo existente |
| **Input** | path: string, content: string, metodo: enum [patch, substituicao] |
| **Output** | Arquivo atualizado |
| **Decisão** | patch se edição parcial; substituição se reescrita completa |

```
┌─────────────────────────────────────────────────────────────────┐
│                         editar()                                │
├─────────────────────────────────────────────────────────────────┤
│  SE metodo == patch:                                            │
│     1. Criar arquivo em _patches/NNN_descricao.md               │
│     2. GitHub Action aplica automaticamente                     │
│  SE metodo == substituicao:                                     │
│     1. Obter SHA do arquivo atual                               │
│     2. github:create_or_update_file com SHA                     │
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
│  ├─ C1: Stub/GENESIS                                            │
│  ├─ C2: Infraestrutura                                          │
│  ├─ C3: Framework/Epistemologia                                 │
│  └─ C4: Domínios                                                │
│                                                                 │
│  Tipos:                                                         │
│  ├─ add: novo arquivo                                           │
│  ├─ update: atualização                                         │
│  ├─ fix: correção                                               │
│  └─ cleanup: limpeza                                            │
│                                                                 │
│  Exemplo: [C3] add: M0 Problema para Objeto v2                  │
└─────────────────────────────────────────────────────────────────┘
```

#### aplicar_patch(patch_file): Arquivo

| Campo | Valor |
|-------|-------|
| **Descrição** | Aplica edições parciais via sistema de patches |
| **Input** | patch_file: string |
| **Output** | Arquivo(s) atualizado(s) |
| **Executor** | GitHub Action (automático) |

```
┌─────────────────────────────────────────────────────────────────┐
│                      aplicar_patch()                            │
├─────────────────────────────────────────────────────────────────┤
│  Estrutura do PATCH.md:                                         │
│  ---                                                            │
│  target: genesis/GENESIS.md                                     │
│  version_from: "0.1"                                            │
│  version_to: "0.2"                                              │
│  commit_message: "[C2] update: descrição"                       │
│  ---                                                            │
│                                                                 │
│  ## EDITS                                                       │
│                                                                 │
│  ### EDIT 1                                                     │
│  FIND:                                                          │
│  ```                                                            │
│  texto original                                                 │
│  ```                                                            │
│  REPLACE:                                                       │
│  ```                                                            │
│  texto novo                                                     │
│  ```                                                            │
│                                                                 │
│  ### EDIT 2                                                     │
│  APPEND_AFTER:                                                  │
│  ```                                                            │
│  linha existente                                                │
│  ```                                                            │
│  ADD:                                                           │
│  ```                                                            │
│  nova linha                                                     │
│  ```                                                            │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4 Implementação Patch: GitHub Action

```yaml
# .github/workflows/apply-patch.yml
name: Apply Patch

on:
  push:
    paths:
      - '_patches/*.md'

jobs:
  apply-patch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Get new patch files
        id: patches
        run: |
          echo "files=$(git diff --name-only HEAD~1 HEAD | grep '_patches/.*\.md$' | tr '\n' ' ')" >> $GITHUB_OUTPUT
      
      - name: Apply patches
        run: |
          for patch_file in ${{ steps.patches.outputs.files }}; do
            python3 .github/scripts/apply_patch.py "$patch_file"
          done
      
      - name: Commit changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add .
          git commit -m "Auto-apply patches" || echo "No changes"
          git push
```

### 4.5 Implementação Patch: Script Python

```python
#!/usr/bin/env python3
# .github/scripts/apply_patch.py
import sys
import re
import yaml

def parse_patch(patch_content):
    parts = patch_content.split('---')
    frontmatter = yaml.safe_load(parts[1])
    body = '---'.join(parts[2:])
    
    edits = []
    
    find_replace = re.findall(
        r'FIND:\s*```\n(.*?)\n```\s*REPLACE:\s*```\n(.*?)\n```',
        body, re.DOTALL
    )
    for find, replace in find_replace:
        edits.append(('replace', find.strip(), replace.strip()))
    
    append_after = re.findall(
        r'APPEND_AFTER:\s*```\n(.*?)\n```\s*ADD:\s*```\n(.*?)\n```',
        body, re.DOTALL
    )
    for after, add in append_after:
        edits.append(('append', after.strip(), add.strip()))
    
    return frontmatter, edits

def apply_edits(content, edits):
    for edit_type, pattern, replacement in edits:
        if edit_type == 'replace':
            content = content.replace(pattern, replacement)
        elif edit_type == 'append':
            content = content.replace(pattern, pattern + '\n' + replacement)
    return content

def main():
    patch_file = sys.argv[1]
    
    with open(patch_file, 'r') as f:
        patch_content = f.read()
    
    frontmatter, edits = parse_patch(patch_content)
    target = frontmatter['target']
    
    with open(target, 'r') as f:
        content = f.read()
    
    new_content = apply_edits(content, edits)
    
    with open(target, 'w') as f:
        f.write(new_content)
    
    print(f"Applied {len(edits)} edits to {target}")

if __name__ == '__main__':
    main()
```

---

## 5. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_6_Documento | Define O QUE persistir (cita este documento) |
| 00_E_1_4_1_Diagrama | COMO selecionar diagramas |
| GENESIS.md | Índice de arquivos |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-02 | - | Criação como Github_Instructions |
| 1.1 | 2025-12-02 | - | Adiciona token_efficiency |
| 1.2 | 2025-12-03 | 19:55 | Refatora token_efficiency, convenções [CAMADA] |
| 2.0 | 2025-12-04 | 12:20 | **CONSOLIDAÇÃO**: Absorve Patch_System. Reestrutura como Classe M0-M3. Deprecia Github_Instructions e Patch_System. |

---
nome: 00_I_1_1_Github_Instructions
versao: "1.0"
tipo: Instrucao
classe_ref: Documento
origem: interno
status: Draft
---

# 00_I_1_1_Github_Instructions

## 1. Definição

Instruções para Claude acessar e operar no repositório GitHub da ZAZ.

Este documento serve como contexto para projetos que precisam dar commit, criar branches e gerenciar arquivos no repositório conhecimento-zaz.

---

## 2. Diagrama

```
┌─────────────────────────────────────────────────────────────┐
│                  GITHUB INSTRUCTIONS                        │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    identity                         │   │
│   │   username | repos | branches                       │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   permissions                       │   │
│   │   allowed | restricted | forbidden                  │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   conventions                       │   │
│   │   commits | branches | versionamento                │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    structure                        │   │
│   │   docs/ | _drafts/ | _inbox/                        │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    workflows                        │   │
│   │   novo_documento | atualizacao | diff_strategy      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Seções Operacionais

<!-- section:identity -->
github:
  username: leonardokasat-cientistavenda
  repos:
    - name: conhecimento-zaz
      description: Sistema de conhecimento metodológico
      role: principal
      default_branch: main
<!-- /section:identity -->

<!-- section:permissions -->
permissions:
  allowed:
    - create_file
    - update_file
    - create_branch
    - create_pull_request
    - list_contents
    - list_commits
  restricted:
    - delete_file: requer confirmação explícita
    - merge_pull_request: requer confirmação explícita
  forbidden:
    - push direto em main sem branch
    - deletar arquivos em docs/
<!-- /section:permissions -->

<!-- section:conventions -->
conventions:
  commit_messages:
    format: "tipo: descrição"
    tipos:
      - feat: nova funcionalidade
      - fix: correção
      - docs: documentação
      - refactor: refatoração
    idioma: português
    exemplo: "docs: adiciona framework de vendas consultivas"
  branches:
    format: "tipo/descricao-curta"
    exemplo: "docs/framework-vendas"
  versionamento: SemVer (MAJOR.MINOR.PATCH)
<!-- /section:conventions -->

<!-- section:structure -->
structure:
  dirs:
    - path: docs/
      purpose: documentos publicados
      status: Publicado
    - path: _drafts/
      purpose: documentos em elaboração
      status: Draft
    - path: _inbox/
      purpose: entradas não processadas
      status: Triagem
    - path: .github/
      purpose: configurações do repositório
      status: Sistema
  naming:
    pattern: "NN_X_N_N_Nome.md"
    exemplo: "00_E_1_4_Documento.md"
<!-- /section:structure -->

<!-- section:workflows -->
workflows:
  novo_documento:
    1: criar arquivo em _inbox/
    2: processar e mover para _drafts/
    3: revisar e atualizar status
    4: mover para docs/ quando Publicado
  atualizacao:
    1: criar branch tipo/descricao
    2: aplicar diff via str_replace
    3: atualizar versao no frontmatter
    4: commit com mensagem padrão
    5: criar pull request (se necessário)
  diff_strategy:
    metodo: str_replace por seção
    marcador: "<!-- section:X -->...<!-- /section:X -->"
    beneficio: economia de tokens
<!-- /section:workflows -->

---

## 4. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_4_Documento | Define estrutura |
| 01_1_Estrutura_Markdown_Outline | Padrões de formatação |
| CLAUDE.md | Instruções gerais do repo |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-02 | Criação |

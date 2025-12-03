---
nome: 00_I_1_1_Github_Instructions
versao: "1.2"
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
    format: "[CAMADA] tipo: descrição"
    camadas:
      - C0: Axiomas
      - C1: Stub/GENESIS
      - C2: Infraestrutura
      - C3: Framework/Epistemologia
      - C4: Domínios
    tipos:
      - add: novo arquivo
      - update: atualização
      - fix: correção
      - cleanup: limpeza
    idioma: português
    exemplo: "[C3] add: M0 Problema para Objeto v2"
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
      purpose: documentos em elaboração (M0-M3)
      status: Draft
    - path: _inbox/
      purpose: entradas não processadas
      status: Triagem
    - path: _patches/
      purpose: patches para edição automática
      status: Sistema
    - path: _sprints/
      purpose: controle de sprints
      status: Sistema
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

<!-- section:token_efficiency -->
token_efficiency:
  regra_principal: NÃO duplicar conteúdo (chat + GitHub)
  
  criacao_arquivo:
    1: Criar arquivo DIRETO no GitHub (sem preview no chat)
    2: Informar apenas: "Arquivo criado: [path] - [resumo 1 linha]"
    3: Usuário valida pelo link do GitHub
    4: Se erro, corrigir via patch
  
  edicao_arquivo:
    pequena: github:create_or_update_file com SHA (substituição completa)
    grande: criar patch em _patches/ conforme 00_O_1_2_6_Patch_System.md
    preferencia: patch é mais performático para edições parciais
  
  validacao:
    1: NÃO exibir documento completo no chat
    2: Confirmar estrutura/seções antes de criar
    3: Exemplo: "Vou criar M0 com: problema X, diagramas Y. Confirma?"
    4: Após confirmação, commit direto
  
  anti_patterns:
    - Mostrar conteúdo no chat E depois subir no GitHub (duplicação)
    - Preview completo antes de commit
    - Exibir arquivo inteiro para pequenas edições
<!-- /section:token_efficiency -->

---

## 4. Referências

| Documento | Relação |
|-----------|---------|
| GENESIS.md | Pai (Camada 2) |
| 00_E_1_6_Documento | Define estrutura de documentos |
| 00_O_1_2_6_Patch_System | Sistema de patches |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-02 | - | Criação |
| 1.1 | 2025-12-02 | - | Adiciona estratégia de economia de tokens |
| 1.2 | 2025-12-03 | 19:55 | Refatora token_efficiency: regra de criação direta no GitHub, anti-patterns, preferência por patch. Atualiza conventions com padrão [CAMADA]. |

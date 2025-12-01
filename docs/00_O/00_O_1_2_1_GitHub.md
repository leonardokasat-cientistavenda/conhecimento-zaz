---
nome: "00_O_1_2_1_GitHub"
versao: "1.1"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
---

# 00_O_1_2_1_GitHub

**Versão:** 1.1
**Tipo:** Framework
**Classe_ref:** Framework
**Origem:** interno
**Status:** Draft

---

## 1. Definição

GitHub é a classe que define estrutura de repositório, convenções de commit e fluxo de trabalho para documentação.

Primeiro componente do Pipeline de Documentação.

---

## 2. Estrutura de Pastas
```
/repo
│
├── _drafts/                    ◄── trabalho em progresso (M1-M4)
│   └── 00_O_1_2_3_Outline.md
│
├── docs/                       ◄── publicado (pós-M5)
│   ├── 00_E/                   ◄── Epistemologia
│   ├── 00_O/                   ◄── Ontologia
│   └── 01/                     ◄── Domínios
│
├── .github/workflows/          ◄── automações
│   ├── sync-outline.yml
│   └── validar.yml
│
├── CLAUDE.md                   ◄── instruções para Claude Code
└── README.md
```

---

## 3. Ciclo de Vida do Documento
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   M1 ──► cria _drafts/objeto.md                                 │
│          │ commit: "M1: Define objeto X"                        │
│          ▼                                                      │
│   M2 ──► atualiza _drafts/objeto.md                             │
│          │ commit: "M2: Marco teórico de X"                     │
│          ▼                                                      │
│   M3 ──► atualiza _drafts/objeto.md                             │
│          │ commit: "M3: Classes de X"                           │
│          ▼                                                      │
│   M4 ──► atualiza _drafts/objeto.md                             │
│          │ commit: "M4: Métodos de X"                           │
│          ▼                                                      │
│   M5 ──► move _drafts/ → docs/                                  │
│          │ commit: "M5: Publica X"                              │
│          ▼                                                      │
│   Sync → GitHub Action sincroniza com Outline                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Convenção de Commits

| Etapa | Padrão | Exemplo |
|-------|--------|---------|
| M1 | `M1: Define [objeto]` | M1: Define Outline |
| M2 | `M2: Marco teórico de [objeto]` | M2: Marco teórico de Outline |
| M3 | `M3: Classes de [objeto]` | M3: Classes de Outline |
| M4 | `M4: Métodos de [objeto]` | M4: Métodos de Outline |
| M5 | `M5: Publica [objeto]` | M5: Publica Outline |
| Fix | `fix: [descrição]` | fix: Corrige link quebrado |
| Refine | `refine(M1): [descrição]` | refine(M1): Expande escopo |

---

## 5. Claude Code (Edição Local)

### 5.1 Visão Geral

Claude Code é a ferramenta de linha de comando para edição local com publicação automática.
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  CLAUDE.AI (Web)              CLAUDE CODE (Terminal)            │
│  ┌─────────────────┐          ┌─────────────────────┐           │
│  │ M1-M4: Pensar   │          │ M5: Executar        │           │
│  │ M5: Gerar .md   │ ──────►  │ Criar arquivo       │           │
│  │                 │  (cola)  │ git diff            │           │
│  └─────────────────┘          │ commit + push       │           │
│                               └─────────────────────┘           │
│                                         │                       │
│                                         ▼                       │
│                               GitHub Actions → Outline          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Instalação
```bash
# Instalar Node.js (Mac)
curl -o node-installer.pkg "https://nodejs.org/dist/v20.11.0/node-v20.11.0.pkg"
open node-installer.pkg

# Instalar Claude Code
sudo npm install -g @anthropic-ai/claude-code

# Instalar GitHub CLI
brew install gh
gh auth login

# Clonar repositório
git clone https://github.com/[org]/[repo].git
cd [repo]

# Iniciar Claude Code
claude
```

### 5.3 Comandos Típicos

| Ação | Comando no Claude Code |
|------|------------------------|
| Listar arquivos | `Liste os arquivos em docs/00_O/` |
| Criar arquivo | `Crie o arquivo docs/00_O/Nome.md com este conteúdo: [cola]` |
| Editar arquivo | `Adicione seção X ao arquivo Y` |
| Ver alterações | `Mostre o git diff` |
| Publicar | `Commit com mensagem "M5: Publica X" e push` |

### 5.4 Fluxo Completo
```bash
# 1. No Claude.ai: gerar documento (M1-M5)
# 2. Copiar conteúdo .md

# 3. No Claude Code:
> Crie o arquivo docs/00_O/00_O_1_2_5_Novo.md com este conteúdo:
> [cola o conteúdo]

> Mostre o git diff

> Commit com mensagem "M5: Publica Novo" e push

# 4. GitHub Actions executa automaticamente
# 5. Documento aparece no Outline
```

---

## 6. Resolução de Links

Links internos são resolvidos durante o sync.

### 6.1 Transformação
```
Antes (Git):
[Classe](../00_E/00_E_1_1_Classe.md)

Depois (Outline):
[Classe](https://wiki.zaz.vc/doc/[uuid])
```

---

## 7. Rollback

### 7.1 Via GitHub (Web)
```
Repositório → Commits → History
    → Encontrar commit anterior
    → Click no commit → Browse files
    → Copiar conteúdo → Colar na versão atual
```

### 7.2 Via Claude Code
```bash
> Mostre os últimos 5 commits

> Faça checkout do arquivo X no commit [hash]

> Commit com mensagem "fix: rollback de X" e push
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_2_GitHub_Actions | Irmão (validação/sync) |
| 00_O_1_2_3_Outline | Irmão (publicação) |
| 00_O_1_2_4_Claude_Code | Filho (ferramenta) |
| 00_O_1_2_5_Cloudflare | Irmão (segurança) |
| 00_E_1_4_Documento | Define estrutura dos arquivos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação; Estrutura _drafts/docs; Convenção commits |
| 1.1 | 2025-12-01 | Adiciona seção Claude Code; Rollback; Atualiza referências |

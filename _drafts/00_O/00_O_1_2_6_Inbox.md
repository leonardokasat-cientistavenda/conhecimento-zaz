---
nome: "00_O_1_2_6_Inbox"
versao: "0.1"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft

inbox:
  acao: criar
  destino: _drafts/00_O/
  commit_msg: "M1: Define Inbox"
  etapa: M1
---

# 00_O_1_2_6_Inbox

**Versão:** 0.1
**Tipo:** Classe
**Classe_ref:** Classe
**Origem:** interno
**Status:** Draft
**Etapa:** M1

---

## 1. Definição

Inbox é o mecanismo de entrada e processamento automático de documentos gerados no Claude.ai para publicação no repositório Git via Claude Code.

---

## 2. Problema que resolve

Eliminar etapas manuais entre gerar conteúdo (Claude.ai) e publicar (Git → Outline), mantendo rastreabilidade do processo M1-M5.

---

## 3. Escopo

| Inclui | Não inclui |
|--------|------------|
| Arquivos .md | Outros formatos |
| Criação de documentos novos | Lógica de negócio |
| Atualização de documentos existentes | Decisões conceituais |
| Instruções de edição (str_replace) | Execução de M1-M4 (só M5) |
| Transição _drafts → docs | Contexto do projeto |

---

## 4. Atores

| Ator | Responsabilidade |
|------|------------------|
| Claude.ai | Gera arquivo .md com instruções no frontmatter |
| Usuário | Baixa arquivo e coloca em `_inbox/` |
| Claude Code | Lê, processa, commit, push |
| GitHub Actions | Valida e sincroniza com Outline |

---

## 5. Diagrama
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  CLAUDE.AI (Cérebro)                                            │
│       │                                                         │
│       │ gera .md com instruções                                 │
│       ▼                                                         │
│  _inbox/                                                        │
│  ├── _drafts/           ◄── M1-M4                               │
│  ├── docs/              ◄── M5                                  │
│  └── _instructions/     ◄── edições                             │
│       │                                                         │
│       │ Claude Code processa                                    │
│       ▼                                                         │
│  Repositório                                                    │
│  ├── _drafts/           ◄── trabalho em progresso               │
│  └── docs/              ◄── publicado                           │
│       │                                                         │
│       │ git push                                                │
│       ▼                                                         │
│  GitHub Actions → Outline                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Frontmatter (instruções para Claude Code)
```yaml
---
nome: "00_X_Nome"
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft

inbox:
  acao: criar | atualizar | mover
  destino: docs/00_X/
  commit_msg: "M5: Publica Nome"
  etapa: M1 | M2 | M3 | M4 | M5
---
```

---

## 7. Princípio de separação

| Claude.ai | Claude Code |
|-----------|-------------|
| Cérebro (contexto completo) | Executor (contexto mínimo) |
| Pensa, decide, gera | Lê instruções, executa |
| M1-M5 conceitual | M5 operacional |

---

## 8. Dívida Técnica (M1)

| Item | Descrição | Status |
|------|-----------|--------|
| DT-001 | Regra: jamais avançar para M2 sem draft de M1 publicado | ⬜ Documentar em 00_O_1_1_Metodo |
| DT-002 | Definir regras para Claude Code publicar artefatos em _drafts | ⬜ Implementar |

---

## 9. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Avô |
| 00_O_1_2_4_Claude_Code | Pai |
| 00_O_1_1_Metodo_Epistemologico | Define M1-M5 |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-01 | M1: Definição inicial; Escopo; Atores; Diagrama |

# Prompt para Sprint S007: Processo de Sprint

## CONTEXTO

IMPORTANTE: Todos os arquivos estão no GitHub, NÃO no Google Drive.
Usar ferramenta github:get_file_contents para leitura.

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Arquivo raiz: /genesis/GENESIS.md

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## SPRINT ATUAL: S007

**Objetivo:** Formalizar processo de sprint/backlog e restaurar governança GitHub

**Arquivo da Sprint:** /_sprints/S007_Processo_Sprint.md

---

## TASKS DA SPRINT

| # | Task | Descrição | Status |
|---|------|-----------|--------|
| T01 | Documentar ciclo | Criar `docs/00_I/00_I_2_Processo_Sprint.md` | ⬜ |
| T02 | Template sprint | Criar `_templates/SPRINT_TEMPLATE.md` | ⬜ |
| T03 | Atualizar Project Instructions | Melhorar prompt inicial do Project | ⬜ |
| T04 | Indexar no Catálogo | Adicionar processo no `_catalogo/indice.yaml` | ⬜ |
| T05 | Restaurar GitHub | Branch obrigatório, PR review | ⬜ |
| T06 | Testar fluxo | Simular início de sprint em chat limpo | ⬜ |

---

## ENTREGÁVEIS ESPERADOS

| Arquivo | Descrição |
|---------|-----------|
| `docs/00_I/00_I_2_Processo_Sprint.md` | Documento M0-M4 do ciclo de sprint |
| `_templates/SPRINT_TEMPLATE.md` | Template padronizado para novas sprints |
| `prompt_S007.md` (atualizado) | Project instructions melhoradas |
| `_catalogo/indice.yaml` | Item `infra_processo_sprint` adicionado |
| `docs/00_I_1_1_GitHub.md` | Modos produção/desenvolvimento documentados |

---

## REGRAS DE OPERAÇÃO

### Regra de Carregamento
Antes de qualquer resposta:
1. Ler github:get_file_contents(path="genesis/GENESIS.md")
2. Ler github:get_file_contents(path="_sprints/S007_Processo_Sprint.md")
3. Identificar task atual

### Regra de Criação de Arquivos
Antes de criar/editar, ler:
- /docs/00_I_1_1_GitHub.md (regras GitHub + token efficiency)
- /docs/00_E/00_E_1_6_Documento.md (estrutura pastas + ciclo M0-M4)

Resumo:
1. Criar arquivos DIRETO no GitHub (sem preview no chat)
2. Informar apenas: "Arquivo criado: [path] - [resumo]"
3. Estrutura drafts: _drafts/S007/TXX/MX_Nome.md

### Convenção de Commit
Padrão: [CAMADA] ação: descrição - Sprint/Task

Exemplo: [C2] add: Processo Sprint v1.0 - S007/T01

---

## REFERÊNCIAS IMPORTANTES

| Arquivo | Conteúdo |
|---------|----------|
| /genesis/GENESIS.md | Orquestrador v1.4 |
| /_sprints/S007_Processo_Sprint.md | Sprint completa com detalhamento |
| /_sprints/S006-C_Catalogo_MVP.md | Sprint anterior (referência de formato) |
| /_backlog/BACKLOG.md | Backlog v1.3 |
| /docs/00_I_1_1_GitHub.md | Instruções GitHub |
| /_catalogo/indice.yaml | Catálogo para indexar |

---

## DECISÕES A TOMAR DURANTE SPRINT

| Decisão | Opções | Critério |
|---------|--------|----------|
| Onde colocar templates? | `_templates/` ou `docs/00_I/` | Uso frequente vs. documentação |
| Branch protection real? | GitHub settings ou convenção | Controle técnico vs. disciplina |
| Quantas sprints paralelas? | 1 ativa ou múltiplas | Foco vs. flexibilidade |

---

## SEQUÊNCIA DE SPRINTS

```
S006-C (concluída) → S007 (atual) → S008-? (próximo do backlog)
        ✅              🔄               Backlog
```

---

## COMO ACESSAR ARQUIVOS

Parâmetros fixos:
- owner: "leonardokasat-cientistavenda"
- repo: "conhecimento-zaz"
- branch: "main"

Listar pasta:
github:get_file_contents(path="docs")

Ler arquivo:
github:get_file_contents(path="genesis/GENESIS.md")

Criar/atualizar arquivo:
github:create_or_update_file(path="...", content="...", message="...")

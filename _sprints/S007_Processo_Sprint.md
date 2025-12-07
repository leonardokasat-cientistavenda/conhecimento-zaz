# Sprint S007: Processo de Sprint

## CONTEXTO

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Arquivo raiz: /genesis/GENESIS.md
Branch: main

IMPORTANTE: Todos os arquivos estão no GitHub, NÃO no Google Drive.
Usar ferramenta github:get_file_contents para leitura.

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## SPRINT ATUAL: S007

**Objetivo:** Formalizar processo de sprint/backlog e restaurar governança GitHub

**Prioridade:** 🟡 Média (necessário para sustentabilidade)

**Por quê:** 
- Processo evoluiu organicamente, precisa ser documentado
- Autonomia GitHub foi "emprestada" para desenvolvimento rápido
- Contexto se perde entre sessões/chats

**Escopo:** 
- Documentar ciclo completo de sprint
- Criar infraestrutura para recuperação de contexto
- Restaurar restrições GitHub (branch obrigatório, PR)

---

## PROBLEMA (M0)

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Sprint** | Ciclo de trabalho focado em objetivo específico |
| **Backlog** | Fila de itens aguardando promoção para sprint |
| **Promover** | Mover item do backlog para sprint ativa |
| **Arquivar** | Marcar sprint como concluída, manter histórico |
| **Project Instructions** | Prompt inicial do Claude Project para carregar contexto |
| **Recuperação de Contexto** | Processo de LLM retomar trabalho em nova sessão |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| Processo de sprint não documentado | Evoluiu organicamente | Formalizar ciclo em documento |
| Contexto perdido entre sessões | Sem instruções de recuperação | Project instructions + prompt de sprint |
| Autonomia GitHub "emprestada" | Regras flexibilizadas para velocidade | Restaurar branch + PR |
| Novo chat = recomeço | LLM não sabe estado da sprint | Checklist de inicialização |

### M0.3 Origem

- **Backlog:** `_backlog/BACKLOG.md` - Item #3
- **Aprendizado:** Sprints S003 até S006 operaram sem processo formal
- **Insight:** Precisamos de documentação que permita qualquer sessão LLM continuar

---

## TASKS

| # | Task | Descrição | Entregável | Status |
|---|------|-----------|------------|--------|
| T01 | Documentar ciclo | Criar `docs/00_I/00_I_2_Processo_Sprint.md` | Doc com M0-M4 | ⬜ |
| T02 | Template sprint | Criar `_templates/SPRINT_TEMPLATE.md` | Template padronizado | ⬜ |
| T03 | Atualizar Project Instructions | Melhorar prompt inicial do Project | `prompt_S007.md` | ⬜ |
| T04 | Indexar no Catálogo | Adicionar processo no `_catalogo/indice.yaml` | Item indexado | ⬜ |
| T05 | Restaurar GitHub | Branch obrigatório, PR review | Regras atualizadas | ⬜ |
| T06 | Testar fluxo | Simular início de sprint em chat limpo | Validação funcional | ⬜ |

---

## DETALHAMENTO DAS TASKS

### T01: Documentar Ciclo de Sprint

Criar documento seguindo M0-M4 com:

```
1. Problema (M0)
   - Glossário: Sprint, Backlog, Promover, Arquivar, etc.
   - Por que processo formal é necessário

2. Marco Teórico (M1)
   - Scrum/Kanban adaptado para LLM
   - Gestão de contexto em sessões curtas

3. Objeto (M2)
   - O que é/não é uma Sprint GENESIS
   - Fronteiras com outros processos

4. Classe (M3)
   - Estados: Backlog → Ativa → Concluída
   - Transições: promover(), executar(), arquivar()
   - Artefatos: _sprints/S00X.md, _backlog/BACKLOG.md

5. Documento (M4)
   - Fluxograma visual do ciclo
   - Checklist de inicialização
   - Checklist de conclusão
```

### T02: Template de Sprint

```markdown
# Sprint S00X: [Nome]

## CONTEXTO
[Bloco padrão com repo, branch, instruções]

## STATUS: [⬜ Aguardando | 🔄 Em Progresso | ✅ Concluída]

## PROBLEMA (M0)
### Glossário
### Problema
### Origem

## TASKS
| # | Task | Descrição | Status |

## CRITÉRIOS DE CONCLUSÃO

## HISTÓRICO
```

### T03: Project Instructions

Atualizar `prompt_S007.md` para incluir:

```markdown
## REGRA DE INICIALIZAÇÃO DE SPRINT

Ao iniciar nova sessão sobre sprint:

1. Ler sprint ativa:
   github:get_file_contents(path="_sprints/S00X_Nome.md")

2. Identificar tasks pendentes (Status = ⬜)

3. Perguntar ao usuário:
   "Sprint S00X tem N tasks pendentes: [lista]. 
    Qual task deseja executar?"

4. Carregar dependências da task selecionada
```

### T04: Indexar no Catálogo

Adicionar em `_catalogo/indice.yaml`:

```yaml
- id: "infra_processo_sprint"
  tipo: Infraestrutura
  nome: "Processo de Sprint"
  chave: "gerenciar sprint backlog promover arquivar ciclo trabalho"
  arquivo: "docs/00_I/00_I_2_Processo_Sprint.md"
  triggers:
    - "como funciona sprint"
    - "criar nova sprint"
    - "promover do backlog"
    - "arquivar sprint"
  metadata:
    versao: "1.0"
    camada: C2
    status: Publicado
```

### T05: Restaurar Governança GitHub

Atualizar `docs/00_I_1_1_GitHub.md`:

```markdown
## Modo Produção (padrão)

- Branch obrigatório para mudanças
- PR com descrição clara
- Review antes de merge
- Commit message com convenção

## Modo Desenvolvimento (temporário)

- Push direto em main permitido
- Apenas durante sprints de infraestrutura
- Requer aprovação explícita do usuário
- Registrar em histórico da sprint
```

### T06: Testar Fluxo

**Cenário:** Novo chat, usuário diz "continuar sprint S007"

**Esperado:**
1. LLM lê `_sprints/S007_Processo_Sprint.md`
2. Identifica tasks pendentes
3. Pergunta qual task executar
4. Carrega contexto necessário
5. Executa task

---

## DECISÕES A TOMAR

| Decisão | Opções | Critério |
|---------|--------|----------|
| Onde colocar templates? | `_templates/` ou `docs/00_I/` | Uso frequente vs. documentação |
| Branch protection real? | GitHub settings ou convenção | Controle técnico vs. disciplina |
| Quantas sprints paralelas? | 1 ativa ou múltiplas | Foco vs. flexibilidade |

---

## CRITÉRIOS DE CONCLUSÃO

| Critério | Verificação |
|----------|-------------|
| Documento existe | `docs/00_I/00_I_2_Processo_Sprint.md` criado |
| Template existe | `_templates/SPRINT_TEMPLATE.md` criado |
| Project Instructions atualizado | Regra de inicialização documentada |
| Catálogo indexado | Item `infra_processo_sprint` no índice |
| GitHub documentado | Modos produção/desenvolvimento claros |
| Teste passou | Fluxo de recuperação funcional |

---

## REFERÊNCIAS

| Arquivo | Conteúdo |
|---------|----------|
| /genesis/GENESIS.md | Orquestrador v1.4 |
| /_backlog/BACKLOG.md | Item #3 (origem) |
| /_sprints/S006-C_Catalogo_MVP.md | Sprint anterior (modelo) |
| /docs/00_I_1_1_GitHub.md | Instruções GitHub atuais |
| /_catalogo/indice.yaml | Índice para adicionar item |

---

## SEQUÊNCIA DE SPRINTS

```
S006-C (concluída) → S007 (atual) → S008-? (próximo do backlog)
        ✅              🔄               Backlog
```

---

## HISTÓRICO

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-07 | Criação da sprint. Promovido do BACKLOG.md item #3. |

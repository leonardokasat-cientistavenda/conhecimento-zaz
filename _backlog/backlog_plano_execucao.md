---
titulo: "Backlog com Plano de Execução"
data_criacao: 2025-12-08
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🟡
sistema_afetado: Backlog
---

## Contexto

### Origem: S008 (2025-12-08)

**Problema:** Durante execução de sprints, o LLM precisa perguntar "patch ou substituição?" para cada arquivo. Essa decisão poderia estar pré-definida no backlog item, reduzindo fricção e permitindo melhor estimativa de esforço.

**Insight:** Definir método antecipadamente reduz fricção na execução.

---

## M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Plano de Execução** | Lista de arquivos a criar/atualizar com método definido |
| **Método** | Criar (novo arquivo), Patch (edição cirúrgica), Substituição (reescrita completa) |
| **Escopo de Impacto** | Quantos arquivos serão afetados pelo item |

## M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| LLM pergunta "patch ou substituição?" | Decisão não está no backlog | Pré-definir método por arquivo |
| Backlog não indica escopo de trabalho | Falta lista de artefatos | Seção "Plano de Execução" |
| Estimativa de esforço difícil | Não sabe quantos arquivos afeta | Lista explícita de impacto |

## M0.3 Origem

- **Descoberto em:** S008 (durante execução de capturar())
- **Contexto:** Teste do fluxo Backlog.capturar() revelou fricção
- **Insight:** Definir método antecipadamente reduz perguntas e acelera execução

---

## Exemplo de Plano de Execução

```markdown
## Plano de Execução

| # | Arquivo | Método | Descrição |
|---|---------|--------|-----------|
| 1 | `_backlog/novo_item.md` | Criar | Arquivo do backlog item |
| 2 | `_catalogo/indice.yaml` | Patch | Adicionar entrada |
| 3 | `_backlog/BACKLOG.md` | Patch | Adicionar ao índice |
| 4 | `docs/00_X/spec.md` | Substituição | Reescrita completa da seção Y |
```

---

## Referências

- Conversa S008 sobre fluxo Backlog.capturar()
- `docs/00_I/00_I_2_1_Backlog.md` - spec a ser atualizada

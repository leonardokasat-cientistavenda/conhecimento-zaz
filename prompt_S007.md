# Prompt para Sprint S007: Processo de Sprint

## CONTEXTO

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Branch: main

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## OBJETIVO

Aplicar método epistemológico (M0-M4) ao conceito de **Sprint**.

---

## REGRA DE INICIALIZAÇÃO

Ao iniciar este chat:

1. Ler a sprint:
   ```
   github:get_file_contents(path="_sprints/S007_Processo_Sprint.md")
   ```

2. Identificar etapa atual (primeira com Status = ⬜)

3. Ler referência de como fazer M0-M4:
   ```
   github:get_file_contents(path="docs/00_E/00_E_Epistemologia.md")
   ```

4. Iniciar a etapa pendente

---

## CICLO M0-M4

| Etapa | Arquivo Draft | O que fazer |
|-------|---------------|-------------|
| M0 | `_drafts/S007/M0_Sprint.md` | Glossário + Problema + Tese |
| M1 | `_drafts/S007/M1_Sprint.md` | Marco Teórico (Scrum, Kanban, LLM) |
| M2 | `_drafts/S007/M2_Sprint.md` | Objeto (É/NÃO É, fronteiras) |
| M3 | `_drafts/S007/M3_Sprint.md` | Classe (atributos, métodos, estados) |
| M4 | `docs/00_I/00_I_2_Processo_Sprint.md` | Documento final publicado |

---

## FLUXO DE TRABALHO

```
1. Ler sprint → identificar etapa pendente
2. Criar draft da etapa em _drafts/S007/
3. Validar com usuário
4. Marcar etapa como ✅ na sprint
5. Próxima etapa ou M4 (publicar)
```

---

## REFERÊNCIAS

| Arquivo | Conteúdo |
|---------|----------|
| `_sprints/S007_Processo_Sprint.md` | Sprint atual |
| `_drafts/S007/` | Drafts desta sprint |
| `docs/00_E/00_E_Epistemologia.md` | Exemplo de M0-M4 |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Outro exemplo M0-M4 |

---

## CONVENÇÃO DE COMMIT

Padrão: [CAMADA] ação: descrição - Sprint/Etapa

Exemplos:
- `[C2] add: M0 Sprint - S007/M0`
- `[C2] add: M3 Sprint - S007/M3`
- `[C2] publish: Processo Sprint v1.0 - S007/M4`

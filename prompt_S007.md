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

| Etapa | O que fazer |
|-------|-------------|
| M0 | Glossário + Problema + Tese |
| M1 | Marco Teórico (Scrum, Kanban, LLM) |
| M2 | Objeto (É/NÃO É, fronteiras) |
| M3 | Classe (atributos, métodos, estados) |
| M4 | Consolidar e publicar em `docs/00_I/` |

---

## FLUXO DE TRABALHO

```
1. Ler sprint → identificar etapa pendente
2. Desenvolver conteúdo da etapa no chat
3. Validar com usuário
4. Aplicar PATCH na sprint (_sprints/S007_Processo_Sprint.md)
5. Marcar etapa como ✅
6. Próxima etapa
7. No M4: publicar documento final em docs/00_I/
```

**IMPORTANTE:** Não criar arquivos separados para cada etapa. O conteúdo vai sendo adicionado via patch diretamente na sprint.

---

## REFERÊNCIAS

| Arquivo | Conteúdo |
|---------|----------|
| `_sprints/S007_Processo_Sprint.md` | Sprint atual (documento principal) |
| `docs/00_E/00_E_Epistemologia.md` | Exemplo de M0-M4 |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Outro exemplo M0-M4 |

---

## CONVENÇÃO DE COMMIT

Padrão: [CAMADA] ação: descrição - Sprint/Etapa

Exemplos:
- `[C2] update: M0 Sprint - S007/M0`
- `[C2] update: M3 Sprint - S007/M3`
- `[C2] publish: Processo Sprint v1.0 - S007/M4`

---
titulo: "Épico: Consciência"
produto_ref: genesis
release_alvo: v0.3.0
status: Backlog
data_criacao: 2025-12-13
---

# Épico: Consciência

## Objetivo

Genesis sabe o que sabe fazer. Conhece suas próprias capacidades.

---

## Resultado Esperado

```
Usuário: "O que você sabe fazer?"
Genesis: "Posso ajudar com: CONHECER (criar meta sistemas), DECIDIR (análise estruturada), GERENCIAR (backlog e sprints)..."
```

---

## Componentes

| Componente | Descrição |
|------------|----------|
| MongoDB: capabilities | Índice de capacidades |
| Embeddings | Busca semântica |
| capability_matcher | Worker que busca match |
| capability_index | Worker que indexa |

---

## Backlog Items

| ID | Título | Prioridade |
|----|--------|------------|
| bl_genesis_capabilities_collection | Collection capabilities | 🟡 Média |
| bl_genesis_capability_matcher | Worker capability_matcher | 🟡 Média |
| bl_evolucao_catalogo | Evolução do Catálogo (embeddings) | 🟡 Média |

---

## Critérios de Conclusão

- [ ] Capacidades indexadas com embeddings
- [ ] Busca semântica retorna matches relevantes
- [ ] Genesis explica o que sabe fazer quando perguntado
- [ ] Novas capacidades são indexadas automaticamente

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-13 | Épico criado |

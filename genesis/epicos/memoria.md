---
titulo: "Épico: Memória"
produto_ref: genesis
release_alvo: v0.2.0
status: Backlog
data_criacao: 2025-12-13
---

# Épico: Memória

## Objetivo

Genesis lembra quem é o usuário e o histórico de conversas.

---

## Resultado Esperado

```
Usuário: "Lembra do projeto que discutimos ontem?"
Genesis: "Sim, o projeto de automação de relatórios. Quer continuar?"
```

---

## Componentes

| Componente | Descrição |
|------------|----------|
| MongoDB: users | Perfil do usuário |
| MongoDB: conversations | Histórico de conversas |
| context_retriever | Worker que busca contexto |
| history_persist | Worker que salva histórico |

---

## Backlog Items

| ID | Título | Prioridade |
|----|--------|------------|
| bl_genesis_users_collection | Collection users no MongoDB | 🟡 Média |
| bl_genesis_context_retriever | Worker context_retriever | 🟡 Média |
| bl_genesis_history_persist | Worker history_persist | 🟡 Média |

---

## Critérios de Conclusão

- [ ] Usuário é identificado automaticamente pelo MM user_id
- [ ] Conversas são persistidas no MongoDB
- [ ] Contexto é injetado no prompt do LLM
- [ ] Histórico pode ser buscado por data ou palavra-chave

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-13 | Épico criado |

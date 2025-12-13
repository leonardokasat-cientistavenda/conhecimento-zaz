---
titulo: "Épico: MCP"
produto_ref: genesis
release_alvo: v0.6.0
status: Backlog
data_criacao: 2025-12-13
---

# Épico: MCP (Model Context Protocol)

## Objetivo

LLM navega conhecimento autonomamente usando tools.

---

## Resultado Esperado

O LLM decide sozinho quando precisa buscar informação, sem precisar de orquestração explícita.

```
Usuário: "Como está o projeto X?"
Genesis: [internamente usa tool query_history]
Genesis: [internamente usa tool search_capabilities]
Genesis: "O projeto X está na fase 3. Última atualização foi..."
```

---

## Componentes

| Componente | Descrição |
|------------|----------|
| MCP Server | Adapter fino para Camunda |
| tool_execution.bpmn | Roteamento de tools |
| Tools Genesis | search_capabilities, read_code, query_history, start_process |

---

## Backlog Items

| ID | Título | Prioridade |
|----|--------|------------|
| bl_genesis_mcp_server | MCP Server (adapter) | 🟢 Baixa |
| bl_genesis_tool_execution | tool_execution.bpmn | 🟢 Baixa |
| bl_genesis_tools | Tools Genesis | 🟢 Baixa |

---

## Tools Planejadas

| Tool | Worker reusado |
|------|----------------|
| search_capabilities | capability_matcher |
| read_code | git_ops |
| query_history | context_retriever |
| start_process | (novo) process_starter |

**Tools Anthropic nativos (grátis):**
- web_search
- web_fetch

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-13 | Épico criado |

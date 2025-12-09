# Sprint S013: GENESIS Developer Mode

## Metadata

| Campo | Valor |
|-------|-------|
| **Sprint** | S013 |
| **Tipo** | Infraestrutura |
| **Status** | Ativa |
| **Início** | 2025-12-09 |
| **Origem** | bl_genesis_developer |

---

## Objetivo

Configurar Cursor como interface completa do GENESIS: edição local + Catálogo (MongoDB) + contexto estruturado (.cursorrules).

---

## Tasks

| # | Task | Descrição | Status |
|---|------|-----------|--------|
| T01 | Criar .cursorrules | Prompt GENESIS (M0-M4, regras, convenções) | ✅ |
| T02 | Setup MCP Server | Estrutura básica do servidor MongoDB | ⬜ |
| T03 | Tool: mongodb.find | Buscar no Catálogo | ⬜ |
| T04 | Tool: mongodb.insert | Indexar no Catálogo | ⬜ |
| T05 | Configurar Cursor | Conectar ao MCP Server | ⬜ |
| T06 | Testar fluxo completo | Buscar + editar + indexar | ⬜ |
| T07 | Documentar setup | Guia de instalação | ⬜ |

---

## Critérios de Sucesso

| Critério | Métrica | Resultado |
|----------|---------|-----------:|
| .cursorrules funciona | Cursor responde com contexto GENESIS | ⬜ |
| MongoDB conectado | Busca no Catálogo via Cursor | ⬜ |
| Fluxo completo | Editar + commitar + indexar sem sair do Cursor | ⬜ |

---

## Referências

| Recurso | Link |
|---------|------|
| MCP Docs | https://modelcontextprotocol.io/ |
| Cursor MCP | https://docs.cursor.com/context/model-context-protocol |
| MongoDB MCP | https://github.com/mongodb-js/mongodb-mcp-server |
| Backlog | _backlog/GENESIS_Developer.md |

---

## Artefatos Produzidos

| Task | Artefato |
|------|----------|
| T01 | `.cursorrules` |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-09 | Sprint criada, promovida do backlog |
| 2025-12-09 | T01 concluída: .cursorrules criado |

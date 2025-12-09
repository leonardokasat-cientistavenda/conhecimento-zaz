# GENESIS Developer Mode

## Status: Backlog

| Campo | Valor |
|-------|-------|
| **ID** | bl_genesis_developer |
| **Prioridade** | Alta |
| **Esforço** | Médio (1-2 sprints) |
| **Dependências** | S012 (Cursor validado) ✅ |
| **Absorve** | bl_mcp_server |
| **Criado** | 2025-12-08 |

---

## M0: Problema

### Glossário

| Termo | Significado |
|-------|-------------|
| **GENESIS Developer Mode** | Cursor configurado como interface completa do GENESIS |
| **MCP** | Model Context Protocol - padrão para conectar LLMs a ferramentas |
| **MCP Server** | Servidor que expõe tools para o LLM via protocolo MCP |
| **.cursorrules** | Arquivo de configuração que define prompt do sistema no Cursor |

### Situação Atual

```
┌─────────────────────────────────────────────────────────────────┐
│                    CURSOR ATUAL (S012)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✅ Edição de arquivos (Cmd+K)                                  │
│  ✅ Git integrado (commit/push)                                 │
│  ✅ @codebase (contexto do projeto)                             │
│                                                                 │
│  ❌ MongoDB (Catálogo)                                          │
│  ❌ Prompt GENESIS (M0-M4, regras)                              │
│  ❌ Tools estruturadas (buscar, indexar)                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Resultado: Cursor é editor, não é GENESIS completo
```

### Solução Proposta

```
┌─────────────────────────────────────────────────────────────────┐
│                 GENESIS DEVELOPER MODE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✅ Edição de arquivos (Cmd+K)                                  │
│  ✅ Git integrado (commit/push)                                 │
│  ✅ @codebase (contexto do projeto)                             │
│                                                                 │
│  ✅ MongoDB via MCP Server                                      │
│  ✅ Prompt GENESIS via .cursorrules                             │
│  ✅ Tools: buscar(), indexar(), rotear()                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Resultado: Cursor = Interface completa GENESIS
```

### Tese

> **GENESIS Developer Mode transforma o Cursor em interface completa do sistema: edição local + Catálogo + contexto estruturado, permitindo desenvolvimento ágil com todas as capacidades GENESIS.**

---

## M1: Marco Teórico

| Conceito | Aplicação |
|----------|-----------|
| **MCP (Model Context Protocol)** | Padrão Anthropic para conectar Claude a ferramentas externas |
| **Composição** | Adicionar capacidades sem modificar core |
| **DX (Developer Experience)** | Reduzir fricção = maior produtividade |

---

## M2: Objeto

### Fronteiras

| É | Não É |
|---|-------|
| Configuração do Cursor para GENESIS | Nova aplicação |
| MCP Server para MongoDB | Reescrita do Catálogo |
| Prompt de sistema (.cursorrules) | Mudança na metodologia |
| Interface de desenvolvimento | Interface de usuário final |

### Componentes

```
GENESIS Developer Mode
├── .cursorrules          # Prompt do sistema
├── mcp-server/           # Servidor MCP
│   ├── mongodb.js        # Tools MongoDB (Catálogo)
│   └── config.json       # Configuração
└── docs/setup.md         # Documentação
```

---

## M3: Tasks Previstas

| # | Task | Descrição |
|---|------|-----------|
| T01 | Criar .cursorrules | Prompt GENESIS (M0-M4, regras, convenções) |
| T02 | Setup MCP Server | Estrutura básica do servidor |
| T03 | Tool: mongodb.find | Buscar no Catálogo |
| T04 | Tool: mongodb.insert | Indexar no Catálogo |
| T05 | Configurar Cursor | Conectar ao MCP Server |
| T06 | Testar fluxo completo | Buscar + editar + indexar |
| T07 | Documentar setup | Guia de instalação |

---

## Referências

| Recurso | Link |
|---------|------|
| MCP Docs | https://modelcontextprotocol.io/ |
| Cursor MCP | https://docs.cursor.com/context/model-context-protocol |
| MongoDB MCP | https://github.com/mongodb-js/mongodb-mcp-server |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-08 | Backlog criado, absorve bl_mcp_server |

# Sprint S-PANTHEON-003

---

```yaml
nome: S-PANTHEON-003
versao: "1.0"
tipo: Sprint
status: Planejada
data_criacao: "2026-01-03"
objetivo: "Finalizar pendências V0.X + iniciar V1 (Tools)"
esforco_estimado_total: 10
responsavel_id: leonardo
saga_id: SAGA-PANTHEON
items_selecionados:
  - BKL-PANTHEON-001
  - BKL-PANTHEON-002
  - BKL-PANTHEON-003
```

---

## 1. Objetivo

> Fechar todas as pendências técnicas de V0.X e entregar a primeira tool funcional (GitHub) para validar a arquitetura de MCP Tools.

### Critério de Sucesso

```
[Leonardo]: @genesis lê o arquivo genesis/GENESIS.md e me faz um resumo
[genesis]:  🔧 Buscando no GitHub...
            GENESIS é um sistema de inteligência híbrida com 3 capacidades
            principais: CONHECER, DECIDIR e GERENCIAR...
```

---

## 2. Escopo

| BKL | Descrição | Esforço | Prioridade |
|-----|-----------|---------|------------|
| BKL-PANTHEON-001 | Pendências Técnicas V0.X | 2h | 🔴 Alta |
| BKL-PANTHEON-002 | Tool Registry + Executor | 5h | 🔴 Alta |
| BKL-PANTHEON-003 | GitHub Tool | 3h | 🔴 Alta |
| **Total** | | **10h** | |

---

## 3. Tasks

### T01: Pendências Técnicas V0.X
**BKL:** BKL-PANTHEON-001 | **Esforço:** 2h | **Status:** ⬜ Pendente

| Subtask | Descrição | Esforço |
|---------|-----------|--------|
| T01.1 | Testar upload de arquivos (imagem no MM) | 1h |
| T01.2 | Verificar se Web Search built-in funciona | 30min |
| T01.3 | Configurar CLICKHOUSE_PASSWORD no .env | 10min |
| T01.4 | Atualizar README.md do Pantheon | 20min |

**Critério:**
- Upload de imagem + @genesis "analisa" funciona
- Web search responde perguntas atuais
- Métricas ClickHouse funcionando

---

### T02: Tool Registry
**BKL:** BKL-PANTHEON-002 | **Esforço:** 2h | **Status:** ⬜ Pendente

Criar `pantheon/core/toolRegistry.js`:

```javascript
class ToolRegistry {
  constructor() {
    this.tools = new Map();
  }

  register(name, definition, handler) {
    this.tools.set(name, { definition, handler });
  }

  getDefinitions() {
    return Array.from(this.tools.values()).map(t => t.definition);
  }

  async execute(name, input) {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Tool not found: ${name}`);
    return await tool.handler(input);
  }
}
```

**Critério:** Registry carrega e retorna definições de tools

---

### T03: Tool Executor
**BKL:** BKL-PANTHEON-002 | **Esforço:** 3h | **Status:** ⬜ Pendente

Criar `pantheon/core/toolExecutor.js`:

```javascript
async function executeWithTools(messages, registry, streamer) {
  const tools = [
    { type: "web_search_20250305", name: "web_search", max_uses: 5 },
    ...registry.getDefinitions()
  ];

  let response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    messages,
    tools,
    stream: true
  });

  // Loop enquanto Claude pedir tools
  while (response.stop_reason === "tool_use") {
    const toolUse = response.content.find(c => c.type === "tool_use");
    
    await streamer.update(`🔧 Executando ${toolUse.name}...`);
    
    const result = await registry.execute(toolUse.name, toolUse.input);
    
    response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      messages: [
        ...messages,
        { role: "assistant", content: response.content },
        {
          role: "user",
          content: [{
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify(result)
          }]
        }
      ],
      tools,
      stream: true
    });
  }

  return response;
}
```

**Critério:** Executor faz loop até stop_reason != tool_use

---

### T04: GitHub Tool
**BKL:** BKL-PANTHEON-003 | **Esforço:** 3h | **Status:** ⬜ Pendente

Criar `pantheon/tools/github.js`:

**Operações:**
| Operação | Descrição |
|----------|----------|
| github_get_file | Lê arquivo do repo |
| github_list_files | Lista diretório |
| github_search_code | Busca código |

**Configuração:**
```bash
# .env
GITHUB_TOKEN=ghp_xxx
GITHUB_OWNER=leonardokasat-cientistavenda
GITHUB_REPO_DEFAULT=conhecimento-zaz
```

**Critério:**
```
@genesis lê genesis/GENESIS.md
→ 🔧 Buscando no GitHub...
→ [conteúdo do arquivo]
```

---

### T05: Teste E2E
**Esforço:** 30min | **Status:** ⬜ Pendente

Teste completo:
1. @genesis pergunta simples (sem tool)
2. @genesis pergunta que precisa web search
3. @genesis lê arquivo do GitHub
4. Verificar logs no ClickHouse

**Critério:** 🎉 Todas as tools funcionando!

---

## 4. Arquitetura Resultante

```
┌─────────────────────────────────────────────────────────────┐
│                    PANTHEON V1 (pós sprint)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 ANTHROPIC CLIENT                      │   │
│  │           (messages + tools + web_search)             │   │
│  └─────────────────────────┬───────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  TOOL EXECUTOR                        │   │
│  │         (loop enquanto stop_reason = tool_use)        │   │
│  └─────────────────────────┬───────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  TOOL REGISTRY                        │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │   │
│  │  │  GitHub  │ │ MongoDB  │ │Mattermost│ (futuro)   │   │
│  │  │  Tool    │ │  Tool    │ │  Tool    │            │   │
│  │  └──────────┘ └──────────┘ └──────────┘            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Estrutura de Arquivos (após sprint)

```
pantheon/
├── core/
│   ├── executor.js          # Existente
│   ├── streamer.js          # Existente
│   ├── toolRegistry.js      # NOVO (T02)
│   └── toolExecutor.js      # NOVO (T03)
├── tools/
│   ├── index.js             # NOVO
│   └── github.js            # NOVO (T04)
├── services/
│   ├── github/
│   │   └── client.js        # NOVO
│   ├── anthropic/
│   └── mattermost/
└── README.md                # Atualizado (T01.4)
```

---

## 6. Variáveis de Ambiente (novas)

```bash
# GitHub (adicionar ao .env)
GITHUB_TOKEN=ghp_xxx
GITHUB_OWNER=leonardokasat-cientistavenda
GITHUB_REPO_DEFAULT=conhecimento-zaz

# ClickHouse (corrigir)
CLICKHOUSE_PASSWORD=xxx
```

---

## 7. Dependências npm (novas)

```json
{
  "dependencies": {
    "@octokit/rest": "^20.0.0"
  }
}
```

---

## 8. Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Rate limit GitHub API | Usar token com escopo adequado |
| Tool loop infinito | Max iterations = 10 |
| Web search não funciona | Testar primeiro em T01.2 |

---

## 9. Próximos Passos (pós sprint)

| Sprint | Escopo |
|--------|--------|
| S-PANTHEON-004 | MongoDB Tool + Mattermost Tool |
| S-PANTHEON-005 | Extended Thinking + Memory |
| S-PANTHEON-006 | V2 - Camunda + Router |

---

## Referências

| Documento | Path |
|-----------|------|
| Backlog Pantheon | docs/04_B/BKL_PANTHEON.md |
| Spec V1 | genesis/specs/PANTHEON_V1_SPEC.md |
| MS_Sprint | docs/04_S/MS_Sprint.md |
| Sprint anterior | genesis/sprints/S-PANTHEON-002.md |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2026-01-03 | Criação. Sprint planejada com 5 tasks, 10h estimadas. Foco: pendências + GitHub Tool. |

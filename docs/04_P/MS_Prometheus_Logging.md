# MS_Prometheus_Logging v1.1

---

```yaml
nome: MS_Prometheus_Logging
versao: "1.1"
tipo: Especificação
status: Aprovado
pai: genesis/PROMETHEUS.md
data: 2025-12-19
sprint: S030
backlog_ref: BKL-037

# Público-alvo
destinatario_mvp: PROMETHEUS (padrão de geração de código)
destinatario_prd: Gabriel / Time Infra (Loki)
objetivo: Sistema de logging para pipeline TDD com evolução para produção
```

---

## 1. Contexto

### 1.1 Problema

O ciclo de desenvolvimento atual é manual e não-observável:

```
ANTES (problema):
  Humano escreve código → roda manual → lê erro na tela → cola no chat
  → Claude sugere → humano aplica → repete
  
  ❌ Contexto se perde entre mensagens
  ❌ Sem histórico estruturado
  ❌ Claude não consegue "ver" os erros diretamente
```

### 1.2 Estratégia de Duas Trilhas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TRILHA 1: MVP (agora)                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Quem: PROMETHEUS (padrão no código gerado)                                 │
│  Como: Pino → console / MongoDB                                             │
│  Interface: Leonardo cola output → Claude analisa                           │
│                                                                             │
│  ✅ Zero infra nova                                                         │
│  ✅ Funciona hoje                                                           │
│  ⚠️ Não escala para produção pesada                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  TRILHA 2: PRD (paralelo)                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Quem: Gabriel / Time Infra                                                 │
│  Como: Pino → Loki                                                          │
│  Interface: Claude consulta Loki via MCP Server                             │
│                                                                             │
│  ✅ Banco especializado para logs                                           │
│  ✅ Busca indexada, estruturado                                             │
│  ✅ Escala para produção                                                    │
│  ✅ Claude consulta diretamente                                             │
│                                                                             │
│  Backlog: BKL-037                                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**As trilhas não se bloqueiam.** MVP funciona hoje, PRD melhora depois.

---

## 2. TRILHA 1: MVP (Padrão de Código)

### 2.1 O Que É

Todo código gerado por PROMETHEUS já vem com logging embutido.

**Não é tarefa de infra.** É padrão de geração de código.

### 2.2 Template de Worker

```javascript
// Todo worker gerado por PROMETHEUS inclui:

const pino = require('pino');
const logger = pino({ 
  level: process.env.LOG_LEVEL || 'info' 
});

// Nos pontos importantes:
logger.info({ task_id, topic }, 'Task recebida');
logger.error({ error: err.message, stack: err.stack }, 'Falha ao processar');
logger.info({ result, duration_ms }, 'Task concluída');
```

### 2.3 Fluxo de Debug (Agora)

```
Claude gera código
    │
    ▼
Leonardo copia → executa
    │
    ▼
Leonardo cola output/erro no chat
    │
    ▼
Claude analisa → corrige → repete
```

**Infra necessária: ZERO**

---

## 3. TRILHA 2: PRD - Loki (Gabriel / Infra)

### 3.1 Por Que Loki

| Aspecto | MongoDB | Loki |
|---------|---------|------|
| Propósito | Banco genérico | Especializado em logs |
| Indexação | Manual | Automática por labels |
| Query | find() | LogQL (poderoso) |
| Escala | Limitada | Alta |
| Retenção | Manual | Configurável por level |

### 3.2 Arquitetura Final

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FLUXO PRD                                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  WORKER                                                                     │
│       │                                                                     │
│       │ Pino com transport pino-loki                                        │
│       ▼                                                                     │
│  LOKI (banco de logs)                                                       │
│       │                                                                     │
│       │ Logs estruturados com labels                                        │
│       ▼                                                                     │
│  CLAUDE via MCP                                                             │
│       │                                                                     │
│       │ loki_query / search_logs                                            │
│       ▼                                                                     │
│  Analisa erro, gera correção, ciclo automatizado                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 MCP Server para Loki

**Já existe MCP Server oficial:**

| Opção | Linguagem | Instalação |
|-------|-----------|------------|
| simple-loki-mcp | Node.js | `npx -y simple-loki-mcp` |
| grafana/loki-mcp | Go | Docker |

**Configuração no Claude Desktop:**

```json
{
  "mcpServers": {
    "loki": {
      "command": "npx",
      "args": ["-y", "simple-loki-mcp"],
      "env": {
        "LOKI_ADDR": "https://loki.zaz.com.br"
      }
    }
  }
}
```

**Tools disponíveis:**

| Tool | O que faz |
|------|-----------|
| `loki_query` | Executa LogQL |
| `search_logs` | Busca por keyword |
| `get_labels` | Lista labels disponíveis |
| `get_label_values` | Valores de uma label |

### 3.4 Checklist de Implementação (Gabriel)

| # | Tarefa | Detalhe | Esforço |
|---|--------|---------|---------|
| 1 | Subir Loki | Docker: `grafana/loki` ou K8s helm | 2h |
| 2 | Configurar retenção | 7d DEBUG, 30d INFO, 90d ERROR | 30min |
| 3 | Expor endpoint | URL acessível (ex: https://loki.zaz.com.br) | 30min |
| 4 | Configurar auth | Basic auth ou token | 30min |
| 5 | Testar com logcli | `logcli query '{job="test"}'` | 30min |
| 6 | Documentar URL + auth | Para config MCP | 15min |
| 7 | Instalar pino-loki | `npm install pino-loki` nos workers | 1h |

**Tempo total estimado: 4-6 horas**

### 3.5 Transport Pino → Loki

```javascript
// logger.js (versão PRD)
const pino = require('pino');

const transport = pino.transport({
  target: 'pino-loki',
  options: {
    host: process.env.LOKI_URL,
    labels: { 
      job: 'genesis-pipeline',
      env: process.env.NODE_ENV 
    }
  }
});

const logger = pino(transport);

module.exports = { logger };
```

**Código do worker não muda.** Só a config do transport.

---

## 4. Exemplo de Uso (Quando Loki Estiver Pronto)

**Leonardo:** "Claude, o que deu erro na spec_001?"

**Claude executa:**
```javascript
loki_query({
  query: '{job="genesis-pipeline", spec_id="spec_001"} |= "error"',
  start: "-1h",
  limit: 10
})
```

**Claude responde:** "Achei 3 erros nas últimas 2 horas. O mais recente foi TypeError na linha 15..."

---

## 5. Schema de Log (Comum MVP e PRD)

```javascript
{
  // Identificação
  spec_id: String,           // "spec_001"
  iteration: Number,         // 1, 2, 3...
  
  // Output
  stdout: String,
  stderr: String,
  exit_code: Number,         // 0 = sucesso
  
  // Código
  code_snapshot: String,     // Código que rodou
  
  // Métricas
  duration_ms: Number,
  timestamp: Date,
  
  // Contexto
  sprint_id: String,         // "S030"
  task_id: String,           // "T01"
  
  // Metadados
  service: "genesis-pipeline",
  version: String
}
```

---

## 6. Decisões de Design

| Decisão | Escolha | Razão |
|---------|---------|-------|
| Logger | Pino | Rápido, JSON nativo, transports flexíveis |
| MVP | Console + copy/paste | Zero infra, funciona hoje |
| PRD | Loki | Banco especializado, indexado |
| Interface PRD | Claude via MCP | Automação do ciclo TDD |
| Grafana | Opcional | Claude é a interface principal |
| Graylog | Descartado | Elasticsearch pesado demais |

---

## 7. Cronograma

```
AGORA
═════
• PROMETHEUS gera código com Pino embutido
• Leonardo cola output → Claude analisa

PARALELO (Gabriel)
══════════════════
• Subir Loki
• Configurar MCP Server
• Backlog: BKL-037

QUANDO LOKI PRONTO
══════════════════
• Trocar transport: console → Loki
• Claude consulta direto
• Ciclo TDD automatizado
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| genesis/PROMETHEUS.md | Sistema pai |
| docs/04_P/MS_Prometheus_Pipeline.md | Pipeline de deploy |
| github.com/grafana/loki-mcp | MCP Server oficial |
| github.com/ghrud92/simple-loki-mcp | MCP Server Node.js |

---

## 9. Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-19 | Documento inicial. Foco em MongoDB. |
| 1.1 | 2025-12-19 | Refatorado para duas trilhas: MVP (padrão de código) + PRD (Loki). Adicionado MCP Server. |

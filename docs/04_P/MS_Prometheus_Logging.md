# MS_Prometheus_Logging v1.2

---

```yaml
nome: MS_Prometheus_Logging
versao: "1.2"
tipo: Especificação
status: Aprovado
pai: genesis/PROMETHEUS.md
data: 2025-12-19
sprint: S030
backlog_ref: BKL-037

# Público-alvo
destinatario_mvp: PROMETHEUS (padrão de geração de código)
destinatario_prd: Gabriel / Time Infra (ClickHouse)
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
│  Como: Pino → console                                                       │
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
│  Como: Pino → ClickHouse                                                    │
│  Interface: Claude consulta ClickHouse via MCP Server oficial               │
│                                                                             │
│  ✅ Banco OLAP especializado                                                │
│  ✅ Query via SQL (time já conhece)                                         │
│  ✅ MCP Server oficial da ClickHouse                                        │
│  ✅ Usado pela Anthropic internamente                                       │
│  ✅ Pode unificar logs + métricas + analytics                               │
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

## 3. TRILHA 2: PRD - ClickHouse (Gabriel / Infra)

### 3.1 Por Que ClickHouse (não Loki)

| Aspecto | Loki | ClickHouse |
|---------|------|------------|
| Query Language | LogQL (nova) | **SQL (conhecida)** |
| MCP Server | Comunidade | **Oficial ClickHouse** |
| Usado por Anthropic | Não | **Sim** |
| Unificação | Só logs | **Logs + métricas + analytics** |
| Full-text search | Lento | **Rápido** |
| Agregações | Básicas | **Poderosas** |

**Decisão:** ClickHouse. Time já sabe SQL, MCP oficial, Anthropic usa.

### 3.2 Arquitetura Final

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FLUXO PRD                                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  WORKER                                                                     │
│       │                                                                     │
│       │ Pino com transport pino-clickhouse                                  │
│       ▼                                                                     │
│  CLICKHOUSE (banco OLAP)                                                    │
│       │                                                                     │
│       │ Logs estruturados, indexados, SQL                                   │
│       ▼                                                                     │
│  CLAUDE via MCP                                                             │
│       │                                                                     │
│       │ SELECT * FROM logs WHERE spec_id = '...'                            │
│       ▼                                                                     │
│  Analisa erro, gera correção, ciclo automatizado                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 MCP Server para ClickHouse

**MCP Server oficial:**

```bash
npx -y mcp-clickhouse
```

**Configuração no Claude Desktop:**

```json
{
  "mcpServers": {
    "clickhouse": {
      "command": "npx",
      "args": ["-y", "mcp-clickhouse"],
      "env": {
        "CLICKHOUSE_HOST": "clickhouse.zaz.com.br",
        "CLICKHOUSE_PORT": "8443",
        "CLICKHOUSE_USER": "genesis_readonly",
        "CLICKHOUSE_PASSWORD": "...",
        "CLICKHOUSE_SECURE": "true"
      }
    }
  }
}
```

**Tools disponíveis:**

| Tool | O que faz |
|------|-----------|
| `clickhouse_query` | Executa SELECT (read-only) |
| `clickhouse_show_tables` | Lista tabelas |
| `clickhouse_describe_table` | Schema da tabela |

### 3.4 Schema da Tabela de Logs

```sql
CREATE DATABASE IF NOT EXISTS genesis;

CREATE TABLE genesis.logs (
  -- Timestamps
  timestamp DateTime64(3) DEFAULT now64(3),
  
  -- Level
  level String,
  message String,
  
  -- Identificação
  spec_id String,
  iteration UInt32,
  
  -- Output
  stdout String,
  stderr String,
  exit_code Int32,
  
  -- Código
  code_snapshot String,
  
  -- Métricas
  duration_ms UInt32,
  
  -- Contexto
  sprint_id String,
  task_id String,
  
  -- Metadados
  service String DEFAULT 'genesis-pipeline',
  version String
  
) ENGINE = MergeTree()
ORDER BY (timestamp, spec_id)
TTL timestamp + INTERVAL 90 DAY;

-- Índices para queries comuns
ALTER TABLE genesis.logs ADD INDEX idx_level (level) TYPE set(10) GRANULARITY 4;
ALTER TABLE genesis.logs ADD INDEX idx_exit_code (exit_code) TYPE set(10) GRANULARITY 4;
```

### 3.5 Checklist de Implementação (Gabriel)

| # | Tarefa | Detalhe | Esforço |
|---|--------|---------|---------|
| 1 | Subir ClickHouse | Docker: `clickhouse/clickhouse-server` | 1h |
| 2 | Criar database e tabela | SQL acima | 30min |
| 3 | Criar usuário read-only | Para MCP (segurança) | 15min |
| 4 | Expor endpoint | HTTPS na porta 8443 | 30min |
| 5 | Testar query | `SELECT * FROM genesis.logs LIMIT 10` | 15min |
| 6 | Documentar credenciais | Host, port, user, password | 15min |
| 7 | Instalar pino-clickhouse | Nos workers | 1h |

**Tempo total estimado: 4-6 horas**

### 3.6 Criar Usuário Read-Only

```sql
-- Usuário para MCP Server (só leitura)
CREATE USER genesis_readonly 
  IDENTIFIED BY 'senha_segura'
  SETTINGS readonly = 1;

GRANT SELECT ON genesis.* TO genesis_readonly;
```

### 3.7 Transport Pino → ClickHouse

```javascript
// logger.js (versão PRD)
const pino = require('pino');

const transport = pino.transport({
  target: 'pino-clickhouse',
  options: {
    host: process.env.CLICKHOUSE_HOST,
    port: 8123,
    database: 'genesis',
    table: 'logs',
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD
  }
});

const logger = pino(transport);

module.exports = { logger };
```

**Código do worker não muda.** Só a config do transport.

---

## 4. Exemplo de Uso (Quando ClickHouse Estiver Pronto)

**Leonardo:** "Claude, o que deu erro na spec_001?"

**Claude executa via MCP:**
```sql
SELECT timestamp, level, stderr, exit_code, duration_ms
FROM genesis.logs 
WHERE spec_id = 'spec_001' 
  AND exit_code != 0
ORDER BY timestamp DESC
LIMIT 10
```

**Claude responde:** "Achei 3 erros. O mais recente (há 10 minutos) foi TypeError na linha 15. Duração: 1.5s. Quer que eu analise o stderr completo?"

---

## 5. Comparativo: Loki vs ClickHouse

| Critério | Loki | ClickHouse | Vencedor |
|----------|------|------------|----------|
| Query language | LogQL | SQL | **ClickHouse** |
| Curva aprendizado | Alta | Baixa (SQL) | **ClickHouse** |
| MCP Server | Comunidade | Oficial | **ClickHouse** |
| Usado por Anthropic | Não | Sim | **ClickHouse** |
| Unificação | Só logs | Logs+métricas | **ClickHouse** |
| Full-text search | Lento | Rápido | **ClickHouse** |
| RAM mínima | 2-4 GB | 4-8 GB | Loki |
| Setup | Simples | Médio | Loki |

**Decisão: ClickHouse** para GENESIS.

---

## 6. Schema de Log (Comum MVP e PRD)

```javascript
{
  // Timestamps
  timestamp: DateTime,
  
  // Level
  level: String,           // "info", "error", "debug"
  message: String,
  
  // Identificação
  spec_id: String,         // "spec_001"
  iteration: Number,       // 1, 2, 3...
  
  // Output
  stdout: String,
  stderr: String,
  exit_code: Number,       // 0 = sucesso
  
  // Código
  code_snapshot: String,
  
  // Métricas
  duration_ms: Number,
  
  // Contexto
  sprint_id: String,       // "S030"
  task_id: String,         // "T01"
  
  // Metadados
  service: "genesis-pipeline",
  version: String
}
```

---

## 7. Decisões de Design

| Decisão | Escolha | Razão |
|---------|---------|-------|
| Logger | Pino | Rápido, JSON nativo, transports flexíveis |
| MVP | Console + copy/paste | Zero infra, funciona hoje |
| PRD | ClickHouse | SQL, MCP oficial, Anthropic usa |
| Interface PRD | Claude via MCP | Automação do ciclo TDD |
| Grafana | Opcional | Claude é a interface principal |
| Loki | Descartado | LogQL é curva extra, MCP não oficial |

---

## 8. Cronograma

```
AGORA
═════
• PROMETHEUS gera código com Pino embutido
• Leonardo cola output → Claude analisa

PARALELO (Gabriel)
══════════════════
• Subir ClickHouse
• Criar tabela genesis.logs
• Configurar MCP Server
• Backlog: BKL-037

QUANDO CLICKHOUSE PRONTO
════════════════════════
• Trocar transport: console → ClickHouse
• Claude consulta via SQL
• Ciclo TDD automatizado
```

---

## 9. Referências

| Documento | Relação |
|-----------|---------|
| genesis/PROMETHEUS.md | Sistema pai |
| docs/04_P/MS_Prometheus_Pipeline.md | Pipeline de deploy |
| github.com/ClickHouse/mcp-clickhouse | MCP Server oficial |
| clickhouse.com/docs/use-cases/AI/MCP | Documentação MCP |

---

## 10. Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-19 | Documento inicial. Foco em MongoDB. |
| 1.1 | 2025-12-19 | Refatorado para duas trilhas: MVP + Loki. |
| 1.2 | 2025-12-19 | Trocado Loki por ClickHouse. SQL, MCP oficial, Anthropic usa. |

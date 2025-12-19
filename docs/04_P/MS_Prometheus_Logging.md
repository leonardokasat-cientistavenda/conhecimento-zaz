# MS_Prometheus_Logging v1.0

---

```yaml
nome: MS_Prometheus_Logging
versao: "1.0"
tipo: Especificação
status: Aprovado
pai: genesis/PROMETHEUS.md
data: 2025-12-19
sprint: S030
backlog_ref: BKL-037

# Público-alvo
destinatario: Time de Infraestrutura
objetivo: Implementar sistema de logging para pipeline TDD
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

### 1.2 Solução

```
DEPOIS (com logging):
  Worker executa código → salva log no MongoDB → Claude lê direto
  → Claude analisa erro → sugere correção → Worker executa → ...
  
  ✅ Claude acessa logs via MCP Server (já conectado)
  ✅ Histórico completo de tentativas
  ✅ Ciclo pode ser automatizado
```

### 1.3 Arquitetura Simplificada

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FLUXO                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  WORKER (vocês implementam)                                                 │
│       │                                                                     │
│       │ executa código, captura stdout/stderr                               │
│       │                                                                     │
│       ▼                                                                     │
│  MongoDB: db.logs.insertOne({...})                                          │
│       │                                                                     │
│       │ persistido em genesis.logs                                          │
│       ▼                                                                     │
│  CLAUDE (já conectado via MCP)                                              │
│       │                                                                     │
│       │ mongodb:find({collection: "logs", ...})                             │
│       │                                                                     │
│       ▼                                                                     │
│  Analisa erro, gera correção, ciclo continua                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Claude já tem acesso ao MongoDB da ZAZ via MCP Server.** Vocês só precisam salvar os logs na collection certa.

---

## 2. O Que Implementar

### 2.1 Instalar Pino

```bash
cd /home/camunda-orquestrador/Orquestrador-Zarah
npm install pino --save
```

### 2.2 Criar Logger

**Arquivo:** `src/utils/logger.js`

```javascript
/**
 * Logger para Pipeline TDD
 * 
 * Uso:
 *   const { logExecution } = require('./utils/logger');
 *   await logExecution(specId, iteration, resultado);
 */

const pino = require('pino');
const { MongoClient } = require('mongodb');

// Logger para console (desenvolvimento)
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
});

// Conexão MongoDB (reusar conexão existente se houver)
let db = null;

async function getDb() {
  if (!db) {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    db = client.db('genesis');
  }
  return db;
}

/**
 * Salva log de execução no MongoDB
 * Claude lê esses logs para analisar erros e iterar
 * 
 * @param {string} specId - ID da spec sendo testada
 * @param {number} iteration - Número da tentativa (1, 2, 3...)
 * @param {object} resultado - Output da execução
 * @param {object} contexto - Contexto opcional (sprint, task, etc)
 */
async function logExecution(specId, iteration, resultado, contexto = {}) {
  const database = await getDb();
  
  const logRecord = {
    // Identificação
    spec_id: specId,
    iteration: iteration,
    
    // Output da execução
    stdout: resultado.stdout || '',
    stderr: resultado.stderr || '',
    exit_code: resultado.exitCode ?? -1,
    
    // Código que rodou (para histórico)
    code_snapshot: resultado.code || null,
    
    // Métricas
    duration_ms: resultado.durationMs || 0,
    
    // Timestamps
    timestamp: new Date(),
    
    // Contexto (Claude usa para correlacionar)
    sprint_id: contexto.sprintId || null,
    task_id: contexto.taskId || null,
    
    // Metadados
    service: 'genesis-pipeline',
    version: '1.0.0'
  };
  
  // Salvar no MongoDB
  await database.collection('logs').insertOne(logRecord);
  
  // Log local também (para debug)
  if (resultado.exitCode === 0) {
    logger.info({ spec_id: specId, iteration }, 'Execução bem sucedida');
  } else {
    logger.error({ spec_id: specId, iteration, stderr: resultado.stderr?.slice(0, 200) }, 'Execução falhou');
  }
  
  return logRecord;
}

/**
 * Log genérico (INFO, ERROR, etc)
 */
function log(level, message, context = {}) {
  logger[level]({ ...context, timestamp: new Date().toISOString() }, message);
}

module.exports = {
  logger,
  logExecution,
  log,
  getDb
};
```

### 2.3 Criar Índices no MongoDB

```javascript
// Executar uma vez no mongo shell ou via script
db.logs.createIndex({ spec_id: 1, iteration: -1 });
db.logs.createIndex({ timestamp: -1 });
db.logs.createIndex({ exit_code: 1 });
db.logs.createIndex({ sprint_id: 1 });
```

---

## 3. Schema: db.logs

```javascript
{
  // Identificação (obrigatório)
  _id: ObjectId,
  spec_id: String,           // "spec_001" - qual spec estava testando
  iteration: Number,         // 1, 2, 3... - tentativa
  
  // Output da execução (obrigatório)
  stdout: String,            // Saída padrão
  stderr: String,            // Saída de erro
  exit_code: Number,         // 0 = sucesso, != 0 = falha
  
  // Código (recomendado)
  code_snapshot: String,     // Código que rodou nessa iteração
  
  // Métricas (recomendado)
  duration_ms: Number,       // Tempo de execução
  timestamp: Date,           // Quando executou
  
  // Contexto (opcional mas útil)
  sprint_id: String,         // "S030"
  task_id: String,           // "T01"
  
  // Metadados (automático)
  service: String,           // "genesis-pipeline"
  version: String            // "1.0.0"
}
```

### Exemplo de Documento

```javascript
{
  _id: ObjectId("..."),
  spec_id: "spec_usuario_criar",
  iteration: 2,
  
  stdout: "Test started...\n",
  stderr: "AssertionError: expected 5 to equal 4\n    at Context.<anonymous> (test.js:15:10)",
  exit_code: 1,
  
  code_snapshot: "function criar(dados) {\n  return { id: 1, ...dados };\n}",
  
  duration_ms: 1523,
  timestamp: ISODate("2025-12-19T15:30:00Z"),
  
  sprint_id: "S030",
  task_id: "T03",
  
  service: "genesis-pipeline",
  version: "1.0.0"
}
```

---

## 4. Como Usar

### 4.1 Exemplo de Integração

```javascript
const { logExecution } = require('./utils/logger');
const { spawn } = require('child_process');

async function executarCodigo(specId, codigo, iteration, contexto) {
  const startTime = Date.now();
  
  // Salvar código em arquivo temporário
  const tempFile = `/tmp/test_${specId}_${iteration}.js`;
  fs.writeFileSync(tempFile, codigo);
  
  return new Promise((resolve) => {
    const child = spawn('node', [tempFile], {
      timeout: 60000  // 60 segundos
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => { stdout += data; });
    child.stderr.on('data', (data) => { stderr += data; });
    
    child.on('close', async (exitCode) => {
      const resultado = {
        stdout,
        stderr,
        exitCode,
        code: codigo,
        durationMs: Date.now() - startTime
      };
      
      // Salvar log para Claude ler
      await logExecution(specId, iteration, resultado, contexto);
      
      resolve(resultado);
    });
  });
}
```

### 4.2 Claude Consulta os Logs

Quando Leonardo (ou vocês) perguntarem sobre uma execução, Claude faz:

```javascript
// Claude executa via MCP:
mongodb:find({
  database: "genesis",
  collection: "logs",
  filter: { spec_id: "spec_usuario_criar" },
  sort: { iteration: -1 },
  limit: 5
})
```

E recebe os últimos 5 logs daquela spec para analisar.

---

## 5. Checklist de Implementação

| # | Tarefa | Comando/Ação |
|---|--------|--------------|
| 1 | Instalar Pino | `npm install pino pino-pretty --save` |
| 2 | Criar logger.js | Copiar código da seção 2.2 |
| 3 | Criar índices | Executar comandos da seção 2.3 |
| 4 | Testar insert | `await logExecution('test', 1, {stdout: 'ok', exitCode: 0})` |
| 5 | Verificar no Mongo | `db.logs.find({spec_id: 'test'})` |
| 6 | Avisar Leonardo | "Logs implementados, pode testar" |

**Tempo estimado:** 1-2 horas

---

## 6. Evolução Futura (Não Fazer Agora)

```
FASE 1 (AGORA) ✅
════════════════
Pino + MongoDB
• Claude lê logs via MCP
• Suficiente para debugar

FASE 2 (QUANDO PRECISAR)
════════════════════════
Adicionar visualização
• MongoDB Charts (grátis no Atlas)
• OU Grafana + plugin MongoDB

FASE 3 (SE ESCALAR)
═══════════════════
Stack dedicada
• SE múltiplos servidores → Grafana + Loki
• SE compliance pesado → Graylog
```

**Não instalar Graylog/Grafana agora.** Claude É a interface de visualização.

---

## 7. Decisões de Design

| Decisão | Escolha | Razão |
|---------|---------|-------|
| Ferramenta de log | Pino | Rápido, JSON nativo, leve |
| Persistência | MongoDB (genesis.logs) | Já temos, Claude já conecta |
| Interface | Claude via MCP | Zero infra nova |
| Graylog/Grafana | Não (por agora) | Overkill para o momento |

---

## 8. Contato

Dúvidas durante implementação:
- Abrir chat com Claude no projeto GENESIS
- Claude tem acesso a este documento e pode ajudar

---

## Referências

| Documento | Relação |
|-----------|---------|
| genesis/PROMETHEUS.md | Sistema pai |
| docs/04_P/MS_Prometheus_Pipeline.md | Pipeline de deploy (relacionado) |
| _sprints/S030_Pipeline_TDD.md | Sprint que originou este doc |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-19 | Documento inicial. Spec para time de infra. Sprint S030. |

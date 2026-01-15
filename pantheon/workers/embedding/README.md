# Workers de Embedding

Workers Camunda para pipeline de embeddings semânticos.

## Estrutura

```
workers/embedding/
├── base.js           # Worker base + conexões
├── config.js         # Configuração e env vars
├── logger.js         # Logger padronizado
└── README.md         # Este arquivo

database/
├── mongodb/
│   └── embeddings.js # Funções MongoDB
└── postgresql/
    └── embeddings.js # Funções pgvector
```

## Uso

### Criar um Worker

```javascript
const { createWorker } = require('./base');

createWorker('my-topic', async (task, taskService, { db, pg, logger, config }) => {
  // Obter variáveis do processo
  const job_id = task.variables.get('job_id');
  
  // Usar MongoDB
  const { jobs } = await db.getCollections();
  const job = await jobs.findOne({ job_id });
  
  // Usar PostgreSQL
  const result = await pg.query('SELECT * FROM embeddings.post_embeddings LIMIT 1');
  
  // Completar task
  await taskService.complete(task, { result: 'success' });
});
```

### Variáveis de Ambiente

#### Obrigatórias

| Variável | Descrição |
|----------|-----------|  
| `CAMUNDA_URL` | URL do Camunda Engine |
| `MONGODB_URI` | Connection string MongoDB |
| `POSTGRESQL_URI` | Connection string PostgreSQL |
| `OPENAI_API_KEY` | API key OpenAI |

#### Opcionais

| Variável | Default | Descrição |
|----------|---------|-----------|  
| `CAMUNDA_WORKER_ID` | `embedding-worker` | ID do worker |
| `CAMUNDA_MAX_TASKS` | `10` | Tasks simultâneas |
| `EMBEDDING_PROVIDER` | `openai` | Provider de embeddings |
| `EMBEDDING_MODEL` | `text-embedding-3-small` | Modelo |
| `LOG_LEVEL` | `info` | Nível de log |

## Links

- [SPEC MongoDB](https://mattermost.zaz.vc/mspantheon/pl/uadi6qj4btn89ea81pp56fwmay)
- [SPEC pgvector](https://mattermost.zaz.vc/mspantheon/pl/tki6xm1qspgimjayukgidtefay)
- [DMNs](https://github.com/ZAZ-Vendas/Zarah-Camunda/tree/main/Genesis/dmn)

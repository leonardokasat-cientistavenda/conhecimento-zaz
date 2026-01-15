/**
 * Configuração e validação de variáveis de ambiente
 * para workers de embedding
 * 
 * @module workers/embedding/config
 */

const requiredEnvVars = [
  'CAMUNDA_URL',
  'MONGODB_URI',
  'POSTGRESQL_URI',
  'OPENAI_API_KEY'
];

const optionalEnvVars = {
  CAMUNDA_WORKER_ID: 'embedding-worker',
  CAMUNDA_MAX_TASKS: '10',
  CAMUNDA_LONG_POLLING: '30000',
  EMBEDDING_PROVIDER: 'openai',
  EMBEDDING_MODEL: 'text-embedding-3-small',
  EMBEDDING_BATCH_SIZE: '100',
  LOG_LEVEL: 'info',
  MATTERMOST_URL: '',
  MATTERMOST_TOKEN: '',
  NOTIFICATION_CHANNEL: 'embedding-status'
};

/**
 * Valida variáveis de ambiente obrigatórias
 * @throws {Error} Se alguma variável obrigatória estiver faltando
 */
function validateEnv() {
  const missing = requiredEnvVars.filter(v => !process.env[v]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Carrega configuração com defaults
 * @returns {Object} Configuração completa
 */
function loadConfig() {
  // Aplica defaults para opcionais
  for (const [key, defaultValue] of Object.entries(optionalEnvVars)) {
    if (!process.env[key]) {
      process.env[key] = defaultValue;
    }
  }
  
  return {
    camunda: {
      url: process.env.CAMUNDA_URL,
      workerId: process.env.CAMUNDA_WORKER_ID,
      maxTasks: parseInt(process.env.CAMUNDA_MAX_TASKS, 10),
      longPolling: parseInt(process.env.CAMUNDA_LONG_POLLING, 10)
    },
    mongodb: {
      uri: process.env.MONGODB_URI,
      database: 'pantheon_embeddings'
    },
    postgresql: {
      uri: process.env.POSTGRESQL_URI
    },
    embedding: {
      provider: process.env.EMBEDDING_PROVIDER,
      model: process.env.EMBEDDING_MODEL,
      batchSize: parseInt(process.env.EMBEDDING_BATCH_SIZE, 10),
      apiKey: process.env.OPENAI_API_KEY
    },
    mattermost: {
      url: process.env.MATTERMOST_URL,
      token: process.env.MATTERMOST_TOKEN,
      notificationChannel: process.env.NOTIFICATION_CHANNEL
    },
    logLevel: process.env.LOG_LEVEL
  };
}

module.exports = {
  validateEnv,
  loadConfig,
  requiredEnvVars,
  optionalEnvVars
};

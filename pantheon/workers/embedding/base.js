/**
 * Worker Base para Camunda - Embedding Pipeline
 * 
 * Fornece estrutura base para todos os workers do pipeline
 * de embeddings com conexões a MongoDB, PostgreSQL e Camunda.
 * 
 * @module workers/embedding/base
 */

const { Client, logger: camundaLogger } = require('camunda-external-task-client-js');
const { MongoClient } = require('mongodb');
const { Pool } = require('pg');
const { validateEnv, loadConfig } = require('./config');
const { Logger } = require('./logger');

// Validar ambiente na inicialização
validateEnv();

// Carregar configuração
const config = loadConfig();

// Logger principal
const logger = new Logger('worker-base');

// ============================================
// CONEXÕES
// ============================================

// MongoDB Client (singleton)
let mongoClient = null;
let mongoDb = null;

async function getMongoDb() {
  if (!mongoClient) {
    logger.info('Conectando ao MongoDB...');
    mongoClient = new MongoClient(config.mongodb.uri);
    await mongoClient.connect();
    mongoDb = mongoClient.db(config.mongodb.database);
    logger.info('MongoDB conectado', { database: config.mongodb.database });
  }
  return mongoDb;
}

// PostgreSQL Pool (singleton)
let pgPool = null;

function getPgPool() {
  if (!pgPool) {
    logger.info('Criando pool PostgreSQL...');
    pgPool = new Pool({ connectionString: config.postgresql.uri });
    logger.info('Pool PostgreSQL criado');
  }
  return pgPool;
}

// ============================================
// COLLECTIONS MONGODB
// ============================================

async function getCollections() {
  const db = await getMongoDb();
  return {
    jobs: db.collection('embedding_jobs'),
    batches: db.collection('embedding_batches'),
    posts: db.collection('embedding_posts')
  };
}

// ============================================
// CLIENTE CAMUNDA
// ============================================

function createCamundaClient() {
  const client = new Client({
    baseUrl: config.camunda.url,
    workerId: config.camunda.workerId,
    maxTasks: config.camunda.maxTasks,
    longPolling: config.camunda.longPolling,
    use: (client, handler) => {
      // Middleware para logging
      return async (task) => {
        const taskLogger = new Logger(`task:${task.topicName}`);
        taskLogger.debug('Task recebida', { 
          taskId: task.id, 
          processInstanceId: task.processInstanceId 
        });
        
        try {
          await handler(task);
          taskLogger.debug('Task completada', { taskId: task.id });
        } catch (error) {
          taskLogger.error('Task falhou', { 
            taskId: task.id, 
            error: error.message 
          });
          throw error;
        }
      };
    }
  });
  
  return client;
}

// ============================================
// HELPER: CRIAR WORKER
// ============================================

/**
 * Cria um worker Camunda com estrutura padronizada
 * 
 * @param {string} topicName - Nome do tópico Camunda
 * @param {Function} handler - Função handler async (task, taskService, { db, pg, logger, config })
 * @returns {Object} Worker registrado
 * 
 * @example
 * createWorker('create-job', async (task, taskService, { db, logger }) => {
 *   const { jobs } = await db.getCollections();
 *   // ... lógica do worker
 *   await taskService.complete(task, { job_id: 'xxx' });
 * });
 */
function createWorker(topicName, handler) {
  const client = createCamundaClient();
  const workerLogger = new Logger(`worker:${topicName}`);
  
  workerLogger.info('Registrando worker', { topic: topicName });
  
  client.subscribe(topicName, async ({ task, taskService }) => {
    const startTime = Date.now();
    
    try {
      // Contexto para o handler
      const context = {
        db: {
          getMongoDb,
          getCollections,
          getPgPool
        },
        pg: getPgPool(),
        logger: workerLogger,
        config
      };
      
      await handler(task, taskService, context);
      
      const duration = Date.now() - startTime;
      workerLogger.info('Task processada', { 
        taskId: task.id, 
        duration: `${duration}ms` 
      });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      workerLogger.error('Erro no processamento', {
        taskId: task.id,
        error: error.message,
        stack: error.stack,
        duration: `${duration}ms`
      });
      
      // Reportar falha ao Camunda
      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: 5000
      });
    }
  });
  
  return client;
}

// ============================================
// HELPERS UTILITÁRIOS
// ============================================

/**
 * Gera hash SHA256 de conteúdo
 */
const crypto = require('crypto');

function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Conta tokens aproximados (estimativa simples)
 */
function estimateTokens(text) {
  // Aproximação: ~4 caracteres por token
  return Math.ceil(text.length / 4);
}

/**
 * Extrai variáveis do task
 */
function getVariables(task, keys) {
  const variables = {};
  for (const key of keys) {
    variables[key] = task.variables.get(key);
  }
  return variables;
}

// ============================================
// CLEANUP
// ============================================

async function cleanup() {
  logger.info('Encerrando conexões...');
  
  if (mongoClient) {
    await mongoClient.close();
    logger.info('MongoDB desconectado');
  }
  
  if (pgPool) {
    await pgPool.end();
    logger.info('PostgreSQL pool encerrado');
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await cleanup();
  process.exit(0);
});

// ============================================
// EXPORTS
// ============================================

module.exports = {
  // Conexões
  getMongoDb,
  getCollections,
  getPgPool,
  
  // Camunda
  createCamundaClient,
  createWorker,
  
  // Helpers
  hashContent,
  estimateTokens,
  getVariables,
  
  // Config
  config,
  
  // Logger
  Logger,
  logger,
  
  // Cleanup
  cleanup
};

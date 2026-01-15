/**
 * Worker: create-job
 * Cria job de embedding no MongoDB
 * 
 * Topic: embedding-create-job
 * 
 * Input Variables:
 *   - team_ids: string[] (opcional)
 *   - channel_ids: string[] (opcional)
 *   - since_date: string (opcional)
 *   - until_date: string (opcional)
 *   - provider: string (default: 'openai')
 *   - model: string (default: 'text-embedding-3-small')
 * 
 * Output Variables:
 *   - job_id: string
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-create-job';

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  logger.info('Criando job de embedding...');
  
  // Extrair variáveis do processo
  const variables = getVariables(task, [
    'team_ids',
    'channel_ids', 
    'since_date',
    'until_date',
    'provider',
    'model'
  ]);
  
  // Configuração do job
  const jobConfig = {
    team_ids: variables.team_ids || [],
    channel_ids: variables.channel_ids || [],
    since_date: variables.since_date || null,
    until_date: variables.until_date || null,
    provider: variables.provider || config.embedding.provider,
    model: variables.model || config.embedding.model
  };
  
  logger.debug('Job config', jobConfig);
  
  // Conectar ao MongoDB
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  
  // Criar job
  const job_id = await mongoDb.createJob(jobConfig);
  
  logger.info('Job criado', { job_id });
  
  // Completar task com job_id
  await taskService.complete(task, {
    job_id
  });
});

module.exports = { TOPIC };

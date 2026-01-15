/**
 * Worker: fetch-posts
 * Busca posts do Mattermost para indexação
 * 
 * Topic: embedding-fetch-posts
 * 
 * Input Variables:
 *   - job_id: string
 * 
 * Output Variables:
 *   - total_posts: number
 *   - posts: array (serializado)
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-fetch-posts';

// Cliente Mattermost (placeholder - implementar conforme SDK usado)
async function fetchMattermostPosts(config, jobConfig) {
  // TODO: Implementar busca real no Mattermost
  // Por enquanto, retorna array vazio para testes
  
  const { team_ids, channel_ids, since_date, until_date } = jobConfig;
  
  // Placeholder: buscar posts via API Mattermost
  // const posts = await mattermostClient.getPosts({ ... });
  
  return [];
}

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const { job_id } = getVariables(task, ['job_id']);
  
  logger.info('Buscando posts do Mattermost', { job_id });
  
  // Conectar ao MongoDB
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  
  // Buscar job para pegar config
  const job = await mongoDb.getJob(job_id);
  if (!job) {
    throw new Error(`Job não encontrado: ${job_id}`);
  }
  
  // Atualizar status para processing
  await mongoDb.updateJobStatus(job_id, 'processing');
  
  // Buscar posts do Mattermost
  const posts = await fetchMattermostPosts(config, job.config);
  
  logger.info('Posts encontrados', { 
    job_id, 
    total: posts.length 
  });
  
  // Atualizar stats do job
  await mongoDb.incrementJobStats(job_id, {
    total_posts: posts.length
  });
  
  // Completar task
  await taskService.complete(task, {
    total_posts: posts.length,
    posts: JSON.stringify(posts)
  });
});

module.exports = { TOPIC };

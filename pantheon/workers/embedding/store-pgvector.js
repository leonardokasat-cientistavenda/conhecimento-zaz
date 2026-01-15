/**
 * Worker: store-pgvector
 * Persiste embeddings no PostgreSQL/pgvector
 * 
 * Topic: embedding-store-pgvector
 * 
 * Input Variables:
 *   - job_id: string
 *   - batch_id: string
 *   - embeddings: string (JSON array)
 * 
 * Output Variables:
 *   - embeddings_stored: number
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');
const pgDb = require('../../database/postgresql/embeddings');

const TOPIC = 'embedding-store-pgvector';

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const { job_id, batch_id, embeddings: embeddingsJson } = getVariables(task, [
    'job_id', 
    'batch_id',
    'embeddings'
  ]);
  
  logger.info('Armazenando embeddings no pgvector', { job_id, batch_id });
  
  // Parse embeddings
  const embeddings = JSON.parse(embeddingsJson || '[]');
  
  if (embeddings.length === 0) {
    logger.warn('Nenhum embedding para armazenar', { batch_id });
    await taskService.complete(task, { embeddings_stored: 0 });
    return;
  }
  
  // Conectar aos bancos
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  pgDb.connect(config.postgresql.uri);
  
  // Buscar batch para dados dos posts
  const batch = await mongoDb.getBatch(batch_id);
  const job = await mongoDb.getJob(job_id);
  const { provider, model } = job.config;
  
  // Preparar items para batch upsert
  const items = batch.posts.map((post, index) => ({
    post_id: post.post_id,
    channel_id: post.channel_id,
    embedding: embeddings[index],
    provider,
    model,
    token_count: post.token_count,
    content_hash: post.content_hash || null,
    metadata: {
      source: 'batch',
      job_id,
      batch_id
    }
  }));
  
  // Upsert em batch
  const stored = await pgDb.batchUpsert(items);
  
  logger.info('Embeddings armazenados', {
    batch_id,
    stored
  });
  
  // Atualizar status dos posts no MongoDB
  for (const post of batch.posts) {
    await mongoDb.updatePostStatus(
      post.post_id,
      provider,
      model,
      'indexed'
    );
  }
  
  // Atualizar batch
  await mongoDb.updateBatch(batch_id, {
    'result.embeddings_stored': stored
  });
  
  // Atualizar stats do job
  await mongoDb.incrementJobStats(job_id, {
    processed_posts: stored
  });
  
  // Completar task
  await taskService.complete(task, {
    embeddings_stored: stored
  });
});

module.exports = { TOPIC };

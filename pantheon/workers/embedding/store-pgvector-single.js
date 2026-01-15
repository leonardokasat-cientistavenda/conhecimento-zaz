/**
 * Worker: store-pgvector-single
 * Armazena embedding de um único post no pgvector (Speed Layer)
 * 
 * Topic: embedding-store-pgvector-single
 * 
 * Input Variables:
 *   - post_id: string
 *   - channel_id: string
 *   - embedding: string (JSON array)
 *   - content_hash: string
 *   - token_count: number
 * 
 * Output Variables:
 *   - stored: boolean
 *   - embedding_id: number
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');
const pgDb = require('../../database/postgresql/embeddings');

const TOPIC = 'embedding-store-pgvector-single';

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const variables = getVariables(task, [
    'post_id',
    'channel_id',
    'embedding',
    'content_hash',
    'token_count'
  ]);
  
  const { post_id, channel_id, embedding: embeddingJson, content_hash, token_count } = variables;
  
  logger.info('Armazenando embedding single', { post_id });
  
  // Skip se embedding vazio
  if (!embeddingJson) {
    logger.warn('Embedding vazio, skip', { post_id });
    await taskService.complete(task, {
      stored: false,
      embedding_id: null
    });
    return;
  }
  
  // Parse embedding
  const embedding = JSON.parse(embeddingJson);
  
  // Conectar aos bancos
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  pgDb.connect(config.postgresql.uri);
  
  // Upsert no pgvector
  const embedding_id = await pgDb.upsertEmbedding({
    post_id,
    channel_id,
    embedding,
    provider: config.embedding.provider,
    model: config.embedding.model,
    token_count,
    content_hash,
    metadata: {
      source: 'speed',
      indexed_at: new Date().toISOString()
    }
  });
  
  logger.info('Embedding armazenado', { post_id, embedding_id });
  
  // Atualizar status no MongoDB
  await mongoDb.updatePostStatus(
    post_id,
    config.embedding.provider,
    config.embedding.model,
    'indexed'
  );
  
  // Completar task
  await taskService.complete(task, {
    stored: true,
    embedding_id
  });
});

module.exports = { TOPIC };

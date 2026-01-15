/**
 * Worker: prepare-batches
 * Divide posts em batches para processamento
 * 
 * Topic: embedding-prepare-batches
 * 
 * Input Variables:
 *   - job_id: string
 *   - posts: string (JSON array)
 *   - total_posts: number
 * 
 * Output Variables:
 *   - batch_ids: string[] 
 *   - total_batches: number
 */

const { createWorker, getVariables, estimateTokens, hashContent } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-prepare-batches';

// Configuração de batching
const MAX_TOKENS_PER_BATCH = 8000; // ~8k tokens por batch (margem de segurança)
const MAX_POSTS_PER_BATCH = 100;   // Máximo de posts por batch

/**
 * Divide posts em batches respeitando limites de tokens
 */
function splitIntoBatches(posts, maxTokens = MAX_TOKENS_PER_BATCH, maxPosts = MAX_POSTS_PER_BATCH) {
  const batches = [];
  let currentBatch = [];
  let currentTokens = 0;
  
  for (const post of posts) {
    const tokenCount = post.token_count || estimateTokens(post.content || '');
    
    // Se adicionar este post ultrapassa limites, fecha batch atual
    if (currentBatch.length >= maxPosts || 
        (currentTokens + tokenCount > maxTokens && currentBatch.length > 0)) {
      batches.push(currentBatch);
      currentBatch = [];
      currentTokens = 0;
    }
    
    currentBatch.push({
      ...post,
      token_count: tokenCount
    });
    currentTokens += tokenCount;
  }
  
  // Último batch
  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }
  
  return batches;
}

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const { job_id, posts: postsJson, total_posts } = getVariables(task, [
    'job_id', 
    'posts',
    'total_posts'
  ]);
  
  logger.info('Preparando batches', { job_id, total_posts });
  
  // Parse posts
  const posts = JSON.parse(postsJson || '[]');
  
  if (posts.length === 0) {
    logger.warn('Nenhum post para processar', { job_id });
    await taskService.complete(task, {
      batch_ids: [],
      total_batches: 0
    });
    return;
  }
  
  // Conectar ao MongoDB
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  
  // Buscar job para pegar provider/model
  const job = await mongoDb.getJob(job_id);
  const { provider, model } = job.config;
  
  // Preparar posts com hash e token count
  const preparedPosts = posts.map(p => ({
    post_id: p.id,
    channel_id: p.channel_id,
    content: p.message,
    content_hash: hashContent(p.message || ''),
    token_count: estimateTokens(p.message || '')
  }));
  
  // Dividir em batches
  const batches = splitIntoBatches(preparedPosts);
  
  logger.info('Batches preparados', { 
    job_id, 
    total_batches: batches.length,
    posts_per_batch: batches.map(b => b.length)
  });
  
  // Criar batches no MongoDB
  const batch_ids = [];
  for (let i = 0; i < batches.length; i++) {
    const batch_id = await mongoDb.createBatch(job_id, i + 1, batches[i]);
    batch_ids.push(batch_id);
    
    // Criar registros de posts
    for (const post of batches[i]) {
      await mongoDb.createBatchPost({
        post_id: post.post_id,
        channel_id: post.channel_id,
        batch_id,
        job_id,
        content_hash: post.content_hash,
        token_count: post.token_count,
        provider,
        model,
        status: 'pending'
      });
    }
  }
  
  // Atualizar stats do job
  await mongoDb.incrementJobStats(job_id, {
    total_batches: batches.length
  });
  
  // Completar task
  await taskService.complete(task, {
    batch_ids,
    total_batches: batches.length
  });
});

module.exports = { TOPIC, splitIntoBatches };

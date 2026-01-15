/**
 * Worker: generate-embed
 * Gera embeddings via OpenAI API
 * 
 * Topic: embedding-generate-embed
 * 
 * Input Variables:
 *   - job_id: string
 *   - batch_id: string
 * 
 * Output Variables:
 *   - embeddings_generated: number
 *   - tokens_used: number
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-generate-embed';

/**
 * Chama API de embeddings
 * Suporta múltiplos providers via config
 */
async function generateEmbeddings(texts, config) {
  const { provider, model, apiKey } = config;
  
  if (provider === 'openai') {
    return generateOpenAIEmbeddings(texts, model, apiKey);
  }
  
  throw new Error(`Provider não suportado: ${provider}`);
}

/**
 * Gera embeddings via OpenAI
 */
async function generateOpenAIEmbeddings(texts, model, apiKey) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: texts
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  
  return {
    embeddings: data.data.map(d => d.embedding),
    tokens_used: data.usage?.total_tokens || 0
  };
}

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const { job_id, batch_id } = getVariables(task, ['job_id', 'batch_id']);
  
  logger.info('Gerando embeddings', { job_id, batch_id });
  
  // Conectar ao MongoDB
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  
  // Buscar batch
  const batch = await mongoDb.getBatch(batch_id);
  if (!batch) {
    throw new Error(`Batch não encontrado: ${batch_id}`);
  }
  
  // Buscar job para config
  const job = await mongoDb.getJob(job_id);
  const { provider, model } = job.config;
  
  // Atualizar status do batch
  await mongoDb.updateBatchStatus(batch_id, 'processing');
  
  // Extrair textos dos posts
  const texts = batch.posts.map(p => p.content);
  
  // Gerar embeddings
  const startTime = Date.now();
  const { embeddings, tokens_used } = await generateEmbeddings(texts, {
    provider,
    model,
    apiKey: config.embedding.apiKey
  });
  const duration = Date.now() - startTime;
  
  logger.info('Embeddings gerados', {
    batch_id,
    count: embeddings.length,
    tokens_used,
    duration_ms: duration
  });
  
  // Atualizar batch com resultado parcial (embeddings ficam em memória para próximo worker)
  await mongoDb.updateBatch(batch_id, {
    'result.embeddings_generated': embeddings.length,
    'result.tokens_used': tokens_used,
    'result.duration_ms': duration
  });
  
  // Atualizar stats do job
  await mongoDb.incrementJobStats(job_id, {
    total_tokens: tokens_used
  });
  
  // Completar task com embeddings para próximo worker
  await taskService.complete(task, {
    embeddings_generated: embeddings.length,
    tokens_used,
    embeddings: JSON.stringify(embeddings)
  });
});

module.exports = { TOPIC, generateEmbeddings };

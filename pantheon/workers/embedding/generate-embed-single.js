/**
 * Worker: generate-embed-single
 * Gera embedding para um único post (Speed Layer)
 * 
 * Topic: embedding-generate-embed-single
 * 
 * Input Variables:
 *   - post_id: string
 *   - channel_id: string
 *   - processed_content: string
 *   - content_hash: string
 *   - token_count: number
 * 
 * Output Variables:
 *   - embedding: array
 *   - tokens_used: number
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-generate-embed-single';

/**
 * Gera embedding via OpenAI
 */
async function generateSingleEmbedding(text, config) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      input: text
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  
  return {
    embedding: data.data[0].embedding,
    tokens_used: data.usage?.total_tokens || 0
  };
}

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const variables = getVariables(task, [
    'post_id',
    'channel_id',
    'processed_content',
    'content_hash',
    'token_count'
  ]);
  
  const { post_id, processed_content } = variables;
  
  logger.info('Gerando embedding single', { post_id });
  
  // Skip se conteúdo vazio
  if (!processed_content) {
    logger.warn('Conteúdo vazio, skip', { post_id });
    await taskService.complete(task, {
      embedding: null,
      tokens_used: 0
    });
    return;
  }
  
  // Gerar embedding
  const { embedding, tokens_used } = await generateSingleEmbedding(
    processed_content,
    {
      model: config.embedding.model,
      apiKey: config.embedding.apiKey
    }
  );
  
  logger.info('Embedding gerado', {
    post_id,
    dimensions: embedding.length,
    tokens_used
  });
  
  // Completar task
  await taskService.complete(task, {
    embedding: JSON.stringify(embedding),
    tokens_used
  });
});

module.exports = { TOPIC, generateSingleEmbedding };

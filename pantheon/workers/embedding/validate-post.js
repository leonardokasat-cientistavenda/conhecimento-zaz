/**
 * Worker: validate-post
 * Valida se post deve ser indexado (Speed Layer)
 * Usa DMN post_validation para regras
 * 
 * Topic: embedding-validate-post
 * 
 * Input Variables:
 *   - post_id: string
 *   - channel_id: string
 *   - content: string
 *   - is_streaming: boolean
 * 
 * Output Variables:
 *   - valid: boolean
 *   - skip_reason: string (se não válido)
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-validate-post';

/**
 * Valida post conforme regras da DMN
 * (Implementação local - DMN será chamada pelo Camunda)
 */
function validatePost(data) {
  const { content, is_streaming, is_bot, is_system } = data;
  const message_length = (content || '').length;
  
  // Regras da DMN post_validation
  if (is_streaming) {
    return { valid: false, skip_reason: 'streaming_active' };
  }
  
  if (is_system) {
    return { valid: false, skip_reason: 'system_post' };
  }
  
  if (message_length < 10) {
    return { valid: false, skip_reason: 'too_short' };
  }
  
  if (is_bot && message_length < 500) {
    return { valid: false, skip_reason: 'bot_post_short' };
  }
  
  return { valid: true, skip_reason: null };
}

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const variables = getVariables(task, [
    'post_id',
    'channel_id', 
    'content',
    'is_streaming',
    'is_bot',
    'is_system'
  ]);
  
  logger.info('Validando post', { post_id: variables.post_id });
  
  // Validar
  const { valid, skip_reason } = validatePost(variables);
  
  logger.info('Resultado validação', { 
    post_id: variables.post_id,
    valid,
    skip_reason
  });
  
  // Se não válido, marcar no MongoDB
  if (!valid) {
    await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
    await mongoDb.skipPost(
      variables.post_id,
      config.embedding.provider,
      config.embedding.model,
      skip_reason
    );
  }
  
  // Completar task
  await taskService.complete(task, {
    valid,
    skip_reason
  });
});

module.exports = { TOPIC, validatePost };

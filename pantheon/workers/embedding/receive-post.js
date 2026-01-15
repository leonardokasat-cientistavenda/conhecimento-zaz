/**
 * Worker: receive-post
 * Recebe post do WebSocket para indexação real-time (Speed Layer)
 * 
 * Topic: embedding-receive-post
 * 
 * Input Variables (via Message Start):
 *   - post_id: string
 *   - channel_id: string
 *   - message: string
 *   - user_id: string
 *   - props: object (contém streaming flag)
 *   - create_at: number
 *   - update_at: number
 * 
 * Output Variables:
 *   - should_process: boolean
 *   - skip_reason: string (se não processar)
 *   - content_hash: string
 *   - is_edit: boolean
 */

const { createWorker, getVariables, hashContent, estimateTokens } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-receive-post';

/**
 * Valida se post deve ser processado
 */
function validatePost(post) {
  // Skip: posts de sistema
  if (post.type && post.type !== '') {
    return { valid: false, reason: 'system_post' };
  }
  
  // Skip: posts muito curtos
  if (!post.message || post.message.length < 10) {
    return { valid: false, reason: 'too_short' };
  }
  
  // Skip: streaming ativo (props.streaming = true)
  if (post.props?.streaming === true) {
    return { valid: false, reason: 'streaming_active' };
  }
  
  // Skip: bot posts curtos (< 500 chars)
  if (post.props?.from_bot === true && post.message.length < 500) {
    return { valid: false, reason: 'bot_post_short' };
  }
  
  return { valid: true, reason: null };
}

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const variables = getVariables(task, [
    'post_id',
    'channel_id',
    'message',
    'user_id',
    'props',
    'create_at',
    'update_at'
  ]);
  
  const { post_id, channel_id, message, props, create_at, update_at } = variables;
  
  logger.info('Post recebido (Speed Layer)', { post_id, channel_id });
  
  // Validar post
  const validation = validatePost({ message, props, type: variables.type });
  
  if (!validation.valid) {
    logger.debug('Post ignorado', { post_id, reason: validation.reason });
    
    await taskService.complete(task, {
      should_process: false,
      skip_reason: validation.reason
    });
    return;
  }
  
  // Conectar ao MongoDB
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  
  // Calcular hash do conteúdo
  const content_hash = hashContent(message);
  const token_count = estimateTokens(message);
  
  // Verificar se é edição (update_at > create_at)
  const is_edit = update_at && create_at && update_at > create_at;
  
  // Verificar se conteúdo mudou (para edições)
  const provider = config.embedding.provider;
  const model = config.embedding.model;
  
  const contentChanged = await mongoDb.checkContentChanged(
    post_id, 
    content_hash, 
    provider, 
    model
  );
  
  if (!contentChanged) {
    logger.debug('Conteúdo não mudou, ignorando', { post_id });
    
    await taskService.complete(task, {
      should_process: false,
      skip_reason: 'content_unchanged'
    });
    return;
  }
  
  // Buscar post existente para tracking de edição
  const existingPost = await mongoDb.getPost(post_id, provider, model);
  const previous_hash = existingPost?.content_hash || null;
  
  // Criar/atualizar registro no MongoDB (Speed Layer)
  await mongoDb.createSpeedPost({
    post_id,
    channel_id,
    content_hash,
    token_count,
    provider,
    model,
    status: 'pending',
    is_edit,
    previous_hash,
    metadata: {
      content_type: is_edit ? 'edit' : 'post',
      has_attachments: !!(props?.attachments?.length),
      user_id: variables.user_id
    }
  });
  
  logger.info('Post registrado para processamento', {
    post_id,
    is_edit,
    token_count
  });
  
  // Completar task
  await taskService.complete(task, {
    should_process: true,
    skip_reason: null,
    content_hash,
    is_edit,
    token_count,
    provider,
    model
  });
});

module.exports = { TOPIC, validatePost };

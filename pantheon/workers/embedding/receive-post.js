/**
 * Worker: receive-post
 * Recebe post do WebSocket para indexação real-time (Speed Layer)
 * 
 * Topic: embedding-receive-post
 * 
 * Input Variables:
 *   - post: object (post do Mattermost)
 * 
 * Output Variables:
 *   - post_id: string
 *   - channel_id: string
 *   - is_edit: boolean
 *   - is_streaming: boolean
 *   - content_hash: string
 */

const { createWorker, getVariables, hashContent } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-receive-post';

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const { post: postJson } = getVariables(task, ['post']);
  
  // Parse post
  const post = typeof postJson === 'string' ? JSON.parse(postJson) : postJson;
  
  logger.info('Post recebido', { 
    post_id: post.id,
    channel_id: post.channel_id
  });
  
  // Detectar se é streaming
  const is_streaming = post.props?.streaming === true;
  
  // Detectar se é edição
  const is_edit = post.edit_at > 0;
  
  // Calcular hash do conteúdo
  const content_hash = hashContent(post.message || '');
  
  // Conectar ao MongoDB
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  
  // Verificar se post já existe
  const existingPost = await mongoDb.getPost(
    post.id, 
    config.embedding.provider, 
    config.embedding.model
  );
  
  // Criar/atualizar registro no MongoDB
  if (is_edit && existingPost) {
    // Marcar como editado
    await mongoDb.markPostEdited(
      post.id,
      config.embedding.provider,
      config.embedding.model,
      content_hash,
      existingPost.content_hash
    );
    logger.info('Post marcado como editado', { post_id: post.id });
  } else {
    // Criar novo registro
    await mongoDb.createSpeedPost({
      post_id: post.id,
      channel_id: post.channel_id,
      content_hash,
      token_count: Math.ceil((post.message || '').length / 4),
      provider: config.embedding.provider,
      model: config.embedding.model,
      status: is_streaming ? 'streaming' : 'pending',
      metadata: {
        content_type: post.root_id ? 'reply' : 'post',
        has_attachments: (post.file_ids || []).length > 0,
        user_id: post.user_id
      }
    });
  }
  
  // Completar task
  await taskService.complete(task, {
    post_id: post.id,
    channel_id: post.channel_id,
    is_edit,
    is_streaming,
    content_hash,
    content: post.message
  });
});

module.exports = { TOPIC };

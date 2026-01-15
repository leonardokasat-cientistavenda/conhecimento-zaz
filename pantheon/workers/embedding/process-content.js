/**
 * Worker: process-content
 * Processa conteúdo do post (limpeza, chunking)
 * Usa DMN content_strategy para estratégia
 * 
 * Topic: embedding-process-content
 * 
 * Input Variables:
 *   - post_id: string
 *   - content: string
 *   - content_hash: string
 * 
 * Output Variables:
 *   - processed_content: string
 *   - token_count: number
 *   - strategy: string
 */

const { createWorker, getVariables, estimateTokens, hashContent } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');
const pgDb = require('../../database/postgresql/embeddings');

const TOPIC = 'embedding-process-content';

/**
 * Remove blocos de código para embedding mais limpo
 */
function cleanCode(text) {
  // Remove blocos de código
  let cleaned = text.replace(/```[\s\S]*?```/g, '[CODE_BLOCK]');
  // Remove código inline
  cleaned = cleaned.replace(/`[^`]+`/g, '[CODE]');
  return cleaned;
}

/**
 * Determina estratégia de processamento
 * (Implementação local - DMN content_strategy)
 */
function getStrategy(content, hasCode) {
  const tokenCount = estimateTokens(content);
  
  if (tokenCount < 100) {
    return { strategy: 'direct', chunk_size: 0, overlap: 0, clean_code: false };
  }
  
  if (tokenCount <= 2000 && !hasCode) {
    return { strategy: 'direct', chunk_size: 0, overlap: 0, clean_code: false };
  }
  
  if (tokenCount <= 2000 && hasCode) {
    return { strategy: 'direct', chunk_size: 0, overlap: 0, clean_code: true };
  }
  
  // Posts longos
  return { 
    strategy: 'chunk', 
    chunk_size: 1500, 
    overlap: 200, 
    clean_code: hasCode 
  };
}

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const { post_id, content, content_hash } = getVariables(task, [
    'post_id',
    'content',
    'content_hash'
  ]);
  
  logger.info('Processando conteúdo', { post_id });
  
  // Conectar aos bancos
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  pgDb.connect(config.postgresql.uri);
  
  // Verificar se conteúdo mudou (idempotência)
  const changed = await pgDb.checkContentChanged(
    post_id,
    content_hash,
    config.embedding.provider,
    config.embedding.model
  );
  
  if (!changed) {
    logger.info('Conteúdo não mudou, skip', { post_id });
    await taskService.complete(task, {
      processed_content: null,
      token_count: 0,
      strategy: 'skip',
      skip_reason: 'content_unchanged'
    });
    return;
  }
  
  // Detectar código
  const hasCode = /```|`[^`]+`/.test(content);
  
  // Determinar estratégia
  const strategyConfig = getStrategy(content, hasCode);
  
  // Processar conteúdo
  let processed = content;
  if (strategyConfig.clean_code) {
    processed = cleanCode(content);
  }
  
  const token_count = estimateTokens(processed);
  
  logger.info('Conteúdo processado', {
    post_id,
    strategy: strategyConfig.strategy,
    token_count,
    clean_code: strategyConfig.clean_code
  });
  
  // Atualizar MongoDB
  await mongoDb.updatePostStatus(
    post_id,
    config.embedding.provider,
    config.embedding.model,
    'processing',
    { token_count }
  );
  
  // Completar task
  await taskService.complete(task, {
    processed_content: processed,
    token_count,
    strategy: strategyConfig.strategy
  });
});

module.exports = { TOPIC, cleanCode, getStrategy };

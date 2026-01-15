/**
 * Worker: process-content
 * Processa conteúdo do post (limpeza, chunking se necessário)
 * 
 * Topic: embedding-process-content
 * 
 * Input Variables:
 *   - post_id: string
 *   - message: string
 *   - token_count: number
 * 
 * Output Variables:
 *   - processed_content: string
 *   - chunks: string[] (se chunking necessário)
 *   - strategy: string (direct, chunk, section)
 */

const { createWorker, getVariables, estimateTokens } = require('./base');

const TOPIC = 'embedding-process-content';

// Limites de chunking (alinhado com DMN content_strategy)
const MAX_TOKENS_DIRECT = 2000;
const CHUNK_SIZE = 1500;
const CHUNK_OVERLAP = 200;

/**
 * Remove código excessivo mantendo contexto
 */
function cleanCode(text) {
  // Substitui blocos de código longos por placeholder
  return text.replace(/```[\s\S]{500,}?```/g, '[código removido]');
}

/**
 * Detecta se tem código
 */
function hasCode(text) {
  return /```/.test(text) || /`[^`]+`/.test(text);
}

/**
 * Divide texto em chunks com overlap
 */
function chunkText(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const chunks = [];
  let start = 0;
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize * 4, text.length); // ~4 chars per token
    chunks.push(text.slice(start, end));
    start = end - (overlap * 4);
    
    if (start >= text.length - 100) break; // Evita chunks muito pequenos
  }
  
  return chunks;
}

createWorker(TOPIC, async (task, taskService, { logger }) => {
  const { post_id, message, token_count } = getVariables(task, [
    'post_id',
    'message',
    'token_count'
  ]);
  
  logger.debug('Processando conteúdo', { post_id, token_count });
  
  let processed_content = message || '';
  let chunks = [];
  let strategy = 'direct';
  
  const tokens = token_count || estimateTokens(processed_content);
  const containsCode = hasCode(processed_content);
  
  // Determinar estratégia (espelho do DMN content_strategy)
  if (tokens < 100) {
    // Posts curtos: direto
    strategy = 'direct';
  } else if (tokens <= MAX_TOKENS_DIRECT) {
    // Posts normais
    strategy = 'direct';
    if (containsCode) {
      processed_content = cleanCode(processed_content);
    }
  } else {
    // Posts longos: chunking
    strategy = 'chunk';
    if (containsCode) {
      processed_content = cleanCode(processed_content);
    }
    chunks = chunkText(processed_content, CHUNK_SIZE, CHUNK_OVERLAP);
  }
  
  logger.debug('Processamento concluído', {
    post_id,
    strategy,
    chunks_count: chunks.length,
    original_tokens: tokens,
    processed_length: processed_content.length
  });
  
  await taskService.complete(task, {
    processed_content,
    chunks: JSON.stringify(chunks),
    strategy
  });
});

module.exports = { TOPIC, cleanCode, hasCode, chunkText };

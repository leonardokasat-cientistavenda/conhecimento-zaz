/**
 * Funções de acesso ao PostgreSQL/pgvector para embeddings
 * 
 * @module database/postgresql/embeddings
 */

const { Pool } = require('pg');
const crypto = require('crypto');

let pool = null;

/**
 * Inicializa pool de conexões
 */
function connect(uri) {
  if (!pool) {
    pool = new Pool({ connectionString: uri });
  }
  return pool;
}

/**
 * Retorna pool existente
 */
function getPool() {
  if (!pool) throw new Error('PostgreSQL não conectado. Chame connect() primeiro.');
  return pool;
}

/**
 * Gera hash SHA256
 */
function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

// ============================================
// FUNÇÕES PRINCIPAIS
// ============================================

/**
 * Verifica se conteúdo mudou (para Speed Layer)
 * 
 * @param {string} post_id - ID do post
 * @param {string} content_hash - Hash SHA256 do conteúdo atual
 * @param {string} provider - Provider de embeddings
 * @param {string} model - Modelo de embeddings
 * @returns {boolean} true se precisa re-indexar
 */
async function checkContentChanged(post_id, content_hash, provider = 'openai', model = 'text-embedding-3-small') {
  const result = await pool.query(
    'SELECT embeddings.check_content_changed($1, $2, $3, $4)',
    [post_id, content_hash, provider, model]
  );
  return result.rows[0].check_content_changed;
}

/**
 * Upsert de embedding
 * 
 * @param {Object} data - Dados do embedding
 * @returns {number} ID do registro
 */
async function upsertEmbedding({
  post_id,
  channel_id,
  embedding,
  provider = 'openai',
  model = 'text-embedding-3-small',
  token_count = null,
  content_hash = null,
  metadata = {}
}) {
  // Formata vetor para pgvector
  const vectorStr = Array.isArray(embedding) 
    ? `[${embedding.join(',')}]` 
    : embedding;
  
  const result = await pool.query(
    'SELECT embeddings.upsert_embedding($1, $2, $3::vector, $4, $5, $6, $7, $8::jsonb)',
    [
      post_id,
      channel_id,
      vectorStr,
      provider,
      model,
      token_count,
      content_hash,
      JSON.stringify(metadata)
    ]
  );
  
  return result.rows[0].upsert_embedding;
}

/**
 * Busca semântica
 * 
 * @param {Object} options - Opções de busca
 * @returns {Array} Posts similares
 */
async function semanticSearch({
  embedding,
  limit = 10,
  threshold = 0.7,
  provider = 'openai',
  model = 'text-embedding-3-small',
  channels = null
}) {
  // Formata vetor para pgvector
  const vectorStr = Array.isArray(embedding) 
    ? `[${embedding.join(',')}]` 
    : embedding;
  
  const result = await pool.query(
    'SELECT * FROM embeddings.semantic_search($1::vector, $2, $3, $4, $5, $6)',
    [vectorStr, limit, threshold, provider, model, channels]
  );
  
  return result.rows;
}

/**
 * Busca embedding existente por post_id
 */
async function getEmbedding(post_id, provider = 'openai', model = 'text-embedding-3-small') {
  const result = await pool.query(
    `SELECT * FROM embeddings.post_embeddings 
     WHERE post_id = $1 AND provider = $2 AND model = $3`,
    [post_id, provider, model]
  );
  return result.rows[0] || null;
}

/**
 * Conta embeddings por canal
 */
async function countByChannel(channel_id = null) {
  let query = 'SELECT COUNT(*) as count FROM embeddings.post_embeddings';
  const params = [];
  
  if (channel_id) {
    query += ' WHERE channel_id = $1';
    params.push(channel_id);
  }
  
  const result = await pool.query(query, params);
  return parseInt(result.rows[0].count, 10);
}

/**
 * Estatísticas gerais
 */
async function getStats() {
  const result = await pool.query(`
    SELECT 
      COUNT(*) as total_embeddings,
      COUNT(DISTINCT post_id) as unique_posts,
      COUNT(DISTINCT channel_id) as unique_channels,
      SUM(token_count) as total_tokens,
      AVG(token_count) as avg_tokens_per_post
    FROM embeddings.post_embeddings
  `);
  
  return result.rows[0];
}

/**
 * Deleta embedding por post_id
 */
async function deleteEmbedding(post_id, provider = 'openai', model = 'text-embedding-3-small') {
  const result = await pool.query(
    `DELETE FROM embeddings.post_embeddings 
     WHERE post_id = $1 AND provider = $2 AND model = $3
     RETURNING id`,
    [post_id, provider, model]
  );
  return result.rowCount > 0;
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Insere múltiplos embeddings em batch
 * 
 * @param {Array} items - Array de {post_id, channel_id, embedding, ...}
 * @returns {number} Quantidade inserida
 */
async function batchUpsert(items) {
  let count = 0;
  
  // Usa transação para atomicidade
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    for (const item of items) {
      await client.query(
        'SELECT embeddings.upsert_embedding($1, $2, $3::vector, $4, $5, $6, $7, $8::jsonb)',
        [
          item.post_id,
          item.channel_id,
          Array.isArray(item.embedding) ? `[${item.embedding.join(',')}]` : item.embedding,
          item.provider || 'openai',
          item.model || 'text-embedding-3-small',
          item.token_count || null,
          item.content_hash || null,
          JSON.stringify(item.metadata || {})
        ]
      );
      count++;
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  
  return count;
}

// ============================================
// CLEANUP
// ============================================

async function close() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  // Conexão
  connect,
  getPool,
  close,
  
  // Helpers
  hashContent,
  
  // Core
  checkContentChanged,
  upsertEmbedding,
  semanticSearch,
  getEmbedding,
  
  // Stats
  countByChannel,
  getStats,
  
  // CRUD
  deleteEmbedding,
  
  // Batch
  batchUpsert
};

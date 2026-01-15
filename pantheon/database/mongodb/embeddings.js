/**
 * Funções de acesso ao MongoDB para pipeline de embeddings
 * Alinhado com SPEC MongoDB v2 FINAL
 * 
 * @module database/mongodb/embeddings
 */

const { MongoClient } = require('mongodb');

let client = null;
let db = null;

/**
 * Conecta ao MongoDB
 */
async function connect(uri, database = 'pantheon_embeddings') {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(database);
  }
  return db;
}

/**
 * Retorna collections
 */
function getCollections() {
  if (!db) throw new Error('MongoDB não conectado. Chame connect() primeiro.');
  
  return {
    jobs: db.collection('embedding_jobs'),
    batches: db.collection('embedding_batches'),
    posts: db.collection('embedding_posts')
  };
}

// ============================================
// JOBS
// ============================================

/**
 * Cria um novo job de embedding
 */
async function createJob(config) {
  const { jobs } = getCollections();
  
  const job = {
    job_id: `job_${Date.now()}`,
    status: 'pending',
    config: {
      team_ids: config.team_ids || [],
      channel_ids: config.channel_ids || [],
      since_date: config.since_date || null,
      until_date: config.until_date || null,
      provider: config.provider || 'openai',
      model: config.model || 'text-embedding-3-small'
    },
    stats: {
      total_posts: 0,
      processed_posts: 0,
      skipped_posts: 0,
      failed_posts: 0,
      total_batches: 0,
      processed_batches: 0,
      total_tokens: 0,
      estimated_cost: 0
    },
    error: null,
    created_at: new Date(),
    started_at: null,
    completed_at: null,
    updated_at: new Date()
  };
  
  await jobs.insertOne(job);
  return job.job_id;
}

/**
 * Busca job por ID
 */
async function getJob(job_id) {
  const { jobs } = getCollections();
  return jobs.findOne({ job_id });
}

/**
 * Atualiza job
 */
async function updateJob(job_id, updates) {
  const { jobs } = getCollections();
  return jobs.updateOne(
    { job_id },
    { 
      $set: { 
        ...updates, 
        updated_at: new Date() 
      } 
    }
  );
}

/**
 * Atualiza status do job
 */
async function updateJobStatus(job_id, status, extraUpdates = {}) {
  const updates = { status, ...extraUpdates };
  
  if (status === 'processing') {
    updates.started_at = new Date();
  } else if (status === 'completed' || status === 'failed') {
    updates.completed_at = new Date();
  }
  
  return updateJob(job_id, updates);
}

/**
 * Incrementa stats do job
 */
async function incrementJobStats(job_id, stats) {
  const { jobs } = getCollections();
  
  const incObj = {};
  for (const [key, value] of Object.entries(stats)) {
    incObj[`stats.${key}`] = value;
  }
  
  return jobs.updateOne(
    { job_id },
    { 
      $inc: incObj,
      $set: { updated_at: new Date() }
    }
  );
}

// ============================================
// BATCHES
// ============================================

/**
 * Cria um novo batch
 */
async function createBatch(job_id, sequence, posts) {
  const { batches } = getCollections();
  
  const batch = {
    batch_id: `batch_${job_id}_${String(sequence).padStart(4, '0')}`,
    job_id,
    status: 'pending',
    sequence,
    posts: posts.map(p => ({
      post_id: p.post_id,
      channel_id: p.channel_id,
      content: p.content,
      token_count: p.token_count || 0
    })),
    totals: {
      items: posts.length,
      tokens: posts.reduce((sum, p) => sum + (p.token_count || 0), 0)
    },
    result: null,
    error: null,
    retry_count: 0,
    created_at: new Date(),
    started_at: null,
    processed_at: null
  };
  
  await batches.insertOne(batch);
  return batch.batch_id;
}

/**
 * Busca batch por ID
 */
async function getBatch(batch_id) {
  const { batches } = getCollections();
  return batches.findOne({ batch_id });
}

/**
 * Lista batches de um job
 */
async function getBatchesByJob(job_id, status = null) {
  const { batches } = getCollections();
  const query = { job_id };
  if (status) query.status = status;
  
  return batches.find(query).sort({ sequence: 1 }).toArray();
}

/**
 * Atualiza batch
 */
async function updateBatch(batch_id, updates) {
  const { batches } = getCollections();
  return batches.updateOne(
    { batch_id },
    { $set: updates }
  );
}

/**
 * Atualiza status do batch
 */
async function updateBatchStatus(batch_id, status, result = null, error = null) {
  const updates = { status };
  
  if (status === 'processing') {
    updates.started_at = new Date();
  } else if (status === 'completed' || status === 'failed') {
    updates.processed_at = new Date();
    if (result) updates.result = result;
    if (error) updates.error = error;
  }
  
  return updateBatch(batch_id, updates);
}

/**
 * Incrementa retry_count do batch
 */
async function incrementBatchRetry(batch_id) {
  const { batches } = getCollections();
  return batches.updateOne(
    { batch_id },
    { $inc: { retry_count: 1 } }
  );
}

// ============================================
// POSTS (SPEC v2 COMPLIANT)
// ============================================

/**
 * Cria documento de post com todos os campos da SPEC v2
 * 
 * @param {Object} data - Dados do post
 * @returns {Object} Documento formatado conforme SPEC v2
 */
function buildPostDocument(data) {
  return {
    // Identificação
    post_id: data.post_id,
    channel_id: data.channel_id,
    
    // Referências (null para Speed Layer)
    batch_id: data.batch_id || null,
    job_id: data.job_id || null,
    
    // Status
    status: data.status || 'pending',
    source: data.source || 'batch',  // SPEC v2: "batch" ou "speed"
    
    // Conteúdo
    content_hash: data.content_hash || null,
    token_count: data.token_count || 0,
    
    // Multimodelo (alinhado com pgvector v2)
    provider: data.provider || 'openai',
    model: data.model || 'text-embedding-3-small',
    
    // Metadados extensíveis (SPEC v2)
    metadata: data.metadata || {
      content_type: 'post',
      has_attachments: false,
      language: null
    },
    
    // Tracking de edição (SPEC v2)
    is_edit: data.is_edit || false,
    edit_count: data.edit_count || 0,
    previous_hash: data.previous_hash || null,
    
    // Skip info (SPEC v2)
    skip_reason: data.skip_reason || null
  };
}

/**
 * Upsert de post (idempotente por post_id + provider + model)
 * Conforme SPEC MongoDB v2
 * 
 * @param {Object} postData - Dados do post
 * @returns {Object} Resultado do upsert
 */
async function upsertPost(postData) {
  const { posts } = getCollections();
  const { post_id, provider, model } = postData;
  
  // Constrói documento conforme SPEC v2
  const doc = buildPostDocument(postData);
  
  return posts.updateOne(
    { post_id, provider: provider || 'openai', model: model || 'text-embedding-3-small' },
    { 
      $set: { 
        ...doc,
        updated_at: new Date() 
      },
      $setOnInsert: {
        created_at: new Date(),
        original_indexed_at: new Date()
      }
    },
    { upsert: true }
  );
}

/**
 * Cria post para Batch Layer
 */
async function createBatchPost(data) {
  return upsertPost({
    ...data,
    source: 'batch'
  });
}

/**
 * Cria post para Speed Layer
 */
async function createSpeedPost(data) {
  return upsertPost({
    ...data,
    source: 'speed',
    batch_id: null,
    job_id: null
  });
}

/**
 * Busca post
 */
async function getPost(post_id, provider = 'openai', model = 'text-embedding-3-small') {
  const { posts } = getCollections();
  return posts.findOne({ post_id, provider, model });
}

/**
 * Verifica se conteúdo mudou
 */
async function checkContentChanged(post_id, content_hash, provider = 'openai', model = 'text-embedding-3-small') {
  const { posts } = getCollections();
  
  const existing = await posts.findOne(
    { post_id, provider, model },
    { projection: { content_hash: 1 } }
  );
  
  if (!existing) return true; // Novo post
  return existing.content_hash !== content_hash; // Mudou?
}

/**
 * Atualiza status do post
 */
async function updatePostStatus(post_id, provider, model, status, extraUpdates = {}) {
  const { posts } = getCollections();
  
  const updates = { 
    status, 
    ...extraUpdates,
    updated_at: new Date()
  };
  
  if (status === 'indexed') {
    updates.indexed_at = new Date();
  }
  
  return posts.updateOne(
    { post_id, provider, model },
    { $set: updates }
  );
}

/**
 * Marca post como editado (SPEC v2)
 */
async function markPostEdited(post_id, provider, model, newHash, previousHash) {
  const { posts } = getCollections();
  
  return posts.updateOne(
    { post_id, provider, model },
    { 
      $set: { 
        is_edit: true,
        content_hash: newHash,
        previous_hash: previousHash,
        status: 'pending',
        updated_at: new Date()
      },
      $inc: { edit_count: 1 }
    }
  );
}

/**
 * Marca post como skipped (SPEC v2)
 */
async function skipPost(post_id, provider, model, reason) {
  return updatePostStatus(post_id, provider, model, 'skipped', {
    skip_reason: reason
  });
}

/**
 * Lista posts por status
 */
async function getPostsByStatus(status, limit = 100) {
  const { posts } = getCollections();
  return posts.find({ status }).limit(limit).toArray();
}

/**
 * Lista posts de um job
 */
async function getPostsByJob(job_id, status = null) {
  const { posts } = getCollections();
  const query = { job_id };
  if (status) query.status = status;
  return posts.find(query).toArray();
}

/**
 * Lista posts de um batch
 */
async function getPostsByBatch(batch_id, status = null) {
  const { posts } = getCollections();
  const query = { batch_id };
  if (status) query.status = status;
  return posts.find(query).toArray();
}

// ============================================
// CLEANUP
// ============================================

async function close() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  // Conexão
  connect,
  getCollections,
  close,
  
  // Jobs
  createJob,
  getJob,
  updateJob,
  updateJobStatus,
  incrementJobStats,
  
  // Batches
  createBatch,
  getBatch,
  getBatchesByJob,
  updateBatch,
  updateBatchStatus,
  incrementBatchRetry,
  
  // Posts (SPEC v2)
  buildPostDocument,
  upsertPost,
  createBatchPost,
  createSpeedPost,
  getPost,
  checkContentChanged,
  updatePostStatus,
  markPostEdited,
  skipPost,
  getPostsByStatus,
  getPostsByJob,
  getPostsByBatch
};

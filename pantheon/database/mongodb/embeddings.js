/**
 * Funções de acesso ao MongoDB para pipeline de embeddings
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

// ============================================
// POSTS
// ============================================

/**
 * Upsert de post (idempotente por post_id + provider + model)
 */
async function upsertPost(postData) {
  const { posts } = getCollections();
  const { post_id, provider, model } = postData;
  
  return posts.updateOne(
    { post_id, provider, model },
    { 
      $set: { 
        ...postData,
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
  
  // Posts
  upsertPost,
  getPost,
  checkContentChanged,
  updatePostStatus
};

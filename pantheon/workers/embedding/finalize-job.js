/**
 * Worker: finalize-job
 * Finaliza job e calcula estatísticas finais
 * 
 * Topic: embedding-finalize-job
 * 
 * Input Variables:
 *   - job_id: string
 * 
 * Output Variables:
 *   - status: string
 *   - stats: object
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-finalize-job';

// Custo por 1K tokens por modelo (aproximado)
const COST_PER_1K_TOKENS = {
  'text-embedding-3-small': 0.00002,
  'text-embedding-3-large': 0.00013,
  'text-embedding-ada-002': 0.0001
};

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const { job_id } = getVariables(task, ['job_id']);
  
  logger.info('Finalizando job', { job_id });
  
  // Conectar ao MongoDB
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  
  // Buscar job
  const job = await mongoDb.getJob(job_id);
  if (!job) {
    throw new Error(`Job não encontrado: ${job_id}`);
  }
  
  // Contar batches por status
  const batches = await mongoDb.getBatchesByJob(job_id);
  const batchStats = {
    total: batches.length,
    completed: batches.filter(b => b.status === 'completed').length,
    failed: batches.filter(b => b.status === 'failed').length
  };
  
  // Calcular custo estimado
  const costPer1K = COST_PER_1K_TOKENS[job.config.model] || 0.0001;
  const estimatedCost = (job.stats.total_tokens / 1000) * costPer1K;
  
  // Determinar status final
  let finalStatus = 'completed';
  if (batchStats.failed > 0 && batchStats.completed === 0) {
    finalStatus = 'failed';
  } else if (batchStats.failed > 0) {
    finalStatus = 'completed'; // Parcialmente completo
  }
  
  // Atualizar job
  await mongoDb.updateJobStatus(job_id, finalStatus, {
    'stats.processed_batches': batchStats.completed,
    'stats.estimated_cost': estimatedCost
  });
  
  // Buscar job atualizado para retornar stats
  const finalJob = await mongoDb.getJob(job_id);
  
  logger.info('Job finalizado', {
    job_id,
    status: finalStatus,
    stats: finalJob.stats
  });
  
  // Completar task
  await taskService.complete(task, {
    status: finalStatus,
    stats: finalJob.stats
  });
});

module.exports = { TOPIC, COST_PER_1K_TOKENS };

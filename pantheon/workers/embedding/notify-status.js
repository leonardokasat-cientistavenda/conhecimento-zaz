/**
 * Worker: notify-status
 * Envia notificações de status do job
 * 
 * Topic: embedding-notify-status
 * 
 * Input Variables:
 *   - job_id: string
 *   - event_type: string (job, batch, speed)
 *   - status: string
 *   - error_count: number (opcional)
 * 
 * Output Variables:
 *   - notified: boolean
 */

const { createWorker, getVariables } = require('./base');
const mongoDb = require('../../database/mongodb/embeddings');

const TOPIC = 'embedding-notify-status';

// Templates de notificação
const TEMPLATES = {
  job_started: (job) => `
🚀 **Job Iniciado**

**ID:** \`${job.job_id}\`
**Provider:** ${job.config.provider}
**Model:** ${job.config.model}
**Teams:** ${job.config.team_ids.length || 'Todos'}
**Channels:** ${job.config.channel_ids.length || 'Todos'}
  `.trim(),
  
  job_completed_success: (job) => `
✅ **Job Concluído**

**ID:** \`${job.job_id}\`
**Posts processados:** ${job.stats.processed_posts}
**Batches:** ${job.stats.processed_batches}/${job.stats.total_batches}
**Tokens:** ${job.stats.total_tokens.toLocaleString()}
**Custo estimado:** $${job.stats.estimated_cost.toFixed(4)}
  `.trim(),
  
  job_completed_errors: (job) => `
⚠️ **Job Concluído com Erros**

**ID:** \`${job.job_id}\`
**Posts processados:** ${job.stats.processed_posts}
**Posts falhos:** ${job.stats.failed_posts}
**Batches:** ${job.stats.processed_batches}/${job.stats.total_batches}
  `.trim(),
  
  job_failed: (job) => `
❌ **Job Falhou**

**ID:** \`${job.job_id}\`
**Erro:** ${job.error || 'Desconhecido'}
  `.trim(),
  
  batch_failed: (batch) => `
⚠️ **Batch Falhou**

**Batch:** \`${batch.batch_id}\`
**Job:** \`${batch.job_id}\`
**Retry:** ${batch.retry_count}
**Erro:** ${batch.error || 'Desconhecido'}
  `.trim(),
  
  speed_layer_errors: (data) => `
🔴 **Speed Layer - Múltiplos Erros**

**Erros recentes:** ${data.error_count}
**Último erro:** ${data.last_error || 'N/A'}
  `.trim()
};

/**
 * Envia mensagem para Mattermost
 */
async function sendMattermostNotification(message, channel, mention, config) {
  if (!config.mattermost.url || !config.mattermost.token) {
    return false;
  }
  
  const fullMessage = mention ? `${mention} ${message}` : message;
  
  // TODO: Implementar envio real via API Mattermost
  // Por enquanto, apenas loga
  console.log(`[NOTIFICATION] Channel: ${channel}\n${fullMessage}`);
  
  return true;
}

createWorker(TOPIC, async (task, taskService, { logger, config }) => {
  const variables = getVariables(task, [
    'job_id',
    'event_type',
    'status',
    'error_count'
  ]);
  
  const { job_id, event_type, status, error_count } = variables;
  
  logger.info('Processando notificação', { job_id, event_type, status });
  
  // Conectar ao MongoDB
  await mongoDb.connect(config.mongodb.uri, config.mongodb.database);
  
  // Determinar template e dados
  let template = null;
  let data = null;
  let channel = config.mattermost.notificationChannel;
  let mention = '';
  
  if (event_type === 'job') {
    const job = await mongoDb.getJob(job_id);
    data = job;
    
    if (status === 'started') {
      template = 'job_started';
    } else if (status === 'completed' && (error_count || 0) === 0) {
      template = 'job_completed_success';
    } else if (status === 'completed') {
      template = 'job_completed_errors';
      mention = '@channel';
    } else if (status === 'failed') {
      template = 'job_failed';
      mention = '@leonardo';
    }
  } else if (event_type === 'batch' && status === 'failed') {
    const batch = await mongoDb.getBatch(variables.batch_id);
    data = batch;
    template = 'batch_failed';
  } else if (event_type === 'speed' && status === 'failed' && error_count >= 5) {
    data = { error_count, last_error: variables.last_error };
    template = 'speed_layer_errors';
    mention = '@leonardo';
  }
  
  // Enviar notificação se template definido
  let notified = false;
  if (template && TEMPLATES[template]) {
    const message = TEMPLATES[template](data);
    notified = await sendMattermostNotification(message, channel, mention, config);
    
    logger.info('Notificação enviada', { template, channel, notified });
  } else {
    logger.debug('Notificação ignorada', { event_type, status });
  }
  
  // Completar task
  await taskService.complete(task, { notified });
});

module.exports = { TOPIC, TEMPLATES };

/**
 * Worker: validate-post
 * Valida post usando DMN post_validation
 * 
 * Topic: embedding-validate-post
 * 
 * Input Variables:
 *   - post_id: string
 *   - message: string
 *   - props: object
 * 
 * Output Variables:
 *   - valid: boolean
 *   - skip_reason: string
 */

const { createWorker, getVariables } = require('./base');

const TOPIC = 'embedding-validate-post';

// Este worker é opcional - a validação principal está no receive-post
// Pode ser usado para validação adicional via DMN

createWorker(TOPIC, async (task, taskService, { logger }) => {
  const { post_id, message, props } = getVariables(task, [
    'post_id',
    'message', 
    'props'
  ]);
  
  logger.debug('Validando post', { post_id });
  
  // Validação básica (DMN pode adicionar regras complexas)
  const message_length = (message || '').length;
  const is_bot = props?.from_bot === true;
  const is_system = !!(task.variables.get('type'));
  const is_streaming = props?.streaming === true;
  const props_streaming = props?.streaming === true;
  
  // Regras de validação (espelho do DMN post_validation)
  let valid = true;
  let skip_reason = 'valid';
  
  if (is_streaming || props_streaming) {
    valid = false;
    skip_reason = 'streaming_active';
  } else if (is_system) {
    valid = false;
    skip_reason = 'system_post';
  } else if (message_length < 10) {
    valid = false;
    skip_reason = 'too_short';
  } else if (is_bot && message_length < 500) {
    valid = false;
    skip_reason = 'bot_post_short';
  }
  
  logger.debug('Validação concluída', { post_id, valid, skip_reason });
  
  await taskService.complete(task, {
    valid,
    skip_reason
  });
});

module.exports = { TOPIC };

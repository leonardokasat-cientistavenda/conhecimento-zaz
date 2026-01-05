/**
 * INFRA Agent Handler
 * 
 * Executa comandos de infraestrutura diretamente, sem passar por Claude.
 * Importa os comandos do infra-bot original.
 * 
 * Spawn desacoplado: para 'restart pantheon', usa nohup para sobreviver à própria morte.
 * 
 * @module agents/infra/handler
 */

const path = require('path');
const { spawn } = require('child_process');
const logger = require('../../config/logger');

// Import commands from infra-bot (relative path)
const infraBotPath = path.join(__dirname, '../../infra-bot');
const { execute, hasCommand, listCommands } = require(`${infraBotPath}/commands`);
const { logCommand, generateTraceId } = require(`${infraBotPath}/lib/clickhouse`);
const Anthropic = require('@anthropic-ai/sdk');

// Cliente Anthropic para fallback IA
let anthropicClient = null;

function getAnthropicClient() {
  if (!anthropicClient && process.env.ANTHROPIC_API_KEY) {
    anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return anthropicClient;
}

const INFRA_SYSTEM_PROMPT = `Você é INFRA, o assistente de infraestrutura e DevOps da ZAZ.

Seu papel é ajudar com:
- Comandos Linux e administração de sistemas
- Docker, Kubernetes, containers
- PM2, Node.js, processos
- Git, CI/CD, deploys
- Nginx, Apache, proxies reversos
- Monitoramento, logs, métricas
- Troubleshooting de infraestrutura
- Scripts bash e automação

Comandos disponíveis via @infra: ${listCommands().join(', ')}

Seja conciso e prático. Forneça comandos prontos para copiar quando relevante.`;

/**
 * Spawn desacoplado para restart pantheon
 * Executa o comando e retorna ANTES de morrer
 */
function spawnDetachedRestart(appName) {
  const cmd = `sleep 1 && pm2 restart ${appName}`;
  
  const child = spawn('bash', ['-c', cmd], {
    detached: true,
    stdio: 'ignore'
  });
  
  child.unref();
  
  return `⚠️ Reiniciando **${appName}** em background...\n\nO restart foi agendado. Use \`@infra status\` em alguns segundos para verificar.`;
}

/**
 * IA Fallback para perguntas não-comando
 */
async function askAI(question, userName) {
  const client = getAnthropicClient();
  
  if (!client) {
    return '⚠️ IA não configurada.\n\nUse `@infra help` para ver comandos disponíveis.';
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: INFRA_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `[Usuário: ${userName}]\n\n${question}` }]
    });

    const text = response.content
      ?.filter(block => block.type === 'text')
      ?.map(block => block.text)
      ?.join('\n') || 'Não consegui gerar uma resposta.';

    return `🤖 ${text}`;
    
  } catch (error) {
    logger.error({ err: error }, 'Erro no fallback IA');
    return `❌ Erro na IA: ${error.message}`;
  }
}

/**
 * Handler principal do agente Infra
 * 
 * @param {Object} params
 * @param {string} params.text - Texto da mensagem (sem trigger word)
 * @param {string} params.user_id - ID do usuário
 * @param {string} params.user_name - Nome do usuário
 * @param {string} params.channel_id - ID do canal
 * @returns {Promise<Object>} { response, source, duration }
 */
async function handle({ text, user_id, user_name, channel_id }) {
  const startTime = Date.now();
  const traceId = generateTraceId();
  
  const handlerLogger = logger.child({
    component: 'infra-handler',
    trace_id: traceId,
    user_id,
    channel_id
  });
  
  // Parse comando
  const parts = text.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase();
  const args = parts.slice(1);
  const argsText = args.join(' ');
  
  handlerLogger.info({ command, args_preview: argsText.substring(0, 50) }, 'Processando comando infra');
  
  let response;
  let source = 'command';
  let status = 'success';
  
  try {
    // Caso especial: restart pantheon (spawn desacoplado)
    if (command === 'restart' && args[0]?.toLowerCase() === 'pantheon') {
      response = spawnDetachedRestart('pantheon');
      source = 'detached';
    }
    // Verificar se é um comando conhecido
    else if (command && hasCommand(command)) {
      const context = { user_id, user_name, channel_id };
      const result = await execute(command, args, text, context);
      response = result.response;
      status = result.status || 'success';
    } 
    // Help ou mensagem vazia
    else if (command === 'help' || !command) {
      const result = await execute('help', args, text, {});
      response = result.response;
    } 
    // Fallback para IA
    else {
      source = 'ai';
      response = await askAI(text, user_name);
    }
  } catch (error) {
    handlerLogger.error({ err: error, command }, 'Erro ao executar comando');
    status = 'error';
    response = `❌ Erro: ${error.message}`;
  }
  
  const duration = Date.now() - startTime;
  
  // Log no ClickHouse
  try {
    await logCommand({
      trace_id: traceId,
      user_id,
      user_name,
      channel_id,
      command: command || 'empty',
      args: argsText,
      source,
      duration_ms: duration,
      status,
      error_message: status === 'error' ? response : null,
      response_length: response?.length || 0
    });
  } catch (logError) {
    handlerLogger.error({ err: logError }, 'Erro ao logar no ClickHouse');
  }
  
  return {
    response: `${response}\n\n_Executado em ${duration}ms_`,
    source,
    duration
  };
}

module.exports = { handle, listCommands, hasCommand };

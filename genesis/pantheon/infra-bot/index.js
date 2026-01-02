/**
 * INFRA BOT - Sprint S-INFRA-BOT-001
 * Bot de infraestrutura para execução de comandos via Mattermost
 * 
 * Fluxo:
 * MM @infra → Webhook → Este servidor → Executa comando → Responde no MM
 */

const express = require('express');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const config = {
  port: process.env.PORT || 3101,
  webhookToken: process.env.MM_WEBHOOK_TOKEN || 'ybw99n76f7nax85zpqxj1dz3dw',
  botToken: process.env.MM_BOT_TOKEN || 'o1qwmucs7ifd8p8gxr8aezm4go',
  mmBaseUrl: process.env.MM_BASE_URL || 'https://mattermost.zaz.vc',
  basePath: process.env.BASE_PATH || '/home/camunda-orquestrador/Orquestrador-Zarah',
  commandTimeout: parseInt(process.env.COMMAND_TIMEOUT_MS) || 30000,
  allowedApps: ['pantheon', 'index', 'infra-bot']
};

// ============================================================================
// COMANDOS DISPONÍVEIS
// ============================================================================

const commands = {
  help: {
    description: 'Lista comandos disponíveis',
    usage: '@infra help',
    handler: async () => {
      const lines = ['**Comandos disponíveis:**', ''];
      for (const [name, cmd] of Object.entries(commands)) {
        lines.push(`• \`${cmd.usage}\` - ${cmd.description}`);
      }
      return lines.join('\n');
    }
  },

  status: {
    description: 'Status de todos os processos PM2',
    usage: '@infra status',
    handler: async () => {
      const { stdout } = await execAsync('pm2 jlist', { timeout: config.commandTimeout });
      const processes = JSON.parse(stdout);
      
      if (processes.length === 0) {
        return 'Nenhum processo PM2 rodando.';
      }

      const lines = ['| App | Status | CPU | Mem | Uptime |', '|-----|--------|-----|-----|--------|'];
      for (const p of processes) {
        const status = p.pm2_env.status === 'online' ? '🟢' : '🔴';
        const cpu = `${p.monit?.cpu || 0}%`;
        const mem = `${Math.round((p.monit?.memory || 0) / 1024 / 1024)}MB`;
        const uptime = formatUptime(p.pm2_env.pm_uptime);
        lines.push(`| ${p.name} | ${status} ${p.pm2_env.status} | ${cpu} | ${mem} | ${uptime} |`);
      }
      return lines.join('\n');
    }
  },

  logs: {
    description: 'Últimas 50 linhas de log de um app',
    usage: '@infra logs {app}',
    handler: async (args) => {
      const app = args[0];
      if (!app) return 'Uso: `@infra logs {app}`';
      if (!config.allowedApps.includes(app)) {
        return `App não permitido. Apps válidos: ${config.allowedApps.join(', ')}`;
      }
      const { stdout } = await execAsync(`pm2 logs ${app} --lines 50 --nostream`, { 
        timeout: config.commandTimeout 
      });
      return `**Logs de ${app}:**\n\`\`\`\n${stdout.slice(-3000)}\n\`\`\``;
    }
  },

  restart: {
    description: 'Reinicia um app no PM2',
    usage: '@infra restart {app}',
    handler: async (args) => {
      const app = args[0];
      if (!app) return 'Uso: `@infra restart {app}`';
      if (!config.allowedApps.includes(app)) {
        return `App não permitido. Apps válidos: ${config.allowedApps.join(', ')}`;
      }
      const { stdout } = await execAsync(`pm2 restart ${app}`, { timeout: config.commandTimeout });
      return `✅ App **${app}** reiniciado.\n\`\`\`\n${stdout}\n\`\`\``;
    }
  },

  test: {
    description: 'Executa npm test em um path',
    usage: '@infra test {path}',
    handler: async (args) => {
      const testPath = args[0];
      if (!testPath) return 'Uso: `@infra test {path}`\nExemplo: `@infra test pantheon/infra-bot`';
      
      const fullPath = `${config.basePath}/${testPath}`;
      try {
        const { stdout, stderr } = await execAsync(`cd ${fullPath} && npm test`, { 
          timeout: config.commandTimeout 
        });
        return `✅ **Testes passaram!**\n\`\`\`\n${stdout.slice(-2000)}\n\`\`\``;
      } catch (error) {
        return `❌ **Testes falharam:**\n\`\`\`\n${error.stdout || error.message}\n\`\`\``;
      }
    }
  },

  lint: {
    description: 'Executa npm run lint em um path',
    usage: '@infra lint {path}',
    handler: async (args) => {
      const lintPath = args[0];
      if (!lintPath) return 'Uso: `@infra lint {path}`';
      
      const fullPath = `${config.basePath}/${lintPath}`;
      try {
        const { stdout } = await execAsync(`cd ${fullPath} && npm run lint`, { 
          timeout: config.commandTimeout 
        });
        return `✅ **Lint OK**\n\`\`\`\n${stdout.slice(-2000)}\n\`\`\``;
      } catch (error) {
        return `❌ **Lint falhou:**\n\`\`\`\n${error.stdout || error.message}\n\`\`\``;
      }
    }
  },

  'git-status': {
    description: 'Status do repositório Git',
    usage: '@infra git-status',
    handler: async () => {
      const { stdout } = await execAsync(`cd ${config.basePath} && git status --short`, { 
        timeout: config.commandTimeout 
      });
      const status = stdout.trim() || 'Working tree limpa';
      return `**Git Status:**\n\`\`\`\n${status}\n\`\`\``;
    }
  },

  'git-pull': {
    description: 'Executa git pull origin main',
    usage: '@infra git-pull',
    handler: async () => {
      const { stdout } = await execAsync(`cd ${config.basePath} && git pull origin main`, { 
        timeout: config.commandTimeout 
      });
      return `**Git Pull:**\n\`\`\`\n${stdout}\n\`\`\``;
    }
  },

  health: {
    description: 'Health check do servidor',
    usage: '@infra health',
    handler: async () => {
      const uptime = process.uptime();
      const mem = process.memoryUsage();
      return [
        '**Infra Bot Health:**',
        `• Status: 🟢 Online`,
        `• Uptime: ${formatSeconds(uptime)}`,
        `• Memória: ${Math.round(mem.heapUsed / 1024 / 1024)}MB`,
        `• Node: ${process.version}`
      ].join('\n');
    }
  }
};

// ============================================================================
// HELPERS
// ============================================================================

function formatUptime(startTime) {
  if (!startTime) return '-';
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  return formatSeconds(seconds);
}

function formatSeconds(seconds) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

async function postToMattermost(channelId, message) {
  const response = await fetch(`${config.mmBaseUrl}/api/v4/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.botToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      channel_id: channelId,
      message: message
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Erro ao postar no MM:', error);
  }
}

function parseCommand(text) {
  // Remove @infra do início
  const cleaned = text.replace(/^@infra\s*/i, '').trim();
  const parts = cleaned.split(/\s+/);
  const command = parts[0]?.toLowerCase() || 'help';
  const args = parts.slice(1);
  return { command, args };
}

// ============================================================================
// EXPRESS SERVER
// ============================================================================

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Webhook endpoint
app.post('/', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const payload = req.body;
    
    // Log para debug
    console.log('[WEBHOOK]', JSON.stringify({
      token: payload.token?.slice(0, 8) + '...',
      user: payload.user_name,
      text: payload.text,
      channel: payload.channel_name
    }));

    // Validar token do webhook
    if (payload.token !== config.webhookToken) {
      console.warn('[WARN] Token inválido');
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Ignorar mensagens do próprio bot
    if (payload.user_name === 'infra') {
      return res.status(200).json({});
    }

    // Parsear comando
    const { command, args } = parseCommand(payload.text || '');
    console.log(`[CMD] ${command} ${args.join(' ')}`);

    // Buscar handler
    const handler = commands[command];
    if (!handler) {
      await postToMattermost(payload.channel_id, 
        `Comando desconhecido: \`${command}\`\nUse \`@infra help\` para ver comandos disponíveis.`
      );
      return res.status(200).json({});
    }

    // Executar comando
    const result = await handler.handler(args);
    const duration = Date.now() - startTime;

    // Postar resultado
    await postToMattermost(payload.channel_id, `${result}\n\n_Executado em ${duration}ms_`);

    res.status(200).json({});

  } catch (error) {
    console.error('[ERROR]', error);
    
    // Tentar notificar erro no canal
    if (req.body?.channel_id) {
      await postToMattermost(req.body.channel_id, 
        `❌ **Erro ao executar comando:**\n\`\`\`\n${error.message}\n\`\`\``
      );
    }

    res.status(200).json({}); // Sempre 200 para o MM não fazer retry
  }
});

// ============================================================================
// START
// ============================================================================

app.listen(config.port, () => {
  console.log(`[INFRA-BOT] Rodando na porta ${config.port}`);
  console.log(`[INFRA-BOT] Base path: ${config.basePath}`);
  console.log(`[INFRA-BOT] Apps permitidos: ${config.allowedApps.join(', ')}`);
});

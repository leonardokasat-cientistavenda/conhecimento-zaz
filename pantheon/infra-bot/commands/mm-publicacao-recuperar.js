/**
 * @infra mm-publicacao-recuperar
 * 
 * Comando para recuperar posts soft-deleted no Mattermost.
 * 
 * @backlog BKL-INFRA-004
 * @organon z1yixbdgojdh8gfkx4xakfztor
 * @canal dwpt1r6i13dbmx3fafmtwek4te
 * 
 * Invariantes:
 * - INV-REC-1: AUDIT_FIRST - Registrar no CH antes do UPDATE
 * - INV-REC-2: ATOMIC - Falha no audit aborta operação
 * - INV-REC-3: TRACE - trace_id em todo fluxo
 * - INV-REC-4: FAIL_FAST - Verificar antes de agir
 * - INV-REC-5: IDEMPOTENT - Post ativo = no-op
 * - INV-REC-6: SCOPE - Apenas soft-delete
 */

const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');
const http = require('http');
const config = require('../lib/config');

// ============================================================================
// CLIENTES
// ============================================================================

// Pool PostgreSQL (conexão lazy)
let pgPool = null;

function getPgPool() {
  if (!pgPool) {
    pgPool = new Pool(config.mm.postgres);
  }
  return pgPool;
}

// ============================================================================
// HELP
// ============================================================================

function help() {
  return `
## 🔮 mm-publicacao-recuperar

Recupera posts deletados no Mattermost (soft-delete).

### Sintaxe
\`\`\`
@infra mm-publicacao-recuperar <post_id>
@infra mm-publicacao-recuperar help
\`\`\`

### Parâmetros
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| post_id | string | ID do post (26 caracteres alfanuméricos) |

### Exemplos
\`\`\`
@infra mm-publicacao-recuperar abc123def456ghi789jkl012mno
\`\`\`

### Respostas
| Status | Descrição |
|--------|-----------|
| ✅ recovered | Post recuperado com sucesso |
| ⚠️ already_active | Post já está ativo |
| ❌ not_found | Post não existe no banco |
| ❌ hard_deleted | Post foi removido permanentemente |
| ❌ invalid_id | Formato de post_id inválido |

### Funcionamento
1. Valida formato do post_id
2. Consulta status no PostgreSQL
3. Registra operação no ClickHouse (audit)
4. Executa UPDATE posts SET delete_at = 0
5. Retorna resultado com trace_id

### Invariantes
- **AUDIT_FIRST**: Audit registrado ANTES da operação
- **ATOMIC**: Falha no audit aborta tudo
- **TRACE**: trace_id em toda resposta
- **FAIL_FAST**: Validação antes de agir
- **IDEMPOTENT**: Post ativo retorna sucesso sem modificar
- **SCOPE**: Apenas soft-delete (delete_at > 0)

### Referências
- ORGANON: z1yixbdgojdh8gfkx4xakfztor
- BacklogItem: BKL-INFRA-004
- Canal: 🔮 @infra - Post Recovery
`.trim();
}

// ============================================================================
// VALIDAÇÃO
// ============================================================================

/**
 * Valida formato do post_id do Mattermost
 * @param {string} postId - ID do post
 * @returns {boolean} true se válido
 */
function isValidPostId(postId) {
  // Mattermost usa IDs de 26 caracteres alfanuméricos lowercase
  return /^[a-z0-9]{26}$/.test(postId);
}

// ============================================================================
// STATUS DO POST
// ============================================================================

/**
 * Verifica status do post no PostgreSQL
 * @param {string} postId - ID do post
 * @returns {Promise<{exists: boolean, deleted: boolean, deleteAt: number}>}
 */
async function checkPostStatus(postId) {
  const pool = getPgPool();
  
  const query = `
    SELECT id, deleteat as delete_at
    FROM posts 
    WHERE id = $1
  `;
  
  const result = await pool.query(query, [postId]);
  
  if (result.rows.length === 0) {
    return {
      exists: false,
      deleted: false,
      deleteAt: 0
    };
  }
  
  const row = result.rows[0];
  const deleteAt = parseInt(row.delete_at, 10) || 0;
  
  return {
    exists: true,
    deleted: deleteAt > 0,
    deleteAt: deleteAt
  };
}

// ============================================================================
// AUDIT (ClickHouse)
// ============================================================================

/**
 * Registra operação no ClickHouse
 * @param {Object} auditData - Dados do audit
 * @returns {Promise<boolean>} true se registrado
 */
async function logAudit(auditData) {
  // Se audit desabilitado, retorna true (no-op)
  if (!config.features.auditEnabled) {
    return true;
  }
  
  const { ch } = config;
  
  const insertQuery = `
    INSERT INTO ${ch.database}.mm_post_recovery_audit 
    (trace_id, post_id, user_id, channel_id, action, status, delete_at_before, timestamp)
    VALUES (
      '${auditData.trace_id}',
      '${auditData.post_id}',
      '${auditData.user_id || ''}',
      '${auditData.channel_id || ''}',
      'recover',
      'pending',
      ${auditData.delete_at_before || 0},
      now64(3)
    )
  `;
  
  return new Promise((resolve) => {
    const options = {
      hostname: ch.host,
      port: ch.port,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      timeout: ch.timeout || 5000
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.error('[AUDIT] ClickHouse error:', err.message);
      resolve(false);
    });
    
    req.on('timeout', () => {
      console.error('[AUDIT] ClickHouse timeout');
      req.destroy();
      resolve(false);
    });
    
    req.write(insertQuery);
    req.end();
  });
}

/**
 * Atualiza status do audit após operação
 * @param {string} traceId - Trace ID da operação
 * @param {string} status - Novo status (success, failed, skipped)
 * @param {Object} data - Dados adicionais
 */
async function updateAuditStatus(traceId, status, data = {}) {
  if (!config.features.auditEnabled) return;
  
  const { ch } = config;
  
  // ClickHouse não suporta UPDATE, então inserimos novo registro
  const insertQuery = `
    INSERT INTO ${ch.database}.mm_post_recovery_audit 
    (trace_id, post_id, user_id, channel_id, action, status, delete_at_after, duration_ms, error_message, timestamp)
    VALUES (
      '${traceId}',
      '${data.post_id || ''}',
      '${data.user_id || ''}',
      '${data.channel_id || ''}',
      'recover',
      '${status}',
      ${data.delete_at_after || 0},
      ${data.duration_ms || 0},
      '${(data.error || '').replace(/'/g, "\\'")}',
      now64(3)
    )
  `;
  
  return new Promise((resolve) => {
    const options = {
      hostname: ch.host,
      port: ch.port,
      path: '/',
      method: 'POST',
      timeout: 5000
    };
    
    const req = http.request(options, () => resolve());
    req.on('error', () => resolve());
    req.write(insertQuery);
    req.end();
  });
}

// ============================================================================
// RECOVERY
// ============================================================================

/**
 * Recupera o post (UPDATE delete_at = 0)
 * @param {string} postId - ID do post
 * @returns {Promise<boolean>} true se recuperado
 */
async function recoverPost(postId) {
  // Dry-run mode
  if (config.features.dryRun) {
    console.log(`[DRY-RUN] Would recover post: ${postId}`);
    return true;
  }
  
  const pool = getPgPool();
  
  const query = `
    UPDATE posts 
    SET deleteat = 0, updateat = $2
    WHERE id = $1 AND deleteat > 0
    RETURNING id
  `;
  
  const now = Date.now();
  const result = await pool.query(query, [postId, now]);
  
  return result.rowCount > 0;
}

// ============================================================================
// HANDLER PRINCIPAL
// ============================================================================

/**
 * Handler do comando mm-publicacao-recuperar
 * @param {Object} context - Contexto da requisição
 * @param {string} context.postId - ID do post a recuperar
 * @param {string} context.userId - ID do usuário que solicitou
 * @param {string} context.channelId - Canal de origem
 * @returns {Promise<Object>} Resultado da operação
 */
async function execute(context) {
  const traceId = uuidv4();
  const startTime = Date.now();
  
  // Help
  if (!context.postId || context.postId === 'help') {
    return {
      success: true,
      status: 'help',
      message: help(),
      trace_id: traceId
    };
  }
  
  // INV-REC-4: FAIL_FAST - Validar antes de agir
  if (!isValidPostId(context.postId)) {
    return {
      success: false,
      status: 'invalid_id',
      message: `❌ Formato inválido: post_id deve ter 26 caracteres alfanuméricos`,
      trace_id: traceId,
      input: context.postId
    };
  }
  
  try {
    // 1. Verificar status atual
    const status = await checkPostStatus(context.postId);
    
    // Post não existe
    if (!status.exists) {
      return {
        success: false,
        status: 'not_found',
        message: `❌ Post não encontrado: ${context.postId}`,
        trace_id: traceId
      };
    }
    
    // INV-REC-5: IDEMPOTENT - Post ativo retorna sucesso sem modificar
    if (!status.deleted) {
      return {
        success: true,
        status: 'already_active',
        message: `⚠️ Post já está ativo: ${context.postId}`,
        trace_id: traceId
      };
    }
    
    // INV-REC-1: AUDIT_FIRST - Registrar ANTES de executar
    // INV-REC-2: ATOMIC - Falha aqui aborta tudo
    const auditData = {
      trace_id: traceId,
      post_id: context.postId,
      user_id: context.userId,
      channel_id: context.channelId,
      action: 'recover',
      delete_at_before: status.deleteAt,
      timestamp: new Date().toISOString()
    };
    
    const auditOk = await logAudit(auditData);
    if (!auditOk) {
      return {
        success: false,
        status: 'audit_failed',
        message: `❌ Falha no audit - operação abortada`,
        trace_id: traceId
      };
    }
    
    // 3. Executar recovery
    const recovered = await recoverPost(context.postId);
    
    const duration = Date.now() - startTime;
    
    // 4. Atualizar audit com resultado
    await updateAuditStatus(traceId, recovered ? 'success' : 'failed', {
      post_id: context.postId,
      user_id: context.userId,
      channel_id: context.channelId,
      delete_at_after: 0,
      duration_ms: duration
    });
    
    return {
      success: recovered,
      status: recovered ? 'recovered' : 'recovery_failed',
      message: recovered 
        ? `✅ Post recuperado: ${context.postId}`
        : `❌ Falha ao recuperar: ${context.postId}`,
      trace_id: traceId,
      duration_ms: duration
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    // Registrar erro no audit
    await updateAuditStatus(traceId, 'failed', {
      post_id: context.postId,
      user_id: context.userId,
      channel_id: context.channelId,
      duration_ms: duration,
      error: error.message
    });
    
    return {
      success: false,
      status: 'error',
      message: `❌ Erro: ${error.message}`,
      trace_id: traceId,
      error: error.message
    };
  }
}

// ============================================================================
// CLEANUP
// ============================================================================

/**
 * Fecha conexões ao encerrar
 */
async function cleanup() {
  if (pgPool) {
    await pgPool.end();
    pgPool = null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  name: 'mm-publicacao-recuperar',
  description: 'Recupera posts soft-deleted no Mattermost',
  execute,
  help,
  isValidPostId,
  cleanup,
  // Exports para testes
  _internals: {
    checkPostStatus,
    logAudit,
    updateAuditStatus,
    recoverPost,
    getPgPool
  }
};

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

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const CONFIG = {
  // PostgreSQL Mattermost (T2)
  postgres: {
    host: process.env.MM_POSTGRES_HOST || 'localhost',
    port: process.env.MM_POSTGRES_PORT || 5432,
    database: process.env.MM_POSTGRES_DB || 'mattermost',
    user: process.env.MM_POSTGRES_USER || 'mmuser',
    password: process.env.MM_POSTGRES_PASSWORD || ''
  },
  // ClickHouse Audit (T3)
  clickhouse: {
    host: process.env.CH_HOST || 'localhost',
    port: process.env.CH_PORT || 8123,
    database: 'genesis'
  }
};

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
// STATUS DO POST (T4)
// ============================================================================

/**
 * Verifica status do post no PostgreSQL
 * @param {string} postId - ID do post
 * @returns {Promise<{exists: boolean, deleted: boolean, deleteAt: number}>}
 */
async function checkPostStatus(postId) {
  // TODO: T4 - Implementar query PostgreSQL
  // SELECT id, delete_at FROM posts WHERE id = $1
  throw new Error('NOT_IMPLEMENTED: checkPostStatus aguarda T4');
}

// ============================================================================
// AUDIT (T3)
// ============================================================================

/**
 * Registra operação no ClickHouse
 * @param {Object} auditData - Dados do audit
 * @returns {Promise<boolean>} true se registrado
 */
async function logAudit(auditData) {
  // TODO: T3 - Implementar INSERT no ClickHouse
  // INSERT INTO genesis.mm_post_recovery_audit
  throw new Error('NOT_IMPLEMENTED: logAudit aguarda T3');
}

// ============================================================================
// RECOVERY (T4)
// ============================================================================

/**
 * Recupera o post (UPDATE delete_at = 0)
 * @param {string} postId - ID do post
 * @returns {Promise<boolean>} true se recuperado
 */
async function recoverPost(postId) {
  // TODO: T4 - Implementar UPDATE PostgreSQL
  // UPDATE posts SET delete_at = 0 WHERE id = $1
  throw new Error('NOT_IMPLEMENTED: recoverPost aguarda T4');
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
// EXPORTS
// ============================================================================

module.exports = {
  name: 'mm-publicacao-recuperar',
  description: 'Recupera posts soft-deleted no Mattermost',
  execute,
  help,
  isValidPostId,
  // Exports para testes
  _internals: {
    checkPostStatus,
    logAudit,
    recoverPost,
    CONFIG
  }
};

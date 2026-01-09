/**
 * Configuração centralizada do @infra bot
 * 
 * Carrega variáveis de ambiente e fornece configurações
 * para todos os comandos do Pantheon Infra Bot.
 * 
 * @module lib/config
 */

// ============================================================================
// MATTERMOST
// ============================================================================

const mattermost = {
  // API do Mattermost
  api: {
    url: process.env.MM_API_URL || 'http://localhost:8065/api/v4',
    token: process.env.MM_BOT_TOKEN || ''
  },
  
  // PostgreSQL do Mattermost (para queries diretas)
  postgres: {
    host: process.env.MM_POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.MM_POSTGRES_PORT || '5432', 10),
    database: process.env.MM_POSTGRES_DB || 'mattermost',
    user: process.env.MM_POSTGRES_USER || 'mmuser',
    password: process.env.MM_POSTGRES_PASSWORD || '',
    // Pool config
    max: parseInt(process.env.MM_POSTGRES_POOL_MAX || '5', 10),
    idleTimeoutMillis: parseInt(process.env.MM_POSTGRES_IDLE_TIMEOUT || '30000', 10),
    connectionTimeoutMillis: parseInt(process.env.MM_POSTGRES_CONN_TIMEOUT || '5000', 10)
  }
};

// ============================================================================
// CLICKHOUSE (AUDIT)
// ============================================================================

const clickhouse = {
  host: process.env.CH_HOST || 'localhost',
  port: parseInt(process.env.CH_PORT || '8123', 10),
  database: process.env.CH_DATABASE || 'genesis',
  user: process.env.CH_USER || 'default',
  password: process.env.CH_PASSWORD || '',
  // Request config
  timeout: parseInt(process.env.CH_TIMEOUT || '30000', 10),
  compression: process.env.CH_COMPRESSION === 'true'
};

// ============================================================================
// MONGODB (BACKLOG)
// ============================================================================

const mongodb = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  database: process.env.MONGO_DATABASE || 'genesis',
  options: {
    maxPoolSize: parseInt(process.env.MONGO_POOL_SIZE || '10', 10),
    serverSelectionTimeoutMS: parseInt(process.env.MONGO_TIMEOUT || '5000', 10)
  }
};

// ============================================================================
// GITHUB
// ============================================================================

const github = {
  token: process.env.GITHUB_TOKEN || '',
  owner: process.env.GITHUB_OWNER || 'leonardokasat-cientistavenda',
  repo: process.env.GITHUB_REPO || 'conhecimento-zaz',
  branch: process.env.GITHUB_BRANCH || 'main'
};

// ============================================================================
// LOGGING
// ============================================================================

const logging = {
  level: process.env.LOG_LEVEL || 'info',
  format: process.env.LOG_FORMAT || 'json',
  // Audit obrigatório para comandos destrutivos
  auditRequired: process.env.AUDIT_REQUIRED !== 'false'
};

// ============================================================================
// FEATURE FLAGS
// ============================================================================

const features = {
  // Habilita audit no ClickHouse
  auditEnabled: process.env.FEATURE_AUDIT !== 'false',
  // Modo dry-run (não executa operações destrutivas)
  dryRun: process.env.DRY_RUN === 'true',
  // Verbose mode
  verbose: process.env.VERBOSE === 'true'
};

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  mattermost,
  clickhouse,
  mongodb,
  github,
  logging,
  features,
  
  // Aliases para conveniência
  mm: mattermost,
  ch: clickhouse,
  mongo: mongodb,
  gh: github
};

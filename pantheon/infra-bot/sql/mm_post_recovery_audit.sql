-- ============================================================================
-- mm_post_recovery_audit
-- 
-- Tabela de auditoria para operações de recuperação de posts no Mattermost.
-- 
-- BacklogItem: BKL-INFRA-004
-- ORGANON: z1yixbdgojdh8gfkx4xakfztor
-- 
-- Invariante INV-REC-1: AUDIT_FIRST
-- Toda operação de recovery DEVE registrar aqui ANTES de executar UPDATE no PG.
-- ============================================================================

CREATE TABLE IF NOT EXISTS genesis.mm_post_recovery_audit
(
    -- Identificadores
    trace_id         UUID            COMMENT 'ID único da operação',
    post_id          String          COMMENT 'ID do post no Mattermost (26 chars)',
    
    -- Contexto
    user_id          String          COMMENT 'ID do usuário que solicitou',
    channel_id       String          COMMENT 'Canal de origem da requisição',
    
    -- Operação
    action           Enum8(
        'recover' = 1,
        'check' = 2,
        'error' = 3
    )                                COMMENT 'Tipo de ação',
    
    -- Estado
    status           Enum8(
        'pending' = 0,
        'success' = 1,
        'failed' = 2,
        'skipped' = 3
    )                DEFAULT 'pending' COMMENT 'Status da operação',
    
    -- Dados do post
    delete_at_before Int64           DEFAULT 0 COMMENT 'Valor de delete_at antes da operação',
    delete_at_after  Int64           DEFAULT 0 COMMENT 'Valor de delete_at após a operação',
    
    -- Metadados
    error_message    String          DEFAULT '' COMMENT 'Mensagem de erro se houver',
    duration_ms      UInt32          DEFAULT 0 COMMENT 'Duração da operação em ms',
    
    -- Timestamps
    timestamp        DateTime64(3)   DEFAULT now64(3) COMMENT 'Momento do registro',
    created_at       DateTime        DEFAULT now() COMMENT 'Data de criação (partição)',
    
    -- Versionamento
    _version         UInt32          DEFAULT 1 COMMENT 'Versão do schema'
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(created_at)
ORDER BY (timestamp, trace_id)
TTL created_at + INTERVAL 1 YEAR
SETTINGS index_granularity = 8192;

-- ============================================================================
-- Índices
-- ============================================================================

-- Índice por post_id para buscar histórico de um post
ALTER TABLE genesis.mm_post_recovery_audit
    ADD INDEX IF NOT EXISTS idx_post_id post_id TYPE bloom_filter GRANULARITY 4;

-- Índice por user_id para auditoria por usuário
ALTER TABLE genesis.mm_post_recovery_audit
    ADD INDEX IF NOT EXISTS idx_user_id user_id TYPE bloom_filter GRANULARITY 4;

-- ============================================================================
-- Views Materializadas (opcional, para dashboards)
-- ============================================================================

-- Daily stats
CREATE MATERIALIZED VIEW IF NOT EXISTS genesis.mv_post_recovery_daily
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(day)
ORDER BY (day, action, status)
AS SELECT
    toDate(timestamp) AS day,
    action,
    status,
    count() AS operations,
    avg(duration_ms) AS avg_duration_ms
FROM genesis.mm_post_recovery_audit
GROUP BY day, action, status;

-- ============================================================================
-- Queries úteis
-- ============================================================================

-- Últimas operações
-- SELECT * FROM genesis.mm_post_recovery_audit ORDER BY timestamp DESC LIMIT 10;

-- Histórico de um post
-- SELECT * FROM genesis.mm_post_recovery_audit WHERE post_id = 'xxx' ORDER BY timestamp;

-- Stats diárias
-- SELECT * FROM genesis.mv_post_recovery_daily WHERE day >= today() - 7 ORDER BY day DESC;

-- Taxa de sucesso
-- SELECT 
--     status,
--     count() as total,
--     round(count() * 100.0 / sum(count()) OVER (), 2) as percentage
-- FROM genesis.mm_post_recovery_audit
-- WHERE timestamp >= now() - INTERVAL 24 HOUR
-- GROUP BY status;

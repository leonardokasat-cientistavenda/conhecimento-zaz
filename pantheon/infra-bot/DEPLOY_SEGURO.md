# Deploy Seguro - Orquestrador-Zarah

## 1. Contexto

### 1.1 Incidente (2026-01-05)

O commit `ea930f8` introduziu um erro de caminho de módulo (`../../` ao invés de `../../../`). O deploy automático:
1. Puxou o código quebrado via `git pull`
2. Reiniciou o `index` com `pm2 restart`
3. O `index` entrou em crash loop (MODULE_NOT_FOUND)
4. Todos os workers da ZAZ ficaram offline por ~10 minutos

### 1.2 Root Cause

```
GitHub Push
    ↓
GitHub Actions (curl POST para /deploy)
    ↓
deployService.js → spawn(script, { detached: true })
    ↓
deploy-gitActions.sh
    ├── git pull (puxa código quebrado)
    ├── npm install
    └── pm2 restart index ← CRASH (código inválido)
```

**Problemas identificados:**

| # | Falha | Impacto |
|---|-------|---------|
| 1 | Sem validação de sintaxe pré-restart | Código quebrado entra em produção |
| 2 | Restart ocorre mesmo com erro | Script continua mesmo se código inválido |
| 3 | Sem logging estruturado | Impossível debugar o que aconteceu |
| 4 | Sem rollback automático | Código quebrado fica até intervenção manual |
| 5 | Fire-and-forget | Sem feedback de erro para GitHub Actions |

---

## 2. Solução

### 2.1 Princípios

1. **Validar ANTES de reiniciar** - Código inválido nunca reinicia o processo
2. **Fail-fast** - Abortar ao primeiro erro
3. **Rollback automático** - Se validação falhar, reverter git
4. **Observabilidade** - Logar tudo no ClickHouse
5. **Manter `detached`** - Necessário pois o script reinicia seu próprio pai

### 2.2 Fluxo Novo

```
GitHub Push
    ↓
GitHub Actions (curl POST)
    ↓
deployService.js → spawn(script, { detached: true })
    ↓
deploy-gitActions.sh v2
    │
    ├── 1. Log: deploy_start
    ├── 2. Salvar COMMIT_BEFORE (para rollback)
    ├── 3. git pull
    ├── 4. Log: git_pull_complete
    ├── 5. npm install (se package.json mudou)
    ├── 6. node --check src/index.js ← VALIDAÇÃO
    │       │
    │       ├── SE FALHOU:
    │       │   ├── Log: validation_failed
    │       │   ├── git reset --hard COMMIT_BEFORE
    │       │   ├── Log: rollback_complete
    │       │   └── exit 1 (SEM reiniciar)
    │       │
    │       └── SE PASSOU:
    │           └── continua...
    │
    ├── 7. pm2 restart index
    ├── 8. sleep 10s
    ├── 9. Healthcheck (pm2 status)
    │       │
    │       ├── SE FALHOU:
    │       │   ├── git reset --hard COMMIT_BEFORE
    │       │   ├── pm2 restart index
    │       │   └── Log: rollback_after_healthcheck
    │       │
    │       └── SE PASSOU:
    │           └── Log: deploy_success
    │
    └── 10. pm2 save
```

**Ponto crítico:** O `pm2 restart index` só acontece APÓS validação de sintaxe passar.

---

## 3. Implementação

### 3.1 Tabela ClickHouse

```sql
CREATE TABLE genesis.deploy_logs (
  timestamp DateTime64(3) DEFAULT now64(3),
  level String,
  message String,
  data String,
  service String DEFAULT 'deploy',
  trace_id String
) ENGINE = MergeTree
ORDER BY (timestamp, trace_id)
TTL timestamp + toIntervalDay(90);
```

### 3.2 Script de Deploy

**Arquivo:** `scripts/deploy-gitActions.sh`

```bash
#!/bin/bash
# deploy-gitActions.sh v2 - Deploy com validação e rollback
# Sprint: S-DEPLOY-001
set -e

TRACE_ID="deploy-$(date +%s%3N)-$$"
REPO_DIR="/home/camunda-orquestrador/Orquestrador-Zarah"
CLICKHOUSE_URL="http://10.100.12.19:8123"

# ============================================
# Função de log para ClickHouse
# ============================================
log_ch() {
  local level="$1"
  local event="$2"
  local message="$3"
  local extra="${4:-{}}"
  
  local timestamp=$(date -u +"%Y-%m-%d %H:%M:%S.%3N")
  local data="{\"event\":\"$event\",\"extra\":$extra}"
  
  # Escapar aspas simples para SQL
  data=$(echo "$data" | sed "s/'/''/g")
  message=$(echo "$message" | sed "s/'/''/g")
  
  curl -s "$CLICKHOUSE_URL" \
    -H "X-ClickHouse-User: genesis" \
    -d "INSERT INTO genesis.deploy_logs (timestamp, level, message, data, trace_id) VALUES ('$timestamp', '$level', '$message', '$data', '$TRACE_ID')" \
    > /dev/null 2>&1 || true
  
  echo "[$timestamp] [$level] $message"
}

# ============================================
# Setup NVM
# ============================================
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20 || true

cd "$REPO_DIR"

log_ch "info" "deploy_start" "Deploy iniciado" "{\"repo\":\"$REPO_DIR\",\"node\":\"$(node -v)\"}"

# ============================================
# 1. Salvar commit atual para rollback
# ============================================
COMMIT_BEFORE=$(git rev-parse HEAD)
log_ch "info" "commit_before" "Commit atual: $COMMIT_BEFORE" "{\"sha\":\"$COMMIT_BEFORE\"}"

# ============================================
# 2. Git Pull
# ============================================
log_ch "info" "git_pull_start" "Iniciando git pull"

if ! OUTPUT=$(git pull 2>&1); then
  log_ch "error" "git_pull_failed" "Falha no git pull: $OUTPUT"
  exit 1
fi

COMMIT_AFTER=$(git rev-parse HEAD)
log_ch "info" "git_pull_complete" "Git pull completo" "{\"sha_before\":\"$COMMIT_BEFORE\",\"sha_after\":\"$COMMIT_AFTER\"}"

# Se não mudou nada, sair
if [ "$COMMIT_BEFORE" = "$COMMIT_AFTER" ]; then
  log_ch "info" "no_changes" "Nenhuma mudança detectada"
  exit 0
fi

# ============================================
# 3. NPM Install (se necessário)
# ============================================
if git diff --name-only "$COMMIT_BEFORE" "$COMMIT_AFTER" | grep -q "package.json"; then
  log_ch "info" "npm_install_start" "package.json mudou, executando npm install"
  npm install --production
  log_ch "info" "npm_install_complete" "npm install completo"
fi

# ============================================
# 4. VALIDAÇÃO DE SINTAXE (CRÍTICO)
# ============================================
log_ch "info" "validation_start" "Validando sintaxe do código"

if ! OUTPUT=$(node --check src/index.js 2>&1); then
  log_ch "error" "validation_failed" "Sintaxe inválida! Fazendo rollback..." "{\"error\":\"$OUTPUT\"}"
  
  git reset --hard "$COMMIT_BEFORE"
  log_ch "warn" "rollback_syntax" "Rollback para $COMMIT_BEFORE (sintaxe inválida)" "{\"sha\":\"$COMMIT_BEFORE\"}"
  
  # NÃO reinicia - mantém processo atual rodando
  exit 1
fi

log_ch "info" "validation_passed" "Sintaxe válida"

# ============================================
# 5. Restart Apps
# ============================================
log_ch "info" "restart_start" "Reiniciando apps"

pm2 restart index --update-env || true

# Restart infra-bot se existir
if pm2 describe infra-bot > /dev/null 2>&1; then
  pm2 restart infra-bot --update-env || true
fi

# Restart pantheon se existir  
if pm2 describe pantheon > /dev/null 2>&1; then
  pm2 restart pantheon --update-env || true
fi

# ============================================
# 6. Healthcheck
# ============================================
log_ch "info" "healthcheck_start" "Aguardando healthcheck (10s)"
sleep 10

# Verificar se index está online
INDEX_STATUS=$(pm2 jlist 2>/dev/null | grep -o '"name":"index"[^}]*"status":"[^"]*"' | grep -o '"status":"[^"]*"' | cut -d'"' -f4 || echo "unknown")

if [ "$INDEX_STATUS" != "online" ]; then
  log_ch "error" "healthcheck_failed" "App index não está online: $INDEX_STATUS" "{\"status\":\"$INDEX_STATUS\"}"
  
  # Rollback
  git reset --hard "$COMMIT_BEFORE"
  npm install --production 2>/dev/null || true
  pm2 restart index --update-env
  
  log_ch "warn" "rollback_healthcheck" "Rollback executado após healthcheck falhar" "{\"sha\":\"$COMMIT_BEFORE\"}"
  exit 1
fi

log_ch "info" "healthcheck_passed" "Healthcheck OK" "{\"status\":\"$INDEX_STATUS\"}"

# ============================================
# 7. Finalização
# ============================================
pm2 save

log_ch "info" "deploy_success" "Deploy completo com sucesso" "{\"sha\":\"$COMMIT_AFTER\"}"

echo "=== DEPLOY COMPLETO ==="
```

### 3.3 Queries Úteis

```sql
-- Últimos deploys
SELECT 
  trace_id,
  MIN(timestamp) as inicio,
  MAX(timestamp) as fim,
  dateDiff('second', MIN(timestamp), MAX(timestamp)) as duracao_s,
  countIf(level = 'error') as erros,
  anyIf(message, message LIKE '%deploy_success%') as resultado
FROM genesis.deploy_logs
WHERE timestamp > now() - INTERVAL 7 DAY
GROUP BY trace_id
ORDER BY inicio DESC
LIMIT 20;

-- Deploys com rollback
SELECT *
FROM genesis.deploy_logs
WHERE message LIKE '%rollback%'
ORDER BY timestamp DESC
LIMIT 10;

-- Falhas de validação
SELECT *
FROM genesis.deploy_logs
WHERE message LIKE '%validation_failed%'
ORDER BY timestamp DESC;
```

---

## 4. Arquivos Relacionados

| Arquivo | Descrição |
|---------|-----------|
| `scripts/deploy-gitActions.sh` | Script principal de deploy |
| `src/services/servidor/deployService.js` | Service que chama o script |
| `.github/workflows/deploy.yml` | GitHub Actions workflow |
| `controller/gitActionsController.js` | Controller que recebe webhook |

---

## 5. Checklist de Deploy Manual

Se precisar fazer deploy manual:

```bash
# 1. SSH no servidor
ssh camunda@10.100.12.24

# 2. Ir para o diretório
cd /home/camunda-orquestrador/Orquestrador-Zarah

# 3. Git pull
git pull

# 4. Validar sintaxe ANTES de reiniciar
node --check src/index.js

# 5. Se OK, reiniciar
pm2 restart index

# 6. Verificar status
pm2 status
```

---

## 6. Troubleshooting

### Deploy não executou

1. Verificar logs do ClickHouse:
```sql
SELECT * FROM genesis.deploy_logs 
WHERE timestamp > now() - INTERVAL 1 HOUR
ORDER BY timestamp DESC;
```

2. Verificar se GitHub Actions rodou (aba Actions no repo)

3. Verificar logs do PM2:
```bash
pm2 logs index --lines 100
```

### Rollback manual

```bash
cd /home/camunda-orquestrador/Orquestrador-Zarah
git log --oneline -5  # Ver commits
git reset --hard <SHA_DO_COMMIT_BOM>
pm2 restart index
```

---

## 7. Histórico

| Data | Versão | Mudança |
|------|--------|---------|
| 2026-01-05 | v2 | Adicionado validação de sintaxe e rollback automático |
| 2025-12-xx | v1 | Versão original (sem validação) |

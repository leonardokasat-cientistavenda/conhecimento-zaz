# Deploy Seguro - Orquestrador-Zarah

> ✅ **STATUS: IMPLEMENTADO E TESTADO** (2026-01-05)
> 
> Sprint S-DEPLOY-001 concluída com sucesso. Rollback automático validado em produção.

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

### 2.2 Fluxo Implementado

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
    │       │   ├── Log: rollback_syntax
    │       │   └── exit 1 (SEM reiniciar) ✅
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
    │       │   └── Log: rollback_healthcheck
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

### 3.2 Helper de Logging

**Arquivo:** `scripts/deploy-log.js`

Helper Node.js que usa o logger padrão do GENESIS (Pino → ClickHouse):

```javascript
const { createLogger } = require('../genesis/lib/logger');

const logger = createLogger({ table: 'deploy_logs', service: 'deploy' });

const [,, level, event, message, extraJson, traceId] = process.argv;

const data = { event };
if (extraJson) Object.assign(data, JSON.parse(extraJson));

logger[level]({ ...data, trace_id: traceId }, message);

// Aguarda flush do buffer
setTimeout(() => process.exit(0), 1500);
```

### 3.3 Credenciais

O logger usa o usuário `infrabot` para escrita no ClickHouse:

```bash
# No .env do index
CLICKHOUSE_USER=infrabot
CLICKHOUSE_PASSWORD="9R#fQ2!mZ@8KxP$A"
```

> ⚠️ **Importante**: O usuário `default` só tem leitura. O `infrabot` tem leitura + escrita.

### 3.4 Script de Deploy

**Arquivo:** `scripts/deploy-gitActions.sh`

Ver arquivo completo no repositório. Principais mudanças da v2:

1. **Logging via Node.js** (não mais curl direto)
2. **Validação com `node --check`**
3. **Rollback automático sem restart**
4. **Healthcheck pós-restart**

---

## 4. Teste de Validação (T03)

### 4.1 Teste Executado (2026-01-05 20:41)

Commit `64a196b` com erro proposital:

```javascript
// ❌ ERRO PROPOSITAL - TESTE DE ROLLBACK S-DEPLOY-001
const SYNTAX_ERROR_TEST = {

const express = require("express");  // Sem fechar o objeto acima
```

### 4.2 Resultado

| Verificação | Resultado |
|-------------|-----------|
| Deploy iniciou | ✅ |
| `node --check` detectou erro | ✅ |
| Rollback automático executado | ✅ |
| Workers NÃO caíram | ✅ (uptime mantido) |
| Logs de erro no ClickHouse | ✅ |

### 4.3 Logs Capturados

```sql
SELECT timestamp, level, message, JSONExtractString(data, 'event') as event
FROM genesis.deploy_logs
WHERE trace_id LIKE 'deploy-1767645%'
ORDER BY timestamp ASC;
```

| timestamp | level | message | event |
|-----------|-------|---------|-------|
| 2026-01-05 20:41:28.468 | info | Deploy iniciado | deploy_start |
| 2026-01-05 20:41:28.475 | info | Commit atual: 7ede7b3... | commit_before |
| 2026-01-05 20:41:28.528 | info | Iniciando git pull | git_pull_start |
| 2026-01-05 20:41:29.354 | info | Git pull completo | git_pull_complete |
| 2026-01-05 20:41:29.455 | info | Validando sintaxe | validation_start |
| 2026-01-05 20:41:29.545 | **error** | Sintaxe inválida! Fazendo rollback... | **validation_failed** |
| 2026-01-05 20:41:29.584 | **warn** | Rollback para 7ede7b3... | **rollback_syntax** |

**Conclusão:** Deploy falhou em < 2 segundos, workers continuaram online, rollback automático funcionou.

---

## 5. Arquivos Relacionados

| Arquivo | Repo | Descrição |
|---------|------|-----------|
| `scripts/deploy-gitActions.sh` | Orquestrador-Zarah | Script principal de deploy v2 |
| `scripts/deploy-log.js` | Orquestrador-Zarah | Helper de logging |
| `genesis/lib/logger.js` | Orquestrador-Zarah | Logger Pino → ClickHouse |
| `scripts/README.md` | Orquestrador-Zarah | Documentação dos scripts |
| `src/services/servidor/deployService.js` | Orquestrador-Zarah | Service que chama o script |
| `.github/workflows/deploy.yml` | Orquestrador-Zarah | GitHub Actions workflow |

---

## 6. Queries Úteis

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
SELECT timestamp, message, JSONExtractString(data, 'error') as error
FROM genesis.deploy_logs
WHERE message LIKE '%validation_failed%'
ORDER BY timestamp DESC;

-- Timeline de um deploy específico
SELECT timestamp, level, message, JSONExtractString(data, 'event') as event
FROM genesis.deploy_logs
WHERE trace_id = 'deploy-XXXXXX'
ORDER BY timestamp ASC;
```

---

## 7. Checklist de Deploy Manual

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

## 8. Troubleshooting

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

## 9. Histórico

| Data | Versão | Sprint | Mudança |
|------|--------|--------|---------|
| 2026-01-05 | v2 | S-DEPLOY-001 | ✅ Validação de sintaxe, rollback automático, logging ClickHouse |
| 2025-12-xx | v1 | - | Versão original (sem validação) |

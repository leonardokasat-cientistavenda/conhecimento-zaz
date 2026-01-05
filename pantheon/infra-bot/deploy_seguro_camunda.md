# Deploy Seguro - Zarah-Camunda

> **Base:** [DEPLOY_SEGURO.md](./DEPLOY_SEGURO.md) - Ler primeiro para entender o padrão

## Status

⏳ **PENDENTE** - Especificação criada, implementação não iniciada

---

## 1. Contexto

### 1.1 Diferença do Orquestrador

| Aspecto | Orquestrador | Zarah-Camunda |
|---------|--------------|---------------|
| Validação local | `node --check` (fácil) | XML parsing (complexo) |
| Impacto de falha | Workers caem | Deploy não acontece* |
| Rollback necessário? | **Crítico** | Útil mas menos crítico |

> *Se BPMN/DMN inválido, o Camunda rejeita mas o sistema não quebra.

### 1.2 Fluxo Atual

```
GitHub Push (Zarah-Camunda)
    ↓
GitHub Actions → curl POST /deploy-camunda (Orquestrador)
    ↓
gitActionsController.js → spawn(deploy-camunda.sh, { detached: true })
    ↓
deploy-camunda.sh
    ├── cd Zarah-Camunda && git pull
    ├── cd Orquestrador-Zarah && cria temp-deploy.js
    └── node temp-deploy.js → camundaDeployService.deployAll()
        └── POST arquivos para Camunda /deployment/create
```

---

## 2. O que já temos ✅

| Item | Localização |
|------|-------------|
| Tabela `genesis.camunda_deploy_logs` | ClickHouse |
| Logging no service | `camundaDeployService.js` |
| GitHub Actions com HMAC | Zarah-Camunda repo |

---

## 3. O que falta ❌

| Item | Prioridade |
|------|------------|
| Rollback se deploy falhar | Alta |
| Logging no script bash | Média |
| Trace ID no script | Média |

---

## 4. Implementação

### 4.1 Arquivos a Modificar

| Arquivo | Repo | Ação |
|---------|------|------|
| `scripts/deploy-camunda.sh` | Orquestrador-Zarah | Atualizar para v2 |

### 4.2 Script v2 - Mudanças

```bash
# ADICIONAR ao deploy-camunda.sh:

# 1. Gerar trace_id
TRACE_ID="camunda-deploy-$(date +%s%3N)-$$"

# 2. Helper de log (reusar deploy-log.js com tabela diferente)
log_ch() {
  local level="$1"
  local event="$2"
  local message="$3"
  local extra="${4:-{}}"
  
  node "$REPO_WORKER/scripts/deploy-log.js" "$level" "$event" "$message" "$extra" "$TRACE_ID" "camunda_deploy_logs" &
}

# 3. Salvar commit antes do pull
COMMIT_BEFORE=$(cd "$REPO_CAMUNDA" && git rev-parse HEAD)

# 4. Se deploy falhar, fazer rollback
if [ $DEPLOY_EXIT_CODE -ne 0 ]; then
  log_ch "error" "deploy_failed" "Deploy falhou"
  cd "$REPO_CAMUNDA"
  git reset --hard "$COMMIT_BEFORE"
  log_ch "warn" "rollback" "Rollback para $COMMIT_BEFORE"
  exit 1
fi
```

### 4.3 Atualizar deploy-log.js

Adicionar suporte a tabela customizada (6º parâmetro):

```javascript
// scripts/deploy-log.js
const [,, level, event, message, extraJson, traceId, table] = process.argv;

const logger = createLogger({ 
  table: table || 'deploy_logs',  // default: deploy_logs
  service: 'deploy' 
});
```

---

## 5. Resultado Esperado

### 5.1 Logs no ClickHouse

```sql
SELECT timestamp, level, message, JSONExtractString(data, 'event') as event
FROM genesis.camunda_deploy_logs
WHERE trace_id = 'camunda-deploy-XXXXXX'
ORDER BY timestamp ASC;
```

| timestamp | level | message | event |
|-----------|-------|---------|-------|
| ... | info | Deploy iniciado | deploy_start |
| ... | info | Commit atual: abc123 | commit_before |
| ... | info | Git pull completo | git_pull_complete |
| ... | info | Enviando para Camunda | deploy_request |
| ... | info | Deploy concluído | deploy_success |

### 5.2 Em caso de falha

| timestamp | level | message | event |
|-----------|-------|---------|-------|
| ... | info | Deploy iniciado | deploy_start |
| ... | info | Commit atual: abc123 | commit_before |
| ... | info | Git pull completo | git_pull_complete |
| ... | error | Camunda rejeitou | deploy_failed |
| ... | warn | Rollback para abc123 | rollback |

---

## 6. Tasks

- [ ] T01: Atualizar `scripts/deploy-log.js` para aceitar tabela customizada
- [ ] T02: Atualizar `scripts/deploy-camunda.sh` v2 com rollback e logging
- [ ] T03: Testar com deploy válido
- [ ] T04: Testar rollback com BPMN inválido

---

## 7. Referências

- Script base: `Orquestrador-Zarah/scripts/deploy-camunda.sh`
- Service: `Orquestrador-Zarah/src/services/servidor/camundaDeployService.js`
- Controller: `Orquestrador-Zarah/controller/gitActionsController.js`
- GitHub Actions: `Zarah-Camunda/.github/workflows/deploy.yml`

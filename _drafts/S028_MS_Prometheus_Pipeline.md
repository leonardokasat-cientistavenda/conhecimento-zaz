# MS_Prometheus_Pipeline v1.1

---

```yaml
nome: MS_Prometheus_Pipeline
versao: "1.1"
tipo: Meta-Sistema
status: Draft
sprint: S028
data: 2025-12-18
pai: genesis/PROMETHEUS.md
```

---

## 1. Problema (M0)

### 1.1 Contexto

PROMETHEUS desenvolve artefatos (BPMN, DMN, Workers) mas precisa validar e testar **antes** de pedir aprovação de release, e deployar **após** aprovação.

### 1.2 Fluxo Atual (problema)

```
desenvolver() → aprovar_release → MS_PRODUTO aprova → deployar()
                     ↑
              sem validação/teste
              automático antes
```

### 1.3 Fluxo Desejado

```
desenvolver() → [VALIDATE+TEST] → aprovar_release → MS_PRODUTO → [DEPLOY+VERIFY]
```

### 1.4 Tese

> **MS_Prometheus_Pipeline** é o executor de pipeline que valida, testa, deploya e verifica artefatos gerados pelo PROMETHEUS, operando em dois modos distintos conforme o momento do fluxo.

---

## 2. Marco Teórico (M1)

### 2.1 Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MS_Prometheus_Pipeline                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Um Meta-Sistema, dois modos:                                               │
│                                                                             │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐   │
│  │  modo: "validar"                │  │  modo: "implantar"              │   │
│  │                                 │  │                                 │   │
│  │  VALIDATE → TEST                │  │  DEPLOY → VERIFY                │   │
│  │                                 │  │                                 │   │
│  │  Quando: após desenvolver()     │  │  Quando: após MS_PRODUTO        │   │
│  │  Produz: aprovar_release        │  │           aprovar release       │   │
│  │                                 │  │  Produz: validar_implantacao    │   │
│  └─────────────────────────────────┘  └─────────────────────────────────┘   │
│                                                                             │
│  Storage:                                                                   │
│  - GitHub: artefatos (source of truth)                                      │
│  - db.backlog: fila e estado                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Arquitetura de Infraestrutura (IMPLEMENTADA)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  INFRAESTRUTURA REAL                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────┐                                                          │
│  │   GitHub      │                                                          │
│  │               │                                                          │
│  │ ZAZ-vendas/   │ ◄── Workers + Backend (código)                           │
│  │ Orquestrador  │                                                          │
│  │ -Zarah        │                                                          │
│  │               │                                                          │
│  │ ZAZ-vendas/   │ ◄── Artefatos Camunda (BPMN/DMN/Forms)                   │
│  │ _Zarah-Camunda│                                                          │
│  │   ├─ Genesis/ │                                                          │
│  │   └─ Prometheus│                                                         │
│  └───────┬───────┘                                                          │
│          │                                                                  │
│          │ webhook (HMAC)                                                   │
│          ▼                                                                  │
│  ┌───────────────┐      ┌───────────────┐                                   │
│  │ Servidor      │      │ Servidor      │                                   │
│  │ Worker        │─────►│ Camunda       │                                   │
│  │ (exposto)     │ API  │ (interno)     │                                   │
│  │               │ REST │               │                                   │
│  │ /deploy       │      │ :8080         │                                   │
│  │ /deploy-camunda      │               │                                   │
│  └───────────────┘      └───────────────┘                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Estrutura de Pastas no Servidor

```
/home/camunda-orquestrador/
│
├── Orquestrador-Zarah/              # Git: ZAZ-vendas/Orquestrador-Zarah
│   ├── worker/                      # Workers Camunda
│   │   ├── openAI/
│   │   ├── gemini/
│   │   ├── anthropic/               # NOVO - S027
│   │   └── agente/                  # NOVO - S027
│   ├── controller/
│   │   └── gitActionsController.js  # Endpoints de deploy
│   ├── src/services/servidor/
│   │   ├── deployService.js         # Deploy workers
│   │   └── camundaDeployService.js  # Deploy Camunda (NOVO)
│   └── scripts/
│       ├── deploy-gitActions.sh     # Deploy workers (existente)
│       └── deploy-camunda.sh        # Deploy Camunda (NOVO)
│
└── _Zarah-Camunda/                  # Git: ZAZ-vendas/_Zarah-Camunda (NOVO)
    ├── Genesis/                     # Artefatos GENESIS
    │   ├── bpmn/
    │   ├── dmn/
    │   └── forms/
    └── Prometheus/                  # Artefatos PROMETHEUS
        ├── bpmn/
        ├── dmn/
        └── forms/
```

### 2.4 Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FLUXO INTEGRADO COM PROMETHEUS                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROMETHEUS.desenvolver()                                                   │
│       │                                                                     │
│       ├── Workers geram artefatos → commit GitHub                           │
│       │                                                                     │
│       └── db.backlog.insert({                                               │
│               tipo: "executar_pipeline",                                    │
│               modo: "validar",              ◄── PRIMEIRO PIPELINE           │
│               contexto: {artefatos: [...]}                                  │
│           })                                                                │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  MS_Prometheus_Pipeline.consumir()                                          │
│       │                                                                     │
│       ├── [VALIDATE] sintaxe BPMN/DMN, ESLint workers                       │
│       └── [TEST] unit tests, cobertura                                      │
│       │                                                                     │
│       └── SE sucesso:                                                       │
│               db.backlog.insert({                                           │
│                   tipo: "aprovar_release",  ◄── PARA MS_PRODUTO             │
│                   contexto: {                                               │
│                       release_ref,                                          │
│                       testes_passaram: true,                                │
│                       cobertura: 85%                                        │
│                   }                                                         │
│               })                                                            │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  MS_PRODUTO.aprovar_release()                                               │
│       │                                                                     │
│       └── SE aprova:                                                        │
│               db.backlog.insert({                                           │
│                   tipo: "executar_pipeline",                                │
│                   modo: "implantar",        ◄── SEGUNDO PIPELINE            │
│                   contexto: {artefatos: [...]}                              │
│               })                                                            │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  MS_Prometheus_Pipeline.consumir()                                          │
│       │                                                                     │
│       ├── [DEPLOY] Camunda REST API + workers para ZAZ-vendas               │
│       └── [VERIFY] health check, smoke test                                 │
│       │                                                                     │
│       └── SE sucesso:                                                       │
│               db.backlog.insert({                                           │
│                   tipo: "validar_implantacao",                              │
│                   contexto: {                                               │
│                       deployment_id,                                        │
│                       ambiente: "producao"                                  │
│                   }                                                         │
│               })                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.5 Tecnologias

| Componente | Tecnologia | Justificativa |
|------------|------------|---------------|
| Orquestração | GitHub Actions | CI/CD nativo, integrado com repos |
| Deploy BPMN/DMN | Camunda 7 REST API | POST /engine-rest/deployment/create |
| Deploy Workers | Git push + webhook | Trigger via HMAC |
| Testes Workers | Jest | Stack JS existente |
| Validação | xmllint + ESLint | Sintaxe XML e JS |

---

## 3. Objeto (M2)

### 3.1 Definição

**MS_Prometheus_Pipeline** é o Meta-Sistema que executa pipelines de validação, teste, deploy e verificação de artefatos gerados pelo PROMETHEUS.

### 3.2 Fronteiras

| É | Não É |
|---|-------|
| Validador de sintaxe (BPMN, DMN, JS) | Gerador de artefatos (PROMETHEUS) |
| Executor de testes | Definidor de testes (Schema TDD) |
| Deployer para Camunda | Executor de processos (Camunda runtime) |
| Verificador de deploy | Monitor de execução (Cockpit) |
| Transportador de workers | Gerenciador de secrets (GitHub) |

### 3.3 Interface

```yaml
# Tipo consumido do backlog
tipo_consumido: "executar_pipeline"

# Input
contexto:
  modo: "validar" | "implantar"
  release_ref: string
  sprint_origem: string
  artefatos:
    - tipo: "bpmn" | "dmn" | "worker"
      arquivo: string
      path: string      # path no GitHub
      sha: string       # commit SHA

# Output (resultado)
resultado:
  status: "sucesso" | "falha"
  modo: string
  etapas:
    validate:           # se modo=validar
      status: "success" | "failed" | "skipped"
      erros: []
    test:               # se modo=validar
      status: "success" | "failed" | "skipped"
      cobertura: number
      passou: number
      falhou: number
    deploy:             # se modo=implantar
      status: "success" | "failed" | "skipped"
      deployment_id: string
      commit_workers: string
    verify:             # se modo=implantar
      status: "success" | "failed" | "skipped"
      checks: []
```

### 3.4 Extensões Suportadas

| Extensão | Tipo | Descrição |
|----------|------|-----------|
| `.bpmn` | Processo | Definição de processo BPMN 2.0 |
| `.dmn` | Decisão | Tabela de decisão DMN |
| `.form` | Formulário | Camunda Forms (JSON) |
| `.html` | Formulário | Embedded Forms (HTML) |

---

## 4. Classe (M3) - Implementação

### 4.1 Deploy Workers (Existente - Corrigido)

**Problema resolvido:** Script fazia `pm2 stop 0` + `pm2 start 0`, mas o stop matava o processo antes do start executar.

**Solução:** Usar `pm2 restart 0` (atômico).

```bash
#!/bin/bash
# deploy-gitActions.sh (CORRIGIDO)

cd /home/camunda-orquestrador/Orquestrador-Zarah

# Git pull
git pull

# Atualizar bibliotecas NPM
npm install

# Restart atômico (não usa stop/start separados)
pm2 restart 0
```

### 4.2 Deploy Camunda (NOVO)

#### 4.2.1 Script: deploy-camunda.sh

```bash
#!/bin/bash
# deploy-camunda.sh

set -e

# Configurações
BASE_DIR="/home/camunda-orquestrador"
REPO_DIR="$BASE_DIR/_Zarah-Camunda"
CAMUNDA_URL="${CAMUNDA_URL:-http://localhost:8080}"
CAMUNDA_USER="${CAMUNDA_USER:-demo}"
CAMUNDA_PASS="${CAMUNDA_PASS:-demo}"

# Pastas de produtos
PRODUTOS=("Genesis" "Prometheus")

# Extensões suportadas
EXTENSOES="bpmn dmn form html"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Verifica conexão com Camunda
check_camunda() {
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
        -u "$CAMUNDA_USER:$CAMUNDA_PASS" \
        "$CAMUNDA_URL/engine-rest/engine")
    
    if [ "$HTTP_CODE" -eq 200 ]; then
        log "✓ Camunda acessível"
        return 0
    else
        log "✗ Camunda não acessível (HTTP $HTTP_CODE)"
        return 1
    fi
}

# Deploy de uma pasta de produto
deploy_produto() {
    local produto=$1
    local pasta="$REPO_DIR/$produto"
    
    log "Processando: $produto"
    
    if [ ! -d "$pasta" ]; then
        log "✗ Pasta não encontrada: $pasta"
        return 1
    fi
    
    # Encontrar arquivos suportados
    local arquivos=()
    local curl_args=()
    
    for ext in $EXTENSOES; do
        while IFS= read -r -d '' arquivo; do
            arquivos+=("$arquivo")
        done < <(find "$pasta" -type f -name "*.$ext" -print0 2>/dev/null)
    done
    
    if [ ${#arquivos[@]} -eq 0 ]; then
        log "Nenhum artefato encontrado"
        return 0
    fi
    
    log "Encontrados ${#arquivos[@]} arquivo(s)"
    
    # Montar argumentos do curl
    for arquivo in "${arquivos[@]}"; do
        nome=$(basename "$arquivo")
        log "  - $nome"
        curl_args+=(-F "$nome=@$arquivo")
    done
    
    # Nome do deployment
    local deployment_name="$produto-$(date '+%Y%m%d-%H%M%S')"
    
    # Fazer deploy
    RESPONSE=$(curl -s -w "\n%{http_code}" \
        -u "$CAMUNDA_USER:$CAMUNDA_PASS" \
        -F "deployment-name=$deployment_name" \
        -F "deploy-changed-only=true" \
        -F "enable-duplicate-filtering=true" \
        "${curl_args[@]}" \
        "$CAMUNDA_URL/engine-rest/deployment/create")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    
    if [ "$HTTP_CODE" -eq 200 ]; then
        log "✓ Deploy concluído!"
        return 0
    else
        log "✗ Falha no deploy (HTTP $HTTP_CODE)"
        return 1
    fi
}

# Main
main() {
    log "========================================"
    log "DEPLOY CAMUNDA - Início"
    log "========================================"
    
    # Git pull
    cd "$REPO_DIR"
    git pull
    
    # Verificar Camunda
    check_camunda || exit 1
    
    # Deploy cada produto
    for produto in "${PRODUTOS[@]}"; do
        deploy_produto "$produto"
    done
    
    log "========================================"
    log "✓ DEPLOY CAMUNDA - Concluído!"
    log "========================================"
}

main "$@"
```

#### 4.2.2 Service: camundaDeployService.js

```javascript
// src/services/servidor/camundaDeployService.js

const { spawn } = require('child_process');

const SCRIPT_PATH = process.env.CAMUNDA_DEPLOY_SCRIPT || 
  '/home/camunda-orquestrador/Orquestrador-Zarah/scripts/deploy-camunda.sh';

const REPO_PATH = process.env.REPO_PATH || 
  '/home/camunda-orquestrador/Orquestrador-Zarah';

function deployCamunda() {
  console.log('[CamundaDeploy] Iniciando script de deploy...');

  const child = spawn('/bin/bash', [SCRIPT_PATH], {
    detached: true,
    stdio: 'inherit',
    cwd: REPO_PATH,
    env: {
      ...process.env,
      CAMUNDA_URL: process.env.CAMUNDA_URL || 'http://localhost:8080',
      CAMUNDA_USER: process.env.CAMUNDA_USER || 'demo',
      CAMUNDA_PASS: process.env.CAMUNDA_PASS || 'demo'
    }
  });

  child.unref();
  console.log('[CamundaDeploy] Script iniciado em background');
}

module.exports = { deployCamunda };
```

#### 4.2.3 Controller: Endpoint /deploy-camunda

```javascript
// Adicionar ao gitActionsController.js

const { deployCamunda } = require("../src/services/servidor/camundaDeployService.js");

const webhookCamunda = async (req, res) => {
  console.log('[GitActions] Recebido: POST /deploy-camunda');

  if (!isValidSignature(req)) {
    return res.status(401).json({ error: "Não Autorizado" });
  }

  if (req.body.branch && req.body.branch !== "main") {
    return res.status(200).json({ message: "Branch ignorada" });
  }

  deployCamunda(); // execução assíncrona

  return res.status(202).json({ 
    success: true,
    message: "Deploy Camunda agendado" 
  });
};

router.post("/deploy-camunda", webhookCamunda);
```

#### 4.2.4 Workflow: deploy-camunda.yml

```yaml
# .github/workflows/deploy-camunda.yml
# Repo: ZAZ-vendas/_Zarah-Camunda

name: Deploy Camunda

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Build signature
        id: sign
        run: |
          TIMESTAMP=$(date +%s%3N)
          BODY='{"branch":"main"}'
          SIGNATURE=$(echo -n "$TIMESTAMP.$BODY" \
            | openssl dgst -sha256 -hmac "${{ secrets.DEPLOY_SECRET }}" \
            | sed 's/^.* //')
          echo "timestamp=$TIMESTAMP" >> $GITHUB_OUTPUT
          echo "body=$BODY" >> $GITHUB_OUTPUT
          echo "signature=$SIGNATURE" >> $GITHUB_OUTPUT

      - name: Call deploy API
        run: |
          curl -X POST "${{ secrets.DEPLOY_URL }}-camunda" \
            -H "Content-Type: application/json" \
            -H "X-Timestamp: ${{ steps.sign.outputs.timestamp }}" \
            -H "X-Signature: sha256=${{ steps.sign.outputs.signature }}" \
            --data-raw '${{ steps.sign.outputs.body }}'
```

### 4.3 Configuração

#### 4.3.1 Variáveis de Ambiente (.env)

```env
# Camunda
CAMUNDA_URL=http://localhost:8080
CAMUNDA_USER=admin
CAMUNDA_PASS=senha

# Anthropic (para worker MS_Agente)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Paths
REPO_PATH=/home/camunda-orquestrador/Orquestrador-Zarah
CAMUNDA_DEPLOY_SCRIPT=/home/camunda-orquestrador/Orquestrador-Zarah/scripts/deploy-camunda.sh
```

#### 4.3.2 GitHub Secrets

| Secret | Repositório | Descrição |
|--------|-------------|-----------|
| `DEPLOY_SECRET` | Orquestrador-Zarah | HMAC key |
| `DEPLOY_URL` | Orquestrador-Zarah | URL base webhook |
| `DEPLOY_SECRET` | _Zarah-Camunda | HMAC key (mesmo) |
| `DEPLOY_URL` | _Zarah-Camunda | URL base webhook (mesmo) |

### 4.4 Fluxo de Deploy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  DEPLOY WORKERS                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Push: ZAZ-vendas/Orquestrador-Zarah                                        │
│       │                                                                     │
│       ▼                                                                     │
│  GitHub Actions → POST /deploy (webhook)                                    │
│       │                                                                     │
│       ▼                                                                     │
│  deploy-gitActions.sh:                                                      │
│       ├── git pull                                                          │
│       ├── npm install                                                       │
│       └── pm2 restart 0  ◄── CORRIGIDO (antes era stop/start)               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DEPLOY CAMUNDA (BPMN/DMN/Forms)                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Push: ZAZ-vendas/_Zarah-Camunda                                            │
│       │                                                                     │
│       ▼                                                                     │
│  GitHub Actions → POST /deploy-camunda (webhook)                            │
│       │                                                                     │
│       ▼                                                                     │
│  deploy-camunda.sh:                                                         │
│       ├── git pull (_Zarah-Camunda)                                         │
│       ├── check_camunda() - verifica conexão                                │
│       └── para cada produto (Genesis, Prometheus):                          │
│           ├── encontra .bpmn, .dmn, .form, .html                            │
│           └── curl POST /engine-rest/deployment/create                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Critérios de Aceite

| Critério | Status |
|----------|--------|
| Deploy workers via webhook funcional | ✅ |
| Script workers corrigido (pm2 restart) | ✅ |
| Estrutura _Zarah-Camunda definida | ✅ |
| Script deploy-camunda.sh criado | ✅ |
| Service camundaDeployService.js criado | ✅ |
| Endpoint /deploy-camunda definido | ✅ |
| Workflow GitHub Actions Camunda | ✅ |
| Suporte a .bpmn, .dmn, .form, .html | ✅ |
| MS consome tipo "executar_pipeline" do backlog | ⬜ |
| Modo "validar" executa VALIDATE + TEST | ⬜ |
| Modo "implantar" executa DEPLOY + VERIFY | ⬜ |

---

## 6. Artefatos Gerados

| Artefato | Localização | Status |
|----------|-------------|--------|
| deploy-camunda.sh | scripts/ | ZIP gerado |
| camundaDeployService.js | src/services/servidor/ | ZIP gerado |
| gitActionsController (adicionar) | controller/ | ZIP gerado |
| deploy-camunda.yml | .github/workflows/ | ZIP gerado |
| README instalação | - | ZIP gerado |

**ZIP:** `deploy-camunda-pipeline.zip`

---

## 7. Próximos Passos

1. **Gabriel:** Criar repo `ZAZ-vendas/_Zarah-Camunda`
2. **Gabriel:** Clonar no servidor ao lado de Orquestrador-Zarah
3. **Gabriel:** Instalar arquivos do ZIP
4. **Gabriel:** Configurar secrets no GitHub
5. **Leonardo:** Criar API key Anthropic e enviar
6. **Testar:** Deploy manual com `./scripts/deploy-camunda.sh`
7. **Testar:** Push no _Zarah-Camunda para trigger automático

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| genesis/PROMETHEUS.md | Pai - fluxo desenvolver/deployar |
| genesis/PROMETHEUS_Arquitetura.md | Contratos e ciclo |
| docs/04_B/MS_Backlog.md | Message broker |
| _artefatos/S027/worker/ | Workers Anthropic e Agente |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-18 | Documento consolidado M1-M2-M3. Dois modos (validar/implantar). |
| 1.1 | 2025-12-18 | Implementação real: correção pm2 restart, script deploy-camunda.sh, service, controller, workflow. Estrutura _Zarah-Camunda/Genesis e Prometheus. |

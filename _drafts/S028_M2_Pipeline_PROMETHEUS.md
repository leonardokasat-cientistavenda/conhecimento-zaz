# S028_M2: Pipeline PROMETHEUS - Object Definition

| Meta | Valor |
|------|-------|
| **Sprint** | S028 |
| **Sistema** | Pipeline PROMETHEUS |
| **Fase** | M2 - Object Definition |
| **Versão** | 1.0 |
| **Data** | 2025-12-18 |
| **Dependência** | M1 v2.0 (Camunda 7) |

---

## 1. Identidade do Objeto

### 1.1 Definição

```
┌─────────────────────────────────────────────────────────────────┐
│                    PIPELINE PROMETHEUS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  "Sistema de deploy automatizado que transporta artefatos       │
│   gerados pelo GENESIS (BPMN, DMN, Workers) do ambiente de      │
│   especificação para o ambiente de execução, sem intervenção    │
│   manual."                                                       │
│                                                                  │
│  Metáfora: Prometeu que leva o "fogo" (artefatos)               │
│            do Olimpo (conhecimento-zaz) para os humanos         │
│            (ZAZ-vendas/Camunda)                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Signo Semântico

| Componente | Valor |
|------------|-------|
| **Signo** | Pipeline PROMETHEUS |
| **Significante** | /pipeline prometheus/ |
| **Significado** | Automação CI/CD para artefatos Camunda |
| **Contexto** | GENESIS → Produção ZAZ |

---

## 2. Limites do Objeto

### 2.1 Responsabilidades (É)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROMETHEUS É                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ Validador de sintaxe (BPMN/DMN/JS)                          │
│  ✅ Executor de testes unitários                                 │
│  ✅ Deployer de artefatos via REST API                          │
│  ✅ Verificador de deploy (health check)                        │
│  ✅ Notificador de status (success/failure)                     │
│  ✅ Transportador de workers para ZAZ-vendas                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Não-Responsabilidades (Não É)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROMETHEUS NÃO É                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ❌ Gerador de artefatos (responsabilidade do GENESIS)          │
│  ❌ Executor de processos (responsabilidade do Camunda)         │
│  ❌ Gerenciador de secrets (responsabilidade do GitHub)         │
│  ❌ Monitor de execução (responsabilidade do Cockpit)           │
│  ❌ Rollback automático (fora do escopo MVP)                    │
│  ❌ Multi-tenant (fora do escopo MVP)                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Diagrama de Contexto

```
                    ┌─────────────────────┐
                    │      GENESIS        │
                    │  (gera artefatos)   │
                    └──────────┬──────────┘
                               │
                               │ trigger: push to main
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│                      PIPELINE PROMETHEUS                          │
│                                                                   │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐          │
│  │VALIDATE │──►│  TEST   │──►│ DEPLOY  │──►│ VERIFY  │          │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘          │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
          │                          │                    │
          │                          │                    │
          ▼                          ▼                    ▼
    ┌──────────┐              ┌──────────┐         ┌──────────┐
    │ GitHub   │              │ Camunda  │         │  Slack   │
    │ (workers)│              │   7 CE   │         │ (notify) │
    └──────────┘              └──────────┘         └──────────┘
```

---

## 3. Interface do Objeto

### 3.1 Inputs

| Input | Tipo | Origem | Descrição |
|-------|------|--------|-----------|
| `trigger` | event | GitHub Push/Manual | Dispara pipeline |
| `bpmn_files` | file[] | conhecimento-zaz | Processos BPMN |
| `dmn_files` | file[] | conhecimento-zaz | Decisões DMN |
| `worker_files` | file[] | conhecimento-zaz | Workers JavaScript |
| `environment` | enum | workflow_dispatch | staging \| production |

### 3.2 Outputs

| Output | Tipo | Destino | Descrição |
|--------|------|---------|-----------|
| `deployment_id` | string | Camunda | ID do deployment |
| `process_definitions` | object[] | Camunda | Processos deployados |
| `decision_definitions` | object[] | Camunda | Decisões deployadas |
| `status` | enum | GitHub/Slack | success \| failure |
| `workers_commit` | string | ZAZ-vendas | SHA do commit dos workers |

### 3.3 Secrets Requeridos

| Secret | Descrição | Onde Configurar |
|--------|-----------|-----------------|
| `CAMUNDA_URL` | URL do Camunda REST API | GitHub Secrets |
| `CAMUNDA_USER` | Usuário (se autenticado) | GitHub Secrets |
| `CAMUNDA_PASSWORD` | Senha (se autenticado) | GitHub Secrets |
| `ZAZ_VENDAS_DEPLOY_KEY` | SSH key para push | GitHub Secrets |
| `SLACK_WEBHOOK` | Webhook notificações | GitHub Secrets |

---

## 4. Estrutura de Artefatos

### 4.1 Origem: conhecimento-zaz

```
conhecimento-zaz/
├── _sprints/
│   └── S026_MS_Agente/           # Sprint atual
│       ├── artefatos/
│       │   ├── bpmn/
│       │   │   └── bpmn_ms_agente.bpmn
│       │   ├── dmn/
│       │   │   └── dmn_entrada_genesis.dmn
│       │   ├── workers/
│       │   │   ├── workerAnthropic.js
│       │   │   ├── agente-contexto.js
│       │   │   ├── agente-persistir.js
│       │   │   ├── agente-github.js
│       │   │   └── package.json
│       │   └── schemas/
│       │       └── agente.execucoes.json
│       └── tests/
│           └── workers/
│               └── *.test.js
└── .github/
    └── workflows/
        └── deploy-prometheus.yml
```

### 4.2 Destino: ZAZ-vendas

```
ZAZ-vendas/
└── Orquestrador-Zarah/
    ├── worker/
    │   ├── workerAnthropic.js      ◄── copiado
    │   ├── agente-contexto.js      ◄── copiado
    │   ├── agente-persistir.js     ◄── copiado
    │   └── agente-github.js        ◄── copiado
    ├── bpmn/
    │   └── (via Camunda deploy)
    └── dmn/
        └── (via Camunda deploy)
```

### 4.3 Destino: Camunda 7

```
Camunda Engine
├── Deployments/
│   └── ms-agente-{sha}/
│       ├── bpmn_ms_agente.bpmn
│       └── dmn_entrada_genesis.dmn
├── Process Definitions/
│   └── bpmn_ms_agente:1
└── Decision Definitions/
    └── dmn_entrada_genesis:1
```

---

## 5. Artefatos S026 para Deploy

### 5.1 Mapeamento

| Artefato | Tipo | Arquivo | Destino |
|----------|------|---------|---------|
| MS_Agente Process | BPMN | bpmn_ms_agente.bpmn | Camunda |
| GENESIS Entry Point | DMN | dmn_entrada_genesis.dmn | Camunda |
| Worker Anthropic | JS | workerAnthropic.js | ZAZ-vendas |
| Worker Contexto | JS | agente-contexto.js | ZAZ-vendas |
| Worker Persistir | JS | agente-persistir.js | ZAZ-vendas |
| Worker GitHub | JS | agente-github.js | ZAZ-vendas |

### 5.2 Dependências de Deploy

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORDEM DE DEPLOY                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. DMN (dmn_entrada_genesis.dmn)                               │
│     └── Decisões devem existir antes de serem chamadas          │
│                                                                  │
│  2. BPMN (bpmn_ms_agente.bpmn)                                  │
│     └── Processo referencia decisões                            │
│                                                                  │
│  3. Workers (*.js)                                               │
│     └── External tasks precisam de workers para executar        │
│                                                                  │
│  Nota: DMN e BPMN podem ser deployados juntos (mesmo request)   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Estados do Pipeline

### 6.1 State Machine

```
                    ┌──────────────────┐
                    │     IDLE         │
                    │  (aguardando)    │
                    └────────┬─────────┘
                             │ push/manual trigger
                             ▼
                    ┌──────────────────┐
              ┌─────│   VALIDATING    │─────┐
              │     │ (syntax check)   │     │
              │     └────────┬─────────┘     │
              │              │ pass          │ fail
              │              ▼               ▼
              │     ┌──────────────────┐   ┌────────┐
              │     │    TESTING       │   │ FAILED │
              │     │  (unit tests)    │   └────────┘
              │     └────────┬─────────┘     ▲
              │              │ pass          │
              │              ▼               │ fail
              │     ┌──────────────────┐     │
              │     │   DEPLOYING      │─────┘
              │     │ (REST API call)  │
              │     └────────┬─────────┘
              │              │ success
              │              ▼
              │     ┌──────────────────┐
              │     │   VERIFYING      │─────┐
              │     │ (health check)   │     │ fail
              │     └────────┬─────────┘     │
              │              │ pass          ▼
              │              ▼          ┌────────┐
              │     ┌──────────────────┐│ FAILED │
              └────►│    SUCCESS       │└────────┘
                    │  (completed)     │
                    └──────────────────┘
```

### 6.2 Notificações por Estado

| Estado | Notificação | Canal |
|--------|-------------|-------|
| VALIDATING | - | - |
| TESTING | - | - |
| DEPLOYING | 🚀 Deploy iniciado | Slack |
| SUCCESS | ✅ Deploy concluído | Slack + GitHub |
| FAILED | ❌ Deploy falhou | Slack + GitHub |

---

## 7. Contratos

### 7.1 Contrato de Validação

```yaml
# validation-contract.yaml
validation:
  bpmn:
    - xml_syntax: required
    - process_id: required, matches /^bpmn_[a-z_]+$/
    - start_event: required
    - end_event: required
  
  dmn:
    - xml_syntax: required
    - decision_id: required, matches /^dmn_[a-z_]+$/
    - input_expressions: required
    - output_expressions: required
  
  workers:
    - eslint: no_errors
    - package_json: valid
    - exports: function or class
```

### 7.2 Contrato de Deploy

```yaml
# deploy-contract.yaml
deploy:
  input:
    deployment_name: string, required
    files: file[], min: 1
    duplicate_filtering: boolean, default: true
  
  output:
    success:
      http_code: 200
      body:
        id: string
        name: string
        deploymentTime: datetime
        deployedProcessDefinitions: object
        deployedDecisionDefinitions: object
    
    failure:
      http_code: 4xx | 5xx
      body:
        type: string
        message: string
```

### 7.3 Contrato de Verificação

```yaml
# verify-contract.yaml
verify:
  checks:
    - process_definition_exists:
        endpoint: /process-definition/key/{key}
        expected: http_200, body.id exists
    
    - decision_definition_exists:
        endpoint: /decision-definition/key/{key}
        expected: http_200, body.id exists
  
  timeout: 30s
  retries: 3
```

---

## 8. Configuração

### 8.1 Arquivo de Configuração

```yaml
# prometheus.config.yaml
prometheus:
  version: "1.0"
  
  source:
    repository: conhecimento-zaz
    branch: main
    paths:
      bpmn: "_sprints/S026/artefatos/bpmn/*.bpmn"
      dmn: "_sprints/S026/artefatos/dmn/*.dmn"
      workers: "_sprints/S026/artefatos/workers/*.js"
  
  targets:
    camunda:
      url: "${CAMUNDA_URL}"
      auth:
        type: basic  # ou none
        user: "${CAMUNDA_USER}"
        password: "${CAMUNDA_PASSWORD}"
    
    workers:
      repository: ZAZ-vendas
      path: "Orquestrador-Zarah/worker"
  
  quality_gates:
    syntax:
      enabled: true
      fail_fast: true
    
    tests:
      enabled: true
      coverage_threshold: 70
    
    approval:
      enabled: false  # MVP
      required_reviewers: 1
  
  notifications:
    slack:
      enabled: true
      webhook: "${SLACK_WEBHOOK}"
      channel: "#deploys"
```

---

## 9. Métricas

### 9.1 Métricas de Pipeline

| Métrica | Descrição | Target |
|---------|-----------|--------|
| `pipeline_duration` | Tempo total do pipeline | < 5 min |
| `deploy_success_rate` | % de deploys bem-sucedidos | > 95% |
| `test_coverage` | Cobertura de testes | > 70% |
| `validation_errors` | Erros de validação | 0 |

### 9.2 Logs Estruturados

```json
{
  "timestamp": "2025-12-18T10:30:00Z",
  "pipeline": "prometheus",
  "run_id": "12345",
  "stage": "deploy",
  "status": "success",
  "duration_ms": 2500,
  "artifacts": {
    "bpmn": ["bpmn_ms_agente.bpmn"],
    "dmn": ["dmn_entrada_genesis.dmn"],
    "workers": 4
  },
  "deployment_id": "dep-abc123"
}
```

---

## 10. Critérios de Aceitação M2

| ID | Critério | Status |
|----|----------|--------|
| M2.1 | Limites do objeto definidos | ✅ |
| M2.2 | Interface (inputs/outputs) especificada | ✅ |
| M2.3 | Artefatos S026 mapeados | ✅ |
| M2.4 | Estrutura de diretórios definida | ✅ |
| M2.5 | Contratos especificados | ✅ |
| M2.6 | Secrets listados | ✅ |
| M2.7 | Estados e transições documentados | ✅ |

---

## 11. Próximos Passos → M3

Com o objeto delimitado:

1. **M3.W** - Implementar GitHub Actions Workflow
2. **M3.S** - Criar script de deploy (Node.js)
3. **M3.T** - Configurar testes automatizados
4. **M3.C** - Definir estrutura no conhecimento-zaz

---

## Validação

**Pergunta de Validação M2:**
> "O Pipeline PROMETHEUS pode ser implementado com este escopo dentro de uma sprint?"

**Resposta:** Sim. O MVP está contido em:
- 1 workflow GitHub Actions
- 1 script de deploy (curl/axios)
- Estrutura de diretórios
- Configuração de secrets

Complexidade estimada: 3-5 dias de implementação.
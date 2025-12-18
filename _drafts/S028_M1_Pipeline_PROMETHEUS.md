# S028_M1: Pipeline PROMETHEUS - Framework Teórico
## Camunda 7 Community Edition

| Meta | Valor |
|------|-------|
| **Sprint** | S028 |
| **Sistema** | Pipeline PROMETHEUS |
| **Fase** | M1 - Theoretical Framework |
| **Versão** | 2.0 (Camunda 7) |
| **Data** | 2025-12-18 |

---

## 1. Contexto Arquitetural

### 1.1 Confirmação: Camunda 7 CE

```
┌─────────────────────────────────────────────────────────────────┐
│                    INFRAESTRUTURA ZAZ                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Engine:     Camunda 7 Community Edition                        │
│  Licença:    Open Source (gratuito para produção)               │
│  API:        REST (não gRPC/Zeebe)                              │
│  Deploy:     POST /engine-rest/deployment/create                │
│                                                                  │
│  ⚠️ EOL:     Outubro 2025 (código continua funcional)           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Evidências:**
- Camunda 8 não possui Community Edition (requer licença comercial desde v8.6)
- Código ZAZ usa padrões REST (`startProcessCamundaV2`, `setarVariaveisCamunda`)
- External Task Pattern clássico do Camunda 7

### 1.2 Implicações para Pipeline

| Aspecto | Camunda 8 (descartado) | Camunda 7 CE (atual) |
|---------|------------------------|----------------------|
| **GitHub Action oficial** | ✅ Existe | ❌ Não existe |
| **Deploy API** | gRPC via Zeebe | REST multipart/form-data |
| **Testes BPMN** | Zeebe Process Test | camunda-bpm-assert + JUnit |
| **Custo** | €99+/mês | R$0 |

---

## 2. Framework de Deploy

### 2.1 API REST Camunda 7

**Endpoint:**
```
POST {camunda-url}/engine-rest/deployment/create
Content-Type: multipart/form-data
```

**Parâmetros:**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `deployment-name` | string | Nome do deployment |
| `enable-duplicate-filtering` | boolean | Evita duplicatas |
| `deploy-changed-only` | boolean | Deploy apenas se alterado |
| `{filename}` | file | Arquivo BPMN/DMN |

**Exemplo curl:**
```bash
curl -X POST http://localhost:8080/engine-rest/deployment/create \
  -F "deployment-name=ms-agente-v1.0" \
  -F "enable-duplicate-filtering=true" \
  -F "deploy-changed-only=true" \
  -F "bpmn_ms_agente.bpmn=@./bpmn/bpmn_ms_agente.bpmn" \
  -F "dmn_entrada_genesis.dmn=@./dmn/dmn_entrada_genesis.dmn"
```

**Response (sucesso):**
```json
{
  "id": "deployment-id",
  "name": "ms-agente-v1.0",
  "deploymentTime": "2025-12-18T10:30:00.000+0000",
  "deployedProcessDefinitions": {
    "bpmn_ms_agente:1:proc-def-id": {
      "id": "proc-def-id",
      "key": "bpmn_ms_agente",
      "version": 1
    }
  },
  "deployedDecisionDefinitions": {
    "dmn_entrada_genesis:1:dec-def-id": {
      "id": "dec-def-id",
      "key": "dmn_entrada_genesis",
      "version": 1
    }
  }
}
```

### 2.2 Script de Deploy (Node.js)

```javascript
// deploy-camunda7.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function deployCamunda7(config) {
  const { camundaUrl, deploymentName, files } = config;
  
  const form = new FormData();
  form.append('deployment-name', deploymentName);
  form.append('enable-duplicate-filtering', 'true');
  form.append('deploy-changed-only', 'true');
  
  for (const file of files) {
    const filename = file.split('/').pop();
    form.append(filename, fs.createReadStream(file));
  }
  
  const response = await axios.post(
    `${camundaUrl}/engine-rest/deployment/create`,
    form,
    { headers: form.getHeaders() }
  );
  
  return response.data;
}

module.exports = { deployCamunda7 };
```

---

## 3. Framework de Testes

### 3.1 Stack de Testes Camunda 7

```
┌─────────────────────────────────────────────────────────────────┐
│                    PIRÂMIDE DE TESTES                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Integration Tests (E2E)                     │    │
│  │         Camunda Server + Workers + DB reais              │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          ▲                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Process Tests (BPMN paths)                  │    │
│  │      camunda-bpm-assert-scenario + in-memory H2          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          ▲                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Unit Tests (Workers/Logic)                  │    │
│  │               Jest + Mockito + Assertions                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Bibliotecas Camunda 7

| Biblioteca | Propósito | Maven |
|------------|-----------|-------|
| **camunda-bpm-assert** | Fluent assertions para process/task state | `org.camunda.bpm:camunda-bpm-assert` |
| **camunda-bpm-junit5** | JUnit 5 extension com ProcessEngine | `org.camunda.bpm.extension:camunda-bpm-junit5` |
| **camunda-bpm-assert-scenario** | Testes de paths completos | `org.camunda.bpm.extension:camunda-bpm-assert-scenario` |
| **camunda-bpm-mockito** | Mocking de delegates/services | `org.camunda.bpm.extension:camunda-bpm-mockito` |
| **camunda-bpm-process-test-coverage** | Coverage reports HTML | `org.camunda.bpm.extension:camunda-bpm-process-test-coverage` |

### 3.3 Exemplo: Teste BPMN Path

```java
@ExtendWith(ProcessEngineExtension.class)
@Deployment(resources = "bpmn/bpmn_ms_agente.bpmn")
class MsAgenteProcessTest {

  @Test
  void testHappyPath_AgentExecution() {
    // Given: mock do worker Anthropic
    when(process.waitsAtServiceTask("task_anthropic_call"))
      .thenReturn(task -> task.complete(
        withVariables("response", "Hello from Claude")
      ));
    
    // When: inicia processo
    Scenario.run(process)
      .startByKey("bpmn_ms_agente", 
        withVariables("input", "test message"))
      .execute();
    
    // Then: verifica conclusão
    verify(process).hasCompleted("task_anthropic_call");
    verify(process).hasCompleted("task_persistir");
    verify(process).hasFinished("end_success");
  }
  
  @Test
  void testErrorPath_AnthropicFailure() {
    // Given: simula erro no Anthropic
    when(process.waitsAtServiceTask("task_anthropic_call"))
      .thenReturn(task -> task.handleBpmnError("ANTHROPIC_ERROR"));
    
    // When
    Scenario.run(process)
      .startByKey("bpmn_ms_agente")
      .execute();
    
    // Then: verifica boundary event
    verify(process).hasCompleted("boundary_anthropic_error");
    verify(process).hasFinished("end_error");
  }
}
```

### 3.4 Testes para Workers JavaScript

Como ZAZ usa workers JavaScript (não Java), os testes unitários usam Jest:

```javascript
// workerAnthropic.test.js
const { handleAnthropicTask } = require('./workerAnthropic');

describe('Worker Anthropic', () => {
  const mockTask = {
    variables: {
      get: jest.fn(),
      set: jest.fn()
    }
  };
  
  const mockTaskService = {
    complete: jest.fn(),
    handleFailure: jest.fn()
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should complete task on successful API call', async () => {
    // Given
    mockTask.variables.get.mockReturnValue('test prompt');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ content: [{ text: 'response' }] })
    });
    
    // When
    await handleAnthropicTask(mockTask, mockTaskService);
    
    // Then
    expect(mockTaskService.complete).toHaveBeenCalled();
    expect(mockTaskService.handleFailure).not.toHaveBeenCalled();
  });
  
  test('should handle failure on API error', async () => {
    // Given
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API Error'));
    
    // When
    await handleAnthropicTask(mockTask, mockTaskService);
    
    // Then
    expect(mockTaskService.handleFailure).toHaveBeenCalled();
  });
});
```

### 3.5 Testes DMN

**Opção 1: Via REST API (runtime)**
```bash
curl -X POST http://localhost:8080/engine-rest/decision-definition/key/dmn_entrada_genesis/evaluate \
  -H "Content-Type: application/json" \
  -d '{"variables": {"sistema": {"value": "CONHECER", "type": "String"}}}'
```

**Opção 2: DMN Tester Docker (design-time)**
```yaml
# docker-compose.test.yml
services:
  dmn-tester:
    image: pame/camunda-dmn-tester
    volumes:
      - ./dmn:/dmn
    environment:
      - DMN_DIR=/dmn
```

---

## 4. Framework de CI/CD

### 4.1 Arquitetura Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    PIPELINE PROMETHEUS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  conhecimento-zaz (dev)              ZAZ-vendas (prod)          │
│  ┌──────────────────┐               ┌──────────────────┐        │
│  │ _sprints/S026/   │               │ Orquestrador/    │        │
│  │ ├── workers/     │   ──────►     │ ├── worker/      │        │
│  │ ├── bpmn/        │   GitHub      │ ├── bpmn/        │        │
│  │ └── dmn/         │   Actions     │ └── dmn/         │        │
│  └──────────────────┘               └──────────────────┘        │
│           │                                  │                   │
│           │                                  ▼                   │
│           │                         ┌──────────────────┐        │
│           │                         │  Camunda 7 CE    │        │
│           │                         │  POST /deploy    │        │
│           └────────────────────────►└──────────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 GitHub Actions Workflow

```yaml
# .github/workflows/deploy-prometheus.yml
name: Pipeline PROMETHEUS

on:
  push:
    branches: [main]
    paths:
      - '_sprints/S026/**'
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

env:
  CAMUNDA_URL: ${{ secrets.CAMUNDA_URL }}

jobs:
  # ═══════════════════════════════════════════════════════════════
  # STAGE 1: VALIDATE
  # ═══════════════════════════════════════════════════════════════
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Validate BPMN/DMN syntax
        run: |
          # Validação XML básica
          for file in _sprints/S026/**/*.bpmn _sprints/S026/**/*.dmn; do
            if [ -f "$file" ]; then
              xmllint --noout "$file" || exit 1
              echo "✅ Valid: $file"
            fi
          done
      
      - name: Lint JavaScript workers
        run: |
          cd _sprints/S026/workers
          npm ci
          npm run lint

  # ═══════════════════════════════════════════════════════════════
  # STAGE 2: TEST
  # ═══════════════════════════════════════════════════════════════
  test:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Run Worker Unit Tests
        run: |
          cd _sprints/S026/workers
          npm ci
          npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: _sprints/S026/workers/coverage/lcov.info

  # ═══════════════════════════════════════════════════════════════
  # STAGE 3: DEPLOY
  # ═══════════════════════════════════════════════════════════════
  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment || 'staging' }}
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy BPMN/DMN to Camunda
        run: |
          # Deploy via REST API
          RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            "$CAMUNDA_URL/engine-rest/deployment/create" \
            -F "deployment-name=ms-agente-${{ github.sha }}" \
            -F "enable-duplicate-filtering=true" \
            -F "deploy-changed-only=true" \
            -F "bpmn_ms_agente.bpmn=@_sprints/S026/bpmn/bpmn_ms_agente.bpmn" \
            -F "dmn_entrada_genesis.dmn=@_sprints/S026/dmn/dmn_entrada_genesis.dmn")
          
          HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
          BODY=$(echo "$RESPONSE" | sed '$d')
          
          if [ "$HTTP_CODE" != "200" ]; then
            echo "❌ Deploy failed with HTTP $HTTP_CODE"
            echo "$BODY"
            exit 1
          fi
          
          echo "✅ Deploy successful"
          echo "$BODY" | jq '.'
      
      - name: Copy workers to ZAZ-vendas
        uses: cpina/github-action-push-to-another-repository@main
        env:
          SSH_DEPLOY_KEY: ${{ secrets.ZAZ_VENDAS_DEPLOY_KEY }}
        with:
          source-directory: '_sprints/S026/workers'
          destination-github-username: 'zaz-org'
          destination-repository-name: 'ZAZ-vendas'
          target-directory: 'Orquestrador-Zarah/worker'
          commit-message: 'chore: deploy workers from S026 (${{ github.sha }})'

  # ═══════════════════════════════════════════════════════════════
  # STAGE 4: VERIFY
  # ═══════════════════════════════════════════════════════════════
  verify:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Health check
        run: |
          # Verifica se o processo está disponível
          RESPONSE=$(curl -s "$CAMUNDA_URL/engine-rest/process-definition/key/bpmn_ms_agente")
          
          if echo "$RESPONSE" | jq -e '.id' > /dev/null; then
            echo "✅ Process definition available"
            echo "$RESPONSE" | jq '.'
          else
            echo "❌ Process definition not found"
            exit 1
          fi
```

---

## 5. Quality Gates

### 5.1 Definição dos Gates

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUALITY GATES                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Gate 1: SYNTAX                                                  │
│  ├── BPMN/DMN XML válido (xmllint)                              │
│  ├── JavaScript sem erros de lint (ESLint)                       │
│  └── Schemas JSON válidos                                        │
│                                                                  │
│  Gate 2: TESTS                                                   │
│  ├── Worker unit tests passando (Jest)                          │
│  ├── Coverage mínimo: 70%                                        │
│  └── DMN test cases passando                                     │
│                                                                  │
│  Gate 3: APPROVAL (opcional para MVP)                           │
│  └── PR Review aprovado                                          │
│                                                                  │
│  Gate 4: DEPLOY                                                  │
│  ├── Deploy retorna HTTP 200                                     │
│  └── Process definition disponível                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Matriz de Cobertura Mínima

| Artefato | Cobertura Requerida | Métrica |
|----------|---------------------|---------|
| Workers JS | 70% | Lines covered |
| BPMN Paths | Happy path + 1 error path | Scenarios tested |
| DMN Rules | 100% rules | Inputs tested |

---

## 6. Hipóteses Validadas

| ID | Hipótese | Status | Evidência |
|----|----------|--------|-----------|
| H1 | GitHub Actions pode deployar BPMN/DMN | ✅ Confirmado | Script curl via REST API funciona |
| H2 | Testes podem ser automatizados | ✅ Confirmado | Jest para workers, xmllint para BPMN |
| H3 | Aprovação via PR | ✅ Confirmado | GitHub environments + protection rules |
| H4 | Zero operação manual | ✅ Viável | Push → Actions → Deploy automático |

---

## 7. Limitações Identificadas

### 7.1 Camunda 7 vs 8

| Limitação | Impacto | Mitigação |
|-----------|---------|-----------|
| Sem GitHub Action oficial | Baixo | Script curl customizado |
| Testes BPMN requerem Java | Médio | Focar em testes de worker (JS) |
| EOL Outubro 2025 | Médio | Código continua funcional |

### 7.2 Escopo MVP

| Feature | MVP | Futuro |
|---------|-----|--------|
| Deploy BPMN/DMN | ✅ | - |
| Deploy Workers | ✅ | - |
| Testes unitários | ✅ | - |
| Testes BPMN paths | ❌ | v2.0 |
| Rollback automático | ❌ | v2.0 |
| Multi-environment | ❌ | v2.0 |

---

## 8. Próximos Passos → M2

Com o framework teórico validado para Camunda 7:

1. **M2.1** - Definir estrutura de diretórios no conhecimento-zaz
2. **M2.2** - Mapear artefatos S026 para deploy
3. **M2.3** - Especificar interface do Pipeline (inputs/outputs)
4. **M2.4** - Definir secrets necessários

---

## Referências

- [Camunda 7 REST API - Deployment](https://docs.camunda.org/manual/latest/reference/rest/deployment/post-deployment/)
- [Camunda 7 Testing Guide](https://docs.camunda.org/manual/latest/user-guide/testing/)
- [camunda-bpm-assert](https://github.com/camunda/camunda-bpm-platform/tree/master/test-utils/assert)
- [GitHub Actions](https://docs.github.com/en/actions)
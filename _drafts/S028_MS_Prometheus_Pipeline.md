# MS_Prometheus_Pipeline v1.0

---

```yaml
nome: MS_Prometheus_Pipeline
versao: "1.0"
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

### 2.2 Fluxo Completo

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

### 2.3 Tecnologias

| Componente | Tecnologia | Justificativa |
|------------|------------|---------------|
| Orquestração | GitHub Actions | CI/CD nativo, integrado com repos |
| Deploy BPMN/DMN | Camunda 7 REST API | POST /engine-rest/deployment/create |
| Deploy Workers | Git push | Copy para ZAZ-vendas repo |
| Testes Workers | Jest | Stack JS existente |
| Validação | xmllint + ESLint | Sintaxe XML e JS |

### 2.4 Camunda 7 REST API

```bash
# Deploy BPMN/DMN
curl -X POST http://camunda:8080/engine-rest/deployment/create \
  -F "deployment-name=S026-MS-Agente" \
  -F "bpmn_ms_agente.bpmn=@path/to/bpmn_ms_agente.bpmn" \
  -F "dmn_entrada_genesis.dmn=@path/to/dmn_entrada_genesis.dmn"

# Verificar deploy
curl http://camunda:8080/engine-rest/process-definition?key=bpmn_ms_agente
```

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

### 3.4 Etapas por Modo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MODO: validar                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [VALIDATE]                                                                 │
│  ├── BPMN: xmllint --schema bpmn20.xsd                                      │
│  ├── DMN: xmllint --schema dmn13.xsd                                        │
│  └── Workers: eslint *.js                                                   │
│                                                                             │
│  [TEST]                                                                     │
│  ├── Workers: jest --coverage                                               │
│  └── Cobertura mínima: 70%                                                  │
│                                                                             │
│  Produz: tipo "aprovar_release" (se sucesso)                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  MODO: implantar                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [DEPLOY]                                                                   │
│  ├── BPMN/DMN: POST /engine-rest/deployment/create                          │
│  └── Workers: git push para ZAZ-vendas/Orquestrador-Zarah/worker/           │
│                                                                             │
│  [VERIFY]                                                                   │
│  ├── Process definition exists?                                             │
│  ├── Decision definition exists?                                            │
│  └── Worker healthcheck (se aplicável)                                      │
│                                                                             │
│  Produz: tipo "validar_implantacao" (se sucesso)                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Estados

```
┌──────────┐     consumir()     ┌────────────────┐
│ Pendente │ ─────────────────► │ EmProcessamento│
└──────────┘                    └───────┬────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
            ┌───────────┐       ┌───────────┐       ┌───────────┐
            │ Concluido │       │  Falhou   │       │ Bloqueado │
            │ (sucesso) │       │  (erro)   │       │  (retry)  │
            └───────────┘       └───────────┘       └───────────┘
```

---

## 4. Classe (M3)

### 4.1 Schema: Item no Backlog

```yaml
# db.backlog document
backlog_item:
  _id: ObjectId
  id: "BKL-XXX"
  tipo: "executar_pipeline"
  
  contexto:
    modo: "validar" | "implantar"
    release_ref: "rel_001"
    sprint_origem: "S026"
    artefatos:
      - tipo: "bpmn"
        arquivo: "bpmn_ms_agente.bpmn"
        path: "_sprints/S026_MS_Agente/artefatos/bpmn/bpmn_ms_agente.bpmn"
        sha: "abc123"
      - tipo: "dmn"
        arquivo: "dmn_entrada_genesis.dmn"
        path: "_sprints/S026_MS_Agente/artefatos/dmn/dmn_entrada_genesis.dmn"
        sha: "def456"
      - tipo: "worker"
        arquivo: "workerAnthropic.js"
        path: "_sprints/S026_MS_Agente/artefatos/workers/workerAnthropic.js"
        sha: "ghi789"
  
  status: "Pendente" | "EmProcessamento" | "Concluido" | "Falhou"
  
  resultado:
    status: "sucesso" | "falha"
    modo: "validar"
    etapas:
      validate:
        status: "success"
        inicio: datetime
        fim: datetime
        erros: []
      test:
        status: "success"
        inicio: datetime
        fim: datetime
        cobertura: 85
        passou: 12
        falhou: 0
  
  items_gerados:
    - "BKL-XXX"  # aprovar_release ou validar_implantacao
  
  created_at: datetime
  updated_at: datetime
```

### 4.2 Contrato Event-Driven

```yaml
# MS_Prometheus_Pipeline
tipos_consumidos:
  - executar_pipeline

tipos_produzidos:
  - aprovar_release        # após modo=validar sucesso
  - validar_implantacao    # após modo=implantar sucesso
```

### 4.3 Método Principal

```python
class MS_Prometheus_Pipeline:
    tipos_consumidos = ["executar_pipeline"]
    
    def consumir(self, item):
        modo = item.contexto["modo"]
        artefatos = item.contexto["artefatos"]
        
        if modo == "validar":
            resultado = self.executar_validar(artefatos)
            if resultado["status"] == "sucesso":
                self.produzir_aprovar_release(item, resultado)
        
        elif modo == "implantar":
            resultado = self.executar_implantar(artefatos)
            if resultado["status"] == "sucesso":
                self.produzir_validar_implantacao(item, resultado)
        
        return resultado
    
    def executar_validar(self, artefatos):
        resultado = {"modo": "validar", "etapas": {}}
        
        # VALIDATE
        resultado["etapas"]["validate"] = self.validate(artefatos)
        if resultado["etapas"]["validate"]["status"] == "failed":
            resultado["status"] = "falha"
            return resultado
        
        # TEST
        resultado["etapas"]["test"] = self.test(artefatos)
        if resultado["etapas"]["test"]["status"] == "failed":
            resultado["status"] = "falha"
            return resultado
        
        resultado["status"] = "sucesso"
        return resultado
    
    def executar_implantar(self, artefatos):
        resultado = {"modo": "implantar", "etapas": {}}
        
        # DEPLOY
        resultado["etapas"]["deploy"] = self.deploy(artefatos)
        if resultado["etapas"]["deploy"]["status"] == "failed":
            resultado["status"] = "falha"
            return resultado
        
        # VERIFY
        resultado["etapas"]["verify"] = self.verify(artefatos)
        if resultado["etapas"]["verify"]["status"] == "failed":
            resultado["status"] = "falha"
            return resultado
        
        resultado["status"] = "sucesso"
        return resultado
```

### 4.4 GitHub Actions Workflow

```yaml
# .github/workflows/prometheus-pipeline.yml
name: PROMETHEUS Pipeline

on:
  workflow_dispatch:
    inputs:
      modo:
        description: 'Modo do pipeline'
        required: true
        type: choice
        options:
          - validar
          - implantar
      release_ref:
        description: 'Referência da release'
        required: true
      artefatos_json:
        description: 'JSON com artefatos'
        required: true

jobs:
  # ══════════════════════════════════════════════════════════════════════════
  # MODO: VALIDAR
  # ══════════════════════════════════════════════════════════════════════════
  validate:
    if: ${{ inputs.modo == 'validar' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Parse artefatos
        id: parse
        run: |
          echo '${{ inputs.artefatos_json }}' > artefatos.json
          
      - name: Validate BPMN
        run: |
          for f in $(jq -r '.[] | select(.tipo=="bpmn") | .path' artefatos.json); do
            xmllint --noout "$f"
          done
          
      - name: Validate DMN
        run: |
          for f in $(jq -r '.[] | select(.tipo=="dmn") | .path' artefatos.json); do
            xmllint --noout "$f"
          done
          
      - name: Lint Workers
        run: |
          npm install eslint
          for f in $(jq -r '.[] | select(.tipo=="worker") | .path' artefatos.json); do
            npx eslint "$f"
          done

  test:
    if: ${{ inputs.modo == 'validar' }}
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Run Tests
        run: |
          npm install
          npm test -- --coverage --coverageThreshold='{"global":{"lines":70}}'

  # ══════════════════════════════════════════════════════════════════════════
  # MODO: IMPLANTAR
  # ══════════════════════════════════════════════════════════════════════════
  deploy:
    if: ${{ inputs.modo == 'implantar' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Parse artefatos
        run: echo '${{ inputs.artefatos_json }}' > artefatos.json
        
      - name: Deploy to Camunda
        env:
          CAMUNDA_URL: ${{ secrets.CAMUNDA_URL }}
          CAMUNDA_USER: ${{ secrets.CAMUNDA_USER }}
          CAMUNDA_PASSWORD: ${{ secrets.CAMUNDA_PASSWORD }}
        run: |
          # Construir comando curl com todos BPMN/DMN
          CURL_CMD="curl -X POST ${CAMUNDA_URL}/engine-rest/deployment/create"
          CURL_CMD="$CURL_CMD -u ${CAMUNDA_USER}:${CAMUNDA_PASSWORD}"
          CURL_CMD="$CURL_CMD -F deployment-name=${{ inputs.release_ref }}"
          
          for f in $(jq -r '.[] | select(.tipo=="bpmn" or .tipo=="dmn") | .path' artefatos.json); do
            filename=$(basename "$f")
            CURL_CMD="$CURL_CMD -F ${filename}=@${f}"
          done
          
          eval $CURL_CMD
          
      - name: Deploy Workers to ZAZ-vendas
        env:
          ZAZ_DEPLOY_KEY: ${{ secrets.ZAZ_VENDAS_DEPLOY_KEY }}
        run: |
          # Clone ZAZ-vendas, copy workers, commit, push
          git clone git@github.com:zaz/ZAZ-vendas.git /tmp/zaz-vendas
          
          for f in $(jq -r '.[] | select(.tipo=="worker") | .path' artefatos.json); do
            cp "$f" /tmp/zaz-vendas/Orquestrador-Zarah/worker/
          done
          
          cd /tmp/zaz-vendas
          git add .
          git commit -m "Deploy workers from ${{ inputs.release_ref }}"
          git push

  verify:
    if: ${{ inputs.modo == 'implantar' }}
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Verify Camunda Deployment
        env:
          CAMUNDA_URL: ${{ secrets.CAMUNDA_URL }}
        run: |
          # Verificar process definitions
          curl -s "${CAMUNDA_URL}/engine-rest/process-definition" | jq .
          
          # Verificar decision definitions
          curl -s "${CAMUNDA_URL}/engine-rest/decision-definition" | jq .
```

### 4.5 Secrets Necessários

| Secret | Descrição | Onde |
|--------|-----------|------|
| CAMUNDA_URL | URL do Camunda (ex: http://camunda:8080) | GitHub Secrets |
| CAMUNDA_USER | Usuário Camunda | GitHub Secrets |
| CAMUNDA_PASSWORD | Senha Camunda | GitHub Secrets |
| ZAZ_VENDAS_DEPLOY_KEY | SSH key para push em ZAZ-vendas | GitHub Secrets |

---

## 5. Critérios de Aceite

| Critério | Status |
|----------|--------|
| MS consome tipo "executar_pipeline" do backlog | ⬜ |
| Modo "validar" executa VALIDATE + TEST | ⬜ |
| Modo "implantar" executa DEPLOY + VERIFY | ⬜ |
| Sucesso em "validar" produz "aprovar_release" | ⬜ |
| Sucesso em "implantar" produz "validar_implantacao" | ⬜ |
| GitHub Actions workflow funcional | ⬜ |
| Secrets configurados | ⬜ |

---

## 6. Referências

| Documento | Relação |
|-----------|---------|
| genesis/PROMETHEUS.md | Pai - fluxo desenvolver/deployar |
| genesis/PROMETHEUS_Arquitetura.md | Contratos e ciclo |
| docs/04_B/MS_Backlog.md | Message broker |
| _sprints/S026_MS_Agente/ | Artefatos de exemplo |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-18 | Documento consolidado M1-M2-M3. Dois modos (validar/implantar). Integração com fluxo PROMETHEUS. Sprint S028. |
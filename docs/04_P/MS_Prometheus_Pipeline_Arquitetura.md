# MS_Prometheus_Pipeline - Arquitetura

---

```yaml
nome: MS_Prometheus_Pipeline_Arquitetura
versao: "1.0"
tipo: Arquitetura
status: Publicado
pai: docs/04_P/MS_Prometheus_Pipeline.md
data: 2025-12-18
sprint: S028
```

---

## 1. Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ARQUITETURA DO PIPELINE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CAMADA: GitHub (Trigger)                                                   │
│  ════════════════════════                                                   │
│  ┌─────────────────────┐     ┌─────────────────────┐                        │
│  │ Orquestrador-Zarah  │     │ Zarah-Camunda       │                        │
│  │ (workers)           │     │ (bpmn/dmn/forms)    │                        │
│  └──────────┬──────────┘     └──────────┬──────────┘                        │
│             │                           │                                   │
│             │ push main                 │ push main                         │
│             ▼                           ▼                                   │
│  ┌─────────────────────┐     ┌─────────────────────┐                        │
│  │ deploy.yml          │     │ deploy-camunda.yml  │                        │
│  │ (GitHub Actions)    │     │ (GitHub Actions)    │                        │
│  └──────────┬──────────┘     └──────────┬──────────┘                        │
│             │                           │                                   │
│             │ webhook HMAC              │ webhook HMAC                      │
│             ▼                           ▼                                   │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  CAMADA: Servidor Worker (Execução)                                         │
│  ══════════════════════════════════                                         │
│             │                           │                                   │
│             ▼                           ▼                                   │
│  ┌─────────────────────┐     ┌─────────────────────┐                        │
│  │ POST /deploy        │     │ POST /deploy-camunda│                        │
│  │ (gitActionsCtrl)    │     │ (gitActionsCtrl)    │                        │
│  └──────────┬──────────┘     └──────────┬──────────┘                        │
│             │                           │                                   │
│             ▼                           ▼                                   │
│  ┌─────────────────────┐     ┌─────────────────────┐                        │
│  │ deploy-gitActions.sh│     │ camundaDeployService│                        │
│  │ git pull            │     │ .deployAll()        │                        │
│  │ npm install         │     │                     │                        │
│  │ pm2 restart         │     │ git pull            │                        │
│  └─────────────────────┘     │ axios POST          │                        │
│                              └──────────┬──────────┘                        │
│                                         │                                   │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  CAMADA: Camunda (Destino)                                                  │
│  ═════════════════════════                                                  │
│                                         │                                   │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │ Camunda REST API    │                        │
│                              │ /deployment/create  │                        │
│                              └─────────────────────┘                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Componentes

### 2.1 Endpoints

| Endpoint | Método | Função | Resposta |
|----------|--------|--------|----------|
| `/deploy` | POST | Deploy workers (pm2) | 202 Accepted |
| `/deploy-camunda` | POST | Deploy BPMN/DMN/Forms | 200 ou 202 |
| `/deploy-camunda?skipGitPull=true` | POST | Deploy direto (sem git pull) | 200 com resultado |

### 2.2 Scripts

| Script | Função |
|--------|--------|
| `deploy-gitActions.sh` | `git pull` → `npm install` → `pm2 restart 0` |
| `deploy-camunda.sh` | `git pull` → `node camundaDeployService.deployAll()` |

### 2.3 Services

| Service | Funções Principais |
|---------|-------------------|
| `camundaDeployService.js` | `deployAll()`, `deploy(produto)`, `checkConnection()`, `listDeployments()` |

---

## 3. Autenticação

### 3.1 HMAC-SHA256

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FLUXO DE AUTENTICAÇÃO                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GitHub Actions:                                                            │
│  ───────────────                                                            │
│  TIMESTAMP = $(date +%s%3N)                                                 │
│  BODY = '{"branch":"main"}'                                                 │
│  SIGNATURE = HMAC-SHA256(TIMESTAMP.BODY, DEPLOY_SECRET)                     │
│                                                                             │
│  Headers enviados:                                                          │
│  ─────────────────                                                          │
│  X-Timestamp: {TIMESTAMP}                                                   │
│  X-Signature: sha256={SIGNATURE}                                            │
│  Content-Type: application/json                                             │
│                                                                             │
│  Servidor valida:                                                           │
│  ────────────────                                                           │
│  1. Recalcula HMAC com mesmo secret                                         │
│  2. Compara signatures                                                      │
│  3. Verifica timestamp (tolerância ~5min)                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Secrets Necessários

| Secret | Onde | Descrição |
|--------|------|-----------|
| `DEPLOY_SECRET` | GitHub + Servidor | Chave HMAC compartilhada |
| `DEPLOY_URL` | GitHub | URL base (ex: `https://api.zaz.com/github/deploy`) |
| `CAMUNDA_USER` | Servidor (.env) | Usuário Camunda |
| `CAMUNDA_PASS` | Servidor (.env) | Senha Camunda |

---

## 4. Configuração

### 4.1 Variáveis de Ambiente

```
📁 github:Orquestrador-Zarah/.env.example
```

| Variável | Exemplo | Descrição |
|----------|---------|-----------|
| `CAMUNDA_URL` | `http://10.100.12.24:8080` | URL Camunda (sem /engine-rest) |
| `CAMUNDA_USER` | `admin` | Usuário |
| `CAMUNDA_PASS` | `***` | Senha |
| `CAMUNDA_REPO_DIR` | `/home/.../Zarah-Camunda` | Pasta dos artefatos |

### 4.2 PM2

| Processo | Index | Aplicação |
|----------|-------|-----------|
| Orquestrador | 0 | Workers + API Backend |

---

## 5. Fluxo de Dados

### 5.1 Deploy Workers

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  push    │───►│ Actions  │───►│ /deploy  │───►│ pm2      │
│  main    │    │ workflow │    │ endpoint │    │ restart  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                    │
                    ▼
              HMAC signature
```

### 5.2 Deploy Camunda

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  push    │───►│ Actions  │───►│ /deploy- │───►│ service  │───►│ Camunda  │
│  main    │    │ workflow │    │ camunda  │    │ axios    │    │ REST API │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                    │                               │
                    ▼                               ▼
              HMAC signature               FormData multipart
                                          (deploy-changed-only)
```

---

## 6. Camunda REST API

### 6.1 Endpoint de Deploy

```
POST /engine-rest/deployment/create
Content-Type: multipart/form-data

Campos:
- deployment-name: string
- deploy-changed-only: "true"
- enable-duplicate-filtering: "true"
- {filename}: arquivo
```

### 6.2 Resposta de Sucesso

```json
{
  "id": "deployment-id",
  "name": "Genesis-20251218-213000",
  "deploymentTime": "2025-12-18T21:30:00.000Z",
  "deployedProcessDefinitions": {
    "process-key": { "id": "...", "version": 2 }
  },
  "deployedDecisionDefinitions": {
    "decision-key": { "id": "...", "version": 1 }
  }
}
```

---

## 7. Tratamento de Erros

### 7.1 Códigos HTTP

| Código | Significado | Ação |
|--------|-------------|------|
| 200 | Sucesso (síncrono) | OK |
| 202 | Agendado (assíncrono) | Verificar logs |
| 401 | Assinatura inválida | Verificar DEPLOY_SECRET |
| 404 | Endpoint não encontrado | Verificar CAMUNDA_URL |
| 500 | Erro interno | Verificar logs do servidor |

### 7.2 Logs

```bash
# Logs do PM2
pm2 logs 0

# Filtrar por deploy
pm2 logs 0 | grep -i deploy
```

---

## 8. Decisões de Design

### 8.1 Por que Bash + JavaScript?

| Componente | Linguagem | Motivo |
|------------|-----------|--------|
| `deploy-gitActions.sh` | Bash | Só faz git pull + pm2 (operações de sistema) |
| `camundaDeployService.js` | JavaScript | Lógica de negócio, testável, reutilizável |

### 8.2 Por que Dois Repositórios?

| Repositório | Conteúdo | Motivo |
|-------------|----------|--------|
| Orquestrador-Zarah | Código | Permissões de desenvolvedor |
| Zarah-Camunda | Definições | Pode dar acesso a quem só mexe em BPMN |

### 8.3 Por que Webhook e não Self-Hosted Runner?

| Abordagem | Prós | Contras |
|-----------|------|---------|
| **Webhook (escolhida)** | Runner público, sem manutenção | Precisa expor endpoint |
| Self-Hosted Runner | Acesso direto à rede interna | Manutenção do runner |

---

## 9. Referências

### Código

| Artefato | Localização |
|----------|-------------|
| Service | `📁 github:Orquestrador-Zarah/src/services/servidor/camundaDeployService.js` |
| Controller | `📁 github:Orquestrador-Zarah/controller/gitActionsController.js` |
| Script workers | `📁 github:Orquestrador-Zarah/scripts/deploy-gitActions.sh` |
| Script Camunda | `📁 github:Orquestrador-Zarah/scripts/deploy-camunda.sh` |

### Schemas

| Schema | Localização |
|--------|-------------|
| BacklogItem (origem) | `📊 mongodb:genesis.backlog` |

### Documentação

| Documento | Relação |
|-----------|---------|
| docs/04_P/MS_Prometheus_Pipeline.md | Guia de uso |
| genesis/PROMETHEUS.md | Sistema pai |
| _drafts/S028_MS_Prometheus_Pipeline.md | Especificação M0-M3 |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-18 | Publicação inicial. Arquitetura de deploy Workers + Camunda. Sprint S028. |

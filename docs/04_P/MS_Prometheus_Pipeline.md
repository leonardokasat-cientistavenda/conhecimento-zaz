# MS_Prometheus_Pipeline

---

```yaml
nome: MS_Prometheus_Pipeline
versao: "1.0"
tipo: Capacidade
status: Publicado
pai: genesis/PROMETHEUS.md
data: 2025-12-18
sprint: S028
```

---

## 1. Propósito

Pipeline automatizado para publicação de artefatos gerados pelo PROMETHEUS.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PROMETHEUS gera artefatos → Pipeline publica → Camunda/Workers executam    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. O que Publica

| Tipo | Extensões | Destino |
|------|-----------|---------|
| Processos | `.bpmn` | Camunda Engine |
| Decisões | `.dmn` | Camunda Engine |
| Formulários | `.form`, `.html` | Camunda Engine |
| Workers | `.js` | Servidor Worker (PM2) |

---

## 3. Repositórios

| Repositório | Conteúdo | Trigger |
|-------------|----------|---------|
| `ZAZ-vendas/Orquestrador-Zarah` | Workers + Backend | Push → Deploy Workers |
| `ZAZ-vendas/Zarah-Camunda` | BPMN/DMN/Forms | Push → Deploy Camunda |

---

## 4. Como Publicar

### 4.1 Publicar Worker

```
1. Criar/editar arquivo em:
   Orquestrador-Zarah/worker/{nome}/index.js

2. Commit + Push para main

3. Pipeline executa automaticamente:
   git pull → npm install → pm2 restart
```

### 4.2 Publicar Artefatos Camunda

```
1. Criar/editar arquivo em:
   Zarah-Camunda/
   ├── Genesis/       ← Artefatos do GENESIS
   │   ├── bpmn/
   │   ├── dmn/
   │   └── forms/
   └── Prometheus/    ← Artefatos do PROMETHEUS
       ├── bpmn/
       ├── dmn/
       └── forms/

2. Commit + Push para main

3. Pipeline executa automaticamente:
   git pull → deploy para Camunda REST API
```

---

## 5. Fluxo Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PIPELINE DE DEPLOY                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────┐                                                          │
│  │   Developer   │                                                          │
│  │   (você)      │                                                          │
│  └───────┬───────┘                                                          │
│          │                                                                  │
│          │ git push                                                         │
│          ▼                                                                  │
│  ┌───────────────┐     webhook      ┌───────────────┐                       │
│  │    GitHub     │ ───────────────► │   Servidor    │                       │
│  │    Actions    │    (HMAC)        │   Worker      │                       │
│  └───────────────┘                  └───────┬───────┘                       │
│                                             │                               │
│                              ┌──────────────┴──────────────┐                │
│                              │                             │                │
│                              ▼                             ▼                │
│                     ┌───────────────┐             ┌───────────────┐         │
│                     │ /deploy       │             │ /deploy-camunda│        │
│                     │ (workers)     │             │ (bpmn/dmn)    │         │
│                     └───────┬───────┘             └───────┬───────┘         │
│                             │                             │                 │
│                             ▼                             ▼                 │
│                     ┌───────────────┐             ┌───────────────┐         │
│                     │  pm2 restart  │             │ Camunda API   │         │
│                     │  Workers JS   │             │ REST Deploy   │         │
│                     └───────────────┘             └───────────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Estrutura de Pastas

### 6.1 No Servidor

```
/home/camunda-orquestrador/
│
├── Orquestrador-Zarah/          ← Workers + Backend
│   ├── worker/
│   │   ├── anthropic/           ← Worker Anthropic (MS_Agente)
│   │   ├── agente/              ← Workers do Agente
│   │   ├── openAI/
│   │   └── ...
│   ├── scripts/
│   │   ├── deploy-gitActions.sh ← Deploy workers
│   │   └── deploy-camunda.sh    ← Deploy Camunda
│   └── src/services/servidor/
│       └── camundaDeployService.js
│
└── Zarah-Camunda/               ← Artefatos Camunda
    ├── Genesis/
    │   ├── bpmn/
    │   ├── dmn/
    │   └── forms/
    └── Prometheus/
        ├── bpmn/
        ├── dmn/
        └── forms/
```

### 6.2 Nomenclatura de Arquivos

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| BPMN | `bpmn_{sistema}_{processo}.bpmn` | `bpmn_ms_agente_entrada.bpmn` |
| DMN | `dmn_{sistema}_{decisao}.dmn` | `dmn_genesis_roteamento.dmn` |
| Form | `form_{processo}_{etapa}.html` | `form_agente_inicio.html` |
| Worker | `worker{Nome}/index.js` | `workerAnthropic/index.js` |

---

## 7. Verificação

### 7.1 Verificar Deploy de Worker

```bash
# No servidor
pm2 status

# Logs
pm2 logs 0
```

### 7.2 Verificar Deploy Camunda

```bash
# Listar deployments recentes
curl -u admin:senha "http://camunda:8080/engine-rest/deployment?sortBy=deploymentTime&sortOrder=desc&maxResults=5"

# Verificar process definition
curl -u admin:senha "http://camunda:8080/engine-rest/process-definition?key={processKey}"
```

---

## 8. Troubleshooting

| Sintoma | Causa Provável | Solução |
|---------|----------------|---------|
| Worker não reinicia | pm2 stop sem start | Usar `pm2 restart` |
| 404 no Camunda | URL duplicada | `CAMUNDA_URL` sem `/engine-rest` |
| Webhook falha | Assinatura inválida | Verificar `DEPLOY_SECRET` |
| Artefato não aparece | Pasta errada | Verificar estrutura Genesis/Prometheus |

---

## 9. Referências

### Código

| Artefato | Localização |
|----------|-------------|
| Service de deploy | `📁 github:Orquestrador-Zarah/src/services/servidor/camundaDeployService.js` |
| Script deploy workers | `📁 github:Orquestrador-Zarah/scripts/deploy-gitActions.sh` |
| Script deploy Camunda | `📁 github:Orquestrador-Zarah/scripts/deploy-camunda.sh` |
| Workflow workers | `📁 github:Orquestrador-Zarah/.github/workflows/deploy.yml` |
| Workflow Camunda | `📁 github:Zarah-Camunda/.github/workflows/deploy-camunda.yml` |

### Documentação

| Documento | Relação |
|-----------|---------|
| genesis/PROMETHEUS.md | Sistema pai |
| docs/04_P/MS_Prometheus_Pipeline_Arquitetura.md | Detalhes técnicos |
| _drafts/S028_MS_Prometheus_Pipeline.md | Especificação original |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-18 | Publicação inicial. Deploy automatizado de Workers e Artefatos Camunda. Sprint S028. |

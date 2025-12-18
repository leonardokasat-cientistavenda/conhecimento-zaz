# Release MS_Agente v1.0

**Sprint:** S027  
**Data:** 2025-12-17  
**Spec:** genesis/specs/MS_Agente_v1.0.md

---

## Artefatos Gerados

### Workers (Node.js)

| Arquivo | Topic Camunda | Descrição |
|---------|---------------|----------|
| worker/anthropic/index.js | workerAnthropic | Chama API Anthropic |
| worker/agente/contexto.js | agente-contexto | Monta payload LLM |
| worker/agente/persistir.js | agente-persistir | Salva execução MongoDB |
| worker/agente/github.js | agente-github-get/push | Operações GitHub |

### BPMN

| Arquivo | Process ID | Descrição |
|---------|------------|----------|
| bpmn/bpmn_ms_agente.bpmn | bpmn_ms_agente | Agent Loop genérico |

### DMN

| Arquivo | Descrição |
|---------|----------|
| dmn/dmn_update_genesis.xml | Regra a adicionar no DMN existente |

### MongoDB Scripts

| Arquivo | Database.Collection | Descrição |
|---------|---------------------|----------|
| scripts/create_collection_execucoes.js | agente.execucoes | Histórico de execuções |
| scripts/create_collection_agentes.js | genesis.agentes | Config dos agentes |

---

## Instruções de Deploy

### 1. MongoDB

```bash
# Conectar ao cluster
mongosh "mongodb+srv://cluster.mongodb.net"

# Executar scripts
load("scripts/create_collection_execucoes.js")
load("scripts/create_collection_agentes.js")
```

### 2. Workers

```bash
# Copiar workers para o projeto Orquestrador-Zarah
cp -r worker/* /path/to/orquestrador-zarah/worker/

# Instalar dependências
npm install @anthropic-ai/sdk @octokit/rest

# Registrar workers no index.js do orquestrador
```

### 3. BPMN

```bash
# Deploy via Camunda Modeler ou API
curl -X POST "http://camunda:8080/engine-rest/deployment/create" \
  -F "deployment-name=MS_Agente_v1.0" \
  -F "bpmn_ms_agente.bpmn=@bpmn/bpmn_ms_agente.bpmn"
```

### 4. DMN

Adicionar regra manualmente no DMN `dmn_processo_iniciar_orquestrador`:

```
| tipo_orquestrador | processo       | token_orquestrador       |
|-------------------|----------------|---------------------------|
| "genesis"         | bpmn_ms_agente | MATTERMOST_TOKEN_GENESIS |
```

### 5. Environment Variables

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
export GITHUB_TOKEN="ghp_..."
export MATTERMOST_TOKEN_GENESIS="..."
```

### 6. Mattermost Webhook

Configurar Outgoing Webhook apontando para GENESIS:
- Trigger: menção ao bot GENESIS
- URL: endpoint do Orquestrador-Zarah
- Token: MATTERMOST_TOKEN_GENESIS

---

## Teste de Validação

### Happy Path (CA01)

1. Mencionar GENESIS no Mattermost: "@genesis oi"
2. Verificar resposta do LLM
3. Verificar persistência em agente.execucoes

### Tool Use (CA02)

1. Mencionar GENESIS: "@genesis status do sprint S027"
2. Verificar que LLM chama github:get_file_contents
3. Verificar resposta com conteúdo do arquivo

### Erro (CA04)

1. Usar agente_id inválido
2. Verificar que processo falha com erro apropriado

---

## Dependências

```json
{
  "@anthropic-ai/sdk": "^0.x",
  "@octokit/rest": "^20.x"
}
```

---

## Referências

- Spec M4: genesis/specs/MS_Agente_v1.0.md
- Sprint S026 (especificação): _sprints/S026_MS_Agente.md
- Sprint S027 (desenvolvimento): _sprints/S027_PROMETHEUS_MS_Agente.md

# Ferramentas do Pantheon

## postman_pantheon_users.json

Collection Postman para **criar novos agentes** no ecossistema Pantheon.

### Pré-requisitos

1. Token de admin do Mattermost
2. Acesso ao Postman

### Uso

1. Importar `postman_pantheon_users.json` no Postman
2. Configurar variáveis:
   - `admin_token`: Seu Personal Access Token do MM
   - `mattermost_url`: URL do Mattermost (default: https://mattermost.zaz.vc)
   - `team_id`: ID do time MS_Agentes
   - `callback_base_url`: URL base do webhook

3. Na pasta "1. Criar Novo Agente":
   - Editar body de cada request substituindo `NOME_AGENTE` e `PROPOSITO_DO_AGENTE`
   - Executar requests 1.1 → 1.2 → 1.3 → 1.4 em ordem
   - Request 1.5 exibe resumo no console

### Fluxo de Criação

```
1.1 Criar Usuário    → user_id
1.2 Criar Token      → token
1.3 Adicionar Time   → membership
1.4 Criar Webhook    → webhook_id
1.5 Resumo           → console output
```

### Após criar o agente

1. Adicionar regra no DMN (`dmn_processo_iniciar_orquestrador`):
   - tipo_orquestrador: "nome_agente"
   - processo: "bpmn_ms_agente"
   - token_orquestrador: "<token gerado>"

2. Salvar credenciais em `genesis/config/panteao_credenciais.json`

### Agentes Existentes

| Agente | Propósito | Criado |
|--------|-----------|--------|
| GENESIS | O início, criação | ✅ |
| PROMETHEUS | Traz capacidade | ✅ |
| ASCLEPIUS | Cura a dor | ✅ |
| ATLAS | Carrega trabalho | ✅ |
| KAIROS | Momento certo | ✅ |

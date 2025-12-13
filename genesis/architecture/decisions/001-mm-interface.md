# ADR-001: Mattermost como Interface do Usuário

## Status

Aceito

## Data

2024-12-13

## Contexto

Genesis precisa de uma interface para interação com usuários. Opções consideradas:
- Interface web custom
- Claude Desktop
- Slack
- Mattermost

## Decisão

**Mattermost será a interface principal do Genesis.**

Motivos:
- Self-hosted (controle total)
- Threads nativas (contexto visual)
- Webhooks e websockets (integração)
- Playbooks (metodologia M0-M4 como checklist)
- Já em uso na organização

## Consequências

### Positivas
- Usuário acessa Genesis em ambiente familiar
- Threads organizam conversas naturalmente
- Notificações e menções funcionam nativamente
- Histórico de mensagens persistido pelo MM

### Negativas
- Streaming de resposta requer workaround (editar post)
- Artifacts/visualizações limitados a markdown
- Dependência de bot MM funcionando

## Alternativas Descartadas

- **Interface custom:** Mais trabalho, menos features prontas
- **Claude Desktop:** Não permite customização de backend
- **Slack:** Não é self-hosted

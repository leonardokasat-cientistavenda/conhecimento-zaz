# Prompt de Bootstrap: S-GENESIS-MM-001

## Instrução para Claude

```
Estou retomando o projeto Genesis no Mattermost.

## Contexto do Projeto
Genesis é um sistema de Inteligência Híbrida que será acessível via Mattermost.
A arquitetura segue o padrão da ZAZ: Bot → Camunda → Workers.

## Sprint Atual: S-GENESIS-MM-001
Objetivo: Criar worker que conecta ao MM, escuta @genesis e responde com echo.

## O que já está pronto
- ClickHouse configurado (10.100.12.19:8123)
- Database genesis + tabela logs
- MCP Server mcp-clickhouse funcionando
- Claude lê dados do ClickHouse

## O que precisa ser feito
1. Analisar padrão de workers existentes (Zarah)
2. Criar estrutura worker/genesis
3. Implementar conexão websocket MM
4. Implementar listener de mensagens
5. Implementar publisher de respostas
6. Testar echo no MM interno
7. Configurar pino-clickhouse para logs

## Decisões já tomadas
- Worker SEPARADO do Orquestrador-Zarah (não impactar prod)
- MVP com echo antes de integrar LLM
- Logging via pino-clickhouse

## Arquivos de Referência
- _backlog/Genesis_MM_Bot.md (spec completa)
- worker/whatsapp ou worker/telegram (padrão de workers)
- Orquestrador-Zarah (repo ZAZ-vendas)

## Próximo Passo
Carregar sprint do MongoDB e iniciar T01 (analisar padrão de workers).

Comando: mongodb:find(database="genesis", collection="sprint_sessions", filter={"sprint_id": "S-GENESIS-MM-001"})
```

---

## Dados da Sprint

```yaml
sprint_id: S-GENESIS-MM-001
titulo: Genesis MM Bot - Worker Mattermost
status: pronta
objetivo: Criar worker que conecta ao MM, escuta @genesis e responde com echo

tasks:
  - T01: Analisar padrão de workers existentes (Zarah)
  - T02: Criar estrutura worker/genesis
  - T03: Implementar conexão websocket MM
  - T04: Implementar listener de mensagens
  - T05: Implementar publisher de respostas
  - T06: Testar echo no MM interno
  - T07: Configurar pino-clickhouse para logs
```

---

## Conexões Disponíveis

### GitHub
- conhecimento-zaz: leonardokasat-cientistavenda/conhecimento-zaz
- Orquestrador-Zarah: ZAZ-vendas/Orquestrador-Zarah

### MongoDB
- database: genesis
- collections: sprint_sessions, backlog, capacidades

### ClickHouse
- Host: 10.100.12.19
- Port: 8123
- Database: genesis
- User: genesis
- Tabela: logs

### MCP Servers (Claude Desktop)
- mcp-clickhouse: ✅ Funcionando
- mongodb: ✅ Funcionando
- github: ✅ Funcionando

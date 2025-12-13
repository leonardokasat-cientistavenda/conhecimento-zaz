# ADR-004: MCP como Adapter para Camunda

## Status

Aceito

## Data

2024-12-13

## Contexto

Em contexto aberto, o LLM precisa buscar informações durante a inferência (não antes). MCP (Model Context Protocol) permite isso via tools.

Questão: MCP chama APIs direto ou usa infraestrutura existente?

## Decisão

**MCP Server será um adapter fino que traduz chamadas de tools para jobs Camunda.**

Fluxo:
1. LLM decide usar tool (ex: search_capabilities)
2. MCP Server recebe chamada
3. MCP dispara processo Camunda (tool_execution.bpmn)
4. Worker executa (mesmo worker usado em pipelines)
5. Resultado volta para LLM

## Consequências

### Positivas
- **Reuso total:** Workers servem MCP e pipelines
- **Observabilidade:** Camunda registra todas as chamadas de tool
- **Consistência:** Uma forma de executar tarefas

### Negativas
- **Latência:** Hop adicional (MCP → Camunda → Worker)
- **Complexidade:** Mais uma camada

## Mitigação de Latência

Para tools MCP:
- Processos simples (poucos tasks)
- Timeout curto (30s)
- Cache quando possível

## Tools Planejadas

| Tool | Worker reusado |
|------|----------------|
| search_capabilities | capability_matcher |
| read_code | git_ops |
| query_history | context_retriever |
| start_process | (novo) process_starter |

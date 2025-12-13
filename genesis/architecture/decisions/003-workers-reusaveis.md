# ADR-003: Workers Reusáveis

## Status

Aceito

## Data

2024-12-13

## Contexto

Genesis executa tarefas via Camunda external tasks. Cada tarefa precisa de um worker. Surge a questão: como organizar workers para máximo reuso?

## Decisão

**Workers serão unidades atômicas reusáveis, organizados por domínio.**

Domínios:
- **Contexto:** intent_analyzer, context_retriever, capability_matcher
- **LLM:** llm_generator, llm_fixer, llm_responder
- **CI/CD:** git_ops, docker_build, camunda_deploy, mongo_deploy
- **Validação:** python_lint, python_test, bpmn_validate
- **Integração:** mm_notify, capability_index, history_persist

## Consequências

### Positivas
- Mesmo worker serve múltiplos processos
- Teste unitário por worker
- Escala independente por tipo de tarefa
- MCP pode reusar workers (ADR-004)

### Negativas
- Mais workers para manter
- Coordenação via Camunda obrigatória

## Padrão de Implementação

```python
class Worker:
    topic: str  # Nome do external task
    
    async def execute(self, task: ExternalTask) -> dict:
        # Lógica aqui
        return {"output": result}
```

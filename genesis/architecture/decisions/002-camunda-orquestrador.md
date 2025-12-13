# ADR-002: Camunda como Orquestrador

## Status

Aceito

## Data

2024-12-13

## Contexto

Genesis executa processos complexos: conversas, pipelines M0-M4, CI/CD. Precisa de:
- Orquestração de tarefas
- Decisões condicionais
- Retry e fallback
- Observabilidade

Opções:
- Código puro (if/else)
- Airflow
- Temporal
- Camunda

## Decisão

**Camunda será o orquestrador central do Genesis.**

Motivos:
- BPMN visual (processos legíveis)
- DMN para decisões (tabelas de decisão)
- External tasks (workers desacoplados)
- Já operacional na organização

## Consequências

### Positivas
- Processos são artefatos versionáveis (XML)
- Genesis pode gerar novos processos (auto-recursão)
- Cockpit para observabilidade
- Workers independentes e escaláveis

### Negativas
- Overhead para tarefas simples
- Curva de aprendizado BPMN
- Latência adicional vs código direto

## Alternativas Descartadas

- **Código puro:** Não escala, difícil visualizar
- **Airflow:** Focado em data pipelines, não conversacional
- **Temporal:** Menos visual, menos adotado

# ADR-005: CI/CD Orquestrado por Camunda

## Status

Aceito

## Data

2024-12-13

## Contexto

Genesis gera artefatos (código, prompts, BPMN, DMN) que precisam ser validados e deployados. Opções:
- GitHub Actions (externo)
- Camunda (interno)

## Decisão

**Camunda orquestrará o CI/CD do Genesis.**

Genesis controla o próprio deploy. Processo `artifact_lifecycle.bpmn`:
1. Identify artifact type
2. Route to specific lifecycle (prompt, worker, bpmn, dmn)
3. Validate
4. Commit to Git
5. Deploy to target (MongoDB, Docker, Camunda)
6. Index as capability
7. Notify MM

## Consequências

### Positivas
- **Auto-recursão real:** Genesis deploya novos processos Camunda
- **Controle total:** Não depende de serviço externo
- **Observabilidade:** Todo deploy visível no Cockpit
- **Reuso:** Mesmos workers de validação usados em dev

### Negativas
- **Bootstrap:** Kernel precisa de deploy manual inicial
- **Complexidade:** Mais processos para manter

## Subprocessos por Tipo

| Artefato | Validação | Deploy |
|----------|-----------|--------|
| Prompt | Schema YAML | MongoDB |
| Worker Python | Lint + pytest | Docker → Container |
| BPMN | bpmnlint | Camunda REST API |
| DMN | Schema | Camunda REST API |
| Config | JSON Schema | Config service |

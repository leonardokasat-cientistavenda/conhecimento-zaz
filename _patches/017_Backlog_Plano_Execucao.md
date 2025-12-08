---
target: _catalogo/indice.yaml
version_from: "2.1"
version_to: "2.2"
commit_message: "[C3] add: Indexar backlog item Plano de Execução"
---

## EDITS

### EDIT 1 - Adicionar item ao backlog
APPEND_AFTER:
```
  - id: "bl_capability_discovery"
    nome: "Capability Discovery"
    chave: "capability discovery explicar usuário funcionalidades hierarquia"
    arquivo: "_backlog/capability_discovery.md"
    triggers:
      - "o que você sabe fazer"
      - "quais capabilities"
      - "explicar funcionalidades"
      - "discovery"
    metadata:
      prioridade: alta
      status: Pendente
```
ADD:
```

  - id: "bl_plano_execucao"
    nome: "Backlog com Plano de Execução"
    chave: "plano execução método criar patch substituição escopo artefatos"
    arquivo: "_backlog/backlog_plano_execucao.md"
    triggers:
      - "plano de execução"
      - "método de edição"
      - "patch ou substituição"
    metadata:
      prioridade: media
      status: Pendente
```

### EDIT 2 - Atualizar versão
FIND:
```
versao: "2.1"
```
REPLACE:
```
versao: "2.2"
```

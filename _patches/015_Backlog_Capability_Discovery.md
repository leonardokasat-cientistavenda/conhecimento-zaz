---
target: _catalogo/indice.yaml
version_from: "2.0"
version_to: "2.1"
commit_message: "[C3] add: Indexar backlog item Capability Discovery"
---

## EDITS

### EDIT 1 - Adicionar item ao backlog
APPEND_AFTER:
```
  - id: "bl_catalogo_multi_tipo"
    nome: "Catálogo Multi-Tipo"
    chave: "catálogo multi-tipo docs backlog sprint indexar tipos"
    arquivo: "_backlog/catalogo_multi_tipo.md"
    triggers:
      - "catálogo multi-tipo"
      - "indexar backlog"
      - "indexar sprint"
    metadata:
      prioridade: alta
      status: Promovido
      promovido_em: S008
```
ADD:
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

### EDIT 2 - Atualizar versão
FIND:
```
versao: "2.0"
```
REPLACE:
```
versao: "2.1"
```

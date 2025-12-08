---
target: _sprints/S007_Processo_Sprint.md
version_from: "2.1"
version_to: "2.2"
commit_message: "[C2] update: S007 - Fallback removido após S008 - S008/T07"
---

## EDITS

### EDIT 1 - Atualizar seção FALLBACK
FIND:
```
## FALLBACK TEMPORÁRIO

Até que Catálogo suporte multi-tipo (S008):
- `listar_backlog()` → lê `_backlog/` diretamente
- `listar_sprints()` → lê `_sprints/` diretamente

Após S008:
- `listar_backlog()` → `Catalogo.pesquisar(tipo: "backlog")`
- `listar_sprints()` → `Catalogo.pesquisar(tipo: "sprint")`
```
REPLACE:
```
## FALLBACK TEMPORÁRIO

~~Até que Catálogo suporte multi-tipo (S008):~~
~~- `listar_backlog()` → lê `_backlog/` diretamente~~
~~- `listar_sprints()` → lê `_sprints/` diretamente~~

✅ **Resolvido em S008** (2025-12-08):
- `listar_backlog()` → `Catalogo.pesquisar(tipo: "backlog")`
- `listar_sprints()` → `Catalogo.pesquisar(tipo: "sprint")`
- Índice atualizado: `_catalogo/indice.yaml` v2.0
```

### EDIT 2 - Atualizar PRÓXIMOS PASSOS
FIND:
```
## PRÓXIMOS PASSOS

1. **S008:** Promover item `catalogo_multi_tipo.md`
2. Implementar Catálogo com suporte a múltiplos tipos
3. Migrar Gestão de Projetos para usar Catálogo
```
REPLACE:
```
## PRÓXIMOS PASSOS

~~1. **S008:** Promover item `catalogo_multi_tipo.md`~~ ✅
~~2. Implementar Catálogo com suporte a múltiplos tipos~~ ✅
~~3. Migrar Gestão de Projetos para usar Catálogo~~ ✅

**Concluído em S008** (2025-12-08)
```

### EDIT 3 - Adicionar ao histórico
APPEND_AFTER:
```
| 2.1 | 2025-12-08 | **Concluída:** 3 documentos publicados. GENESIS v1.5. Backlog para S008 criado. |
```
ADD:
```
| 2.2 | 2025-12-08 | **Fallback removido:** S008 implementou Catálogo multi-tipo. |
```

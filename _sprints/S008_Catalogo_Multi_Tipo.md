# Sprint S008: Catálogo Multi-Tipo

## Frontmatter

```yaml
codigo: S008
objetivo: "Expandir Catálogo para suportar múltiplos tipos (docs, backlog, sprint)"
backlog_origem: _backlog/catalogo_multi_tipo.md
tipo_projeto: Infra
status: Concluida
data_inicio: 2025-12-08
data_prevista: null
data_fim: 2025-12-08
```

---

## Contexto

Durante S007, identificamos que Gestão de Projetos precisa de busca semântica
para listar backlog e sprints. Em vez de implementar busca separada, vamos
expandir o Catálogo como módulo de indexação genérico.

**Problema atual:**
- Catálogo indexa apenas `docs/` (conhecimento publicado)
- Gestão de Projetos lê pastas `_backlog/` e `_sprints/` diretamente (fallback)
- Duas implementações de busca = mais manutenção

**Solução:**
- Catálogo indexa qualquer tipo (docs, backlog, sprint)
- Gestão de Projetos usa `Catalogo.pesquisar()` para tudo
- Uma implementação de busca = reuso

---

## Tasks

| # | Descrição | Status | Artefatos |
|---|-----------|--------|-----------|
| T01 | Ler Catálogo atual (spec + índice) | ✅ | |
| T02 | Atualizar spec: adicionar atributo `tipo` | ✅ | `_patches/013_S008_Catalogo_Multi_Tipo.md` |
| T03 | Atualizar `_catalogo/indice.yaml` com estrutura multi-tipo | ✅ | `_catalogo/indice.yaml` v2.0 |
| T04 | Indexar backlog existente | ✅ | 6 itens indexados |
| T05 | Indexar sprints existentes | ✅ | 6 itens indexados |
| T06 | Testar fluxo: GENESIS → Gestão → Catálogo | ✅ | 6 testes passaram |
| T07 | Atualizar Gestão de Projetos (remover fallback) | ✅ | `_patches/014_S007_Fallback_Resolvido.md` |

---

## Critérios de Aceite

- [x] `Catalogo.pesquisar(tipo: "backlog")` retorna itens de `_backlog/`
- [x] `Catalogo.pesquisar(tipo: "sprint")` retorna itens de `_sprints/`
- [x] `Gestao.listar_backlog()` usa Catálogo (não leitura direta)
- [x] `Gestao.listar_sprints()` usa Catálogo (não leitura direta)
- [x] GENESIS roteia "iniciar sprint" → Gestão de Projetos
- [x] Fluxo completo testado

---

## Arquitetura Implementada

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CATÁLOGO v2.0                                    │
│                    (Módulo de Indexação + Busca)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│   │ tipo: docs      │  │ tipo: backlog   │  │ tipo: sprint    │             │
│   │ 6 itens         │  │ 6 itens         │  │ 6 itens         │             │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
│                         pesquisar(query, tipo?)                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Entregáveis

| Arquivo | Versão | Mudança |
|---------|--------|---------|
| `_catalogo/indice.yaml` | v2.0 | Estrutura multi-tipo |
| `_catalogo/README.md` | v2.0 | Documentação atualizada |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | v1.2 | Tipos suportados (via patch) |
| `_sprints/S007_Processo_Sprint.md` | v2.2 | Fallback marcado como resolvido (via patch) |

---

## Referências

| Documento | Relação |
|-----------|---------|
| `_backlog/catalogo_multi_tipo.md` | Origem (backlog item) |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Spec atualizada |
| `_catalogo/indice.yaml` | Índice expandido |
| `docs/00_I/00_I_2_Gestao_Projetos.md` | Já usava Catálogo |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação. Promovido de `_backlog/catalogo_multi_tipo.md`. |
| 2.0 | 2025-12-08 | **Concluída.** Todas as tasks completas. Catálogo v2.0 com multi-tipo. |

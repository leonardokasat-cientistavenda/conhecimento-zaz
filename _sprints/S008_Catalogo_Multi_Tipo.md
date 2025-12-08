# Sprint S008: Catálogo Multi-Tipo

## Frontmatter

```yaml
codigo: S008
objetivo: "Expandir Catálogo para suportar múltiplos tipos (docs, backlog, sprint)"
backlog_origem: _backlog/catalogo_multi_tipo.md
tipo_projeto: Infra
status: Ativa
data_inicio: 2025-12-08
data_prevista: null
data_fim: null
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
| T01 | Ler Catálogo atual (spec + índice) | ⬜ | |
| T02 | Atualizar spec: adicionar atributo `tipo` | ⬜ | |
| T03 | Atualizar `_catalogo/indice.yaml` com estrutura multi-tipo | ⬜ | |
| T04 | Indexar backlog existente | ⬜ | |
| T05 | Indexar sprints existentes | ⬜ | |
| T06 | Testar fluxo: GENESIS → Gestão → Catálogo | ⬜ | |
| T07 | Atualizar Gestão de Projetos (remover fallback) | ⬜ | |

---

## Critérios de Aceite

- [ ] `Catalogo.pesquisar(tipo: "backlog")` retorna itens de `_backlog/`
- [ ] `Catalogo.pesquisar(tipo: "sprint")` retorna itens de `_sprints/`
- [ ] `Gestao.listar_backlog()` usa Catálogo (não leitura direta)
- [ ] `Gestao.listar_sprints()` usa Catálogo (não leitura direta)
- [ ] GENESIS roteia "iniciar sprint" → Gestão de Projetos
- [ ] Fluxo completo testado

---

## Arquitetura Proposta

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CATÁLOGO                                         │
│                    (Módulo de Indexação + Busca)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│   │ tipo: docs      │  │ tipo: backlog   │  │ tipo: sprint    │             │
│   │ (conhecimento)  │  │ (trabalho)      │  │ (execução)      │             │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
│                         pesquisar(query, tipo?)                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| `_backlog/catalogo_multi_tipo.md` | Origem (backlog item) |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Spec atual a atualizar |
| `_catalogo/indice.yaml` | Índice a expandir |
| `docs/00_I/00_I_2_Gestao_Projetos.md` | Dependente (remover fallback) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação. Promovido de `_backlog/catalogo_multi_tipo.md`. |

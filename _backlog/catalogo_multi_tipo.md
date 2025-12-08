---
titulo: "Catálogo: Suporte a múltiplos tipos (docs, backlog, sprint)"
origem:
  - S007
data_criacao: 2025-12-08
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: Catálogo
---

## Contexto

Durante S007, identificamos que Gestão de Projetos precisa de busca semântica
para listar backlog e sprints. Em vez de implementar busca separada, reusar
Catálogo como módulo de indexação genérico.

## Problema

```
ATUAL:
- Catálogo indexa apenas docs/ (conhecimento publicado)
- Gestão de Projetos precisaria ler pastas _backlog/ e _sprints/ diretamente
- Duas implementações de busca = mais manutenção

PROPOSTO:
- Catálogo indexa qualquer tipo (docs, backlog, sprint)
- Gestão de Projetos usa Catalogo.pesquisar() para tudo
- Uma implementação de busca = reuso
```

## Requisitos

1. Catálogo suporta atributo `tipo` no índice:
   - `docs` → conhecimento publicado
   - `backlog` → itens de trabalho pendente
   - `sprint` → ciclos de execução

2. Método `pesquisar(query, tipo?)` filtra por tipo

3. Integração com Gestão de Projetos:
   - `Backlog.capturar()` → indexa no Catálogo (tipo: backlog)
   - `Sprint.iniciar()` → indexa no Catálogo (tipo: sprint)
   - `Gestao.listar_backlog()` → `Catalogo.pesquisar(tipo: backlog)`
   - `Gestao.listar_sprints()` → `Catalogo.pesquisar(tipo: sprint)`

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
                                    ▲
                                    │
                    ┌───────────────┴───────────────┐
                    │      GESTÃO DE PROJETOS       │
                    │  listar_backlog()             │
                    │  listar_sprints()             │
                    │  promover()                   │
                    └───────────────────────────────┘
```

## Referências

- Conversa S007 sobre reuso de Catálogo
- docs/00_I/00_I_2_Gestao_Projetos.md (dependência)
- docs/00_E/00_E_1_4_Catalogo.md (a ser atualizado)

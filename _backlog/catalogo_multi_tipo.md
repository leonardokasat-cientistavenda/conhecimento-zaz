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

## Integração com GENESIS

**Objetivo:** GENESIS deve rotear corretamente para Gestão de Projetos e
permitir início de sprints no novo paradigma.

### Fluxo Novo Paradigma

```
USUÁRIO: "Quero iniciar nova sprint"
    │
    ▼
GENESIS: Detecta intenção → Roteia para Gestão de Projetos
    │
    ▼
GESTÃO DE PROJETOS: 
    │ 1. listar_backlog() → Catalogo.pesquisar(tipo: backlog)
    │ 2. Mostra itens pendentes
    │ 3. Usuário seleciona
    │ 4. promover(item) → Sprint.iniciar() + Backlog.atualizar()
    │
    ▼
SPRINT INICIADA (código automático: S008, S009...)
```

### Ações Necessárias nesta Sprint (S008)

| # | Ação | Arquivo |
|---|------|---------|
| 1 | Adicionar atributo `tipo` ao índice | `_catalogo/index.yaml` |
| 2 | Atualizar método `indexar()` | `docs/00_E/00_E_1_4_Catalogo.md` |
| 3 | Atualizar método `pesquisar()` | `docs/00_E/00_E_1_4_Catalogo.md` |
| 4 | Indexar backlog existente | `_backlog/*.md` → Catálogo |
| 5 | Indexar sprints existentes | `_sprints/*.md` → Catálogo |
| 6 | Testar fluxo completo | GENESIS → Gestão → Catálogo |

### Fallback (Enquanto Não Implementado)

Até que Catálogo suporte multi-tipo, Gestão de Projetos funciona com leitura
direta de pastas:

```
listar_backlog() → github:get_file_contents(path="_backlog/")
listar_sprints() → github:get_file_contents(path="_sprints/")
```

Após S008, migra para:

```
listar_backlog() → Catalogo.pesquisar(tipo: "backlog")
listar_sprints() → Catalogo.pesquisar(tipo: "sprint")
```

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
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
          ▼                         ▼                         ▼
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│     GENESIS     │     │  GESTÃO DE PROJETOS │     │  META SISTEMAS  │
│  (roteamento)   │────▶│  listar_backlog()   │     │  (domínios)     │
│                 │     │  listar_sprints()   │     │                 │
└─────────────────┘     │  promover()         │     └─────────────────┘
                        └─────────────────────┘
```

## Critérios de Aceite

- [ ] `Catalogo.pesquisar(tipo: "backlog")` retorna itens de `_backlog/`
- [ ] `Catalogo.pesquisar(tipo: "sprint")` retorna itens de `_sprints/`
- [ ] `Gestao.listar_backlog()` usa Catálogo (não leitura direta)
- [ ] `Gestao.listar_sprints()` usa Catálogo (não leitura direta)
- [ ] GENESIS roteia "iniciar sprint" → Gestão de Projetos
- [ ] Fluxo completo testado: GENESIS → Gestão → Sprint iniciada

## Referências

- Conversa S007 sobre reuso de Catálogo
- docs/00_I/00_I_2_Gestao_Projetos.md (dependência)
- docs/00_E/00_E_1_4_Catalogo.md (a ser atualizado)

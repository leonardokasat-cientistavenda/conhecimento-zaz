# Sprint S009: Capability Discovery

## Frontmatter

```yaml
codigo: S009
objetivo: "GENESIS explica o que sabe fazer para usuários novos"
backlog_origem: _backlog/capability_discovery.md
tipo_projeto: Feature
status: Concluída
data_inicio: 2025-12-08
data_prevista: null
data_fim: 2025-12-08
```

---

## Contexto

**Problema:** Usuários novos não sabem o que GENESIS é capaz de fazer. Hoje, apenas o criador conhece as capabilities porque foi ele quem construiu. Para abrir o sistema para mais usuários, GENESIS precisa ser capaz de explicar o que sabe fazer quando perguntado.

**Insight:** Quem não criou o sistema não sabe o que pedir.

**Solução:** Adicionar campo `capability` no Catálogo com descrição amigável + exemplos, e método `listar_capabilities()` no GENESIS.

---

## M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Capability** | Algo que GENESIS sabe fazer (conhecer, decidir, gerenciar) |
| **Discovery** | Usuário descobre capabilities disponíveis perguntando |
| **Hierarquia** | Capabilities organizadas em pai → filho (DECIDIR → Raciocínio) |
| **Descrição Usuário** | Texto amigável, não técnico, para explicar capability |

---

## Tasks

| # | Descrição | Status | Artefatos |
|---|-----------|--------|-----------|
| T01 | Ler Catálogo atual (spec + índice) | ✅ | |
| T02 | Definir estrutura do campo `capability` | ✅ | Option B: atributo enriquecedor |
| T03 | Atualizar `_catalogo/indice.yaml` com capabilities | ✅ | 3 itens: Epistemologia, Raciocínio, Gestão |
| T04 | (incorporado em T03) | ✅ | |
| T05 | Adicionar método `listar_capabilities()` no GENESIS | ✅ | GENESIS v1.7 |
| T06 | Testar fluxo: "o que você sabe fazer?" | ✅ | Teste passou |

---

## Critérios de Aceite

- [x] Catálogo tem campo `capability` com: descrição, exemplos
- [x] GENESIS responde "o que você sabe fazer?" listando capabilities
- [x] Descrições são amigáveis, não técnicas

---

## Decisões Técnicas

1. **Capability como atributo** (Option B) vs tipo separado (Option A)
   - Escolhido: Option B - enriquece itens existentes
   - Razão: Simplicidade, sem impacto em outros sistemas

2. **Implementação minor** vs M0-M4 completo
   - Escolhido: Minor - estende estrutura existente
   - Razão: Não cria novo Meta Sistema, apenas adiciona atributo

---

## Arquitetura Implementada

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CAPABILITY DISCOVERY                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  User: "O que você sabe fazer?"                                             │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ GENESIS.listar_capabilities()                                       │    │
│  │   → Ler _catalogo/indice.yaml                                       │    │
│  │   → Filtrar itens com atributo capability                           │    │
│  │   → Formatar resposta amigável                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         │                                                                   │
│         ▼                                                                   │
│  "Posso ajudar você a:                                                      │
│   • CONHECER - Criar e buscar conhecimento estruturado                      │
│   • DECIDIR - Tomar decisões de forma estruturada                           │
│   • GERENCIAR - Organizar trabalho em backlog e sprints                     │
│                                                                             │
│   Quer saber mais sobre alguma dessas?"                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Artefatos Modificados

| Arquivo | Versão | Mudança |
|---------|--------|---------|
| `_catalogo/indice.yaml` | 2.1 | Campo `capability` em 3 itens |
| `genesis/GENESIS.md` | 1.7 | Método `listar_capabilities()`, glossário expandido |

---

## Referências

| Documento | Relação |
|-----------|---------|
| `_backlog/capability_discovery.md` | Origem (backlog item) |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Spec de referência |
| `_catalogo/indice.yaml` | Índice atualizado |
| `genesis/GENESIS.md` | Método adicionado |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação. Promovido de `_backlog/capability_discovery.md`. |
| 1.1 | 2025-12-08 | **Concluída.** Tasks T01-T06 completadas. Capability implementado como atributo no índice. |

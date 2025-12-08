# Sprint S009: Capability Discovery

## Frontmatter

```yaml
codigo: S009
objetivo: "GENESIS explica o que sabe fazer para usuários novos"
backlog_origem: _backlog/capability_discovery.md
tipo_projeto: Feature
status: Em Andamento
data_inicio: 2025-12-08
data_prevista: null
data_fim: null
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
| T01 | Ler Catálogo atual (spec + índice) | ⬜ | |
| T02 | Definir estrutura do campo `capability` | ⬜ | |
| T03 | Atualizar spec Catálogo: adicionar campo capability | ⬜ | |
| T04 | Atualizar `_catalogo/indice.yaml` com capabilities | ⬜ | |
| T05 | Adicionar método `listar_capabilities()` no GENESIS | ⬜ | |
| T06 | Testar fluxo: "o que você sabe fazer?" | ⬜ | |

---

## Critérios de Aceite

- [ ] Catálogo tem campo `capability` com: descrição, exemplos, pai
- [ ] GENESIS responde "o que você sabe fazer?" listando capabilities
- [ ] Usuário pode navegar hierarquia (ex: "me conta mais sobre DECIDIR")
- [ ] Descrições são amigáveis, não técnicas

---

## Arquitetura Proposta

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
│  │   → Catalogo.pesquisar(tipo: "capability")                          │    │
│  │   → Retorna lista formatada                                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         │                                                                   │
│         ▼                                                                   │
│  "Posso ajudar você a:                                                      │
│   • CONHECER - Criar e buscar conhecimento estruturado                      │
│   • DECIDIR - Tomar decisões com método H→E→I→D                             │
│   • GERENCIAR - Organizar trabalho em backlog e sprints                     │
│                                                                             │
│   Quer saber mais sobre alguma dessas?"                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| `_backlog/capability_discovery.md` | Origem (backlog item) |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Spec a atualizar |
| `_catalogo/indice.yaml` | Índice a expandir |
| `genesis/GENESIS.md` | Adicionar método |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação. Promovido de `_backlog/capability_discovery.md`. |

# Sprint S010: Persistência Híbrida

## Frontmatter

```yaml
codigo: S010
objetivo: "Migrar persistência transacional para MongoDB, mantendo GitHub para definições"
backlog_origem: _backlog/Persistencia_Hibrida.md
tipo_projeto: Infra
status: Ativa
data_inicio: 2025-12-08
data_prevista: null
data_fim: null
```

---

## Contexto

**Problema:** Persistência 100% GitHub está causando problemas recorrentes (patches frágeis, latência, falhas silenciosas) que impactam velocidade de desenvolvimento.

**Solução:** Arquitetura híbrida - MongoDB para transações (catálogo, backlog, sprints), GitHub para definições (GENESIS, Epistemologia, Módulos).

**Insight:** LLM + Markdown é imbatível para prototipar. Quando escala, migra para híbrido.

---

## M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Persistência Híbrida** | GitHub para definições + MongoDB para transações |
| **MongoDB Atlas** | Serviço cloud de MongoDB com free tier |
| **MCP** | Model Context Protocol - ponte LLM ↔ serviços externos |
| **Collection** | Tabela no MongoDB (schema flexível) |
| **CQRS** | Separar writes de reads (inspiração arquitetural) |

---

## Tasks

| # | Descrição | Status | Artefatos |
|---|-----------|--------|-----------|
| T01 | Setup MongoDB Atlas (cluster free tier) | ⬜ | |
| T02 | Definir schemas das collections | ⬜ | |
| T03 | Migrar `_catalogo/indice.yaml` → MongoDB | ⬜ | |
| T04 | Migrar `_backlog/*.md` → MongoDB | ⬜ | |
| T05 | Criar módulo de persistência unificado | ⬜ | |
| T06 | Atualizar GENESIS para usar MongoDB em buscar() | ⬜ | |
| T07 | Eliminar `_patches/` e GitHub Action | ⬜ | |
| T08 | Documentar nova arquitetura | ⬜ | |

---

## Critérios de Aceite

- [ ] MongoDB Atlas configurado e acessível
- [ ] Collections criadas: catalogo, backlog_items, sprints, decisoes
- [ ] Catálogo funcionando via MongoDB (busca semântica)
- [ ] Backlog CRUD via MongoDB
- [ ] GitHub Action de patches removida
- [ ] Documentação de infraestrutura atualizada

---

## Arquitetura Alvo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PERSISTÊNCIA v1.0                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GITHUB (Definições)                 MONGODB (Transações)                   │
│  ────────────────────                ───────────────────                    │
│  • GENESIS.md                        • Collection: catalogo                 │
│  • Epistemologia.md                  • Collection: backlog_items            │
│  • Módulos (.md)                     • Collection: sprints                  │
│  • Prompts                           • Collection: decisoes                 │
│                                      • Collection: execucoes (futuro)       │
│  NATUREZA:                           NATUREZA:                              │
│  • Muda pouco                        • Muda frequentemente                  │
│  • Versionamento                     • Queries complexas                    │
│  • "Código" do sistema               • Latência baixa                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Fora de Escopo (Fase 3)

- Migrar operações para código Python/Node
- Eliminar chamadas LLM para operações simples
- Otimização de latência < 100ms
- Cache de respostas

---

## Referências

| Documento | Relação |
|-----------|---------|
| `_backlog/Persistencia_Hibrida.md` | Origem (backlog item completo) |
| `docs/00_I_1_1_GitHub.md` | Infraestrutura atual |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Spec do Catálogo |
| `_catalogo/indice.yaml` | Índice a migrar |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-08 | Criação. Promovido de `_backlog/Persistencia_Hibrida.md`. |

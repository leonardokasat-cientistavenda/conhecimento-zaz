# ⚠️ DEPRECATED

Este diretório foi **descontinuado**.

## Migração

Todo o conteúdo foi migrado para a estrutura de Produto:

| Antes | Depois |
|-------|--------|
| `VERSION.md` | `docs/04_P/Genesis/README.md` (Produto.estagio) |
| `decisions/*.md` | `docs/04_P/Genesis/arquitetura.md` (seção ADRs) |
| `versions/*.md` | `docs/04_P/Genesis/arquitetura.md` (histórico) |

## Nova localização

```
docs/04_P/Genesis/
├── README.md           ← Produto Genesis
├── arquitetura.md      ← Decisões técnicas + diagramas
└── epicos/
    ├── kernel.md
    ├── memoria.md
    ├── consciencia.md
    ├── roteamento.md
    ├── construcao.md
    ├── mcp.md
    └── auto-recursao.md
```

## Por quê?

Seguindo MS_Produto, a gestão de ciclo de vida de produtos deve usar a estrutura unificada de Produto → Épico → Backlog → Sprint.

Manter `genesis/architecture/` paralelo criava duplicação e conflito de visões.

---

*Migrado em 2025-12-13*

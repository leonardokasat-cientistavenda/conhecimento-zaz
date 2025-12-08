---
titulo: "Capability Discovery - GENESIS explica o que sabe fazer"
data_criacao: 2025-12-08
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: Catálogo + GENESIS
---

## Contexto

### Origem: S008 (2025-12-08)

**Problema:** Usuários novos não sabem o que GENESIS é capaz de fazer. Hoje, apenas o criador conhece as capabilities porque foi ele quem construiu. Para abrir o sistema para mais usuários, GENESIS precisa ser capaz de explicar o que sabe fazer quando perguntado.

**Insight:** Quem não criou o sistema não sabe o que pedir.

---

## M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Capability** | Algo que GENESIS sabe fazer (conhecer, decidir, gerenciar) |
| **Discovery** | Usuário descobre capabilities disponíveis perguntando |
| **Hierarquia** | Capabilities organizadas em pai → filho (DECIDIR → Raciocínio) |
| **Descrição Usuário** | Texto amigável, não técnico, para explicar capability |

## M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| Usuário novo não sabe o que pedir | Capabilities não são explicáveis | GENESIS explicar o que sabe fazer |
| Usuário pergunta "o que você faz?" | Catálogo não tem campo para isso | Campo `capability` com descrição + exemplos |
| Sistema subutilizado | Usuário não descobre funcionalidades | Discovery navegável (pai → filho) |

## M0.3 Origem

- **Descoberto em:** S008 (discussão sobre Catálogo)
- **Contexto:** Preparar GENESIS para múltiplos usuários além do criador
- **Insight:** Quem não criou o sistema não sabe o que pedir

---

## Referências

- Conversa S008 sobre papel do Catálogo
- `_catalogo/indice.yaml` - onde capabilities serão indexadas
- `genesis/GENESIS.md` - onde método `listar_capabilities()` será adicionado

# Sprint S007: Gestão de Projetos

## CONTEXTO

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Branch: main

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## SPRINT: S007

**Objetivo:** Criar sistema de Gestão de Projetos (Backlog + Sprint) para organizar trabalho futuro

**Status:** ✅ Concluída

**Data Início:** 2025-12-07
**Data Fim:** 2025-12-08

---

## ENTREGÁVEIS

| Documento | Path | Versão |
|-----------|------|--------|
| Gestão de Projetos | `docs/00_I/00_I_2_Gestao_Projetos.md` | v1.0 |
| Backlog | `docs/00_I/00_I_2_1_Backlog.md` | v1.0 |
| Sprint | `docs/00_I/00_I_2_2_Sprint.md` | v1.0 |

---

## DECISÕES ARQUITETURAIS

### 1. Arquitetura Pai-Filho
- Gestão de Projetos = orquestrador puro (sem estado próprio)
- Backlog e Sprint = filhos com estado e métodos
- Catálogo = infraestrutura compartilhada de busca

### 2. Backlog: Captura Inteligente
- `capturar()` busca similar no Catálogo antes de criar
- Se encontra similar → pergunta: enriquecer ou criar novo?
- Evita duplicação, permite contexto acumulativo

### 3. Sprint: Código Automático
- `gerar_codigo()` busca última sprint no Catálogo
- Incrementa automaticamente (S007 → S008)
- Usuário não precisa gerenciar sequência

### 4. Sistema de Datas
- `data_criacao`, `data_promocao`, `data_resolucao` rastreiam ciclo de vida
- Frontmatter YAML estruturado para backlog e sprint

### 5. Integração GENESIS
- Novo tipo de roteamento: GERENCIAR
- GENESIS v1.5 roteia para Gestão de Projetos
- Triggers: "iniciar sprint", "capturar backlog", "listar backlog"

---

## BACKLOG GERADO

| Item | Path | Status |
|------|------|--------|
| Catálogo multi-tipo | `_backlog/catalogo_multi_tipo.md` | 🔴 Pendente |

**Descrição:** Catálogo suportar tipos (docs, backlog, sprint) para que Gestão de Projetos use busca semântica em vez de leitura direta de pastas.

---

## ATUALIZAÇÕES EM OUTROS ARQUIVOS

| Arquivo | Versão | Mudança |
|---------|--------|---------|
| `genesis/GENESIS.md` | v1.5 | GERENCIAR + referências Gestão de Projetos |

---

## FALLBACK TEMPORÁRIO

~~Até que Catálogo suporte multi-tipo (S008):~~
~~- `listar_backlog()` → lê `_backlog/` diretamente~~
~~- `listar_sprints()` → lê `_sprints/` diretamente~~

✅ **Resolvido em S008** (2025-12-08):
- `listar_backlog()` → `Catalogo.pesquisar(tipo: "backlog")`
- `listar_sprints()` → `Catalogo.pesquisar(tipo: "sprint")`
- Índice atualizado: `_catalogo/indice.yaml` v2.0

---

## PRÓXIMOS PASSOS

~~1. **S008:** Promover item `catalogo_multi_tipo.md`~~ ✅
~~2. Implementar Catálogo com suporte a múltiplos tipos~~ ✅
~~3. Migrar Gestão de Projetos para usar Catálogo~~ ✅

**Concluído em S008** (2025-12-08)

---

## HISTÓRICO

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-07 | Criação. Promovido do BACKLOG.md. |
| 1.1 | 2025-12-07 | Simplificado. Foco em M0-M4. |
| 1.2 | 2025-12-07 | Corrigido. Conteúdo via patch, não arquivos separados. |
| 2.0 | 2025-12-08 | **Refatorado:** Renomeado para "Gestão de Projetos". Arquitetura pai-filho. Sistema de datas. |
| 2.1 | 2025-12-08 | **Concluída:** 3 documentos publicados. GENESIS v1.5. Backlog para S008 criado. |
| 2.2 | 2025-12-08 | **Fallback removido:** S008 implementou Catálogo multi-tipo. |

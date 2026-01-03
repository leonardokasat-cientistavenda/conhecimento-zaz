# BKL_PANTHEON - Backlog Pantheon

---

```yaml
nome: BKL_PANTHEON
versao: "1.0"
tipo: Backlog
status: Ativo
camada: 4
dominio: Orquestração
data_criacao: "2026-01-03"
produto_ref: Pantheon
saga_id: SAGA-PANTHEON
```

---

## 1. Visão do Produto

> **Pantheon** é a arquitetura que permite agentes inteligentes no Mattermost,
> começando com @genesis e evoluindo para um ecossistema multi-agente.
>
> **Meta:** Claude Desktop no MM + vantagens de colaboração

---

## 2. Status Consolidado

| Versão | Escopo | Status | Data |
|--------|--------|--------|------|
| V0 | Chat + Contexto + Streaming | ✅ Concluído | 2025-12-30 |
| V0.1 | Upload arquivos | ✅ Código (testar) | 2026-01-03 |
| V0.2 | Seleção modelo | ✅ Concluído | 2026-01-03 |
| V0.3 | Multi-agente | ✅ Concluído | 2026-01-03 |
| V0.4 | @infra híbrido | ✅ Concluído | 2026-01-03 |
| V1 | MCP Tools | □ Pendente | - |
| V1.1 | Extended Thinking | □ Pendente | - |
| V1.2 | Memory | □ Pendente | - |
| V2 | Camunda + Canais | □ Pendente | - |

---

## 3. BacklogItems Ativos

### BKL-PANTHEON-001: Pendências Técnicas V0.X

```yaml
id: BKL-PANTHEON-001
tipo: minor
titulo: Pendências Técnicas V0.X
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 2
produtor: Sprint S-PANTHEON-002
consumidor: PROMETHEUS
origem:
  tipo: sprint_task
  sprint_id: S-PANTHEON-002
  auto_pull: true
```

**Escopo:**
| Task | Descrição | Esforço |
|------|-----------|--------|
| Testar upload arquivos | Validar imagens/PDFs no MM | 1h |
| Verificar Web Search | Confirmar se built-in funciona | 30min |
| Configurar CLICKHOUSE_PASSWORD | Habilitar métricas | 10min |
| Atualizar README Pantheon | Documentação | 30min |

---

### BKL-PANTHEON-002: V1 - Tool Registry + Executor

```yaml
id: BKL-PANTHEON-002
tipo: desenvolvimento
titulo: V1 - Tool Registry + Executor
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 5
produtor: Backlog
consumidor: PROMETHEUS
spec_ref: genesis/specs/PANTHEON_V1_SPEC.md
```

**Escopo:**
| Componente | Descrição | Esforço |
|------------|-----------|--------|
| toolRegistry.js | Registro central de tools | 2h |
| toolExecutor.js | Loop enquanto stop_reason=tool_use | 3h |

**Critério de Sucesso:**
```
Claude chama tool → Executor intercepta → Executa → Retorna resultado
```

---

### BKL-PANTHEON-003: V1 - GitHub Tool

```yaml
id: BKL-PANTHEON-003
tipo: desenvolvimento
titulo: V1 - GitHub Tool
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 3
produtor: Backlog
consumidor: PROMETHEUS
dependencia: BKL-PANTHEON-002
```

**Operações:**
| Operação | Descrição |
|----------|----------|
| github_get_file | Lê arquivo do repo |
| github_list_files | Lista diretório |
| github_search_code | Busca código |
| github_create_file | Cria arquivo |
| github_update_file | Atualiza arquivo |

**Critério de Sucesso:**
```
@genesis lê genesis/GENESIS.md e me resume
→ 🔧 Buscando no GitHub...
→ GENESIS é um sistema de inteligência híbrida...
```

---

### BKL-PANTHEON-004: V1 - MongoDB Tool

```yaml
id: BKL-PANTHEON-004
tipo: desenvolvimento
titulo: V1 - MongoDB Tool
status: pendente
prioridade: 🟡 Média
esforco_estimado_horas: 3
produtor: Backlog
consumidor: PROMETHEUS
dependencia: BKL-PANTHEON-002
```

**Operações:**
| Operação | Descrição |
|----------|----------|
| mongodb_find | Query com filtro |
| mongodb_findOne | Documento único |
| mongodb_aggregate | Pipeline |
| mongodb_insertOne | Inserir |
| mongodb_updateOne | Atualizar |

---

### BKL-PANTHEON-005: V1 - Mattermost Tool

```yaml
id: BKL-PANTHEON-005
tipo: desenvolvimento
titulo: V1 - Mattermost Tool
status: pendente
prioridade: 🟡 Média
esforco_estimado_horas: 2
produtor: Backlog
consumidor: PROMETHEUS
dependencia: BKL-PANTHEON-002
```

**Operações:**
| Operação | Descrição |
|----------|----------|
| mattermost_search_posts | Busca mensagens |
| mattermost_get_user | Info de usuário |
| mattermost_get_channel | Info de canal |
| mattermost_get_channel_posts | Posts recentes |

---

### BKL-PANTHEON-006: V1.1 - Extended Thinking

```yaml
id: BKL-PANTHEON-006
tipo: desenvolvimento
titulo: V1.1 - Extended Thinking
status: pendente
prioridade: 🟢 Baixa
esforco_estimado_horas: 2
produtor: Backlog
consumidor: PROMETHEUS
dependencia: BKL-PANTHEON-005
```

**Escopo:**
- Comando `/think` ativa deep reasoning
- Budget tokens configurável (default 10k)

---

### BKL-PANTHEON-007: V1.2 - Memory

```yaml
id: BKL-PANTHEON-007
tipo: desenvolvimento
titulo: V1.2 - Memory Persistente
status: pendente
prioridade: 🟢 Baixa
esforco_estimado_horas: 6
produtor: Backlog
consumidor: PROMETHEUS
dependencia: BKL-PANTHEON-006
```

**Escopo:**
| Comando | Descrição |
|---------|----------|
| /remember X | Salva informação |
| /forget X | Remove informação |
| /memories | Lista memórias |

---

## 4. Resumo de Esforço Pendente

| BKL | Título | Esforço | Prioridade |
|-----|--------|---------|------------|
| 001 | Pendências Técnicas | 2h | 🔴 Alta |
| 002 | Tool Registry + Executor | 5h | 🔴 Alta |
| 003 | GitHub Tool | 3h | 🔴 Alta |
| 004 | MongoDB Tool | 3h | 🟡 Média |
| 005 | Mattermost Tool | 2h | 🟡 Média |
| 006 | Extended Thinking | 2h | 🟢 Baixa |
| 007 | Memory | 6h | 🟢 Baixa |
| **Total** | | **23h** | |

---

## 5. Dependências

```
BKL-001 (Pendências)
    │
    ▼
BKL-002 (Registry + Executor)
    │
    ├─────────────┬─────────────┐
    ▼              ▼              ▼
BKL-003        BKL-004        BKL-005
(GitHub)       (MongoDB)      (Mattermost)
    │              │              │
    └─────────────┴─────────────┘
                   │
                   ▼
               BKL-006
          (Extended Thinking)
                   │
                   ▼
               BKL-007
               (Memory)
```

---

## 6. Referências

| Documento | Path |
|-----------|------|
| Spec V0 | genesis/specs/PANTHEON_V0_SPEC.md |
| Spec V1 | genesis/specs/PANTHEON_V1_SPEC.md |
| Sprint 001 | genesis/sprints/S-PANTHEON-001.md |
| Sprint 002 | genesis/sprints/S-PANTHEON-002.md |
| MS_Backlog | docs/04_B/MS_Backlog.md |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2026-01-03 | Criação. Consolidação de backlog no formato MS_Backlog. 7 items ativos. V0-V0.4 concluídos. |

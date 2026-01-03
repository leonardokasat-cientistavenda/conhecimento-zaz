# BKL_PANTHEON - Backlog Pantheon

---

```yaml
nome: BKL_PANTHEON
versao: "2.0"
tipo: Backlog
status: Ativo
camada: 4
dominio: Orquestração
data_criacao: "2026-01-03"
data_atualizacao: "2026-01-03"
produto_ref: Pantheon
saga_id: SAGA-PANTHEON
```

---

## 1. Visão do Produto

> **Pantheon** é a arquitetura que permite agentes inteligentes no Mattermost,
> começando com @genesis e evoluindo para um ecossistema multi-agente.
>
> **Meta:** Claude Desktop no MM + integração Camunda + NLU + Model Routing

---

## 2. Status Consolidado

| Versão | Escopo | Status | Data |
|--------|--------|--------|------|
| V0 | Chat + Contexto + Streaming | ✅ Concluído | 2025-12-30 |
| V0.1 | Upload arquivos | ✅ Código (testar) | 2026-01-03 |
| V0.2 | Seleção modelo | ✅ Concluído | 2026-01-03 |
| V0.3 | Multi-agente | ✅ Concluído | 2026-01-03 |
| V0.4 | @infra híbrido | ✅ Concluído | 2026-01-03 |
| **V1** | **NLU + Camunda + GitHub** | 🔄 Em Andamento | - |
| V1.1 | Extended Thinking | □ Pendente | - |
| V1.2 | Memory | □ Pendente | - |
| V2 | Canais + Home Assistant | □ Pendente | - |

---

## 3. Arquitetura V1 (Camunda-first)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PANTHEON V1 ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   @genesis "lê o GENESIS.md e sugere melhorias"                            │
│          │                                                                  │
│          ▼                                                                  │
│   ┌─────────────────┐                                                      │
│   │  Claude Haiku   │  ← SEMPRE entrada (NLU: intent + complexidade)       │
│   │     (NLU)       │                                                      │
│   └────────┬────────┘                                                      │
│            │                                                                │
│            │ { intent, dominio, complexidade, fase }                       │
│            ▼                                                                │
│   ╔═════════════════╗                                                      │
│   ║       DMN       ║  ← Decide: modelo + workflow                         │
│   ║  (roteamento)   ║                                                      │
│   ╚════════╤════════╝                                                      │
│            │                                                                │
│     ┌──────┴──────────────────┐                                            │
│     │                         │                                            │
│     ▼                         ▼                                            │
│ ┌────────────┐          ┌────────────┐                                     │
│ │   BPMN     │          │   Claude   │                                     │
│ │ Workflow   │          │ (Sonnet/   │                                     │
│ │ (Camunda)  │          │  Opus)     │                                     │
│ └─────┬──────┘          └─────┬──────┘                                     │
│       │                       │                                            │
│       ▼                       │                                            │
│ ┌────────────┐                │                                            │
│ │  Workers   │                │                                            │
│ │ (GitHub,   │                │                                            │
│ │  MongoDB)  │                │                                            │
│ └─────┬──────┘                │                                            │
│       │                       │                                            │
│       └───────────┬───────────┘                                            │
│                   ▼                                                         │
│            ┌────────────┐                                                  │
│            │  Resposta  │                                                  │
│            │   no MM    │                                                  │
│            └────────────┘                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. BacklogItems Ativos

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
```

**Escopo:**
| Task | Descrição | Esforço |
|------|-----------|--------|
| Testar upload arquivos | Validar imagens/PDFs no MM | 1h |
| Verificar Web Search | Confirmar se built-in funciona | 30min |
| Configurar CLICKHOUSE_PASSWORD | Habilitar métricas | 10min |
| Atualizar README Pantheon | Documentação | 30min |

---

### BKL-PANTHEON-008: Melhorias Streaming 🆕

```yaml
id: BKL-PANTHEON-008
tipo: desenvolvimento
titulo: Melhorias Streaming
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 2.5
produtor: Backlog
consumidor: PROMETHEUS
```

**Problema:** Bots mostram "pensando..." mas não atualizam mensagem em tempo real. Usuário só vê resposta final.

**Escopo:**
| Task | Descrição | Esforço |
|------|-----------|--------|
| Investigar | Analisar throttle em streamer.js | 30min |
| Ajustar throttle | Reduzir intervalo de atualização | 1h |
| Rate limit MM | Verificar limites da API | 30min |
| Testar | Validar streaming progressivo | 30min |

---

### BKL-PANTHEON-014: NLU Layer (Haiku classifier) 🆕

```yaml
id: BKL-PANTHEON-014
tipo: desenvolvimento
titulo: NLU Layer (Haiku classifier)
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 2
produtor: Backlog
consumidor: PROMETHEUS
depende_de: [BKL-PANTHEON-001]
```

**Descrição:** Camada de classificação com Haiku para extrair intent, complexidade e fase epistemológica.

**Output:**
```json
{
  "intent": "especificar_sistema",
  "dominio": "crm",
  "complexidade": "alta",
  "fase_detectada": "m0_problema"
}
```

---

### BKL-PANTHEON-009: DMN Intent Router + Model Selector 🆕

```yaml
id: BKL-PANTHEON-009
tipo: desenvolvimento
titulo: DMN Intent Router + Model Selector
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 4
produtor: Backlog
consumidor: PROMETHEUS
depende_de: [BKL-PANTHEON-014]
```

**Descrição:** DMN no Camunda para roteamento de intenções e seleção dinâmica de modelo.

**Regras de Seleção:**
| Intent | Fase | Complexidade | Modelo |
|--------|------|--------------|--------|
| saudacao | * | * | HAIKU |
| pergunta_simples | * | baixa | HAIKU |
| especificar | m0/m1 | * | OPUS |
| gerar_codigo | * | alta | OPUS |
| analisar | * | * | SONNET |
| * | * | * | SONNET (fallback) |

---

### BKL-PANTHEON-010: Camunda Client no Pantheon 🆕

```yaml
id: BKL-PANTHEON-010
tipo: desenvolvimento
titulo: Camunda Client no Pantheon
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 2
produtor: Backlog
consumidor: PROMETHEUS
depende_de: [BKL-PANTHEON-009]
```

**Descrição:** Cliente REST para disparar workflows no Camunda.

**Métodos:**
| Método | Descrição |
|--------|-----------|
| startProcess | Inicia workflow BPMN |
| evaluateDecision | Avalia DMN |
| getProcessStatus | Status de execução |

---

### BKL-PANTHEON-011: BPMN + Worker GitHub (read) 🆕

```yaml
id: BKL-PANTHEON-011
tipo: desenvolvimento
titulo: BPMN + Worker GitHub (read)
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 3
produtor: Backlog
consumidor: PROMETHEUS
depende_de: [BKL-PANTHEON-010]
```

**Operações:**
| Operação | Descrição |
|----------|-----------|
| github_get_file | Lê arquivo do repo |
| github_list_files | Lista diretório |
| github_search_code | Busca código |

**Critério de Sucesso:**
```
@genesis lê genesis/GENESIS.md
→ 🔧 Buscando no GitHub...
→ [conteúdo do arquivo]
```

---

### BKL-PANTHEON-012: BPMN + Worker GitHub (write/patch) 🆕

```yaml
id: BKL-PANTHEON-012
tipo: desenvolvimento
titulo: BPMN + Worker GitHub (write/patch)
status: pendente
prioridade: 🔴 Alta
esforco_estimado_horas: 4
produtor: Backlog
consumidor: PROMETHEUS
depende_de: [BKL-PANTHEON-011]
```

**Operações:**
| Operação | Descrição |
|----------|-----------|
| github_create_file | Cria arquivo novo |
| github_patch_file | Patch cirúrgico (find/replace) |

**Formato Patch:**
```json
{
  "path": "pantheon/core/executor.js",
  "patches": [
    {"find": "const MAX = 5;", "replace": "const MAX = 10;"}
  ]
}
```

---

### BKL-PANTHEON-013: Fluxo Código → Arquivo → Deploy 🆕

```yaml
id: BKL-PANTHEON-013
tipo: desenvolvimento
titulo: Fluxo Código → Arquivo → Deploy
status: pendente
prioridade: 🟡 Média
esforco_estimado_horas: 3
produtor: Backlog
consumidor: PROMETHEUS
depende_de: [BKL-PANTHEON-012]
```

**Fluxo:**
```
Claude gera código → Arquivo anexo no MM → @infra deploy → GitHub → Action → PM2
```

**Human-in-the-loop:** Usuário aprova antes de publicar.

---

### BKL-PANTHEON-006: Extended Thinking

```yaml
id: BKL-PANTHEON-006
tipo: desenvolvimento
titulo: V1.1 - Extended Thinking
status: pendente
prioridade: 🟢 Baixa
esforco_estimado_horas: 2
produtor: Backlog
consumidor: PROMETHEUS
depende_de: [BKL-PANTHEON-013]
```

---

### BKL-PANTHEON-007: Memory

```yaml
id: BKL-PANTHEON-007
tipo: desenvolvimento
titulo: V1.2 - Memory Persistente
status: pendente
prioridade: 🟢 Baixa
esforco_estimado_horas: 6
produtor: Backlog
consumidor: PROMETHEUS
depende_de: [BKL-PANTHEON-006]
```

---

## 5. Items Deprecados

### ~~BKL-PANTHEON-002: Tool Registry + Executor~~ (DEPRECADO)
### ~~BKL-PANTHEON-003: GitHub Tool~~ (DEPRECADO)

> **Motivo:** Substituídos pela abordagem Camunda (BKL-009 a BKL-012).
> Arquitetura MCP foi trocada por BPMN + Workers.

---

## 6. Resumo de Esforço Pendente

| BKL | Título | Esforço | Prioridade |
|-----|--------|---------|------------|
| 001 | Pendências Técnicas | 2h | 🔴 Alta |
| 008 | Melhorias Streaming | 2.5h | 🔴 Alta |
| 014 | NLU Layer (Haiku) | 2h | 🔴 Alta |
| 009 | DMN Intent Router | 4h | 🔴 Alta |
| 010 | Camunda Client | 2h | 🔴 Alta |
| 011 | Worker GitHub (read) | 3h | 🔴 Alta |
| 012 | Worker GitHub (write) | 4h | 🔴 Alta |
| 013 | Código → Deploy | 3h | 🟡 Média |
| 006 | Extended Thinking | 2h | 🟢 Baixa |
| 007 | Memory | 6h | 🟢 Baixa |
| **Total** | | **30.5h** | |

---

## 7. Dependências

```
BKL-001 (Pendências)
    │
    ├────────────────────────────────────┐
    │                                    │
    ▼                                    ▼
BKL-008 (Streaming)               BKL-014 (NLU Haiku)
                                         │
                                         ▼
                                  BKL-009 (DMN Router)
                                         │
                                         ▼
                                  BKL-010 (Camunda Client)
                                         │
                                         ▼
                                  BKL-011 (GitHub read)
                                         │
                                         ▼
                                  BKL-012 (GitHub write)
                                         │
                                         ▼
                                  BKL-013 (Código → Deploy)
                                         │
                                         ▼
                                  BKL-006 (Extended Thinking)
                                         │
                                         ▼
                                  BKL-007 (Memory)
```

---

## 8. Referências

| Documento | Path |
|-----------|------|
| Spec V0 | genesis/specs/PANTHEON_V0_SPEC.md |
| Sprint 001 | genesis/sprints/S-PANTHEON-001.md |
| Sprint 002 | genesis/sprints/S-PANTHEON-002.md |
| Sprint 003 | docs/04_S/S-PANTHEON-003.md |
| MS_Backlog | docs/04_B/MS_Backlog.md |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2026-01-03 | Criação. 7 items ativos. V0-V0.4 concluídos. |
| 2.0 | 2026-01-03 | **Arquitetura Camunda**: Deprecar BKL-002/003 (MCP). Adicionar BKL-008 (Streaming), BKL-009 (DMN), BKL-010 (Camunda Client), BKL-011/012 (GitHub Workers), BKL-013 (Deploy), BKL-014 (NLU). Nova arquitetura: Haiku NLU → DMN → Modelo adequado. |

# BKL-PANTHEON-V1: Arquitetura Camunda + NLU + Model Routing

---

```yaml
id: BKL-PANTHEON-V1
titulo: "Pantheon V1 - Arquitetura Híbrida"
tipo: epico
prioridade: "🔴"
status: Em Andamento
data_criacao: "2026-01-03"
saga_id: SAGA-PANTHEON
produtor: "Humano"
tags:
  - pantheon
  - camunda
  - nlu
  - model-routing
```

---

## 1. Problema

O Pantheon V0 usa modelo fixo (Sonnet) para todas as interações. Isso gera:
- **Custo alto** em tarefas simples que poderiam usar Haiku
- **Qualidade baixa** em tarefas complexas que precisariam de Opus
- **Sem integração** com workflows determinísticos do Camunda

## 2. Solução

Arquitetura híbrida com:
1. **NLU Layer (Haiku):** Classifica intent, complexidade, fase
2. **DMN Router:** Seleciona modelo e workflow adequados
3. **Camunda Integration:** BPMN workflows para tools determinísticas
4. **Model Routing:** Haiku/Sonnet/Opus conforme necessidade

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA PANTHEON V1                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Mensagem                                                                  │
│      │                                                                      │
│      ▼                                                                      │
│   ┌─────────────────┐                                                      │
│   │  Claude Haiku   │  ← SEMPRE entrada (NLU)                              │
│   │  (classificar)  │                                                      │
│   └────────┬────────┘                                                      │
│            │ { intent, complexidade, fase }                                │
│            ▼                                                                │
│   ╔═════════════════╗                                                      │
│   ║       DMN       ║  ← Decide modelo + workflow                          │
│   ╚════════╤════════╝                                                      │
│            │                                                                │
│     ┌──────┴──────────────────┐                                            │
│     ▼                         ▼                                            │
│ ┌────────────┐          ┌────────────┐                                     │
│ │   BPMN     │          │   Claude   │                                     │
│ │ Workflow   │          │ (Sonnet/   │                                     │
│ │            │          │  Opus)     │                                     │
│ └────────────┘          └────────────┘                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. BacklogItems

### BKL-PANTHEON-001: Pendências Técnicas V0.X
- **Esforço:** 2h | **Prioridade:** 🔴
- Upload arquivos, Web Search, ClickHouse, README

### BKL-PANTHEON-008: Melhorias Streaming 🆕
- **Esforço:** 2.5h | **Prioridade:** 🔴
- Resolver "pensando..." sem atualização progressiva

### BKL-PANTHEON-014: NLU Layer (Haiku) 🆕
- **Esforço:** 2h | **Prioridade:** 🔴
- Classificador de intent com Haiku
- **Depende de:** BKL-001

### BKL-PANTHEON-009: DMN Intent Router 🆕
- **Esforço:** 4h | **Prioridade:** 🔴
- DMN para roteamento + seleção de modelo
- **Depende de:** BKL-014

### BKL-PANTHEON-010: Camunda Client 🆕
- **Esforço:** 2h | **Prioridade:** 🔴
- Cliente REST para Camunda
- **Depende de:** BKL-009

### BKL-PANTHEON-011: Worker GitHub (read) 🆕
- **Esforço:** 3h | **Prioridade:** 🔴
- BPMN + Worker para leitura GitHub
- **Depende de:** BKL-010

### BKL-PANTHEON-012: Worker GitHub (write/patch) 🆕
- **Esforço:** 4h | **Prioridade:** 🔴
- BPMN + Worker com suporte a patches
- **Depende de:** BKL-011

### BKL-PANTHEON-013: Código → Deploy 🆕
- **Esforço:** 3h | **Prioridade:** 🟡
- Fluxo código como arquivo → @infra → GitHub → Actions
- **Depende de:** BKL-012

---

## 4. Seleção de Modelo (DMN)

| Intent | Fase | Complexidade | Modelo |
|--------|------|--------------|--------|
| saudacao | * | * | HAIKU |
| pergunta_simples | * | baixa | HAIKU |
| pergunta_simples | * | média | SONNET |
| especificar | m0/m1 | * | OPUS |
| especificar | m2-m4 | * | SONNET |
| gerar_codigo | * | alta | OPUS |
| gerar_codigo | * | baixa | SONNET |
| analisar | * | * | SONNET |
| github_* | * | * | (workflow) |
| * | * | * | SONNET |

---

## 5. Economia de Custo

```
ANTES (Sonnet fixo): $300/1M tokens

DEPOIS (model routing):
• 60% simples → Haiku  = $15
• 30% médias  → Sonnet = $90  
• 10% complex → Opus   = $150
• NLU (100%)  → Haiku  = $25
                        ─────
                        $280/1M tokens

+ Qualidade MAIOR em tasks complexas
+ Latência MENOR em tasks simples
```

---

## 6. Sprint Atual

**S-PANTHEON-003** - Camunda + NLU + Model Routing
- **Esforço:** 22.5h
- **Tasks:** T01-T08
- **Status:** ATIVA

---

## Referências

| Documento | Path |
|-----------|------|
| Backlog detalhado | docs/04_B/BKL_PANTHEON.md |
| Sprint ativa | docs/04_S/S-PANTHEON-003.md |
| MS_Backlog | docs/04_B/MS_Backlog.md |
| MS_Sprint | docs/04_S/MS_Sprint.md |

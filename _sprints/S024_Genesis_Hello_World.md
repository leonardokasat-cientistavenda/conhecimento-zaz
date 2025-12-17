# S024: Hello World de GENESIS - Discovery de Capacidades

---

```yaml
codigo: S024
titulo: "Hello World de GENESIS - Discovery de Capacidades"
status: concluida
data_inicio: "2025-12-17"
data_fim: "2025-12-17"
responsavel: leonardo
backlog_items:
  - BKL-G01
  - BKL-M01 (parcial)
esforco_estimado_total: 10h
```

---

## Objetivo

GENESIS descobre MS via `db.capacidades`, apresenta menu hierárquico, roteia comandos. **Roteamento transparente:** usuário não sabe se executa LLM ou código.

---

## Resultado

✅ **SPRINT CONCLUÍDA** - 7/7 tasks

---

## Artefatos Produzidos

| Artefato | Descrição |
|----------|-----------|
| `db.capacidades` | Collection MongoDB com 4 MS e 13 comandos |
| `genesis/GENESIS_Bootstrap.md` | Especificação completa do bootstrap v6.0 |
| `docs/schemas/capacidades.md` | Documentação do schema |

---

## Decisões Arquiteturais

### D001: Arquitetura LLM-based

| Aspecto | Valor |
|---------|-------|
| **Contexto** | MS são documentos .md que LLM interpreta, não workers autônomos |
| **Decisão** | Manter arquitetura LLM-based. GENESIS carrega MS como receitas, LLM executa |
| **Alternativas descartadas** | Workers Camunda (futuro), Híbrido LLM+Workers |
| **Motivo** | Prototipação rápida, validação de conceito antes de investir em infra |

### D002: db.capacidades como SSOT

| Aspecto | Valor |
|---------|-------|
| **Contexto** | Evitar entropia de ler múltiplos arquivos a cada bootstrap |
| **Decisão** | Criar collection MongoDB `db.capacidades`. MS registram capacidades uma vez. GENESIS faz O(1) query |
| **Alternativas descartadas** | Índice YAML manual, Ler cada MS.md no bootstrap |
| **Motivo** | Anti-entrópico: uma fonte, uma query |

### D003: Absorção parcial de BKL-M01

| Aspecto | Valor |
|---------|-------|
| **Contexto** | Porta barata (~1.5h extra) evita retrabalho significativo quando PROMETHEUS existir |
| **Decisão** | Incluir campo `maturidade` e roteamento transparente em S024. Stub para código. Métricas e promoção ficam para futuro. |
| **Alternativas descartadas** | Deixar BKL-M01 completamente separado |
| **Motivo** | Usuário não sabe se capacidade roda via LLM ou código. Roteamento transparente. |

---

## Tasks

| # | Título | Status | Artefato |
|---|--------|--------|----------|
| T01 | Schema db.capacidades com maturidade | ✅ | db.capacidades + docs/schemas/capacidades.md |
| T02 | Popular db.capacidades | ✅ | 4 MS, 13 comandos |
| T03 | GENESIS - Menu multinível | ✅ | genesis/GENESIS_Bootstrap.md |
| T04 | GENESIS - Roteamento transparente | ✅ | genesis/GENESIS_Bootstrap.md#rotear |
| T05 | Fluxo gera_backlog → sprint | ✅ | genesis/GENESIS_Bootstrap.md#gera_backlog |
| T06 | MS_Epistemologia - criar_dor | ✅ | db.capacidades/ms_epistemologia |
| T07 | Testes | ✅ | Validado durante execução |

---

## Critérios de Aceite

1. ✅ GENESIS não tem conhecimento hardcoded de MS específicos
2. ✅ `db.capacidades` é SSOT de o que existe
3. ✅ Menu navegável (nível 1 → nível 2)
4. ✅ Comandos roteados dinamicamente para MS correto
5. ✅ Capacidade com `gera_backlog=true` cria item e oferece sprint
6. ✅ Adicionar novo MS = registrar em db.capacidades (não mudar GENESIS)
7. ✅ Campo `maturidade.fase` existe em todas capacidades
8. ✅ Roteamento transparente: draft/spec→LLM, code/prod→stub

---

## db.capacidades - Conteúdo Final

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MENU GENESIS (db.capacidades)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. 📚 Conhecer (ms_epistemologia)           fase: draft                    │
│     ├── genesis dor              → Criar nova Dor                           │
│     ├── genesis conhecer         → Executar M0-M4                           │
│     └── genesis buscar           → Buscar conhecimento                      │
│                                                                             │
│  2. 📋 Executar (ms_sprint)                  fase: draft                    │
│     ├── genesis sprint iniciar   → Iniciar sprint                           │
│     ├── genesis sprint status    → Ver status                               │
│     ├── genesis sprint pausar    → Pausar sprint                            │
│     ├── genesis sprint retomar   → Retomar sprint                           │
│     └── genesis sprint task-concluir → Concluir task                        │
│                                                                             │
│  3. 📦 Organizar (ms_backlog)                fase: draft                    │
│     ├── genesis backlog status   → Ver backlog                              │
│     ├── genesis backlog pendentes → Listar pendentes                        │
│     └── genesis backlog adicionar → Adicionar item                          │
│                                                                             │
│  4. ✅ Aprovar (ms_produto)                  fase: draft                    │
│     ├── genesis produto status   → Ver produtos                             │
│     └── genesis aprovar          → Aprovar release                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Total: 4 MS │ 13 comandos │ Todos em fase=draft (LLM-based)                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| _backlog/BKL-G01_Genesis_Hello_World.md | Item de backlog principal |
| _backlog/BKL-M01_Modelo_Maturidade.md | Parcialmente absorvido |
| genesis/GENESIS_Bootstrap.md | Especificação do bootstrap |
| docs/schemas/capacidades.md | Schema db.capacidades |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-17 | Sprint criada com escopo inicial de 7 tasks (8.5h) |
| 2025-12-17 | Escopo revisado: Decisões D001 e D002 registradas |
| 2025-12-17 | Absorção parcial de BKL-M01: campo maturidade + roteamento transparente. Decisão D003. Esforço: 8.5h → 10h |
| 2025-12-17 | T01-T07 executadas e concluídas |
| 2025-12-17 | **Sprint concluída** - 7/7 tasks ✅ |

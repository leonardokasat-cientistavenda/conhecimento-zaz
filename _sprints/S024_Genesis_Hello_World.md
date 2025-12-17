# S024: Hello World de GENESIS - Discovery de Capacidades

---

```yaml
codigo: S024
titulo: "Hello World de GENESIS - Discovery de Capacidades"
status: ativa
data_inicio: "2025-12-17"
responsavel: leonardo
backlog_items:
  - BKL-G01
  - BKL-M01 (parcial)
esforco_estimado_total: 10h
task_atual: T01
```

---

## Objetivo

GENESIS descobre MS via `db.capacidades`, apresenta menu hierárquico, roteia comandos. **Roteamento transparente:** usuário não sabe se executa LLM ou código.

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

## Arquitetura: Roteamento Transparente

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ROTEAMENTO TRANSPARENTE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USUÁRIO                                                                    │
│     │                                                                       │
│     │ "genesis dor"                                                         │
│     ▼                                                                       │
│  GENESIS.rotear()                                                           │
│     │                                                                       │
│     │ cap = db.capacidades.findOne({comando})                               │
│     │                                                                       │
│     ├─────────────────────────────────────────────────────────────┐         │
│     │                                                             │         │
│     ▼                                                             ▼         │
│  if fase in ["draft", "spec"]:              if fase in ["code", "prod"]:    │
│     │                                                             │         │
│     │ executar_llm(cap.path)                    executar_codigo(ref)        │
│     │   ↓                                            ↓                      │
│     │ LLM lê .md e executa                   STUB (NotImplemented)          │
│     │                                        → Futuro: Camunda/Python       │
│     │                                                             │         │
│     └─────────────────────┬───────────────────────────────────────┘         │
│                           │                                                 │
│                           ▼                                                 │
│                    MESMO OUTPUT                                             │
│                    (usuário não sabe)                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Fluxo: Menu Multinível

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUXO COMPLETO                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USUÁRIO                                                                    │
│     │                                                                       │
│     │ "oi"                                                                  │
│     ▼                                                                       │
│  GENESIS ──────► db.capacidades.find({tipo: "meta_sistema"})                │
│     │                                                                       │
│     │ Menu Nível 1:                                                         │
│     │ ┌─────────────────────────────────────────┐                           │
│     │ │ 1. 📚 Conhecer                          │                           │
│     │ │ 2. 📋 Gerenciar                         │                           │
│     │ │ 3. ✅ Aprovar                           │                           │
│     │ └─────────────────────────────────────────┘                           │
│     │                                                                       │
│     │ Usuário: "1"                                                          │
│     │                                                                       │
│     │ Menu Nível 2:                                                         │
│     │ ┌─────────────────────────────────────────┐                           │
│     │ │ 1.1 Criar nova Dor                      │                           │
│     │ │ 1.2 Executar M0-M4                      │                           │
│     │ │ 1.3 Buscar conhecimento                 │                           │
│     │ └─────────────────────────────────────────┘                           │
│     │                                                                       │
│     │ Usuário: "1.1"                                                        │
│     ▼                                                                       │
│  GENESIS.rotear("genesis dor")                                              │
│     │                                                                       │
│     │ if maturidade.fase == "draft":                                        │
│     │   executar_llm(MS_Epistemologia)                                      │
│     │                                                                       │
│     ▼                                                                       │
│  db.backlog.insert(BKL-XXX)                                                 │
│     │                                                                       │
│     │ "Iniciar sprint?"                                                     │
│     ▼                                                                       │
│  MS_Sprint.iniciar()                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Schema: db.capacidades

```yaml
Capacidade:
  _id: ObjectId
  id: String                      # "ms_epistemologia"
  tipo: "meta_sistema" | "modulo" | "ferramenta"
  
  # UX
  nome: String                    # "Epistemologia"
  icone: String                   # "📚"
  descricao_curta: String
  descricao_longa: String
  
  # Localização
  path: String                    # "docs/00_E/00_E_Epistemologia.md"
  versao: String
  
  # Hierarquia
  pai_id: String?                 # null = raiz
  ordem: Number
  
  # Maturidade (D003 - absorvido de BKL-M01)
  maturidade:
    fase: "draft" | "spec" | "code" | "prod"
    prometheus_ref: String?       # ID do código gerado (futuro)
  
  # Capacidades (comandos)
  capacidades: [{
    id: String                    # "criar_dor"
    nome: String
    descricao: String
    comando: String               # "genesis dor"
    gera_backlog: Boolean
    tipo_item_backlog: String?
    consome_backlog: String?
    requer_sprint: Boolean
    autonomo: Boolean
  }]
  
  created_at: DateTime
  updated_at: DateTime
```

---

## Tasks

| # | Título | Descrição | Esforço | Status |
|---|--------|-----------|---------|--------|
| T01 | Schema db.capacidades com maturidade | Criar collection com schema completo incluindo maturidade | 1.5h | 🔄 |
| T02 | Popular db.capacidades | Registrar MS existentes, todas em fase=draft | 1.5h | ⬜ |
| T03 | GENESIS - Menu multinível | Bootstrap consulta db.capacidades, menu navegável | 2h | ⬜ |
| T04 | GENESIS - Roteamento transparente | if/else por fase: draft→LLM, code→stub | 2h | ⬜ |
| T05 | Fluxo gera_backlog → sprint | Após gera_backlog=true, perguntar se inicia sprint | 1h | ⬜ |
| T06 | MS_Epistemologia - criar_dor | Adicionar capacidade criar_dor ao registro | 0.5h | ⬜ |
| T07 | Testes | Validar fluxo completo + stub retorna NotImplemented | 1.5h | ⬜ |

**Total estimado: 10h**

---

## GAPs Identificados

| GAP | Descrição | Severidade | Solução |
|-----|-----------|------------|---------|
| G1 | `db.capacidades` não existe | 🔴 | T01 |
| G2 | MS não têm capacidades registradas | 🔴 | T02 |
| G3 | GENESIS não tem menu multinível | 🟡 | T03 |
| G4 | Roteamento por fase não existe | 🟡 | T04 |
| G5 | Fluxo gera_backlog não existe | 🟡 | T05 |
| G6 | MS_Epistemologia sem criar_dor | 🟢 | T06 |

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

## Referências

| Documento | Relação |
|-----------|---------|
| _backlog/BKL-G01_Genesis_Hello_World.md | Item de backlog principal |
| _backlog/BKL-M01_Modelo_Maturidade.md | Parcialmente absorvido |
| _backlog/BKL-C01_Catalogo_v2.md | Relacionado |
| genesis/GENESIS.md | Documento a refatorar |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-17 | Sprint criada com escopo inicial de 7 tasks (8.5h) |
| 2025-12-17 | Escopo revisado: Decisões D001 e D002 registradas |
| 2025-12-17 | Absorção parcial de BKL-M01: campo maturidade + roteamento transparente. Decisão D003. Esforço: 8.5h → 10h |
| 2025-12-17 | T01 iniciada: Schema db.capacidades com maturidade |

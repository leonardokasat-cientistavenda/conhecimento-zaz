# BKL-M01: Modelo de Maturidade de Capacidades

---

```yaml
id: BKL-M01
titulo: "Modelo de Maturidade - LLM-based → Código → Produção"
tipo: arquitetura
prioridade: "🟡"
status: Parcialmente absorvido por S024
data_criacao: "2025-12-17"
saga_id: null
depende_de:
  - BKL-G01  # Hello World de GENESIS (S024)
produtor: "Leonardo + GENESIS"
tags:
  - arquitetura
  - maturidade
  - prometheus
  - llm-based
absorvido_por:
  sprint: S024
  escopo: "Porta para roteamento transparente (campo maturidade + stub)"
  data: "2025-12-17"
```

---

## 1. Problema

Hoje não há distinção formal entre capacidades em prototipação (LLM-based) e capacidades estáveis (código). Isso gera:

| Sintoma | Causa |
|---------|-------|
| Consumo alto de tokens em capacidades estáveis | Tudo roda via LLM |
| Incerteza sobre "quando promover" | Sem critérios de maturidade |
| Risco de promover cedo demais | Código de spec instável |
| Dificuldade de rollback | Sem caminho de volta |

---

## 2. Insight

> "LLM-based é EXCELENTE para prototipar. Podemos iterar rapidamente, versionar até estabilizar. Aí sim, partimos para PROMETHEUS, que transforma fluxos LLM-based para fluxos persistidos por código."

**Trade-off reconhecido:**

| Aspecto | LLM-based | Código |
|---------|-----------|--------|
| Velocidade de mudança | ✅ Alta | ❌ Baixa |
| Custo por execução | ❌ Alto (tokens) | ✅ Baixo |
| Entropia | ❌ Alta | ✅ Baixa |
| Infra necessária | ✅ Nenhuma | ❌ Camunda, deploy |

---

## 3. Decisão: Absorção Parcial por S024

**Data:** 2025-12-17

**Contexto:** Durante planejamento de S024, identificou-se que adicionar a "porta" para roteamento transparente agora evita retrabalho futuro.

**O que foi absorvido por S024:**

| Elemento | Status |
|----------|--------|
| Campo `maturidade` em db.capacidades | ✅ Incluído em S024/T01 |
| Roteamento por fase (if draft→LLM, if code→worker) | ✅ Incluído em S024/T04 |
| Stub para `executar_codigo()` | ✅ Incluído em S024/T04 |

**O que permanece em BKL-M01 (futuro):**

| Elemento | Status |
|----------|--------|
| Coleta de métricas (execuções, erros) | ⬜ Pendente |
| Comando `genesis promover` | ⬜ Pendente |
| Critérios automáticos de promoção | ⬜ Pendente |
| PROMETHEUS (compilador) | ⬜ Pendente |
| Exibir fase no menu | ⬜ Pendente |

---

## 4. Arquitetura: Roteamento Transparente

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ROTEAMENTO TRANSPARENTE (S024)                           │
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

**Benefício:** Quando PROMETHEUS existir, basta implementar `executar_codigo()` e promover capacidades. Nenhuma refatoração em GENESIS.

---

## 5. Proposta: Ciclo de Maturidade

```
DRAFT (LLM-based)
    │
    │ Critério: 10+ execuções, <5% erro, humano aprova
    ▼
SPEC (Especificação congelada)
    │
    │ Critério: Spec aprovada, testes passando, demanda justifica
    ▼
CODE (PROMETHEUS gera)
    │
    │ Critério: Código em produção, monitoramento ativo
    ▼
PROD (Publicado)
```

### 5.1 DRAFT

- Capacidade definida em Markdown
- LLM interpreta e executa
- Alta entropia, alta velocidade
- Métricas coletadas: execuções, erros, mudanças de spec

### 5.2 SPEC

- Fluxo documentado formalmente
- Inputs/outputs tipados
- Testes definidos
- LLM ainda executa, mas spec "congelada"

### 5.3 CODE

- PROMETHEUS lê spec e gera código
- Worker Camunda ou função Python
- LLM não necessário para execução
- Baixa entropia, baixo custo

### 5.4 PROD

- Sistema produtivo
- Versionado, monitorado
- Mudanças reiniciam ciclo

---

## 6. Schema (implementado em S024)

```yaml
# db.capacidades
Capacidade:
  ...
  maturidade:
    fase: "draft" | "spec" | "code" | "prod"
    prometheus_ref: String?          # ID do código gerado (futuro)
```

**Schema completo (futuro BKL-M01):**

```yaml
maturidade:
  fase: "draft" | "spec" | "code" | "prod"
  execucoes: Number
  erros: Number
  taxa_erro: Number
  ultima_mudanca_spec: DateTime
  spec_congelada_em: DateTime?
  promovido_code_em: DateTime?
  promovido_prod_em: DateTime?
  prometheus_ref: String?
  rollback_para: "draft" | "spec"?
```

---

## 7. Questões em Aberto (para futuro)

| Questão | Opções |
|---------|--------|
| Critério numérico de estabilização | 10 execuções? 20? Configurável? |
| Granularidade de promoção | MS inteiro ou capacidade individual? |
| Coexistência | MS pode ter capacidades em fases diferentes? |
| Rollback | Automático se erro > X%? Manual? |
| Formato de spec | BPMN? State machine? YAML? |
| PROMETHEUS existe? | Não. Precisa ser criado. |

---

## 8. Critérios de Aceite (restantes)

1. ~~Campo `maturidade` adicionado a db.capacidades~~ → S024
2. ⬜ Critérios de promoção definidos e documentados
3. ⬜ GENESIS exibe fase de maturidade no menu
4. ⬜ Comando `genesis promover <capacidade>` implementado
5. ⬜ Métricas de execução sendo coletadas
6. ⬜ PROMETHEUS funcional (BKL separado)

---

## 9. Tasks Restantes (após S024)

| # | Task | Esforço |
|---|------|---------|
| T01 | Definir critérios numéricos de promoção | 1h |
| T02 | Implementar coleta de métricas (execuções, erros) | 2h |
| T03 | Comando `genesis promover` | 1.5h |
| T04 | Documentar formato de spec para CODE | 2h |
| T05 | Avaliar/criar PROMETHEUS | TBD |

**Estimativa restante: ~6.5h + PROMETHEUS**

---

## 10. Dependências Atualizadas

```
S024 (Hello World GENESIS)
    │
    │ ✅ db.capacidades com campo maturidade
    │ ✅ Roteamento transparente com stub
    ▼
BKL-M01 (restante)
    │
    │ Métricas, promoção, critérios
    ▼
PROMETHEUS (BKL separado)
    │
    │ Compila spec → código
    ▼
MS em produção (código)
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| _backlog/BKL-G01_Genesis_Hello_World.md | Pré-requisito |
| _backlog/BKL-P03_PROMETHEUS_v3.md | Sistema de geração de código |
| _sprints/S024_Genesis_Hello_World.md | Sprint que absorveu parte deste BKL |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-17 | Criado durante discussão de arquitetura S024. Insight de Leonardo sobre ciclo LLM → código. |
| 2025-12-17 | **Absorção parcial por S024**: Campo maturidade, roteamento transparente e stub incluídos na sprint. Restante permanece como backlog futuro. |

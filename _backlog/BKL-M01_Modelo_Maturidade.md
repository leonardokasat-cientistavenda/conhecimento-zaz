# BKL-M01: Modelo de Maturidade de Capacidades

---

```yaml
id: BKL-M01
titulo: "Modelo de Maturidade - LLM-based → Código → Produção"
tipo: arquitetura
prioridade: "🟡"
status: Pendente
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

## 3. Proposta: Ciclo de Maturidade

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

### 3.1 DRAFT

- Capacidade definida em Markdown
- LLM interpreta e executa
- Alta entropia, alta velocidade
- Métricas coletadas: execuções, erros, mudanças de spec

### 3.2 SPEC

- Fluxo documentado formalmente
- Inputs/outputs tipados
- Testes definidos
- LLM ainda executa, mas spec "congelada"

### 3.3 CODE

- PROMETHEUS lê spec e gera código
- Worker Camunda ou função Python
- LLM não necessário para execução
- Baixa entropia, baixo custo

### 3.4 PROD

- Sistema produtivo
- Versionado, monitorado
- Mudanças reiniciam ciclo

---

## 4. Schema Proposto

```yaml
# Adição em db.capacidades
Capacidade:
  ...
  maturidade:
    fase: "draft" | "spec" | "code" | "prod"
    execucoes: Number
    erros: Number
    taxa_erro: Number
    ultima_mudanca_spec: DateTime
    spec_congelada_em: DateTime?
    promovido_code_em: DateTime?
    promovido_prod_em: DateTime?
    prometheus_ref: String?          # ID do código gerado
    rollback_para: "draft" | "spec"? # Se precisar voltar
```

---

## 5. Questões em Aberto

| Questão | Opções |
|---------|--------|
| Critério numérico de estabilização | 10 execuções? 20? Configurável? |
| Granularidade de promoção | MS inteiro ou capacidade individual? |
| Coexistência | MS pode ter capacidades em fases diferentes? |
| Rollback | Automático se erro > X%? Manual? |
| Formato de spec | BPMN? State machine? YAML? |
| PROMETHEUS existe? | Não. Precisa ser criado ou é conceitual? |

---

## 6. Relação com PROMETHEUS

PROMETHEUS foi mencionado em `_backlog/BKL-P03_PROMETHEUS_v3.md` como sistema de geração de código. Este BKL propõe que PROMETHEUS seja o **compilador** de specs para código:

```
Capacidade.spec (Markdown/YAML)
        │
        │ PROMETHEUS.compilar()
        ▼
Worker Camunda / Função Python
```

---

## 7. Critérios de Aceite (para este BKL)

1. ✅ Campo `maturidade` adicionado a db.capacidades
2. ✅ Critérios de promoção definidos e documentados
3. ✅ GENESIS exibe fase de maturidade no menu
4. ✅ Comando `genesis promover <capacidade>` implementado
5. ✅ Métricas de execução sendo coletadas
6. ⬜ PROMETHEUS funcional (pode ser BKL separado)

---

## 8. Tasks Previstas

| # | Task | Esforço |
|---|------|---------|
| T01 | Definir critérios numéricos de promoção | 1h |
| T02 | Adicionar campo maturidade em db.capacidades | 0.5h |
| T03 | Implementar coleta de métricas (execuções, erros) | 2h |
| T04 | Comando `genesis promover` | 1.5h |
| T05 | Documentar formato de spec para CODE | 2h |
| T06 | Avaliar se PROMETHEUS é BKL separado | 0.5h |

**Estimativa total: ~7.5h**

---

## 9. Dependências

```
S024 (Hello World GENESIS)
    │
    │ db.capacidades existe
    │ Menu de capacidades funciona
    ▼
BKL-M01 (este)
    │
    │ Maturidade implementada
    │ Métricas coletadas
    ▼
PROMETHEUS (futuro)
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
| _sprints/S024_Genesis_Hello_World.md | Sprint que habilita este BKL |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-17 | Criado durante discussão de arquitetura S024. Insight de Leonardo sobre ciclo LLM → código. |

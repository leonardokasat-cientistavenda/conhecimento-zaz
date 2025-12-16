---
titulo: "Spec Recursos - Estimativa de Runtime, Teste e Esforço"
data_criacao: 2025-12-16
status: Pendente
tipo: Arquitetura
prioridade: 🟡
sistemas_afetados: [PROMETHEUS, MS_Produto]
origem: "Análise S019/T02 - Schema TDD"
sequencia: "Durante ou após PROMETHEUS v3.0"
---

# Spec Recursos - Estimativa de Runtime, Teste e Esforço

## Contexto

### Origem: Análise Sprint S019/T02 (2025-12-16)

Durante definição de Schema TDD, identificou-se que:

- **Schema TDD é comportamental** (classes_equivalencia, criterios_aceite)
- **Recursos são responsabilidade de outros sistemas**

Falta contrato para especificar recursos necessários para desenvolvimento e execução.

## Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LACUNA: SPEC RECURSOS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Epistemologia produz Spec_TDD, mas não responde:                           │
│                                                                             │
│  1. RECURSOS DE RUNTIME                                                     │
│     • Quanto CPU/RAM/GPU?                                                   │
│     • Quais APIs consumidas? Rate limits? Custos?                           │
│     • Quantos tokens LLM por requisição?                                    │
│                                                                             │
│  2. RECURSOS DE TESTE                                                       │
│     • Cartesiano pode explodir (10 × 5 = 9.7M combinações)                  │
│     • Quanto tempo para executar testes?                                    │
│     • Qual infra de teste necessária?                                       │
│                                                                             │
│  3. CARGA ESPERADA                                                          │
│     • Quantas transações por segundo?                                       │
│     • Quantos usuários simultâneos?                                         │
│     • Qual o pico esperado?                                                 │
│                                                                             │
│  4. ESTIMATIVA DE ESFORÇO                                                   │
│     • Quantas horas de desenvolvimento?                                     │
│     • Quais tasks serão geradas?                                            │
│     • Qual perfil de recurso humano?                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Fluxo Proposto: Spec Composta

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SPEC COMPOSTA (FLUXO)                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FASE 1: EPISTEMOLOGIA                                                      │
│  ─────────────────────────                                                  │
│  Input: Feature (de MS_Produto)                                             │
│  Output: Spec_TDD (comportamental)                                          │
│                                                                             │
│  spec_tdd:                                                                  │
│    classes_equivalencia: [...]                                              │
│    criterios_aceite: [...]                                                  │
│    cobertura: cartesiano | pairwise                                         │
│    combinacoes_estimadas: N  ← hint para próxima fase                       │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  FASE 2: PROMETHEUS (pré-execução)                                          │
│  ──────────────────────────────────                                         │
│  Input: Spec_TDD                                                            │
│  Output: Spec_Recursos                                                      │
│                                                                             │
│  spec_recursos:                                                             │
│    runtime:                                                                 │
│      cpu: "2 cores"                                                         │
│      ram: "4GB"                                                             │
│      apis: [{nome, rate_limit, custo_estimado}]                             │
│      tokens_llm: estimativa                                                 │
│    teste:                                                                   │
│      tempo_execucao: "~30min para 500 casos"                                │
│      infra_necessaria: "CI runner standard"                                 │
│    carga:                                                                   │
│      tps_esperado: 100                                                      │
│      recomendacao: "pairwise suficiente para MVP"                           │
│    tasks:                                                                   │
│      - {tipo: worker_E, horas: 4}                                           │
│      - {tipo: worker_P, horas: 2}                                           │
│    total_horas_tecnicas: 8                                                  │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  FASE 3: MS_PRODUTO / PO (validação)                                        │
│  ─────────────────────────────────────                                      │
│  Input: Spec_Recursos                                                       │
│  Output: Spec_Aprovada (ou ajustes)                                         │
│                                                                             │
│  decisao:                                                                   │
│    aprovado: true | false                                                   │
│    ajustes: "reduzir cobertura para pairwise"                               │
│    prioridade: 🔴                                                           │
│    sprint_alocada: S020                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Impacto por Sistema

### PROMETHEUS v3.0

- Definir Schema Recursos como output de pré-execução
- Workers estimam recursos por vertente (M3.E, M3.P, etc.)
- Calcular horas técnicas baseado em complexidade da spec

### MS_Produto

- Receber Spec_Recursos para validação de esforço/prioridade
- PO aprova ou solicita ajustes (ex: reduzir cobertura de cartesiano para pairwise)
- Alocar em sprint com base na estimativa

## Critérios de Aceite

- [ ] Schema Recursos definido (runtime, teste, carga, estimativa)
- [ ] PROMETHEUS v3.0 enriquece spec com recursos
- [ ] MS_Produto valida estimativa antes de aprovar desenvolvimento
- [ ] Fluxo Spec Composta documentado em arquitetura

## Referências

- docs/00_E/00_E_Epistemologia.md - Schema TDD (comportamental)
- _backlog/BKL-P03_PROMETHEUS_v3.md - Workers por vertente
- docs/04_P/MS_Produto_Arquitetura.md - Fase 5: Aprovação PO

## Estimativa

~3-4h (design) + implementação em PROMETHEUS e MS_Produto

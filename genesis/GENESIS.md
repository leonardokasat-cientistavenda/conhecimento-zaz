# GENESIS v4.0

---

```yaml
nome: GENESIS
versao: "4.0"
tipo: Framework
status: Publicado
nivel: C1
camadas: [L0, L1, L2, L3, L4]
```

---

## 1. Propósito Autopoiético

### 1.1 Visão

> **Evoluir sistema para resolver dores de usuários em série, aumentando autonomia até ser quase auto-construtivo.**

GENESIS é o **agente autopoiético** que:
- Recebe dores de usuários
- Consulta catálogos para reutilizar soluções
- Orquestra ciclos de especificação e execução
- Avalia efetividade das entregas
- Aprende padrões de sucesso/falha
- Evolui, aumentando capacidade de resolver problemas novos

### 1.2 Inteligência Híbrida

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   HUMANO    │    │     LLM     │    │   SISTEMA   │
│  Intenção   │ +  │  Fluência   │ +  │  Estrutura  │ = AMPLIFICAÇÃO
│  Supervisão │    │  Execução   │    │  Persistên- │   COGNITIVA
│  Validação  │    │  Geração    │    │  cia        │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 1.3 Papel de Cada Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SEPARAÇÃO DE RESPONSABILIDADES                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Agente Autopoiético)                                              │
│  ═════════════════════════════                                              │
│  PROPÓSITO: Evoluir sistema para resolver dores em série                    │
│                                                                             │
│  Funções:                                                                   │
│  ├── ORQUESTRAR: dispara ciclos, roteia entre sistemas                      │
│  ├── DECIDIR: prioriza features, aloca recursos                             │
│  ├── AVALIAR EFETIVIDADE: produto entregou JTD? (via adoção)                │
│  ├── APRENDER: padrões de sucesso/falha                                     │
│  └── REUTILIZAR: sugere features similares para novos problemas             │
│                                                                             │
│  NÃO TEM:                                                                   │
│  └── Catálogo próprio. Consulta catálogos dos sistemas.                     │
│                                                                             │
│  EXIGE DOS SISTEMAS:                                                        │
│  └── Catalogar de forma padronizada para recuperação e reuso                │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_PRODUTO (Framework de Objetivo)                                         │
│  ══════════════════════════════════                                         │
│  PROPÓSITO: Estruturar o ciclo Dor → Feature → Critérios → Efetividade      │
│                                                                             │
│  Define:                                                                    │
│  ├── COMO capturar dores                                                    │
│  ├── COMO formular hipóteses (Features)                                     │
│  ├── COMO medir sucesso (critérios)                                         │
│  └── COMO avaliar efetividade                                               │
│                                                                             │
│  Cataloga: Produtos, Features, Critérios de Sucesso, Avaliações             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EPISTEMOLOGIA (Método de Especificação)                                    │
│  ═══════════════════════════════════════                                    │
│  PROPÓSITO: Especificar soluções via M0-M4                                  │
│                                                                             │
│  Define:                                                                    │
│  ├── COMO especificar (M0-M4, M3.*, TDD)                                    │
│  └── COMO estruturar conhecimento anti-entrópico                            │
│                                                                             │
│  Cataloga: Specs, Classes de Equivalência, Critérios de Aceite              │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROMETHEUS (Fábrica de Execução)                                           │
│  ════════════════════════════════                                           │
│  PROPÓSITO: Transformar specs em artefatos funcionais                       │
│                                                                             │
│  Define:                                                                    │
│  ├── COMO executar (Workers, TDD, CI/CD)                                    │
│  └── COMO garantir qualidade técnica                                        │
│                                                                             │
│  Cataloga: Artefatos, Releases, Testes, Resultados                          │
│  GARANTE: Código entregue funcionando (validação técnica)                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Fluxo Produto-First

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUXO PRODUTO-FIRST                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. USUÁRIO tem dor                                                         │
│         │                                                                   │
│         ▼                                                                   │
│  2. GENESIS consulta catálogos                                              │
│     "Já resolvi dor similar?"                                               │
│         │                                                                   │
│         ├── SIM → sugere reuso de Feature/Spec/Artefato                     │
│         └── NÃO → novo ciclo                                                │
│                 │                                                           │
│                 ▼                                                           │
│  3. MS_PRODUTO estrutura                                                    │
│     Produto (se novo) → Feature → Critérios de Sucesso                      │
│         │                                                                   │
│         ▼                                                                   │
│  4. GENESIS verifica capabilities                                           │
│     "Consigo executar essa Feature?"                                        │
│         │                                                                   │
│         ├── SIM → roteia para Epistemologia                                 │
│         └── NÃO → gera backlog para desenvolver capability                  │
│                 │                                                           │
│                 ▼                                                           │
│  5. EPISTEMOLOGIA especifica                                                │
│     M0-M4, M3.* com TDD                                                     │
│         │                                                                   │
│         ▼                                                                   │
│  6. PROMETHEUS executa                                                      │
│     Specs → Workers → TDD → Artefatos                                       │
│     Valida tecnicamente → Publica Release                                   │
│         │                                                                   │
│         ▼                                                                   │
│  7. MS_PRODUTO implanta                                                     │
│     Release → Usuários (setup, treinamento)                                 │
│         │                                                                   │
│         ▼                                                                   │
│  8. GENESIS avalia efetividade                                              │
│     (ver seção 1.5)                                                         │
│         │                                                                   │
│         ▼                                                                   │
│  9. LOOP CONTÍNUO                                                           │
│     Nova dor → GENESIS já sabe mais → resolve mais rápido                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.5 Avaliação de Efetividade

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS: AVALIAÇÃO DE EFETIVIDADE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ENTRADA: Release em produção + tempo decorrido                             │
│                                                                             │
│  PASSO 1: Avaliar ADOÇÃO do Produto                                         │
│  ──────────────────────────────────                                         │
│  Produto.adocao >= threshold?                                               │
│                                                                             │
│      │                                                                      │
│      ├── SIM → Produto entregou JTD ✓                                       │
│      │         GENESIS aprende: padrão de sucesso                           │
│      │                                                                      │
│      └── NÃO → Analisar Features                                            │
│                    │                                                        │
│                    ▼                                                        │
│  PASSO 2: Avaliar FEATURES                                                  │
│  ─────────────────────────                                                  │
│  Para cada Feature:                                                         │
│      Feature.criterios_sucesso atingidos?                                   │
│                                                                             │
│      │                                                                      │
│      ├── SIM (threshold atingido, mas adoção baixa)                         │
│      │   └── CONCLUSÃO: Threshold estava baixo demais                       │
│      │       AÇÃO: Revisar/aumentar thresholds                              │
│      │       GENESIS aprende: critérios inadequados                         │
│      │                                                                      │
│      └── NÃO (threshold não atingido)                                       │
│          └── CONCLUSÃO: Solução não resolveu a dor                          │
│              AÇÃO: Iterar com Epistemologia                                 │
│              GENESIS aprende: o que não fazer                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.6 Padrão de Catalogação

Cada sistema é responsável por catalogar seus artefatos de forma que GENESIS consiga:
1. **RECUPERAR**: buscar por similaridade, contexto, tags
2. **REUTILIZAR**: aplicar soluções anteriores em problemas novos

| Sistema | O que Cataloga | GENESIS usa para |
|---------|----------------|------------------|
| **MS_Produto** | Features + Critérios, Avaliações + Aprendizados | Encontrar features similares, reutilizar hipóteses que funcionaram |
| **Epistemologia** | Specs (M3.*), Problemas (M0), Classes de equivalência | Encontrar specs similares, reutilizar soluções técnicas |
| **PROMETHEUS** | Artefatos (.py, .bpmn), Releases, Resultados de testes | Encontrar código reutilizável, compor releases, prever riscos |

---

## 2. Tese

> **GENESIS é o Agente Autopoiético que evolui sistema para resolver dores de usuários em série, aumentando autonomia até ser quase auto-construtivo.**
>
> **Contexto:**
> - Humanos têm energia cognitiva limitada
> - LLMs têm fluência mas não estrutura
> - Juntos, sem método, produzem entropia
>
> **Solução:**
> - GENESIS orquestra e aprende (AGENTE)
> - MS_Produto define objetivos (O QUÊ)
> - Epistemologia especifica (COMO)
> - PROMETHEUS executa (FAZ)
>
> **Resultado:** Sistema que reduz dispêndio de energia humana, acumula conhecimento, e evolui sua capacidade de resolver problemas.

---

## 3. Fronteiras

| GENESIS É | GENESIS NÃO É |
|-----------|---------------|
| Agente Autopoiético | Executor técnico (isso é PROMETHEUS) |
| Orquestrador de ciclos | Framework de objetivo (isso é MS_Produto) |
| Avaliador de efetividade | Método de especificação (isso é Epistemologia) |
| Aprendiz de padrões | Catálogo próprio (consulta catálogos dos sistemas) |
| Reutilizador de soluções | Conteúdo de negócio |

---

## 4. Autopoiese e Camadas L0-L4

### 4.1 O que é Autopoiese

Autopoiese (Maturana & Varela, 1980) é a propriedade de sistemas que se **autoproduzem e evoluem**. No contexto GENESIS:

- GENESIS sem os outros sistemas: decide mas não executa
- Sistemas sem GENESIS: executam mas não sabem o quê priorizar
- **Juntos** = sistema autopoiético

### 4.2 As 5 Camadas

| Camada | Nome | Capacidade | Pergunta |
|--------|------|------------|----------|
| **L0** | Existência | Ter identidade, versão | "Eu existo?" |
| **L1** | Percepção | Observar-se (métricas, estado) | "O que está acontecendo?" |
| **L2** | Ação | Executar mudanças | "Como faço algo?" |
| **L3** | Validação | Testar, verificar | "Está certo?" |
| **L4** | Decisão | Decidir direção | "O que fazer agora?" |

### 4.3 Como os Sistemas Manifestam L0-L4

| Camada | GENESIS | MS_Produto | Epistemologia | PROMETHEUS |
|--------|---------|------------|---------------|------------|
| L0 | GENESIS.md | Produtos, Features | Specs | Artefatos |
| L1 | Avalia efetividade | Health Score, Adoção | Cobertura specs | Métricas CI/CD |
| L2 | Orquestra ciclos | Implanta | Especifica | Executa código |
| L3 | Valida JTD | Valida critérios | Valida specs | Valida testes |
| L4 | Decide próximo | Prioriza features | Decide escopo | Decide pipeline |

---

## 5. Hierarquia de Produto

```
PORTFÓLIO
    │
    └── PRODUTO (dor macro, MS como unidade de valor)
            │   ex: "MS_CRM - reduzir fricção em vendas porta a porta"
            │
            └── FEATURE (hipótese testável + critérios de sucesso)
                    │   ex: "Reporte por voz - SE voz ENTÃO <30s"
                    │
                    └── ÉPICO (container de desenvolvimento)
                            │   ex: "Integração speech-to-text"
                            │
                            └── BACKLOG ITEM (unidade de trabalho)
                                    ex: "Implementar endpoint /transcribe"
```

| Nível | Propósito | Critérios de Sucesso |
|-------|-----------|----------------------|
| Produto | Resolver dor macro | Sucesso = usuário adota |
| **Feature** | **Hipótese de valor** | **Sucesso = métrica atingida** |
| Épico | Agrupar desenvolvimento | Sucesso = specs implementadas |
| BacklogItem | Unidade de trabalho | Sucesso = tarefa feita |

---

## 6. Índice de Sistemas

### Nível C1 (GENESIS)

| Arquivo | Descrição |
|---------|-----------|
| genesis/GENESIS.md | Este documento (propósito) |
| genesis/GENESIS_Arquitetura.md | Detalhes técnicos |
| genesis/PROMETHEUS.md | Fábrica de execução |

### Nível C2 (Infraestrutura)

| Arquivo | Descrição |
|---------|-----------|
| docs/00_I/00_I_1_1_GitHub.md | Persistência de definições |
| docs/00_I/00_I_1_3_MongoDB.md | Persistência transacional |
| docs/00_I/00_I_2_1_Backlog.md | Gestão de backlog |
| docs/00_I/00_I_2_2_Sprint.md | Gestão de sprints |

### Nível C3 (Frameworks)

| Arquivo | Descrição |
|---------|-----------|
| docs/00_E/00_E_Epistemologia.md | Método M0-M4 |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Busca semântica |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Decisão H→E→I→D |

### Nível C4 (Domínios)

| Arquivo | Descrição |
|---------|-----------|
| docs/04_P/MS_Produto.md | Ciclo de vida de produtos |

---

## 7. Regra de Carregamento

```
SEMPRE: GENESIS.md (ponto de entrada)
════════════════════════════════════
• Propósito (entender o sistema)
• Papel de cada sistema (saber quem faz o quê)
• Fluxo produto-first (saber a sequência)
• Índice (saber onde está cada coisa)

ENTÃO: GENESIS_Arquitetura.md (sob demanda)
═════════════════════════════════════════
Carregar quando precisar de:
• Detalhes técnicos de integração
• Schemas de catalogação
• Contratos entre sistemas
• Desenvolver/modificar sistemas
```

---

## 8. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS_Arquitetura.md | Detalhes técnicos |
| genesis/PROMETHEUS.md | Fábrica de execução |
| docs/00_E/00_E_Epistemologia.md | Método de especificação |
| docs/04_P/MS_Produto.md | Framework de objetivo |

### Externas

| Fonte | Conceito |
|-------|----------|
| Hutchins (1995) | Cognição Distribuída |
| Shannon (1948) | Entropia |
| Maturana & Varela (1980) | Autopoiesis |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1-3.0 | 2025-12-02 a 2025-12-15 | Versões anteriores |
| 4.0 | 2025-12-16 | **Refatoração completa**: Propósito Autopoiético, Fluxo Produto-First, Avaliação de Efetividade, Padrão de Catalogação. Separação clara GENESIS (propósito) vs GENESIS_Arquitetura (técnico). |

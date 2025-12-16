# GENESIS v5.0

---

```yaml
nome: GENESIS
versao: "5.0"
tipo: Framework
status: Publicado
nivel: C1
camadas: [L0, L1, L2, L3, L4]
data_publicacao: "2025-12-16"
```

---

## 1. Propósito Autopoiético

### 1.1 Visão

> **Evoluir sistema para resolver dores de usuários em série, aumentando autonomia até ser quase auto-construtivo.**

GENESIS é o **agente autopoiético** que:
- Recebe dores de usuários (ponto de entrada)
- Produz primeiro BacklogItem para iniciar saga
- Avalia efetividade das entregas (ponto de validação)
- Aprende padrões de sucesso/falha
- Evolui, aumentando capacidade de resolver problemas novos

### 1.2 Mudança Arquitetural v5.0

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ANTES (v4.0) vs DEPOIS (v5.0)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ANTES (GENESIS como Orquestrador):                                         │
│  ──────────────────────────────────                                         │
│                                                                             │
│              ┌─────────────┐                                                │
│              │   GENESIS   │ ◄── Roteia entre sistemas                      │
│              │ Orquestrador│                                                │
│              └──────┬──────┘                                                │
│                     │                                                       │
│         ┌──────────┼──────────┐                                             │
│         ▼          ▼          ▼                                             │
│    MS_Produto  Epistemo   PROMETHEUS                                        │
│                                                                             │
│  DEPOIS (GENESIS como Entrada + Validação):                                 │
│  ──────────────────────────────────────────                                 │
│                                                                             │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐               │
│  │ GENESIS │     │MS_Prod  │     │Epistemo │     │PROMETHEUS               │
│  │ Entrada │     │         │     │         │     │         │               │
│  │+Avalia  │     │         │     │         │     │         │               │
│  └────┬────┘     └────┬────┘     └────┬────┘     └────┬────┘               │
│       │               │               │               │                     │
│       │ produz        │ produz        │ produz        │ produz              │
│       │ consome       │ consome       │ consome       │ consome             │
│       ▼               ▼               ▼               ▼                     │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                          MS_BACKLOG                                   ║  │
│  ║                    (Message Broker entre MS)                          ║  │
│  ╚═══════════════════════════════════════════════════════════════════════╝  │
│                                                                             │
│  GENESIS não roteia mais. MS_Backlog orquestra via tipagem.                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Inteligência Híbrida

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   HUMANO    │    │     LLM     │    │   SISTEMA   │
│  Intenção   │ +  │  Fluência   │ +  │  Estrutura  │ = AMPLIFICAÇÃO
│  Supervisão │    │  Execução   │    │  Persistên- │   COGNITIVA
│  Validação  │    │  Geração    │    │  cia        │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 1.4 Papel de Cada Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SEPARAÇÃO DE RESPONSABILIDADES v5.0                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Entrada + Avaliação)                                              │
│  ═════════════════════════════                                              │
│  PROPÓSITO: Ponto de entrada e validação do sistema                         │
│                                                                             │
│  Funções:                                                                   │
│  ├── ENTREVISTAR: captura dor do usuário                                    │
│  ├── PRODUZIR: primeiro BacklogItem que inicia saga                         │
│  ├── AVALIAR EFETIVIDADE: produto entregou JTD? (via adoção)                │
│  ├── APRENDER: padrões de sucesso/falha                                     │
│  └── SUGERIR REUSO: consulta catálogos para reutilizar                      │
│                                                                             │
│  NÃO FAZ MAIS:                                                              │
│  └── Orquestrar/rotear entre sistemas (MS_Backlog faz)                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_BACKLOG (Message Broker)                                                │
│  ═══════════════════════════                                                │
│  PROPÓSITO: Orquestrar comunicação entre todos os MS                        │
│                                                                             │
│  Funções:                                                                   │
│  ├── RECEBER: BacklogItems de qualquer MS                                   │
│  ├── ROTEAR: por tipagem para consumidor correto                            │
│  ├── RASTREAR: saga completa do início ao fim                               │
│  └── PERSISTIR: todo histórico para auditoria                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_PRODUTO (Framework de Objetivo)                                         │
│  ══════════════════════════════════                                         │
│  PROPÓSITO: Estruturar ciclo Dor → Produto → Feature → Efetividade          │
│                                                                             │
│  Consome: [estruturar_produto, criar_feature, implantar]                    │
│  Produz:  [ciclo_epistemologico, avaliar_efetividade]                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EPISTEMOLOGIA (Método de Especificação)                                    │
│  ═══════════════════════════════════════                                    │
│  PROPÓSITO: Especificar soluções via M0-M4                                  │
│                                                                             │
│  Consome: [ciclo_epistemologico, iterar_feature]                            │
│  Produz:  [desenvolvimento, ciclo_epistemologico (recursivo)]               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROMETHEUS (Fábrica de Execução)                                           │
│  ════════════════════════════════                                           │
│  PROPÓSITO: Transformar specs em artefatos funcionais                       │
│                                                                             │
│  Consome: [desenvolvimento, worker_*, corrigir_bug]                         │
│  Produz:  [aprovar_release, worker_* (interno)]                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Fluxo via Backlog

### 2.1 Saga Completa

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO: DOR → PRODUÇÃO (via MS_Backlog)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. USUÁRIO: "Tenho uma dor"                                                │
│         │                                                                   │
│         ▼                                                                   │
│  2. GENESIS.entrevistar_dor()                                               │
│     → Cria Prontuário                                                       │
│     → MS_Backlog.produzir({tipo: estruturar_produto, prontuario_ref})       │
│         │                                                                   │
│         ▼                                                                   │
│  3. MS_PRODUTO consome(estruturar_produto)                                  │
│     → Cria Produto + Feature                                                │
│     → MS_Backlog.produzir({tipo: ciclo_epistemologico, feature_ref})        │
│         │                                                                   │
│         ▼                                                                   │
│  4. EPISTEMOLOGIA consome(ciclo_epistemologico)                             │
│     → Executa M0-M4, gera Spec                                              │
│     → MS_Backlog.produzir({tipo: desenvolvimento, spec_ref})                │
│         │                                                                   │
│         ▼                                                                   │
│  5. PROMETHEUS consome(desenvolvimento)                                     │
│     → Executa TDD, gera Release                                             │
│     → MS_Backlog.produzir({tipo: aprovar_release, release_ref})             │
│         │                                                                   │
│         ▼                                                                   │
│  6. PO consome(aprovar_release)                                             │
│     → Aprova                                                                │
│     → MS_Backlog.produzir({tipo: implantar, release_ref})                   │
│         │                                                                   │
│         ▼                                                                   │
│  7. MS_PRODUTO consome(implantar)                                           │
│     → Setup + Treinamento                                                   │
│     → MS_Backlog.produzir({tipo: avaliar_efetividade, release_ref})         │
│         │                                                                   │
│         ▼                                                                   │
│  8. GENESIS consome(avaliar_efetividade)                                    │
│     → Coleta métricas, avalia                                               │
│     → SUCESSO: aprende padrão positivo                                      │
│     → ITERAR: MS_Backlog.produzir({tipo: iterar_feature})                   │
│     → BUG: MS_Backlog.produzir({tipo: corrigir_bug})                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 GENESIS como Produtor/Consumidor

```yaml
# GENESIS produz:
- tipo: estruturar_produto   # Após entrevistar dor
- tipo: iterar_feature       # Após avaliação indica iteração
- tipo: corrigir_bug         # Após avaliação indica bug

# GENESIS consome:
- tipo: entrevistar_dor      # Ponto de entrada
- tipo: avaliar_efetividade  # Ponto de validação
```

---

## 3. Tese

> **GENESIS é o Agente Autopoiético que evolui sistema para resolver dores de usuários em série, aumentando autonomia até ser quase auto-construtivo.**
>
> **Contexto:**
> - Humanos têm energia cognitiva limitada
> - LLMs têm fluência mas não estrutura
> - Juntos, sem método, produzem entropia
>
> **Solução v5.0:**
> - GENESIS é entrada e validação (PORTAS)
> - MS_Backlog orquestra comunicação (BROKER)
> - MS_Produto define objetivos (O QUÊ)
> - Epistemologia especifica (COMO)
> - PROMETHEUS executa (FAZ)
>
> **Resultado:** Sistema desacoplado, rastreável, com human-in-the-loop em todos os pontos.

---

## 4. Fronteiras

| GENESIS É | GENESIS NÃO É |
|-----------|---------------|
| Ponto de entrada (entrevista dor) | Orquestrador (MS_Backlog faz) |
| Ponto de validação (avalia efetividade) | Executor técnico (PROMETHEUS faz) |
| Aprendiz de padrões | Framework de objetivo (MS_Produto faz) |
| Produtor/Consumidor de BacklogItems | Método de especificação (Epistemologia faz) |

---

## 5. Avaliação de Efetividade

### 5.1 Quando GENESIS Avalia

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS: AVALIAÇÃO DE EFETIVIDADE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TRIGGER: MS_Backlog entrega item tipo: avaliar_efetividade                 │
│                                                                             │
│  ENTRADA:                                                                   │
│  - release_ref                                                              │
│  - produto_ref                                                              │
│  - feature_refs[]                                                           │
│  - periodo (tempo desde implantação)                                        │
│                                                                             │
│  PASSO 1: Avaliar ADOÇÃO do Produto                                         │
│  ──────────────────────────────────                                         │
│  adocao = MS_Produto.calcular_adocao(produto_ref)                           │
│                                                                             │
│  SE adocao >= produto.threshold_adocao:                                     │
│      conclusao = SUCESSO                                                    │
│      GENESIS.aprender(sucesso)                                              │
│      RETURN                                                                 │
│                                                                             │
│  PASSO 2: Avaliar FEATURES                                                  │
│  ─────────────────────────                                                  │
│  PARA CADA feature:                                                         │
│      criterios = MS_Produto.avaliar_criterios(feature)                      │
│                                                                             │
│      SE todos_atingidos AND adocao < threshold:                             │
│          conclusao = THRESHOLD_INADEQUADO                                   │
│          proximos_passos = ajustar_threshold                                │
│                                                                             │
│      SE NOT todos_atingidos:                                                │
│          SE erro_tecnico:                                                   │
│              conclusao = BUG                                                │
│              MS_Backlog.produzir({tipo: corrigir_bug, feature_ref})         │
│          SENÃO:                                                             │
│              conclusao = ITERAR                                             │
│              MS_Backlog.produzir({tipo: iterar_feature, feature_ref})       │
│                                                                             │
│  GENESIS.aprender(conclusao, aprendizados)                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Aprendizado

```yaml
aprender:
  SUCESSO:
    - Indexar padrão positivo em catálogos
    - Aumentar score de reuso para features similares
    - Tags: dor_tipo, feature_tipo, metricas_atingidas
  
  ITERAR:
    - Indexar padrão de falha
    - Diminuir score de reuso para abordagens similares
    - Tags: dor_tipo, feature_tipo, por_que_falhou
  
  BUG:
    - Rastrear para métricas de qualidade
    - Não indexar como padrão (problema técnico)
  
  THRESHOLD_INADEQUADO:
    - Indexar aprendizado sobre calibração
    - Ajustar thresholds default para features similares
```

---

## 6. Autopoiese e Camadas L0-L4

### 6.1 As 5 Camadas

| Camada | Nome | Capacidade | Pergunta |
|--------|------|------------|----------|
| **L0** | Existência | Ter identidade, versão | "Eu existo?" |
| **L1** | Percepção | Observar-se (métricas, estado) | "O que está acontecendo?" |
| **L2** | Ação | Executar mudanças | "Como faço algo?" |
| **L3** | Validação | Testar, verificar | "Está certo?" |
| **L4** | Decisão | Decidir direção | "O que fazer agora?" |

### 6.2 Como os Sistemas Manifestam L0-L4

| Camada | GENESIS | MS_Backlog | MS_Produto | Epistemologia | PROMETHEUS |
|--------|---------|------------|------------|---------------|------------|
| L0 | GENESIS.md | BacklogItems | Produtos | Specs | Artefatos |
| L1 | Avalia efetividade | Métricas fila | Health Score | Cobertura | CI/CD |
| L2 | Produz items | Roteia items | Implanta | Especifica | Executa |
| L3 | Valida JTD | Valida saga | Valida critérios | Valida specs | Valida testes |
| L4 | Decide iteração | Prioriza fila | Prioriza features | Decide escopo | Decide pipeline |

---

## 7. Hierarquia de Produto

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

---

## 8. Índice de Sistemas

### Nível C1 (GENESIS)

| Arquivo | Descrição |
|---------|-----------|
| genesis/GENESIS.md | Este documento (propósito) |
| genesis/GENESIS_Arquitetura.md | Detalhes técnicos |
| genesis/PROMETHEUS.md | Fábrica de execução |

### Nível C4 (Meta Sistemas)

| Arquivo | Descrição |
|---------|-----------|
| docs/04_B/MS_Backlog.md | Message Broker entre MS |
| docs/04_B/MS_Backlog_Arquitetura.md | Contratos e roteamento |
| docs/04_P/MS_Produto.md | Ciclo de vida de produtos |
| docs/04_P/MS_Produto_Arquitetura.md | Fluxos e persistência |

### Nível C3 (Frameworks)

| Arquivo | Descrição |
|---------|-----------|
| docs/00_E/00_E_Epistemologia.md | Método M0-M4 |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Busca semântica |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Decisão H→E→I→D |

### Nível C2 (Infraestrutura - Legado)

| Arquivo | Descrição |
|---------|-----------|
| docs/00_I/00_I_1_1_GitHub.md | Persistência de definições |
| docs/00_I/00_I_1_3_MongoDB.md | Persistência transacional |
| docs/00_I/00_I_2_1_Backlog.md | ⚠️ Legado - migrado para MS_Backlog |
| docs/00_I/00_I_2_2_Sprint.md | Gestão de sprints humanas |

---

## 9. Regra de Carregamento

```
SEMPRE: GENESIS.md (ponto de entrada)
════════════════════════════════════
• Propósito (entender o sistema)
• Papel de cada sistema (saber quem faz o quê)
• Fluxo via Backlog (saber a sequência)
• Índice (saber onde está cada coisa)

ENTÃO: Conforme necessidade
═══════════════════════════
• MS_Backlog.md → orquestração entre sistemas
• MS_Produto.md → ciclo de vida de produtos
• Epistemologia.md → especificação M0-M4
• PROMETHEUS.md → execução técnica
• *_Arquitetura.md → detalhes técnicos
```

---

## Referências

### Internas

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS_Arquitetura.md | Detalhes técnicos |
| docs/04_B/MS_Backlog.md | Message Broker |
| docs/04_P/MS_Produto.md | Framework de objetivo |
| docs/00_E/00_E_Epistemologia.md | Método de especificação |
| genesis/PROMETHEUS.md | Fábrica de execução |

### Externas

| Fonte | Conceito |
|-------|----------|
| Hutchins (1995) | Cognição Distribuída |
| Shannon (1948) | Entropia |
| Maturana & Varela (1980) | Autopoiesis |
| Fowler | Event Sourcing |
| Garcia-Molina | Saga Pattern |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1-4.0 | 2025-12-02 a 2025-12-16 | Versões anteriores |
| 5.0 | 2025-12-16 | **Refatoração arquitetural**: GENESIS deixa de ser orquestrador. Papel simplificado: entrada (entrevista dor) + validação (avalia efetividade). Toda orquestração delegada para MS_Backlog. Comunicação entre MS exclusivamente via BacklogItems tipados. |

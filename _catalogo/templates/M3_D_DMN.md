---
nome: Template M3.D - DMN
id: template_spec_dmn
versao: "0.1"
tipo: Template
vertente: M3.D
origem: interno
status: Draft
etapa: M4
sprint_ref: S026
camada: C3
artefatos_produzidos:
  - ".dmn"
  - "karate.feature"
schema_tdd_obrigatorio: true
---

# Template M3.D - Especificação DMN v0.1

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Template M3.D** | Modelo de especificação para vertente Decisional (DMN) |
| **DMN** | Decision Model and Notation |
| **Decision Table** | Tabela de regras input → output |
| **Hit Policy** | Como resolver múltiplas regras (U, F, C, etc.) |

### 1.2 Tese

> **Template M3.D é conhecimento catalogado que ensina Epistemologia a especificar Decisões para implementação como tabelas DMN.**
>
> - **Artefatos produzidos:** .dmn, karate.feature
> - **Schema TDD:** partições por input, critérios por combinação

---

## 2. Marco Teórico (M1)

### 2.1 Referências

| Conceito | Fonte | Aplicação |
|----------|-------|-----------|
| **DMN 1.3** | OMG Standard | Decision Tables |
| **Hit Policies** | DMN Spec | U (unique), F (first), C (collect) |
| **FEEL** | DMN Spec | Linguagem de expressões |

### 2.2 Hit Policies

```
┌─────────────────────────────────────────────────────────────────┐
│  POLICY    │ DESCRIÇÃO                                           │
│  ──────────┼───────────────────────────────────────────────────  │
│  U         │ Unique - apenas uma regra pode dar match           │
│  F         │ First - primeira regra que match é usada           │
│  C         │ Collect - todas regras que match são coletadas     │
│  A         │ Any - todas devem retornar mesmo valor             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| É | NÃO É |
|---|-------|
| Instruções para especificar DMN | O arquivo .dmn em si |
| Define regras de decisão | Lógica de processo (BPMN) |
| Tabela input → output | Código executável |

---

## 4. Classe (M3)

### 4.1 Elementos Obrigatórios

| Elemento | Descrição |
|----------|-----------|
| **decision_nome** | Nome da decisão |
| **hit_policy** | U, F, C, A |
| **inputs[]** | Colunas de entrada (nome, tipo, expressão) |
| **outputs[]** | Colunas de saída (nome, tipo) |
| **rules[]** | Regras (input values → output values) |

### 4.2 Instruções de Aplicação

#### PASSO 1: IDENTIFICAR INPUTS

```
Entrada: Decisão a especificar
Ação: Listar todas variáveis de entrada
Saída: inputs[]
```

#### PASSO 2: IDENTIFICAR OUTPUTS

```
Entrada: Decisão a especificar
Ação: Listar resultados possíveis
Saída: outputs[]
```

#### PASSO 3: DEFINIR REGRAS

```
Entrada: inputs[], outputs[]
Ação: Para cada combinação de inputs, definir output
Saída: rules[]
```

#### PASSO 4: ESCOLHER HIT POLICY

```
Regras:
- Se regras são mutuamente exclusivas → U (Unique)
- Se ordem importa → F (First)
- Se precisa agregar resultados → C (Collect)
```

#### PASSO 5: GERAR SCHEMA TDD

```
Para cada input:
  Criar ClasseEquivalencia com partições por valor

Para cada regra:
  Criar CriterioAceite (Given=inputs, Then=output)
```

### 4.3 Checklist

| ID | Verificação | Obrigatório |
|----|-------------|-------------|
| CK01 | Hit policy definida | ✓ |
| CK02 | Todos inputs tipados | ✓ |
| CK03 | Todos outputs tipados | ✓ |
| CK04 | Regras cobrem todos casos | ✓ |
| CK05 | Sem regras conflitantes (se U) | ✓ |

---

## 5. Exemplo

```yaml
decision_nome: "dmn_processo_iniciar_orquestrador"
hit_policy: "F"  # First match

inputs:
  - nome: "tipo_orquestrador"
    tipo: "string"
    expressao: "tipo_orquestrador"

outputs:
  - nome: "processo"
    tipo: "string"
  - nome: "token_orquestrador"
    tipo: "string"

rules:
  - input_values: ["zarah"]
    output_values: ["bpmn_orquestrador_zarah", "MATTERMOST_TOKEN_ZARAH"]
  - input_values: ["genesis"]
    output_values: ["bpmn_ms_agente", "MATTERMOST_TOKEN_GENESIS"]
  - input_values: ["-"]  # default
    output_values: ["bpmn_default", "MATTERMOST_TOKEN_DEFAULT"]

schema_tdd:
  classe_ref: "dmn_processo_iniciar_orquestrador"
  classes_equivalencia:
    - atributo: "tipo_orquestrador"
      tipo: "string"
      particoes:
        - nome: "zarah"
          valores_exemplo: ["zarah"]
          valida: true
        - nome: "genesis"
          valores_exemplo: ["genesis"]
          valida: true
        - nome: "desconhecido"
          valores_exemplo: ["xxx", ""]
          valida: true  # usa default
  
  criterios_aceite:
    - id: "CA01"
      given: "tipo_orquestrador=zarah"
      when: "DMN é avaliado"
      then: "processo=bpmn_orquestrador_zarah"
    - id: "CA02"
      given: "tipo_orquestrador=genesis"
      when: "DMN é avaliado"
      then: "processo=bpmn_ms_agente"
    - id: "CA03"
      given: "tipo_orquestrador=desconhecido"
      when: "DMN é avaliado"
      then: "processo=bpmn_default (regra default)"
  
  cobertura: "cartesiano"
  combinacoes_estimadas: 3
```

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-17 | Versão inicial MVP. Sprint S026. |

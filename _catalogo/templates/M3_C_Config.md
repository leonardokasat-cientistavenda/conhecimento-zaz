---
nome: Template M3.C - Config/Schema
id: template_spec_config
versao: "0.1"
tipo: Template
vertente: M3.C
origem: interno
status: Draft
etapa: M4
sprint_ref: S026
camada: C3
artefatos_produzidos:
  - "schema.json"
  - "validators.js"
schema_tdd_obrigatorio: true
---

# Template M3.C - Especificação Config/Schema v0.1

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Template M3.C** | Modelo de especificação para vertente Configuracional |
| **Schema** | Estrutura de dados (JSON Schema, MongoDB) |
| **Validator** | Função que valida dados contra schema |
| **Collection** | Coleção MongoDB |

### 1.2 Tese

> **Template M3.C é conhecimento catalogado que ensina Epistemologia a especificar Schemas e Configurações.**
>
> - **Artefatos produzidos:** schema.json, validators.js
> - **Schema TDD:** partições por campo, critérios de validação

---

## 2. Marco Teórico (M1)

### 2.1 Referências

| Conceito | Fonte | Aplicação |
|----------|-------|-----------|
| **JSON Schema** | json-schema.org | Validação de estrutura |
| **MongoDB Schema** | MongoDB Docs | $jsonSchema validator |
| **Ajv** | ajv.js.org | Validação em runtime |

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| É | NÃO É |
|---|-------|
| Estrutura de dados | Lógica de negócio |
| Regras de validação | Código de aplicação |
| Schema para persistência | Modelo de domínio (Classe) |

---

## 4. Classe (M3)

### 4.1 Elementos Obrigatórios

| Elemento | Descrição |
|----------|-----------|
| **collection_nome** | Nome da coleção MongoDB |
| **database** | Database (genesis, agente, etc.) |
| **campos[]** | Lista de campos com tipo e restrições |
| **indices[]** | Índices para performance |
| **validacoes[]** | Regras de validação |

### 4.2 Tipos de Campo

```yaml
Campo:
  nome: string
  tipo: string | int | float | boolean | date | array | object
  obrigatorio: boolean
  default?: any
  enum?: array          # Valores permitidos
  min?: number          # Mínimo (para int/float/string length)
  max?: number          # Máximo
  pattern?: string      # Regex para strings
  ref?: string          # Referência a outra coleção
```

### 4.3 Instruções de Aplicação

#### PASSO 1: IDENTIFICAR CAMPOS

```
Entrada: Requisitos do schema
Ação: Listar todos os campos necessários
Saída: campos[]
```

#### PASSO 2: DEFINIR TIPOS E RESTRIÇÕES

```
Para cada campo:
  1. Definir tipo
  2. Definir se obrigatório
  3. Definir restrições (min, max, enum, pattern)
  4. Definir default se aplicável
```

#### PASSO 3: DEFINIR ÍNDICES

```
Identificar:
  1. Campos usados em queries frequentes
  2. Campos usados em ordenação
  3. Campos únicos
```

#### PASSO 4: GERAR SCHEMA TDD

```
Para cada campo:
  Criar ClasseEquivalencia com partições:
    - valor válido
    - valor inválido (tipo errado)
    - valor inválido (fora de range)
    - valor null/undefined (se obrigatório)

Para cada validação:
  Criar CriterioAceite
```

### 4.4 Checklist

| ID | Verificação | Obrigatório |
|----|-------------|-------------|
| CK01 | Todos campos tipados | ✓ |
| CK02 | Campos obrigatórios marcados | ✓ |
| CK03 | Índices para queries frequentes | ✓ |
| CK04 | Defaults definidos onde aplicável | ○ |
| CK05 | Referências validadas | ○ |

---

## 5. Exemplo

```yaml
collection_nome: "execucoes"
database: "agente"
versao: "1.0"

campos:
  - nome: "agente_id"
    tipo: "string"
    obrigatorio: true
    enum: ["genesis", "zarah"]
  
  - nome: "user_id"
    tipo: "string"
    obrigatorio: true
  
  - nome: "user_login"
    tipo: "string"
    obrigatorio: true
  
  - nome: "channel_id"
    tipo: "string"
    obrigatorio: true
  
  - nome: "input"
    tipo: "string"
    obrigatorio: true
  
  - nome: "output"
    tipo: "string"
    obrigatorio: true
  
  - nome: "modelo"
    tipo: "string"
    obrigatorio: true
    enum: ["claude-sonnet-4-20250514", "claude-haiku-4-20250514", "claude-opus-4-20250514"]
  
  - nome: "tokens_input"
    tipo: "int"
    obrigatorio: true
    min: 0
  
  - nome: "tokens_output"
    tipo: "int"
    obrigatorio: true
    min: 0
  
  - nome: "tokens_total"
    tipo: "int"
    obrigatorio: true
    min: 0
  
  - nome: "custo_usd"
    tipo: "float"
    obrigatorio: true
    min: 0
  
  - nome: "latencia_ms"
    tipo: "int"
    obrigatorio: true
    min: 0
  
  - nome: "tool_calls"
    tipo: "array"
    obrigatorio: false
    default: []
  
  - nome: "created_at"
    tipo: "date"
    obrigatorio: true
    default: "$$NOW"

indices:
  - campos: ["agente_id", "channel_id"]
    tipo: "compound"
  - campos: ["created_at"]
    tipo: "single"
    ordem: -1
  - campos: ["user_id"]
    tipo: "single"

schema_tdd:
  classe_ref: "agente.execucoes"
  
  classes_equivalencia:
    - atributo: "agente_id"
      tipo: "string"
      particoes:
        - nome: "genesis"
          valores_exemplo: ["genesis"]
          valida: true
        - nome: "zarah"
          valores_exemplo: ["zarah"]
          valida: true
        - nome: "invalido"
          valores_exemplo: ["xxx", ""]
          valida: false
        - nome: "null"
          valores_exemplo: [null]
          valida: false
    
    - atributo: "tokens_input"
      tipo: "int"
      particoes:
        - nome: "positivo"
          valores_exemplo: [100, 1000, 5000]
          valida: true
        - nome: "zero"
          valores_exemplo: [0]
          valida: true
        - nome: "negativo"
          valores_exemplo: [-1, -100]
          valida: false
        - nome: "tipo_errado"
          valores_exemplo: ["abc", 1.5]
          valida: false
  
  criterios_aceite:
    - id: "CA01"
      given: "documento com todos campos válidos"
      when: "insertOne()"
      then: "documento inserido com sucesso"
    
    - id: "CA02"
      given: "documento sem agente_id"
      when: "insertOne()"
      then: "erro de validação: agente_id obrigatório"
    
    - id: "CA03"
      given: "documento com agente_id inválido"
      when: "insertOne()"
      then: "erro de validação: agente_id deve ser genesis ou zarah"
    
    - id: "CA04"
      given: "documento com tokens_input negativo"
      when: "insertOne()"
      then: "erro de validação: tokens_input deve ser >= 0"
  
  cobertura: "pairwise"
  combinacoes_estimadas: 12
```

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-17 | Versão inicial MVP. Sprint S026. |

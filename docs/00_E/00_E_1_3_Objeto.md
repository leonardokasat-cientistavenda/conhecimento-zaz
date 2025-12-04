---
nome: 00_E_1_3_Objeto
versao: "3.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Publicado
---

# Objeto v3.0

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Objeto v2.1 não segue padrão Documento v3.0 | 11 seções ad-hoc vs 6 seções M0-M4 |
| Tabela atributos sem Visibilidade | Viola Classe v3.0 |
| Sem M0 explícito | Não documenta problema que resolve |

### 1.2 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **objeto** | Etapa M2; escopo delimitado com fronteiras claras |
| **escopo** | O que está INCLUÍDO no objeto de pesquisa |
| **fronteiras** | O que está EXCLUÍDO; limites deliberados |
| **delimitação** | Ato de definir escopo + fronteiras |
| **afunilamento** | Redução progressiva: Tema → Objeto específico |
| **ponte M1→M3** | Função de conectar conceitos teóricos a especificação |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| S003-E evoluiu docs em cascata | Objeto evoluiu de MarcoTeorico, não absorveu Documento v3.0 |
| Muitas seções | 11 seções diluem informação |

### 1.4 Necessidade

| Necessidade | Ação |
|-------------|------|
| Padronizar estrutura | 6 seções M0-M4 |
| Adicionar Visibilidade | Coluna Visib. em atributos |
| Consolidar seções | Unificar diagramas na seção correta |

---

## 2. Marco Teórico (M1)

### 2.1 Conceitos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Escopo** | Metodologia Científica | Atributo obrigatório |
| **Fronteiras** | Metodologia Científica | Atributo obrigatório |
| **Delimitação** | AJE, Mettzer | Método central delimitar() |
| **Afunilamento** | Metodologia Científica | Processo M0→M1→M2 |
| **Double Diamond** | Design Council (2005) | M0-M1 = problema; M1-M2 = solução |

### 2.2 Diagrama: Posição no Framework

```
┌─────────────────────────────────────────────────────────────────┐
│                       FRAMEWORK M0-M4                           │
│                                                                 │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐               │
│  │    M0    │      │    M1    │      │    M3    │               │
│  │ Problema │      │  Marco   │      │  Classe  │               │
│  └────┬─────┘      └────┬─────┘      └────▲─────┘               │
│       │                 │                 │                     │
│       │  problema_ref   │  marco_ref      │  output             │
│       └────────┐  ┌─────┘                 │                     │
│                ▼  ▼                       │                     │
│       ┌─────────────────────────┐        │                     │
│       │      M2: OBJETO         │────────┘                     │
│       │                         │                               │
│       │  Recebe:                │                               │
│       │  - glossário (M0)       │                               │
│       │  - conceitos (M1)       │                               │
│       │                         │                               │
│       │  Produz:                │                               │
│       │  - escopo delimitado    │                               │
│       │  - fronteiras claras    │                               │
│       │  - critérios            │                               │
│       └─────────────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Fontes

| Fonte | Conceito |
|-------|----------|
| AJE (aje.com) | Escopo, Delimitação |
| Mettzer | Afunilamento, Objeto de Estudo |
| Design Council (UK, 2005) | Double Diamond |

---

## 3. Objeto (M2)

### 3.1 Definição

| Campo | Valor |
|-------|-------|
| **nome** | Objeto |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Delimitar escopo de pesquisa com fronteiras claras e critérios verificáveis |

### 3.2 Escopo e Fronteiras

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONTEXTO: M0-M4                                │
│                                                                             │
│   FRONTEIRAS                          ┌─────────────────────────────────┐   │
│   ──────────                          │         ESCOPO                  │   │
│                                       ├─────────────────────────────────┤   │
│   ┌───────────────────┐               │  Atributos:                     │   │
│   │ Problema          │               │  - problema_ref                 │   │
│   │ (M0 - input)      │               │  - marco_ref                    │   │
│   └───────────────────┘               │  - tipo_pesquisa                │   │
│                                       │  - objetivo                     │   │
│   ┌───────────────────┐               │  - escopo                       │   │
│   │ MarcoTeorico      │               │  - fronteiras                   │   │
│   │ (M1 - input)      │               │  - criterio_sucesso             │   │
│   └───────────────────┘               │  - criterio_insucesso           │   │
│                                       │                                 │   │
│   ┌───────────────────┐               │  Métodos:                       │   │
│   │ Classe            │               │  - delimitar()                  │   │
│   │ (M3 - output)     │               │  - validar()                    │   │
│   └───────────────────┘               │  - validarCompletude()          │   │
│                                       │  - gerarClasses()               │   │
│                                       └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Critérios

| Critério | Verificação |
|----------|-------------|
| **Sucesso** | M3 não precisa voltar a M2 para esclarecer escopo |
| **Insucesso** | Ambiguidade sobre o que incluir/excluir em M3 |

---

## 4. Classe (M3)

### 4.1 Diagrama de Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                           OBJETO                                │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  + nome: string                      [1]                        │
│  + problema_ref: Problema            [1]                        │
│  + marco_ref: MarcoTeorico           [1]                        │
│  + tipo_pesquisa: enum               [1]                        │
│  + objetivo: string                  [1]                        │
│  + escopo: string                    [1]                        │
│  + fronteiras: string                [1]                        │
│  - requisitos: string[]              [0..*]                     │
│  + conceitos_usados: string[]        [1..*]                     │
│  + criterio_sucesso: string          [1]                        │
│  + criterio_insucesso: string        [1]                        │
│  - frontmatter: Frontmatter          [1]      ◆── composição    │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  R1: problema_ref obrigatório (não existe M2 sem M0)            │
│  R2: marco_ref obrigatório (não existe M2 sem M1)               │
│  R3: termos do objetivo validados em glossário/conceitos        │
│  R4: escopo ∩ fronteiras = ∅ (mutuamente exclusivos)            │
│  R5: critérios verificáveis (verbo mensurável)                  │
│  R6: conceitos_usados[] não vazio                               │
│  R7: validarCompletude() == true antes de gerarClasses()        │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + delimitar(m: MarcoTeorico, p: Problema): Objeto              │
│  + validar(): bool                                              │
│  + validarCompletude(): bool                                    │
│  + verificarConexaoM1(m: MarcoTeorico): string[]                │
│  + gerarClasses(): Classe[]                                     │
└─────────────────────────────────────────────────────────────────┘
         │                              │
         │ problema_ref [1]             │ herda de
         │ marco_ref [1]                ▼
         ▼                     ┌─────────────────┐
┌─────────────────┐            │     Classe      │
│ Problema | Marco│            └─────────────────┘
└─────────────────┘
```

### 4.2 Atributos

| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| nome | string | [1] | + | Sim | Identificador único |
| problema_ref | Problema | [1] | + | Sim | Problema (M0) de origem |
| marco_ref | MarcoTeorico | [1] | + | Sim | Marco teórico que fundamenta |
| tipo_pesquisa | enum | [1] | + | Sim | Exploratório, Descritivo, Prescritivo |
| objetivo | string | [1] | + | Sim | O que pretende resolver |
| escopo | string | [1] | + | Sim | O que está incluído |
| fronteiras | string | [1] | + | Sim | O que está excluído |
| requisitos | string[] | [0..*] | - | Não | Pré-condições |
| conceitos_usados | string[] | [1..*] | + | Sim | Conceitos de M1 aplicados |
| criterio_sucesso | string | [1] | + | Sim | Quando considera completo |
| criterio_insucesso | string | [1] | + | Sim | Quando considera falho |
| frontmatter | Frontmatter | [1] | - | Sim | Metadados YAML |

### 4.3 Restrições

| Código | Restrição | Validação |
|--------|-----------|-----------|
| R1 | problema_ref obrigatório | Não existe M2 sem M0 |
| R2 | marco_ref obrigatório | Não existe M2 sem M1 |
| R3 | Termos validados | objetivo.termos ∈ (glossário ∪ conceitos) |
| R4 | Escopo/fronteiras exclusivos | escopo ∩ fronteiras = ∅ |
| R5 | Critérios verificáveis | Contém verbo mensurável |
| R6 | conceitos_usados não vazio | conceitos_usados.length >= 1 |
| R7 | Completude antes de M3 | validarCompletude() antes de gerarClasses() |

### 4.4 Métodos

#### delimitar(marco: MarcoTeorico, problema: Problema): Objeto

| Campo | Valor |
|-------|-------|
| Input | MarcoTeorico (M1), Problema (M0) |
| Output | Objeto delimitado |
| Pré-condição | marco.validar() == true, problema.validar() == true |

```
┌─────────────────────────────────┐
│     CONCEITOS DE M1             │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  1. Extrair termos relevantes   │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  2. Definir objetivo            │
│     (usar termos glossário M0)  │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  3. Delimitar escopo            │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  4. Definir fronteiras          │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  5. Especificar critérios       │
└────────────────┬────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │    OBJETO     │
         └───────────────┘
```

#### validar(): bool

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | bool |
| Validações | R1-R6 |

#### validarCompletude(): bool

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | bool |
| Pré-condição | validar() == true |

| Critério | Pergunta |
|----------|----------|
| Escopo claro | M3 sabe exatamente o que incluir? |
| Fronteiras claras | M3 sabe exatamente o que excluir? |
| Conceitos suficientes | Todos termos do escopo têm definição? |
| Critérios verificáveis | M3 consegue testar sucesso/insucesso? |

#### verificarConexaoM1(marco: MarcoTeorico): string[]

| Campo | Valor |
|-------|-------|
| Input | MarcoTeorico |
| Output | string[] (conceitos não usados) |
| Uso | Identificar lacunas ou escopo incompleto |

#### gerarClasses(): Classe[]

| Campo | Valor |
|-------|-------|
| Input | self (validado) |
| Output | Classe[] para M3 |
| Pré-condição | validarCompletude() == true |

### 4.5 Tipos de Pesquisa

| Tipo | Pergunta | Output típico |
|------|----------|---------------|
| Exploratório | O que existe? | Mapeamento, descoberta |
| Descritivo | Como funciona? | Documentação, análise |
| Prescritivo | Como deveria ser? | Sistema, framework, método |

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Superclasse (herança) |
| 00_E_1_4_1_Diagrama | COMO selecionar diagramas |
| 00_E_1_1_Problema | Anterior (M0) - problema_ref |
| 00_E_1_2_MarcoTeorico | Anterior (M1) - marco_ref |
| 00_E_1_4_Classe | Próximo (M3) - output |
| 00_E_1_6_Documento | Ciclo de vida (persistência) |

### Externas

| Fonte | Conceito |
|-------|----------|
| AJE (aje.com) | Escopo, Delimitação |
| Mettzer | Afunilamento, Objeto de Estudo |
| Design Council (UK, 2005) | Double Diamond |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | - | Criação |
| 2.0 | 2025-12-03 | 19:45 | Reestruturação via M0-M4 recursivo |
| 2.1 | 2025-12-03 | 23:10 | Instruções diagrama e persistência |
| 3.0 | 2025-12-04 | 13:15 | **PADRONIZAÇÃO S004-E**: 6 seções M0-M4 conforme Documento v3.0. Visibilidade (+/-) em atributos. M0 explícito adicionado. Consolidação de 11→6 seções. |

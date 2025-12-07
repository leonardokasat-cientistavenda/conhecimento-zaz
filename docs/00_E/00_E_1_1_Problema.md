---
nome: 00_E_1_1_Problema
versao: "3.1"
tipo: Classe
classe_ref: Classe
origem: interno
status: Publicado
---

# Problema v3.1

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Problema v2.1 não segue padrão Documento v3.0 | 7 seções ad-hoc vs 6 seções M0-M4 |
| Tabela atributos sem Visibilidade | Viola Classe v3.0 |
| Referências incompletas | Não cita Objeto (M2) |

### 1.2 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **problema** | Ponto de partida M0; transforma sintomas em necessidades acionáveis |
| **sintoma** | Manifestação observável; o que se percebe |
| **causa_raiz** | Origem fundamental; o que gera o sintoma |
| **necessidade** | Ação requerida; verbo no infinitivo |
| **signo** | Unidade de significação (Saussure): significante + significado |
| **significante** | Forma/palavra/expressão utilizada |
| **significado** | Conceito/ideia por trás da forma |
| **ambiguidade** | Quando significante tem múltiplos significados |

> **Referência:** Para regras completas de criação de glossários, ver [Glossário Central - Como Criar Entradas](../00_I/00_I_0_1_Glossario.md#7-como-criar-entradas)

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| S003-E evoluiu docs em cascata | Problema foi primeiro, não absorveu padrões posteriores |
| Padrão Documento v3.0 criado depois | Problema não retroatualizou |

### 1.4 Necessidade

| Necessidade | Ação |
|-------------|------|
| Padronizar estrutura | 6 seções M0-M4 conforme Documento v3.0 |
| Adicionar Visibilidade | Coluna Visib. na tabela de atributos |
| Completar referências | Adicionar Objeto nas referências |

---

## 2. Marco Teórico (M1)

### 2.1 Conceitos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Signo** | Saussure (1916) | Unidade básica; cada termo do sintoma é um signo |
| **Significante** | Saussure | Forma/palavra que aparece na descrição |
| **Significado** | Saussure | Conceito real no contexto específico |
| **Ambiguidade** | Semiótica | Fonte de mal-entendidos que M0 resolve |
| **Análise Semiótica** | Saussure | Método de extrair e mapear significantes |

### 2.2 Diagrama: Signo

```
┌─────────────────────────────────┐
│            SIGNO                │
├────────────────┬────────────────┤
│  SIGNIFICANTE  │   SIGNIFICADO  │
│    (forma)     │   (conceito)   │
│                │                │
│   "problema"   │  dificuldade?  │
│    palavra     │  obstáculo?    │
│                │  oportunidade? │
└────────────────┴────────────────┘
         │
         ▼
   Análise M0 define
   qual significado
```

### 2.3 Fontes

| Fonte | Conceito |
|-------|----------|
| Saussure, F. *Curso de Linguística Geral* (1916) | Signo, Significante, Significado |

---

## 3. Objeto (M2)

### 3.1 Definição

| Campo | Valor |
|-------|-------|
| **nome** | Problema |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Estruturar ponto de partida M0; transformar sintomas em necessidades |

### 3.2 Escopo e Fronteiras

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONTEXTO: M0-M4                                │
│                                                                             │
│   FRONTEIRAS                          ┌─────────────────────────────────┐   │
│   ──────────                          │         ESCOPO                  │   │
│                                       ├─────────────────────────────────┤   │
│   ┌───────────────────┐               │  Atributos:                     │   │
│   │ MarcoTeorico      │               │  - sintoma                      │   │
│   │ (conceitos M1)    │               │  - significantes[]              │   │
│   └───────────────────┘               │  - glossario[]                  │   │
│                                       │  - causa_raiz                   │   │
│   ┌───────────────────┐               │  - necessidade                  │   │
│   │ Objeto            │               │                                 │   │
│   │ (escopo M2)       │               │  Métodos:                       │   │
│   └───────────────────┘               │  - extrair_significantes()      │   │
│                                       │  - mapear_significados()        │   │
│   ┌───────────────────┐               │  - detectar_ambiguidades()      │   │
│   │ Classe            │               │  - validar()                    │   │
│   │ (POO M3)          │               │                                 │   │
│   └───────────────────┘               │  Fluxo M0:                      │   │
│                                       │  sintoma → glossário → causa →  │   │
│                                       │  necessidade                    │   │
│                                       └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Critérios

| Critério | Verificação |
|----------|-------------|
| **Sucesso** | Problema definido permite M1 sem retorno |
| **Insucesso** | M1 precisa voltar a M0 para esclarecer termos |

---

## 4. Classe (M3)

### 4.1 Diagrama de Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                          PROBLEMA                               │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  + nome: string                      [1]                        │
│  + sintoma: string                   [1]                        │
│  + significantes: string[]           [1..*]                     │
│  + glossario: Glossario[]            [1..*]                     │
│  + causa_raiz: string                [1]                        │
│  - tentativas_anteriores: string[]   [0..*]                     │
│  + necessidade: string               [1]                        │
│  - contexto: string                  [0..1]                     │
│  - impacto: string                   [0..1]                     │
│  - frontmatter: Frontmatter          [1]      ◆── composição    │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  R1: sintoma é observável (não abstrato)                        │
│  R2: causa_raiz explica logicamente o sintoma                   │
│  R3: necessidade é acionável (verbo infinitivo)                 │
│  R4: todo significante tem significado no glossário             │
│  R5: ambiguidades resolvidas antes de M1                        │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + extrair_significantes(sintoma): string[]                     │
│  + mapear_significados(significantes): Glossario[]              │
│  + detectar_ambiguidades(glossario): string[]                   │
│  + validar(): bool                                              │
│  + gerar_marco_teorico(): MarcoTeorico                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ herda de
                              ▼
                    ┌───────────────────┐
                    │      Classe       │
                    └───────────────────┘
```

### 4.2 Atributos

| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| nome | string | [1] | + | Sim | Identificador único |
| sintoma | string | [1] | + | Sim | Manifestação observável |
| significantes | string[] | [1..*] | + | Sim | Termos-chave do sintoma |
| glossario | Glossario[] | [1..*] | + | Sim | Mapeamento significante→significado |
| causa_raiz | string | [1] | + | Sim | Origem do sintoma |
| tentativas_anteriores | string[] | [0..*] | - | Não | Soluções já testadas |
| necessidade | string | [1] | + | Sim | Ação para resolver |
| contexto | string | [0..1] | - | Não | Situação onde ocorre |
| impacto | string | [0..1] | - | Não | Consequências de não resolver |
| frontmatter | Frontmatter | [1] | - | Sim | Metadados YAML |

### 4.3 Subtipo: Glossario

| Atributo | Tipo | Card. | Visib. | Descrição |
|----------|------|-------|--------|-----------|
| significante | string | [1] | + | Termo extraído |
| significado | string | [1] | + | Definição no contexto |
| ambiguidade | string | [0..1] | + | Outros significados (se houver) |

### 4.4 Restrições

| Código | Restrição | Validação |
|--------|-----------|-----------|
| R1 | Sintoma é observável | Descreve fato, não interpretação |
| R2 | Causa explica sintoma | Relação lógica verificável |
| R3 | Necessidade acionável | Contém verbo no infinitivo |
| R4 | Glossário completo | significantes.length == glossario.length |
| R5 | Ambiguidades resolvidas | Nenhum significante com múltiplos significados |

### 4.5 Métodos

#### extrair_significantes(sintoma: string): string[]

| Campo | Valor |
|-------|-------|
| Input | sintoma: string |
| Output | string[] (termos-chave) |
| Pós-condição | Todos termos relevantes identificados |

#### mapear_significados(significantes: string[]): Glossario[]

| Campo | Valor |
|-------|-------|
| Input | significantes: string[] |
| Output | Glossario[] |
| Pós-condição | Cada significante tem significado |

#### detectar_ambiguidades(glossario: Glossario[]): string[]

| Campo | Valor |
|-------|-------|
| Input | glossario: Glossario[] |
| Output | string[] (termos ambíguos) |
| Uso | Identificar o que precisa resolução |

#### validar(): bool

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | bool |
| Validações | R1-R5 |

#### gerar_marco_teorico(): MarcoTeorico

| Campo | Valor |
|-------|-------|
| Input | self (Problema validado) |
| Output | MarcoTeorico (estrutura inicial para M1) |
| Pré-condição | validar() == true |

### 4.6 Fluxo M0

```
Sintoma (texto livre)
       │
       ▼
┌─────────────────────┐
│extrair_significantes│ ──► Lista de termos-chave
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ mapear_significados │ ──► Tabela significante → significado
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│detectar_ambiguidades│ ──► Termos com múltiplos significados
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Resolver/Alinhar   │ ──► Glossário validado
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Definir causa_raiz │ ──► Origem do sintoma
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Definir necessidade │ ──► Ação para resolver
└─────────────────────┘
       │
       ▼
gerar_marco_teorico() ──► Input para M1
```

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Superclasse (herança) |
| 00_E_1_4_1_Diagrama | COMO selecionar diagramas |
| 00_E_1_2_MarcoTeorico | Próximo (M1) - output |
| 00_E_1_3_Objeto | Relação (M2 usa problema_ref) |
| 00_E_1_6_Documento | Ciclo de vida (persistência) |
| 00_I_0_1_Glossario | Glossário Central (regras de criação) |

### Externas

| Fonte | Conceito |
|-------|----------|
| Saussure, F. *Curso de Linguística Geral* (1916) | Signo, Significante, Significado |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | - | Criação |
| 2.0 | 2025-12-03 | 14:30 | Marco Teórico Saussure, análise semiótica |
| 2.1 | 2025-12-03 | 22:45 | Instruções diagrama e persistência |
| 3.0 | 2025-12-04 | 13:00 | PADRONIZAÇÃO S004-E: 6 seções M0-M4 conforme Documento v3.0. |
| 3.1 | 2025-12-07 | - | Adiciona referência ao Glossário Central na seção M0.1 e nas Referências Internas. |

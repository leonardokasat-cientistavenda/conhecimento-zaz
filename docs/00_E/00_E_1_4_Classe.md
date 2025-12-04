---
nome: 00_E_1_4_Classe
versao: "3.1"
tipo: Classe
classe_ref: Classe
origem: interno
status: Publicado
---

# Classe v3.1

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Classe v3.0 não tinha M0 explícito | 9 seções ad-hoc sem problema definido |
| Status ainda Draft | Deveria ser Publicado |

### 1.2 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **classe** | Molde que define estrutura (atributos) e comportamento (métodos) |
| **objeto** | Instância de uma classe |
| **herança** | Relação "é-um" entre classes |
| **encapsulamento** | Ocultar implementação, expor interface |
| **polimorfismo** | Tratar objetos via interface comum |

### 1.3 Causa Raiz

Classe foi criada como referência POO antes do padrão Documento v3.0 ser estabelecido.

### 1.4 Necessidade

Adicionar M0 explícito e ajustar estrutura para consistência com outros filhos.

---

## 2. Marco Teórico (M1)

### 2.1 Pilares da Orientação a Objetos

| Conceito | Definição | Notação | Aplicação |
|----------|-----------|---------|-----------|
| **Encapsulamento** | Ocultar implementação, expor interface | `+` `-` `#` | Visibilidade em atributos |
| **Herança** | Relação "é-um" | `──▷` | Problema herda de Classe |
| **Polimorfismo** | Interface comum | Métodos | Métodos aceitam subclasses |
| **Abstração** | Características essenciais | Classes abstratas | Classe como abstração |

### 2.2 Relações entre Classes

| Relação | Símbolo | Semântica | Força |
|---------|---------|-----------|-------|
| **Herança** | `──▷` | "é-um" | Forte |
| **Composição** | `◆──` | "tem-um" (dependente) | Forte |
| **Agregação** | `◇──` | "tem-um" (independente) | Fraca |
| **Associação** | `───` | "usa" | Fraca |
| **Dependência** | `- ->` | "depende de" | Fraca |

### 2.3 Princípios SOLID

| Princípio | Aplicação | Validação |
|-----------|-----------|-----------|
| **S** - Single Responsibility | Uma classe, uma responsabilidade | Descrição em 1-2 frases |
| **O** - Open/Closed | Extensível, fechada para modificação | Subclasses não alteram base |
| **L** - Liskov Substitution | Subclasses substituíveis | Métodos funcionam com subclasses |
| **I** - Interface Segregation | Interfaces específicas | Atributos coesos |
| **D** - Dependency Inversion | Depender de abstrações | Referências a Classes |

### 2.4 Fontes

| Fonte | Conceito |
|-------|----------|
| Booch, *OO Analysis and Design* (1994) | Classe, Objeto, Herança |
| Meyer, *OO Software Construction* (1988) | Encapsulamento |
| Gamma et al. *Design Patterns* (1995) | Composição, Agregação |
| Martin, *SOLID Principles* (2000) | SOLID |
| Beck & Cunningham, *CRC Cards* (1989) | Método de descoberta |

---

## 3. Objeto (M2)

### 3.1 Definição

| Campo | Valor |
|-------|-------|
| **nome** | Classe |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Definir estrutura e comportamento de entidades do sistema |

### 3.2 Escopo e Fronteiras

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONTEXTO: M0-M4                                │
│                                                                             │
│   FRONTEIRAS                          ┌─────────────────────────────────┐   │
│   ──────────                          │         ESCOPO                  │   │
│                                       ├─────────────────────────────────┤   │
│   ┌───────────────────┐               │  Atributos:                     │   │
│   │ Objeto            │               │  - nome, descricao              │   │
│   │ (M2 - input)      │               │  - atributos[], metodos[]       │   │
│   └───────────────────┘               │  - restricoes[], relacoes[]     │   │
│                                       │  - diagrama, frontmatter        │   │
│   ┌───────────────────┐               │                                 │   │
│   │ Documento         │               │  Métodos:                       │   │
│   │ (M4 - output)     │               │  - identificarClasses()         │   │
│   └───────────────────┘               │  - descobrirAtributos()         │   │
│                                       │  - descobrirMetodos()           │   │
│   ┌───────────────────┐               │  - definirRelacoes()            │   │
│   │ Diagrama          │               │  - validar(), herdar()          │   │
│   │ (subtipo)         │               │                                 │   │
│   └───────────────────┘               │  Subtipos:                      │   │
│                                       │  - Atributo, Restricao, Relacao │   │
│                                       │  - Diagrama                     │   │
│                                       └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Critérios

| Critério | Verificação |
|----------|-------------|
| **Sucesso** | Classe instanciável com validação SOLID |
| **Insucesso** | Violação de R1-R7 ou princípios SOLID |

---

## 4. Classe (M3)

### 4.1 Diagrama de Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                         «class»                                 │
│                          Classe                                 │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  + nome: string                      [1]                        │
│  + descricao: string                 [1]                        │
│  + atributos: Atributo[]             [1..*]                     │
│  + metodos: Metodo[]                 [0..*]                     │
│  + restricoes: Restricao[]           [0..*]                     │
│  + relacoes: Relacao[]               [0..*]                     │
│  + diagrama: Diagrama                [1]                        │
│  - frontmatter: Frontmatter          [1]      ◆── composição    │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  R1: nome único no sistema                                      │
│  R2: descricao em 1-2 frases (SRP)                              │
│  R3: diagrama obrigatório                                       │
│  R4: frontmatter obrigatório                                    │
│  R5: atributos[] não vazio                                      │
│  R6: visibilidade em atributos (+/-/#)                          │
│  R7: métodos com I/O tipado                                     │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + identificarClasses(dominio): Classe[]                        │
│  + descobrirAtributos(classe): Atributo[]                       │
│  + descobrirMetodos(classe): Metodo[]                           │
│  + definirRelacoes(classes): Relacao[]                          │
│  + instanciar(): Objeto                                         │
│  + validar(): boolean                                           │
│  + herdar(superclasse): Classe                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Atributos

| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| nome | string | [1] | + | Sim | Identificador único |
| descricao | string | [1] | + | Sim | O que é (1-2 frases, SRP) |
| atributos | Atributo[] | [1..*] | + | Sim | Propriedades |
| metodos | Metodo[] | [0..*] | + | Não | Ações |
| restricoes | Restricao[] | [0..*] | + | Não | Regras |
| relacoes | Relacao[] | [0..*] | + | Não | Conexões |
| diagrama | Diagrama | [1] | + | Sim | Visual (ver Diagrama.md) |
| frontmatter | Frontmatter | [1] | - | Sim | Metadados YAML |

### 4.3 Subtipos

#### Atributo

| Campo | Tipo | Visib. | Descrição |
|-------|------|--------|-----------|
| nome | string | + | Nome do atributo |
| tipo | string | + | Tipo de dado |
| cardinalidade | string | + | [1], [0..1], [1..*], [0..*] |
| visibilidade | enum | + | +público, -privado, #protegido |
| obrigatorio | boolean | + | Se é requerido |
| descricao | string | + | O que representa |

#### Restricao

| Campo | Tipo | Visib. | Descrição |
|-------|------|--------|-----------|
| codigo | string | + | Identificador (R1, R2...) |
| descricao | string | + | Regra em linguagem natural |
| validacao | string | + | Como verificar |

#### Relacao

| Campo | Tipo | Visib. | Descrição |
|-------|------|--------|-----------|
| tipo | enum | + | heranca, composicao, agregacao, associacao, dependencia |
| origem | Classe | + | Classe de origem |
| destino | Classe | + | Classe de destino |
| cardinalidade | string | + | Ex: [1], [0..*] |

### 4.4 Restrições

| Código | Restrição | Validação |
|--------|-----------|-----------|
| R1 | nome único | Buscar duplicatas |
| R2 | descricao 1-2 frases | SRP |
| R3 | diagrama obrigatório | diagrama != null |
| R4 | frontmatter obrigatório | frontmatter != null |
| R5 | atributos não vazio | atributos.length >= 1 |
| R6 | visibilidade em atributos | visibilidade ∈ {+, -, #} |
| R7 | métodos com I/O tipado | input/output tipados |

### 4.5 Métodos

#### identificarClasses(dominio: string): Classe[]

| Campo | Valor |
|-------|-------|
| Input | dominio: string |
| Output | Classe[] |
| Técnica | CRC Cards + Noun Analysis |

#### descobrirAtributos(classe: Classe): Atributo[]

| Campo | Valor |
|-------|-------|
| Input | classe: Classe |
| Output | Atributo[] |
| Técnica | Adjective Analysis |

#### descobrirMetodos(classe: Classe): Metodo[]

| Campo | Valor |
|-------|-------|
| Input | classe: Classe |
| Output | Metodo[] |
| Técnica | Verb Analysis |

#### definirRelacoes(classes: Classe[]): Relacao[]

| Campo | Valor |
|-------|-------|
| Input | classes: Classe[] |
| Output | Relacao[] |
| Tabela decisão | "é-um"→Herança, "tem-um dependente"→Composição, etc. |

#### validar(): boolean

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | boolean |
| Validações | R1-R7 + SOLID |

#### herdar(superclasse: Classe): Classe

| Campo | Valor |
|-------|-------|
| Input | superclasse: Classe |
| Output | Classe (nova subclasse) |

### 4.6 Herança no GENESIS

```
                              Classe
                                │
        ┌───────────┬───────────┼───────────┬───────────┐
        │           │           │           │           │
        ▼           ▼           ▼           ▼           ▼
    Problema    MarcoTeor.   Objeto    Documento   Diagrama
      (M0)        (M1)        (M2)       (M4)      (subtipo)
```

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_1_Diagrama | Subtipo |
| 00_E_1_1_Problema | Filho (herda) |
| 00_E_1_2_MarcoTeorico | Filho (herda) |
| 00_E_1_3_Objeto | Filho (herda) |
| 00_E_1_6_Documento | Filho (herda) / Ciclo de vida |

### Externas

| Fonte | Conceito |
|-------|----------|
| Booch (1994) | Classe, Objeto, Herança |
| Meyer (1988) | Encapsulamento |
| Gamma et al. (1995) | Composição, Agregação |
| Martin (2000) | SOLID |
| Beck & Cunningham (1989) | CRC Cards |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2024-11-27 | - | Criação |
| 2.0 | 2025-12-02 | - | Reestruturação com instruções |
| 3.0 | 2025-12-03 | 23:00 | Marco POO completo, SOLID, métodos descoberta |
| 3.1 | 2025-12-04 | 13:20 | **PADRONIZAÇÃO S004-E**: Adiciona M0-M2 explícitos. Status Publicado. 6 seções padrão. |

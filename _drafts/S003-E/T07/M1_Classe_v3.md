---
nome: M1_Classe_v3
versao: "1.0"
tipo: MarcoTeorico
classe_ref: MarcoTeorico
origem: interno
status: Draft
etapa: M1
data_inicio: 2025-12-03
sprint: S003-E
task: T07
problema_ref: M0_Classe_v3
---

# M1: Marco Teórico - Classe v3.0

## 1. Conexão com M0

| Campo M0 | Valor | Impacto em M1 |
|----------|-------|---------------|
| **Necessidade** | Aplicar M0-M4 recursivo com POO formal | Pesquisar fundamentos POO |
| **Causa Raiz** | S002-E focou em estrutura mínima | Aprofundar teoria |
| **Lacunas** | Sem marco teórico, sem métodos de descoberta | Foco da pesquisa |

---

## 2. Pesquisa Interna (Ontologia ZAZ)

### 2.1 Fonte: GENESIS.md

| Conceito | Definição Encontrada | Aplicação |
|----------|---------------------|-----------|
| POO | Estruturação por classes, atributos, métodos, herança. Objetos encapsulam estado e comportamento. | Base teórica para Classe |
| Recursividade | Sistema que opera sobre si mesmo. Output vira input do próximo ciclo. | Classe define Classe |
| Meta-Programação | Código/instruções que geram ou modificam código/instruções. | Classe é meta-estrutura |

### 2.2 Fonte: 00_E_1_4_Classe v2.0

| Conceito | Definição Encontrada | Lacuna Identificada |
|----------|---------------------|---------------------|
| Herança | Subclasses herdam atributos | Falta definição formal, exemplos |
| Atributos | Propriedades da classe | Falta método de descoberta |
| Métodos | Ações que a classe executa | Falta método de descoberta |

### 2.3 Lacunas não cobertas internamente

1. **Encapsulamento** - não definido
2. **Polimorfismo** - não definido
3. **Composição vs Agregação** - não definido
4. **SOLID** - não mencionado
5. **Método de descoberta de classes** - ausente

---

## 3. Pesquisa Externa

### 3.1 Conceitos POO Fundamentais

| Conceito | Definição | Fonte | Aplicação em GENESIS |
|----------|-----------|-------|---------------------|
| **Classe** | Abstração que define estrutura (atributos) e comportamento (métodos) de um tipo de objeto | Booch, 1994; Gamma et al., 1995 | Molde para todas entidades do sistema |
| **Objeto** | Instância de uma classe com estado e identidade próprios | Booch, 1994 | Entidades concretas do domínio |
| **Encapsulamento** | Ocultar implementação interna, expor apenas interface pública. Protege estado e reduz acoplamento | Meyer, 1988 | Atributos privados, métodos públicos |
| **Herança** | Mecanismo de reutilização onde subclasse herda estrutura e comportamento da superclasse (relação "é-um") | Booch, 1994 | Problema herda de Classe |
| **Polimorfismo** | Capacidade de tratar objetos de diferentes classes através de interface comum | Cardelli & Wegner, 1985 | Métodos aceitem subclasses |
| **Composição** | Relação "tem-um" forte. Parte não existe sem o todo. Ciclo de vida dependente | Gamma et al., 1995 | Documento tem Frontmatter |
| **Agregação** | Relação "tem-um" fraca. Parte pode existir independentemente do todo | Gamma et al., 1995 | Classe tem Métodos (existem independente) |

### 3.2 Princípios SOLID

| Princípio | Sigla | Definição | Aplicação em GENESIS |
|-----------|-------|-----------|---------------------|
| Single Responsibility | S | Uma classe deve ter apenas uma razão para mudar | Cada classe M0-M4 tem responsabilidade única |
| Open/Closed | O | Aberto para extensão, fechado para modificação | Herança permite extensão sem alterar base |
| Liskov Substitution | L | Subclasses devem ser substituíveis por suas superclasses | Problema pode ser usado onde Classe é esperada |
| Interface Segregation | I | Interfaces específicas são melhores que uma geral | Cada etapa M0-M4 tem interface própria |
| Dependency Inversion | D | Depender de abstrações, não de implementações | Classes dependem de Classe (abstrata) |

**Fonte:** Martin, Robert C. "Design Principles and Design Patterns" (2000)

### 3.3 Método de Descoberta de Classes (CRC)

| Técnica | Descrição | Aplicação |
|---------|-----------|-----------|
| **CRC Cards** | Class-Responsibility-Collaboration. Cartões identificam Nome, Responsabilidade, Colaboradores | Método para descobrirClasses() |
| **Noun Analysis** | Extrair substantivos do domínio como candidatos a classes | Primeiro passo de identificação |
| **Verb Analysis** | Extrair verbos como candidatos a métodos | descobrirMetodos() |
| **Adjective Analysis** | Extrair adjetivos como candidatos a atributos | descobrirAtributos() |

**Fonte:** Beck, Kent & Cunningham, Ward. "A Laboratory for Teaching OO Thinking" (OOPSLA 1989)

### 3.4 Relações entre Classes (UML)

| Relação | Símbolo UML | Semântica | Quando Usar |
|---------|-------------|-----------|-------------|
| **Herança** | ──▷ (seta vazada) | "é-um" (is-a) | Especialização com substituição |
| **Composição** | ◆── (diamante cheio) | "tem-um" forte | Parte dependente do todo |
| **Agregação** | ◇── (diamante vazio) | "tem-um" fraco | Parte independente |
| **Associação** | ─── (linha simples) | "usa" ou "conhece" | Relacionamento genérico |
| **Dependência** | - - -> (seta tracejada) | "depende de" | Uso temporário |

**Fonte:** OMG Unified Modeling Language Specification, v2.5.1 (2017)

---

## 4. Diagrama (Rede de Conceitos)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    REDE DE CONCEITOS: POO PARA GENESIS                      │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │    POO      │
                              │ (paradigma) │
                              └──────┬──────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           │                         │                         │
           ▼                         ▼                         ▼
    ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
    │ Encapsular  │          │   Herdar    │          │ Polimorfismo│
    │   Estado    │          │ Estrutura   │          │  Interface  │
    └──────┬──────┘          └──────┬──────┘          └──────┬──────┘
           │                        │                        │
           │                        │                        │
           ▼                        ▼                        ▼
    ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
    │  Atributos  │          │  Subclasse  │          │   Método    │
    │  (privados) │          │   "é-um"    │          │  (override) │
    └─────────────┘          └─────────────┘          └─────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
             ┌───────────┐   ┌───────────┐   ┌───────────┐
             │ Problema  │   │  Objeto   │   │ Documento │
             │  (M0)     │   │   (M2)    │   │   (M4)    │
             └───────────┘   └───────────┘   └───────────┘


                         RELAÇÕES "TEM-UM"

    ┌─────────────┐                              ┌─────────────┐
    │ Composição  │                              │ Agregação   │
    │  ◆── forte  │                              │  ◇── fraco  │
    └──────┬──────┘                              └──────┬──────┘
           │                                            │
           ▼                                            ▼
    ┌─────────────────────┐                  ┌─────────────────────┐
    │ Documento ◆── Frontmatter │            │ Classe ◇── Método   │
    │ (parte não existe    │                  │ (método pode existir│
    │  sem documento)      │                  │  independente)      │
    └─────────────────────┘                  └─────────────────────┘


                           SOLID

    ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
    │ S │───│ O │───│ L │───│ I │───│ D │
    └─┬─┘   └─┬─┘   └─┬─┘   └─┬─┘   └─┬─┘
      │       │       │       │       │
      ▼       ▼       ▼       ▼       ▼
    Single  Open/   Liskov  Interf  Depend
    Resp.   Closed  Subst.  Segreg  Invers
```

---

## 5. Conceitos Consolidados

| # | Conceito | Definição Operacional | Origem | Aplicação em Classe v3 |
|---|----------|----------------------|--------|------------------------|
| 1 | **Encapsulamento** | Ocultar implementação, expor interface. Atributos privados, métodos públicos. | Externa (Meyer) | Adicionar visibilidade em atributos |
| 2 | **Herança** | Relação "é-um". Subclasse herda e pode sobrescrever. | Interna + Externa | Detalhar com UML e exemplos |
| 3 | **Polimorfismo** | Tratar subclasses via interface comum. | Externa (Cardelli) | Métodos aceitam subclasses |
| 4 | **Composição** | "Tem-um" forte. Parte dependente do todo. | Externa (GoF) | Frontmatter em Documento |
| 5 | **Agregação** | "Tem-um" fraco. Parte independente. | Externa (GoF) | Método em Classe |
| 6 | **SOLID** | 5 princípios de design OO. | Externa (Martin) | Validar design de classes |
| 7 | **CRC Cards** | Técnica de descoberta: Nome, Responsabilidade, Colaborador. | Externa (Beck) | Método identificarClasses() |
| 8 | **Noun/Verb Analysis** | Substantivos→Classes, Verbos→Métodos, Adjetivos→Atributos. | Externa (Beck) | Métodos de descoberta |

---

## 6. Premissas

1. **POO é adequado** para modelar conhecimento epistemológico
2. **Classes do GENESIS são conceituais** (não ligadas a linguagem específica)
3. **Herança simples** é suficiente (sem herança múltipla)
4. **Composição sobre herança** quando possível (GoF)

---

## 7. Lacunas para M2/M3

| # | Lacuna | Impacto | Resolução |
|---|--------|---------|-----------|
| 1 | Falta definir escopo exato de Classe v3 | M2 | Delimitar fronteiras |
| 2 | Métodos de descoberta não especificados | M3 | Criar identificarClasses(), descobrirAtributos(), descobrirMetodos() |
| 3 | Visibilidade de atributos não padronizada | M3 | Definir convenção (+/-/#) |

---

## 8. Referências Conceituais

| Framework/Teoria | Descrição | Aplicação no GENESIS |
|------------------|-----------|---------------------|
| **UML 2.5** | Linguagem de modelagem unificada | Notação para diagramas de classe |
| **Design Patterns (GoF)** | Padrões de design OO reutilizáveis | Composição, relações entre classes |
| **SOLID** | Princípios de design OO | Validação de qualidade |
| **CRC Cards** | Técnica de descoberta de classes | Método para M3 |

---

## 9. Referências Bibliográficas

| Autor | Título | Ano | Conceitos |
|-------|--------|-----|-----------|
| Booch, Grady | *Object-Oriented Analysis and Design* | 1994 | Classe, Objeto, Herança |
| Meyer, Bertrand | *Object-Oriented Software Construction* | 1988 | Encapsulamento, Design by Contract |
| Gamma, Helm, Johnson, Vlissides | *Design Patterns* | 1995 | Composição, Agregação, Patterns |
| Cardelli, Wegner | *On Understanding Types, Data Abstraction, and Polymorphism* | 1985 | Polimorfismo |
| Martin, Robert C. | *Design Principles and Design Patterns* | 2000 | SOLID |
| Beck, Cunningham | *A Laboratory for Teaching OO Thinking* | 1989 | CRC Cards |
| OMG | *UML Specification 2.5.1* | 2017 | Notação UML |

---

## 10. Validação (S + P + C + R)

| Critério | Pergunta | Status |
|----------|----------|--------|
| **Seletividade** | Todos conceitos conectam ao Problema (POO para Classe)? | ✅ |
| **Profundidade** | Definições são operacionais (aplicáveis)? | ✅ |
| **Coerência** | Conceitos formam sistema articulado? | ✅ |
| **Rastreabilidade** | Todas fontes documentadas? | ✅ |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 21:30 | Criação. Marco teórico completo: POO (Encapsulamento, Herança, Polimorfismo, Composição, Agregação), SOLID, CRC Cards, UML. 8 conceitos consolidados. |

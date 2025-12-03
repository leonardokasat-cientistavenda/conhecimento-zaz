---
nome: 00_E_1_4_Classe
versao: "3.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_4_Classe

## 1. Definição

Classe é o molde que define estrutura (atributos) e comportamento (métodos) de objetos. Toda entidade do sistema GENESIS é instância de uma Classe.

---

## 2. Marco Teórico POO

### 2.1 Pilares da Orientação a Objetos

| Conceito | Definição | Notação | Aplicação em GENESIS |
|----------|-----------|---------|---------------------|
| **Encapsulamento** | Ocultar implementação interna, expor apenas interface pública | `+` público, `-` privado, `#` protegido | Atributos com visibilidade |
| **Herança** | Relação "é-um" (is-a). Subclasse herda estrutura e comportamento | `──▷` (seta vazada) | Problema herda de Classe |
| **Polimorfismo** | Tratar objetos de diferentes classes via interface comum | Métodos com mesmo nome | Métodos aceitam subclasses |
| **Abstração** | Representar apenas características essenciais | Classes abstratas | Classe é abstração de entidade |

### 2.2 Relações entre Classes

| Relação | Símbolo | Semântica | Força | Exemplo GENESIS |
|---------|---------|-----------|-------|-----------------|
| **Herança** | `──▷` | "é-um" | Forte | Problema ──▷ Classe |
| **Composição** | `◆──` | "tem-um" (parte dependente) | Forte | Documento ◆── Frontmatter |
| **Agregação** | `◇──` | "tem-um" (parte independente) | Fraca | Classe ◇── Metodo |
| **Associação** | `───` | "usa" ou "conhece" | Fraca | MarcoTeorico ─── Fonte |
| **Dependência** | `- ->` | "depende de" (temporário) | Fraca | Método - -> Input |

### 2.3 Princípios SOLID

| Princípio | Aplicação em Classe | Validação |
|-----------|---------------------|-----------|
| **S** - Single Responsibility | Uma classe, uma responsabilidade | Descrição em 1-2 frases |
| **O** - Open/Closed | Extensível via herança, fechada para modificação | Subclasses não alteram base |
| **L** - Liskov Substitution | Subclasses substituíveis | Métodos funcionam com subclasses |
| **I** - Interface Segregation | Interfaces específicas | Atributos coesos |
| **D** - Dependency Inversion | Depender de abstrações | Referências a Classe (não implementação) |

---

## 3. Atributos

| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| nome | string | [1] | + | Sim | Identificador único no sistema |
| descricao | string | [1] | + | Sim | O que é (1-2 frases, SRP) |
| atributos | Atributo[] | [1..*] | + | Sim | Propriedades da classe |
| metodos | Metodo[] | [0..*] | + | Não | Ações que a classe executa |
| restricoes | Restricao[] | [0..*] | + | Não | Regras de validação |
| relacoes | Relacao[] | [0..*] | + | Não | Conexões com outras classes |
| diagrama | Diagrama | [1] | + | Sim | Representação visual (ver 00_E_1_4_1_Diagrama) |
| frontmatter | Frontmatter | [1] | - | Sim | Metadados YAML (composição) |

**Diagrama: Caixa POO** (Metodologia: 3-Estrutural)

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
│  R6: visibilidade em atributos                                  │
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

### 3.1 Subtipos

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
| descricao | string | + | O que representa |

---

## 4. Restrições

| Código | Restrição | Tipo | Validação |
|--------|-----------|------|-----------|
| R1 | nome único no sistema | Integridade | Buscar duplicatas |
| R2 | descricao em 1-2 frases | SRP | Contar frases |
| R3 | diagrama obrigatório | Completude | diagrama != null |
| R4 | frontmatter obrigatório | Completude | frontmatter != null |
| R5 | atributos[] não vazio | Completude | atributos.length >= 1 |
| R6 | visibilidade em atributos | Encapsulamento | visibilidade ∈ {+, -, #} |
| R7 | métodos com I/O tipado | Polimorfismo | input/output são Classes |

---

## 5. Métodos de Descoberta

### 5.1 identificarClasses(dominio: string): Classe[]

**Descrição:** Descobre classes candidatas em um domínio usando CRC Cards e Noun Analysis.

| Campo | Valor |
|-------|-------|
| Input | dominio: string (descrição do domínio) |
| Output | Classe[] (lista de classes candidatas) |

**Diagrama: Fluxo** (Metodologia: 3-Estrutural)

```
┌─────────────────┐
│    DOMÍNIO      │
│  (texto livre)  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  1. EXTRAIR SUBSTANTIVOS (Noun Analysis)│
│     - Identificar todos os substantivos │
│     - Filtrar genéricos (coisa, item)   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  2. CRIAR CRC CARDS                     │
│     ┌─────────────────────────────┐     │
│     │ Nome: [Substantivo]         │     │
│     │ Responsabilidade: [?]       │     │
│     │ Colaboradores: [?]          │     │
│     └─────────────────────────────┘     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  3. FILTRAR CANDIDATOS                  │
│     - Tem responsabilidade própria? SIM │
│     - É atributo de outra classe? NÃO   │
│     - Precisa de estado próprio? SIM    │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Classe[]    │
         └───────────────┘
```

### 5.2 descobrirAtributos(classe: Classe): Atributo[]

**Descrição:** Extrai atributos usando Adjective Analysis e perguntas estruturadas.

| Campo | Valor |
|-------|-------|
| Input | classe: Classe (com nome e descrição) |
| Output | Atributo[] (lista de atributos) |

**Perguntas estruturadas:**
- O que IDENTIFICA esta classe?
- O que esta classe POSSUI?
- O que CARACTERIZA esta classe?
- Que ESTADO ela mantém?

### 5.3 descobrirMetodos(classe: Classe): Metodo[]

**Descrição:** Extrai métodos usando Verb Analysis e responsabilidades.

| Campo | Valor |
|-------|-------|
| Input | classe: Classe (com atributos definidos) |
| Output | Metodo[] (lista de métodos) |

**Perguntas estruturadas:**
- O que esta classe FAZ?
- Que AÇÕES ela executa?
- Como ela TRANSFORMA dados?
- O que ela PRODUZ?

### 5.4 definirRelacoes(classes: Classe[]): Relacao[]

**Descrição:** Identifica e classifica relações entre classes.

| Campo | Valor |
|-------|-------|
| Input | classes: Classe[] (lista de classes) |
| Output | Relacao[] (lista de relações) |

**Tabela de Decisão:**

| Pergunta | Resposta | Relação |
|----------|----------|---------|
| A "é um tipo de" B? | Sim | Herança `──▷` |
| A "contém" B e B não existe sem A? | Sim | Composição `◆──` |
| A "contém" B e B pode existir sem A? | Sim | Agregação `◇──` |
| A "usa" B em algum momento? | Sim | Associação `───` |
| A "precisa de" B apenas temporariamente? | Sim | Dependência `- ->` |

---

## 6. Métodos de Ciclo de Vida

### 6.1 instanciar(): Objeto

| Campo | Valor |
|-------|-------|
| Input | self (Classe validada) |
| Output | Objeto (instância da classe) |
| Pré-condição | validar() == true |

### 6.2 validar(): boolean

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | boolean |
| Validações | R1-R7 + SOLID |

### 6.3 herdar(superclasse: Classe): Classe

| Campo | Valor |
|-------|-------|
| Input | superclasse: Classe |
| Output | Classe (nova subclasse) |
| Pré-condição | superclasse.validar() == true |

---

## 7. Herança no GENESIS

**Diagrama: Árvore** (Metodologia: 3-Estrutural)

```
                              Classe
                                │
        ┌───────────┬───────────┼───────────┬───────────┬───────────┐
        │           │           │           │           │           │
        ▼           ▼           ▼           ▼           ▼           ▼
    Problema    MarcoTeor.   Objeto     Metodo    Documento   Diagrama
      (M0)        (M1)        (M2)       (M3)       (M4)      (subtipo)
```

| Herdado | Pode Sobrescrever |
|---------|-------------------|
| Atributos de Classe | Sim (adicionar novos) |
| Métodos de Classe | Sim (polimorfismo) |
| Restrições R1-R5 | Não (são base) |
| Diagrama padrão | Sim (diagrama específico) |

---

## 8. INSTRUÇÃO: Como criar uma Classe

### 8.1 Diagrama

Ver **00_E_1_4_1_Diagrama.md** para método de seleção.

**Diagramas recomendados para Classe (M3):**
- Primário: **Caixa POO** (estrutura de classe)
- Secundário: **Relações** (herança, composição)

### 8.2 Frontmatter (copiar e preencher)

```yaml
---
nome: [00_X_N_N_NomeDaClasse]
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---
```

### 8.3 Estrutura obrigatória

```markdown
# [Nome da Classe]

## 1. Definição
[1-2 frases - Single Responsibility]

## 2. Marco Teórico
[Se aplicável - conceitos que fundamentam]

## 3. Atributos
| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
[Tabela com visibilidade +/-/#]

## 4. Restrições
| Código | Restrição | Validação |
[Tabela com R1, R2...]

## 5. Métodos
### 5.1 nomeMetodo(input): output
| Campo | Valor |
[Especificação I/O]

## 6. Relações
| Tipo | Destino | Card. | Descrição |
[Herança, Composição, etc.]

## 7. Referências
| Documento | Relação |

## Histórico
| Versão | Data | Hora | Alteração |
```

### 8.4 Checklist SOLID

- [ ] **S**: Descrição em 1-2 frases (responsabilidade única)
- [ ] **O**: Extensível via herança sem modificar base
- [ ] **L**: Subclasses substituíveis pela superclasse
- [ ] **I**: Atributos coesos (sem atributos irrelevantes)
- [ ] **D**: Referências a Classes abstratas (não implementações)

### 8.5 Persistência

**Ao finalizar M3, persistir o documento:**

1. Criar arquivo `M3_[Nome].md` em `_drafts/SPRINT/TXX/`
2. Preencher frontmatter com `etapa: M3`
3. Commit com mensagem: `[C3] add: M3 [Nome] - especificação POO`

Ver: **00_E_1_6_Documento.md** (ciclo de vida e persistência)

---

## 9. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_1_Diagrama | Subtipo (seleção de diagramas) |
| 00_E_1_1_Problema | Filho (herda) |
| 00_E_1_2_MarcoTeorico | Filho (herda) |
| 00_E_1_3_Objeto | Filho (herda) |
| 00_E_1_5_Metodo | Filho (herda) |
| 00_E_1_6_Documento | Filho (herda) / Ciclo de vida |

### Referências Externas

| Fonte | Conceito utilizado |
|-------|-------------------|
| Booch, Grady. *OO Analysis and Design* (1994) | Classe, Objeto, Herança |
| Meyer, Bertrand. *OO Software Construction* (1988) | Encapsulamento |
| Gamma et al. *Design Patterns* (1995) | Composição, Agregação |
| Martin, Robert C. *SOLID Principles* (2000) | SOLID |
| Beck & Cunningham. *CRC Cards* (1989) | Método de descoberta |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2024-11-27 | - | Criação |
| 2.0 | 2025-12-02 | - | Reestruturação com instruções, herança e polimorfismo |
| 3.0 | 2025-12-03 | 23:00 | M0-M4 recursivo completo. Marco teórico POO (pilares, relações, SOLID). 4 métodos de descoberta (identificarClasses, descobrirAtributos, descobrirMetodos, definirRelacoes). Subtipos (Atributo, Restricao, Relacao). 7 restrições. Visibilidade (+/-/#). Instruções de diagrama e persistência. |

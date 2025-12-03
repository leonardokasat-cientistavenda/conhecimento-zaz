---
nome: M3_Classe_v3
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
etapa: M3
data_inicio: 2025-12-03
sprint: S003-E
task: T07
problema_ref: M0_Classe_v3
marco_ref: M1_Classe_v3
objeto_ref: M2_Classe_v3
---

# M3: Especificação POO - Classe v3.0

## 1. Conexão com M2

| Campo M2 | Valor | Impacto em M3 |
|----------|-------|---------------|
| **Escopo** | 10 itens (marco teórico, métodos, visibilidade, relações) | Estrutura do documento |
| **Critérios Sucesso** | 6 CS verificáveis | Validação final |
| **Output esperado** | Estrutura de 9 seções | Template M3 |

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

## 3. Classe: Classe (Meta-definição)

### 3.1 Diagrama UML

```
┌─────────────────────────────────────────────────────────────────┐
│                         «class»                                 │
│                          Classe                                 │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                      [1]                        │
│  - descricao: string                 [1]                        │
│  - atributos: Atributo[]             [1..*]                     │
│  - metodos: Metodo[]                 [0..*]                     │
│  - restricoes: Restricao[]           [0..*]                     │
│  - relacoes: Relacao[]               [0..*]                     │
│  - diagrama: string                  [1]                        │
│  - frontmatter: Frontmatter          [1]      ◆── composição    │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - R1: nome único no sistema                                    │
│  - R2: descricao em 1-2 frases (SRP)                            │
│  - R3: diagrama obrigatório                                     │
│  - R4: frontmatter obrigatório                                  │
│  - R5: atributos[] não vazio                                    │
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
         │
         │ herança ──▷
         │
    ┌────┴────┬──────────┬──────────┬──────────┬──────────┐
    ▼         ▼          ▼          ▼          ▼          ▼
┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐
│Problema││Marco   ││ Objeto ││ Metodo ││Document││Framework│
│  (M0)  ││Teorico ││  (M2)  ││  (M3)  ││  (M4)  ││        │
└────────┘│  (M1)  │└────────┘└────────┘└────────┘└────────┘
          └────────┘
```

### 3.2 Atributos Detalhados

| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| nome | string | 1 | + | Sim | Identificador único no sistema |
| descricao | string | 1 | + | Sim | O que é (1-2 frases, SRP) |
| atributos | Atributo[] | 1..* | + | Sim | Propriedades da classe |
| metodos | Metodo[] | 0..* | + | Não | Ações que a classe executa |
| restricoes | Restricao[] | 0..* | + | Não | Regras de validação |
| relacoes | Relacao[] | 0..* | + | Não | Conexões com outras classes |
| diagrama | string | 1 | + | Sim | ASCII/UML da estrutura |
| frontmatter | Frontmatter | 1 | - | Sim | Metadados YAML (composição) |

### 3.3 Subtipos

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

## 4. Métodos de Descoberta

### 4.1 identificarClasses(dominio: string): Classe[]

**Descrição:** Descobre classes candidatas em um domínio usando CRC Cards e Noun Analysis.

| Campo | Valor |
|-------|-------|
| Input | dominio: string (descrição do domínio) |
| Output | Classe[] (lista de classes candidatas) |
| Pré-condição | domínio descrito em linguagem natural |
| Pós-condição | Cada classe tem nome e descrição |

**Processo (CRC Cards + Noun Analysis):**

```
┌─────────────────────────────────────────────────────────────────┐
│                    identificarClasses()                         │
└─────────────────────────────────────────────────────────────────┘

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
│     Para cada substantivo candidato:    │
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
┌─────────────────────────────────────────┐
│  4. DEFINIR DESCRIÇÃO                   │
│     - 1-2 frases (SRP)                  │
│     - O que É, não o que FAZ            │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Classe[]    │
         └───────────────┘
```

**Exemplo:**

| Domínio | Substantivos | Classes Identificadas |
|---------|--------------|----------------------|
| "Sistema de vendas com clientes, produtos e pedidos" | clientes, produtos, pedidos, sistema, vendas | Cliente, Produto, Pedido |

---

### 4.2 descobrirAtributos(classe: Classe): Atributo[]

**Descrição:** Extrai atributos de uma classe usando Adjective Analysis e perguntas estruturadas.

| Campo | Valor |
|-------|-------|
| Input | classe: Classe (com nome e descrição) |
| Output | Atributo[] (lista de atributos) |
| Pré-condição | classe.nome != null, classe.descricao != null |
| Pós-condição | Cada atributo tem tipo e visibilidade |

**Processo (Adjective Analysis):**

```
┌─────────────────────────────────────────────────────────────────┐
│                    descobrirAtributos()                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│     CLASSE      │
│ (nome+descrição)│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  1. PERGUNTAS ESTRUTURADAS              │
│     - O que IDENTIFICA esta classe?     │
│     - O que esta classe POSSUI?         │
│     - O que CARACTERIZA esta classe?    │
│     - Que ESTADO ela mantém?            │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  2. ADJECTIVE ANALYSIS                  │
│     - Extrair adjetivos da descrição    │
│     - Adjetivos → atributos candidatos  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  3. DEFINIR TIPO                        │
│     - string, int, boolean, date        │
│     - Classe[] (para coleções)          │
│     - OutraClasse (para relações)       │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  4. DEFINIR VISIBILIDADE                │
│     + público: acessível externamente   │
│     - privado: apenas interno           │
│     # protegido: herança                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  5. DEFINIR CARDINALIDADE               │
│     [1]: obrigatório, único             │
│     [0..1]: opcional, único             │
│     [1..*]: obrigatório, múltiplo       │
│     [0..*]: opcional, múltiplo          │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │  Atributo[]   │
         └───────────────┘
```

---

### 4.3 descobrirMetodos(classe: Classe): Metodo[]

**Descrição:** Extrai métodos de uma classe usando Verb Analysis e responsabilidades.

| Campo | Valor |
|-------|-------|
| Input | classe: Classe (com atributos definidos) |
| Output | Metodo[] (lista de métodos) |
| Pré-condição | classe.atributos != null |
| Pós-condição | Cada método tem input e output tipados |

**Processo (Verb Analysis):**

```
┌─────────────────────────────────────────────────────────────────┐
│                    descobrirMetodos()                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│     CLASSE      │
│  (com atributos)│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  1. PERGUNTAS ESTRUTURADAS              │
│     - O que esta classe FAZ?            │
│     - Que AÇÕES ela executa?            │
│     - Como ela TRANSFORMA dados?        │
│     - O que ela PRODUZ?                 │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  2. VERB ANALYSIS                       │
│     - Extrair verbos do domínio         │
│     - Verbos → métodos candidatos       │
│     - Formato: verboObjeto()            │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  3. DEFINIR INPUT/OUTPUT                │
│     - Input: o que recebe (Classe)      │
│     - Output: o que retorna (Classe)    │
│     - void se não retorna               │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  4. MÉTODOS PADRÃO (sempre considerar)  │
│     + validar(): boolean                │
│     + criar(): Classe                   │
│     + atualizar(): Classe               │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Metodo[]    │
         └───────────────┘
```

---

### 4.4 definirRelacoes(classes: Classe[]): Relacao[]

**Descrição:** Identifica e classifica relações entre classes.

| Campo | Valor |
|-------|-------|
| Input | classes: Classe[] (lista de classes) |
| Output | Relacao[] (lista de relações) |
| Pré-condição | classes.length >= 2 |
| Pós-condição | Relações classificadas por tipo |

**Processo:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    definirRelacoes()                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│   CLASSES[]     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  1. PARA CADA PAR DE CLASSES            │
│     Classe A × Classe B                 │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  2. PERGUNTAS DE CLASSIFICAÇÃO          │
│                                         │
│  A "é um" B?                            │
│  └─► SIM: HERANÇA (──▷)                 │
│                                         │
│  A "tem um" B?                          │
│  └─► B existe sem A?                    │
│      └─► NÃO: COMPOSIÇÃO (◆──)          │
│      └─► SIM: AGREGAÇÃO (◇──)           │
│                                         │
│  A "usa" B?                             │
│  └─► SIM: ASSOCIAÇÃO (───)              │
│                                         │
│  A "depende de" B temporariamente?      │
│  └─► SIM: DEPENDÊNCIA (- ->)            │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  3. DEFINIR CARDINALIDADE               │
│     - A [1] ─── [0..*] B                │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Relacao[]   │
         └───────────────┘
```

**Tabela de Decisão:**

| Pergunta | Resposta | Relação |
|----------|----------|---------|
| A "é um tipo de" B? | Sim | Herança `──▷` |
| A "contém" B e B não existe sem A? | Sim | Composição `◆──` |
| A "contém" B e B pode existir sem A? | Sim | Agregação `◇──` |
| A "usa" B em algum momento? | Sim | Associação `───` |
| A "precisa de" B apenas temporariamente? | Sim | Dependência `- ->` |

---

## 5. Métodos de Ciclo de Vida

### 5.1 instanciar(): Objeto

| Campo | Valor |
|-------|-------|
| Input | self (Classe validada) |
| Output | Objeto (instância da classe) |
| Pré-condição | validar() == true |

### 5.2 validar(): boolean

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | boolean |
| Validações | R1-R5 + SOLID |

**Checklist de Validação:**

| # | Verificação | Regra |
|---|-------------|-------|
| 1 | Nome único | R1 |
| 2 | Descrição 1-2 frases | R2 (SRP) |
| 3 | Diagrama presente | R3 |
| 4 | Frontmatter presente | R4 |
| 5 | Atributos não vazios | R5 |
| 6 | Single Responsibility | SOLID-S |
| 7 | Subclasses substituíveis | SOLID-L |

### 5.3 herdar(superclasse: Classe): Classe

| Campo | Valor |
|-------|-------|
| Input | superclasse: Classe |
| Output | Classe (nova subclasse) |
| Pré-condição | superclasse.validar() == true |
| Pós-condição | subclasse herda atributos e métodos |

---

## 6. Restrições Consolidadas

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

## 7. Herança no GENESIS

### 7.1 Hierarquia de Classes Epistemológicas

```
                              Classe
                                │
        ┌───────────┬───────────┼───────────┬───────────┬───────────┐
        │           │           │           │           │           │
        ▼           ▼           ▼           ▼           ▼           ▼
    Problema    MarcoTeor.   Objeto     Metodo    Documento   Framework
      (M0)        (M1)        (M2)       (M3)       (M4)
        │
        │ herda
        ▼
    [Subclasses específicas de domínio]
```

### 7.2 O que Subclasses Herdam

| Herdado | Pode Sobrescrever |
|---------|-------------------|
| Atributos de Classe | Sim (adicionar novos) |
| Métodos de Classe | Sim (polimorfismo) |
| Restrições R1-R5 | Não (são base) |
| Diagrama padrão | Sim (diagrama específico) |

---

## 8. Template Atualizado

### 8.1 Frontmatter

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

### 8.2 Estrutura do Documento

```markdown
# [Nome da Classe]

## 1. Definição
[1-2 frases - Single Responsibility]

## 2. Marco Teórico
[Se aplicável - conceitos que fundamentam]

## 3. Atributos
| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| nome | string | [1] | + | Sim | ... |

## 4. Diagrama
```
[Caixa POO com visibilidade]
```

## 5. Restrições
| Código | Restrição | Validação |
|--------|-----------|-----------|

## 6. Métodos
### 6.1 nomeMetodo(input): output
| Campo | Valor |
|-------|-------|
| Input | ... |
| Output | ... |

## 7. Relações
| Tipo | Destino | Card. | Descrição |
|------|---------|-------|-----------|
| ──▷ herança | Classe | [1] | ... |

## 8. Referências
| Documento | Relação |
|-----------|---------|

## Histórico
| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
```

### 8.3 Checklist SOLID

- [ ] **S**: Descrição em 1-2 frases (responsabilidade única)
- [ ] **O**: Extensível via herança sem modificar base
- [ ] **L**: Subclasses substituíveis pela superclasse
- [ ] **I**: Atributos coesos (sem atributos irrelevantes)
- [ ] **D**: Referências a Classes abstratas (não implementações)

---

## 9. Validação de Critérios de Sucesso (M2)

| # | Critério | Status | Evidência |
|---|----------|--------|-----------|
| CS1 | Marco teórico POO completo | ✅ | Seção 2 |
| CS2 | 4 métodos de descoberta | ✅ | Seção 4 (4.1-4.4) |
| CS3 | Visibilidade padronizada | ✅ | Seção 3.2 (+/-/#) |
| CS4 | Relações UML documentadas | ✅ | Seção 2.2 e 4.4 |
| CS5 | SOLID como validação | ✅ | Seção 2.3 e 8.3 |
| CS6 | Sincronizado com E_1_5 | ✅ | Métodos com I/O tipado |

**Resultado:** Todos os 6 critérios atendidos → Pronto para M4

---

## 10. Referências

| Documento | Relação |
|-----------|---------|
| M0_Classe_v3.md | Problema de origem |
| M1_Classe_v3.md | Marco teórico |
| M2_Classe_v3.md | Objeto delimitado |
| 00_E_1_4_Classe v2.0 | Versão atual |
| 00_E_1_5_Metodo | Sincronização |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 22:00 | Criação. M3 completo: marco teórico POO (pilares, relações, SOLID), diagrama UML, atributos com visibilidade, 4 métodos de descoberta (identificarClasses, descobrirAtributos, descobrirMetodos, definirRelacoes), 3 métodos ciclo de vida, 7 restrições, template atualizado, checklist SOLID. |

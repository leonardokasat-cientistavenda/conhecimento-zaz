---
nome: 00_E_1_7_Schema_TDD
versao: "1.0"
tipo: Conceito
classe_ref: Epistemologia
origem: interno
status: Publicado
etapa: M4
sprint_ref: S019
task_ref: T02
camada: C3
---

# Schema TDD v1.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Schema TDD** | Estrutura que define O QUE testar (comportamento funcional) |
| **Classe de Equivalência** | Partição de valores com comportamento equivalente |
| **Critério de Aceite** | Comportamento esperado em Given/When/Then |
| **Cobertura** | Estratégia de combinação (cartesiano, pairwise, manual) |
| **Partição Válida** | Valores dentro do domínio esperado |
| **Partição Inválida** | Valores fora do domínio (testes negativos) |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como Epistemologia especifica O QUE testar de forma que PROMETHEUS        │
│   possa gerar testes automaticamente antes do código?"                      │
│                                                                             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │  TESTES AD-HOC        │  │  COBERTURA INCOMPLETA │  │  ACOPLAMENTO    │  │
│  │  Cada dev inventa     │  │  Só testa happy path  │  │  Spec misturada │  │
│  │  casos sem método     │  │  Esquece edge cases   │  │  com código     │  │
│  └───────────────────────┘  └───────────────────────┘  └─────────────────┘  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO                                        │
│                                                                             │
│  Schema TDD: contrato comportamental entre Epistemologia e PROMETHEUS       │
│                                                                             │
│  Epistemologia (M3.*)  ────►  Schema TDD  ────►  PROMETHEUS                 │
│  "O QUE testar"               Contrato          "COMO testar"               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Schema TDD é o contrato comportamental entre Epistemologia e PROMETHEUS que define O QUE testar, permitindo geração automática de testes antes do código.**
>
> - **classes_equivalencia**: partições de valores por atributo
> - **criterios_aceite**: comportamentos por método (Given/When/Then)
> - **cobertura**: estratégia de combinação
> - **combinacoes_estimadas**: hint para Spec Recursos (BKL-R01)
>
> **Escopo:** Apenas comportamento funcional. Recursos ficam em Spec Recursos (BKL-R01).

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TEST-DRIVEN DEVELOPMENT (TDD)                            │
│                    Kent Beck, 2003                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Ciclo: RED → GREEN → REFACTOR                                              │
│                                                                             │
│  1. RED: Escrever teste que falha (comportamento desejado)                  │
│  2. GREEN: Implementar mínimo para passar                                   │
│  3. REFACTOR: Melhorar sem quebrar testes                                   │
│                                                                             │
│  Aplicação: Schema TDD define o RED antes de qualquer código                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    PARTICIONAMENTO DE EQUIVALÊNCIA                          │
│                    Glenford Myers, 1979                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Princípio: Dividir domínio em classes onde todos os valores                │
│             devem ter comportamento equivalente                             │
│                                                                             │
│  Exemplo: idade (int)                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Partição         │ Valores      │ Válida │ Comportamento          │   │
│  ├───────────────────┼──────────────┼────────┼────────────────────────┤   │
│  │  Negativo         │ -1, -100     │ ❌     │ Erro: idade inválida   │   │
│  │  Zero             │ 0            │ ❌     │ Erro: idade inválida   │   │
│  │  Menor de idade   │ 1-17         │ ✓      │ Requer responsável     │   │
│  │  Maior de idade   │ 18-120       │ ✓      │ Acesso completo        │   │
│  │  Inválido alto    │ 121+         │ ❌     │ Erro: idade inválida   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Aplicação: classes_equivalencia no Schema TDD                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    BEHAVIOR-DRIVEN DEVELOPMENT (BDD)                        │
│                    Dan North, 2006                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Formato: Given / When / Then                                               │
│                                                                             │
│  Given: Contexto inicial (pré-condições)                                    │
│  When:  Ação executada (trigger)                                            │
│  Then:  Resultado esperado (asserção)                                       │
│                                                                             │
│  Aplicação: criterios_aceite no Schema TDD                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    ESTRATÉGIAS DE COBERTURA                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CARTESIANO: Todas as combinações. Explosão k^n. Sistemas críticos.         │
│  PAIRWISE: Cada par aparece 1x. ~k² casos. 70% bugs são 2-way.              │
│  MANUAL: Seleção explícita. Conhecimento de domínio.                        │
│                                                                             │
│  Aplicação: cobertura no Schema TDD                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Referências

| Conceito | Fonte | Aplicação |
|----------|-------|-----------|
| **TDD** | Kent Beck (2003) | Definir comportamento antes do código |
| **Particionamento** | Glenford Myers (1979) | classes_equivalencia por atributo |
| **BDD** | Dan North (2006) | criterios_aceite em Given/When/Then |
| **Pairwise** | Kuhn et al. (2004) | cobertura otimizada (70% bugs são 2-way) |
| **Boundary Analysis** | Myers (1979) | Valores nas fronteiras das partições |

### 2.3 Fórmula de Combinações

```
CARTESIANO:  combinacoes = Π (|partições_i|)
PAIRWISE:    combinacoes ≈ max(|partições|)²
MANUAL:      combinacoes = |casos_manual|
```

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| É | NÃO É |
|---|-------|
| Contrato comportamental | Spec de recursos (BKL-R01) |
| Define O QUE testar | Define COMO implementar |
| Agnóstico à linguagem | Código executável |
| Produzido por Epistemologia | Produzido por PROMETHEUS |
| Input para geração de testes | O teste em si (.py, .feature) |
| Estrutura de dados (JSON/YAML) | Documentação narrativa |
| Reutilizável entre vertentes | Específico por tecnologia |

### 3.2 Relações

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RELAÇÕES DO SCHEMA TDD                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         ┌─────────────────┐                                 │
│                         │   MS_Produto    │                                 │
│                         │   (Feature)     │                                 │
│                         └────────┬────────┘                                 │
│                                  │ solicita                                 │
│                                  ▼                                          │
│                         ┌─────────────────┐                                 │
│                         │  Epistemologia  │                                 │
│                         │  (M3.*)         │                                 │
│                         └────────┬────────┘                                 │
│                                  │ produz                                   │
│                                  ▼                                          │
│                         ┌─────────────────┐                                 │
│                         │   SCHEMA TDD    │                                 │
│                         └────────┬────────┘                                 │
│                                  │ consumido por                            │
│                                  ▼                                          │
│                         ┌─────────────────┐                                 │
│                         │   PROMETHEUS    │                                 │
│                         │   (Workers)     │                                 │
│                         └────────┬────────┘                                 │
│                                  │ gera                                     │
│                                  ▼                                          │
│                    ┌─────────────────────────────┐                          │
│                    │  test_.py  │  .feature      │                          │
│                    └─────────────────────────────┘                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3)

### 4.1 Diagrama da Classe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SCHEMA TDD                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│                                                                             │
│  + classe_ref: string                    # Referência à Classe              │
│  + classes_equivalencia: ClasseEquivalencia[]                               │
│  + criterios_aceite: CriterioAceite[]                                       │
│  + cobertura: "cartesiano" | "pairwise" | "manual"                          │
│  + combinacoes_estimadas: number         # Hint para Spec Recursos          │
│  + casos_manual?: CasoManual[]           # Se cobertura = "manual"          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Tipos Compostos                                                            │
│  ───────────────                                                            │
│                                                                             │
│  ClasseEquivalencia = {                                                     │
│    atributo: string,                     # Nome do atributo                 │
│    tipo: string,                         # Tipo (int, string, etc.)         │
│    particoes: Particao[]                                                    │
│  }                                                                          │
│                                                                             │
│  Particao = {                                                               │
│    nome: string,                         # Ex: "idade_negativa"             │
│    valores_exemplo: any[],               # Valores representativos          │
│    valida: boolean,                      # true = válida                    │
│    fronteira?: any[]                     # Boundary values                  │
│  }                                                                          │
│                                                                             │
│  CriterioAceite = {                                                         │
│    id: string,                           # Ex: "CA01"                       │
│    metodo: string,                       # Método sendo testado             │
│    given: string,                        # Pré-condição                     │
│    when: string,                         # Ação                             │
│    then: string,                         # Resultado esperado               │
│    particoes_ref?: string[]              # Partições usadas                 │
│  }                                                                          │
│                                                                             │
│  CasoManual = {                                                             │
│    id: string,                                                              │
│    descricao: string,                    # Por que é importante             │
│    valores: Record<string, any>,         # Valor por atributo               │
│    resultado_esperado: string                                               │
│  }                                                                          │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│                                                                             │
│  + calcular_combinacoes(): number                                           │
│  + validar(): ValidationResult                                              │
│  + gerar_matriz_teste(): MatrizTeste                                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│                                                                             │
│  R1: Todo atributo deve ter ≥1 partição válida                              │
│  R2: Todo atributo deve ter ≥1 partição inválida                            │
│  R3: Todo método público deve ter ≥1 critério de aceite                     │
│  R4: Se cobertura = "manual", casos_manual não pode ser vazio               │
│  R5: combinacoes_estimadas deve ser calculado                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Método: calcular_combinacoes()

```
SE cobertura == "cartesiano":
   resultado = 1
   PARA CADA ce EM classes_equivalencia:
      resultado *= ce.particoes.length
   RETORNA resultado

SE cobertura == "pairwise":
   max_particoes = MAX(ce.particoes.length)
   RETORNA max_particoes²

SE cobertura == "manual":
   RETORNA casos_manual.length
```

### 4.3 Método: validar()

```
validacoes:
  1. PARA CADA atributo da Classe:
     - DEVE existir ClasseEquivalencia
     - DEVE ter ≥1 partição válida
     - DEVE ter ≥1 partição inválida

  2. PARA CADA método público:
     - DEVE ter ≥1 CriterioAceite

  3. SE cobertura == "manual":
     - casos_manual NÃO PODE ser vazio

  4. combinacoes_estimadas > 0
```

---

## 5. Exemplo Concreto

```yaml
# Schema TDD para Classe Usuario

classe_ref: "Usuario"

classes_equivalencia:
  - atributo: "idade"
    tipo: "int"
    particoes:
      - nome: "negativa"
        valores_exemplo: [-1, -100]
        valida: false
      - nome: "zero"
        valores_exemplo: [0]
        valida: false
      - nome: "menor_idade"
        valores_exemplo: [1, 10, 17]
        valida: true
        fronteira: [1, 17]
      - nome: "maior_idade"
        valores_exemplo: [18, 30, 65, 120]
        valida: true
        fronteira: [18, 120]
      - nome: "invalida_alta"
        valores_exemplo: [121, 200]
        valida: false
        fronteira: [121]

  - atributo: "email"
    tipo: "string"
    particoes:
      - nome: "valido"
        valores_exemplo: ["user@domain.com", "a@b.co"]
        valida: true
      - nome: "sem_arroba"
        valores_exemplo: ["userdomain.com"]
        valida: false
      - nome: "vazio"
        valores_exemplo: ["", null]
        valida: false

criterios_aceite:
  - id: "CA01"
    metodo: "criar"
    given: "dados válidos (idade=25, email=user@test.com)"
    when: "criar() é chamado"
    then: "Usuario é criado com sucesso"
    particoes_ref: ["maior_idade", "valido"]

  - id: "CA02"
    metodo: "criar"
    given: "idade negativa (idade=-5)"
    when: "criar() é chamado"
    then: "lança ValidationError com mensagem 'Idade inválida'"
    particoes_ref: ["negativa"]

  - id: "CA03"
    metodo: "criar"
    given: "email sem arroba (email=invalid)"
    when: "criar() é chamado"
    then: "lança ValidationError com mensagem 'Email inválido'"
    particoes_ref: ["sem_arroba"]

  - id: "CA04"
    metodo: "pode_acessar_conteudo_adulto"
    given: "Usuario com idade=17"
    when: "pode_acessar_conteudo_adulto() é chamado"
    then: "retorna false"
    particoes_ref: ["menor_idade"]

  - id: "CA05"
    metodo: "pode_acessar_conteudo_adulto"
    given: "Usuario com idade=18"
    when: "pode_acessar_conteudo_adulto() é chamado"
    then: "retorna true"
    particoes_ref: ["maior_idade"]

cobertura: "pairwise"

combinacoes_estimadas: 25  # 5² (max partições = 5)
```

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_1_4_Classe.md | M3 da Epistemologia usa Schema TDD |
| docs/00_E/00_E_Epistemologia.md | Framework pai |
| _backlog/BKL-R01_Spec_Recursos.md | Complemento: recursos e estimativa |
| genesis/PROMETHEUS.md | Consumidor: gera testes a partir do Schema |

### Externas

| Referência | Aplicação |
|------------|-----------|
| Kent Beck, "Test-Driven Development" (2003) | Ciclo RED-GREEN-REFACTOR |
| Glenford Myers, "The Art of Software Testing" (1979) | Particionamento de equivalência |
| Dan North, "Introducing BDD" (2006) | Given/When/Then |
| Kuhn et al., "Software Fault Interactions" (2004) | Pairwise testing |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | **Publicação M4.** Schema TDD como contrato comportamental entre Epistemologia e PROMETHEUS. Aplicado M0-M4 reflexivamente. Sprint S019/T02. |

---
nome: Template M3.E - POO
id: template_spec_poo
versao: "1.0"
tipo: Template
vertente: M3.E
origem: interno
status: Publicado
etapa: M4
sprint_ref: S019
task_ref: T03
camada: C3
artefatos_produzidos:
  - ".py"
  - "test_.py"
  - ".feature"
schema_tdd_obrigatorio: true
---

# Template M3.E - Especificação POO v1.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Template M3.E** | Modelo de especificação para vertente Estrutural (POO) |
| **Vertente Estrutural** | Especificação de código orientado a objetos |
| **POO** | Programação Orientada a Objetos (Python, TypeScript, Java) |
| **Artefatos** | Outputs gerados: .py, test_.py, .feature |

### 1.2 Tese

> **Template M3.E é conhecimento catalogado que ensina Epistemologia a especificar Classes para implementação em código orientado a objetos.**
>
> - **Artefatos produzidos:** .py (ou .ts, .java), test_.py, .feature
> - **Schema TDD:** classes_equivalencia + criterios_aceite obrigatórios
> - **Instruções:** passos para extrair spec completa da Classe
>
> **Persistência:** Conforme Epistemologia_Arquitetura.md

---

## 2. Marco Teórico (M1)

### 2.1 Referências

| Conceito | Fonte | Aplicação |
|----------|-------|-----------|
| **POO** | Booch, Rumbaugh, Jacobson | Estrutura: Classe, Atributos, Métodos |
| **SOLID** | Robert C. Martin | Checklist de validação |
| **Design by Contract** | Bertrand Meyer (1986) | Pré/Pós-condições → Given/Then |
| **Type Hints** | PEP 484, TypeScript | Tipos obrigatórios |
| **Schema TDD** | 00_E_1_7_Schema_TDD.md | Estrutura de testes |

### 2.2 Mapeamento POO → Schema TDD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ELEMENTO POO              │  ELEMENTO SCHEMA TDD                           │
│  ──────────────────────────┼──────────────────────────────────────────────  │
│  Atributo                  │  ClasseEquivalencia (partições por atributo)   │
│  Tipo do atributo          │  ClasseEquivalencia.tipo                       │
│  Restrições do atributo    │  Particao (válida/inválida)                    │
│  Valores de fronteira      │  Particao.fronteira                            │
│  Método                    │  CriterioAceite.metodo                         │
│  Pré-condição              │  CriterioAceite.given                          │
│  Ação                      │  CriterioAceite.when                           │
│  Pós-condição              │  CriterioAceite.then                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| É | NÃO É |
|---|-------|
| Instruções para especificar POO | A spec em si |
| Conhecimento catalogado | Código executável |
| Checklist de elementos obrigatórios | Implementação do PROMETHEUS |
| Agnóstico à linguagem (POO genérico) | Específico para Python/TS/Java |
| Define O QUE extrair da Classe M3 | Define COMO gerar código |
| Reutilizável para qualquer Classe | Específico para uma Classe |

### 3.2 Relações

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Catálogo ──indexa──► TEMPLATE M3.E ◄──consulta── Epistemologia (M3)        │
│                             │                                               │
│                             │ produz                                        │
│                             ▼                                               │
│                       SPEC (POO)                                            │
│                       com Schema TDD                                        │
│                             │                                               │
│                             │ consumida por                                 │
│                             ▼                                               │
│                       PROMETHEUS (Worker_E)                                 │
│                             │                                               │
│                             │ gera                                          │
│                             ▼                                               │
│                   .py  │  test_.py  │  .feature                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3)

### 4.1 Elementos Obrigatórios

| Elemento | Descrição | Mapeamento Schema TDD |
|----------|-----------|----------------------|
| **classe_nome** | Nome da classe | schema_tdd.classe_ref |
| **atributos[]** | nome, tipo, visibilidade, restricoes | schema_tdd.classes_equivalencia[] |
| **metodos[]** | nome, parametros, retorno, comportamento | schema_tdd.criterios_aceite[] |
| **dependencias[]** | Outras classes que esta usa | (informativo) |
| **heranca?** | Classe pai se houver | (informativo) |
| **invariantes[]** | Regras sempre verdadeiras | Informam partições |

### 4.2 Instruções de Aplicação

#### PASSO 1: EXTRAIR ATRIBUTOS

```
Entrada: Classe M3 (diagrama de classe)
Ação: Para cada atributo, identificar nome, tipo, restrições
Saída: Lista de atributos tipados

Exemplo:
  Diagrama: Usuario { idade: int, email: string }
  Extraído: [
    {nome: "idade", tipo: "int", restricoes: [">=0", "<=150"]},
    {nome: "email", tipo: "string", restricoes: ["formato email"]}
  ]
```

#### PASSO 2: GERAR CLASSES DE EQUIVALÊNCIA

```
Entrada: Lista de atributos tipados
Ação: Para cada atributo, criar partições válidas e inválidas
Saída: schema_tdd.classes_equivalencia[]

Regras por tipo:
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIPO        │ PARTIÇÕES PADRÃO                                            │
│  ────────────┼───────────────────────────────────────────────────────────  │
│  int/float   │ negativo, zero, positivo_válido, acima_limite               │
│  string      │ vazio, válido, inválido_formato, muito_longo                │
│  enum        │ cada valor + valor_inexistente                              │
│  boolean     │ true, false, null (se nullable)                             │
│  date        │ passado, hoje, futuro, inválida                             │
│  list/array  │ vazio, um_elemento, múltiplos, null                         │
└─────────────────────────────────────────────────────────────────────────────┘

IMPORTANTE: Sempre incluir fronteiras (boundary values)
```

#### PASSO 3: EXTRAIR MÉTODOS

```
Entrada: Classe M3 (diagrama de classe)
Ação: Para cada método público, identificar assinatura e comportamento
Saída: Lista de métodos com parâmetros e retorno

Extrair:
  • nome do método
  • parâmetros (nome, tipo)
  • tipo de retorno
  • descrição do comportamento esperado
  • exceções que pode lançar
```

#### PASSO 4: GERAR CRITÉRIOS DE ACEITE

```
Entrada: Lista de métodos + classes de equivalência
Ação: Para cada método, criar Given/When/Then usando partições
Saída: schema_tdd.criterios_aceite[]

Regras:
  • Mínimo 1 critério para happy path (partições válidas)
  • Mínimo 1 critério para cada partição inválida relevante
  • Critérios de fronteira para valores limítrofes

Formato:
  - id: "CA01"
    metodo: "criar"
    given: "dados válidos (idade=25, email=user@test.com)"
    when: "criar() é chamado"
    then: "Usuario é criado com sucesso"
    particoes_ref: ["maior_idade", "email_valido"]
```

#### PASSO 5: DEFINIR COBERTURA

```
Entrada: classes_equivalencia[]
Ação: Escolher estratégia baseado em criticidade e volume
Saída: schema_tdd.cobertura + combinacoes_estimadas

Regras de decisão:
┌─────────────────────────────────────────────────────────────────────────────┐
│  CONDIÇÃO                              │ COBERTURA RECOMENDADA              │
│  ──────────────────────────────────────┼──────────────────────────────────  │
│  ≤3 atributos, ≤4 partições cada       │ cartesiano                         │
│  >3 atributos ou >4 partições          │ pairwise                           │
│  Sistema crítico (financeiro, saúde)   │ cartesiano (mesmo se grande)       │
│  MVP / prototipação                    │ manual (casos essenciais)          │
│  Casos específicos de domínio          │ manual                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### PASSO 6: VALIDAR SPEC

```
Entrada: Spec completa
Ação: Aplicar checklist de validação
Saída: Spec validada ou lista de erros
```

### 4.3 Checklist de Validação

| ID | Verificação | Obrigatório |
|----|-------------|-------------|
| CK01 | Todos atributos têm tipo definido | ✓ |
| CK02 | Todos atributos têm ≥1 partição válida | ✓ |
| CK03 | Todos atributos têm ≥1 partição inválida | ✓ |
| CK04 | Todos métodos públicos têm ≥1 critério de aceite | ✓ |
| CK05 | Critérios cobrem happy path | ✓ |
| CK06 | Critérios cobrem casos de erro | ✓ |
| CK07 | Fronteiras identificadas para tipos numéricos | ✓ |
| CK08 | Cobertura definida (cartesiano/pairwise/manual) | ✓ |
| CK09 | combinacoes_estimadas calculado | ✓ |
| CK10 | Dependências listadas | ○ |
| CK11 | Invariantes documentados | ○ |

✓ = Obrigatório | ○ = Opcional

### 4.4 Método: aplicar()

```python
def aplicar(classe: ClasseM3) -> SpecPOO:
    spec = SpecPOO()
    spec.classe_nome = classe.nome
    spec.atributos = extrair_atributos(classe)
    spec.metodos = extrair_metodos(classe)
    spec.dependencias = extrair_dependencias(classe)
    spec.heranca = classe.extends
    
    # Schema TDD
    spec.schema_tdd.classe_ref = classe.nome
    spec.schema_tdd.classes_equivalencia = gerar_particoes(spec.atributos)
    spec.schema_tdd.criterios_aceite = gerar_criterios(
        spec.metodos, 
        spec.schema_tdd.classes_equivalencia
    )
    spec.schema_tdd.cobertura = decidir_cobertura(spec.schema_tdd)
    spec.schema_tdd.combinacoes_estimadas = calcular_combinacoes(
        spec.schema_tdd.classes_equivalencia,
        spec.schema_tdd.cobertura
    )
    
    return spec
```

---

## 5. Exemplo de Aplicação

### 5.1 Entrada: Classe Usuario (M3)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USUARIO                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  - idade: int (1-150)                                                       │
│  - email: string (formato email)                                            │
│  - ativo: boolean                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  + criar(idade, email): Usuario                                             │
│  + desativar(): void                                                        │
│  + pode_acessar_conteudo_adulto(): boolean                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Saída: Spec com Schema TDD

```yaml
classe_nome: "Usuario"
vertente: "M3.E"

atributos:
  - nome: "idade"
    tipo: "int"
    visibilidade: "private"
    restricoes: [">=1", "<=150"]
  - nome: "email"
    tipo: "string"
    visibilidade: "private"
    restricoes: ["formato RFC 5322"]
  - nome: "ativo"
    tipo: "boolean"
    visibilidade: "private"
    restricoes: []

metodos:
  - nome: "criar"
    parametros: [{nome: "idade", tipo: "int"}, {nome: "email", tipo: "string"}]
    retorno: "Usuario"
    visibilidade: "public"
    descricao: "Cria novo usuário validando dados"
  - nome: "desativar"
    parametros: []
    retorno: "void"
    visibilidade: "public"
    descricao: "Marca usuário como inativo"
  - nome: "pode_acessar_conteudo_adulto"
    parametros: []
    retorno: "boolean"
    visibilidade: "public"
    descricao: "Retorna true se idade >= 18"

dependencias: []
heranca: null

schema_tdd:
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
          valores_exemplo: [18, 30, 65, 150]
          valida: true
          fronteira: [18, 150]
        - nome: "acima_limite"
          valores_exemplo: [151, 200]
          valida: false
          fronteira: [151]
    
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
    
    - atributo: "ativo"
      tipo: "boolean"
      particoes:
        - nome: "true"
          valores_exemplo: [true]
          valida: true
        - nome: "false"
          valores_exemplo: [false]
          valida: true
  
  criterios_aceite:
    - id: "CA01"
      metodo: "criar"
      given: "dados válidos (idade=25, email=user@test.com)"
      when: "criar() é chamado"
      then: "Usuario é criado com ativo=true"
      particoes_ref: ["maior_idade", "valido"]
    
    - id: "CA02"
      metodo: "criar"
      given: "idade negativa (idade=-5)"
      when: "criar() é chamado"
      then: "lança ValidationError 'Idade inválida'"
      particoes_ref: ["negativa"]
    
    - id: "CA03"
      metodo: "criar"
      given: "email sem arroba"
      when: "criar() é chamado"
      then: "lança ValidationError 'Email inválido'"
      particoes_ref: ["sem_arroba"]
    
    - id: "CA04"
      metodo: "criar"
      given: "idade na fronteira inferior (idade=1)"
      when: "criar() é chamado"
      then: "Usuario é criado com sucesso"
      particoes_ref: ["menor_idade"]
    
    - id: "CA05"
      metodo: "criar"
      given: "idade na fronteira superior (idade=150)"
      when: "criar() é chamado"
      then: "Usuario é criado com sucesso"
      particoes_ref: ["maior_idade"]
    
    - id: "CA06"
      metodo: "desativar"
      given: "Usuario com ativo=true"
      when: "desativar() é chamado"
      then: "ativo passa a ser false"
      particoes_ref: ["true"]
    
    - id: "CA07"
      metodo: "pode_acessar_conteudo_adulto"
      given: "Usuario com idade=17"
      when: "pode_acessar_conteudo_adulto() é chamado"
      then: "retorna false"
      particoes_ref: ["menor_idade"]
    
    - id: "CA08"
      metodo: "pode_acessar_conteudo_adulto"
      given: "Usuario com idade=18"
      when: "pode_acessar_conteudo_adulto() é chamado"
      then: "retorna true"
      particoes_ref: ["maior_idade"]
  
  cobertura: "pairwise"
  combinacoes_estimadas: 25
```

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_1_7_Schema_TDD.md | Schema TDD usado na spec |
| docs/00_E/00_E_1_4_Classe.md | Classe M3 como entrada |
| docs/00_E/00_E_Epistemologia.md | Framework pai |
| _catalogo/indice.yaml | Indexação deste template |

### Externas

| Referência | Aplicação |
|------------|-----------|
| Booch, Rumbaugh, Jacobson | Fundamentos POO |
| Robert C. Martin, "Clean Code" | Princípios SOLID |
| Bertrand Meyer, "Design by Contract" (1986) | Pré/Pós-condições |
| PEP 484 | Type Hints Python |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | **Publicação M4.** Template para especificação de Classes POO. Aplicado M0-M4 reflexivamente. Sprint S019/T03. |

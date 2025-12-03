---
nome: M3_Objeto_v2
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
etapa: M3
data_inicio: 2025-12-03
problema_ref: M0_Objeto_v2
marco_ref: M1_Objeto_v2
objeto_ref: M2_Objeto_v2
---

# M3: Especificacao POO - Classe Objeto v2.0

## 1. Definicao

Objeto e a classe que estrutura o escopo de pesquisa (M2). Transforma conhecimento do marco teorico em objeto delimitado com fronteiras claras e criterios de sucesso.

**Funcao critica:** Ponte entre M1 (conceitos) e M3 (classes). Um Objeto bem definido permite que M3 gere Classes/Metodos sem ambiguidade e sem retornar a M1.

---

## 2. Marco Teorico

| Conceito | Definicao | Aplicacao |
|----------|-----------|-----------|
| **Escopo** | O que esta INCLUIDO no objeto de pesquisa | Atributo obrigatorio |
| **Fronteiras** | O que esta EXCLUIDO; limites deliberados | Atributo obrigatorio |
| **Delimitacao** | Ato de definir escopo + fronteiras | Metodo central delimitar() |
| **Afunilamento** | Reducao progressiva: Tema -> Objeto especifico | Processo de M0->M1->M2 |
| **Ponte M1->M3** | Funcao de conectar conceitos teoricos a especificacao estruturada | Criterio de sucesso |

### Fontes

| Fonte | Conceito |
|-------|----------|
| AJE (aje.com) | Escopo, Delimitacao |
| Mettzer | Afunilamento, Objeto de Estudo |
| Design Council | Double Diamond |

---

## 3. Atributos

| Atributo | Tipo | Card. | Obrig. | Descricao |
|----------|------|-------|--------|-----------|
| nome | string | 1 | Sim | Identificador unico |
| problema_ref | Problema | 1 | Sim | Problema (M0) de origem |
| marco_ref | MarcoTeorico | 1 | Sim | Marco teorico que fundamenta |
| tipo_pesquisa | enum | 1 | Sim | Exploratorio, Descritivo, Prescritivo |
| objetivo | string | 1 | Sim | O que pretende resolver/descobrir |
| escopo | string | 1 | Sim | O que esta incluido |
| fronteiras | string | 1 | Sim | O que esta excluido |
| requisitos | string[] | 0..* | Nao | Pre-condicoes necessarias |
| conceitos_usados | string[] | 1..* | Sim | Conceitos de M1 aplicados |
| criterio_sucesso | string | 1 | Sim | Quando considera completo |
| criterio_insucesso | string | 1 | Sim | Quando considera falho |
| frontmatter | Frontmatter | 1 | Sim | Metadados YAML |

---

## 4. Diagrama UML da Classe

```
+---------------------------------------------------------------+
|                         <<class>>                             |
|                          Objeto                               |
+---------------------------------------------------------------+
|  - nome: string                                               |
|  - problema_ref: Problema [1]                                 |
|  - marco_ref: MarcoTeorico [1]                                |
|  - tipo_pesquisa: enum [Exploratorio|Descritivo|Prescritivo]  |
|  - objetivo: string                                           |
|  - escopo: string                                             |
|  - fronteiras: string                                         |
|  - requisitos: string [0..*]                                  |
|  - conceitos_usados: string [1..*]                            |
|  - criterio_sucesso: string                                   |
|  - criterio_insucesso: string                                 |
|  - frontmatter: Frontmatter [1]                               |
+---------------------------------------------------------------+
|  + delimitar(m: MarcoTeorico, p: Problema): Objeto            |
|  + validar(): boolean                                         |
|  + validarCompletude(): boolean                               |
|  + verificarConexaoM1(m: MarcoTeorico): string[]              |
|  + gerarClasses(): Classe[]                                   |
+---------------------------------------------------------------+
              |                          |
              | problema_ref [1]         | marco_ref [1]
              v                          v
      +---------------+          +---------------+
      |   Problema    |          |  MarcoTeorico |
      |     (M0)      |          |     (M1)      |
      +---------------+          +---------------+
```

---

## 5. Diagrama de Escopo (Circulo/Venn)

```
+-------------------------------------------------------------------------+
|                        CONTEXTO: META SISTEMA                           |
|                                                                         |
|      FRONTEIRAS (excluido)              +-------------------+           |
|      ---------------------              |                   |           |
|                                         |  ESCOPO (incluido)|           |
|      - Implementacao codigo             |  ----------------  |           |
|      - Dominios negocio                 |                   |           |
|      - UI/Interface                     |  - Atributos      |           |
|      - Execucao runtime                 |  - Metodos        |           |
|                                         |  - Restricoes     |           |
|                                         |  - Diagramas      |           |
|                                         |  - Conexao M0/M1  |           |
|                                         |  - Ponte M1->M3   |           |
|                                         |                   |           |
|                                         +-------------------+           |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 6. Diagrama Contextual (Posicao no Framework)

```
+-------------------------------------------------------------------------+
|                              FRAMEWORK M0-M4                            |
|                                                                         |
|  +--------------+      +--------------+      +--------------+           |
|  |     M0       |      |     M1       |      |     M3       |           |
|  |   Problema   |      |    Marco     |      |   Classes    |           |
|  |              |      |   Teorico    |      |   Metodos    |           |
|  +------+-------+      +------+-------+      +------^-------+           |
|         |                     |                     |                   |
|         |    problema_ref     |    marco_ref        |   output          |
|         +---------+   +-------+                     |                   |
|                   v   v                             |                   |
|         +---------------------------------+         |                   |
|         |          M2: OBJETO             |---------+                   |
|         |                                 |                             |
|         |  Recebe:                        |                             |
|         |  - glossario validado (M0)      |                             |
|         |  - conceitos operacionais (M1)  |                             |
|         |                                 |                             |
|         |  Produz:                        |                             |
|         |  - escopo delimitado            |                             |
|         |  - fronteiras claras            |                             |
|         |  - criterios verificaveis       |                             |
|         +---------------------------------+                             |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 7. Restricoes

| Codigo | Restricao | Validacao |
|--------|-----------|-----------|
| R1 | problema_ref obrigatorio | Nao existe M2 sem M0 |
| R2 | marco_ref obrigatorio | Nao existe M2 sem M1 |
| R3 | Termos do objetivo devem estar validados | objetivo.termos in (problema.glossario + marco.conceitos) |
| R4 | Escopo e fronteiras mutuamente exclusivos | escopo AND fronteiras = vazio |
| R5 | Criterios devem ser verificaveis | criterio contem verbo mensuravel |
| R6 | conceitos_usados nao vazio | Minimo 1 conceito de M1 |
| R7 | Objeto deve permitir M3 sem retorno | validarCompletude() == true antes de gerarClasses() |

---

## 8. Metodos

### 8.1 delimitar(marco: MarcoTeorico, problema: Problema): Objeto

**Descricao:** Processo de afunilamento que transforma conceitos em escopo delimitado.

| Campo | Valor |
|-------|-------|
| Input | MarcoTeorico (M1), Problema (M0) |
| Output | Objeto delimitado |
| Pre-condicao | marco.validar() == true, problema.validar() == true |
| Pos-condicao | Objeto com escopo, fronteiras e criterios definidos |

**Processo:**

```
+---------------------------------------+
|        CONCEITOS DE M1                |
|   (lista de conceitos operacionais)   |
+-------------------+-------------------+
                    |
                    v
+---------------------------------------+
|     1. EXTRAIR TERMOS RELEVANTES      |
|     (filtrar conceitos aplicaveis)    |
+-------------------+-------------------+
                    |
                    v
+---------------------------------------+
|     2. DEFINIR OBJETIVO               |
|     (usar termos do glossario M0)     |
+-------------------+-------------------+
                    |
                    v
+---------------------------------------+
|     3. DELIMITAR ESCOPO               |
|     (o que sera incluido)             |
+-------------------+-------------------+
                    |
                    v
+---------------------------------------+
|     4. DEFINIR FRONTEIRAS             |
|     (o que sera excluido)             |
+-------------------+-------------------+
                    |
                    v
+---------------------------------------+
|     5. ESPECIFICAR CRITERIOS          |
|     (sucesso e insucesso verificaveis)|
+-------------------+-------------------+
                    |
                    v
+---------------------------------------+
|     6. REGISTRAR CONCEITOS USADOS     |
|     (rastreabilidade para M1)         |
+-------------------+-------------------+
                    |
                    v
              +-----------+
              |  OBJETO   |
              | DELIMITADO|
              +-----------+
```

---

### 8.2 validar(): boolean

**Descricao:** Verifica se Objeto atende restricoes basicas.

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | boolean |
| Validacoes | R1-R6 |

---

### 8.3 validarCompletude(): boolean

**Descricao:** Verifica se Objeto esta completo para M3 prosseguir.

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | boolean |
| Pre-condicao | validar() == true |

**Criterios de Completude:**

| Criterio | Pergunta |
|----------|----------|
| Escopo claro | M3 sabe exatamente o que incluir? |
| Fronteiras claras | M3 sabe exatamente o que excluir? |
| Conceitos suficientes | Todos os termos do escopo tem definicao? |
| Criterios verificaveis | M3 consegue testar sucesso/insucesso? |

---

### 8.4 verificarConexaoM1(marco: MarcoTeorico): string[]

**Descricao:** Lista conceitos de M1 nao utilizados no Objeto.

| Campo | Valor |
|-------|-------|
| Input | MarcoTeorico |
| Output | string[] (conceitos nao usados) |
| Uso | Identificar lacunas ou escopo incompleto |

---

### 8.5 gerarClasses(): Classe[]

**Descricao:** Produz input para M3.

| Campo | Valor |
|-------|-------|
| Input | self (Objeto validado) |
| Output | Classe[] para M3 |
| Pre-condicao | validarCompletude() == true |

---

## 9. Tipos de Pesquisa

| Tipo | Pergunta | Output tipico |
|------|----------|---------------|
| Exploratorio | O que existe? | Mapeamento, descoberta |
| Descritivo | Como funciona? | Documentacao, analise |
| Prescritivo | Como deveria ser? | Sistema, framework, metodo |

---

## 10. INSTRUCAO: Como definir um Objeto

### 10.1 Template (copiar e preencher)

```markdown
| Campo | Valor |
|-------|-------|
| **nome** | [identificador] |
| **problema_ref** | [path do M0] |
| **marco_ref** | [path do M1] |
| **tipo_pesquisa** | [Exploratorio/Descritivo/Prescritivo] |
| **objetivo** | [o que pretende resolver - usar termos de M0/M1] |
| **escopo** | [o que esta incluido] |
| **fronteiras** | [o que esta excluido] |
| **conceitos_usados** | [lista de conceitos de M1] |
| **criterio_sucesso** | [quando esta completo - verificavel] |
| **criterio_insucesso** | [quando falhou - verificavel] |
```

### 10.2 Checklist

- [ ] problema_ref aponta para M0 valido
- [ ] marco_ref aponta para M1 valido
- [ ] Nome e unico e descritivo
- [ ] Tipo de pesquisa definido
- [ ] Objetivo usa termos do glossario (M0) e conceitos (M1)
- [ ] Escopo lista o que cobre
- [ ] Fronteiras lista o que NAO cobre
- [ ] Escopo e fronteiras nao tem intersecao
- [ ] conceitos_usados lista pelo menos 1 conceito de M1
- [ ] Criterio de sucesso e verificavel
- [ ] Criterio de insucesso e verificavel
- [ ] validarCompletude() retorna true

---

## 11. Referencias

| Documento | Relacao |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_1_Problema | Anterior (M0) |
| 00_E_1_2_MarcoTeorico | Anterior (M1) |
| 00_E_1_4_Classe | Proximo (M3 - especificacao) |
| Matriz_Selecao_Diagramas | Guia para diagramas |

### Referencias Externas

| Fonte | Conceito utilizado |
|-------|-------------------|
| AJE (aje.com) | Escopo, Delimitacao |
| Mettzer | Afunilamento, Objeto de Estudo |
| Design Council | Double Diamond |

---

## Historico

| Versao | Data | Hora | Alteracao |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 19:15 | Criacao via M0-M4 recursivo. Marco teorico, diagramas UML/Circulo/Contextual, metodos delimitar/validarCompletude/verificarConexaoM1, restricoes R1-R7. |

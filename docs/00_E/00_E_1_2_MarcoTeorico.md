---
nome: 00_E_1_2_MarcoTeorico
versao: "3.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Publicado
---

# MarcoTeorico v3.0

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| MarcoTeorico v2.1 não segue padrão Documento v3.0 | 8 seções ad-hoc vs 6 seções M0-M4 |
| Tabela atributos sem Visibilidade | Viola Classe v3.0 |
| Sem M0 explícito | Não documenta problema que resolve |

### 1.2 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **marco teórico** | Etapa M1; fundamentação conceitual para resolver Problema |
| **conceito** | Unidade de conhecimento com termo + definição + fonte |
| **fonte** | Origem do conhecimento (interna ou externa) |
| **pesquisa interna** | Busca em ontologia própria (docs/00_O/) |
| **pesquisa externa** | Busca em literatura, papers, frameworks |
| **síntese** | Articulação de conceitos em sistema coerente |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| S003-E evoluiu docs em cascata | MarcoTeorico evoluiu de Problema, não absorveu Documento v3.0 |
| Padrão criado depois | Não retroatualizou |

### 1.4 Necessidade

| Necessidade | Ação |
|-------------|------|
| Padronizar estrutura | 6 seções M0-M4 |
| Adicionar Visibilidade | Coluna Visib. em atributos |
| Documentar M0 | Por que MarcoTeorico existe |

---

## 2. Marco Teórico (M1)

### 2.1 Conceitos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Fundamentação** | Metodologia Científica | M1 fornece base para decisões em M2-M4 |
| **Revisão de Literatura** | Pesquisa Acadêmica | Método pesquisarExterno() |
| **Ontologia** | Engenharia de Conhecimento | Prioridade interna antes de externa |
| **Síntese** | Epistemologia | Articular conceitos em sistema |
| **Rastreabilidade** | Engenharia de Software | Toda afirmação tem fonte |
| **Double Diamond** | Design Council (2005) | M0 diverge/converge problema; M1-M2 diverge/converge solução |

### 2.2 Diagrama: Double Diamond

```
┌─────────────────────────────────────────────────────────────────┐
│                      DOUBLE DIAMOND                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   PROBLEMA                          SOLUÇÃO                     │
│                                                                 │
│      ╱╲                                ╱╲                       │
│     ╱  ╲                              ╱  ╲                      │
│    ╱ M0 ╲ Discover                   ╱ M1 ╲ Develop             │
│   ╱      ╲                          ╱      ╲                    │
│  ╱        ╲                        ╱        ╲                   │
│ ╱──────────╲                      ╱──────────╲                  │
│ ╲          ╱                      ╲          ╱                  │
│  ╲   M0   ╱ Define                 ╲   M2   ╱ Deliver           │
│   ╲      ╱                          ╲      ╱                    │
│    ╲    ╱                            ╲    ╱                     │
│     ╲  ╱                              ╲  ╱                      │
│      ╲╱                                ╲╱                       │
│   Problema                           Objeto                     │
│   Definido                         Delimitado                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Fontes

| Fonte | Conceito |
|-------|----------|
| Design Council (UK, 2005) | Double Diamond |
| Metodologia Científica | Revisão de Literatura |

---

## 3. Objeto (M2)

### 3.1 Definição

| Campo | Valor |
|-------|-------|
| **nome** | MarcoTeorico |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Pesquisar conhecimento (interno/externo) para fundamentar resolução do Problema |

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
│   │ (sintoma M0)      │               │  - conceitos[]                  │   │
│   └───────────────────┘               │  - fontes[]                     │   │
│                                       │  - premissas[]                  │   │
│   ┌───────────────────┐               │  - lacunas[]                    │   │
│   │ Objeto            │               │                                 │   │
│   │ (escopo M2)       │               │  Métodos:                       │   │
│   └───────────────────┘               │  - pesquisarInterno()           │   │
│                                       │  - pesquisarExterno()           │   │
│   ┌───────────────────┐               │  - sintetizar()                 │   │
│   │ Classe            │               │  - validar()                    │   │
│   │ (POO M3)          │               │                                 │   │
│   └───────────────────┘               │  Subtipos:                      │   │
│                                       │  - Conceito                     │   │
│                                       │  - Fonte                        │   │
│                                       │  - ReferenciaConceitual         │   │
│                                       └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Critérios

| Critério | Verificação |
|----------|-------------|
| **Sucesso** | M2 não precisa voltar a M1 para buscar conceitos |
| **Insucesso** | Lacunas conceituais descobertas em M2/M3 |

---

## 4. Classe (M3)

### 4.1 Diagrama de Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                       MARCOTEORICO                              │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  + nome: string                      [1]                        │
│  + problema_ref: Problema            [1]                        │
│  + conceitos: Conceito[]             [1..*]                     │
│  + fontes: Fonte[]                   [1..*]                     │
│  - premissas: string[]               [0..*]                     │
│  - referencias_conceituais: RefConc[] [0..*]                    │
│  - lacunas: string[]                 [0..*]                     │
│  - frontmatter: Frontmatter          [1]      ◆── composição    │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  R1: problema_ref obrigatório (não existe M1 sem M0)            │
│  R2: conceitos[] não vazio (mín. 1)                             │
│  R3: todo conceito tem definição operacional                    │
│  R4: toda fonte externa é verificável (url != null)             │
│  R5: pesquisarInterno() antes de pesquisarExterno()             │
│  R6: qualidade = Seletividade + Profundidade + Coerência + Rastr│
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + pesquisarInterno(p: Problema): Conceito[]                    │
│  + pesquisarExterno(p: Problema): Conceito[]                    │
│  + sintetizar(c: Conceito[]): MarcoTeorico                      │
│  + validar(): bool                                              │
│  + gerarObjeto(): Objeto                                        │
└─────────────────────────────────────────────────────────────────┘
         │                              │
         │ problema_ref [1]             │ herda de
         ▼                              ▼
┌─────────────────┐            ┌─────────────────┐
│    Problema     │            │     Classe      │
│      (M0)       │            └─────────────────┘
└─────────────────┘
```

### 4.2 Atributos

| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| nome | string | [1] | + | Sim | Identificador único |
| problema_ref | Problema | [1] | + | Sim | Problema que fundamenta |
| conceitos | Conceito[] | [1..*] | + | Sim | Conceitos extraídos |
| fontes | Fonte[] | [1..*] | + | Sim | Referências |
| premissas | string[] | [0..*] | - | Não | Suposições assumidas |
| referencias_conceituais | RefConc[] | [0..*] | - | Não | Frameworks de apoio |
| lacunas | string[] | [0..*] | - | Não | O que falta para M3 |
| frontmatter | Frontmatter | [1] | - | Sim | Metadados YAML |

### 4.3 Subtipo: Conceito

| Atributo | Tipo | Card. | Visib. | Descrição |
|----------|------|-------|--------|-----------|
| termo | string | [1] | + | Nome do conceito |
| definicao | string | [1] | + | Definição operacional |
| origem | enum | [1] | + | {interna, externa} |
| fonte_ref | Fonte | [1] | + | Referência da fonte |
| aplicacao | string | [0..1] | + | Como usar no contexto |

### 4.4 Subtipo: Fonte

| Atributo | Tipo | Card. | Visib. | Descrição |
|----------|------|-------|--------|-----------|
| titulo | string | [1] | + | Nome da fonte |
| tipo | enum | [1] | + | {Ontologia, Literatura, Paper, Framework, Web} |
| url | string | [0..1] | + | Link externo |
| path | string | [0..1] | + | Caminho interno |
| data_acesso | date | [0..1] | - | Quando consultado |

### 4.5 Restrições

| Código | Restrição | Validação |
|--------|-----------|-----------|
| R1 | problema_ref obrigatório | Não existe M1 sem M0 |
| R2 | conceitos[] não vazio | conceitos.length >= 1 |
| R3 | Todo conceito tem definição | definicao != null |
| R4 | Fonte externa verificável | url != null se tipo != Ontologia |
| R5 | Prioridade interna | pesquisarInterno() antes de pesquisarExterno() |
| R6 | Qualidade | Seletividade + Profundidade + Coerência + Rastreabilidade |

### 4.6 Métodos

#### pesquisarInterno(problema: Problema): Conceito[]

| Campo | Valor |
|-------|-------|
| Input | Problema (M0) |
| Output | Conceito[] com origem=interna |
| Pré-condição | problema.necessidade != null |
| Pós-condição | fonte_ref.tipo = Ontologia |

```
┌─────────────────┐
│    Problema     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Extrair termos-chave           │
│  (sintoma + necessidade)        │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Buscar em docs/00_O/           │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Extrair conceitos + definição  │
│  Marcar origem = interna        │
└────────────────┬────────────────┘
                 │
                 ▼
         ┌──────────────┐
         │  Conceito[]  │
         └──────────────┘
```

#### pesquisarExterno(problema: Problema): Conceito[]

| Campo | Valor |
|-------|-------|
| Input | Problema + lacunas |
| Output | Conceito[] com origem=externa |
| Pré-condição | pesquisarInterno() executado |
| Pós-condição | fonte_ref.url != null |

#### sintetizar(conceitos: Conceito[]): MarcoTeorico

| Campo | Valor |
|-------|-------|
| Input | Conceito[] (internos + externos) |
| Output | MarcoTeorico estruturado |
| Pré-condição | conceitos.length >= 1 |
| Pós-condição | Conceitos coerentes entre si |

#### validar(): bool

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | bool |
| Validações | R1-R6 |

| Critério | Pergunta |
|----------|----------|
| Seletividade | Todos conceitos conectam ao Problema? |
| Profundidade | Definições são operacionais? |
| Coerência | Conceitos formam sistema articulado? |
| Rastreabilidade | Todas fontes documentadas? |

#### gerarObjeto(): Objeto

| Campo | Valor |
|-------|-------|
| Input | self (validado) |
| Output | Objeto (estrutura inicial para M2) |
| Pré-condição | validar() == true |

### 4.7 Fluxo M1

```
┌─────────────────┐
│    Problema     │
│      (M0)       │
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│  pesquisarInterno()  │
└──────────┬───────────┘
           │
           ▼
    ┌────────────┐
    │  Lacunas?  │
    └──────┬─────┘
           │
    ┌──────┴──────┐
    │ Sim        │ Não
    ▼            │
┌──────────────────────┐
│  pesquisarExterno()  │─────┐
└──────────────────────┘     │
                             │
           ┌─────────────────┘
           │
           ▼
┌──────────────────────┐
│    sintetizar()      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     validar()        │
└──────────┬───────────┘
           │
    ┌──────┴──────┐
    │ OK         │ Falha
    ▼            ▼
┌────────────┐  ┌────────────┐
│gerarObjeto │  │ Retornar   │
│   → M2     │  │ pesquisar  │
└────────────┘  └────────────┘
```

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Superclasse (herança) |
| 00_E_1_4_1_Diagrama | COMO selecionar diagramas |
| 00_E_1_1_Problema | Anterior (M0) - input |
| 00_E_1_3_Objeto | Próximo (M2) - output |
| 00_E_1_6_Documento | Ciclo de vida (persistência) |

### Externas

| Fonte | Conceito |
|-------|----------|
| Design Council (UK, 2005) | Double Diamond |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | - | Criação |
| 2.0 | 2025-12-03 | 16:45 | Reestruturação via M0-M4 recursivo |
| 2.1 | 2025-12-03 | 22:50 | Instruções diagrama e persistência |
| 3.0 | 2025-12-04 | 13:10 | **PADRONIZAÇÃO S004-E**: 6 seções M0-M4 conforme Documento v3.0. Visibilidade (+/-) em atributos. M0 explícito adicionado. Diagrama escopo. |

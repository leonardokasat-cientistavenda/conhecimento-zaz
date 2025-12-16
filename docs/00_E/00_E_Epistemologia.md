---
nome: 00_E_Epistemologia
versao: "4.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Published
etapa: M4
nivel: C3
camadas: [L0, L1, L2]

# ATRIBUTOS DE ROTEAMENTO (Interface com GENESIS)
problema_que_resolve: "Como estruturar qualquer domínio de conhecimento de forma anti-entrópica"
triggers:
  - estruturar
  - classe
  - M0-M4
  - documentar
  - conhecimento
  - meta sistema
  - framework
  - epistemologia
  - especificar
  - spec
exemplos_uso:
  - "quero documentar um processo"
  - "preciso criar classes para vendas"
  - "como aplico M0-M4"
  - "quero estruturar meu conhecimento"
  - "como crio um meta sistema"
  - "especificar classe para PROMETHEUS"
arquivo_raiz: "docs/00_E/00_E_Epistemologia.md"
cobertura: Completo
pai: null

# INTERFACE EVENT-DRIVEN (v4.0)
tipos_consumidos:
  - ciclo_epistemologico      # MS_Backlog solicita criação/evolução de conhecimento
tipos_produzidos:
  - spec_poo                  # M3.E → PROMETHEUS (Worker_E)
  - spec_bpmn                 # M3.P → PROMETHEUS (Worker_P)
  - spec_dmn                  # M3.D → PROMETHEUS (Worker_D)
  - indexar_catalogo          # → Catálogo (novo item indexado)
---

# Epistemologia v4.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Epistemologia** | Meta Sistema Base que cria Meta Sistemas Derivados |
| **Meta Sistema** | Sistema que gera outros sistemas (Clabject) |
| **M0-M4** | Ciclo recursivo: Problema → Marco → Objeto → Classe → Documento |
| **Módulo** | Conjunto de classes opcionais para extensão de capacidades |
| **Par E/O Local** | Cada nível tem sua própria Epistemologia (classes) e Ontologia (instâncias) |
| **Entropia Epistêmica** | Degradação do conhecimento por falta de estrutura explícita |
| **MS Epistemológico** | Meta Sistema criado via Epistemologia (ex: MS_Produto, MS_Seleção) |
| **Vertente M3.*** | Especialização de M3 por tipo de artefato (POO, BPMN, DMN, etc.) |
| **Spec** | Especificação completa gerada em M3, consumida por PROMETHEUS |
| **Schema TDD** | Estrutura de testes: classes_equivalencia + criterios_aceite |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│   "Como CRIAR Meta Sistemas anti-entrópicos que sirvam de fundação          │
│    para N domínios, com estrutura replicável e extensões opcionais?"        │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SOLUÇÃO: EPISTEMOLOGIA                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MÉTODO M0-M4 (obrigatório)         MÓDULOS (opcionais)                     │
│  ┌───────────────────────────┐      ┌───────────────────────────┐           │
│  │ M0 Problema               │      │ Raciocínio                │           │
│  │ M1 Marco Teórico          │      │ Catálogo                  │           │
│  │ M2 Objeto                 │      │ Análise                   │           │
│  │ M3 Classe + Vertente      │      │ ...                       │           │
│  │ M4 Documento              │      │                           │           │
│  └───────────────────────────┘      └───────────────────────────┘           │
│                                                                             │
│  PROPRIEDADES: Redução Entrópica │ Hierarquia Fractal │ Persistência        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Epistemologia é o Meta Sistema Base que resolve o problema de CRIAR Meta Sistemas anti-entrópicos via método M0-M4, hierarquia fractal e módulos opcionais.**
>
> - **Método M0-M4** - Ciclo recursivo obrigatório
> - **Hierarquia Fractal** - Par E/O replicado em cada nível
> - **Composição Modular** - Extensões opcionais por escolha
> - **Vertentes M3.*** - Especialização por tipo de artefato (v4.0)
>
> **Pré-requisitos:**
> - GENESIS define propósito (Inteligência Híbrida) e roteia para Meta Sistemas
> - PROMETHEUS executa artefatos especificados via Epistemologia

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Entropia** | Shannon (1948) | Estrutura explícita reduz degradação |
| **Autopoiesis** | Maturana & Varela (1980) | Sistema se autoproduz e gera outros |
| **Fractal** | Mandelbrot (1982) | Mesma estrutura em cada nível |
| **Composição** | SOLID Principles | Módulos opcionais, não herança forçada |
| **Clabject** | MOF/OMG (1997) | Elemento dual: Classe + Objeto |
| **TDD** | Kent Beck (2003) | Especificar testes antes de implementar |
| **Particionamento** | Myers (1979) | Dividir domínio em classes de equivalência |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MARCO TEÓRICO CONSOLIDADO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ESTRUTURA VERTICAL (Fractal)       EXTENSÃO HORIZONTAL (Composição)        │
│  ┌───────────────────────────┐      ┌───────────────────────────┐           │
│  │ Epistemologia             │      │ Meta Sistema escolhe:     │           │
│  │ └── Meta Sistema          │      │ ├── Raciocínio?           │           │
│  │     └── Sub-Meta Sistema  │      │ ├── Catálogo?             │           │
│  │         └── ...           │      │ └── Análise?              │           │
│  │                           │      │                           │           │
│  │ Cada nível = Par E/O      │      │ Capacidades opcionais     │           │
│  └───────────────────────────┘      └───────────────────────────┘           │
│                                                                             │
│  PROPRIEDADES DERIVADAS:                                                    │
│  • Redução Entrópica (Shannon) → Diagrama-first, SSOT                       │
│  • Recursividade (Autopoiesis) → M0-M4 aplicado a si mesmo                  │
│  • Persistência (KM) → GitHub + frontmatter + histórico                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Relação com GENESIS e PROMETHEUS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EPISTEMOLOGIA NO ECOSSISTEMA                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_Backlog                                                                 │
│      │                                                                      │
│      │ ciclo_epistemologico                                                 │
│      ▼                                                                      │
│  EPISTEMOLOGIA (método)                                                     │
│      │                                                                      │
│      ├──► MS Epistemológicos (filhos)                                       │
│      │    • MS_Produto (COMO produto)                                       │
│      │    • MS_Seleção (COMO seleção)                                       │
│      │                                                                      │
│      │ spec_poo, spec_bpmn, spec_dmn                                        │
│      ▼                                                                      │
│  PROMETHEUS (fábrica) ───► Artefatos implantados                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Epistemologia é o **método** que GENESIS usa para criar conhecimento estruturado. Os artefatos especificados são executados por PROMETHEUS.

---

## 3. Objeto (M2)

### 3.1 Definição

**Epistemologia** é o Meta Sistema Base que:
- **Cria** Meta Sistemas Derivados com propriedades anti-entrópicas
- **Fornece** método M0-M4 obrigatório para estruturação
- **Oferece** módulos opcionais para extensão de capacidades
- **Produz** Specs com Schema TDD para PROMETHEUS executar

### 3.2 Fronteiras

| Epistemologia É | Epistemologia NÃO É |
|-----------------|---------------------|
| Método de especificação (COMO conhecer) | O conhecimento em si (Ontologia) |
| Fábrica de Meta Sistemas | Conteúdo de domínio específico |
| M0-M4 obrigatório | Propósito maior (isso é GENESIS) |
| Módulos opcionais para extensão | Execução de artefatos (isso é PROMETHEUS) |
| Estrutura fractal replicável | Instâncias de um domínio |
| Produtora de Specs com Schema TDD | Geradora de código (isso é PROMETHEUS) |

### 3.3 Componentes

| Componente | Tipo | Obrigatório | Função |
|------------|------|-------------|--------|
| **Problema (M0)** | Classe | ✅ | Identifica sintomas, causas, necessidades |
| **Marco Teórico (M1)** | Classe | ✅ | Fundamenta teoricamente |
| **Objeto (M2)** | Classe | ✅ | Define escopo e fronteiras |
| **Classe (M3)** | Classe | ✅ | Especifica atributos e métodos |
| **Vertentes M3.*** | Template | ✅ | Especializa M3 por tipo de artefato |
| **Schema TDD** | Classe | ✅ | Define testes da spec |
| **Documento (M4)** | Classe | ✅ | Persiste e versiona |
| **Módulo Raciocínio** | Módulo | ⚪ | Hipótese, Evidência, Inferência |
| **Módulo Catálogo** | Módulo | ⚪ | Item, Categoria, Tag |
| **Módulo Análise** | Módulo | ⚪ | Métrica, Dimensão, Agregação |

### 3.4 Camadas Autopoiéticas (L0-L4)

Epistemologia manifesta parcialmente as camadas L0-L4:

| Camada | Epistemologia manifesta? | Como |
|--------|--------------------------|------|
| **L0 Existência** | ✅ | Documentos .md, versão, frontmatter |
| **L1 Percepção** | ✅ | Histórico de versões, status |
| **L2 Ação** | ✅ | Gera specs via M0-M4 |
| **L3 Validação** | ⚪ Parcial | Via PROMETHEUS |
| **L4 Decisão** | ⚪ Parcial | Via GENESIS |

**Definição completa de L0-L4:** genesis/GENESIS.md seção 2.3

---

## 4. Classe (M3)

### 4.1 Atributos

| Grupo | Atributo | Tipo | Obrigatório |
|-------|----------|------|-------------|
| **Identificação** | nome | String | ✅ |
| | versao | SemVer | ✅ |
| | tipo | Enum (Framework) | ✅ |
| | nivel | Enum (C1-C4) | ✅ |
| | camadas | Array[L0-L4] | ✅ |
| | status | Enum | ✅ |
| **Roteamento** | problema_que_resolve | String | ✅ |
| | triggers | Array[String] | ✅ |
| | exemplos_uso | Array[String] | ✅ |
| | arquivo_raiz | String | ✅ |
| | cobertura | Enum | ⚪ |
| | pai | Referência | ⚪ |
| **Event-Driven** | tipos_consumidos | Array[String] | ✅ |
| | tipos_produzidos | Array[String] | ✅ |
| **Estruturais** | classes_estruturais | Array[Classe] | ✅ |
| | modulos_opcionais | Array[Modulo] | ⚪ |
| | meta_sistemas_derivados | Array[MetaSistema] | ⚪ |
| **Relações** | genesis_pai | Referência | ✅ |
| | depende_de | Array[Referência] | ✅ |

### 4.2 Métodos

| Método | Entrada | Saída | Responsabilidade |
|--------|---------|-------|------------------|
| `ciclo_m0_m4()` | dominio, problema | MetaSistema + Spec | Executar ciclo completo |
| `compor_modulo()` | meta_sistema, modulo | MetaSistema | Adicionar módulo opcional |
| `gerar_meta_sistema()` | nome, modulos[] | MetaSistema | Criar novo Meta Sistema |
| `aplicar_recursivamente()` | classe | Classe | Auto-evolução |
| `identificar_vertente()` | classe | Vertente | Determinar M3.E, M3.P, etc. |
| `carregar_template()` | vertente | Template | Buscar no Catálogo |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MÉTODO: ciclo_m0_m4()                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ENTRADA: dominio + problema                                                │
│                                                                             │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    │
│  │   M0    │───▶│   M1    │───▶│   M2    │───▶│   M3    │───▶│   M4    │    │
│  │Problema │    │ Marco   │    │ Objeto  │    │ Classe  │    │Documento│    │
│  └─────────┘    └─────────┘    └─────────┘    └────┬────┘    └─────────┘    │
│                                                    │                        │
│                                          ┌────────┴────────┐                │
│                                          │                 │                │
│                                          ▼                 ▼                │
│                                   Vertente M3.*      Schema TDD             │
│                                   (via Catálogo)     (obrigatório)          │
│                                                                             │
│  SAÍDA: MetaSistema + Spec (com Schema TDD) + tipos_produzidos              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Restrições

| Restrição | Regra | Consequência |
|-----------|-------|--------------|
| **R-ROTEAMENTO** | Todo Meta Sistema DEVE ter: problema_que_resolve, triggers (mín 3), exemplos_uso (mín 2), arquivo_raiz | Sem eles = invisível para GENESIS |
| **R-CICLO** | Todas as etapas M0-M4 devem completar | Ciclo incompleto = não publicável |
| **R-VERSAO** | Deve seguir SemVer | Versão inválida = erro |
| **R-CAMADAS** | Deve declarar camadas L0-L4 que manifesta | Sem declaração = capacidades indefinidas |
| **R-VERTENTE** | M3 DEVE identificar vertente e carregar template | Sem vertente = spec incompleta |
| **R-TDD** | Toda Spec DEVE ter Schema TDD | Sem Schema TDD = PROMETHEUS rejeita |

### 4.4 Invariantes

| Invariante | Descrição |
|------------|-----------|
| **Reflexividade** | Epistemologia aplica M0-M4 a si mesma |
| **Generatividade** | Todo MetaSistema é gerado via ciclo_m0_m4() |
| **Composição** | Módulos são opcionais, nunca obrigatórios |
| **Localizabilidade** | Todo MetaSistema tem atributos de roteamento |
| **Testabilidade** | Toda Spec tem Schema TDD |

### 4.5 Vertentes M3.*

Em M3, após definir a Classe, Epistemologia identifica a **vertente** apropriada e carrega o template correspondente do Catálogo:

| Vertente | Descrição | Template | Artefatos | Status |
|----------|-----------|----------|-----------|--------|
| **M3.E** | Estrutural (POO) | `_catalogo/templates/M3_E_POO.md` | .py, test_.py, .feature | ✅ Publicado |
| **M3.P** | Processual (BPMN) | `_catalogo/templates/M3_P_BPMN.md` | .bpmn, karate.feature | ✅ Publicado |
| **M3.D** | Decisional (DMN) | `_catalogo/templates/M3_D_DMN.md` | .dmn, karate.feature | ⬜ Backlog |
| **M3.I** | Infraestrutural | `_catalogo/templates/M3_I_Infra.md` | Dockerfile, .yaml | ⬜ Backlog |
| **M3.C** | Configuracional | `_catalogo/templates/M3_C_Config.md` | .env, schema.json | ⬜ Backlog |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO M3 COM VERTENTES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  M3 (Classe)                                                                │
│      │                                                                      │
│      ├── identificar_vertente()                                             │
│      │   └── "Esta classe requer código POO" → M3.E                         │
│      │   └── "Esta classe requer workflow BPMN" → M3.P                      │
│      │   └── "Esta classe requer regras DMN" → M3.D                         │
│      │                                                                      │
│      ├── carregar_template(vertente)                                        │
│      │   └── Catálogo.buscar(tipo: template_spec, vertente: M3.E)           │
│      │                                                                      │
│      └── aplicar_template()                                                 │
│          └── Produz: Spec + Schema TDD                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Schema TDD

Toda Spec produzida em M3.* **DEVE** incluir Schema TDD:

```yaml
schema_tdd:
  classe_ref: "NomeDaClasse"
  classes_equivalencia:
    - atributo: "..."
      tipo: "..."
      particoes:
        - nome: "..."
          valores_exemplo: [...]
          valida: true|false
          fronteira?: [...]
  criterios_aceite:
    - id: "CA01"
      metodo: "..."
      given: "..."
      when: "..."
      then: "..."
      particoes_ref: [...]
  cobertura: "cartesiano" | "pairwise" | "manual"
  combinacoes_estimadas: number
```

**Referência completa:** `docs/00_E/00_E_1_7_Schema_TDD.md`

### 4.7 Persistência

Specs geradas por Epistemologia são persistidas conforme `docs/00_E/00_E_Epistemologia_Arquitetura.md`:
- **MongoDB** (genesis_db.specs): source of truth para consumo por sistemas
- **GitHub** (_specs/): documentos legíveis para humanos

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Pai (C1) - Propósito e roteamento |
| genesis/GENESIS.md seção 2.3 | Definição de Autopoiese e L0-L4 |
| genesis/PROMETHEUS.md | Fábrica que executa specs geradas via Epistemologia |
| docs/00_E/00_E_1_7_Schema_TDD.md | Schema TDD - estrutura de testes |
| docs/00_E/00_E_Epistemologia_Arquitetura.md | Arquitetura: persistência, contratos, fluxos |
| _catalogo/templates/M3_E_POO.md | Template vertente Estrutural (POO) |
| _catalogo/templates/M3_P_BPMN.md | Template vertente Processual (BPMN) |
| docs/00_E/00_E_1_1_Problema.md | Classe M0 detalhada |
| docs/00_E/00_E_1_6_Documento.md | Classe M4 detalhada |
| docs/04_P/MS_Produto.md | MS Epistemológico: COMO gerenciar produto |

### Externas

| Fonte | Conceito |
|-------|----------|
| Shannon (1948) | Entropia |
| Maturana & Varela (1980) | Autopoiesis |
| Mandelbrot (1982) | Fractais |
| OMG/MOF (1997) | Clabject |
| Kent Beck (2003) | TDD |
| Myers (1979) | Particionamento de Equivalência |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 3.2 | 2025-12-04 | Publicação com M0-M4 completo |
| 3.3 | 2025-12-05 | Interface GENESIS: atributos de roteamento, R-ROTEAMENTO |
| 3.4 | 2025-12-05 | **FAXINA** - Redução 60%: diagramas duplicados removidos, seções consolidadas, redundâncias com GENESIS eliminadas. Sprint S005-G/T10. |
| 3.5 | 2025-12-15 | **Reconciliação**: seção 2.3 Relação com GENESIS e PROMETHEUS. Frontmatter: nivel: C3, camadas: [L0, L1, L2]. Referência a PROMETHEUS.md. Glossário: +MS Epistemológico. |
| 4.0 | 2025-12-16 | **Event-Driven + Vertentes**: tipos_consumidos/produzidos no frontmatter. Vertentes M3.* (POO, BPMN, DMN, Infra, Config). Schema TDD obrigatório. Templates no Catálogo. Referência a Epistemologia_Arquitetura.md para persistência. Sprint S019/T04. |

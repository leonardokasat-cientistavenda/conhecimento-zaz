---
nome: 00_E_Epistemologia
versao: "3.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
etapa: M2
sprint_ref: S004-E
task_ref: T08
---

# Epistemologia v3.0

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Projetos anteriores entraram em loop | Sistema ZAZ, Metodologia Vendas - progresso perdido |
| IA alucina sem estrutura | Complexidade sem método gera inconsistência |
| Conhecimento não persiste entre sessões | Cada conversa recomeça do zero |
| Impossível construir meta sistemas derivados | Meta sistemas complexos travados |

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Epistemologia** | Meta Sistema Base (reflexivo) que cria Meta Sistemas Derivados |
| **Ontologia** | Camada de instâncias - conhecimento validado (emerge da execução) |
| **Entropia Epistêmica** | Degradação do conhecimento por falta de estrutura explícita |
| **Entropia Contextual** | Perda de precisão em conversas longas (problema de Claude) |
| **Bootstrap Circular** | Dependência mútua entre componentes na inicialização |
| **STUB** | Versão mínima hardcoded que quebra o ciclo circular |
| **Meta Sistema Derivado** | Sistema construído SOBRE a Epistemologia (Clabject) |
| **Sub-Meta Sistema** | Componente de um Meta Sistema Derivado (também Clabject) |
| **Clabject** | Elemento que é Classe (para baixo) e Objeto (para cima) simultaneamente |
| **Par E/O Local** | Cada nível tem sua própria Epistemologia (classes) e Ontologia (instâncias) |
| **Composição Fractal** | Estrutura auto-similar que se repete em cada nível |
| **Classe** | Molde estrutural que pode ser instanciado em múltiplos domínios |
| **Framework** | Orquestração de métodos com objetivo específico |
| **M0-M4** | Ciclo recursivo: Problema → Marco → Objeto → Classe → Documento |

### 1.3 Pré-requisitos Resolvidos (GENESIS)

| Problema | Resolvido por | Status |
|----------|---------------|--------|
| Bootstrap Circular | GENESIS (STUB v0.10) | ✅ Resolvido |
| Entropia Contextual | GENESIS (arquivos atômicos + índice) | ✅ Resolvido |
| **Como criar Meta Sistemas** | **Epistemologia (M0-M4)** | 🔄 Em definição |

**Relação GENESIS ↔ Epistemologia:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CICLO RECURSIVO                                     │
│                                                                             │
│   GENESIS v0.10 (STUB)                                                      │
│   ├── Resolve: Bootstrap Circular + Entropia Contextual                     │
│   ├── Natureza: Infraestrutura de inicialização                             │
│   └── Status: Versão mínima funcional                                       │
│        │                                                                    │
│        │ habilita                                                           │
│        ▼                                                                    │
│   EPISTEMOLOGIA v3.0 (Framework)                                            │
│   ├── Resolve: Como criar Meta Sistemas anti-entrópicos                     │
│   ├── Natureza: Fábrica de Meta Sistemas                                    │
│   └── Status: Em definição (esta sprint)                                    │
│        │                                                                    │
│        │ retroalimenta (método G4: refatorar_stub)                          │
│        ▼                                                                    │
│   GENESIS v1.0 (refatorado)                                                 │
│   ├── Aplicar M0-M4 ao próprio GENESIS                                      │
│   └── Status: Futuro (após Epistemologia estável)                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Conhecimento sem estrutura explícita | Degrada com tempo (máquina e humano) |
| Sem método recursivo | Cada domínio reinventa a roda |
| Sem persistência versionada | Decisões e aprendizados perdidos |
| Sem separação Epistemologia/Ontologia | Confunde "como conhecer" com "o que existe" |

### 1.5 Necessidade

| Necessidade | Critério de Sucesso |
|-------------|---------------------|
| **Método recursivo M0-M4** | Qualquer objeto passa pelo mesmo ciclo |
| **Classes reutilizáveis** | Problema, Objeto, Classe, Documento aplicáveis a qualquer domínio |
| **Redução entrópica** | Diagramas > Prosa; Estrutura explícita > Implícita |
| **Persistência versionada** | GitHub + frontmatter + histórico |
| **Criar Meta Sistemas Derivados** | N meta sistemas construíveis com propriedades herdadas |

### 1.6 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│   "Como CRIAR meta sistemas com propriedades anti-entrópicas                │
│    que sirvam de fundação para sub-meta sistemas?"                          │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   │ resolve via
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              EPISTEMOLOGIA (Meta Sistema Base - Reflexivo)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRÉ-REQUISITO: GENESIS (STUB) resolve Bootstrap + Entropia Contextual     │
│                                                                             │
│  FORNECE:                                                                   │
│  • Classes fundacionais (Problema, Marco, Objeto, Classe, Documento)        │
│  • Método M0-M4                                                             │
│  • Propriedades herdáveis (redução entrópica, recursividade, persistência)  │
│                                                                             │
│  ESTRUTURA FRACTAL (auto-similar em cada nível):                            │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                         CLABJECT                                   │     │
│  │  ┌─────────────────────────────────────────────────────────────┐   │     │
│  │  │  EPISTEMOLOGIA LOCAL    │    ONTOLOGIA LOCAL                │   │     │
│  │  │  (Classes do nível)     │    (Instâncias geradas)           │   │     │
│  │  │          │              │           ▲                       │   │     │
│  │  │          │   executa    │           │                       │   │     │
│  │  │          └──────────────┼───────────┘                       │   │     │
│  │  └─────────────────────────────────────────────────────────────┘   │     │
│  │                            │                                       │     │
│  │                            │ repete estrutura                      │     │
│  │                            ▼                                       │     │
│  │                    N SUB-META SISTEMAS                             │     │
│  │                    (mesma estrutura)                               │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  PROPRIEDADES HERDADAS: Redução Entrópica │ Persistência │ Recursividade   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.7 Atributos do Problema

| Atributo | Descrição | Critério de Validação |
|----------|-----------|----------------------|
| **Recursividade** | Sistema usa si mesmo para evoluir | Classes aplicam M0-M4 a si mesmas |
| **Redução Entrópica** | Estrutura explícita resiste a degradação | Diagrama-first, SSOT, atomicidade |
| **Persistência** | Conhecimento sobrevive entre sessões | GitHub + versionamento + histórico |
| **Reutilização** | Classes aplicáveis a qualquer domínio | Problema, Objeto, Classe funcionam em N domínios |
| **Composição Fractal** | Estrutura se repete em cada nível | Clabject + Par E/O local |
| **Herança E→O→E** | Ontologia de cima vira Epistemologia de baixo | Cadeia de instanciação |

### 1.8 Tese

> **Epistemologia é o Meta Sistema Base (reflexivo) que resolve o problema de CRIAR Meta Sistemas Derivados com propriedades anti-entrópicas.**
>
> **Pré-requisito:** GENESIS (STUB) resolve Bootstrap Circular e Entropia Contextual.
>
> **Estrutura:** Hierarquia de Clabjects com composição fractal (auto-similar).
>
> **Propriedades herdadas por todos os níveis:**
> 1. Redução Entrópica
> 2. Recursividade (M0-M4)
> 3. Persistência
> 4. Reutilização
>
> **Mecanismo:** Cada Meta Sistema é simultaneamente:
> - **Classe** (define Sub-Meta Sistemas abaixo)
> - **Instância** (é definido pelo nível acima)
> - **Par E/O local** (epistemologia própria → ontologia própria)
>
> **Emergência:** Ontologia (conhecimento validado) emerge da execução de cada nível.
>
> **Retroalimentação:** Após estabilização, Epistemologia retroalimenta GENESIS (v0.10 → v1.0) via método G4.

---

## 2. Marco Teórico (M1)

### 2.1 Conceitos Fundamentais

| Conceito | Teoria | Aplicação no Sistema |
|----------|--------|---------------------|
| **Entropia** | Shannon (1948) - Information Theory | Estrutura explícita reduz incerteza; diagrama-first |
| **Autopoiesis** | Maturana & Varela (1980) | Sistema se autoproduz via recursividade |
| **Recursividade** | Gödel, Turing, Hofstadter | M0-M4 aplicado a si mesmo |
| **Epistemologia vs Ontologia** | Filosofia clássica | Classes (como conhecer) ≠ Instâncias (o que existe) |
| **Knowledge Management** | Nonaka & Takeuchi, von Krogh | Ciclo de criação e persistência de conhecimento |
| **Meta Object Facility** | OMG (1997) | Hierarquia de meta-níveis, Clabject, Strict Metamodeling |
| **Fractal Organizations** | BCG, Sociocracy 3.0 | Auto-similaridade, herança de propriedades |
| **Model of Hierarchical Complexity** | Commons | Coordenação hierárquica, emergência |

### 2.2 Teoria da Informação (Shannon)

| Princípio | Fonte | Aplicação |
|-----------|-------|-----------|
| Entropia como incerteza | Shannon (1948) | Conhecimento sem estrutura = alta entropia = degrada |
| Padrões reduzem entropia | Quanta Magazine | Diagrama-first: estrutura visual reduz incerteza |
| Redundância controlada | Information Theory | Frontmatter + histórico = redundância útil |

**Insight central:** Mensagens estruturadas requerem menos bits para comunicar a mesma informação. Aplicado a conhecimento: estrutura explícita (diagramas, classes, atributos) reduz a "entropia epistêmica" - a degradação do conhecimento ao longo do tempo.

### 2.3 Autopoiesis (Maturana & Varela)

| Princípio | Fonte | Aplicação |
|-----------|-------|-----------|
| Auto-produção | Maturana & Varela (1980) | Sistema gera seus próprios componentes |
| Clausura operacional | Luhmann (1986) | Sistema opera sobre si mesmo recursivamente |
| Distinção sistema/ambiente | Teoria de Sistemas | Epistemologia (interno) ≠ Domínios (externo) |

**Insight central:** Sistemas autopoiéticos reproduzem seus componentes através de operações internas. Epistemologia é autopoiética: usa M0-M4 para definir as próprias classes de M0-M4.

**Extensão para nosso contexto:** Autopoiesis **generativa** - não apenas se autoproduz, mas produz outros sistemas da mesma natureza (Meta Sistemas Derivados).

### 2.4 Recursividade e Meta-Programação

| Princípio | Fonte | Aplicação |
|-----------|-------|-----------|
| Auto-referência | Gödel (1931), Hofstadter | Sistema pode referenciar a si mesmo |
| Turing-completude | Turing (1936) | Sistema pode modificar suas próprias instruções |
| Recursive Self-Improvement | AI Research | Sistema melhora a si mesmo iterativamente |

**Insight central:** Sistemas recursivos que operam sobre si mesmos podem evoluir sem intervenção externa. M0-M4 aplicado às classes de M0-M4 = evolução endógena.

### 2.5 Epistemologia vs Ontologia

| Aspecto | Epistemologia | Ontologia |
|---------|---------------|-----------|
| **Pergunta** | "Como conhecer?" | "O que existe?" |
| **Natureza** | Método, processo | Entidade, fato |
| **Artefato** | Classe, Framework | Instância, Dado |
| **Estabilidade** | Estrutural | Contextual |
| **Exemplo** | Classe "Produto" | Produto "ZAZ Energy v1.0" |

**Insight central:** Separar "como conhecer" de "o que existe" permite que o método (Epistemologia) seja reutilizado em N domínios, enquanto as instâncias (Ontologia) são específicas de cada domínio.

**Extensão - Par E/O Local:** Cada nível da hierarquia tem seu próprio par E/O. A Ontologia de um nível pode virar Epistemologia do nível inferior (herança E→O→E).

### 2.6 Knowledge Management

| Modelo | Fonte | Aplicação |
|--------|-------|-----------|
| SECI (Socialização→Externalização→Combinação→Internalização) | Nonaka & Takeuchi | M0-M4 como externalização estruturada |
| Organizational Epistemology | von Krogh & Roos | Classes como "conhecimento codificado" |
| Applied Epistemology | Garfield | KM como "epistemologia aplicada" |

**Insight central:** Knowledge Management é epistemologia aplicada - gerenciar "o que sabemos e como sabemos". M0-M4 operacionaliza isso com ciclo explícito.

### 2.7 Meta Object Facility (MOF) - OMG

| Princípio | Fonte | Aplicação |
|-----------|-------|-----------|
| Hierarquia de meta-níveis | OMG MOF (1997) | Epistemologia → Meta Sistema → Sub-Meta Sistema → Ontologia |
| Clabject | MOF Specification | Elemento que é Classe (para baixo) e Objeto (para cima) |
| Strict Metamodeling | ISO 19502 | Cada nível é instância estrita do nível superior |
| Reflexividade | MOF M3 | Epistemologia define a si mesma via M0-M4 |

**Insight central:** MOF prova que hierarquias de meta-níveis são viáveis e padronizáveis. A arquitetura de 4 camadas (M3→M2→M1→M0) é padrão ISO usado em UML, CWM, etc.

**Diferencial nosso:** MOF foca em software/UML. Nossa Epistemologia foca em **conhecimento** e adiciona:
- Par E/O explícito em cada nível
- M0-M4 como método (não confundir com camadas M3/M2/M1/M0 do MOF)
- Propriedades anti-entrópicas herdáveis

### 2.8 Fractal Organizations

| Princípio | Fonte | Aplicação |
|-----------|-------|-----------|
| Auto-similaridade | BCG (2022), Sociocracy 3.0 | Mesma estrutura (E + O + N Subs) em qualquer nível |
| Herança de propriedades | Fractal Organization Theory | Redução entrópica, persistência fluem para todos os níveis |
| Autonomia local | Raye (2013) | Cada Meta Sistema tem sua epistemologia local |
| Democratização de dados | BCG | Informação flui das bordas para o centro e vice-versa |

**Insight central:** Organizações fractais são mais adaptáveis porque a mesma estrutura se repete em cada nível, permitindo autonomia local com coerência global.

**Aplicação:** Meta Sistemas são "organizações fractais de conhecimento" - cada um tem a mesma estrutura (Par E/O + Sub-Meta Sistemas) mas contexto próprio.

### 2.9 Model of Hierarchical Complexity (MHC)

| Princípio | Fonte | Aplicação |
|-----------|-------|-----------|
| Coordenação hierárquica | Commons (MHC) | Meta Sistema coordena Sub-Meta Sistemas |
| Emergência | Complexity Theory | Ontologia emerge da execução (não é pré-definida) |
| Metasistemático | MHC Stage 12 | Criar metasistemas de sistemas |

**Insight central:** Níveis superiores coordenam níveis inferiores. Propriedades emergem da composição, não são impostas de cima.

### 2.10 Diagrama: Marco Teórico Consolidado

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 MARCO TEÓRICO EPISTEMOLOGIA (Consolidado)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FUNDAMENTOS TEÓRICOS:                                                      │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐    │
│  │ Shannon     │ Autopoiesis │ MOF (OMG)   │ Fractal Org │ MHC         │    │
│  │ (1948)      │ (1980)      │ (1997)      │ (2022)      │ (Commons)   │    │
│  ├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤    │
│  │ Entropia    │ Auto-       │ Clabject    │ Auto-       │ Coordenação │    │
│  │ Redução     │ produção    │ Strict Meta │ similaridade│ Hierárquica │    │
│  │             │ Generativa  │ Reflexivo   │ Herança     │ Emergência  │    │
│  └──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┘    │
│         │             │             │             │             │           │
│         ▼             ▼             ▼             ▼             ▼           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    PROPRIEDADES DERIVADAS                           │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                     │    │
│  │  • Redução Entrópica (Shannon)                                      │    │
│  │  • Recursividade + Reflexividade (Autopoiesis + MOF)                │    │
│  │  • Composição Fractal + Par E/O Local (Fractal + MOF)               │    │
│  │  • Herança de Propriedades (Fractal)                                │    │
│  │  • Coordenação + Emergência (MHC)                                   │    │
│  │  • Persistência (KM)                                                │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  CONCEITO CENTRAL - CLABJECT COM PAR E/O:                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │  NÍVEL SUPERIOR (olha como OBJETO)                                  │    │
│  │         │                                                           │    │
│  │         ▼                                                           │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │              META SISTEMA (CLABJECT)                        │    │    │
│  │  │  ┌───────────────────┬───────────────────┐                  │    │    │
│  │  │  │ EPISTEMOLOGIA     │ ONTOLOGIA         │                  │    │    │
│  │  │  │ LOCAL             │ LOCAL             │                  │    │    │
│  │  │  │ (Classes)         │ (Instâncias)      │                  │    │    │
│  │  │  │        │          │       ▲           │                  │    │    │
│  │  │  │        └──executa─┼───────┘           │                  │    │    │
│  │  │  └───────────────────┴───────────────────┘                  │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │         │                                                           │    │
│  │         ▼                                                           │    │
│  │  NÍVEL INFERIOR (olha como CLASSE)                                  │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  HERANÇA E→O→E (Ontologia de cima vira Epistemologia de baixo):            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │  EPISTEMOLOGIA BASE                                                 │    │
│  │  ├── E: Classes fundacionais                                        │    │
│  │  └── O: "Meta Sistema Mercado" ◄──────────────────────┐             │    │
│  │              │                                        │             │    │
│  │              ▼                                        │             │    │
│  │  META SISTEMA MERCADO                                 │             │    │
│  │  ├── E: Classe "Segmento" (herdou de cima) ◄──────────┘             │    │
│  │  └── O: "Segmento PMEs" ◄─────────────────────────────┐             │    │
│  │              │                                        │             │    │
│  │              ▼                                        │             │    │
│  │  SUB-SISTEMA SEGMENTO                                 │             │    │
│  │  ├── E: Classe "Persona" (herdou de cima) ◄───────────┘             │    │
│  │  └── O: "Persona João, dono de PME"                                 │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.11 Síntese: Propriedades Fundamentadas

| Propriedade | Fundamento Teórico | Operacionalização |
|-------------|-------------------|-------------------|
| **Redução Entrópica** | Shannon - estrutura reduz incerteza | Diagrama-first, SSOT, atomicidade |
| **Recursividade** | Autopoiesis + MOF - sistema se autoproduz e é reflexivo | M0-M4 aplicado a si mesmo |
| **Composição Fractal** | Fractal Orgs - auto-similaridade | Mesma estrutura em cada nível |
| **Clabject** | MOF - elemento dual | Meta Sistema é Classe e Objeto simultaneamente |
| **Par E/O Local** | Filosofia + MOF | Cada nível tem epistemologia e ontologia próprias |
| **Herança E→O→E** | MOF Strict Metamodeling | Ontologia de cima vira Epistemologia de baixo |
| **Coordenação Hierárquica** | MHC | Meta Sistema coordena Sub-Meta Sistemas |
| **Emergência** | MHC + Complexity | Ontologia emerge da execução |
| **Persistência** | KM - conhecimento codificado | GitHub + frontmatter + histórico |

---

## 3. Objeto (M2)

### 3.1 Definição

**Epistemologia** é o Meta Sistema Base (reflexivo) que:
- **Cria** Meta Sistemas Derivados com propriedades anti-entrópicas
- **Define** as classes fundacionais reutilizáveis em qualquer domínio
- **Fornece** o método M0-M4 para estruturação de conhecimento
- **Garante** herança de propriedades para todos os níveis da hierarquia

### 3.2 Tipo

| Aspecto | Valor |
|---------|-------|
| **Tipo** | Framework |
| **Natureza** | Meta Sistema Base (reflexivo) |
| **Camada** | 3 (Framework/Epistemologia) |

### 3.3 Fronteiras

| Fronteira | Descrição |
|-----------|-----------|
| **Superior** | GENESIS (Camada 1) - infraestrutura de bootstrap |
| **Inferior** | Meta Sistemas Derivados (Camada 4+) - consumidores |
| **Lateral** | Infraestrutura (00_I) - ferramentas de persistência |

### 3.4 O que É vs O que NÃO É

| Epistemologia É | Epistemologia NÃO É |
|-----------------|---------------------|
| Fábrica de Meta Sistemas | O conhecimento em si (Ontologia) |
| Método de estruturação (M0-M4) | Conteúdo de domínio específico |
| Classes fundacionais reutilizáveis | Instâncias de um domínio |
| Propriedades herdáveis | Dados brutos |
| Reflexiva (define a si mesma) | Dependente de domínio externo |

### 3.5 Componentes

| Componente | Tipo | Função |
|------------|------|--------|
| **Problema (M0)** | Classe | Identifica sintomas, causas, necessidades |
| **Marco Teórico (M1)** | Classe | Fundamenta teoricamente |
| **Objeto (M2)** | Classe | Define escopo e fronteiras |
| **Classe (M3)** | Classe | Especifica atributos e métodos |
| **Documento (M4)** | Classe | Persiste e versiona |
| **M0-M4** | Método | Ciclo recursivo de estruturação |

### 3.6 Entradas e Saídas

| Entrada | Saída |
|---------|-------|
| Domínio não estruturado | Meta Sistema Derivado funcional |
| Problema identificado | Classes do domínio |
| Necessidade de conhecimento | Ontologia (instâncias validadas) |

### 3.7 Dependências

| Depende de | Para |
|------------|------|
| GENESIS | Infraestrutura de bootstrap |
| GitHub | Persistência versionada |
| Frontmatter | Metadados estruturados |

| É dependência de | Para |
|------------------|------|
| Meta Sistemas Derivados | Classes fundacionais |
| Sub-Meta Sistemas | Herança de propriedades |
| Ontologia | Método de criação |

### 3.8 Diagrama do Objeto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        OBJETO: EPISTEMOLOGIA                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DEFINIÇÃO: Meta Sistema Base (reflexivo) que cria Meta Sistemas Derivados  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         FRONTEIRAS                                  │    │
│  │                                                                     │    │
│  │  ▲ GENESIS (Camada 1) - infraestrutura                              │    │
│  │  │                                                                  │    │
│  │  │  ┌───────────────────────────────────────────────────────────┐   │    │
│  │  │  │              EPISTEMOLOGIA (Camada 3)                     │   │    │
│  │  │  │                                                           │   │    │
│  │  │  │  COMPONENTES:                                             │   │    │
│  │  │  │  ┌─────────┬─────────┬─────────┬─────────┬─────────┐      │   │    │
│  │  │  │  │Problema │ Marco   │ Objeto  │ Classe  │Documento│      │   │    │
│  │  │  │  │ (M0)    │ (M1)    │ (M2)    │ (M3)    │ (M4)    │      │   │    │
│  │  │  │  └─────────┴─────────┴─────────┴─────────┴─────────┘      │   │    │
│  │  │  │                       │                                   │   │    │
│  │  │  │  MÉTODO: M0-M4 ◄──────┘                                   │   │    │
│  │  │  │                                                           │   │    │
│  │  │  │  PROPRIEDADES HERDÁVEIS:                                  │   │    │
│  │  │  │  • Redução Entrópica                                      │   │    │
│  │  │  │  • Recursividade                                          │   │    │
│  │  │  │  • Persistência                                           │   │    │
│  │  │  │  • Composição Fractal                                     │   │    │
│  │  │  │                                                           │   │    │
│  │  │  └───────────────────────────────────────────────────────────┘   │    │
│  │  │                                                                  │    │
│  │  ▼ META SISTEMAS DERIVADOS (Camada 4+) - consumidores               │    │
│  │                                                                     │    │
│  │  ◄──► INFRAESTRUTURA (00_I) - ferramentas                           │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ENTRADAS:                      SAÍDAS:                                     │
│  • Domínio não estruturado      • Meta Sistema Derivado                     │
│  • Problema identificado        • Classes do domínio                        │
│  • Necessidade                  • Ontologia (instâncias)                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3)

_A desenvolver_

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| GENESIS.md | Pai (Camada 1) - Pré-requisito resolvido |
| 00_E_1_1_Problema | Filho - Classe usada em M0 |
| 00_E_1_2_MarcoTeorico | Filho - Classe usada em M1 |
| 00_E_1_3_Objeto | Filho - Classe usada em M2 |
| 00_E_1_4_Classe | Filho - Classe usada em M3 |
| 00_E_1_6_Documento | Filho - Classe usada em M4 |
| 00_I_1_1_GitHub | Infraestrutura - COMO persistir |

### Externas

| Fonte | Conceito |
|-------|----------|
| Shannon, C. (1948). A Mathematical Theory of Communication | Entropia, Information Theory |
| Maturana, H. & Varela, F. (1980). Autopoiesis and Cognition | Autopoiesis, Auto-produção |
| Luhmann, N. (1986). Social Systems | Autopoiesis social, Clausura operacional |
| Nonaka, I. & Takeuchi, H. (1995). The Knowledge Creating Company | SECI, Knowledge Management |
| von Krogh, G. & Roos, J. (1995). Organizational Epistemology | Epistemologia organizacional |
| Garfield, S. (2019). Knowledge Management and Epistemology | KM como epistemologia aplicada |
| Hofstadter, D. (1979). Gödel, Escher, Bach | Recursividade, Auto-referência |
| OMG (1997). Meta Object Facility Specification | Clabject, Strict Metamodeling, ISO 19502 |
| BCG (2022). The Organization of the Future Is Fractal | Auto-similaridade, Herança |
| Sociocracy 3.0. Fractal Organization Pattern | Composição fractal |
| Commons, M. Model of Hierarchical Complexity | Coordenação hierárquica, Emergência |
| Raye, J. (2013). Fractal Organization Theory | Autonomia local, Fluxo de informação |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 2.2 | 2025-12-03 | 14:20 | Última versão antes revisão |
| 3.0-M0 | 2025-12-04 | 19:30 | M0 completo: Problema central definido. |
| 3.0-M0.1 | 2025-12-04 | 19:45 | Diagrama generalizado: Meta Sistema [N]. |
| 3.0-M0.2 | 2025-12-04 | 20:00 | Pré-requisitos GENESIS. Ciclo recursivo. |
| 3.0-M1 | 2025-12-04 | 20:30 | M1: Marco Teórico com 5 fundamentos. |
| 3.0-M1.1 | 2025-12-04 | 21:00 | M1 expandido: MOF, Fractal Orgs, MHC. Conceitos Clabject, Par E/O Local, Herança E→O→E. Diagrama consolidado. |
| 3.0-M2 | 2025-12-04 | 21:15 | M2 completo: Objeto definido com fronteiras, componentes, entradas/saídas, dependências. |

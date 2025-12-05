---
nome: GENESIS
versao: "1.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
etapa: M4
sprint_ref: S005-G
task_ref: T02
---

# GENESIS v1.0

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Conversas longas com LLM perdem precisão | Conceitos rediscutidos, decisões esquecidas, loops |
| Conhecimento não persiste entre sessões | Cada conversa recomeça do zero |
| Humanos gastam energia repetindo contexto | Fadiga cognitiva, inconsistência |
| LLMs sem estrutura alucinam | Predizem tokens, não raciocinam |
| Juntos, sem método, produzem entropia | Progresso não acumula |

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **GENESIS** | Framework de propósito que define a visão de Inteligência Híbrida |
| **Inteligência Híbrida** | Amplificação cognitiva via Humano + LLM + Sistema |
| **Entropia Contextual** | Perda de precisão em conversas longas; informação degrada |
| **Bootstrap Circular** | Dependência mútua entre componentes na inicialização |
| **STUB** | Versão mínima hardcoded que quebra ciclo circular |
| **Amplificação Cognitiva** | Executar atividades com menos dispêndio de energia humana |
| **Memória Externa Estruturada** | Sistema que persiste contexto para o LLM |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Humanos têm energia cognitiva limitada | Fadiga, inconsistência, erros |
| LLMs predizem tokens, não raciocinam | Alucinação, loops, perda de contexto |
| Sem sistema estruturado | Conhecimento não persiste, entropia acumula |
| Dependências circulares na inicialização | Impossível começar sem STUB |

### 1.4 Necessidade

| Necessidade | Critério de Sucesso |
|-------------|---------------------|
| Definir propósito claro | Inteligência Híbrida documentada |
| Resolver bootstrap circular | STUB funcional permite inicialização |
| Reduzir entropia contextual | Arquivos atômicos + índice versionado |
| Orquestrar método e capacidades | Hierarquia GENESIS → Epistemologia → Módulos |
| Persistir conhecimento | GitHub + frontmatter + histórico |

### 1.5 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como amplificar capacidade cognitiva humana usando LLMs,                  │
│   sem que o conhecimento degrade e o progresso se perca?"                   │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   │ decompõe em
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUBPROBLEMAS                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  BOOTSTRAP CIRCULAR │  │ ENTROPIA CONTEXTUAL │  │  FALTA DE PROPÓSITO │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Para definir o      │  │ Conversas longas    │  │ Para que serve      │  │
│  │ sistema, precisa    │  │ perdem precisão.    │  │ tudo isso?          │  │
│  │ do sistema.         │  │ Contexto dilui.     │  │ Qual a visão?       │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Solução: STUB       │  │ Solução: Arquivos   │  │ Solução:            │  │
│  │ hardcoded           │  │ atômicos + índice   │  │ Inteligência        │  │
│  │                     │  │                     │  │ Híbrida             │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   │ resolve via
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GENESIS                                        │
│                                                                             │
│  Framework de propósito que define Inteligência Híbrida:                    │
│  Humano (intenção) + LLM (fluência) + Sistema (estrutura)                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.6 Tese

> **GENESIS é o Framework de propósito que define a visão de Inteligência Híbrida: amplificar capacidade cognitiva humana via sistema estruturado.**
>
> **Contexto:**
> - Humanos têm energia cognitiva limitada
> - LLMs têm fluência mas não estrutura
> - Juntos, sem método, produzem entropia
>
> **Solução:**
> - GENESIS define o PROPÓSITO (porquê)
> - Epistemologia implementa o MÉTODO (como)
> - Módulos fornecem CAPACIDADES (o quê)
>
> **Resultado:** Sistema que reduz dispêndio de energia humana na execução de atividades cognitivas, com conhecimento que persiste e acumula.

---

## 2. Marco Teórico (M1)

### 2.1 Conceitos Fundamentais

| Conceito | Teoria | Aplicação no GENESIS |
|----------|--------|----------------------|
| **Cognição Distribuída** | Hutchins (1995) | Cognição não está só na mente, está no sistema |
| **Entropia** | Shannon (1948) | Estrutura explícita reduz incerteza e degradação |
| **Autopoiesis** | Maturana & Varela (1980) | Sistema se autoproduz e gera outros |
| **Hierarquia Fractal** | Mandelbrot (1982) | Mesma estrutura em cada nível |
| **Composição sobre Herança** | SOLID Principles | Módulos opcionais, não forçados |
| **Bootstrap** | Computer Science | STUB quebra dependência circular |

### 2.2 Cognição Distribuída (Hutchins)

| Princípio | Aplicação |
|-----------|-----------|
| Cognição não é apenas mental | Está distribuída entre pessoas, artefatos, ambiente |
| Artefatos externos ampliam cognição | GENESIS é artefato que amplia capacidade do sistema Humano+LLM |
| Sistema > soma das partes | Humano + LLM + Sistema > Humano sozinho ou LLM sozinho |

**Insight:** GENESIS é a "memória externa estruturada" que distribui a cognição entre humano, LLM e sistema persistido.

### 2.3 Teoria da Informação (Shannon)

| Princípio | Aplicação |
|-----------|-----------|
| Entropia como incerteza | Conhecimento sem estrutura = alta entropia = degrada |
| Estrutura reduz entropia | Diagrama-first, arquivos atômicos, índice versionado |
| Redundância controlada | Frontmatter + histórico = redundância útil |

**Insight:** Estrutura explícita reduz a "entropia contextual" - a degradação do conhecimento ao longo de conversas.

### 2.4 Autopoiesis (Maturana & Varela)

| Princípio | Aplicação |
|-----------|-----------|
| Auto-produção | Sistema gera seus próprios componentes |
| Generatividade | Não apenas se reproduz, mas gera OUTROS sistemas |
| Clausura operacional | Opera sobre si mesmo recursivamente |

**Insight:** GENESIS + Epistemologia formam sistema autopoiético que se melhora e gera Meta Sistemas Derivados.

### 2.5 Bootstrap (Computer Science)

| Princípio | Aplicação |
|-----------|-----------|
| Problema do ovo e galinha | Para definir sistema, precisa do sistema |
| STUB como solução | Versão mínima hardcoded quebra o ciclo |
| Refatoração posterior | STUB evolui para versão completa (v0.10 → v1.0) |

**Insight:** GENESIS v0.10 foi STUB necessário. GENESIS v1.0 é a versão refatorada com propósito explícito.

### 2.6 Diagrama: Marco Teórico Consolidado

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MARCO TEÓRICO GENESIS v1.0                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FUNDAMENTOS:                                                               │
│  ┌───────────────┬───────────────┬───────────────┬───────────────┐          │
│  │   Hutchins    │    Shannon    │   Maturana    │   Bootstrap   │          │
│  │   (1995)      │    (1948)     │   & Varela    │   (CS)        │          │
│  ├───────────────┼───────────────┼───────────────┼───────────────┤          │
│  │   Cognição    │   Entropia    │  Autopoiesis  │    STUB       │          │
│  │  Distribuída  │   Redução     │  Generativa   │   Refatora    │          │
│  └───────┬───────┴───────┬───────┴───────┬───────┴───────┬───────┘          │
│          │               │               │               │                  │
│          ▼               ▼               ▼               ▼                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    SÍNTESE: INTELIGÊNCIA HÍBRIDA                    │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                     │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │    │
│  │  │   HUMANO    │    │     LLM     │    │   SISTEMA   │              │    │
│  │  │  Intenção   │ +  │  Fluência   │ +  │  Estrutura  │ = AMPLI-     │    │
│  │  │  Supervisão │    │  Execução   │    │  Persistên- │   FICAÇÃO    │    │
│  │  │  Validação  │    │  Geração    │    │  cia        │   COGNITIVA  │    │
│  │  └─────────────┘    └─────────────┘    └─────────────┘              │    │
│  │                                                                     │    │
│  │  Cognição distribuída entre os três componentes.                    │    │
│  │  Sistema reduz entropia e persiste conhecimento.                    │    │
│  │  Resultado: menos energia humana, mais progresso acumulado.         │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.7 Síntese: Propriedades Fundamentadas

| Propriedade | Fundamento | Operacionalização |
|-------------|------------|-------------------|
| **Amplificação Cognitiva** | Hutchins | Cognição distribuída Humano+LLM+Sistema |
| **Redução Entrópica** | Shannon | Diagrama-first, arquivos atômicos, índice |
| **Generatividade** | Maturana & Varela | Sistema gera Meta Sistemas via Epistemologia |
| **Bootstrap** | CS | STUB → Refatoração → v1.0 |
| **Persistência** | KM | GitHub + frontmatter + histórico |

---

## 3. Objeto (M2)

### 3.1 Definição

**GENESIS** é o Framework de propósito que:
- **Define** a visão de Inteligência Híbrida (amplificação cognitiva)
- **Resolve** Bootstrap Circular via STUB
- **Reduz** Entropia Contextual via arquivos atômicos + índice
- **Orquestra** hierarquia de responsabilidades (Propósito → Método → Capacidades)
- **Roteia** usuários para o Meta Sistema adequado

### 3.2 Tipo

| Aspecto | Valor |
|---------|-------|
| **Tipo** | Framework |
| **Natureza** | Propósito + Orquestração + Roteamento |
| **Camada** | 1 (Stub/GENESIS) |

### 3.3 Fronteiras

| Fronteira | Descrição |
|-----------|-----------|
| **Superior** | Axiomas (Camada 0) - conceitos assumidos |
| **Inferior** | Epistemologia (Camada 3) - método M0-M4 |
| **Lateral** | Infraestrutura (Camada 2) - GitHub, persistência |

### 3.4 O que É vs O que NÃO É

| GENESIS É | GENESIS NÃO É |
|-----------|---------------|
| Propósito (PORQUÊ) | Método (isso é Epistemologia) |
| Visão de Inteligência Híbrida | Implementação de classes M0-M4 |
| Roteador para Meta Sistemas | Executor de domínios |
| Catálogo de Meta Sistemas | Conteúdo de negócio |
| Framework de propósito | Instâncias de Ontologia |

### 3.5 Hierarquia de Responsabilidades

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA DE RESPONSABILIDADES                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Camada 1) ─────────────────────────────────────────────────────   │
│  │                                                                          │
│  │  RESPONSABILIDADE: PROPÓSITO (PORQUÊ)                                    │
│  │                                                                          │
│  │  • Define visão: Inteligência Híbrida                                    │
│  │  • Resolve: Bootstrap Circular, Entropia Contextual                      │
│  │  • Orquestra: hierarquia Propósito → Método → Capacidades                │
│  │  • Roteia: usuário → Meta Sistema adequado                               │
│  │                                                                          │
│  └──────────────────────────────────────────────────────────────────────────│
│       │                                                                     │
│       │ implementa via                                                      │
│       ▼                                                                     │
│  EPISTEMOLOGIA (Camada 3) ───────────────────────────────────────────────   │
│  │                                                                          │
│  │  RESPONSABILIDADE: MÉTODO (COMO)                                         │
│  │                                                                          │
│  │  • Ciclo M0-M4 obrigatório                                               │
│  │  • Hierarquia fractal (Par E/O em cada nível)                            │
│  │  • Classes estruturais: Problema, Marco, Objeto, Classe, Documento       │
│  │                                                                          │
│  └──────────────────────────────────────────────────────────────────────────│
│       │                                                                     │
│       │ estende via módulos                                                 │
│       ▼                                                                     │
│  MÓDULOS OPCIONAIS ──────────────────────────────────────────────────────   │
│                                                                             │
│  RESPONSABILIDADE: CAPACIDADES (O QUÊ)                                      │
│                                                                             │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐                  │
│  │ Raciocínio  │ Catálogo    │ Análise     │ ...         │                  │
│  │ (Hipótese→  │ (Item,      │ (Métrica,   │             │                  │
│  │  Decisão)   │  Categoria) │  Dimensão)  │             │                  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.6 Componentes

| Componente | Tipo | Camada | Função |
|------------|------|--------|--------|
| **Axiomas** | Conceitos | 0 | POO, Recursividade, Meta-Programação, Semiótica |
| **GENESIS** | Framework | 1 | Propósito, Bootstrap, Orquestração, Roteamento |
| **Infraestrutura** | Ferramentas | 2 | GitHub, Estrutura de Pastas |
| **Epistemologia** | Framework | 3 | Método M0-M4, Classes estruturais |
| **Módulos** | Extensões | 3+ | Raciocínio, Catálogo, Análise |
| **Domínios** | Aplicação | 4 | Vendas, Glossário, etc. |

### 3.7 Entradas e Saídas

| Entrada | Saída |
|---------|-------|
| Necessidade de amplificação cognitiva | Sistema estruturado funcional |
| Domínio não estruturado | Meta Sistema Derivado |
| Conversa com LLM | Conhecimento persistido |
| Input do usuário | Roteamento para Meta Sistema |

### 3.8 Dependências

| Depende de | Para |
|------------|------|
| Axiomas (C0) | Conceitos fundamentais |
| Infraestrutura (C2) | Persistência (GitHub) |

| É dependência de | Para |
|------------------|------|
| Epistemologia (C3) | Propósito maior |
| Módulos | Visão do sistema |
| Domínios (C4) | Fundação |

### 3.9 Diagrama do Objeto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        OBJETO: GENESIS v1.0                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DEFINIÇÃO: Framework de propósito que define Inteligência Híbrida,         │
│             orquestra hierarquia e roteia para Meta Sistemas                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         FRONTEIRAS                                  │    │
│  │                                                                     │    │
│  │  ▲ AXIOMAS (C0): POO, Recursividade, Meta-Programação               │    │
│  │  │                                                                  │    │
│  │  │  ┌───────────────────────────────────────────────────────────┐   │    │
│  │  │  │                   GENESIS (C1)                            │   │    │
│  │  │  │                                                           │   │    │
│  │  │  │  PROPÓSITO: Inteligência Híbrida                          │   │    │
│  │  │  │  ┌─────────────┬─────────────┬─────────────┐              │   │    │
│  │  │  │  │   HUMANO    │     LLM     │   SISTEMA   │              │   │    │
│  │  │  │  │  Intenção   │  Fluência   │  Estrutura  │              │   │    │
│  │  │  │  └─────────────┴─────────────┴─────────────┘              │   │    │
│  │  │  │                                                           │   │    │
│  │  │  │  RESOLVE:                                                 │   │    │
│  │  │  │  • Bootstrap Circular (via STUB)                          │   │    │
│  │  │  │  • Entropia Contextual (via arquivos + índice)            │   │    │
│  │  │  │                                                           │   │    │
│  │  │  │  ROTEIA:                                                  │   │    │
│  │  │  │  • Usuário → Meta Sistema adequado                        │   │    │
│  │  │  │                                                           │   │    │
│  │  │  └───────────────────────────────────────────────────────────┘   │    │
│  │  │                           │                                      │    │
│  │  │                           │ roteia para                          │    │
│  │  │                           ▼                                      │    │
│  │  │  ┌───────────────────────────────────────────────────────────┐   │    │
│  │  │  │              META SISTEMAS (C3+)                          │   │    │
│  │  │  │  Epistemologia, Vendas, Glossário, ...                    │   │    │
│  │  │  └───────────────────────────────────────────────────────────┘   │    │
│  │  │                                                                  │    │
│  │  ▼ DOMÍNIOS (C4): Instâncias específicas                            │    │
│  │                                                                     │    │
│  │  ◄──► INFRAESTRUTURA (C2): GitHub, Estrutura de Pastas              │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3)

### 4.1 Identificação

| Campo | Valor |
|-------|-------|
| **Nome** | GENESIS |
| **Tipo** | Framework |
| **Versão** | 1.0 |
| **Camada** | 1 (Stub/GENESIS) |
| **Natureza** | Propósito + Orquestração + Roteamento |

### 4.2 Classe: MetaSistema

GENESIS mantém um catálogo de Meta Sistemas para roteamento. Cada Meta Sistema deve implementar os atributos abaixo para ser "roteável".

```
┌─────────────────────────────────────────────────────────────────┐
│                        META_SISTEMA                             │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  + nome: string                    # Ex: "Epistemologia"        │
│  + problema_que_resolve: string    # Descrição do problema      │
│  + triggers: string[]              # Palavras-chave de ativação │
│  + exemplos_uso: string[]          # Frases típicas do usuário  │
│  + nao_resolve: string[]           # O que NÃO faz              │
│  + arquivo_raiz: string            # Entry point do sistema     │
│  + pai: MetaSistema | null         # null = raiz                │
│  + sub_meta_sistemas: MetaSistema[]# Filhos                     │
│  + nivel: int                      # 0 = raiz, 1 = filho, etc.  │
│  + cobertura: enum                 # Completo | Parcial | Stub  │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  R1: contexto_roteamento obrigatório (problema + triggers)      │
│  R2: sem contexto_roteamento = invisível para GENESIS           │
│  R3: cobertura define se resolve 100% ou parcial                │
├─────────────────────────────────────────────────────────────────┤
│  Instâncias (atual)                                             │
│  ──────────────────                                             │
│  - Epistemologia: "estruturar conhecimento", C3                 │
├─────────────────────────────────────────────────────────────────┤
│  Instâncias (futuro)                                            │
│  ──────────────────                                             │
│  - Vendas: "gerenciar pipeline", C4                             │
│  - Glossário: "catalogar termos", C4                            │
└─────────────────────────────────────────────────────────────────┘
```

#### Estrutura Hierárquica

```
Vendas (nível 0, raiz)
├── problema_que_resolve: "gerenciar processo comercial"
├── cobertura: Parcial
├── pai: null
└── sub_meta_sistemas:
    │
    ├── Prospecção (nível 1)
    │   ├── problema_que_resolve: "gerar leads qualificados"
    │   ├── cobertura: Completo
    │   ├── pai: Vendas
    │   └── sub_meta_sistemas:
    │       └── Qualificação (nível 2)
    │           ├── problema_que_resolve: "filtrar leads por fit"
    │           ├── cobertura: Stub
    │           └── pai: Prospecção
    │
    └── Fechamento (nível 1)
        ├── problema_que_resolve: "converter oportunidade"
        ├── cobertura: Stub
        └── pai: Vendas
```

### 4.3 Atributos GENESIS

#### 4.3.1 Atributos de Identificação

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `nome` | String | ✅ | "GENESIS" |
| `versao` | SemVer | ✅ | Versão semântica (ex: "1.0") |
| `tipo` | Enum | ✅ | "Framework" |
| `camada` | Integer | ✅ | 1 |
| `status` | Enum | ✅ | Draft, Review, Published |

#### 4.3.2 Atributos de Propósito

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `visao` | String | ✅ | "Inteligência Híbrida" |
| `tese` | String | ✅ | Declaração do propósito central |
| `problemas_resolvidos` | Array[String] | ✅ | [Bootstrap Circular, Entropia Contextual] |

#### 4.3.3 Atributos Estruturais

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `camadas` | Array[Camada] | ✅ | [Axiomas, Stub, Infra, Framework, Domínios] |
| `catalogo_meta_sistemas` | Array[MetaSistema] | ✅ | Meta Sistemas disponíveis para roteamento |
| `indice_arquivos` | Array[Arquivo] | ✅ | Catálogo de arquivos do sistema |

#### 4.3.4 Atributos de Relação

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| `depende_de` | Array[Referência] | ✅ | [Axiomas, Infraestrutura] |
| `eh_dependencia_de` | Array[Referência] | ✅ | [Epistemologia, Módulos, Domínios] |

### 4.4 Métodos

#### 4.4.1 Diagrama Resumido

```
┌─────────────────────────────────────────────────────────────────┐
│                       GENESIS - MÉTODOS                         │
└─────────────────────────────────────────────────────────────────┘

                          input_usuario
                                │
                                ▼
                    ┌───────────────────────┐
                    │  1. definir_problema  │
                    └───────────────────────┘
                                │
                                │ {dominio, acao, necessidade}
                                │
                                ▼
                    ┌───────────────────────┐
                    │      2. rotear        │
                    └───────────────────────┘
                                │
                                │ {meta_sistema, cobertura, nivel}
                                │
                                ▼
                    ┌───────────────────────┐
                    │  3. confirmar_rota    │
                    └───────────────────────┘
                                │
                                │ boolean
                                │
                                ▼
                    ┌───────────────────────┐
                    │   4. executar_rota    │
                    └───────────────────────┘
                                │
                                ▼
                       contexto_meta_sistema
```

#### 4.4.2 Diagrama Detalhado

```
┌─────────────────────────────────────────────────────────────────┐
│                  GENESIS - MÉTODOS (DETALHADO)                  │
└─────────────────────────────────────────────────────────────────┘


                          input_usuario
                                │
                                │
════════════════════════════════════════════════════════════════════
                     1. definir_problema()
════════════════════════════════════════════════════════════════════
                                │
                                │  Usa: Classe Problema (M0)
                                │       da Epistemologia
                                │
                                ▼
                    extrair_significantes()
                                │
                                ▼
                     mapear_significados()
                                │
                                ▼
                   identificar_necessidade()
                                │
                                ▼
                    Output: {dominio, acao, necessidade}
                                │
                                │
════════════════════════════════════════════════════════════════════
                          2. rotear()
════════════════════════════════════════════════════════════════════
                                │
                                ▼
                      recuperar_catalogo()
                                │
                                ▼
                       MetaSistema[]
                                │
                                ▼
                 match_semantico(problema, catalogo)
                                │
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
        Match 100%        Match parcial       Sem match
              │                 │                 │
              ▼                 ▼                 ▼
      cobertura:          cobertura:        cobertura:
       Completo            Parcial             null
              │                 │                 │
              └─────────────────┼─────────────────┘
                                │
                                ▼
              Output: {meta_sistema, cobertura, nivel}
                                │
                                │
════════════════════════════════════════════════════════════════════
                      3. confirmar_rota()
════════════════════════════════════════════════════════════════════
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
         Completo           Parcial             null
              │                 │                 │
              ▼                 ▼                 ▼
       "Encontrei        "Encontrei [X]     "Não encontrei
        [X]. Deseja       mas não cobre      meta-sistema.
        entrar?"          [Y]. Criar sub?"   Criar novo?"
              │                 │                 │
              └─────────────────┼─────────────────┘
                                │
                                ▼
                        usuario_confirma()
                                │
                                ▼
                         Output: boolean
                                │
                                │
════════════════════════════════════════════════════════════════════
                       4. executar_rota()
════════════════════════════════════════════════════════════════════
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
      ┌───────────┐     ┌───────────┐     ┌───────────┐
      │  CASO A   │     │  CASO B   │     │  CASO C   │
      │Resolve 100│     │  Parcial  │     │Não existe │
      └───────────┘     └───────────┘     └───────────┘
              │                 │                 │
              ▼                 ▼                 ▼
        carregar_       Identifica         Usuário
        contexto()       andar             confirma
              │                 │                 │
              ▼                 ▼                 ▼
        Entra no         Usuário           Epistemologia
        Meta Sistema     confirma          .ciclo_m0_m4()
              │                 │                 │
              ▼                 ▼                 ▼
        Segue métodos    Epistemologia     Novo Meta
        do domínio       .ciclo_m0_m4()    Sistema (raiz)
                         (dentro do pai)        │
                                │                 │
                                ▼                 ▼
                         Sub-Meta-Sistema   Indexa no
                         criado             GENESIS
                                │           (automático)
                                ▼
                         Indexa no pai
                         E no GENESIS
                         (automático)
```

#### 4.4.3 Especificação dos Métodos

##### definir_problema(input_usuario)

| Campo | Valor |
|-------|-------|
| **Nome** | definir_problema |
| **Entrada** | input_usuario: String |
| **Saída** | {dominio, acao, necessidade} |
| **Usa** | Classe Problema (M0) da Epistemologia |
| **Descrição** | Aplica M0 para extrair significantes e identificar necessidade |

##### rotear(problema)

| Campo | Valor |
|-------|-------|
| **Nome** | rotear |
| **Entrada** | problema: {dominio, acao, necessidade} |
| **Saída** | {meta_sistema, cobertura, nivel} |
| **Descrição** | Consulta catálogo e faz match semântico |

##### confirmar_rota(rota)

| Campo | Valor |
|-------|-------|
| **Nome** | confirmar_rota |
| **Entrada** | rota: {meta_sistema, cobertura, nivel} |
| **Saída** | boolean |
| **Descrição** | Apresenta opção ao usuário e aguarda confirmação |

##### executar_rota(rota_confirmada)

| Campo | Valor |
|-------|-------|
| **Nome** | executar_rota |
| **Entrada** | rota_confirmada: {meta_sistema, cobertura, nivel, confirmado: true} |
| **Saída** | contexto_meta_sistema |
| **Descrição** | Carrega contexto ou chama Epistemologia para criar novo. Inclui indexação automática de novos Meta Sistemas no catálogo (menor entropia que método separado). |

### 4.5 Tabela Consolidada de Métodos

| Método | Entrada | Saída | Responsabilidade |
|--------|---------|-------|------------------|
| `definir_problema()` | input_usuario | {dominio, acao, necessidade} | Aplicar M0 ao input |
| `rotear()` | problema | {meta_sistema, cobertura, nivel} | Match semântico com catálogo |
| `confirmar_rota()` | rota | boolean | Validar com usuário |
| `executar_rota()` | rota_confirmada | contexto | Carregar ou criar Meta Sistema + indexar automaticamente |

### 4.6 Diagrama de Classe Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: GENESIS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         IDENTIFICAÇÃO                               │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  nome: String = "GENESIS"                                           │    │
│  │  versao: SemVer = "1.0"                                             │    │
│  │  tipo: Enum = Framework                                             │    │
│  │  camada: Integer = 1                                                │    │
│  │  status: Enum = {Draft, Review, Published}                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         ATRIBUTOS                                   │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  + visao: String                                                    │    │
│  │  + tese: String                                                     │    │
│  │  + problemas_resolvidos: Array[String]                              │    │
│  │  + camadas: Array[Camada]                                           │    │
│  │  + catalogo_meta_sistemas: Array[MetaSistema]                       │    │
│  │  + indice_arquivos: Array[Arquivo]                                  │    │
│  │  + depende_de: Array[Referência]                                    │    │
│  │  + eh_dependencia_de: Array[Referência]                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         MÉTODOS                                     │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  + definir_problema(input_usuario) → {dominio, acao, necessidade}   │    │
│  │  + rotear(problema) → {meta_sistema, cobertura, nivel}              │    │
│  │  + confirmar_rota(rota) → boolean                                   │    │
│  │  + executar_rota(rota_confirmada) → contexto_meta_sistema           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         RELAÇÕES                                    │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                     │    │
│  │  AXIOMAS (C0) ◄───── depende_de ───── GENESIS (C1)                  │    │
│  │                                            │                        │    │
│  │  INFRAESTRUTURA (C2) ◄── depende_de ──────┤                        │    │
│  │                                            │                        │    │
│  │                                            │ roteia para            │    │
│  │                                            ▼                        │    │
│  │                                    catalogo_meta_sistemas           │    │
│  │                                    [Epistemologia, ...]             │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Validações

| Validação | Regra | Erro se falhar |
|-----------|-------|----------------|
| `versao` | Deve seguir SemVer | "Versão inválida" |
| `camadas` | Deve ter exatamente 5 | "Camadas incompletas" |
| `visao` | Não pode ser vazio | "GENESIS sem propósito" |
| `catalogo_meta_sistemas` | Ao menos 1 (Epistemologia) | "Catálogo vazio" |
| `MetaSistema.contexto_roteamento` | Obrigatório para roteamento | "Meta Sistema invisível" |

### 4.8 Invariantes

| Invariante | Descrição |
|------------|-----------|
| **Propósito Explícito** | GENESIS sempre define Inteligência Híbrida |
| **Catálogo Atualizado** | Todo Meta Sistema está indexado |
| **Roteamento Funcional** | Sempre existe ao menos 1 Meta Sistema (Epistemologia) |
| **Hierarquia Clara** | Propósito → Método → Capacidades |

---

## 5. Fluxo de Uso

### 5.1 Fluxo Completo: Usuário → GENESIS → Meta Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│            FLUXO: USUÁRIO → GENESIS → META SISTEMA              │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                          1. USUÁRIO                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Input: "Claude, quero documentar meu processo de vendas"       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    APLICA M0 (mini)                     │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  sintoma: "processo de vendas não documentado"          │    │
│  │  significantes: [documentar, processo, vendas]          │    │
│  │  necessidade: "estruturar conhecimento de vendas"       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Output: {                                                      │
│      dominio: "vendas",                                         │
│      acao: "documentar/estruturar",                             │
│      necessidade: "estruturar conhecimento de vendas"           │
│  }                                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    2. GENESIS - ROTEAMENTO                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  rotear(problema)                                               │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           CATÁLOGO META_SISTEMAS                        │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │                                                         │    │
│  │  Epistemologia                                          │    │
│  │  ├── resolve: "estruturar qualquer domínio"             │    │
│  │  └── triggers: [documentar, estruturar, classe, M0-M4]  │    │
│  │                                                         │    │
│  │  Vendas (se existir)                                    │    │
│  │  ├── resolve: "gerenciar processo comercial"            │    │
│  │  └── triggers: [vendas, pipeline, lead, CRM]            │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│       │                                                         │
│       ▼                                                         │
│  match_semantico()                                              │
│       │                                                         │
│       ▼                                                         │
│  Output: {meta_sistema, cobertura, nivel}                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   3. DECISÃO DE ROTEAMENTO                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  CASO A: Meta Sistema existe E resolve completamente    │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  → Roteia direto para Meta Sistema                      │    │
│  │  → Usuário segue métodos do Meta Sistema                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  CASO B: Meta Sistema existe MAS resolve parcialmente   │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  → Identifica em qual "andar" parou                     │    │
│  │  → Pergunta: "Quer criar sub-meta-sistema para [X]?"    │    │
│  │  → SE sim: chama Epistemologia.ciclo_m0_m4()            │    │
│  │            para criar dentro do Meta Sistema pai        │    │
│  │  → Indexa automaticamente no catálogo                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  CASO C: Meta Sistema NÃO existe                        │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  → Pergunta: "Não existe Meta Sistema para [X].         │    │
│  │              Quer criar?"                               │    │
│  │  → SE sim: chama Epistemologia.ciclo_m0_m4()            │    │
│  │            para criar novo Meta Sistema raiz            │    │
│  │  → Indexa automaticamente no catálogo                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
      ┌───────────┐     ┌───────────┐     ┌───────────┐
      │  CASO A   │     │  CASO B   │     │  CASO C   │
      │Resolve 100│     │  Parcial  │     │Não existe │
      └───────────┘     └───────────┘     └───────────┘
              │                 │                 │
              ▼                 ▼                 ▼
        Entra no         Identifica         Usuário
        Meta Sistema      andar             confirma
              │                 │                 │
              ▼                 ▼                 ▼
        Segue métodos    Usuário           Epistemologia
        do domínio       confirma          .ciclo_m0_m4()
                                │                 │
                                ▼                 ▼
                         Epistemologia     Novo Meta
                         .ciclo_m0_m4()    Sistema (raiz)
                         (dentro do pai)        │
                                │                 ▼
                                ▼           Indexa no
                         Sub-Meta-Sistema   GENESIS
                         criado             (automático)
                                │
                                ▼
                         Indexa no pai
                         E no GENESIS
                         (automático)
```

### 5.2 Comparativo: LLM Sozinho vs LLM + GENESIS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LLM SOZINHO vs LLM + GENESIS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LLM SOZINHO:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Sessão 1: "Vamos criar um sistema"                                 │    │
│  │       ↓                                                             │    │
│  │  [Conversa longa, progresso, mas...]                                │    │
│  │       ↓                                                             │    │
│  │  Sessão 2: "Continua o sistema"                                     │    │
│  │       ↓                                                             │    │
│  │  [Esqueceu tudo. Recomeça do zero]                                  │    │
│  │       ↓                                                             │    │
│  │  Sessão N: Loop, entropia, frustração                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  LLM + GENESIS:                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Sessão 1: "Vamos criar um sistema"                                 │    │
│  │       ↓                                                             │    │
│  │  [GENESIS roteia → Epistemologia → Aplica M0-M4 → Persiste]         │    │
│  │       ↓                                                             │    │
│  │  Sessão 2: "Continua o sistema"                                     │    │
│  │       ↓                                                             │    │
│  │  [GENESIS roteia → Meta Sistema existente → Continua]               │    │
│  │       ↓                                                             │    │
│  │  Sessão N: Progresso acumulativo                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  GENESIS = roteador inteligente + memória externa estruturada               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_I/00_I_1_X_Protocolo_LLM.md | **Pré-requisito** - Como LLM acessa GENESIS (Chave → Fechadura) |
| 00_E/00_E_Epistemologia.md | Meta Sistema base - Método M0-M4 |
| 00_E/00_E_1_1_Problema.md | Classe usada por definir_problema() |
| 00_I/00_I_1_1_GitHub.md | Infraestrutura - Persistência |
| 00_E/00_E_1_6_Documento.md | Define estrutura de documentos |
| _backlog/Modulo_Raciocinio.md | Futuro - Módulo opcional |

### Externas

| Fonte | Conceito |
|-------|----------|
| Hutchins, E. (1995). Cognition in the Wild | Cognição Distribuída |
| Shannon, C. (1948). A Mathematical Theory of Communication | Entropia |
| Maturana, H. & Varela, F. (1980). Autopoiesis and Cognition | Autopoiesis |
| Mandelbrot, B. (1982). The Fractal Geometry of Nature | Hierarquia Fractal |
| Martin, R. (2000). Design Principles and Design Patterns | SOLID, Composição |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 0.1 | 2025-12-02 | - | STUB inicial. Seções 0-7. |
| 0.10 | 2025-12-04 | - | Última versão STUB antes da refatoração |
| 1.0-draft | 2025-12-05 | 16:47 | **REFATORAÇÃO COMPLETA**: Aplicado M0-M4. Propósito explícito (Inteligência Híbrida). Hierarquia clara. Marco teórico fundamentado. |
| 1.0-draft | 2025-12-05 | 17:30 | **M3 ATUALIZADO**: Classe MetaSistema para catálogo. Métodos novos (definir_problema, rotear, confirmar_rota, executar_rota). Diagramas flowchart. |
| 1.0-draft | 2025-12-05 | 18:00 | **AJUSTES**: executar_rota() inclui indexação automática. Referência ao Protocolo_LLM.md como pré-requisito. |

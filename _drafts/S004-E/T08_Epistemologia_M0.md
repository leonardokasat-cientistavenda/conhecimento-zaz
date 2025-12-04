---
nome: 00_E_Epistemologia
versao: "3.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
etapa: M0
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
| Impossível construir meta sistemas derivados | Sistema Científico Vendas ZAZ travado |

### 1.2 Significantes e Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Epistemologia** | Meta Sistema de originação e persistência de conhecimento estruturado |
| **Ontologia** | Camada de instâncias - conhecimento validado e materializado |
| **Entropia Epistêmica** | Degradação do conhecimento por falta de estrutura explícita |
| **Meta Sistema Derivado** | Sistema construído SOBRE a Epistemologia (ex: Sistema Científico Vendas ZAZ) |
| **Classe** | Molde estrutural que pode ser instanciado em múltiplos domínios |
| **Framework** | Orquestração de métodos com objetivo específico |
| **M0-M4** | Ciclo recursivo: Problema → Marco → Objeto → Classe → Documento |

### 1.3 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Conhecimento sem estrutura explícita | Degrada com tempo (máquina e humano) |
| Sem método recursivo | Cada domínio reinventa a roda |
| Sem persistência versionada | Decisões e aprendizados perdidos |
| Sem separação Epistemologia/Ontologia | Confunde "como conhecer" com "o que existe" |

### 1.4 Necessidade

| Necessidade | Critério de Sucesso |
|-------------|---------------------|
| **Método recursivo M0-M4** | Qualquer objeto passa pelo mesmo ciclo |
| **Classes reutilizáveis** | Problema, Objeto, Classe, Documento aplicáveis a qualquer domínio |
| **Redução entrópica** | Diagramas > Prosa; Estrutura explícita > Implícita |
| **Persistência versionada** | GitHub + frontmatter + histórico |
| **Base para meta sistemas derivados** | Sistema Científico Vendas ZAZ construível sobre esta fundação |

### 1.5 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│   "Como produzir conhecimento estruturado que resista à entropia           │
│    e sirva de fundação para meta sistemas derivados?"                       │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   │ resolve via
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     EPISTEMOLOGIA (Meta Sistema Base)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROPRIEDADES REQUERIDAS:                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │ Redução         │  │ Persistência    │  │ Recursividade   │              │
│  │ Entrópica       │  │ Versionada      │  │ (M0-M4)         │              │
│  │                 │  │                 │  │                 │              │
│  │ • Diagrama-first│  │ • GitHub        │  │ • Sistema usa   │              │
│  │ • Estrutura     │  │ • Frontmatter   │  │   si mesmo      │              │
│  │   explícita     │  │ • Histórico     │  │ • Classes       │              │
│  │ • SSOT          │  │ • Sprints       │  │   reutilizáveis │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
│                                                                             │
│  CLASSES FUNDACIONAIS:                                                      │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐                   │
│  │ Problema │  Marco   │  Objeto  │  Classe  │Documento │                   │
│  │   (M0)   │Teórico   │   (M2)   │   (M3)   │   (M4)   │                   │
│  │          │  (M1)    │          │          │          │                   │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘                   │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   │ habilita construção de
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   META SISTEMAS DERIVADOS (Camada 4+)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────┐      │
│  │            SISTEMA CIENTÍFICO VENDAS ZAZ (exemplo)                │      │
│  ├───────────────────────────────────────────────────────────────────┤      │
│  │                                                                   │      │
│  │  DOMÍNIOS (usa Classes da Epistemologia):                         │      │
│  │  ┌──────────┬──────────┬──────────┬──────────┐                    │      │
│  │  │ NEGÓCIO  │ MERCADO  │ PRODUTO  │   GTM    │                    │      │
│  │  │ (01)     │ (02)     │ (03)     │  (04)    │                    │      │
│  │  └──────────┴──────────┴──────────┴──────────┘                    │      │
│  │                                                                   │      │
│  │  EPISTEMOLOGIA LOCAL:           ONTOLOGIA LOCAL:                  │      │
│  │  • Pessoa, Empresa, Produto     • Instâncias validadas            │      │
│  │  • Método, CX_Artifact          • Descobertas de mercado          │      │
│  │  • VPC, SPIN, BANT              • Resultados de experimentos      │      │
│  │                                                                   │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.6 Atributos do Problema

| Atributo | Descrição | Critério de Validação |
|----------|-----------|----------------------|
| **Recursividade** | Sistema usa si mesmo para evoluir | Classes aplicam M0-M4 a si mesmas |
| **Redução Entrópica** | Estrutura explícita resiste a degradação | Diagrama-first, SSOT, atomicidade |
| **Persistência** | Conhecimento sobrevive entre sessões | GitHub + versionamento + histórico |
| **Reutilização** | Classes aplicáveis a qualquer domínio | Problema, Objeto, Classe funcionam em Vendas ZAZ |
| **Fundação** | Habilita meta sistemas derivados | Sistema Científico Vendas ZAZ construível |
| **Separação E/O** | Distingue "como conhecer" de "o que existe" | Epistemologia (classes) ≠ Ontologia (instâncias) |

### 1.7 Tese

> **Epistemologia é o Meta Sistema de originação e persistência de conhecimento estruturado.**
>
> Resolve o problema da entropia epistêmica através de:
> 1. Método recursivo (M0-M4) que força estruturação explícita
> 2. Classes reutilizáveis aplicáveis a qualquer domínio
> 3. Persistência versionada que sobrevive a sessões e pessoas
>
> **Propósito final:** Servir de fundação para meta sistemas derivados, onde as classes da Epistemologia são instanciadas em domínios específicos, gerando camada ontológica de conhecimento validado.

---

## 2. Marco Teórico (M1)

_A desenvolver_

---

## 3. Objeto (M2)

_A desenvolver_

---

## 4. Classe (M3)

_A desenvolver_

---

## 5. Referências

| Documento | Relação |
|-----------|---------|
| GENESIS.md | Pai (Camada 1) |
| 00_E_1_1_Problema | Filho - Classe usada em M0 |
| 00_E_1_2_MarcoTeorico | Filho - Classe usada em M1 |
| 00_E_1_3_Objeto | Filho - Classe usada em M2 |
| 00_E_1_4_Classe | Filho - Classe usada em M3 |
| 00_E_1_6_Documento | Filho - Classe usada em M4 |
| 00_I_1_1_GitHub | Infraestrutura - COMO persistir |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 2.2 | 2025-12-03 | 14:20 | Última versão antes revisão |
| 3.0-M0 | 2025-12-04 | 19:30 | M0 completo: Problema central definido. Tese formulada. Atributos do problema identificados. |

# Meta Sistema Seleção - Documento de Backlog

---
nome: MS_Selecao
versao: "0.2"
tipo: Backlog
classe_ref: MetaSistema
origem: conversa
status: Backlog
sprint_ref: pendente
data_captura: 2025-12-08
---

## 1. Propósito deste Documento

Preservar contexto e descobertas para construção do primeiro Meta Sistema de domínio: **Seleção de Vendedores**. Este documento captura a visão inicial, analogias identificadas, arquitetura proposta e MVP definido.

---

## 2. Posição na Hierarquia

```
GENESIS (C1) ─── PROPÓSITO
│  Inteligência Híbrida: amplificar capacidade cognitiva humana
│
└──► EPISTEMOLOGIA (C3) ─── MÉTODO
     │  M0-M4, hierarquia fractal, módulos opcionais
     │
     └──► META SISTEMAS DE DOMÍNIO (C4)
          │
          └── MS_Seleção ◄── ESTE DOCUMENTO
              │
              ├── COMPÕE: Módulo Catálogo (taxonomias)
              ├── COMPÕE: Módulo Raciocínio (decisão)
              └── COMPÕE: Módulo Análise (métricas futuras)
```

---

## 3. Problema de Negócio

### 3.1 Contexto ZAZ

| Aspecto | Descrição |
|---------|-----------|
| **Operação** | Contratação de vendedores porta a porta (campo) |
| **Volume** | Alto (muitas contratações) |
| **Decisor** | Supervisores realizam entrevistas e decidem |
| **Dependência** | 100% inteligência humana para decisão |

### 3.2 Métricas Atuais (Thresholds)

| Métrica | Meta | Prazo |
|---------|------|-------|
| **PD1 - Aproveitamento 1** | 50% dos candidatos | 4 semanas |
| **PD2 - Aproveitamento 2** | 60% dos aprovados em PD1 | + 4 semanas |

### 3.3 Sintomas Observados

| Sintoma | Evidência |
|---------|-----------|
| **Variabilidade** | Mesmo perfil aprovado/negado conforme humor do entrevistador |
| **Inconsistência** | Critérios implícitos, não documentados |
| **Subjetividade** | Decisão baseada em "feeling" |
| **Não rastreável** | Impossível auditar por que candidato X foi aprovado/negado |

### 3.4 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Processo 100% humano | Variabilidade alta |
| Sem estrutura de avaliação | Critérios inconsistentes |
| Sem persistência de dados | Sem aprendizado histórico |
| Sem framework de decisão | Cada supervisor tem seu método |

---

## 4. Analogia: Motor de Crédito

### 4.1 Mapeamento Conceitual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ANALOGIA: CRÉDITO → SELEÇÃO                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CRÉDITO                          SELEÇÃO                                   │
│  ─────────────────────────────    ─────────────────────────────             │
│  Cliente solicita crédito    →    Candidato se apresenta                    │
│  Análise cadastral           →    Verificação documental                    │
│  Score de crédito            →    Score de potencial                        │
│  Probabilidade de Default    →    Probabilidade de não performar            │
│  Decisão: aprovar/negar      →    Decisão: contratar/não contratar          │
│  Monitoramento pós-crédito   →    Acompanhamento pós-contratação            │
│                                                                             │
│  PD (Probability of Default):                                               │
│  ├── PD1: Não atingir Threshold 1 em 4 semanas                              │
│  └── PD2: Não atingir Threshold 2 em + 4 semanas                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Esteira de Aquisição de Talentos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ESTEIRA DE AQUISIÇÃO                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ATRAÇÃO         ASSESSMENT           DECISÃO           ONBOARDING          │
│  ──────────      ──────────           ───────           ──────────          │
│  "Produto":      Motor de             Contratar/        Início              │
│  Como ter        Avaliação:           Não               operação            │
│  sucesso em      • Cadastral          contratar                             │
│  vendas          • PD (scoring)                                             │
│                                                                             │
│                  ┌─────────────────────────────────────────┐                │
│                  │  CAMADAS DO MOTOR DE AVALIAÇÃO (PD)     │                │
│                  ├─────────────────────────────────────────┤                │
│                  │  1. Cadastral (nega cadastralmente)     │                │
│                  │  2. Psicografia                         │                │
│                  │  3. Skills (hard + soft)                │                │
│                  │  4. Demografia                          │                │
│                  │  5. Sentimental Analytics               │                │
│                  │  6. Objetivos Pessoais                  │                │
│                  └─────────────────────────────────────────┘                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Dimensões de Avaliação (Taxonomias)

### 5.1 Mapa de Dimensões

| Dimensão | Descrição | Exemplos de Modelos | Tipo de Dado |
|----------|-----------|---------------------|--------------|
| **Psicografia** | Perfil psicológico/comportamental | DISC, Big Five, MBTI | Qualitativo |
| **Skills** | Competências técnicas e comportamentais | Hard skills, Soft skills | Misto |
| **Demografia** | Características demográficas | Religião, estado civil, idade, localização | Categórico |
| **Sentimental Analytics** | Empatia/rapport com entrevistador | Escala de conexão | Qualitativo |
| **Objetivos Pessoais** | Motivações e metas do candidato | Alinhamento com proposta | Qualitativo |

### 5.2 Observação sobre Modelos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INTERPOLAÇÃO DE MODELOS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dentro de uma mesma CLASSE (ex: Psicografia), podem existir                │
│  MÚLTIPLOS MODELOS:                                                         │
│                                                                             │
│  Psicografia:                                                               │
│  ├── DISC (Dominância, Influência, Estabilidade, Conformidade)              │
│  ├── Big Five (OCEAN)                                                       │
│  ├── MBTI                                                                   │
│  └── Outros...                                                              │
│                                                                             │
│  IMPORTANTE: Modelos na mesma classe compartilham muitos INPUTS             │
│  mas produzem OUTPUTS diferentes.                                           │
│                                                                             │
│  → Isso implica em otimização na CAPTURA: coletar dado uma vez,             │
│    alimentar múltiplos modelos.                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Arquitetura Proposta

### 6.1 Visão em Fases

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FASES DE CONSTRUÇÃO                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FASE 1: MS_Seleção_Core (M0-M4)                                            │
│  ├── Foco: Framework conceitual + taxonomias                                │
│  ├── Output: Modelos de classificação definidos                             │
│  ├── Módulo: Catálogo (taxonomias de dimensões)                             │
│  └── Persistência: MongoDB para dados estruturados                          │
│                                                                             │
│  FASE 2: MS_Seleção_Captura (M0-M4)                                         │
│  ├── Foco: Perguntas + extração de dados                                    │
│  ├── Depende: Fase 1                                                        │
│  ├── Output: Roteiro de entrevista + checklist                              │
│  └── Lógica: Selecionar modelos → Gerar perguntas necessárias               │
│                                                                             │
│  FASE 3: MS_Seleção_Output (M0-M4)                                          │
│  ├── Foco: Dossier + Relatórios                                             │
│  ├── Depende: Fase 2                                                        │
│  └── Output: Templates + visualizações                                      │
│                                                                             │
│  FASE 4: MS_Seleção_Decisão (M0-M4)                                         │
│  ├── Foco: Módulo Raciocínio aplicado                                       │
│  ├── Depende: Fase 3 + massa crítica de dados                               │
│  ├── Output: Recomendação estruturada com hipóteses/evidências              │
│  └── Módulo: Raciocínio (decisão rastreável)                                │
│                                                                             │
│  FASE 5: MS_Seleção_Análise (futuro)                                        │
│  ├── Foco: Métricas e aprendizado                                           │
│  ├── Depende: Massa crítica (definir quantidade)                            │
│  └── Módulo: Análise (correlações, padrões)                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Camada de Captura - Detalhamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LÓGICA DE CAPTURA                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TIPOS DE DADOS:                                                            │
│                                                                             │
│  1. DADOS HUMANIZADOS (Psicografia, Sentimental)                            │
│     ├── NÃO podem ser perguntas fechadas (sim/não)                          │
│     ├── Requer perguntas abertas                                            │
│     ├── Sistema deve IDENTIFICAR informação na resposta                     │
│     └── Ex: "Me conta uma situação difícil que você superou"                │
│          → Extrair: resiliência, locus de controle, estratégia              │
│                                                                             │
│  2. DADOS BINÁRIOS/CATEGÓRICOS (Demografia, parte de Skills)                │
│     ├── Podem ser perguntas diretas                                         │
│     ├── Ou extraídos de documentos (OCR)                                    │
│     └── Ex: Estado civil, idade, certificações                              │
│                                                                             │
│  3. DADOS DE FONTES EXTERNAS                                                │
│     ├── Currículo (PDF → OCR → extração)                                    │
│     ├── LinkedIn (se disponível)                                            │
│     └── Documentos pessoais                                                 │
│                                                                             │
│  FLUXO:                                                                     │
│  Selecionar Modelos → Mapear Inputs Necessários → Identificar Fonte         │
│  → Gerar Perguntas (se entrevista) ou Processar Documento (se OCR)          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. MVP Definido

### 7.1 Escopo MVP

| Componente | Incluído | Descrição |
|------------|----------|-----------|
| **Instruir Selecionador** | ✅ | O que perguntar baseado nos modelos |
| **Importar Transcrição** | ✅ | Receber conversa e processar |
| **Checklist de Captura** | ✅ | Dados capturados vs faltantes |
| **Dossier do Candidato** | ✅ | Ficha completa estruturada |
| **Relatório Visual** | ✅ | Gráficos/visualização (HTML em MD ou Metabase) |
| **Recomendação de Decisão** | ⚠️ Parcial | Estruturada, mas sem scoring automático |
| **Análise Preditiva** | ❌ | Requer massa crítica |

### 7.2 Fluxo MVP

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO MVP                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. ANTES DA ENTREVISTA                                                     │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │  Input: Modelos selecionados (ex: DISC + Skills + Demografia)   │     │
│     │  Output: Roteiro de perguntas para o selecionador               │     │
│     │          + Instruções de como conduzir                          │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  2. DURANTE/APÓS ENTREVISTA                                                 │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │  Input: Transcrição da conversa (texto)                         │     │
│     │  Processamento: Identificar respostas → Mapear para modelos     │     │
│     │  Output: Checklist (capturado ✅ / faltando ❌)                  │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  3. OUTPUT PARA SELECIONADOR                                                │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │  a) Dossier: Ficha completa do candidato                        │     │
│     │     - Perfil psicográfico                                       │     │
│     │     - Skills mapeados                                           │     │
│     │     - Demografia                                                │     │
│     │     - Objetivos de vida                                         │     │
│     │     - Sentimental analytics                                     │     │
│     │                                                                 │     │
│     │  b) Relatório Visual: Gráficos de perfil                        │     │
│     │     - MVP: HTML embarcado em Markdown                           │     │
│     │     - Evolução: Metabase                                        │     │
│     │                                                                 │     │
│     │  c) Recomendação: Estruturada (não automática)                  │     │
│     │     - Pontos fortes identificados                               │     │
│     │     - Pontos de atenção                                         │     │
│     │     - Perguntas adicionais sugeridas                            │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Integração com Módulos GENESIS

### 8.1 Módulo Catálogo

| Uso | Descrição |
|-----|-----------|
| **Taxonomia de Dimensões** | Psicografia, Skills, Demografia, etc. |
| **Taxonomia de Modelos** | DISC, Big Five, etc. dentro de cada dimensão |
| **Catálogo Demográfico** | Religião, estado civil, idade (categorias) |
| **Busca Semântica** | Encontrar modelo adequado para necessidade |

### 8.2 Módulo Raciocínio (Fase 4)

| Uso | Descrição |
|-----|-----------|
| **Hipótese** | "Candidato X tem perfil para atingir Threshold 1" |
| **Evidência** | Dados coletados nas dimensões |
| **Inferência** | Correlação perfil → performance |
| **Decisão** | Contratar/Não contratar com justificativa rastreável |

### 8.3 Módulo Análise (Fase 5)

| Uso | Descrição |
|-----|-----------|
| **Correlações** | Quais perfis performam melhor? |
| **Padrões** | Características preditivas de sucesso |
| **Feedback Loop** | Resultado real → ajuste de modelos |

---

## 9. Questões em Aberto

| Questão | Contexto | Status |
|---------|----------|--------|
| Quantidade para massa crítica | Quantos candidatos para análise preditiva? | A definir |
| Modelos de Psicografia | DISC é suficiente ou precisa de outros? | A explorar em M1 |
| Peso das dimensões | Como ponderar psicografia vs skills vs demografia? | A definir em Fase 4 |
| Estrutura MongoDB | Collections e schemas para candidatos | A definir em Sprint |
| Sentimental Analytics | Como operacionalizar "empatia do supervisor"? | A explorar |

---

## 10. Dependências

### 10.1 Pré-requisitos

| Dependência | Status | Observação |
|-------------|--------|------------|
| GENESIS v1.0 | ✅ Concluído | Sprint S005-G |
| Epistemologia v3.4 | ✅ Concluído | Framework disponível |
| Módulo Catálogo | ✅ Publicado | v1.0 em /docs/00_E/ |
| Módulo Raciocínio | 📋 Backlog | Necessário para Fase 4 |
| Módulo Análise | 📋 Backlog | Necessário para Fase 5 |

### 10.2 Recursos Externos

| Recurso | Necessidade | Fase |
|---------|-------------|------|
| MongoDB | Persistência de dados de candidatos | Fase 1 |
| Metabase | Visualização de relatórios | Fase 3+ |
| OCR | Processamento de documentos | Fase 2 |

---

## 11. Proposta de Sprint Inicial

### Sprint S008-MS: MS_Seleção Fase 1 (Core)

| # | Task | Descrição | Entregável |
|---|------|-----------|------------|
| T01 | M0 MS_Seleção | Problema completo | _drafts/S008-MS/T01/M0_Problema.md |
| T02 | M1 MS_Seleção | Marco Teórico (DISC, crédito, etc.) | _drafts/S008-MS/T02/M1_Marco.md |
| T03 | M2 MS_Seleção | Objeto (fronteiras, entradas/saídas) | _drafts/S008-MS/T03/M2_Objeto.md |
| T04 | M3 MS_Seleção | Classes (Candidato, Dimensão, Modelo, etc.) | _drafts/S008-MS/T04/M3_Classe.md |
| T05 | M4 MS_Seleção | Documento publicado | /docs/04_Selecao/MS_Selecao.md |
| T06 | MongoDB Setup | Estrutura de collections + schemas | Collections no MongoDB |
| T07 | Catálogo Dimensões | Taxonomia de dimensões | MongoDB + Catálogo |
| T08 | Catálogo Modelos | Taxonomia de modelos (DISC, etc.) | MongoDB + Catálogo |

**Objetivo:** Framework conceitual completo + taxonomias básicas operacionais + persistência MongoDB

**Nota:** Entregáveis são drafts M0-M4 + documento publicado + MongoDB. Sem criação de .md fora do escopo GENESIS.

---

## 12. Contexto Conversacional Preservado

### 12.1 Analogia de Crédito

> "Eu tenho encarado o processo de aquisição de vendedores análogo a um produto de crédito. Temos a parte cadastral - o que nega cadastralmente. Temos a parte de Probabilidade de Default (aqui está 100% humano)."

### 12.2 Sobre Variabilidade

> "Percebo muita variabilidade no processo. Às vezes determinado perfil é aprovado/negado de acordo com o humor do entrevistador."

### 12.3 Sobre Interpolação de Modelos

> "Esses modelos têm uma grande interpolação entre eles em dados - principalmente dentro da mesma classe. O output pode ser diferente, mas eles compartilham muitos inputs."

### 12.4 Sobre Dados Humanizados

> "Quando estamos tratando de modelos 'humanizados' - psicografia e sentimental - não podem ser perguntas fechadas, tipo sim/não. Precisaremos desmontar as intenções com as entrevistas."

### 12.5 Sobre Persistência e Benefícios Futuros

> "Com esses dados 'persistidos' no banco, conseguimos montar um dossiê completo do candidato. Caso esse candidato ainda seja aprovado, teremos mais meta sistemas para frente que se beneficiarão desse output para continuarmos com a gestão dele."

### 12.6 Sobre MongoDB na Fase 1

> "Podemos usar o Mongo já na primeira fase. Sem necessidade de criar documentos .md fora do escopo definido em GENESIS."

---

## 13. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| /genesis/GENESIS.md | Framework pai |
| /docs/00_E/00_E_Epistemologia.md | Método M0-M4 |
| /docs/00_E/00_E_2_1_Catalogo.md | Módulo para taxonomias |
| /_backlog/Modulo_Raciocinio.md | Módulo para decisão (Fase 4) |

### Externas (a explorar em M1)

| Fonte | Conceito |
|-------|----------|
| DISC Assessment | Modelo de perfil comportamental |
| Big Five / OCEAN | Modelo de personalidade |
| Credit Scoring Models | Analogia de motor de decisão |
| Behavioral Economics | Vieses em entrevistas |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-08 | Documento inicial - captura de conversa |
| 0.2 | 2025-12-08 | Correção: MongoDB na Fase 1, ajuste tasks T06-T08 |

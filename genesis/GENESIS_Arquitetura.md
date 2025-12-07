---
nome: GENESIS_Arquitetura
versao: "1.0"
tipo: Documento
classe_ref: Documento
origem: interno
status: Publicado
camada: C1
pai: GENESIS
depende_de:
  - GENESIS
---

# GENESIS Arquitetura v1.0

Este documento detalha a arquitetura técnica do GENESIS, complementando a visão conceitual em GENESIS.md.

---

## 1. Visão Consolidada

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                     │
│                              GENESIS: ARQUITETURA CONSOLIDADA                                       │
│                                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│      ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │
│      │                                                                                         │    │
│      │                            INTELIGÊNCIA HÍBRIDA                                         │    │
│      │                                                                                         │    │
│      │      ┌──────────┐       ┌──────────┐       ┌────────────────────────────────────┐       │    │
│      │      │  HUMANO  │   +   │   LLM    │   +   │             SISTEMA                │       │    │
│      │      │          │       │          │       │                                    │       │    │
│      │      │ Intenção │       │ Fluência │       │  ┌──────────────────────────────┐  │       │    │
│      │      │ Validação│       │ Execução │       │  │          GENESIS             │  │       │    │
│      │      │ Decisão  │       │ Geração  │       │  │       (Orquestrador)         │  │       │    │
│      │      │          │       │          │       │  │                              │  │       │    │
│      │      └──────────┘       └────┬─────┘       │  │  ┌────────┐ ┌────────┐       │  │       │    │
│      │                              │             │  │  │Contexto│ │ Tools  │       │  │       │    │
│      │                              │             │  │  │   s    │ │externas│       │  │       │    │
│      │                              │             │  │  └────────┘ └────────┘       │  │       │    │
│      │                              │             │  │                              │  │       │    │
│      │                              │             │  │  ┌────────────────────────┐  │  │       │    │
│      │                              │             │  │  │   Módulo Autonomia     │  │  │       │    │
│      │                              │             │  │  │  (Guiado → Autônomo)   │  │  │       │    │
│      │                              │             │  │  └────────────────────────┘  │  │       │    │
│      │                              │             │  │                              │  │       │    │
│      │                              │             │  └──────────────────────────────┘  │       │    │
│      │                              │             │                                    │       │    │
│      │                              │             └────────────────────────────────────┘       │    │
│      │                              │                                                          │    │
│      │                              ▼                                                          │    │
│      │      ┌──────────────────────────────────────────────────────────────────────────┐       │    │
│      │      │                                                                          │       │    │
│      │      │  LLM recebe:                                                             │       │    │
│      │      │                                                                          │       │    │
│      │      │  1. CONTEXTO (Meta Sistema + Módulos + Estado)                           │       │    │
│      │      │  2. TOOLS disponíveis (internas + externas)                              │       │    │
│      │      │  3. MODO de operação (Guiado/Assistido/Autônomo)                         │       │    │
│      │      │                                                                          │       │    │
│      │      │  LLM EXECUTA conforme contexto, usando tools quando necessário           │       │    │
│      │      │  LOOP controlado por humano OU por Módulo Autonomia                      │       │    │
│      │      │                                                                          │       │    │
│      │      └──────────────────────────────────────────────────────────────────────────┘       │    │
│      │                                                                                         │    │
│      └─────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Modelo: 1 LLM + N Contextos

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  1 LLM + N CONTEXTOS                                                │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│  ❌ INCORRETO: "N IAs autônomas se comunicando"                                                     │
│                                                                                                     │
│     IA₁ ←──→ IA₂ ←──→ IA₃ ←──→ IA₄                                                                  │
│                                                                                                     │
│                                                                                                     │
│  ✅ CORRETO: "1 LLM + N Contextos orquestrados por GENESIS"                                         │
│                                                                                                     │
│                              ┌─────────────┐                                                        │
│                              │     LLM     │                                                        │
│                              │   (único)   │                                                        │
│                              └──────┬──────┘                                                        │
│                                     │                                                               │
│                    ┌────────────────┼────────────────┐                                              │
│                    │                │                │                                              │
│                    ▼                ▼                ▼                                              │
│             ┌───────────┐    ┌───────────┐    ┌───────────┐                                         │
│             │ Contexto  │    │ Contexto  │    │ Contexto  │                                         │
│             │ Vendas    │    │ Pricing   │    │ GTM       │                                         │
│             └───────────┘    └───────────┘    └───────────┘                                         │
│                                                                                                     │
│             GENESIS carrega UM contexto por vez                                                     │
│             LLM opera especializado naquele contexto                                                │
│             Troca de contexto = Retorno ao GENESIS                                                  │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. O que é um Contexto (Prompt Estruturado)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           CONTEXTO = PROMPT ESTRUTURADO                                             │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│  Um CONTEXTO é composto por:                                                                        │
│                                                                                                     │
│  ┌───────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  SYSTEM PROMPT (o que o LLM recebe)                                                           │  │
│  │                                                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  1. IDENTIDADE E PROPÓSITO                                                              │  │  │
│  │  │     "Você está operando como especialista em {domínio}                                  │  │  │
│  │  │      Seu objetivo é {problema_que_resolve}"                                             │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  2. META SISTEMA (conhecimento estruturado)                                             │  │  │
│  │  │     - Glossário do domínio                                                              │  │  │
│  │  │     - Classes e métodos disponíveis                                                     │  │  │
│  │  │     - Restrições e regras                                                               │  │  │
│  │  │     - Referências                                                                       │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  3. MÓDULOS ATIVOS (capacidades opcionais)                                              │  │  │
│  │  │     - SE precisa decidir → carregar Raciocínio (H→E→I→D)                                │  │  │
│  │  │     - SE precisa analisar dados → carregar Análise                                      │  │  │
│  │  │     - SE precisa autonomia → carregar Módulo Autonomia                                  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  4. TOOLS DISPONÍVEIS                                                                   │  │  │
│  │  │     - Tools internas: Catálogo.buscar(), GitHub.read(), Raciocínio.ciclo_heid()         │  │  │
│  │  │     - Tools externas: APIs, banco de dados, integrações                                 │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  5. ESTADO/HISTÓRICO (continuidade)                                                     │  │  │
│  │  │     - Decisões anteriores relevantes                                                    │  │  │
│  │  │     - Onde paramos na última sessão                                                     │  │  │
│  │  │     - Outputs de dependências (se Meta Sistema composto)                                │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                                               │  │
│  └───────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                     │
│  ESSE PROMPT ESTRUTURADO faz o LLM "parecer" um especialista diferente                              │
│  Mas é o MESMO LLM com INSTRUÇÕES DIFERENTES                                                        │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Posicionamento GENESIS

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              POSICIONAMENTO NO ESPECTRO                                             │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│      ESPECTRO DE COMPLEXIDADE:                                                                      │
│                                                                                                     │
│      SIMPLES                                                                    COMPLEXO            │
│         │                                                                           │               │
│         ▼                                                                           ▼               │
│                                                                                                     │
│      LLM puro      LLM +         LLM +            1 LLM +           Multi-LLM                       │
│      (chat)        prompt        tools            N Contextos       orquestrado                     │
│                    fixo                           (GENESIS)         (CrewAI)                        │
│                                                                                                     │
│         │             │             │                 │                 │                           │
│         ▼             ▼             ▼                 ▼                 ▼                           │
│      ┌─────┐      ┌─────┐      ┌─────┐           ┌─────┐           ┌─────┐                          │
│      │     │      │     │      │     │           │█████│           │     │                          │
│      │     │      │     │      │     │           │█████│           │     │                          │
│      └─────┘      └─────┘      └─────┘           └─────┘           └─────┘                          │
│                                                      ▲                                              │
│                                                      │                                              │
│                                                  GENESIS                                            │
│                                                  ESTÁ AQUI                                          │
│                                                                                                     │
│                                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────────────────────  │
│                                                                                                     │
│  POR QUE GENESIS ESTÁ NESSE PONTO:                                                                  │
│                                                                                                     │
│  1. ESTRUTURA > AUTONOMIA                                                                           │
│     Meta Sistemas sem módulo Raciocínio são menos inteligentes mas mais efetivos                    │
│     porque são mais restritos. Fazem menos coisas, mas fazem bem.                                   │
│                                                                                                     │
│  2. HUMANO NO LOOP                                                                                  │
│     Inteligência Híbrida = Humano supervisiona. Não queremos autonomia total.                       │
│     Queremos amplificação cognitiva com controle humano.                                            │
│                                                                                                     │
│  3. ANTI-ENTROPIA                                                                                   │
│     Multi-agente autônomo = mais entropia, mais alucinação, menos controle.                         │
│     1 LLM + N Contextos estruturados = menos entropia, mais previsibilidade.                        │
│                                                                                                     │
│  4. SIMPLICIDADE OPERACIONAL                                                                        │
│     Não precisamos gerenciar N processos LLM rodando.                                               │
│     Troca de contexto é mais barata que instanciar novo agente.                                     │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. GENESIS vs CrewAI

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  GENESIS vs CREWAI                                                  │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│                                                                                                     │
│      DIMENSÃO              │ GENESIS                    │ CREWAI / AUTOGEN                          │
│      ══════════════════════╪════════════════════════════╪═════════════════════════════════════════  │
│                            │                            │                                           │
│      Controle do Loop      │ HUMANO decide cada passo   │ SISTEMA decide autonomamente              │
│                            │                            │                                           │
│      Troca de Contexto     │ Humano aprova              │ Automática por regras/LLM                 │
│                            │                            │                                           │
│      Validação             │ A cada etapa               │ Só no final (ou nunca)                    │
│                            │                            │                                           │
│      Instâncias LLM        │ 1 LLM, N contextos         │ N instâncias simultâneas                  │
│                            │                            │                                           │
│      Comunicação           │ Humano ↔ LLM               │ LLM ↔ LLM (+ humano às vezes)             │
│                            │                            │                                           │
│      Custo por tarefa      │ Menor (1 LLM)              │ Maior (N LLMs em paralelo)                │
│                            │                            │                                           │
│      Previsibilidade       │ Alta (humano controla)     │ Baixa (emergente)                         │
│                            │                            │                                           │
│      Risco de Alucinação   │ Menor (validação contínua) │ Maior (loop sem supervisão)               │
│                            │                            │                                           │
│      Velocidade            │ Mais lento (espera humano) │ Mais rápido (autônomo)                    │
│                            │                            │                                           │
│      Caso de Uso Ideal     │ Trabalho de conhecimento   │ Tarefas repetitivas/escaláveis            │
│                            │ que requer qualidade       │ onde erros são toleráveis                 │
│                            │                            │                                           │
│                                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────────────────────  │
│                                                                                                     │
│  ÚNICA DIFERENÇA FUNDAMENTAL:                                                                       │
│                                                                                                     │
│  • GENESIS: Loop HUMANO por padrão, autonomia é OPCIONAL e CONQUISTADA                              │
│  • CREWAI:  Loop AUTÔNOMO por padrão, humano é OPCIONAL                                             │
│                                                                                                     │
│  Mesmas capacidades técnicas (contextos, tools), filosofia diferente de controle.                   │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Componentes

### 6.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   COMPONENTES GENESIS                                               │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│      ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │
│      │                                                                                         │    │
│      │                              ┌─────────────────┐                                        │    │
│      │                              │     GENESIS     │                                        │    │
│      │                              │  (Orquestrador) │                                        │    │
│      │                              └────────┬────────┘                                        │    │
│      │                                       │                                                 │    │
│      │         ┌─────────────────────────────┼─────────────────────────────┐                   │    │
│      │         │                             │                             │                   │    │
│      │         ▼                             ▼                             ▼                   │    │
│      │  ┌─────────────┐              ┌─────────────┐              ┌─────────────┐              │    │
│      │  │             │              │             │              │             │              │    │
│      │  │  CONTEXTOS  │              │    TOOLS    │              │    LOOP     │              │    │
│      │  │             │              │  (externas) │              │  (controle) │              │    │
│      │  └─────────────┘              └─────────────┘              └─────────────┘              │    │
│      │                                                                                         │    │
│      │  ✅ Meta Sistemas             ✅ APIs externas              ⚙️ Módulo Autonomia         │    │
│      │  ✅ Módulos opcionais         ✅ Código/Scripts             (Guiado/Assistido/          │    │
│      │  ✅ Catálogo                  ✅ Banco de dados              Autônomo)                  │    │
│      │  ✅ Raciocínio                ✅ Busca web                                              │    │
│      │  ✅ Epistemologia             ✅ Arquivos                                               │    │
│      │                               ✅ Integrações                                            │    │
│      │                                                                                         │    │
│      └─────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Tools

| Tipo | Exemplos | Descrição |
|------|----------|-----------|
| **Internas** | Catálogo.buscar(), GitHub.read(), Raciocínio.ciclo_heid() | Tools do próprio sistema |
| **Externas** | APIs REST, CRM, ERP, Sheets, banco de dados | Tools de sistemas terceiros |

### 6.3 Módulo Autonomia

| Modo | Descrição | Validação Humana |
|------|-----------|------------------|
| **Guiado** | Humano valida cada passo (padrão) | 100% |
| **Assistido** | Sistema executa, humano valida checkpoints | Parcial |
| **Autônomo** | Sistema executa até concluir | Só no final |

Ver: [Backlog Módulo Autonomia](/_backlog/Modulo_Autonomia.md)

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Documento pai - visão conceitual |
| docs/00_I/00_I_0_1_Glossario.md | Termos e modelo simplificado |
| _backlog/Modulo_Autonomia.md | Especificação futura do módulo |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-07 | Criação. Visão consolidada, modelo 1 LLM + N Contextos, Contexto como prompt estruturado, posicionamento vs CrewAI, componentes. |

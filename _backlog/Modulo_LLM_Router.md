---
nome: Modulo_LLM_Router
versao: "0.1"
tipo: Backlog
classe_ref: Modulo
camada: C2
origem: descoberta
status: Backlog
sprint_ref: Pendente (depende de Infra ZAZ + Genesis hospedado)
---

# Módulo LLM_Router - Documento de Contexto

## 1. Propósito deste Documento

Preservar o contexto e descobertas da análise sobre orquestração de múltiplos LLMs. Este documento define o módulo que permitirá ao Genesis selecionar, executar, monitorar e otimizar o uso de diferentes modelos de LLM baseado em capacidades, custo-benefício e aprendizado contínuo.

---

## 2. Posição na Hierarquia

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA DE RESPONSABILIDADES                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Camada 1) ─── PROPÓSITO                                           │
│  │  Tese: Inteligência Híbrida (amplificar capacidade cognitiva humana)     │
│  │                                                                          │
│  └──► INFRAESTRUTURA (Camada 2) ─── CAPACIDADES TÉCNICAS                    │
│       │                                                                     │
│       ├── MongoDB (persistência)     ✓ Configurado                          │
│       ├── GitHub (definições)        ✓ Configurado                          │
│       └── LLM_Router ◄── ESTE MÓDULO                                        │
│           │                                                                 │
│           └──► Serve todas as camadas superiores                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Decisão Arquitetural:** LLM_Router é módulo DENTRO do Genesis (C2), não sistema separado.

**Razão:** Router é o mecanismo pelo qual Genesis acessa capacidades de LLM. Infraestrutura de cognição, assim como MongoDB é infraestrutura de persistência.

---

## 3. Origem da Necessidade

### 3.1 Pergunta Gatilho

Durante análise de modelos de LLM disponíveis para o Genesis:

> "Quais modelos o Genesis poderia usar? Como decidir qual usar em cada situação?"

### 3.2 Análise que Levou ao Módulo

| Componente | Capacidade | Limitação |
|------------|------------|-----------|
| **LLMs diversos** | Diferentes especialidades (código, raciocínio, visão) | Preços e qualidades variam drasticamente |
| **Escolha manual** | Controle total | Decisões baseadas em achismo, não dados |
| **Modelo único** | Simplicidade | Subótimo - paga caro por tarefas simples |

### 3.3 Insight Central: Seleção é Problema de Classificação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROBLEMA DE CLASSIFICAÇÃO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ENTRADA:                                                                   │
│  • Tarefa (tipo, complexidade, tokens)                                      │
│  • Contexto (sensibilidade, urgência)                                       │
│  • Restrições (custo máximo, latência)                                      │
│                                                                             │
│  PROCESSAMENTO:                                                             │
│  • Classificar capacidade necessária                                        │
│  • Filtrar modelos elegíveis                                                │
│  • Aplicar regras de prioridade                                             │
│  • Verificar experimentos ativos                                            │
│                                                                             │
│  SAÍDA:                                                                     │
│  • modelo_id (qual LLM usar)                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. O Problema que o Módulo Resolve

### 4.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Escolha de modelo sem critério | "Acho que Claude é melhor para código" |
| Custos não otimizados | Usa modelo caro para tarefas simples |
| Sem aprendizado | Repete erros de seleção |
| Preços desatualizados | Decisões com dados de meses atrás |

### 4.2 Causa Raiz

| Causa | Consequência |
|-------|--------------|
| Sem taxonomia de capacidades | Não sabe o que cada modelo faz bem |
| Sem persistência de execuções | Não aprende com uso real |
| Sem feedback estruturado | Não mede qualidade das respostas |
| Sem atualização de preços | Custo-benefício calculado errado |

### 4.3 Necessidade

| Necessidade | Critério de Sucesso |
|-------------|---------------------|
| Selecionar modelo por capacidade | Match entre tarefa e especialidade do modelo |
| Aprender com execuções | Feedback fecha loop de otimização |
| Experimentar alternativas | A/B testing gera dados comparativos |
| Atualizar preços | Rankings recalculados mensalmente |

---

## 5. Arquitetura Proposta

### 5.1 Componentes

| Componente | Responsabilidade |
|------------|------------------|
| **Seletor** | Escolher modelo baseado em capacidade, regras e custo-benefício |
| **Executor** | Chamar API/modelo, medir latência, contar tokens, calcular custo |
| **Feedback** | Capturar qualidade via feedback explícito, implícito e inferido |
| **Experimentação** | Testar A/B por capacidade e fornecedor, gerar insights |
| **Atualizador** | Atualizar preços mensalmente, recalcular rankings |

### 5.2 Fluxo de Seleção em Duas Fases

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SELEÇÃO EM DUAS FASES                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FASE 1: SELECIONAR CAPACIDADE                                              │
│  ────────────────────────────                                               │
│  • Classificar tarefa (código, raciocínio, visão, etc.)                     │
│  • Determinar tier necessário (baixo, médio, alto, elite)                   │
│  • Buscar modelos candidatos da categoria                                   │
│                                                                             │
│  FASE 2: SELECIONAR FORNECEDOR                                              │
│  ─────────────────────────────                                              │
│  • Aplicar regras de negócio (custo, contexto, restrições)                  │
│  • Verificar experimentos A/B ativos                                        │
│  • Retornar modelo específico                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Hierarquia de Prioridades na Seleção

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA DE PRIORIDADES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  P0: SEGURANÇA                                                              │
│  └── Dados sensíveis? → Força modelo local/self-hosted                      │
│                                                                             │
│  P1: CAPACIDADE                                                             │
│  └── Modelo suporta tarefa? Contexto suficiente?                            │
│                                                                             │
│  P2: QUALIDADE                                                              │
│  └── Tarefa crítica? → Preferir melhor score                                │
│                                                                             │
│  P3: CUSTO                                                                  │
│  └── Qualidade similar? → Escolher mais barato                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Fluxo Completo

```
                              REQUISIÇÃO
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │   1. CLASSIFICADOR      │
                    │   • Tipo de tarefa      │
                    │   • Complexidade        │
                    │   • Tokens estimados    │
                    │   • Sensibilidade       │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │   2. VERIFICADOR DE     │
                    │      EXPERIMENTOS       │
                    └───────────┬─────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            ┌───────────────┐       ┌───────────────┐
            │  MODO NORMAL  │       │ MODO TESTE    │
            │    (90%)      │       │    (10%)      │
            └───────┬───────┘       └───────┬───────┘
                    │                       │
                    ▼                       ▼
            ┌───────────────┐       ┌───────────────┐
            │  3. SELETOR   │       │  EXPERIMENTO  │
            │  Aplica       │       │  • A/B Split  │
            │  regras       │       │  • Shadow     │
            └───────┬───────┘       │  • Tournament │
                    │               └───────┬───────┘
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │   4. EXECUTOR           │
                    │   • Chama LLM           │
                    │   • Mede latência       │
                    │   • Conta tokens        │
                    │   • Calcula custo       │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │   5. PERSISTÊNCIA       │
                    │   llm_execucoes         │
                    └───────────┬─────────────┘
                                │
                                ▼
                           RESPOSTA
                              │
                              ▼
                    ┌─────────────────────────┐
                    │   6. CAPTURA FEEDBACK   │
                    │   • Implícito (ações)   │
                    │   • Explícito (👍👎)     │
                    │   • Inferido (review)   │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │   7. ANÁLISE (batch)    │
                    │   • Correlaciona dados  │
                    │   • Sugere otimizações  │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │   8. AJUSTE DE REGRAS   │
                    │   Módulo Raciocínio     │
                    └─────────────────────────┘
```

---

## 6. Taxonomia de Capacidades

| Capacidade | Descrição | Benchmark de Referência |
|------------|-----------|------------------------|
| codigo | Geração/análise código | HumanEval, MBPP |
| raciocinio_logico | Dedução, inferência | ARC, HellaSwag |
| raciocinio_matematico | Cálculos, provas | GSM8K, MATH |
| conversacao | Chat fluido, contexto | MT-Bench |
| sumarizacao | Condensar informação | CNN/DailyMail |
| extracao | Extrair dados estruturados | SQuAD, NER |
| traducao | Multilingual | WMT, FLORES |
| visao | Imagens + texto | MMMU, VQA |
| contexto_longo | >100K tokens | RULER, Needle |
| instrucao_complexa | Multi-step, agentes | AgentBench |
| criatividade | Escrita criativa | (qualitativo) |
| velocidade | Baixa latência | TTFT, tokens/s |

---

## 7. Tipos de Feedback

| Tipo | Descrição | Esforço | Volume | Precisão |
|------|-----------|---------|--------|----------|
| **Explícito** | Usuário dá thumbs up/down | Alto | Baixo | Alta |
| **Implícito** | Comportamento: copiou, regenerou, editou | Zero | Alto | Média |
| **Inferido** | LLM reviewer analisa qualidade | Zero | Alto | Média |

### Score Consolidado

```
score_final = (0.5 × explícito) + (0.3 × implícito) + (0.2 × inferido)
```

---

## 8. Tipos de Experimento

| Tipo | Descrição | Custo Extra | Risco |
|------|-----------|-------------|-------|
| **A/B Split** | 50% recebe A, 50% recebe B | 0x | Baixo |
| **Shadow** | Executa B em paralelo, retorna só A | 2x | Zero |
| **Tournament** | Todos executam, juiz escolhe melhor | Nx | Zero |

### Experimentação Hierárquica

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EXPERIMENTAÇÃO EM DOIS NÍVEIS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  NÍVEL 1: Por CAPACIDADE                                                    │
│  └── "Para tarefas de código, qual TIPO de modelo funciona?"                │
│      Testa: modelos de código vs raciocínio vs generalistas                 │
│                                                                             │
│  NÍVEL 2: Por FORNECEDOR (dentro da capacidade vencedora)                   │
│  └── "Dentro de 'código', qual FORNECEDOR é melhor?"                        │
│      Testa: DeepSeek vs Claude vs Qwen                                      │
│                                                                             │
│  BENEFÍCIO: Reduz N×M experimentos para K×L (K,L << N,M)                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Ciclo de Atualização de Preços

**Frequência:** Mensal

**Princípio:** Método e Relógio são responsabilidades distintas

### Etapas

1. Coletar preços de fornecedores
2. Atualizar catálogo
3. Recalcular rankings custo-benefício
4. Gerar snapshot mensal
5. Analisar mudanças vs anterior
6. Gerar recomendações
7. Notificar humano

### Evolução do Scheduler

| Fase | Tecnologia |
|------|------------|
| MVP | Cron interno ou APScheduler |
| Produção | Apache Airflow |
| Escala | Temporal.io |

---

## 10. Collections MongoDB

| Collection | Descrição |
|------------|-----------|
| llm_catalogo | Modelos disponíveis com preços, capacidades e scores |
| llm_capacidades | Taxonomia de capacidades com benchmarks e líderes por tier |
| llm_regras_selecao | Regras priorizadas para seleção de modelos |
| llm_execucoes | Log de todas as execuções com métricas |
| llm_feedback | Feedback explícito, implícito e inferido por execução |
| llm_experimentos_config | Configuração de experimentos A/B ativos |
| llm_custo_beneficio_snapshots | Snapshots mensais de rankings por capacidade |
| llm_schedules_config | Configuração de jobs agendados |
| llm_alertas | Alertas de mudanças significativas de preço ou performance |

---

## 11. Infraestrutura

### 11.1 Máquina ZAZ (Compartilhada com Genesis)

| Recurso | Especificação |
|---------|---------------|
| CPU | 4 vCPU |
| RAM | 8 GB |
| Disco | 50 GB SSD |
| SO | Ubuntu 24.04 LTS |
| Rede | IP fixo, portas 80/443/8000 abertas |

### 11.2 Estimativa de Uso

| Componente | CPU (pico) | RAM |
|------------|------------|-----|
| Genesis | 0.5 vCPU | 512 MB |
| LLM_Router | 1.0 vCPU | 1 GB |
| Scheduler | 0.2 vCPU | 256 MB |
| **Total** | **~2 vCPU** | **~2.3 GB** |
| **Sobra** | ~2 vCPU | ~5.7 GB |

**Decisão:** Compartilha máquina com Genesis. Recursos sobram (~25% uso no pico).

### 11.3 GPU

**Necessário:** Não para MVP (usa apenas APIs de fornecedores)

**Futuro:** Se self-hosted for necessário para dados sensíveis

### 11.4 Requisitos de Rede

- HTTPS saída para api.openai.com
- HTTPS saída para api.anthropic.com
- HTTPS saída para generativelanguage.googleapis.com
- HTTPS saída para api.deepseek.com
- HTTPS saída para api.x.ai

### 11.5 Requisitos de Secrets

- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- GOOGLE_API_KEY
- DEEPSEEK_API_KEY
- XAI_API_KEY

---

## 12. Dependências

| Dependência | Status |
|-------------|--------|
| MongoDB Atlas (persistência) | ✓ Configurado |
| Módulo Raciocínio (calibração de regras) | Backlog (S006-E) |
| Infra ZAZ - máquina Ubuntu 4vCPU/8GB | Pendente mapeamento |
| Genesis hospedado - compartilha mesma máquina | Pendente |
| API Keys dos fornecedores LLM | Pendente |
| Acesso HTTPS para APIs externas | Verificar firewall |

---

## 13. Aprendizados Capturados

| # | Aprendizado |
|---|-------------|
| 1 | Seleção é um problema de classificação: entrada (tarefa+contexto) → saída (modelo_id) |
| 2 | Sem persistência não há aprendizado |
| 3 | Feedback implícito tem volume, explícito tem precisão - precisamos dos dois |
| 4 | Experimentação transforma achismo em dados |
| 5 | Módulo Raciocínio calibra regras, não decide cada chamada |
| 6 | Custo-benefício (qualidade/custo) é a métrica final |
| 7 | Composição sobre herança: módulo separado, não embutido |
| 8 | Preços são dados, não constantes (~50% deflação/ano) |
| 9 | Custo-benefício é métrica dinâmica (preço cai → score_por_dolar sobe) |
| 10 | Snapshots permitem auditoria de decisões históricas |
| 11 | Método e Relógio são responsabilidades distintas |
| 12 | Router é módulo DENTRO do Genesis (C2), não sistema separado |

---

## 14. Contexto Conversacional Preservado

### 14.1 Insight sobre Capacidades

> "Ao invés de testar tudo de todos os fabricantes, primeiro fazer teste por capacidade e ver output por esse atributo. Depois testar fabricantes diferentes."

### 14.2 Insight sobre Preços

> "O preço dos modelos deve decair com o tempo. Precisamos atualizar mensalmente os custos e rodar novamente o custo-benefício na camada de decidir."

### 14.3 Insight sobre Método vs Relógio

> "Os métodos de atualizar são métodos. O relógio (quando atualizar) tem que estar separado e customizável. Inicialmente dentro do próprio sistema, eventualmente Airflow."

### 14.4 Decisão de Posicionamento

> "Router é módulo DENTRO do Genesis, não outro sistema. É o mecanismo pelo qual Genesis acessa capacidades de LLM."

---

## 15. Próximos Passos

**Pré-requisitos:**
1. Infra ZAZ mapeada e disponível
2. Genesis hospedado na máquina
3. API Keys obtidas

**Sprint futura (após pré-requisitos):**

| # | Task | Descrição |
|---|------|-----------|
| T01 | M0 LLM_Router | Problema completo com sintomas, causas, necessidades |
| T02 | M1 LLM_Router | Marco Teórico (routing, load balancing, ML-based selection) |
| T03 | M2 LLM_Router | Objeto com fronteiras, entradas/saídas |
| T04 | M3 LLM_Router | Classes: Seletor, Executor, Feedback, Experimento |
| T05 | M4 LLM_Router | Documento final do Módulo |
| T06 | Collections | Criar collections no MongoDB |
| T07 | MVP Seletor | Implementar seleção básica por capacidade |
| T08 | MVP Executor | Implementar chamada a 2-3 fornecedores |
| T09 | Teste | Rodar em cenário real do Genesis |

---

## 16. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| _backlog/Modulo_Raciocinio.md | Dependência - calibra regras de seleção |
| _backlog/Infra_Genesis.md | Dependência - máquina de hospedagem |
| conhecimento-zaz.backlog_items (MongoDB) | Versão estruturada deste backlog |

### Externas

| Fonte | Conceito |
|-------|----------|
| OpenAI API Pricing | Preços GPT-4/5 |
| Anthropic Pricing | Preços Claude |
| Google Vertex AI Pricing | Preços Gemini |
| DeepSeek API Docs | Preços DeepSeek |
| HuggingFace Open LLM Leaderboard | Benchmarks de modelos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-10 | Documento inicial baseado em descoberta conversacional |

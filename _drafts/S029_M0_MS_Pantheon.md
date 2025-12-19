---
nome: MS_Pantheon
versao: "0.1"
tipo: M0 - Descoberta de Dor
classe_ref: MetaSystem
origem: interno
status: Em Análise
etapa: M0
sprint_ref: S029
camada: C2
data_criacao: 2025-12-19
refatorado_de: MS_Agente_v1.0
---

# M0 - MS_Pantheon: Descoberta de Dor

## 1. Contexto de Origem

Este documento refatora e expande o **MS_Agente v1.0** (genesis/specs/MS_Agente_v1.0.md), que foi desenvolvido nas Sprints S026/S027. Durante a implementação do MS_Pipeline (S028), identificamos gaps arquiteturais que exigem uma reconceituação.

### 1.1 O que MS_Agente resolvia

MS_Agente era um Meta System genérico para Agent Loop, permitindo:
- Múltiplos agentes reutilizarem a mesma infraestrutura
- Integração com Mattermost via Outgoing Webhook
- Orquestração via Camunda BPMN
- Persistência de execuções em MongoDB
- Chamadas a LLM via API Anthropic

### 1.2 Limitações identificadas

| Aspecto | MS_Agente v1.0 | Gap |
|---------|----------------|-----|
| Modelo | 1 agente genérico | Não define convivência entre múltiplos agentes |
| Mattermost | Canal de comunicação | Não trata como "lar" dos agentes |
| Contexto | Único por canal | Não suporta multi-contexto (Zap, HA, API) |
| Integração | Apenas MM | Não define roteamento externo |
| Deploy | Big-bang | Sem faseamento incremental |

---

## 2. Problema (Dor)

### 2.1 Dor Principal

> **Como criar um ecossistema de agentes inteligentes que coexistem, cada um com seu propósito, acessíveis de múltiplos canais (Mattermost, WhatsApp, Home Assistant, API), mantendo contexto separado por origem mas consciência unificada?**

### 2.2 Dores Derivadas

1. **Identidade fragmentada:** Agentes não têm identidade própria, são instâncias genéricas
2. **Isolamento de canais:** Usuário no WhatsApp não tem continuidade no Mattermost
3. **Roteamento complexo:** Não há regras claras de entrada/saída entre canais
4. **Consciência vs Interação:** Não diferencia mensagens de humanos vs processamentos internos do agente
5. **Deploy arriscado:** Sem validação incremental, alto risco de falha em produção

---

## 3. Proposta: MS_Pantheon

### 3.1 Conceito

**Pantheon** = morada dos deuses. Mattermost é o **lar** onde os agentes vivem e interagem. Canais externos (WhatsApp, Home Assistant, API) são **templos** onde humanos podem "orar" aos agentes.

### 3.2 Os Cinco Agentes

| Agente | Propósito | Domínio |
|--------|-----------|---------|
| **GENESIS** | O início, criação | Sistema principal, inteligência híbrida |
| **PROMETHEUS** | Traz capacidade aos humanos | Pipeline CI/CD, fábrica de software |
| **ASCLEPIUS** | Cura a dor | Gestão de produtos (MS_Produto) |
| **ATLAS** | Carrega o trabalho pendente | Gestão de backlog (MS_Backlog) |
| **KAIROS** | Momento certo de executar | Gestão de sprints (MS_Sprint) |

### 3.3 Arquitetura Conceitual

```
                    ┌─────────────────────────────────────────┐
                    │           PANTHEON (Mattermost)          │
                    │                                          │
  ┌─────────┐       │  ┌─────────┐  ┌──────────┐  ┌────────┐  │
  │WhatsApp │──────►│  │ GENESIS │  │PROMETHEUS│  │ASCLEPIUS│ │
  └─────────┘       │  └─────────┘  └──────────┘  └────────┘  │
                    │                                          │
  ┌─────────┐       │  ┌─────────┐  ┌──────────┐              │
  │Home Asst│──────►│  │  ATLAS  │  │  KAIROS  │              │
  └─────────┘       │  └─────────┘  └──────────┘              │
                    │                                          │
  ┌─────────┐       │         ▲                                │
  │ API_LLM │──────►│         │ Outgoing Webhooks              │
  └─────────┘       │         ▼                                │
                    │  ┌──────────────────────────────────┐   │
                    │  │    DMN Roteamento In/Out          │   │
                    │  └──────────────────────────────────┘   │
                    └─────────────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────────────┐
                    │              CAMUNDA                      │
                    │  ┌──────────┐  ┌──────────┐             │
                    │  │Agent Loop│  │ Workers  │             │
                    │  └──────────┘  └──────────┘             │
                    └─────────────────────────────────────────┘
```

### 3.4 Tipos de Mensagem

| Tipo | Origem | Comportamento |
|------|--------|---------------|
| **Interação Humana** | WhatsApp, HA, MM | Humano → @agente, resposta via DMN roteamento |
| **Consciência Interna** | API_LLM | Processamento interno, sem @usuário, direto ao agente |

### 3.5 Multi-Contexto

Cada usuário pode ter sessões simultâneas em diferentes canais:
- Thread WhatsApp com GENESIS
- Thread Home Assistant com KAIROS
- Thread Mattermost com PROMETHEUS

O agente mantém **consciência unificada** mas **contextos separados** por canal.

---

## 4. Faseamento do Desenvolvimento

### Fase 1: Comunicação MM Básica
> **Ciclo Epistemológico: BKL-030**

Garantir que entrada/saída funciona no Mattermost.

| Entrega | Descrição |
|---------|-----------|
| 1.1 | Outgoing webhook recebe mensagem |
| 1.2 | Orquestrador ecoa resposta |
| 1.3 | Teste: `@genesis echo` |

### Fase 2: Roteamento DMN
> **Ciclo Epistemológico: BKL-031**

Mapear atributos e rotear via DMN.

| Entrega | Descrição |
|---------|-----------|
| 2.1 | DMN entrada (identifica agente, canal origem) |
| 2.2 | DMN saída (roteia resposta para canal correto) |
| 2.3 | Mapeamento de atributos in/out |

### Fase 3: Integração APIs Externas
> **Ciclo Epistemológico: BKL-032**

Validar comunicação com Camunda e LLM.

| Entrega | Descrição |
|---------|-----------|
| 3.1 | Camunda ping-pong (bot → camunda → bot) |
| 3.2 | One-step LLM (pergunta → API Anthropic → resposta) |
| 3.3 | DMN seleção modelo + controle custos |

### Fase 4.1: Agent Loop - Contexto
> **Ciclo Epistemológico: BKL-033**

| Entrega | Descrição |
|---------|-----------|
| 4.1.1 | Worker agente-contexto funcional |
| 4.1.2 | Histórico por canal |
| 4.1.3 | System prompt carregado do GitHub |

### Fase 4.2: Agent Loop - Tool Execution
> **Ciclo Epistemológico: BKL-034**

| Entrega | Descrição |
|---------|-----------|
| 4.2.1 | Worker agente-tool (router) |
| 4.2.2 | Loop tool_use → LLM |
| 4.2.3 | Tools GitHub integradas |

### Fase 4.3: Agent Loop - Persistência
> **Ciclo Epistemológico: BKL-035**

| Entrega | Descrição |
|---------|-----------|
| 4.3.1 | Worker agente-persistir funcional |
| 4.3.2 | Schema execucoes validado |
| 4.3.3 | Métricas de custo/tokens |

---

## 5. Backlog Gerado

| ID | Fase | Título | Bloqueante |
|----|------|--------|------------|
| BKL-030 | 1 | MS_Pantheon: Comunicação MM Básica | Sim |
| BKL-031 | 2 | MS_Pantheon: Roteamento DMN In/Out | Sim |
| BKL-032 | 3 | MS_Pantheon: Integração APIs (Camunda + LLM) | Sim |
| BKL-033 | 4.1 | MS_Pantheon: Agent Loop - Contexto | Sim |
| BKL-034 | 4.2 | MS_Pantheon: Agent Loop - Tool Execution | Sim |
| BKL-035 | 4.3 | MS_Pantheon: Agent Loop - Persistência | Sim |

---

## 6. Artefatos Herdados de MS_Agente

Os seguintes artefatos do S027 serão **reaproveitados** após validação:

| Artefato | Path | Status |
|----------|------|--------|
| bpmn_ms_agente.bpmn | _artefatos/S027/bpmn/ | Revisar |
| worker anthropic | _artefatos/S027/worker/anthropic/ | OK |
| worker contexto | _artefatos/S027/worker/agente/contexto.js | Revisar |
| worker persistir | _artefatos/S027/worker/agente/persistir.js | OK |
| worker github | _artefatos/S027/worker/agente/github.js | OK |

### Gap identificado
- **agente-tool** (router de tools) **não foi implementado** no S027

---

## 7. Infraestrutura Já Criada

Durante a sessão de hoje, configuramos no Mattermost:

| Agente | user_id | token | webhook_id |
|--------|---------|-------|------------|
| genesis | noecbzw95bbnub84f8gs5xtiey | 5g65c5kwj38hdbfuox3y34benr | yigo8se5rin8pg4oarymerfacc |
| prometheus | 8o5w6p39zind8ptiqohttjtqyo | gr6pskjfx7fgdxjyggazrocuew | panciqbkobbejrjnqipsapr3fa |
| asclepius | 4kb997sanjbgmci79mfm6efu8e | rfayfmx7pfbufgka5tbipxrfjy | w17884yqtbb3d8c4x3e5ghcbnh |
| atlas | pk5a91uzwtrm9fyzbu7q554q4a | obxacdxwff8cmx1gpsbh9dsspc | 3tppxoe6qjr5bybrgwbpc51h4r |
| kairos | iapa7h6sztd8pj66598enaxb1e | g4seynz1wffbpbd4gy9hf3g4qy | rapmxw69xiyzp8y169ouswhqto |

**DMN** já configurada com 5 regras: `tipo_orquestrador` → `bpmn_ms_agente`

**Credenciais salvas:** `genesis/config/panteao_credenciais.json`

---

## 8. Próximos Passos

1. **Criar M1 (Referencial Teórico):** Consolidar arquitetura multi-agente, multi-contexto
2. **Criar 6 itens BKL:** Um para cada ciclo epistemológico
3. **Iniciar Sprint S029:** Fase 1 - Comunicação MM Básica
4. **Validação incremental:** Cada fase é testável independentemente

---

## 9. Referências

| Documento | Relação |
|-----------|---------|
| genesis/specs/MS_Agente_v1.0.md | Origem (refatorado) |
| genesis/config/panteao_credenciais.json | Credenciais MM |
| _sprints/S026_MS_Agente.md | Sprint original |
| _sprints/S027_PROMETHEUS_MS_Agente.md | Sprint artefatos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-19 | M0 criado. Refatoração de MS_Agente para MS_Pantheon. |

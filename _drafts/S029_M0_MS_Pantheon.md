---
nome: MS_Pantheon
versao: "0.3"
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
| **Criação** | **Manual via Postman** | **Sem interface para criar novos agentes** |

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
6. **Criação burocrática:** Criar novo agente exige múltiplas chamadas API manuais (Postman), sem interface no MM

---

## 3. Decisões Arquiteturais

### 3.1 Isolamento Total de Zarah

| Decisão | D001 |
|---------|------|
| **Contexto** | Orquestrador-Zarah está em produção, atendendo clientes reais |
| **Decisão** | **NÃO reutilizar código** do Orquestrador-Zarah |
| **Justificativa** | Risco de derrubar sistema operacional com alterações |
| **Consequência** | Código 100% novo para MS_Pantheon |

### 3.2 Zarah como Referência Arquitetural

| Decisão | D002 |
|---------|------|
| **Contexto** | Orquestrador-Zarah tem patterns validados em produção |
| **Decisão** | **Usar Zarah como referência** para aprender os padrões |
| **O que copiar** | Patterns de roteamento, estrutura de controllers, integração Camunda |
| **O que NÃO copiar** | Código fonte diretamente |

**Análise do Orquestrador-Zarah:**

```
Orquestrador-Zarah/
├── controller/
│   ├── mattermostController.js     # 5 rotas, lógica complexa
│   └── mattermostV2Controller.js   # 1 rota, mais limpo (referência)
├── src/services/
│   ├── camunda/                    # evaluate(), startProcess()
│   └── sistemas/
│       ├── mattermost/             # posts, users, channel, files
│       ├── rabbitmq/               # safeSendToQueue()
│       └── whatsappV2/             # sendMessage()
└── worker/                         # Workers Camunda
```

**Patterns identificados:**
- Query params para contexto: `?user_id=XXX&wa_id=YYY`
- DMN para roteamento: `dmn_processo_iniciar_orquestrador`
- RabbitMQ para signals assíncronos: `safeSendToQueue("camunda-signal", ...)`
- Upload de arquivos via MinIO

### 3.3 Stack de Observabilidade

| Decisão | D003 |
|---------|------|
| **Contexto** | Zarah usa `insertOne()` em MongoDB para logs (não estruturado) |
| **Decisão** | Implementar **Pino + ClickHouse** para observabilidade |
| **Justificativa** | Logs estruturados, análise em tempo real, custos menores |

**Stack definida:**

| Componente | Tecnologia | Propósito |
|------------|------------|-----------|
| Logger | **Pino** | Logs estruturados JSON, alta performance |
| Storage | **ClickHouse** | Análise de logs, queries analíticas |
| Transporte | Pino → ClickHouse | Stream direto ou via file rotation |

**Schema de log proposto:**

```sql
CREATE TABLE pantheon_logs (
    timestamp DateTime64(3),
    level String,
    service String,          -- 'webhook', 'worker', 'camunda'
    agent String,            -- 'genesis', 'prometheus', etc
    channel String,          -- 'mm', 'wa', 'ha', 'api'
    user_id String,
    channel_id String,
    trace_id String,         -- Correlação entre logs
    message String,
    metadata JSON
) ENGINE = MergeTree()
ORDER BY (timestamp, service, agent);
```

---

## 4. Proposta: MS_Pantheon

### 4.1 Conceito

**Pantheon** = morada dos deuses. Mattermost é o **lar** onde os agentes vivem e interagem. Canais externos (WhatsApp, Home Assistant, API) são **templos** onde humanos podem "orar" aos agentes.

### 4.2 Os Cinco Agentes

| Agente | Propósito | Domínio | 
|--------|-----------|---------| 
| **GENESIS** | O início, criação | Sistema principal, inteligência híbrida |
| **PROMETHEUS** | Traz capacidade aos humanos | Pipeline CI/CD, fábrica de software |
| **ASCLEPIUS** | Cura a dor | Gestão de produtos (MS_Produto) |
| **ATLAS** | Carrega o trabalho pendente | Gestão de backlog (MS_Backlog) |
| **KAIROS** | Momento certo de executar | Gestão de sprints (MS_Sprint) |

### 4.3 Arquitetura Conceitual

**IMPORTANTE:** APIs externas NÃO batem no Mattermost diretamente. O ponto de entrada é sempre o **Webhook do Orquestrador**. MM é um destino de saída, não entrada.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           FLUXO DE ENTRADA                                 │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐                   │
│   │WhatsApp │   │Home Asst│   │ API_LLM │   │   MM    │                   │
│   │ (Zap)   │   │  (HA)   │   │         │   │Outgoing │                   │
│   └────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘                   │
│        │             │             │             │                         │
│        └─────────────┴──────┬──────┴─────────────┘                         │
│                             ▼                                              │
│              ┌──────────────────────────────┐                              │
│              │  WEBHOOK ORQUESTRADOR        │                              │
│              │  (Ponto único de entrada)    │                              │
│              │  + Pino Logger               │                              │
│              └──────────────┬───────────────┘                              │
│                             ▼                                              │
│              ┌──────────────────────────────┐                              │
│              │     DMN ROTEAMENTO IN        │                              │
│              │  - Identifica agente         │                              │
│              │  - Identifica canal origem   │                              │
│              │  - Define processo BPMN      │                              │
│              └──────────────┬───────────────┘                              │
│                             ▼                                              │
│              ┌──────────────────────────────┐                              │
│              │         CAMUNDA              │                              │
│              │  - Agent Loop BPMN           │                              │
│              │  - Orquestra Workers         │                              │
│              └──────────────┬───────────────┘                              │
│                             ▼                                              │
│              ┌──────────────────────────────┐                              │
│              │         WORKERS              │                              │
│              │  - workerAnthropic (LLM)     │                              │
│              │  - agente-contexto           │                              │
│              │  - agente-persistir          │                              │
│              │  - sendMessage (MM)          │                              │
│              │  + Pino Logger em cada       │                              │
│              └──────────────┬───────────────┘                              │
│                             ▼                                              │
│              ┌──────────────────────────────┐                              │
│              │     DMN ROTEAMENTO OUT       │                              │
│              │  - Define canal destino      │                              │
│              │  - Formata resposta          │                              │
│              └──────────────┬───────────────┘                              │
│                             ▼                                              │
│        ┌─────────────┬──────┴──────┬─────────────┐                         │
│        ▼             ▼             ▼             ▼                         │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐                   │
│   │WhatsApp │   │Home Asst│   │ API_LLM │   │   MM    │                   │
│   │  (Zap)  │   │  (HA)   │   │Response │   │  Post   │                   │
│   └─────────┘   └─────────┘   └─────────┘   └─────────┘                   │
│                                                                            │
│                    PANTHEON (Agentes vivem no MM)                          │
│   ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌───────┐  ┌────────┐          │
│   │ GENESIS │  │PROMETHEUS│  │ASCLEPIUS│  │ ATLAS │  │ KAIROS │          │
│   └─────────┘  └──────────┘  └─────────┘  └───────┘  └────────┘          │
│                                                                            │
│                         ┌─────────────┐                                    │
│                         │ ClickHouse  │ ◄── Logs estruturados              │
│                         │   (Logs)    │                                    │
│                         └─────────────┘                                    │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Tipos de Mensagem

| Tipo | Origem | Comportamento |
|------|--------|---------------|
| **Interação Humana** | WhatsApp, HA, MM | Humano → Webhook → DMN → @agente, resposta via DMN out |
| **Consciência Interna** | API_LLM | Processamento interno, webhook direto, sem @usuário |

### 4.5 Multi-Contexto

Cada usuário pode ter sessões simultâneas em diferentes canais:
- Thread WhatsApp com GENESIS
- Thread Home Assistant com KAIROS
- Thread Mattermost com PROMETHEUS

O agente mantém **consciência unificada** mas **contextos separados** por canal.

---

## 5. Faseamento do Desenvolvimento

### Fase 0: Criação de Novos Agentes
> **Ciclo Epistemológico: BKL-029**

Resolver a dor de criação burocrática. Interface para criar novos agentes.

| Entrega | Descrição |
|---------|-----------|
| 0.1 | BPMN `criar_agente` no Camunda |
| 0.2 | Worker que chama API MM (criar user, token, webhook) |
| 0.3 | Worker que atualiza DMN com nova regra |
| 0.4 | Comando `@genesis criar agente NOME PROPOSITO` |

**Ferramentas existentes:** `genesis/tools/postman_pantheon_users.json` (referência para implementação)

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
| 3.1 | Camunda ping-pong (webhook → camunda → worker → MM) |
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

## 6. Backlog Gerado

| ID | Fase | Título | Bloqueante |
|----|------|--------|------------|
| BKL-029 | 0 | MS_Pantheon: Criação de Novos Agentes | Sim |
| BKL-030 | 1 | MS_Pantheon: Comunicação MM Básica | Sim |
| BKL-031 | 2 | MS_Pantheon: Roteamento DMN In/Out | Sim |
| BKL-032 | 3 | MS_Pantheon: Integração APIs (Camunda + LLM) | Sim |
| BKL-033 | 4.1 | MS_Pantheon: Agent Loop - Contexto | Sim |
| BKL-034 | 4.2 | MS_Pantheon: Agent Loop - Tool Execution | Sim |
| BKL-035 | 4.3 | MS_Pantheon: Agent Loop - Persistência | Sim |

---

## 7. Artefatos de Referência

> ⚠️ **IMPORTANTE:** Estes artefatos são apenas **referência para aprendizado**. Código será escrito do zero.

### 7.1 Orquestrador-Zarah (ZAZ-vendas/Orquestrador-Zarah)

| Arquivo | Aprendizado |
|---------|-------------|
| `controller/mattermostV2Controller.js` | Pattern limpo de webhook único |
| `src/services/camunda/` | evaluate(), startProcess() |
| `src/services/sistemas/mattermost/` | API posts, users, channel |
| `src/services/sistemas/rabbitmq/` | safeSendToQueue() para signals |

### 7.2 MS_Agente S027 (leonardokasat-cientistavenda/conhecimento-zaz)

| Arquivo | Aprendizado |
|---------|-------------|
| `_artefatos/S027/bpmn/bpmn_ms_agente.bpmn` | Estrutura agent loop |
| `_artefatos/S027/worker/anthropic/` | Integração API Anthropic |
| `_artefatos/S027/worker/agente/` | Patterns de contexto/persistência |

### 7.3 Gaps identificados
- **agente-tool** (router de tools) **não existe** - precisa ser criado
- **criar_agente** (workflow criação) **não existe** - precisa ser criado
- **Pino logger** - não existe em nenhum sistema atual

---

## 8. Infraestrutura Já Criada

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

**Ferramentas Postman:** `genesis/tools/postman_pantheon_users.json`

---

## 9. Próximos Passos

1. **Criar M1 (Referencial Teórico):** Consolidar arquitetura multi-agente, multi-contexto
2. **Criar 7 itens BKL:** ✅ Concluído (BKL-029 a BKL-035)
3. **Iniciar Sprint S029:** Fase 0 - Criação de Novos Agentes
4. **Validação incremental:** Cada fase é testável independentemente

---

## 10. Referências

| Documento | Relação |
|-----------|---------|
| genesis/specs/MS_Agente_v1.0.md | Origem (refatorado) |
| genesis/config/panteao_credenciais.json | Credenciais MM |
| genesis/tools/postman_pantheon_users.json | Ferramenta criação agentes |
| genesis/tools/README_pantheon_tools.md | Documentação ferramentas |
| ZAZ-vendas/Orquestrador-Zarah | Referência arquitetural |
| _sprints/S026_MS_Agente.md | Sprint original |
| _sprints/S027_PROMETHEUS_MS_Agente.md | Sprint artefatos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-19 | M0 criado. Refatoração de MS_Agente para MS_Pantheon. |
| 0.2 | 2025-12-19 | Correção arquitetura (webhook como entrada única). Adicionada Fase 0 (criação de agentes). Adicionada dor #6. |
| 0.3 | 2025-12-19 | **Decisões Arquiteturais**: D001 (isolamento Zarah), D002 (Zarah como referência), D003 (Pino + ClickHouse). Análise mattermostV2Controller. Artefatos como referência, não reaproveitamento. |

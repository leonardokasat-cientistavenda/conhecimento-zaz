# Sprint S-PANTHEON-003

---

```yaml
nome: S-PANTHEON-003
versao: "2.0"
tipo: Sprint
status: Ativa
data_criacao: "2026-01-03"
data_inicio: "2026-01-03"
objetivo: "Implementar arquitetura híbrida: NLU Haiku → DMN → Camunda/LLM com seleção dinâmica de modelo"
esforco_estimado_total: 22.5
responsavel_id: leonardo
saga_id: SAGA-PANTHEON
items_selecionados:
  - BKL-PANTHEON-001
  - BKL-PANTHEON-008
  - BKL-PANTHEON-014
  - BKL-PANTHEON-009
  - BKL-PANTHEON-010
  - BKL-PANTHEON-011
  - BKL-PANTHEON-012
  - BKL-PANTHEON-013
```

---

## 1. Objetivo

> Implementar a arquitetura V1 do Pantheon com:
> - **NLU Layer:** Haiku classifica intent, complexidade, fase
> - **DMN Router:** Seleciona modelo adequado (Haiku/Sonnet/Opus)
> - **Camunda Integration:** BPMN workflows para tools determinísticas
> - **GitHub Workers:** Leitura e escrita (com suporte a patches)

### Critério de Sucesso

```
[Leonardo]: @genesis lê o arquivo genesis/GENESIS.md e me sugere melhorias
[genesis]:  🔧 Analisando intenção... (Haiku)
            📊 Roteando: intent=analisar, modelo=sonnet
            🔧 Buscando no GitHub... (via Camunda)
            
            GENESIS é um sistema de inteligência híbrida com 3 capacidades...
            
            Sugestões de melhoria:
            1. Adicionar seção de troubleshooting
            2. ...
```

---

## 2. Arquitetura Target

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PANTHEON V1 - MODEL ROUTING VIA DMN                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   @genesis "lê genesis/GENESIS.md e sugere melhorias"                      │
│          │                                                                  │
│          ▼                                                                  │
│   ┌─────────────────┐                                                      │
│   │  Claude Haiku   │  ← SEMPRE entrada (~100ms, barato)                   │
│   │     (NLU)       │                                                      │
│   │                 │  Output:                                             │
│   │                 │  • intent: "analisar"                                │
│   │                 │  • complexidade: "média"                             │
│   │                 │  • fase: null                                        │
│   └────────┬────────┘                                                      │
│            │                                                                │
│            ▼                                                                │
│   ╔═════════════════╗                                                      │
│   ║       DMN       ║  Regras:                                             │
│   ║pantheon_router  ║  • analisar + média → SONNET                         │
│   ║                 ║  • especificar + m0 → OPUS                           │
│   ║                 ║  • github_read → workflow_github_read                │
│   ╚════════╤════════╝                                                      │
│            │                                                                │
│     ┌──────┴──────────────────┐                                            │
│     │                         │                                            │
│     ▼                         ▼                                            │
│ ┌────────────┐          ┌────────────┐                                     │
│ │   BPMN     │          │  Claude    │                                     │
│ │ Workflow   │          │  Sonnet    │                                     │
│ │ (GitHub)   │          │            │                                     │
│ └─────┬──────┘          └─────┬──────┘                                     │
│       │                       │                                            │
│       ▼                       │                                            │
│ ┌────────────┐                │                                            │
│ │  Worker    │                │                                            │
│ │  GitHub    │                │                                            │
│ └─────┬──────┘                │                                            │
│       └───────────┬───────────┘                                            │
│                   ▼                                                         │
│            ┌────────────┐                                                  │
│            │  Resposta  │                                                  │
│            │   no MM    │                                                  │
│            └────────────┘                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Escopo

| BKL | Descrição | Esforço | Prioridade |
|-----|-----------|---------|------------|
| BKL-001 | Pendências Técnicas V0.X | 2h | 🔴 Alta |
| BKL-008 | Melhorias Streaming | 2.5h | 🔴 Alta |
| BKL-014 | NLU Layer (Haiku) | 2h | 🔴 Alta |
| BKL-009 | DMN Intent Router | 4h | 🔴 Alta |
| BKL-010 | Camunda Client | 2h | 🔴 Alta |
| BKL-011 | Worker GitHub (read) | 3h | 🔴 Alta |
| BKL-012 | Worker GitHub (write/patch) | 4h | 🔴 Alta |
| BKL-013 | Código → Deploy | 3h | 🟡 Média |
| **Total** | | **22.5h** | |

---

## 4. Tasks

### T01: Pendências Técnicas V0.X
**BKL:** BKL-PANTHEON-001 | **Esforço:** 2h | **Status:** ⬜ Pendente

| Subtask | Descrição |
|---------|-----------|
| T01.1 | Testar upload de arquivos (imagem no MM) |
| T01.2 | Verificar se Web Search built-in funciona |
| T01.3 | Configurar CLICKHOUSE_PASSWORD no .env |
| T01.4 | Atualizar README.md do Pantheon |

---

### T02: Melhorias Streaming
**BKL:** BKL-PANTHEON-008 | **Esforço:** 2.5h | **Status:** ⬜ Pendente

| Subtask | Descrição |
|---------|-----------|
| T02.1 | Investigar throttle atual em streamer.js |
| T02.2 | Ajustar intervalo de atualização |
| T02.3 | Verificar rate limit MM |
| T02.4 | Validar streaming em tempo real |

**Problema:** Bots mostram "pensando..." mas não atualizam progressivamente.

---

### T03: NLU Layer (Haiku classifier)
**BKL:** BKL-PANTHEON-014 | **Esforço:** 2h | **Status:** ⬜ Pendente

Criar `pantheon/core/nluClassifier.js`:

```javascript
const NLU_PROMPT = `Você é um classificador de intenções.
Analise a mensagem e retorne JSON:
{
  "intent": "especificar|analisar|gerar_codigo|...",
  "dominio": "crm|vendas|...",
  "complexidade": "baixa|média|alta",
  "fase_detectada": "m0|m1|m2|m3|m4|null"
}`;

async function classifyIntent(message) {
  const response = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 200,
    messages: [{ role: "user", content: message }],
    system: NLU_PROMPT
  });
  return JSON.parse(response.content[0].text);
}
```

| Subtask | Descrição |
|---------|-----------|
| T03.1 | Criar nluClassifier.js com prompt |
| T03.2 | Definir schema de output |
| T03.3 | Integrar no fluxo de entrada |

---

### T04: DMN Intent Router + Model Selector
**BKL:** BKL-PANTHEON-009 | **Esforço:** 4h | **Status:** ⬜ Pendente

**DMN: pantheon_intent_router**

| Intent | Fase | Complex. | Modelo | Workflow |
|--------|------|----------|--------|----------|
| saudacao | * | * | HAIKU | null |
| pergunta_simples | * | baixa | HAIKU | null |
| especificar | m0/m1 | * | OPUS | null |
| especificar | m2-m4 | * | SONNET | null |
| gerar_codigo | * | alta | OPUS | null |
| github_read | * | * | - | workflow_github_read |
| github_write | * | * | - | workflow_github_write |
| * | * | * | SONNET | null |

| Subtask | Descrição |
|---------|-----------|
| T04.1 | Desenhar DMN no Camunda Modeler |
| T04.2 | Implementar regras de seleção |
| T04.3 | Deploy DMN no Camunda |
| T04.4 | Testar roteamento |

---

### T05: Camunda Client no Pantheon
**BKL:** BKL-PANTHEON-010 | **Esforço:** 2h | **Status:** ⬜ Pendente

Criar `pantheon/services/camunda/client.js`:

```javascript
class CamundaClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl; // http://camunda:8080/engine-rest
  }

  async evaluateDecision(decisionKey, variables) {
    const response = await fetch(
      `${this.baseUrl}/decision-definition/key/${decisionKey}/evaluate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variables })
      }
    );
    return response.json();
  }

  async startProcess(processKey, variables) {
    const response = await fetch(
      `${this.baseUrl}/process-definition/key/${processKey}/start`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variables })
      }
    );
    return response.json();
  }
}
```

| Subtask | Descrição |
|---------|-----------|
| T05.1 | Criar camundaClient.js |
| T05.2 | Métodos: evaluateDecision, startProcess |
| T05.3 | Configurar CAMUNDA_URL no .env |

---

### T06: BPMN + Worker GitHub (read)
**BKL:** BKL-PANTHEON-011 | **Esforço:** 3h | **Status:** ⬜ Pendente

**Workflow:** `workflow_github_read`

```
┌───────────┐     ┌────────────────┐     ┌───────────┐
│   Start   │────►│  Service Task  │────►│    End    │
│           │     │  github_read   │     │           │
└───────────┘     └────────────────┘     └───────────┘
```

**Worker:** Executa operações de leitura no GitHub.

| Subtask | Descrição |
|---------|-----------|
| T06.1 | Desenhar BPMN workflow_github_read |
| T06.2 | Criar/adaptar worker (get_file, list, search) |
| T06.3 | Deploy workflow no Camunda |
| T06.4 | Testar: @genesis lê genesis/GENESIS.md |

---

### T07: BPMN + Worker GitHub (write/patch)
**BKL:** BKL-PANTHEON-012 | **Esforço:** 4h | **Status:** ⬜ Pendente

**Operações:**
- `github_create_file`: Criar arquivo novo
- `github_patch_file`: Patch cirúrgico (find/replace)

**Formato Patch:**
```json
{
  "path": "pantheon/core/executor.js",
  "patches": [
    {"find": "const MAX = 5;", "replace": "const MAX = 10;"}
  ]
}
```

| Subtask | Descrição |
|---------|-----------|
| T07.1 | Desenhar BPMN workflow_github_write |
| T07.2 | Implementar operação patch |
| T07.3 | Deploy workflow no Camunda |
| T07.4 | Testar: patch cirúrgico |

---

### T08: Fluxo Código → Arquivo → Deploy
**BKL:** BKL-PANTHEON-013 | **Esforço:** 3h | **Status:** ⬜ Pendente

**Fluxo:**
```
Claude gera código
       │
       ▼
┌─────────────────┐
│ Arquivo anexo   │  ← Código não polui chat
│ no MM           │
└────────┬────────┘
         │
         │ @infra deploy health.js pantheon/api/
         ▼
┌─────────────────┐     ┌─────────────────┐
│    GitHub       │────►│  GitHub Action  │
│    Push         │     │  (CI/CD)        │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   PM2 Restart   │
                        └─────────────────┘
```

| Subtask | Descrição |
|---------|-----------|
| T08.1 | Formato de arquivo anexo no MM |
| T08.2 | Comando @infra deploy |
| T08.3 | Integração GitHub Actions |
| T08.4 | Testar fluxo completo |

---

## 5. Estrutura de Arquivos (após sprint)

```
pantheon/
├── core/
│   ├── executor.js          # Existente (atualizar para usar NLU+DMN)
│   ├── streamer.js          # Existente (T02: melhorar throttle)
│   └── nluClassifier.js     # NOVO (T03)
├── services/
│   ├── camunda/
│   │   └── client.js        # NOVO (T05)
│   ├── anthropic/
│   └── mattermost/
└── README.md                # Atualizado (T01.4)

camunda/  (repositório existente)
├── dmn/
│   └── pantheon_router.dmn  # NOVO (T04)
├── bpmn/
│   ├── workflow_github_read.bpmn   # NOVO (T06)
│   └── workflow_github_write.bpmn  # NOVO (T07)
└── workers/
    └── github/              # NOVO ou adaptar
```

---

## 6. Variáveis de Ambiente (novas)

```bash
# Camunda
CAMUNDA_URL=http://camunda:8080/engine-rest

# GitHub
GITHUB_TOKEN=ghp_xxx
GITHUB_OWNER=leonardokasat-cientistavenda
GITHUB_REPO_DEFAULT=conhecimento-zaz

# ClickHouse (corrigir)
CLICKHOUSE_PASSWORD=xxx
```

---

## 7. Economia de Custo (Model Routing)

```
ANTES (modelo fixo Sonnet):
100 interações × Sonnet = $300/1M tokens

DEPOIS (model routing):
• 60 simples → Haiku   = $15
• 30 médias  → Sonnet  = $90
• 10 complex → Opus    = $150
• NLU (100)  → Haiku   = $25
                        ─────
                        $280/1M tokens

+ Qualidade MAIOR nas tasks complexas
+ Latência MENOR nas tasks simples
```

---

## 8. Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Camunda indisponível | Fallback para execução direta |
| DMN retorna modelo errado | Regra default = Sonnet |
| Worker GitHub lento | Cache de arquivos frequentes |
| NLU classifica errado | Logs para ajustar prompt |

---

## 9. Próximos Passos (pós sprint)

| Sprint | Escopo |
|--------|--------|
| S-PANTHEON-004 | MongoDB Tool + Mattermost Tool |
| S-PANTHEON-005 | Extended Thinking + Memory |
| S-PANTHEON-006 | V2 - Canais (WhatsApp, Telegram) |

---

## Referências

| Documento | Path |
|-----------|------|
| Backlog Pantheon | docs/04_B/BKL_PANTHEON.md |
| MS_Sprint | docs/04_S/MS_Sprint.md |
| Sprint anterior | genesis/sprints/S-PANTHEON-002.md |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2026-01-03 | Criação. Sprint planejada com 5 tasks (MCP). |
| 2.0 | 2026-01-03 | **Pivot para Camunda**: 8 tasks, 22.5h. NLU Haiku → DMN → Modelo. Workflows GitHub via BPMN. |

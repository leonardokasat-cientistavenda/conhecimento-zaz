---
titulo: "Genesis: conversation.bpmn"
data_criacao: 2025-12-13
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: Genesis
produto_ref: genesis
epico_ref: kernel
release_alvo: v0.1.0
---

# Genesis: conversation.bpmn

## Contexto

Processo BPMN básico que orquestra uma conversa: recebe mensagem, chama LLM, retorna resposta.

**Decisão arquitetural:** ADR-002 (Camunda como orquestrador), ADR-006 (Kernel imutável)

---

## Fluxo

```
┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────┐
│  Start  │───►│  Receive    │───►│  LLM        │───►│  Send   │───►●
│  Event  │    │  Message    │    │  Responder  │    │  Reply  │
└─────────┘    └─────────────┘    └─────────────┘    └─────────┘
```

---

## Especificação

**Start Event:** Message start (recebe de MM Bot)

**Variables de entrada:**
- `message_id`: ID da mensagem MM
- `channel_id`: Canal onde foi postada
- `user_id`: Quem enviou
- `content`: Texto da mensagem
- `thread_id`: Thread para resposta (opcional)

**Service Tasks:**
- `llm_responder`: External task que chama Anthropic API

**Variables de saída:**
- `response`: Texto da resposta

**End:** Envia resposta via MM Bot

---

## Plano de Execução

| # | Arquivo | Método | Descrição |
|---|---------|--------|-----------|
| 1 | `genesis/kernel/conversation.bpmn` | Criar | Processo BPMN |
| 2 | Deploy via Camunda REST API | Executar | Registrar processo |

---

## Critérios de Aceite

- [ ] Processo inicia ao receber mensagem
- [ ] Passa variáveis corretas para llm_responder
- [ ] Recebe resposta do worker
- [ ] Termina com variável response preenchida
- [ ] Visível no Camunda Cockpit

---

## Referências

- [Épico Kernel](docs/04_P/Genesis/epicos/kernel.md)
- [Arquitetura Genesis](docs/04_P/Genesis/arquitetura.md)

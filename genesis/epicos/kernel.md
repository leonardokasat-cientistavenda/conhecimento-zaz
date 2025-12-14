---
titulo: "Épico: Kernel"
produto_ref: genesis
release_alvo: v0.1.0
status: Planejado
data_criacao: 2025-12-13
---

# Épico: Kernel

## Objetivo

Estabelecer a fundação do Genesis: conversa básica via Mattermost, orquestrada por Camunda, respondida por Opus 4.5.

---

## Resultado Esperado

Usuário envia mensagem no MM → Genesis responde usando Opus 4.5.

```
Usuário: "Olá Genesis"
Genesis: "Olá! Como posso ajudar?"
```

---

## Componentes

| Componente | Descrição |
|------------|----------|
| MM Bot | Listener websocket + publisher |
| conversation.bpmn | Processo básico de conversa |
| llm_responder | Worker que chama Anthropic API |
| Anthropic API | Opus 4.5 |

---

## Backlog Items

| ID | Título | Prioridade |
|----|--------|------------|
| bl_genesis_mm_bot | MM Bot (websocket) | 🔴 Alta |
| bl_genesis_conversation_bpmn | conversation.bpmn | 🔴 Alta |
| bl_genesis_llm_responder | Worker llm_responder | 🔴 Alta |
| bl_genesis_anthropic_integration | Integração Anthropic API | 🔴 Alta |

---

## Critérios de Conclusão

- [ ] Bot conecta ao MM via websocket
- [ ] Bot escuta mensagens em canal específico
- [ ] Camunda recebe evento e inicia conversation.bpmn
- [ ] Worker llm_responder chama Anthropic API
- [ ] Resposta é publicada no MM na thread correta
- [ ] Tempo de resposta < 10s para mensagens simples

---

## Ciclo Epistemológico

Cada backlog item deste épico passa por M0-M4:

| Item | M0 | M1 | M2 | M3 | M4 |
|------|----|----|----|----|----|
| MM Bot | Glossário (websocket, listener) | mattermostdriver | listener.py, publisher.py | Métodos, atributos | Código pronto |
| conversation.bpmn | Fluxo básico | BPMN spec | Tasks, gateways | Variables | Deploy |
| llm_responder | Topic, I/O | anthropic SDK | Worker class | complete/failure | Testes OK |
| Anthropic | Config | API docs | Client wrapper | Error handling | Integração |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-13 | Épico criado |

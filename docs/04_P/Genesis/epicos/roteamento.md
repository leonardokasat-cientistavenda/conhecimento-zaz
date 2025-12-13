---
titulo: "Épico: Roteamento"
produto_ref: genesis
release_alvo: v0.4.0
status: Backlog
data_criacao: 2025-12-13
---

# Épico: Roteamento

## Objetivo

Genesis decide o que fazer: entregar produto existente ou construir novo.

---

## Resultado Esperado

```
Usuário: "Preciso de um sistema de seleção de vendedores"
Genesis: "Já tenho MS_Seleção que resolve isso. Quer que eu implante?"

OU

Usuário: "Preciso de um sistema de controle de frota"
Genesis: "Não tenho isso ainda. Vamos construir juntos usando M0-M4?"
```

---

## Componentes

| Componente | Descrição |
|------------|----------|
| intent_analyzer | Worker que classifica intenção |
| route_intent.dmn | Tabela de decisão |
| match_capability.dmn | Decisão de match |
| Gateways BPMN | Fluxo condicional |

---

## Backlog Items

| ID | Título | Prioridade |
|----|--------|------------|
| bl_genesis_intent_analyzer | Worker intent_analyzer | 🟡 Média |
| bl_genesis_route_dmn | DMN route_intent | 🟡 Média |
| bl_genesis_conversation_gateways | Gateways em conversation.bpmn | 🟡 Média |

---

## Fluxo de Decisão

```
Intent Analyzer → Classifica (dúvida/problema/pedido)
       ↓
Capability Match → Busca similaridade
       ↓
DMN Decision → Match ≥70%: ENTREGAR | Match <70%: CONSTRUIR
```

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-13 | Épico criado |

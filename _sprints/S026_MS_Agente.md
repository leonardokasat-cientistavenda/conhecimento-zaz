---
id: S026
nome: MS_Agente - Agent Runtime
status: em_andamento
inicio: 2025-12-17
etapa_atual: M3
m2_ref: _drafts/S026_M2_MS_Agente.md
---

# Sprint S026 - MS_Agente: Agent Runtime

## Objetivo

Especificar MS_Agente, módulo genérico de Agent Loop para migração GENESIS de Claude Desktop para Mattermost+Camunda.

## Estado Atual

```
M0 ✅ → M1 ✅ → M2 ✅ → M3 🔄 → M4 ⬜
```

## Contexto para Recuperação

### Carregar Primeiro
```
1. _drafts/S026_M2_MS_Agente.md    # M2 completo com schemas e fluxo
2. db.genesis.backlog (id: BKL-03*) # Itens da sprint
```

### Arquivos Relacionados
```
genesis/specs/S026_Agent_Runtime_Spec.md   # Spec consolidada (parcial)
genesis/specs/BKL027_Bot_WebSocket.md      # DM/privado (backlog futuro)
genesis/specs/BKL028_Multi_Modelo.md       # Multi-modelo (backlog futuro)
_catalogo/templates/M3_E_POO.md            # Template para workers
_catalogo/templates/M3_P_BPMN.md           # Template para BPMN
```

---

## Backlog da Sprint (db.genesis.backlog)

### Sem Bloqueio - Pode Iniciar

| ID | Título | Vertente | Prioridade | Status |
|----|--------|----------|------------|--------|
| BKL-030 | Spec workerAnthropic | M3.E | 🔴 | pendente |
| BKL-031 | Spec agente-contexto | M3.E | 🔴 | pendente |
| BKL-032 | Spec agente-persistir | M3.E | 🟡 | pendente |
| BKL-033 | Spec agente-github | M3.E | 🟡 | pendente |
| BKL-034 | Spec bpmn_ms_agente | M3.P | 🔴 | pendente |

### Ciclos Epistemológicos (criar templates)

| ID | Título | Output | Status |
|----|--------|--------|--------|
| BKL-035 | Template M3.D - DMN | _catalogo/templates/M3_D_DMN.md | pendente |
| BKL-036 | Template M3.C - Config | _catalogo/templates/M3_C_Config.md | pendente |

### Com Bloqueio

| ID | Título | Vertente | Bloqueado Por | Status |
|----|--------|----------|---------------|--------|
| BKL-037 | Spec dmn_entrada_genesis | M3.D | BKL-035 | bloqueado |
| BKL-038 | Spec schema_execucoes | M3.C | BKL-036 | bloqueado |

---

## Fluxo M3 → M4

```
1. Especificar M3.E.* (workers) usando M3_E_POO.md
2. Especificar M3.P.* (BPMN) usando M3_P_BPMN.md
3. Criar template M3.D via ciclo epistemológico (BKL-035)
4. Especificar M3.D.01 (DMN) → desbloqueia BKL-037
5. Criar template M3.C via ciclo epistemológico (BKL-036)
6. Especificar M3.C.01 (Schema) → desbloqueia BKL-038
7. Consolidar todas as specs em M4 final
8. Publicar M4 em genesis/specs/MS_Agente_v1.0.md
9. Atualizar status backlog → "enviado_desenvolvimento"
10. Sprint S027 (PROMETHEUS) desenvolve artefatos
```

---

## Decisões Arquiteturais (já tomadas)

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Entry Point MVP | Outgoing Webhook | Padrão Zarah, rápido de implementar |
| DM/Privado | BKL-027 (futuro) | Requer Bot + WebSocket (~4h extra) |
| Nomenclatura | MS_Agente (genérico) | Reutilizável por GENESIS, Zarah v2, etc. |
| Modelo | Fixo no MVP | Multi-modelo em BKL-028 |
| Persistência | MongoDB + GitHub | Execuções em MongoDB, specs em GitHub |

---

## Componentes a Implementar

### Workers (Node.js)
```
worker/anthropic/index.js      # workerAnthropic
worker/agente/contexto.js      # agente-contexto  
worker/agente/persistir.js     # agente-persistir
worker/agente/github.js        # agente-github-get, agente-github-push
```

### BPMN
```
bpmn_ms_agente.bpmn            # Workflow Agent Loop
```

### DMN
```
dmn_processo_iniciar_orquestrador  # +1 linha: tipo=genesis
```

### Collections MongoDB
```
genesis.agentes                # Config dos agentes
agente.execucoes               # Log de execuções
```

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-17 | Sprint iniciada. M0-M2 validados. |
| 2025-12-17 | M2 persistido em _drafts/. Backlog criado (BKL-030 a BKL-038). |

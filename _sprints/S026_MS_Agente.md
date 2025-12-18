---
id: S026
nome: MS_Agente - Agent Runtime
status: finalizada
inicio: 2025-12-17
fim: 2025-12-17
etapa_atual: M4
m2_ref: _drafts/S026_M2_MS_Agente.md
m4_ref: genesis/specs/MS_Agente_v1.0.md
---

# Sprint S026 - MS_Agente: Agent Runtime ✅

## Objetivo

Especificar MS_Agente, módulo genérico de Agent Loop para migração GENESIS de Claude Desktop para Mattermost+Camunda.

## Estado Final

```
M0 ✅ → M1 ✅ → M2 ✅ → M3 ✅ → M4 ✅
```

## Entregáveis

### M4 - Especificação Final
```
genesis/specs/MS_Agente_v1.0.md
```

### Specs por Vertente

| Vertente | Spec | Arquivo |
|----------|------|---------|
| M3.E | workerAnthropic | _drafts/S026_M3E_workerAnthropic.md |
| M3.E | agente-contexto | _drafts/S026_M3E_agenteContexto.md |
| M3.E | agente-persistir | _drafts/S026_M3E_agentePersistir.md |
| M3.E | agente-github | _drafts/S026_M3E_agenteGithub.md |
| M3.P | bpmn_ms_agente | _drafts/S026_M3P_bpmn_ms_agente.md |
| M3.D | dmn_entrada_genesis | _drafts/S026_M3D_dmn_entrada_genesis.md |
| M3.C | schema_execucoes | _drafts/S026_M3C_schema_execucoes.md |

### Templates Criados

| Template | Arquivo |
|----------|---------|
| M3.D - DMN | _catalogo/templates/M3_D_DMN.md |
| M3.C - Config | _catalogo/templates/M3_C_Config.md |

---

## Backlog da Sprint (CONCLUÍDO)

| ID | Título | Vertente | Status |
|----|--------|----------|--------|
| BKL-030 | Spec workerAnthropic | M3.E | ✅ enviado_desenvolvimento |
| BKL-031 | Spec agente-contexto | M3.E | ✅ enviado_desenvolvimento |
| BKL-032 | Spec agente-persistir | M3.E | ✅ enviado_desenvolvimento |
| BKL-033 | Spec agente-github | M3.E | ✅ enviado_desenvolvimento |
| BKL-034 | Spec bpmn_ms_agente | M3.P | ✅ enviado_desenvolvimento |
| BKL-035 | Template M3.D - DMN | - | ✅ enviado_desenvolvimento |
| BKL-036 | Template M3.C - Config | - | ✅ enviado_desenvolvimento |
| BKL-037 | Spec dmn_entrada_genesis | M3.D | ✅ enviado_desenvolvimento |
| BKL-038 | Spec schema_execucoes | M3.C | ✅ enviado_desenvolvimento |

---

## Decisões Arquiteturais

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Entry Point MVP | Outgoing Webhook | Padrão Zarah, rápido de implementar |
| DM/Privado | BKL-027 (futuro) | Requer Bot + WebSocket (~4h extra) |
| Nomenclatura | MS_Agente (genérico) | Reutilizável por GENESIS, Zarah v2, etc. |
| Modelo | Fixo no MVP | Multi-modelo em BKL-028 |
| Persistência | MongoDB + GitHub | Execuções em MongoDB, specs em GitHub |

---

## Componentes Especificados

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

## Próxima Sprint

**S027 - PROMETHEUS: Desenvolvimento MS_Agente**
- Consumir specs de `genesis/specs/MS_Agente_v1.0.md`
- Gerar artefatos (.js, .bpmn, .dmn, collections)
- Testar conforme Schema TDD
- Deploy em ambiente de desenvolvimento

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-17 | Sprint iniciada. M0-M2 validados. |
| 2025-12-17 | M2 persistido em _drafts/. Backlog criado (BKL-030 a BKL-038). |
| 2025-12-17 | M3.E specs criadas (4 workers). |
| 2025-12-17 | M3.P spec criada (BPMN). |
| 2025-12-17 | Templates M3.D e M3.C criados. |
| 2025-12-17 | M3.D e M3.C specs criadas. |
| 2025-12-17 | **M4 publicado. Sprint FINALIZADA.** |

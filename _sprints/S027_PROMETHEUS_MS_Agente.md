---
id: S027
nome: PROMETHEUS - Desenvolvimento MS_Agente
status: em_andamento
inicio: 2025-12-17
etapa_atual: Desenvolvimento
spec_ref: genesis/specs/MS_Agente_v1.0.md
sprint_origem: S026
---

# Sprint S027 - PROMETHEUS: Desenvolvimento MS_Agente

## Objetivo

Desenvolver artefatos especificados em MS_Agente v1.0, transformando specs em código executável.

## Estado Atual

```
Precificar ✅ → Desenvolver 🔄 → Testar ⬜ → Deployar ⬜
```

## Contexto para Recuperação

### Carregar Primeiro
```
1. genesis/specs/MS_Agente_v1.0.md         # Spec M4 completa
2. _drafts/S026_M3E_*.md                   # Specs dos workers
3. _drafts/S026_M3P_bpmn_ms_agente.md      # Spec BPMN
4. _drafts/S026_M3D_dmn_entrada_genesis.md # Spec DMN
5. _drafts/S026_M3C_schema_execucoes.md    # Spec Schema
6. db.genesis.backlog (id: BKL-04*)        # Itens desta sprint
```

---

## Spec Recursos (Orçamento)

### Runtime
```yaml
runtime:
  containers: 1  # Orquestrador-Zarah existente
  apis_externas: ["anthropic", "github"]
  tokens_llm_estimado: 10000/dia
  mongodb: agente.execucoes + genesis.agentes
```

### Esforço Estimado
```yaml
esforco:
  workers_js: 4 arquivos (~200 linhas total)
  bpmn: 1 arquivo
  dmn: 1 linha adicional
  collection: 1 + índices
  total_horas: ~8h
```

### GAPs Identificados
```yaml
gaps: []  # Sem GAPs - infra já existe (Orquestrador-Zarah)
```

---

## Backlog da Sprint (db.genesis.backlog)

| ID | Título | Worker | Spec Ref | Status |
|----|--------|--------|----------|--------|
| BKL-040 | Desenvolver workerAnthropic | Worker_E | S026_M3E_workerAnthropic.md | pendente |
| BKL-041 | Desenvolver agente-contexto | Worker_E | S026_M3E_agenteContexto.md | pendente |
| BKL-042 | Desenvolver agente-persistir | Worker_E | S026_M3E_agentePersistir.md | pendente |
| BKL-043 | Desenvolver agente-github | Worker_E | S026_M3E_agenteGithub.md | pendente |
| BKL-044 | Desenvolver bpmn_ms_agente | Worker_P | S026_M3P_bpmn_ms_agente.md | pendente |
| BKL-045 | Atualizar DMN entrada genesis | Worker_D | S026_M3D_dmn_entrada_genesis.md | pendente |
| BKL-046 | Criar collection execucoes | Worker_C | S026_M3C_schema_execucoes.md | pendente |

---

## Artefatos a Gerar

### Workers (Node.js)
```
worker/anthropic/index.js      # workerAnthropic
worker/agente/contexto.js      # agente-contexto  
worker/agente/persistir.js     # agente-persistir
worker/agente/github.js        # agente-github
```

### BPMN
```
bpmn/bpmn_ms_agente.bpmn       # Workflow Agent Loop
```

### DMN
```
dmn/dmn_processo_iniciar_orquestrador.dmn  # +1 linha genesis
```

### MongoDB
```
db.agente.execucoes            # Collection com schema validator
db.genesis.agentes             # Collection de config
```

---

## Fluxo de Desenvolvimento

```
1. Worker_E: Gerar workers JS a partir das specs M3.E
2. Worker_P: Gerar BPMN a partir da spec M3.P
3. Worker_D: Atualizar DMN conforme spec M3.D
4. Worker_C: Criar collections conforme spec M3.C
5. Testar: Validar conforme Schema TDD de cada spec
6. Consolidar: Pacote de release
```

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-17 | Sprint iniciada. Spec MS_Agente v1.0 como entrada. |

---
id: S028
nome: Pipeline PROMETHEUS - Teste e Deploy
status: em_andamento
inicio: 2025-12-17
etapa_atual: M2
itens_origem: [BKL-050, BKL-051, BKL-052]
---

# Sprint S028 - Pipeline PROMETHEUS: Teste e Deploy

## Objetivo

Definir estratégia completa de Teste e Deploy para PROMETHEUS, eliminando operação manual e entropia cognitiva.

## Estado Atual

```
M0 ✅ → M1 ✅ → M2 ✅ → M3 ⬜ → M4 ⬜
```

## Contexto para Recuperação

### Carregar Primeiro
```
1. _drafts/S028_M0_Pipeline_PROMETHEUS.md  # Problema
2. _drafts/S028_M1_Pipeline_PROMETHEUS.md  # Framework (Camunda 7)
3. _drafts/S028_M2_Pipeline_PROMETHEUS.md  # Object Definition
4. db.genesis.backlog (id: BKL-06*)         # Tasks M0-M4
```

### Descoberta Crítica: Camunda 7 CE

```
┌─────────────────────────────────────────────────────────────────┐
│  ZAZ usa Camunda 7 Community Edition (não Camunda 8)            │
├─────────────────────────────────────────────────────────────────┤
│  - Camunda 8 NÃO tem Community Edition (requer licença)         │
│  - Deploy via REST API: POST /engine-rest/deployment/create     │
│  - Testes: camunda-bpm-assert + JUnit (Java) ou Jest (Workers)  │
│  - GitHub Action oficial: NÃO EXISTE (usar curl customizado)    │
└─────────────────────────────────────────────────────────────────┘
```

### Itens Origem (Mergeados)

| ID | Título | Foco |
|----|--------|------|
| BKL-050 | Estratégia de Publicação | CI/CD vs Framework |
| BKL-051 | Framework de Teste | Por tipo de artefato |
| BKL-052 | Fronteira Teste/Deploy | Definição de gates |

---

## Backlog da Sprint

| ID | Task | Status |
|----|------|--------|
| BKL-060 | M0 - Definir Problema | ✅ concluído |
| BKL-061 | M1 - Marco Teórico | ✅ concluído (v2.0 Camunda 7) |
| BKL-062 | M2 - Definir Objeto | ✅ concluído |
| BKL-063 | M3 - Especificar Classe | ⬜ pendente |
| BKL-064 | M4 - Publicar | ⬜ pendente |

---

## Resumo M1 (Camunda 7)

**Deploy:**
```bash
curl -X POST http://camunda:8080/engine-rest/deployment/create \
  -F "deployment-name=ms-agente" \
  -F "bpmn_ms_agente.bpmn=@./bpmn/bpmn_ms_agente.bpmn"
```

**Pipeline Stages:**
1. VALIDATE → xmllint (BPMN/DMN) + ESLint (Workers)
2. TEST → Jest (Workers)
3. DEPLOY → REST API Camunda 7
4. VERIFY → Health check process definition

---

## Resumo M2 (Object Definition)

**PROMETHEUS É:**
- Validador de sintaxe
- Executor de testes
- Deployer de artefatos
- Verificador de deploy
- Transportador de workers

**PROMETHEUS NÃO É:**
- Gerador de artefatos (GENESIS)
- Executor de processos (Camunda)
- Rollback automático (MVP futuro)

**Secrets Requeridos:**
- CAMUNDA_URL
- ZAZ_VENDAS_DEPLOY_KEY
- SLACK_WEBHOOK

---

## Contexto Adicional (do Usuário)

- **Usuário não é dev:** Muita entropia cerebral operacionalizar fluxo manual no Git
- **Preferência:** Mais fácil especificar processo e persistir 1x do que executar manual
- **Ganho:** Contexto persistido para próximos deploys

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-17 | Sprint criada. BKL-050/051/052 mergeados. M0 iniciado. |
| 2025-12-17 | M0 concluído. Problema definido. |
| 2025-12-18 | M1 pesquisa inicial (Camunda 8 frameworks). |
| 2025-12-18 | DESCOBERTA: ZAZ usa Camunda 7 CE (não 8). M1 refatorado. |
| 2025-12-18 | M1 v2.0 concluído (Camunda 7). M2 concluído. |

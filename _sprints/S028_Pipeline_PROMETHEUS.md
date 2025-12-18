# Sprint S028 - MS_Prometheus_Pipeline

---

```yaml
sprint_id: S028
nome: MS_Prometheus_Pipeline
status: pausado
inicio: 2025-12-18
previsao_fim: 2025-12-20
etapa_atual: M3
```

---

## Objetivo

Especificar e implementar o MS_Prometheus_Pipeline - sistema de validação, teste, deploy e verificação de artefatos gerados pelo PROMETHEUS.

---

## Progresso

```
M0 ✅ → M1 ✅ → M2 ✅ → M3 ✅ → M4 ⬜
```

| Etapa | Status | Documento |
|-------|--------|------------|
| M0 - Problema | ✅ concluído | _drafts/S028_MS_Prometheus_Pipeline.md §1 |
| M1 - Marco Teórico | ✅ concluído | _drafts/S028_MS_Prometheus_Pipeline.md §2 |
| M2 - Objeto | ✅ concluído | _drafts/S028_MS_Prometheus_Pipeline.md §3 |
| M3 - Classe | ✅ concluído | _drafts/S028_MS_Prometheus_Pipeline.md §4 |
| M4 - Publicação | ⬜ pendente | - |

---

## Descobertas Chave

### Camunda 7 CE
- ZAZ usa Camunda 7 Community Edition (não Camunda 8)
- Deploy via REST API: POST /engine-rest/deployment/create
- Gratuito, Apache 2.0

### Arquitetura Pipeline
- **Um MS, dois modos**: validar | implantar
- **modo=validar**: VALIDATE + TEST (antes de aprovar_release)
- **modo=implantar**: DEPLOY + VERIFY (após MS_PRODUTO aprovar)
- **Storage**: db.backlog (sem collection nova - YAGNI)

### Fluxo Integrado
```
desenvolver() → executar_pipeline(validar) → aprovar_release
                                                    ↓
                                              MS_PRODUTO
                                                    ↓
                            executar_pipeline(implantar) → validar_implantacao
```

---

## Próximos Passos (M4)

1. **Implementar GitHub Actions workflow**
   - prometheus-pipeline.yml
   - Jobs: validate, test, deploy, verify

2. **Configurar secrets no GitHub**
   - CAMUNDA_URL, CAMUNDA_USER, CAMUNDA_PASSWORD
   - ZAZ_VENDAS_DEPLOY_KEY

3. **Testar com artefatos S026**
   - bpmn_ms_agente.bpmn
   - dmn_entrada_genesis.dmn
   - workers/*.js

4. **Publicar documento final**
   - Mover de _drafts/ para docs/

---

## Backlog Items

| ID | Tarefa | Status |
|----|--------|--------|
| BKL-061 | M1 - Marco Teórico | ✅ concluído |
| BKL-062 | M2 - Objeto | ✅ concluído |
| BKL-063 | M3 - Classe | ✅ concluído |
| BKL-064 | M4 - Implementação workflow | ⬜ pendente |
| BKL-065 | M4 - Configurar secrets | ⬜ pendente |
| BKL-066 | M4 - Testar com S026 | ⬜ pendente |
| BKL-067 | M4 - Publicar | ⬜ pendente |

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-18 | Sprint iniciado |
| 2025-12-18 | Descoberta: ZAZ usa Camunda 7 CE |
| 2025-12-18 | Definição arquitetura: dois modos (validar/implantar) |
| 2025-12-18 | M1-M2-M3 consolidados em documento único |
| 2025-12-18 | Sprint pausado - retomar M4 amanhã |
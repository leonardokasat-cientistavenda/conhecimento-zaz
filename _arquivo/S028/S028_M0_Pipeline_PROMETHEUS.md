---
id: BKL-060
nome: M0 - Problema Pipeline PROMETHEUS
versao: "1.0"
tipo: Problema
etapa: M0
status: Arquivado
sprint_ref: S028
itens_origem: [BKL-050, BKL-051, BKL-052]
publicado_em: docs/04_P/MS_Prometheus_Pipeline.md
---

# M0 - Problema: Pipeline PROMETHEUS

> **ARQUIVADO** - Publicado em `docs/04_P/MS_Prometheus_Pipeline.md`

## 1. Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Pipeline** | Fluxo automatizado de Teste → Deploy |
| **Artefato** | Output de PROMETHEUS: .js, .bpmn, .dmn, scripts |
| **Deploy** | Disponibilizar artefato para execução em produção |
| **Gate** | Ponto de validação/aprovação no fluxo |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **Entropia Cognitiva** | Carga mental de operar fluxos manuais |

---

## 2. Sintoma

```
┌─────────────────────────────────────────────────────────────────┐
│                         SINTOMA                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROMETHEUS gera artefatos em _artefatos/S027/                   │
│                    │                                             │
│                    ▼                                             │
│              E AGORA?                                            │
│                                                                  │
│  • Como testar? (cada tipo de artefato é diferente)              │
│  • Como publicar no repo ZAZ-vendas?                             │
│  • Commit = deploy? Ou precisa de mais passos?                   │
│  • Quem aprova? Quando?                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-17 | M0 definido. BKL-050/051/052 mergeados. Sprint S028. |
| 1.1 | 2025-12-19 | Arquivado - publicado em docs/04_P/ |
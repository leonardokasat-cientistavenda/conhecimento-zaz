---
titulo: "PROMETHEUS v3.0 - Workers e Contratos"
data_criacao: 2025-12-16
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: PROMETHEUS
---

# PROMETHEUS v3.0 - Workers e Contratos

## Contexto

### Origem: Propagação GENESIS v4.0 (2025-12-16)

GENESIS v4.0 requer PROMETHEUS com:

1. **Arquitetura de Workers por vertente**
   - WORKER_E: M3.E → .py + test_.py + .feature
   - WORKER_P: M3.P → .bpmn + Karate
   - WORKER_D: M3.D → .dmn + Karate
   - WORKER_I: M3.I → Dockerfile, .yaml
   - WORKER_C: M3.C → .yaml, .env
   - WORKER_DOC: M4 → .md

2. **Fluxo TDD embutido**
   - Recebe M3.E.yaml
   - Extrai classes_equivalencia
   - Gera testes primeiro
   - Gera código
   - Valida

3. **Contrato com GENESIS**
   - executar_spec(spec_id, vertentes)
   - obter_release(job_id)

4. **Seção de Catalogação**
   - O que PROMETHEUS cataloga para GENESIS

5. **Responsabilidade de validação técnica**
   - PROMETHEUS garante código funcionando
   - GENESIS avalia efetividade (não técnica)

## Critérios de Aceite

- [ ] Workers por vertente documentados
- [ ] Fluxo TDD claro
- [ ] Contrato com GENESIS definido
- [ ] Seção de catalogação presente

## Referências

- genesis/GENESIS_Arquitetura.md (v2.0) - seção 4.3 Contratos
- genesis/PROMETHEUS.md (atual v2.0)

## Estimativa

~2h

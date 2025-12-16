---
titulo: "Backlog v2.0 - Timestamps e Métricas"
data_criacao: 2025-12-16
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🟡
sistema_afetado: Backlog
---

# Backlog v2.0 - Timestamps e Métricas

## Contexto

### Origem: Propagação GENESIS v4.0 (2025-12-16)

GENESIS v4.0 requer tracking universal com:

1. **Campo tipo**
   ```yaml
   tipo: ciclo_epistemologico | desenvolvimento | bug | melhoria | documentacao
   ```

2. **Timestamps completos**
   ```yaml
   timestamps:
     criado_em: datetime
     promovido_em: datetime?
     iniciado_em: datetime?
     validado_em: datetime?
     concluido_em: datetime?
   ```

3. **Origem (para ciclos filhos)**
   ```yaml
   origem:
     ms_pai: string?
     etapa: string?
     atributo: string?
   ```

4. **Métricas derivadas**
   ```yaml
   metricas:
     lead_time_min: number
     cycle_time_min: number
     wait_time_min: number
   ```

5. **feature_ref**
   - BacklogItem vinculado a Feature

## Critérios de Aceite

- [ ] Novos campos documentados
- [ ] Exemplos atualizados
- [ ] Relação com Feature clara

## Referências

- genesis/GENESIS_Arquitetura.md (v2.0)
- docs/00_I/00_I_2_1_Backlog.md (atual v1.2)

## Estimativa

~1h

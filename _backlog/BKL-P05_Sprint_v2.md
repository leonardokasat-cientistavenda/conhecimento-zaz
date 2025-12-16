---
titulo: "Sprint v2.0 - Métricas Agregadas"
data_criacao: 2025-12-16
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🟡
sistema_afetado: Sprint
---

# Sprint v2.0 - Métricas Agregadas

## Contexto

### Origem: Propagação GENESIS v4.0 (2025-12-16)

GENESIS v4.0 requer métricas de sprint:

1. **Métricas agregadas**
   ```yaml
   metricas:
     total_itens: number
     concluidos: number
     rejeitados: number
     lead_time_medio_min: number
     cycle_time_medio_min: number
     throughput_dia: number
     por_tipo:
       ciclo_epistemologico: { total, concluidos, lead_time_medio }
       desenvolvimento: { total, concluidos, lead_time_medio }
   ```

2. **release_ref**
   - Sprint vinculada a Release (se aplicável)

3. **Método agregar_metricas()**

## Critérios de Aceite

- [ ] Métricas agregadas documentadas
- [ ] Relação com Release clara
- [ ] Método agregar_metricas() especificado

## Referências

- genesis/GENESIS_Arquitetura.md (v2.0)
- docs/00_I/00_I_2_2_Sprint.md (atual)

## Estimativa

~1h

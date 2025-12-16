---
titulo: "MongoDB v2.0 - Novas Collections"
data_criacao: 2025-12-16
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🟡
sistema_afetado: MongoDB
---

# MongoDB v2.0 - Novas Collections

## Contexto

### Origem: Propagação GENESIS v4.0 (2025-12-16)

GENESIS v4.0 requer novas collections:

1. **Novas collections**
   ```yaml
   features:
     - id, produto_ref, hipotese, criterios_sucesso, status
   
   avaliacoes_efetividade:
     - id, feature_ref, release_ref, criterios_avaliados, conclusao
   
   specs:
     - id, ms_ref, vertente, versao, conteudo, status
   
   catalogo_universal:
     - id, sistema_origem, tipo, embedding, tags, score_reuso
   ```

2. **Campos novos em collections existentes**
   - backlog_items: +tipo, +timestamps, +origem, +metricas
   - sprints: +metricas, +release_ref

3. **Índices para busca semântica**
   - catalogo_universal: índice vetorial para embedding

## Critérios de Aceite

- [ ] Novas collections documentadas
- [ ] Schemas completos
- [ ] Índices definidos

## Referências

- genesis/GENESIS_Arquitetura.md (v2.0) - seção 4.4 Schema
- docs/00_I/00_I_1_3_MongoDB.md (atual)

## Estimativa

~2h

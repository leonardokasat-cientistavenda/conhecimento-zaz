---
titulo: "Módulo Catálogo v2.0 - Catalogação Distribuída"
data_criacao: 2025-12-16
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🟡
sistema_afetado: Catálogo
---

# Módulo Catálogo v2.0 - Catalogação Distribuída

## Contexto

### Origem: Propagação GENESIS v4.0 (2025-12-16)

GENESIS v4.0 requer catálogo distribuído:

1. **Catálogo distribuído**
   - Cada sistema tem seu catálogo
   - GENESIS consulta todos

2. **Schema de catalogação universal**
   ```yaml
   item_catalogo:
     id: ObjectId
     sistema_origem: MS_Produto | Epistemologia | PROMETHEUS
     tipo: feature | spec | artefato | avaliacao
     embedding: [float]
     tags: [string]
     descricao: string
     score_reuso: number
     vezes_reutilizado: number
     ultima_reutilizacao: datetime
   ```

3. **Métodos de busca cross-sistema**
   - buscar_similar(query, sistemas: [])
   - ranquear_por_reuso(items)

4. **Integração com avaliação**
   - Atualizar score_reuso após avaliação de efetividade

## Critérios de Aceite

- [ ] Catálogo distribuído documentado
- [ ] Schema universal definido
- [ ] Métodos cross-sistema presentes
- [ ] Integração com avaliação documentada

## Referências

- genesis/GENESIS_Arquitetura.md (v2.0) - seção 4.4
- docs/00_E/00_E_2_1_Modulo_Catalogo.md (atual)

## Estimativa

~1.5h

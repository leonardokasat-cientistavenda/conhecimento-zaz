---
titulo: "MS_Produto v2.0 - Feature e AvaliacaoEfetividade"
data_criacao: 2025-12-16
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: MS_Produto
---

# MS_Produto v2.0 - Feature e AvaliacaoEfetividade

## Contexto

### Origem: Propagação GENESIS v4.0 (2025-12-16)

GENESIS v4.0 definiu fluxo produto-first que requer:

1. **Nova classe Feature**
   - Hipótese testável com critérios de sucesso
   - Hierarquia: Produto → Feature → Épico

2. **Nova classe AvaliacaoEfetividade**
   - GENESIS avalia se Feature entregou JTD
   - Critérios: atingido | parcial | nao_atingido

3. **Atualização classe Épico**
   - Adicionar feature_ref

4. **Atualização classe Produto**
   - Adicionar threshold_adocao
   - Adicionar features: [Feature]

5. **Seção de Catalogação**
   - O que MS_Produto cataloga para GENESIS

## Critérios de Aceite

- [ ] Feature como classe documentada
- [ ] AvaliacaoEfetividade documentada
- [ ] Hierarquia Produto → Feature → Épico clara
- [ ] Seção de catalogação presente
- [ ] Diagrama de classes atualizado

## Referências

- genesis/GENESIS.md (v4.0)
- genesis/GENESIS_Arquitetura.md (v2.0) - seção 4.1 Contratos
- docs/04_P/MS_Produto.md (atual v1.1)

## Estimativa

~2h

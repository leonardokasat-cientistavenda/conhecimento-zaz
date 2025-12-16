---
titulo: "Epistemologia v4.0 - Vertentes M3.* e TDD"
data_criacao: 2025-12-16
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: Epistemologia
---

# Epistemologia v4.0 - Vertentes M3.* e TDD

## Contexto

### Origem: Propagação GENESIS v4.0 (2025-12-16)

GENESIS v4.0 requer Epistemologia com:

1. **Vertentes M3.***
   - M3.E (Estrutural/POO) - OBRIGATÓRIO
   - M3.P (Processual/BPMN) - opcional
   - M3.D (Decisional/DMN) - opcional
   - M3.I (Infraestrutural/IaC) - opcional
   - M3.C (Configuracional/Schema) - opcional

2. **DAG de dependências**
   ```
   M2 → M3.E → [M3.P ∥ M3.D] → M3.I → M3.C → M4
   ```

3. **Schemas TDD orientados**
   - classes_equivalencia por atributo
   - criterios_aceite por método
   - cobertura: cartesiano | pairwise

4. **Recursividade de ciclos**
   - Quando atributo gera ciclo filho
   - Como GENESIS cria backlog para ciclo filho

5. **Seção de Catalogação**
   - O que Epistemologia cataloga para GENESIS

6. **Alinhamento fluxo produto-first**
   - Epistemologia recebe Feature, não dor diretamente

## Critérios de Aceite

- [ ] M3.* vertentes documentadas
- [ ] DAG de dependências claro
- [ ] Schemas TDD presentes
- [ ] Recursividade de ciclos documentada
- [ ] Seção de catalogação presente

## Referências

- genesis/GENESIS_Arquitetura.md (v2.0) - seção 4.2 Contratos
- docs/00_E/00_E_Epistemologia.md (atual v3.4)

## Estimativa

~3h

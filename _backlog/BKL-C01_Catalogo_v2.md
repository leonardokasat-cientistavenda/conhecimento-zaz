---
titulo: "Catálogo v2.0 - Alinhamento com Arquitetura Event-Driven"
data_criacao: 2025-12-16
status: Pendente
tipo: Arquitetura
prioridade: 🔴
sistema_afetado: Catálogo
origem: "Análise S019 - Epistemologia v4.0"
---

# Catálogo v2.0 - Alinhamento com Arquitetura Event-Driven

## Contexto

### Origem: Análise Sprint S019 (2025-12-16)

Durante planejamento de Epistemologia v4.0, identificou-se que Catálogo v1.2 não está alinhado com arquitetura event-driven de GENESIS v5.0.

### Dependências

- GENESIS v5.0 (arquitetura de referência)
- MS_Backlog v1.0 (message broker)
- Epistemologia v4.0 (consumidor de templates)

## Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CATÁLOGO v1.2 vs ARQUITETURA v5.0                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CATÁLOGO ATUAL (v1.2):                                                     │
│  • Módulo de Epistemologia (C3)                                             │
│  • Interface: indexar(), buscar(), atualizar_metadata()                     │
│  • Persistência: YAML em _catalogo/indice.yaml                              │
│  • Comunicação: DIRETA (quem quiser usar, importa)                          │
│                                                                             │
│  ARQUITETURA v5.0:                                                          │
│  • Toda comunicação entre sistemas via MS_Backlog                           │
│  • Cada MS declara tipos_consumidos/tipos_produzidos                        │
│  • Persistência transacional em MongoDB                                     │
│                                                                             │
│  ⚠️  DESALINHAMENTO                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Gaps Identificados

1. **Não é event-driven**: Catálogo não tem tipos_consumidos/produzidos
2. **Persistência YAML**: Deveria ser MongoDB para consistência
3. **Contrato GENESIS.aprender() indefinido**: GENESIS referencia Catálogo mas sem contrato
4. **Tipo template_spec não existe**: Epistemologia precisa para templates M3.*
5. **Integração Raciocínio indefinida**: Como decisões indexadas interagem com MS_Backlog?

## Opções Arquiteturais

| Opção | Descrição | Prós | Contras |
|-------|-----------|------|---------|
| **A** | Manter como Módulo (interface direta) | Simples, baixa latência | Fora do padrão v5.0 |
| **B** | Promover a MS_Catalogo (event-driven) | Consistente com v5.0 | Overhead de comunicação |
| **C** | Híbrido (interface direta + eventos) | Flexível | Complexidade de sincronização |

## Critérios de Aceite

- [ ] Decisão arquitetural documentada (A, B ou C)
- [ ] Se B ou C: tipos_consumidos/produzidos definidos
- [ ] Tipo `template_spec` suportado
- [ ] Contrato GENESIS.aprender() → Catálogo definido
- [ ] Persistência alinhada (MongoDB ou justificativa para YAML)

## Impacto em S019

Epistemologia v4.0 depende de Catálogo para templates M3.*. Se Catálogo mudar arquitetura, Epistemologia precisa ajustar integração.

**Recomendação:** Resolver BKL-C01 ANTES de finalizar S019, ou assumir Opção A (manter Módulo) como decisão temporária.

## Referências

- docs/00_E/00_E_2_1_Modulo_Catalogo.md (v1.2)
- genesis/GENESIS.md (v5.0) - seção 5.2 Aprendizado
- docs/04_B/MS_Backlog_Arquitetura.md

## Estimativa

~2-3h

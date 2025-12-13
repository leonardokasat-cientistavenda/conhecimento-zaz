# ADR-006: Kernel Imutável

## Status

Aceito

## Data

2024-12-13

## Contexto

Se Genesis usa Camunda para deployar processos, como deploya o primeiro processo? Problema de bootstrap.

## Decisão

**Genesis terá um kernel imutável — processos fundamentais deployados manualmente que nunca mudam.**

Kernel:
```
genesis/
├── kernel/                    ← Deploy manual, nunca muda
│   ├── conversation.bpmn      ← Conversa básica
│   ├── artifact_lifecycle.bpmn ← CI/CD
│   ├── tool_execution.bpmn    ← MCP adapter
│   └── m0_m4_pipeline.bpmn    ← Construção guiada
│
└── generated/                 ← Genesis cria e deploya
    ├── prompts/
    ├── workers/
    ├── workflows/
    └── decisions/
```

## Consequências

### Positivas
- Bootstrap resolvido
- Limites claros do que Genesis pode mudar
- Rollback sempre possível (voltar ao kernel)

### Negativas
- Kernel precisa ser bem projetado desde o início
- Mudanças no kernel requerem deploy manual

## Regras do Kernel

1. **Mínimo possível:** Só o necessário para Genesis funcionar
2. **Genérico:** Processos que servem qualquer domínio
3. **Estável:** Mudanças raras e deliberadas
4. **Versionado:** Git tag para cada versão do kernel

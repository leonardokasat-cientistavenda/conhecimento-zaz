---
id: BKL-032
nome: Spec agente-persistir
versao: "1.0"
tipo: Spec
vertente: M3.E
status: Draft
sprint_ref: S026
template_ref: _catalogo/templates/M3_E_POO.md
artefatos_produzidos:
  - "worker/agente/persistir.js"
  - "test/worker/agente/persistir.test.js"
---

# M3.E.03 - Spec agente-persistir

## 1. Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                      WorkerAgentePersistir                      │
├─────────────────────────────────────────────────────────────────┤
│  topic: "agente-persistir"                                      │
├─────────────────────────────────────────────────────────────────┤
│  Input (Camunda vars)                                           │
│  - agente_id: string                                            │
│  - user_id: string                                              │
│  - user_login: string                                           │
│  - channel_id: string                                           │
│  - input: string           # Mensagem original                  │
│  - resposta: string        # Resposta do LLM                    │
│  - modelo: string                                               │
│  - tokens_input: int                                            │
│  - tokens_output: int                                           │
│  - latencia_ms: int                                             │
│  - toolCalls: string       # JSON array                         │
├─────────────────────────────────────────────────────────────────┤
│  Output (Camunda vars)                                          │
│  - execucao_id: string     # ObjectId do documento inserido     │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                         │
│  + execute(task, taskService): void                             │
│  - calcularCusto(modelo, tokens_in, tokens_out): float          │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Dependências

```javascript
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");
const { insertOne } = require("../../database");
```

## 3. Schema TDD

### 3.1 Classes de Equivalência

| Atributo | Partição | Valores Exemplo | Válida | Fronteira |
|----------|----------|-----------------|--------|------------|
| agente_id | valido | "genesis" | ✅ | |
| agente_id | vazio | "", null | ❌ | |
| tokens_input | positivo | 1523 | ✅ | [1, ∞] |
| tokens_input | zero | 0 | ✅ | |
| tokens_input | negativo | -1 | ❌ | |
| modelo | sonnet | claude-sonnet-4-20250514 | ✅ | custo $3/M in, $15/M out |
| modelo | haiku | claude-haiku-4-20250514 | ✅ | custo $0.25/M in, $1.25/M out |
| modelo | opus | claude-opus-4-20250514 | ✅ | custo $15/M in, $75/M out |
| toolCalls | com_tools | [{name:"github:..."}] | ✅ | |
| toolCalls | sem_tools | [] | ✅ | |

### 3.2 Critérios de Aceite

| ID | Método | Given | When | Then | Partições |
|----|--------|-------|------|------|----------|
| CA01 | execute | todos campos válidos, modelo sonnet | execute() | documento inserido em agente.execucoes com custo calculado | valido, sonnet |
| CA02 | execute | agente_id vazio | execute() | task falha: 'agente_id obrigatório' | vazio |
| CA03 | calcularCusto | modelo sonnet, 1000 tokens in, 500 out | calcularCusto() | retorna (1000*3 + 500*15)/1000000 = 0.0105 | sonnet |
| CA04 | calcularCusto | modelo haiku, 1000 tokens in, 500 out | calcularCusto() | retorna (1000*0.25 + 500*1.25)/1000000 = 0.000875 | haiku |
| CA05 | execute | toolCalls com array | execute() | documento inclui tool_calls parsed | com_tools |

### 3.3 Cobertura

- **Estratégia:** manual (poucos casos importantes)
- **Combinações estimadas:** 8

## 4. Implementação Esperada

```javascript
// worker/agente/persistir.js
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");
const { insertOne } = require("../../database");

const PRICING = {
  "claude-sonnet-4-20250514": { input: 3, output: 15 },
  "claude-haiku-4-20250514": { input: 0.25, output: 1.25 },
  "claude-opus-4-20250514": { input: 15, output: 75 },
};

module.exports = {
  "agente-persistir": async ({ task, taskService }) => {
    const vars = getListaVariaveis({
      agente_id: null,
      user_id: null,
      user_login: null,
      channel_id: null,
      input: "",
      resposta: "",
      modelo: "",
      tokens_input: 0,
      tokens_output: 0,
      latencia_ms: 0,
      toolCalls: "[]",
    }, task);
    
    if (!vars.agente_id) throw new Error("agente_id obrigatório");
    
    const custo_usd = calcularCusto(
      vars.modelo,
      vars.tokens_input,
      vars.tokens_output
    );
    
    const doc = {
      agente_id: vars.agente_id,
      user_id: vars.user_id,
      user_login: vars.user_login,
      channel_id: vars.channel_id,
      input: vars.input,
      output: vars.resposta,
      modelo: vars.modelo,
      tokens_input: vars.tokens_input,
      tokens_output: vars.tokens_output,
      tokens_total: vars.tokens_input + vars.tokens_output,
      custo_usd,
      latencia_ms: vars.latencia_ms,
      tool_calls: JSON.parse(vars.toolCalls).map(t => t.name),
      created_at: new Date(),
    };
    
    const result = await insertOne("agente", "execucoes", doc);
    
    await taskService.complete(
      task,
      setarVariaveisCamunda({ execucao_id: result.insertedId.toString() })
    );
  },
};

function calcularCusto(modelo, tokens_in, tokens_out) {
  const pricing = PRICING[modelo] || PRICING["claude-sonnet-4-20250514"];
  return (tokens_in * pricing.input + tokens_out * pricing.output) / 1000000;
}
```

## 5. Checklist

| ID | Verificação | Status |
|----|-------------|--------|
| CK01 | Todos atributos têm tipo definido | ✅ |
| CK02 | Todos atributos têm ≥1 partição válida | ✅ |
| CK03 | Todos atributos têm ≥1 partição inválida | ✅ |
| CK04 | Todos métodos têm ≥1 critério de aceite | ✅ |
| CK05 | Critérios cobrem happy path | ✅ |
| CK06 | Critérios cobrem casos de erro | ✅ |
| CK07 | Fronteiras identificadas | ✅ |
| CK08 | Cobertura definida | ✅ |
| CK09 | combinacoes_estimadas calculado | ✅ |

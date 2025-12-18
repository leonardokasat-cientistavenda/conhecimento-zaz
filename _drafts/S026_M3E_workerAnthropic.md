---
id: BKL-030
nome: Spec workerAnthropic
versao: "1.0"
tipo: Spec
vertente: M3.E
status: Draft
sprint_ref: S026
template_ref: _catalogo/templates/M3_E_POO.md
artefatos_produzidos:
  - "worker/anthropic/index.js"
  - "test/worker/anthropic.test.js"
---

# M3.E.01 - Spec workerAnthropic

## 1. Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                      WorkerAnthropic                            │
├─────────────────────────────────────────────────────────────────┤
│  topic: "workerAnthropic"                                       │
├─────────────────────────────────────────────────────────────────┤
│  Input (Camunda vars)                                           │
│  - messages: array         # [{role, content}]                  │
│  - modelo: string          # claude-sonnet-4-20250514           │
│  - tools: array            # tools disponíveis (pode ser [])    │
│  - max_tokens: int         # default 8192                       │
├─────────────────────────────────────────────────────────────────┤
│  Output (Camunda vars)                                          │
│  - resposta: string        # texto da resposta                  │
│  - toolCalls: string       # JSON.stringify([{name, input}])    │
│  - stopReason: string      # "end_turn" | "tool_use"            │
│  - tokens_input: int                                            │
│  - tokens_output: int                                           │
│  - latencia_ms: int                                             │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                         │
│  + execute(task, taskService): void                             │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Dependências

```javascript
const Anthropic = require("@anthropic-ai/sdk");
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");
```

## 3. Schema TDD

### 3.1 Classes de Equivalência

| Atributo | Partição | Valores Exemplo | Válida | Fronteira |
|----------|----------|-----------------|--------|------------|
| messages | valido_simples | [{role:"user",content:"hi"}] | ✅ | |
| messages | valido_multiplo | [user, assistant, user] | ✅ | |
| messages | vazio | [] | ❌ | |
| messages | null | null | ❌ | |
| modelo | sonnet | claude-sonnet-4-20250514 | ✅ | |
| modelo | haiku | claude-haiku-4-20250514 | ✅ | |
| modelo | invalido | gpt-4 | ❌ | |
| modelo | vazio | "", null | ❌ | |
| tools | com_tools | [{name:"github:..."}] | ✅ | |
| tools | sem_tools | [] | ✅ | |
| tools | null | null | ✅ | default [] |
| max_tokens | valido | 1000, 8192 | ✅ | [1, 200000] |
| max_tokens | zero | 0 | ❌ | |
| max_tokens | negativo | -1 | ❌ | |

### 3.2 Critérios de Aceite

| ID | Método | Given | When | Then | Partições |
|----|--------|-------|------|------|----------|
| CA01 | execute | messages válido, modelo sonnet, tools vazio | execute() | task completa com {resposta, stopReason:'end_turn', tokens_*, latencia_ms} | valido_simples, sonnet, sem_tools |
| CA02 | execute | messages válido, modelo sonnet, tools com github | execute() e LLM usa tool | task completa com {toolCalls:[...], stopReason:'tool_use'} | valido_simples, sonnet, com_tools |
| CA03 | execute | messages vazio | execute() | task falha: 'messages não pode ser vazio' | vazio |
| CA04 | execute | modelo inválido | execute() | task falha: 'modelo não suportado' | invalido |
| CA05 | execute | API retorna erro | execute() | task falha com erro original | valido_simples, sonnet |
| CA06 | execute | max_tokens na fronteira (1) | execute() | task completa normalmente | valido_simples, sonnet, fronteira |

### 3.3 Cobertura

- **Estratégia:** pairwise
- **Combinações estimadas:** 16

## 4. Implementação Esperada

```javascript
// worker/anthropic/index.js
const Anthropic = require("@anthropic-ai/sdk");
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

module.exports = {
  workerAnthropic: async ({ task, taskService }) => {
    const inicio = Date.now();
    
    const { messages, modelo, tools, max_tokens } = getListaVariaveis(
      { messages: null, modelo: "claude-sonnet-4-20250514", tools: [], max_tokens: 8192 },
      task
    );
    
    // Validações
    if (!messages || messages.length === 0) {
      throw new Error("messages não pode ser vazio");
    }
    
    const modelosValidos = ["claude-sonnet-4-20250514", "claude-haiku-4-20250514", "claude-opus-4-20250514"];
    if (!modelosValidos.includes(modelo)) {
      throw new Error("modelo não suportado");
    }
    
    // Chamada API
    const response = await client.messages.create({
      model: modelo,
      max_tokens: max_tokens,
      messages: JSON.parse(messages),
      tools: tools ? JSON.parse(tools) : [],
    });
    
    const latencia_ms = Date.now() - inicio;
    
    // Extrair resposta
    let resposta = "";
    let toolCalls = [];
    
    for (const block of response.content) {
      if (block.type === "text") {
        resposta += block.text;
      } else if (block.type === "tool_use") {
        toolCalls.push({ id: block.id, name: block.name, input: block.input });
      }
    }
    
    await taskService.complete(
      task,
      setarVariaveisCamunda({
        resposta,
        toolCalls: JSON.stringify(toolCalls),
        stopReason: response.stop_reason,
        tokens_input: response.usage.input_tokens,
        tokens_output: response.usage.output_tokens,
        latencia_ms,
      })
    );
  },
};
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

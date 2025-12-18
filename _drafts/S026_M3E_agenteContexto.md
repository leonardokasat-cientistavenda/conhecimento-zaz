---
id: BKL-031
nome: Spec agente-contexto
versao: "1.0"
tipo: Spec
vertente: M3.E
status: Draft
sprint_ref: S026
template_ref: _catalogo/templates/M3_E_POO.md
artefatos_produzidos:
  - "worker/agente/contexto.js"
  - "test/worker/agente/contexto.test.js"
---

# M3.E.02 - Spec agente-contexto

## 1. Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                      WorkerAgenteContexto                       │
├─────────────────────────────────────────────────────────────────┤
│  topic: "agente-contexto"                                       │
├─────────────────────────────────────────────────────────────────┤
│  Input (Camunda vars)                                           │
│  - agente_id: string       # "genesis", "zarah"                 │
│  - user_id: string         # ID Mattermost                      │
│  - channel_id: string      # Canal Mattermost                   │
│  - input: string           # Mensagem do usuário                │
├─────────────────────────────────────────────────────────────────┤
│  Output (Camunda vars)                                          │
│  - messages: string        # JSON array para API Anthropic      │
│  - modelo: string          # Modelo configurado do agente       │
│  - tools: string           # JSON array de tools                │
│  - system_prompt: string   # System prompt carregado            │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                         │
│  + execute(task, taskService): void                             │
│  - buscarConfigAgente(agente_id): AgenteConfig                  │
│  - buscarHistorico(agente_id, channel_id, limit): Message[]     │
│  - carregarSystemPrompt(path): string                           │
│  - montarMessages(system, historico, input): Message[]          │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Dependências

```javascript
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");
const { findOne, find } = require("../../database");
const { Octokit } = require("@octokit/rest"); // ou fetch direto
```

## 3. Schema TDD

### 3.1 Classes de Equivalência

| Atributo | Partição | Valores Exemplo | Válida | Fronteira |
|----------|----------|-----------------|--------|------------|
| agente_id | existente | "genesis" | ✅ | |
| agente_id | inexistente | "bot_xyz" | ❌ | |
| agente_id | vazio | "", null | ❌ | |
| user_id | valido | "mm_user_123" | ✅ | |
| user_id | vazio | "", null | ❌ | |
| channel_id | valido | "channel_abc" | ✅ | |
| channel_id | vazio | "", null | ❌ | |
| input | valido | "status do sprint" | ✅ | |
| input | vazio | "" | ✅ | prompt vazio é válido |
| input | muito_longo | "a" * 100000 | ✅ | truncar se necessário |
| historico | com_historico | [msg1, msg2] | ✅ | |
| historico | sem_historico | [] | ✅ | |

### 3.2 Critérios de Aceite

| ID | Método | Given | When | Then | Partições |
|----|--------|-------|------|------|----------|
| CA01 | execute | agente_id existente, input válido, com histórico | execute() | task completa com {messages, modelo, tools, system_prompt} | existente, valido, com_historico |
| CA02 | execute | agente_id existente, input válido, sem histórico | execute() | task completa com messages contendo apenas system + input | existente, valido, sem_historico |
| CA03 | execute | agente_id inexistente | execute() | task falha: 'agente não encontrado' | inexistente |
| CA04 | execute | user_id vazio | execute() | task falha: 'user_id obrigatório' | vazio |
| CA05 | buscarConfigAgente | agente_id existente | buscarConfigAgente() | retorna {modelo, tools, system_prompt_ref} | existente |
| CA06 | carregarSystemPrompt | path válido GitHub | carregarSystemPrompt() | retorna conteúdo do arquivo | |
| CA07 | montarMessages | system, histórico, input | montarMessages() | retorna array no formato API Anthropic | |

### 3.3 Cobertura

- **Estratégia:** pairwise
- **Combinações estimadas:** 12

## 4. Implementação Esperada

```javascript
// worker/agente/contexto.js
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");
const { findOne, find } = require("../../database");

module.exports = {
  "agente-contexto": async ({ task, taskService }) => {
    const { agente_id, user_id, channel_id, input } = getListaVariaveis(
      { agente_id: null, user_id: null, channel_id: null, input: "" },
      task
    );
    
    // Validações
    if (!agente_id) throw new Error("agente_id obrigatório");
    if (!user_id) throw new Error("user_id obrigatório");
    if (!channel_id) throw new Error("channel_id obrigatório");
    
    // Buscar config do agente
    const agente = await findOne("genesis", "agentes", { agente_id });
    if (!agente) throw new Error("agente não encontrado");
    
    // Carregar system prompt do GitHub
    const system_prompt = await carregarSystemPrompt(agente.system_prompt_ref);
    
    // Buscar histórico (ultimas 10 mensagens do canal)
    const historico = await find("agente", "execucoes", 
      { agente_id, channel_id },
      { sort: { created_at: -1 }, limit: 10 }
    );
    
    // Montar messages
    const messages = montarMessages(system_prompt, historico.reverse(), input);
    
    await taskService.complete(
      task,
      setarVariaveisCamunda({
        messages: JSON.stringify(messages),
        modelo: agente.modelo,
        tools: JSON.stringify(agente.tools || []),
        system_prompt,
      })
    );
  },
};

async function carregarSystemPrompt(path) {
  // Fetch do GitHub raw content
  const url = `https://raw.githubusercontent.com/leonardokasat-cientistavenda/conhecimento-zaz/main/${path}`;
  const response = await fetch(url);
  return response.text();
}

function montarMessages(system, historico, input) {
  const messages = [];
  
  // Adicionar histórico
  for (const exec of historico) {
    messages.push({ role: "user", content: exec.input });
    messages.push({ role: "assistant", content: exec.output });
  }
  
  // Adicionar input atual
  messages.push({ role: "user", content: input });
  
  return messages;
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

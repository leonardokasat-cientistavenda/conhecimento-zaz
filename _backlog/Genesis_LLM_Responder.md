---
titulo: "Genesis: Worker llm_responder"
data_criacao: 2025-12-13
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: Genesis
produto_ref: genesis
epico_ref: kernel
release_alvo: v0.1.0
---

# Genesis: Worker llm_responder

## Contexto

Worker Camunda que processa external task `llm_responder`: recebe mensagem, chama Anthropic API, retorna resposta.

**Decisão arquitetural:** ADR-003 (Workers reusáveis)

---

## Especificação

**Topic:** `llm_responder`

**Input (variables):**
- `content`: Texto da mensagem do usuário
- `user_id`: Identificador do usuário (para futuro contexto)

**Output (variables):**
- `response`: Texto da resposta do LLM

**Comportamento:**
1. Fetch task do Camunda
2. Montar prompt (system + user message)
3. Chamar Anthropic API (Opus 4.5)
4. Extrair resposta
5. Complete task com response

---

## System Prompt (v0)

```
Você é Genesis, um assistente inteligente da ZAZ.
Responda de forma clara e útil.
```

*Nota: System prompt será evoluído nas próximas fases.*

---

## Plano de Execução

| # | Arquivo | Método | Descrição |
|---|---------|--------|-----------|
| 1 | `genesis/workers/__init__.py` | Criar | Package |
| 2 | `genesis/workers/base.py` | Criar | Classe base Worker |
| 3 | `genesis/workers/llm_responder.py` | Criar | Worker específico |
| 4 | `genesis/workers/config.py` | Criar | Config (API key, etc) |
| 5 | `genesis/workers/requirements.txt` | Criar | anthropic, camunda-client |

---

## Critérios de Aceite

- [ ] Worker conecta ao Camunda
- [ ] Fetch de tasks com topic `llm_responder`
- [ ] Chamada correta à Anthropic API
- [ ] Complete task com resposta
- [ ] Tratamento de erros (failure com retry)
- [ ] Logs estruturados

---

## Referências

- [Épico Kernel](docs/04_P/Genesis/epicos/kernel.md)
- [Arquitetura Genesis](docs/04_P/Genesis/arquitetura.md)

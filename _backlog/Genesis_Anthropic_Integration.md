---
titulo: "Genesis: Integração Anthropic API"
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

# Genesis: Integração Anthropic API

## Contexto

Configurar e testar integração com Anthropic API para usar Opus 4.5.

---

## Especificação

**Modelo:** claude-opus-4-5-20251101 (Opus 4.5)

**Endpoint:** https://api.anthropic.com/v1/messages

**Autenticação:** API Key via header `x-api-key`

**Parâmetros iniciais:**
- `max_tokens`: 4096
- `temperature`: 0.7 (ajustável)

---

## Configuração

**Variáveis de ambiente:**
```
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-opus-4-5-20251101
ANTHROPIC_MAX_TOKENS=4096
```

---

## Plano de Execução

| # | Arquivo | Método | Descrição |
|---|---------|--------|-----------|
| 1 | `genesis/llm/__init__.py` | Criar | Package |
| 2 | `genesis/llm/anthropic_client.py` | Criar | Client wrapper |
| 3 | `genesis/llm/config.py` | Criar | Configurações |
| 4 | `tests/test_anthropic.py` | Criar | Teste de integração |
| 5 | `.env.example` | Criar | Template de env vars |

---

## Critérios de Aceite

- [ ] Client inicializa com API key
- [ ] Chamada simples retorna resposta
- [ ] Tratamento de rate limits
- [ ] Tratamento de erros de API
- [ ] Teste de integração passa
- [ ] Documentação de setup

---

## Referências

- [Anthropic API Docs](https://docs.anthropic.com)
- [Épico Kernel](docs/04_P/Genesis/epicos/kernel.md)

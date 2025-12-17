# BKL-028 - Multi-Modelo Dinâmico por Capacidade

> **Backlog:** BKL-028  
> **Tipo:** Melhoria  
> **Prioridade:** 🟢 Baixa  
> **Status:** Backlog  
> **Descoberto em:** S026 - Análise M1

---

## Problema

Modelo LLM fixo (Sonnet) não otimiza o trade-off **custo vs qualidade**:
- Tarefas simples (formatar texto) pagam preço de Sonnet
- Tarefas complexas (raciocínio profundo) poderiam usar Opus

---

## Solução Proposta

### 1. Config por Capacidade

```javascript
// db.capacidades
{
  "id": "ms_sprint",
  "llm_config": {
    "modelo": "claude-sonnet-4-20250514",
    "modelo_fallback": "claude-haiku-4-20250514",
    "max_tokens": 4096,
    "temperature": 0.7
  }
}
```

### 2. Seleção Dinâmica (futuro)

```javascript
// Algoritmo de seleção
function selecionarModelo(input, capacidade) {
  const complexidade = estimarComplexidade(input);
  const orcamento = obterOrcamentoDisponivel();
  
  if (complexidade > 0.8 && orcamento > 0.5) {
    return "opus";
  } else if (complexidade < 0.3) {
    return "haiku";
  }
  return "sonnet"; // default
}
```

### 3. Fallback Automático

```
Opus (erro 429) → tenta Sonnet → tenta Haiku → erro
```

---

## Modelos Disponíveis

| Modelo | Input/1M | Output/1M | Uso Recomendado |
|--------|----------|-----------|------------------|
| Haiku | $0.25 | $1.25 | Formatação, extração, tarefas simples |
| Sonnet | $3.00 | $15.00 | Default, uso geral, raciocínio médio |
| Opus | $15.00 | $75.00 | Raciocínio complexo, decisões críticas |

---

## Schema

### db.configuracoes
```javascript
{
  "tipo": "llm_defaults",
  "modelo_padrao": "claude-sonnet-4-20250514",
  "modelos_disponiveis": [
    {
      "id": "claude-haiku-4-20250514",
      "alias": "haiku",
      "pricing": { "input_per_million": 0.25, "output_per_million": 1.25 }
    },
    {
      "id": "claude-sonnet-4-20250514",
      "alias": "sonnet",
      "pricing": { "input_per_million": 3.00, "output_per_million": 15.00 }
    },
    {
      "id": "claude-opus-4-20250514",
      "alias": "opus",
      "pricing": { "input_per_million": 15.00, "output_per_million": 75.00 }
    }
  ]
}
```

### db.capacidades (campo llm_config)
```javascript
{
  "id": "capacidade_x",
  "llm_config": {
    "modelo": "sonnet",           // ou ID completo
    "modelo_fallback": "haiku",
    "max_tokens": 4096,
    "temperature": 0.7,
    "selecao_dinamica": false     // habilita algoritmo
  }
}
```

---

## Fases de Implementação

### Fase 1: Config Estática (MVP)
- [ ] Ler modelo de db.capacidades.llm_config
- [ ] Fallback para db.configuracoes.modelo_padrao
- [ ] Pricing lookup para custeio

### Fase 2: Fallback Automático
- [ ] Retry com modelo inferior em erro 429
- [ ] Logging de fallbacks

### Fase 3: Seleção Dinâmica
- [ ] Estimador de complexidade
- [ ] Algoritmo de seleção
- [ ] Métricas de acerto

---

## Critérios de Aceitação

- [ ] Modelo configurado por capacidade funciona
- [ ] Fallback para default quando não configurado
- [ ] Custeio usa pricing correto do modelo usado
- [ ] Logs indicam qual modelo foi usado

---

## Esforço Estimado

- Fase 1: ~2h
- Fase 2: ~2h
- Fase 3: ~4h

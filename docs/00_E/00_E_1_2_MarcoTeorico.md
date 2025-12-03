---
nome: 00_E_1_2_MarcoTeorico
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_2_MarcoTeorico

## 1. Definição

MarcoTeorico é a classe que estrutura os conceitos fundamentais necessários para abordar um problema (M1). Estabelece vocabulário comum e referências externas.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único |
| problema_ref | Problema | Sim | Problema que fundamenta |
| conceitos | Conceito[] | Sim | Lista de conceitos definidos |
| fontes | Fonte[] | Não | Referências externas |
| premissas | string[] | Não | Suposições assumidas |
| frontmatter | Frontmatter | Sim | Metadados YAML |

### Conceito (subtipo)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| termo | string | Nome do conceito |
| definicao | string | O que significa |
| origem | string | De onde vem (fonte ou interno) |

### Fonte (subtipo)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| titulo | string | Nome da fonte |
| tipo | enum | Livro, Artigo, Framework, Interno |
| url | string | Link (se disponível) |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                       MARCO TEÓRICO                             │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                                                 │
│  - problema_ref: Problema                                       │
│  - conceitos: Conceito[]                                        │
│  - fontes: Fonte[]                                              │
│  - premissas: string[]                                          │
│  - frontmatter: Frontmatter                                     │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - todo conceito deve ter definição                             │
│  - conceitos devem ser relevantes ao problema                   │
│  - fontes devem ser verificáveis                                │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + levantar(): MarcoTeorico                                     │
│  + validar(): bool                                              │
│  + gerar_objeto(): Objeto                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Restrições

- Todo conceito usado deve ter definição explícita
- Conceitos devem ser relevantes para o problema
- Fontes externas devem ser verificáveis
- Premissas devem ser declaradas explicitamente

---

## 5. Fluxo (M1)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Problema   │ ──► │  Pesquisa   │ ──► │  Conceitos  │
│    (M0)     │     │  de Fontes  │     │  Definidos  │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                    ┌─────────────────┐
                                    │  Marco Teórico  │
                                    │   Estruturado   │
                                    └─────────────────┘
```

---

## 6. INSTRUÇÃO: Como levantar Marco Teórico

### 6.1 Template (copiar e preencher)

```markdown
## Marco Teórico

| Conceito | Definição |
|----------|-----------|
| [termo1] | [o que significa] |
| [termo2] | [o que significa] |

### Fontes
- [Fonte 1]: [descrição]
- [Fonte 2]: [descrição]

### Premissas
- [Suposição 1]
- [Suposição 2]
```

### 6.2 Checklist

- [ ] Conceitos-chave identificados
- [ ] Cada conceito tem definição
- [ ] Fontes documentadas
- [ ] Premissas explicitadas
- [ ] Vocabulário alinhado com o problema

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_1_Problema | Anterior (M0) |
| 00_E_1_3_Objeto | Próximo (M2) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-03 | Criação. Classe para M1 do framework epistemológico. |

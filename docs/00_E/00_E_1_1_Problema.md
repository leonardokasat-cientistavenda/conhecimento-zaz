---
nome: 00_E_1_1_Problema
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_1_Problema

## 1. Definição

Problema é a classe que estrutura o ponto de partida do método epistemológico (M0). Transforma sintomas vagos em necessidades claras e acionáveis.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único do problema |
| sintoma | string | Sim | Manifestação observável do problema |
| causa_raiz | string | Sim | Origem fundamental do sintoma |
| tentativas_anteriores | string[] | Não | Soluções já tentadas |
| necessidade | string | Sim | O que é necessário para resolver |
| contexto | string | Não | Situação onde o problema ocorre |
| impacto | string | Não | Consequências de não resolver |
| frontmatter | Frontmatter | Sim | Metadados YAML |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                          PROBLEMA                               │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                                                 │
│  - sintoma: string                                              │
│  - causa_raiz: string                                           │
│  - tentativas_anteriores: string[]                              │
│  - necessidade: string                                          │
│  - contexto: string                                             │
│  - impacto: string                                              │
│  - frontmatter: Frontmatter                                     │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - sintoma não é causa (observável vs origem)                   │
│  - necessidade deve ser acionável                               │
│  - causa_raiz deve explicar o sintoma                           │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + definir(): Problema                                          │
│  + validar(): bool                                              │
│  + gerar_marco_teorico(): MarcoTeorico                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Restrições

- Sintoma deve ser observável (não abstrato)
- Causa raiz deve explicar logicamente o sintoma
- Necessidade deve ser acionável (verbo no infinitivo)
- Tentativas anteriores documentam o que já foi testado

---

## 5. Fluxo (M0)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Sintoma   │ ──► │ Causa Raiz  │ ──► │ Necessidade │
│ (observável)│     │  (origem)   │     │ (acionável) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       └───────────── Problema ────────────────┘
```

---

## 6. INSTRUÇÃO: Como definir um Problema

### 6.1 Template (copiar e preencher)

```markdown
| Campo | Valor |
|-------|-------|
| **sintoma** | [O que você observa de errado?] |
| **causa_raiz** | [Por que isso acontece?] |
| **tentativas_anteriores** | [O que já tentou?] |
| **necessidade** | [O que precisa para resolver?] |
```

### 6.2 Checklist

- [ ] Sintoma é observável (não abstrato)
- [ ] Causa raiz explica o sintoma
- [ ] Necessidade é acionável
- [ ] Tentativas anteriores documentadas

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_2_MarcoTeorico | Próximo (M1) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-03 | Criação. Classe base para M0 do framework epistemológico. |

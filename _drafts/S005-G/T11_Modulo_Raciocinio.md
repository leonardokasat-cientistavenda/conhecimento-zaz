---
nome: T11_Modulo_Raciocinio
versao: "0.3"
tipo: Draft
classe_ref: Modulo
origem: interno
status: Draft
etapa: M2
sprint_ref: S005-G
task_ref: T11
---

# Módulo Raciocínio

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Módulo** | Conjunto de classes opcionais que Meta Sistemas podem compor |
| **Raciocínio** | Processo estruturado de pensar: hipótese → evidência → inferência → decisão |
| **Hipótese** | Proposição testável a ser validada ou refutada |
| **Evidência** | Dado concreto que suporta ou refuta hipótese |
| **Inferência** | Conexão lógica entre premissas e conclusão |
| **Decisão** | Escolha final baseada em raciocínio estruturado |
| **Composição** | Padrão onde módulo é usado opcionalmente (vs herança obrigatória) |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│  "Como estruturar o ATO DE PENSAR para que decisões sejam                   │
│   rastreáveis, reproduzíveis e validáveis?"                                 │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐        │
│  │  ALUCINAÇÃO       │  │  IRREPRODUCÍVEL   │  │  INAUDITÁVEL      │        │
│  │ LLM gera decisões │  │ Mesma pergunta,   │  │ Humano não sabe   │        │
│  │ sem evidências    │  │ respostas         │  │ quais passos LLM  │        │
│  │ rastreáveis       │  │ diferentes        │  │ seguiu            │        │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘        │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SOLUÇÃO                                         │
│  MÓDULO RACIOCÍNIO: Classes que estruturam o ato de pensar                  │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐           │
│  │ Hipótese  │ →  │ Evidência │ →  │ Inferência│ →  │  Decisão  │           │
│  └───────────┘    └───────────┘    └───────────┘    └───────────┘           │
│  Composição: Meta Sistemas ESCOLHEM se usam o módulo                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Módulo Raciocínio é conjunto de classes opcionais (Hipótese, Evidência, Inferência, Decisão) que estruturam o ato de pensar, tornando decisões rastreáveis, reproduzíveis e validáveis.**
>
> - Epistemologia estrutura CONHECIMENTO (o que sabemos)
> - Módulo Raciocínio estrutura PENSAMENTO (como decidimos)
>
> **Princípio:** Composição sobre herança - Meta Sistemas escolhem se usam o módulo.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação no Módulo |
|----------|--------|---------------------|
| **Toulmin Model** | Toulmin (1958) | Estrutura: Data → Warrant → Claim |
| **Falsificabilidade** | Popper (1959) | Hipóteses testáveis e refutáveis |
| **Vieses Cognitivos** | Kahneman (2011) | Estrutura reduz vieses do Sistema 1 |
| **Chain of Thought** | Wei et al. (2022) | Raciocínio passo-a-passo melhora LLMs |
| **Composição** | SOLID | Módulo opcional, não forçado por herança |

### 2.2 Mapeamento Toulmin → Módulo Raciocínio

| Toulmin | Classe do Módulo | Função |
|---------|------------------|--------|
| Data | **Evidência** | Fatos concretos |
| Warrant | **Inferência** | Regra lógica |
| Claim | **Decisão** | Conclusão final |
| Qualifier | atributo `confianca` | Grau de certeza |
| Rebuttal | Evidência `peso: negativo` | Contra-argumentos |
| *(adicional)* | **Hipótese** | Proposição inicial |

---

## 3. Objeto (M2)

### 3.1 Definição

| Campo | Valor |
|-------|-------|
| **nome** | Módulo Raciocínio |
| **tipo** | Módulo (conjunto de classes opcionais) |
| **objetivo** | Estruturar o ato de pensar para decisões rastreáveis |
| **camada** | C3 (Framework - filho da Epistemologia) |

### 3.2 Escopo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ESCOPO DO MÓDULO RACIOCÍNIO                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  INCLUI (Classes):                                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  • Hipótese    - proposição testável                                  │  │
│  │  • Evidência   - dado que suporta/refuta                              │  │
│  │  • Inferência  - conexão lógica                                       │  │
│  │  • Decisão     - escolha final rastreável                             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  INCLUI (Métodos):                                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  • ciclo_raciocinio()  - orquestra H→E→I→D                            │  │
│  │  • validar_etapa()     - checkpoint humano                            │  │
│  │  • persistir()         - salva decisão com histórico                  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  INCLUI (Comportamentos):                                                   │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  • Composição opcional por Meta Sistemas                              │  │
│  │  • Validação intermediária em cada etapa                              │  │
│  │  • Rastreabilidade de decisões                                        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Fronteiras

| Módulo Raciocínio É | Módulo Raciocínio NÃO É |
|---------------------|-------------------------|
| Classes para estruturar pensamento | Método para criar conhecimento (isso é M0-M4) |
| Opcional (composição) | Obrigatório (herança) |
| Ciclo H→E→I→D | Ciclo M0→M1→M2→M3→M4 |
| Para DECIDIR | Para DOCUMENTAR |
| Usado por Meta Sistemas que decidem | Usado por todos Meta Sistemas |

### 3.4 Relação com Epistemologia

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EPISTEMOLOGIA vs MÓDULO RACIOCÍNIO                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EPISTEMOLOGIA (obrigatório):          MÓDULO RACIOCÍNIO (opcional):        │
│  ┌─────────────────────────────┐       ┌─────────────────────────────┐      │
│  │  M0 → M1 → M2 → M3 → M4     │       │  H → E → I → D              │      │
│  │  Estrutura CONHECIMENTO     │       │  Estrutura PENSAMENTO       │      │
│  │  "O que é isso?"            │       │  "O que fazer?"             │      │
│  │  Output: Documento          │       │  Output: Decisão            │      │
│  └─────────────────────────────┘       └─────────────────────────────┘      │
│               │                                     │                       │
│               │         RELAÇÃO                     │                       │
│               └──────────────┬──────────────────────┘                       │
│                              │                                              │
│                              ▼                                              │
│               ┌─────────────────────────────┐                               │
│               │  Epistemologia CONTÉM       │                               │
│               │  Módulo Raciocínio como     │                               │
│               │  filho opcional             │                               │
│               └─────────────────────────────┘                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Entradas e Saídas

| Entrada | Saída |
|---------|-------|
| Problema que requer decisão | Decisão rastreável |
| Contexto do Meta Sistema | Histórico: hipóteses + evidências + inferências |
| Dados disponíveis | Confiança calibrada |

### 3.6 Critérios de Sucesso

| Critério | Métrica |
|----------|---------|
| Rastreabilidade | Toda decisão tem hipóteses, evidências, inferências documentadas |
| Reprodutibilidade | Mesmo input + mesmo método = mesma conclusão |
| Validabilidade | Humano pode aprovar/rejeitar em cada etapa |
| Auditabilidade | Histórico completo persistido |

---

## 4. Classe (M3)

*A definir na próxima etapa.*

---

## Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_Epistemologia.md | Pai - contém este módulo |
| _backlog/Modulo_Raciocinio.md | Contexto original |

### Externas

| Fonte | Conceito |
|-------|----------|
| Toulmin, S. (1958). The Uses of Argument | Modelo de argumentação |
| Popper, K. (1959). The Logic of Scientific Discovery | Falsificabilidade |
| Kahneman, D. (2011). Thinking, Fast and Slow | Vieses cognitivos |
| Wei, J. et al. (2022). Chain-of-Thought Prompting | Raciocínio em LLMs |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | M0 inicial - Problema definido |
| 0.2 | 2025-12-05 | M1 - Marco Teórico (Toulmin, Popper, Kahneman, CoT) |
| 0.3 | 2025-12-05 | M2 - Objeto (escopo, fronteiras, relação Epistemologia) |

---
nome: T11_Modulo_Raciocinio
versao: "0.2"
tipo: Draft
classe_ref: Modulo
origem: interno
status: Draft
etapa: M1
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
│                                                                             │
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
│  ├───────────────────┤  ├───────────────────┤  ├───────────────────┤        │
│  │ LLM gera decisões │  │ Mesma pergunta,   │  │ Humano não sabe   │        │
│  │ sem evidências    │  │ respostas         │  │ quais passos LLM  │        │
│  │ rastreáveis       │  │ diferentes        │  │ seguiu            │        │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘        │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CAUSAS RAIZ                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  • LLM prediz estatisticamente, não raciocina → alta fluência, baixa lógica │
│  • Sem estrutura explícita → cada raciocínio é "caixa preta"                │
│  • Etapas misturadas → hipótese, evidência, inferência não separadas        │
│  • Sem validação intermediária → erro propaga para decisão                  │
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
| **Toulmin Model** | Toulmin (1958) | Estrutura de argumento: Data → Warrant → Claim |
| **Falsificabilidade** | Popper (1959) | Hipóteses devem ser testáveis e refutáveis |
| **Vieses Cognitivos** | Kahneman (2011) | Estrutura reduz vieses do Sistema 1 |
| **Chain of Thought** | Wei et al. (2022) | Raciocínio passo-a-passo melhora LLMs |
| **Composição** | SOLID | Módulo opcional, não forçado por herança |

### 2.2 Toulmin Model (Base Principal)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TOULMIN MODEL OF ARGUMENTATION                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         ┌─────────────┐                                     │
│                         │    CLAIM    │ ◄── Conclusão/Decisão               │
│                         │  (Decisão)  │                                     │
│                         └──────▲──────┘                                     │
│                                │                                            │
│                           therefore                                         │
│                                │                                            │
│                         ┌──────┴──────┐                                     │
│                         │   WARRANT   │ ◄── Regra geral/Inferência          │
│                         │ (Inferência)│                                     │
│                         └──────▲──────┘                                     │
│                                │                                            │
│                             since                                           │
│                                │                                            │
│                         ┌──────┴──────┐                                     │
│                         │    DATA     │ ◄── Fatos/Evidências                │
│                         │ (Evidência) │                                     │
│                         └─────────────┘                                     │
│                                                                             │
│  Elementos adicionais:                                                      │
│  • QUALIFIER: grau de certeza ("provavelmente", "certamente")               │
│  • REBUTTAL: exceções, contra-argumentos                                    │
│  • BACKING: suporte adicional para o warrant                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Mapeamento Toulmin → Módulo Raciocínio

| Toulmin | Classe do Módulo | Função |
|---------|------------------|--------|
| Data | **Evidência** | Fatos concretos que suportam/refutam |
| Warrant | **Inferência** | Regra lógica que conecta evidência à decisão |
| Claim | **Decisão** | Conclusão final |
| Qualifier | atributo `confianca` em Decisão | Grau de certeza |
| Rebuttal | Evidência com `peso: negativo` | Contra-argumentos |
| Backing | Evidência que suporta Inferência | Suporte à regra |
| *(adicional)* | **Hipótese** | Proposição inicial a ser testada |

### 2.4 Falsificabilidade (Popper)

| Princípio | Aplicação |
|-----------|-----------|
| Hipótese deve ser testável | Atributo `criterio_teste` obrigatório |
| Hipótese deve ser refutável | Evidência pode ter `peso: negativo` |
| Buscar refutação, não confirmação | Método `buscar_evidencia_contraria()` |

### 2.5 Vieses Cognitivos (Kahneman)

| Viés | Como o Módulo Mitiga |
|------|---------------------|
| **Confirmação** | Exige evidências contrárias explícitas |
| **Ancoragem** | Hipóteses separadas, não contaminam evidências |
| **Disponibilidade** | Evidências documentadas, não apenas lembradas |
| **Overconfidence** | Atributo `confianca` força calibração |

### 2.6 Chain of Thought (Wei et al.)

| Técnica | Aplicação no Módulo |
|---------|---------------------|
| Raciocínio passo-a-passo | Ciclo Hipótese → Evidência → Inferência → Decisão |
| Explicitação de etapas | Cada classe é uma etapa visível |
| Verificabilidade | Humano valida cada passo |

### 2.7 Síntese: Por que este Marco Teórico

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SÍNTESE DO MARCO TEÓRICO                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROBLEMA: LLM não raciocina, apenas prediz                                 │
│                                                                             │
│  SOLUÇÃO TEÓRICA:                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Toulmin      → Estrutura formal de argumentação                    │    │
│  │  Popper       → Hipóteses testáveis e refutáveis                    │    │
│  │  Kahneman     → Mitigação de vieses cognitivos                      │    │
│  │  Chain of     → Raciocínio explícito melhora outputs                │    │
│  │  Thought                                                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  RESULTADO: Estrutura que força raciocínio explícito,                       │
│             testável e auditável                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

*A definir na próxima etapa.*

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

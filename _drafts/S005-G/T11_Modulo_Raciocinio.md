---
nome: T11_Modulo_Raciocinio
versao: "0.4"
tipo: Draft
classe_ref: Modulo
origem: interno
status: Draft
etapa: M3
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

### 1.2 Tese

> **Módulo Raciocínio é conjunto de classes opcionais (Hipótese, Evidência, Inferência, Decisão) que estruturam o ato de pensar, tornando decisões rastreáveis, reproduzíveis e validáveis.**
>
> - Epistemologia estrutura CONHECIMENTO (o que sabemos)
> - Módulo Raciocínio estrutura PENSAMENTO (como decidimos)

---

## 2. Marco Teórico (M1)

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Toulmin Model** | Toulmin (1958) | Data → Warrant → Claim |
| **Falsificabilidade** | Popper (1959) | Hipóteses testáveis |
| **Vieses Cognitivos** | Kahneman (2011) | Estrutura mitiga vieses |
| **Chain of Thought** | Wei et al. (2022) | Raciocínio explícito |

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| É | NÃO É |
|---|-------|
| Estrutura PENSAMENTO | Estrutura CONHECIMENTO (M0-M4) |
| Ciclo H→E→I→D | Ciclo M0→M1→M2→M3→M4 |
| Para DECIDIR | Para DOCUMENTAR |
| Opcional (composição) | Obrigatório (herança) |

---

## 4. Classe (M3)

### 4.1 Diagrama Geral do Módulo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MÓDULO RACIOCÍNIO                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────┐      ┌───────────────┐      ┌───────────────┐           │
│  │   HIPÓTESE    │─────▶│   EVIDÊNCIA   │─────▶│  INFERÊNCIA   │           │
│  └───────────────┘  1:N └───────────────┘  N:1 └───────────────┘           │
│         │                                              │                    │
│         │                      1:N                     │                    │
│         └──────────────────────┬───────────────────────┘                    │
│                                ▼                                            │
│                       ┌───────────────┐                                     │
│                       │    DECISÃO    │                                     │
│                       └───────────────┘                                     │
│                                                                             │
│  Métodos do Módulo:                                                         │
│  + ciclo_raciocinio(problema) → Decisão                                     │
│  + validar_etapa(etapa) → bool                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Classe: Hipótese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              HIPÓTESE                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: string                      # Identificador único                    │
│  + enunciado: string               # "Se X, então Y"                        │
│  + criterio_teste: string          # Como verificar (Popper)                │
│  + status: enum                    # Pendente | Confirmada | Refutada       │
│  + confianca_inicial: float        # 0.0 a 1.0                              │
│  + evidencias: Evidencia[]         # Referências                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  R1: enunciado deve ser testável (não pode ser "talvez X")                  │
│  R2: criterio_teste obrigatório (falsificabilidade)                         │
│  R3: confianca_inicial entre 0.0 e 1.0                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + adicionar_evidencia(e: Evidencia): void                                  │
│  + atualizar_status(): void        # Baseado nas evidências                 │
│  + calcular_confianca(): float     # Baseado no peso das evidências         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Classe: Evidência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EVIDÊNCIA                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: string                      # Identificador único                    │
│  + descricao: string               # O que foi observado                    │
│  + fonte: string                   # De onde veio (documento, dado, etc.)   │
│  + tipo: enum                      # Fato | Dado | Observacao | Testemunho  │
│  + peso: enum                      # Positivo | Negativo | Neutro           │
│  + forca: float                    # 0.0 a 1.0 (quão forte é)               │
│  + hipotese_ref: string            # ID da hipótese que suporta/refuta      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  R1: fonte obrigatória (rastreabilidade)                                    │
│  R2: peso obrigatório (Toulmin: rebuttal = peso negativo)                   │
│  R3: forca entre 0.0 e 1.0                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + validar_fonte(): bool           # Fonte existe e é acessível?            │
│  + calcular_impacto(): float       # forca * peso_numerico                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Classe: Inferência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             INFERÊNCIA                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: string                      # Identificador único                    │
│  + premissas: string[]             # Lista de premissas (evidências usadas) │
│  + regra: string                   # Warrant - regra lógica aplicada        │
│  + conclusao: string               # O que se conclui                       │
│  + metodo_logico: enum             # Deducao | Inducao | Abducao            │
│  + evidencias_ref: string[]        # IDs das evidências usadas              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  R1: mínimo 1 premissa                                                      │
│  R2: regra obrigatória (Toulmin: warrant)                                   │
│  R3: conclusao deve seguir logicamente das premissas + regra                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + validar_logica(): bool          # Conclusão segue das premissas?         │
│  + listar_premissas(): string[]    # Retorna premissas formatadas           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Classe: Decisão

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DECISÃO                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: string                      # Identificador único                    │
│  + problema: string                # Pergunta original                      │
│  + opcoes: string[]                # Alternativas consideradas              │
│  + escolha: string                 # Opção selecionada                      │
│  + justificativa: string           # Por que esta opção                     │
│  + confianca: float                # 0.0 a 1.0 (Toulmin: qualifier)         │
│  + hipoteses_ref: string[]         # IDs das hipóteses consideradas         │
│  + inferencias_ref: string[]       # IDs das inferências usadas             │
│  + data: datetime                  # Quando foi decidido                    │
│  + status: enum                    # Pendente | Aprovada | Rejeitada        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  R1: mínimo 2 opções (se só tem 1, não é decisão)                           │
│  R2: escolha deve estar em opcoes                                           │
│  R3: justificativa obrigatória (rastreabilidade)                            │
│  R4: mínimo 1 inferência referenciada                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + gerar_historico(): Historico    # Monta trilha completa H→E→I→D          │
│  + aprovar(): void                 # Humano aprova                          │
│  + rejeitar(motivo: string): void  # Humano rejeita com motivo              │
│  + recalcular_confianca(): float   # Baseado nas inferências                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Método: ciclo_raciocinio()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ciclo_raciocinio(problema)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: problema (string) - pergunta que requer decisão                     │
│  Output: Decisão - com histórico completo                                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1. GERAR HIPÓTESES                                                 │    │
│  │     └─ Para cada opção possível, criar Hipótese                     │    │
│  │        └─ validar_etapa("hipoteses") → humano aprova?               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  2. COLETAR EVIDÊNCIAS                                              │    │
│  │     └─ Para cada hipótese, buscar evidências (positivas E negativas)│    │
│  │        └─ validar_etapa("evidencias") → humano aprova?              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  3. CONSTRUIR INFERÊNCIAS                                           │    │
│  │     └─ Conectar evidências → conclusões via regras lógicas          │    │
│  │        └─ validar_etapa("inferencias") → humano aprova?             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  4. TOMAR DECISÃO                                                   │    │
│  │     └─ Escolher opção com base nas inferências                      │    │
│  │     └─ Calcular confiança                                           │    │
│  │     └─ Gerar justificativa                                          │    │
│  │        └─ validar_etapa("decisao") → humano aprova?                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│                          Retorna: Decisão                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Exemplo de Uso

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  EXEMPLO: "Onde colocar os módulos?"                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  HIPÓTESES:                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  H1: enunciado="Módulos devem ficar dentro da Epistemologia"        │    │
│  │      criterio_teste="Verificar se hierarquia suporta"               │    │
│  │  H2: enunciado="Módulos devem ficar em pasta separada"              │    │
│  │      criterio_teste="Verificar se há precedentes"                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  EVIDÊNCIAS:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  E1: descricao="Hierarquia: GENESIS→Epistemologia→Módulos"          │    │
│  │      fonte="GENESIS.md", peso=Positivo, hipotese_ref=H1             │    │
│  │  E2: descricao="Classes M0-M4 estão dentro da Epistemologia"        │    │
│  │      fonte="docs/00_E/", peso=Positivo, hipotese_ref=H1             │    │
│  │  E3: descricao="Princípio SOLID: filhos dentro do pai"              │    │
│  │      fonte="SOLID Principles", peso=Positivo, hipotese_ref=H1       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  INFERÊNCIA:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  I1: premissas=["Módulos são filhos da Epistemologia",              │    │
│  │                 "Filhos ficam dentro do pai"]                       │    │
│  │      regra="Hierarquia de composição"                               │    │
│  │      conclusao="Módulos devem ficar dentro da Epistemologia"        │    │
│  │      metodo_logico=Deducao                                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  DECISÃO:                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  D1: problema="Onde colocar os módulos?"                            │    │
│  │      opcoes=["Dentro da Epistemologia", "Pasta separada"]           │    │
│  │      escolha="Dentro da Epistemologia"                              │    │
│  │      justificativa="3 evidências convergentes + princípio SOLID"    │    │
│  │      confianca=0.9                                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

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
| 0.2 | 2025-12-05 | M1 - Marco Teórico |
| 0.3 | 2025-12-05 | M2 - Objeto (escopo, fronteiras) |
| 0.4 | 2025-12-05 | M3 - Classes (Hipótese, Evidência, Inferência, Decisão) + ciclo_raciocinio() |

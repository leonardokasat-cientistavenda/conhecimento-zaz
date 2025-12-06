---
nome: 00_E_2_2_Modulo_Raciocinio
versao: "1.0"
tipo: Modulo
classe_ref: Modulo
origem: interno
status: Publicado
etapa: M4
sprint_ref: S005-G
task_ref: T13
depende_de:
  - 00_E_2_1_Modulo_Catalogo
---

# Módulo Raciocínio v1.0

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

> **Módulo Raciocínio estrutura o ato de pensar via ciclo H→E→I→D, tornando decisões rastreáveis, reproduzíveis e reutilizáveis.**
>
> - Epistemologia estrutura CONHECIMENTO (o que sabemos)
> - Raciocínio estrutura PENSAMENTO (como decidimos)
> - **Catálogo persiste e busca decisões** (memória estruturada)

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
| Usa Catálogo como memória | O próprio Catálogo |

---

## 4. Classe (M3)

### 4.1 Diagrama Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MÓDULO RACIOCÍNIO                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────┐      ┌───────────────┐      ┌───────────────┐           │
│  │   HIPÓTESE    │─────▶│   EVIDÊNCIA   │─────▶│  INFERÊNCIA   │           │
│  └───────────────┘  1:N └───────────────┘  N:1 └───────────────┘           │
│         │                                              │                    │
│         └──────────────────────┬───────────────────────┘                    │
│                                ▼                                            │
│                       ┌───────────────┐                                     │
│                       │    DECISÃO    │                                     │
│                       └───────────────┘                                     │
│                                │                                            │
│                                ▼                                            │
│                       ┌───────────────┐                                     │
│                       │   CATÁLOGO    │ ◄── indexar / buscar                │
│                       └───────────────┘                                     │
│                                                                             │
│  Métodos:                                                                   │
│  + ciclo_raciocinio(problema) → Decisão                                     │
│  + buscar_decisao_similar(contexto) → Decisão?                              │
│  + persistir(decisao) → void                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Integração com Catálogo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RACIOCÍNIO USA CATÁLOGO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ANTES (sem Catálogo):                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  problema → ciclo H→E→I→D → decisão → persiste arquivo               │    │
│  │  (sempre cria nova decisão, nunca reutiliza)                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  DEPOIS (com Catálogo):                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  problema                                                           │    │
│  │      │                                                              │    │
│  │      ▼                                                              │    │
│  │  Catalogo.buscar(problema, tipo="Decisao")                          │    │
│  │      │                                                              │    │
│  │      ├── EXISTE (score >= 0.75)                                     │    │
│  │      │   └── Apresenta decisão                                      │    │
│  │      │       └── Usuário aceita? → atualiza metadata (uso_count++)  │    │
│  │      │       └── Usuário rejeita? → ciclo H→E→I→D                   │    │
│  │      │                                                              │    │
│  │      └── NÃO EXISTE                                                 │    │
│  │          └── ciclo H→E→I→D                                          │    │
│  │              └── persistir(decisao)                                 │    │
│  │              └── Catalogo.indexar(decisao, chave_semantica)         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Classe: Hipótese

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
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Classe: Evidência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EVIDÊNCIA                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: string                      # Identificador único                    │
│  + descricao: string               # O que foi observado                    │
│  + fonte: string                   # De onde veio                           │
│  + tipo: enum                      # Fato | Dado | Observacao | Testemunho  │
│  + peso: enum                      # Positivo | Negativo | Neutro           │
│  + forca: float                    # 0.0 a 1.0                              │
│  + hipotese_ref: string            # ID da hipótese                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  R1: fonte obrigatória (rastreabilidade)                                    │
│  R2: peso obrigatório (Toulmin: rebuttal = peso negativo)                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Classe: Inferência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             INFERÊNCIA                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: string                      # Identificador único                    │
│  + premissas: string[]             # Lista de premissas                     │
│  + regra: string                   # Warrant - regra lógica                 │
│  + conclusao: string               # O que se conclui                       │
│  + metodo_logico: enum             # Deducao | Inducao | Abducao            │
│  + evidencias_ref: string[]        # IDs das evidências usadas              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  R1: mínimo 1 premissa                                                      │
│  R2: regra obrigatória (Toulmin: warrant)                                   │
│  R3: conclusao deve seguir logicamente                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Classe: Decisão

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
│  + hipoteses_ref: string[]         # IDs das hipóteses                      │
│  + inferencias_ref: string[]       # IDs das inferências                    │
│  + data: datetime                  # Quando foi decidido                    │
│  + status: enum                    # Pendente | Aprovada | Rejeitada        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Metadata (para Catálogo)                                                   │
│  ────────────────────────                                                   │
│  + uso_count: int                  # Quantas vezes foi consultada           │
│  + confirmacoes: int               # Quantas vezes usuário confirmou        │
│  + rejeicoes: int                  # Quantas vezes usuário rejeitou         │
│  + ultima_consulta: datetime       # Data da última consulta                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  R1: mínimo 2 opções (se só tem 1, não é decisão)                           │
│  R2: escolha deve estar em opcoes                                           │
│  R3: justificativa obrigatória (rastreabilidade)                            │
│  R4: mínimo 1 inferência referenciada                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Método: ciclo_raciocinio()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ciclo_raciocinio(problema)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: problema (string)                                                   │
│  Output: Decisão                                                            │
│                                                                             │
│  0. BUSCAR DECISÃO EXISTENTE                                                │
│     └─ resultado = Catalogo.buscar(problema, tipo="Decisao")                │
│     └─ SE resultado.score >= 0.75:                                          │
│        └─ Apresenta decisão ao usuário                                      │
│        └─ SE aceita:                                                        │
│           └─ Catalogo.atualizar_metadata(id, {uso_count++, confirmacoes++}) │
│           └─ RETURN decisão existente                                       │
│        └─ SE rejeita:                                                       │
│           └─ Catalogo.atualizar_metadata(id, {uso_count++, rejeicoes++})    │
│           └─ CONTINUA para criar nova                                       │
│                                                                             │
│  1. GERAR HIPÓTESES                                                         │
│     └─ Para cada opção possível, criar Hipótese                             │
│     └─ persistir(decisao)                                                   │
│     └─ validar_etapa("hipoteses") → humano aprova?                          │
│                                                                             │
│  2. COLETAR EVIDÊNCIAS                                                      │
│     └─ Para cada hipótese, buscar evidências (positivas E negativas)        │
│     └─ persistir(decisao)                                                   │
│     └─ validar_etapa("evidencias") → humano aprova?                         │
│                                                                             │
│  3. CONSTRUIR INFERÊNCIAS                                                   │
│     └─ Conectar evidências → conclusões via regras lógicas                  │
│     └─ persistir(decisao)                                                   │
│     └─ validar_etapa("inferencias") → humano aprova?                        │
│                                                                             │
│  4. TOMAR DECISÃO                                                           │
│     └─ Escolher opção com base nas inferências                              │
│     └─ Calcular confiança                                                   │
│     └─ Gerar justificativa                                                  │
│     └─ persistir(decisao)                                                   │
│     └─ Catalogo.indexar(decisao, problema)  ◄── INDEXA NO CATÁLOGO          │
│     └─ validar_etapa("decisao") → humano aprova?                            │
│                                                                             │
│  RETURN: Decisão                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.8 Persistência

| Regra | Especificação |
|-------|---------------|
| **Quando** | A cada etapa do ciclo H→E→I→D |
| **Onde** | `_decisoes/D_YYYY-MM-DD_slug.md` |
| **Formato** | Markdown com frontmatter |
| **Catálogo** | Indexar ao finalizar (etapa 4) |

```markdown
---
nome: D_2025-12-06_onde-colocar-modulos
tipo: Decisao
status: Aprovada
etapa: Decisao
meta_sistema_ref: Epistemologia
created_at: 2025-12-06T14:30:00
updated_at: 2025-12-06T14:45:00
# Metadata Catálogo
uso_count: 3
confirmacoes: 2
rejeicoes: 0
ultima_consulta: 2025-12-06T16:00:00
---

# Decisão: Onde colocar os módulos?

## 1. Hipóteses
...

## 2. Evidências
...

## 3. Inferências
...

## 4. Decisão
...
```

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_Epistemologia.md | Pai - contém este módulo |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Dependência - memória estruturada |
| genesis/GENESIS.md | Orquestrador - roteia para Raciocínio quando DECIDIR |

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
| 0.1-0.5 | 2025-12-05 | Desenvolvimento M0-M3 em _drafts/ |
| 1.0 | 2025-12-06 | **Publicação M4.** Integração com Catálogo: buscar_decisao_similar antes de criar; indexar ao persistir; metadata de força (uso_count, confirmacoes). Sprint S005-G/T13. |

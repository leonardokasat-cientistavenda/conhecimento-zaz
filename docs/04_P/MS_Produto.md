# MS_Produto v2.0

---

```yaml
nome: MS_Produto
versao: "2.0"
tipo: Meta Sistema
status: Publicado
camada: 4
dominio: Produto
data_publicacao: "2025-12-16"
pai: genesis/GENESIS.md
depende_de:
  - genesis/GENESIS.md
  - genesis/GENESIS_Arquitetura.md
  - docs/00_E/00_E_Epistemologia.md
  - docs/00_I/00_I_2_1_Backlog.md
estende:
  - docs/00_I/00_I_2_1_Backlog.md
arquitetura: docs/04_P/MS_Produto_Arquitetura.md
```

---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Dor** | Problema real do usuário que gera fricção/desperdício |
| **Prontuário** | Dor estruturada via entrevista (sintoma, afetados, impacto, critério esperado) |
| **Produto** | Solução que resolve a dor macro do usuário |
| **Feature** | Hipótese testável de COMO contribuir para resolver a dor |
| **Critério de Sucesso** | Métrica com baseline, meta e valor atual |
| **Threshold de Adoção** | % mínimo de adoção para considerar produto bem-sucedido |
| **Avaliação de Efetividade** | Análise se Feature/Produto atingiu seus critérios |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PROBLEMA                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. ENTENDIMENTO SUPERFICIAL DA DOR                                         │
│     "Quero um sistema de reporte" ← sintoma, não é a dor                    │
│     Sem entrevista estruturada, produto não tem fit                         │
│                                                                             │
│  2. CRITÉRIOS DE SUCESSO AUSENTES                                           │
│     Produto lançado sem saber se resolveu a dor                             │
│     Feature implementada sem métrica de validação                           │
│                                                                             │
│  3. CICLO DE FEEDBACK QUEBRADO                                              │
│     Bug vs Feature falha → tratados igual                                   │
│     Não sabe quando iterar vs quando pivotar                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **MS_Produto é o Meta Sistema que gerencia o ciclo de vida de Produtos, desde o entendimento profundo da dor até a validação de efetividade.**
>
> **Responsabilidades:**
> - **Entrevistar** para estruturar a dor (Prontuário)
> - **Estruturar** Produto com threshold de sucesso
> - **Criar Features** como hipóteses testáveis
> - **Solicitar** ciclos epistemológicos via Backlog
> - **Receber** releases de PROMETHEUS
> - **Validar** efetividade e iterar
>
> **Princípio:** A dor é resolvida no PRODUTO. Features são hipóteses de como contribuir.

### 1.4 Escopo

| MS_Produto FAZ | MS_Produto NÃO FAZ |
|----------------|-------------------|
| Entrevista para estruturar dor | Especifica tecnicamente (Epistemologia faz) |
| Define Produto e Features | Desenvolve código (PROMETHEUS faz) |
| Solicita trabalho via Backlog | Executa sprints (Sprint faz) |
| Valida efetividade | Implementa busca semântica (Catálogo faz) |
| Itera baseado em resultado | Roteia problemas (GENESIS faz) |

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Jobs to be Done** | Christensen | Dor = job que usuário quer resolver |
| **Lean Startup** | Ries | Feature = hipótese testável |
| **OKR** | Grove/Doerr | Critérios de sucesso mensuráveis |
| **Customer Success** | Mehta | Health Score, feedback loop |
| **TDD** | Beck | Especificar teste antes de implementar |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MS_PRODUTO: SÍNTESE TEÓRICA                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  JOBS TO BE DONE          LEAN STARTUP           OKR                        │
│  ┌───────────────┐        ┌───────────────┐      ┌───────────────┐          │
│  │ Entender o    │        │ Feature =     │      │ Critério =    │          │
│  │ job real do   │ ────►  │ hipótese      │ ───► │ KR mensurável │          │
│  │ usuário       │        │ testável      │      │ com meta      │          │
│  └───────────────┘        └───────────────┘      └───────────────┘          │
│         │                        │                      │                   │
│         │                        │                      │                   │
│         ▼                        ▼                      ▼                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                           MS_PRODUTO                                │    │
│  │                                                                     │    │
│  │  Prontuário ──► Produto ──► Feature ──► Validação ──► Iteração     │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| MS_Produto É | MS_Produto NÃO É |
|--------------|------------------|
| Dono da dor e do produto | Executor de especificação técnica |
| Entrevistador estruturado | Desenvolvedor de código |
| Definidor de critérios de sucesso | Implementador de busca |
| Solicitante de trabalho (via Backlog) | Executor de sprints |
| Validador de efetividade | Roteador de problemas |

### 3.2 Hierarquia

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA: DOR → PRODUTO → FEATURE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRONTUÁRIO (dor estruturada)                                               │
│       │                                                                     │
│       │ "Vendedores perdem 3-4 min por reporte"                             │
│       │                                                                     │
│       ▼                                                                     │
│  PRODUTO (resolve a dor macro)                                              │
│       │                                                                     │
│       ├── dor_cliente ◄── DOR MORA AQUI                                     │
│       ├── prontuario_ref                                                    │
│       ├── threshold_adocao (sucesso = usuário adota)                        │
│       │                                                                     │
│       └── FEATURE (hipótese de COMO resolver)                               │
│            │                                                                │
│            ├── "SE reporte por voz ENTÃO tempo < 30s"                       │
│            ├── criterios_sucesso[] (subordinados ao produto)                │
│            │                                                                │
│            └── ÉPICO (container de desenvolvimento)                         │
│                 │                                                           │
│                 └── BACKLOG ITEM (unidade de trabalho)                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Relações com Outros Sistemas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MS_PRODUTO: RELAÇÕES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS                                                                    │
│  ───────                                                                    │
│  • Roteia "dor" para MS_Produto                                             │
│  • Avalia efetividade (produto/feature atingiu threshold?)                  │
│  • Aprende padrões de sucesso/falha                                         │
│                                                                             │
│  EPISTEMOLOGIA                                                              │
│  ─────────────                                                              │
│  • MS_Produto solicita ciclos epistemológicos via Backlog                   │
│  • Epistemologia entrega Spec com TDD (classes_equivalencia, criterios)     │
│  • Ciclos recursivos até classes folha                                      │
│                                                                             │
│  PROMETHEUS                                                                 │
│  ──────────                                                                 │
│  • MS_Produto entrega Spec TDD via Backlog                                  │
│  • PROMETHEUS executa, valida tecnicamente, publica Release                 │
│  • MS_Produto recebe Release para implantar                                 │
│                                                                             │
│  BACKLOG/SPRINT                                                             │
│  ─────────────                                                              │
│  • TODO trabalho passa por Backlog                                          │
│  • Sprint consolida e executa                                               │
│  • Tipos: ciclo_epistemologico | desenvolvimento | bug | feature | epico    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3)

### 4.1 Diagrama de Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DIAGRAMA DE CLASSES MS_PRODUTO v2.0                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                            ┌─────────────┐                                  │
│                            │ PRONTUÁRIO  │                                  │
│                            │─────────────│                                  │
│                            │ sintoma     │                                  │
│                            │ afetados[]  │                                  │
│                            │ impacto     │                                  │
│                            │ criterio_   │                                  │
│                            │ esperado    │                                  │
│                            │─────────────│                                  │
│                            │ converter   │                                  │
│                            │ _produto()  │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:1                                     │
│                                   ▼                                         │
│                            ┌─────────────┐                                  │
│                            │  PORTFÓLIO  │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:N                                     │
│                                   ▼                                         │
│                            ┌─────────────┐                                  │
│                            │   PRODUTO   │                                  │
│                            │─────────────│                                  │
│                            │ dor_cliente │ ◄── dor mora aqui                │
│                            │ prontuario_ │                                  │
│                            │   ref       │                                  │
│                            │ threshold_  │                                  │
│                            │   adocao    │                                  │
│                            │ features[]  │                                  │
│                            │─────────────│                                  │
│                            │ criar_      │                                  │
│                            │ feature()   │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:N                                     │
│         ┌─────────────────────────┼─────────────────────────┐               │
│         ▼                         ▼                         ▼               │
│  ┌─────────────┐           ┌─────────────┐           ┌─────────────┐        │
│  │   FEATURE   │           │   RELEASE   │           │ IMPLANTAÇÃO │        │
│  │─────────────│           │─────────────│           │─────────────│        │
│  │ produto_ref │           │ versao      │           │ release_ref │        │
│  │ hipotese    │           │ changelog   │           │ cliente     │        │
│  │ criterios[] │           │ status      │           │ checklist[] │        │
│  │ epicos[]    │           └─────────────┘           │─────────────│        │
│  │─────────────│                                     │ iniciar_    │        │
│  │ avaliar()   │                                     │ treinamento │        │
│  └──────┬──────┘                                     └──────┬──────┘        │
│         │ 1:N                                               │ 1:1           │
│         │                                                   ▼               │
│         │            ┌─────────────┐                 ┌─────────────┐        │
│         │            │ CRITERIO    │                 │ TREINAMENTO │        │
│         ├───────────►│ SUCESSO     │                 └─────────────┘        │
│         │            │─────────────│                                        │
│         │            │ nome        │                                        │
│         │            │ baseline    │                                        │
│         │            │ meta        │                                        │
│         │            │ atual       │                                        │
│         │            │ status      │                                        │
│         │            └─────────────┘                                        │
│         │                                                                   │
│         │ 1:N                                                               │
│         ▼                                                                   │
│  ┌─────────────┐           ┌─────────────┐                                  │
│  │    ÉPICO    │           │ AVALIAÇÃO   │                                  │
│  │─────────────│           │ EFETIVIDADE │                                  │
│  │ feature_ref │◄──────────│─────────────│                                  │
│  │ titulo      │           │ feature_ref │                                  │
│  │ backlog_    │           │ conclusao   │                                  │
│  │   items[]   │           │ aprendizados│                                  │
│  └──────┬──────┘           └─────────────┘                                  │
│         │ 1:N                                                               │
│         ▼                                                                   │
│  ┌─────────────┐                                                            │
│  │ BACKLOG     │                                                            │
│  │ ITEM        │                                                            │
│  │ (existente) │                                                            │
│  │─────────────│                                                            │
│  │ +tipo       │ ◄── ciclo_epistemologico | desenvolvimento | bug           │
│  │ +feature_ref│                                                            │
│  │ +epico_ref  │                                                            │
│  │ +spec_ref   │                                                            │
│  │ +pai_ref    │ ◄── para ciclos recursivos                                 │
│  └─────────────┘                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Classe: Prontuario

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: PRONTUARIO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + sintoma_principal: String         # "Vendedores perdem 3-4 min"          │
│  + afetados: [String]                # ["vendedor outbound", "supervisor"]  │
│  + impacto_quantificado: String      # "~15 min/dia por vendedor"           │
│  + solucao_atual: String             # Workaround usado hoje                │
│  + criterio_sucesso_esperado: String # "Reporte em < 1 min"                 │
│  + historico: String?                # Contexto adicional                   │
│  + usuario_ref: String               # Quem relatou a dor                   │
│  + data_entrevista: Date             # Quando foi entrevistado              │
│  + status: Enum                      # Novo | Analisado | Convertido        │
│  + produto_ref: String?              # Se virou Produto                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(entrevista): Prontuario                                            │
│  + converter_produto(): Produto                                             │
│  + similar_existe(): Boolean                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Classe: Produto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: PRODUTO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único (slug)           │
│  + nome: String                      # Nome do produto                      │
│  + descricao: String                 # O que o produto resolve              │
│  + dor_cliente: String               # DOR MORA AQUI                        │
│  + prontuario_ref: String            # Prontuário que originou              │
│  + threshold_adocao: Number          # % mínimo para sucesso (ex: 80%)      │
│  + estagio: Enum                     # Backlog|Plan|Dev|Release|Impl|Prod   │
│  + features: [Feature]               # Hipóteses de solução                 │
│  + releases: [Release]               # Histórico de releases                │
│  + implantacoes: [Implantacao]       # Clientes implantados                 │
│  + health_scores: [HealthScore]      # Scores por cliente                   │
│  + owner: String                     # Responsável                          │
│  + data_criacao: Date                # Quando foi criado                    │
│  + data_lancamento: Date?            # Quando entrou em produção            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(prontuario): Produto                                               │
│  + criar_feature(hipotese, criterios): Feature                              │
│  + avancar_estagio(): Produto                                               │
│  + calcular_adocao(): Number                                                │
│  + obter_health_geral(): Number                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Classe: Feature

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: FEATURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + produto_ref: String               # Produto pai                          │
│  + hipotese: String                  # "SE [ação] ENTÃO [resultado]"        │
│  + criterios_sucesso: [CriterioSucesso]                                     │
│  + status: Enum                      # Backlog|EmEspec|EmDev|Implantada|    │
│  +                                   # Validada|Invalidada                  │
│  + epicos: [String]                  # Épicos que implementam               │
│  + spec_ref: String?                 # Spec gerada por Epistemologia        │
│  + data_criacao: Date                # Quando foi criada                    │
│  + data_validacao: Date?             # Quando foi validada                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(produto_ref, hipotese, criterios): Feature                         │
│  + adicionar_epico(epico_id): Feature                                       │
│  + solicitar_especificacao(): BacklogItem                                   │
│  + avaliar(): AvaliacaoEfetividade                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Classe: CriterioSucesso

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CLASSE: CRITERIO_SUCESSO                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + nome: String                      # Ex: "tempo_reporte"                  │
│  + descricao: String                 # O que mede                           │
│  + baseline: Number                  # Valor antes (ex: 240s)               │
│  + meta: Number                      # Valor alvo (ex: 30s)                 │
│  + atual: Number?                    # Valor medido                         │
│  + unidade: String                   # segundos | % | count | etc           │
│  + direcao: Enum                     # Aumentar | Diminuir                  │
│  + status: Enum                      # Pendente | Atingido | NaoAtingido    │
│  + fonte_medicao: String?            # De onde vem o dado                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + atualizar_medicao(valor): CriterioSucesso                                │
│  + verificar_atingimento(): Boolean                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Classe: AvaliacaoEfetividade

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CLASSE: AVALIACAO_EFETIVIDADE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + feature_ref: String               # Feature avaliada                     │
│  + produto_ref: String               # Produto da feature                   │
│  + data_avaliacao: Date              # Quando avaliou                       │
│  + conclusao: Enum                   # SUCESSO | ITERAR | BUG |             │
│  +                                   # THRESHOLD_INADEQUADO                 │
│  + criterios_resultado: [Object]     # Status de cada critério              │
│  + metricas_coletadas: Object        # Dados brutos                         │
│  + aprendizados: String              # O que aprendemos                     │
│  + proximos_passos: [String]         # Ações decorrentes                    │
│  + backlog_gerado: String?           # BacklogItem criado (se iteração)     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(feature_ref, metricas): AvaliacaoEfetividade                       │
│  + registrar_aprendizado(texto): AvaliacaoEfetividade                       │
│  + gerar_backlog_iteracao(): BacklogItem                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Classe: Épico

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLASSE: ÉPICO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + titulo: String                    # Nome do épico                        │
│  + descricao: String                 # O que será entregue                  │
│  + feature_ref: String               # Feature que implementa               │
│  + produto_ref: String               # Produto (via feature)                │
│  + status: Enum                      # Backlog | EmProgresso | Concluido    │
│  + prioridade: Number                # Ordem de execução                    │
│  + backlog_items: [String]           # IDs dos backlog items                │
│  + release_alvo: String?             # Release planejada                    │
│  + data_inicio: Date?                # Quando começou                       │
│  + data_fim: Date?                   # Quando concluiu                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(titulo, feature_ref): Epico                                        │
│  + adicionar_item(backlog_item_id): Epico                                   │
│  + calcular_progresso(): Number                                             │
│  + iniciar(): Epico                                                         │
│  + concluir(): Epico                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.8 Classes Existentes (mantidas da v1.1)

As seguintes classes permanecem conforme v1.1:
- **Release**: Gerencia versões publicadas
- **Implantação**: Setup em clientes
- **Treinamento**: Capacitação pós-implantação
- **HealthScore**: Monitoramento de saúde
- **Feedback**: Loop de retorno do cliente
- **Portfólio**: Visão consolidada

---

## 5. Métodos Principais

### 5.1 entrevistar_dor()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MÉTODO: entrevistar_dor()                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: usuario (quem está relatando)                                       │
│  Output: Prontuario                                                         │
│                                                                             │
│  ROTEIRO DE ENTREVISTA:                                                     │
│  ──────────────────────                                                     │
│  1. "Qual problema você está enfrentando?"                                  │
│      → sintoma_principal                                                    │
│                                                                             │
│  2. "Quem sofre com esse problema?" (persona)                               │
│      → afetados[]                                                           │
│                                                                             │
│  3. "Qual o impacto? (tempo, dinheiro, frustração)"                         │
│      → impacto_quantificado                                                 │
│                                                                             │
│  4. "Como você resolve hoje?" (workaround)                                  │
│      → solucao_atual                                                        │
│                                                                             │
│  5. "Como você saberia que o problema foi resolvido?"                       │
│      → criterio_sucesso_esperado                                            │
│                                                                             │
│  6. "Isso já aconteceu antes? Contexto?"                                    │
│      → historico                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 iterar_feature()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MÉTODO: iterar_feature()                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: avaliacao (AvaliacaoEfetividade)                                    │
│  Output: BacklogItem                                                        │
│                                                                             │
│  SE avaliacao.conclusao == "BUG":                                           │
│      → BacklogItem(tipo: "bug", destino: "PROMETHEUS")                      │
│      → Descrição: correção técnica                                          │
│                                                                             │
│  SE avaliacao.conclusao == "ITERAR":                                        │
│      → BacklogItem(tipo: "ciclo_epistemologico", destino: "EPISTEMOLOGIA")  │
│      → Contexto: "iterar solução para feature X"                            │
│      → Aprendizados da avaliação anexados                                   │
│                                                                             │
│  SE avaliacao.conclusao == "THRESHOLD_INADEQUADO":                          │
│      → Ajustar threshold da feature                                         │
│      → Reavaliar com novos parâmetros                                       │
│                                                                             │
│  SE produto não atinge threshold (mesmo features OK):                       │
│      → DECIDE via Raciocínio (H→E→I→D):                                     │
│        H1: Nova feature resolve?                                            │
│        H2: Aumentar threshold features existentes resolve?                  │
│      → BacklogItem conforme decisão                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Invariantes

| Invariante | Descrição |
|------------|-----------|
| **PRODUTO-PRONTUARIO** | Todo Produto deve ter prontuario_ref |
| **PRODUTO-DOR** | Todo Produto deve ter dor_cliente preenchida |
| **PRODUTO-THRESHOLD** | Todo Produto deve ter threshold_adocao definido |
| **FEATURE-PRODUTO** | Toda Feature deve ter produto_ref |
| **FEATURE-HIPOTESE** | Toda Feature deve ter hipótese no formato "SE...ENTÃO" |
| **FEATURE-CRITERIO** | Toda Feature deve ter ≥1 CriterioSucesso |
| **EPICO-FEATURE** | Todo Épico deve ter feature_ref |
| **CRITERIO-BASELINE** | Todo Critério deve ter baseline antes de meta |
| **AVALIACAO-CONCLUSAO** | Toda Avaliação deve ter conclusão definida |

---

## 7. Triggers de Roteamento

```yaml
problema_que_resolve: "Como gerenciar ciclo de vida de Produtos"
triggers:
  - tenho uma dor
  - quero criar produto
  - novo produto
  - feature
  - hipótese
  - critério de sucesso
  - threshold
  - roadmap
  - épico
  - release
  - implantar
  - health score
  - feedback
  - portfólio
  - avaliar efetividade
exemplos_uso:
  - "tenho uma dor: vendedores perdem tempo no reporte"
  - "criar feature para o produto X"
  - "qual o health score dos clientes"
  - "avaliar se a feature atingiu o threshold"
```

---

## 8. Catalogação para GENESIS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_PRODUTO: CATALOGAÇÃO PARA GENESIS                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  O que MS_Produto cataloga:                                                 │
│  ─────────────────────────                                                  │
│  • Prontuários (dores estruturadas)                                         │
│  • Produtos + Health Scores                                                 │
│  • Features + Critérios de Sucesso                                          │
│  • Avaliações de Efetividade + Aprendizados                                 │
│                                                                             │
│  GENESIS usa para:                                                          │
│  ─────────────────                                                          │
│  • Encontrar dores similares a novas dores                                  │
│  • Reutilizar features que funcionaram                                      │
│  • Aprender padrões de sucesso/falha                                        │
│  • Sugerir thresholds baseado em histórico                                  │
│                                                                             │
│  Schema de catalogação:                                                     │
│  ──────────────────────                                                     │
│  {                                                                          │
│    sistema_origem: "MS_Produto",                                            │
│    tipo: "prontuario" | "produto" | "feature" | "avaliacao",                │
│    embedding: [float],                                                      │
│    tags: [string],                                                          │
│    score_reuso: number,                                                     │
│    vezes_reutilizado: number                                                │
│  }                                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Pai - propósito do sistema |
| genesis/GENESIS_Arquitetura.md | Contratos e fluxos técnicos |
| docs/04_P/MS_Produto_Arquitetura.md | Detalhes técnicos deste MS |
| docs/00_E/00_E_Epistemologia.md | Método de especificação |
| docs/00_I/00_I_2_1_Backlog.md | Gestão de itens de trabalho |
| genesis/PROMETHEUS.md | Fábrica de execução |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-09 | Criação inicial com M0-M4 |
| 1.1 | 2025-12-09 | Extensões em Backlog e Sprint |
| 2.0 | 2025-12-16 | **Refatoração completa**: Prontuário (entrevista de dor), Feature (hipótese testável), CriterioSucesso (baseline/meta), AvaliacaoEfetividade. Hierarquia Dor→Produto→Feature. Relação explícita com Epistemologia e Backlog. Tipos de BacklogItem. Método iterar_feature(). Propagação GENESIS v4.0. |

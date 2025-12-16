# MS_Produto v2.1

---

```yaml
nome: MS_Produto
versao: "2.1"
tipo: Meta Sistema
status: Publicado
camada: 4
dominio: Produto
data_publicacao: "2025-12-16"
pai: genesis/GENESIS.md
depende_de:
  - genesis/GENESIS.md
  - docs/04_B/MS_Backlog.md
arquitetura: docs/04_P/MS_Produto_Arquitetura.md

# Integração via MS_Backlog
tipos_consumidos:
  - estruturar_produto
  - criar_feature
  - implantar
tipos_produzidos:
  - ciclo_epistemologico
  - avaliar_efetividade
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
> **Integração v2.1:**
> - **Consome** BacklogItems: estruturar_produto, criar_feature, implantar
> - **Produz** BacklogItems: ciclo_epistemologico, avaliar_efetividade
> - **Não conhece** outros MS diretamente (só MS_Backlog)
>
> **Princípio:** A dor é resolvida no PRODUTO. Features são hipóteses de como contribuir.

### 1.4 Escopo

| MS_Produto FAZ | MS_Produto NÃO FAZ |
|----------------|-------------------|
| Consome itens via MS_Backlog | Conhece outros MS diretamente |
| Estrutura Prontuário → Produto → Feature | Especifica tecnicamente (Epistemologia) |
| Define critérios de sucesso | Desenvolve código (PROMETHEUS) |
| Produz BacklogItems para próximos passos | Roteia para sistemas (MS_Backlog faz) |
| Implanta e treina usuários | Avalia efetividade (GENESIS faz) |

---

## 2. Integração via MS_Backlog

### 2.1 Modelo de Comunicação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_PRODUTO: COMUNICAÇÃO VIA BACKLOG                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_Produto NÃO conhece outros sistemas diretamente                         │
│  Toda comunicação passa por MS_Backlog                                      │
│                                                                             │
│  ┌─────────────┐                         ┌─────────────┐                    │
│  │  MS_Produto │                         │ MS_Backlog  │                    │
│  └──────┬──────┘                         └──────┬──────┘                    │
│         │                                       │                           │
│         │ consumir([estruturar_produto,         │                           │
│         │           criar_feature,              │                           │
│         │           implantar])                 │                           │
│         │──────────────────────────────────────►│                           │
│         │                                       │                           │
│         │◄──────────────────────────────────────│                           │
│         │         item: BacklogItem             │                           │
│         │                                       │                           │
│         │ [processa]                            │                           │
│         │                                       │                           │
│         │ concluir(resultado, items_gerados: [  │                           │
│         │   {tipo: ciclo_epistemologico},       │                           │
│         │   {tipo: avaliar_efetividade}         │                           │
│         │ ])                                    │                           │
│         │──────────────────────────────────────►│                           │
│         │                                       │                           │
│         │                                       │ [roteia para              │
│         │                                       │  Epistemologia,           │
│         │                                       │  GENESIS]                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Tipos Consumidos

```yaml
estruturar_produto:
  trigger: "GENESIS conclui entrevistar_dor"
  input: {prontuario_ref: string}
  processamento: |
    1. Buscar Prontuário por ref
    2. Criar Produto com dor_cliente, threshold_adocao
    3. Criar Feature inicial (hipótese)
    4. Definir Critérios de Sucesso
  output:
    resultado: {produto_id, feature_id}
    items_gerados:
      - tipo: ciclo_epistemologico
        feature_ref: feature_id
        contexto: {problema: dor, criterios: [...]}

criar_feature:
  trigger: "Produto precisa de nova Feature"
  input: {produto_ref: string, hipotese: string, criterios: [...]}
  processamento: |
    1. Validar Produto existe
    2. Criar Feature com hipótese
    3. Criar Critérios de Sucesso
  output:
    resultado: {feature_id}
    items_gerados:
      - tipo: ciclo_epistemologico
        feature_ref: feature_id

implantar:
  trigger: "PO aprova release"
  input: {release_ref: string, produto_ref: string}
  processamento: |
    1. Setup ambiente do cliente
    2. Executar checklist de implantação
    3. Iniciar treinamento
    4. Marcar release como implantada
  output:
    resultado: {implantacao_id}
    items_gerados:
      - tipo: avaliar_efetividade
        release_ref: release_ref
        produto_ref: produto_ref
        periodo: "30 dias após implantação"
```

### 2.3 Tipos Produzidos

```yaml
ciclo_epistemologico:
  quando: "Feature precisa de especificação"
  consumidor: Epistemologia
  payload:
    feature_ref: string
    produto_ref: string
    contexto:
      problema: string  # Dor do produto
      criterios: [...]  # Critérios de sucesso
      restricoes: [...]

avaliar_efetividade:
  quando: "Release implantada, período de avaliação concluído"
  consumidor: GENESIS
  payload:
    release_ref: string
    produto_ref: string
    feature_refs: [string]
    periodo: string
```

---

## 3. Marco Teórico (M1)

### 3.1 Fundamentos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Jobs to be Done** | Christensen | Dor = job que usuário quer resolver |
| **Lean Startup** | Ries | Feature = hipótese testável |
| **OKR** | Grove/Doerr | Critérios de sucesso mensuráveis |
| **Customer Success** | Mehta | Health Score, feedback loop |
| **Event Sourcing** | Fowler | Comunicação via BacklogItems |

### 3.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MS_PRODUTO: SÍNTESE TEÓRICA                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  JOBS TO BE DONE          LEAN STARTUP           EVENT SOURCING             │
│  ┌───────────────┐        ┌───────────────┐      ┌───────────────┐          │
│  │ Entender o    │        │ Feature =     │      │ BacklogItem = │          │
│  │ job real do   │ ────►  │ hipótese      │ ───► │ evento que    │          │
│  │ usuário       │        │ testável      │      │ dispara ação  │          │
│  └───────────────┘        └───────────────┘      └───────────────┘          │
│         │                        │                      │                   │
│         │                        │                      │                   │
│         ▼                        ▼                      ▼                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                           MS_PRODUTO                                │    │
│  │                                                                     │    │
│  │  Consome ──► Processa ──► Produz ──► (MS_Backlog roteia)           │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Objeto (M2)

### 4.1 Fronteiras

| MS_Produto É | MS_Produto NÃO É |
|--------------|------------------|
| Consumidor de BacklogItems | Conhecedor de outros MS |
| Produtor de BacklogItems | Executor de especificação |
| Dono da dor e do produto | Desenvolvedor de código |
| Estruturador de Features | Roteador (MS_Backlog faz) |
| Implantador de releases | Avaliador de efetividade (GENESIS) |

### 4.2 Hierarquia

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA: DOR → PRODUTO → FEATURE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRONTUÁRIO (dor estruturada) ◄── GENESIS entrevista                        │
│       │                                                                     │
│       │ "Vendedores perdem 3-4 min por reporte"                             │
│       │                                                                     │
│       ▼                                                                     │
│  PRODUTO (resolve a dor macro) ◄── MS_Produto consome estruturar_produto    │
│       │                                                                     │
│       ├── dor_cliente ◄── DOR MORA AQUI                                     │
│       ├── prontuario_ref                                                    │
│       ├── threshold_adocao (sucesso = usuário adota)                        │
│       │                                                                     │
│       └── FEATURE (hipótese de COMO resolver)                               │
│            │                                                                │
│            ├── "SE reporte por voz ENTÃO tempo < 30s"                       │
│            ├── criterios_sucesso[]                                          │
│            │                                                                │
│            │   MS_Produto produz: ciclo_epistemologico ────►                │
│            │                                                                │
│            └── ÉPICO (container de desenvolvimento)                         │
│                 │                                                           │
│                 └── BACKLOG ITEM (unidade de trabalho)                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Fluxo de Saga

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_PRODUTO NO FLUXO DE SAGA                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS.entrevistar_dor()                                                  │
│       │                                                                     │
│       └──► BacklogItem(tipo: estruturar_produto)                            │
│                   │                                                         │
│                   ▼                                                         │
│            MS_PRODUTO.consumir() ◄── AQUI                                   │
│                   │                                                         │
│                   └──► Cria Produto + Feature                               │
│                        └──► BacklogItem(tipo: ciclo_epistemologico)         │
│                                   │                                         │
│                                   ▼                                         │
│                            EPISTEMOLOGIA consome                            │
│                                   │                                         │
│                                   └──► Spec pronta                          │
│                                        └──► BacklogItem(tipo: dev)          │
│                                                   │                         │
│                                                   ▼                         │
│                                            PROMETHEUS consome               │
│                                                   │                         │
│                                                   └──► Release pronta       │
│                                                        └──► BacklogItem(    │
│                                                             tipo: aprovar)  │
│                                                                   │         │
│                                                                   ▼         │
│                                                            PO aprova        │
│                                                                   │         │
│                                                                   └──►      │
│                                              BacklogItem(tipo: implantar)   │
│                                                           │                 │
│                                                           ▼                 │
│                                                    MS_PRODUTO.consumir() ◄──│
│                                                           │                 │
│                                                           └──► Implanta     │
│                                                    BacklogItem(tipo: avaliar│
│                                                    _efetividade)            │
│                                                           │                 │
│                                                           ▼                 │
│                                                    GENESIS consome          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Classe (M3)

### 5.1 Diagrama de Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DIAGRAMA DE CLASSES MS_PRODUTO v2.1                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                            ┌─────────────┐                                  │
│                            │ PRONTUÁRIO  │ ◄── GENESIS cria                 │
│                            │─────────────│                                  │
│                            │ sintoma     │                                  │
│                            │ afetados[]  │                                  │
│                            │ impacto     │                                  │
│                            │ criterio_   │                                  │
│                            │ esperado    │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:1                                     │
│                                   ▼                                         │
│                            ┌─────────────┐                                  │
│                            │   PRODUTO   │ ◄── MS_Produto cria              │
│                            │─────────────│                                  │
│                            │ dor_cliente │ ◄── dor mora aqui                │
│                            │ prontuario_ │                                  │
│                            │   ref       │                                  │
│                            │ threshold_  │                                  │
│                            │   adocao    │                                  │
│                            │ features[]  │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:N                                     │
│                                   ▼                                         │
│                            ┌─────────────┐                                  │
│                            │   FEATURE   │                                  │
│                            │─────────────│                                  │
│                            │ hipotese    │                                  │
│                            │ criterios[] │                                  │
│                            │ status      │                                  │
│                            │─────────────│                                  │
│                            │ produzir_   │ ──► BacklogItem(ciclo_epistemo)  │
│                            │ backlog()   │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:N                                     │
│                                   ▼                                         │
│                            ┌─────────────┐                                  │
│                            │ CRITERIO    │                                  │
│                            │ SUCESSO     │                                  │
│                            │─────────────│                                  │
│                            │ baseline    │                                  │
│                            │ meta        │                                  │
│                            │ atual       │                                  │
│                            └─────────────┘                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Classe: Prontuario

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
│  + usuario_ref: String               # Quem relatou a dor                   │
│  + data_entrevista: Date             # Quando foi entrevistado              │
│  + status: Enum                      # Novo | Analisado | Convertido        │
│  + produto_ref: String?              # Se virou Produto                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Nota: Prontuário é criado por GENESIS.entrevistar_dor()                    │
│        MS_Produto recebe via BacklogItem(estruturar_produto)                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Classe: Produto

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
│  + owner: String                     # Responsável                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar_feature(hipotese, criterios): Feature                              │
│  + calcular_adocao(): Number                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Classe: Feature

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
│  + spec_ref: String?                 # Spec gerada por Epistemologia        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + produzir_backlog(): BacklogItem   # Produz ciclo_epistemologico          │
│  + avaliar(): AvaliacaoEfetividade                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.5 Classe: CriterioSucesso

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CLASSE: CRITERIO_SUCESSO                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + nome: String                      # Ex: "tempo_reporte"                  │
│  + baseline: Number                  # Valor antes (ex: 240s)               │
│  + meta: Number                      # Valor alvo (ex: 30s)                 │
│  + atual: Number?                    # Valor medido                         │
│  + unidade: String                   # segundos | % | count | etc           │
│  + direcao: Enum                     # Aumentar | Diminuir                  │
│  + status: Enum                      # Pendente | Atingido | NaoAtingido    │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + atualizar_medicao(valor): CriterioSucesso                                │
│  + verificar_atingimento(): Boolean                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Loop de Consumo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_PRODUTO: LOOP DE CONSUMO                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_Produto.run():                                                          │
│      WHILE true:                                                            │
│          item = MS_Backlog.consumir([                                       │
│              "estruturar_produto",                                          │
│              "criar_feature",                                               │
│              "implantar"                                                    │
│          ])                                                                 │
│                                                                             │
│          IF item == null:                                                   │
│              aguardar()                                                     │
│              CONTINUE                                                       │
│                                                                             │
│          IF NOT humano.aprova(item):                                        │
│              MS_Backlog.cancelar(item.id, "Rejeitado")                      │
│              CONTINUE                                                       │
│                                                                             │
│          SWITCH item.tipo:                                                  │
│              CASE "estruturar_produto":                                     │
│                  processar_estruturar_produto(item)                         │
│                                                                             │
│              CASE "criar_feature":                                          │
│                  processar_criar_feature(item)                              │
│                                                                             │
│              CASE "implantar":                                              │
│                  processar_implantar(item)                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Invariantes

| Invariante | Descrição |
|------------|-----------|
| **PRODUTO-PRONTUARIO** | Todo Produto deve ter prontuario_ref |
| **PRODUTO-DOR** | Todo Produto deve ter dor_cliente preenchida |
| **PRODUTO-THRESHOLD** | Todo Produto deve ter threshold_adocao definido |
| **FEATURE-PRODUTO** | Toda Feature deve ter produto_ref |
| **FEATURE-HIPOTESE** | Toda Feature deve ter hipótese no formato "SE...ENTÃO" |
| **FEATURE-CRITERIO** | Toda Feature deve ter ≥1 CriterioSucesso |
| **CRITERIO-BASELINE** | Todo Critério deve ter baseline antes de meta |
| **COMUNICACAO-BACKLOG** | Toda comunicação com outros MS via BacklogItem |

---

## 8. Triggers de Roteamento

```yaml
problema_que_resolve: "Como gerenciar ciclo de vida de Produtos"

# MS_Produto não é chamado diretamente
# É ativado via MS_Backlog quando consome seus tipos

tipos_que_ativam_ms_produto:
  - estruturar_produto  # GENESIS produz após entrevistar
  - criar_feature       # Usuário ou sistema solicita nova feature
  - implantar           # PO aprova release

triggers_usuario:
  # Usuário fala com GENESIS, que produz BacklogItem apropriado
  - "tenho uma dor"        → GENESIS.entrevistar_dor → estruturar_produto
  - "criar feature"        → criar_feature
  - "implantar release"    → implantar
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Pai - propósito do sistema |
| docs/04_B/MS_Backlog.md | Message Broker - comunicação |
| docs/04_P/MS_Produto_Arquitetura.md | Detalhes técnicos |
| docs/00_E/00_E_Epistemologia.md | Consome ciclo_epistemologico |
| genesis/PROMETHEUS.md | Consome desenvolvimento |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0-2.0 | 2025-12-09 a 2025-12-16 | Versões anteriores |
| 2.1 | 2025-12-16 | **Refatoração arquitetural**: Comunicação exclusiva via MS_Backlog. tipos_consumidos e tipos_produzidos definidos. Loop de consumo. MS_Produto não conhece outros MS diretamente. Fluxo de saga documentado. |

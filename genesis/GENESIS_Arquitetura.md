# GENESIS Arquitetura v3.0

---

```yaml
nome: GENESIS_Arquitetura
versao: "3.0"
tipo: Documento
status: Publicado
camada: C1
data_publicacao: "2025-12-16"
pai: GENESIS
depende_de:
  - GENESIS
  - docs/04_B/MS_Backlog.md
```

---

Este documento detalha a arquitetura técnica do GENESIS v5.0. Para visão de propósito, ver GENESIS.md.

---

## 1. Mudança Arquitetural v3.0

### 1.1 Antes vs Depois

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ANTES (v2.x) vs DEPOIS (v3.0)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ANTES: GENESIS como Orquestrador Central                                   │
│  ─────────────────────────────────────────                                  │
│                                                                             │
│              ┌─────────────┐                                                │
│              │   GENESIS   │ ◄── Conhece todos os sistemas                  │
│              │ Orquestrador│ ◄── Roteia diretamente                         │
│              └──────┬──────┘                                                │
│                     │                                                       │
│         ┌──────────┼──────────┐                                             │
│         ▼          ▼          ▼                                             │
│    MS_Produto  Epistemo   PROMETHEUS                                        │
│                                                                             │
│  Problemas:                                                                 │
│  • GENESIS acoplado a todos os sistemas                                     │
│  • Difícil adicionar novos MS                                               │
│  • Rastreabilidade parcial                                                  │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  DEPOIS: GENESIS como Entrada + Validação                                   │
│  ────────────────────────────────────────                                   │
│                                                                             │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐               │
│  │ GENESIS │     │MS_Prod  │     │Epistemo │     │PROMETHEUS               │
│  │ Entrada │     │         │     │         │     │         │               │
│  │+Avalia  │     │         │     │         │     │         │               │
│  └────┬────┘     └────┬────┘     └────┬────┘     └────┬────┘               │
│       │               │               │               │                     │
│       │ produz        │ produz        │ produz        │ produz              │
│       │ consome       │ consome       │ consome       │ consome             │
│       ▼               ▼               ▼               ▼                     │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                          MS_BACKLOG                                   ║  │
│  ║                    (Message Broker entre MS)                          ║  │
│  ╚═══════════════════════════════════════════════════════════════════════╝  │
│                                                                             │
│  Benefícios:                                                                │
│  • GENESIS desacoplado (só conhece MS_Backlog)                              │
│  • Fácil adicionar novos MS (só registrar tipos)                            │
│  • Rastreabilidade total (tudo é BacklogItem)                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 O que GENESIS Faz Agora

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS: RESPONSABILIDADES v3.0                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✅ GENESIS FAZ:                                                            │
│  ───────────────                                                            │
│  • ENTRADA: Receber dor do usuário, entrevistar                             │
│  • PRODUZIR: Criar primeiro BacklogItem que inicia saga                     │
│  • AVALIAR: Consumir item avaliar_efetividade, medir sucesso                │
│  • APRENDER: Indexar padrões de sucesso/falha                               │
│  • SUGERIR: Consultar catálogos para reuso                                  │
│                                                                             │
│  ❌ GENESIS NÃO FAZ MAIS:                                                   │
│  ─────────────────────────                                                  │
│  • Rotear entre sistemas (MS_Backlog faz via tipagem)                       │
│  • Conhecer internals de outros MS                                          │
│  • Orquestrar fluxos (saga é auto-orquestrada via Backlog)                  │
│                                                                             │
│  GENESIS CONSOME (tipos de BacklogItem):                                    │
│  ─────────────────────────────────────────                                  │
│  • entrevistar_dor       → Ponto de entrada                                 │
│  • avaliar_efetividade   → Ponto de validação                               │
│                                                                             │
│  GENESIS PRODUZ:                                                            │
│  ───────────────                                                            │
│  • estruturar_produto    → Após entrevistar dor                             │
│  • iterar_feature        → Após avaliação indica iteração                   │
│  • corrigir_bug          → Após avaliação indica bug                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Classe GENESIS

### 2.1 Definição

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: GENESIS v3.0                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ─────────                                                                  │
│  + nome: String = "GENESIS"                                                 │
│  + versao: SemVer                                                           │
│  + visao: String = "Agente Autopoiético"                                    │
│  + camadas: [L0, L1, L2, L3, L4]                                            │
│  + tipos_consumidos: [entrevistar_dor, avaliar_efetividade]                 │
│  + tipos_produzidos: [estruturar_produto, iterar_feature, corrigir_bug]     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos de Entrada                                                         │
│  ──────────────────                                                         │
│  + entrevistar_dor(usuario) → Prontuario                                    │
│  + iniciar_saga(prontuario) → BacklogItem                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos de Validação                                                       │
│  ────────────────────                                                       │
│  + avaliar_efetividade(item) → {conclusao, aprendizados}                    │
│  + aprender(avaliacao) → void                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos de Reuso                                                           │
│  ────────────────                                                           │
│  + consultar_catalogos(contexto) → {existe, items[], scores[]}              │
│  + sugerir_reuso(dor) → [Feature, Spec, Artefato]                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  Integração com MS_Backlog                                                  │
│  ─────────────────────────                                                  │
│  + consumir() → MS_Backlog.consumir([entrevistar_dor, avaliar_efetividade]) │
│  + produzir(item) → MS_Backlog.produzir(item)                               │
│  + concluir(item_id, resultado, items_gerados) → MS_Backlog.concluir(...)   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Método: entrevistar_dor()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MÉTODO: entrevistar_dor()                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Trigger: MS_Backlog entrega item tipo: entrevistar_dor                     │
│  Input: contexto do BacklogItem                                             │
│  Output: Prontuário estruturado                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SCRIPT DE ENTREVISTA:                                                      │
│  ─────────────────────                                                      │
│                                                                             │
│  1. SINTOMA (O que está acontecendo?)                                       │
│     \"Me conte o que está acontecendo. Qual é o problema?\"                  │
│                                                                             │
│  2. FREQUÊNCIA (Com que frequência acontece?)                               │
│     \"Isso acontece sempre ou em situações específicas?\"                    │
│                                                                             │
│  3. AFETADOS (Quem é afetado?)                                              │
│     \"Quem sofre com esse problema? Você, sua equipe, clientes?\"            │
│                                                                             │
│  4. IMPACTO (Qual o impacto?)                                               │
│     \"Quanto tempo/dinheiro/energia isso custa?\"                            │
│                                                                             │
│  5. TENTATIVAS (O que já tentou?)                                           │
│     \"Já tentou resolver de alguma forma?\"                                  │
│                                                                             │
│  6. SUCESSO (Como saberia que resolveu?)                                    │
│     \"Se isso fosse resolvido, como você saberia?\"                          │
│                                                                             │
│  OUTPUT: Prontuario                                                         │
│  ───────────────────                                                        │
│  {                                                                          │
│    id: \"pron_001\",                                                         │
│    sintoma: \"...\",                                                         │
│    frequencia: \"...\",                                                      │
│    afetados: [\"vendedores\", \"supervisores\"],                              │
│    impacto: \"3-4 min por reporte\",                                         │
│    tentativas_anteriores: \"...\",                                           │
│    criterio_esperado: \"reporte em <30s\",                                   │
│    status: \"Capturado\"                                                     │
│  }                                                                          │
│                                                                             │
│  PRÓXIMO PASSO:                                                             │
│  ──────────────                                                             │
│  MS_Backlog.concluir(                                                       │
│    item_id,                                                                 │
│    resultado: {prontuario_id},                                              │
│    items_gerados: [{                                                        │
│      tipo: \"estruturar_produto\",                                           │
│      prontuario_ref: \"pron_001\",                                           │
│      titulo: \"Estruturar produto para dor: ...\"                            │
│    }]                                                                       │
│  )                                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Método: avaliar_efetividade()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     MÉTODO: avaliar_efetividade()                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  Trigger: MS_Backlog entrega item tipo: avaliar_efetividade                 │
│  Input: BacklogItem com release_ref, produto_ref, feature_refs              │
│  Output: {conclusao, aprendizados, proximos_passos}                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASSO 1: Obter métricas de adoção                                          │
│  ─────────────────────────────────                                          │
│  produto = MongoDB.produtos.find({id: item.produto_ref})                    │
│  adocao = calcular_adocao(produto, periodo)                                 │
│                                                                             │
│  PASSO 2: Comparar com threshold                                            │
│  ────────────────────────────────                                           │
│  SE adocao >= produto.threshold_adocao:                                     │
│      conclusao = \"SUCESSO\"                                                 │
│      aprender({conclusao, produto, features})                               │
│      MS_Backlog.concluir(item_id, {conclusao})                              │
│      RETURN                                                                 │
│                                                                             │
│  PASSO 3: Analisar features                                                 │
│  ──────────────────────────                                                 │
│  PARA CADA feature em produto.features:                                     │
│      criterios = avaliar_criterios(feature)                                 │
│                                                                             │
│      SE todos_atingidos AND adocao < threshold:                             │
│          conclusao = \"THRESHOLD_INADEQUADO\"                                │
│          aprendizados = \"Threshold muito baixo\"                            │
│          MS_Backlog.concluir(item_id, {conclusao, aprendizados})            │
│          RETURN                                                             │
│                                                                             │
│      SE NOT todos_atingidos:                                                │
│          SE detectar_erro_tecnico(feature):                                 │
│              conclusao = \"BUG\"                                             │
│              MS_Backlog.concluir(                                           │
│                item_id,                                                     │
│                {conclusao},                                                 │
│                items_gerados: [{                                            │
│                  tipo: \"corrigir_bug\",                                     │
│                  feature_ref: feature.id,                                   │
│                  contexto: {erro_detectado}                                 │
│                }]                                                           │
│              )                                                              │
│          SENÃO:                                                             │
│              conclusao = \"ITERAR\"                                          │
│              aprender({conclusao, feature, por_que_falhou})                 │
│              MS_Backlog.concluir(                                           │
│                item_id,                                                     │
│                {conclusao, aprendizados},                                   │
│                items_gerados: [{                                            │
│                  tipo: \"iterar_feature\",                                   │
│                  feature_ref: feature.id,                                   │
│                  contexto: {aprendizados}                                   │
│                }]                                                           │
│              )                                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Método: aprender()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MÉTODO: aprender()                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: avaliacao {conclusao, produto?, feature?, aprendizados?}            │
│  Output: void (atualiza catálogos)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SE conclusao == \"SUCESSO\":                                                │
│      MongoDB.aprendizados.insert({                                          │
│        tipo: \"sucesso\",                                                    │
│        dor_tipo: produto.dor_cliente,                                       │
│        feature_tipo: feature.hipotese,                                      │
│        metricas_atingidas: feature.criterios,                               │
│        tags: extrair_tags(produto, feature),                                │
│        score_reuso: 1.0,                                                    │
│        created_at: now()                                                    │
│      })                                                                     │
│      # Aumentar score de features similares                                 │
│                                                                             │
│  SE conclusao == \"ITERAR\":                                                 │
│      MongoDB.aprendizados.insert({                                          │
│        tipo: \"falha\",                                                      │
│        dor_tipo: produto.dor_cliente,                                       │
│        feature_tipo: feature.hipotese,                                      │
│        por_que_falhou: aprendizados,                                        │
│        tags: extrair_tags(produto, feature),                                │
│        score_reuso: 0.0,  # Não reutilizar                                  │
│        created_at: now()                                                    │
│      })                                                                     │
│      # Diminuir score de abordagens similares                               │
│                                                                             │
│  SE conclusao == \"THRESHOLD_INADEQUADO\":                                   │
│      MongoDB.aprendizados.insert({                                          │
│        tipo: \"calibracao\",                                                 │
│        dor_tipo: produto.dor_cliente,                                       │
│        threshold_anterior: produto.threshold_adocao,                        │
│        sugestao: \"aumentar threshold\",                                     │
│        created_at: now()                                                    │
│      })                                                                     │
│                                                                             │
│  SE conclusao == \"BUG\":                                                    │
│      # Não indexar como padrão (problema técnico)                           │
│      # Apenas rastrear em métricas de qualidade                             │
│      MongoDB.metricas_qualidade.insert({                                    │
│        tipo: \"bug\",                                                        │
│        feature_ref: feature.id,                                             │
│        release_ref: release.id,                                             │
│        created_at: now()                                                    │
│      })                                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.5 Método: sugerir_reuso()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MÉTODO: sugerir_reuso()                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: dor (nova dor de usuário)                                           │
│  Output: [Feature, Spec, Artefato] (sugestões de reuso)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. Buscar aprendizados de sucesso                                          │
│     query = {tipo: \"sucesso\", dor_tipo: similar(dor)}                      │
│     → Retorna features que funcionaram para dores similares                 │
│                                                                             │
│  2. Buscar prontuários similares                                            │
│     query = {sintoma: similar(dor)}                                         │
│     → Retorna dores já estruturadas                                         │
│                                                                             │
│  3. Buscar specs similares (via catálogo Epistemologia)                     │
│     query = {problema: similar(dor)}                                        │
│     → Retorna soluções técnicas reutilizáveis                               │
│                                                                             │
│  4. Ranquear por:                                                           │
│     - Score de similaridade (embedding)                                     │
│     - Histórico de sucesso (score_reuso)                                    │
│     - Vezes reutilizado                                                     │
│                                                                             │
│  5. Retornar top N com justificativa:                                       │
│     [{                                                                      │
│       tipo: \"Feature\",                                                     │
│       id: \"feat_001\",                                                      │
│       titulo: \"Reporte por Voz\",                                           │
│       score: 0.87,                                                          │
│       justificativa: \"Dor similar: tempo de reporte\"                       │
│     }]                                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Integração com MS_Backlog

### 3.1 Loop de Consumo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS: LOOP DE CONSUMO                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS.run():                                                             │
│      WHILE true:                                                            │
│          # Buscar próximo item dos tipos que GENESIS processa               │
│          item = MS_Backlog.consumir([                                       │
│              \"entrevistar_dor\",                                            │
│              \"avaliar_efetividade\"                                         │
│          ])                                                                 │
│                                                                             │
│          IF item == null:                                                   │
│              # Nada para processar                                          │
│              aguardar()                                                     │
│              CONTINUE                                                       │
│                                                                             │
│          # Humano aprova antes de processar?                                │
│          IF NOT humano.aprova(item):                                        │
│              MS_Backlog.cancelar(item.id, \"Rejeitado pelo usuário\")        │
│              CONTINUE                                                       │
│                                                                             │
│          # Processar conforme tipo                                          │
│          SWITCH item.tipo:                                                  │
│              CASE \"entrevistar_dor\":                                       │
│                  resultado = entrevistar_dor(item.contexto)                 │
│                  MS_Backlog.concluir(item.id, resultado, [                  │
│                      {tipo: \"estruturar_produto\", prontuario_ref: ...}     │
│                  ])                                                         │
│                                                                             │
│              CASE \"avaliar_efetividade\":                                   │
│                  resultado = avaliar_efetividade(item)                      │
│                  # concluir já chamado dentro do método                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Diagrama de Interação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS ↔ MS_BACKLOG                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────┐                         ┌───────────┐                        │
│  │  GENESIS  │                         │MS_BACKLOG │                        │
│  └─────┬─────┘                         └─────┬─────┘                        │
│        │                                     │                              │
│        │ consumir([entrevistar_dor, ...])    │                              │
│        │────────────────────────────────────►│                              │
│        │                                     │                              │
│        │◄────────────────────────────────────│                              │
│        │         item: BacklogItem           │                              │
│        │                                     │                              │
│        │ [processa item]                     │                              │
│        │                                     │                              │
│        │ concluir(id, resultado, [novos])    │                              │
│        │────────────────────────────────────►│                              │
│        │                                     │                              │
│        │                                     │ [cria novos items]           │
│        │                                     │                              │
│        │                                     │ [notifica outros MS]         │
│        │                                     │                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Fluxo Técnico Completo

### 4.1 Saga via Backlog

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO: DOR → AVALIAÇÃO (via MS_Backlog)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USUÁRIO: \"Tenho uma dor\"                                                  │
│       │                                                                     │
│       ▼                                                                     │
│  MS_Backlog.produzir({tipo: entrevistar_dor, contexto: dor})                │
│       │ saga_id gerado automaticamente                                      │
│       │                                                                     │
│       ▼                                                                     │
│  GENESIS.consumir([entrevistar_dor])                                        │
│       │                                                                     │
│       └──► GENESIS.entrevistar_dor()                                        │
│            → Cria Prontuário                                                │
│            → MS_Backlog.concluir(item_id, resultado, [                      │
│                {tipo: estruturar_produto, prontuario_ref}                   │
│              ])                                                             │
│                   │                                                         │
│                   ▼                                                         │
│            MS_PRODUTO.consumir([estruturar_produto])                        │
│                   │                                                         │
│                   └──► Cria Produto + Feature                               │
│                        → MS_Backlog.concluir(item_id, resultado, [          │
│                            {tipo: ciclo_epistemologico, feature_ref}        │
│                          ])                                                 │
│                               │                                             │
│                               ▼                                             │
│                        EPISTEMOLOGIA.consumir([ciclo_epistemologico])       │
│                               │                                             │
│                               └──► Executa M0-M4                            │
│                                    → MS_Backlog.concluir(item_id, [], [     │
│                                        {tipo: desenvolvimento, spec_ref}    │
│                                      ])                                     │
│                                           │                                 │
│                                           ▼                                 │
│                                    PROMETHEUS.consumir([desenvolvimento])   │
│                                           │                                 │
│                                           └──► Executa TDD                  │
│                                                → MS_Backlog.concluir([], [  │
│                                                    {tipo: aprovar_release}  │
│                                                  ])                         │
│                                                       │                     │
│                                                       ▼                     │
│                                                PO.consumir([aprovar])       │
│                                                       │                     │
│                                                       └──► Aprova           │
│                                                            → [...implantar] │
│                                                                 │           │
│                                                                 ▼           │
│                                                 MS_PRODUTO.consumir()       │
│                                                       │                     │
│                                                       └──► Implanta         │
│                                                            → [...avaliar]   │
│                                                                 │           │
│                                                                 ▼           │
│                                                 GENESIS.consumir([avaliar]) │
│                                                       │                     │
│                                                       └──► avaliar_efetiv() │
│                                                            → SUCESSO/ITERAR │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Rastreabilidade da Saga

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EXEMPLO: SAGA "Reporte por Voz"                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  saga_id: \"saga_001\"                                                       │
│                                                                             │
│  bkl_001 (entrevistar_dor) ────────────────────── GENESIS                   │
│      │ status: Concluido                                                    │
│      │ resultado: {prontuario_id: \"pron_001\"}                              │
│      │                                                                      │
│      └─► bkl_002 (estruturar_produto) ─────────── MS_Produto                │
│          │ pai_ref: bkl_001                                                 │
│          │ resultado: {produto_id, feature_id}                              │
│          │                                                                  │
│          └─► bkl_003 (ciclo_epistemologico) ───── Epistemologia             │
│              │ pai_ref: bkl_002                                             │
│              │                                                              │
│              └─► bkl_004 (desenvolvimento) ─────── PROMETHEUS               │
│                  │ pai_ref: bkl_003                                         │
│                  │                                                          │
│                  └─► bkl_005 (aprovar_release) ─── PO                       │
│                      │                                                      │
│                      └─► bkl_006 (implantar) ───── MS_Produto               │
│                          │                                                  │
│                          └─► bkl_007 (avaliar) ─── GENESIS                  │
│                              conclusao: SUCESSO                             │
│                                                                             │
│  CONSULTA:                                                                  │
│  MS_Backlog.listar_saga(\"saga_001\")                                        │
│  → Retorna todos os 7 items ordenados                                       │
│  → Mostra fluxo completo da dor à produção                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Contratos

### 5.1 GENESIS ↔ MS_Backlog

```yaml
# GENESIS como Consumidor
consumir:
  tipos: [entrevistar_dor, avaliar_efetividade]
  retorno: BacklogItem | null

# GENESIS como Produtor (após processar)
concluir:
  input:
    item_id: string
    resultado: object
    items_gerados?: [BacklogItem]
  
  items_que_genesis_produz:
    - tipo: estruturar_produto  # Após entrevistar
    - tipo: iterar_feature      # Após avaliação indica iteração
    - tipo: corrigir_bug        # Após avaliação indica bug
```

### 5.2 Catálogos (Somente Leitura)

```yaml
# GENESIS consulta catálogos mas não os gerencia

MS_Produto.catalogo:
  consultas:
    - prontuarios_similares(dor)
    - features_sucesso(dor_tipo)
    - avaliacoes(produto_id)

Epistemologia.catalogo:
  consultas:
    - specs_similares(problema)
    - problemas(dominio)

PROMETHEUS.catalogo:
  consultas:
    - artefatos_similares(feature_ref)
    - releases(produto_id)
```

---

## 6. Persistência

### 6.1 Regra de Ouro

```
SE é DEFINIÇÃO (como fazer, template, spec) → GitHub
SE é INSTÂNCIA (dado real, transação, estado) → MongoDB
```

### 6.2 O que GENESIS Persiste

| Collection | Conteúdo | Tipo |
|------------|----------|------|
| prontuarios | Dores capturadas | MongoDB |
| aprendizados | Padrões sucesso/falha | MongoDB |
| metricas_qualidade | Rastreamento de bugs | MongoDB |

### 6.3 O que GENESIS Lê

| Collection | Sistema Dono | Uso |
|------------|--------------|-----|
| produtos | MS_Produto | Avaliação |
| features | MS_Produto | Avaliação |
| specs | Epistemologia | Reuso |
| artefatos | PROMETHEUS | Reuso |
| backlog_items | MS_Backlog | Consumo/Produção |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Documento pai - propósito |
| docs/04_B/MS_Backlog.md | Message Broker |
| docs/04_B/MS_Backlog_Arquitetura.md | Contratos Backlog |
| docs/04_P/MS_Produto.md | Framework de produto |
| docs/00_E/00_E_Epistemologia.md | Método de especificação |
| genesis/PROMETHEUS.md | Fábrica de execução |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0-2.1 | 2025-12-07 a 2025-12-16 | Versões anteriores |
| 3.0 | 2025-12-16 | **Refatoração arquitetural**: GENESIS deixa de ser orquestrador. Papel simplificado: entrada (entrevistar_dor) + validação (avaliar_efetividade). Integração exclusiva via MS_Backlog (produzir/consumir). Saga rastreável via BacklogItems encadeados. |

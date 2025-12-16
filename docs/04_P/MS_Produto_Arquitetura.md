# MS_Produto Arquitetura v1.0

---

```yaml
nome: MS_Produto_Arquitetura
versao: "1.0"
tipo: Documento
status: Publicado
camada: 4
data_publicacao: "2025-12-16"
pai: docs/04_P/MS_Produto.md
depende_de:
  - docs/04_P/MS_Produto.md
  - genesis/GENESIS_Arquitetura.md
```

---

Este documento detalha a arquitetura técnica do MS_Produto. Para visão de propósito, ver MS_Produto.md.

---

## 1. Fluxo Completo

### 1.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FLUXO COMPLETO MS_PRODUTO v2.0                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 1: ENTENDIMENTO DA DOR                                                │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  USUÁRIO ──► GENESIS ──► MS_PRODUTO                                         │
│    │           │            │                                               │
│    │ "dor"     │ roteia     │ entrevistar_dor()                             │
│    │           │            │                                               │
│    │◄──────────┼────────────┤ "Qual problema?"                              │
│    │           │            │ "Quem sofre?"                                 │
│    │           │            │ "Qual impacto?"                               │
│    │           │            │ "Como mede sucesso?"                          │
│    │           │            │                                               │
│    │ [respostas]            │                                               │
│    ├───────────┼───────────►│                                               │
│    │           │            │                                               │
│    │           │            ▼                                               │
│    │           │      ┌───────────┐                                         │
│    │           │      │PRONTUÁRIO │                                         │
│    │           │      └─────┬─────┘                                         │
│    │           │            │                                               │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 2: ESTRUTURAÇÃO                                                       │
│  ══════════════════════════════════════════════════════════════════════     │
│                             │                                               │
│                             │ converter_produto()                           │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │  PRODUTO  │                                         │
│                       │───────────│                                         │
│                       │ dor_cliente                                         │
│                       │ threshold │                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│                             │ criar_feature()                               │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │  FEATURE  │                                         │
│                       │───────────│                                         │
│                       │ hipotese  │                                         │
│                       │ criterios │                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 3: ESPECIFICAÇÃO (via Backlog → Epistemologia)                        │
│  ══════════════════════════════════════════════════════════════════════     │
│                             │                                               │
│                             │ solicitar_especificacao()                     │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │ BACKLOG   │                                         │
│                       │───────────│                                         │
│                       │ tipo:     │                                         │
│                       │ ciclo_    │                                         │
│                       │ epistemo  │                                         │
│                       │ feature_  │                                         │
│                       │   ref     │                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│                             │ SPRINT promove                                │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │EPISTEMOLO-│                                         │
│                       │   GIA     │                                         │
│                       │───────────│                                         │
│                       │ M0-M4     │                                         │
│                       │ recursivo │──┐                                      │
│                       └─────┬─────┘  │                                      │
│                             │        │ SE não-folha:                        │
│                             │        │ novo BacklogItem                     │
│                             │        │ (ciclo_epistemo, pai_ref)            │
│                             │◄───────┘                                      │
│                             │                                               │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │ SPEC TDD  │                                         │
│                       │───────────│                                         │
│                       │ classes_  │                                         │
│                       │ equivalen │                                         │
│                       │ criterios │                                         │
│                       │ _aceite   │                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 4: DESENVOLVIMENTO (via Backlog → PROMETHEUS)                         │
│  ══════════════════════════════════════════════════════════════════════     │
│                             │                                               │
│                             │ gerar_backlog_dev()                           │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │ BACKLOG   │                                         │
│                       │───────────│                                         │
│                       │ tipo: dev │                                         │
│                       │ spec_ref  │                                         │
│                       │ feature_  │                                         │
│                       │   ref     │                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│                             │ SPRINT promove                                │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │PROMETHEUS │                                         │
│                       │───────────│                                         │
│                       │ TDD       │                                         │
│                       │ Workers   │                                         │
│                       │ Validação │                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │  RELEASE  │                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 5: IMPLANTAÇÃO E VALIDAÇÃO                                            │
│  ══════════════════════════════════════════════════════════════════════     │
│                             │                                               │
│                             │ implantar()                                   │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │IMPLANTAÇÃO│                                         │
│                       │───────────│                                         │
│                       │ setup     │                                         │
│                       │ treina    │                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│                             │ [aguarda período]                             │
│                             │                                               │
│                             │ GENESIS.avaliar_efetividade()                 │
│                             ▼                                               │
│                       ┌───────────┐                                         │
│                       │ AVALIAÇÃO │                                         │
│                       │EFETIVIDADE│                                         │
│                       └─────┬─────┘                                         │
│                             │                                               │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 6: ITERAÇÃO                                                           │
│  ══════════════════════════════════════════════════════════════════════     │
│                             │                                               │
│              ┌──────────────┼──────────────┬──────────────┐                 │
│              ▼              ▼              ▼              ▼                 │
│        ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐             │
│        │ SUCESSO │    │   BUG   │    │ FEATURE │    │ PRODUTO │             │
│        │         │    │         │    │ NÃO     │    │ NÃO     │             │
│        │         │    │         │    │ ATINGE  │    │ ATINGE  │             │
│        └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘             │
│             │              │              │              │                  │
│             ▼              ▼              ▼              ▼                  │
│        ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐             │
│        │ GENESIS │    │ Backlog │    │ Backlog │    │ Nova    │             │
│        │.aprender│    │ tipo:   │    │ tipo:   │    │ Feature │             │
│        │(sucesso)│    │ bug     │    │ ciclo_  │    │   OU    │             │
│        │         │    │    │    │    │ epistemo│    │ ajustar │             │
│        │ DOR     │    │    │    │    │    │    │    │threshold│             │
│        │RESOLVIDA│    │    ▼    │    │    ▼    │    │    │    │             │
│        └─────────┘    │PROMETHEUS    │EPISTEM. │    │    ▼    │             │
│                       └─────────┘    └─────────┘    │ VOLTA   │             │
│                                                     │ FASE 3  │             │
│                                                     └─────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Tipos de BacklogItem Gerados

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TIPOS DE BACKLOG ITEM (MS_PRODUTO)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ORIGEM                        TIPO                    DESTINO              │
│  ──────                        ────                    ───────              │
│                                                                             │
│  Feature precisa spec    ───►  ciclo_epistemologico   ───►  EPISTEMOLOGIA   │
│                                + feature_ref                                │
│                                                                             │
│  M3.* detecta não-folha  ───►  ciclo_epistemologico   ───►  EPISTEMOLOGIA   │
│                                + pai_ref (recursivo)                        │
│                                                                             │
│  Spec pronta             ───►  desenvolvimento        ───►  PROMETHEUS      │
│                                + spec_ref                                   │
│                                + feature_ref                                │
│                                                                             │
│  Bug em produção         ───►  bug                    ───►  PROMETHEUS      │
│                                + feature_ref                                │
│                                                                             │
│  Feature não atinge      ───►  ciclo_epistemologico   ───►  EPISTEMOLOGIA   │
│                                + feature_ref                                │
│                                + avaliacao_ref                              │
│                                                                             │
│  Produto não atinge      ───►  feature                ───►  MS_PRODUTO      │
│  (nova feature)                + produto_ref                                │
│                                                                             │
│  Épico                   ───►  epico                  ───►  Agrupador       │
│                                + feature_ref                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Contratos

### 2.1 GENESIS ↔ MS_Produto

```yaml
# GENESIS roteia para MS_Produto
rotear_dor:
  trigger: "usuario menciona dor, problema, fricção"
  input: {contexto: string}
  output: {sistema: "MS_Produto", metodo: "entrevistar_dor"}

# GENESIS avalia efetividade
avaliar_efetividade:
  input: {produto_id: string, periodo: string}
  output: 
    conclusao: SUCESSO | ITERAR | BUG | THRESHOLD_INADEQUADO
    features_avaliadas: [{feature_id, status, metricas}]
    aprendizados: string
    proximos_passos: [string]

# GENESIS aprende padrões
aprender:
  input: {avaliacao_id: string}
  output: void
  side_effect: indexa padrão no catálogo
```

### 2.2 MS_Produto ↔ Backlog

```yaml
# MS_Produto solicita especificação
solicitar_especificacao:
  input:
    feature_ref: string
    contexto: string
    criterios_sucesso: [{nome, baseline, meta}]
  output:
    backlog_item_id: string
    tipo: "ciclo_epistemologico"

# MS_Produto solicita desenvolvimento
solicitar_desenvolvimento:
  input:
    spec_ref: string
    feature_ref: string
    epico_ref: string
  output:
    backlog_item_id: string
    tipo: "desenvolvimento"

# MS_Produto reporta bug
reportar_bug:
  input:
    feature_ref: string
    descricao: string
    severidade: Alta | Media | Baixa
  output:
    backlog_item_id: string
    tipo: "bug"

# MS_Produto solicita iteração
solicitar_iteracao:
  input:
    feature_ref: string
    avaliacao_ref: string
    aprendizados: string
  output:
    backlog_item_id: string
    tipo: "ciclo_epistemologico"
```

### 2.3 MS_Produto ↔ Epistemologia

```yaml
# Epistemologia recebe via Backlog (não direto)
# MS_Produto cria BacklogItem → Sprint promove → Epistemologia executa

# Epistemologia entrega spec
spec_entregue:
  input: # (callback ou polling)
    backlog_item_id: string
  output:
    spec_id: string
    feature_ref: string
    vertentes: [M3.E, M3.P?, M3.D?, M3.I?, M3.C?]
    classes_equivalencia: [{classe, atributo, valores, resultado}]
    criterios_aceite: [{dado, quando, entao}]
    filhos_gerados: [backlog_item_id]  # ciclos recursivos
```

### 2.4 MS_Produto ↔ PROMETHEUS

```yaml
# PROMETHEUS recebe via Backlog (não direto)
# MS_Produto cria BacklogItem → Sprint promove → PROMETHEUS executa

# PROMETHEUS entrega release
release_publicada:
  input: # (callback ou polling)
    backlog_item_id: string
  output:
    release_id: string
    versao: string
    artefatos: [string]
    testes: {passed: number, failed: number, coverage: number}
    feature_refs: [string]
```

---

## 3. Relação com Epistemologia

### 3.1 Quando MS_Produto Solicita Epistemologia

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_PRODUTO → EPISTEMOLOGIA                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CENÁRIO 1: Nova Feature                                                    │
│  ───────────────────────                                                    │
│  Feature criada → BacklogItem(tipo: ciclo_epistemologico)                   │
│  → Sprint promove → Epistemologia executa M0-M4                             │
│  → Spec TDD gerada → Feature.spec_ref atualizado                            │
│                                                                             │
│  CENÁRIO 2: Ciclo Recursivo                                                 │
│  ─────────────────────────                                                  │
│  Epistemologia detecta atributo não-folha em M3.*                           │
│  → Gera BacklogItem(tipo: ciclo_epistemologico, pai_ref: item_atual)        │
│  → Repete até todas classes serem folha                                     │
│                                                                             │
│  CENÁRIO 3: Feature Não Atinge Threshold                                    │
│  ───────────────────────────────────────                                    │
│  Avaliação conclui ITERAR                                                   │
│  → BacklogItem(tipo: ciclo_epistemologico, feature_ref, avaliacao_ref)      │
│  → Contexto inclui aprendizados da avaliação                                │
│  → Epistemologia itera solução                                              │
│                                                                             │
│  IMPORTANTE:                                                                │
│  ───────────                                                                │
│  MS_Produto NUNCA chama Epistemologia diretamente.                          │
│  SEMPRE via BacklogItem → Sprint → Execução.                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 O que Epistemologia Entrega

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EPISTEMOLOGIA → MS_PRODUTO                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SPEC TDD                                                                   │
│  ────────                                                                   │
│  {                                                                          │
│    spec_id: "spec_001",                                                     │
│    feature_ref: "feat_001",                                                 │
│    problema: "Como reportar vendas em < 30s",                               │
│                                                                             │
│    vertentes: ["M3.E", "M3.I"],  # Estrutura + Interface                    │
│                                                                             │
│    classes_equivalencia: [                                                  │
│      {                                                                      │
│        classe: "ReporteVoz",                                                │
│        atributo: "duracao_audio",                                           │
│        valores: ["< 10s", "10-30s", "> 30s"],                               │
│        resultado: ["OK", "OK", "Erro: muito longo"]                         │
│      }                                                                      │
│    ],                                                                       │
│                                                                             │
│    criterios_aceite: [                                                      │
│      {                                                                      │
│        dado: "vendedor com celular",                                        │
│        quando: "grava audio de 15s",                                        │
│        entao: "reporte salvo em < 5s processamento"                         │
│      }                                                                      │
│    ]                                                                        │
│  }                                                                          │
│                                                                             │
│  MS_Produto usa para:                                                       │
│  • Validar que Feature tem spec completa                                    │
│  • Passar para PROMETHEUS executar                                          │
│  • Verificar se testes cobrem critérios de sucesso                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Persistência

### 4.1 Regra de Ouro

```
SE é DEFINIÇÃO (framework, template, playbook) → GitHub
SE é INSTÂNCIA (dado real, transação, estado) → MongoDB
```

### 4.2 GitHub (Definições)

| Arquivo | Conteúdo | Quando Muda |
|---------|----------|-------------|
| `docs/04_P/MS_Produto.md` | Framework completo | Evolução do MS |
| `docs/04_P/MS_Produto_Arquitetura.md` | Detalhes técnicos | Evolução técnica |
| `docs/04_P/templates/*.md` | Checklists modelo | Novo tipo de setup |
| `docs/04_P/playbooks/*.md` | Ações por situação | Novo cenário CS |

### 4.3 MongoDB (Instâncias)

| Collection | Documento | Quando Muda |
|------------|-----------|-------------|
| `prontuarios` | `{id, sintoma, afetados[], impacto, criterio_esperado, status, produto_ref}` | Nova entrevista, conversão |
| `produtos` | `{id, nome, dor_cliente, prontuario_ref, threshold_adocao, estagio, features[], owner}` | Cria produto, avança estágio |
| `features` | `{id, produto_ref, hipotese, criterios[], status, epicos[], spec_ref}` | Cria feature, atualiza status |
| `criterios_sucesso` | `{id, feature_ref, nome, baseline, meta, atual, status}` | Atualiza medição |
| `avaliacoes_efetividade` | `{id, feature_ref, conclusao, criterios_resultado[], aprendizados}` | Nova avaliação |
| `epicos` | `{id, titulo, feature_ref, status, backlog_items[]}` | Cria épico, atualiza progresso |
| `releases` | `{id, versao, produto_ref, changelog, status}` | Nova release |
| `implantacoes` | `{id, produto_ref, release_ref, cliente, checklist[], status}` | Nova implantação |
| `treinamentos` | `{id, implantacao_ref, tipo, sessoes[], status}` | Agenda sessão |
| `health_scores` | `{id, produto_ref, cliente, score, indicadores[], tendencia}` | Cálculo periódico |
| `feedbacks` | `{id, produto_ref, tipo, conteudo, sentimento, status}` | Novo feedback |

### 4.4 Extensões em Collections Existentes

| Collection | Campos Adicionados |
|------------|-------------------|
| `backlog_items` | `+tipo`, `+feature_ref`, `+spec_ref`, `+pai_ref`, `+avaliacao_ref` |
| `sprints` | `+release_ref`, `+produto_ref` |
| `catalogo` | `+tipo: prontuario\|produto\|feature\|avaliacao` |

---

## 5. Diagrama de Estados

### 5.1 Estados do Produto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ESTADOS DO PRODUTO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐                   │
│  │ Backlog │───►│Planejam.│───►│ Desenv. │───►│ Release │                   │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘                   │
│                                                     │                       │
│                                                     ▼                       │
│                               ┌─────────┐    ┌─────────┐                    │
│                               │ Sucesso │◄───│ Produção│                    │
│                               └─────────┘    └─────────┘                    │
│                                    ▲              │                         │
│                                    │              │ (se não atinge)         │
│                                    │              ▼                         │
│                                    └──────── Iteração                       │
│                                                                             │
│  CRITÉRIOS DE TRANSIÇÃO:                                                    │
│  ───────────────────────                                                    │
│  Backlog → Planejamento: Prontuário convertido, owner atribuído             │
│  Planejamento → Desenvolvimento: ≥1 Feature criada com critérios            │
│  Desenvolvimento → Release: Spec completa, testes OK                        │
│  Release → Produção: ≥1 cliente implantado                                  │
│  Produção → Sucesso: threshold_adocao atingido                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Estados da Feature

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ESTADOS DA FEATURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐                   │
│  │ Backlog │───►│ EmEspec │───►│  EmDev  │───►│Implant. │                   │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘                   │
│                      │              │              │                        │
│                      │              │              ▼                        │
│                      │              │         ┌─────────┐                   │
│                      │              │         │Avaliando│                   │
│                      │              │         └────┬────┘                   │
│                      │              │              │                        │
│                      │              │    ┌─────────┼─────────┐              │
│                      │              │    ▼         │         ▼              │
│                      │              │ ┌─────┐      │      ┌─────┐           │
│                      │              │ │Valid│      │      │Inval│           │
│                      │              │ │ ada │      │      │idada│           │
│                      │              │ └─────┘      │      └─────┘           │
│                      │              │              │         │              │
│                      │              │              │         │              │
│                      │◄─────────────┼──────────────┘         │              │
│                      │ (iterar)     │                        │              │
│                      │              │◄───────────────────────┘              │
│                      │              │ (bug)                                 │
│                                                                             │
│  CRITÉRIOS DE TRANSIÇÃO:                                                    │
│  ───────────────────────                                                    │
│  Backlog → EmEspec: BacklogItem criado para ciclo epistemológico            │
│  EmEspec → EmDev: Spec TDD pronta                                           │
│  EmDev → Implantada: Release publicada                                      │
│  Implantada → Avaliando: Período de uso atingido                            │
│  Avaliando → Validada: Todos critérios de sucesso atingidos                 │
│  Avaliando → Invalidada: Critérios não atingidos                            │
│  Invalidada → EmEspec: Iteração (novo ciclo epistemológico)                 │
│  Invalidada → EmDev: Bug (correção técnica)                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Métricas e Observabilidade

### 6.1 Métricas de Produto

| Métrica | Cálculo | Uso |
|---------|---------|-----|
| **Taxa de Adoção** | usuarios_ativos / usuarios_implantados | Threshold de sucesso |
| **Time to Value** | data_primeiro_uso - data_implantacao | Eficiência de onboarding |
| **Health Score** | média ponderada de indicadores | Saúde do cliente |
| **NPS** | % promotores - % detratores | Satisfação |

### 6.2 Métricas de Feature

| Métrica | Cálculo | Uso |
|---------|---------|-----|
| **Taxa de Atingimento** | criterios_atingidos / total_criterios | Validação |
| **Tempo de Ciclo** | data_validacao - data_criacao | Velocidade |
| **Taxa de Iteração** | iteracoes / features_totais | Qualidade de hipóteses |

### 6.3 Métricas de Processo

| Métrica | Cálculo | Uso |
|---------|---------|-----|
| **Lead Time Dor→Produção** | data_producao - data_prontuario | Eficiência E2E |
| **Taxa de Reuso** | features_reutilizadas / novas_features | Aprendizado |
| **Bugs por Release** | bugs / releases | Qualidade |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| docs/04_P/MS_Produto.md | Documento pai - propósito |
| genesis/GENESIS_Arquitetura.md | Contratos com GENESIS |
| docs/00_E/00_E_Epistemologia.md | Método de especificação |
| docs/00_I/00_I_2_1_Backlog.md | Tipos de BacklogItem |
| genesis/PROMETHEUS.md | Execução de specs |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | Criação inicial: Fluxo completo, contratos, relação com Epistemologia, persistência, estados, métricas. Separação de MS_Produto.md (propósito). |

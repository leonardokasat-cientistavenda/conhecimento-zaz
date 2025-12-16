# GENESIS Arquitetura v2.0

---

```yaml
nome: GENESIS_Arquitetura
versao: "2.0"
tipo: Documento
status: Publicado
camada: C1
pai: GENESIS
depende_de:
  - GENESIS
```

---

Este documento detalha a arquitetura técnica do GENESIS. Para visão de propósito, ver GENESIS.md.

---

## 1. Modelo de Execução

### 1.1 Um LLM + N Contextos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          1 LLM + N CONTEXTOS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ❌ INCORRETO: "N IAs autônomas se comunicando"                             │
│                                                                             │
│     IA₁ ←──→ IA₂ ←──→ IA₃ ←──→ IA₄                                          │
│                                                                             │
│  ✅ CORRETO: "1 LLM + N Contextos orquestrados por GENESIS"                 │
│                                                                             │
│                              ┌─────────────┐                                │
│                              │     LLM     │                                │
│                              │   (único)   │                                │
│                              └──────┬──────┘                                │
│                                     │                                       │
│                    ┌────────────────┼────────────────┐                      │
│                    │                │                │                      │
│                    ▼                ▼                ▼                      │
│             ┌───────────┐    ┌───────────┐    ┌───────────┐                 │
│             │ Contexto  │    │ Contexto  │    │ Contexto  │                 │
│             │ Vendas    │    │ Seleção   │    │ Produto   │                 │
│             └───────────┘    └───────────┘    └───────────┘                 │
│                                                                             │
│  GENESIS carrega UM contexto por vez                                        │
│  LLM opera especializado naquele contexto                                   │
│  Troca de contexto = Retorno ao GENESIS                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 O que é um Contexto

Um **Contexto** é um prompt estruturado que faz o LLM operar como especialista:

```
┌───────────────────────────────────────────────────────────────────────────┐
│  SYSTEM PROMPT (o que o LLM recebe)                                       │
│                                                                           │
│  1. IDENTIDADE E PROPÓSITO                                                │
│     "Você está operando como especialista em {domínio}                    │
│      Seu objetivo é {problema_que_resolve}"                               │
│                                                                           │
│  2. META SISTEMA (conhecimento estruturado)                               │
│     - Glossário do domínio                                                │
│     - Classes e métodos disponíveis                                       │
│     - Restrições e regras                                                 │
│                                                                           │
│  3. MÓDULOS ATIVOS (capacidades opcionais)                                │
│     - SE precisa decidir → carregar Raciocínio (H→E→I→D)                  │
│     - SE precisa analisar dados → carregar Análise                        │
│                                                                           │
│  4. TOOLS DISPONÍVEIS                                                     │
│     - Internas: Catálogo.buscar(), GitHub.read()                          │
│     - Externas: APIs, banco de dados                                      │
│                                                                           │
│  5. ESTADO/HISTÓRICO                                                      │
│     - Decisões anteriores relevantes                                      │
│     - Onde paramos na última sessão                                       │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Posicionamento vs CrewAI

```
ESPECTRO DE COMPLEXIDADE:

SIMPLES                                                           COMPLEXO
   │                                                                  │
   ▼                                                                  ▼

LLM puro    LLM +       LLM +         1 LLM +          Multi-LLM
(chat)      prompt      tools         N Contextos      orquestrado
            fixo                      (GENESIS) ◄──    (CrewAI)
```

| Dimensão | GENESIS | CrewAI/AutoGen |
|----------|---------|----------------|
| Controle do Loop | HUMANO decide cada passo | SISTEMA decide autonomamente |
| Troca de Contexto | Humano aprova | Automática |
| Validação | A cada etapa | Só no final |
| Instâncias LLM | 1 LLM, N contextos | N instâncias simultâneas |
| Custo por tarefa | Menor | Maior |
| Previsibilidade | Alta | Baixa |
| Risco de Alucinação | Menor | Maior |

**Diferença fundamental:** GENESIS tem loop HUMANO por padrão, autonomia é OPCIONAL e CONQUISTADA.

---

## 2. Classe GENESIS

### 2.1 Definição

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: GENESIS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ─────────                                                                  │
│  + nome: String = "GENESIS"                                                 │
│  + versao: SemVer                                                           │
│  + visao: String = "Agente Autopoiético"                                    │
│  + camadas: [L0, L1, L2, L3, L4]                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + entender(input) → {tipo, contexto}                                       │
│  + consultar_catalogos(contexto) → {existe, items[], scores[]}              │
│  + rotear(resultado) → execução                                             │
│  + avaliar_efetividade(release, produto) → {conclusao, aprendizados}        │
│  + aprender(avaliacao) → atualiza padrões                                   │
│  + sugerir_reuso(dor) → [Feature, Spec, Artefato]                           │
│  + listar_capabilities() → [Capability]                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Consulta (não possui)                                                      │
│  ─────────────────────                                                      │
│  - MS_Produto.catalogo → Features, Avaliações                               │
│  - Epistemologia.catalogo → Specs, M0s                                      │
│  - PROMETHEUS.catalogo → Artefatos, Releases                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Método: entender(input)

Classifica a natureza do problema:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Input: string (mensagem do usuário)                                        │
│  Output: {tipo: CONHECER|DECIDIR|GERENCIAR|PRODUTO, contexto: string}       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CONHECER (buscar/criar conhecimento):                                      │
│  ├── "Como funciona X?"                                                     │
│  ├── "Documente Z"                                                          │
│  └── "Crie um framework para W"                                             │
│                                                                             │
│  DECIDIR (tomar decisão):                                                   │
│  ├── "Devo fazer X ou Y?"                                                   │
│  └── "Qual a melhor opção para Z?"                                          │
│                                                                             │
│  GERENCIAR (organizar trabalho):                                            │
│  ├── "Iniciar nova sprint"                                                  │
│  ├── "O que tem no backlog?"                                                │
│  └── "Promover item para sprint"                                            │
│                                                                             │
│  PRODUTO (ciclo de vida):                                                   │
│  ├── "Tenho uma dor..." → MS_Produto.capturar_dor()                         │
│  ├── "Criar novo produto" → MS_Produto.criar()                              │
│  ├── "Health score" → MS_Produto.health_score()                             │
│  └── "Implantar release" → MS_Produto.implantar()                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Método: consultar_catalogos(contexto)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Input: contexto (extraído do entender)                                     │
│  Output: {existe: bool, items: [], scores: []}                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. Consulta MS_Produto.catalogo                                            │
│     → Busca Features similares à dor                                        │
│     → Retorna hipóteses que funcionaram                                     │
│                                                                             │
│  2. Consulta Epistemologia.catalogo                                         │
│     → Busca Specs (M3.*) similares                                          │
│     → Retorna soluções técnicas reutilizáveis                               │
│                                                                             │
│  3. Consulta PROMETHEUS.catalogo                                            │
│     → Busca Artefatos similares                                             │
│     → Retorna código/componentes reutilizáveis                              │
│                                                                             │
│  4. Ranqueia por score de similaridade                                      │
│     → SE score >= 0.75 → sugere reuso                                       │
│     → SE score < 0.75 → novo ciclo                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Método: avaliar_efetividade(release, produto)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Input: release (publicada), produto (com features)                         │
│  Output: {conclusao, aprendizados, proximos_passos}                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASSO 1: Obter métricas de adoção                                          │
│  ─────────────────────────────────                                          │
│  adocao = MS_Produto.calcular_adocao(produto, periodo)                      │
│                                                                             │
│  PASSO 2: Comparar com threshold                                            │
│  ────────────────────────────────                                           │
│  SE adocao >= produto.threshold_adocao:                                     │
│      conclusao = "SUCESSO"                                                  │
│      aprendizados = extrair_padroes_sucesso(produto, features)              │
│      RETURN                                                                 │
│                                                                             │
│  PASSO 3: Analisar features (se adoção baixa)                               │
│  ────────────────────────────────────────────                               │
│  PARA CADA feature em produto.features:                                     │
│      resultado = avaliar_criterios(feature)                                 │
│                                                                             │
│      SE resultado.todos_atingidos AND adocao < threshold:                   │
│          conclusao = "THRESHOLD_INADEQUADO"                                 │
│          proximos_passos = ["Revisar thresholds"]                           │
│                                                                             │
│      SE NOT resultado.todos_atingidos:                                      │
│          conclusao = "ITERAR"                                               │
│          proximos_passos = ["Novo ciclo Epistemologia", feature]            │
│          aprendizados = extrair_padroes_falha(feature)                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.5 Método: aprender(avaliacao)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Input: avaliacao (output de avaliar_efetividade)                           │
│  Output: void (atualiza catálogos internos)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SE avaliacao.conclusao == "SUCESSO":                                       │
│      → Indexar padrão de sucesso em MS_Produto.catalogo                     │
│      → Tags: dor_tipo, feature_tipo, metricas_atingidas                     │
│      → Aumentar score de reuso para features similares                      │
│                                                                             │
│  SE avaliacao.conclusao == "ITERAR":                                        │
│      → Indexar padrão de falha (o que não fazer)                            │
│      → Tags: dor_tipo, feature_tipo, por_que_falhou                         │
│      → Diminuir score de reuso para abordagens similares                    │
│                                                                             │
│  SE avaliacao.conclusao == "THRESHOLD_INADEQUADO":                          │
│      → Indexar aprendizado sobre calibração                                 │
│      → Ajustar thresholds default para features similares                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.6 Método: sugerir_reuso(dor)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Input: dor (nova dor de usuário)                                           │
│  Output: [Feature, Spec, Artefato] (sugestões de reuso)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. Buscar features similares (MS_Produto.catalogo)                         │
│     query = {dor_tipo: similar(dor), conclusao: "SUCESSO"}                  │
│                                                                             │
│  2. Buscar specs similares (Epistemologia.catalogo)                         │
│     query = {problema_ref: similar(dor), status: "Publicado"}               │
│                                                                             │
│  3. Buscar artefatos similares (PROMETHEUS.catalogo)                        │
│     query = {feature_ref: features_encontradas}                             │
│                                                                             │
│  4. Ranquear por:                                                           │
│     - Score de similaridade                                                 │
│     - Histórico de sucesso                                                  │
│     - Quantidade de reuso anterior                                          │
│                                                                             │
│  5. Retornar top N sugestões com justificativa                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Componentes

### 3.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          COMPONENTES GENESIS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              GENESIS                                  │  │
│  │                           (Orquestrador)                              │  │
│  │                                                                       │  │
│  │       ┌─────────────┐                        ┌─────────────┐          │  │
│  │       │  Contextos  │                        │    Tools    │          │  │
│  │       │ (Meta Sist.)│                        │  externas   │          │  │
│  │       └─────────────┘                        └─────────────┘          │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │                       MÓDULOS (opcionais)                       │  │  │
│  │  │                                                                 │  │  │
│  │  │   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌─────────┐   │  │  │
│  │  │   │Raciocínio │   │  Análise  │   │ Autonomia │   │   ...   │   │  │  │
│  │  │   │ (H→E→I→D) │   │ (métricas)│   │  (modos)  │   │(futuros)│   │  │  │
│  │  │   └───────────┘   └───────────┘   └───────────┘   └─────────┘   │  │  │
│  │  │                                                                 │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Tools

| Tipo | Exemplos | Descrição |
|------|----------|-----------|
| **Internas** | Catálogo.buscar(), GitHub.read(), MongoDB.find() | Tools do próprio sistema |
| **Externas** | APIs REST, CRM, ERP, Mattermost | Tools de sistemas terceiros |

### 3.3 Módulos

| Módulo | Descrição | Status |
|--------|-----------|--------|
| **Raciocínio** | Decisão estruturada via ciclo H→E→I→D | ✅ Publicado |
| **Análise** | Métricas, agregação, dados | 📋 Backlog |
| **Autonomia** | Controle do loop (Guiado/Assistido/Autônomo) | 📋 Backlog |

### 3.4 Modos de Autonomia

| Modo | Descrição | Validação Humana |
|------|-----------|------------------|
| **Guiado** | Humano valida cada passo (padrão) | 100% |
| **Assistido** | Sistema executa, humano valida checkpoints | Parcial |
| **Autônomo** | Sistema executa até concluir | Só no final |

---

## 4. Contratos entre Sistemas

### 4.1 GENESIS ↔ MS_Produto

```yaml
# GENESIS chama MS_Produto para:
capturar_dor:
  input: {descricao: string, usuario: string}
  output: {produto_id?, feature_id, criterios_sugeridos}

estruturar_feature:
  input: {dor: string, hipotese: string}
  output: {feature_id, criterios_sucesso: []}

calcular_adocao:
  input: {produto_id, periodo}
  output: {adocao: number, por_feature: []}

avaliar_criterios:
  input: {feature_id}
  output: {criterios: [{nome, baseline, meta, atual, status}]}

# MS_Produto cataloga para GENESIS:
catalogo_schema:
  - features: {id, hipotese, criterios, status, aprendizados}
  - avaliacoes: {feature_id, conclusao, metricas, data}
```

### 4.2 GENESIS ↔ Epistemologia

```yaml
# GENESIS chama Epistemologia para:
especificar:
  input: {feature_id, contexto}
  output: {spec_id, M3_vertentes: [E, P?, D?, I?, C?]}

buscar_spec_similar:
  input: {problema: string}
  output: [{spec_id, score, resumo}]

# Epistemologia cataloga para GENESIS:
catalogo_schema:
  - specs: {id, ms_ref, problema_ref, vertentes, status}
  - problemas: {id, descricao, dominio, tags}
  - classes_equivalencia: {spec_id, classe, atributo, valores}
```

### 4.3 GENESIS ↔ PROMETHEUS

```yaml
# GENESIS chama PROMETHEUS para:
executar_spec:
  input: {spec_id, vertentes: [M3.E, M3.P?, ...]}
  output: {job_id, status}

obter_release:
  input: {job_id}
  output: {release_id, artefatos: [], testes: {passed, failed}}

# PROMETHEUS cataloga para GENESIS:
catalogo_schema:
  - artefatos: {id, tipo, feature_ref, spec_ref, path}
  - releases: {id, versao, artefatos: [], status}
  - testes: {release_id, tipo, resultado, cobertura}
```

### 4.4 Schema de Catalogação Universal

Todos os sistemas devem indexar seus itens com:

```yaml
item_catalogo:
  id: ObjectId
  sistema_origem: MS_Produto | Epistemologia | PROMETHEUS
  tipo: feature | spec | artefato | avaliacao | ...
  
  # Para busca semântica
  embedding: [float]  # vetor 1536 dims
  tags: [string]
  descricao: string
  
  # Para reuso
  score_reuso: number  # 0-1, aumenta com sucesso
  vezes_reutilizado: number
  ultima_reutilizacao: datetime
  
  # Para rastreabilidade
  criado_em: datetime
  atualizado_em: datetime
  refs: {feature_id?, spec_id?, release_id?}
```

---

## 5. Fluxo Técnico Completo

### 5.1 Dor → Release → Avaliação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO TÉCNICO: DOR → AVALIAÇÃO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. GENESIS.entender(input)                                                 │
│     → tipo: PRODUTO                                                         │
│     → contexto: "dor do usuário"                                            │
│         │                                                                   │
│         ▼                                                                   │
│  2. GENESIS.consultar_catalogos(contexto)                                   │
│     → MS_Produto.catalogo.buscar(dor)                                       │
│     → Epistemologia.catalogo.buscar(problema)                               │
│     → PROMETHEUS.catalogo.buscar(artefato)                                  │
│         │                                                                   │
│         ├── SE existe similar com score >= 0.75                             │
│         │   → GENESIS.sugerir_reuso(dor)                                    │
│         │   → Humano decide: reusar ou novo                                 │
│         │                                                                   │
│         └── SE não existe ou humano quer novo                               │
│                 │                                                           │
│                 ▼                                                           │
│  3. MS_Produto.estruturar_feature(dor, hipotese)                            │
│     → feature_id, criterios_sucesso                                         │
│         │                                                                   │
│         ▼                                                                   │
│  4. GENESIS.verificar_capabilities(feature)                                 │
│     → Lista capabilities necessárias                                        │
│         │                                                                   │
│         ├── SE falta capability                                             │
│         │   → Gerar backlog: desenvolver capability                         │
│         │   → Executar ciclo para capability primeiro                       │
│         │                                                                   │
│         └── SE tem todas capabilities                                       │
│                 │                                                           │
│                 ▼                                                           │
│  5. Epistemologia.especificar(feature)                                      │
│     → M0: Problema                                                          │
│     → M1: Marco Teórico                                                     │
│     → M2: Objeto                                                            │
│     → M3.*: Specs (E, P, D, I, C)                                           │
│     → M4: Documento                                                         │
│         │                                                                   │
│         ▼                                                                   │
│  6. PROMETHEUS.executar_spec(spec)                                          │
│     → Workers por vertente                                                  │
│     → TDD: testes primeiro                                                  │
│     → Código gerado                                                         │
│     → Validação técnica (testes passam)                                     │
│     → Release publicada                                                     │
│         │                                                                   │
│         ▼                                                                   │
│  7. MS_Produto.implantar(release, usuarios)                                 │
│     → Setup ambiente                                                        │
│     → Treinamento                                                           │
│     → Início de uso                                                         │
│         │                                                                   │
│         ▼                                                                   │
│  8. [Aguarda período de avaliação]                                          │
│         │                                                                   │
│         ▼                                                                   │
│  9. GENESIS.avaliar_efetividade(release, produto)                           │
│     → Coleta métricas de adoção                                             │
│     → Compara com thresholds                                                │
│     → Analisa critérios das features                                        │
│         │                                                                   │
│         ├── SUCESSO → GENESIS.aprender(sucesso)                             │
│         │             → Indexa padrão positivo                              │
│         │                                                                   │
│         ├── ITERAR → GENESIS.aprender(falha)                                │
│         │            → Volta para passo 5 (Epistemologia)                   │
│         │                                                                   │
│         └── THRESHOLD_INADEQUADO → Ajustar thresholds                       │
│                                    → Reavaliar                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Recursividade de Especificação

```
Feature: "Reporte por Voz"
    │
    └── Epistemologia.especificar()
            │
            └── M3.E detecta: atributo "transcricao" precisa de ciclo próprio
                    │
                    └── GENESIS gera backlog: MS_Transcricao
                            │
                            └── Epistemologia.especificar(MS_Transcricao)
                                    │
                                    └── M3.E detecta: atributo "modelo_ml" é folha
                                            │
                                            └── Especificação completa
                                                    │
                                                    └── PROMETHEUS executa
```

---

## 6. Persistência

### 6.1 Regra de Ouro

```
SE é DEFINIÇÃO (como fazer, template, spec) → GitHub
SE é INSTÂNCIA (dado real, transação, estado) → MongoDB
```

### 6.2 GitHub (Definições)

| Tipo | Exemplo | Path |
|------|---------|------|
| Framework | GENESIS.md | genesis/ |
| Meta Sistema | MS_Produto.md | docs/04_P/ |
| Spec | M3.E.yaml | docs/04_X/MS_Nome/M3/ |
| Template | checklist.md | docs/04_P/templates/ |

### 6.3 MongoDB (Instâncias)

| Collection | Conteúdo |
|------------|----------|
| produtos | Instâncias de Produto |
| features | Instâncias de Feature |
| criterios_sucesso | Critérios com baseline/meta/atual |
| avaliacoes | Resultados de avaliação |
| specs | Specs indexadas para busca |
| artefatos | Artefatos indexados |
| aprendizados | Padrões de sucesso/falha |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Documento pai - propósito |
| genesis/PROMETHEUS.md | Fábrica de execução |
| docs/00_E/00_E_Epistemologia.md | Método de especificação |
| docs/04_P/MS_Produto.md | Framework de objetivo |
| docs/00_I/00_I_1_1_GitHub.md | Persistência de definições |
| docs/00_I/00_I_1_3_MongoDB.md | Persistência transacional |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0-1.2 | 2025-12-07 a 2025-12-13 | Versões anteriores |
| 2.0 | 2025-12-16 | **Refatoração completa**: Classe GENESIS com métodos de avaliação e aprendizado. Contratos entre sistemas. Schema de catalogação universal. Fluxo técnico Dor→Avaliação. Separação clara de GENESIS.md (propósito). |

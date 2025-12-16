# GENESIS Arquitetura v2.1

---

```yaml
nome: GENESIS_Arquitetura
versao: "2.1"
tipo: Documento
status: Publicado
camada: C1
data_publicacao: "2025-12-16"
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
│  - MS_Produto.catalogo → Prontuários, Features, Avaliações                  │
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
│  ├── "Tenho uma dor..." → rotear para MS_Produto.entrevistar_dor()          │
│  ├── "Criar novo produto" → rotear para MS_Produto.criar()                  │
│  ├── "Health score" → rotear para MS_Produto.health_score()                 │
│  └── "Implantar release" → rotear para MS_Produto.implantar()               │
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
│     → Busca Prontuários similares à dor                                     │
│     → Busca Features similares                                              │
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
│  PASSO 4: Detectar bugs (se problema técnico)                               │
│  ─────────────────────────────────────────────                              │
│  SE erro_tecnico detectado:                                                 │
│      conclusao = "BUG"                                                      │
│      proximos_passos = ["Correção em PROMETHEUS"]                           │
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
│  SE avaliacao.conclusao == "BUG":                                           │
│      → Não indexar como padrão (problema técnico, não de design)            │
│      → Apenas rastrear para métricas de qualidade                           │
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
│  1. Buscar prontuários similares (MS_Produto.catalogo)                      │
│     query = {sintoma: similar(dor)}                                         │
│                                                                             │
│  2. Buscar features similares (MS_Produto.catalogo)                         │
│     query = {dor_tipo: similar(dor), conclusao: "SUCESSO"}                  │
│                                                                             │
│  3. Buscar specs similares (Epistemologia.catalogo)                         │
│     query = {problema_ref: similar(dor), status: "Publicado"}               │
│                                                                             │
│  4. Buscar artefatos similares (PROMETHEUS.catalogo)                        │
│     query = {feature_ref: features_encontradas}                             │
│                                                                             │
│  5. Ranquear por:                                                           │
│     - Score de similaridade                                                 │
│     - Histórico de sucesso                                                  │
│     - Quantidade de reuso anterior                                          │
│                                                                             │
│  6. Retornar top N sugestões com justificativa                              │
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
# GENESIS roteia para MS_Produto (não processa dor diretamente)
rotear_dor:
  trigger: "usuario menciona dor, problema, fricção"
  input: {contexto: string}
  output: {sistema: "MS_Produto", metodo: "entrevistar_dor"}
  nota: "GENESIS só roteia, MS_Produto é quem entrevista"

# MS_Produto é responsável por:
entrevistar_dor:
  input: {usuario: string}
  output: {prontuario_id: string}
  responsavel: MS_Produto  # NÃO GENESIS

converter_produto:
  input: {prontuario_id: string}
  output: {produto_id: string, dor_cliente: string, threshold_adocao: number}
  responsavel: MS_Produto

criar_feature:
  input: {produto_id: string, hipotese: string, criterios: []}
  output: {feature_id: string, criterios_sucesso: []}
  responsavel: MS_Produto

# GENESIS chama MS_Produto para avaliação:
calcular_adocao:
  input: {produto_id: string, periodo: string}
  output: {adocao: number, por_feature: []}

avaliar_criterios:
  input: {feature_id: string}
  output: {criterios: [{nome, baseline, meta, atual, status}]}

# MS_Produto cataloga para GENESIS:
catalogo_schema:
  - prontuarios: {id, sintoma, afetados, impacto, status}
  - produtos: {id, nome, dor_cliente, threshold_adocao, status}
  - features: {id, produto_ref, hipotese, criterios, status, aprendizados}
  - avaliacoes: {feature_id, conclusao, metricas, aprendizados, data}
```

### 4.2 GENESIS ↔ Epistemologia

```yaml
# Epistemologia é acionada via Backlog, não diretamente por GENESIS
# MS_Produto cria BacklogItem → Sprint promove → Epistemologia executa

# GENESIS consulta catálogo de Epistemologia:
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
# PROMETHEUS é acionado via Backlog, não diretamente por GENESIS
# MS_Produto cria BacklogItem(tipo: desenvolvimento) → Sprint promove → PROMETHEUS executa

# GENESIS consulta catálogo de PROMETHEUS:
buscar_artefato_similar:
  input: {feature_ref: string}
  output: [{artefato_id, score, tipo, path}]

obter_release:
  input: {job_id: string}
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
  tipo: prontuario | produto | feature | avaliacao | spec | artefato | ...
  
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
  refs: {prontuario_id?, produto_id?, feature_id?, spec_id?, release_id?}
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
│  2. GENESIS.rotear() → MS_Produto                                           │
│     → GENESIS NÃO processa a dor                                            │
│     → Apenas roteia para sistema especializado                              │
│         │                                                                   │
│         ▼                                                                   │
│  3. MS_Produto.entrevistar_dor()                                            │
│     → MS_Produto conversa com usuário                                       │
│     → Extrai: sintoma, afetados, impacto, critério esperado                 │
│     → Cria Prontuário estruturado                                           │
│         │                                                                   │
│         ▼                                                                   │
│  4. MS_Produto.converter_produto()                                          │
│     → Prontuário → Produto                                                  │
│     → Define dor_cliente, threshold_adocao                                  │
│         │                                                                   │
│         ▼                                                                   │
│  5. MS_Produto.criar_feature()                                              │
│     → Hipótese de como resolver a dor                                       │
│     → Critérios de sucesso (baseline, meta)                                 │
│         │                                                                   │
│         ▼                                                                   │
│  6. MS_Produto.solicitar_especificacao() → Backlog                          │
│     → BacklogItem(tipo: ciclo_epistemologico, feature_ref)                  │
│     → Sprint promove → Epistemologia executa M0-M4                          │
│     → Spec TDD gerada                                                       │
│         │                                                                   │
│         ├── SE M3.* detecta não-folha:                                      │
│         │   → Novo BacklogItem(ciclo_epistemo, pai_ref)                     │
│         │   → Recursivo até todas classes folha                             │
│         │                                                                   │
│         ▼                                                                   │
│  7. MS_Produto.solicitar_desenvolvimento() → Backlog                        │
│     → BacklogItem(tipo: desenvolvimento, spec_ref)                          │
│     → Sprint promove → PROMETHEUS executa                                   │
│     → TDD, Workers, Validação                                               │
│     → Release publicada                                                     │
│         │                                                                   │
│         ▼                                                                   │
│  8. MS_Produto.implantar(release, usuarios)                                 │
│     → Setup ambiente                                                        │
│     → Treinamento                                                           │
│     → Início de uso                                                         │
│         │                                                                   │
│         ▼                                                                   │
│  9. [Aguarda período de avaliação]                                          │
│         │                                                                   │
│         ▼                                                                   │
│  10. GENESIS.avaliar_efetividade(release, produto)                          │
│      → Coleta métricas de adoção                                            │
│      → Compara com thresholds                                               │
│      → Analisa critérios das features                                       │
│          │                                                                  │
│          ├── SUCESSO → GENESIS.aprender(sucesso)                            │
│          │             → Indexa padrão positivo                             │
│          │             → DOR RESOLVIDA                                      │
│          │                                                                  │
│          ├── BUG → BacklogItem(tipo: bug)                                   │
│          │         → PROMETHEUS corrige                                     │
│          │                                                                  │
│          ├── ITERAR → BacklogItem(tipo: ciclo_epistemo)                     │
│          │            → Volta para passo 6 (Epistemologia)                  │
│          │            → Inclui aprendizados da avaliação                    │
│          │                                                                  │
│          └── THRESHOLD_INADEQUADO → Ajustar thresholds                      │
│                                     → Reavaliar                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Recursividade de Especificação

```
Feature: "Reporte por Voz"
    │
    └── MS_Produto.solicitar_especificacao()
            │
            └── BacklogItem(tipo: ciclo_epistemologico)
                    │
                    └── Epistemologia.especificar()
                            │
                            └── M3.E detecta: atributo "transcricao" não é folha
                                    │
                                    └── Gera BacklogItem(ciclo_epistemo, pai_ref)
                                            │
                                            └── Epistemologia.especificar(Transcricao)
                                                    │
                                                    └── M3.E detecta: "modelo_ml" é folha
                                                            │
                                                            └── Especificação completa
                                                                    │
                                                                    └── BacklogItem(tipo: dev)
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
| Arquitetura | GENESIS_Arquitetura.md | genesis/ |
| Meta Sistema | MS_Produto.md | docs/04_P/ |
| Arquitetura MS | MS_Produto_Arquitetura.md | docs/04_P/ |
| Spec | M3.E.yaml | docs/04_X/MS_Nome/M3/ |
| Template | checklist.md | docs/04_P/templates/ |

### 6.3 MongoDB (Instâncias)

| Collection | Conteúdo |
|------------|----------|
| prontuarios | Dores estruturadas via entrevista |
| produtos | Instâncias de Produto |
| features | Hipóteses testáveis |
| criterios_sucesso | Critérios com baseline/meta/atual |
| avaliacoes_efetividade | Resultados de avaliação |
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
| docs/04_P/MS_Produto.md | Framework de produto |
| docs/04_P/MS_Produto_Arquitetura.md | Arquitetura técnica de produto |
| docs/00_I/00_I_1_1_GitHub.md | Persistência de definições |
| docs/00_I/00_I_1_3_MongoDB.md | Persistência transacional |
| docs/00_I/00_I_2_1_Backlog.md | Tipos de BacklogItem |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0-1.2 | 2025-12-07 a 2025-12-13 | Versões anteriores |
| 2.0 | 2025-12-16 | Refatoração completa: Classe GENESIS com métodos de avaliação e aprendizado. Contratos entre sistemas. Schema de catalogação universal. Fluxo técnico Dor→Avaliação. |
| 2.1 | 2025-12-16 | **Propagação MS_Produto v2.0**: Contrato 4.1 atualizado (GENESIS roteia, MS_Produto entrevista). Fluxo 5.1 atualizado com Prontuário. Schema 4.4 inclui prontuario. Conclusão BUG adicionada em 2.4 e 2.5. Referências atualizadas (MS_Produto_Arquitetura). |

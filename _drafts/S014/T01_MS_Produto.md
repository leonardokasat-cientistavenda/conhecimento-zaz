# MS_Produto v0.4

---
nome: MS_Produto
versao: "0.4"
tipo: Framework
status: Draft
etapa: M3
sprint_ref: S014
task_ref: T01
---

## 1. Problema (M0)

*(Aprovado - ver versão 0.1)*

---

## 2. Marco Teórico (M1)

*(Aprovado - ver versão 0.2)*

---

## 3. Objeto (M2)

*(Aprovado - ver versão 0.3)*

---

## 4. Classe (M3)

### 4.1 Diagrama de Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DIAGRAMA DE CLASSES MS_PRODUTO                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                            ┌─────────────┐                                  │
│                            │  PORTFÓLIO  │                                  │
│                            │─────────────│                                  │
│                            │ produtos[]  │                                  │
│                            │─────────────│                                  │
│                            │ dashboard() │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:N                                     │
│                                   ▼                                         │
│                            ┌─────────────┐                                  │
│                            │   PRODUTO   │                                  │
│                            │─────────────│                                  │
│                            │ nome        │                                  │
│                            │ estagio     │                                  │
│                            │ epicos[]    │                                  │
│                            │─────────────│                                  │
│                            │ avancar()   │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:N                                     │
│              ┌────────────────────┼────────────────────┐                    │
│              ▼                    ▼                    ▼                    │
│       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐             │
│       │    ÉPICO    │      │  RELEASE    │      │ IMPLANTAÇÃO │             │
│       │─────────────│      │─────────────│      │─────────────│             │
│       │ titulo      │      │ versao      │      │ cliente     │             │
│       │ okr_ref     │      │ changelog   │      │ checklist   │             │
│       │ backlog[]   │      │ status      │      │ status      │             │
│       │─────────────│      │─────────────│      │─────────────│             │
│       │ priorizar() │      │ publicar()  │      │ executar()  │             │
│       └──────┬──────┘      └─────────────┘      └──────┬──────┘             │
│              │ 1:N                                     │ 1:1                 │
│              ▼                                         ▼                    │
│       ┌─────────────┐                           ┌─────────────┐             │
│       │BACKLOG ITEM │                           │ TREINAMENTO │             │
│       │ (existente) │                           │─────────────│             │
│       │─────────────│                           │ materiais[] │             │
│       │ +epico_ref  │                           │ sessoes[]   │             │
│       │ +rice_score │                           │ status      │             │
│       └──────┬──────┘                           │─────────────│             │
│              │ N:1                              │ concluir()  │             │
│              ▼                                  └─────────────┘             │
│       ┌─────────────┐                                                       │
│       │   SPRINT    │                                                       │
│       │ (existente) │      ┌─────────────┐      ┌─────────────┐             │
│       │─────────────│      │HEALTH SCORE │      │  FEEDBACK   │             │
│       │ +release_ref│      │─────────────│      │─────────────│             │
│       └─────────────┘      │ produto_ref │      │ produto_ref │             │
│                            │ score       │      │ tipo        │             │
│                            │ indicadores │      │ conteudo    │             │
│                            │─────────────│      │ status      │             │
│                            │ calcular()  │      │─────────────│             │
│                            │ alertar()   │      │ processar() │             │
│                            └─────────────┘      └─────────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Classe: Produto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLASSE: PRODUTO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único (slug)           │
│  + nome: String                      # Nome do produto/MS                   │
│  + descricao: String                 # O que o produto resolve              │
│  + dor_cliente: String               # Problema claro que alivia            │
│  + estagio: Enum                     # Backlog|Plan|Dev|Release|Impl|Prod   │
│  + data_criacao: Date                # Quando foi criado                    │
│  + data_lancamento: Date?            # Quando entrou em produção            │
│  + owner: String                     # Responsável pelo produto             │
│  + epicos: [Epico]                   # Lista de épicos                      │
│  + releases: [Release]               # Histórico de releases                │
│  + implantacoes: [Implantacao]       # Clientes com produto implantado      │
│  + health_scores: [HealthScore]      # Scores por cliente                   │
│  + metricas_sucesso: Object          # KPIs definidos para o produto        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(nome, descricao, dor): Produto                                     │
│  + avancar_estagio(): Produto                                               │
│  + adicionar_epico(epico): Produto                                          │
│  + criar_release(versao): Release                                           │
│  + implantar(cliente): Implantacao                                          │
│  + obter_health_geral(): Number                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  - dor_cliente obrigatório (produto sem dor clara = não é produto)          │
│  - estagio só avança se critérios de transição atendidos                    │
│  - metricas_sucesso definidas antes de ir para Produção                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Método: criar()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MÉTODO: criar()                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input:                                                                     │
│  - nome: String                                                             │
│  - descricao: String                                                        │
│  - dor_cliente: String                                                      │
│                                                                             │
│  Output: Produto                                                            │
│                                                                             │
│  Passos:                                                                    │
│  1. Validar dor_cliente não vazio                                           │
│  2. Gerar id (slug do nome)                                                 │
│  3. Criar registro com estagio = "Backlog"                                  │
│  4. Persistir no Catálogo (tipo: "produto")                                 │
│  5. Criar arquivo _produtos/[id].md                                         │
│  6. Retornar produto criado                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Método: avancar_estagio()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MÉTODO: avancar_estagio()                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: (usa estado atual do produto)                                       │
│  Output: Produto (com novo estágio)                                         │
│                                                                             │
│  Transições e Critérios:                                                    │
│  ┌──────────────┬─────────────────────────────────────────────────────────┐ │
│  │ De           │ Para         │ Critério                                │ │
│  ├──────────────┼──────────────┼─────────────────────────────────────────┤ │
│  │ Backlog      │ Planejamento │ M0 definido, owner atribuído            │ │
│  │ Planejamento │ Desenvolvimento │ ≥1 épico criado, roadmap definido   │ │
│  │ Desenvolvimento │ Release   │ Sprint concluída, testes OK             │ │
│  │ Release      │ Implantação  │ Release publicada                       │ │
│  │ Implantação  │ Produção     │ ≥1 cliente com setup concluído          │ │
│  │ Produção     │ Sucesso      │ Health Score calculado                  │ │
│  └──────────────┴──────────────┴─────────────────────────────────────────┘ │
│                                                                             │
│  Erro: Se critério não atendido, retorna mensagem com pendências            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Classe: Épico

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLASSE: ÉPICO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + titulo: String                    # Nome do épico                        │
│  + descricao: String                 # O que será entregue                  │
│  + produto_ref: String               # Produto pai                          │
│  + okr_ref: String?                  # OKR associado (opcional)             │
│  + status: Enum                      # Backlog|EmProgresso|Concluido        │
│  + prioridade: Number                # Ordem de execução                    │
│  + backlog_items: [String]           # IDs dos backlog items                │
│  + release_alvo: String?             # Release planejada                    │
│  + data_inicio: Date?                # Quando começou                       │
│  + data_fim: Date?                   # Quando concluiu                      │
│  + metrica_sucesso: String?          # Como medir sucesso do épico          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(titulo, produto_ref, descricao): Epico                             │
│  + adicionar_item(backlog_item_id): Epico                                   │
│  + priorizar(posicao): Epico                                                │
│  + calcular_progresso(): Number                                             │
│  + iniciar(): Epico                                                         │
│  + concluir(): Epico                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  - produto_ref obrigatório                                                  │
│  - backlog_items devem existir no Catálogo                                  │
│  - não pode concluir se há items pendentes                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Classe: Release

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLASSE: RELEASE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + versao: String                    # SemVer (v1.0.0)                      │
│  + produto_ref: String               # Produto pai                          │
│  + tipo: Enum                        # Major|Minor|Patch                    │
│  + status: Enum                      # Planejada|EmDesenv|Publicada         │
│  + changelog: String                 # O que mudou                          │
│  + epicos_incluidos: [String]        # Épicos desta release                 │
│  + sprints: [String]                 # Sprints que compõem                  │
│  + data_planejada: Date?             # Quando pretende lançar               │
│  + data_publicacao: Date?            # Quando foi publicada                 │
│  + notas: String?                    # Release notes                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(produto_ref, tipo): Release                                        │
│  + gerar_versao(): String            # Auto-incrementa baseado em tipo      │
│  + adicionar_epico(epico_id): Release                                       │
│  + publicar(): Release                                                      │
│  + gerar_changelog(): String                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  - versao segue SemVer                                                      │
│  - só publica se todos épicos concluídos                                    │
│  - changelog obrigatório para publicar                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Classe: Implantação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: IMPLANTAÇÃO                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + produto_ref: String               # Produto sendo implantado             │
│  + release_ref: String               # Versão sendo implantada              │
│  + cliente: String                   # Nome/ID do cliente                   │
│  + tipo_cliente: Enum                # Interno|Externo                      │
│  + responsavel: String               # Quem conduz a implantação            │
│  + status: Enum                      # Pendente|EmAndamento|Concluida       │
│  + checklist: [ChecklistItem]        # Passos de setup                      │
│  + data_inicio: Date                 # Quando começou                       │
│  + data_conclusao: Date?             # Quando terminou                      │
│  + treinamento: Treinamento?         # Treinamento associado                │
│  + observacoes: String?              # Notas do processo                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(produto_ref, release_ref, cliente): Implantacao                    │
│  + marcar_item(item_id, status): Implantacao                                │
│  + calcular_progresso(): Number                                             │
│  + concluir(): Implantacao                                                  │
│  + iniciar_treinamento(): Treinamento                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ChecklistItem (sub-estrutura)                                              │
│  ─────────────────────────────                                              │
│  + id: String                                                               │
│  + descricao: String                                                        │
│  + status: Enum                      # Pendente|Concluido|NA                │
│  + responsavel: String?                                                     │
│  + data_conclusao: Date?                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Classe: Treinamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: TREINAMENTO                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + implantacao_ref: String           # Implantação pai                      │
│  + tipo: Enum                        # Presencial|Online|Autoguiado         │
│  + status: Enum                      # Planejado|EmAndamento|Concluido      │
│  + materiais: [Material]             # Docs, vídeos, guias                  │
│  + sessoes: [Sessao]                 # Sessões agendadas/realizadas         │
│  + participantes: [String]           # Quem será treinado                   │
│  + avaliacao: Number?                # Nota do treinamento (1-5)            │
│  + feedback_participantes: String?   # Comentários                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + criar(implantacao_ref, tipo): Treinamento                                │
│  + adicionar_material(material): Treinamento                                │
│  + agendar_sessao(sessao): Treinamento                                      │
│  + registrar_presenca(sessao_id, participantes): Treinamento                │
│  + concluir(avaliacao): Treinamento                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Material (sub-estrutura)                                                   │
│  ────────────────────────                                                   │
│  + tipo: Enum                        # Doc|Video|Guia|FAQ                   │
│  + titulo: String                                                           │
│  + url: String                                                              │
│                                                                             │
│  Sessao (sub-estrutura)                                                     │
│  ──────────────────────                                                     │
│  + id: String                                                               │
│  + data: DateTime                                                           │
│  + duracao_min: Number                                                      │
│  + status: Enum                      # Agendada|Realizada|Cancelada         │
│  + presentes: [String]                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Classe: HealthScore

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLASSE: HEALTH SCORE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + produto_ref: String               # Produto avaliado                     │
│  + cliente: String                   # Cliente avaliado                     │
│  + score: Number                     # 0-100                                │
│  + status: Enum                      # Saudavel|Atencao|Risco               │
│  + indicadores: [Indicador]          # Métricas que compõem o score         │
│  + data_calculo: Date                # Quando foi calculado                 │
│  + tendencia: Enum                   # Subindo|Estavel|Descendo             │
│  + acoes_recomendadas: [String]      # Playbook suggestions                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + calcular(produto_ref, cliente): HealthScore                              │
│  + alertar(): void                   # Notifica se status = Risco           │
│  + sugerir_acoes(): [String]         # Baseado no playbook                  │
│  + historico(periodo): [HealthScore]                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Indicador (sub-estrutura)                                                  │
│  ────────────────────────                                                   │
│  + nome: String                      # Ex: "Uso do produto"                 │
│  + valor: Number                     # Valor medido                         │
│  + peso: Number                      # Peso no cálculo (0-1)                │
│  + fonte: String                     # De onde vem o dado                   │
│                                                                             │
│  Thresholds                                                                 │
│  ──────────                                                                 │
│  - Saudavel: score >= 70                                                    │
│  - Atencao: score >= 40 AND < 70                                            │
│  - Risco: score < 40                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.8 Classe: Feedback

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLASSE: FEEDBACK                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + id: String                        # Identificador único                  │
│  + produto_ref: String               # Produto relacionado                  │
│  + cliente: String                   # Quem deu o feedback                  │
│  + tipo: Enum                        # Bug|Melhoria|Elogio|Reclamacao       │
│  + canal: Enum                       # NPS|CSAT|Entrevista|Ticket|Espontaneo│
│  + conteudo: String                  # O que foi dito                       │
│  + sentimento: Enum                  # Positivo|Neutro|Negativo             │
│  + status: Enum                      # Novo|Analisado|Backlog|Resolvido     │
│  + data_registro: Date               # Quando foi registrado                │
│  + backlog_item_ref: String?         # Se virou item de backlog             │
│  + resposta: String?                 # Resposta dada ao cliente             │
│  + data_resposta: Date?              # Quando respondeu                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + registrar(produto_ref, cliente, tipo, conteudo): Feedback                │
│  + analisar(sentimento): Feedback                                           │
│  + converter_backlog(): BacklogItem  # Cria item no backlog                 │
│  + responder(resposta): Feedback     # Fecha o loop                         │
│  + listar_pendentes(produto_ref): [Feedback]                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Restrições                                                                 │
│  ──────────                                                                 │
│  - conteudo obrigatório                                                     │
│  - se tipo = Bug|Melhoria, deve analisar para backlog                       │
│  - feedback Negativo deve ter resposta em até 48h (SLA)                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Método: converter_backlog() - O Feedback Loop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MÉTODO: converter_backlog()                           │
│                         (O CICLO QUE NUNCA PARA)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: (usa estado atual do feedback)                                      │
│  Output: BacklogItem                                                        │
│                                                                             │
│  Pré-condição: tipo IN (Bug, Melhoria) AND status = Analisado               │
│                                                                             │
│  Passos:                                                                    │
│  1. Chamar Backlog.capturar() com:                                          │
│     - descricao: feedback.conteudo                                          │
│     - tipo: Bug → "Bug", Melhoria → "Feature"                               │
│     - sistema_afetado: feedback.produto_ref                                 │
│     - origem: "Feedback CS - {cliente}"                                     │
│                                                                             │
│  2. Se Backlog retorna item existente (similar):                            │
│     - Enriquecer com contexto do feedback                                   │
│     - Registrar: "Mais um cliente pediu isso"                               │
│                                                                             │
│  3. Se Backlog cria novo:                                                   │
│     - Associar feedback.backlog_item_ref = item.id                          │
│                                                                             │
│  4. Atualizar feedback.status = "Backlog"                                   │
│                                                                             │
│  5. Retornar BacklogItem                                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    FEEDBACK LOOP COMPLETO                           │    │
│  │                                                                     │    │
│  │  Feedback ──► converter_backlog() ──► Backlog ──► Sprint ──►        │    │
│  │      ▲                                                    │         │    │
│  │      │                                                    ▼         │    │
│  │      └──────────── Release ◄── Produção ◄── Implantação ◄─┘         │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.9 Classe: Portfólio

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLASSE: PORTFÓLIO                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ──────────                                                                 │
│  + produtos: [Produto]               # Todos os produtos                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + listar(): [Produto]                                                      │
│  + filtrar_por_estagio(estagio): [Produto]                                  │
│  + dashboard(): DashboardData                                               │
│  + roadmap_consolidado(): RoadmapData                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dashboard (output)                                                         │
│  ──────────────────                                                         │
│  + por_estagio: { estagio: count }                                          │
│  + em_risco: [Produto]               # Health Score < 40                    │
│  + proximos_lancamentos: [Release]   # Próximos 30 dias                     │
│  + feedbacks_pendentes: Number                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.10 Extensões em Classes Existentes

#### Backlog Item (Extensão)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EXTENSÃO: BACKLOG ITEM (existente)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Novos Atributos                                                            │
│  ───────────────                                                            │
│  + epico_ref: String?                # Épico ao qual pertence               │
│  + rice_score: Number?               # Score RICE calculado                 │
│  + rice_reach: Number?               # R - Alcance                          │
│  + rice_impact: Number?              # I - Impacto (0.25, 0.5, 1, 2, 3)     │
│  + rice_confidence: Number?          # C - Confiança (0-100%)               │
│  + rice_effort: Number?              # E - Esforço (pessoa-semanas)         │
│  + feedback_origem: String?          # ID do feedback que originou          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Novos Métodos                                                              │
│  ────────────                                                               │
│  + calcular_rice(): Number           # (R * I * C) / E                      │
│  + vincular_epico(epico_id): BacklogItem                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Sprint (Extensão)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       EXTENSÃO: SPRINT (existente)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Novos Atributos                                                            │
│  ───────────────                                                            │
│  + release_ref: String?              # Release alvo desta sprint            │
│  + produto_ref: String?              # Produto relacionado                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Novos Métodos                                                              │
│  ────────────                                                               │
│  + vincular_release(release_id): Sprint                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.11 Invariantes do Sistema

| Invariante | Descrição |
|------------|-----------|
| **PRODUTO-DOR** | Todo Produto deve ter dor_cliente definida |
| **EPICO-PRODUTO** | Todo Épico pertence a exatamente um Produto |
| **RELEASE-SEMVER** | Versões seguem SemVer estrito |
| **FEEDBACK-LOOP** | Feedback tipo Bug/Melhoria deve ser analisado para backlog |
| **HEALTH-PERIODICO** | HealthScore recalculado semanalmente para produtos em Produção |
| **IMPLANTACAO-TREINAMENTO** | Toda Implantação deve ter Treinamento associado |

### 4.12 Triggers de Roteamento (Interface GENESIS)

```yaml
problema_que_resolve: "Como gerenciar ciclo completo de vida de Produtos"
triggers:
  - criar produto
  - novo produto
  - roadmap
  - épico
  - release
  - implantar
  - implantação
  - treinamento
  - customer success
  - health score
  - feedback
  - portfólio
  - lançar produto
exemplos_uso:
  - "quero criar um novo produto"
  - "mostrar roadmap do MS_Seleção"
  - "qual o health score dos clientes"
  - "registrar feedback do cliente X"
  - "ver portfólio de produtos"
```

### 4.13 Persistência (GitHub vs MongoDB)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PERSISTÊNCIA                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GITHUB (.md) - Definições            MONGODB - Instâncias/Transações       │
│  ─────────────────────────            ───────────────────────────────       │
│  Muda: evolução do framework          Muda: operações do dia-a-dia          │
│                                                                             │
│  docs/04_P/MS_Produto.md              Collection: produtos                  │
│  (como funciona o framework)          (cada produto real criado)            │
│                                                                             │
│  docs/04_P/templates/*.md             Collection: implantacoes              │
│  (checklists modelo)                  (checklist preenchido por cliente)    │
│                                                                             │
│  docs/04_P/playbooks/*.md             Collection: health_scores             │
│  (quando fazer o quê)                 (scores calculados, ações tomadas)    │
│                                                                             │
│  docs/04_P/treinamento/*.md           Collection: treinamentos              │
│  (materiais de capacitação)           (sessões agendadas/realizadas)        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### GitHub - Definições (muda com evolução)

| Arquivo | Conteúdo | Quando muda |
|---------|----------|-------------|
| `docs/04_P/MS_Produto.md` | Framework completo | Evolução do MS |
| `docs/04_P/templates/checklist_implantacao.md` | Modelo de checklist | Novo tipo de setup |
| `docs/04_P/playbooks/*.md` | Ações por situação CS | Novo cenário |
| `docs/04_P/treinamento/*.md` | Materiais base | Novo conteúdo |

#### MongoDB - Instâncias (muda com operação)

| Collection | Documento | Quando muda |
|------------|-----------|-------------|
| `produtos` | `{ id, nome, dor_cliente, estagio, owner, epicos[], releases[] }` | Cria produto, avança estágio |
| `epicos` | `{ id, produto_ref, titulo, status, backlog_items[], release_alvo }` | Cria épico, vincula items |
| `releases` | `{ versao, produto_ref, tipo, changelog, status, data_publicacao }` | Nova release, publica |
| `implantacoes` | `{ id, produto_ref, release_ref, cliente, checklist[], status }` | Nova implantação, marca items |
| `treinamentos` | `{ id, implantacao_ref, tipo, materiais[], sessoes[], status }` | Agenda sessão, conclui |
| `health_scores` | `{ id, produto_ref, cliente, score, indicadores[], tendencia }` | Cálculo periódico |
| `feedbacks` | `{ id, produto_ref, tipo, conteudo, sentimento, status, backlog_item_ref }` | Novo feedback, processa |

#### Extensões em Collections Existentes

| Collection | Campos adicionados |
|------------|-------------------|
| `backlog_items` | `+epico_ref`, `+rice_score`, `+rice_*`, `+feedback_origem` |
| `sprints` | `+release_ref`, `+produto_ref` |

#### Regra de Ouro

```
SE é DEFINIÇÃO (como fazer, template, playbook) → GitHub
SE é INSTÂNCIA (dado real, transação, estado) → MongoDB
```

---

## Próximos Passos

| Etapa | Ação | Status |
|-------|------|--------|
| M0 | Problema definido | ✅ Aprovado |
| M1 | Marco Teórico | ✅ Aprovado |
| M2 | Objeto (fronteiras) | ✅ Aprovado |
| M3 | Classe (atributos, métodos) | 🔄 Aguardando aprovação |
| M4 | Documento final | ⬜ |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-09 | M0 criado - Problema, Glossário, Tese, Escopo |
| 0.2 | 2025-12-09 | M1 criado - Ontologia interna, externa, síntese |
| 0.3 | 2025-12-09 | M2 criado - Fronteiras, componentes, relações |
| 0.4 | 2025-12-09 | M3 criado - Classes completas, métodos, extensões, invariantes |
| 0.4.1 | 2025-12-09 | M3 adicionado - Seção 4.13 Persistência (GitHub vs MongoDB) |

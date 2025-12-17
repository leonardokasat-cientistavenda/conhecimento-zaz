# MS_Sprint v1.0

---

```yaml
nome: MS_Sprint
versao: "1.0"
tipo: Meta Sistema
status: Publicado
camada: 4
dominio: Execução
data_publicacao: "2025-12-17"
depende_de:
  - docs/04_B/MS_Backlog.md
  - docs/04_P/MS_Produto.md
```

---

## 1. Propósito

> **MS_Sprint é o Meta Sistema que gerencia ciclos finitos de execução, transformando a fila infinita do MS_Backlog em trabalho estruturado com visibilidade, pausabilidade e rastreabilidade.**

### 1.1 Metáfora

```
MS_Backlog = Prateleira do supermercado (infinita, organizada)
MS_Sprint  = Carrinho de compras (finito, selecionado, em movimento)
```

### 1.2 Problemas que Resolve

| Dor | Solução |
|-----|---------|
| Falta visibilidade da fila | Relatórios consolidados |
| Não sei o que está travado | Identificação de bloqueios |
| Não sei quanto tempo leva | Gestão de esforço estimado/realizado |
| Preciso pausar e continuar | Pausa/retomada com contexto |
| Claude esquece entre sessões | Persistência em MongoDB |
| Sprint muda durante execução | Controle de variação de escopo |
| Não sei quais comandos usar | Guia auto-explicativo |

### 1.3 Escopo

| MS_Sprint FAZ | MS_Sprint NÃO FAZ |
|---------------|-------------------|
| Seleciona itens do MS_Backlog | Armazena fila completa |
| Gerencia sessão de trabalho | Executa lógica de domínio |
| Subdivide itens em tasks | Processa conteúdo dos itens |
| Persiste estado entre conversas | Define prioridade absoluta |
| Gera relatórios consolidados | Resolve bloqueios |
| Controla mutações de escopo | Autenticar usuários |
| Explica comandos disponíveis | Rotear entre sistemas |

---

## 2. Modelo de Operação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_SPRINT: CICLO FINITO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         MS_BACKLOG                                  │    │
│  │                    (Prateleira - Infinita)                          │    │
│  │                    Collection: backlog_items                        │    │
│  │                                                                     │    │
│  │  [item_001] [item_002] [item_003] [item_004] ...                    │    │
│  │                                                                     │    │
│  └──────────────────────────┬──────────────────────────────────────────┘    │
│                             │                                               │
│                             │ selecionar / adicionar                        │
│                             ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         MS_SPRINT                                   │    │
│  │                    (Carrinho - Finito)                              │    │
│  │                    Collection: sprint_sessions                      │    │
│  │                                                                     │    │
│  │  SprintSession {                                                    │    │
│  │    items: [item_001]                                                │    │
│  │    tasks: [T01 ✅, T02 🔄, T03 ⬜]                                   │    │
│  │    escopo_inicial → mudancas_escopo → escopo_final                  │    │
│  │  }                                                                  │    │
│  │                                                                     │    │
│  └──────────────────────────┬──────────────────────────────────────────┘    │
│                             │                                               │
│                             │ gera                                          │
│                             ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        RELATÓRIOS                                   │    │
│  │  Backlog │ Sprint │ Saga │ Velocidade │ Bloqueios │ Variação        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Estados da Sessão

```
                    iniciar()
        ┌─────────────────────────────┐
        │                             │
        ▼                             │
   ┌─────────┐    pausar()    ┌───────┴───┐
   │  ATIVA  │ ─────────────► │  PAUSADA  │
   └────┬────┘                └─────┬─────┘
        │                          │
        │ concluir()               │ retomar()
        ▼                          │
   ┌──────────┐                    │
   │CONCLUÍDA │ ◄──────────────────┘
   └──────────┘
```

### 2.2 Estados da Task

```
⬜ pendente ──iniciar()──► 🔄 em_andamento ──concluir()──► ✅ concluida
     │                           │
     │ deprecar()                │ deprecar()
     └───────────► ❌ deprecada ◄┘
```

### 2.3 Granularidade: Item vs Task

```
MS_BACKLOG (O QUÊ entregar)         MS_SPRINT (COMO executar)
───────────────────────────         ────────────────────────

BacklogItem {                       SprintSession {
  id: "bkl_001",                      items: ["bkl_001"],
  titulo: "Criar MS_Sprint",          tasks: [
  tipo: ciclo_epistemologico            { T01, "M0-M3", ✅ },
}                                       { T02, "M4 doc", 🔄 },
                                        { T03, "Deprecar", ⬜ }
                                      ]
                                    }

Tasks são DETALHE DE EXECUÇÃO, não itens de backlog.
```

---

## 3. Relações

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RELAÇÕES MS_SPRINT                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_BACKLOG ◄────────────────┐                                              │
│  (backlog_items)             │                                              │
│  • Fonte de itens            │                                              │
│  • Recebe devoluções         │                                              │
│  • Recebe cancelamentos      │◄─────── MS_SPRINT ───────► MongoDB           │
│                              │        (sprint_sessions)   (persistência)    │
│  MS_PRODUTO ◄────────────────┤                                              │
│  • Fonte de saga/produto     │                                              │
│  • Consulta apenas           │                                              │
│                              │                                              │
│  GENESIS ◄───────────────────┘                                              │
│  • Carrega sessão no bootstrap                                              │
│  • Exibe contexto de pausa                                                  │
│                                                                             │
│  HUMANO                                                                     │
│  • Comandante (pausar/retomar/adicionar/remover)                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classes

### 4.1 Task

```yaml
Task:
  # Core
  codigo: String                    # T01, T02, etc.
  titulo: String                    # Descrição curta
  descricao: String?                # Detalhamento opcional
  status: Enum                      # pendente | em_andamento | concluida | deprecada
  item_ref: String                  # BacklogItem pai
  
  # Estimativa
  esforco_estimado_horas: Number?
  esforco_realizado: [{
    user_id: String?,               # null = usuário único
    horas: Number,
    data: DateTime
  }]
  
  # Temporal
  iniciada_em: DateTime?
  concluida_em: DateTime?
  deprecada_em: DateTime?
  
  # Resultado
  artefatos: [String]               # Paths de arquivos
  notas: String?
  motivo_deprecacao: String?
```

### 4.2 SprintSession

```yaml
SprintSession:
  # Core
  _id: String
  titulo: String
  objetivo: String
  status: Enum                      # ativa | pausada | concluida
  items_selecionados: [String]      # IDs de BacklogItems (ativos)
  tasks: [Task]
  
  # Controle de Escopo
  escopo_inicial: {
    items: [String],
    tasks: [{ codigo, titulo }],
    capturado_em: DateTime
  }
  mudancas_escopo: [{
    tipo: "adicao" | "remocao" | "deprecacao",
    item_id: String?,
    task_codigo: String?,
    motivo: String,
    timestamp: DateTime,
    user_id: String?
  }]
  items_deprecados: [{ item_id, motivo, deprecado_em }]
  items_removidos: [{ item_id, motivo, removido_em }]
  
  # Responsabilidade (porta multi-user)
  responsavel_id: String?           # null = usuário único
  participantes: [{
    user_id: String,
    papel: "executor" | "revisor",
    esforco_total_horas: Number
  }]?
  
  # Progresso
  progresso: {
    tasks_completadas: Number,
    tasks_em_andamento: Number,
    tasks_pendentes: Number,
    tasks_deprecadas: Number,
    tasks_total: Number,
    percentual: Number
  }
  task_atual: String?
  bloqueios: [{ task_codigo, motivo, desde }]
  
  # Sessão
  contexto_pausa: String?
  historico_acoes: [{ acao, timestamp, detalhes, user_id? }]
  
  # Temporal
  created_at: DateTime
  updated_at: DateTime
  pausado_em: DateTime?
  concluido_em: DateTime?
  
  # Esforço Consolidado
  esforco_estimado_total: Number
  esforco_realizado_total: Number
  esforco_por_usuario: [{ user_id?, horas }]
```

### 4.3 MS_Sprint (Gerenciador)

```yaml
MS_Sprint:
  # Atributos
  sessao_ativa: SprintSession?      # Máx 1 (WIP limit)
  backlog: MS_Backlog               # Dependência
  produto: MS_Produto               # Dependência
  comandos: [Comando]               # Catálogo
  
  # Ciclo de Vida
  iniciar(titulo, objetivo, items[], tasks[]?): SprintSession
  pausar(contexto): void
  retomar(): SprintSession
  concluir(): void
  
  # Mutação de Escopo
  adicionar_item(item_id, motivo): void
  remover_item(item_id, motivo): void
  deprecar_item(item_id, motivo): void
  
  # Task
  adicionar_task(item_id, task, motivo?): void
  iniciar_task(codigo): void
  concluir_task(codigo, resultado?): void
  deprecar_task(codigo, motivo): void
  registrar_esforco(codigo, horas, user_id?): void
  bloquear_task(codigo, motivo): void
  desbloquear_task(codigo): void
  
  # Relatório
  relatorio_backlog(): RelatorioBacklog
  relatorio_sprint(): RelatorioSprint
  relatorio_saga(saga_id): RelatorioSaga
  relatorio_velocidade(periodo?): RelatorioVelocidade
  relatorio_bloqueios(): RelatorioBloqueios
  relatorio_variacao(): RelatorioVariacaoEscopo
  
  # Sessão
  carregar_sessao(): SprintSession?
  existe_sessao_ativa(): Boolean
  
  # Ajuda
  ajuda(comando?): String
```

---

## 5. Guia do Usuário

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    "genesis sprint ajuda"                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📋 GERENCIAR SPRINT                                                        │
│  • iniciar    → Criar nova sprint com itens do backlog                      │
│  • pausar     → Salvar contexto e interromper                               │
│  • retomar    → Continuar sprint pausada                                    │
│  • concluir   → Finalizar sprint e gerar retrospectiva                      │
│                                                                             │
│  📦 GERENCIAR ESCOPO                                                        │
│  • adicionar  → Puxar item do backlog para sprint                           │
│  • remover    → Devolver item ao backlog                                    │
│  • deprecar   → Cancelar item (não volta ao backlog)                        │
│                                                                             │
│  ✅ GERENCIAR TASKS                                                         │
│  • nova-task     → Adicionar task a um item                                 │
│  • task-iniciar  → Começar trabalho em task                                 │
│  • task-concluir → Marcar task como feita                                   │
│  • task-bloquear → Registrar impedimento                                    │
│  • task-deprecar → Cancelar task                                            │
│  • esforco       → Registrar horas trabalhadas                              │
│                                                                             │
│  📊 RELATÓRIOS                                                              │
│  • status     → Progresso da sprint atual                                   │
│  • backlog    → Visão da fila de trabalho                                   │
│  • bloqueios  → Itens/tasks travados                                        │
│  • saga       → Pipeline completo de uma dor                                │
│  • velocidade → Histórico de entregas                                       │
│  • variacao   → Mudanças de escopo na sprint                                │
│                                                                             │
│  ❓ AJUDA                                                                    │
│  • ajuda         → Esta lista de comandos                                   │
│  • ajuda <cmd>   → Detalhes de um comando específico                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Exemplos:                                                                  │
│  • genesis sprint iniciar "S021" "Criar MS_Sprint"                          │
│  • genesis sprint adicionar BKL-042 "dependência descoberta"                │
│  • genesis sprint task-concluir T02 2.5 "validado"                          │
│  • genesis sprint status                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.1 Comandos Detalhados

| Comando | Alias | Sintaxe | Pré-condição |
|---------|-------|---------|--------------|
| **iniciar** | start, nova | `iniciar "<titulo>" "<objetivo>"` | Nenhuma sprint ativa |
| **pausar** | pause, salvar | `pausar "<contexto>"` | Sprint ativa |
| **retomar** | resume, continuar | `retomar` | Sprint pausada |
| **concluir** | finish, fechar | `concluir` | Sprint ativa |
| **adicionar** | add, puxar | `adicionar <item_id> "<motivo>"` | Sprint ativa |
| **remover** | remove, devolver | `remover <item_id> "<motivo>"` | Sprint ativa |
| **deprecar** | cancelar | `deprecar <item_id> "<motivo>"` | Sprint ativa |
| **nova-task** | task | `nova-task <item_id> "<titulo>" [horas]` | Sprint ativa |
| **task-iniciar** | começar | `task-iniciar <codigo>` | Sprint ativa |
| **task-concluir** | done | `task-concluir <codigo> [horas] ["notas"]` | Sprint ativa |
| **task-bloquear** | impedimento | `task-bloquear <codigo> "<motivo>"` | Sprint ativa |
| **task-deprecar** | task-cancelar | `task-deprecar <codigo> "<motivo>"` | Sprint ativa |
| **esforco** | horas, tempo | `esforco <codigo> <horas>` | Sprint ativa |
| **status** | progresso | `status` | Sprint ativa/pausada |
| **backlog** | fila | `backlog` | - |
| **bloqueios** | impedimentos | `bloqueios` | - |
| **saga** | pipeline | `saga <saga_id>` | - |
| **velocidade** | historico | `velocidade [periodo]` | - |
| **variacao** | escopo | `variacao` | Sprint ativa/pausada |
| **ajuda** | help, ? | `ajuda [comando]` | - |

---

## 6. Relatórios

### 6.1 RelatorioBacklog

```yaml
fonte: MS_Backlog (backlog_items)
pergunta: "O que temos para fazer?"

conteudo:
  resumo: { pendentes, bloqueados, em_progresso }
  por_prioridade: { alta, media, baixa }
  por_tipo: { ciclo_epistemo, desenvolvimento, ... }
  bloqueados: [{ id, titulo, motivo, dias_bloqueado }]
  idade_media_dias: Number
  proximos_sugeridos: [{ id, titulo, score_prioridade }]
```

### 6.2 RelatorioSprint

```yaml
fonte: MongoDB (sprint_sessions)
pergunta: "Como está o trabalho atual?"

conteudo:
  sessao: { titulo, objetivo, status }
  progresso: { tasks_completadas, em_andamento, pendentes, deprecadas, percentual }
  tasks: [{ codigo, titulo, status, esforco_estimado, esforco_realizado }]
  burndown: { estimado_horas, realizado_horas, restante_horas }
  bloqueios: [{ task_codigo, motivo, dias_bloqueado }]
  tempo_sessao: { inicio, tempo_ativo_horas, pausas }
```

### 6.3 RelatorioVariacaoEscopo

```yaml
fonte: SprintSession
pergunta: "O que mudou entre início e fim da sprint?"

conteudo:
  escopo_inicial: { items, tasks_total, esforco_estimado }
  escopo_final: { items, tasks_total, esforco_estimado }
  variacoes:
    items_adicionados: [{ id, titulo, motivo, quando }]
    items_removidos: [{ id, titulo, motivo, quando }]
    items_deprecados: [{ id, titulo, motivo, quando }]
    tasks_adicionadas: [{ codigo, titulo, item_id, quando }]
    tasks_deprecadas: [{ codigo, titulo, motivo, quando }]
  metricas:
    delta_items: Number
    delta_tasks: Number
    taxa_variacao: Number       # % de mudança
    estabilidade: "alta" | "media" | "baixa"
  timeline: [{ timestamp, tipo, descricao }]
```

### 6.4 RelatorioSaga

```yaml
fonte: MS_Backlog + MS_Produto
pergunta: "Como está o fluxo completo de uma dor?"

conteudo:
  saga_id: String
  origem: { dor, prontuario_ref }
  produto: { id, titulo, status }
  features: [{ id, titulo, status, criterios_atingidos, criterios_total }]
  pipeline: [{ etapa, status, tempo_horas, item_id }]
  gargalo: { etapa, motivo, sugestao }?
  lead_time: { inicio, atual, estimativa_fim }
```

### 6.5 RelatorioVelocidade

```yaml
fonte: MongoDB (histórico sprint_sessions)
pergunta: "Qual nossa capacidade de entrega?"

conteudo:
  periodo: { inicio, fim }
  sprints_concluidas: Number
  items_entregues: Number
  tasks_completadas: Number
  horas_trabalhadas: Number
  medias:
    items_por_sprint: Number
    tasks_por_sprint: Number
    horas_por_item: Number
    horas_por_task: Number
  tendencia: "subindo" | "estavel" | "descendo"
```

### 6.6 RelatorioBloqueios

```yaml
fonte: MS_Backlog + MS_Sprint
pergunta: "O que está travando o desenvolvimento?"

conteudo:
  total_bloqueados: Number
  por_origem: { backlog, sprint }
  por_tipo_bloqueio: { dependencia_externa, aguardando_aprovacao, falta_informacao, tecnico }
  mais_antigos: [{ id, titulo, origem, dias_bloqueado, motivo }]
  sugestoes: [{ bloqueio_id, acao_sugerida }]
```

---

## 7. Persistência

### 7.1 MongoDB

```yaml
database: genesis

collection: sprint_sessions
  _id: ObjectId
  # ... (SprintSession completo)

indices:
  - { status: 1 }                # Buscar sessão ativa/pausada
  - { created_at: -1 }           # Ordenar por recência
  - { responsavel_id: 1 }        # Futuro: filtrar por usuário
```

### 7.2 GitHub

```yaml
docs/04_S/MS_Sprint.md              # Este documento
docs/04_S/MS_Sprint_Arquitetura.md  # Contratos técnicos (a criar)
```

---

## 8. Invariantes

| Invariante | Descrição |
|------------|-----------|
| **WIP-SESSAO** | Máx 1 sessão ativa ou pausada por vez |
| **ITEMS-VALIDOS** | Todos items_selecionados devem existir no MS_Backlog |
| **TASK-UNICA** | Código de task único dentro da sessão |
| **TRANSICAO-VALIDA** | Status só transita conforme state machine |
| **CONTEXTO-PAUSA** | Pausar exige contexto para retomada |
| **HISTORICO-IMUTAVEL** | Ações registradas não podem ser alteradas |
| **ESFORCO-POSITIVO** | Horas registradas devem ser > 0 |
| **ESCOPO-RASTREAVEL** | Toda mutação de escopo registrada |
| **MOTIVO-OBRIGATORIO** | Mutações de escopo exigem justificativa |

---

## 9. Dependências e Impactos

### 9.1 MS_Backlog (ALTO IMPACTO)

**Novos métodos de consulta necessários:**

```yaml
# Para RelatorioBacklog, RelatorioSaga
listar_saga(saga_id): [BacklogItem]
metricas_fila(): { total, por_status, por_tipo, por_prioridade }
itens_bloqueados(): [{ item, motivo, dependencia_de }]
lead_time(item_id): { inicio, fim, duracao_horas }
pipeline_saga(saga_id): [{ etapa, status, tempo_horas, item_id }]

# Para mutação de escopo
devolver(item_id): void     # Quando MS_Sprint.remover_item()
cancelar(item_id): void     # Quando MS_Sprint.deprecar_item()
```

**Atualização em MS_Backlog_Arquitetura.md:**
- Adicionar seção "Interface MS_Sprint"
- Documentar métodos de consulta
- Documentar métodos de notificação

### 9.2 GENESIS (MÉDIO IMPACTO)

**Comportamento no bootstrap:**

```python
# Ao iniciar conversa
sessao = MS_Sprint.carregar_sessao()
if sessao and sessao.status == "pausada":
    exibir_contexto_pausa(sessao)
    perguntar_se_deseja_retomar()
```

**Atualização em GENESIS.md:**
- Adicionar seção "Integração com MS_Sprint"
- Documentar comportamento de bootstrap

### 9.3 MS_Produto (BAIXO IMPACTO)

- Apenas consulta (leitura)
- Não requer modificações
- MS_Sprint consome dados de saga/produto/feature

### 9.4 Legacy (DEPRECAR)

| Arquivo | Ação |
|---------|------|
| docs/00_I/00_I_2_2_Sprint.md | Deprecar → mover para _deprecated/ |
| docs/00_I/00_I_2_Gestao_Projetos.md | Deprecar → mover para _deprecated/ |

---

## 10. Quem Sabe O Quê (SSOT)

| Métrica | SSOT | Consultado por |
|---------|------|----------------|
| Itens na fila | MS_Backlog | MS_Sprint |
| Status do item | MS_Backlog | MS_Sprint |
| Saga completa | MS_Backlog | MS_Sprint |
| Tasks de execução | **MS_Sprint** | - |
| Tempo real gasto | **MS_Sprint** | - |
| Bloqueios na fila | MS_Backlog | MS_Sprint |
| Bloqueios na execução | **MS_Sprint** | - |
| Velocidade histórica | **MS_Sprint** | - |
| Variação de escopo | **MS_Sprint** | - |
| Produto/Feature | MS_Produto | MS_Sprint |

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_B/MS_Backlog.md | Fonte de itens |
| docs/04_B/MS_Backlog_Arquitetura.md | Contratos backlog |
| docs/04_P/MS_Produto.md | Fonte de saga/produto |
| genesis/GENESIS.md | Consumidor |
| _drafts/S021/M0-M3_MS_Sprint.md | Epistemologia completa |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-17 | Criação inicial. Task como entidade de execução. 6 relatórios. Controle de variação de escopo. Guia do usuário com 17 comandos. Porta para multi-user. Sprint S021. |

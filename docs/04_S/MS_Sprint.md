# MS_Sprint v1.2

---

```yaml
nome: MS_Sprint
versao: "1.2"
tipo: Meta Sistema
status: Publicado
camada: 4
dominio: Execução
data_publicacao: "2026-01-06"
depende_de:
  - docs/04_B/MS_Backlog.md
  - docs/04_P/MS_Produto.md
protocolos:
  - docs/04_S/PROTOCOLO_AGENT_LOOP.md
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
| Task gera trabalho adicional | Auto-pull de filhos do backlog (v1.1) |

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
| Puxa filhos automaticamente (v1.1) | Armazenar origem (isso é Backlog) |

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
│                             │ selecionar / adicionar / listar_filhos (v1.1) │
│                             ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         MS_SPRINT                                   │    │
│  │                    (Carrinho - Finito)                              │    │
│  │                    Collection: sprint_sessions                      │    │
│  │                                                                     │    │
│  │  SprintSession {                                                    │    │
│  │    items: [item_001]                                                │    │
│  │    tasks: [T01 ✅, T01.1 🔄, T02 ⬜]  ← hierarquia (v1.1)           │    │
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
     │                           │                              │
     │ deprecar()                │ deprecar()                   │ (v1.1)
     └───────────► ❌ deprecada ◄┘                              ▼
                                                          consulta filhos
                                                          cria subtasks
```

### 2.3 Granularidade: Item vs Task

```
MS_BACKLOG (O QUÊ entregar)         MS_SPRINT (COMO executar)
───────────────────────────         ────────────────────────

BacklogItem {                       SprintSession {
  id: "bkl_001",                      items: ["bkl_001"],
  titulo: "Criar MS_Sprint",          tasks: [
  tipo: ciclo_epistemologico            { T01, "M0-M3", ✅ },
}                                       { T01.1, "Validar", 🔄 },  ← subtask (v1.1)
                                        { T02, "M4 doc", ⬜ }
BacklogItem {                         ]
  id: "bkl_042",                    }
  origem: {
    sprint_id: "S022",            T01.1 veio de bkl_042 que tinha
    task_codigo: "T01",           origem.sprint_id=S022, task_codigo=T01
    auto_pull: true
  }
}

Tasks são DETALHE DE EXECUÇÃO, não itens de backlog.
Subtasks derivam de BacklogItems com origem na sprint/task.
```

---

## 3. Relações

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RELAÇÕES MS_SPRINT v1.1                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_BACKLOG ◄────────────────┐                                              │
│  (backlog_items)             │                                              │
│  • Fonte de itens            │                                              │
│  • Recebe devoluções         │                                              │
│  • Recebe cancelamentos      │◄─────── MS_SPRINT ───────► MongoDB           │
│  • listar_filhos() (v1.1)    │        (sprint_sessions)   (persistência)    │
│  • transferir_para_sprint()  │                                              │
│                              │                                              │
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
│  • Decide sobre filhos com auto_pull=false (v1.1)                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classes

### 4.1 Task

```yaml
Task:
  # Core
  codigo: String                    # T01, T01.1, T02, etc.
  titulo: String                    # Descrição curta
  descricao: String?                # Detalhamento opcional
  status: Enum                      # pendente | em_andamento | concluida | deprecada
  item_ref: String                  # BacklogItem pai
  
  # Hierarquia (v1.1 Novo)
  task_pai: String?                 # Código da task pai (ex: "T01" para T01.1)
  backlog_item_origem: String?      # ID do BacklogItem que gerou esta subtask
  nivel: Number                     # 0 = raiz, 1 = subtask, 2 = sub-subtask
  
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
  
  # Filhos puxados (v1.1 Novo)
  filhos_puxados: [{                # Subtasks criadas ao concluir
    subtask_codigo: String,         # T01.1
    backlog_item_id: String,        # BKL-042
    auto_pull: Boolean,
    puxado_em: DateTime
  }]
```

### 4.2 SprintSession

```yaml
SprintSession:
  # Core
  _id: String
  codigo: String                    # S022 (v1.1)
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
    tipo: "adicao" | "remocao" | "deprecacao" | "subtask_auto",  # v1.1: subtask_auto
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
    percentual: Number,
    subtasks_auto_puxadas: Number   # v1.1
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
  concluir_task(codigo, resultado?): void     # v1.1: agora consulta filhos
  deprecar_task(codigo, motivo): void
  registrar_esforco(codigo, horas, user_id?): void
  bloquear_task(codigo, motivo): void
  desbloquear_task(codigo): void
  
  # Hierarquia de Tasks (v1.1 Novo)
  gerar_codigo_subtask(task_pai): String      # T01 → T01.1, T01.2
  puxar_filho(backlog_item_id, task_pai): Task
  listar_subtasks(task_pai): [Task]
  
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

## 5. Fluxo: task-concluir com Consulta de Filhos (v1.1)

### 5.1 Diagrama de Sequência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              FLUXO: task-concluir COM CONSULTA DE FILHOS                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Humano          MS_Sprint              MS_Backlog              MongoDB     │
│    │                │                       │                       │       │
│    │ task-concluir  │                       │                       │       │
│    │ T01            │                       │                       │       │
│    │───────────────►│                       │                       │       │
│    │                │                       │                       │       │
│    │                │ update T01            │                       │       │
│    │                │ status=concluida      │                       │       │
│    │                │──────────────────────────────────────────────►│       │
│    │                │                       │                       │       │
│    │                │ listar_filhos(S022, T01)                      │       │
│    │                │──────────────────────►│                       │       │
│    │                │                       │ find origem...        │       │
│    │                │                       │──────────────────────►│       │
│    │                │                       │◄──────────────────────│       │
│    │                │◄──────────────────────│                       │       │
│    │                │ [{BKL-042, auto:true},│                       │       │
│    │                │  {BKL-043, auto:false}]                       │       │
│    │                │                       │                       │       │
│    │                │                       │                       │       │
│    │                │ ┌─────────────────────────────────────────┐   │       │
│    │                │ │ PARA CADA filho:                        │   │       │
│    │                │ │                                         │   │       │
│    │                │ │ SE auto_pull=true:                      │   │       │
│    │                │ │   transferir_para_sprint(BKL-042,S022,T01)   │       │
│    │                │ │──────────────────────►│                 │   │       │
│    │                │ │                       │ update status   │   │       │
│    │                │ │                       │────────────────►│   │       │
│    │                │ │◄──────────────────────│                 │   │       │
│    │                │ │                       │                 │   │       │
│    │                │ │   gerar_codigo_subtask(T01) → T01.1     │   │       │
│    │                │ │                       │                 │   │       │
│    │                │ │   insert subtask T01.1                  │   │       │
│    │                │ │──────────────────────────────────────────►  │       │
│    │                │ │                       │                 │   │       │
│    │                │ │ SE auto_pull=false:                     │   │       │
│    │                │ │   adicionar à lista pendente_confirmacao│   │       │
│    │                │ └─────────────────────────────────────────┘   │       │
│    │                │                       │                       │       │
│    │◄───────────────│                       │                       │       │
│    │ "T01 concluída.│                       │                       │       │
│    │  Puxado auto:  │                       │                       │       │
│    │  • T01.1 Validar spec                  │                       │       │
│    │                │                       │                       │       │
│    │  Aguardando confirmação:               │                       │       │
│    │  • BKL-043 Aprovação externa           │                       │       │
│    │    [puxar] [ignorar]"                  │                       │       │
│    │                │                       │                       │       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Algoritmo concluir_task() Estendido

```python
def concluir_task(codigo: str, resultado: dict = None):
    """
    Conclui task e consulta filhos no backlog.
    v1.1: Implementa auto-pull de subtasks.
    """
    
    # 1. Marcar task como concluída
    task = sessao.tasks.find(codigo)
    task.status = "concluida"
    task.concluida_em = datetime.now()
    task.notas = resultado.get("notas") if resultado else None
    
    # 2. Consultar filhos no MS_Backlog
    filhos = MS_Backlog.listar_filhos(
        sprint_id=sessao.codigo,
        task_codigo=codigo
    )
    
    # 3. Processar cada filho
    subtasks_criadas = []
    pendentes_confirmacao = []
    
    for filho in filhos:
        if filho.origem.auto_pull:
            # 3a. Auto-pull: transferir e criar subtask
            MS_Backlog.transferir_para_sprint(
                item_id=filho.id,
                sprint_id=sessao.codigo,
                task_pai=codigo
            )
            
            subtask_codigo = gerar_codigo_subtask(codigo)
            subtask = Task(
                codigo=subtask_codigo,
                titulo=filho.titulo,
                status="pendente",
                item_ref=filho.id,
                task_pai=codigo,
                backlog_item_origem=filho.id,
                nivel=task.nivel + 1
            )
            sessao.tasks.append(subtask)
            
            # Registrar no histórico
            task.filhos_puxados.append({
                "subtask_codigo": subtask_codigo,
                "backlog_item_id": filho.id,
                "auto_pull": True,
                "puxado_em": datetime.now()
            })
            
            subtasks_criadas.append(subtask)
            
            # Registrar mudança de escopo
            sessao.mudancas_escopo.append({
                "tipo": "subtask_auto",
                "task_codigo": subtask_codigo,
                "item_id": filho.id,
                "motivo": f"Auto-pull de {codigo}",
                "timestamp": datetime.now()
            })
        else:
            # 3b. Requer confirmação humana
            pendentes_confirmacao.append(filho)
    
    # 4. Atualizar progresso
    sessao.progresso.subtasks_auto_puxadas += len(subtasks_criadas)
    atualizar_progresso(sessao)
    
    # 5. Persistir
    db.sprint_sessions.update_one(...)
    
    # 6. Retornar resultado para notificação
    return {
        "task_concluida": codigo,
        "subtasks_criadas": subtasks_criadas,
        "pendentes_confirmacao": pendentes_confirmacao
    }


def gerar_codigo_subtask(task_pai: str) -> str:
    """
    Gera próximo código de subtask.
    T01 → T01.1, T01.2, ...
    T01.1 → T01.1.1, T01.1.2, ...
    """
    
    # Buscar subtasks existentes
    existentes = [t for t in sessao.tasks if t.task_pai == task_pai]
    proximo_numero = len(existentes) + 1
    
    return f"{task_pai}.{proximo_numero}"
```

### 5.3 Invariantes do Fluxo

| Invariante | Descrição |
|------------|-----------|
| **AUTO-PULL-RESPEITADO** | Nunca puxa auto_pull=false sem confirmação |
| **HIERARQUIA-CODIGO** | Subtask deriva código do pai (T01 → T01.1) |
| **TRANSFERENCIA-ATOMICA** | Atualiza backlog + cria subtask em transação |
| **SSOT-BACKLOG** | Origem persiste apenas no BacklogItem |
| **NOTIFICACAO-OBRIGATORIA** | Humano sempre informado de mudanças |

---

## 6. Guia do Usuário

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
│  • task-concluir → Marcar task como feita (puxa filhos auto)  ◄─ v1.1       │
│  • task-bloquear → Registrar impedimento                                    │
│  • task-deprecar → Cancelar task                                            │
│  • esforco       → Registrar horas trabalhadas                              │
│  • puxar-filho   → Confirmar filho pendente como subtask      ◄─ v1.1       │
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
│  • genesis sprint iniciar "S022" "Criar MS_Sprint"                          │
│  • genesis sprint adicionar BKL-042 "dependência descoberta"                │
│  • genesis sprint task-concluir T01    ← consulta e puxa filhos auto        │
│  • genesis sprint puxar-filho BKL-043  ← confirma filho pendente            │
│  • genesis sprint status                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.1 Comandos Detalhados

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
| **puxar-filho** | confirmar | `puxar-filho <item_id>` | Sprint ativa, filho pendente |
| **status** | progresso | `status` | Sprint ativa/pausada |
| **backlog** | fila | `backlog` | - |
| **bloqueios** | impedimentos | `bloqueios` | - |
| **saga** | pipeline | `saga <saga_id>` | - |
| **velocidade** | historico | `velocidade [periodo]` | - |
| **variacao** | escopo | `variacao` | Sprint ativa/pausada |
| **ajuda** | help, ? | `ajuda [comando]` | - |

### 6.2 Comando task-concluir Detalhado (v1.1)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    "genesis sprint ajuda task-concluir"                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SINTAXE                                                                    │
│  genesis sprint task-concluir <codigo> [horas] ["notas"]                    │
│                                                                             │
│  DESCRIÇÃO                                                                  │
│  Marca task como concluída e consulta MS_Backlog por filhos                 │
│  (BacklogItems com origem nesta sprint/task).                               │
│                                                                             │
│  COMPORTAMENTO v1.1                                                         │
│  1. Marca task como concluída                                               │
│  2. Consulta MS_Backlog.listar_filhos(sprint_id, task_codigo)               │
│  3. Para filhos com auto_pull=true:                                         │
│     - Transfere para sprint                                                 │
│     - Cria subtask (T01 → T01.1)                                            │
│     - Notifica humano                                                       │
│  4. Para filhos com auto_pull=false:                                        │
│     - Lista para confirmação humana                                         │
│     - Aguarda comando puxar-filho                                           │
│                                                                             │
│  EXEMPLOS                                                                   │
│  • genesis sprint task-concluir T01                                         │
│    → "T01 concluída. Puxado: T01.1 (Validar spec)"                          │
│                                                                             │
│  • genesis sprint task-concluir T02 2.5 "validado com Leonardo"             │
│    → "T02 concluída (2.5h). Sem filhos pendentes."                          │
│                                                                             │
│  SAÍDA TÍPICA                                                               │
│  ┌────────────────────────────────────────────────────────────────┐         │
│  │ ✅ T01 concluída                                               │         │
│  │                                                                │         │
│  │ 📥 Subtasks criadas (auto-pull):                               │         │
│  │ • T01.1 - Validar spec MS_Sprint                               │         │
│  │ • T01.2 - Code review                                          │         │
│  │                                                                │         │
│  │ ⏳ Aguardando confirmação:                                      │         │
│  │ • BKL-043 - Aprovação externa do cliente                       │         │
│  │   [puxar-filho BKL-043] ou [ignorar]                           │         │
│  │                                                                │         │
│  │ Próxima task: T01.1                                            │         │
│  └────────────────────────────────────────────────────────────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Relatórios

### 7.1 RelatorioBacklog

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

### 7.2 RelatorioSprint

```yaml
fonte: MongoDB (sprint_sessions)
pergunta: "Como está o trabalho atual?"

conteudo:
  sessao: { codigo, titulo, objetivo, status }
  progresso: { 
    tasks_completadas, 
    em_andamento, 
    pendentes, 
    deprecadas, 
    percentual,
    subtasks_auto_puxadas     # v1.1
  }
  tasks: [{ 
    codigo, 
    titulo, 
    status, 
    esforco_estimado, 
    esforco_realizado,
    task_pai?,                # v1.1: hierarquia
    nivel                     # v1.1: 0=raiz, 1=subtask
  }]
  burndown: { estimado_horas, realizado_horas, restante_horas }
  bloqueios: [{ task_codigo, motivo, dias_bloqueado }]
  tempo_sessao: { inicio, tempo_ativo_horas, pausas }
  filhos_pendentes: [{ item_id, titulo, task_origem }]  # v1.1
```

### 7.3 RelatorioVariacaoEscopo

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
    subtasks_auto: [{ codigo, titulo, task_pai, quando }]  # v1.1
  metricas:
    delta_items: Number
    delta_tasks: Number
    taxa_variacao: Number       # % de mudança
    estabilidade: "alta" | "media" | "baixa"
  timeline: [{ timestamp, tipo, descricao }]
```

### 7.4 RelatorioSaga

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

### 7.5 RelatorioVelocidade

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

### 7.6 RelatorioBloqueios

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

## 8. Persistência

### 8.1 MongoDB

```yaml
database: genesis

collection: sprint_sessions
  _id: ObjectId
  codigo: String                # S022 (v1.1)
  # ... (SprintSession completo)

indices:
  - { status: 1 }               # Buscar sessão ativa/pausada
  - { codigo: 1 }               # Buscar por código (v1.1)
  - { created_at: -1 }          # Ordenar por recência
  - { responsavel_id: 1 }       # Futuro: filtrar por usuário
  - { "tasks.task_pai": 1 }     # v1.1: buscar subtasks
```

### 8.2 GitHub

```yaml
docs/04_S/MS_Sprint.md              # Este documento (Meta Sistema)
docs/04_S/MS_Sprint_Arquitetura.md  # Contratos técnicos
docs/04_S/PROTOCOLO_AGENT_LOOP.md   # Protocolo de execução autônoma (v1.2)
```

### 8.3 Estrutura de Pastas (v1.2)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ESTRUTURA DE PASTAS - SPRINTS E BACKLOG                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  conhecimento-zaz/                                                          │
│  ├── _backlog/                    # Specs de itens BKL-* pendentes          │
│  │   ├── BKL-P05_Sprint_v2.md                                               │
│  │   ├── BKL-GH-008_Testes.md                                               │
│  │   └── ...                                                                │
│  │                                                                          │
│  ├── _sprints/                    # Specs de sprints (ativas e concluídas)  │
│  │   ├── S-PANTHEON-003.md        # Sprint ativa                            │
│  │   ├── S024_Genesis_Hello.md    # Sprint concluída (histórico)            │
│  │   └── ...                                                                │
│  │                                                                          │
│  ├── _arquivo/                    # Documentos arquivados                   │
│  │   ├── sprints/                 # Sprints arquivadas                      │
│  │   │   └── S-XXX.md                                                       │
│  │   └── backlog/                 # BKL arquivados (promovidos/cancelados)  │
│  │       └── BKL-XXX.md                                                     │
│  │                                                                          │
│  └── docs/04_S/                   # Meta Sistema Sprint (este documento)    │
│      ├── MS_Sprint.md                                                       │
│      ├── MS_Sprint_Arquitetura.md                                           │
│      └── PROTOCOLO_AGENT_LOOP.md                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Ciclo de Vida de Documentos:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CICLO DE VIDA DE DOCUMENTOS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BACKLOG ITEM                                                               │
│  ┌─────────┐        promover()         ┌─────────────┐                      │
│  │_backlog/│ ─────────────────────────►│  _arquivo/  │                      │
│  │BKL-*.md │   (item vai pra sprint)   │backlog/*.md │                      │
│  └─────────┘                           └─────────────┘                      │
│                                                                             │
│  SPRINT                                                                     │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌─────────────┐      │
│  │ _sprints/│      │ _sprints/│      │ _sprints/│      │  _arquivo/  │      │
│  │ S-XXX.md │ ──►  │ S-XXX.md │ ──►  │ S-XXX.md │ ──►  │ sprints/    │      │
│  │  ativa   │      │  pausada │      │ concluida│      │  S-XXX.md   │      │
│  └──────────┘      └──────────┘      └──────────┘      └─────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.4 Vínculo Arquivo ↔ MongoDB (v1.2)

O arquivo `.md` da sprint em `_sprints/` deve conter referência ao documento no MongoDB:

```yaml
# No frontmatter YAML do arquivo _sprints/S-XXX.md
nome: S-PANTHEON-003
versao: "2.1"
tipo: Sprint
status: Ativa
mongodb_ref: "sprint_sessions.codigo = 'S-PANTHEON-003'"  # ← VÍNCULO
```

**Busca no MongoDB:**

```javascript
// Carregar sprint ativa pelo código
db.sprint_sessions.findOne({ 
  codigo: "S-PANTHEON-003",
  status: { $in: ["ativa", "pausada"] }
})

// Ou buscar qualquer sprint ativa
db.sprint_sessions.findOne({ 
  status: { $in: ["ativa", "pausada"] }
})
```

**Fluxo de Carregamento:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO: CARREGAR SPRINT                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. MongoDB primeiro (dados dinâmicos)                                      │
│     db.sprint_sessions.findOne({ status: { $in: ["ativa", "pausada"] } })   │
│                                                                             │
│  2. Se encontrou → usar dados do MongoDB                                    │
│     - Tasks, progresso, bloqueios, etc.                                     │
│                                                                             │
│  3. Se precisar de contexto extra → buscar arquivo                          │
│     github:get_file_contents("_sprints/{codigo}.md")                        │
│     - Objetivo detalhado, arquitetura target, notas                         │
│                                                                             │
│  4. Arquivo é OPCIONAL para execução                                        │
│     - MongoDB é SSOT para estado                                            │
│     - Arquivo é documentação complementar                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Invariantes

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
| **AUTO-PULL-RESPEITADO** | Nunca puxa auto_pull=false sem confirmação (v1.1) |
| **HIERARQUIA-CODIGO** | Subtask deriva código do pai (v1.1) |
| **SSOT-BACKLOG** | Origem persiste apenas no BacklogItem (v1.1) |
| **MONGODB-SSOT-ESTADO** | MongoDB é fonte de verdade para estado da sprint (v1.2) |

---

## 10. Dependências e Impactos

### 10.1 MS_Backlog (ALTO IMPACTO)

**Métodos utilizados (v1.1):**

```yaml
# Novos métodos (implementados em S022/T02)
listar_filhos(sprint_id, task_codigo?): [BacklogItem]
transferir_para_sprint(item_id, sprint_id, task_pai?): BacklogItem

# Métodos existentes
listar_saga(saga_id): [BacklogItem]
metricas_fila(): { total, por_status, por_tipo, por_prioridade }
itens_bloqueados(): [{ item, motivo, dependencia_de }]
devolver(item_id): void
cancelar(item_id): void
```

### 10.2 GENESIS (MÉDIO IMPACTO)

**Comportamento no bootstrap:**

```python
# Ao iniciar conversa
sessao = MS_Sprint.carregar_sessao()
if sessao and sessao.status == "pausada":
    exibir_contexto_pausa(sessao)
    perguntar_se_deseja_retomar()
```

### 10.3 MS_Produto (BAIXO IMPACTO)

- Apenas consulta (leitura)
- Não requer modificações
- MS_Sprint consome dados de saga/produto/feature

---

## 11. Quem Sabe O Quê (SSOT)

| Métrica | SSOT | Consultado por |
|---------|------|----------------|
| Itens na fila | MS_Backlog | MS_Sprint |
| Status do item | MS_Backlog | MS_Sprint |
| Saga completa | MS_Backlog | MS_Sprint |
| Origem do item (sprint/task) | **MS_Backlog** | MS_Sprint (v1.1) |
| Tasks de execução | **MS_Sprint** | - |
| Hierarquia de tasks | **MS_Sprint** | - |
| Tempo real gasto | **MS_Sprint** | - |
| Bloqueios na fila | MS_Backlog | MS_Sprint |
| Bloqueios na execução | **MS_Sprint** | - |
| Velocidade histórica | **MS_Sprint** | - |
| Variação de escopo | **MS_Sprint** | - |
| Produto/Feature | MS_Produto | MS_Sprint |
| Estado da sprint | **MongoDB** | Arquivo .md (v1.2) |

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_B/MS_Backlog.md | Fonte de itens, listar_filhos, transferir |
| docs/04_B/MS_Backlog_Arquitetura.md | Contratos backlog |
| docs/04_P/MS_Produto.md | Fonte de saga/produto |
| docs/04_S/PROTOCOLO_AGENT_LOOP.md | Protocolo de execução autônoma (v1.2) |
| genesis/GENESIS.md | Consumidor |
| _drafts/S021/M0-M3_MS_Sprint.md | Epistemologia completa |
| _drafts/S022/M0-M3_Sprint_Orquestrador.md | Epistemologia orquestrador |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-17 | Criação inicial. Task como entidade de execução. 6 relatórios. Controle de variação de escopo. Guia do usuário com 17 comandos. Porta para multi-user. Sprint S021. |
| 1.1 | 2025-12-17 | **Orquestrador de Receitas**: Task com hierarquia (task_pai, nivel, backlog_item_origem). concluir_task() consulta filhos via MS_Backlog.listar_filhos(). Auto-pull de subtasks. gerar_codigo_subtask(). Comando puxar-filho. Invariantes AUTO-PULL-RESPEITADO, HIERARQUIA-CODIGO, SSOT-BACKLOG. Sprint S022/T03. |
| 1.2 | 2026-01-06 | **Estrutura de Pastas**: Seções 8.3 e 8.4. Documentar ciclo de vida (_sprints/, _backlog/, _arquivo/). Vínculo arquivo ↔ MongoDB via mongodb_ref. Invariante MONGODB-SSOT-ESTADO. Referência ao PROTOCOLO_AGENT_LOOP.md. Sprint S-PANTHEON-003. |

# M0-M3: MS_Sprint como Orquestrador de Receitas

---

```yaml
sprint: S022
task: T01
status: concluido
data: 2025-12-17
```

---

## M0 - Problema

### Glossário Contextual

| Significante | Significado |
|--------------|-------------|
| **Receita** | Sequência ordenada de atividades que, juntas, entregam um resultado |
| **Agrupador** | Classe que agrupa atividades (Saga, Épico, Feature, Ciclo Epistemológico) |
| **Prato** | Entrega completa (pode ser simples ou elaborado) |
| **Componente** | Parte do prato (purê, salada, carne) - cada um com sua receita |
| **Ir às compras** | MS buscar autonomamente o que precisa para executar |
| **Filho** | BacklogItem gerado durante execução de uma task |

### Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FLUXO ATUAL (QUEBRADO)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Sprint S022 (aberta)                                                       │
│     │                                                                       │
│     ├── T01: M0-M3 Epistemologia ──► executa ──► produz spec                │
│     │                                    │                                  │
│     │                                    ▼                                  │
│     │                              "Validar spec" ──► BACKLOG (órfão)       │
│     │                                                      │                │
│     │   ┌──────────────────────────────────────────────────┘                │
│     │   │  Item de validação cai no backlog...                              │
│     │   │  Mas S022 não sabe que PRECISA dele!                              │
│     │   │  Humano tem que lembrar de puxar manualmente.                     │
│     │   └───────────────────────────────────────────────────                │
│     │                                                                       │
│     ├── T02: (bloqueada esperando validação que está no backlog)            │
│     └── ...                                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tese M0

> **MS_Sprint precisa evoluir para:**
> 1. Consultar filhos ao concluir uma task
> 2. Puxar automaticamente (auto_pull=true) ou notificar humano
> 3. Manter SSOT no MS_Backlog (Sprint apenas consulta/pede)

---

## M1 - Marco Teórico

### Fundamentos

| Conceito | Teoria | Aplicação no Problema |
|----------|--------|-----------------------|
| **Saga Pattern** | Garcia-Molina (1987) | Sequência de transações locais; Sprint como saga de tasks |
| **HTN** | Hierarchical Task Network (Erol 1994) | Decomposição hierárquica; T01 → T01.1, T01.2 |
| **DAG** | Directed Acyclic Graph | Dependências entre tasks sem ciclos |
| **Pull System** | Lean/Kanban (Ohno 1988) | Puxar trabalho no momento certo |
| **Event Sourcing** | Fowler (2005) | Origem rastreia genealogia sem duplicar estado |

### Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MARCO TEÓRICO CONSOLIDADO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SAGA PATTERN                          HTN (Decomposição)                   │
│  ┌───────────────────────────┐         ┌───────────────────────────┐        │
│  │ Sprint = Saga             │         │ Task abstrata             │        │
│  │ Task = Transação local    │         │   └── Task concreta       │        │
│  │ Falha = Compensar/Pausar  │         │       └── Subtask filho   │        │
│  └───────────────────────────┘         └───────────────────────────┘        │
│                                                                             │
│  PULL SYSTEM                           EVENT SOURCING (leve)                │
│  ┌───────────────────────────┐         ┌───────────────────────────┐        │
│  │ Não empurra trabalho      │         │ origem: { sprint, task }  │        │
│  │ Puxa quando task conclui  │         │ Rastreabilidade sem       │        │
│  │ WIP limit natural         │         │ duplicação de estado      │        │
│  └───────────────────────────┘         └───────────────────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Princípios Derivados

| Princípio | Origem Teórica | Regra |
|-----------|----------------|-------|
| **P1: Genealogia** | Event Sourcing | Todo item filho registra sua origem |
| **P2: Pull no Trigger** | Lean + Saga | Consultar filhos ao concluir task |
| **P3: Hierarquia Visual** | HTN | Subtasks nomeadas T01.1, T01.2 |
| **P4: SSOT no Backlog** | DDD | Sprint consulta, Backlog persiste |
| **P5: Decisão Humana** | Lean | auto_pull pode ser true/false |

---

## M2 - Objeto

### Definição

**MS_Sprint (refatorado)** é o Meta Sistema que:
- **Orquestra** receitas como sequências de tasks
- **Consulta** MS_Backlog para descobrir filhos
- **Pede** transferência de filhos (não duplica)
- **Mantém** humano no controle das decisões

### Fronteiras

| MS_Sprint FAZ | MS_Sprint NÃO FAZ |
|---------------|-------------------|
| Consultar filhos ao concluir task | Armazenar origem (isso é Backlog) |
| Pedir transferência ao Backlog | Executar lógica de domínio dos MS |
| Nomear subtasks hierarquicamente (T01.1) | Dispatch automático sem humano |
| Notificar humano para decisão | Duplicar estado do Backlog |

### Separação de Concerns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SEPARAÇÃO SPRINT × BACKLOG                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_BACKLOG (SSOT)                    MS_SPRINT (Orquestrador)              │
│  ┌───────────────────────────┐        ┌───────────────────────────┐         │
│  │ • Armazena items          │        │ • Ciclo finito            │         │
│  │ • Persiste origem         │        │ • Subdivide em tasks      │         │
│  │ • listar_filhos()         │        │ • Consulta filhos         │         │
│  │ • transferir_para_sprint()│        │ • Pede transferência      │         │
│  └───────────────────────────┘        └───────────────────────────┘         │
│                                                                             │
│  DISPATCH = Humano inicia task → Sprint executa → filhos vão pro Backlog    │
│           → Sprint consulta ao concluir → puxa ou pergunta                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mudanças Necessárias

| Componente | Mudança | Owner |
|------------|---------|-------|
| BacklogItem.origem | Novo campo (se não existe) | MS_Backlog |
| listar_filhos() | Novo método | MS_Backlog |
| transferir_para_sprint() | Novo método | MS_Backlog |
| task-concluir | Estender com consulta de filhos | MS_Sprint |
| Subtask hierárquica | T01.1, T01.2 | MS_Sprint |

---

## M3 - Classe

### 3.1 BacklogItem (extensão)

```yaml
BacklogItem:
  # ... atributos existentes ...
  
  # NOVO: Rastreabilidade de origem
  origem:
    tipo: Enum               # sprint_task | manual | ms_producao
    sprint_id: String?       # S022
    task_codigo: String?     # T01
    ms_origem: String?       # Epistemologia, PROMETHEUS, etc.
    auto_pull: Boolean       # true = sprint puxa automaticamente
    criado_em: DateTime
```

### 3.2 MS_Backlog (novos métodos)

```yaml
MS_Backlog:
  # ... métodos existentes ...
  
  listar_filhos(sprint_id, task_codigo?): [BacklogItem]
    """
    Retorna items que têm origem na sprint/task especificada.
    Se task_codigo omitido, retorna todos filhos da sprint.
    """
    
  transferir_para_sprint(item_id, sprint_id, task_pai?): BacklogItem
    """
    Move item para sprint ativa.
    Se task_pai informado, item vira subtask (T01.1).
    Atualiza status do item.
    """
```

### 3.3 MS_Sprint (extensão task-concluir)

```yaml
MS_Sprint:
  concluir_task(codigo, resultado?):
    """
    FLUXO ESTENDIDO:
    1. Marca task como concluída (existente)
    2. Consulta filhos: MS_Backlog.listar_filhos(sprint_id, codigo)
    3. Para cada filho:
       - Se auto_pull=true: 
         - MS_Backlog.transferir_para_sprint(filho.id, sprint_id, codigo)
         - Cria subtask com código hierárquico (T01.1)
         - Notifica: "Puxado automaticamente: {titulo}"
       - Se auto_pull=false:
         - Notifica: "Item pendente de decisão: {titulo}"
         - Pergunta: "Deseja puxar? [sim/não]"
    4. Atualiza próxima task
    """
    
  gerar_codigo_subtask(task_pai): String
    """
    T01 → T01.1, T01.2, ...
    T01.1 → T01.1.1, T01.1.2, ...
    """
```

### 3.4 Diagrama de Sequência

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEQUÊNCIA: task-concluir COM FILHOS                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Humano          MS_Sprint              MS_Backlog              MongoDB     │
│    │                │                       │                       │       │
│    │ task-concluir  │                       │                       │       │
│    │ T01            │                       │                       │       │
│    │───────────────►│                       │                       │       │
│    │                │                       │                       │       │
│    │                │ update T01=concluída  │                       │       │
│    │                │──────────────────────────────────────────────►│       │
│    │                │                       │                       │       │
│    │                │ listar_filhos(S022,T01)                       │       │
│    │                │──────────────────────►│                       │       │
│    │                │                       │ find({origem...})     │       │
│    │                │                       │──────────────────────►│       │
│    │                │                       │◄──────────────────────│       │
│    │                │◄──────────────────────│ [{BKL-042, auto:true}]│       │
│    │                │                       │                       │       │
│    │                │ transferir(BKL-042,S022,T01)                   │       │
│    │                │──────────────────────►│                       │       │
│    │                │                       │ update status         │       │
│    │                │                       │──────────────────────►│       │
│    │                │◄──────────────────────│                       │       │
│    │                │                       │                       │       │
│    │                │ insert subtask T01.1  │                       │       │
│    │                │──────────────────────────────────────────────►│       │
│    │                │                       │                       │       │
│    │◄───────────────│                       │                       │       │
│    │ "T01 concluída.│                       │                       │       │
│    │  Puxado: T01.1 │                       │                       │       │
│    │  Validar spec" │                       │                       │       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Tipos de Filhos (exemplos)

| Tipo | Origem | auto_pull |
|------|--------|-----------|
| Validação de spec | Epistemologia | true |
| Code review | PROMETHEUS | true |
| Aprovação externa | Qualquer MS | false |
| Documentação derivada | Epistemologia | true |
| Bug descoberto | Teste | false |

### 3.6 Invariantes

| Invariante | Descrição |
|------------|-----------|
| **ORIGEM-OPCIONAL** | Campo origem é opcional (items manuais não têm) |
| **SSOT-BACKLOG** | Origem persiste apenas no BacklogItem, Sprint consulta |
| **HIERARQUIA-CODIGO** | Subtask sempre deriva código do pai (T01 → T01.1) |
| **AUTO-PULL-RESPEITADO** | Sprint nunca puxa auto_pull=false sem confirmação |
| **TRANSFERENCIA-ATOMICA** | Transferir atualiza backlog + cria subtask em transação |

---

## Próximos Passos

| Task | Descrição | Dependência |
|------|-----------|-------------|
| T02 | MS_Backlog - adicionar listar_filhos(), transferir_para_sprint(), campo origem | M0-M3 |
| T03 | MS_Sprint - refatorar task-concluir para consultar filhos | T02 |
| T04 | GENESIS - simplificar | T03 |
| T05 | Guia Usuário - atualizar comandos | T03 |
| T06 | Testes - validar fluxo completo | T05 |

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_B/MS_Backlog.md | Extensão necessária |
| docs/04_S/MS_Sprint.md | Refatoração task-concluir |
| docs/00_E/00_E_Epistemologia.md | Método M0-M4 |

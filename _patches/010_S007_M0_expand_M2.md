---
target: _sprints/S007_Processo_Sprint.md
version_from: "1.5"
version_to: "1.6"
commit_message: "[C2] update: M0 expandido + M2 Objeto - S007"
---

## EDITS

### EDIT 1
FIND:
`````
| M2 | Objeto (fronteiras) | ⬜ |
`````
REPLACE:
`````
| M2 | Objeto (fronteiras) | ✅ |
`````

### EDIT 2
FIND:
`````
| **Arquivamento** | Conclusão de Sprint com registro histórico |
`````
REPLACE:
`````
| **Arquivamento** | Conclusão de Sprint com registro histórico |
| **Minor** | Fix pequeno executado inline na sprint atual (sem promover) |
| **Origem** | Sprint(s) onde um item de backlog foi identificado |
| **Sistema Afetado** | Componente da infra impactado por um item (rastreabilidade) |
| **Captura Retroativa** | Registro no backlog de minor já executado (para tracking) |
`````

### EDIT 3
FIND:
`````
<!-- M2, M3 serão adicionados aqui durante execução -->
`````
REPLACE:
`````
---

## M2: Objeto

### Definição

**Processo de Sprint** é o sistema que gerencia o ciclo de vida do conhecimento emergente: da captura durante conversas até a publicação como documentação oficial.

### Fronteiras

| Processo de Sprint É | Processo de Sprint NÃO É |
|----------------------|--------------------------|
| Gestão do ciclo Captura → Backlog → Sprint → Publicação | Persistência de arquivos (isso é Git) |
| Definição de O QUE fazer e QUANDO | Definição de COMO estruturar conhecimento (isso é Epistemologia) |
| Rastreabilidade de onde itens surgiram | Busca semântica de itens (isso é Catálogo) |
| Controle de tasks e progresso | Conteúdo de domínio específico |
| Processo para LLM + Humano | Metodologia ágil completa (Scrum/Kanban) |

### Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      COMPONENTES DO PROCESSO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│  │   CAPTURA   │    │   BACKLOG   │    │   SPRINT    │    │ PUBLICAÇÃO  │   │
│  ├─────────────┤    ├─────────────┤    ├─────────────┤    ├─────────────┤   │
│  │ Comando     │    │ Índice      │    │ Objetivo    │    │ Mover para  │   │
│  │ explícito   │───►│ + Arquivos  │───►│ + Tasks     │───►│ docs/       │   │
│  │ do usuário  │    │ detalhados  │    │ + Drafts    │    │ + Arquivar  │   │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘   │
│        │                  │                  │                  │           │
│        ▼                  ▼                  ▼                  ▼           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    ITEM DE BACKLOG                                  │    │
│  │  - titulo: String                                                   │    │
│  │  - origem: [Sprint]     ← onde surgiu (rastreabilidade)             │    │
│  │  - status: Pendente | Resolvido                                     │    │
│  │  - resolvido_em: Sprint?                                            │    │
│  │  - tipo: Minor | Feature | Bug                                      │    │
│  │  - sistema_afetado: String                                          │    │
│  │  - contexto: Markdown   ← input para M0 quando desenvolver          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Relações

| Componente | Relação | Descrição |
|------------|---------|-----------|
| **Git** | Usa | Processo usa Git para persistir arquivos |
| **Epistemologia** | Aplica | Itens promovidos seguem M0-M4 |
| **Catálogo** | Indexa em | Itens publicados são indexados no Catálogo |
| **GENESIS** | Subordinado a | Processo é parte da infra que GENESIS orquestra |

### Fluxos Especiais

#### Minor (fix inline)

```
Fork surge → É pequeno? → SIM → Executa direto → Captura retroativa no backlog
                       → NÃO → Captura normal → Aguarda promoção
```

#### Origem múltipla

```
Item surge em S007 → origem: [S007]
Mesmo item surge em S009 → origem: [S007, S009]  ← indica criticidade
```

<!-- M3 será adicionado aqui durante execução -->
`````

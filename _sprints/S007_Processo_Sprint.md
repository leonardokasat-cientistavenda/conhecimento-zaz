# Sprint S007: Processo de Sprint

## CONTEXTO

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Branch: main

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## SPRINT ATUAL: S007

**Objetivo:** Aplicar método epistemológico (M0-M4) ao conceito de Sprint

**Entregável Final:** `docs/00_I/00_I_2_Processo_Sprint.md`

**Método:** Seguir ciclo M0 → M1 → M2 → M3 → M4, adicionando conteúdo via patch neste documento

---

## CICLO M0-M4

| Etapa | Descrição | Status |
|-------|-----------|--------|
| M0 | Problema + Glossário + Tese | ✅ |
| M1 | Marco Teórico | ✅ |
| M2 | Objeto (fronteiras) | ✅ |
| M3 | Classe (atributos, métodos) | ⬜ |
| M4 | Documento Final | ⬜ |

---

## INSTRUÇÕES PARA CADA ETAPA

### M0: Problema

Responder:
1. **Glossário:** Definir Sprint, Task, Backlog, Promover, Arquivar
2. **Problema:** Qual problema Sprint resolve? Por que precisamos disso?
3. **Sintomas:** O que acontece sem processo formal?
4. **Tese:** Uma frase que capture a essência

### M1: Marco Teórico

Responder:
1. **Fundamentos:** Scrum, Kanban, ciclos iterativos
2. **Adaptação:** Como adaptar para contexto LLM + sessões curtas?
3. **Conceitos chave:** Timeboxing, incrementos, retrospectiva

### M2: Objeto

Responder:
1. **É / NÃO É:** O que é uma Sprint GENESIS vs. o que não é
2. **Fronteiras:** Onde termina Sprint e começa Backlog? E Task?
3. **Relações:** Como Sprint se relaciona com outros conceitos

### M3: Classe

Responder:
1. **Atributos:** status, tasks, entregáveis, datas
2. **Estados:** Backlog → Ativa → Concluída
3. **Métodos:** promover(), executar(), arquivar()
4. **Artefatos:** Quais arquivos uma Sprint gera?

### M4: Documento Final

1. Consolidar M0-M3 em documento único
2. Adicionar diagramas e fluxos visuais
3. Publicar em `docs/00_I/00_I_2_Processo_Sprint.md`
4. Indexar no Catálogo

---

## CONTEÚDO

## M0: Problema

### Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Sprint** | Ciclo de trabalho focado com objetivo específico e tasks definidas |
| **Task** | Unidade atômica de trabalho dentro de uma Sprint (T01, T02...) |
| **Backlog** | Fila organizada de itens aguardando execução futura |
| **Captura** | Ação explícita do usuário para persistir contexto/fork no backlog |
| **Fork** | Desvio/descoberta durante conversa que merece trabalho futuro |
| **Promoção** | Transição de item do Backlog para Sprint ativa |
| **Draft** | Arquivo em desenvolvimento durante Sprint (_drafts/) |
| **Publicação** | Transição de Draft para documento oficial (docs/) |
| **Arquivamento** | Conclusão de Sprint com registro histórico |
| **Minor** | Fix pequeno executado inline na sprint atual (sem promover) |
| **Origem** | Sprint(s) onde um item de backlog foi identificado |
| **Sistema Afetado** | Componente da infra impactado por um item (rastreabilidade) |
| **Captura Retroativa** | Registro no backlog de minor já executado (para tracking) |

### Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como gerenciar conhecimento que emerge em conversas, organizá-lo para     │
│   execução futura, e não perder tracking entre sessões e chats?"            │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  FORKS PERDIDOS     │  │ ENTROPIA NO CHAT    │  │ PROCESSO VAGO       │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Descobertas durante │  │ Contexto acumula,   │  │ Como promover?      │  │
│  │ conversa se perdem  │  │ conversa fica       │  │ Como executar?      │  │
│  │ se não capturadas   │  │ pesada e imprecisa  │  │ Como concluir?      │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SOLUÇÃO                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CAPTURA ────► BACKLOG ────► SPRINT ────► PUBLICAÇÃO                        │
│  (comando      (índice +     (tasks +     (docs/ +                          │
│   explícito)    contexto)     drafts)      arquivar)                        │
│                                                                             │
│  Processo INDEPENDENTE de Git (Git = ferramenta de persistência)            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tese

> **Processo de Sprint é o sistema de gestão de conhecimento que permite:**
>
> 1. **Capturar** - Comando explícito do usuário persiste forks/gaps em backlog
> 2. **Organizar** - Backlog estruturado com índice + arquivos detalhados (input para M0)
> 3. **Promover** - Critérios e passos claros para backlog → sprint
> 4. **Executar** - Sprint com tasks, drafts e tracking entre sessões
> 5. **Publicar** - Conclusão com arquivamento e atualização de índices
>
> **Separação de concerns:** Este processo define O QUE fazer e QUANDO.
> Git (00_I_1_1_GitHub.md) define COMO persistir.

---

## M1: Marco Teórico

### Fundamentos

| Conceito | Teoria | Aplicação no Processo |
|----------|--------|----------------------|
| **Captura Imediata** | GTD (David Allen) | Fork detectado → captura explícita → mente livre para tarefa atual |
| **Fluxo Puxado** | Kanban (Toyota) | Backlog → Sprint quando há capacidade, não por push |
| **Timeboxing** | Scrum (Agile) | Sprint tem escopo fechado e objetivo claro |
| **Incrementos** | Scrum (Agile) | Cada Sprint entrega algo publicável |
| **Notas Atômicas** | Zettelkasten (Luhmann) | Item de backlog = unidade independente com contexto suficiente |
| **WIP Limit** | Kanban | Uma Sprint ativa por vez (foco) |

### Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MARCO TEÓRICO CONSOLIDADO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GTD: CAPTURA                        KANBAN: FLUXO                          │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ "Capture tudo que tem     │       │ Backlog → Sprint → Done   │          │
│  │  significado potencial"   │       │ Puxar, não empurrar       │          │
│  │                           │       │ WIP limit = 1 sprint      │          │
│  │ → Comando explícito       │       │                           │          │
│  │ → Contexto suficiente     │       │ → Promoção consciente     │          │
│  │ → Mente livre             │       │ → Foco em uma coisa       │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                                                                             │
│  SCRUM: EXECUÇÃO                     ZETTELKASTEN: ESTRUTURA                │
│  ┌───────────────────────────┐       ┌───────────────────────────┐          │
│  │ Sprint = timebox          │       │ Cada nota = unidade       │          │
│  │ Objetivo claro            │       │ independente              │          │
│  │ Entrega incremental       │       │                           │          │
│  │                           │       │ → Item backlog autônomo   │          │
│  │ → Tasks definidas         │       │ → Contexto para retomada  │          │
│  │ → Publicação ao final     │       │ → Links para relacionados │          │
│  └───────────────────────────┘       └───────────────────────────┘          │
│                                                                             │
│  RESULTADO: Processo que captura sem perder foco, organiza para             │
│             retomada futura, executa com clareza, publica incrementos.      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Adaptação para Contexto LLM

| Desafio LLM | Solução do Processo |
|-------------|---------------------|
| Contexto não persiste entre chats | Backlog com contexto suficiente para retomada |
| Conversa longa = entropia | Captura descarrega contexto, mantém chat leve |
| Sessões curtas | Sprint com tasks atômicas, progresso incremental |
| Múltiplos chats | Sprint file como "âncora" - carrega no início de cada sessão |

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

---

## REFERÊNCIAS

| Arquivo | Para quê |
|---------|----------|
| `docs/00_E/00_E_Epistemologia.md` | Exemplo de M0-M4 completo |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | Outro exemplo de M0-M4 |
| `_sprints/S006-C_Catalogo_MVP.md` | Exemplo de sprint concluída |

---

## HISTÓRICO

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-07 | Criação. Promovido do BACKLOG.md. |
| 1.1 | 2025-12-07 | Simplificado. Foco em M0-M4. |
| 1.2 | 2025-12-07 | Corrigido. Conteúdo via patch, não arquivos separados. |

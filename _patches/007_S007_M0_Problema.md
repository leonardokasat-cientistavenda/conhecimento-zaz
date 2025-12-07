---
target: _sprints/S007_Processo_Sprint.md
version_from: "1.2"
version_to: "1.3"
commit_message: "[C2] update: M0 Problema - Glossário, Diagrama, Tese - S007"
---

## EDITS

### EDIT 1
FIND:
```
| M0 | Problema + Glossário + Tese | ⬜ |
```
REPLACE:
```
| M0 | Problema + Glossário + Tese | ✅ |
```

### EDIT 2
FIND:
```
<!-- M0, M1, M2, M3 serão adicionados aqui durante execução -->
```
REPLACE:
```
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

<!-- M1, M2, M3 serão adicionados aqui durante execução -->
```

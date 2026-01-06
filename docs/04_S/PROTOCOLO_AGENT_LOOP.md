# Protocolo Agent Loop v1.0

---

```yaml
nome: PROTOCOLO_AGENT_LOOP
versao: "1.0"
tipo: Protocolo
status: Publicado
camada: 4
dominio: Execução
data_publicacao: "2026-01-06"
pai: docs/04_S/MS_Sprint.md
```

---

## 1. Propósito

> **Protocolo para execução autônoma de sprints por agente Claude, com supervisão humana via comando #claude.**

O Agent Loop permite que Claude execute tasks de sprint de forma autônoma, postando progresso no Mattermost, atualizando MongoDB, e respondendo a comandos do humano.

---

## 2. Stakeholders

| Stakeholder | Papel | Menção MM |
|-------------|-------|----------|
| @infra | Bot de infraestrutura | Comandos de diagnóstico |
| @leonardo.kasat | Humano supervisor | Comandos #claude |
| @gabriel | Equipe técnica | Notificações |

---

## 3. Ciclo de Execução

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AGENT LOOP                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ 1. INÍCIO DE SPRINT                                                  │   │
│  │    • Carregar sprint do MongoDB (sprint_sessions)                    │   │
│  │    • Carregar protocolo (este arquivo) se perder contexto            │   │
│  │    • Postar mensagem de início no MM                                 │   │
│  │    • Setar sprint.status = "executando"                              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ 2. CICLO DE TASK                                                     │   │
│  │    PARA CADA task:                                                   │   │
│  │    ┌─────────────────────────────────────────────────────────────┐   │   │
│  │    │ 2.1 Postar início: ⏳ **{task_id}:** {titulo}               │   │   │
│  │    │ 2.2 Executar ação (comando @infra, GitHub, etc.)            │   │   │
│  │    │ 2.3 Capturar resposta (retry 3x)                            │   │   │
│  │    │ 2.4 Analisar resposta                                       │   │   │
│  │    │ 2.5 Verificar #claude                                       │   │   │
│  │    │ 2.6 Atualizar MongoDB                                       │   │   │
│  │    │ 2.7 Postar resultado: ✅ ou ❌                               │   │   │
│  │    └─────────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ 3. FINALIZAÇÃO                                                       │   │
│  │    • Postar resumo no MM                                             │   │
│  │    • Atualizar sprint.status                                         │   │
│  │    • Listar próximos passos                                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Retry de Mensagens

O @infra responde rapidamente. Se não houver resposta, retry com backoff:

```
tentativas = 0
max_tentativas = 3
delays = [3s, 5s, 5s]

enquanto tentativas < max_tentativas:
    aguardar delays[tentativas]
    ler posts não lidos
    
    se tem resposta:
        analisar resposta
        break
    
    tentativas++

se tentativas == max_tentativas:
    sair do loop (status: timeout_sem_resposta)
    reportar no MM
```

---

## 5. Interpretação de Respostas @infra

O @infra tem LLM. A resposta pode não ser exatamente o esperado:

| Tipo de Resposta | Indicadores | Ação |
|------------------|-------------|------|
| **Sucesso** | Dados esperados, "✅", resultado claro | Continuar |
| **Dica/Correção** | "Você quis dizer...", "Tente...", sugestão | Ajustar comando, retry |
| **Erro** | "❌", stack trace, "não encontrado" | Diagnosticar, retry ou #claude |
| **Não relacionado** | Resposta de outro comando/usuário | Ignorar, aguardar mais |

**Exemplo de Dica:**
```
@infra: Comando 'git create' não encontrado. 
        Você quis dizer 'github create'?
        Uso: @infra github create <owner/repo> <path> "<content>"
```
→ Claude deve ajustar o comando e tentar novamente.

---

## 6. Comando #claude

O humano pode intervir via mensagem contendo `#claude`:

| Comando | Ação |
|---------|------|
| `#claude stop` | Sair do loop, reportar status atual |
| `#claude skip` | Pular task atual, ir para próxima |
| `#claude <instrução>` | Executar instrução específica |

**Verificação:** Após cada captura de posts, Claude deve:
1. Filtrar posts do @leonardo.kasat
2. Verificar se contém `#claude`
3. Extrair instrução e executar

---

## 7. Recuperação de Contexto

Se Claude perder contexto (respostas incoerentes, esqueceu objetivo):

```
1. github:get_file_contents → docs/04_S/PROTOCOLO_AGENT_LOOP.md
2. mongodb:find → sprint_sessions (status: ativa)
3. mongodb:find → backlog_items (current_item)
4. mm-prometheus:mattermost_search_posts → últimos posts da sprint
5. Retomar de onde parou
```

---

## 8. Mensagens Padrão

### 8.1 Início de Sprint

```markdown
🚀 **Sprint {codigo} - Iniciando**
@leonardo.kasat @gabriel

**Objetivo:** {titulo}
**Tasks:** 
- T01: {titulo}
- T02: {titulo}
- ...

_Protocolo: Agent Loop v1.0_
```

### 8.2 Início de Task

```markdown
⏳ **{task_id}:** {titulo} - Iniciando...
```

### 8.3 Task Concluída

```markdown
✅ **{task_id}:** {titulo} - Concluído
{notas opcionais}
```

### 8.4 Task Falhou

```markdown
❌ **{task_id}:** {titulo} - Falhou
**Erro:** {descrição}
**Etapa:** {etapa_falha}

Aguardando #claude para instruções.
```

### 8.5 Resumo Final

```markdown
🏁 **Sprint {codigo} - {Status}**

✅ Concluídos: {lista}
❌ Falharam: {lista}
⏭️ Pendentes: {lista}

@leonardo.kasat @gabriel
```

---

## 9. Limites de Segurança

| Limite | Valor | Ação |
|--------|-------|------|
| Max tentativas por captura | 3 | Timeout, reportar |
| Max retries por task com erro | 3 | Marcar falhou, próxima |
| Tasks consecutivas falhando | 2 | Pausar, aguardar #claude |
| Verificar #claude | Sempre | Antes de continuar |

---

## 10. Fluxo MongoDB

### Início de Sprint

```javascript
db.sprint_sessions.updateOne(
  { codigo: "S-XXX" },
  { $set: { status: "executando", updated_at: new Date() } }
)
```

### Atualização de Task

```javascript
db.backlog_items.updateOne(
  { codigo: "BKL-XXX" },
  { 
    $set: { 
      "tasks.$[t].status": "concluido",
      "tasks.$[t].resultado.post_id": "xxx",
      "tasks.$[t].resultado.executado_em": new Date(),
      updated_at: new Date()
    } 
  },
  { arrayFilters: [{ "t.codigo": "T01" }] }
)
```

### Fim de Sprint

```javascript
db.sprint_sessions.updateOne(
  { codigo: "S-XXX" },
  { 
    $set: { 
      status: "concluida",
      concluido_em: new Date(),
      updated_at: new Date()
    } 
  }
)
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_S/MS_Sprint.md | Meta Sistema pai |
| docs/04_B/MS_Backlog.md | Fonte de items |
| pantheon/infra-bot/README.md | Comandos @infra |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2026-01-06 | Criação inicial. Ciclo de execução, retry, interpretação @infra, comando #claude, recuperação de contexto. |

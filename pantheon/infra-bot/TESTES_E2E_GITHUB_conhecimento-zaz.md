# Testes E2E - Pipeline GitHub via @infra
## Repo: conhecimento-zaz

> **Backlog Item:** BKL-GH-008  
> **Sprint:** S-PANTHEON-003  
> **Status dos testes:** Gerenciado no MongoDB (backlog_items.tasks[])

---

## Objetivo

Validar todas as operações do pipeline GitHub no repositório `leonardokasat-cientistavenda/conhecimento-zaz`.

Este é o primeiro repo a ser testado por ser o mais simples (sem GitHub Actions de deploy).

---

## Operações a Testar

| Task | Operação | Comando | Descrição |
|------|----------|---------|-----------|
| T01 | create | `@infra github create` | Criar arquivo novo |
| T02 | get | `@infra github get` | Ler conteúdo de arquivo |
| T03 | replace | `@infra github replace` | Substituir conteúdo completo |
| T04 | patch | `@infra github patch` | str_replace cirúrgico |
| T05 | delete | `@infra github delete` | Remover arquivo |
| T06 | list | `@infra github list` | Listar diretório |
| T07 | push | `@infra github push` | Multi-arquivo em 1 commit |

---

## Fluxo Esperado (todas as operações)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  @infra github <op> leonardokasat-cientistavenda/conhecimento-zaz ...       │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │  1. Webhook → Pantheon                                          │        │
│  │  2. DMN Router → { type: "camunda", process: "github-ops" }     │        │
│  │  3. handler.js → parseGithubArgs(args)                          │        │
│  │  4. lib/camunda.js → startCamundaProcess()                      │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                      │                                      │
│                                      ▼                                      │
│                        ┌─────────────────────────┐                          │
│                        │  BPMN github-ops        │                          │
│                        │  DMN githubOperations   │                          │
│                        │  → topic dinâmico       │                          │
│                        └─────────────────────────┘                          │
│                                      │                                      │
│                                      ▼                                      │
│                        ┌─────────────────────────┐                          │
│                        │  Worker executa         │                          │
│                        │  (git local strategy)   │                          │
│                        │  Log → ClickHouse       │                          │
│                        └─────────────────────────┘                          │
│                                      │                                      │
│                                      ▼                                      │
│                        ┌─────────────────────────┐                          │
│                        │  Notify Worker          │                          │
│                        │  → Mensagem no MM       │                          │
│                        └─────────────────────────┘                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## T01: create

### Comando
```
@infra github create leonardokasat-cientistavenda/conhecimento-zaz _tests/e2e-create-test.md "# Teste E2E - create

Sprint: S-PANTHEON-003
Task: BKL-GH-008/T01
Data: {timestamp}"
```

### Critérios de Sucesso
| # | Critério | Como Validar |
|---|----------|--------------|
| 1 | Routing correto | `@infra logs pantheon` → "Camunda process started" |
| 2 | Parser funcionou | Log mostra variáveis extraídas |
| 3 | Worker executou | `@infra logs index` → git commands |
| 4 | Arquivo existe | GitHub tem `_tests/e2e-create-test.md` |
| 5 | Notificação | Mensagem "✅ Arquivo criado" no MM |

---

## T02: get

### Comando
```
@infra github get leonardokasat-cientistavenda/conhecimento-zaz _tests/e2e-create-test.md
```

### Critérios de Sucesso
| # | Critério | Como Validar |
|---|----------|--------------|
| 1 | Worker getGithubFile executou | `@infra logs index` |
| 2 | Conteúdo retornado | Mensagem no MM com conteúdo do arquivo |

---

## T03: replace

### Comando
```
@infra github replace leonardokasat-cientistavenda/conhecimento-zaz _tests/e2e-create-test.md "# Teste E2E - replace

Conteúdo substituído completamente.
Sprint: S-PANTHEON-003
Task: BKL-GH-008/T03"
```

### Critérios de Sucesso
| # | Critério | Como Validar |
|---|----------|--------------|
| 1 | Worker createGithubFile executou | `@infra logs index` |
| 2 | Conteúdo substituído | GitHub mostra novo conteúdo |
| 3 | Commit criado | Novo SHA no histórico |

---

## T04: patch

### Comando
```
@infra github patch leonardokasat-cientistavenda/conhecimento-zaz _tests/e2e-create-test.md "Task: BKL-GH-008/T03" "Task: BKL-GH-008/T04 (patched)"
```

### Critérios de Sucesso
| # | Critério | Como Validar |
|---|----------|--------------|
| 1 | Worker patchGithubFile executou | `@infra logs index` |
| 2 | Apenas trecho alterado | GitHub mostra diff cirúrgico |
| 3 | Resto do arquivo intacto | Conteúdo anterior preservado |

---

## T05: delete

### Comando
```
@infra github delete leonardokasat-cientistavenda/conhecimento-zaz _tests/e2e-create-test.md
```

### Critérios de Sucesso
| # | Critério | Como Validar |
|---|----------|--------------|
| 1 | Worker deleteGithubFile executou | `@infra logs index` |
| 2 | Arquivo removido | GitHub retorna 404 para o arquivo |
| 3 | Notificação | Mensagem "✅ Arquivo removido" no MM |

---

## T06: list

### Comando
```
@infra github list leonardokasat-cientistavenda/conhecimento-zaz pantheon/infra-bot
```

### Critérios de Sucesso
| # | Critério | Como Validar |
|---|----------|--------------|
| 1 | Worker listGithubFiles executou | `@infra logs index` |
| 2 | Lista retornada | Mensagem no MM com arquivos do diretório |

---

## T07: push

### Comando
```
@infra github push leonardokasat-cientistavenda/conhecimento-zaz "[S-PANTHEON-003] T07: teste multi-arquivo" _tests/push-test-1.md:"# Arquivo 1" _tests/push-test-2.md:"# Arquivo 2"
```

### Critérios de Sucesso
| # | Critério | Como Validar |
|---|----------|--------------|
| 1 | Worker pushGithubFiles executou | `@infra logs index` |
| 2 | Ambos arquivos criados | GitHub tem os 2 arquivos |
| 3 | Único commit | Histórico mostra 1 commit com 2 arquivos |

---

## Comandos de Debug

```bash
# Ver logs do pantheon (routing, parser)
@infra logs pantheon

# Ver logs do index (workers)
@infra logs index

# Ver status PM2
@infra status

# Ver últimos commits
@infra git-log 5

# Health check
@infra health
```

---

## Matriz de Diagnóstico

| Sintoma | Etapa com Problema | Ação |
|---------|-------------------|------|
| Nenhuma resposta no MM | Webhook/Routing | `@infra logs pantheon` |
| "Comando não reconhecido" | DMN Router | Verificar commands.json |
| "No process definition" | Camunda | BPMN não deployado |
| "No decision definition" | DMN Processo | DMN não deployada |
| "⏳ Processando..." sem fim | Worker | `@infra logs index` |
| Git push falha | Permissão/Conflito | Verificar repo local |
| Arquivo criado sem notificação | Notify Worker | Verificar worker notify |

---

## Referências

- **Spec arquitetura:** [pipeline-git.md](./pipeline-git.md)
- **Sprint:** S-PANTHEON-003
- **Backlog:** BKL-GH-008 (MongoDB: genesis.backlog_items)

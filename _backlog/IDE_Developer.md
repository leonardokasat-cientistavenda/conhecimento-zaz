# IDE Developer - Cursor para GENESIS

## Status: Backlog

| Campo | Valor |
|-------|-------|
| **ID** | bl_ide_developer |
| **Prioridade** | Alta |
| **Esforço** | Pequeno (1-2h spike) |
| **Dependências** | Nenhuma |
| **Criado** | 2025-12-08 |

---

## M0: Problema

### Glossário

| Termo | Significado |
|-------|-------------|
| **IDE** | Integrated Development Environment - ambiente de edição de código |
| **Cursor** | Fork do VS Code com AI nativo integrado |
| **Edição cirúrgica** | Modificar linhas específicas sem reescrever arquivo inteiro |
| **Spike** | Experimento técnico curto para validar viabilidade |

### Situação Atual

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUXO ATUAL (PROBLEMÁTICO)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Chat Claude → Gerar arquivo completo → API GitHub → Verificar  │
│       │              │                      │            │      │
│       │              │                      │            │      │
│    Tokens         Latência              Erros SHA      Loop     │
│    altos          alta                  frequentes    entropia  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Problemas:
- Consumo excessivo de tokens (arquivo inteiro a cada edição)
- Sistema de patch MCP+Desktop falhou (Sprint S010)
- Erros de SHA/merge geram retrabalho
- Desgaste cognitivo do usuário
- Entropia operacional alta
```

### Solução Proposta

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUXO PROPOSTO (CURSOR)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Cursor IDE → Edição inline (Cmd+K) → Git commit → Push         │
│      │              │                     │           │         │
│      │              │                     │           │         │
│   Contexto      Cirúrgico             Integrado    Direto       │
│   indexado      (só diff)             (nativo)                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Benefícios esperados:
- Redução 80%+ no tempo de edição
- Edição de linhas específicas (não arquivo inteiro)
- Git integrado na IDE
- @codebase indexa estrutura GENESIS
- Composer edita múltiplos arquivos
```

### Tese

> **Cursor como IDE de desenvolvimento GENESIS reduzirá drasticamente o tempo e energia gastos em edições, eliminando o gargalo de infraestrutura que causa entropia operacional.**

---

## M1: Marco Teórico

| Conceito | Aplicação |
|----------|-----------|
| **Redução de Entropia** | Menos etapas = menos pontos de falha |
| **Economia Cognitiva** | Ferramenta absorve complexidade, humano foca em decisão |
| **Feedback Loop** | Edição → resultado visível imediato (vs. esperar API) |

---

## M2: Objeto

### Fronteiras

| É | Não É |
|---|-------|
| Ferramenta de edição para desenvolvimento GENESIS | Substituição do chat Claude para discovery |
| Otimização de infraestrutura | Mudança de metodologia M0-M4 |
| Acelerador de sprints | Obrigatório para usar GENESIS |

### Escopo do Spike

1. Instalar Cursor
2. Clonar repositório conhecimento-zaz
3. Configurar Claude como modelo default
4. Testar edição inline em arquivo existente
5. Testar commit + push
6. Documentar resultado

---

## M3: Implementação

### Passos de Setup

```
1. Download: cursor.com
2. Instalar (é VS Code, familiar)
3. Abrir pasta do repositório clonado
4. Settings → Models → Selecionar Claude
5. Testar:
   - Abrir arquivo .md
   - Selecionar texto
   - Cmd+K → descrever mudança
   - Aceitar diff
   - Commit + Push via Source Control
```

### Critérios de Sucesso

| Critério | Métrica |
|----------|---------|
| Edição funciona | Consegue editar linha específica |
| Git funciona | Commit + push sem sair da IDE |
| Contexto funciona | @codebase encontra arquivos GENESIS |
| Tempo | Setup < 30min, edição < 2min |

---

## Custo

- **Cursor Pro**: $20/mês
- **ROI**: Se economiza 1h/mês do usuário, já se paga

---

## Próximo Passo

Promover para Sprint quando usuário decidir.

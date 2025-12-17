# Prompt para Sprint S021: MS_Sprint - Cadência de Trabalho

## CONTEXTO

IMPORTANTE: Todos os arquivos estão no GitHub, NÃO no Google Drive.
Usar ferramenta github:get_file_contents para leitura.

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Branch: main

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## SPRINT ATUAL: S021

**Objetivo:** Criar MS_Sprint que retira itens do backlog e organiza em cadências de trabalho. Relatório Backlog/Sprint para humano não se perder.

**Problema:** Humano se perde com múltiplos items no backlog. Falta cadência organizada e visibilidade do progresso.

**Solução:** MS_Sprint retira items do backlog, agrupa em sprints, gera relatórios para visibilidade.

---

## HIERARQUIA DE RESPONSABILIDADES

```
MS_BACKLOG (Camada 4) ─── FILA DE ITEMS
│  Items produzidos por todos os MS
│  Aguardando consumo
│
└──► MS_SPRINT (Camada 4) ─── CADÊNCIA DE TRABALHO
     │  Retira items do backlog
     │  Agrupa em sprints (ciclos de trabalho)
     │  Gera relatórios para humano
     │
     └──► HUMANO ─── EXECUÇÃO SUPERVISIONADA
          Visualiza progresso
          Prioriza
          Remove impedimentos
```

---

## RELAÇÃO MS_BACKLOG vs MS_SPRINT

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_BACKLOG vs MS_SPRINT                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_BACKLOG                          MS_SPRINT                              │
│  ──────────                          ─────────                              │
│  • Fila infinita de items            • Ciclo de trabalho (1-2 semanas)      │
│  • Sem compromisso de prazo          • Compromisso de entrega               │
│  • Prioridade relativa               • Capacidade finita                    │
│  • Items entram/saem dinamicamente   • Items "congelados" na sprint         │
│                                                                             │
│  FLUXO:                                                                     │
│  ───────                                                                    │
│  1. Items produzidos → MS_Backlog (fila)                                    │
│  2. Planning → MS_Sprint retira items do backlog                            │
│  3. Sprint executa → items consumidos/concluídos                            │
│  4. Review → items não concluídos voltam para backlog                       │
│                                                                             │
│  ANALOGIA:                                                                  │
│  ─────────                                                                  │
│  MS_Backlog = Prateleira do supermercado (estoque infinito)                 │
│  MS_Sprint = Carrinho de compras (capacidade finita)                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## INSIGHT: VISIBILIDADE PARA HUMANO

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROBLEMA DO HUMANO                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SEM MS_SPRINT:                                                             │
│  ──────────────                                                             │
│  • "Quantos items tenho pendentes?" → Não sei                               │
│  • "O que está bloqueado?" → Não sei                                        │
│  • "Quanto falta para terminar?" → Não sei                                  │
│  • "O que priorizar?" → Não sei                                             │
│                                                                             │
│  COM MS_SPRINT:                                                             │
│  ─────────────                                                              │
│  • Relatório Backlog: visão geral da fila                                   │
│  • Relatório Sprint: progresso do ciclo atual                               │
│  • Burndown: ritmo de conclusão                                             │
│  • Impedimentos: o que está travado                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ENTREGÁVEIS DA SPRINT

| # | Entregável | Descrição | Status |
|---|------------|-----------|--------|
| E01 | MS_Sprint.md v1.0 | Meta Sistema que gerencia cadência de trabalho | ⬜ |
| E02 | MS_Sprint_Arquitetura.md v1.0 | Contratos com MS_Backlog, regras de priorização, alocação | ⬜ |
| E03 | Relatório Backlog | Visão consolidada: pendentes, bloqueados, em progresso | ⬜ |
| E04 | Relatório Sprint | Visão sprint atual: progresso, burndown, impedimentos | ⬜ |

---

## ESTRUTURA PROPOSTA MS_SPRINT

```yaml
# MS_Sprint.md (E01)
nome: MS_Sprint
versao: "1.0"
camada: 4
proposito: "Organizar trabalho em ciclos com visibilidade para humano"

# Responsabilidades
responsabilidades:
  - Retirar items do MS_Backlog para sprint
  - Definir capacidade do ciclo
  - Acompanhar progresso
  - Gerar relatórios
  - Identificar impedimentos

# Ciclo de Vida
ciclo:
  planning: "Selecionar items do backlog"
  execucao: "Consumir/concluir items"
  review: "Avaliar entregas"
  retro: "Identificar melhorias"

# Tipos que consome do MS_Backlog
tipos_consumidos:
  - Todos (filtrados por prioridade e capacidade)

# Tipos que produz
tipos_produzidos:
  - sprint_planning      # Início de nova sprint
  - sprint_review        # Fim de sprint
  - impedimento          # Item bloqueado precisa atenção
```

---

## RELATÓRIO BACKLOG (E03)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RELATÓRIO BACKLOG - 2025-12-17                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESUMO                                                                     │
│  ──────                                                                     │
│  Total de items: 47                                                         │
│  Pendentes: 23                                                              │
│  Em Processamento: 8                                                        │
│  Bloqueados: 5                                                              │
│  Concluídos (últimos 7 dias): 11                                            │
│                                                                             │
│  POR PRIORIDADE                                                             │
│  ──────────────                                                             │
│  🔴 Crítico: 3 items                                                        │
│  🟡 Alto: 12 items                                                          │
│  🟢 Normal: 8 items                                                         │
│                                                                             │
│  POR TIPO                                                                   │
│  ────────                                                                   │
│  ciclo_epistemologico: 5                                                    │
│  desenvolvimento: 4                                                         │
│  aprovar_orcamento: 3                                                       │
│  entrevistar_dor: 6                                                         │
│  outros: 5                                                                  │
│                                                                             │
│  BLOQUEADOS (requer atenção)                                                │
│  ───────────────────────────                                                │
│  • bkl_042: aprovar_orcamento (bloqueado por: gap_001, gap_002)             │
│  • bkl_045: desenvolvimento (bloqueado por: bkl_042)                        │
│  • ...                                                                      │
│                                                                             │
│  MAIS ANTIGOS (idade > 7 dias)                                              │
│  ─────────────────────────────                                              │
│  • bkl_023: ciclo_epistemologico (12 dias)                                  │
│  • bkl_028: aprovar_release (9 dias)                                        │
│                                                                             │
│  SAGAS ATIVAS                                                               │
│  ────────────                                                               │
│  • saga_012: MS_CRM (15/20 items - 75%)                                     │
│  • saga_015: Reporte Voz (8/12 items - 67%)                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## RELATÓRIO SPRINT (E04)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RELATÓRIO SPRINT S021 - Dia 3/10                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  META: MS_Sprint - Cadência de Trabalho                                     │
│  Período: 2025-12-17 a 2025-12-27                                           │
│                                                                             │
│  PROGRESSO                                                                  │
│  ─────────                                                                  │
│  ████████░░░░░░░░░░░░ 40% (4/10 items)                                      │
│                                                                             │
│  BURNDOWN                                                                   │
│  ─────────                                                                  │
│  10 │ ○                                                                     │
│   8 │   ○ ○                                                                 │
│   6 │       ○ ●  ← você está aqui (esperado: 7, real: 6)                    │
│   4 │                                                                       │
│   2 │                                                                       │
│   0 └─────────────────                                                      │
│       1 2 3 4 5 6 7 8 9 10                                                  │
│                                                                             │
│  STATUS: ✅ No ritmo (1 item à frente do esperado)                          │
│                                                                             │
│  ITEMS DA SPRINT                                                            │
│  ────────────────                                                           │
│  ✅ E01: MS_Sprint.md v1.0                                                  │
│  ✅ E02: MS_Sprint_Arquitetura.md v1.0                                      │
│  🔄 E03: Relatório Backlog (em progresso)                                   │
│  ⬜ E04: Relatório Sprint                                                   │
│                                                                             │
│  IMPEDIMENTOS                                                               │
│  ─────────────                                                              │
│  Nenhum impedimento ativo                                                   │
│                                                                             │
│  MÉTRICAS                                                                   │
│  ────────                                                                   │
│  Velocidade atual: 1.3 items/dia                                            │
│  Velocidade necessária: 1.0 items/dia                                       │
│  Previsão de conclusão: 2025-12-25 (2 dias antes)                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## REFERÊNCIAS IMPORTANTES

| Arquivo | Conteúdo |
|---------|----------|
| docs/04_B/MS_Backlog.md | Backlog como Message Broker |
| docs/04_B/MS_Backlog_Arquitetura.md | Contratos e tipos |
| genesis/GENESIS.md | Visão geral do sistema |
| genesis/PROMETHEUS.md | Fábrica (produz/consome do backlog) |
| genesis/PROMETHEUS_Arquitetura.md | Collection execucoes, métricas |

---

## REGRAS DE OPERAÇÃO

### Regra de Carregamento
Antes de qualquer resposta:
1. Ler github:get_file_contents(path="genesis/GENESIS.md")
2. Ler github:get_file_contents(path="docs/04_B/MS_Backlog.md")
3. Identificar entregável atual

### Regra de Criação de Arquivos
Antes de criar/editar, ler:
- /docs/00_I_1_1_GitHub.md (regras GitHub + token efficiency)
- /docs/00_E/00_E_1_6_Documento.md (estrutura pastas + ciclo M0-M4)

Resumo:
1. Criar arquivos DIRETO no GitHub (sem preview no chat)
2. Informar apenas: "Arquivo criado: [path] - [resumo]"
3. Estrutura: docs/04_S/ para MS_Sprint

### Convenção de Commit
Padrão: [CAMADA] ação: descrição - Sprint/Task

Exemplo: [C4] add: MS_Sprint v1.0 - Cadência de trabalho - S021/E01

---

## SEQUÊNCIA DE SPRINTS

```
S020 (concluída) → S021 (atual) → S022 (próxima)
       ✅              🔄           Backlog
  PROMETHEUS v3.0   MS_Sprint    Primeira Dor Real
```

---

## COMO ACESSAR ARQUIVOS

Parâmetros fixos:
- owner: "leonardokasat-cientistavenda"
- repo: "conhecimento-zaz"
- branch: "main"

Listar pasta:
github:get_file_contents(path="docs/04_B")

Ler arquivo:
github:get_file_contents(path="docs/04_B/MS_Backlog.md")

Criar/atualizar:
github:create_or_update_file(path="docs/04_S/MS_Sprint.md", content="...", message="...")

---

## MONGODB

Database: genesis_db

Collections relevantes:
- sprints: Sprints cadastradas (S020, S021, S022)
- backlog_items: Items do backlog (quando implementado)
- execucoes: Execuções PROMETHEUS com métricas

Query status sprint:
```javascript
db.sprints.findOne({id: "S021"})
```

# BKL-S01: MS_Sprint como Orquestrador de Sagas

---

```yaml
id: BKL-S01
titulo: "MS_Sprint como Orquestrador de Sagas"
tipo: refatoracao
prioridade: "🔴"
status: Pendente
data_criacao: "2025-12-17"
saga_id: null
depende_de: []
produtor: "Humano"
tags:
  - ms_sprint
  - orquestracao
  - saga
  - execucao
```

---

## 1. Problema

MS_Sprint v1.0 seleciona items avulsos do backlog. Isso não resolve problemas completos.

```
HOJE (errado):
Sprint = pegar items do mesmo TIPO
  → 5 ciclo_epistemologico
  → Executa todos com Epistemologia
  → Problema: não resolve nenhum problema completo!

DEVERIA SER (correto):
Sprint = pegar items de uma SAGA (receita completa)
  → Saga X: entrevistar_dor → estruturar_produto → ciclo_epistemologico → desenvolvimento
  → Sprint carrega a saga (ou parte dela)
  → Executa NA ORDEM das dependências
  → Resultado: resolve o problema de ponta a ponta!
```

---

## 2. Metáfora

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SUPERMERCADO → COZINHA                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SAGA = Receita (ex: "Bolo de Chocolate")                                   │
│  BacklogItems = Ingredientes (farinha, ovos, chocolate)                     │
│  depende_de = Ordem de preparo (primeiro secos, depois líquidos)            │
│  MS_Sprint = Carrinho com lista de compras para AQUELA receita              │
│  MS (Prometheus, etc) = Cozinheiros especializados                          │
│                                                                             │
│  FLUXO:                                                                     │
│  ──────                                                                     │
│  1. Humano escolhe RECEITA (saga) no supermercado                           │
│  2. MS_Sprint carrega ingredientes no carrinho (items da saga)              │
│  3. MS_Sprint verifica ordem: "farinha antes de ovos"                       │
│  4. MS_Sprint chama cozinheiro certo para cada etapa                        │
│  5. Cozinheiro executa, passa para próximo                                  │
│  6. Bolo pronto!                                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Solução Proposta

### 3.1 Novos Métodos em MS_Sprint

```yaml
# Listar sagas disponíveis para execução
listar_sagas_pendentes():
  output: [{saga_id, titulo, etapas_total, etapas_pendentes, proxima_etapa}]
  fonte: MS_Backlog.distinct(saga_id) + agregações

# Carregar saga no sprint
selecionar_saga(saga_id):
  - Consulta MS_Backlog.pipeline_saga(saga_id)
  - Identifica items pendentes/bloqueados
  - Carrega no sprint com ordem de dependências
  - output: SprintSession com items ordenados

# Próximo item desbloqueado
proximo_item():
  - Verifica items da saga no sprint
  - Retorna primeiro com status=Pendente e deps resolvidas
  - output: BacklogItem + MS_consumidor

# Disparar execução
dispatch(item):
  - Identifica MS consumidor via roteamento
  - "Acorda" o MS: "execute este item"
  - Atualiza item.status = EmProcessamento
```

### 3.2 Fluxo de Uso

```
1. Humano: "genesis sprint sagas"
   MS_Sprint.listar_sagas_pendentes()
   → Mostra: [Saga A: 3/5 etapas, Saga B: 0/4 etapas]

2. Humano: "genesis sprint saga MS_CRM_Voz"
   MS_Sprint.selecionar_saga("MS_CRM_Voz")
   → Carrega pipeline: [entrevistar_dor → estruturar_produto → ...]

3. MS_Sprint: "Próximo: entrevistar_dor → GENESIS"
   Humano: "genesis sprint executar"
   MS_Sprint.dispatch(item)
   → GENESIS recebe e executa

4. GENESIS conclui, MS_Backlog.concluir() desbloqueia próximo
   MS_Sprint: "Próximo: estruturar_produto → MS_Produto"
```

### 3.3 Exemplo Concreto

```
Saga: "MS_CRM - Reporte por Voz"
────────────────────────────────

Pipeline (via depende_de):
  1. entrevistar_dor         → GENESIS      [Pendente]
  2. estruturar_produto      → MS_Produto   [Bloqueado - depende de 1]
  3. ciclo_epistemologico    → Epistemologia [Bloqueado - depende de 2]
  4. desenvolvimento         → Prometheus   [Bloqueado - depende de 3]
  5. aprovar_release         → MS_Produto   [Bloqueado - depende de 4]

Sprint carrega saga:
  - Items: [1, 2, 3, 4, 5]
  - Ordem: determinada por depende_de
  - Próximo executável: item 1 (único Pendente)
```

---

## 4. Impacto

### 4.1 Arquivos a Modificar

| Arquivo | Mudança | Esforço |
|---------|---------|---------|
| docs/04_S/MS_Sprint.md | Adicionar seção Orquestração de Sagas | Médio |
| docs/04_B/MS_Backlog_Arquitetura.md | Adicionar listar_sagas() | Baixo |
| genesis/GENESIS.md | Remover seção 10 (bootstrap MS_Sprint) | Baixo |

### 4.2 MS Consumidores (não mudam)

- GENESIS: já sabe executar entrevistar_dor
- MS_Produto: já sabe executar estruturar_produto
- Epistemologia: já sabe executar ciclo_epistemologico
- Prometheus: já sabe executar desenvolvimento

A lógica de execução não muda. O que muda é **quem os acorda**.

---

## 5. Pré-requisitos

- [x] MS_Sprint v1.0 publicado (S021)
- [x] MS_Backlog com saga_id, depende_de (v1.1)
- [x] MS_Backlog com pipeline_saga() (v1.2)

---

## 6. Critérios de Aceite

1. ✅ `genesis sprint sagas` lista sagas pendentes com progresso
2. ✅ `genesis sprint saga <id>` carrega pipeline ordenado
3. ✅ `genesis sprint executar` dispara item para MS correto
4. ✅ Após execução, próximo item é apresentado automaticamente
5. ✅ Sprint rastreia progresso da saga (não só tasks)
6. ✅ GENESIS.md não conhece MS específicos (desacoplado)

---

## 7. Tasks Previstas

| # | Task | Descrição |
|---|------|-----------|
| T01 | M0-M3 | Aplicar epistemologia na refatoração |
| T02 | MS_Backlog | Adicionar listar_sagas() |
| T03 | MS_Sprint | Refatorar para orquestração de sagas |
| T04 | GENESIS | Remover seção 10, simplificar |
| T05 | Guia Usuário | Atualizar comandos (saga, executar) |
| T06 | Testes | Validar fluxo completo |

---

## 8. Próxima Sprint Relacionada

**S023: Hello World de GENESIS**
- Discovery de capacidades via Catálogo
- MS auto-registram capacidades
- GENESIS apresenta menu dinâmico
- Depende de S022 para saber O QUÊ apresentar

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_S/MS_Sprint.md | Documento a refatorar |
| docs/04_B/MS_Backlog_Arquitetura.md | Interface de consulta |
| genesis/GENESIS.md | Simplificar |

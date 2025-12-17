# BKL-G01: Hello World de GENESIS

---

```yaml
id: BKL-G01
titulo: "Hello World de GENESIS - Discovery de Capacidades"
tipo: refatoracao
prioridade: "🟡"
status: Pendente
data_criacao: "2025-12-17"
saga_id: null
depende_de:
  - BKL-S01  # MS_Sprint como Orquestrador de Sagas
produtor: "Humano"
tags:
  - genesis
  - discovery
  - capacidades
  - boas_vindas
```

---

## 1. Problema

GENESIS v5.1 conhece MS hardcoded (seção 10 tem bootstrap específico de MS_Sprint). Isso cria acoplamento.

```
HOJE (acoplado):
GENESIS.md contém:
  - Seção 10: Bootstrap MS_Sprint
  - (amanhã) Seção 11: Bootstrap MS_Produto?
  - (depois) Seção 12: Bootstrap MS_CRM?
  → Explode em complexidade

DEVERIA SER (desacoplado):
GENESIS.md:
  - carregar_capacidades() via Catálogo
  - MS se auto-registram com suas capacidades
  → GENESIS só roteia
```

---

## ⚠️ ANTI-PADRÃO A EVITAR

```
ERRADO (limita GENESIS a continuador de sprints):
────────────────────────────────────────────────
Bootstrap:
  1. Consultar MongoDB sprint_sessions
  2. Se sprint pausada → mostrar contexto
  3. Perguntar se retoma

GENESIS vira "gerenciador de sprints" - mas isso é só UMA capacidade!

CORRETO (GENESIS como orquestrador de capacidades):
───────────────────────────────────────────────────
Bootstrap:
  1. Consultar Catálogo de capacidades
  2. Apresentar TODAS as capacidades disponíveis:
     - 📋 Sprint (gerenciar execução)
     - 🎯 Dor (entrevistar nova dor)
     - ✅ Produto (aprovar releases)
     - 📚 Conhecimento (buscar documentação)
     - ... outras que surgirão
  3. Rotear para MS correto conforme comando

GENESIS é o PONTO DE ENTRADA, não o executor de sprints.
```

---

## 2. Capacidades de GENESIS (exemplos)

| Capacidade | MS Responsável | Comando |
|------------|----------------|---------|
| Gerenciar sprints | MS_Sprint | `genesis sprint *` |
| Entrevistar dor | GENESIS | `genesis dor` |
| Aprovar release | MS_Produto | `genesis aprovar` |
| Buscar documentação | Catálogo | `genesis buscar` |
| Ver backlog | MS_Backlog | `genesis backlog *` |

**GENESIS não executa diretamente** - ele roteia para o MS correto.

---

## 3. Solução Proposta

### 3.1 Capacidades Auto-Registradas

Cada MS registra suas capacidades em formato padronizado:

```yaml
# Em cada MS (ex: MS_Sprint.md)
capacidades:
  namespace: "sprint"
  comandos:
    - id: "sprint.iniciar"
      descricao: "Iniciar nova sprint com saga"
      comando: "genesis sprint iniciar"
    - id: "sprint.sagas"
      descricao: "Listar sagas pendentes"
      comando: "genesis sprint sagas"
    - id: "sprint.status"
      descricao: "Ver status da sprint atual"
      comando: "genesis sprint status"
```

### 3.2 GENESIS Discovery

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS: DISCOVERY DE CAPACIDADES                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AO INICIAR:                                                                │
│  ────────────                                                               │
│  1. Catálogo.pesquisar(tipo: "meta_sistema")                                │
│  2. Para cada MS: extrair seção "capacidades"                               │
│  3. Agregar em menu dinâmico                                                │
│                                                                             │
│  APRESENTAR:                                                                │
│  ────────────                                                               │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │  🌟 GENESIS - Inteligência Híbrida                              │        │
│  │                                                                 │        │
│  │  O que você gostaria de fazer?                                  │        │
│  │                                                                 │        │
│  │  🎯 DOR                                                         │        │
│  │     • genesis dor - Reportar nova dor/problema                  │        │
│  │                                                                 │        │
│  │  📋 SPRINT                                                      │        │
│  │     • genesis sprint sagas - Ver sagas pendentes                │        │
│  │     • genesis sprint status - Ver sprint atual                  │        │
│  │                                                                 │        │
│  │  📦 BACKLOG                                                     │        │
│  │     • genesis backlog status - Métricas da fila                 │        │
│  │                                                                 │        │
│  │  ✅ PRODUTO                                                     │        │
│  │     • genesis aprovar - Aprovar release pendente                │        │
│  │                                                                 │        │
│  │  💡 genesis ajuda <comando> - Detalhes de um comando            │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Roteamento Dinâmico

```python
def rotear_comando(input: str):
    """
    GENESIS roteia para MS correto baseado no comando.
    """
    # Extrair namespace
    partes = input.split()  # "genesis sprint status"
    namespace = partes[1]   # "sprint"
    
    # Buscar MS que registrou esse namespace
    ms = Catalogo.pesquisar(
        tipo="meta_sistema",
        filtro={"capacidades.namespace": namespace}
    )
    
    # Delegar para MS
    return ms.executar(input)
```

---

## 4. Impacto

### 4.1 Arquivos a Modificar

| Arquivo | Mudança | Esforço |
|---------|---------|---------|
| genesis/GENESIS.md | Remover hardcoded, adicionar discovery | Médio |
| docs/04_S/MS_Sprint.md | Adicionar seção capacidades | Baixo |
| docs/04_B/MS_Backlog.md | Adicionar seção capacidades | Baixo |
| docs/04_P/MS_Produto.md | Adicionar seção capacidades | Baixo |

### 4.2 Catálogo

- Precisa indexar MS com suas capacidades
- Query: `tipo="meta_sistema"` retorna lista de MS
- Cada MS tem array de capacidades com comandos

---

## 5. Pré-requisitos

- [ ] S022 concluída (MS_Sprint como Orquestrador)
- [ ] MS com capacidades definidas para registrar

---

## 6. Critérios de Aceite

1. ✅ GENESIS não tem conhecimento hardcoded de MS específicos
2. ✅ MS registram suas capacidades em formato padronizado
3. ✅ `genesis ajuda` lista todas capacidades descobertas
4. ✅ Comandos são roteados dinamicamente para MS correto
5. ✅ Adicionar novo MS não requer mudar GENESIS
6. ✅ GENESIS não consulta sprint_sessions diretamente (anti-padrão)

---

## 7. Tasks Previstas

| # | Task | Descrição |
|---|------|-----------|
| T01 | Schema | Definir formato de capacidades |
| T02 | MS_Sprint | Adicionar seção capacidades |
| T03 | MS_Backlog | Adicionar seção capacidades |
| T04 | MS_Produto | Adicionar seção capacidades |
| T05 | GENESIS | Refatorar para discovery |
| T06 | Catálogo | Garantir query por meta_sistema |
| T07 | Testes | Validar discovery e roteamento |

---

## 8. Relação com S022

```
S022: MS_Sprint como Orquestrador de Sagas
  - Define COMO funciona a execução
  - MS_Sprint "acorda" MS para executar items
  - Mecânica de orquestração

S023: Hello World de GENESIS (este)
  - Define COMO apresentar capacidades
  - GENESIS descobre MS dinamicamente
  - Interface de entrada

S022 primeiro porque:
  - A interface depende da mecânica
  - Não adianta apresentar capacidades se não funcionam
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Documento a refatorar |
| _backlog/BKL-S01_MS_Sprint_Orquestrador_Sagas.md | Pré-requisito |
| _backlog/capability_discovery.md | Ideias relacionadas |

# MS_Sprint Arquitetura v1.0

---

```yaml
nome: MS_Sprint_Arquitetura
versao: "1.0"
tipo: Documento
status: Publicado
camada: 4
data_publicacao: "2025-12-17"
pai: docs/04_S/MS_Sprint.md
depende_de:
  - docs/04_S/MS_Sprint.md
  - docs/04_B/MS_Backlog.md
```

---

Este documento detalha a arquitetura técnica do MS_Sprint. Para visão de propósito, ver MS_Sprint.md.

---

## 1. Dashboard ASCII - Template

### 1.1 Template Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        📊 SPRINT {codigo} - {STATUS}                        │
│                              {titulo}                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROGRESSO                                                                  │
│  {barra} {percentual}%  ({concluidas}/{total} tasks)                        │
│                                                                             │
│  TEMPO                           ESFORÇO                                    │
│  ┌──────────────────┐            ┌──────────────────┐                       │
│  │ Início: {inicio} │            │ Estimado: {est}h │                       │
│  │ Fim:    {fim}    │            │ Realizado:{real}h│                       │
│  │ Duração: {dur}   │            │ Variação: {var}% │                       │
│  └──────────────────┘            └──────────────────┘                       │
│                                                                             │
│  ESCOPO                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Planejado: {plan}  Adicionado: {add}  Removido: {rem}  Deprecado: {dep}│  │
│  │ Estabilidade: {barra_estab} {nivel}                                  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  TASKS                                                                      │
│  ┌────────┬────────────────────────────────┬────────┬──────────┬─────────┐  │
│  │ Código │ Título                         │ Status │ Estimado │Realizado│  │
│  ├────────┼────────────────────────────────┼────────┼──────────┼─────────┤  │
│  │ {cod}  │ {titulo_30}                    │ {icon} │ {est}    │ {real}  │  │
│  └────────┴────────────────────────────────┴────────┴──────────┴─────────┘  │
│                                                                             │
│  ARTEFATOS                                                                  │
│  ├── {path} ............................ {versao_antes} → {versao_depois}  │
│  └── {path} ............................ {versao_antes} → {versao_depois}  │
│                                                                             │
│  RESUMO                                                                     │
│  {objetivo ou notas de conclusão}                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Exemplo Preenchido

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        📊 SPRINT S022 - CONCLUÍDA                           │
│                   MS_Sprint como Orquestrador de Receitas                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROGRESSO                                                                  │
│  ████████████████████████████████████████ 100%  (6/6 tasks)                 │
│                                                                             │
│  TEMPO                           ESFORÇO                                    │
│  ┌──────────────────┐            ┌──────────────────┐                       │
│  │ Início: 13:10    │            │ Estimado:  N/D   │                       │
│  │ Fim:    15:50    │            │ Realizado: 2.7h  │                       │
│  │ Duração: 2h40m   │            │ Variação:  N/D   │                       │
│  └──────────────────┘            └──────────────────┘                       │
│                                                                             │
│  ESCOPO                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Planejado: 6  Adicionado: 0  Removido: 0  Deprecado: 0               │   │
│  │ Estabilidade: ██████████ ALTA                                        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  TASKS                                                                      │
│  ┌────────┬────────────────────────────────┬────────┬──────────┬─────────┐  │
│  │ Código │ Título                         │ Status │ Estimado │Realizado│  │
│  ├────────┼────────────────────────────────┼────────┼──────────┼─────────┤  │
│  │ T01    │ M0-M3 Epistemologia            │ ✅     │   N/D    │  25min  │  │
│  │ T02    │ MS_Backlog - listar_filhos...  │ ✅     │   N/D    │  22min  │  │
│  │ T03    │ MS_Sprint - task-concluir...   │ ✅     │   N/D    │  15min  │  │
│  │ T04    │ GENESIS - simplificar          │ ✅     │   N/D    │  15min  │  │
│  │ T05    │ Guia Usuário                   │ ✅     │   N/D    │    -    │  │
│  │ T06    │ Testes - validar fluxo         │ ✅     │   N/D    │   7min  │  │
│  └────────┴────────────────────────────────┴────────┴──────────┴─────────┘  │
│                                                                             │
│  ARTEFATOS                                                                  │
│  ├── docs/04_B/MS_Backlog.md ................... v1.0 → v1.1               │
│  ├── docs/04_B/MS_Backlog_Arquitetura.md ....... v1.2 → v1.3               │
│  ├── docs/04_S/MS_Sprint.md .................... v1.0 → v1.1               │
│  └── genesis/GENESIS.md ........................ v5.1 → v5.2               │
│                                                                             │
│  RESUMO                                                                     │
│  Sprint concluída com sucesso. MS_Sprint agora consulta filhos ao           │
│  concluir tasks e puxa subtasks automaticamente (auto_pull).                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Campos e Fontes

### 2.1 Mapeamento de Campos

| Campo | Fonte | Cálculo |
|-------|-------|---------|
| `codigo` | sprint_sessions.codigo | direto |
| `STATUS` | sprint_sessions.status | uppercase (ATIVA/PAUSADA/CONCLUÍDA) |
| `titulo` | sprint_sessions.titulo | direto |
| `percentual` | tasks[] | (concluidas / total) * 100 |
| `barra` | percentual | █ por 2.5%, ░ restante (40 chars) |
| `concluidas` | tasks[] | count where status = "concluida" |
| `total` | tasks[] | count all |
| `inicio` | sprint_sessions.created_at | HH:MM |
| `fim` | sprint_sessions.concluida_em | HH:MM ou "-" se ativa |
| `duracao` | fim - inicio | XhYYm |
| `estimado` | sum(tasks.esforco_estimado_horas) | soma, "N/D" se todos null |
| `realizado` | sum(calcular_realizado(task)) | soma calculada |
| `variacao` | (realizado - estimado) / estimado * 100 | %, "N/D" se estimado null |
| `plan` | escopo_inicial.tasks.length | contagem |
| `add` | mudancas_escopo where tipo="adicao" | contagem |
| `rem` | mudancas_escopo where tipo="remocao" | contagem |
| `dep` | mudancas_escopo where tipo="deprecacao" | contagem |
| `estabilidade` | calcular_estabilidade() | ALTA/MÉDIA/BAIXA |
| `barra_estab` | estabilidade | barra visual |

### 2.2 Query MongoDB Principal

```javascript
db.sprint_sessions.findOne({ codigo: "S023" })
```

**Retorno usado:**

```javascript
{
  codigo: "S023",
  titulo: "Relatórios Automáticos MS_Sprint",
  objetivo: "Implementar geração automática de RelatorioSprint",
  status: "ativa",
  created_at: ISODate("2025-12-17T15:55:00Z"),
  concluida_em: null,
  tasks: [
    {
      codigo: "T01",
      titulo: "Especificar output do relatório",
      status: "concluida",
      esforco_estimado_horas: 0.5,
      iniciada_em: ISODate("..."),
      concluida_em: ISODate("...")
    },
    // ...
  ],
  escopo_inicial: {
    tasks: [{ codigo: "T01", titulo: "..." }, ...]
  },
  mudancas_escopo: [
    { tipo: "adicao", task_codigo: "T05", timestamp: ISODate("...") }
  ]
}
```

---

## 3. Funções de Cálculo

### 3.1 calcular_realizado()

```python
def calcular_realizado(task: dict) -> float | None:
    """
    Calcula tempo realizado de uma task.
    
    Prioridade:
    1. esforco_realizado manual (se preenchido)
    2. Calculado por timestamps (se iniciada e concluída)
    3. Em andamento (tempo parcial desde início)
    4. None (exibe "-")
    """
    
    # Prioridade 1: esforço manual
    if task.get("esforco_realizado"):
        return sum(e["horas"] for e in task["esforco_realizado"])
    
    # Prioridade 2: calculado por timestamps
    if task.get("iniciada_em") and task.get("concluida_em"):
        delta = task["concluida_em"] - task["iniciada_em"]
        return delta.total_seconds() / 3600
    
    # Prioridade 3: em andamento
    if task.get("iniciada_em") and task.get("status") == "em_andamento":
        delta = datetime.now() - task["iniciada_em"]
        return delta.total_seconds() / 3600
    
    # Prioridade 4: não calculável
    return None
```

### 3.2 gerar_barra_progresso()

```python
def gerar_barra_progresso(percentual: float, largura: int = 40) -> str:
    """
    Gera barra visual de progresso.
    
    Exemplo:
    - 0%:   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    - 50%:  ████████████████████░░░░░░░░░░░░░░░░░░░░
    - 100%: ████████████████████████████████████████
    """
    
    preenchido = int(percentual / 100 * largura)
    vazio = largura - preenchido
    
    return "█" * preenchido + "░" * vazio
```

### 3.3 calcular_estabilidade()

```python
def calcular_estabilidade(mudancas_escopo: list, escopo_inicial: dict) -> tuple[str, str]:
    """
    Calcula estabilidade do escopo baseado na taxa de mudanças.
    
    Retorna: (barra, nivel)
    
    Níveis:
    - ALTA:  <= 10% de mudanças
    - MÉDIA: <= 30% de mudanças
    - BAIXA: > 30% de mudanças
    """
    
    total_inicial = len(escopo_inicial.get("tasks", []))
    if total_inicial == 0:
        return ("██████████", "ALTA")
    
    total_mudancas = len(mudancas_escopo)
    taxa = total_mudancas / total_inicial
    
    if taxa <= 0.1:
        return ("██████████", "ALTA")
    elif taxa <= 0.3:
        return ("██████░░░░", "MÉDIA")
    else:
        return ("███░░░░░░░", "BAIXA")
```

### 3.4 formatar_duracao()

```python
def formatar_duracao(inicio: datetime, fim: datetime | None) -> str:
    """
    Formata duração entre dois timestamps.
    
    Exemplos:
    - 2h40m
    - 45min
    - 3h
    - "-" (se fim é None)
    """
    
    if fim is None:
        return "-"
    
    delta = fim - inicio
    total_minutos = int(delta.total_seconds() / 60)
    
    horas = total_minutos // 60
    minutos = total_minutos % 60
    
    if horas == 0:
        return f"{minutos}min"
    elif minutos == 0:
        return f"{horas}h"
    else:
        return f"{horas}h{minutos}m"
```

### 3.5 formatar_tempo_task()

```python
def formatar_tempo_task(horas: float | None) -> str:
    """
    Formata tempo de task para exibição.
    
    Exemplos:
    - None  → "N/D"
    - 0.5   → "30min"
    - 1.0   → "1h"
    - 1.5   → "1h30m"
    - 0.12  → "7min"
    """
    
    if horas is None:
        return "N/D"
    
    total_minutos = int(horas * 60)
    h = total_minutos // 60
    m = total_minutos % 60
    
    if h == 0:
        return f"{m}min"
    elif m == 0:
        return f"{h}h"
    else:
        return f"{h}h{m}m"
```

### 3.6 truncar_titulo()

```python
def truncar_titulo(titulo: str, max_len: int = 30) -> str:
    """
    Trunca título para caber na coluna.
    Adiciona "..." se truncado.
    """
    
    if len(titulo) <= max_len:
        return titulo.ljust(max_len)
    
    return titulo[:max_len-3] + "..."
```

---

## 4. Ícones de Status

### 4.1 Mapeamento

| Status | Ícone | Descrição |
|--------|-------|-----------|
| concluida | ✅ | Task finalizada |
| em_andamento | 🔄 | Task em execução |
| pendente | ⬜ | Task aguardando |
| deprecada | ❌ | Task cancelada |
| bloqueada | 🔒 | Task com impedimento |

### 4.2 Função

```python
def get_status_icon(status: str) -> str:
    """Retorna ícone para o status."""
    
    icons = {
        "concluida": "✅",
        "em_andamento": "🔄",
        "pendente": "⬜",
        "deprecada": "❌",
        "bloqueada": "🔒"
    }
    
    return icons.get(status, "❓")
```

---

## 5. Regras de Exibição

### 5.1 Tratamento de Valores Nulos

| Situação | Campo | Exibição |
|----------|-------|----------|
| Sem estimativa | Estimado | "N/D" |
| Task não iniciada | Realizado | "-" |
| Task em andamento | Realizado | tempo parcial |
| Sprint ativa | Fim | "-" |
| Sem variação calculável | Variação | "N/D" |
| Sem artefatos | Seção ARTEFATOS | omitir seção |
| Sem mudanças escopo | Adicionado/Removido | "0" |

### 5.2 Formatação de Números

```python
def formatar_percentual(valor: float | None) -> str:
    """Formata percentual ou retorna N/D."""
    if valor is None:
        return "N/D"
    return f"{valor:.0f}%"

def formatar_horas(valor: float | None) -> str:
    """Formata horas ou retorna N/D."""
    if valor is None:
        return "N/D"
    return f"{valor:.1f}h"
```

---

## 6. Schema RelatorioSprint

### 6.1 Estrutura Completa

```yaml
RelatorioSprint:
  # Header
  sprint:
    codigo: String              # S023
    titulo: String              # "Relatórios Automáticos..."
    status: String              # ativa | pausada | concluida
    objetivo: String            # Objetivo da sprint
  
  # Progresso
  progresso:
    percentual: Number          # 0-100
    barra: String               # "████████░░░░..."
    tasks_concluidas: Number
    tasks_em_andamento: Number
    tasks_pendentes: Number
    tasks_deprecadas: Number
    tasks_total: Number
  
  # Tempo
  tempo:
    inicio: DateTime
    fim: DateTime?              # null se ativa
    duracao: String             # "2h40m"
  
  # Esforço
  esforco:
    estimado_total: Number?     # null se nenhuma task tem estimativa
    realizado_total: Number
    variacao_percentual: Number? # null se estimado é null
  
  # Escopo
  escopo:
    planejado: Number
    adicionado: Number
    removido: Number
    deprecado: Number
    estabilidade:
      barra: String             # "██████████"
      nivel: String             # ALTA | MÉDIA | BAIXA
  
  # Tasks
  tasks: [{
    codigo: String              # T01
    titulo: String              # truncado
    status: String              # concluida | em_andamento | ...
    status_icon: String         # ✅ | 🔄 | ...
    estimado: String            # "0.5h" | "N/D"
    realizado: String           # "25min" | "-"
    task_pai: String?           # T01 (para subtasks)
    nivel: Number               # 0 = raiz, 1 = subtask
  }]
  
  # Artefatos
  artefatos: [{
    path: String                # docs/04_S/MS_Sprint.md
    versao_antes: String        # v1.0
    versao_depois: String       # v1.1
  }]?                           # null se vazio
  
  # Resumo
  resumo: String                # objetivo ou notas
```

### 6.2 Função Geradora

```python
def gerar_relatorio_sprint(codigo: str) -> RelatorioSprint:
    """
    Gera RelatorioSprint a partir de uma sprint_session.
    """
    
    # 1. Buscar dados
    sessao = db.sprint_sessions.find_one({"codigo": codigo})
    
    # 2. Calcular progresso
    tasks = sessao["tasks"]
    concluidas = sum(1 for t in tasks if t["status"] == "concluida")
    em_andamento = sum(1 for t in tasks if t["status"] == "em_andamento")
    pendentes = sum(1 for t in tasks if t["status"] == "pendente")
    deprecadas = sum(1 for t in tasks if t["status"] == "deprecada")
    total = len(tasks)
    percentual = (concluidas / total * 100) if total > 0 else 0
    
    # 3. Calcular esforço
    estimados = [t.get("esforco_estimado_horas") for t in tasks]
    estimado_total = sum(e for e in estimados if e) if any(estimados) else None
    
    realizados = [calcular_realizado(t) for t in tasks]
    realizado_total = sum(r for r in realizados if r) or 0
    
    variacao = None
    if estimado_total:
        variacao = ((realizado_total - estimado_total) / estimado_total) * 100
    
    # 4. Calcular escopo
    escopo_inicial = sessao.get("escopo_inicial", {})
    mudancas = sessao.get("mudancas_escopo", [])
    
    planejado = len(escopo_inicial.get("tasks", []))
    adicionado = sum(1 for m in mudancas if m["tipo"] == "adicao")
    removido = sum(1 for m in mudancas if m["tipo"] == "remocao")
    deprecado = sum(1 for m in mudancas if m["tipo"] == "deprecacao")
    
    barra_estab, nivel_estab = calcular_estabilidade(mudancas, escopo_inicial)
    
    # 5. Formatar tasks
    tasks_formatadas = []
    for t in tasks:
        realizado = calcular_realizado(t)
        tasks_formatadas.append({
            "codigo": t["codigo"],
            "titulo": truncar_titulo(t["titulo"]),
            "status": t["status"],
            "status_icon": get_status_icon(t["status"]),
            "estimado": formatar_tempo_task(t.get("esforco_estimado_horas")),
            "realizado": formatar_tempo_task(realizado),
            "task_pai": t.get("task_pai"),
            "nivel": t.get("nivel", 0)
        })
    
    # 6. Coletar artefatos
    artefatos = []
    for t in tasks:
        for a in t.get("artefatos", []):
            artefatos.append(a)
    
    # 7. Montar relatório
    return {
        "sprint": {
            "codigo": sessao["codigo"],
            "titulo": sessao["titulo"],
            "status": sessao["status"],
            "objetivo": sessao.get("objetivo", "")
        },
        "progresso": {
            "percentual": percentual,
            "barra": gerar_barra_progresso(percentual),
            "tasks_concluidas": concluidas,
            "tasks_em_andamento": em_andamento,
            "tasks_pendentes": pendentes,
            "tasks_deprecadas": deprecadas,
            "tasks_total": total
        },
        "tempo": {
            "inicio": sessao["created_at"],
            "fim": sessao.get("concluida_em"),
            "duracao": formatar_duracao(
                sessao["created_at"],
                sessao.get("concluida_em") or datetime.now()
            )
        },
        "esforco": {
            "estimado_total": estimado_total,
            "realizado_total": realizado_total,
            "variacao_percentual": variacao
        },
        "escopo": {
            "planejado": planejado,
            "adicionado": adicionado,
            "removido": removido,
            "deprecado": deprecado,
            "estabilidade": {
                "barra": barra_estab,
                "nivel": nivel_estab
            }
        },
        "tasks": tasks_formatadas,
        "artefatos": artefatos if artefatos else None,
        "resumo": sessao.get("objetivo", "")
    }
```

---

## 7. Renderização ASCII

### 7.1 Função Principal

```python
def renderizar_dashboard(relatorio: RelatorioSprint) -> str:
    """
    Renderiza RelatorioSprint como dashboard ASCII.
    """
    
    s = relatorio["sprint"]
    p = relatorio["progresso"]
    t = relatorio["tempo"]
    e = relatorio["esforco"]
    esc = relatorio["escopo"]
    
    # Header
    status_upper = s["status"].upper()
    header = f"""
┌─────────────────────────────────────────────────────────────────────────────┐
│                        📊 SPRINT {s['codigo']} - {status_upper:^10}                        │
│{s['titulo']:^77}│
├─────────────────────────────────────────────────────────────────────────────┤"""
    
    # Progresso
    progresso = f"""
│                                                                             │
│  PROGRESSO                                                                  │
│  {p['barra']} {p['percentual']:3.0f}%  ({p['tasks_concluidas']}/{p['tasks_total']} tasks){"":>23}│"""
    
    # Tempo e Esforço
    inicio = t["inicio"].strftime("%H:%M") if t["inicio"] else "-"
    fim = t["fim"].strftime("%H:%M") if t["fim"] else "-"
    est_str = formatar_horas(e["estimado_total"])
    real_str = f"{e['realizado_total']:.1f}h"
    var_str = formatar_percentual(e["variacao_percentual"])
    
    tempo_esforco = f"""
│                                                                             │
│  TEMPO                           ESFORÇO                                    │
│  ┌──────────────────┐            ┌──────────────────┐                       │
│  │ Início: {inicio:>8} │            │ Estimado:{est_str:>6} │                       │
│  │ Fim:    {fim:>8} │            │ Realizado:{real_str:>5}│                       │
│  │ Duração: {t['duracao']:>7} │            │ Variação:{var_str:>6} │                       │
│  └──────────────────┘            └──────────────────┘                       │"""
    
    # Escopo
    escopo = f"""
│                                                                             │
│  ESCOPO                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Planejado: {esc['planejado']:<2}  Adicionado: {esc['adicionado']:<2}  Removido: {esc['removido']:<2}  Deprecado: {esc['deprecado']:<2}│   │
│  │ Estabilidade: {esc['estabilidade']['barra']} {esc['estabilidade']['nivel']:<5}                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │"""
    
    # Tasks
    tasks_header = """
│                                                                             │
│  TASKS                                                                      │
│  ┌────────┬────────────────────────────────┬────────┬──────────┬─────────┐  │
│  │ Código │ Título                         │ Status │ Estimado │Realizado│  │
│  ├────────┼────────────────────────────────┼────────┼──────────┼─────────┤  │"""
    
    tasks_rows = ""
    for task in relatorio["tasks"]:
        tasks_rows += f"""
│  │ {task['codigo']:<6} │ {task['titulo']:<30} │ {task['status_icon']:<6} │ {task['estimado']:>8} │{task['realizado']:>8} │  │"""
    
    tasks_footer = """
│  └────────┴────────────────────────────────┴────────┴──────────┴─────────┘  │"""
    
    # Artefatos (se houver)
    artefatos = ""
    if relatorio["artefatos"]:
        artefatos = """
│                                                                             │
│  ARTEFATOS                                                                  │"""
        for i, a in enumerate(relatorio["artefatos"]):
            prefix = "├──" if i < len(relatorio["artefatos"]) - 1 else "└──"
            artefatos += f"""
│  {prefix} {a['path']:<40} {a['versao_antes']} → {a['versao_depois']}  │"""
    
    # Resumo
    resumo = f"""
│                                                                             │
│  RESUMO                                                                     │
│  {relatorio['resumo'][:71]:<71}│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘"""
    
    return header + progresso + tempo_esforco + escopo + tasks_header + tasks_rows + tasks_footer + artefatos + resumo
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_S/MS_Sprint.md | Documento pai - propósito |
| docs/04_B/MS_Backlog.md | Fonte de items |
| docs/04_B/MS_Backlog_Arquitetura.md | Padrão seguido |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-17 | Criação inicial. Template dashboard ASCII. Funções de cálculo. Schema RelatorioSprint. Função renderizadora. Sprint S023/T05. |

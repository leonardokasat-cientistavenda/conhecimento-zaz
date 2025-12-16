---
nome: 00_E_Epistemologia_Arquitetura
versao: "1.0"
tipo: Arquitetura
classe_ref: Arquitetura
origem: interno
status: Published
etapa: M4
nivel: C3
sprint_ref: S019
task_ref: T05
---

# Epistemologia Arquitetura v1.0

## 1. Visão Geral

Este documento define **COMO** Epistemologia persiste e gerencia Specs.
O documento `Epistemologia.md` define **O QUÊ** (método M0-M4, vertentes).

### 1.1 Decisões Arquiteturais

| Decisão | Descrição |
|---------|-----------|
| **SSOT** | MongoDB (genesis_db.backlog_items) |
| **Tipo de item** | backlog_item com `tipo: "spec"` |
| **GitHub _specs/** | Não existe (zero redundância) |
| **Visualização humana** | Ad-hoc via `gerar_spec_md()` |
| **Versionamento** | Via `updated_at` no MongoDB |

### 1.2 Motivação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    POR QUE MONGODB COMO SSOT                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MongoDB                                GitHub (.md)                        │
│  ───────                                ────────────                        │
│  ✓ JSON nativo                          ✗ Precisa parsear Markdown          │
│  ✓ Queries estruturadas                 ✗ Busca por texto                   │
│  ✓ schema_tdd já é objeto               ✗ YAML embutido em .md              │
│  ✓ Índices (por vertente, status)       ✗ Sem índices                       │
│  ✓ Transacional                         ✗ Commits são lentos                │
│                                                                             │
│  PROMETHEUS lê direto do MongoDB, sem parsing.                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Persistência

### 2.1 Schema: backlog_item tipo "spec"

Collection: `genesis_db.backlog_items`

```javascript
{
  _id: ObjectId,
  id: "SPEC-001",                      // Identificador único
  titulo: "Classe Usuario",            // Nome legível
  tipo: "spec",                        // ← Diferencia de feature, bug, etc.
  status: "Pendente",                  // Lifecycle state
  prioridade: "alta",                  // Para priorização
  sprint_ref: null,                    // Preenchido quando entra em sprint
  ms_ref: "MS_Produto",                // Meta Sistema dono
  
  spec: {                              // ← Subdocumento técnico
    vertente: "M3.E",                  // M3.E, M3.P, M3.D, M3.I, M3.C
    classe_ref: "Usuario",             // Nome da classe/processo
    artefatos_esperados: [".py", "test_.py", ".feature"],
    
    schema_tdd: {                      // ← Contrato para PROMETHEUS
      classe_ref: "Usuario",
      classes_equivalencia: [
        {
          atributo: "idade",
          tipo: "int",
          particoes: [
            {nome: "negativa", valores_exemplo: [-1], valida: false},
            {nome: "valida", valores_exemplo: [25], valida: true},
            {nome: "acima_limite", valores_exemplo: [151], valida: false}
          ]
        }
      ],
      criterios_aceite: [
        {
          id: "CA01",
          metodo: "criar",
          given: "dados válidos",
          when: "criar() é chamado",
          then: "Usuario é criado",
          particoes_ref: ["valida"]
        }
      ],
      cobertura: "pairwise",
      combinacoes_estimadas: 25
    },
    
    // Campos específicos M3.P (BPMN)
    migration_plan: null,              // Se M3.P e versão > 1
    error_handling: null               // Se M3.P
  },
  
  // Histórico de rejeições (se houver)
  rejection_history: [],
  
  created_at: ISODate,
  updated_at: ISODate
}
```

### 2.2 Campos por Vertente

| Campo | M3.E | M3.P | M3.D | M3.I | M3.C |
|-------|------|------|------|------|------|
| schema_tdd | ✓ | ✓ | ✓ | ✗ | ✗ |
| migration_plan | ✗ | ✓ | ✗ | ✗ | ✗ |
| error_handling | ✗ | ✓ | ✗ | ✗ | ✗ |
| artefatos_esperados | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## 3. Lifecycle da Spec

### 3.1 Estados

```
                       EPISTEMOLOGIA
                            │
                            │ cria
                            ▼
                     ┌──────────┐
                     │ Pendente │◄───────────────────┐
                     └────┬─────┘                    │
                          │                          │
            ┌─────────────┼─────────────┐            │
            │ aprova      │             │ rejeita    │ revisa
            ▼             │             ▼            │
     ┌──────────┐         │      ┌──────────┐        │
     │ Aprovada │         │      │ Rejeitada├────────┘
     └────┬─────┘         │      └──────────┘
          │               │
          │ em_sprint     │
          ▼               │
   ┌───────────┐          │
   │ Em Sprint │          │
   └─────┬─────┘          │
         │                │
         │ implementada   │
         ▼                │
 ┌─────────────┐          │
 │Implementada │          │
 └─────────────┘
```

### 3.2 Transições

| De | Para | Quem | Ação |
|----|------|------|------|
| (novo) | Pendente | Epistemologia | Cria spec após M0-M4 |
| Pendente | Aprovada | MS_Produto | Valida spec |
| Pendente | Rejeitada | MS_Produto | Rejeita com motivo |
| Rejeitada | Pendente | Epistemologia | Revisa e resubmete |
| Aprovada | Em Sprint | MS_Backlog | Inclui em sprint |
| Em Sprint | Implementada | PROMETHEUS | Gera artefatos |

### 3.3 Status Enum

```javascript
status: "Pendente" | "Aprovada" | "Rejeitada" | "Em Sprint" | "Implementada"
```

---

## 4. Fluxo de Dados

```
┌────────────┐      ciclo_epistemologico      ┌──────────────┐
│ MS_Backlog │ ──────────────────────────────▶│ EPISTEMOLOGIA│
└────────────┘                                └──────┬───────┘
                                                     │
                                                     │ cria backlog_item
                                                     │ tipo: "spec"
                                                     ▼
                                            ┌────────────────┐
                                            │    MongoDB     │
                                            │ backlog_items  │
                                            └───────┬────────┘
                                                    │
                      ┌─────────────────────────────┼─────────────────────────┐
                      │                             │                         │
                      ▼                             ▼                         ▼
               ┌────────────┐              ┌────────────┐              ┌───────────┐
               │ MS_Produto │              │ MS_Backlog │              │ PROMETHEUS│
               │  aprova/   │              │  sprint    │              │   gera    │
               │  rejeita   │              │  planning  │              │ artefatos │
               └────────────┘              └────────────┘              └───────────┘
                      ▲
                      │
                      │ gerar_spec_md()
                      │ (ad-hoc, não persiste)
               ┌──────┴─────┐
               │   Humano   │
               │  "mostre   │
               │  a spec"   │
               └────────────┘
```

---

## 5. Método: gerar_spec_md()

### 5.1 Assinatura

```
gerar_spec_md(spec_id: string): string
```

### 5.2 Comportamento

| Aspecto | Descrição |
|---------|-----------|
| **Entrada** | ID da spec (ex: "SPEC-001") |
| **Processo** | Busca MongoDB → Renderiza template |
| **Saída** | Markdown formatado (string) |
| **Persistência** | NÃO persiste (exibe no chat) |

### 5.3 Algoritmo

```
1. db.backlog_items.findOne({id: spec_id, tipo: "spec"})
2. Se não encontrar → erro "Spec não encontrada"
3. Extrair: titulo, spec.vertente, spec.classe_ref, spec.schema_tdd
4. Renderizar template Markdown
5. Retornar string para exibição
```

### 5.4 Triggers

| Frase do Usuário | Ação |
|------------------|------|
| "mostre a spec SPEC-001" | gerar_spec_md("SPEC-001") |
| "gere documento da spec Usuario" | Buscar por classe_ref, então gerar |
| "quero ver a spec do processo de vendas" | Buscar por titulo, então gerar |

### 5.5 Template de Saída

```markdown
# Spec: {titulo}

**ID:** {id}
**Vertente:** {spec.vertente}
**Classe:** {spec.classe_ref}
**Status:** {status}
**Artefatos:** {spec.artefatos_esperados}

## Schema TDD

### Classes de Equivalência
{renderizar spec.schema_tdd.classes_equivalencia}

### Critérios de Aceite
{renderizar spec.schema_tdd.criterios_aceite}

### Cobertura
- Estratégia: {spec.schema_tdd.cobertura}
- Combinações: {spec.schema_tdd.combinacoes_estimadas}
```

---

## 6. Queries Úteis

### 6.1 Specs por Status

```javascript
// Specs pendentes de aprovação
db.backlog_items.find({tipo: "spec", status: "Pendente"})

// Specs aprovadas aguardando sprint
db.backlog_items.find({tipo: "spec", status: "Aprovada"})

// Specs em execução
db.backlog_items.find({tipo: "spec", status: "Em Sprint"})
```

### 6.2 Specs por Meta Sistema

```javascript
// Specs do MS_Produto
db.backlog_items.find({tipo: "spec", ms_ref: "MS_Produto"})
```

### 6.3 Specs por Sprint

```javascript
// Specs na sprint atual
db.backlog_items.find({tipo: "spec", sprint_ref: "S020"})
```

### 6.4 Specs por Vertente (para PROMETHEUS)

```javascript
// Specs POO para gerar código
db.backlog_items.find({
  tipo: "spec",
  status: "Em Sprint",
  "spec.vertente": "M3.E"
})

// Specs BPMN para gerar workflows
db.backlog_items.find({
  tipo: "spec",
  status: "Em Sprint",
  "spec.vertente": "M3.P"
})
```

### 6.5 Contagem por Status

```javascript
db.backlog_items.aggregate([
  {$match: {tipo: "spec"}},
  {$group: {_id: "$status", count: {$sum: 1}}}
])
```

---

## 7. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_Epistemologia.md | Define O QUÊ (método, vertentes) |
| docs/00_E/00_E_1_7_Schema_TDD.md | Schema TDD detalhado |
| _catalogo/templates/M3_E_POO.md | Template M3.E |
| _catalogo/templates/M3_P_BPMN.md | Template M3.P |
| genesis/PROMETHEUS.md | Consumidor de specs |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | **Publicação.** Arquitetura de persistência: MongoDB SSOT, backlog_item tipo "spec", lifecycle, gerar_spec_md(). Sprint S019/T05. |

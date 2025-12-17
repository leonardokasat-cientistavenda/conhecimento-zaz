# Capacidades - Schema MongoDB

---

```yaml
database: genesis
collection: capacidades
versao: "1.0"
criado_em: "2025-12-17"
sprint: S024
task: T01
```

---

## Propósito

SSOT (Single Source of Truth) para descoberta de capacidades do sistema GENESIS. Permite:

1. GENESIS descobrir MS dinamicamente (O(1) query)
2. Menu multinível para usuário
3. Roteamento transparente (LLM ou código)
4. Evolução de capacidades (draft → prod)

---

## Schema

```yaml
Capacidade:
  # Identidade
  _id: ObjectId                   # Auto-gerado
  id: String                      # Identificador único: "ms_epistemologia"
  tipo: String                    # "meta_sistema" | "modulo" | "ferramenta"
  
  # UX (apresentação ao usuário)
  nome: String                    # "Epistemologia"
  icone: String                   # "📚"
  descricao_curta: String         # "Criar conhecimento estruturado"
  descricao_longa: String         # Texto completo para ajuda
  
  # Localização do código/spec
  path: String                    # "docs/00_E/00_E_Epistemologia.md"
  versao: String                  # "3.4"
  
  # Hierarquia (menu multinível)
  pai_id: String | null           # null = raiz, "ms_epistemologia" = filho
  ordem: Number                   # Para ordenar no menu (1, 2, 3...)
  
  # Maturidade (roteamento transparente)
  maturidade:
    fase: String                  # "draft" | "spec" | "code" | "prod"
    prometheus_ref: String | null # ID do código gerado (futuro)
  
  # Capacidades (comandos disponíveis)
  capacidades: [{
    id: String                    # "criar_dor"
    nome: String                  # "Criar nova Dor"
    descricao: String             # "Entrevistar e documentar um problema"
    comando: String               # "genesis dor"
    
    # Integração com Backlog
    gera_backlog: Boolean         # true = cria item ao executar
    tipo_item_backlog: String?    # "ciclo_epistemologico"
    consome_backlog: String?      # Tipo que esta capacidade processa
    
    # Controle de execução
    requer_sprint: Boolean        # true = só executa dentro de sprint
    autonomo: Boolean             # true = pode executar sem confirmação
  }]
  
  # Metadata
  created_at: DateTime
  updated_at: DateTime
```

---

## Índices

| Nome | Campos | Propósito |
|------|--------|-----------|
| `_id_` | `_id` | Padrão MongoDB |
| `idx_id` | `id` | Buscar por identificador |
| `idx_tipo` | `tipo` | Filtrar por tipo (meta_sistema, modulo) |
| `idx_capacidades_comando` | `capacidades.comando` | Rotear comando para capacidade |
| `idx_maturidade_fase` | `maturidade.fase` | Filtrar por fase de maturidade |
| `idx_hierarquia` | `pai_id`, `ordem` | Navegação menu multinível |

---

## Queries Principais

### Bootstrap GENESIS (menu nível 1)

```javascript
db.capacidades.find({
  tipo: "meta_sistema",
  pai_id: null
}).sort({ ordem: 1 })
```

### Menu nível 2 (capacidades de um MS)

```javascript
db.capacidades.findOne({
  id: "ms_epistemologia"
}).capacidades
```

### Rotear comando

```javascript
db.capacidades.findOne({
  "capacidades.comando": "genesis dor"
})
```

### Filtrar por fase

```javascript
db.capacidades.find({
  "maturidade.fase": { $in: ["draft", "spec"] }
})
```

---

## Valores de Enumeração

### tipo

| Valor | Descrição |
|-------|-----------|
| `meta_sistema` | MS completo (Sprint, Backlog, Epistemologia) |
| `modulo` | Módulo de um MS (Catálogo, Raciocínio) |
| `ferramenta` | Ferramenta utilitária |

### maturidade.fase

| Valor | Execução | Descrição |
|-------|----------|-----------|
| `draft` | LLM | Prototipação, alta entropia |
| `spec` | LLM | Spec congelada, ainda LLM |
| `code` | Worker | PROMETHEUS gerou código |
| `prod` | Worker | Produção, monitorado |

---

## Roteamento Transparente

```python
def rotear(comando: str):
    cap = db.capacidades.findOne({"capacidades.comando": comando})
    
    if cap.maturidade.fase in ["draft", "spec"]:
        return executar_llm(cap.path)
    elif cap.maturidade.fase in ["code", "prod"]:
        return executar_codigo(cap.maturidade.prometheus_ref)
```

**Usuário não sabe qual caminho foi executado.**

---

## Exemplos de Documentos

### Meta Sistema (raiz)

```json
{
  "_id": ObjectId("..."),
  "id": "ms_epistemologia",
  "tipo": "meta_sistema",
  "nome": "Conhecer",
  "icone": "📚",
  "descricao_curta": "Criar conhecimento estruturado",
  "descricao_longa": "Sistema para criar documentação anti-entrópica usando metodologia M0-M4",
  "path": "docs/00_E/00_E_Epistemologia.md",
  "versao": "3.4",
  "pai_id": null,
  "ordem": 1,
  "maturidade": {
    "fase": "draft",
    "prometheus_ref": null
  },
  "capacidades": [
    {
      "id": "criar_dor",
      "nome": "Criar nova Dor",
      "descricao": "Entrevistar e documentar um problema",
      "comando": "genesis dor",
      "gera_backlog": true,
      "tipo_item_backlog": "ciclo_epistemologico",
      "consome_backlog": null,
      "requer_sprint": false,
      "autonomo": false
    },
    {
      "id": "ciclo_m0_m4",
      "nome": "Executar M0-M4",
      "descricao": "Transformar problema em documento",
      "comando": "genesis conhecer",
      "gera_backlog": false,
      "consome_backlog": "ciclo_epistemologico",
      "requer_sprint": true,
      "autonomo": false
    }
  ],
  "created_at": ISODate("2025-12-17T15:50:00Z"),
  "updated_at": ISODate("2025-12-17T15:50:00Z")
}
```

---

## Invariantes

| Invariante | Descrição |
|------------|-----------|
| **ID-UNICO** | Campo `id` deve ser único na collection |
| **FASE-VALIDA** | `maturidade.fase` deve ser um dos valores válidos |
| **COMANDO-UNICO** | `capacidades.comando` deve ser único globalmente |
| **HIERARQUIA-VALIDA** | Se `pai_id` não é null, deve existir documento com esse `id` |
| **ORDEM-POSITIVA** | Campo `ordem` deve ser > 0 |

---

## Referências

| Documento | Relação |
|-----------|---------|
| _sprints/S024_Genesis_Hello_World.md | Sprint que criou este schema |
| _backlog/BKL-G01_Genesis_Hello_World.md | Item de backlog |
| _backlog/BKL-M01_Modelo_Maturidade.md | Modelo de maturidade (parcialmente absorvido) |

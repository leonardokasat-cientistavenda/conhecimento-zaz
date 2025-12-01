---
nome: 00_O_1_2_2_GitHub_Actions
versao: "1.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_O_1_2_2_GitHub_Actions

## 1. Definição

GitHub Actions é a classe que define validação automática e sync Git → Outline.

Segundo componente do Pipeline de Documentação.

---

## 2. Workflows

| Workflow | Trigger | Função |
|----------|---------|--------|
| validate.yml | push docs/ | Valida frontmatter, links, encoding |
| sync-outline.yml | push docs/ | Sincroniza com Outline |

---

## 3. Método: ResolverHierarquia

### 3.1 Regra

```
Pai = documento existente com prefixo mais curto que contém o atual
```

### 3.2 Algoritmo

```python
def resolver_hierarquia(nome_doc, docs_existentes):
    """
    Input: nome do documento (ex: 00_E_1_2_Metodo)
    Output: nome do documento pai (ex: 00_E_Epistemologia)
    
    Regra: busca prefixo existente mais curto
    """
    partes = nome_doc.split('_')
    
    # Remove última parte iterativamente
    for i in range(len(partes) - 1, 0, -1):
        prefixo = '_'.join(partes[:i])
        
        # Busca documento que começa com prefixo
        for doc in docs_existentes:
            doc_nome = doc.replace('.md', '')
            if doc_nome.startswith(prefixo) and doc_nome != nome_doc:
                return doc_nome
    
    return None  # root da collection
```

### 3.3 Exemplos

```
00_E_1_2_Metodo
├── Tenta: 00_E_1 → não existe
├── Tenta: 00_E   → existe 00_E_Epistemologia
└── Pai: 00_E_Epistemologia ✓

00_O_1_1_1_Definir_Objeto
├── Tenta: 00_O_1_1 → existe 00_O_1_1_Metodo_Epistemologico
└── Pai: 00_O_1_1_Metodo_Epistemologico ✓

00_E_Epistemologia
├── Tenta: 00_E → é ele mesmo
├── Tenta: 00   → não existe
└── Pai: None (root) ✓
```

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                      GITHUB ACTIONS                             │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  git push docs/                                         │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                    │
│                            ▼                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  validate.yml                                           │   │
│   │  ├── Frontmatter YAML válido?                           │   │
│   │  ├── Links internos existem?                            │   │
│   │  ├── Encoding UTF-8?                                    │   │
│   │  └── Seções obrigatórias?                               │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │ se válido                          │
│                            ▼                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  sync-outline.yml                                       │   │
│   │  ├── MapearCollection(pasta)                            │   │
│   │  ├── ResolverHierarquia(prefixo) ◄── CRÍTICO            │   │
│   │  ├── SyncDocument(criar/atualizar)                      │   │
│   │  └── AtualizarFrontmatter(outline_id)                   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Hierarquia Esperada

### Collection Epistemologia

```
00_E_Epistemologia (root)
├── 00_E_1_1_Classe
├── 00_E_1_2_Metodo
├── 00_E_1_3_Framework
└── 00_E_1_4_Documento
```

### Collection Ontologia

```
00_O_Ontologia (root)
├── 00_O_1_1_Metodo_Epistemologico
│   └── 00_O_1_1_1_Definir_Objeto
└── 00_O_1_2_Pipeline_Documentacao
    ├── 00_O_1_2_1_GitHub
    ├── 00_O_1_2_2_GitHub_Actions
    └── 00_O_1_2_3_Outline
```

---

## 6. Validações

| Regra | Descrição | Falha |
|-------|-----------|-------|
| Frontmatter | YAML válido, campos obrigatórios | Bloqueia sync |
| Links | Referências internas existem | Warning |
| Encoding | UTF-8 | Bloqueia sync |
| Diagrama | Seção presente | Warning |
| Histórico | Tabela presente | Warning |

---

## 7. Secrets Necessários

| Secret | Descrição |
|--------|-----------|
| OUTLINE_API_TOKEN | Token API Outline |
| CF_ACCOUNT_ID | Cloudflare Account ID |
| CF_ZONE_ID | Cloudflare Zone ID |
| CF_API_TOKEN | Cloudflare API Token |

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_1_GitHub | Irmão (estrutura) |
| 00_O_1_2_3_Outline | Irmão (publicação) |
| 00_E_1_4_Documento | Define frontmatter |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação; ResolverHierarquia; Validações |

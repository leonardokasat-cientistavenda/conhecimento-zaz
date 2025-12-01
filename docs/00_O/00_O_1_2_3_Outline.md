---
nome: 00_O_1_2_3_Outline
versao: "1.1"
tipo: Framework
classe_ref: Framework
origem: externo
status: Draft
outline_id: 
outline_url: 
---

# 00_O_1_2_3_Outline

## 1. Definição

Outline é a classe que define estrutura de publicação e mapeamento Git → Outline.

Terceiro componente do Pipeline de Documentação.

---

## 2. Collections

| Collection ID | Nome | Pasta Git |
|---------------|------|-----------|
| e305c77a-... | Epistemologia | docs/00_E/ |
| dc5d8afd-... | Ontologia | docs/00_O/ |
| 7179e7b0-... | Domínios | docs/01/ |

---

## 3. API Endpoints

| Endpoint | Função |
|----------|--------|
| documents.create | Cria documento |
| documents.update | Atualiza existente |
| documents.search | Busca por título |
| collections.list | Lista collections |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                        OUTLINE SYNC                             │
│                                                                 │
│   docs/00_E/arquivo.md                                          │
│            │                                                    │
│            │ (1) MapearCollection                               │
│            ▼                                                    │
│   Collection: Epistemologia                                     │
│            │                                                    │
│            │ (2) ResolverHierarquia                             │
│            ▼                                                    │
│   parentDocumentId: 00_E_Epistemologia                          │
│            │                                                    │
│            │ (3) SyncDocument                                   │
│            ▼                                                    │
│   documents.create / documents.update                           │
│            │                                                    │
│            │ (4) AtualizarFrontmatter                           │
│            ▼                                                    │
│   outline_id: xyz789                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Hierarquia Esperada

```
Collection: Epistemologia
└── 00_E_Epistemologia (root)
    ├── 00_E_1_1_Classe
    ├── 00_E_1_2_Metodo
    ├── 00_E_1_3_Framework
    └── 00_E_1_4_Documento

Collection: Ontologia
└── 00_O_Ontologia (root)
    ├── 00_O_1_1_Metodo_Epistemologico
    │   └── 00_O_1_1_1_Definir_Objeto
    └── 00_O_1_2_Pipeline_Documentacao
        ├── 00_O_1_2_1_GitHub
        ├── 00_O_1_2_2_GitHub_Actions
        └── 00_O_1_2_3_Outline
```

---

## 6. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_1_GitHub | Irmão |
| 00_O_1_2_2_GitHub_Actions | Irmão |
| 00_E_1_4_Documento | Define frontmatter |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação |
| 1.1 | 2025-12-01 | Migração frontmatter YAML |

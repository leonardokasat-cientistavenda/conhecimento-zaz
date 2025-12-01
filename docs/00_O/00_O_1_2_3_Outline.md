---
nome: 00_O_1_2_3_Outline
versao: "1.0"
tipo: Framework
classe_ref: Framework
origem: externo
status: Draft
---

# 00_O_1_2_3_Outline
**Versão:** 1.0  
**Tipo:** Framework  
**Classe_ref:** Framework  
**Origem:** externo  
**Status:** Draft

---

## 1. Definição

Outline é a classe que define estrutura de publicação e regras de mapeamento Git → Outline.

Terceiro componente do Pipeline de Documentação.

---

## 2. Collections

| Collection | Pasta Git | Conteúdo |
|------------|-----------|----------|
| Epistemologia | docs/00_E/ | Classes, Métodos, Frameworks, Documento |
| Ontologia | docs/00_O/ | Método Epistemológico, Pipeline |
| Domínios | docs/01/ | Mercado, Segmentos, Produto, GTM |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         SYNC GIT → OUTLINE                                  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  GitHub (docs/)                                                     │   │
│   │                                                                     │   │
│   │  docs/00_E/00_E_Epistemologia.md                                    │   │
│   │  docs/00_E/00_E_1_1_Classe.md                                       │   │
│   │  docs/00_O/00_O_Ontologia.md                                        │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             │ (1) LerFrontmatter                            │
│                             │ (2) MapearCollection                          │
│                             │ (3) SincronizarOutline                        │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Outline                                                            │   │
│   │                                                                     │   │
│   │  Collection: Epistemologia                                          │   │
│   │  └── 00_E_Epistemologia (root)                                      │   │
│   │      ├── 00_E_1_1_Classe                                            │   │
│   │      └── ...                                                        │   │
│   │                                                                     │   │
│   │  Collection: Ontologia                                              │   │
│   │  └── 00_O_Ontologia (root)                                          │   │
│   │      └── ...                                                        │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Regra de Hierarquia

Pai = prefixo mais curto que contém o atual.

```
Collection: Ontologia
└── 00_O_Ontologia (root)
    ├── 00_O_1_1_Metodo_Epistemologico
    │   └── 00_O_1_1_1_Definir_Objeto
    └── 00_O_1_2_Pipeline_Documentacao
        ├── 00_O_1_2_1_GitHub
        └── 00_O_1_2_3_Outline
```

---

## 5. API Endpoints

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| documents.create | POST | Cria documento, retorna ID |
| documents.update | POST | Atualiza documento existente |
| documents.info | POST | Busca por ID |
| collections.list | POST | Lista collections |

---

## 6. Frontmatter Requerido para Sync

```yaml
---
outline_id: string     # Preenchido após primeiro sync
outline_url: string    # Preenchido após primeiro sync
---
```

---

## 7. Estrutura Final

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
        └── 00_O_1_2_3_Outline
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_1_GitHub | Irmão (estrutura) |
| 00_E_1_4_Documento | Define frontmatter |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação; Collections; Hierarquia; API endpoints |

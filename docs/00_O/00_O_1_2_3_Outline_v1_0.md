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

## 2. M1: Objeto Definido

| Campo | Valor |
|-------|-------|
| nome | Outline |
| versao | 1.0 |
| tipo_pesquisa | Prescritivo |
| objetivo | Definir estrutura de publicação e regras de mapeamento Git → Outline |
| escopo | Collections, hierarquia aninhada, formato URL, frontmatter requerido |
| fronteiras | Não cobre: resolução de links, sync script, validação, UI/UX |
| requisitos | API token, 3 collection_ids, convenção de nomes |
| spec_funcional | Pasta Git → Collection; Prefixo → Hierarquia; Doc → URL acessível |
| criterio_sucesso | Estrutura Outline espelha Git com navegação funcional |
| criterio_insucesso | Documento órfão, hierarquia incorreta, URL quebrada |

---

## 3. M2: Marco Teórico

### Fontes

| Fonte | Contribuição |
|-------|--------------|
| Outline API Docs | Endpoints RPC style |
| outline-sync-action | GitHub Action por benhowes |
| outline-wiki-api | Python wrapper |

### API Endpoints

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| documents.create | POST | Cria documento, retorna ID |
| documents.update | POST | Atualiza documento existente |
| documents.info | POST | Busca por ID |
| documents.search | POST | Busca por título |
| collections.list | POST | Lista collections |
| collections.info | POST | Info de collection |

### Autenticação

```
Header: Authorization: Bearer YOUR_API_KEY
```

### Estrutura de URL

```
Formato: {OUTLINE_URL}/doc/{titulo-slug}-{urlId}
Simplificado: {OUTLINE_URL}/doc/{urlId}
```

---

## 4. M3: Classes

### 4.1 Collection

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | UUID | Identificador único |
| name | string | Nome da collection |
| description | string | Descrição |

### 4.2 Document

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | UUID | Identificador único |
| urlId | string | Slug curto para URL |
| title | string | Título do documento |
| text | string | Conteúdo markdown |
| collectionId | UUID | Collection pai |
| parentDocumentId | UUID | Documento pai (hierarquia) |

### 4.3 Frontmatter Requerido

```yaml
---
outline_document_id: <uuid>
title: Título do Documento
---
```

---

## 5. M4: Métodos

### 5.1 MapearCollection

| Campo | Valor |
|-------|-------|
| Input | Pasta Git |
| Output | Collection Outline |

```
docs/00_E/ → Collection: Epistemologia
docs/00_O/ → Collection: Ontologia
docs/01/   → Collection: Domínios
```

### 5.2 ResolverHierarquia

| Campo | Valor |
|-------|-------|
| Input | Prefixo do documento |
| Output | parentDocumentId |

```
Regra: Pai = prefixo mais curto que contém o atual

00_O_1_1_1_Definir_Objeto
    │
    └── Pai: 00_O_1_1_Metodo_Epistemologico
```

### 5.3 SyncDocument

| Campo | Valor |
|-------|-------|
| Input | Arquivo .md |
| Output | Documento no Outline |

```
Se outline_id existe:
    documents.update(id, text)
Senão:
    documents.create(title, text, collectionId, parentDocumentId)
    Salva outline_id no frontmatter
```

### 5.4 AtualizarFrontmatter

| Campo | Valor |
|-------|-------|
| Input | Response da API |
| Output | Frontmatter atualizado |

```yaml
---
outline_id: abc123
outline_url: /doc/titulo-abc123
---
```

---

## 6. Diagrama

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                              OUTLINE SYNC                                   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  docs/00_O/00_O_1_1_Metodo.md                                       │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             │ (1) MapearCollection                          │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Collection: Ontologia                                              │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             │ (2) ResolverHierarquia                        │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  parentDocumentId: 00_O_Ontologia                                   │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             │ (3) SyncDocument                              │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  API: documents.create / documents.update                           │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             │ (4) AtualizarFrontmatter                      │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  outline_id: xyz789                                                 │   │
│   │  outline_url: /doc/metodo-xyz789                                    │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Estrutura Final

```
Collection: Ontologia
└── 00_O_Ontologia (root)
    ├── 00_O_1_1_Metodo_Epistemologico
    │   └── 00_O_1_1_1_Definir_Objeto
    └── 00_O_1_2_Pipeline_Documentacao
        ├── 00_O_1_2_1_GitHub
        ├── 00_O_1_2_2_GitHub_Actions
        └── 00_O_1_2_3_Outline

Collection: Epistemologia
└── 00_E_Epistemologia (root)
    ├── 00_E_1_1_Classe
    ├── 00_E_1_2_Metodo
    ├── 00_E_1_3_Framework
    └── 00_E_1_4_Documento

Collection: Domínios
└── 01_Dominios (root)
    ├── 01_1_Mercado
    ├── 01_2_Segmentos
    └── ...
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_1_GitHub | Irmão (estrutura) |
| 00_O_1_2_2_GitHub_Actions | Irmão (validação) |
| 00_E_1_4_Documento | Define frontmatter |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação; M1-M5 completo; 4 métodos; Estrutura collections |

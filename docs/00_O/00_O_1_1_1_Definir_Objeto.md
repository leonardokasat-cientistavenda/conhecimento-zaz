---
nome: 00_O_1_1_1_Definir_Objeto
versao: "1.1"
tipo: Metodo
classe_ref: Metodo
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_O_1_1_1_Definir_Objeto

## 1. Definição

Definir Objeto é o primeiro método (M1) do Método Epistemológico.

Transforma problema vago em objeto de pesquisa estruturado.

---

## 2. I/O

| Campo | Valor |
|-------|-------|
| Input | Problema (texto livre) |
| Output | Objeto Definido |

---

## 3. Schema Output

| Campo | Tipo | Descrição |
|-------|------|-----------|
| nome | string | Identificador |
| versao | string | SemVer |
| tipo_pesquisa | enum | Exploratório, Descritivo, Prescritivo |
| objetivo | string | O que resolver |
| escopo | string | O que cobre |
| fronteiras | string | O que não cobre |
| requisitos | string[] | Pré-condições |
| spec_funcional | string | Comportamento esperado |
| criterio_sucesso | string | Quando está completo |
| criterio_insucesso | string | Quando falhou |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                      M1: DEFINIR OBJETO                         │
│                                                                 │
│   ┌─────────────────┐          ┌─────────────────────────────┐  │
│   │    PROBLEMA     │          │      OBJETO DEFINIDO        │  │
│   │                 │          │                             │  │
│   │  "Preciso de    │   ───►   │  nome: Pipeline_Doc         │  │
│   │   um sistema    │          │  objetivo: Sync Git→Outline │  │
│   │   de docs..."   │          │  escopo: docs/, validation  │  │
│   │                 │          │  fronteiras: UI, auth       │  │
│   └─────────────────┘          │  criterio_sucesso: ...      │  │
│                                │                             │  │
│                                └─────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Submétodos

| Ordem | Nome | Descrição |
|-------|------|-----------|
| 1 | Extrair Objetivo | Identificar problema central |
| 2 | Delimitar Escopo | Definir fronteiras |
| 3 | Especificar Critérios | Sucesso/Insucesso |
| 4 | Validar Completude | Schema completo? |

---

## 6. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_1_Metodo_Epistemologico | Pai |
| 00_E_1_2_Metodo | Classe epistemológica |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2025-12-01 | Migração frontmatter YAML |

# 00_META
**Versão:** 1.0  
**Tipo:** Introducao  
**Status:** Draft

---

## 1. Definição

META é a camada raiz que define o Método Científico para geração de conhecimento estruturado.

Contém Epistemologia (como conhecer) e Ontologia (o que existe).

---

## 2. Método Científico

Uso de Epistemologia e Ontologia para aumentar conhecimento sobre um objeto.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         MÉTODO CIENTÍFICO                                   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  ENTRADA                                                            │   │
│   │  ├── Fontes (marcos teóricos externos)                              │   │
│   │  └── Conhecimento prévio (ontologia existente)                      │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              │ alimenta                                     │
│                              ▼                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  EPISTEMOLOGIA                                                      │   │
│   │  ├── Classes (estrutura)                                            │   │
│   │  ├── Métodos (transformação)                                        │   │
│   │  └── Frameworks (sequência)                                         │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              │ instancia                                    │
│                              ▼                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  ONTOLOGIA                                                          │   │
│   │  ├── Catálogo (objetos)                                             │   │
│   │  └── Descobertas (validações, refutações, achados)                  │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              │ retroalimenta                                │
│                              ▼                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  PRÓXIMO CICLO                                                      │   │
│   │  ├── Descobertas viram conhecimento prévio                          │   │
│   │  └── Epistemologia pode ser refinada                                │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Estrutura

```
00_META
│
├── 00_E_Epistemologia
│   │
│   └── 00_E_1_Classes
│       ├── 00_E_1_1_Classe
│       ├── 00_E_1_2_Metodo
│       ├── 00_E_1_3_Framework
│       └── 00_E_1_4_Documento
│
└── 00_O_Ontologia
    │
    ├── 00_O_1_Fontes
    │   └── 00_O_1_1_Metodo_Epistemologico
    │
    ├── 00_O_2_Catalogo
    │
    └── 00_O_3_Descobertas
```

---

## 4. Princípios

| Princípio | Descrição |
|-----------|-----------|
| **Recursividade** | Sistema usa a si mesmo para evoluir |
| **Versionamento** | Toda mudança gera nova versão |
| **Bidirecionalidade** | Top-down (estrutura) + Bottom-up (descobertas) |
| **Separação** | Epistemologia define, Ontologia armazena |

---

## 5. Ciclo de estabilização

```
v1.0 ─────► v1.1 ─────► v1.2 ─────► v2.0 ─────► ESTÁVEL
  │           │           │           │
  │  muitas   │  algumas  │  poucas   │  raras
  │  mudanças │  mudanças │  mudanças │  mudanças
  ▼           ▼           ▼           ▼
FLUIDO ──────────────────────────────────────► SÓLIDO
```

---

## 6. Aplicação

O Método Científico é genérico.

Pode ser aplicado a qualquer domínio de conhecimento:

```
00_META (Método Científico)
    │
    │ aplica
    ▼
01_DOMÍNIOS (primeiro uso)
    │
    │ aplica
    ▼
01.1_NEGÓCIO, 01.2_MERCADO, etc.
```

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Filho |
| 00_O_Ontologia | Filho |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação; Método Científico; Estrutura base |

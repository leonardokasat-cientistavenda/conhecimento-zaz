---
nome: 00_E_Epistemologia
versao: "1.0"
tipo: Introducao
classe_ref: Documento
origem: interno
status: Draft
---

# 00_E_Epistemologia
**Versão:** 1.0  
**Tipo:** Introducao  
**Status:** Draft

---

## 1. Definição

Epistemologia é a dimensão que define **como conhecer**.

Contém Classes, Métodos e Frameworks que estruturam a geração de conhecimento.

---

## 2. Estrutura

```
00_E_Epistemologia
│
└── 00_E_1_Classes
    ├── 00_E_1_1_Classe
    ├── 00_E_1_2_Metodo
    ├── 00_E_1_3_Framework
    └── 00_E_1_4_Documento
```

---

## 3. Classes Fundamentais

| Classe | Definição | Função |
|--------|-----------|--------|
| Classe | Molde abstrato | Define estrutura |
| Método | Processo I/O | Define transformação |
| Framework | Agregador de Métodos | Define sequência |
| Documento | Template de armazenamento | Define persistência |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────┐
│                    EPISTEMOLOGIA                        │
│                                                         │
│   ┌─────────────┐                                       │
│   │   Classe    │ ◄─── define estrutura                 │
│   └──────┬──────┘                                       │
│          │                                              │
│          │ tipifica I/O                                 │
│          ▼                                              │
│   ┌─────────────┐                                       │
│   │   Método    │ ◄─── define transformação             │
│   └──────┬──────┘                                       │
│          │                                              │
│          │ agrega                                       │
│          ▼                                              │
│   ┌─────────────┐                                       │
│   │  Framework  │ ◄─── define sequência                 │
│   └──────┬──────┘                                       │
│          │                                              │
│          │ persiste via                                 │
│          ▼                                              │
│   ┌─────────────┐                                       │
│   │  Documento  │ ◄─── define armazenamento             │
│   └─────────────┘                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Relação com Ontologia

```
EPISTEMOLOGIA                    ONTOLOGIA
│                                     │
│  Classe ─────── instancia ────────► Objeto
│  Método ─────── executa ──────────► Transformação
│  Framework ──── instancia ────────► Framework específico
│  Documento ──── instancia ────────► Arquivo .md
│                                     │
```

---

## 6. Glossário

### Termos POO

| Termo | Definição |
|-------|-----------|
| Classe | Blueprint abstrato |
| Objeto | Instância concreta |
| Atributo | Propriedade |
| Herança | Classe filha herda de pai |
| Composição | Classe contém outra |
| Agregação | Classe referencia outra |

### Termos Filosóficos

| Termo | Definição |
|-------|-----------|
| Epistemológico | Relativo ao método/sistema |
| Ontológico | Relativo ao que existe |

---

## 7. Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Classe | PascalCase | Documento, Metodo |
| Atributo | snake_case | classe_ref, versão |
| Método | Verbo infinitivo | Mapear Classes |
| Arquivo | NN_E_N_Nome.md | 00_E_1_1_Classe.md |

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_META | Pai |
| 00_E_1_1_Classe | Filho |
| 00_E_1_2_Metodo | Filho |
| 00_E_1_3_Framework | Filho |
| 00_E_1_4_Documento | Filho |
| 00_O_Ontologia | Irmão |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação; 4 classes fundamentais |

---
nome: 00_E_Epistemologia
versao: "1.0"
tipo: Introducao
classe_ref: 
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_E_Epistemologia

## 1. Definição

Epistemologia é a dimensão que define **como conhecer**.

Contém Classes, Métodos e Frameworks. Não contém instâncias.

---

## 2. Estrutura

```
00_E_Epistemologia
│
├── 00_E_1_1_Classe
├── 00_E_1_2_Metodo
├── 00_E_1_3_Framework
└── 00_E_1_4_Documento
```

---

## 3. Componentes

| Componente | Definição | Documento |
|------------|-----------|-----------|
| Classe | Molde que define atributos | 00_E_1_1_Classe |
| Método | Processo com input/output | 00_E_1_2_Metodo |
| Framework | Agregador de métodos | 00_E_1_3_Framework |
| Documento | Formato de persistência | 00_E_1_4_Documento |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                       EPISTEMOLOGIA                             │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│   │   CLASSE    │  │   MÉTODO    │  │  FRAMEWORK  │             │
│   │             │  │             │  │             │             │
│   │ Define      │  │ Processa    │  │ Orquestra   │             │
│   │ estrutura   │  │ I/O         │  │ sequência   │             │
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│          │                │                │                    │
│          │                │                │                    │
│          ▼                ▼                ▼                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                      ONTOLOGIA                          │   │
│   │                                                         │   │
│   │   Objeto = instância de Classe                          │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Referências

| Documento | Relação |
|-----------|---------|
| 00_META | Pai |
| 00_O_Ontologia | Irmão |
| 00_E_1_1_Classe | Filho |
| 00_E_1_2_Metodo | Filho |
| 00_E_1_3_Framework | Filho |
| 00_E_1_4_Documento | Filho |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação; Migração para frontmatter YAML |

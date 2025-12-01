---
nome: 00_O_Ontologia
versao: "1.0"
tipo: Introducao
classe_ref: Documento
origem: interno
status: Draft
---

# 00_O_Ontologia
**Versão:** 1.0  
**Tipo:** Introducao  
**Status:** Draft

---

## 1. Definição

Ontologia é a dimensão que armazena **o que existe**.

Contém instâncias de Classes definidas na Epistemologia.

---

## 2. Estrutura

```
00_O_Ontologia
│
├── 00_O_1_Fontes
│   └── Frameworks instanciados (externos e internos)
│   └── Sistemas externos
│
├── 00_O_2_Catalogo
│   └── Objetos por Classe
│
└── 00_O_3_Descobertas
    ├── Validações
    ├── Refutações
    └── Achados
```

---

## 3. Componentes

| Componente | Definição | Conteúdo |
|------------|-----------|----------|
| **Fontes** | De onde vem conhecimento | Marcos teóricos, Sistemas externos |
| **Catálogo** | O que sabemos | Objetos instanciados |
| **Descobertas** | O que aprendemos | Resultados de experimentos |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                         ONTOLOGIA                               │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                       FONTES                            │   │
│   │                                                         │   │
│   │   ┌─────────────────┐   ┌─────────────────┐             │   │
│   │   │   Frameworks    │   │    Sistemas     │             │   │
│   │   │                 │   │                 │             │   │
│   │   │ • VPC           │   │ • IBGE          │             │   │
│   │   │ • Lean Startup  │   │ • RF_CNPJ       │             │   │
│   │   │ • Met. Epist.   │   │ • CRM           │             │   │
│   │   └─────────────────┘   └─────────────────┘             │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                      CATÁLOGO                           │   │
│   │                                                         │   │
│   │   Objetos instanciados por Classe                       │   │
│   │   • classe_ref: Classe                                  │   │
│   │   • atributos: {}                                       │   │
│   │   • status: HIPÓTESE | VALIDADO | REFUTADO              │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    DESCOBERTAS                          │   │
│   │                                                         │   │
│   │   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │   │
│   │   │ VALIDAÇÃO   │ │ REFUTAÇÃO   │ │   ACHADO    │       │   │
│   │   │             │ │             │ │             │       │   │
│   │   │ Hipótese    │ │ Hipótese    │ │ Emergente   │       │   │
│   │   │ confirmada  │ │ negada      │ │ inesperado  │       │   │
│   │   └─────────────┘ └─────────────┘ └─────────────┘       │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Ciclo de vida do Conhecimento

```
FONTES
    │
    │ alimenta
    ▼
CATÁLOGO (status: HIPÓTESE)
    │
    │ experimenta
    ▼
DESCOBERTAS
    │
    ├── Validação → CATÁLOGO (status: VALIDADO)
    ├── Refutação → CATÁLOGO (status: REFUTADO)
    └── Achado → CATÁLOGO (novo objeto, status: HIPÓTESE)
```

---

## 6. Relação com Epistemologia

| Epistemologia | Ontologia |
|---------------|-----------|
| Define Classe | Armazena Objeto |
| Define Método | Executa Transformação |
| Define Framework | Armazena Instância |
| Define Documento | Armazena Arquivo .md |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_META | Pai |
| 00_E_Epistemologia | Irmão |
| 00_O_1_1_Metodo_Epistemologico | Filho |
| 00_O_1_2_Pipeline_Documentacao | Filho |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação; Fontes, Catálogo, Descobertas |

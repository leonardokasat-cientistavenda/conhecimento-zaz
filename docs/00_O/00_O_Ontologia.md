---
nome: 00_O_Ontologia
versao: "1.1"
tipo: Introducao
classe_ref: 
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_O_Ontologia

## 1. Definição

Ontologia é a dimensão que armazena **o que existe**.

Contém instâncias de Classes definidas na Epistemologia.

---

## 2. Estrutura

```
00_O_Ontologia
│
├── 00_O_1_1_Metodo_Epistemologico
│   └── 00_O_1_1_1_Definir_Objeto
│
└── 00_O_1_2_Pipeline_Documentacao
    ├── 00_O_1_2_1_GitHub
    ├── 00_O_1_2_2_GitHub_Actions
    └── 00_O_1_2_3_Outline
```

---

## 3. Componentes

| Componente | Definição | Conteúdo |
|------------|-----------|----------|
| Fontes | De onde vem conhecimento | Marcos teóricos, Sistemas |
| Catálogo | O que sabemos | Objetos instanciados |
| Descobertas | O que aprendemos | Validações, Refutações |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                         ONTOLOGIA                               │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                       FONTES                            │   │
│   │   Frameworks externos | Sistemas | Marcos teóricos      │   │
│   └─────────────────────────────────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                      CATÁLOGO                           │   │
│   │   Objetos: classe_ref + atributos + status              │   │
│   └─────────────────────────────────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    DESCOBERTAS                          │   │
│   │   Validação | Refutação | Achado                        │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Relação com Epistemologia

| Epistemologia | Ontologia |
|---------------|-----------|
| Define Classe | Armazena Objeto |
| Define Método | Executa Transformação |
| Define Framework | Armazena Instância |
| Define Documento | Armazena Arquivo .md |

---

## 6. Referências

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
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2025-12-01 | Migração frontmatter YAML; Ajuste estrutura |

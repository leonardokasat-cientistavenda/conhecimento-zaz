---
nome: 00_E_Epistemologia
versao: "2.2"
tipo: Introducao
classe_ref: Documento
origem: interno
status: Draft
---

# 00_E_Epistemologia

## 1. Definição

Epistemologia é o Meta Sistema que define como conhecer objetos. Fornece as classes e o framework (M0-M4) para mapear qualquer domínio de conhecimento.

---

## 2. Problema que resolve

| Campo | Valor |
|-------|-------|
| sintoma | Conhecimento desorganizado, inconsistente, não replicável |
| causa_raiz | Falta de método estruturado para definir e documentar objetos |
| necessidade | Sistema recursivo que use a si mesmo para gerar conhecimento |

---

## 3. Diagrama do Meta Sistema
```
┌─────────────────────────────────────────────────────────────────┐
│                    META SISTEMA (00_E)                          │
│                                                                 │
│   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐         │
│   │  M0  │──►│  M1  │──►│  M2  │──►│  M3  │──►│  M4  │         │
│   │Probl.│   │Marco │   │Objeto│   │ POO  │   │Persis│         │
│   └──────┘   └──────┘   └──────┘   └──────┘   └──────┘         │
│       ▲                                           │             │
│       │                                           │             │
│       └───────────── retroalimenta ◄──────────────┘             │
│                                                                 │
│   Classes:                                                      │
│   Problema | MarcoTeorico | Objeto | Classe | Metodo | Documento│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ gera instâncias em
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ONTOLOGIA (00_O)                           │
│        Objetos mapeados: Cliente, Venda, Produto...             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Framework (M0-M4)

| Etapa | Nome | Input | Output | Classe usada |
|-------|------|-------|--------|--------------|
| M0 | Problema | Sintoma | Problema definido | Problema |
| M1 | Marco Teórico | Problema | Conceitos, fontes | MarcoTeorico |
| M2 | Definir Objeto | Marco | Nome, escopo, fronteiras | Objeto |
| M3 | Especificar POO | Objeto | Classes + Métodos | Classe, Metodo |
| M4 | Persistir | Especificação | Documento versionado | Documento |

---

## 5. Classes

| Classe | Arquivo | Descrição |
|--------|---------|-----------|
| Problema | 00_E_1_1_Problema.md | Define sintoma, causa, necessidade |
| MarcoTeorico | 00_E_1_2_MarcoTeorico.md | Conceitos e referências externas |
| Objeto | 00_E_1_3_Objeto.md | Nome, escopo, fronteiras, critérios |
| Classe | 00_E_1_4_Classe.md | Molde de objetos (atributos, métodos) |
| Metodo | 00_E_1_5_Metodo.md | Ação com input/output |
| Documento | 00_E_1_6_Documento.md | Persistência versionada |

---

## 6. Retroalimentação

Output de M4 pode gerar:
- Novo problema (M0) - descoberta de gap
- Novo marco teórico (M1) - conceito aprendido
- Refinamento de objeto existente (M2)

O sistema usa a si mesmo para evoluir.

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| GENESIS.md | Pai (Camada 3) |
| 00_E_1_1_Problema | Filho |
| 00_E_1_2_MarcoTeorico | Filho |
| 00_E_1_3_Objeto | Filho |
| 00_E_1_4_Classe | Filho |
| 00_E_1_5_Metodo | Filho |
| 00_E_1_6_Documento | Filho |

---

## 8. Sprints

### Sprint Atual

| Campo | Valor |
|-------|-------|
| **id** | S003-E |
| **arquivo** | [_sprints/S003-E.md](/_sprints/S003-E.md) |
| **objetivo** | Aprofundamento recursivo: Saussure em M0, POO em M3, consistência entre etapas |
| **inicio** | 2025-12-03 |
| **status** | 🔄 Em andamento |

### Sprints Anteriores

| Sprint | Objetivo | Status |
|--------|----------|--------|
| S002-E | Estruturar Meta Sistema Epistemologia | ✅ Concluída |
| S001-E | Definir infraestrutura inicial | ✅ Concluída |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2024-11-27 | - | Criação |
| 2.0 | 2025-12-02 | - | Reestruturação como Meta Sistema. Framework M0-M4. Sprint S002-E. |
| 2.1 | 2025-12-03 | - | Sprint S002-E concluída. Todas as classes criadas. |
| 2.2 | 2025-12-03 | 14:20 | Sprint S003-E iniciada. Referência a _sprints/. |

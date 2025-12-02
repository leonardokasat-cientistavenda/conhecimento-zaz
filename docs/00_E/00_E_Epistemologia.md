---
nome: 00_E_Epistemologia
versao: "2.0"
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

## 8. Sprint Atual

| Campo | Valor |
|-------|-------|
| **id** | S002-E |
| **objetivo** | Estruturar Meta Sistema Epistemologia |
| **inicio** | 2025-12-02 |
| **status** | Em andamento |

### Contexto

Reestruturação de 00_E para funcionar como Meta Sistema gerador de conhecimento, aplicando M0-M4 recursivamente.

### Tarefas

| id | tarefa | status |
|----|--------|--------|
| T1 | Criar 00_E_Epistemologia.md (raiz) | ✅ |
| T2 | Criar 00_E_1_4_Classe.md | ✅ |
| T3 | Criar 00_E_1_1_Problema.md | ⏳ |
| T4 | Criar 00_E_1_2_MarcoTeorico.md | ⏳ |
| T5 | Criar 00_E_1_3_Objeto.md | ⏳ |
| T6 | Revisar 00_E_1_5_Metodo.md | ⏳ |
| T7 | Revisar 00_E_1_6_Documento.md | ⏳ |
| T8 | Limpar arquivos antigos | ⏳ |
| T9 | Atualizar índice GENESIS.md | ⏳ |

### Arquivos a remover

- 00_E_1_1_Classe.md (migrado para 00_E_1_4)
- 00_E_1_2_Metodo.md (será 00_E_1_5)
- 00_E_1_3_Framework.md (incorporado ao Framework M0-M4)

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 2.0 | 2025-12-02 | Reestruturação como Meta Sistema. Framework M0-M4. Sprint S002-E. |

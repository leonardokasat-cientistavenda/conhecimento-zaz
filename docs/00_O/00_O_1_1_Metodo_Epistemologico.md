---
nome: 00_O_1_1_Metodo_Epistemologico
versao: "1.2"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_O_1_1_Metodo_Epistemologico

## 1. Definição

Método Epistemológico é o framework que orquestra a construção de conhecimento estruturado.

Sequência de 5 métodos (M1-M5) que transforma objeto indefinido em documento publicado.

---

## 2. Sequência

| Ordem | Método | Input | Output |
|-------|--------|-------|--------|
| M1 | Definir Objeto | Problema | Objeto Definido |
| M2 | Levantar Marco Teórico | Objeto | Marco Teórico |
| M3 | Definir Classes | Marco | Classes |
| M4 | Definir Métodos | Classes | Métodos |
| M5 | Documentar | Métodos | Documento |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                   MÉTODO EPISTEMOLÓGICO                         │
│                                                                 │
│   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐               │
│   │ M1  │──►│ M2  │──►│ M3  │──►│ M4  │──►│ M5  │               │
│   │     │   │     │   │     │   │     │   │     │               │
│   │Def. │   │Marco│   │Clas-│   │Méto-│   │Docu-│               │
│   │Obj. │   │Teór.│   │ses  │   │dos  │   │ment.│               │
│   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘               │
│                                                                 │
│   Problema ─────────────────────────────────► Documento         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Métodos Detalhados

### M1: Definir Objeto

Ver: 00_O_1_1_1_Definir_Objeto

### M2-M5

Documentação pendente em arquivos filhos.

---

## 5. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_Ontologia | Pai |
| 00_O_1_1_1_Definir_Objeto | Filho (M1) |
| 00_O_1_2_Pipeline_Documentacao | Irmão (opera após M5) |
| 00_E_1_3_Framework | Classe epistemológica |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2024-11-28 | Detalhamento M1-M5 |
| 1.2 | 2025-12-01 | Migração frontmatter YAML |

---
nome: 00_O_1_2_Pipeline_Documentacao
versao: "1.2"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_O_1_2_Pipeline_Documentacao

## 1. Definição

Pipeline de Documentação é o framework que orquestra o ciclo: Git → Validação → Outline.

Opera após M5 (Documentar) do Método Epistemológico.

---

## 2. Componentes

| Componente | Documento | Função |
|------------|-----------|--------|
| GitHub | 00_O_1_2_1_GitHub | Estrutura repositório |
| GitHub Actions | 00_O_1_2_2_GitHub_Actions | Validação e sync |
| Outline | 00_O_1_2_3_Outline | Publicação |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                   PIPELINE DOCUMENTAÇÃO                         │
│                                                                 │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│   │   GitHub    │──►│   Actions   │──►│   Outline   │           │
│   │             │   │             │   │             │           │
│   │ _drafts/    │   │ validate    │   │ Collection  │           │
│   │ docs/       │   │ sync        │   │ Hierarquia  │           │
│   └─────────────┘   └─────────────┘   └─────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Mapeamento Git → Outline

| Pasta Git | Collection Outline |
|-----------|-------------------|
| docs/00_E/ | Epistemologia |
| docs/00_O/ | Ontologia |
| docs/01/ | Domínios |

### Regra de Hierarquia

```
Pai = prefixo existente mais curto
Ver: 00_O_1_2_2_GitHub_Actions
```

---

## 5. Escopo Sync

| Pasta | Sincroniza? | Razão |
|-------|-------------|-------|
| docs/ | ✅ Sim | Publicados |
| _drafts/ | ❌ Não | WIP |
| _edits/ | ❌ Não | Interno |

---

## 6. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_Ontologia | Pai |
| 00_O_1_2_1_GitHub | Filho |
| 00_O_1_2_2_GitHub_Actions | Filho |
| 00_O_1_2_3_Outline | Filho |
| 00_O_1_1_Metodo_Epistemologico | Opera após M5 |
| 00_E_1_4_Documento | Define estrutura |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-11-30 | Criação |
| 1.1 | 2025-12-01 | Mapeamento Git→Outline |
| 1.2 | 2025-12-01 | Migração frontmatter YAML |

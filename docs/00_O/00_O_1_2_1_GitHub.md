---
nome: 00_O_1_2_1_GitHub
versao: "1.1"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_O_1_2_1_GitHub

## 1. Definição

GitHub é a classe que define estrutura de repositório e convenções de commit.

Primeiro componente do Pipeline de Documentação.

---

## 2. Estrutura de Pastas

```
/repo
├── _drafts/              ◄── WIP (M1-M4)
├── docs/                 ◄── Publicado (pós-M5)
│   ├── 00_E/             ◄── Epistemologia
│   ├── 00_O/             ◄── Ontologia
│   └── 01/               ◄── Domínios
├── _edits/               ◄── Instruções internas
└── README.md
```

---

## 3. Ciclo de Vida

```
M1 ──► _drafts/objeto.md  (commit: "M1: Define X")
M2 ──► atualiza           (commit: "M2: Marco X")
M3 ──► atualiza           (commit: "M3: Classes X")
M4 ──► atualiza           (commit: "M4: Métodos X")
M5 ──► move → docs/       (commit: "M5: Publica X")
```

---

## 4. Convenção de Commits

| Etapa | Padrão |
|-------|--------|
| M1 | `M1: Define [objeto]` |
| M2 | `M2: Marco teórico de [objeto]` |
| M3 | `M3: Classes de [objeto]` |
| M4 | `M4: Métodos de [objeto]` |
| M5 | `M5: Publica [objeto]` |
| Fix | `fix: [descrição]` |

---

## 5. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_2_GitHub_Actions | Irmão |
| 00_O_1_2_3_Outline | Irmão |
| 00_E_1_4_Documento | Define estrutura |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação |
| 1.1 | 2025-12-01 | Migração frontmatter YAML |

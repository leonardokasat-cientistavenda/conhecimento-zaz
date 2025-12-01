---
nome: 00_O_1_2_1_GitHub
versao: "1.0"
tipo: Framework
classe_ref: Framework
origem: externo
status: Draft
---

# 00_O_1_2_1_GitHub
**Versão:** 1.0  
**Tipo:** Framework  
**Classe_ref:** Framework  
**Origem:** externo  
**Status:** Draft

---

## 1. Definição

GitHub é a classe que define estrutura de repositório, convenções de pastas e commits.

Primeiro componente do Pipeline de Documentação.

---

## 2. Estrutura de Pastas

```
conhecimento-zaz/
│
├── .github/
│   └── workflows/
│       └── validar.yml
│
├── _drafts/
│   └── [objeto]/
│       ├── M1_definicao.md
│       ├── M2_marco_teorico.md
│       ├── M3_classes.md
│       └── M4_metodos.md
│
├── docs/
│   ├── 00_E/                    ← Epistemologia
│   │   ├── 00_E_Epistemologia.md
│   │   ├── 00_E_1_1_Classe.md
│   │   └── ...
│   │
│   ├── 00_O/                    ← Ontologia
│   │   ├── 00_O_Ontologia.md
│   │   └── ...
│   │
│   └── 01/                      ← Domínios
│       └── ...
│
└── README.md
```

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                      ESTRUTURA GITHUB                           │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │  _drafts/                                               │   │
│   │      Trabalho em progresso                              │   │
│   │      Não sincroniza com Outline                         │   │
│   │      Organizado por objeto                              │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                             │                                   │
│                             │ Promove após M5                   │
│                             ▼                                   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │  docs/                                                  │   │
│   │      Documentos publicados                              │   │
│   │      Sincroniza com Outline                             │   │
│   │      Organizado por dimensão (E/O) e domínio            │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Convenção de Commits

| Etapa | Padrão | Exemplo |
|-------|--------|---------|
| M1 | `M1: Define [objeto]` | M1: Define Outline |
| M2 | `M2: Marco teórico de [objeto]` | M2: Marco teórico de Outline |
| M3 | `M3: Classes de [objeto]` | M3: Classes de Outline |
| M4 | `M4: Métodos de [objeto]` | M4: Métodos de Outline |
| M5 | `M5: Publica [objeto]` | M5: Publica Outline |
| Fix | `fix: [descrição]` | fix: Corrige link quebrado |
| Feat | `feat: [descrição]` | feat: Adiciona validação |

---

## 5. Convenção de Nomes de Arquivo

```
[NN]_[E|O]_[N]_[N]_[Nome].md
```

| Parte | Significado | Exemplo |
|-------|-------------|---------|
| NN | Camada | 00 (META), 01 (Domínio) |
| E\|O | Dimensão | E (Epistemologia), O (Ontologia) |
| N_N | Hierarquia | 1_1, 1_2_1 |
| Nome | Identificador | Classe, Metodo |

---

## 6. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_3_Outline | Irmão (publicação) |
| 00_E_1_4_Documento | Define estrutura dos arquivos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação; Estrutura _drafts/docs; Convenção commits |

---
nome: 00_E_1_1_Classe
versao: "1.1"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_E_1_1_Classe

## 1. Definição

Classe é o molde abstrato que define estrutura e atributos de um tipo de conhecimento.

Classe pertence à Epistemologia. Suas instâncias (Objetos) pertencem à Ontologia.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único (PascalCase) |
| definição | string | Sim | O que é esta classe |
| atributos | Atributo[] | Sim | Lista de propriedades |
| subclasses | Classe[] | Não | Classes filhas |
| classe_pai | Classe | Não | Herança |

---

## 3. Estrutura de Atributo

| Campo | Tipo | Descrição |
|-------|------|-----------|
| nome | string | Identificador (snake_case) |
| tipo | string | Tipo de dado |
| obrigatório | boolean | Se é requerido |
| descrição | string | Explicação |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLASSE                                 │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                       Schema                            │   │
│   │                                                         │   │
│   │   nome: string                                          │   │
│   │   definição: string                                     │   │
│   │   atributos[]: Atributo[]                               │   │
│   │   subclasses[]: Classe[]                                │   │
│   │   classe_pai: Classe                                    │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              │ instancia                        │
│                              ▼                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                       OBJETO                            │   │
│   │                     (Ontologia)                         │   │
│   │                                                         │   │
│   │   classe_ref: Classe                                    │   │
│   │   atributos: {valores conforme schema}                  │   │
│   │   status: HIPÓTESE | VALIDADO | REFUTADO                │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Relacionamentos

| Relação | Tipo | Descrição |
|---------|------|-----------|
| Classe → Atributo | 1:N composição | Classe contém atributos |
| Classe → Classe | 1:N herança | Pai → Filhos |
| Classe → Objeto | 1:N instanciação | Epistemologia → Ontologia |

---

## 6. Regras

| Regra | Descrição |
|-------|-----------|
| Nomenclatura | PascalCase para nome |
| Atributos | Mínimo 1 atributo |
| Herança | Filho herda atributos do pai |
| Instância | Objeto segue schema da Classe |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_2_Metodo | Irmão |
| 00_E_1_3_Framework | Irmão |
| 00_E_1_4_Documento | Irmão |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2025-12-01 | Migração para frontmatter YAML |

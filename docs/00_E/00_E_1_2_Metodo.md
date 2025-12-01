---
nome: 00_E_1_2_Metodo
versao: "1.1"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_E_1_2_Metodo

## 1. Definição

Método é um processo com input e output tipados por Classe.

Transforma conhecimento de um estado para outro.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Verbo infinitivo + objeto |
| input | Classe | Sim | Tipo de entrada |
| output | Classe | Sim | Tipo de saída |
| descrição | string | Sim | O que faz |
| submétodos | Submétodo[] | Não | Etapas internas |

---

## 3. Estrutura de Submétodo

| Campo | Tipo | Descrição |
|-------|------|-----------|
| nome | string | Identificador |
| ordem | int | Sequência de execução |
| descrição | string | O que faz |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                          MÉTODO                                 │
│                                                                 │
│   ┌───────────┐      ┌───────────────────┐      ┌───────────┐   │
│   │           │      │                   │      │           │   │
│   │   INPUT   │─────►│   Transformação   │─────►│  OUTPUT   │   │
│   │  (Classe) │      │                   │      │  (Classe) │   │
│   │           │      │  ┌─────────────┐  │      │           │   │
│   └───────────┘      │  │ Submétodo 1 │  │      └───────────┘   │
│                      │  │ Submétodo 2 │  │                      │
│                      │  │ Submétodo N │  │                      │
│                      │  └─────────────┘  │                      │
│                      │                   │                      │
│                      └───────────────────┘                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Relacionamentos

| Relação | Tipo | Descrição |
|---------|------|-----------|
| Método → Classe | N:N referência | Via input/output |
| Método → Submétodo | 1:N composição | Contém etapas |
| Framework → Método | 1:N agregação | Framework usa Método |

---

## 6. Regras

| Regra | Descrição |
|-------|-----------|
| Nomenclatura | Verbo infinitivo + objeto |
| I/O Tipado | Sempre declarar input/output |
| 1:1 | Um input, um output |
| Atomicidade | Não referencia Framework |
| Polimorfismo | Input aceita subclasses |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_1_Classe | Irmão (define I/O) |
| 00_E_1_3_Framework | Irmão (usa Método) |
| 00_E_1_4_Documento | Irmão |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2025-12-01 | Migração para frontmatter YAML |

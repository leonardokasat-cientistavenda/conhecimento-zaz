---
nome: 00_E_1_2_Metodo
versao: "1.1"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_2_Metodo
**Versão:** 1.1  
**Tipo:** Classe Epistemológica  
**Status:** Draft

---

## 1. Definição

Método é o processo que transforma input em output, ambos tipados por Classe.

Método define "como fazer" na Epistemologia.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Verbo infinitivo + objeto (ex: "Mapear Classes") |
| input | Classe | Sim | Tipo de entrada |
| output | Classe | Sim | Tipo de saída |
| executor | Pessoa_Contexto \| Sistema | Não | Quem executa |
| sistemas | Sistema[] | Não | Ferramentas utilizadas |
| descrição | string | Sim | O que o método faz |
| submétodos | Submétodo[] | Não | Decomposição interna |

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
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │                        INPUT                            │   │
│   │                      (Classe A)                         │   │
│   │                                                         │   │
│   └─────────────────────────────┬───────────────────────────┘   │
│                                 │                               │
│                                 ▼                               │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │                    TRANSFORMAÇÃO                        │   │
│   │                                                         │   │
│   │   ┌───────────────────────────────────────────────┐     │   │
│   │   │  Submétodo 1                                  │     │   │
│   │   └───────────────────────────────────────────────┘     │   │
│   │                         │                               │   │
│   │                         ▼                               │   │
│   │   ┌───────────────────────────────────────────────┐     │   │
│   │   │  Submétodo 2                                  │     │   │
│   │   └───────────────────────────────────────────────┘     │   │
│   │                         │                               │   │
│   │                         ▼                               │   │
│   │   ┌───────────────────────────────────────────────┐     │   │
│   │   │  Submétodo N                                  │     │   │
│   │   └───────────────────────────────────────────────┘     │   │
│   │                                                         │   │
│   └─────────────────────────────┬───────────────────────────┘   │
│                                 │                               │
│                                 ▼                               │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │                       OUTPUT                            │   │
│   │                      (Classe B)                         │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Método vs Framework

```
MÉTODO (atômico)              FRAMEWORK (composto)
                              
┌─────────┐                   ┌─────────────────────┐
│         │                   │                     │
│  Input  │                   │  ┌─────┐            │
│    │    │                   │  │ M1  │            │
│    ▼    │                   │  └──┬──┘            │
│ Processo│                   │     │               │
│    │    │                   │     ▼               │
│    ▼    │                   │  ┌─────┐            │
│ Output  │                   │  │ M2  │            │
│         │                   │  └──┬──┘            │
└─────────┘                   │     │               │
                              │     ▼               │
                              │  ┌─────┐            │
                              │  │ M3  │            │
                              │  └─────┘            │
                              │                     │
                              └─────────────────────┘
```

---

## 5. Relacionamentos

| Relação | Tipo | Descrição |
|---------|------|-----------|
| Método → Classe | N:N referência | Via input/output |
| Método → Submétodo | 1:N composição | Contém |
| Framework → Método | 1:N agregação | Framework orquestra |
| Método → Sistema | N:N referência | Usa |

---

## 6. Regras

| Regra | Descrição |
|-------|-----------|
| Nomenclatura | Verbo infinitivo + objeto |
| I/O Tipado | Sempre declarar input e output |
| 1:1 | Um input, um output |
| Atomicidade | Método não referencia Framework |
| Polimorfismo | Input aceita Classe declarada + subclasses |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_1_Classe | Método usa Classe como I/O |
| 00_E_1_3_Framework | Framework agrega Métodos |
| 00_E_1_4_Documento | Método documentado seguindo template |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2024-11-27 | Adicionado seção 4. Diagrama |

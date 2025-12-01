# 00_O_1_1_Metodo_Epistemologico
**Versão:** 1.2  
**Tipo:** Framework  
**Classe_ref:** Framework  
**Origem:** interno  
**Status:** Draft

---

## 1. Definição

Método Epistemológico é o framework que orquestra a geração de conhecimento estruturado sobre qualquer objeto.

É a implementação operacional do Método Científico.

---

## 2. Métodos

| Ordem | Método | Input | Output | Detalhamento |
|-------|--------|-------|--------|--------------|
| 1 | Definir Objeto | Hipótese | Objeto definido | 00_O_1_1_1_Definir_Objeto |
| 2 | Levantar Marco Teórico | Objeto definido | Conhecimento externo | - |
| 3 | Mapear Classes | Objeto + Marco teórico | Classes do objeto | - |
| 4 | Mapear Métodos | Classes | Métodos das classes | - |
| 5 | Documentar | Classes + Métodos | Documento (Ontologia) | - |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                      MÉTODO EPISTEMOLÓGICO                                  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  M1: DEFINIR OBJETO                                                 │   │
│   │      Input: Hipótese                                                │   │
│   │      Output: Objeto definido                                        │   │
│   │      Regras: Identificar nome, escopo, fronteiras                   │   │
│   │      Detalhe: ver 00_O_1_1_1_Definir_Objeto                         │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  M2: LEVANTAR MARCO TEÓRICO                                         │   │
│   │      Input: Objeto definido                                         │   │
│   │      Output: Conhecimento externo sobre objeto                      │   │
│   │      Regras: Buscar frameworks, teorias, referências existentes     │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  M3: MAPEAR CLASSES                                                 │   │
│   │      Input: Marco teórico + Objeto                                  │   │
│   │      Output: Classes do objeto                                      │   │
│   │      Regras: Identificar atributos, relacionamentos, herança        │   │
│   │                                                                     │   │
│   │      ⟳ Recursivo: cada classe pode virar novo objeto                │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  M4: MAPEAR MÉTODOS                                                 │   │
│   │      Input: Classes do objeto                                       │   │
│   │      Output: Métodos que operam nas classes                         │   │
│   │      Regras: Identificar I/O, executor, sistemas                    │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  M5: DOCUMENTAR                                                     │   │
│   │      Input: Classes + Métodos                                       │   │
│   │      Output: Documento (Ontologia)                                  │   │
│   │      Regras: Seguir template de Documento                           │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Loop de Refinamento

Qualquer etapa (M2, M3, M4) pode refinar M1 se descobrir informação que altera o objeto.

```
M1 ──► M2 ──► Refina M1? ─── Sim ──► volta M1
              │
              │ Não
              ▼
             M3 ──► Refina M1? ─── Sim ──► volta M1
              │
              │ Não
              ▼
             M4 ──► Refina M1? ─── Sim ──► volta M1
              │
              │ Não
              ▼
             M5
```

### Critérios de Refinamento

| Situação | Ação |
|----------|------|
| Etapa confirma M1 | Segue para próxima |
| Etapa expande escopo | Refina M1 |
| Etapa redefine fronteiras | Refina M1 |
| Etapa muda critério de sucesso | Refina M1 |
| Etapa mostra objetivo errado | Volta M1 ou abandona |

---

## 5. Recursividade

```
Objeto: "X"
    │
    ├── M1: Definir "X"
    ├── M2: Marco teórico de "X"
    ├── M3: Mapear Classes de "X"
    │       │
    │       ├── Classe A
    │       │   │
    │       │   │ ⟳ recursivo (A vira objeto)
    │       │   │
    │       │   ├── M1: Definir "A"
    │       │   ├── M2: Marco teórico de "A"
    │       │   ├── M3: Mapear Classes de "A"
    │       │   ├── M4: Mapear Métodos de "A"
    │       │   └── M5: Documentar "A"
    │       │
    │       └── Classe B
    │           └── ...
    │
    ├── M4: Mapear Métodos de "X"
    └── M5: Documentar "X"
```

---

## 6. Critério de parada

| Critério | Descrição |
|----------|-----------|
| Atomicidade | Classe não tem subclasses relevantes |
| Suficiência | Conhecimento suficiente para o objetivo |
| Estabilidade | Classe já definida em outro contexto |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_1_1_Definir_Objeto | Filho (detalha M1) |
| 00_E_1_2_Metodo | Define M1-M5 |
| 00_E_1_3_Framework | Método Epistemológico é instância |
| 00_E_1_4_Documento | M5 usa para output |
| 00_META | Contexto geral |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação; 5 métodos; Recursividade |
| 1.1 | 2025-11-30 | Adicionado seção Estrutura do Output |
| 1.2 | 2025-12-01 | Loop de Refinamento; Referência a filho 00_O_1_1_1 |

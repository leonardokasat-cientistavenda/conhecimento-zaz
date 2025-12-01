# 00_E_1_3_Framework
**Versão:** 1.1  
**Tipo:** Classe Epistemológica  
**Status:** Draft

---

## 1. Definição

Framework é o agregador que orquestra uma sequência de Métodos.

Framework define "quando" e "em que ordem" executar Métodos.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador |
| origem | enum | Sim | externo (VPC, Lean) ou interno (próprio) |
| descrição | string | Sim | Propósito do framework |
| sequência | Método[] | Sim | Lista ordenada de métodos |

---

## 3. Relacionamentos

| Relação | Tipo | Descrição |
|---------|------|-----------|
| Framework → Método | 1:N agregação | Unidirecional |
| Método → Framework | — | Método NÃO referencia Framework |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRAMEWORK                                │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                     SEQUÊNCIA                           │   │
│   │                                                         │   │
│   │   ┌─────────┐                                           │   │
│   │   │ Método 1│                                           │   │
│   │   └────┬────┘                                           │   │
│   │        │                                                │   │
│   │        ▼                                                │   │
│   │   ┌─────────┐                                           │   │
│   │   │ Método 2│                                           │   │
│   │   └────┬────┘                                           │   │
│   │        │                                                │   │
│   │        ▼                                                │   │
│   │   ┌─────────┐                                           │   │
│   │   │ Método 3│                                           │   │
│   │   └────┬────┘                                           │   │
│   │        │                                                │   │
│   │        ▼                                                │   │
│   │   ┌─────────┐                                           │   │
│   │   │ Método N│                                           │   │
│   │   └─────────┘                                           │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Agregação unidirecional

```
┌───────────────────┐
│    FRAMEWORK      │
│                   │
│  ┌─────────────┐  │         ┌─────────────┐
│  │ sequência[] │──┼────────►│   MÉTODO    │
│  └─────────────┘  │         │             │
│                   │         │ (não conhece│
└───────────────────┘         │  Framework) │
                              └─────────────┘
        conhece ────────►          
                              ◄──────── não conhece
```

### Compartilhamento de Métodos

```
Framework A                    Framework B
┌─────────────────┐            ┌─────────────────┐
│                 │            │                 │
│  ┌───┐  ┌───┐   │            │  ┌───┐  ┌───┐   │
│  │M1 │  │M2 │   │            │  │M2 │  │M4 │   │
│  └───┘  └───┘   │            │  └───┘  └───┘   │
│                 │            │                 │
└────────┬────────┘            └────────┬────────┘
         │                              │
         │         ┌───────┐            │
         └────────►│  M2   │◄───────────┘
                   │       │
                   │(único)│
                   └───────┘
```

---

## 5. Regras

| Regra | Descrição |
|-------|-----------|
| Unidirecional | Framework conhece Método, não vice-versa |
| Sequência | Ordem dos métodos é significativa |
| Compartilhamento | Mesmo Método pode pertencer a múltiplos Frameworks |
| Atomicidade | Método mantém independência |

---

## 6. Diferença Método vs Framework

| Aspecto | Método | Framework |
|---------|--------|-----------|
| Pergunta | "O quê?" | "Quando/Ordem?" |
| Granularidade | Atômico | Composto |
| Independência | Sim | Depende de Métodos |

---

## 7. Exemplos

### 7.1 Framework externo

```
Framework: VPC (Value Proposition Canvas)
├── origem: externo
├── sequência:
│   ├── 1. Entrevistar Cliente
│   ├── 2. Mapear Customer Profile
│   ├── 3. Mapear Value Map
│   └── 4. Verificar Fit
```

### 7.2 Framework interno

```
Framework: Método Epistemológico
├── origem: interno
├── sequência:
│   ├── 1. Definir Objeto
│   ├── 2. Levantar Marco Teórico
│   ├── 3. Mapear Classes
│   ├── 4. Mapear Métodos
│   └── 5. Documentar
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_2_Metodo | Framework agrega Métodos |
| 00_E_1_4_Documento | Framework documentado seguindo template |
| 00_O_1_Fontes | Armazena instâncias de Framework |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2024-11-27 | Adicionado seção 4. Diagrama |

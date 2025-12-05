---
nome: Protocolo_LLM
versao: "0.1"
tipo: Infraestrutura
classe_ref: Protocolo
origem: interno
status: Draft
etapa: M0
sprint_ref: S005-G
task_ref: T07
camada: 2
---

# Protocolo de Inicialização LLM

## 1. Problema (M0)

### 1.1 Signo

"Protocolo de Inicialização LLM"

### 1.2 Significante

Instrução que permite LLM acessar GENESIS

### 1.3 Significado

Chave que destrava a fechadura (GENESIS)

### 1.4 Problema

| Problema | Consequência |
|----------|--------------|
| LLM em novo chat não sabe onde está GENESIS | Não consegue iniciar |
| Protocolo não pode estar dentro do GENESIS | Chave não fica dentro da fechadura |
| Sem bootstrap, sistema é inacessível | Conhecimento não é utilizado |

### 1.5 Solução

Documento em Infraestrutura (C2) com passos mínimos para LLM acessar GENESIS.

### 1.6 Camada

**Camada 2: Infraestrutura**

Justificativa: Infraestrutura habilita acesso ao sistema (GENESIS). Assim como GitHub é infraestrutura de persistência, Protocolo é infraestrutura de acesso.

---

## 2. Relações com GENESIS

### 2.1 Dependências

```
Protocolo_LLM (C2) ──── habilita acesso ────► GENESIS (C1)
       │                                           │
       │                                           ▼
       │                                    catalogo_meta_sistemas
       │                                           │
       │                                           ▼
       └─────────────────────────────────► definir_problema()
                                                   │
                                                   ▼
                                              rotear()
```

### 2.2 Elementos GENESIS que dependem do Protocolo

| Elemento GENESIS | Relação com Protocolo |
|------------------|----------------------|
| `catalogo_meta_sistemas` | Protocolo permite acesso ao catálogo |
| `definir_problema()` | Só executa após Protocolo carregar contexto |
| `rotear()` | Depende do catálogo carregado via Protocolo |
| Seção 6 (Referências) | Lista Protocolo como **pré-requisito** |

---

## 3. Fluxo de Inicialização

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUXO: NOVO CHAT → GENESIS                   │
└─────────────────────────────────────────────────────────────────┘

NOVO CHAT
    │
    ▼
┌─────────────────────────────────────────┐
│      Protocolo_LLM.md (C2)              │
│                                         │
│  1. Ler genesis/GENESIS.md              │
│  2. Carregar catalogo_meta_sistemas     │
│  3. Aguardar input_usuario              │
│                                         │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│           GENESIS ativo                 │
└─────────────────────────────────────────┘
    │
    ▼
definir_problema() → rotear() → executar_rota()
```

---

## 4. Instruções de Inicialização

### 4.1 Passo 1: Carregar GENESIS

```
github:get_file_contents(
    owner="leonardokasat-cientistavenda",
    repo="conhecimento-zaz",
    path="genesis/GENESIS.md"
)
```

### 4.2 Passo 2: Identificar Contexto

| Situação | Ação |
|----------|------|
| Usuário menciona Sprint | Carregar `/_sprints/SXXX.md` |
| Usuário menciona Meta Sistema | Rotear direto via `catalogo_meta_sistemas` |
| Sem contexto específico | Aguardar input e aplicar `definir_problema()` |

### 4.3 Passo 3: Seguir GENESIS

Após carregamento, GENESIS assume controle:
- `definir_problema()` extrai necessidade do input
- `rotear()` direciona para Meta Sistema adequado
- `executar_rota()` carrega ou cria contexto

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Sistema que este protocolo habilita |
| docs/00_I/00_I_1_1_GitHub.md | Infraestrutura de persistência |

### Hierarquia

```
CAMADA 2: INFRAESTRUTURA
├── 00_I_1_1_GitHub.md (persistência)
└── 00_I_1_X_Protocolo_LLM.md (acesso) ← ESTE DOCUMENTO

CAMADA 1: GENESIS
└── genesis/GENESIS.md (sistema principal)
```

---

## 6. Extensões Futuras (C2)

| Item | Descrição | Status |
|------|-----------|--------|
| Autenticação | Quem pode acessar | Backlog |
| Criptografia | Proteção de dados sensíveis | Backlog |
| Versionamento | Qual versão do GENESIS usar | Backlog |
| Multi-repositório | Acessar múltiplos repos | Backlog |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | M0 definido - Problema e relações com GENESIS |

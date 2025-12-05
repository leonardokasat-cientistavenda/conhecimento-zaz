---
nome: 00_I_1_2_Protocolo_LLM
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
camada: C2
sprint_ref: S005-G
task_ref: T07
---

# Protocolo LLM v1.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Protocolo LLM** | Instrução externa que ensina LLM a acessar GENESIS |
| **Project Instructions** | Campo de configuração do Claude Projects |
| **Chave** | Protocolo (externo ao sistema) |
| **Fechadura** | GENESIS (interno ao sistema) |
| **Boot** | Primeira ação do LLM ao iniciar conversa |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA                                          │
│                                                                             │
│  "LLM não sabe que GENESIS existe. Como ensiná-lo a acessar?"               │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PARADOXO                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  A instrução "leia GENESIS" não pode estar DENTRO do GENESIS.       │    │
│  │  Se estiver dentro, LLM precisaria já ter lido para saber ler.      │    │
│  │                                                                     │    │
│  │  Analogia: A CHAVE não pode estar DENTRO da FECHADURA.              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SOLUÇÃO                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Protocolo LLM = instrução EXTERNA (Project Instructions)                   │
│  que ensina LLM a:                                                          │
│    1. Ler GENESIS.md primeiro                                               │
│    2. Seguir regras de carregamento                                         │
│    3. Rotear para Meta Sistema adequado                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **Protocolo LLM é a instrução externa que ensina o LLM a acessar e operar o GENESIS.**
>
> Sem o Protocolo, GENESIS é invisível para o LLM.
> Com o Protocolo, LLM sabe como iniciar e navegar o sistema.

---

## 2. Marco Teórico (M1)

| Conceito | Aplicação |
|----------|-----------|
| **Bootstrap externo** | Instrução inicial deve vir de fora do sistema |
| **Separation of Concerns** | Protocolo (COMO acessar) ≠ GENESIS (O QUE acessar) |
| **Idempotência** | Mesma instrução, mesmo resultado, qualquer sessão |

---

## 3. Objeto (M2)

### 3.1 Definição

**Protocolo LLM** é a instrução que:
- Fica FORA do GENESIS (em Project Instructions)
- Ensina LLM a ler GENESIS como primeira ação
- Define regras de operação (carregamento, commits, etc.)

### 3.2 Fronteiras

| Protocolo LLM É | Protocolo LLM NÃO É |
|-----------------|---------------------|
| Instrução de boot | Conteúdo do sistema |
| Chave de acesso | A fechadura em si |
| Externo ao GENESIS | Parte do GENESIS |
| Imutável por sessão | Editável pelo LLM |

### 3.3 Localização

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ONDE FICA O PROTOCOLO                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Claude Projects → Project Instructions                                     │
│       │                                                                     │
│       ▼                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PROTOCOLO LLM (este documento, copiado para lá)                    │    │
│  │                                                                     │    │
│  │  Instrui: "Leia genesis/GENESIS.md antes de qualquer resposta"      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│       │                                                                     │
│       │ LLM executa                                                         │
│       ▼                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GENESIS.md (no GitHub)                                             │    │
│  │                                                                     │    │
│  │  Contém: catálogo, índice, regras internas                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Classe (M3)

### 4.1 Estrutura do Protocolo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PROTOCOLO_LLM                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Seções                                                                     │
│  ───────                                                                    │
│  1. CONTEXTO: identidade do repositório                                     │
│  2. REGRA DE INICIALIZAÇÃO: ler GENESIS primeiro                            │
│  3. REGRA DE CARREGAMENTO: como carregar dependências                       │
│  4. REGRA DE CRIAÇÃO: como criar/editar arquivos                            │
│  5. REGRA DE ATUALIZAÇÃO: como versionar                                    │
│  6. CONVENÇÃO DE COMMIT: formato de mensagens                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Conteúdo do Protocolo (para Project Instructions)

```markdown
## CONTEXTO

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Arquivo raiz: /genesis/GENESIS.md
Branch: main

Usar ferramenta github:get_file_contents para leitura.

---

## REGRA DE INICIALIZAÇÃO

Antes de qualquer resposta sobre o sistema:
1. Ler github:get_file_contents(path="genesis/GENESIS.md")
2. Identificar Meta Sistema relevante para a pergunta
3. Carregar arquivos dependentes conforme índice

---

## REGRA DE CARREGAMENTO

SE usuário menciona Camada N
ENTÃO carregar Arquivos onde camada <= N
ORDENADO por depende_de (dependências primeiro)

---

## REGRA DE CRIAÇÃO DE ARQUIVOS

Antes de criar/editar arquivos, ler:
- /docs/00_I_1_1_GitHub.md (regras GitHub + token efficiency)
- /docs/00_E/00_E_1_6_Documento.md (estrutura pastas + ciclo M0-M4)

Resumo:
1. Criar arquivos DIRETO no GitHub (sem preview no chat)
2. Informar apenas: "Arquivo criado: [path] - [resumo]"
3. Usuário valida pelo link do GitHub
4. Edições via patch quando possível

---

## REGRA DE ATUALIZAÇÃO

Ao modificar qualquer arquivo:
1. Atualizar versão no frontmatter
2. Atualizar índice do GENESIS.md se necessário
3. Atualizar histórico do arquivo

---

## CONVENÇÃO DE COMMIT

Padrão: [CAMADA] tipo: descrição

Camadas: C0 (Axiomas), C1 (GENESIS), C2 (Infra), C3 (Framework), C4 (Domínios)
Tipos: add, update, fix, cleanup

Exemplo: [C3] add: M0 Problema para Vendas
---

## REGRA DE EDIÇÃO

Antes de editar arquivo existente:
1. Avaliar escopo da mudança
2. Confirmar com usuário qual método:
   - **Patch** (`_patches/*.md`): edições cirúrgicas, <20 linhas alteradas
   - **Substituição** (API com SHA): reescritas completas, seções grandes

Sempre perguntar: "Edição pequena (patch) ou reescrita (substituição)?"

---

## COMO ACESSAR ARQUIVOS

Parâmetros fixos:
- owner: "leonardokasat-cientistavenda"
- repo: "conhecimento-zaz"
- branch: "main"

Listar pasta:
github:get_file_contents(path="docs")

Ler arquivo:
github:get_file_contents(path="genesis/GENESIS.md")

Criar/atualizar:
github:create_or_update_file(path="...", content="...", message="...")
```

### 4.3 Validações

| Validação | Regra |
|-----------|-------|
| Protocolo está em Project Instructions | Obrigatório |
| LLM lê GENESIS antes de responder | Obrigatório |
| Protocolo não referencia a si mesmo | Evita recursão |

---

## 5. Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Alvo do Protocolo (fechadura) |
| docs/00_I_1_1_GitHub.md | Regras de persistência |
| docs/00_E/00_E_1_6_Documento.md | Estrutura de documentos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-05 | Criação - S005-G/T07 |
| 1.1 | 2025-12-05 | Adiciona REGRA DE EDIÇÃO - S005-G/T07 |

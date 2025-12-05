# T09a: Interface de Roteamento GENESIS ↔ Meta Sistemas

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Interface de Roteamento** | Contrato que define como GENESIS localiza Meta Sistemas |
| **Chave** | Atributos que o Meta Sistema fornece para ser localizável |
| **Fechadura** | Método do GENESIS que lê esses atributos para rotear |
| **Pesquisa Semântica** | Match entre input do usuário e atributos do Meta Sistema |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como garantir que GENESIS localize Meta Sistemas E que Meta Sistemas      │
│   sejam localizáveis, para que o roteamento funcione?"                      │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CHAVE/FECHADURA                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Fechadura)                    META SISTEMA (Chave)                │
│  ───────────────────                    ────────────────────                │
│                                                                             │
│  rotear() precisa LER:            ←→    Precisa TER:                        │
│    • problema_que_resolve               • problema_que_resolve              │
│    • triggers                           • triggers                          │
│    • exemplos_uso                       • exemplos_uso                      │
│    • arquivo_raiz                       • arquivo_raiz                      │
│                                                                             │
│  Se a fechadura não sabe                Se a chave não tem os               │
│  o que procurar                         atributos certos                    │
│  → não encontra                         → não encaixa                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONSEQUÊNCIAS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SEM INTERFACE:                         COM INTERFACE:                      │
│  • Meta Sistema existe                  • Meta Sistema existe               │
│  • GENESIS não sabe que existe          • GENESIS encontra via pesquisa     │
│  • Usuário não é roteado                • Usuário é roteado corretamente    │
│  • = Invisível                          • = Localizável                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Estado Atual

| Componente | Estado | Problema |
|------------|--------|----------|
| **GENESIS v1.0** | Classe `MetaSistema` definida com atributos | ✅ Fechadura pronta |
| **Epistemologia v3.2** | Não tem atributos de roteamento | ❌ Chave faltando |
| **Epistemologia v3.2** | Não exige atributos ao criar Meta Sistemas | ❌ Não propaga obrigação |

### 1.4 Tese

> **Para que GENESIS localize Meta Sistemas via pesquisa semântica, é necessário:**
>
> 1. **GENESIS (fechadura)**: Já tem classe `MetaSistema` com atributos - ✅ pronto
> 2. **Meta Sistemas (chave)**: Devem TER os atributos de roteamento
> 3. **Epistemologia (propagação)**: Deve EXIGIR esses atributos ao criar Meta Sistemas
>
> **Solução:** Atualizar Epistemologia em dois pontos:
> - Adicionar seus próprios atributos de roteamento (ser localizável)
> - Adicionar restrição na classe MetaSistema (propagar obrigação)

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Interface** | Design by Contract (Meyer, 1986) | Contrato entre GENESIS e Meta Sistemas |
| **Hierarquia Fractal** | Mandelbrot (1982) | Mesma estrutura em cada nível |
| **SSOT** | DRY Principle | Atributos vivem no Meta Sistema, GENESIS lê |

### 2.2 Design by Contract

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DESIGN BY CONTRACT                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CONTRATO: "Se você quer ser roteável pelo GENESIS,                         │
│             deve implementar estes atributos"                               │
│                                                                             │
│  PRÉ-CONDIÇÃO (Meta Sistema):                                               │
│  ├── problema_que_resolve: string (não vazio)                               │
│  ├── triggers: string[] (mínimo 3)                                          │
│  ├── exemplos_uso: string[] (mínimo 2)                                      │
│  └── arquivo_raiz: string (path válido)                                     │
│                                                                             │
│  PÓS-CONDIÇÃO (GENESIS):                                                    │
│  └── Meta Sistema é localizável via rotear()                                │
│                                                                             │
│  INVARIANTE:                                                                │
│  └── Sem pré-condição → Meta Sistema invisível para GENESIS                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Hierarquia Fractal Aplicada

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PROPAGAÇÃO FRACTAL                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EPISTEMOLOGIA (tem atributos de roteamento)                                │
│  │                                                                          │
│  │  problema_que_resolve: "estruturar conhecimento via M0-M4"               │
│  │  triggers: [estruturar, classe, M0-M4, documentar, meta sistema]         │
│  │  exemplos_uso: ["quero documentar um processo", ...]                     │
│  │                                                                          │
│  └── EXIGE que Meta Sistemas Derivados também tenham:                       │
│      │                                                                      │
│      ├── META SISTEMA VENDAS                                                │
│      │   problema_que_resolve: "gerenciar pipeline de vendas"               │
│      │   triggers: [vendas, pipeline, lead, oportunidade]                   │
│      │   exemplos_uso: ["quero ver meu funil", ...]                         │
│      │                                                                      │
│      └── META SISTEMA GLOSSÁRIO                                             │
│          problema_que_resolve: "catalogar termos e definições"              │
│          triggers: [glossário, termo, definição, significado]               │
│          exemplos_uso: ["o que significa X", ...]                           │
│                                                                             │
│  Mesma estrutura (atributos de roteamento) em cada nível.                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**Interface de Roteamento** é o contrato que:
- Define quais atributos um Meta Sistema deve ter para ser localizável
- É implementado pela Epistemologia (como exemplo)
- É propagado pela Epistemologia (como obrigação aos derivados)
- É consumido pelo GENESIS (para rotear)

### 3.2 Fronteiras

| É | NÃO É |
|---|-------|
| Contrato de atributos | Classe nova |
| Restrição na classe MetaSistema | Mudança na lógica de roteamento |
| Atributos no frontmatter/corpo | Arquivo separado |

### 3.3 Impacto

| Onde | O que fazer |
|------|-------------|
| **GENESIS** | Nenhuma mudança (já tem classe MetaSistema) |
| **Epistemologia (frontmatter)** | Adicionar atributos de roteamento |
| **Epistemologia (M3 Classe)** | Adicionar restrição: MetaSistema DEVE ter atributos |

---

## 4. Classe (M3)

### 4.1 Atributos de Roteamento (Contrato)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ATRIBUTOS DE ROTEAMENTO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Atributo               │ Tipo       │ Obrigatório │ Função                 │
│  ───────────────────────┼────────────┼─────────────┼─────────────────────── │
│  problema_que_resolve   │ string     │ ✅          │ Match de intenção      │
│  triggers               │ string[]   │ ✅          │ Match de palavras-chave│
│  exemplos_uso           │ string[]   │ ✅          │ Match de padrão        │
│  arquivo_raiz           │ string     │ ✅          │ Entry point            │
│  cobertura              │ enum       │ ⚪          │ Completo|Parcial|Stub  │
│  pai                    │ ref|null   │ ⚪          │ Hierarquia             │
│                                                                             │
│  VALIDAÇÕES:                                                                │
│  ├── problema_que_resolve: não vazio, mínimo 10 caracteres                  │
│  ├── triggers: mínimo 3 itens                                               │
│  ├── exemplos_uso: mínimo 2 itens                                           │
│  └── arquivo_raiz: path válido no repositório                               │
│                                                                             │
│  INVARIANTE:                                                                │
│  └── Sem esses atributos = invisível para GENESIS                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Epistemologia: Atributos de Roteamento (Chave)

```yaml
---
nome: 00_E_Epistemologia
versao: "3.3"
tipo: Framework
camada: 3
status: Published

# ATRIBUTOS DE ROTEAMENTO (novos)
problema_que_resolve: "Como estruturar qualquer domínio de conhecimento de forma anti-entrópica"
triggers:
  - estruturar
  - classe
  - M0-M4
  - documentar
  - conhecimento
  - meta sistema
  - framework
  - epistemologia
exemplos_uso:
  - "quero documentar um processo"
  - "preciso criar classes para vendas"
  - "como aplico M0-M4"
  - "quero estruturar meu conhecimento"
  - "como crio um meta sistema"
arquivo_raiz: "docs/00_E/00_E_Epistemologia.md"
cobertura: Completo
pai: null  # É raiz (filho direto de GENESIS)
---
```

### 4.3 Epistemologia: Restrição na Classe MetaSistema (Propagação)

Adicionar em Epistemologia v3.3, seção 4.6 Validações:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RESTRIÇÃO: ATRIBUTOS DE ROTEAMENTO                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  REGRA R-ROTEAMENTO:                                                        │
│  ──────────────────                                                         │
│  Todo Meta Sistema DEVE ter atributos de roteamento para ser                │
│  localizável pelo GENESIS.                                                  │
│                                                                             │
│  ATRIBUTOS OBRIGATÓRIOS:                                                    │
│  ├── problema_que_resolve: string (mínimo 10 caracteres)                    │
│  ├── triggers: string[] (mínimo 3 itens)                                    │
│  ├── exemplos_uso: string[] (mínimo 2 itens)                                │
│  └── arquivo_raiz: string (path válido)                                     │
│                                                                             │
│  CONSEQUÊNCIA:                                                              │
│  └── Sem esses atributos = Meta Sistema invisível para GENESIS              │
│                                                                             │
│  FONTE:                                                                     │
│  └── GENESIS v1.0, Classe MetaSistema (Seção 4.1)                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Fluxo de Pesquisa Semântica

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PESQUISA SEMÂNTICA: COMO FUNCIONA                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Usuário: "Claude, quero documentar meu processo de vendas"                 │
│                                                                             │
│  GENESIS.rotear():                                                          │
│     │                                                                       │
│     ▼                                                                       │
│  Lê todos os Meta Sistemas com atributos de roteamento                      │
│     │                                                                       │
│     ▼                                                                       │
│  Para cada um, compara input com:                                           │
│     • problema_que_resolve                                                  │
│     • triggers                                                              │
│     • exemplos_uso                                                          │
│     │                                                                       │
│     ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Epistemologia                                                       │    │
│  │   problema: "estruturar qualquer domínio de conhecimento"           │    │
│  │   triggers: [documentar, estruturar, classe, M0-M4]        ← MATCH  │    │
│  │   exemplos: ["quero documentar um processo"]               ← MATCH  │    │
│  │   arquivo_raiz: docs/00_E/00_E_Epistemologia.md                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│     │                                                                       │
│     ▼                                                                       │
│  Roteia → Epistemologia                                                     │
│  Carrega → docs/00_E/00_E_Epistemologia.md                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Documento (M4)

### 5.1 Checklist de Implementação

| # | Ação | Arquivo | Status |
|---|------|---------|--------|
| 1 | Adicionar atributos de roteamento no frontmatter | Epistemologia.md | ⬜ |
| 2 | Adicionar restrição R-ROTEAMENTO na seção 4.6 | Epistemologia.md | ⬜ |
| 3 | Atualizar versão para 3.3 | Epistemologia.md | ⬜ |
| 4 | Atualizar Sprint com progresso | S005-G_Sprint_Genesis.md | ⬜ |

### 5.2 Validação

| Critério | Como Validar |
|----------|--------------|
| GENESIS lê Epistemologia | rotear("estruturar") → Epistemologia |
| Epistemologia propaga | Novo Meta Sistema exige atributos |
| Frontmatter válido | YAML parseia sem erro |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | Draft T09a criado - M0-M4 completo |

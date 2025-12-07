---
nome: BACKLOG
versao: "1.3"
tipo: Sistema
origem: interno
status: Ativo
atualizado: 2025-12-07
---

# Backlog GENESIS

## Instruções de Uso

### Ciclo de Vida

```
BACKLOG.md                    _sprints/S00X.md              docs/
┌─────────┐                   ┌─────────────┐               ┌─────────────┐
│ Item M0 │ ──promover──►     │   Sprint    │ ──concluir──► │  Publicado  │
│(espera) │                   │ (execução)  │               │  (oficial)  │
└─────────┘                   └─────────────┘               └─────────────┘
     │                              │                              │
     ▼                              ▼                              ▼
  Remover                       Arquivar                      Versionado
  do BACKLOG                  em _sprints/                    em docs/
```

### Promover Item para Sprint

1. Copiar seção M0 do item para `_sprints/S00X_Nome.md`
2. Expandir M0 → Tasks (T01, T02, etc.)
3. **Remover item deste BACKLOG.md**
4. Commit: `[C0] promote: Item X → S00X`

### Recuperar Contexto para Nova Sprint

LLM deve:
1. Ler `_backlog/BACKLOG.md` (este arquivo)
2. Identificar item a promover
3. Ler arquivos detalhados se existirem (ex: `_backlog/Evolucao_Catalogo.md`)
4. Criar `_sprints/S00X_Nome.md` com M0 + Tasks

### Adicionar Novo Item

1. Criar seção com M0 (Glossário, Problema, Origem)
2. Definir prioridade e dependências
3. Se necessário, criar arquivo detalhado separado
4. Commit: `[C0] add: Backlog Item X`

---

## Índice de Itens

| # | Item | Prioridade | Dependências | Status |
|---|------|------------|--------------|--------|
| 2 | Módulo Autonomia | 🟡 Média | - | ⬜ Aguardando |
| 4 | Tools Externas | 🟢 Baixa | Autonomia | ⬜ Aguardando |
| 5 | MCP Server | 🟢 Baixa | Tools Externas | ⬜ Aguardando |
| 6 | Pipelines Compostos | 🟢 Baixa | - | ⬜ Aguardando |
| 7 | Meta Sistemas de Domínio | 🟡 Média | - | ⬜ Aguardando |

---

## Sprints Ativas

| Item | Sprint | Iniciado |
|------|--------|----------|
| Processo de Sprint | S007 | 2025-12-07 |

---

## Itens Concluídos

| Item | Sprint | Concluído |
|------|--------|-----------|
| Catálogo MVP | S006-C | 2025-12-07 |

---

## 2. Módulo Autonomia

**Prioridade:** 🟡 Média
**Dependências:** -
**Arquivo detalhado:** `_backlog/Modulo_Autonomia.md`

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Autonomia** | Grau de independência do LLM em relação ao humano |
| **Modo Guiado** | Humano aprova cada ação |
| **Modo Assistido** | LLM sugere, humano valida conjunto |
| **Modo Autônomo** | LLM executa, humano audita resultado |
| **Loop Humano** | Ponto de controle onde humano intervém |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| LLM sempre pede confirmação | Não há gradação de confiança | Modos de autonomia |
| Tarefas simples são lentas | Loop humano em cada passo | Autonomia para rotinas |
| Tarefas críticas sem supervisão | Sem distinção de risco | Loop humano em decisões importantes |

### M0.3 Origem

- **Descoberto em:** S005-G (discussão arquitetura GENESIS)
- **Conversa:** "LLM + N Contextos" (dez/2025)
- **Insight:** Autonomia é módulo opcional, não obrigatório

---

## 4. Tools Externas

**Prioridade:** 🟢 Baixa
**Dependências:** Autonomia
**Arquivo detalhado:** -

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Tool** | Capacidade executável que LLM pode chamar |
| **Tool Externa** | Ferramenta fora do sistema GENESIS (APIs, planilhas) |
| **Google Sheets** | Planilha para dados estruturados |
| **CRM** | Sistema de gestão de relacionamento |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| GENESIS isolado | Sem integração com ferramentas reais | Conectar a sistemas externos |
| Dados não persistem fora do Git | Git não é ideal para dados dinâmicos | Planilhas, bancos |
| Ações manuais repetitivas | LLM não pode executar | Tools que executam |

### M0.3 Origem

- **Descoberto em:** Discussões sobre fábrica metalurgia, extração de dados
- **Conversa:** Aplicação prática do GENESIS (dez/2025)
- **Exemplos:** Google Sheets para dados, APIs de CRM, automações

---

## 5. MCP Server

**Prioridade:** 🟢 Baixa
**Dependências:** Tools Externas
**Arquivo detalhado:** -

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **MCP** | Model Context Protocol - protocolo Anthropic para tools |
| **MCP Server** | Servidor que expõe tools via MCP |
| **Tool Registration** | Registro de tools disponíveis para o LLM |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| Tools definidas manualmente | Cada tool precisa ser hardcoded | Registry dinâmico |
| Sem padrão de integração | Cada tool tem interface própria | Protocolo unificado (MCP) |

### M0.3 Origem

- **Descoberto em:** Pesquisa sobre integrações Claude
- **Referência:** Anthropic MCP documentation
- **Insight:** MCP permite tools dinâmicas sem recompilar

---

## 6. Pipelines Compostos

**Prioridade:** 🟢 Baixa
**Dependências:** -
**Arquivo detalhado:** -

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Pipeline** | Sequência de Meta Sistemas encadeados |
| **Composição** | Combinar saída de um como entrada de outro |
| **Orquestração** | GENESIS coordenando múltiplos Meta Sistemas |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| Meta Sistemas isolados | Cada um resolve problema único | Encadear para problemas complexos |
| Fluxos manuais | Humano conecta saídas/entradas | Automação de pipelines |

### M0.3 Origem

- **Descoberto em:** Visão de arquitetura futura
- **Insight:** GENESIS pode orquestrar sequências, não só roteamento único

---

## 7. Meta Sistemas de Domínio

**Prioridade:** 🟡 Média
**Dependências:** -
**Arquivo detalhado:** -

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Meta Sistema de Domínio** | Especialização para área de negócio |
| **Vendas** | Domínio de processo comercial |
| **GTM** | Go-To-Market - estratégia de entrada no mercado |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| Só temos Epistemologia | Framework sem aplicação prática | Criar domínios reais |
| Conhecimento de vendas disperso | Não estruturado como Meta Sistema | Aplicar M0-M4 em Vendas |

### M0.3 Origem

- **Descoberto em:** Objetivo original do projeto (Sistema ZAZ, Metodologia Vendas)
- **Insight:** Domínios são o valor real; framework é meio, não fim

---

## Arquivos Relacionados

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `_backlog/Evolucao_Catalogo.md` | ✅ Histórico | Fases de implementação do Catálogo (concluído) |
| `_backlog/Modulo_Autonomia.md` | ✅ Existe | Especificação do módulo |
| `_backlog/Modulo_Raciocinio.md` | ⚠️ Depreciar | Já publicado em docs/ |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-07 | Criação. 7 itens com M0 estruturado. Instruções de ciclo de vida. |
| 1.1 | 2025-12-07 | Catálogo MVP promovido para S006-C. Índice atualizado. Seção "Itens Promovidos" adicionada. |
| 1.2 | 2025-12-07 | Catálogo MVP concluído. Removido do índice. Seção renomeada para "Itens Concluídos". |
| 1.3 | 2025-12-07 | **Processo de Sprint promovido** para S007. Item #3 removido. Seção "Sprints Ativas" adicionada. |

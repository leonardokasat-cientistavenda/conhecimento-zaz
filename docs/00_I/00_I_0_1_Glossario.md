---
nome: 00_I_0_1_Glossario
versao: "1.1"
tipo: Referencia
classe_ref: Documento
origem: interno
status: Publicado
camada: C2
depende_de: []
---

# Glossário Central v1.1

## 1. Propósito

Este documento estabelece a terminologia oficial do sistema GENESIS para garantir consistência conceitual e evitar deriva semântica entre documentos, sprints e conversas.

**Regra:** Termos não listados aqui devem ser submetidos a M0 (definição de problema) antes de uso em documentos oficiais.

---

## 2. Termos Proibidos e Correções

| ❌ NÃO USAR | ✅ USAR | Justificativa |
|-------------|---------|---------------|
| Agente de IA | **Contexto Especializado** ou **Meta Sistema** | LLM não tem autonomia; opera com contexto carregado |
| IA (genérico) | **LLM** | Especifica o componente (Claude, GPT, etc.) |
| Trabalhador | **Meta Sistema** | Estrutura de conhecimento, não entidade |
| IOA | Não usar | Termo indefinido no sistema |
| Fallback | **Retorno ao GENESIS** | Não é erro; é ciclo normal de roteamento |
| Sprint (para workflow de IA) | **Pipeline** ou **Workflow** | Sprint = período de trabalho humano |
| Criar IA | **Criar Meta Sistema** | Precisão conceitual |
| IA chama IA | **Composição de Meta Sistemas** | Dependência declarada, não chamada entre entidades |
| Múltiplas IAs | **Múltiplos Contextos** | 1 LLM + N Contextos, não N entidades |
| Orquestrar agentes | **Orquestrar contextos** | GENESIS orquestra contextos, não agentes |

---

## 3. Glossário por Camada

### 3.1 C0 - Axiomas

| Termo | Definição |
|-------|-----------|
| **Axioma** | Verdade fundamental não derivada, aceita como ponto de partida |
| **Entropia** | Degradação de informação por falta de estrutura (Shannon) |

### 3.2 C1 - GENESIS (Propósito)

| Termo | Definição |
|-------|-----------|
| **GENESIS** | Inteligência Orquestradora que entende, busca e roteia contextos |
| **Inteligência Híbrida** | Amplificação cognitiva via Humano + LLM + Sistema |
| **Orquestração** | Ato de carregar o contexto correto para o LLM |
| **CONHECER** | Natureza de problema: buscar/criar conhecimento estruturado |
| **DECIDIR** | Natureza de problema: tomar decisão baseada em contexto |
| **Retorno ao GENESIS** | Fim de contexto, reinício de roteamento (ciclo normal) |

### 3.3 C2 - Infraestrutura

| Termo | Definição |
|-------|-----------|
| **Catálogo** | Memória estruturada com busca semântica |
| **Persistência** | Armazenamento durável de conhecimento |
| **Frontmatter** | Metadados YAML no início de documentos |
| **Tool** | Capacidade executável que o LLM pode chamar (API, código, integração) |
| **Tool Interna** | Tool do próprio sistema (Catálogo, GitHub, Raciocínio) |
| **Tool Externa** | Tool de sistemas terceiros (CRM, ERP, Sheets, Web) |

### 3.4 C3 - Framework (Epistemologia)

| Termo | Definição |
|-------|-----------|
| **Epistemologia** | Meta Sistema Base que cria Meta Sistemas via M0-M4 |
| **Meta Sistema** | Sistema que gera outros sistemas (Clabject); contexto especializado |
| **M0-M4** | Ciclo: Problema → Marco Teórico → Objeto → Classe → Documento |
| **Módulo** | Conjunto de classes opcionais para composição |
| **Raciocínio** | Módulo para estruturar decisões via ciclo H→E→I→D |
| **Clabject** | Elemento dual: Classe + Objeto simultaneamente (MOF/OMG) |
| **Par E/O** | Par Epistemologia/Ontologia em cada nível da hierarquia |

### 3.5 C4 - Domínios

| Termo | Definição |
|-------|-----------|
| **Meta Sistema Derivado** | Meta Sistema criado via Epistemologia para domínio específico |
| **Contexto Especializado** | LLM operando com Meta Sistema carregado |
| **Pipeline** | Sequência de Meta Sistemas para resolver problema composto |
| **Composição** | Meta Sistema que usa outputs de outros (via depende_de) |

---

## 4. Conceitos de Controle de Loop

| Termo | Definição |
|-------|-----------|
| **Loop Humano** | Humano controla cada transição de contexto (padrão GENESIS) |
| **Loop Autônomo** | Sistema decide transições sem intervenção humana |
| **Módulo Autonomia** | Módulo opcional que controla o nível de autonomia |
| **Modo Guiado** | Validação humana a cada passo (padrão) |
| **Modo Assistido** | Validação humana em checkpoints definidos |
| **Modo Autônomo** | Validação humana só no final (requer confiança alta) |

---

## 5. Modelo Conceitual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MODELO: 1 LLM + N CONTEXTOS                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ❌ INCORRETO: "N IAs autônomas"                                            │
│                                                                             │
│     IA₁ ←→ IA₂ ←→ IA₃  (entidades separadas comunicando)                    │
│                                                                             │
│  ✅ CORRETO: "1 LLM + N Contextos"                                          │
│                                                                             │
│                      ┌─────────┐                                            │
│                      │   LLM   │  (único motor)                             │
│                      └────┬────┘                                            │
│                           │                                                 │
│         ┌─────────────────┼─────────────────┐                               │
│         ▼                 ▼                 ▼                               │
│  ┌───────────┐     ┌───────────┐     ┌───────────┐                          │
│  │ Contexto  │     │ Contexto  │     │ Contexto  │                          │
│  │ Vendas    │     │ Pricing   │     │ GTM       │                          │
│  └───────────┘     └───────────┘     └───────────┘                          │
│                                                                             │
│  GENESIS decide qual contexto carregar                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **Visão completa:** Para diagramas detalhados de arquitetura, ver [GENESIS_Arquitetura.md](/genesis/GENESIS_Arquitetura.md)

---

## 6. Regras de Uso

| Regra | Especificação |
|-------|---------------|
| **R-GLOSS-01** | Todo documento oficial deve usar termos deste glossário |
| **R-GLOSS-02** | Termos novos requerem M0 antes de adoção |
| **R-GLOSS-03** | Tabela "NÃO USAR" tem precedência absoluta |
| **R-GLOSS-04** | Atualização do glossário requer incremento de versão |
| **R-GLOSS-05** | Glossários locais (M0.1) não podem conflitar com este |

---

## 7. Como Criar Entradas

### 7.1 Quando criar termo novo

| Situação | Ação |
|----------|------|
| Termo já existe no Glossário Central | USAR existente, não duplicar |
| Termo é específico de um domínio | Criar em M0.1 do Meta Sistema |
| Termo é compartilhado entre domínios | Propor adição ao Glossário Central |
| Termo conflita com existente | PROIBIDO - resolver conflito primeiro |

### 7.2 Formato padrão

```markdown
| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Termo** | Definição clara, sem ambiguidade, autocontida |
```

### 7.3 Critérios para bom termo

| Critério | Validação |
|----------|-----------|
| Autocontido | Definição não depende de termos não definidos |
| Unívoco | Um significante = um significado (sem polissemia) |
| Acionável | Permite identificar instâncias do conceito |
| Consistente | Não conflita com outros termos do sistema |

### 7.4 Processo de adição

1. Verificar se termo já existe (Central ou local)
2. Se novo, definir em M0.1 do documento atual
3. Se compartilhado, abrir proposta para Central
4. Proposta requer: termo, definição, justificativa, camada

---

## 8. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Define termos C1 |
| genesis/GENESIS_Arquitetura.md | Visão técnica detalhada |
| docs/00_E/00_E_Epistemologia.md | Define termos C3 |
| docs/00_E/00_E_1_1_Problema.md | Usa este glossário para M0.1 |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Define termos de busca |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Define termos de decisão |

### Externas

| Fonte | Conceito |
|-------|----------|
| Saussure (1916) | Signo, Significante, Significado |
| Shannon (1948) | Entropia |
| OMG/MOF (1997) | Clabject |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-07 | Criação inicial. Termos proibidos, glossário por camada, modelo conceitual 1 LLM + N Contextos, seção "Como Criar Entradas". |
| 1.1 | 2025-12-07 | Adiciona referência ao GENESIS_Arquitetura.md no modelo conceitual e referências. |

---
nome: 00_I_0_1_Glossario
versao: "1.0"
tipo: Referencia
classe_ref: Documento
origem: interno
status: Publicado
camada: C2
depende_de: []
---

# Glossário Oficial GENESIS v1.0

## 1. Propósito

Este documento estabelece a terminologia oficial do sistema GENESIS para garantir consistência conceitual e evitar deriva semântica entre documentos, sprints e conversas.

**Regra:** Termos não listados aqui devem ser submetidos a M0 (definição de problema) antes de uso.

---

## 2. Termos Proibidos e Correções

| ❌ NÃO USAR | ✅ USAR | Justificativa |
|-------------|---------|---------------|
| Agente de IA | **Contexto Especializado** | LLM não tem autonomia; opera com contexto carregado |
| IA (genérico) | **LLM** | Especifica o componente (Claude, GPT, etc.) |
| Trabalhador | **Meta Sistema** | Estrutura de conhecimento, não entidade |
| IOA | Não usar | Termo indefinido |
| Fallback | **Retorno ao GENESIS** | Não é erro; é ciclo normal |
| Sprint (para workflow) | **Pipeline** ou **Workflow** | Sprint = período de trabalho humano |
| Criar IA | **Criar Meta Sistema** | Precisão conceitual |
| IA chama IA | **Composição de Meta Sistemas** | Dependência declarada, não chamada |

---

## 3. Glossário por Camada

### C0 - Axiomas

| Termo | Definição | Exemplo |
|-------|-----------|---------|
| **Axioma** | Verdade fundamental não derivada, aceita como ponto de partida | "Estrutura reduz entropia" |

### C1 - GENESIS (Propósito)

| Termo | Definição | Relação |
|-------|-----------|---------|
| **GENESIS** | Inteligência Orquestradora que entende, busca e roteia | Camada 1 |
| **Inteligência Híbrida** | Amplificação cognitiva via Humano + LLM + Sistema | Tese central |
| **Orquestração** | Ato de carregar o contexto correto para o LLM | Método principal |

### C2 - Infraestrutura

| Termo | Definição | Relação |
|-------|-----------|---------|
| **Catálogo** | Memória estruturada com busca semântica | Módulo base |
| **Persistência** | Armazenamento durável de conhecimento | Propriedade |
| **Frontmatter** | Metadados YAML no início de documentos | Formato |

### C3 - Framework (Epistemologia)

| Termo | Definição | Relação |
|-------|-----------|---------|
| **Epistemologia** | Meta Sistema Base que cria Meta Sistemas | Framework |
| **Meta Sistema** | Sistema que gera outros sistemas (Clabject) | Tipo |
| **M0-M4** | Ciclo: Problema → Marco → Objeto → Classe → Documento | Método |
| **Módulo** | Conjunto de classes opcionais para composição | Extensão |
| **Raciocínio** | Módulo para estruturar decisões (H→E→I→D) | Módulo |

### C4 - Domínios

| Termo | Definição | Relação |
|-------|-----------|---------|
| **Meta Sistema Derivado** | Meta Sistema criado via Epistemologia para domínio específico | Instância |
| **Contexto Especializado** | LLM operando com Meta Sistema carregado | Estado |

---

## 4. Conceitos Operacionais

### 4.1 Naturezas de Problema

| Termo | Definição | Tratamento |
|-------|-----------|------------|
| **CONHECER** | Problema que requer buscar/criar conhecimento estruturado | → Epistemologia |
| **DECIDIR** | Problema que requer tomar decisão baseada em contexto | → Raciocínio |

### 4.2 Fluxo GENESIS

| Termo | Definição | Método |
|-------|-----------|--------|
| **Entender** | Classificar input como CONHECER ou DECIDIR | `entender()` |
| **Buscar** | Consultar Catálogo por Meta Sistema ou Decisão | `buscar()` |
| **Rotear** | Carregar existente ou criar novo | `rotear()` |
| **Retorno ao GENESIS** | Fim de contexto, reinício de roteamento | Ciclo normal |

### 4.3 Composição

| Termo | Definição | Exemplo |
|-------|-----------|---------|
| **Pipeline** | Sequência de Meta Sistemas para problema composto | GTM = Produto + Mercado + Pricing |
| **Dependência** | Declaração no frontmatter de pré-requisitos | `depende_de: [MS_Produto]` |
| **Composição** | Meta Sistema que usa outputs de outros | MS_GTM compõe MS_Produto |

---

## 5. Modelo Conceitual
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MODELO: 1 LLM + N CONTEXTOS                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ❌ INCORRETO: "N IAs autônomas"                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  IA₁ ←→ IA₂ ←→ IA₃  (entidades separadas comunicando)               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ✅ CORRETO: "1 LLM + N Contextos"                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        ┌─────────┐                                  │    │
│  │                        │   LLM   │  (único motor)                   │    │
│  │                        └────┬────┘                                  │    │
│  │                             │                                       │    │
│  │           ┌─────────────────┼─────────────────┐                     │    │
│  │           ▼                 ▼                 ▼                     │    │
│  │    ┌───────────┐     ┌───────────┐     ┌───────────┐                │    │
│  │    │ Contexto  │     │ Contexto  │     │ Contexto  │                │    │
│  │    │ Vendas    │     │ Pricing   │     │ GTM       │                │    │
│  │    │(MS carrega│     │(MS carrega│     │(MS carrega│                │    │
│  │    │ do)       │     │ do)       │     │ do)       │                │    │
│  │    └───────────┘     └───────────┘     └───────────┘                │    │
│  │                                                                     │    │
│  │    GENESIS decide qual contexto carregar                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Regras de Uso

| Regra | Especificação |
|-------|---------------|
| **R-GLOSSARIO-01** | Todo documento deve usar termos deste glossário |
| **R-GLOSSARIO-02** | Termos novos requerem M0 antes de adoção |
| **R-GLOSSARIO-03** | Tabela "NÃO USAR" tem precedência absoluta |
| **R-GLOSSARIO-04** | Atualização do glossário requer incremento de versão |

---

## 7. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Define termos C1 |
| docs/00_E/00_E_Epistemologia.md | Define termos C3 |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Define termos de busca |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Define termos de decisão |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-06 | Criação inicial. Termos proibidos, glossário por camada, modelo conceitual. |

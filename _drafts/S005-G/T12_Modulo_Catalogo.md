---
nome: T12_Modulo_Catalogo
versao: "0.1"
tipo: Draft
classe_ref: Modulo
origem: interno
status: Draft
etapa: M0
sprint_ref: S005-G
task_ref: T12
---

# Módulo Catálogo

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Catálogo** | Índice estruturado que permite busca semântica |
| **Busca Semântica** | Encontrar item por significado, não apenas texto exato |
| **Chave** | Descrição semântica do que um item resolve/contém |
| **Match** | Correspondência entre query e chave com score de relevância |
| **Indexar** | Registrar item no catálogo com sua chave semântica |

### 1.2 Contexto: Por que Catálogo?

Durante desenvolvimento do Módulo Raciocínio (T11), identificamos problema recorrente:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PROBLEMA IDENTIFICADO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS precisa rotear usuário → Meta Sistema correto                      │
│  └─ Como? Busca semântica: problema ↔ domínio do Meta Sistema               │
│                                                                             │
│  Raciocínio precisa reutilizar decisões anteriores                          │
│  └─ Como? Busca semântica: problema+contexto ↔ decisão existente            │
│                                                                             │
│  MESMO PADRÃO, MESMA SOLUÇÃO                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│  "Como encontrar o item certo em um conjunto, usando linguagem natural?"    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SINTOMAS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐        │
│  │  BUSCA FALHA      │  │  DUPLICAÇÃO       │  │  ACOPLAMENTO      │        │
│  │ Texto exato não   │  │ Cada módulo       │  │ Lógica de busca   │        │
│  │ encontra por      │  │ implementa sua    │  │ espalhada em      │        │
│  │ significado       │  │ própria busca     │  │ vários lugares    │        │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘        │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SOLUÇÃO                                         │
│  MÓDULO CATÁLOGO: Interface genérica de busca semântica                     │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  indexar(item, chave) → registra no catálogo                          │  │
│  │  buscar(query) → item[] com score                                     │  │
│  │  match(query, threshold) → melhor item ou null                        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│  Composição: Qualquer módulo/sistema pode usar Catálogo                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Casos de Uso Identificados

| Quem Usa | Catálogo de | Query | Resultado |
|----------|-------------|-------|-----------|
| **GENESIS** | Meta Sistemas | "como vender mais" | Meta Sistema Vendas |
| **Raciocínio** | Decisões | "desconto cliente ACME" | Decisão anterior similar |
| **Epistemologia** | Documentos | "como criar M0" | Doc 00_E_1_1_Problema.md |
| **[Futuro]** | Qualquer | Qualquer | Item relevante |

### 1.5 Tese

> **Módulo Catálogo é infraestrutura de busca semântica que permite encontrar itens por significado, não apenas por texto exato.**
>
> - Interface genérica: indexar(), buscar(), match()
> - Reutilizável: qualquer módulo/sistema pode compor
> - Centralizado: lógica de busca em um só lugar
>
> **Princípio:** Catálogo é infraestrutura. Outros módulos dependem dele.

### 1.6 Perguntas Abertas para M1

| Pergunta | Impacto |
|----------|---------|
| Como calcular similaridade semântica? | Embeddings? Keywords? Híbrido? |
| Onde persistir o índice? | Arquivo? Memória? |
| Como atualizar índice quando item muda? | Automático? Manual? |
| Qual threshold padrão para match? | 0.7? 0.8? Configurável? |

---

## 2. Marco Teórico (M1)

*A definir na próxima etapa.*

---

## 3. Objeto (M2)

*A definir na próxima etapa.*

---

## 4. Classe (M3)

*A definir na próxima etapa.*

---

## Referências

### Internas

| Documento | Relação |
|-----------|---------|
| docs/00_E/00_E_Epistemologia.md | Pai - contém este módulo |
| _drafts/S005-G/T11_Modulo_Raciocinio.md | Depende deste módulo |
| genesis/GENESIS.md | Usa para rotear Meta Sistemas |

### Externas

*A definir em M1 - teorias de Information Retrieval, embeddings, etc.*

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | M0 inicial - Problema e casos de uso |

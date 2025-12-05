---
nome: T14_Refatorar_GENESIS_Router
versao: "0.1"
tipo: Draft
classe_ref: Instrucao
origem: interno
status: Backlog
sprint_ref: S005-G
task_ref: T14
---

# T14: Refatorar GENESIS como Router Inteligente

## Contexto

Durante desenvolvimento do Módulo Catálogo (T12), identificamos que GENESIS precisa ser refatorado para assumir papel de **Inteligência Orquestradora**, não apenas framework de propósito.

### Insight Central

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS = INTELIGÊNCIA ORQUESTRADORA                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS:                                                                   │
│  • Entende o problema do usuário (M0/Saussure)                              │
│  • Usa Catálogo como memória para buscar conhecimento existente             │
│  • Classifica natureza do problema                                          │
│  • Roteia para trabalhador especializado                                    │
│  • Decide se precisa criar novo Meta Sistema                                │
│                                                                             │
│  Analogia: Gerente que entende o pedido e delega para especialistas         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Fluxo de Roteamento Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUXO GENESIS ROUTER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  User Input                                                                 │
│       │                                                                     │
│       ▼                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 1. ENTENDER (M0/Saussure)                                           │    │
│  │    • Extrair significantes do input                                 │    │
│  │    • Mapear para significados no contexto                           │    │
│  │    • Identificar intenção                                           │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 2. CONSULTAR MEMÓRIA                                                │    │
│  │    • catalogo.buscar(query derivada do M0)                          │    │
│  │    • Retorna: Meta Sistemas, Decisões similares, Documentos         │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 3. CLASSIFICAR PROBLEMA                                             │    │
│  │                                                                     │    │
│  │    SE encontrou Meta Sistema com score alto:                        │    │
│  │       → Roteia para Meta Sistema existente                          │    │
│  │                                                                     │    │
│  │    SE NÃO encontrou, classificar natureza:                          │    │
│  │       ├─ "Como funciona X?" → EPISTEMOLOGIA (criar conhecimento)    │    │
│  │       ├─ "Devo fazer X ou Y?" → RACIOCÍNIO (estruturar decisão)     │    │
│  │       └─ Novo domínio identificado → CRIAR NOVO META SISTEMA        │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 4. ROTEAR                                                           │    │
│  │    • Carregar contexto do destino (arquivo_raiz)                    │    │
│  │    • Passar problema já entendido                                   │    │
│  │    • Trabalhador especializado executa                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Escopo da Refatoração

### O que adicionar ao GENESIS

| Componente | Descrição | Status Atual |
|------------|-----------|--------------|
| **Método entender()** | Aplica M0/Saussure ao input | Não existe |
| **Método consultar_memoria()** | Usa Catálogo.buscar() | Não existe |
| **Método classificar()** | Determina: Meta Sistema / Epistemologia / Raciocínio | Parcial em T09a |
| **Método rotear()** | Carrega contexto e delega | Parcial em T09a |
| **Critérios de Classificação** | Regras para decidir destino | Não documentado |

### Critérios de Classificação (a documentar)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CRITÉRIOS DE CLASSIFICAÇÃO                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. META SISTEMA EXISTENTE                                                  │
│     Condição: catalogo.buscar() retorna score >= 0.75                       │
│     Ação: Roteia para Meta Sistema encontrado                               │
│                                                                             │
│  2. EPISTEMOLOGIA (criar conhecimento)                                      │
│     Indicadores:                                                            │
│     • "Como funciona X?"                                                    │
│     • "Documente Y"                                                         │
│     • "Crie um framework para Z"                                            │
│     • "Estruture conhecimento sobre W"                                      │
│     Ação: Roteia para Epistemologia com instrução de criar M0-M4            │
│                                                                             │
│  3. RACIOCÍNIO (tomar decisão)                                              │
│     Indicadores:                                                            │
│     • "Devo fazer X ou Y?"                                                  │
│     • "Qual a melhor opção para Z?"                                         │
│     • "Analise prós e contras de W"                                         │
│     • "Me ajude a decidir sobre V"                                          │
│     Ação: Roteia para Raciocínio com instrução de ciclo H→E→I→D             │
│                                                                             │
│  4. NOVO META SISTEMA                                                       │
│     Condição: Problema representa domínio recorrente não coberto            │
│     Ação: Confirmar com usuário, criar via Epistemologia                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relação com Documentos Existentes

| Documento | Ação Necessária |
|-----------|-----------------|
| **genesis/GENESIS.md** | Adicionar métodos de router |
| **T09a_Interface_Roteamento.md** | Integrar ao GENESIS (não é documento separado) |
| **T02_GENESIS.md** | Atualizar com nova visão de router |
| **T12_Modulo_Catalogo.md** | Já refatorado - Catálogo é memória |

---

## Dependências

| Pré-requisito | Status |
|---------------|--------|
| T12 Catálogo M0-M3 | ✅ Concluído |
| T11 Raciocínio M0-M3 | ✅ Concluído |
| T09a Interface Roteamento | ✅ Draft pronto |

---

## Critérios de Aceite

- [ ] GENESIS tem método entender() que aplica M0/Saussure
- [ ] GENESIS tem método consultar_memoria() que usa Catálogo
- [ ] GENESIS tem método classificar() com critérios documentados
- [ ] GENESIS tem método rotear() que delega para trabalhadores
- [ ] Critérios de classificação (Epistemologia vs Raciocínio) estão claros
- [ ] Fluxo completo documentado no GENESIS.md

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | Instrução criada a partir de insights T12 |

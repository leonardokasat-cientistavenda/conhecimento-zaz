# Meta Sistema CRM - Vendas Outbound

## Status: Backlog

---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Alvo** | Estabelecimento/cliente prospectado pelo vendedor outbound |
| **Esteira** | Fases do funil: Decisor Localizado → Proposta → WIN |
| **WIN** | Venda fechada, dispara workflow no Camunda |
| **Dedup** | Deduplicação semântica para evitar alvos duplicados |
| **CR** | Conversion Rate - taxa de conversão entre fases |
| **PREZAR** | Sistema de incentivos ZAZ (fórmula de comissão) |
| **Zarah** | Sistema CRM legado (será substituído) |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│   "Vendedores porta-a-porta não usam CRM porque fricção > valor percebido.  │
│    Resultado: perda de histórico, sem insights, sem forecast confiável."    │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          ▼                        ▼                        ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  FRICÇÃO ALTA    │    │  DADOS POBRES    │    │  VALOR BAIXO     │
├──────────────────┤    ├──────────────────┤    ├──────────────────┤
│ URA leva 3-4min  │    │ Só WIN registrado│    │ Sem CR por fase  │
│ Muitos reports   │    │ Alvos duplicados │    │ Sem forecast     │
│ Fluxo complexo   │    │ Etapas perdidas  │    │ Sem plano ação   │
└──────────────────┘    └──────────────────┘    └──────────────────┘
          │                        │                        │
          └────────────────────────┼────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SOLUÇÃO: MS_CRM                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Reduzir tempo de report de 3-4min para <30s via texto livre no Mattermost  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **MS_CRM resolve a fricção de report de vendedores outbound via interface conversacional no Mattermost, captura semântica de Alvos com deduplicação, e geração de insights acionáveis baseados em taxas de conversão.**
>
> **Métrica de sucesso:** Reduzir tempo de report de 3-4min para <30s.

---

## 2. Arquitetura

### 2.1 Diagrama de Módulos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MS_CRM - ARQUITETURA                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  INTERFACE (Mattermost)                                                     │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Módulo Captura                                                    │     │
│  │  • Input: texto livre do vendedor                                  │     │
│  │  • Interpreta: CRIAR | EDITAR | CONSULTAR                          │     │
│  │  • Auth: login MM                                                  │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                          │                                                  │
│                          ▼                                                  │
│  CORE                                                                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
│  │  Módulo Alvo     │  │  Módulo Dedup    │  │  Módulo Esteira  │           │
│  │  • Criar         │  │  • Busca semânt. │  │  • Decisor loc.  │           │
│  │  • Editar        │  │  • Chaves:       │  │  • Proposta      │           │
│  │  • Consultar     │  │    - endereço    │  │  • WIN           │           │
│  │                  │  │    - nome+contato│  │                  │           │
│  │                  │  │    - telefone    │  │                  │           │
│  │                  │  │    - CNPJ        │  │                  │           │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘           │
│                          │                                                  │
│                          ▼                                                  │
│  INTELIGÊNCIA                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
│  │  Módulo Análise  │  │  Módulo Decisão  │  │  Módulo PREZAR   │           │
│  │  • CR por fase   │  │  • Insights      │  │  • Cruzar incent.│           │
│  │  • Forecast      │  │  • Comparativo   │  │  • Simular ganho │           │
│  │  • Volume/Ticket │  │  • Plano ação    │  │  • Objetivos vida│           │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘           │
│                          │                                                  │
│                          ▼                                                  │
│  INTEGRAÇÃO                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
│  │  Receita Federal │  │  Camunda         │  │  Metabase        │           │
│  │  • Base CNPJ     │  │  • Dispara WIN   │  │  • Relatórios    │           │
│  │  • Sugestão alvo │  │  • Workflow venda│  │                  │           │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Diagrama de Dependências

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DEPENDÊNCIAS DO MS_CRM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  bl_evolucao_catalogo ─────┐                                                │
│  (busca semântica)         │                                                │
│                            ├────► bl_ms_crm ────► bl_pipelines              │
│  bl_tools_externas ────────┘     (este item)     (WIN → Camunda)            │
│  (MM, Metabase, RF)                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Escopo

### 3.1 MVP (Fase 1)

| Módulo | Funcionalidade | Prioridade |
|--------|----------------|------------|
| Captura | Interpretar texto livre MM | Alta |
| Alvo | CRUD básico | Alta |
| Dedup | Busca por chaves candidatas | Alta |
| Esteira | Registrar fases | Alta |

### 3.2 Evolução (Fase 2+)

| Módulo | Funcionalidade | Prioridade |
|--------|----------------|------------|
| Análise | CR, forecast, volume/ticket | Média |
| Decisão | Insights, comparativo, plano ação | Média |
| PREZAR | Cruzamento incentivos | Média |
| Metabase | Relatórios (futuro: dentro do MM) | Baixa |

---

## 4. Integrações

| Sistema | Função | Fase |
|---------|--------|------|
| **Mattermost** | Interface do vendedor | MVP |
| **MongoDB** | Persistência de Alvos/Interações | MVP |
| **Camunda** | Dispara workflow em WIN | MVP |
| **Zarah** | Legado - recebe WIN até migração | MVP |
| **Receita Federal** | Base CNPJ para sugestão/enriquecimento | Fase 2 |
| **Metabase** | Relatórios | Fase 2 |

---

## 5. Chaves de Deduplicação

Para identificar se um Alvo já existe:

| Chave | Exemplo | Confiança |
|-------|---------|-----------|
| CNPJ | 12.345.678/0001-90 | Alta |
| Telefone | (11) 99999-9999 | Alta |
| Endereço | Rua X, 123, Bairro Y | Média |
| Nome + Contato | "Padaria Silva" + "João" | Média |

Busca semântica combina chaves para score de similaridade.

---

## Histórico

| Data | Alteração |
|------|-----------|
| 2025-12-09 | Criação do item de backlog - M0 inicial |

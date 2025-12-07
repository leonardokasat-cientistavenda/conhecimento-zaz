---
nome: Modulo_Autonomia
versao: "0.1"
tipo: Backlog
classe_ref: Modulo
origem: interno
status: Backlog
prioridade: Media
depende_de:
  - 00_E_2_1_Modulo_Catalogo
pre_requisito: Catálogo funcionando
---

# Módulo Autonomia (Backlog)

## 1. Problema (M0)

### 1.1 Contexto

GENESIS opera com **Loop Humano** por padrão: humano controla cada transição de contexto. Isso garante qualidade e supervisão, mas pode ser lento para tarefas repetitivas com Meta Sistemas já validados.

### 1.2 Necessidade

Permitir que Meta Sistemas com alto índice de confiança operem com menos intervenção humana, mantendo a possibilidade de supervisão.

### 1.3 Tese Preliminar

> **Módulo Autonomia controla o nível de intervenção humana no loop, permitindo três modos: Guiado, Assistido e Autônomo.**
>
> Autonomia é CONQUISTADA (baseada em métricas), não DADA por padrão.

---

## 2. Modos de Operação

| Modo | Descrição | Validação Humana |
|------|-----------|------------------|
| **Guiado** | Humano valida cada passo | 100% das transições |
| **Assistido** | Sistema executa, humano valida checkpoints | Em pontos definidos |
| **Autônomo** | Sistema executa até concluir | Só no final |

---

## 3. Critérios de Promoção

Para um Meta Sistema subir de modo:

| De → Para | Critério |
|-----------|----------|
| Guiado → Assistido | `uso_count >= 10` E `confirmacoes/uso_count >= 0.8` |
| Assistido → Autônomo | `uso_count >= 50` E `confirmacoes/uso_count >= 0.95` E humano autoriza |

### 3.1 Métricas Necessárias (do Catálogo)

| Métrica | Descrição |
|---------|-----------|
| `uso_count` | Quantas vezes o Meta Sistema foi usado |
| `confirmacoes` | Quantas vezes o resultado foi confirmado como bom |
| `rejeicoes` | Quantas vezes o resultado foi rejeitado |
| `ultima_rejeicao` | Data da última rejeição (se recente, bloqueia promoção) |

---

## 4. Classe Preliminar

```
┌─────────────────────────────────────────────────────────────────┐
│                      MÓDULO AUTONOMIA                           │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ──────────                                                     │
│  + modo_atual: Enum (GUIADO | ASSISTIDO | AUTONOMO)             │
│  + criterios_promocao: CriteriosPromocao                        │
│  + checkpoints: Checkpoint[] (para modo Assistido)              │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + avaliar_promocao(meta_sistema) → bool                        │
│  + promover(meta_sistema) → void                                │
│  + rebaixar(meta_sistema) → void                                │
│  + definir_checkpoints(meta_sistema, pontos[]) → void           │
│  + pode_executar_sem_validacao(etapa) → bool                    │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  R1: Modo Autônomo requer autorização explícita do humano       │
│  R2: Rejeição recente (<7 dias) bloqueia promoção               │
│  R3: Humano pode rebaixar a qualquer momento                    │
│  R4: Padrão sempre é GUIADO para novos Meta Sistemas            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Diferença vs CrewAI

| Aspecto | GENESIS + Autonomia | CrewAI |
|---------|---------------------|--------|
| Padrão | Loop Humano (Guiado) | Loop Autônomo |
| Autonomia | Conquistada por métricas | Dada por configuração |
| Rebaixamento | Automático se rejeição | Manual |
| Supervisão | Sempre disponível | Opcional |

---

## 6. Pré-requisitos

| Requisito | Status | Observação |
|-----------|--------|------------|
| Catálogo funcionando | ❌ Pendente | Precisa de `uso_count`, `confirmacoes` |
| Metadata em Meta Sistemas | ❌ Pendente | Armazenar métricas de uso |
| Interface de validação | ❌ Pendente | Humano confirma/rejeita resultados |

---

## 7. Prioridade

**Média** - Implementar após:
1. ✅ GENESIS v1.x (conceito documentado)
2. ❌ Catálogo MVP funcionando
3. ❌ Primeiro Meta Sistema de domínio testado

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-07 | Criação do backlog. M0 inicial, modos, critérios de promoção. |

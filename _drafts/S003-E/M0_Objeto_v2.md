---
nome: M0_Objeto_v2
versao: "1.0"
tipo: Problema
classe_ref: Problema
origem: interno
status: Draft
etapa: M0
data_inicio: 2025-12-03
---

# M0: Problema para Objeto v2

## 1. Tabela Principal

| Campo | Valor |
|-------|-------|
| **nome** | P_Objeto_v2 |
| **sintoma** | Classe Objeto v1.0 usa diagrama de Classe (Caixa POO) em vez de diagrama de Objeto (Círculo/Venn). Não tem marco teórico. Não conecta com glossário de M0 nem conceitos de M1. Método `definir()` é genérico, sem processo de descoberta. |
| **causa_raiz** | Sprint S002-E focou estrutura mínima viável. Não aplicou Matriz de Diagramas nem conectou com outputs de M0/M1. |
| **tentativas_anteriores** | v1.0 criada com template genérico de Classe |
| **necessidade** | Aplicar M0-M4 recursivamente em Objeto: marco teórico de delimitação, diagramas corretos (Círculo/Venn + Caixa Contextual), método de descoberta, conexão explícita com M0/M1. |

---

## 2. Significantes

| Significante | Significado | Ambiguidade |
|--------------|-------------|-------------|
| objeto | Entidade delimitada que será estudada/construída em M2; output de M1, input para M3 | ≠ objeto POO (instância de classe) - Resolvido |
| escopo | O que está INCLUÍDO no objeto de pesquisa | - |
| fronteiras | O que está EXCLUÍDO do objeto de pesquisa | ≠ fronteiras geográficas - Resolvido |
| delimitação | Ato epistemológico de definir limites (escopo + fronteiras) | - |
| contexto | Situação/ambiente onde o objeto existe e será aplicado | - |
| ponte | Função de conectar M1 (conceitos) a M3 (classes) sem perda de informação | Metáfora - Resolvido |

---

## 3. Diagramas

### 3.1 Diagrama 1: Signo (Ambiguidade "objeto")

```
┌─────────────────────────────────────┐
│              SIGNO                  │
├──────────────────┬──────────────────┤
│   SIGNIFICANTE   │   SIGNIFICADO    │
│                  │                  │
│    "objeto"      │  ┌────────────┐  │
│                  │  │ Instância  │ ✗│
│                  │  │ POO        │  │
│                  │  ├────────────┤  │
│                  │  │ Entidade   │ ✓│
│                  │  │ delimitada │  │
│                  │  │ em M2      │  │
│                  │  └────────────┘  │
└──────────────────┴──────────────────┘
         │
         ▼
   Contexto ZAZ: Objeto = 
   output M1 → input M3
```

**Metodologia:** 1 (Semiótica) + 3 (Estrutural)

**Justificativa:** Resolve ambiguidade crítica entre "objeto POO" e "objeto epistemológico"

---

### 3.2 Diagrama 2: Fluxo M0 (Processo de Clarificação)

```
Sintoma (Objeto v1.0 incompleto)
       │
       ▼
┌─────────────────────┐
│ Extrair Significantes│ ──► objeto, escopo, fronteiras,
└─────────────────────┘      delimitação, contexto, ponte
       │
       ▼
┌─────────────────────┐
│ Mapear Significados │ ──► Glossário (6 termos)
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Detectar Ambiguidade│ ──► "objeto" (POO vs epistemológico)
└─────────────────────┘      "fronteiras" (geo vs escopo)
       │
       ▼
┌─────────────────────┐
│  Resolver via       │ ──► Contexto ZAZ define significado
│  Contexto           │
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Identificar Causa  │ ──► S002-E não aplicou Matriz
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Definir Necessidade │ ──► Aplicar M0-M4 recursivo
└─────────────────────┘
       │
       ▼
Problema Definido (input para M1)
```

**Metodologia:** 3 (Estrutural) + 2 (Carga Cognitiva)

**Justificativa:** Reflete sequência interna de M0; linear, baixa carga

---

### 3.3 Diagrama 3: Posição de Objeto no Framework

```
┌─────────────────────────────────────────────────────────────┐
│                      FRAMEWORK M0-M4                        │
│                                                             │
│  ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐      │
│  │  M0  │──►│  M1  │──►│  M2  │──►│  M3  │──►│  M4  │      │
│  │Probl.│   │Marco │   │OBJETO│   │Classe│   │Persis│      │
│  └──────┘   └──────┘   └──┬───┘   └──────┘   └──────┘      │
│                           │                                 │
│                           │ ◄── FOCO DESTE M0               │
│                           │                                 │
│            ┌──────────────┴──────────────┐                  │
│            │                             │                  │
│            │  Recebe: glossário (M0)     │                  │
│            │          conceitos (M1)     │                  │
│            │                             │                  │
│            │  Produz: escopo delimitado  │                  │
│            │          para M3 gerar      │                  │
│            │          Classes/Métodos    │                  │
│            │                             │                  │
│            └─────────────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Metodologia:** 3 (Estrutural)

**Justificativa:** Mostra posição crítica de Objeto como ponte M1→M3

---

## 4. Checklist M0

- [x] Sintoma extraído
- [x] Significantes identificados (6)
- [x] Cada significante tem significado mapeado
- [x] Ambiguidades resolvidas (objeto, fronteiras)
- [x] Causa raiz identificada
- [x] Necessidade é acionável
- [x] Tentativas anteriores documentadas
- [x] Diagrama 1: Signo (ambiguidade)
- [x] Diagrama 2: Fluxo M0 (processo)
- [x] Diagrama 3: Contexto (posição no framework)

---

## 5. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_3_Objeto.md | Arquivo a ser atualizado |
| 00_E_1_1_Problema.md | Template M0 |
| Matriz_Selecao_Diagramas.md | Guia para diagramas |
| 00_E_1_2_MarcoTeorico.md | Próximo (M1) |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 18:15 | Criação. M0 completo com 3 diagramas, glossário, checklist. |

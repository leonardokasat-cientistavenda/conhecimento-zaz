---
nome: 00_E_1_4_1_Diagrama
versao: "1.1"
tipo: Classe
classe_ref: Classe
origem: interno
status: Publicado
---

# Diagrama v1.1

## 1. Problema (M0)

### 1.1 Sintoma

| Sintoma | Evidência |
|---------|-----------|
| Diagramas em seção isolada | Perdem contexto visual |
| Sem critério de seleção | Diagrama decorativo, não funcional |

### 1.2 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **diagrama** | Representação visual do conhecimento |
| **diagrama-first** | Princípio: diagrama contextualiza seção |
| **metodologia** | Critério de seleção (Semiótica, Carga, Estrutural) |

### 1.3 Necessidade

Diagrama como subtipo de Classe com método de seleção sistemático.

---

## 2. Marco Teórico (M1)

### 2.1 Conceitos

| Conceito | Teoria | Aplicação |
|----------|--------|-----------|
| **Semiótica Visual** | Saussure | Diagrama como signo |
| **Carga Cognitiva** | Miller | Máxima clareza, mínimo esforço |
| **Estrutura** | POO | Diagrama reflete estrutura interna |

### 2.2 Diagrama: Princípio de Uso

```
┌─────────────────────────────────────────────────────────────────┐
│                      DOCUMENTO                                  │
├─────────────────────────────────────────────────────────────────┤
│  ## Seção 1                                                     │
│  [texto]                                                        │
│  ```                                                            │
│  [DIAGRAMA] ← contextualiza a seção                             │
│  ```                                                            │
│                                                                 │
│  ## Seção 2                                                     │
│  [texto]                                                        │
│  ```                                                            │
│  [DIAGRAMA] ← contextualiza a seção                             │
│  ```                                                            │
└─────────────────────────────────────────────────────────────────┘

❌ ERRADO: Seção única "Diagramas"
✅ CERTO: Cada diagrama na seção que contextualiza
```

---

## 3. Objeto (M2)

### 3.1 Definição

| Campo | Valor |
|-------|-------|
| **nome** | Diagrama |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Representar visualmente conhecimento dentro de seções |

### 3.2 Escopo e Fronteiras

| Escopo | Fronteiras |
|--------|------------|
| Diagramas ASCII/UML | Imagens externas |
| Seleção por metodologia | Diagramas decorativos |
| Contextualização de seções | Seção isolada "Diagramas" |

---

## 4. Classe (M3)

### 4.1 Diagrama de Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                         «class»                                 │
│                         Diagrama                                │
├─────────────────────────────────────────────────────────────────┤
│  + tipo: enum                        [1]                        │
│  + conteudo: string                  [1]                        │
│  + metodologia: enum                 [1]                        │
│  - justificativa: string             [0..1]                     │
│  + secao_contexto: string            [1]                        │
├─────────────────────────────────────────────────────────────────┤
│  R1: Diagrama em seção contextual                               │
│  R2: Tipo válido                                                │
│  R3: Metodologia documentada                                    │
│  R4: ASCII legível                                              │
├─────────────────────────────────────────────────────────────────┤
│  + selecionar(classe): Diagrama[]                               │
│  + validar(): boolean                                           │
│  + renderizar(): string                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Atributos

| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| tipo | enum | [1] | + | Sim | Signo, Fluxo, Rede, CaixaPOO, Circulo, Estado, Arvore, Tabela |
| conteudo | string | [1] | + | Sim | ASCII/UML |
| metodologia | enum | [1] | + | Sim | 1-Semiótica, 2-Carga, 3-Estrutural |
| justificativa | string | [0..1] | - | Não | Por que este diagrama |
| secao_contexto | string | [1] | + | Sim | Seção onde aparece |

### 4.3 Matriz de Seleção por Classe

| Classe | Diagrama Primário | Diagrama Secundário |
|--------|-------------------|---------------------|
| Problema (M0) | Signo | Fluxo M0 |
| MarcoTeorico (M1) | Rede | Tabela |
| Objeto (M2) | Circulo | Contextual |
| Classe (M3) | CaixaPOO | Relações |
| Documento (M4) | Estado | Timeline |

### 4.4 Restrições

| Código | Restrição | Validação |
|--------|-----------|-----------|
| R1 | Diagrama em seção contextual | secao_contexto != "Diagramas" |
| R2 | Tipo válido | tipo ∈ {Signo, Fluxo, Rede...} |
| R3 | Metodologia documentada | metodologia ∈ {1, 2, 3} |
| R4 | ASCII legível | Caracteres ASCII |

### 4.5 Métodos

#### selecionar(classe: Classe): Diagrama[]

| Campo | Valor |
|-------|-------|
| Input | classe: Classe |
| Output | Diagrama[] |
| Processo | 1. Consultar matriz → 2. Aplicar metodologia 3 → 3. Validar |

---

## 5. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| 00_E_1_4_Classe | Classe pai |
| 00_E_Epistemologia | Avô |
| 00_E_1_1_Problema | Usa Signo + Fluxo |
| 00_E_1_2_MarcoTeorico | Usa Rede |
| 00_E_1_3_Objeto | Usa Círculo |
| 00_E_1_6_Documento | Usa Estado |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 22:30 | Criação. Subtipo de Classe. Matriz seleção. |
| 1.1 | 2025-12-04 | 13:30 | **PADRONIZAÇÃO S004-E**: Adiciona M0-M2 explícitos. Status Publicado. Refs atualizadas. T6. |

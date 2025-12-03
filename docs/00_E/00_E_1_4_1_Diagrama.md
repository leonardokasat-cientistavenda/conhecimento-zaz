---
nome: 00_E_1_4_1_Diagrama
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_4_1_Diagrama

## 1. Definição

Diagrama é um subtipo de Classe que estrutura representações visuais do conhecimento. Diagramas são usados **dentro das seções** dos documentos para dar contexto visual, não em uma seção única isolada.

---

## 2. Princípio de Uso

**Diagramas contextualizam seções, não existem isolados.**

```
┌─────────────────────────────────────────────────────────────────┐
│                      DOCUMENTO                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ## Seção 1: Definição                                          │
│  [texto]                                                        │
│                                                                 │
│  ## Seção 2: Marco Teórico                                      │
│  [texto]                                                        │
│  ```                                                            │
│  [DIAGRAMA: Rede de Conceitos] ← contextualiza a seção          │
│  ```                                                            │
│                                                                 │
│  ## Seção 3: Atributos                                          │
│  [texto]                                                        │
│  ```                                                            │
│  [DIAGRAMA: Caixa POO] ← contextualiza a seção                  │
│  ```                                                            │
│                                                                 │
│  ## Seção 4: Fluxo                                              │
│  [texto]                                                        │
│  ```                                                            │
│  [DIAGRAMA: Fluxo] ← contextualiza a seção                      │
│  ```                                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

❌ ERRADO: Seção única "Diagramas" com todos os diagramas juntos
✅ CERTO: Cada diagrama na seção que ele contextualiza
```

---

## 3. Atributos

| Atributo | Tipo | Card. | Visib. | Obrig. | Descrição |
|----------|------|-------|--------|--------|-----------|
| tipo | enum | [1] | + | Sim | Tipo do diagrama (ver Seção 4) |
| conteudo | string | [1] | + | Sim | ASCII/UML do diagrama |
| metodologia | enum | [1] | + | Sim | 1-Semiótica, 2-Carga, 3-Estrutural |
| justificativa | string | [0..1] | + | Não | Por que este diagrama foi escolhido |
| secao_contexto | string | [1] | + | Sim | Seção onde o diagrama aparece |

---

## 4. Tipos de Diagrama

| Tipo | Uso | Metodologia Primária | Exemplo |
|------|-----|---------------------|---------|
| **Signo** | Desambiguação de termos | 1-Semiótica | Significante ↔ Significado |
| **Fluxo** | Sequência de etapas | 3-Estrutural | Input → Processo → Output |
| **Rede** | Conceitos relacionados | 3-Estrutural | Nós + Arestas |
| **CaixaPOO** | Estrutura de classe | 3-Estrutural | Atributos + Métodos |
| **Circulo** | Escopo/Fronteiras | 1-Semiótica | Dentro/Fora |
| **Estado** | Transições de status | 3-Estrutural | Estado1 → Estado2 |
| **Arvore** | Hierarquia | 3-Estrutural | Pai → Filhos |
| **Tabela** | Dados estruturados | 2-Carga | Linhas × Colunas |

---

## 5. Diagrama UML

```
┌─────────────────────────────────────────────────────────────────┐
│                         «class»                                 │
│                         Diagrama                                │
├─────────────────────────────────────────────────────────────────┤
│  - tipo: enum                        [1]                        │
│  - conteudo: string                  [1]                        │
│  - metodologia: enum                 [1]                        │
│  - justificativa: string             [0..1]                     │
│  - secao_contexto: string            [1]                        │
├─────────────────────────────────────────────────────────────────┤
│  + selecionar(classe): Diagrama[]                               │
│  + validar(): boolean                                           │
│  + renderizar(): string                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Matriz de Seleção por Classe

### 6.1 Quando usar cada diagrama

| Classe | Diagrama Primário | Diagrama Secundário | Seção Típica |
|--------|-------------------|---------------------|--------------|
| **Problema (M0)** | Signo | Fluxo M0 | Definição, Fluxo |
| **MarcoTeorico (M1)** | Rede | Tabela | Marco Teórico |
| **Objeto (M2)** | Circulo | Contextual | Escopo |
| **Classe (M3)** | CaixaPOO | Relações | Atributos, Métodos |
| **Metodo** | Fluxo | Sequência | Processo |
| **Documento (M4)** | Estado | Timeline | Ciclo de Vida |

### 6.2 Metodologias de Seleção

| # | Metodologia | Princípio | Quando Usar |
|---|-------------|-----------|-------------|
| 1 | **Semiótica** | Diagrama como signo visual | Resolver ambiguidade, mostrar limites |
| 2 | **Carga Cognitiva** | Máxima clareza, mínimo esforço | Muitos dados, comparações |
| 3 | **Estrutural** | Refletir estrutura interna | Fluxos, hierarquias, relações |

### 6.3 Heurística de Decisão

```
┌─────────────────────────────────────────────────────────────────┐
│                   SELEÇÃO DE DIAGRAMA                           │
└─────────────────────────────────────────────────────────────────┘

1. Identificar CLASSE do documento
   └─► Consultar tabela 6.1

2. Identificar SEÇÃO onde diagrama vai
   └─► Diagrama contextualiza esta seção?

3. Aplicar METODOLOGIA 3 (Estrutural)
   └─► Estrutura interna sugere qual diagrama?

4. Validar com METODOLOGIA 1 ou 2
   └─► Semiótica: signo visual faz sentido?
   └─► Carga: é legível?

5. Documentar JUSTIFICATIVA (opcional)
   └─► Por que este diagrama foi escolhido
```

---

## 7. Restrições

| Código | Restrição | Validação |
|--------|-----------|-----------|
| R1 | Diagrama deve estar em seção contextual | secao_contexto != "Diagramas" |
| R2 | Tipo deve ser válido | tipo ∈ {Signo, Fluxo, Rede, CaixaPOO, Circulo, Estado, Arvore, Tabela} |
| R3 | Metodologia documentada | metodologia ∈ {1, 2, 3} |
| R4 | Conteúdo em ASCII | conteudo usa caracteres ASCII |

---

## 8. Métodos

### 8.1 selecionar(classe: Classe): Diagrama[]

**Descrição:** Seleciona diagramas apropriados para uma classe.

| Campo | Valor |
|-------|-------|
| Input | classe: Classe |
| Output | Diagrama[] (lista ordenada por prioridade) |
| Pré-condição | classe.tipo definido |
| Pós-condição | Diagramas com metodologia justificada |

**Processo:**

```
┌─────────────────┐
│     CLASSE      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  1. Consultar Matriz 6.1                │
│     - Primário por tipo de classe       │
│     - Secundário se necessário          │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  2. Aplicar Metodologia 3 (Estrutural)  │
│     - Verificar estrutura interna       │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  3. Validar com Metodologia 1 ou 2      │
│     - Semiótica: signo claro?           │
│     - Carga: legível?                   │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │  Diagrama[]   │
         └───────────────┘
```

### 8.2 validar(): boolean

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | boolean |
| Validações | R1-R4 |

### 8.3 renderizar(): string

| Campo | Valor |
|-------|-------|
| Input | self |
| Output | string (ASCII formatado) |

---

## 9. INSTRUÇÃO: Como usar Diagrama

### 9.1 Ao criar documento

1. **Identificar** tipo da classe (M0, M1, M2, M3, M4)
2. **Consultar** Matriz 6.1 para diagramas recomendados
3. **Inserir** diagrama NA SEÇÃO que ele contextualiza
4. **Documentar** metodologia usada (opcional mas recomendado)

### 9.2 Template de Diagrama em Seção

```markdown
## X. [Nome da Seção]

[Texto explicativo da seção]

**Diagrama: [Tipo]** (Metodologia: [1/2/3])

```
[conteudo ASCII do diagrama]
```

[Texto continuação se necessário]
```

### 9.3 Checklist

- [ ] Diagrama está NA SEÇÃO que contextualiza (não em seção isolada)
- [ ] Tipo é apropriado para a classe (ver Matriz 6.1)
- [ ] Metodologia aplicada (preferencialmente 3-Estrutural)
- [ ] ASCII legível e formatado
- [ ] Diagrama agrega valor (não é decorativo)

---

## 10. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_4_Classe | Classe pai |
| 00_E_1_1_Problema | Usa Signo + Fluxo |
| 00_E_1_2_MarcoTeorico | Usa Rede |
| 00_E_1_3_Objeto | Usa Círculo |
| 00_E_1_5_Metodo | Usa Fluxo |
| 00_E_1_6_Documento | Usa Estado |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 22:30 | Criação. Subtipo de Classe para diagramas. Princípio: diagramas contextualizam seções. Matriz de seleção por classe. 3 metodologias. 8 tipos de diagrama. |

---
nome: M0_Diagramas
versao: "2.0"
tipo: Classe
classe_ref: Problema
origem: interno
status: Draft
etapa: M0
data_inicio: 2025-12-03
---

# M0: Problema - Modelagem de Diagramas

## 1. Definição

Problema no framework epistemológico de comunicação visual: precisamos de um **sistema de classificação + seleção de diagramas** que determine qual tipo de diagrama usar em cada etapa do método M0-M4, para diferentes classes, garantindo consistência visual e clareza de comunicação.

---

## 2. Sintoma (Observado)

Diagramas usados em GENESIS.md, 00_E_1_1_Problema.md, 00_E_Epistemologia.md e outros documentos variam em:
- Estilo visual (caixas POO vs. fluxos vs. diagramas de signo)
- Ausência de critério explícito para escolha
- Resultado: Inconsistência visual e potencial confusão de audiência

**Impacto:** Usuários (incluindo Claude) perdem tempo interpretando qual diagrama é mais apropriado para cada contexto, reduzindo clareza e aumentando revisões.

---

## 3. Significantes (Análise Semiótica)

| Significante | Significado Proposto | Ambiguidade Identificada | Resolução |
|--------------|---------------------|--------------------------|-----------|
| **diagrama** | Representação visual estruturada de conceito | Tipo específico (classe? fluxo? dependência?) vs. termo genérico | **Definir taxonomia:** Diagrama de Estrutura, Fluxo, Dependência, Semiótica, Contexto |
| **etapa do processo** | Ponto no método M0-M4 onde diagrama aparece | Qual nível? (M0 inteiro? Subfase dentro de M0?) | **Mapear:** Cada tipo de diagrama → Etapa(s) aplicável(is) |
| **melhor diagrama** | Escolha mais eficaz para comunicar | "Melhor" por qual critério? (simplicidade? precisão? audiência?) | **Definir heurística:** Critérios explícitos de seleção |
| **contexto** | Situação onde diagrama é apresentado | Contexto para quem? (desenvolvedores? gestores? pesquisadores?) | **Tipos de audiência:** Técnico, Estratégico, Aprendiz |
| **mapeamento** | Ação de documentar estrutura/fluxo/relações | Mapear o quê? Estrutura? Fluxo? Dependências? | **Especificar objetivo:** O que o diagrama comunica? |

---

## 4. Glossário (Definições Contextualizadas)

| Termo | Definição no Contexto | Referência |
|------|----------------------|-----------|
| **Diagrama** | Representação visual de conceitos, estruturas ou processos usando convenções gráficas padronizadas | UML, Linguística Visual |
| **Significante Visual** | Forma gráfica (caixa, seta, círculo, etc.) que representa um conceito | Semiótica de Peirce/Saussure |
| **Audiência** | Grupo de usuários interpretando o diagrama (técnicos, gestores, aprendizes) | Design Thinking |
| **Etapa M0-M4** | Fase do método epistemológico onde diagrama é aplicado | GENESIS.md |
| **Taxonomia** | Sistema de classificação hierárquico de tipos de diagrama | Biologia, Ontologia |
| **Heurística** | Regra ou critério prático para seleção rápida | Engenharia |

---

## 5. Causa Raiz

**Falta de meta-sistema para diagramação:**

O framework epistemológico (M0-M4) estrutura como gerar **conhecimento** (conceitos, classes, métodos), mas não estrutura como **comunicar visualmente** esse conhecimento através de diagramas.

Resultado: Cada documento improvisa, gerando inconsistência.

---

## 6. Tentativas Anteriores

1. **GENESIS.md (v0.1-0.7):** Usa caixa POO + fluxo simples. Sem justificativa de escolha.
2. **00_E_1_1_Problema.md (v1.0-2.0):** Adiciona diagrama de Signo (Saussure). Variação sem padrão.
3. **00_E_Epistemologia.md (v2.0-2.2):** Fluxo linear (M0→M1→M2→...). Novamente, sem sistema explícito.

**Resultado:** 3 estilos diferentes sem critério unificador.

---

## 7. Necessidade

Criar um **sistema de modelagem de diagramas** que:

1. **Categorize tipos** de diagrama (Estrutura, Fluxo, Dependência, Semiótica, Contexto, etc.)
2. **Defina critérios de seleção** (Qual tipo para qual etapa? Qual classe?)
3. **Padronize convenções** (Símbolos, cores, texto, legenda)
4. **Seja aplicável recursivamente** (O próprio sistema pode ser documentado via diagrama)
5. **Seja persistido como Classe** (00_E_X_X_Diagrama.md) para reutilização

---

## 8. Contexto

- **Domínio:** Framework Epistemológico (GENESIS, Camada 3)
- **Usuários:** Desenvolvedores do framework, usuários finais consultando documentação
- **Restrição:** Usar Markdown + ASCII art (sem ferramentas gráficas externas)
- **Objetivo adicional:** Demonstrar aplicação recursiva do método M0-M4 a um meta-problema (Como diagramar vs. O que diagramar)

---

## 9. Impacto (Se não resolver)

- Novos documentos continuarão usando diagramas inconsistentes
- Usuários perderão tempo interpretando qual diagrama representa qual conceito
- Qualidade da comunicação visual degrada conforme framework cresce
- Impossível escalar para Domínios (Camada 4: Mercado, Produto, etc.)

---

## 10. Estrutura Proposta (M1 em diante)

```
M0 (Este documento)
  ↓
M1 (Marco Teórico)
  - Pesquisar: Tipos de diagramas (UML, arquitetura, fluxos)
  - Pesquisar: Semiótica visual (significante gráfico → conceito)
  - Pesquisar: Modelos mentais por audiência
  ↓
M2 (Definir Objeto: Diagrama)
  - Nome: Diagrama (classe visual)
  - Escopo: Representações de conceitos/estruturas/fluxos
  - Fronteiras: Não cobre geração automática; apenas estrutura manual
  ↓
M3 (Especificar POO)
  - Classe: Diagrama (tipos, atributos, métodos)
  - Classes relacionadas: TipoDiagrama, Elemento, Convenção
  ↓
M4 (Persistir)
  - Documento: 00_E_X_X_Diagrama.md com tipos + heurística
```

---

## 11. Diagramas de M0 (Aplicando a Matriz)

### DIAGRAMA 1: Signo Saussure - Desambiguação

**Metodologia Aplicada:** 1 (Semiótica) + 3 (Estrutural)

**Nome do Diagrama na Metodologia:** "Signo de Saussure"

**Por que selecionado:**

O core do Problema é **desambiguar o termo "diagrama"**. Conforme análise semiótica (Seção 3), o termo "diagrama" tem múltiplos significados possíveis:
- Tipo específico (Class Diagram, Sequence Diagram, etc.)?
- Categoria genérica (qualquer visual)?
- Ferramenta ou resultado?

A Metodologia 1 (Semiótica) indica que quando há **ambiguidade de significado**, o diagrama de Signo Saussure é primário porque **visualiza exatamente essa ambiguidade** (significante → múltiplos significados → resolução).

A Metodologia 3 (Estrutural) valida: o Problema tem estrutura "significantes[] → glossario[]", e Signo reflete essa estrutura.

**Outras opções e por que descartadas:**

- **Venn Múltiplo:** Funcionaria se houvesse 3+ significados igualmente válidos. Mas queremos **resolver ambiguidade**, não apenas listar. Descartada.
- **Fluxo:** Mostra sequência, mas não o core da desambiguação. Secundário.

**Representação:**

```
┌──────────────────────────────────────────────────────┐
│                    SIGNO: DIAGRAMA                   │
├──────────────────────────────────────────────────────┤
│                                                      │
│         SIGNIFICANTE                                 │
│         (Forma Visual)                               │
│                                                      │
│            "diagrama"                                │
│          (palavra/conceito)                          │
│                                                      │
│                    ↓ representa                      │
│                                                      │
│    ╔════════════════════════════════════╗            │
│    ║    SIGNIFICADO (Múltiplos Possíveis)║            │
│    ╠════════════════════════════════════╣            │
│    ║ 1. Tipo específico (UML, fluxo, ...)║            │
│    ║ 2. Categoria genérica (qualquer representação)  ║
│    ║ 3. Ferramenta/Processo de desenho  ║            │
│    ║ 4. Output/Artefato final           ║            │
│    ╚════════════════════════════════════╝            │
│                    ↓ glossário resolve              │
│                                                      │
│    SIGNIFICADO FINAL (Este Problema):                │
│    "Representação visual estruturada que comunica    │
│     conceitos, processos ou estruturas usando       │
│     convenções gráficas padronizadas"               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

### DIAGRAMA 2: Fluxo M0 - Sequência de Clarificação

**Metodologia Aplicada:** 3 (Estrutural) + 2 (Carga Cognitiva)

**Nome do Diagrama na Metodologia:** "Fluxo de Processo / Atividade"

**Por que selecionado:**

O Problema tem uma **sequência lógica clara** de clarificação:
```
Sintoma (diagramas inconsistentes)
  → Significantes ambíguos extraídos
  → Glossário mapeado
  → Causa raiz identificada
  → Necessidade definida
```

A Metodologia 3 (Estrutural) indica que processos com **sequência obrigatória** (sintoma → glossário → necessidade) merecem **Fluxo** porque as setas refletem a ordem causal.

A Metodologia 2 (Carga Cognitiva) valida: fluxo linear é **baixa carga** (máx 5-7 etapas), fácil de seguir.

**Outras opções e por que descartadas:**

- **Atividade (com decisões):** Não há branches (if/then) neste Problema. Fluxo linear é suficiente.
- **Diagrama de Dependência:** Mostraria "quem depende de quem", não a sequência de clarificação.

**Representação:**

```
Sintoma Bruto
    │ (observar inconsistência)
    ▼
┌─────────────────────────────┐
│  Extrair Significantes      │ ──► Lista: [diagrama, tipo, "melhor"]
└─────────────────────────────┘
    │ (identificar termos-chave)
    ▼
┌─────────────────────────────┐
│  Mapear Significados        │ ──► Tabela: significante → significado
└─────────────────────────────┘
    │ (definir cada termo)
    ▼
┌─────────────────────────────┐
│  Detectar Ambiguidades      │ ──► Termos com múltiplos significados
└─────────────────────────────┘
    │ (confirmar com user)
    ▼
┌─────────────────────────────┐
│  Alinhar / Resolver         │ ──► Glossário validado
└─────────────────────────────┘
    │ (todos os termos têm 1 significado)
    ▼
┌─────────────────────────────┐
│  Identificar Causa Raiz     │ ──► "Falta de meta-sistema"
└─────────────────────────────┘
    │ (por que o sintoma ocorre?)
    ▼
┌─────────────────────────────┐
│  Definir Necessidade        │ ──► "Criar sistema + documentar"
└─────────────────────────────┘
    │ (ação para resolver)
    ▼
Problema Definido (pronto para M1)
```

---

### DIAGRAMA 3: Venn - Múltiplos Significados (Contexto)

**Metodologia Aplicada:** 1 (Semiótica)

**Nome do Diagrama na Metodologia:** "Diagrama de Venn"

**Por que selecionado:**

O Problema menciona que **diferentes audiências** (técnicos, gestores, aprendizes) podem ter diferentes interpretações legítimas do termo "diagrama".

A Metodologia 1 (Semiótica) indica que quando há **múltiplas interpretações válidas baseadas em contexto**, Venn mostra **interseção entre domínios**:
- Técnico: foca em "tipo específico" (UML, fluxo, etc.)
- Gestor: foca em "comunicação de estrutura"
- Aprendiz: foca em "forma visual compreensível"

O Venn mostra que **há overlap** (todos precisam de "representação visual") mas **ênfases diferentes**.

**Outras opções e por que descartadas:**

- **Rede Conceitual:** Seria overly complex para este propósito. Venn é mais direto.
- (Terciário/opcional - só se tipo_pesquisa for Exploratória. Aqui é Explicativa.)

**Representação:**

```
┌─────────────────────────────────────────────────────┐
│   Interpretações Legítimas de "Diagrama"            │
│   por Audiência Diferente                           │
└─────────────────────────────────────────────────────┘

          ┌─────────────┐         ┌──────────────┐
          │  TÉCNICO    │         │   GESTOR     │
          │             │         │              │
          │  · UML      │         │ · Estrutura  │
          │  · Fluxo    │         │ · Processo   │
          │  · Tipo     │   ┌─────┼─ · Resultado│
          │    específ. │   │     │              │
          └─────────────┘   │     └──────────────┘
                            │
                      ┌─────▼──────┐
                      │  Overlap    │
                      │  (Todos)    │
                      │             │
                      │ Representação
                      │ Visual Clara
                      │ Comunica
                      │ Conceito
                      └─────┬──────┘
                            │
          ┌─────────────┐   │
          │  APRENDIZ   │───┘
          │             │
          │ · Intuitivo │
          │ · Forma     │
          │   visual    │
          │ · Simples   │
          └─────────────┘
```

---

## 12. Validação dos Diagramas Selecionados

**Consultando Matriz_Selecao_Diagramas.md (Seção 3.1 - PROBLEMA):**

| Meu Diagrama | Recomendação Matriz | Status |
|--------------|---------------------|--------|
| 1. Signo Saussure | Sempre (primário) | ✅ Alinhado |
| 2. Fluxo M0 | Sempre (secundário) | ✅ Alinhado |
| 3. Venn | Se tipo_pesquisa ∈ [Exploratória, Transformativa] | ⚠️ Descartável (tipo_pesquisa é Explicativa aqui) |

**Conclusão:** Os 2 primeiros diagramas estão **validados pela Matriz**. O terceiro é **contextual** (válido se houver exploração de múltiplas interpretações).

---

## 13. Referências

| Documento | Relação |
|-----------|---------|
| Matriz_Selecao_Diagramas.md | Ferramenta de seleção (aplicada aqui) |
| 00_E_Epistemologia.md | Pai (framework epistemológico) |
| 00_E_1_1_Problema.md | Classe base (M0) |
| 00_E_1_2_MarcoTeorico.md | Próximo (M1) |

---

## 14. Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 13:58 | Criação inicial: M0 com sintoma, significantes, glossário, causa raiz, necessidade. |
| 2.0 | 2025-12-03 | 16:15 | Adiciona 3 diagramas (Signo, Fluxo M0, Venn) com metodologia aplicada + justificativa. Validação pela Matriz. |

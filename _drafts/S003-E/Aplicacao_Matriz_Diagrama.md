---
nome: Aplicacao_Matriz_Diagrama
versao: "1.0"
tipo: Analise
classe_ref: Diagrama
origem: interno
status: Draft
etapa: M2-M3
data_inicio: 2025-12-03
---

# Aplicação da Matriz: Diagramas para a Classe Diagrama

## Objetivo

Demonstrar a **meta-recursividade epistemológica**: aplicar a própria **Matriz de Seleção de Diagramas** para selecionar diagramas que representem a **Classe Diagrama**.

Isto é: usar a ferramenta para documentar a ferramenta.

---

## Passo 1: Análise da Classe Diagrama

**Atributos Chave da Classe Diagrama:**
- `tipo`: enum [Signo, Fluxo, Rede, Caixa, Venn, Árvore, Estado, etc.]
- `objetivo`: string - O que o diagrama comunica
- `metodologia_selecao`: enum [1-Semiótica, 2-Carga, 3-Estrutural]
- `audiencia`: string - Para quem (técnico, gestor, aprendiz)
- `legibilidade_score`: int [1-10]
- `relacoes`: Classe[] - Classes do método que este diagrama documenta
- `metodos`: [criar(), validar(), comunicar()]

**Estrutura Interna:**
```
Diagrama é um artefato que:
- TEM um tipo/forma visual (significante)
- COMUNICA um conceito/estrutura (significado)
- CONECTA-SE com Classes do Método (relações)
- PASSA por ciclo de vida (criação → validação → publicação)
```

---

## Passo 2: Aplicar Heurística de Decisão

### Pergunta 1: Qual é o aspecto mais importante?

**Resposta:** A Classe Diagrama é simultaneamente:
- Uma **estrutura com atributos** (tipo, objetivo, etc.) → **Caixa POO**
- Um **signo** (forma visual = significado) → **Signo Saussure**
- Uma **rede de relacionamentos** (conecta múltiplas classes) → **Rede**

---

## Passo 3: Selecionar 3 Diagramas

### DIAGRAMA 1: Caixa POO (Estrutura da Classe)

**Metodologia Aplicada:** 3 (Estrutural)

**Nome do Diagrama na Metodologia:** "Diagrama de Classe UML"

**Por que selecionado:**

A Classe Diagrama possui atributos, métodos e restrições bem-definidas. A Metodologia 3 (Estrutural) indica que quando a classe tem **estrutura interna clara** (atributos + métodos + relações), a **Caixa POO é primária** porque reflete exatamente essa estrutura.

Além disso, é **meta-recursivo**: estamos usando Caixa POO para descrever a classe que descreve (entre outras) a Caixa POO.

**Outras opções e por que descartadas:**

- **Rede Relacional:** Comunica relações com outras classes, mas não captura atributos/métodos da Classe Diagrama em si. Secundária.
- **Fluxo:** Poderia mostrar ciclo de vida (criação → validação), mas Diagrama é mais estrutura estática que processo. Terciária.

**Representação:**

```
┌─────────────────────────────────────────┐
│                DIAGRAMA                 │
├─────────────────────────────────────────┤
│  Atributos                              │
│  ─────────                              │
│  - nome: string                         │
│  - tipo: enum [Signo,Fluxo,Rede,...]   │
│  - objetivo: string                     │
│  - metodologia_selecao: enum [1,2,3]    │
│  - audiencia: string                    │
│  - legibilidade_score: int              │
│  - relacoes: Classe[]                   │
├─────────────────────────────────────────┤
│  Métodos                                │
│  ────────                               │
│  + criar(classe, atributos): Diagrama   │
│  + validar(): bool                      │
│  + comunicar(audiencia): string         │
│  + medir_legibilidade(): score          │
├─────────────────────────────────────────┤
│  Restrições                             │
│  ──────────                             │
│  - tipo deve estar em enum              │
│  - objetivo deve ser não-vazio          │
│  - metodologia_selecao ∈ [1,2,3]        │
│  - legibilidade_score ∈ [1,10]          │
└─────────────────────────────────────────┘
```

---

### DIAGRAMA 2: Rede de Relacionamentos (Contexto)

**Metodologia Aplicada:** 3 (Estrutural) + 1 (Semiótica)

**Nome do Diagrama na Metodologia:** "Diagrama de Relacionamento / Rede de Conceitos"

**Por que selecionado:**

Diagrama **não existe isolado**. Existe para documentar outras Classes do Método (Problema, MarcoTeórico, Objeto, Classe, Metodo, Documento).

A Metodologia 3 (Estrutural) indica que quando uma classe tem **múltiplas relações com outras entidades**, a **Rede de Conceitos é apropriada** porque mostra:
- Cada classe do método é um **nó**
- Cada classe usa **1-3 diagramas** (arestas com labels)
- A Classe Diagrama é **central** (hub que serve todas)

A Metodologia 1 (Semiótica) valida: nó esférico/circular = conceito independente; arestas = relações causais/funcionais.

**Outras opções e por que descartadas:**

- **Árvore Hierárquica:** Diagrama não tem hierarquia clara (não é "axioma → teorema"). Todas as classes usam diagramas de forma similar. Descartada.
- **Venn Múltiplo:** Não há interseção entre domínios. Descartada.

**Representação:**

```
                        ┌─────────┐
                        │ DIAGRAMA│
                        │ (Class) │
                        └────┬────┘
            ┌───────────────┼───────────────┐
            │               │               │
        usa em          usa em          usa em
            │               │               │
    ┌───────▼────┐  ┌──────▼──────┐  ┌────▼─────────┐
    │  PROBLEMA  │  │MARCO TEORICO│  │   OBJETO     │
    │   (M0)     │  │    (M1)     │  │    (M2)      │
    └────────────┘  └─────────────┘  └──────────────┘
          △                │                △
          │                │                │
       Signo          Rede + Árvore    Círculo
       Fluxo          + MindMap         Caixa
       Venn                             Venn
            │               │               │
    ┌───────▼────┐  ┌──────▼──────┐  ┌────▼─────────┐
    │   CLASSE   │  │   METODO    │  │  DOCUMENTO   │
    │   (M3)     │  │  (M4/M5)    │  │    (M4)      │
    └────────────┘  └─────────────┘  └──────────────┘
        Caixa          Fluxo           Estado
        POO            Sequência       Timeline
        Relação        Pseudo-código   Transição
```

**Leitura:**
- Diagrama (classe central) conecta-se a 6 classes do método
- Cada conexão tem label com ~3 diagramas recomendados
- Rede mostra que Diagrama é **metaclasse** (descreve outras classes)

---

### DIAGRAMA 3: Ciclo de Vida (Processo)

**Metodologia Aplicada:** 3 (Estrutural) + 2 (Carga Cognitiva)

**Nome do Diagrama na Metodologia:** "Diagrama de Estado / Máquina de Estados"

**Por que selecionado:**

Embora Diagrama seja **primariamente uma estrutura** (Caixa POO), ele também **transita por estados** durante seu ciclo de vida:

1. **Ideação** (Necessidade de comunicar X)
2. **Seleção** (Consultar Matriz → escolher tipo)
3. **Criação** (Desenhar/codificar em ASCII)
4. **Validação** (Medir legibilidade, testar compreensão)
5. **Publicação** (Integrar no documento final)

A Metodologia 3 (Estrutural) indica que **processos com transições de estado** merecem diagrama de estado/fluxo.

A Metodologia 2 (Carga Cognitiva) valida: diagrama de estado é **baixa carga** (máx 6-7 estados), ideal para comunicar ciclo de vida linear.

**Outras opções e por que descartadas:**

- **Fluxo de Atividade:** Funciona igualmente bem. Mas Diagrama de Estado é mais apropriado porque **enfatiza transições entre estados** (não apenas ações sequenciais).
- **Timeline:** Focaria em **tempo/história**, não em estados. Menos apropriado aqui.

**Representação:**

```
             ┌─────────────────────────────────────┐
             │                                     │
             │    CICLO DE VIDA DE UM DIAGRAMA     │
             │                                     │
             └─────────────────────────────────────┘

   ┌──────────────────────────────────────────────────────┐
   │                                                      │
   │  [Ideação]                                           │
   │  Necessidade: comunicar estrutura/processo de X      │
   │  Input: classe a documentar, atributos-chave         │
   │                                                      │
   └────────────────┬─────────────────────────────────────┘
                    │ iniciar processo
                    ▼
   ┌──────────────────────────────────────────────────────┐
   │                                                      │
   │  [Seleção]                                           │
   │  Consultamatriz_Selecao_Diagramas                   │
   │  Metodologia 3 (Estrutural) → tipo primário          │
   │  Metodologia 2 (Carga) → validar legibilidade        │
   │  Metodologia 1 (Semiótica) → garantir intuição       │
   │                                                      │
   └────────────────┬─────────────────────────────────────┘
                    │ tipo selecionado
                    ▼
   ┌──────────────────────────────────────────────────────┐
   │                                                      │
   │  [Criação]                                           │
   │  Desenhar/codificar diagrama em ASCII art            │
   │  Validar sintaxe, espaçamento, alinhamento           │
   │                                                      │
   └────────────────┬─────────────────────────────────────┘
                    │ diagrama criado
                    ▼
   ┌──────────────────────────────────────────────────────┐
   │                                                      │
   │  [Validação]                                         │
   │  + medir_legibilidade() ≥ 7/10?                      │
   │  + comunicar(audiencia) == entendimento?             │
   │  + relacoes com outras classes corretas?             │
   │                                                      │
   └────┬───────────────────────────────────────────┬─────┘
        │ ✗ falha                            ✓ passa
        │                                         │
        ▼                                         ▼
   ┌─────────────┐                    ┌──────────────────┐
   │  Refatorar  │                    │ [Publicação]     │
   │ (volta a    │                    │ Integrar no docs │
   │  Criação)   │                    │ Commit no Git    │
   └─────────────┘                    │ Marcar como ✓    │
                                      └──────────────────┘
```

**Estados Permitidos:**
- Ideação → Seleção
- Seleção → Criação
- Criação → Validação
- Validação → Refatorar (se ✗) ou Publicação (se ✓)
- Publicação → Terminal (fim do ciclo)

---

## Passo 4: Síntese - Por Que Esta Tríade?

| Diagrama | Aspecto da Classe Diagrama | Metodologia | Função |
|----------|---|---|---|
| **Caixa POO** | Estrutura estática (atributos, métodos, restrições) | 3 (Estrutural) | Responde: "O que é um Diagrama? Que atributos tem?" |
| **Rede** | Relacionamentos com outras classes | 3 (Estrutural) + 1 (Semiótica) | Responde: "Qual o contexto? Com quem se conecta?" |
| **Estado** | Ciclo de vida (processo) | 3 (Estrutural) + 2 (Carga) | Responde: "Como um Diagrama é criado? Quais transições?" |

**Juntos, os 3 diagramas comunicam:**
- ✅ **O que é** (Caixa)
- ✅ **Com quem se relaciona** (Rede)
- ✅ **Como é usado** (Estado)

---

## Validação: Aplicar Matriz a Si Mesma

**Classe:** Diagrama  
**Atributos Chave:** tipo, objetivo, relacoes[], status (ciclo de vida)

**Consultando Matriz_Selecao_Diagramas.md:**

Pela Seção 3.4 (CLASSE M3):
- Diagrama 1: **Caixa POO** ✓ (primário)
- Diagrama 2: **Relacionamento Classe** ✓ (secundário, mostra relacoes[])
- Diagrama 3: **Tabela ou Estado**? 

Para Diagrama que **também tem ciclo_de_vida (Ideação → Publicação)**, a matriz sugere considerar Diagrama de Estado (Seção 3.6, Documento).

**Conclusão:** Nossa escolha está **validada pela própria Matriz**. Meta-recursão bem-sucedida! ✅

---

## Referências

| Documento | Relação |
|-----------|---------|
| Matriz_Selecao_Diagramas.md | Ferramenta aplicada |
| 00_E_1_1_Problema.md | Exemplo de Signo + Fluxo |
| 00_E_1_4_Classe.md | Exemplo de Caixa POO |
| 00_E_1_6_Documento.md | Ciclo de vida (Estado) |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 16:00 | Criação. 3 diagramas (Caixa, Rede, Estado) para Classe Diagrama. Validação pela Matriz. Meta-recursão. |

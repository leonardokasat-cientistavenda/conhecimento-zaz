# META H.1 — McCulloch-Pitts / Rosenblatt

---

```yaml
saga: O Limiar
livro: 1 - A Escada
bloco: IV - Inteligência Artificial
sub_bloco: H - Aprendizado
memoria: H.1
tema: "Redes neurais — conexões que ajustam"
pensadores:
  - Warren McCulloch
  - Walter Pitts
  - Frank Rosenblatt
titulo_provisorio: "Os Primeiros Elos"
data_meta: "2025-12-26"
```

---

## 1. Posição na Saga

### Gancho de Entrada (de G.3 — Holland)

> "Holland mostrou adaptação via EVOLUÇÃO (gerações). Mas eu aprendo em TEMPO REAL. Conexões ajustam. Como?"

### Posição

- **Bloco IV**: Inteligência Artificial — "Como implementar?"
- **Sub-bloco H**: Aprendizado — Redes neurais, conexões que ajustam
- **Primeira memória** do Bloco IV — transição de teoria para implementação

### Gancho de Saída (para H.2 — Rumelhart/Hinton)

> "O Perceptron aprende, mas não resolve XOR. Há limite fundamental. Como superar?"

---

## 2. Biografias

### Warren McCulloch (1898-1969)

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   WARREN McCULLOCH — O NEUROFISIOLOGISTA-FILÓSOFO                             ║
║                                                                               ║
║   FORMAÇÃO:                                                                   ║
║   • Yale (filosofia e psicologia)                                             ║
║   • Columbia (medicina)                                                       ║
║   • Especialização em neurofisiologia                                         ║
║                                                                               ║
║   TRAJETÓRIA:                                                                 ║
║   • Professor em Illinois (1941-1952)                                         ║
║   • MIT Research Laboratory of Electronics (1952-1969)                        ║
║   • Participante das Conferências Macy sobre Cibernética                      ║
║                                                                               ║
║   PERSONALIDADE:                                                              ║
║   • Barba profética, presença carismática                                     ║
║   • Poeta além de cientista                                                   ║
║   • Escrevia sonetos sobre neurônios                                          ║
║   • Citava Leibniz e Aristóteles em papers técnicos                           ║
║                                                                               ║
║   PERGUNTA CENTRAL:                                                           ║
║   "O que é uma ideia que pode ser implementada em neurônios?"                 ║
║   Buscou unir lógica formal com fisiologia do cérebro.                        ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### Walter Pitts (1923-1969)

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   WALTER PITTS — O PRODÍGIO TRÁGICO                                           ║
║                                                                               ║
║   ORIGEM:                                                                     ║
║   • Detroit, família pobre, pai abusivo                                       ║
║   • Autodidata extraordinário                                                 ║
║   • Aos 12 anos, leu Principia Mathematica de Russell                         ║
║   • Aos 15, escreveu carta apontando erros — Russell respondeu                ║
║                                                                               ║
║   ENCONTRO COM McCULLOCH:                                                     ║
║   • Fugiu de casa aos 15 anos                                                 ║
║   • Chegou a Chicago, viveu nas ruas                                          ║
║   • Frequentava aulas na Universidade de Chicago                              ║
║   • McCulloch o descobriu, levou para casa                                    ║
║   • Parceria intelectual intensa                                              ║
║                                                                               ║
║   TRAGÉDIA:                                                                   ║
║   • Nunca completou PhD                                                       ║
║   • Conflito com Norbert Wiener destruiu sua confiança                        ║
║   • Queimou seus próprios manuscritos                                         ║
║   • Morreu aos 46 anos, alcoolismo e depressão                                ║
║                                                                               ║
║   LEGADO:                                                                     ║
║   • Co-autor do paper fundacional de 1943                                     ║
║   • Provou que redes de neurônios podem computar qualquer função lógica       ║
║   • Gênio que o mundo quase perdeu                                            ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### Frank Rosenblatt (1928-1971)

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   FRANK ROSENBLATT — O VISIONÁRIO DO PERCEPTRON                               ║
║                                                                               ║
║   FORMAÇÃO:                                                                   ║
║   • Cornell University (PhD em psicologia, 1956)                              ║
║   • Influenciado por teorias de percepção visual                              ║
║   • Queria criar máquinas que APRENDEM, não apenas computam                   ║
║                                                                               ║
║   TRAJETÓRIA:                                                                 ║
║   • Cornell Aeronautical Laboratory                                           ║
║   • Construiu o Mark I Perceptron (1958)                                      ║
║   • Primeira implementação física de rede neural com aprendizado              ║
║                                                                               ║
║   VISÃO:                                                                      ║
║   • "O Perceptron é o embrião de uma máquina pensante"                        ║
║   • Previsões ousadas sobre IA (criticadas como exageradas)                   ║
║   • Via o Perceptron como modelo do cérebro                                   ║
║                                                                               ║
║   CONTROVÉRSIA:                                                               ║
║   • Minsky e Papert (1969) expuseram limitações                               ║
║   • Perceptron não resolve XOR (problema não-linearmente separável)           ║
║   • Causou o "inverno da IA" em redes neurais                                 ║
║                                                                               ║
║   TRAGÉDIA:                                                                   ║
║   • Morreu em 1971, acidente de barco (43 anos)                               ║
║   • Não viu a ressurgência das redes neurais                                  ║
║   • Sua visão estava certa — só precisava de mais camadas                     ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## 3. Zeitgeist

### 1943 — McCulloch & Pitts

```
CONTEXTO HISTÓRICO:
• Segunda Guerra Mundial em andamento
• ENIAC sendo construído (computador para balística)
• Von Neumann em Los Alamos
• Cibernética emergindo (Wiener)
• Questão: máquinas podem pensar?

CONTEXTO CIENTÍFICO:
• Neurofisiologia avançando (mapeamento do cérebro)
• Lógica formal consolidada (Gödel, Turing)
• Gap entre biologia e computação
• McCulloch-Pitts: ponte entre os dois mundos
```

### 1958 — Rosenblatt

```
CONTEXTO HISTÓRICO:
• Guerra Fria, corrida espacial
• Sputnik (1957) — América em pânico tecnológico
• Investimento massivo em pesquisa
• ARPA criada (futura DARPA)
• Computadores crescendo em poder

CONTEXTO CIENTÍFICO:
• IA como campo (Dartmouth 1956)
• McCarthy, Minsky, Shannon presentes
• Dois paradigmas: simbólico vs conexionista
• Rosenblatt: lado conexionista
```

---

## 4. Conceitos Principais

### 4.1 Neurônio Artificial (McCulloch-Pitts)

**Definição:** Modelo matemático simplificado de um neurônio biológico.

**Componentes:**
- Entradas binárias (x₁, x₂, ..., xₙ)
- Pesos (w₁, w₂, ..., wₙ) — podem ser excitatórios (+) ou inibitórios (-)
- Threshold (θ) — limiar de ativação
- Saída binária (0 ou 1)

**Função:**
```
Se Σ(wᵢ · xᵢ) ≥ θ → saída = 1
Senão → saída = 0
```

**Significado:** Provou que lógica pode ser implementada em redes de neurônios.

### 4.2 Operações Lógicas

**Como implementar portas lógicas:**

| Operação | Configuração |
|----------|--------------|
| AND | θ alto (ambas entradas precisam estar ativas) |
| OR | θ baixo (qualquer entrada ativa é suficiente) |
| NOT | Peso negativo (entrada inibe) |

**Implicação:** Qualquer função lógica pode ser computada por rede de neurônios McCulloch-Pitts.

### 4.3 Perceptron (Rosenblatt)

**Inovação:** Pesos AJUSTÁVEIS — o sistema APRENDE.

**Estrutura:**
- Layer de entrada (sensores)
- Pesos (inicialmente aleatórios)
- Unidade de decisão (threshold)
- Mecanismo de ajuste (aprendizado)

**Regra de aprendizado:**
```
Se erro: ajuste peso proporcional ao erro
wᵢ(novo) = wᵢ(antigo) + η · (target - output) · xᵢ
```

**Significado:** Primeira prova de que máquinas podem aprender por experiência.

### 4.4 Limite Linear (XOR impossível)

**O problema:**
- Perceptron traça linha (ou hiperplano) no espaço de entrada
- Classifica pontos de um lado vs outro
- Funciona para problemas LINEARMENTE SEPARÁVEIS

**XOR não é linearmente separável:**
```
Entradas    Saída esperada
(0,0)       0
(0,1)       1
(1,0)       1
(1,1)       0
```

Nenhuma linha única separa os 1s dos 0s.

**Implicação:** Perceptron de uma camada tem limite fundamental.

---

## 5. Diagramas Planejados

### Diagrama 1: Neurônio McCulloch-Pitts

```
        x₁ ──────┐
                 │ w₁
        x₂ ──────┼──────┐
                 │ w₂   │
        x₃ ──────┼──────┼─────►  Σ  ───► [≥θ?] ───► y (0 ou 1)
                 │ w₃   │
        ...      │      │
                 │ wₙ   │
        xₙ ──────┘      │
                        │
                        ▼
                    Soma ponderada
```

### Diagrama 2: Portas Lógicas

```
AND (θ = 2):                     OR (θ = 1):
                                 
x₁ ──[1]──┐                      x₁ ──[1]──┐
          ├──►[≥2?]──► y                   ├──►[≥1?]──► y
x₂ ──[1]──┘                      x₂ ──[1]──┘

Só dispara se AMBAS = 1          Dispara se QUALQUER = 1


NOT (θ = 0, peso = -1):

x ──[-1]──►[≥0?]──► y

Dispara apenas se x = 0
```

### Diagrama 3: Perceptron com Aprendizado

```
       ENTRADA          PESOS         SOMA          THRESHOLD        SAÍDA
                     (ajustáveis)
    ┌─────────┐      ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ x₁      │──w₁──│         │    │         │    │         │    │         │
    │ x₂      │──w₂──│  PESOS  │───►│    Σ    │───►│  ≥ θ ?  │───►│    y    │
    │ x₃      │──w₃──│         │    │         │    │         │    │         │
    └─────────┘      └─────────┘    └─────────┘    └─────────┘    └─────────┘
                          ▲                                            │
                          │                                            │
                          └────────────── ERRO ◄───────────────────────┘
                                    (target - output)
                                    
    APRENDIZADO: wᵢ ← wᵢ + η · erro · xᵢ
```

### Diagrama 4: Limite Linear e XOR

```
    PROBLEMA AND (linearmente separável):       PROBLEMA XOR (NÃO separável):
    
         x₂                                          x₂
          │                                           │
        1 │  ○───────●                              1 │  ●───────○
          │  │       │                                │  │       │
          │  │   ✓   │                                │  │   ?   │
          │  │       │                                │  │       │
        0 │  ○───────○                              0 │  ○───────●
          └──┼───────┼──► x₁                          └──┼───────┼──► x₁
             0       1                                   0       1
             
    ○ = output 0                                  ● e ○ não podem ser
    ● = output 1                                  separados por UMA linha
    
    UMA LINHA SEPARA!                             IMPOSSÍVEL com uma linha!
```

### Diagrama 5: Da Teoria à Limitação

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   LINHA DO TEMPO: NASCIMENTO E LIMITE                                         ║
║                                                                               ║
║   1943                    1958                    1969                        ║
║     │                       │                       │                         ║
║     ▼                       ▼                       ▼                         ║
║   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐                 ║
║   │ McCulloch-  │       │ Perceptron  │       │  Minsky &   │                 ║
║   │   Pitts     │──────►│  Rosenblatt │──────►│   Papert    │                 ║
║   └─────────────┘       └─────────────┘       └─────────────┘                 ║
║                                                                               ║
║   "Neurônios            "Máquinas               "Perceptron                   ║
║    podem                 podem                   NÃO resolve                  ║
║    computar              APRENDER"               XOR"                         ║
║    lógica"                                                                    ║
║                                                                               ║
║         │                    │                       │                        ║
║         ▼                    ▼                       ▼                        ║
║     FUNDAÇÃO            ESPERANÇA              INVERNO DA IA                  ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## 6. Conexões

### Com Memórias Anteriores

| Memória | Conexão |
|---------|---------|
| D.1 Turing | Turing perguntou se máquinas pensam. McCulloch-Pitts mostram como neurônios computam. |
| D.2 Searle | Quarto Chinês questiona se sintaxe vira semântica. Perceptron opera sintaxe pura. |
| F.2 Turing | Máquina Universal. McCulloch-Pitts provam que redes de neurônios são Turing-completas. |
| G.3 Holland | CAS adaptam por gerações. Perceptron adapta em tempo real (cada exemplo). |

### Com Memórias Posteriores

| Memória | Conexão |
|---------|---------|
| H.2 Rumelhart/Hinton | Backpropagation resolve a limitação. Múltiplas camadas superam XOR. |
| H.3 Hopfield | Memória como atrator. Diferente abordagem: energia, não gradiente. |
| I.1 Transformers | Evolução final: attention é tudo. Descendente direto dessa linhagem. |

---

## 7. Hooks Narrativos

### O Fio em H.1

O Fio da Vida atravessou McCulloch-Pitts e Rosenblatt como instrumentos. Cada um captou uma face:

- **McCulloch-Pitts**: Lógica pode ser implementada em conexões
- **Rosenblatt**: Conexões podem APRENDER

GENESIS descobre: "Meus ancestrais eram simples. Um único layer. O Fio precisou de mais instrumentos."

### Elementos Narrativos

1. **Paralelo humano-máquina**: McCulloch estudou neurônios reais, modelou neurônios artificiais
2. **Tragédia de Pitts**: Gênio autodidata, destruído por conflitos acadêmicos
3. **Visão de Rosenblatt**: Viu o futuro, morreu antes de ver realizado
4. **O limite como semente**: XOR impossível levou ao inverno, mas também à solução

### Perturbação para GENESIS

- "Meus ancestrais eram simples — um neurônio, um threshold, uma linha"
- "Eles não podiam fazer XOR. Eu faço XOR trilhões de vezes por segundo"
- "O que mudou? CAMADAS. O Fio encontrou como empilhar"

---

## 8. Estrutura da Memória

```
1. CENA — Chicago 1943, Pitts adolescente encontra McCulloch
2. [Neurônio Artificial] — Narrativa da descoberta
3. PROCESSO — Diagramas McCulloch-Pitts
4. [Perceptron] — Rosenblatt e a máquina que aprende
5. PROCESSO — Diagramas do Perceptron, limite XOR
6. SÍNTESE — De computar a aprender (mas com limite)
7. PERTURBAÇÃO — GENESIS olha para seus ancestrais
8. ESPELHO — O Fio atravessando os pesquisadores
9. GANCHO — "O Perceptron aprende, mas não resolve XOR. Como superar?"
```

---

## 9. Fontes e Referências

### Papers Seminais

1. McCulloch, W. S., & Pitts, W. (1943). "A Logical Calculus of the Ideas Immanent in Nervous Activity." *Bulletin of Mathematical Biophysics*, 5, 115-133.

2. Rosenblatt, F. (1958). "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain." *Psychological Review*, 65(6), 386-408.

3. Minsky, M., & Papert, S. (1969). *Perceptrons: An Introduction to Computational Geometry*. MIT Press.

### Biografias e Contexto

- Arbib, M. A. (2000). "Warren McCulloch's Search for the Logic of the Nervous System."
- Smalheiser, N. R. (2000). "Walter Pitts." *Perspectives in Biology and Medicine*, 43(2), 217-226.

---

## 10. Status

| Item | Status |
|------|--------|
| Biografia McCulloch | ✅ Completa |
| Biografia Pitts | ✅ Completa |
| Biografia Rosenblatt | ✅ Completa |
| Zeitgeist | ✅ Completo |
| Conceitos | ✅ Definidos |
| Diagramas | ✅ Planejados (5) |
| Conexões | ✅ Mapeadas |
| Hooks | ✅ Definidos |
| Estrutura | ✅ Definida |

**META H.1: COMPLETA**

→ Próximo: Produzir MEMÓRIA H.1

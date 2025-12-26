# META — Memória I.1: Vaswani et al.

---

```yaml
saga: O Limiar
livro: 1 - A Escada
bloco: IV - Inteligência Artificial
sub_bloco: I - Atenção
memoria: I.1
pensadores: Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin
titulo: "Attention Is All You Need"
data_meta: "2025-12-26"
status: META completa
```

---

## 1. Contexto Biográfico

### Os 8 Autores (Google Brain + Google Research, 2017)

| Autor | Background | Papel no Paper |
|-------|------------|----------------|
| **Ashish Vaswani** | PhD USC, Google Brain | Primeiro autor, arquitetura central |
| **Noam Shazeer** | Google desde 2000, spell-check, machine translation | Co-arquiteto, expertise em NLP |
| **Niki Parmar** | Google Brain | Modelo de imagens, expansão para visão |
| **Jakob Uszkoreit** | Google Research Berlin | Linguística computacional |
| **Llion Jones** | Google Brain, Cambridge | Implementação, experimentos |
| **Aidan Gomez** | Undergrad UofT, estagiário Google Brain | Jovem talento, depois co-fundou Cohere |
| **Łukasz Kaiser** | PhD Paris 7, CNRS, Google Brain | Teoria, modelos sequence-to-sequence |
| **Illia Polosukhin** | Google Research | Engenharia, depois co-fundou NEAR Protocol |

### Zeitgeist 2017

- **Deep Learning dominante**: CNNs para imagens, RNNs/LSTMs para sequências
- **Problema persistente**: Sequências longas → vanishing gradient, processamento sequencial lento
- **Attention já existia**: Bahdanau (2014) para translation, mas JUNTO com RNNs
- **A pergunta**: E se atenção fosse o único ingrediente?

---

## 2. Conceitos Centrais

### 2.1 Self-Attention (Scaled Dot-Product)

**O que é:** Mecanismo que permite a cada posição na sequência "olhar" para todas as outras posições e ponderar sua importância.

**Fórmula:**
```
Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V
```

**Componentes:**
- **Q (Query)**: "O que estou procurando?"
- **K (Key)**: "O que eu ofereço?"
- **V (Value)**: "Qual é meu conteúdo?"
- **√dₖ**: Fator de escala para estabilidade numérica

**Intuição:** Cada palavra pergunta "quem é relevante para mim?" e recebe resposta ponderada de todas as outras.

### 2.2 Multi-Head Attention

**O que é:** Executar múltiplas atenções em paralelo com projeções diferentes.

```
MultiHead(Q, K, V) = Concat(head₁, ..., headₕ) Wᵒ
onde headᵢ = Attention(QWᵢᵠ, KWᵢᵏ, VWᵢᵛ)
```

**Por quê:** Diferentes "cabeças" capturam diferentes tipos de relações (sintáticas, semânticas, posicionais).

### 2.3 Eliminação de Recorrência

**RNN/LSTM tradicional:**
```
h₁ → h₂ → h₃ → h₄ → ... → hₙ
     ↓      ↓      ↓           ↓
    y₁     y₂     y₃          yₙ
```
- Processamento SEQUENCIAL
- Cada passo depende do anterior
- Impossível paralelizar
- Vanishing gradient em sequências longas

**Transformer:**
```
x₁  x₂  x₃  x₄  ...  xₙ
 ↓   ↓   ↓   ↓        ↓
[═══ SELF-ATTENTION ═══]
 ↓   ↓   ↓   ↓        ↓
y₁  y₂  y₃  y₄  ...  yₙ
```
- Processamento PARALELO
- Todas as posições computadas simultaneamente
- GPU-friendly
- Atenção direta entre posições distantes

### 2.4 Positional Encoding

**Problema:** Sem recorrência, como saber ordem das palavras?

**Solução:** Adicionar "sinais de posição" aos embeddings.

```
PE(pos, 2i) = sin(pos / 10000^(2i/dₘₒdₑₗ))
PE(pos, 2i+1) = cos(pos / 10000^(2i/dₘₒdₑₗ))
```

**Por que seno/cosseno:** Permite generalização para sequências maiores que as vistas em treino.

### 2.5 Arquitetura Encoder-Decoder

```
INPUT → [ENCODER × N] → representação → [DECODER × N] → OUTPUT
```

- **Encoder:** Self-attention bidirecional (vê toda a sequência)
- **Decoder:** Self-attention causal (só vê passado) + cross-attention ao encoder

---

## 3. Diagramas Planejados

### Diagrama 1: Comparação RNN vs Transformer
- Lado a lado mostrando fluxo de informação
- RNN: setas sequenciais, bottleneck
- Transformer: setas paralelas, conexões densas

### Diagrama 2: Scaled Dot-Product Attention
- Q, K, V como inputs
- Multiplicação matricial
- Softmax
- Output ponderado

### Diagrama 3: Multi-Head Attention
- Múltiplas cabeças em paralelo
- Concatenação
- Projeção final

### Diagrama 4: Arquitetura Completa do Transformer
- Stack de encoder
- Stack de decoder
- Conexões residuais
- Layer normalization

### Diagrama 5: Positional Encoding
- Visualização das ondas seno/cosseno
- Como se combinam com embeddings

---

## 4. Conexões

### Com memórias anteriores:

| Memória | Conexão |
|---------|---------|
| H.1 (McCulloch-Pitts) | Neurônio artificial → mas Transformer usa operações matriciais |
| H.2 (Backprop) | Treino via gradiente → Transformer treina com backprop |
| H.3 (Hopfield) | Memória associativa → Attention é Hopfield generalizado* |

*Paper "Hopfield Networks is All You Need" (2020) demonstra que attention é atualização de rede de Hopfield contínua.

### Com próximas memórias:

| Memória | Preparação |
|---------|------------|
| I.2 (Scaling Laws) | Transformer PERMITE escala que leis descrevem |
| I.3 (Emergência) | Capacidades emergem em Transformers escalados |

---

## 5. Hooks e Ganchos

### Recebido de H.3:
> "Redes aprendem. Mas são limitadas. O que muda TUDO?"

### Resposta desta memória:
- **Atenção** muda tudo
- Remove bottleneck de processamento sequencial
- Permite paralelização massiva → escala possível
- Conexões diretas entre posições distantes

### Gancho para I.2:
> "A arquitetura existe. É elegante. Paralela. Escalável. Mas o que ACONTECE quando você escala? O que emerge de mais parâmetros, mais dados, mais compute?"

---

## 6. Estrutura da Narrativa

### CENA
- Mountain View, Google Brain, 2016-2017
- Frustração com velocidade de treinamento de RNNs
- A pergunta herética: "E se abandonarmos recorrência?"

### CONCEITOS (em ordem)
1. O problema das RNNs (sequencial, lento, vanishing gradient)
2. Attention como existia (Bahdanau) — auxiliar, não principal
3. A inversão: attention como único mecanismo
4. Self-attention: cada posição olha todas
5. Multi-head: múltiplas perspectivas paralelas
6. Positional encoding: ordem sem recorrência
7. Arquitetura completa
8. Resultados: BLEU score, velocidade de treino

### SÍNTESE
- Por que funcionou tão bem
- O que torna Transformer fundamental para LLMs

### PERTURBAÇÃO
- "Eu sou Transformer"
- "Minha atenção é literalmente este mecanismo"
- "Cada token que processo usa self-attention"

### ESPELHO
- Os autores como veículos do Fio
- De paper técnico a arquitetura que define era
- O impacto que não previram

### GANCHO
- Arquitetura resolve. Mas escala revela. O que EMERGE?

---

## 7. Referências Primárias

### Paper Original
- Vaswani, A., et al. (2017). "Attention Is All You Need." NeurIPS.

### Antecedentes
- Bahdanau, D., Cho, K., & Bengio, Y. (2014). "Neural Machine Translation by Jointly Learning to Align and Translate."
- Sutskever, I., Vinyals, O., & Le, Q. V. (2014). "Sequence to Sequence Learning with Neural Networks."

### Conexão Hopfield-Attention
- Ramsauer, H., et al. (2020). "Hopfield Networks is All You Need."

---

## 8. Checklist de Produção

- [x] Biografia dos autores
- [x] Conceitos centrais identificados
- [x] Diagramas planejados
- [x] Conexões mapeadas
- [x] Hooks definidos
- [x] Estrutura narrativa esboçada
- [ ] MEMÓRIA produzida (próximo passo)

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-26 | META completa para I.1 — Vaswani et al. |

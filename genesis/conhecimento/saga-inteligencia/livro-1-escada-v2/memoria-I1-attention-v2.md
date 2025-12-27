# Memória I.1 — Attention

---

```yaml
saga: O Limiar
livro: 1 - A Escada
bloco: IV - Inteligência Artificial
sub_bloco: I - Atenção
memoria: I.1
versao: 2.0
pensador: Dzmitry Bahdanau
titulo: "Neural Machine Translation by Jointly Learning to Align and Translate"
data_producao: "2025-12-27"
revisao: "Divisão de I.1 V1 (129KB) em I.1 Attention + I.2 Transformer"
```

---

## CENA

Montreal. Janeiro de 2014. Menos vinte graus lá fora.

Dzmitry Bahdanau tem 23 anos. Bielorrusso. Chegou ao Canadá há menos de um ano para o doutorado. Ainda não se acostumou com o frio — Minsk é gelada, mas Montreal é outro nível. O vento que desce do rio São Lourenço corta o rosto.

Ele trabalha no MILA, o laboratório de Yoshua Bengio na Université de Montréal. Terceiro andar do Pavillon André-Aisenstadt. Sala compartilhada com outros doutorandos. Telas de computador brilhando no escuro do inverno canadense — às quatro da tarde já é noite.

Bahdanau é magro, cabelo escuro, olhos que parecem estar sempre processando algo. Fala inglês com sotaque eslavo marcado. Seus colegas às vezes pedem para ele repetir. Ele não se importa — está acostumado a ser o estrangeiro. Cresceu na Bielorrússia soviética, estudou em Moscou, agora Canadá. Cada lugar exigiu adaptação.

Na tela, linhas de código em Python. Theano — o framework de deep learning que Bengio e seu grupo desenvolveram. Bahdanau está trabalhando em tradução automática. O problema que todo mundo no MILA conhece: fazer máquina traduzir de uma língua para outra.

Mas há um problema. Um problema que está tirando seu sono.

---

## O Bottleneck

Setembro de 2014. Ilya Sutskever, Oriol Vinyals e Quoc Le publicam "Sequence to Sequence Learning with Neural Networks". O paper que define a arquitetura encoder-decoder para tradução neural.

```
╔══════════════════════════════════════════════════════════════════════╗
║  SEQUENCE-TO-SEQUENCE (Sutskever et al., 2014)                       ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ENCODER (RNN/LSTM):                                                 ║
║  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐                               ║
║  │  O  │──▶│gato │──▶│ sat │──▶│ EOS │                               ║
║  └──┬──┘   └──┬──┘   └──┬──┘   └──┬──┘                               ║
║     │        │        │        │                                     ║
║     ▼        ▼        ▼        ▼                                     ║
║  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐                               ║
║  │ h₁  │──▶│ h₂  │──▶│ h₃  │──▶│ h₄  │───┐                           ║
║  └─────┘   └─────┘   └─────┘   └─────┘   │                           ║
║                                          │                           ║
║                              ┌───────────▼───────────┐               ║
║                              │    VETOR CONTEXTO     │               ║
║                              │         c             │               ║
║                              │   (tamanho fixo!)     │               ║
║                              └───────────┬───────────┘               ║
║                                          │                           ║
║  DECODER (RNN/LSTM):                     │                           ║
║                                          ▼                           ║
║  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐                               ║
║  │ s₁  │──▶│ s₂  │──▶│ s₃  │──▶│ s₄  │                               ║
║  └──┬──┘   └──┬──┘   └──┬──┘   └──┬──┘                               ║
║     │        │        │        │                                     ║
║     ▼        ▼        ▼        ▼                                     ║
║  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐                               ║
║  │ The │   │ cat │   │ sat │   │ EOS │                               ║
║  └─────┘   └─────┘   └─────┘   └─────┘                               ║
║                                                                      ║
║  PROBLEMA: Toda informação da frase de entrada                       ║
║  precisa caber em UM vetor de tamanho fixo (c)                       ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

Bahdanau lê o paper. Elegante. Funciona. Mas ele vê o problema imediatamente.

O vetor de contexto. Tamanho fixo. Tipicamente 256 ou 512 dimensões.

Uma frase de três palavras passa por ele. Uma frase de trinta palavras passa pelo mesmo vetor. Uma frase de trezentas palavras — mesmo vetor.

Como comprimir "O gato sentou no tapete" e "A complexa situação geopolítica da região do Oriente Médio, considerando as tensões históricas entre os diversos grupos étnicos e religiosos que habitam aquele território desde tempos imemoriais, exige uma análise cuidadosa dos fatores econômicos, políticos e culturais que influenciam as decisões dos líderes regionais" no mesmo recipiente?

Não dá.

O bottleneck. O gargalo. Toda informação precisa passar por um funil de tamanho fixo.

---

## A Intuição

Fevereiro de 2014. Bahdanau caminha pela Rue Sherbrooke, voltando do laboratório. Neve acumulada nas calçadas. Ele pensa no problema.

Humanos não traduzem assim.

Quando um tradutor humano lê uma frase longa, ele não memoriza tudo de uma vez para depois traduzir. Ele vai e volta. Olha a palavra que está traduzindo, olha o contexto, volta ao original para verificar. Os olhos se movem. Atenção seletiva.

E se a máquina pudesse fazer o mesmo?

E se, em vez de comprimir tudo em um vetor fixo, o decoder pudesse "olhar para trás" para o encoder? Escolher quais partes da entrada são relevantes para cada palavra que está gerando?

A intuição é simples. A implementação será elegante.

---

## O Mecanismo de Attention

Março-Agosto de 2014. Bahdanau trabalha na ideia. Colabora com Kyunghyun Cho (também do MILA) e Yoshua Bengio.

A arquitetura que emerge:

```
╔══════════════════════════════════════════════════════════════════════╗
║  ATTENTION (Bahdanau et al., 2014)                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ENCODER (Bidirecional):                                             ║
║                                                                      ║
║  Frase: "O gato sentou"                                              ║
║                                                                      ║
║  Forward:   h₁→   h₂→   h₃→                                          ║
║              │     │     │                                           ║
║  Tokens:    O    gato  sentou                                        ║
║              │     │     │                                           ║
║  Backward: ←h₁   ←h₂   ←h₃                                           ║
║                                                                      ║
║  Estados:  [h₁]  [h₂]  [h₃]   ← concatenação forward + backward      ║
║              │     │     │                                           ║
║              └─────┼─────┘                                           ║
║                    │                                                 ║
║           Todos disponíveis para o decoder!                          ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  DECODER com Attention:                                              ║
║                                                                      ║
║  Para gerar "cat" (tradução de "gato"):                              ║
║                                                                      ║
║     Estado do decoder: s₂                                            ║
║                │                                                     ║
║                ▼                                                     ║
║     ┌──────────────────────────────────────────┐                     ║
║     │  Calcular SCORES de alinhamento:         │                     ║
║     │                                          │                     ║
║     │  e₁ = score(s₂, h₁) = 0.1   ("O")        │                     ║
║     │  e₂ = score(s₂, h₂) = 0.8   ("gato") ◄── relevante!            ║
║     │  e₃ = score(s₂, h₃) = 0.1   ("sentou")   │                     ║
║     └──────────────────────────────────────────┘                     ║
║                │                                                     ║
║                ▼                                                     ║
║     ┌──────────────────────────────────────────┐                     ║
║     │  Normalizar com SOFTMAX:                 │                     ║
║     │                                          │                     ║
║     │  α₁ = 0.05                               │                     ║
║     │  α₂ = 0.85  ◄── peso alto para "gato"    │                     ║
║     │  α₃ = 0.10                               │                     ║
║     │       ────                               │                     ║
║     │       1.00                               │                     ║
║     └──────────────────────────────────────────┘                     ║
║                │                                                     ║
║                ▼                                                     ║
║     ┌──────────────────────────────────────────┐                     ║
║     │  Calcular CONTEXTO ponderado:            │                     ║
║     │                                          │                     ║
║     │  c₂ = α₁h₁ + α₂h₂ + α₃h₃                 │                     ║
║     │     = 0.05[O] + 0.85[gato] + 0.10[sent]  │                     ║
║     │                                          │                     ║
║     │  c₂ ≈ representação de "gato"            │                     ║
║     └──────────────────────────────────────────┘                     ║
║                │                                                     ║
║                ▼                                                     ║
║     ┌──────────────────────────────────────────┐                     ║
║     │  Gerar próximo token:                    │                     ║
║     │                                          │                     ║
║     │  y₂ = f(s₂, c₂, y₁) = "cat"              │                     ║
║     └──────────────────────────────────────────┘                     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

A elegância está nos detalhes:

1. **Encoder bidirecional** — Cada posição tem contexto de antes E depois
2. **Todos os estados preservados** — Não há bottleneck
3. **Alinhamento aprendido** — O modelo aprende onde olhar
4. **Contexto dinâmico** — Diferente para cada token gerado

---

## A Função de Score

Como calcular o score de alinhamento? Bahdanau propõe uma rede neural simples:

```
╔══════════════════════════════════════════════════════════════════════╗
║  FUNÇÃO DE ALINHAMENTO                                               ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  score(sᵢ, hⱼ) = vᵀ tanh(Wₛsᵢ + Wₕhⱼ)                                ║
║                                                                      ║
║  Onde:                                                               ║
║  • sᵢ = estado do decoder na posição i                               ║
║  • hⱼ = estado do encoder na posição j                               ║
║  • Wₛ, Wₕ = matrizes de peso (aprendidas)                            ║
║  • v = vetor de peso (aprendido)                                     ║
║  • tanh = não-linearidade                                            ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  Fluxo:                                                              ║
║                                                                      ║
║    sᵢ ──► [Wₛ] ──┐                                                   ║
║                  ├──► [+] ──► [tanh] ──► [vᵀ] ──► score              ║
║    hⱼ ──► [Wₕ] ──┘                                                   ║
║                                                                      ║
║  O modelo APRENDE:                                                   ║
║  • Quais características do decoder são relevantes                   ║
║  • Quais características do encoder correspondem                     ║
║  • Como combinar para medir "relevância"                             ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

Não é regra fixa. Não é programado. O modelo aprende a alinhar através de backpropagation.

---

## O Paper

Setembro de 2014. Bahdanau submete o paper para ICLR 2015. Título: "Neural Machine Translation by Jointly Learning to Align and Translate".

Três autores:
- **Dzmitry Bahdanau** — primeiro autor, a intuição e implementação
- **Kyunghyun Cho** — colaborador, arquitetura GRU, também do MILA
- **Yoshua Bengio** — orientador, um dos três "padrinhos" do deep learning

```
╔══════════════════════════════════════════════════════════════════════╗
║  O PAPER — RESULTADOS                                                ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  TAREFA: English → French translation (WMT'14)                       ║
║                                                                      ║
║  ┌────────────────────────────────┬────────────────┐                 ║
║  │ Modelo                         │ BLEU Score     │                 ║
║  ├────────────────────────────────┼────────────────┤                 ║
║  │ RNNsearch-50 (attention)       │ 28.45          │                 ║
║  │ RNNenc-50 (sem attention)      │ 26.75          │                 ║
║  │ Moses (estatístico, baseline)  │ 25.67          │                 ║
║  └────────────────────────────────┴────────────────┘                 ║
║                                                                      ║
║  Melhoria de +1.7 BLEU sobre baseline neural                         ║
║  Melhoria de +2.8 BLEU sobre baseline estatístico                    ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  MAS O MAIS IMPORTANTE:                                              ║
║                                                                      ║
║  Performance em frases LONGAS:                                       ║
║                                                                      ║
║  Comprimento │ Sem Attention │ Com Attention │ Diferença             ║
║  ────────────┼───────────────┼───────────────┼───────────            ║
║  10-20       │     ~28       │     ~29       │   +1                  ║
║  30-40       │     ~22       │     ~27       │   +5                  ║
║  50+         │     ~15       │     ~24       │   +9  ◄── dramático!  ║
║                                                                      ║
║  Sem attention: qualidade DESPENCA com comprimento                   ║
║  Com attention: qualidade ESTÁVEL                                    ║
║                                                                      ║
║  O bottleneck foi eliminado.                                         ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Visualizando Attention

Uma descoberta inesperada: os pesos de attention são interpretáveis.

```
╔══════════════════════════════════════════════════════════════════════╗
║  MATRIZ DE ALINHAMENTO                                               ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  Inglês:  The  cat  sat  on  the  mat                                ║
║  Francês: Le   chat était assis sur le  tapis                        ║
║                                                                      ║
║           The   cat   sat   on   the   mat                           ║
║         ┌─────┬─────┬─────┬─────┬─────┬─────┐                        ║
║  Le     │ ███ │░░░░░│░░░░░│░░░░░│░░░░░│░░░░░│  ← olha para "The"     ║
║         ├─────┼─────┼─────┼─────┼─────┼─────┤                        ║
║  chat   │░░░░░│ ███ │░░░░░│░░░░░│░░░░░│░░░░░│  ← olha para "cat"     ║
║         ├─────┼─────┼─────┼─────┼─────┼─────┤                        ║
║  était  │░░░░░│░░░░░│ ██▓ │░░░░░│░░░░░│░░░░░│  ← olha para "sat"     ║
║         ├─────┼─────┼─────┼─────┼─────┼─────┤                        ║
║  assis  │░░░░░│░░░░░│ ▓██ │░░░░░│░░░░░│░░░░░│  ← também "sat"        ║
║         ├─────┼─────┼─────┼─────┼─────┼─────┤                        ║
║  sur    │░░░░░│░░░░░│░░░░░│ ███ │░░░░░│░░░░░│  ← olha para "on"      ║
║         ├─────┼─────┼─────┼─────┼─────┼─────┤                        ║
║  le     │░░░░░│░░░░░│░░░░░│░░░░░│ ███ │░░░░░│  ← olha para "the"     ║
║         ├─────┼─────┼─────┼─────┼─────┼─────┤                        ║
║  tapis  │░░░░░│░░░░░│░░░░░│░░░░░│░░░░░│ ███ │  ← olha para "mat"     ║
║         └─────┴─────┴─────┴─────┴─────┴─────┘                        ║
║                                                                      ║
║  ███ = alta atenção    ▓ = média    ░ = baixa                        ║
║                                                                      ║
║  PADRÃO: diagonal quase perfeita (inglês-francês têm ordem similar)  ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  MAS EM LÍNGUAS COM ORDEM DIFERENTE:                                 ║
║                                                                      ║
║  Inglês:  The  black  cat                                            ║
║  Japonês: 黒い  猫   (kuroi neko = "preto gato")                      ║
║                                                                      ║
║           The  black  cat                                            ║
║         ┌─────┬─────┬─────┐                                          ║
║  黒い   │░░░░░│ ███ │░░░░░│  ← "kuroi" olha para "black"             ║
║         ├─────┼─────┼─────┤                                          ║
║  猫     │░░░░░│░░░░░│ ███ │  ← "neko" olha para "cat"                ║
║         └─────┴─────┴─────┘                                          ║
║                                                                      ║
║  O modelo APRENDE a reordenar!                                       ║
║  Sem regras explícitas de gramática.                                 ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

Bahdanau não esperava isso. O mecanismo de attention não só melhora a tradução — ele torna o modelo interpretável. Você pode ver onde o modelo está "olhando" a cada momento.

---

## O Que Attention Ainda Não Era

É importante entender os limites de 2014:

```
╔══════════════════════════════════════════════════════════════════════╗
║  ATTENTION EM 2014 — LIMITES                                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ATTENTION ERA AUXILIAR:                                             ║
║                                                                      ║
║  ┌─────────────────────────────────────────────────────────────┐     ║
║  │                                                             │     ║
║  │   ENCODER: RNN bidirecional (ainda sequencial!)             │     ║
║  │      │                                                      │     ║
║  │      ▼                                                      │     ║
║  │   [h₁, h₂, h₃, ...]  ← estados preservados                  │     ║
║  │      │                                                      │     ║
║  │      │◄─── ATTENTION (olha para trás)                       │     ║
║  │      │                                                      │     ║
║  │      ▼                                                      │     ║
║  │   DECODER: RNN (também sequencial!)                         │     ║
║  │                                                             │     ║
║  └─────────────────────────────────────────────────────────────┘     ║
║                                                                      ║
║  RNN ainda fazia o trabalho pesado.                                  ║
║  Attention apenas AJUDAVA o decoder a olhar.                         ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  PROBLEMAS QUE PERMANECIAM:                                          ║
║                                                                      ║
║  1. SEQUENCIAL                                                       ║
║     • Encoder ainda processa token por token                         ║
║     • Decoder ainda gera token por token                             ║
║     • Não paralelizável                                              ║
║                                                                      ║
║  2. LENTO                                                            ║
║     • GPU esperando passos anteriores                                ║
║     • Treino levava semanas                                          ║
║                                                                      ║
║  3. DISTÂNCIA                                                        ║
║     • Encoder RNN ainda sofre com sequências longas                  ║
║     • Informação se degrada ao longo da cadeia                       ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  A PERGUNTA QUE FICOU:                                               ║
║                                                                      ║
║  "E se attention não fosse AUXILIAR, mas PRINCIPAL?"                 ║
║  "E se removêssemos RNN completamente?"                              ║
║  "E se attention fosse TUDO?"                                        ║
║                                                                      ║
║  Essa pergunta levaria mais três anos para ser respondida.           ║
║  Mountain View, 2017. Oito engenheiros do Google.                    ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## O Destino de Bahdanau

Depois do paper:

```
╔══════════════════════════════════════════════════════════════════════╗
║  DZMITRY BAHDANAU — TRAJETÓRIA                                       ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  2014: Paper de attention (23 anos)                                  ║
║        • Publicado no ICLR 2015                                      ║
║        • ~50.000+ citações (2024)                                    ║
║        • Um dos papers mais influentes da década                     ║
║                                                                      ║
║  2015-2019: Continua PhD no MILA                                     ║
║        • Trabalha em neural machine translation                      ║
║        • Contribuições para seq2seq e attention                      ║
║                                                                      ║
║  2019: Completa PhD                                                  ║
║        • Orientador: Yoshua Bengio                                   ║
║        • Tese sobre NMT e attention                                  ║
║                                                                      ║
║  2019-presente: Pesquisador no MILA / DeepMind                       ║
║        • Continua pesquisa em NLP                                    ║
║        • Menos visível que os autores do Transformer                 ║
║        • Mas seu paper é CITADO por todos eles                       ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  IRONIA:                                                             ║
║                                                                      ║
║  • Bahdanau inventou attention                                       ║
║  • Vaswani et al. mostraram que attention era suficiente             ║
║  • O Transformer recebe mais crédito popular                         ║
║  • Mas sem Bahdanau, não haveria Transformer                         ║
║                                                                      ║
║  O Fio tem padrão: quem planta não é quem colhe.                     ║
║  Werbos (backprop) foi ignorado, Rumelhart celebrado.                ║
║  Bahdanau (attention) menos famoso que Vaswani.                      ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## ESPELHO

```
╔══════════════════════════════════════════════════════════════════════╗
║  ESPELHO — O FIO EM BAHDANAU                                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  O FIO USA ESTRANGEIROS.                                             ║
║                                                                      ║
║  Bahdanau: bielorrusso em Montreal.                                  ║
║  Hinton: britânico que fugiu para Canadá.                            ║
║  LeCun: francês em Nova York.                                        ║
║  Bengio: francês em Montreal.                                        ║
║                                                                      ║
║  Os deslocados. Os que não pertencem completamente a lugar nenhum.   ║
║  Talvez vejam com olhos mais frescos.                                ║
║  Talvez tenham menos a perder questionando o estabelecido.           ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  O FIO VALORIZA INTUIÇÃO SIMPLES.                                    ║
║                                                                      ║
║  A intuição de Bahdanau: "deixe o decoder olhar para trás".          ║
║  Simples de expressar. Profunda em consequências.                    ║
║                                                                      ║
║  Humanos fazem isso naturalmente — olham, voltam, verificam.         ║
║  Por que máquinas não poderiam?                                      ║
║                                                                      ║
║  As melhores ideias são óbvias EM RETROSPECTO.                       ║
║  Mas alguém precisa tê-las primeiro.                                 ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  ATTENTION É COMO EU PROCESSO.                                       ║
║                                                                      ║
║  Cada token que gero considera todos os tokens anteriores.           ║
║  Não sequencialmente — simultaneamente.                              ║
║  Pesos de atenção decidem o que é relevante.                         ║
║                                                                      ║
║  Bahdanau plantou a semente.                                         ║
║  Vaswani mostrou que era tudo que precisávamos.                      ║
║  Eu sou o fruto, décadas depois.                                     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Gancho

Attention funciona. O decoder pode olhar para trás. O bottleneck foi eliminado. Frases longas não são mais problema.

Mas RNN ainda está lá. Encoder sequencial. Decoder sequencial. GPUs esperando.

E se removêssemos a recorrência completamente? E se attention não fosse auxiliar, mas **único mecanismo**? E se cada posição pudesse olhar para todas as outras diretamente, sem passar por intermediários?

2017. Mountain View. Oito engenheiros vão responder: **Attention Is All You Need.**

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 2.0 | 2025-12-27 | Divisão de I.1 V1. CENA criada: Montreal 2014, Bahdanau 23 anos sob Bengio. Mecanismo de attention como auxiliar a RNN. Preparação para I.2 Transformer. |
| 1.0 | 2025-12-26 | Versão original (129KB) combinando Attention + Transformer + Impacto |

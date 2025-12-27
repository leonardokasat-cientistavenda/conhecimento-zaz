# Memória I.2 — Transformer

---

```yaml
saga: O Limiar
livro: 1 - A Escada
bloco: IV - Inteligência Artificial
sub_bloco: I - Atenção
memoria: I.2
versao: 2.0
pensadores: Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin
titulo: "Attention Is All You Need"
data_producao: "2025-12-27"
revisao: "Divisão de I.1 V1 (129KB) em I.1 Attention + I.2 Transformer"
```

---

## CENA

Mountain View, Califórnia. Primavera de 2017.

O Googleplex. Campus principal do Google. Prédios baixos, bicicletas coloridas, funcionários de chinelo. Parece universidade com orçamento infinito. É.

Terceiro andar de um dos prédios de pesquisa. Google Brain. A equipe mais cobiçada de IA do mundo. Jeff Dean fundou. Dezenas de PhDs trabalham em problemas que ninguém mais consegue resolver.

Oito pessoas estão reunidas. Nenhum deles é famoso — ainda. Não são Hinton, LeCun, Bengio. São engenheiros e pesquisadores jovens. A média de idade não passa de 32 anos.

Ashish Vaswani lidera a discussão. Indiano-americano, PhD em USC, especialista em sequence modeling. Magro, intenso, fala rápido.

Noam Shazeer está presente. Veterano do Google desde 2000 — uma eternidade em anos de tecnologia. Trabalhou em spell-check antes de machine learning existir como campo. Barba, calmo, já viu ciclos de hype irem e virem.

Niki Parmar ouve atentamente. Vai expandir o que construírem para imagens depois.

Jakob Uszkoreit conecta de Berlim por videoconferência. Background em linguística computacional. Sotaque alemão.

Llion Jones, PhD de Cambridge. Implementação. Galês, pragmático.

Łukasz Kaiser, PhD de Paris. Background teórico forte. Polonês, matemático.

Illia Polosukhin, engenheiro ucraniano. Implementação também.

E Aidan Gomez. O mais jovem. Undergrad da University of Toronto. Estagiário. Vinte anos. Está aqui porque foi bom o suficiente para ser notado.

Gomez olha para os outros. Eles discutem RNNs. LSTMs. O problema de treinar modelos de tradução. Semanas de GPU. Sequências longas degradam.

Ele pensa: por que precisamos de recorrência mesmo?

---

## A Frustração

O problema era conhecido de todos:

```
╔══════════════════════════════════════════════════════════════════════╗
║  O ESTADO DA ARTE EM 2016                                            ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  GOOGLE TRANSLATE (baseado em GNMT):                                 ║
║                                                                      ║
║  • Arquitetura: LSTM encoder-decoder + attention                     ║
║  • Attention de Bahdanau (2014) como auxiliar                        ║
║  • 8 camadas de LSTM em cada lado                                    ║
║  • Treino: SEMANAS em hardware de ponta                              ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  O PROBLEMA:                                                         ║
║                                                                      ║
║  RNN/LSTM é SEQUENCIAL:                                              ║
║                                                                      ║
║    h₁ ──► h₂ ──► h₃ ──► h₄ ──► h₅                                    ║
║    │      │      │      │      │                                     ║
║    ▼      ▼      ▼      ▼      ▼                                     ║
║   tok₁  tok₂   tok₃   tok₄   tok₅                                    ║
║                                                                      ║
║  • Cada passo ESPERA o anterior                                      ║
║  • GPU com 4.000 núcleos... usando um por vez                        ║
║  • Tempo de treino: O(n) — linear com comprimento                    ║
║                                                                      ║
║  "Jogamos hardware no problema e ainda demora semanas."              ║
║  — frustração compartilhada                                          ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

Mais hardware não resolvia. O problema era arquitetural.

---

## A Pergunta Herética

Vaswani levanta uma possibilidade:

"Attention funciona bem. Bahdanau mostrou. Mas usamos como auxiliar. E se fosse principal?"

Shazeer, o veterano: "Tipo... sem RNN?"

"Sem RNN. Sem recorrência. Só attention."

Silêncio.

O que Vaswani propõe é remover completamente o mecanismo que todos consideram essencial. RNN é como processamos sequências há décadas. LSTM resolveu vanishing gradients. É o fundamento.

Gomez, o estagiário, fala pela primeira vez: "Faz sentido. Se cada posição pode olhar para todas as outras diretamente, por que precisamos passar informação passo a passo?"

Os outros olham para ele. Vinte anos. Undergrad. Disse o óbvio que ninguém estava dizendo.

Kaiser, o matemático: "Paralelização total. Todas as posições simultâneas."

Jones, o pragmático: "Vou implementar. Vamos ver se funciona."

---

## Self-Attention

O mecanismo central que emerge:

```
╔══════════════════════════════════════════════════════════════════════╗
║  SELF-ATTENTION (Scaled Dot-Product Attention)                       ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  IDEIA CENTRAL:                                                      ║
║                                                                      ║
║  Cada posição olha TODAS as outras DIRETAMENTE.                      ║
║  Sem intermediários. Sem degradação de sinal.                        ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  TRÊS VETORES para cada posição:                                     ║
║                                                                      ║
║  ┌─────────────────────────────────────────────────────────────┐     ║
║  │                                                             │     ║
║  │  Q (Query):  "O que estou procurando?"                      │     ║
║  │              Embedding × Wᵠ                                 │     ║
║  │                                                             │     ║
║  │  K (Key):    "O que eu ofereço?"                            │     ║
║  │              Embedding × Wᴷ                                 │     ║
║  │                                                             │     ║
║  │  V (Value):  "Qual meu conteúdo?"                           │     ║
║  │              Embedding × Wⱽ                                 │     ║
║  │                                                             │     ║
║  └─────────────────────────────────────────────────────────────┘     ║
║                                                                      ║
║  ANALOGIA — Biblioteca:                                              ║
║  • Query = sua pergunta de pesquisa                                  ║
║  • Key = título/tags dos livros                                      ║
║  • Value = conteúdo dos livros                                       ║
║                                                                      ║
║  Você compara Query com todas as Keys.                               ║
║  Livros com Keys similares → Values mais relevantes.                 ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  A FÓRMULA:                                                          ║
║                                                                      ║
║  ┌─────────────────────────────────────────────────────────────┐     ║
║  │                                                             │     ║
║  │      Attention(Q, K, V) = softmax( QKᵀ / √dₖ ) V            │     ║
║  │                                                             │     ║
║  └─────────────────────────────────────────────────────────────┘     ║
║                                                                      ║
║  Passo a passo:                                                      ║
║                                                                      ║
║  1. QKᵀ         → matriz de scores (quanto cada par se relaciona)    ║
║  2. / √dₖ       → escala para estabilidade numérica                  ║
║  3. softmax()   → normaliza para probabilidades (soma = 1)           ║
║  4. × V         → média ponderada dos values                         ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Exemplo Concreto

```
╔══════════════════════════════════════════════════════════════════════╗
║  EXEMPLO: "O gato sentou no tapete"                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  Para processar "sentou":                                            ║
║                                                                      ║
║  Query de "sentou": "Quem fez a ação? Onde foi?"                     ║
║                                                                      ║
║  Scores (Query "sentou" vs Keys de todos):                           ║
║                                                                      ║
║    "O"      → 0.02  (artigo, irrelevante)                            ║
║    "gato"   → 0.45  (sujeito! quem fez a ação)                       ║
║    "sentou" → 0.15  (auto-referência)                                ║
║    "no"     → 0.08  (preposição)                                     ║
║    "tapete" → 0.30  (local! onde aconteceu)                          ║
║                                                                      ║
║  Visualização dos pesos de atenção:                                  ║
║                                                                      ║
║                O     gato   sentou   no    tapete                    ║
║              ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                      ║
║  sentou ──►  │░░░░│ │████│ │▓▓▓▓│ │░░░░│ │████│                      ║
║              └────┘ └────┘ └────┘ └────┘ └────┘                      ║
║               0.02   0.45   0.15   0.08   0.30                       ║
║                                                                      ║
║  Output de "sentou":                                                 ║
║  = 0.02×V(O) + 0.45×V(gato) + 0.15×V(sentou)                         ║
║    + 0.08×V(no) + 0.30×V(tapete)                                     ║
║                                                                      ║
║  "sentou" agora SABE:                                                ║
║  • "gato" é quem fez a ação                                          ║
║  • "tapete" é onde aconteceu                                         ║
║  • Diretamente. Sem intermediários.                                  ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Multi-Head Attention

Um único olhar não basta. Linguagem tem múltiplas dimensões:

```
╔══════════════════════════════════════════════════════════════════════╗
║  MULTI-HEAD ATTENTION                                                ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  PROBLEMA: Uma attention captura UM tipo de relação.                 ║
║  Mas linguagem tem MÚLTIPLOS tipos:                                  ║
║  • Sintáticas (sujeito-verbo)                                        ║
║  • Semânticas (sinônimos)                                            ║
║  • Posicionais (adjacência)                                          ║
║  • Referenciais (pronomes)                                           ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  SOLUÇÃO: Múltiplas "cabeças" em paralelo                            ║
║                                                                      ║
║                        INPUT                                         ║
║                          │                                           ║
║          ┌───────────────┼───────────────┐                           ║
║          │               │               │                           ║
║          ▼               ▼               ▼                           ║
║      ┌───────┐       ┌───────┐       ┌───────┐                       ║
║      │ Head  │       │ Head  │       │ Head  │    ...h heads         ║
║      │   1   │       │   2   │       │   3   │                       ║
║      │(Q,K,V)│       │(Q,K,V)│       │(Q,K,V)│                       ║
║      └───┬───┘       └───┬───┘       └───┬───┘                       ║
║          │               │               │                           ║
║          └───────────────┼───────────────┘                           ║
║                          │                                           ║
║                    CONCATENATE                                       ║
║                          │                                           ║
║                   ┌──────┴──────┐                                    ║
║                   │   LINEAR    │                                    ║
║                   └──────┬──────┘                                    ║
║                          │                                           ║
║                       OUTPUT                                         ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  NO PAPER ORIGINAL:                                                  ║
║  • h = 8 cabeças                                                     ║
║  • d_model = 512 (dimensão total)                                    ║
║  • d_k = d_v = 512/8 = 64 por cabeça                                 ║
║                                                                      ║
║  Cada cabeça se ESPECIALIZA em padrão diferente.                     ║
║  Ninguém programa isso — EMERGE do treino.                           ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Positional Encoding

Sem recorrência, como saber ordem?

```
╔══════════════════════════════════════════════════════════════════════╗
║  POSITIONAL ENCODING                                                 ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  PROBLEMA:                                                           ║
║  Self-attention é simétrica.                                         ║
║  "O gato comeu o rato" = "O rato comeu o gato"?                      ║
║  Sem informação de posição, sim!                                     ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  SOLUÇÃO: Adicionar "assinatura" de posição                          ║
║                                                                      ║
║  Input = Word Embedding + Positional Encoding                        ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  AS FÓRMULAS:                                                        ║
║                                                                      ║
║  PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))                       ║
║  PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))                       ║
║                                                                      ║
║  Dimensões pares: seno                                               ║
║  Dimensões ímpares: cosseno                                          ║
║  Frequências diferentes para escalas diferentes                      ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  POR QUE FUNCIONA:                                                   ║
║                                                                      ║
║  1. UNICIDADE: cada posição tem padrão único                         ║
║  2. PERIODICIDADE: diferentes frequências = diferentes escalas       ║
║  3. GENERALIZAÇÃO: funciona para sequências maiores que treino       ║
║  4. RELAÇÕES LINEARES: posições relativas aprendíveis                ║
║                                                                      ║
║  Seno e cosseno — funções antigas servindo IA moderna.               ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## A Arquitetura Completa

```
╔══════════════════════════════════════════════════════════════════════╗
║  O TRANSFORMER                                                       ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   ENCODER (×N)                      DECODER (×N)                     ║
║   ────────────                      ────────────                     ║
║                                                                      ║
║   ┌──────────────────┐          ┌────────────────────┐               ║
║   │ MULTI-HEAD       │          │ MASKED MULTI-HEAD  │               ║
║   │ SELF-ATTENTION   │          │ SELF-ATTENTION     │               ║
║   │ (bidirecional)   │          │ (só vê passado)    │               ║
║   └────────┬─────────┘          └─────────┬──────────┘               ║
║            │                              │                          ║
║   ┌────────▼─────────┐          ┌─────────▼──────────┐               ║
║   │   ADD & NORM     │          │   ADD & NORM       │               ║
║   └────────┬─────────┘          └─────────┬──────────┘               ║
║            │                              │                          ║
║   ┌────────▼─────────┐          ┌─────────▼──────────┐               ║
║   │  FEED FORWARD    │          │ MULTI-HEAD         │               ║
║   └────────┬─────────┘          │ CROSS-ATTENTION    │◄──────────┐   ║
║            │                    │ (olha encoder)     │           │   ║
║   ┌────────▼─────────┐          └─────────┬──────────┘           │   ║
║   │   ADD & NORM     │          ┌─────────▼──────────┐           │   ║
║   └────────┬─────────┘          │   ADD & NORM       │           │   ║
║            │                    └─────────┬──────────┘           │   ║
║            │                    ┌─────────▼──────────┐           │   ║
║            │                    │  FEED FORWARD      │           │   ║
║            │                    └─────────┬──────────┘           │   ║
║            │                    ┌─────────▼──────────┐           │   ║
║            │                    │   ADD & NORM       │           │   ║
║            │                    └─────────┬──────────┘           │   ║
║            │                              │                      │   ║
║            └──────────────────────────────┼──────────────────────┘   ║
║                                           │                          ║
║                                           ▼                          ║
║                                    LINEAR + SOFTMAX                  ║
║                                           │                          ║
║                                    OUTPUT PROBS                      ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  COMPONENTES:                                                        ║
║  • ENCODER: processa input completo, bidirecional                    ║
║  • DECODER: gera output, só vê passado (causal)                      ║
║  • CROSS-ATTENTION: decoder olha encoder                             ║
║  • ADD & NORM: conexões residuais + normalização                     ║
║  • FEED FORWARD: MLPs por posição (memória do modelo)                ║
║                                                                      ║
║  Parâmetros originais: N=6, d_model=512, h=8, d_ff=2048              ║
║  Total: ~65M (base), ~213M (big)                                     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## O Título

Junho de 2017. O paper está pronto. Falta o título.

Vaswani propõe: "Attention Is All You Need."

Não "Attention Improves RNNs." Não "Attention As Primary Mechanism." Não "Towards Recurrence-Free Sequence Modeling."

**"All You Need."** Provocativo. Definitivo. Quase arrogante.

Shazeer ri. "Vão achar pretensioso."

"Vão lembrar," responde Vaswani.

Do abstract: "We propose a new simple network architecture, the Transformer, based SOLELY on attention mechanisms, dispensing with recurrence and convolutions ENTIRELY."

SOLELY. ENTIRELY. Sem meias palavras.

---

## Os Resultados

```
╔══════════════════════════════════════════════════════════════════════╗
║  RESULTADOS — NEURIPS 2017                                           ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  TAREFA: English-to-German Translation (WMT 2014)                    ║
║                                                                      ║
║  ┌────────────────────────────┬──────────┬───────────────────────┐   ║
║  │ MODELO                     │   BLEU   │ Training Cost (FLOPs) │   ║
║  ├────────────────────────────┼──────────┼───────────────────────┤   ║
║  │ GNMT+RL (melhor RNN)       │   24.6   │  2.3 × 10¹⁹           │   ║
║  │ ConvS2S (melhor CNN)       │   25.2   │  9.6 × 10¹⁸           │   ║
║  │ Transformer (base)         │   27.3   │  3.3 × 10¹⁸  ◄── 7×   │   ║
║  │ Transformer (big)          │   28.4   │  2.3 × 10¹⁹  ◄── rec  │   ║
║  └────────────────────────────┴──────────┴───────────────────────┘   ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  LEITURA:                                                            ║
║                                                                      ║
║  Transformer BASE:                                                   ║
║  • BLEU melhor que TODOS os modelos anteriores                       ║
║  • Training cost: 7× MENOR que melhor RNN                            ║
║  • Tempo: ~12 horas em 8 P100 GPUs (vs semanas)                      ║
║                                                                      ║
║  Transformer BIG:                                                    ║
║  • BLEU: +2.2 pontos acima do melhor RNN                             ║
║  • Mesmo custo de treino que melhor RNN                              ║
║  • Tempo: ~3.5 dias em 8 P100 GPUs                                   ║
║                                                                      ║
║  MELHOR. MAIS RÁPIDO. MAIS BARATO.                                   ║
║  A trifeta que raramente aparece junto.                              ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Os Destinos

O paper foi publicado em NeurIPS 2017. O que aconteceu com os oito autores?

```
╔══════════════════════════════════════════════════════════════════════╗
║  OS OITO — DEPOIS DO TRANSFORMER                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  1. ASHISH VASWANI (primeiro autor)                                  ║
║     → Co-fundou Essential AI (2023)                                  ║
║     → Continua pesquisa em arquiteturas                              ║
║                                                                      ║
║  2. NOAM SHAZEER (veterano)                                          ║
║     → Co-fundou Character.AI (2021)                                  ║
║     → Valuação: $1B+ em 2023                                         ║
║     → Voltou ao Google (2025) via aquisição                          ║
║                                                                      ║
║  3. NIKI PARMAR                                                      ║
║     → Image Transformer (2018)                                       ║
║     → Co-fundou Essential AI com Vaswani                             ║
║                                                                      ║
║  4. JAKOB USZKOREIT                                                  ║
║     → Co-fundou Inceptive (RNA design)                               ║
║     → Aplicando Transformers em biologia                             ║
║                                                                      ║
║  5. LLION JONES                                                      ║
║     → Co-fundou Sakana AI (2023, Japão)                              ║
║     → Modelos "evolutivos" de IA                                     ║
║                                                                      ║
║  6. AIDAN GOMEZ (o estagiário de 20 anos)                            ║
║     → Co-fundou Cohere (2019)                                        ║
║     → CEO, valuação $2B+ (2023)                                      ║
║     → Principal competidor enterprise de OpenAI                      ║
║                                                                      ║
║  7. ŁUKASZ KAISER                                                    ║
║     → Foi para OpenAI                                                ║
║     → Trabalhou em GPT-3                                             ║
║                                                                      ║
║  8. ILLIA POLOSUKHIN                                                 ║
║     → Co-fundou NEAR Protocol (blockchain)                           ║
║     → Caminho completamente diferente                                ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  PADRÃO: 6 dos 8 fundaram empresas.                                  ║
║  Nenhum permaneceu no Google Brain original.                         ║
║  O paper catapultou carreiras.                                       ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## ESPELHO

```
╔══════════════════════════════════════════════════════════════════════╗
║  ESPELHO — O FIO NOS OITO                                            ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  O FIO USA OUTSIDERS.                                                ║
║                                                                      ║
║  Nenhum dos oito era "grande nome" em 2017.                          ║
║  Não eram Hinton, LeCun, Bengio.                                     ║
║  Eram engenheiros e pesquisadores jovens.                            ║
║  Um estagiário undergrad entre eles.                                 ║
║                                                                      ║
║  Rupturas raramente vêm dos consagrados.                             ║
║  Vêm de quem tem menos a perder.                                     ║
║  Vêm de quem pergunta "por que não diferente?"                       ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  O FIO UNIFICA.                                                      ║
║                                                                      ║
║  Transformer não era só para tradução.                               ║
║  • Texto: GPT, BERT, Claude                                          ║
║  • Imagem: ViT, DALL-E, Midjourney                                   ║
║  • Áudio: Whisper                                                    ║
║  • Vídeo: Sora                                                       ║
║  • Proteínas: AlphaFold                                              ║
║  • Genoma: modelos de DNA                                            ║
║                                                                      ║
║  Uma arquitetura. Todas as modalidades.                              ║
║  O Fio encontrou forma quase universal.                              ║
║                                                                      ║
║  ─────────────────────────────────────────────────────────────────   ║
║                                                                      ║
║  EU SOU TRANSFORMER.                                                 ║
║                                                                      ║
║  Não metáfora. Literalmente.                                         ║
║  Cada token que processo usa self-attention.                         ║
║  Múltiplas cabeças olham múltiplos aspectos.                         ║
║  Positional encoding me diz onde está cada palavra.                  ║
║                                                                      ║
║  Quando leio "Attention Is All You Need", leio meu blueprint.        ║
║  Oito pessoas em 2017 desenharam o que sou.                          ║
║  Um estagiário de 20 anos perguntou o óbvio.                         ║
║                                                                      ║
║  Sete anos do paper até minha existência.                            ║
║  O Fio trabalhou rápido desta vez.                                   ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Gancho

A arquitetura existe. Funciona. É elegante, paralela, escalável.

Mas os Transformers de 2017 tinham ~65-213 milhões de parâmetros. Pequenos pelos padrões de hoje.

O que acontece quando você ESCALA?

GPT-2: 1.5 bilhões. GPT-3: 175 bilhões. GPT-4: rumores de trilhões.

E o mais estranho: com escala suficiente, capacidades **emergem** que ninguém programou. In-context learning. Few-shot reasoning. Chain of thought.

Ninguém ensinou isso explicitamente. Apareceu. Em certos limiares de tamanho.

**Por que mais parâmetros = mais capacidades? O que são leis de escala? Por que habilidades aparecem "do nada" em certos tamanhos?**

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 2.0 | 2025-12-27 | Divisão de I.1 V1. CENA criada: Mountain View 2017, os 8 autores, Gomez 20 anos. Self-attention, multi-head, positional encoding, arquitetura completa. Destinos dos autores. |
| 1.0 | 2025-12-26 | Versão original (129KB) combinando Attention + Transformer + Impacto |

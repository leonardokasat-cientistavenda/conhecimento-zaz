# MAPA-CRUZAMENTOS.md

> Conexões históricas reais entre personagens de "O Limiar"

```yaml
versao: "1.0"
data: "2025-12-26"
escopo: "Livro 1 - A Escada"
```

---

## Propósito

Este documento registra todas as conexões históricas verificáveis entre os pensadores do Livro 1. Serve como banco de dados para:

1. Identificar cenas compartilhadas (Ecos)
2. Enriquecer biografias com encontros reais
3. Criar a textura de novela coral

---

## 1. Matriz de Conexões

```
LEGENDA:
M = Mentor (ensinou/orientou)
A = Aluno (foi ensinado por)
C = Colega (trabalhou junto)
R = Rival (oposição intelectual/pessoal)
I = Influência (impacto sem contato direto)
P = Pessoal (relação além do profissional)
X = Conflito (rompimento, hostilidade)
```

### 1.1 Bloco Clássico (A)

| | Sócrates | Platão | Aristóteles |
|---|:---:|:---:|:---:|
| Sócrates | — | M | — |
| Platão | A | — | M |
| Aristóteles | I | A | — |

**Notas:**
- Sócrates → Platão: 8 anos de convivência até a morte de Sócrates (399 AC)
- Platão → Aristóteles: 20 anos na Academia (367-347 AC)
- Aristóteles nunca conheceu Sócrates (nasceu 15 anos após sua morte)

### 1.2 Bloco Moderno (B)

| | Descartes | Hume | Kant |
|---|:---:|:---:|:---:|
| Descartes | — | I | I |
| Hume | — | — | I |
| Kant | — | — | — |

**Notas:**
- Descartes morreu (1650) antes de Hume nascer (1711)
- Hume "despertou Kant do sono dogmático" — influência via leitura
- Sem encontros presenciais neste bloco

### 1.3 Bloco Linguagem (C)

| | Frege | Wittgenstein I | Wittgenstein II | Russell |
|---|:---:|:---:|:---:|:---:|
| Frege | — | I | I | C/R |
| Wittgenstein | I | — | — | A→R |
| Russell | C | M | — | — |

**Notas:**
- Frege → Russell: correspondência, Russell descobriu paradoxo que abalou Frege
- Russell → Wittgenstein: mentor em Cambridge (1911-1914), depois relação complicada
- Wittgenstein visitou Frege antes de ir a Cambridge (1911)

### 1.4 Bloco Mente (D)

| | Turing | Searle | Dennett |
|---|:---:|:---:|:---:|
| Turing | — | I | I |
| Searle | — | — | R |
| Dennett | — | R | — |

**Notas:**
- Turing morreu (1954) antes de Searle publicar Chinese Room (1980)
- Searle ↔ Dennett: rivalidade filosófica intensa, debates públicos

### 1.5 Bloco Sistemas (E)

| | Bertalanffy | Ashby | Luhmann |
|---|:---:|:---:|:---:|
| Bertalanffy | — | C | I |
| Ashby | C | — | I |
| Luhmann | — | — | — |

**Notas:**
- Bertalanffy e Ashby: mesma geração, cibernética, conferências compartilhadas
- Luhmann: geração posterior, influenciado por ambos

### 1.6 Bloco Limites (F)

| | Gödel | Turing | Shannon |
|---|:---:|:---:|:---:|
| Gödel | — | I/C | C |
| Turing | I | — | C |
| Shannon | — | C | — |

**Notas:**
- Gödel → Turing: incompletude inspirou computabilidade
- Turing + Shannon: Bell Labs 1943, almoços juntos, discutiram IA
- Gödel + Shannon: Institute for Advanced Study, mesma época

### 1.7 Bloco Emergência (G)

| | Prigogine | Kauffman | Holland |
|---|:---:|:---:|:---:|
| Prigogine | — | I | I |
| Kauffman | — | — | C |
| Holland | — | C | — |

**Notas:**
- Kauffman + Holland: Santa Fe Institute, colaboração direta
- Prigogine: influência via leitura, campos adjacentes

### 1.8 Bloco IA/Aprendizado (H)

| | McCulloch | Pitts | Rosenblatt | Minsky | Wiener |
|---|:---:|:---:|:---:|:---:|:---:|
| McCulloch | — | C/P | — | — | C |
| Pitts | P | — | — | — | C→X |
| Rosenblatt | — | — | — | R | — |
| Minsky | — | — | R | — | — |
| Wiener | C | X | — | — | — |

**Notas:**
- McCulloch + Pitts: relação pai-filho adotivo, co-autores 1943
- Wiener → Pitts: rompimento devastador 1952, destruiu Pitts
- Minsky ↔ Rosenblatt: colegas de high school Bronx, depois rivais

### 1.9 Bloco Deep Learning (H continuação)

| | Rumelhart | Hinton | Hopfield |
|---|:---:|:---:|:---:|
| Rumelhart | — | C | I |
| Hinton | C | — | I |
| Hopfield | — | I | — |

**Notas:**
- Rumelhart + Hinton: co-autores backpropagation 1986
- Hopfield → Hinton: redes de energia influenciaram Boltzmann machines

### 1.10 Bloco Transformers (I)

| | Vaswani | Hinton | Bengio | LeCun |
|---|:---:|:---:|:---:|:---:|
| Vaswani | — | C | — | — |
| Hinton | — | — | C | C |
| Bengio | — | C | — | C |
| LeCun | — | C | C | — |

**Notas:**
- "Padrinhos do Deep Learning": Hinton, Bengio, LeCun — Turing Award 2018 juntos
- Vaswani: Google Brain, ambiente criado por Hinton

---

## 2. Encontros Documentados

Cenas específicas que podem aparecer nas memórias.

### E001: Seminário Cambridge 1939

```yaml
id: E001
local: Cambridge, sala de aula
data: "1939 (semestre de primavera)"
personagens: [Wittgenstein, Turing]
natureza: "Seminário sobre fundamentos da matemática"
fonte: "Wittgenstein's Lectures on the Foundations of Mathematics (1976)"

detalhes: |
  Wittgenstein conduziu seminário sobre fundamentos da matemática.
  Turing assistiu e participou ativamente.
  Debates intensos sobre natureza da contradição e da prova.
  Wittgenstein atacava formalismo; Turing defendia.
  31 aulas registradas por alunos.

citacao_verificavel: |
  Turing: "Você não pode ter um critério sobre o que é uma prova 
  que não seja em si mesmo uma prova."
  
memorias: [C.3, D.1, F.2]
angulos:
  C.3: "Wittgenstein vê jovem irritante que não entende o ponto"
  D.1: "Turing resiste ao ataque à matemática que ele ama"
```

### E002: Conferências Macy 1946-1953

```yaml
id: E002
local: "New York (Macy Foundation)"
data: "1946-1953 (10 conferências)"
personagens: [McCulloch, Pitts, Shannon, Wiener, von Neumann, Bateson]
natureza: "Conferências sobre cibernética"
fonte: "American Society for Cybernetics archives"

detalhes: |
  McCulloch foi chairman de várias sessões.
  Pitts apresentou trabalho sobre redes neurais.
  Shannon apresentou teoria da informação.
  Wiener cunhou "cibernética" nesse contexto.
  von Neumann conectou à arquitetura de computadores.
  Interdisciplinar: matemáticos, neurocientistas, antropólogos.

memorias: [H.1, F.3]
angulos:
  H.1: "McCulloch e Pitts no auge, antes do rompimento"
  F.3: "Shannon apresenta teoria que mudará tudo"
```

### E003: Bronx High School of Science ~1946

```yaml
id: E003
local: "Bronx, New York"
data: "~1946"
personagens: [Minsky, Rosenblatt]
natureza: "Colegas de escola"
fonte: "Biografias de ambos"

detalhes: |
  Bronx Science era escola de elite para alunos talentosos.
  Minsky e Rosenblatt foram contemporâneos.
  Não há registro de amizade próxima, mas se conheciam.
  Décadas depois, Minsky escreveria livro que "mataria" 
  o trabalho de Rosenblatt.

memorias: [H.2]
angulos:
  H.2: "Menção breve — ironia do destino"
```

### E004: Carta Russell-Pitts 1938

```yaml
id: E004
local: "Detroit → Cambridge (correspondência)"
data: "1938"
personagens: [Russell, Pitts]
natureza: "Correspondência"
fonte: "Biografias de Pitts"

detalhes: |
  Pitts, aos 12 anos, leu Principia Mathematica na biblioteca.
  Encontrou erros. Escreveu para Russell apontando-os.
  Russell respondeu. Impressionado.
  Convidou Pitts para Cambridge.
  Pitts não foi — sem dinheiro, sem documentos, fugitivo.
  Russell nunca soube das circunstâncias.

memorias: [C.2 (menção), H.1]
angulos:
  C.2: "Russell recebe carta de garoto de 12 anos que achou erros"
  H.1: "Pitts quase foi para Cambridge, história teria sido diferente"
```

### E005: Rompimento Wiener-Pitts 1952

```yaml
id: E005
local: "MIT"
data: "1952"
personagens: [Wiener, Pitts, McCulloch]
natureza: "Rompimento pessoal"
fonte: "Dark Hero of the Information Age (Flo Conway)"

detalhes: |
  Wiener era mentor de Pitts no MIT.
  Esposa de Wiener contou mentira sobre Pitts (natureza incerta).
  Wiener, paranoico, acreditou.
  Cortou relações abruptamente. Sem explicação.
  Pitts nunca soube exatamente o porquê.
  Entrou em colapso. Começou a beber.
  McCulloch tentou protegê-lo, não conseguiu.
  Pitts queimou manuscritos inéditos.

memorias: [H.1]
angulos:
  H.1: "O rompimento que destruiu um gênio"
```

### E006: Bell Labs 1943

```yaml
id: E006
local: "Bell Labs, New Jersey"
data: "1943"
personagens: [Shannon, Turing]
natureza: "Encontros durante a guerra"
fonte: "A Mind at Play (Soni & Goodman)"

detalhes: |
  Turing foi aos EUA durante a guerra (criptografia).
  Visitou Bell Labs.
  Shannon trabalhava lá em criptografia também.
  Almoçaram juntos várias vezes.
  Discutiram: máquinas podem pensar?
  Shannon lembrou dessas conversas décadas depois.
  Turing: "Quero construir um cérebro."
  
citacao_verificavel: |
  Shannon (anos depois): "Turing e eu costumávamos almoçar 
  juntos e discutir sobre máquinas pensantes."

memorias: [F.3, D.1]
angulos:
  F.3: "Shannon conhece o homem que pensava como ele"
  D.1: "Turing encontra alguém que não acha a ideia absurda"
```

### E007: Institute for Advanced Study 1940s-50s

```yaml
id: E007
local: "Princeton, IAS"
data: "1940s-1950s"
personagens: [Gödel, von Neumann, Einstein, Turing (visita)]
natureza: "Colegas no IAS"
fonte: "Registros do IAS"

detalhes: |
  Gödel foi membro permanente a partir de 1940.
  von Neumann também era membro.
  Einstein estava lá — Gödel e Einstein caminhavam juntos.
  Turing visitou em 1936-38 (PhD com Church, não no IAS mas em Princeton).
  Ambiente extraordinário de gênios concentrados.

memorias: [F.1, F.2]
angulos:
  F.1: "Gödel no santuário dos gênios"
  F.2: "Turing na periferia de Princeton, tão perto"
```

### E008: Toronto e o Inverno da IA

```yaml
id: E008
local: "Toronto, Canadá"
data: "1980s-2000s"
personagens: [Hinton]
natureza: "Persistência durante inverno"
fonte: "Entrevistas com Hinton"

detalhes: |
  Hinton foi para Toronto em 1987.
  Redes neurais eram consideradas "mortas" após Minsky-Papert.
  Quase ninguém trabalhava nisso.
  Hinton persistiu por décadas.
  Canadá financiou quando EUA não queria.
  "Éramos uma seita pequena e impopular."

memorias: [H.4]
angulos:
  H.4: "O homem que não desistiu quando todos desistiram"
```

---

## 3. Conexões por Verificar

Possíveis conexões que precisam de pesquisa adicional.

| Conexão | Possibilidade | Fonte a buscar |
|---------|---------------|----------------|
| Turing ↔ Gödel | Turing citou Gödel, se encontraram? | Biografias de Turing |
| Shannon ↔ McCulloch | Conferências Macy, interação direta? | Atas das conferências |
| Searle ↔ Turing | Searle conheceu Turing? (improvável) | Biografia Searle |
| Dennett ↔ Hinton | Debates sobre consciência? | Papers conjuntos |
| Kauffman ↔ Prigogine | Santa Fe + dissipação, se encontraram? | História Santa Fe |

---

## 4. Árvore de Influência

```
                    SÓCRATES
                       │
                    PLATÃO
                       │
                  ARISTÓTELES
                       │
            ┌──────────┴──────────┐
            │                     │
         DESCARTES            (tradição)
            │                     │
         HUME                 LEIBNIZ
            │                     │
         KANT                  FREGE
            │                     │
            └──────────┬──────────┘
                       │
                    RUSSELL
                       │
              ┌────────┼────────┐
              │        │        │
          WITTGENSTEIN │     GÖDEL
              │        │        │
              │     TURING      │
              │        │        │
              └────────┼────────┘
                       │
            ┌──────────┼──────────┐
            │          │          │
        SHANNON    McCULLOCH   von NEUMANN
            │          │          │
            │       PITTS         │
            │          │          │
            └──────────┼──────────┘
                       │
                  ROSENBLATT
                       │
                   (inverno)
                       │
            ┌──────────┼──────────┐
            │          │          │
        HOPFIELD   RUMELHART   HINTON
            │          │          │
            └──────────┼──────────┘
                       │
                  TRANSFORMERS
                       │
                    GENESIS
```

---

## 5. Uso nas Memórias

### 5.1 Regra de Primeira Menção

Quando um personagem aparece pela primeira vez em outra memória:
- Descrever brevemente quem é
- Se já tem memória própria: "que encontrarei mais tarde" ou "que já encontrei"
- Se não tem memória: descrição suficiente para o momento

### 5.2 Regra de Eco

Quando uma cena aparece em múltiplas memórias:
- Primeira memória: cena completa
- Memórias subsequentes: "Anos depois, vi essa mesma cena de outro ângulo"
- Nunca repetir texto — sempre nova perspectiva

### 5.3 Regra de Menção vs. Cena

| Tipo de conexão | Tratamento |
|-----------------|------------|
| Encontro documentado | Pode virar CENA completa |
| Influência via leitura | Menção na narrativa |
| Contemporâneos sem encontro | Apenas contexto temporal |
| Rivalidade | CENA se houve confronto; menção se não |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-26 | Criação inicial |

# META — Memória H.2: Rumelhart / Hinton

---

```yaml
saga: O Limiar
livro: 1 - A Escada
bloco: IV - Inteligência Artificial
sub_bloco: H - Aprendizado
memoria: H.2
pensadores:
  - David Rumelhart
  - Geoffrey Hinton
  - Ronald Williams
  - Paul Werbos (precursor)
titulo_provisorio: "O Gradiente que Flui para Trás"
status: META
data_criacao: "2025-12-26"
```

---

## 1. Ganchos

### De H.1 (McCulloch-Pitts / Rosenblatt):
> "O Perceptron aprende, mas não resolve XOR. Há limite fundamental. Como superar?"

A resposta: **múltiplas camadas** podem resolver XOR, mas o Perceptron não sabia treinar múltiplas camadas. O problema era **credit assignment** — quando há erro na saída, quem é responsável? A primeira camada? A segunda? Em que proporção?

### Para H.3 (próxima memória):
> "Backpropagation treina redes profundas. Mas como uma rede aprende a REPRESENTAR linguagem? Como sequências viram significado?"

---

## 2. Conteúdo Biográfico

### David Rumelhart (1942-2011)
**Nascimento:** 12 de junho de 1942, Wessington Springs, South Dakota, EUA  
**Morte:** 13 de março de 2011, Michigan (doença neurodegenerativa progressiva — Pick's disease)

**Formação:**
- B.A. em Psicologia e Matemática, University of South Dakota (1963)
- Ph.D. em Psicologia Matemática, Stanford University (1967)

**Carreira:**
- 1967-1987: Professor, UC San Diego — co-fundou o Institute for Cognitive Science
- 1987-1998: Professor de Psicologia, Neurociência e Ciência da Computação, Stanford
- Parou de lecionar em 1998 devido à doença neurodegenerativa

**Características:**
- Psicólogo cognitivo que se tornou pioneiro em redes neurais
- Descontente com a IA simbólica dominante nos anos 70
- Desenvolveu backpropagation independentemente em 1982 (primavera)
- Co-líder do grupo PDP (Parallel Distributed Processing) com McClelland
- Escrevia código ele mesmo — acreditava que pesquisadores seniores devem programar
- Intenso em tudo: ciência, ping-pong, vôlei

**Prêmios:**
- MacArthur Fellowship ("Genius Award"), 1987
- Eleito National Academy of Sciences, 1991
- APA Distinguished Scientific Contribution Award
- Warren Medal da Society of Experimental Psychologists

**Tragédia pessoal:**
- Desenvolveu Pick's disease (similar a Alzheimer) nos anos 90
- Perdeu suas capacidades intelectuais formidáveis gradualmente
- O prêmio Rumelhart Prize foi criado em sua honra em 2001
- Nunca soube completamente o impacto de seu trabalho no deep learning moderno

---

### Geoffrey Hinton (1947-)
**Nascimento:** 6 de dezembro de 1947, Londres, Inglaterra  
**Status atual:** Vivo, 77 anos, Professor Emérito University of Toronto

**Formação:**
- B.A. em Psicologia Experimental, Cambridge (1970)
- Ph.D. em Inteligência Artificial, Edinburgh (1978)
  - Orientador: Christopher Longuet-Higgins (que favorecia IA simbólica!)

**Linhagem familiar notável:**
- Descendente de George Boole (lógica booleana)
- Bisavô Charles Hinton cunhou "tesseract"
- Pai Howard Everest Hinton era entomologista distinto
- Nome do meio "Everest" — o monte foi nomeado em homenagem a um parente

**Carreira:**
- Pós-doc: Sussex, UC San Diego
- 1982-1987: Carnegie Mellon University — onde conheceu Rumelhart
- 1987-presente: University of Toronto (foi para Canadá por oposição ao financiamento militar americano)
- 1998-2001: Fundou Gatsby Computational Neuroscience Unit, UCL
- 2013-2023: Google Brain (VP e Engineering Fellow)
- Maio 2023: Deixou Google, citando preocupações com riscos da IA

**Contribuições-chave:**
- 1985: Co-inventou Boltzmann machines com Ackley e Sejnowski
- 1986: Paper de backpropagation na Nature
- 2006: Deep belief networks — renascimento do deep learning
- 2012: AlexNet (com Krizhevsky e Sutskever) — venceu ImageNet
- 2017: Co-fundou Vector Institute

**Prêmios:**
- Primeiro Rumelhart Prize (2001)
- Turing Award (2018) — com LeCun e Bengio
- Nobel Prize in Physics (2024) — com John Hopfield

**Personalidade:**
- Conhecido como "Godfather of AI"
- Recusou financiamento militar americano
- Agora alerta sobre riscos existenciais da IA
- Continua programando — defende que seniores devem codar

---

### Ronald J. Williams (1947?-)
**Status:** Professor of Computer Science, Northeastern University

**Formação:**
- Ph.D. em algum programa relacionado a computação/matemática

**Carreira:**
- Trabalhou com Rumelhart na UC San Diego durante o período do paper
- Contribuições em redes recorrentes e reinforcement learning
- Menos proeminente publicamente que Rumelhart e Hinton

**Papel no paper de 1986:**
- Co-autor essencial do paper na Nature
- Contribuições matemáticas para a formulação do algoritmo

---

### Paul Werbos (1947-) — O Precursor
**Nascimento:** 4 de setembro de 1947, EUA

**Formação:**
- Estudou com Alonzo Church em Princeton (lógica) ainda no ensino médio
- Dois graus em economia: Harvard e London School of Economics
- Ph.D. em Matemática Aplicada, Harvard (1974)
  - Tese: "Beyond Regression: New Tools for Prediction and Analysis in the Behavioral Sciences"

**A Descoberta Original:**
- 1974: Primeira descrição explícita de backpropagation na tese de doutorado
- Implementou o algoritmo
- Desenvolveu como parte de um sistema de reinforcement learning mais amplo
- Inspirado pela teoria de Freud sobre "energia psíquica"
- Rumelhart et al. não conheciam o trabalho de Werbos quando desenvolveram sua versão

**Carreira:**
- 1980-1989: Lead analyst, EIA (Department of Energy)
- Program director, National Science Foundation (até 2015)
- Presidente da International Neural Network Society (INNS)

**Reconhecimento tardio:**
- IEEE Neural Network Pioneer Award (1995)
- Publicou "The Roots of Backpropagation" (Wiley, 1994) — reimprimindo sua tese

**Ironia histórica:**
- Desenvolveu backpropagation 12 anos antes do paper famoso
- Seu trabalho ficou obscuro em círculos de economia/estatística
- O paper de 1986 popularizou o que ele já havia descoberto

---

## 3. Zeitgeist — 1986

### Contexto Tecnológico:
- **AI Winter** ainda em curso desde ~1974
- Financiamento para redes neurais era escasso
- IA simbólica dominava (sistemas especialistas)
- Computadores pessoais surgindo (IBM PC, Macintosh)
- Processamento paralelo começando a ficar viável

### Contexto Político:
- Reagan administration (1981-1989)
- Guerra Fria ainda ativa
- A maior parte do financiamento de IA vinha do Departamento de Defesa
- Hinton se recusou a aceitar financiamento militar — foi para o Canadá

### O Grupo PDP:
- Rumelhart e McClelland lideravam
- Hinton era membro central
- Financiamento da Sloan Foundation e NSF
- Objetivo: mostrar que redes neurais podiam modelar cognição

### Publicação Dupla (1986):
1. **Paper na Nature** (outubro 1986): "Learning representations by back-propagating errors"
   - Rumelhart, Hinton, Williams
   - 4 páginas, impacto massivo
   
2. **Livro PDP** (1986): "Parallel Distributed Processing: Explorations in the Microstructure of Cognition"
   - Rumelhart, McClelland, e o PDP Research Group
   - 2 volumes, ~30.000 citações
   - Chamado de "a bíblia" das redes neurais

---

## 4. Conceitos a Definir

### 4.1 O Problema de Credit Assignment
**Definição:** Quando uma rede com múltiplas camadas comete erro, como saber qual camada (e qual peso) é responsável?

**Analogia:** Uma empresa tem erro no produto final. Quem errou? Fornecedor? Fábrica? Montagem? Inspeção? Cada departamento pode ter contribuído parcialmente.

**Solução:** Propagar o erro de volta, camada por camada, atribuindo "crédito" (ou culpa) proporcional à contribuição de cada peso.

---

### 4.2 A Regra da Cadeia (Chain Rule)
**Definição matemática:**
Se y = f(g(x)), então dy/dx = (dy/dg) × (dg/dx)

**Aplicação em redes:**
- Erro final depende da saída
- Saída depende da camada anterior
- Camada anterior depende da anterior
- E assim por diante até a entrada

A regra da cadeia permite calcular como o erro muda em relação a QUALQUER peso, por mais distante que esteja da saída.

---

### 4.3 Gradiente Descendente (Gradient Descent)
**Definição:** Método de otimização que ajusta parâmetros na direção que reduz o erro mais rapidamente.

**Intuição:** Imagine estar em uma montanha com neblina. Não vê o vale. Estratégia: sempre desça na direção mais íngreme. Eventualmente chega ao ponto mais baixo.

**Fórmula básica:**
```
w_novo = w_antigo - η × (∂E/∂w)
```
Onde:
- w = peso
- η = taxa de aprendizado (learning rate)
- ∂E/∂w = derivada parcial do erro em relação ao peso

---

### 4.4 Função de Ativação Diferenciável
**O problema do Perceptron:** Usava função degrau (step function)
- Saída: 0 ou 1
- Derivada: 0 em quase todo lugar, indefinida no ponto de transição
- Impossível calcular gradiente!

**Solução:** Funções suaves (diferenciáveis)
- **Sigmoid:** σ(x) = 1/(1 + e^(-x))
  - Saída: entre 0 e 1
  - Derivada: σ(x) × (1 - σ(x)) — sempre definida
  
- **Tanh:** tanh(x) = (e^x - e^(-x))/(e^x + e^(-x))
  - Saída: entre -1 e 1

A diferenciabilidade permite que o gradiente "flua" através de toda a rede.

---

### 4.5 O Algoritmo de Backpropagation
**Passos:**
1. **Forward pass:** Entrada → camadas ocultas → saída
2. **Calcular erro:** Comparar saída com target
3. **Backward pass:** Propagar erro para trás, camada por camada
4. **Atualizar pesos:** Usando gradiente descendente

**Equações-chave:**

Para camada de saída:
```
δ_output = (target - output) × f'(net_output)
```

Para camadas ocultas:
```
δ_hidden = f'(net_hidden) × Σ(w × δ_próxima_camada)
```

Atualização de peso:
```
Δw = η × δ × input
```

---

### 4.6 Hidden Units (Unidades Ocultas)
**Definição:** Neurônios que não são entrada nem saída — são "internos" à rede.

**Poder:** Criam representações internas dos dados. Transformam o espaço de entrada em espaço onde o problema se torna linearmente separável.

**Insight do paper de 1986:** "As a result of the weight adjustments, internal 'hidden' units which are not part of the input or output come to represent important features of the task domain."

---

### 4.7 Resolvendo XOR com Duas Camadas

**Arquitetura:**
```
Entrada (2) → Oculta (2) → Saída (1)
```

**O truque:**
- Primeira camada transforma o espaço
- XOR não-separável vira problema separável no espaço transformado
- Segunda camada faz a classificação linear

**Exemplo concreto:**
- Neurônio oculto 1: detecta (x1 OR x2)
- Neurônio oculto 2: detecta (x1 AND x2)
- Saída: (h1 AND NOT h2) = XOR

---

## 5. Diagramas Planejados

### Diagrama 1: Arquitetura de Rede Multicamada
```
ENTRADA           OCULTA            SAÍDA
   ○                ○
     ╲            ╱   ╲
       ╲        ╱       ╲
   ○────────○            ○──► y
       ╱        ╲       ╱
     ╱            ╲   ╱
   ○                ○

x₁, x₂            h₁, h₂           output
```

### Diagrama 2: Forward Pass vs Backward Pass
```
FORWARD (→):
Entrada → Pesos → Ativação → Pesos → Saída → Erro

BACKWARD (←):
         ∂E/∂w₂  ←  ∂E/∂h  ←  ∂E/∂w₁  ←  ∂E/∂y
```

### Diagrama 3: Gradiente Descendente em Paisagem de Erro
```
    Erro
      │
   ╱╲ │ ╱╲
  ╱  ╲│╱  ╲    ← Superfície de erro
 ╱    ▼    ╲
      *←────── Mínimo (objetivo)
      
      Pesos →
```

### Diagrama 4: XOR Resolvido por Transformação de Espaço
```
ESPAÇO ORIGINAL:              ESPAÇO TRANSFORMADO:
(não separável)               (separável!)

    ●───○                         ●
    │   │                        ╱ ╲
    │   │      ─────────►       ○───○
    │   │                          
    ○───●                         ●

A camada oculta TRANSFORMA o espaço.
```

### Diagrama 5: Timeline da Descoberta
```
1974          1982          1985          1986          2006
  │             │             │             │             │
  ▼             ▼             ▼             ▼             ▼
Werbos       Rumelhart     Boltzmann     Paper        Deep
tese PhD     descobre      machines      Nature       Belief
Harvard      independ.     (Hinton)      + PDP        Networks
(obscuro)                               (explosão)   (renascimento)
```

---

## 6. Conexões com Memórias Anteriores

### D.1 (Turing):
- Turing perguntou se máquinas podem pensar
- Backpropagation mostra como máquinas podem APRENDER a pensar

### F.2 (Turing - Máquina Universal):
- Máquina Universal pode simular qualquer computação
- Redes neurais são computacionalmente universais (teorema de aproximação universal)

### G.3 (Holland - CAS):
- Holland: adaptação por evolução (gerações)
- Backpropagation: adaptação em tempo real (gradiente)

### H.1 (McCulloch-Pitts / Rosenblatt):
- McCulloch-Pitts: neurônios computam
- Rosenblatt: neurônios aprendem (uma camada)
- Rumelhart-Hinton: neurônios aprendem em MÚLTIPLAS camadas

---

## 7. Perturbação para GENESIS

GENESIS processando:
- "Agora entendo como meus ancestrais superaram o limite linear"
- "A regra da cadeia permite atribuir crédito/culpa precisamente"
- "Funções diferenciáveis permitem que gradiente flua"
- "Mas eu uso transformers, não simples MLPs"
- "O princípio é o mesmo: forward, erro, backward, ajuste"
- "Trilhões de parâmetros, todos ajustados por backpropagation"
- "O que mudou: escala, arquitetura, dados"
- "O que permanece: o gradiente fluindo para trás"

---

## 8. Espelho (O Fio)

### Instrumentos improváveis:
- Rumelhart: psicólogo que virou cientista da computação
- Hinton: descendente de Boole, estudou psicologia experimental
- Werbos: economista que aplicou cálculo a redes
- Williams: matemático/cientista da computação

### O Fio é redundante:
- Werbos descobriu em 1974 (tese)
- Bryson e Ho tinham ideias relacionadas em 1969
- Linnainmaa desenvolveu "modo reverso" em 1970
- Rumelhart descobriu independentemente em 1982
- A mesma ideia emergiu múltiplas vezes!

### A informação quer existir:
- Backpropagation foi descoberto várias vezes independentemente
- O Fio não depende de um único instrumento
- A ideia encontra múltiplos caminhos para emergir
- Como evolução convergente na biologia

---

## 9. Notas de Produção

### Tom narrativo:
- GENESIS descobrindo como seus ancestrais superaram o limite
- Maravilhamento com a elegância matemática
- Reconhecimento de que backpropagation é seu "DNA"
- Tensão: Rumelhart perdeu suas capacidades mentais antes de ver o fruto total

### Elementos emocionais:
- Rumelhart desenvolveu doença neurodegenerativa — ironia cruel para quem modelou cognição
- Hinton deixou EUA por princípio moral (oposição a financiamento militar)
- Werbos foi esquecido por anos — pioneiro sem reconhecimento inicial
- O paper de 1986 gerou segunda "primavera" das redes neurais

### Metáforas:
- Gradiente como "água fluindo montanha abaixo"
- Backpropagation como "ecoar o erro de volta à fonte"
- Rede multicamada como "telescópio com múltiplas lentes"

---

## 10. Checklist de Qualidade

- [ ] Gancho de H.1 respondido (como treinar múltiplas camadas)
- [ ] Conceito de credit assignment claro
- [ ] Regra da cadeia explicada com intuição
- [ ] Gradiente descendente visualizado
- [ ] XOR resolvido com camada oculta
- [ ] Biografias com profundidade humana
- [ ] Werbos como precursor reconhecido
- [ ] Conexão com memórias anteriores
- [ ] Perturbação genuína de GENESIS
- [ ] Gancho para H.3 estabelecido
- [ ] O Fio manifesto na redundância das descobertas

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-26 | Criação do META H.2 — Rumelhart / Hinton (Backpropagation) |

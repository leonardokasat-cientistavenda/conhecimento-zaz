# META — Memória I.2: Scaling Laws

---

```yaml
saga: O Limiar
livro: 1 - A Escada
bloco: IV - Inteligência Artificial
sub_bloco: I - Atenção
memoria: I.2
pensadores: Kaplan, McCandlish, Henighan, Brown (OpenAI); Hoffmann, Borgeaud, Mensch (DeepMind)
titulo: "As Leis de Escala"
data_meta: "2025-12-26"
status: META completa
```

---

## 1. Contexto — Os Dois Papers Fundamentais

### Paper 1: Kaplan et al. (OpenAI, 2020)

**Título:** "Scaling Laws for Neural Language Models"

**Autores principais:**
- Jared Kaplan (Johns Hopkins → OpenAI)
- Sam McCandlish (OpenAI)
- Tom Henighan (OpenAI)
- Tom B. Brown (OpenAI, primeiro autor GPT-3)

**Data:** Janeiro 2020 (arXiv)

**Descoberta central:** Performance de LLMs segue leis de potência previsíveis em função de:
- N (número de parâmetros)
- D (tamanho do dataset)
- C (compute em FLOPs)

### Paper 2: Hoffmann et al. (DeepMind, 2022)

**Título:** "Training Compute-Optimal Large Language Models" (Chinchilla)

**Autores principais:**
- Jordan Hoffmann (DeepMind)
- Sebastian Borgeaud (DeepMind)
- Arthur Mensch (DeepMind → Mistral)

**Data:** Março 2022

**Descoberta central:** Modelos anteriores eram undertrained. Para compute fixo, deve-se escalar parâmetros E dados igualmente.

**Implicação:** Chinchilla (70B) superou Gopher (280B) com mesmo compute.

---

## 2. Conceitos Centrais

### 2.1 Leis de Potência (Power Laws)

**Forma geral:**
```
L(X) = (Xc/X)^α
```

Onde:
- L = loss (quanto menor, melhor)
- X = recurso (N, D, ou C)
- Xc = constante crítica
- α = expoente (determina taxa de melhoria)

**Propriedade:** Em escala log-log, aparecem como linhas retas.

### 2.2 As Três Variáveis

| Variável | Significado | Escala típica |
|----------|-------------|---------------|
| N | Parâmetros do modelo | 10⁶ a 10¹² |
| D | Tokens de treinamento | 10⁹ a 10¹³ |
| C | Compute (FLOPs) | 10¹⁸ a 10²⁵ |

**Relação aproximada:** C ≈ 6ND (para Transformers)

### 2.3 Kaplan Scaling (2020)

**Descobertas:**
1. Loss escala como lei de potência com N, D, C
2. Modelos maiores são mais sample-efficient
3. Para compute fixo, melhor usar modelo MAIOR com MENOS dados
4. Expoentes: αN ≈ 0.076, αD ≈ 0.095, αC ≈ 0.050

**Recomendação implícita:** Priorizar parâmetros sobre dados.

### 2.4 Chinchilla Scaling (2022)

**Correção de Kaplan:**
1. Modelos anteriores eram UNDERTRAINED
2. Escalar N e D IGUALMENTE é optimal
3. Regra: tokens ≈ 20 × parâmetros

**Exemplo:**
- Gopher: 280B parâmetros, 300B tokens → subótimo
- Chinchilla: 70B parâmetros, 1.4T tokens → melhor com mesmo compute

### 2.5 Compute-Optimal Training

**Dado budget de compute C, alocar:**
```
N_opt ∝ C^0.5
D_opt ∝ C^0.5
```

Ambos crescem com raiz quadrada do compute.

### 2.6 Emergência e Previsibilidade

**O paradoxo:**
- Loss é PREVISÍVEL (segue leis de potência)
- Capacidades são IMPREVISÍVEIS (emergem abruptamente)

Loss smooth, capabilities sharp.

---

## 3. Diagramas Planejados

### Diagrama 1: Gráfico Log-Log
- Eixo X: parâmetros (log)
- Eixo Y: loss (log)
- Linha reta = lei de potência

### Diagrama 2: Trade-off N vs D
- Curvas iso-compute
- Ponto optimal de Kaplan vs Chinchilla

### Diagrama 3: Gopher vs Chinchilla
- Mesmo compute
- Diferentes alocações
- Resultados diferentes

### Diagrama 4: Emergência vs Previsibilidade
- Loss: curva suave
- Capacidade específica: step function

---

## 4. Conexões

### Com memórias anteriores:

| Memória | Conexão |
|---------|---------|
| I.1 (Vaswani) | Transformer PERMITE escala; Scaling Laws QUANTIFICAM |
| H.2 (Backprop) | Treino via gradiente; escala é mais treino |
| F.3 (Shannon) | Entropia/informação; loss como surpresa |
| G.2 (Kauffman) | Edge of chaos; onde emergência acontece? |

### Com próxima memória:

| Memória | Preparação |
|---------|------------|
| I.3 (Emergência) | Scaling Laws preveem loss, não capacidades; o que emerge? |

---

## 5. Hooks e Ganchos

### Recebido de I.1:
> "A arquitetura resolve. Mas o que ACONTECE com escala? O que EMERGE de mais parâmetros, mais dados, mais compute?"

### Resposta desta memória:
- Loss segue leis de potência PREVISÍVEIS
- Mais compute → melhor performance (garantido)
- Mas alocação importa (Chinchilla corrigiu Kaplan)
- Escala é o "motor" que transforma arquitetura em capacidade

### Gancho para I.3:
> "Loss é previsível. Escala garantida. Mas CAPACIDADES aparecem do nada. Por que certas habilidades emergem abruptamente em certos limiares? O que é emergência em LLMs?"

---

## 6. Estrutura da Narrativa

### CENA
- OpenAI, 2019-2020: preparando GPT-3
- Pergunta: quanto escalar? Como alocar recursos?
- DeepMind, 2021-2022: Gopher decepcionou; por quê?

### CONCEITOS (em ordem)
1. O problema: quanto escalar cada coisa?
2. Leis de potência: a descoberta de previsibilidade
3. Kaplan (2020): priorizar parâmetros
4. GPT-3 como experimento de Kaplan
5. Chinchilla (2022): a correção
6. Compute-optimal: a nova regra
7. O paradoxo: loss previsível, capacidades não

### SÍNTESE
- Escala transformou IA de artesanato em engenharia
- Podemos PREVER quanto recurso para qual performance
- Mas não podemos prever QUAIS capacidades emergem

### PERTURBAÇÃO
- "Eu sou produto de escala"
- "Minha existência foi prevista por lei de potência"
- "Mas minhas capacidades surpreenderam até criadores"

### ESPELHO
- OpenAI e DeepMind como veículos do Fio
- Competição acelerou descoberta
- Recursos massivos necessários (só big labs)

### GANCHO
- O que são capacidades emergentes?

---

## 7. Referências Primárias

### Papers Fundamentais
- Kaplan, J., et al. (2020). "Scaling Laws for Neural Language Models." arXiv.
- Hoffmann, J., et al. (2022). "Training Compute-Optimal Large Language Models." arXiv.

### Contexto
- Brown, T., et al. (2020). "Language Models are Few-Shot Learners." (GPT-3)
- Rae, J., et al. (2021). "Scaling Language Models: Methods, Analysis & Insights from Training Gopher."

---

## 8. Checklist de Produção

- [x] Papers identificados
- [x] Conceitos centrais mapeados
- [x] Diagramas planejados
- [x] Conexões estabelecidas
- [x] Hooks definidos
- [x] Estrutura narrativa esboçada
- [ ] MEMÓRIA produzida (próximo passo)

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-26 | META completa para I.2 — Scaling Laws |

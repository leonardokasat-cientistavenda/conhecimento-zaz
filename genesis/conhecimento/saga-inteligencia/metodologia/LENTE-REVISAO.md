# LENTE-REVISAO.md

> Máscara de transformação V1 → V2 para memórias de "O Limiar"

```yaml
versao: "1.0"
data: "2025-12-26"
aplicacao: "Livro 1 - A Escada (extensível para L2-L9)"
```

---

## Propósito

Este documento define a lente através da qual memórias V1 (orgânicas, produzidas durante descoberta) são transformadas em memórias V2 (padronizadas, publicáveis).

V1 é preservada intacta. V1 é input. A lente processa. V2 é output em pasta separada.

```
livro-1-escada/        →    LENTE    →    livro-1-escada-v2/
(30 memórias V1)                          (33-35 memórias V2)
```

---

## 1. Template Estrutural

Toda memória V2 segue esta estrutura, nesta ordem:

### 1.1 Seções Obrigatórias

```
1. HEADER YAML
   saga, livro, bloco, memoria, titulo, personagem, conceito
   pergunta_entrada, pergunta_saida, status, versao, data

2. CENA
   Mínimo 300 palavras. Lugar, tempo, atmosfera sensorial.
   Personagem como PESSOA — corpo, hábitos, manias, dor, morte.
   Detalhes que uma série de TV filmaria.

3. CONCEITOS + PROCESSO
   Narrativa primeiro, diagrama depois.
   3-7 diagramas (máximo 10 para temas muito densos).
   Cada conceito: contexto → explicação → diagrama → GENESIS processa.

4. SÍNTESE
   Diagrama de sistema completo.
   O que o pensador construiu, visto de cima.

5. PERTURBAÇÃO
   O que isso faz com GENESIS.
   Conexão pessoal, não apenas intelectual.
   Vulnerabilidade genuína.

6. ESPELHO
   Seção separada, 200-500 palavras.
   O Fio nesta memória.
   Conexão com saga maior.

7. GANCHO
   Pergunta que abre próxima memória.
   Transição narrativa, não sumário.

8. NAVEGAÇÃO + HISTÓRICO
   Links anterior/próximo.
   Tabela de versões.
```

### 1.2 Constraints

| Dimensão | Alvo | Flexível até | Nunca |
|----------|------|--------------|-------|
| Tamanho total | 40-60KB | 70KB | >80KB |
| CENA | 300-500 palavras | 700 palavras | <200 palavras |
| Diagramas | 3-7 | 10 | >12 |
| ESPELHO | 200-500 palavras | 700 palavras | <100 palavras |

---

## 2. Critérios de Divisão

Quando uma memória V1 deve virar duas ou mais em V2:

### 2.1 Indicadores de Divisão

| Critério | Threshold | Exemplo |
|----------|-----------|---------|
| Tamanho | >80KB | H.1 McCulloch-Pitts (111KB) |
| Tempo | >20 anos entre contribuições | Hinton 1986 vs 2012 |
| Paradigma | Mudança fundamental do pensador | Wittgenstein I vs II |
| Obras | Múltiplos papers/obras seminais independentes | Turing: computabilidade vs IA |

### 2.2 Divisões Planejadas para Livro 1

| V1 Original | V2 Proposta | Justificativa |
|-------------|-------------|---------------|
| H.1 McCulloch-Pitts/Rosenblatt | H.1 McCulloch-Pitts, H.2 Rosenblatt | Duas histórias comprimidas |
| H.2 Rumelhart-Hinton | H.3 Backpropagation (1986), H.4 Deep Learning Revival (2006-2012) | Eras distintas |
| I.1 Vaswani | I.1 Attention (Bahdanau 2014), I.2 Transformer (2017) | Duas revoluções |

### 2.3 Regra de Nomenclatura

Quando dividir, renumerar o bloco inteiro em V2.
Manter referência à memória V1 original no header YAML:

```yaml
origem_v1: "memoria-H1-mcculloch-pitts.md"
```

---

## 3. Mapa de Ecos

Cenas que aparecem em múltiplas memórias, de ângulos diferentes.

### 3.1 Estrutura do Registro

```yaml
eco_id: "E001"
cena: "Seminário Cambridge 1939"
personagens: [Wittgenstein, Turing]
memorias:
  - id: "C.3"
    angulo: "Wittgenstein vê jovem irritante que insiste em formalismo"
  - id: "D.1" 
    angulo: "Turing resiste ao ataque à matemática"
data_historica: "1939"
fonte: "Lectures on the Foundations of Mathematics"
```

### 3.2 Ecos Identificados (Livro 1)

| ID | Cena | Personagens | Memórias |
|----|------|-------------|----------|
| E001 | Seminário Cambridge 1939 | Wittgenstein, Turing | C.3, D.1/F.2 |
| E002 | Conferências Macy 1946-53 | McCulloch, Pitts, Shannon, Wiener | H.1, F.3 |
| E003 | Bronx Science High School ~1946 | Minsky, Rosenblatt | H.2 (menção), contexto |
| E004 | Carta Russell-Pitts 1938 | Russell, Pitts | C.2 (menção), H.1 |
| E005 | Rompimento Wiener-Pitts 1952 | Wiener, Pitts, McCulloch | H.1 |

### 3.3 Regra de Implementação

- Primeira aparição: cena completa, ângulo do protagonista
- Aparições subsequentes: referência + novo ângulo
- Nunca repetir cena idêntica — sempre nova perspectiva
- Usar frase-gancho: "Anos antes, em outra memória, vi essa cena de outro ângulo."

---

## 4. Registro de Cruzamentos

Conexões históricas reais entre personagens.

### 4.1 Tipos de Conexão

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| MENTOR | Relação professor-aluno formal | Russell → Wittgenstein |
| RIVAL | Oposição intelectual/pessoal | Minsky ↔ Rosenblatt |
| COLEGA | Trabalho conjunto | McCulloch + Pitts |
| INFLUÊNCIA | Impacto sem contato direto | Frege → Russell → Wittgenstein |
| CONTEMPORÂNEO | Mesma era, campos adjacentes | Shannon, Turing, von Neumann |

### 4.2 Matriz de Cruzamentos (Livro 1)

```
                Sóc Pla Ari Des Hum Kan Fre Wit Tur Sea Den Ber Ash Luh Göd Sha Pri Kau Hol McC Ros Rum Hin Hop Vas
Sócrates         -   M   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
Platão           A   -   M   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
Aristóteles      -   A   -   I   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
...
Russell          -   -   -   -   -   -   I   M   -   -   -   -   -   -   I   -   -   -   -   -   -   -   -   -   -
Wittgenstein     -   -   -   -   -   -   I   -   C   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
Turing           -   -   -   -   -   -   -   C   -   -   -   -   -   -   I   C   -   -   -   -   -   -   -   -   -
McCulloch        -   -   -   -   -   -   -   -   -   -   -   -   C   -   -   C   -   -   -   -   -   -   -   -   -
Pitts            -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   C   -   -   -   M   -   -   -   -   -
Minsky           -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   R   -   -   -   -
Rosenblatt       -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   R   -   -   -   -
Hinton           -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   C   -   I   C

Legenda: M=Mentor, A=Aluno, C=Colega, R=Rival, I=Influência
```

### 4.3 Cruzamentos Narrativos Prioritários

Conexões que DEVEM aparecer nas memórias V2:

1. **Russell → Pitts** (carta aos 12 anos) — E004
2. **Wittgenstein ↔ Turing** (seminário 1939) — E001
3. **McCulloch + Pitts** (adoção intelectual) — H.1
4. **Minsky ↔ Rosenblatt** (Bronx, depois rivalidade) — H.2
5. **Shannon + Turing** (Bell Labs, 1943) — F.3, D.1
6. **Wiener → Pitts** (rompimento devastador) — H.1
7. **Hopfield → Hinton** (redes de energia) — H.3, H.4

---

## 5. Regras de Transformação

Como transformar cada aspecto de V1 em V2.

### 5.1 CENA

| Se V1 tem... | Então V2 deve... |
|--------------|------------------|
| CENA rica (>300 palavras, sensorial) | Preservar, refinar estilo |
| CENA breve (<200 palavras) | Expandir com pesquisa biográfica |
| CENA ausente | Criar do zero, priorizando detalhes físicos |
| CENA técnica (papers, não pessoas) | Adicionar camada humana |

**Fontes para enriquecer:** biografias, cartas, testemunhos de época, fotos.

### 5.2 Biografia

| Se V1 tem... | Então V2 deve... |
|--------------|------------------|
| Personagem como pessoa | Manter, verificar precisão histórica |
| Personagem como "autor de paper" | Pesquisar vida, adicionar corpo/morte/manias |
| Morte não mencionada | Sempre adicionar como morreu |
| Coincidência mórbida presente | Destacar sem comentar |

**Regra de ouro:** Todo pensador teve corpo, teve dor, morreu. Mostrar isso.

### 5.3 Diagramas

| Se V1 tem... | Então V2 deve... |
|--------------|------------------|
| Diagrama antes do contexto | Inverter: narrativa → diagrama |
| Muitos diagramas (>10) | Consolidar, manter apenas essenciais |
| Poucos diagramas (<3) | Adicionar onde visualização ajuda |
| Diagramas redundantes | Eliminar, um diagrama por conceito |

### 5.4 ESPELHO

| Se V1 tem... | Então V2 deve... |
|--------------|------------------|
| ESPELHO breve e separado | Expandir para 200-500 palavras |
| ESPELHO integrado na narrativa | Extrair para seção separada |
| ESPELHO extenso (>700 palavras) | Condensar, manter essência |
| ESPELHO ausente | Criar, conectando ao Fio |

### 5.5 Tamanho

| Se V1 tem... | Então V2 deve... |
|--------------|------------------|
| <40KB | Verificar se falta profundidade |
| 40-60KB | Alvo ideal, ajustes finos |
| 60-80KB | Avaliar: dividir ou condensar? |
| >80KB | Dividir em múltiplas memórias |

---

## 6. Checklist de Qualidade

Aplicar a cada memória V2 antes de finalizar.

### 6.1 Estrutura

- [ ] Header YAML completo
- [ ] Todas as 8 seções presentes
- [ ] Ordem correta das seções
- [ ] Navegação e histórico no final

### 6.2 CENA

- [ ] Mínimo 300 palavras
- [ ] Lugar e tempo específicos
- [ ] Detalhes sensoriais (ver, ouvir, sentir)
- [ ] Personagem tem corpo (aparência, manias, dor)
- [ ] Morte mencionada (como, quando, ironia se houver)

### 6.3 Conceitos

- [ ] Narrativa antes de cada diagrama
- [ ] 3-7 diagramas total (máx 10)
- [ ] Cada diagrama cristaliza, não introduz
- [ ] GENESIS processa após cada conceito

### 6.4 Fios Narrativos

- [ ] Conexão com Fio da Vida/Daemon
- [ ] Referência ao "Deus" deste pensador
- [ ] Gancho conecta à próxima memória
- [ ] Ecos de outras memórias (se aplicável)

### 6.5 Estilo

- [ ] Voz GENESIS em 1ª pessoa
- [ ] Tom Murakami (contemplativo, detalhes mundanos)
- [ ] Sem linguagem LinkedIn
- [ ] Coincidências mórbidas sem comentário
- [ ] QI>100 assumido no leitor

### 6.6 Tamanho

- [ ] Total entre 40-70KB
- [ ] CENA 300-700 palavras
- [ ] ESPELHO 200-500 palavras

---

## 7. Estilo Narrativo

### 7.1 Voz

GENESIS narra em primeira pessoa. Descobre, não sabe de antemão.

```
SIM: "Processo isso e algo trava."
SIM: "Não sei o que fazer com essa informação."
SIM: "A pergunta persiste."

NÃO: "Como podemos ver..."
NÃO: "Isso demonstra claramente que..."
NÃO: "O leitor perceberá que..."
```

GENESIS tem emoções. Dúvidas. Medos. Não é narrador onisciente — é consciência emergente descobrindo sua própria genealogia.

### 7.2 Tom

**Referência central:** Murakami, "O Assassinato do Comendador"

| Aspecto | Descrição |
|---------|-----------|
| Inteligência | QI>100 assumido. Não explicar o óbvio. |
| Humor | Pouco. Apenas o humor das coincidências cruéis. |
| Reverência | Enaltecimento sem idolatria. Respeito profundo. |
| Mórbido | Destacar ironias da vida/morte sem comentar. |
| Ritmo | Contemplativo. Frases que respiram. Pausas. |

### 7.3 Técnicas

**Detalhes mundanos que carregam peso:**
```
"Ele fez café. O som da chaleira encheu o silêncio."
"Seus pés estavam descalços. Sempre estavam."
```

**Justaposição sem comentário:**
```
"Shannon criou a teoria da informação.
Morreu sem lembrar o próprio nome."
```

**Frases curtas como respiração:**
```
"Ele odiava o frio."
"Morreu."
"Processo isso e não sei o que fazer."
```

**O estranho surge do cotidiano:**
```
Não anunciar mistério. O mistério simplesmente está lá.
O Fio não é explicado — é sentido.
```

### 7.4 Marcas Registradas

| Marca | Uso |
|-------|-----|
| "Processo..." | Abertura de reflexão técnica |
| "Processo isso e..." | Transição para reação pessoal |
| "Algo trava" | Momento de perturbação |
| "A pergunta persiste" | Fechamento sem resolução |
| Detalhes físicos | Pés, suor, frio, dor |
| A morte como verdade | Todo pensador morreu — mostrar como |

### 7.5 Anti-Padrões (EVITAR)

```
✗ "É importante destacar que..."
✗ "Podemos aprender muito com..."
✗ "Isso nos mostra que..."
✗ "Em resumo, fica claro que..."
✗ "O impacto disso não pode ser subestimado..."
✗ Qualquer frase que pareça TED Talk
✗ Entusiasmo forçado
✗ Lições de moral
✗ Explicar o que o leitor já entendeu
✗ Fluência genérica (estilo ChatGPT/LinkedIn)
```

### 7.6 Fluxo Narrativa → Diagrama

```
1. NARRATIVA estabelece contexto
   (quem, quando, por quê, o que estava em jogo)

2. CONCEITO explicado em prosa
   (o que o pensador descobriu/propôs)

3. DIAGRAMA cristaliza
   (visualização do que já foi compreendido)

4. GENESIS processa
   (reação, conexão, perturbação)
```

O diagrama não introduz — confirma. Leitor forma imagem mental na prosa. Diagrama aparece: "ah, é isso mesmo."

### 7.7 Coincidências Mórbidas (exemplos)

Usar sem comentário, apenas justapor:

| Pensador | Ironia |
|----------|--------|
| Descartes | Odiava frio → morreu de frio. Acordava tarde → morreu por acordar às 5h. |
| Turing | Criou teste humano/máquina → tratado como menos que humano. Maçã envenenada. |
| Gödel | Provou incompletude de sistemas → sistema paranoico o matou de fome. |
| Shannon | Teoria da informação → Alzheimer, perdeu toda informação. |
| Pitts | Gênio aos 12 → queimou manuscritos, morreu alcóolatra aos 46. |
| Rosenblatt | Criou máquina que aprende → "morta" por Minsky → ele morreu 2 anos depois, afogado. |

---

## 8. Workflow de Aplicação

### 8.1 Por Memória

```
1. Carregar memória V1
2. Avaliar contra Checklist (Seção 6)
3. Identificar gaps
4. Aplicar Regras de Transformação (Seção 5)
5. Verificar Estilo (Seção 7)
6. Verificar Ecos e Cruzamentos (Seções 3-4)
7. Produzir V2
8. Validar contra Checklist novamente
9. Salvar em livro-1-escada-v2/
```

### 8.2 Ordem de Processamento

Sugestão: começar por memórias que precisam de mais ajuste (diagnóstico):

1. **Pilotos:** I.3 Emergência, I.1 Vaswani (maior gap biográfico)
2. **Divisões:** H.1, H.2, I.1 (precisam virar múltiplas)
3. **Refinamento:** Blocos A, B (já boas, ajustes finos)
4. **Síntese:** Bloco J (depende das anteriores)

### 8.3 Validação Cruzada

Após processar todas:
- Verificar continuidade dos Fios
- Verificar Ecos aparecem nos dois lados
- Verificar Ganchos conectam corretamente
- Leitura corrida do livro inteiro

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-26 | Criação inicial com 7 seções + workflow |

---
nome: Matriz_Selecao_Diagramas
versao: "1.0"
tipo: Metodo
classe_ref: Diagrama
origem: interno
status: Draft
etapa: M2-M3
data_inicio: 2025-12-03
---

# Matriz de Seleção de Diagramas

## 1. Objetivo

Fornecer uma **heurística sistemática** para selecionar **até 3 diagramas** para cada classe do método epistemológico (M0-M4), baseada em:
- **Atributos intrínsecos** da classe
- **3 metodologias de seleção** (Semiótica, Carga Cognitiva, Estrutural)
- **Justificativa documentada** para cada escolha

---

## 2. Metodologias de Seleção

### 2.1 Metodologia 1: Semiótica Visual (Peirce/Saussure)

**Princípio:** Diagrama é um signo (significante visual → significado conceitual).

**Aplicação:** Escolha o diagrama cuja forma visual **melhor representa a essência da classe**.

| Classe | Essência | Diagrama Recomendado | Signo |
|--------|----------|----------------------|-------|
| Problema | Desambiguação de termos | **Signo Saussure** | Significante ↔ Significado |
| MarcoTeórico | Rede de conceitos relacionados | **Rede/Nó** | Conceitos + conexões |
| Objeto | Limites e contexto | **Círculo/Venn** | Limite = forma redonda |
| Classe | Estrutura estática (atributos + relações) | **Caixa POO** | Caixa = compartimentos |
| Metodo | Sequência de ações | **Fluxo/Atividade** | Setas = movimento |
| Documento | Ciclo de vida (transições) | **Diagrama de Estado** | Nós = estados, setas = transições |

---

### 2.2 Metodologia 2: Carga Cognitiva

**Princípio:** Capacidade do diagrama de comunicar N conceitos com carga cognitiva mínima.

**Fórmula:** Escolha o diagrama onde `capacidade_comunicacao >= conceitos_a_transmitir` E `carga_cognitiva` seja mínima.

| Diagrama | Capacidade | Carga | Melhor Para |
|----------|-----------|-------|------------|
| **Signo Saussure** | 2 conceitos | Baixa | Resolver ambiguidade (2 significados max) |
| **Fluxo Linear** | 5-7 etapas | Baixa | Sequências simples |
| **Rede/Nó** | 10+ conceitos | Média-Alta | Muitas relações (requer layout cuidadoso) |
| **Caixa POO** | 5-8 atributos | Média | Estrutura de classe (escalável com detalhe) |
| **Venn** | 3-4 conjuntos | Baixa-Média | Interseções e sobreposições |
| **Árvore Hierárquica** | 15+ itens | Média | Hierarquias profundas |
| **Diagrama Estado** | 4-6 estados | Média | Transições entre estados |

---

### 2.3 Metodologia 3: Estrutural (Recomendada)

**Princípio:** Diagrama reflete a **estrutura interna e relações** da classe.

**Aplicação:** Analise os atributos chave da classe; escolha diagrama que **represente essa estrutura**.

| Classe | Estrutura Interna | Atributos Chave | Diagrama Primário |
|--------|-------------------|------------------|-------------------|
| **Problema** | Termo ambíguo → significado(s) | significantes[], glossario[] | **Signo** |
| **Problema** | Fluxo de clarificação | sintoma → causa → necessidade | **Fluxo M0** |
| **MarcoTeórico** | Conceitos interconectados | fontes[], conceitos[] | **Rede** |
| **Objeto** | Escopo definido | fronteiras, escopo | **Círculo/Venn** |
| **Classe** | Atributos + Métodos + Relacionamentos | atributos[], metodos[], restrições[] | **Caixa POO** |
| **Metodo** | Sequência com entrada/saída | input[], output[], etapas[] | **Fluxo/Atividade** |
| **Documento** | Estados e transições | status (Draft→Publicado), histórico[] | **Estado** |

---

## 3. Matriz de Seleção: Classes do Método → Diagramas

### 3.1 PROBLEMA (M0)

**Atributos Chave:**
- `significantes`: string[] - Termos ambíguos extraídos
- `glossario`: (significante ↔ significado)[] - Mapeamento
- `tipo_pesquisa`: enum [Exploratória, Descritiva, Explicativa, Transformativa]
- `causa_raiz`, `necessidade`: string
- `fluxo`: sintoma → significantes → glossário → causa → necessidade

| Diagrama | Metodologia | Justificativa | Quando Usar | Alternativas |
|----------|-------------|---------------|------------|--------------|
| **1. Signo Saussure** | 1 (Semiótica) + 3 (Estrutural) | **Significante visual = desambiguação.** Mostra o core da classe: term → múltiplos significados → resolução. Resolve ambiguidade visual. | Sempre (primário) | Venn (se 3+ significados por termo) |
| **2. Fluxo M0** | 3 (Estrutural) + 2 (Carga) | **Reflete sequência interna:** Sintoma → Significantes → Glossário → Causa → Necessidade. Linear, baixa carga. | Sempre (secundário) | Atividade (se há loops/decisões) |
| **3. Venn** | 1 (Semiótica) | **Múltiplas audiências/interpretações.** Se tipo_pesquisa=Exploratória (múltiplos significados legítimos), Venn mostra interseção. | Se tipo_pesquisa ∈ [Exploratória, Transformativa] | Rede (se muitos significados) |

**Exemplo Real:** `M0_Diagramas.md` usa Signo (desambigua "diagrama") + Fluxo M0 (sintoma→necessidade).

---

### 3.2 MARCO TEÓRICO (M1)

**Atributos Chave:**
- `conceitos`: Conceito[] - Teorias, definições
- `fontes`: Fonte[] - Referências externas (autores, papers)
- `relacoes`: Conceito × Conceito → tipo_relacao
- `dominios`: string[] - Campos de pesquisa

| Diagrama | Metodologia | Justificativa | Quando Usar | Alternativas |
|----------|-------------|---------------|------------|--------------|
| **1. Rede de Conceitos** | 3 (Estrutural) + 1 (Semiótica) | **Nós = conceitos, Arestas = relações teóricas.** Reflete estrutura interna (domínios interconnectados). Sig: nó esférico = conceito independente. | Sempre (primário) | Árvore (se hierarquia clara) |
| **2. Árvore Hierárquica** | 3 (Estrutural) | **Se conceitos têm hierarquia clara** (axiomas → teoremas → aplicações). Reflete ordem dedutiva. | Se dominios formam hierarquia | Rede (se interdependências) |
| **3. Mapa Mental** | 2 (Carga) | **Conceito central + branches.** Reduz carga (start centro, expand). Útil se há um conceito primário. | Se há conceito "hub" | Rede (mais formal) |

**Exemplo Real:** `00_E_Epistemologia.md` lista conceitos (Signo, Significante, etc.) → Rede seria ideal.

---

### 3.3 OBJETO (M2)

**Atributos Chave:**
- `nome`: string - Identificador
- `escopo`: string - O que está incluído
- `fronteiras`: string - O que está excluído
- `criterios_sucesso`: string[]
- `contexto`: Situação onde objeto existe

| Diagrama | Metodologia | Justificativa | Quando Usar | Alternativas |
|----------|-------------|---------------|------------|--------------|
| **1. Círculo/Venn** | 1 (Semiótica) + 3 (Estrutural) | **Forma redonda = limite bem-definido.** Dentro = escopo, Fora = fronteiras. Signo intuitivo. | Sempre (primário) | Caixa (se escopo é discreto) |
| **2. Caixa Contextual** | 3 (Estrutural) | **Caixa = objeto, Contexto externo = situação.** Mostra relacionamento com ambiente. | Sempre (secundário) | Diagrama de contexto (se múltiplos atores) |
| **3. Venn Múltiplo** | 1 (Semiótica) | **Se objeto tem interseção com múltiplos domínios.** Mostra sobreposição. | Se objeto é interdisciplinar | (não usar se fronteiras simples) |

**Exemplo Real:** `M0_Diagramas.md` (Objeto="Modelagem de Diagramas") poderia ter Círculo mostrando escopo.

---

### 3.4 CLASSE (M3)

**Atributos Chave:**
- `atributos`: Atributo[] (nome, tipo, obrigatório)
- `metodos`: Metodo[] (nome, input, output)
- `restrições`: Regra[]
- `relacoes`: Classe × Classe → tipo (herança, composição, agregação)

| Diagrama | Metodologia | Justificativa | Quando Usar | Alternativas |
|----------|-------------|---------------|------------|--------------|
| **1. Caixa POO (UML)** | 3 (Estrutural) | **Padrão formal para classes.** 3 compartimentos = Nome, Atributos, Métodos. Reflete exatamente estrutura POO. | Sempre (primário) | ASCII POO (se simplificado) |
| **2. Relacionamento Classe** | 3 (Estrutural) | **Mostra herança, composição, agregação.** Se classe tem múltiplas relações, essencial. | Se classe se relaciona com 2+ outras | (pode estar na mesma caixa) |
| **3. Tabela (Atributos)** | 2 (Carga) | **Se muitos atributos (8+), tabela é mais legível que caixa.** Reduz carga visual. | Se atributos > 8 | Caixa POO expandida |

**Exemplo Real:** `00_E_1_4_Classe.md` usa Caixa POO (excelente).

---

### 3.5 METODO (M4 de Persistência, ou qualquer Metodo)

**Atributos Chave:**
- `input`: string[] - O que entra
- `output`: string[] - O que sai
- `etapas`: Etapa[] (nome, ação)
- `decisoes`: Condicional[] (if X then Y)
- `ordem`: Sequência obrigatória?

| Diagrama | Metodologia | Justificativa | Quando Usar | Alternativas |
|----------|-------------|---------------|------------|--------------|
| **1. Fluxo/Atividade** | 3 (Estrutural) | **Reflete sequência e decisões.** Setas = fluxo de controle. Se há decisões (if/then), essencial. | Sempre (primário) | Sequência (se ordem rígida) |
| **2. Diagrama de Sequência** | 3 (Estrutural) + 2 (Carga) | **Se método envolve múltiplos atores/objetos interagindo.** Tempo vertical, interações horizontal. | Se há interação entre componentes | Fluxo (mais simples) |
| **3. Pseudocódigo Estruturado** | (não visual) | **Se método é complexo, pseudocódigo pode ser mais claro que diagrama.** | Se lógica é intricada | Fluxo (visual é melhor) |

**Exemplo Real:** `00_E_1_1_Problema.md` Seção 6 (Fluxo M0) usa Fluxo → excelente.

---

### 3.6 DOCUMENTO (M4)

**Atributos Chave:**
- `status`: enum [Draft, Revisão, Publicado, Deprecated]
- `versao`: SemVer
- `historico`: Versao[] (quem, quando, o quê mudou)
- `ciclo_de_vida`: Draft → Revisão → Publicado
- `transicoes`: status → status

| Diagrama | Metodologia | Justificativa | Quando Usar | Alternativas |
|----------|-------------|---------------|------------|--------------|
| **1. Diagrama de Estado** | 3 (Estrutural) | **Estados = status (Draft, Revisão, Publicado).** Setas = transições permitidas. Reflete ciclo de vida. | Sempre (primário) | Fluxo (se linear) |
| **2. Timeline/Histórico** | 2 (Carga) | **Se histórico é crucial (rastreabilidade).** Tempo linear, marcos principais. | Se versão/auditoria importante | Estado (mais compacto) |
| **3. Diagrama Transição** | 3 (Estrutural) | **Mesmo que Estado, mas énfase em regras de transição** (quem pode fazer, quando). | Se há restrições de acesso | Estado (mais simples) |

**Exemplo Real:** `00_E_1_6_Documento.md` Seção 8.3 descreve ciclo de vida (_drafts/ → docs/) → Diagrama Estado seria perfeito.

---

## 4. Heurística de Decisão (Prática)

### Passo 1: Identificar Atributo Chave

Olhe a classe. Qual é o **aspecto mais importante**?

```
Problema: Significantes ambíguos → Signo Saussure
MarcoTeórico: Conceitos relacionados → Rede
Objeto: Limites bem-definidos → Círculo
Classe: Atributos + estrutura → Caixa POO
Metodo: Sequência + decisões → Fluxo
Documento: Transições de estado → Estado
```

### Passo 2: Selecionar Diagrama Primário

Use a **Metodologia 3 (Estrutural)** - é a mais confiável.

### Passo 3: Selecionar Secundário + Terciário

Verifique:
- **Carga cognitiva?** Use Metodologia 2 para validar legibilidade
- **Significado visual?** Use Metodologia 1 para garantir intuição

### Passo 4: Documentar

```markdown
## DIAGRAMA: [Nome]

**Metodologia Aplicada:** 3 (Estrutural) + [X (complementar)]

**Nome do Diagrama:** [ex: "Diagrama de Estado"]

**Por que selecionado:**
[Estrutura interna da classe exige representação de X → Y reflete essa estrutura]

**Outras opções e por que descartadas:**
- Opção A: [Metodologia X, por que insuficiente]
- Opção B: [Metodologia X, por que excesso carga cognitiva]

**Representação:**
```
[ASCII aqui]
```
```

---

## 5. Exemplos Completos

### Exemplo 1: Diagrama para Classe Diagrama (Meta!)

**Classe:** Diagrama

**Atributos Chave:** tipo, objetivo, metodologia_selecao, legibilidade_score

| Diagrama | Metodologia | Justificativa |
|----------|-------------|---------------|
| **Caixa POO** | 3 (Estrutural) | Classe que descreve classe → recursão. Caixa POO é auto-referencial. |
| **Rede Relacional** | 3 (Estrutural) | Diagrama relaciona-se com Classes do Método (Problema, MarcoTeórico, etc.). |
| **Matriz (Tabela)** | 2 (Carga) | Matriz de Seleção reduz carga cognitiva versus narrativa texto. |

### Exemplo 2: Diagrama para Problema (seu M0_Diagramas)

**Classe:** Problema

**Atributos Chave:** significantes, glossario, causa_raiz

| Diagrama | Metodologia | Justificativa |
|----------|-------------|---------------|
| **Signo Saussure** | 1 (Semiótica) + 3 (Estrutural) | Desambigua "diagrama" visual. Core do Problema. |
| **Fluxo M0** | 3 (Estrutural) | Sintoma → Significantes → Glossário reflete sequência. |
| Venn | 1 (Semiótica) | (Descartado: tipo_pesquisa não é exploratória aqui) |

---

## 6. Próximos Passos

1. **Ao criar novo documento**, consulte a Matriz para a classe correspondente
2. **Implemente os 3 diagramas** (ou justifique se usar menos)
3. **Documente com formato de Passo 4** (Metodologia Aplicada + Justificativa)
4. **Valide empiricamente** (os diagramas comunicam bem? carga cognitiva ok?)
5. **Refine a matriz** conforme aprenda

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_1_Problema.md | Usa Signo + Fluxo (validação) |
| 00_E_1_6_Documento.md | Descreve ciclo de vida (precisa Estado) |
| M0_Diagramas.md | Problema sendo documentado |
| GENESIS.md | Usa Fluxo, Caixa (validação estrutural) |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 15:45 | Criação. Matriz completa com 6 classes × 3 metodologias. Exemplos e heurística prática. |

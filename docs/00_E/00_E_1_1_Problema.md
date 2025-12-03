---
nome: 00_E_1_1_Problema
versao: "2.1"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_1_Problema

## 1. Definição

Problema é a classe que estrutura o ponto de partida do método epistemológico (M0). Transforma sintomas vagos em necessidades claras e acionáveis através de análise semiótica dos termos utilizados.

O output de M0 (Problema Definido) serve como filtro de escopo para M1 (Marco Teórico): quanto mais preciso o Problema, menor o universo de pesquisa e maior a relevância dos conceitos levantados.

---

## 2. Marco Teórico

| Conceito | Definição | Aplicação em M0 |
|----------|-----------|-----------------|
| **Signo** | Unidade básica de significação, composta por significante + significado (Saussure) | Cada termo do sintoma é um signo a ser analisado |
| **Significante** | A forma, palavra ou expressão utilizada | Os termos que aparecem na descrição do sintoma |
| **Significado** | O conceito ou ideia por trás da forma | O que o termo realmente quer dizer no contexto |
| **Ambiguidade** | Quando um significante tem múltiplos significados possíveis | Fonte de mal-entendidos que M0 deve resolver |

**Diagrama: Signo** (Metodologia: 1-Semiótica)

```
┌─────────────────────────────────┐
│            SIGNO                │
├────────────────┬────────────────┤
│  SIGNIFICANTE  │   SIGNIFICADO  │
│    (forma)     │   (conceito)   │
│                │                │
│   "problema"   │  dificuldade?  │
│    palavra     │  obstáculo?    │
│                │  oportunidade? │
└────────────────┴────────────────┘
         │
         ▼
   Análise M0 define
   qual significado
```

### Nota de Evolução

Para casos complexos com múltiplas personas/stakeholders, existe aprofundamento possível com os conceitos de Langue (vocabulário do domínio) e Parole (forma individual de expressão). Adicionar quando necessário.

---

## 3. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único do problema |
| sintoma | string | Sim | Manifestação observável do problema |
| significantes | string[] | Sim | Termos-chave extraídos do sintoma |
| glossario | Glossario[] | Sim | Mapeamento significante → significado |
| causa_raiz | string | Sim | Origem fundamental do sintoma |
| tentativas_anteriores | string[] | Não | Soluções já tentadas |
| necessidade | string | Sim | O que é necessário para resolver |
| contexto | string | Não | Situação onde o problema ocorre |
| impacto | string | Não | Consequências de não resolver |
| frontmatter | Frontmatter | Sim | Metadados YAML |

### Glossario (subtipo)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| significante | string | Termo extraído do sintoma |
| significado | string | Definição no contexto do problema |
| ambiguidade | string | Outros significados possíveis (se houver) |

**Diagrama: Caixa POO** (Metodologia: 3-Estrutural)

```
┌─────────────────────────────────────────────────────────────────┐
│                          PROBLEMA                               │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                                                 │
│  - sintoma: string                                              │
│  - significantes: string[]                                      │
│  - glossario: Glossario[]                                       │
│  - causa_raiz: string                                           │
│  - tentativas_anteriores: string[]                              │
│  - necessidade: string                                          │
│  - contexto: string                                             │
│  - impacto: string                                              │
│  - frontmatter: Frontmatter                                     │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - sintoma não é causa (observável vs origem)                   │
│  - necessidade deve ser acionável                               │
│  - causa_raiz deve explicar o sintoma                           │
│  - todo significante deve ter significado mapeado               │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + extrair_significantes(sintoma): string[]                     │
│  + mapear_significados(significantes): Glossario[]              │
│  + detectar_ambiguidades(glossario): string[]                   │
│  + validar(): bool                                              │
│  + gerar_marco_teorico(): MarcoTeorico                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Restrições

- Sintoma deve ser observável (não abstrato)
- Causa raiz deve explicar logicamente o sintoma
- Necessidade deve ser acionável (verbo no infinitivo)
- Tentativas anteriores documentam o que já foi testado
- Todo significante extraído deve ter significado mapeado no glossário
- Ambiguidades identificadas devem ser resolvidas antes de avançar para M1

---

## 5. Fluxo (M0)

**Diagrama: Fluxo** (Metodologia: 3-Estrutural)

```
Sintoma (texto livre)
       │
       ▼
┌─────────────────────┐
│ Extrair Significantes│ ──► Lista de termos-chave
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Mapear Significados │ ──► Tabela significante → significado
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Detectar Ambiguidade│ ──► Termos com múltiplos significados
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Alinhar/Resolver   │ ──► Glossário validado
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Definir Causa Raiz │ ──► Origem do sintoma
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Definir Necessidade │ ──► Ação para resolver
└─────────────────────┘
       │
       ▼
Problema Definido (input para M1)
```

---

## 6. INSTRUÇÃO: Como definir um Problema

### 6.1 Fontes de Input

| Tipo | Exemplo | Processamento |
|------|---------|---------------|
| Áudio | Gravação de reunião, voice memo | Transcrever → extrair sintoma |
| Texto | Email, mensagem, descrição livre | Identificar sintoma no texto |
| Arquivo | Documento, relatório, ticket | Localizar seção com sintoma |
| Conversa | Diálogo com usuário | Perguntar até sintoma emergir |

### 6.2 Método de Extração (IA)

**Passo 1: Capturar sintoma bruto**
- Se áudio: transcrever e identificar reclamação/dor
- Se texto/arquivo: localizar trecho que descreve o problema
- Se conversa: perguntar "O que está acontecendo de errado?"

**Passo 2: Extrair significantes**
- Identificar termos-chave no sintoma bruto
- Listar palavras que podem ter múltiplos significados

**Passo 3: Mapear significados**
- Para cada significante, perguntar ou inferir: "O que X significa neste contexto?"
- Registrar ambiguidades encontradas

**Passo 4: Resolver ambiguidades**
- Se houver dúvida, perguntar ao usuário
- Alinhar significante → significado único

**Passo 5: Completar definição**
- Identificar causa raiz: "Por que isso acontece?"
- Definir necessidade: "O que precisa para resolver?"
- Registrar tentativas anteriores: "O que já tentou?"

### 6.3 Diagrama

Ver **00_E_1_4_1_Diagrama.md** para método de seleção.

**Diagramas recomendados para Problema (M0):**
- Primário: **Signo** (desambiguação de termos)
- Secundário: **Fluxo** (sequência sintoma → necessidade)

### 6.4 Template de Output

```markdown
| Campo | Valor |
|-------|-------|
| **sintoma** | [extraído da fonte] |
| **significantes** | [termo1, termo2, termo3] |
| **causa_raiz** | [identificada no processo] |
| **tentativas_anteriores** | [se houver] |
| **necessidade** | [ação para resolver] |

### Glossário

| Significante | Significado | Ambiguidade |
|--------------|-------------|-------------|
| termo1 | [definição no contexto] | [resolvida: X] |
| termo2 | [definição no contexto] | - |
```

### 6.5 Checklist

- [ ] Fonte processada (áudio/texto/arquivo/conversa)
- [ ] Sintoma extraído
- [ ] Significantes identificados
- [ ] Cada significante tem significado mapeado
- [ ] Ambiguidades resolvidas
- [ ] Causa raiz identificada
- [ ] Necessidade é acionável
- [ ] Tentativas anteriores documentadas (se houver)
- [ ] Diagramas inseridos nas seções (Signo, Fluxo)

### 6.6 Persistência

**Ao finalizar M0, persistir o documento:**

1. Criar arquivo `M0_[Nome].md` em `_drafts/SPRINT/TXX/`
2. Preencher frontmatter com `etapa: M0`
3. Commit com mensagem: `[C3] add: M0 [Nome] - problema definido`

Ver: **00_E_1_6_Documento.md** (ciclo de vida e persistência)

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_4_1_Diagrama | Seleção de diagramas |
| 00_E_1_2_MarcoTeorico | Próximo (M1) |
| 00_E_1_6_Documento | Ciclo de vida (persistência) |

### Referências Externas

| Fonte | Conceito utilizado |
|-------|-------------------|
| Saussure, Ferdinand de. *Curso de Linguística Geral* (1916) | Signo, Significante, Significado |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | - | Criação. Classe base para M0 do framework epistemológico. |
| 2.0 | 2025-12-03 | 14:30 | Adiciona Marco Teórico (Saussure). Análise semiótica. Fluxo M0 expandido. Método de extração para múltiplas fontes. |
| 2.1 | 2025-12-03 | 22:45 | Adiciona instruções de diagrama (ref 00_E_1_4_1_Diagrama) e persistência ao final de M0. Reorganiza seções. |

---
nome: 00_E_1_2_MarcoTeorico
versao: "2.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_2_MarcoTeorico

## 1. Definição

MarcoTeórico é a etapa M1 do framework epistemológico que pesquisa conhecimento (interno e externo) para fundamentar a resolução do Problema definido em M0. Produz lista de conceitos operacionais articulados com fontes rastreáveis.

---

## 2. Diagrama

```
┌─────────────────────────────────────────────────────────────┐
│                      «class»                                │
│                    MarcoTeorico                             │
├─────────────────────────────────────────────────────────────┤
│ - nome: string                                              │
│ - problema_ref: Problema [1]                                │
│ - conceitos: Conceito [1..*]                                │
│ - fontes: Fonte [1..*]                                      │
│ - premissas: string [0..*]                                  │
│ - referencias_conceituais: ReferenciaConceitual [0..*]      │
│ - lacunas: string [0..*]                                    │
├─────────────────────────────────────────────────────────────┤
│ + pesquisarInterno(p: Problema): Conceito[]                 │
│ + pesquisarExterno(p: Problema): Conceito[]                 │
│ + sintetizar(c: Conceito[]): MarcoTeorico                   │
│ + validar(): boolean                                        │
│ + gerarObjeto(): Objeto                                     │
└─────────────────────────────────────────────────────────────┘
         │
         │ problema_ref [1]
         ▼
┌───────────────┐
│   Problema    │
│     (M0)      │
└───────────────┘
```

---

## 3. Atributos

| Atributo | Tipo | Card. | Obrig. | Descrição |
|----------|------|-------|--------|-----------|
| nome | string | 1 | Sim | Identificador único |
| problema_ref | Problema | 1 | Sim | Problema (M0) que fundamenta |
| conceitos | Conceito[] | 1..* | Sim | Conceitos extraídos (mín. 1) |
| fontes | Fonte[] | 1..* | Sim | Referências (mín. 1) |
| premissas | string[] | 0..* | Não | Suposições assumidas |
| referencias_conceituais | ReferenciaConceitual[] | 0..* | Não | Frameworks de apoio |
| lacunas | string[] | 0..* | Não | O que falta para M3 |

### 3.1 Conceito (subtipo)

| Atributo | Tipo | Card. | Obrig. | Descrição |
|----------|------|-------|--------|-----------|
| termo | string | 1 | Sim | Nome do conceito |
| definicao | string | 1 | Sim | Definição operacional |
| origem | enum | 1 | Sim | {interna, externa} |
| fonte_ref | Fonte | 1 | Sim | Referência da fonte |
| aplicacao | string | 0..1 | Não | Como usar no contexto |

### 3.2 Fonte (subtipo)

| Atributo | Tipo | Card. | Obrig. | Descrição |
|----------|------|-------|--------|-----------|
| titulo | string | 1 | Sim | Nome da fonte |
| tipo | enum | 1 | Sim | {Ontologia, Literatura, Paper, Framework, Web} |
| url | string | 0..1 | Não | Link externo |
| path | string | 0..1 | Não | Caminho interno |
| data_acesso | date | 0..1 | Não | Quando consultado |

### 3.3 ReferenciaConceitual (subtipo)

| Atributo | Tipo | Card. | Obrig. | Descrição |
|----------|------|-------|--------|-----------|
| nome | string | 1 | Sim | Nome do framework/teoria |
| descricao | string | 1 | Sim | O que é |
| aplicacao | string | 1 | Sim | Como se relaciona com ZAZ |
| fonte | string | 1 | Sim | Origem (autor, org, ano) |

---

## 4. Restrições

| Código | Restrição | Validação |
|--------|-----------|-----------|
| R1 | problema_ref obrigatório | Não existe M1 sem M0 |
| R2 | conceitos[] não vazio | Mínimo 1 conceito |
| R3 | Todo conceito tem definição | definicao != null |
| R4 | Toda fonte externa é verificável | url != null se tipo != Ontologia |
| R5 | Prioridade interna | pesquisarInterno() antes de pesquisarExterno() |
| R6 | Qualidade | Seletividade + Profundidade + Coerência + Rastreabilidade |

---

## 5. Métodos

### 5.1 pesquisarInterno(problema: Problema): Conceito[]

**Descrição:** Consulta ontologia interna antes de buscar externamente.

| Campo | Valor |
|-------|-------|
| Input | Problema (M0) com necessidade definida |
| Output | Lista de conceitos com origem=interna |
| Pré-condição | problema.necessidade != null |
| Pós-condição | Todos conceitos têm fonte_ref.tipo = Ontologia |

**Processo:**

```
┌─────────────────┐
│    Problema     │
│      (M0)       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Extrair termos-chave           │
│  (sintoma + necessidade)        │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Buscar em docs/00_O/           │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Extrair conceitos + definição  │
│  Criar Fonte (path)             │
│  Marcar origem = interna        │
└────────────────┬────────────────┘
                 │
                 ▼
         ┌──────────────┐
         │  Conceito[]  │
         └──────────────┘
```

---

### 5.2 pesquisarExterno(problema: Problema): Conceito[]

**Descrição:** Busca conhecimento comum quando interno não basta.

| Campo | Valor |
|-------|-------|
| Input | Problema (M0) + lacunas não cobertas |
| Output | Lista de conceitos com origem=externa |
| Pré-condição | pesquisarInterno() já executado |
| Pós-condição | Todos conceitos têm fonte_ref.url != null |

**Processo:**

```
┌─────────────────────────────────┐
│  Identificar lacunas            │
│  (não cobertas por interno)     │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Buscar: Literatura, Papers,    │
│  Web, Frameworks                │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│  Extrair conceitos + definição  │
│  Criar Fonte (url, data_acesso) │
│  Marcar origem = externa        │
└────────────────┬────────────────┘
                 │
                 ▼
         ┌──────────────┐
         │  Conceito[]  │
         └──────────────┘
```

---

### 5.3 sintetizar(conceitos: Conceito[]): MarcoTeorico

**Descrição:** Articula conceitos em sistema coerente.

| Campo | Valor |
|-------|-------|
| Input | Lista de conceitos (internos + externos) |
| Output | MarcoTeorico estruturado |
| Pré-condição | conceitos.length >= 1 |
| Pós-condição | MarcoTeorico.conceitos coerentes entre si |

**Processo:**
1. Agrupar conceitos por tema/relação
2. Verificar coerência (sem contradições)
3. Identificar premissas implícitas
4. Documentar referências conceituais
5. Listar lacunas restantes para M3

---

### 5.4 validar(): boolean

**Descrição:** Verifica qualidade do marco teórico.

| Critério | Pergunta |
|----------|----------|
| Seletividade | Todos conceitos conectam ao Problema? |
| Profundidade | Definições são operacionais? |
| Coerência | Conceitos formam sistema articulado? |
| Rastreabilidade | Todas fontes documentadas? |

---

### 5.5 gerarObjeto(): Objeto

**Descrição:** Produz input para M2.

| Campo | Valor |
|-------|-------|
| Input | MarcoTeorico validado |
| Output | Objeto para M2 |
| Pré-condição | validar() == true |

---

## 6. Fluxo Completo (M1)

```
┌─────────────────┐
│    Problema     │
│      (M0)       │
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│  pesquisarInterno()  │
└──────────┬───────────┘
           │
           ▼
    ┌────────────┐
    │  Lacunas?  │
    └──────┬─────┘
           │
    ┌──────┴──────┐
    │ Sim        │ Não
    ▼            │
┌──────────────────────┐
│  pesquisarExterno()  │─────┐
└──────────────────────┘     │
                             │
           ┌─────────────────┘
           │
           ▼
┌──────────────────────┐
│    sintetizar()      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     validar()        │
│  (S + P + C + R)     │
└──────────┬───────────┘
           │
    ┌──────┴──────┐
    │ OK         │ Falha
    ▼            ▼
┌────────────┐  ┌────────────┐
│gerarObjeto │  │ Retornar   │
│   → M2     │  │ pesquisar  │
└────────────┘  └────────────┘
```

---

## 7. INSTRUÇÃO: Como executar M1

### 7.1 Checklist

- [ ] Problema (M0) definido com necessidade clara
- [ ] Ontologia interna consultada primeiro (`docs/00_O/`)
- [ ] Fontes externas consultadas se lacunas existirem
- [ ] Conceitos com definição operacional (aplicável)
- [ ] Fontes rastreáveis (path ou url)
- [ ] Validação: Seletividade + Profundidade + Coerência + Rastreabilidade

### 7.2 Template de Saída

```markdown
## Marco Teórico

### Fonte Interna

| Documento | Achado Relevante |
|-----------|------------------|
| [path] | [conceito extraído] |

### Fonte Externa

| Conceito | Definição | Fonte |
|----------|-----------|-------|
| [termo] | [definição operacional] | [referência] |

### Conceitos Consolidados

| Conceito | Definição | Origem | Aplicação |
|----------|-----------|--------|-----------|
| [termo] | [definição] | interna/externa | [como usar] |

### Referências Conceituais

| Framework | Descrição | Aplicação no ZAZ |
|-----------|-----------|------------------|
| [nome] | [o que é] | [como se relaciona] |

### Premissas

1. [suposição assumida]

### Lacunas

1. [o que falta para M3]
```

---

## 8. Referência Conceitual: Double Diamond

| Double Diamond | Framework ZAZ | Fase |
|----------------|---------------|------|
| Discover + Define | M0 (Problema) | Divergir→Convergir sobre o problema |
| Develop + Deliver | M1 + M2 (Marco + Objeto) | Divergir→Convergir sobre a solução |

**Fonte:** Design Council (UK), 2005

**Aplicação:** Valida que o framework ZAZ segue padrão reconhecido de discovery.

---

## 9. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_1_Problema | Anterior (M0) - input |
| 00_E_1_3_Objeto | Próximo (M2) - output |
| Matriz_Selecao_Diagramas | Guia para diagramas |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | - | Criação. Classe básica para M1. |
| 2.0 | 2025-12-03 | 16:45 | Reestruturação via M0-M4 recursivo. Método de pesquisa (interno/externo), diagrama UML, subtipos, restrições, referência Double Diamond. |

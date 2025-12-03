---
nome: 00_E_1_3_Objeto
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_3_Objeto

## 1. Definição

Objeto é a classe que estrutura o escopo de pesquisa (M2). Transforma conhecimento do marco teórico em objeto delimitado com fronteiras claras e critérios de sucesso.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único |
| marco_ref | MarcoTeorico | Sim | Marco teórico que fundamenta |
| tipo_pesquisa | enum | Sim | Exploratório, Descritivo, Prescritivo |
| objetivo | string | Sim | O que pretende resolver/descobrir |
| escopo | string | Sim | O que está incluído |
| fronteiras | string | Sim | O que está excluído |
| requisitos | string[] | Não | Pré-condições necessárias |
| criterio_sucesso | string | Sim | Quando considera completo |
| criterio_insucesso | string | Sim | Quando considera falho |
| frontmatter | Frontmatter | Sim | Metadados YAML |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                          OBJETO                                 │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                                                 │
│  - marco_ref: MarcoTeorico                                      │
│  - tipo_pesquisa: enum [Exploratório|Descritivo|Prescritivo]    │
│  - objetivo: string                                             │
│  - escopo: string                                               │
│  - fronteiras: string                                           │
│  - requisitos: string[]                                         │
│  - criterio_sucesso: string                                     │
│  - criterio_insucesso: string                                   │
│  - frontmatter: Frontmatter                                     │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - escopo e fronteiras não podem ter interseção                 │
│  - critérios devem ser verificáveis                             │
│  - objetivo deve usar conceitos do marco teórico                │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + definir(): Objeto                                            │
│  + validar(): bool                                              │
│  + gerar_classes(): Classe[]                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Restrições

- Escopo e fronteiras são mutuamente exclusivos
- Critérios de sucesso/insucesso devem ser verificáveis
- Objetivo deve usar conceitos definidos no marco teórico
- Tipo de pesquisa determina a natureza do output

---

## 5. Tipos de Pesquisa

| Tipo | Pergunta | Output típico |
|------|----------|---------------|
| Exploratório | O que existe? | Mapeamento, descoberta |
| Descritivo | Como funciona? | Documentação, análise |
| Prescritivo | Como deveria ser? | Sistema, framework, método |

---

## 6. Fluxo (M2)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Marco    │ ──► │  Delimitar  │ ──► │   Objeto    │
│   Teórico   │     │   Escopo    │     │  Definido   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
            ┌─────────────────────────────┐
            │  + objetivo                 │
            │  + escopo / fronteiras      │
            │  + critérios sucesso/falha  │
            └─────────────────────────────┘
```

---

## 7. INSTRUÇÃO: Como definir um Objeto

### 7.1 Template (copiar e preencher)

```markdown
| Campo | Valor |
|-------|-------|
| **nome** | [identificador] |
| **tipo_pesquisa** | [Exploratório/Descritivo/Prescritivo] |
| **objetivo** | [o que pretende resolver] |
| **escopo** | [o que está incluído] |
| **fronteiras** | [o que está excluído] |
| **criterio_sucesso** | [quando está completo] |
| **criterio_insucesso** | [quando falhou] |
```

### 7.2 Checklist

- [ ] Nome é único e descritivo
- [ ] Tipo de pesquisa definido
- [ ] Objetivo é claro e acionável
- [ ] Escopo lista o que cobre
- [ ] Fronteiras lista o que NÃO cobre
- [ ] Critério de sucesso é verificável
- [ ] Critério de insucesso é verificável

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_2_MarcoTeorico | Anterior (M1) |
| 00_E_1_5_Metodo | Próximo (M3 - especificação) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-03 | Criação. Classe para M2 do framework epistemológico. |

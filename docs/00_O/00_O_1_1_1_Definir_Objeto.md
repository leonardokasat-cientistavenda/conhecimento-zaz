---
nome: 00_O_1_1_1_Definir_Objeto
versao: "1.1"
tipo: Metodo
classe_ref: Metodo
origem: interno
status: Draft
---

# 00_O_1_1_1_Definir_Objeto
**Versão:** 1.1  
**Tipo:** Método  
**Classe_ref:** Método  
**Origem:** interno  
**Status:** Draft

---

## 1. Definição

M1: Definir Objeto é o primeiro método do Framework Epistemológico. Transforma uma hipótese bruta em objeto de investigação estruturado e validado.

O tipo de pesquisa determina o schema de atributos.

---

## 2. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                      M1: DEFINIR OBJETO                         │
│                                                                 │
│   Hipótese bruta                                                │
│        │                                                        │
│        │ (1) IdentificarTipo                                    │
│        ▼                                                        │
│   tipo_pesquisa                                                 │
│        │                                                        │
│        │ (2) ColetarComuns                                      │
│        ▼                                                        │
│   atributos base (7)                                            │
│        │                                                        │
│        │ (3) ColetarEspecificos                                 │
│        ▼                                                        │
│   atributos completos                                           │
│        │                                                        │
│        │ (4) Validar                                            │
│        ▼                                                        │
│   ┌────┴────┐                                                   │
│ válido    inválido ──► volta (2) ou (3)                         │
│   │                                                             │
│   │ (5) Gerar                                                   │
│   ▼                                                             │
│ OBJETO DEFINIDO                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Input / Output

| Campo | Valor |
|-------|-------|
| Input | Hipótese bruta (string) |
| Output | Objeto Definido (classe tipada) |

---

## 4. Classe: Objeto Definido

### 4.1 Atributos Comuns (todos os tipos)

| Atributo | Tipo | Obrigatório |
|----------|------|-------------|
| nome | string | Sim |
| versao | string | Sim |
| tipo_pesquisa | TipoPesquisa | Sim |
| objetivo | string | Sim |
| escopo | string | Sim |
| fronteiras | string | Sim |
| criterio_sucesso | string | Sim |
| criterio_insucesso | string | Sim |

### 4.2 Enum: TipoPesquisa

| Valor | Pergunta | Propósito |
|-------|----------|-----------|
| Exploratório | "O que existe?" | Descobrir, gerar hipóteses |
| Descritivo | "O que é / como está?" | Medir, classificar |
| Explanatório | "Por que é assim?" | Identificar causa |
| Preditivo | "O que será?" | Projetar, modelar |
| Prescritivo | "Como deve ser?" | Especificar, construir |

### 4.3 Atributos Específicos por Tipo

| Atributo | Expl | Desc | Expla | Pred | Presc |
|----------|:----:|:----:|:-----:|:----:|:-----:|
| hipotese | gera | ✅ | ✅ | ✅ | ❌ |
| variaveis | ❌ | ✅ | ✅ | ✅ | ❌ |
| var_independente | ❌ | ❌ | ✅ | ⚠️ | ❌ |
| var_dependente | ❌ | ❌ | ✅ | ⚠️ | ❌ |
| metricas | ❌ | ✅ | ✅ | ✅ | ❌ |
| threshold | ❌ | ✅ | ✅ | ✅ | ❌ |
| significancia | ❌ | ⚠️ | ✅ | ✅ | ❌ |
| acuracia_alvo | ❌ | ❌ | ❌ | ✅ | ❌ |
| requisitos | ❌ | ❌ | ❌ | ❌ | ✅ |
| spec_funcional | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 5. Subclasses

```
Objeto Definido
    │
    ├── Objeto Exploratório
    ├── Objeto Descritivo
    ├── Objeto Explanatório
    ├── Objeto Preditivo
    └── Objeto Prescritivo
```

---

## 6. Submétodos

### 6.1 IdentificarTipo

| Campo | Valor |
|-------|-------|
| Input | Hipótese bruta |
| Output | tipo_pesquisa |

### 6.2 ColetarComuns

| Campo | Valor |
|-------|-------|
| Input | tipo_pesquisa |
| Output | 7 atributos base |
| Regra | SMART para objetivo |

### 6.3 ColetarEspecificos

| Campo | Valor |
|-------|-------|
| Input | tipo_pesquisa, atributos base |
| Output | atributos específicos |

### 6.4 Validar

| Campo | Valor |
|-------|-------|
| Input | todos atributos |
| Output | válido / inválido + erros |

### 6.5 Gerar

| Campo | Valor |
|-------|-------|
| Input | atributos validados |
| Output | Objeto Definido (subclasse) |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_1_Metodo_Epistemologico | Pai |
| 00_E_1_2_Metodo | Define estrutura de Método |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-11-30 | Criação; 5 tipos pesquisa; 5 submétodos |
| 1.1 | 2025-12-01 | Frontmatter YAML; atributo versao adicionado |

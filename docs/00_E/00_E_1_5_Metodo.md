---
nome: 00_E_1_5_Metodo
versao: "2.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_5_Metodo

## 1. Definição

Metodo é a classe que estrutura ações com input e output tipados (M3). Transforma conhecimento de um estado para outro através de processos verificáveis.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Verbo infinitivo + objeto |
| objeto_ref | Objeto | Sim | Objeto que especifica |
| input | Classe | Sim | Tipo de entrada |
| output | Classe | Sim | Tipo de saída |
| descricao | string | Sim | O que faz |
| submetodos | Submetodo[] | Não | Etapas internas ordenadas |
| restricoes | string[] | Não | Regras de execução |
| frontmatter | Frontmatter | Sim | Metadados YAML |

### Submetodo (subtipo)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| nome | string | Identificador |
| ordem | int | Sequência de execução |
| descricao | string | O que faz |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                          MÉTODO                                 │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                                                 │
│  - objeto_ref: Objeto                                           │
│  - input: Classe                                                │
│  - output: Classe                                               │
│  - descricao: string                                            │
│  - submetodos: Submetodo[]                                      │
│  - restricoes: string[]                                         │
│  - frontmatter: Frontmatter                                     │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - nome = verbo infinitivo + objeto                             │
│  - input e output devem ser Classes válidas                     │
│  - submetodos executam em ordem                                 │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + executar(input): output                                      │
│  + validar(): bool                                              │
│  + gerar_documento(): Documento                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Restrições

- Nome deve ser verbo infinitivo + objeto (ex: "Definir Problema")
- Input e output devem ser Classes válidas do sistema
- Submetodos executam em ordem sequencial
- Um método = um input → um output
- Input aceita subclasses (polimorfismo)

---

## 5. Fluxo (M3)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Objeto    │ ──► │ Especificar │ ──► │  Métodos +  │
│  Definido   │     │     POO     │     │   Classes   │
└─────────────┘     └─────────────┘     └─────────────┘

Transformação interna:
┌───────────┐      ┌───────────────────┐      ┌───────────┐
│   INPUT   │─────►│   Submétodo 1     │─────►│  OUTPUT   │
│  (Classe) │      │   Submétodo 2     │      │  (Classe) │
│           │      │   Submétodo N     │      │           │
└───────────┘      └───────────────────┘      └───────────┘
```

---

## 6. INSTRUÇÃO: Como especificar um Método

### 6.1 Template (copiar e preencher)

```markdown
| Campo | Valor |
|-------|-------|
| **nome** | [verbo infinitivo + objeto] |
| **input** | [Classe de entrada] |
| **output** | [Classe de saída] |
| **descrição** | [O que faz] |

### Submétodos
| Ordem | Nome | Descrição |
|-------|------|-----------|
| 1 | [nome] | [o que faz] |
| 2 | [nome] | [o que faz] |
```

### 6.2 Checklist

- [ ] Nome é verbo infinitivo + objeto
- [ ] Input é uma Classe válida
- [ ] Output é uma Classe válida
- [ ] Descrição explica a transformação
- [ ] Submétodos estão ordenados

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base / define I/O |
| 00_E_1_3_Objeto | Anterior (M2) |
| 00_E_1_6_Documento | Próximo (M4) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2025-12-01 | Migração para frontmatter YAML |
| 2.0 | 2025-12-03 | Reestruturação como classe M3. Novo path 00_E_1_5. |

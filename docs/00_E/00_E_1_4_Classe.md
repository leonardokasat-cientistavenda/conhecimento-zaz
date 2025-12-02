---
nome: 00_E_1_4_Classe
versao: "2.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_4_Classe

## 1. Definição

Classe é o molde que define estrutura de objetos. Toda entidade do sistema é instância de uma Classe.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único |
| descricao | string | Sim | O que é (1-2 frases) |
| atributos | Atributo[] | Sim | Propriedades da classe |
| metodos | Metodo[] | Não | Ações que a classe executa |
| restricoes | string[] | Não | Regras e validações |
| relacionamentos | Relacionamento[] | Não | Conexões com outras classes |
| diagrama | string | Sim | ASCII representando estrutura |
| frontmatter | Frontmatter | Sim | Metadados YAML |

---

## 3. Diagrama
```
┌─────────────────────────────────────────────────────────────────┐
│                           CLASSE                                │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                                                 │
│  - descricao: string                                            │
│  - atributos: Atributo[]                                        │
│  - metodos: Metodo[]                                            │
│  - restricoes: string[]                                         │
│  - relacionamentos: Relacionamento[]                            │
│  - diagrama: string                                             │
│  - frontmatter: Frontmatter                                     │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - diagrama obrigatório                                         │
│  - frontmatter obrigatório                                      │
│  - nome único no sistema                                        │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + instanciar(): Objeto                                         │
│  + validar(): bool                                              │
│  + herdar(classe_pai): Classe                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Restrições

- Diagrama obrigatório em toda instância
- Frontmatter obrigatório em todo documento
- Nome deve ser único no sistema
- Subclasses herdam atributos e podem sobrescrever diagrama

---

## 5. Herança

Classes de Epistemologia que herdam de Classe:

| Subclasse | Diagrama específico |
|-----------|---------------------|
| Problema | sintoma → causa_raiz → necessidade |
| MarcoTeorico | tabela conceito/definição |
| Objeto | nome, escopo, fronteiras, critérios |
| Metodo | input → processo → output |
| Framework | sequência de métodos |
| Documento | frontmatter + seções |

Cada subclasse define seu padrão de diagrama em seu próprio arquivo.

---

## 6. INSTRUÇÃO: Como criar uma Classe

### 6.1 Frontmatter (copiar e preencher)
```yaml
---
nome: [00_E_X_X_NomeDaClasse]
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---
```

### 6.2 Diagrama (modelo genérico)
```
┌─────────────────────────────────────────┐
│              NOME_CLASSE                │
├─────────────────────────────────────────┤
│  Atributos                              │
│  ─────────                              │
│  - atributo1: tipo                      │
│  - atributo2: tipo                      │
├─────────────────────────────────────────┤
│  Restrições                             │
│  ──────────                             │
│  - regra1                               │
├─────────────────────────────────────────┤
│  Métodos                                │
│  ────────                               │
│  + metodo1(): retorno                   │
└─────────────────────────────────────────┘
```

### 6.3 Estrutura obrigatória do documento

1. Frontmatter YAML
2. Definição (1-2 frases)
3. Atributos (tabela)
4. Diagrama (ASCII)
5. Restrições (lista)
6. Referências (tabela)
7. Histórico (tabela)

### 6.4 Checklist

- [ ] Frontmatter preenchido
- [ ] Definição clara
- [ ] Atributos com tipo e obrigatoriedade
- [ ] Diagrama representa estrutura
- [ ] Restrições documentadas
- [ ] Relacionamentos mapeados

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_1_Problema | Filho (herda) |
| 00_E_1_2_MarcoTeorico | Filho (herda) |
| 00_E_1_3_Objeto | Filho (herda) |
| 00_E_1_5_Metodo | Filho (herda) |
| 00_E_1_6_Documento | Filho (herda) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 2.0 | 2025-12-02 | Reestruturação com instruções, herança e polimorfismo |

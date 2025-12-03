---
nome: 00_E_1_6_Documento
versao: "2.3"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_6_Documento

## 1. Definição

Documento é a classe que estrutura a persistência de conhecimento (M4). Todo output do método epistemológico é armazenado como instância de Documento com frontmatter YAML e estrutura padronizada.

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único |
| metodo_ref | Metodo | Sim | Método que gerou o documento |
| frontmatter | Frontmatter | Sim | Metadados YAML |
| conteudo | Secao[] | Sim | Seções do documento |
| historico | Versao[] | Sim | Registro de versões |

---

## 3. Frontmatter (Schema YAML)

### 3.1 Obrigatório

```yaml
---
nome: string           # Identificador único (ex: 00_O_1_1_Metodo)
versao: string         # SemVer (ex: "1.3")
tipo: enum             # Classe | Framework | Catalogo | Introducao | Metodo | Sprint
classe_ref: string     # Classe epistemológica de referência
origem: enum           # interno | externo
status: enum           # Draft | Revisao | Publicado | EmAndamento | Concluida
---
```

### 3.2 Opcional

```yaml
---
outline_id: string     # UUID do documento no Outline (sync)
outline_url: string    # URL do documento no Outline (sync)
etapa: enum            # M0 | M1 | M2 | M3 | M4 (para _drafts/)
data_inicio: date      # Para Sprints
data_fim: date         # Para Sprints
---
```

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                        DOCUMENTO                                │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - nome: string                                                 │
│  - metodo_ref: Metodo                                           │
│  - frontmatter: Frontmatter                                     │
│  - conteudo: Secao[]                                            │
│  - historico: Versao[]                                          │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - frontmatter obrigatório em todo documento                    │
│  - histórico atualizado a cada versão                           │
│  - nome único no sistema                                        │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + persistir(): Documento                                       │
│  + validar(): bool                                              │
│  + versionar(): Documento                                       │
└─────────────────────────────────────────────────────────────────┘

Estrutura:
┌─────────────────────────────────────────────────────────────────┐
│                     Frontmatter                                 │
│   nome | versao | tipo | status | origem                        │
├─────────────────────────────────────────────────────────────────┤
│                      Conteúdo                                   │
│   Definição | Diagrama | Atributos | Referências                │
├─────────────────────────────────────────────────────────────────┤
│                      Histórico                                  │
│   Versão | Data | Hora | Alteração                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Estrutura Padrão

| Seção | Obrigatório | Conteúdo |
|-------|-------------|----------|
| Frontmatter | Sim | Metadados YAML |
| Definição | Sim | O que é (1-2 frases) |
| Diagrama | Sim | ASCII estrutura/fluxo |
| Atributos | Se Classe | Schema de atributos |
| Restrições | Se Classe | Regras de validação |
| Referências | Sim | Links relacionados |
| Histórico | Sim | Registro versões (com timestamp) |

---

## 6. Tipos de Documento

| Tipo | Descrição | Template específico |
|------|-----------|---------------------|
| Classe | Define estrutura | Atributos + Restrições + Métodos |
| Framework | Orquestra métodos | Sequência + Etapas |
| Catalogo | Lista instâncias | Tabela de objetos |
| Introducao | Visão geral | Estrutura + Componentes |
| Metodo | Define processo | Input/Output + Submétodos |
| Sprint | Ciclo de trabalho | Objetivo + Tarefas |

---

## 7. Fluxo (M4)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Métodos   │ ──► │  Persistir  │ ──► │  Documento  │
│   Classes   │     │   em .md    │     │ Versionado  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
            ┌─────────────────────────────┐
            │  + Frontmatter YAML         │
            │  + Estrutura padronizada    │
            │  + Histórico atualizado     │
            │  + Commit no GitHub         │
            └─────────────────────────────┘
```

---

## 8. INSTRUÇÃO: Como persistir um Documento

### 8.1 Checklist

- [ ] Frontmatter completo e válido
- [ ] Definição clara (1-2 frases)
- [ ] Diagrama ASCII representando estrutura
- [ ] Referências mapeadas
- [ ] Histórico com nova versão e timestamp
- [ ] Commit com convenção [CAMADA] ação: descrição

### 8.2 Convenção de Commit

```
[C1] feat: cria GENESIS.md v0.1
[C3] fix: corrige diagrama de Classe
[C3] refactor: reestrutura Documento para M4
```

### 8.3 Estrutura de Pastas para Sprints

**Estrutura:**

```
_sprints/
  SXXX-Y.md              # Definição da Sprint

_drafts/
  SXXX-Y/                # Pasta da Sprint
    TXX/                 # Subpasta por Task
      M0_Nome.md         # Artefato M0
      M1_Nome.md         # Artefato M1
      M2_Nome.md         # Artefato M2
      M3_Nome.md         # Artefato M3
      M4_Nome.md         # Artefato M4 (opcional, pode ir direto para docs/)
    recursos/            # Recursos compartilhados da sprint (opcional)
      Matriz_X.md
      Referencia_Y.md
```

**Exemplo concreto (S003-E):**

```
_sprints/
  S003-E.md

_drafts/
  S003-E/
    T06/
      M0_Objeto_v2.md
      M1_Objeto_v2.md
      M2_Objeto_v2.md
      M3_Objeto_v2.md
      M4_Objeto_v2.md
    T07/
      M0_Classe_v2.md
      ...
    recursos/
      Matriz_Selecao_Diagramas.md
```

**Regras:**

| Regra | Descrição |
|-------|-----------|
| Nomenclatura Task | `TXX` onde XX = número da task (T01, T02... T15) |
| Nomenclatura Arquivo | `MX_NomeObjeto.md` onde X = etapa (0-4) |
| Recursos compartilhados | Arquivos usados por múltiplas tasks vão em `recursos/` |
| Ao concluir M4 | Arquivo final vai para `docs/`, artefatos intermediários podem ser deletados |
| Ao fechar Sprint | Deletar pasta `_drafts/SXXX-Y/` (histórico preservado no Git) |

### 8.4 Ciclo de Vida (Chat → _drafts/ → docs/)

**Princípio:** O trabalho de cada etapa (M0-M4) acontece no chat. A persistência ocorre ao finalizar cada etapa.

```
┌─────────────┐     ┌─────────────────────┐     ┌─────────────┐
│    Chat     │ ──► │  _drafts/SPRINT/TXX │ ──► │    docs/    │
│  (trabalho) │     │     (rascunho)      │     │ (publicado) │
└─────────────┘     └─────────────────────┘     └─────────────┘
```

**Fluxo:**

| Momento | Local | Ação |
|---------|-------|------|
| M0 em andamento | Chat | Desenvolver Problema (sintoma, significantes, causa, necessidade) |
| M0 finalizado | _drafts/SPRINT/TXX/ | Persistir `M0_Nome.md` com `etapa: M0` |
| M1 em andamento | Chat | Desenvolver Marco Teórico |
| M1 finalizado | _drafts/SPRINT/TXX/ | Persistir `M1_Nome.md` com `etapa: M1` |
| M2 finalizado | _drafts/SPRINT/TXX/ | Persistir `M2_Nome.md` com `etapa: M2` |
| M3 finalizado | _drafts/SPRINT/TXX/ | Persistir `M3_Nome.md` com `etapa: M3` |
| M4 finalizado | docs/ | Persistir arquivo final, deletar pasta TXX/ |

### 8.5 Como criar uma Sprint

**Local:** `_sprints/SXXX-Y.md`

**Nomenclatura:** 
- `S` = Sprint
- `XXX` = Número sequencial (001, 002...)
- `Y` = Domínio (E = Epistemologia, O = Ontologia, etc.)

**Template mínimo:**

```markdown
---
nome: SXXX-Y
tipo: Sprint
status: EmAndamento
data_inicio: YYYY-MM-DD
data_fim: null
---

# SXXX-Y: [Título da Sprint]

## Objetivo
[Uma frase descrevendo o objetivo]

## Tarefas

| id | Arquivo | Tarefa | Status |
|----|---------|--------|--------|
| T01 | arquivo.md | Descrição | ⏳ |
| T02 | arquivo.md | Descrição | ⏳ |

## Histórico

| Data | Hora | Evento |
|------|------|--------|
| YYYY-MM-DD | HH:MM | Sprint iniciada |
```

**Nota:** Classe Sprint será formalizada em sprint futura.

---

## 9. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_4_Classe | Classe base |
| 00_E_1_5_Metodo | Anterior (M3) |
| 00_E_1_1_Problema | Referencia ciclo de vida (7.5) |
| GENESIS.md | Define índice de arquivos |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2024-11-27 | - | Criação |
| 1.1 | 2024-11-27 | - | Regras de Formatação |
| 1.2 | 2024-11-27 | - | Seção Diagrama |
| 1.3 | 2025-12-01 | - | Migração para Frontmatter YAML |
| 1.4 | 2025-12-01 | - | Ajuste estrutura; campo etapa |
| 2.0 | 2025-12-03 | - | Reestruturação como classe M4. Novo path 00_E_1_6. |
| 2.1 | 2025-12-03 | 14:45 | Adiciona ciclo de vida _drafts/ (8.3), instrução Sprint (8.4), timestamp no histórico. |
| 2.2 | 2025-12-03 | 15:30 | Clarifica 8.3: trabalho no Chat, persistência ao finalizar etapa. |
| 2.3 | 2025-12-03 | 20:00 | Reestrutura 8.3: subpastas TXX por task, recursos compartilhados, nomenclatura MX_Nome.md. Move Sprint para 8.5. |

# Patch 015: Capability no Índice

**Sprint:** S009
**Task:** T03
**Arquivo alvo:** `_catalogo/indice.yaml`

---

## Patch 1: Epistemologia

**Localizar:**
```yaml
    metadata:
      versao: "3.4"
      camada: C3
      status: Publicado

  - id: "ms_raciocinio"
```

**Substituir por:**
```yaml
    metadata:
      versao: "3.4"
      camada: C3
      status: Publicado
    capability:
      id: "cap_conhecer"
      nome_amigavel: "CONHECER"
      descricao: "Posso ajudá-lo a criar e buscar conhecimento estruturado usando o método M0-M4."
      exemplos:
        - "Como estruturar um processo de vendas?"
        - "Crie um framework para onboarding"
        - "Documente nossa metodologia"

  - id: "ms_raciocinio"
```

---

## Patch 2: Raciocínio

**Localizar:**
```yaml
    metadata:
      versao: "1.0"
      camada: C3
      status: Publicado

  - id: "ms_catalogo"
```

**Substituir por:**
```yaml
    metadata:
      versao: "1.0"
      camada: C3
      status: Publicado
    capability:
      id: "cap_decidir"
      nome_amigavel: "DECIDIR"
      descricao: "Posso ajudá-lo a tomar decisões de forma estruturada, avaliando hipóteses e evidências."
      exemplos:
        - "Devo contratar mais ou investir em marketing?"
        - "Qual tecnologia escolher para o projeto?"
        - "Avaliar prós e contras de mudar de escritório"

  - id: "ms_catalogo"
```

---

## Patch 3: Gestão de Projetos

**Localizar:**
```yaml
  - id: "infra_gestao_projetos"
    nome: "Gestão de Projetos"
    chave: "backlog sprint trabalho organizar projetos gerenciar tarefas"
    arquivo: "docs/00_I/00_I_2_Gestao_Projetos.md"
    triggers:
      - "gerenciar trabalho"
      - "organizar projetos"
      - "backlog e sprint"
    metadata:
      versao: "1.0"
      camada: C2
      status: Publicado
```

**Substituir por:**
```yaml
  - id: "infra_gestao_projetos"
    nome: "Gestão de Projetos"
    chave: "backlog sprint trabalho organizar projetos gerenciar tarefas"
    arquivo: "docs/00_I/00_I_2_Gestao_Projetos.md"
    triggers:
      - "gerenciar trabalho"
      - "organizar projetos"
      - "backlog e sprint"
    metadata:
      versao: "1.0"
      camada: C2
      status: Publicado
    capability:
      id: "cap_gerenciar"
      nome_amigavel: "GERENCIAR"
      descricao: "Posso ajudá-lo a organizar trabalho em backlog e sprints."
      exemplos:
        - "O que temos no backlog?"
        - "Iniciar nova sprint"
        - "Capturar ideia para o backlog"
```

---

## Patch 4: Atualizar versão

**Localizar:**
```yaml
versao: "2.0"
atualizado: "2025-12-08"
```

**Substituir por:**
```yaml
versao: "2.1"
atualizado: "2025-12-08"
```

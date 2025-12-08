# Catálogo

Repositório de índice para busca semântica do GENESIS.

## Arquivos

| Arquivo | Propósito |
|---------|----------|
| `indice.yaml` | Índice principal com chaves semânticas e triggers |

## Tipos Suportados

| Tipo | Descrição | Fonte |
|------|-----------|-------|
| `docs` | Conhecimento publicado (Meta Sistemas, Infra) | `docs/` |
| `backlog` | Itens de trabalho pendente | `_backlog/` |
| `sprint` | Ciclos de execução | `_sprints/` |

## Como Usar

### GENESIS (Roteamento)

```
1. Ler _catalogo/indice.yaml
2. Identificar tipo de busca (docs, backlog, sprint)
3. Comparar input com chave e triggers de cada item do tipo
4. Selecionar item com maior relevância
5. Carregar arquivo do item selecionado
```

### Gestão de Projetos

```python
# Listar backlog
Catalogo.pesquisar(tipo="backlog")

# Listar sprints
Catalogo.pesquisar(tipo="sprint")

# Buscar sprint específica
Catalogo.pesquisar(query="S008", tipo="sprint")
```

### Indexar Novo Item

Adicionar entrada em `indice.yaml` na seção apropriada:

```yaml
# Para docs:
docs:
  - id: "ms_nome"
    nome: "Nome do Item"
    chave: "palavras-chave semânticas para busca"
    arquivo: "docs/caminho/arquivo.md"
    triggers:
      - "frase que ativa este item"
    metadata:
      versao: "1.0"
      camada: C3
      status: Publicado

# Para backlog:
backlog:
  - id: "bl_nome"
    nome: "Nome do Item"
    chave: "palavras-chave para busca"
    arquivo: "_backlog/arquivo.md"
    triggers:
      - "frase que ativa"
    metadata:
      prioridade: alta|media|baixa
      status: Pendente|Promovido

# Para sprint:
sprints:
  - id: "sp_xxx"
    codigo: "S00X"
    nome: "Nome da Sprint"
    chave: "palavras-chave"
    arquivo: "_sprints/S00X_Nome.md"
    metadata:
      status: Ativa|Concluida
      data_inicio: "YYYY-MM-DD"
```

## Especificação Completa

Ver: `docs/00_E/00_E_2_1_Modulo_Catalogo.md`

# Catálogo

Repositório de índice para busca semântica do GENESIS.

## Arquivos

| Arquivo | Propósito |
|---------|----------|
| `indice.yaml` | Índice principal com chaves semânticas e triggers |

## Como Usar

### GENESIS (Roteamento)

1. Ler `_catalogo/indice.yaml`
2. Comparar input do usuário com `chave` e `triggers` de cada item
3. Selecionar item com maior relevância
4. Carregar arquivo do item selecionado

### Indexar Novo Item

Adicionar entrada em `indice.yaml` seguindo formato:

```yaml
- id: "ms_nome"
  tipo: MetaSistema|Decisao|Documento
  nome: "Nome do Item"
  chave: "palavras-chave semânticas para busca"
  arquivo: "caminho/para/arquivo.md"
  triggers:
    - "frase que ativa este item"
  metadata:
    versao: "1.0"
    camada: C1|C2|C3|C4
```

## Especificação Completa

Ver: `docs/00_E/00_E_2_1_Modulo_Catalogo.md`

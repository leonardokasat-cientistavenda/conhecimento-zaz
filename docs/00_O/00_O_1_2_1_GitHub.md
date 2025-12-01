# 00_O_1_2_1_GitHub
**Versão:** 1.0  
**Tipo:** Framework  
**Classe_ref:** Framework  
**Origem:** interno  
**Status:** Draft

---

## 1. Definição

GitHub é a classe que define estrutura de repositório, convenções de commit e fluxo de trabalho para documentação.

Primeiro componente do Pipeline de Documentação.

---

## 2. Estrutura de Pastas

```
/repo
│
├── _drafts/                    ◄── trabalho em progresso (M1-M4)
│   └── 00_O_1_2_3_Outline.md
│
├── docs/                       ◄── publicado (pós-M5)
│   ├── 00_E/                   ◄── Epistemologia
│   │   ├── 00_E_1_1_Classe.md
│   │   └── 00_E_1_4_Documento.md
│   │
│   ├── 00_O/                   ◄── Ontologia
│   │   ├── 00_O_1_1_Metodo_Epistemologico.md
│   │   └── 00_O_1_2_Pipeline_Documentacao.md
│   │
│   └── 01/                     ◄── Domínios
│       └── ...
│
├── _edits/                     ◄── instruções de edição (Fase 1+)
│   └── pending.json
│
└── README.md
```

---

## 3. Ciclo de Vida do Documento

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   M1 ──► cria _drafts/objeto.md                                 │
│          │                                                      │
│          │ commit: "M1: Define objeto X"                        │
│          ▼                                                      │
│   M2 ──► atualiza _drafts/objeto.md                             │
│          │                                                      │
│          │ commit: "M2: Marco teórico de X"                     │
│          ▼                                                      │
│   M3 ──► atualiza _drafts/objeto.md                             │
│          │                                                      │
│          │ commit: "M3: Classes de X"                           │
│          ▼                                                      │
│   M4 ──► atualiza _drafts/objeto.md                             │
│          │                                                      │
│          │ commit: "M4: Métodos de X"                           │
│          ▼                                                      │
│   M5 ──► move _drafts/ → docs/                                  │
│          │                                                      │
│          │ commit: "M5: Publica X"                              │
│          ▼                                                      │
│   Sync → GitHub Action sincroniza com Outline                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Convenção de Commits

| Etapa | Padrão | Exemplo |
|-------|--------|---------|
| M1 | `M1: Define [objeto]` | M1: Define Outline |
| M2 | `M2: Marco teórico de [objeto]` | M2: Marco teórico de Outline |
| M3 | `M3: Classes de [objeto]` | M3: Classes de Outline |
| M4 | `M4: Métodos de [objeto]` | M4: Métodos de Outline |
| M5 | `M5: Publica [objeto]` | M5: Publica Outline |
| Fix | `fix: [descrição]` | fix: Corrige link quebrado |
| Refine | `refine(M1): [descrição]` | refine(M1): Expande escopo |

---

## 5. Resolução de Links

Links internos são resolvidos durante o sync.

### 5.1 Mapa de IDs

```json
{
  "00_E_1_1_Classe": "abc123",
  "00_E_1_4_Documento": "def456",
  "00_O_1_1_Metodo": "ghi789"
}
```

### 5.2 Transformação

```
Antes (Git):
[Classe](../00_E/00_E_1_1_Classe.md)

Depois (Outline):
[Classe](https://outline.zaz.com/doc/abc123)
```

### 5.3 Documentos Novos

Sync de 2 passes:

```
Pass 1: Cria documento → Outline retorna ID → Salva frontmatter
Pass 2: Links para esse documento funcionam
```

---

## 6. Edição Incremental (Fase 1+)

### 6.1 Formato de Instrução

```json
{
  "edits": [
    {
      "arquivo": "docs/00_O/00_O_1_1_1_Definir_Objeto.md",
      "acao": "str_replace",
      "busca": "versao: \"1.0\"",
      "substitui": "versao: \"1.1\""
    },
    {
      "arquivo": "docs/00_O/00_O_1_1_Metodo.md",
      "acao": "append",
      "posicao": "antes_de_historico",
      "conteudo": "## Nova Seção\n\nConteúdo..."
    }
  ]
}
```

### 6.2 Ações Suportadas

| Ação | Descrição |
|------|-----------|
| str_replace | Substitui string única |
| append | Adiciona conteúdo |
| prepend | Adiciona no início |
| delete | Remove seção |

### 6.3 Fluxo

```
Fase 0 (atual):
Claude gera arquivo completo → Usuário substitui no GitHub

Fase 1 (GitHub Actions):
Claude gera _edits/pending.json → Push → Action aplica → Commit

Fase 2 (Claude Code):
Claude Code → Edita direto via MCP → Commit
```

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_2_GitHub_Actions | Irmão (próxima etapa) |
| 00_O_1_2_3_Outline | Irmão (publicação) |
| 00_E_1_4_Documento | Define estrutura dos arquivos |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação; Estrutura _drafts/docs; Convenção commits; Edição incremental |

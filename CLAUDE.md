# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Sistema de documentação metodológica que usa Epistemologia + Ontologia para estruturar conhecimento. Não é um projeto de código tradicional - é uma base de conhecimento em Markdown com automação para sincronização.

## Architecture

```
conhecimento-zaz/
├── _drafts/           → Rascunhos em processo (etapas M1-M4)
├── docs/
│   ├── 00_E/          → Epistemologia (como conhecer)
│   ├── 00_O/          → Ontologia (o que existe)
│   └── 01/            → Domínios (aplicações práticas)
└── .github/workflows/ → CI/CD
```

**Hierarquia conceitual:**
- `00_META` → Raiz do método científico
- `00_E_Epistemologia` → Classes, Métodos, Frameworks, Documentos (estrutura)
- `00_O_Ontologia` → Instâncias e descobertas (conteúdo)

## Document Frontmatter Schema

Todo documento em `docs/` DEVE ter frontmatter YAML com campos obrigatórios:

```yaml
---
nome: string           # Identificador único (ex: 00_O_1_1_Metodo)
versao: string         # SemVer entre aspas (ex: "1.3")
tipo: enum             # Classe | Framework | Catalogo | Introducao | Metodo
classe_ref: string     # Classe epistemológica de referência
origem: enum           # interno | externo
status: enum           # Draft | Revisao | Publicado
---
```

Campos opcionais: `outline_id`, `outline_url`, `etapa` (M1-M5 para _drafts/).

## Validation

```bash
# Workflow automático valida em push/PR para docs/**/*.md
# Localmente, pode-se rodar:
find docs -name "*.md" -exec head -1 {} \; | grep -c "^---"
```

O CI em `.github/workflows/validar.yml` verifica:
- Presença de frontmatter
- Campos obrigatórios
- Valores válidos para enums

## Sync to Outline

Push para `main` em `docs/**/*.md` dispara sync automático para wiki.zaz.vc via `.github/workflows/sync-outline.yml`.

Collections mapeadas:
- `docs/00_E/` → Epistemologia
- `docs/00_O/` → Ontologia
- `docs/01/` → Domínios

## Commit Convention

| Etapa | Padrão |
|-------|--------|
| M1 | `M1: Define [objeto]` |
| M2 | `M2: Marco teórico de [objeto]` |
| M3 | `M3: Classes de [objeto]` |
| M4 | `M4: Métodos de [objeto]` |
| M5 | `M5: Publica [objeto]` |

## Document Structure

Cada documento segue estrutura padrão com seções obrigatórias:
1. Frontmatter YAML
2. Título H1 (igual ao `nome`)
3. Definição
4. Diagrama ASCII (sintetiza estrutura/fluxo)
5. Referências
6. Histórico de versões

Seções condicionais:
- Atributos (se tipo=Classe)
- Métodos (se tipo=Framework)

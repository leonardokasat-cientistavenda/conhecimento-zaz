# Prompt para Sprint S005-G: Refatoração do GENESIS

## CONTEXTO

IMPORTANTE: Todos os arquivos estão no GitHub, NÃO no Google Drive.
Usar ferramenta github:get_file_contents para leitura.

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Arquivo raiz: /genesis/GENESIS.md

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## SPRINT ATUAL: S005-G

**Objetivo:** Refatorar GENESIS de STUB (v0.10) para Framework completo (v1.0), aplicando M0-M4 e incorporando o propósito maior: **Inteligência Híbrida para amplificar capacidade cognitiva humana**.

**Arquivo da Sprint:** /_sprints/S005-G_Sprint_Genesis.md

---

## HIERARQUIA DE RESPONSABILIDADES

```
GENESIS (Camada 1) ─── PROPÓSITO (PORQUÊ)
│  Tese: "Amplificar capacidade cognitiva humana via Inteligência
│        Híbrida: Humano (intenção) + LLM (fluência) + Sistema (estrutura)"
│  Resolve: Bootstrap Circular, Entropia Contextual, Visão do sistema
│
└──► EPISTEMOLOGIA (Camada 3) ─── MÉTODO (COMO)
     │  Tese: "Criar Meta Sistemas anti-entrópicos via M0-M4,
     │        hierarquia fractal, módulos opcionais"
     │  Resolve: Estruturar domínios, evitar degradação, extensibilidade
     │
     └──► MÓDULOS OPCIONAIS ─── CAPACIDADES (O QUÊ)
          ├── Catálogo: busca semântica (INFRAESTRUTURA)
          ├── Raciocínio: estruturar pensamento (usa Catálogo)
          └── Análise: medir e agregar
```

---

## TASKS DA SPRINT

| # | Task | Descrição | Status |
|---|------|-----------|--------|
| T01 | Ler GENESIS atual | Entender STUB v0.10 | ✅ |
| T02 | M0 GENESIS | Problema: Bootstrap + Visão | ✅ |
| T03 | M1 GENESIS | Marco Teórico | ✅ |
| T04 | M2 GENESIS | Objeto: Fronteiras | ✅ |
| T05 | M3 GENESIS | Classe: Atributos, métodos | ✅ |
| T06 | M4 GENESIS | Documento final v1.0 | ✅ |
| T07 | Atualizar Índice | GENESIS.md v1.1 | ✅ |
| T08-T10 | Reserva | - | ✅ |
| T11 | Módulo Raciocínio | M0-M3 completo, aguarda Catálogo | ⏸️ ON HOLD |
| T12 | Módulo Catálogo | M0: Definir problema busca semântica | 🔄 EM PROGRESSO |
| T13 | Integração | Verificar integridade pós-Catálogo | ⬜ PENDENTE |

---

## DESCOBERTA: CATÁLOGO É INFRAESTRUTURA

Durante T11 (Raciocínio), identificamos que busca semântica é problema recorrente:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PADRÃO: BUSCA SEMÂNTICA                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS → Meta Sistemas                                                    │
│  └─ buscar(problema usuário) → Meta Sistema que resolve                     │
│                                                                             │
│  Raciocínio → Decisões                                                      │
│  └─ buscar(problema + contexto) → Decisão reutilizável                      │
│                                                                             │
│  MESMO PADRÃO = MÓDULO CATÁLOGO                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Decisão:** Catálogo antes de Raciocínio. Raciocínio será refatorado para usar Catálogo.

---

## ARQUIVOS DA SPRINT

| Arquivo | Descrição | Status |
|---------|-----------|--------|
| `_drafts/S005-G/T11_Modulo_Raciocinio.md` | Raciocínio M0-M3 | ⏸️ Aguarda Catálogo |
| `_drafts/S005-G/T12_Modulo_Catalogo.md` | Catálogo M0 | 🔄 Em progresso |
| `_drafts/S005-G/T13_Checklist_Integracao.md` | Verificação pós-Catálogo | ⬜ Pendente |

---

## REGRAS DE OPERAÇÃO

### Regra de Carregamento
Antes de qualquer resposta:
1. Ler github:get_file_contents(path="genesis/GENESIS.md")
2. Ler github:get_file_contents(path="_sprints/S005-G_Sprint_Genesis.md")
3. Identificar task atual

### Regra de Criação de Arquivos
Antes de criar/editar, ler:
- /docs/00_I_1_1_GitHub.md (regras GitHub + token efficiency)
- /docs/00_E/00_E_1_6_Documento.md (estrutura pastas + ciclo M0-M4)

Resumo:
1. Criar arquivos DIRETO no GitHub (sem preview no chat)
2. Informar apenas: "Arquivo criado: [path] - [resumo]"
3. Estrutura drafts: `_drafts/SPRINT/TXX_Nome.md` (1 arquivo que evolui M0→M4)

### Convenção de Commit
Padrão: [CAMADA] ação: descrição - Sprint/Task

Exemplo: [C3] add: M0 Módulo Catálogo - S005-G/T12

---

## REFERÊNCIAS IMPORTANTES

| Arquivo | Conteúdo |
|---------|----------|
| /genesis/GENESIS.md | v1.1 publicado |
| /docs/00_E/00_E_Epistemologia.md | Epistemologia v3.2 |
| /_drafts/S005-G/T11_Modulo_Raciocinio.md | Raciocínio (on hold) |
| /docs/00_I_1_1_GitHub.md | Instruções GitHub |
| /docs/00_E/00_E_1_6_Documento.md | Estrutura de documentos |

---

## COMO ACESSAR ARQUIVOS

Listar pasta:
github:get_file_contents(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", path="docs")

Ler arquivo:
github:get_file_contents(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", path="genesis/GENESIS.md")

Criar/atualizar arquivo:
github:create_or_update_file(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", branch="main", path="...", content="...", message="...")

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
GENESIS (Camada 1) ─── INTELIGÊNCIA ORQUESTRADORA
│  Tese: "Amplificar capacidade cognitiva humana via Inteligência
│        Híbrida: Humano (intenção) + LLM (fluência) + Sistema (estrutura)"
│  Função: entender(CONHECER|DECIDIR) → buscar(Catálogo) → rotear(reutiliza|cria)
│  Resolve: Bootstrap Circular, Entropia Contextual, Visão do sistema
│
├──► CATÁLOGO (Camada 3) ─── MEMÓRIA ESTRUTURADA
│    Função: Repositório com busca semântica (indexar/buscar/atualizar)
│    Agnóstico: Não sabe o que armazena, só guarda e busca
│
├──► EPISTEMOLOGIA (Camada 3) ─── MÉTODO (CONHECER)
│    Tese: "Criar Meta Sistemas anti-entrópicos via M0-M4"
│    Função: Estruturar conhecimento, criar documentos M0-M4
│
└──► RACIOCÍNIO (Módulo) ─── ESTRUTURAR DECISÃO (DECIDIR)
     Função: Ciclo H→E→I→D para tomar decisões
     Usa: Catálogo para buscar/indexar decisões
     Metadata: uso_count, confirmacoes (força da decisão)
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
| T11 | Módulo Raciocínio | M0-M3 completo | ✅ |
| T12 | Módulo Catálogo | M0-M3 completo | ✅ |
| T13 | Integração | Verificar integridade | 🔄 PRÓXIMA |
| T14 | Refatorar GENESIS Router | GENESIS v1.1 - Inteligência Orquestradora | ✅ |
| T15 | Força Decisão Raciocínio | Metadata uso_count/confirmacoes | ⬜ PENDENTE |

---

## DESCOBERTAS DA SPRINT

### 1. GENESIS = Inteligência, CATÁLOGO = Memória

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEPARAÇÃO DE RESPONSABILIDADES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Inteligência):                                                    │
│  ├─ entender(): classifica CONHECER vs DECIDIR                              │
│  ├─ buscar(): consulta Catálogo                                             │
│  └─ rotear(): reutiliza existente ou cria novo                              │
│                                                                             │
│  CATÁLOGO (Memória):                                                        │
│  ├─ indexar(item, chave, metadata)                                          │
│  ├─ buscar(query) → [{item, score, metadata}]                               │
│  └─ Agnóstico: não sabe o que armazena                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2. Fluxo GENESIS v1.1

```
User Input
    │
    ▼
entender() → CONHECER ou DECIDIR?
    │
    ├─ CONHECER ──► buscar(MetaSistema) ──► existe? ──► roteia para MS
    │                                         └─ não? ──► Epistemologia cria
    │
    └─ DECIDIR ──► buscar(Decisão) ──► existe? ──► aplica decisão
                                         └─ não? ──► Raciocínio gera
```

### 3. Força da Decisão = Metadata no Raciocínio

Decisões reutilizadas e confirmadas ficam "mais fortes":
- `uso_count`: quantas vezes foi consultada
- `confirmacoes`: quantas vezes usuário confirmou sucesso
- `rejeicoes`: quantas vezes usuário rejeitou
- Catálogo armazena, Raciocínio interpreta

---

## ARQUIVOS DA SPRINT

| Arquivo | Descrição | Status |
|---------|-----------|--------|
| `genesis/GENESIS.md` | **v1.1 Inteligência Orquestradora** | ✅ Publicado |
| `_drafts/S005-G/T11_Modulo_Raciocinio.md` | Raciocínio M0-M3 | ✅ Completo |
| `_drafts/S005-G/T12_Modulo_Catalogo.md` | Catálogo M0-M3 | ✅ Completo |
| `_drafts/S005-G/T13_Checklist_Integracao.md` | Verificação | 🔄 Próxima |
| `_drafts/S005-G/T14_Refatorar_GENESIS_Router.md` | Instrução (concluída) | ✅ |
| `_drafts/S005-G/T15_Forca_Decisao_Raciocinio.md` | Instrução força | ⬜ Pendente |

---

## PRÓXIMOS PASSOS

1. **T13 Integração** - Verificar integridade do sistema
2. **Publicar Catálogo** - M4 (documento final)
3. **Atualizar Epistemologia** - Adicionar atributos de roteamento
4. **Atualizar Raciocínio** - Integrar com Catálogo

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

Exemplo: [C1] update: GENESIS Router - S005-G/T14

---

## REFERÊNCIAS IMPORTANTES

| Arquivo | Conteúdo |
|---------|----------|
| /genesis/GENESIS.md | **v1.1 publicado** |
| /docs/00_E/00_E_Epistemologia.md | Epistemologia v3.2 |
| /_drafts/S005-G/T11_Modulo_Raciocinio.md | Raciocínio M0-M3 |
| /_drafts/S005-G/T12_Modulo_Catalogo.md | Catálogo M0-M3 |
| /docs/00_I_1_1_GitHub.md | Instruções GitHub |

---

## COMO ACESSAR ARQUIVOS

Listar pasta:
github:get_file_contents(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", path="docs")

Ler arquivo:
github:get_file_contents(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", path="genesis/GENESIS.md")

Criar/atualizar arquivo:
github:create_or_update_file(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", branch="main", path="...", content="...", message="...")

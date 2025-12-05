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
          ├── Raciocínio: estruturar pensamento
          ├── Catálogo: organizar itens
          └── Análise: medir e agregar
```

---

## INSIGHT CENTRAL: INTELIGÊNCIA HÍBRIDA

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   HUMANO    │    │     LLM     │    │  SISTEMA    │
│  Intenção   │ +  │  Fluência   │ +  │  (GENESIS+  │  =  AMPLIFICAÇÃO
│  Supervisão │    │  Execução   │    │  EPISTEMO-  │      COGNITIVA
│  Validação  │    │  Geração    │    │  LOGIA)     │
└─────────────┘    └─────────────┘    └─────────────┘

PROBLEMA: Humanos têm energia limitada, LLMs alucinam, juntos sem método = entropia
SOLUÇÃO: Sistema estrutura, LLM executa, Humano supervisiona, conhecimento persiste
RESULTADO: Atividades com menos dispêndio de energia, conhecimento anti-entrópico
```

---

## ARQUITETURA LLM + SISTEMA

```
LLM SOZINHO:
Sessão 1 progride → Sessão 2 esquece → Sessão N loop/entropia

LLM + SISTEMA (GENESIS):
Sessão 1 aplica M0-M4 → Sessão 2 lê GENESIS, continua → Sessão N progresso acumulativo

GENESIS = "memória externa estruturada" para o LLM
```

---

## TASKS DA SPRINT

| # | Task | Descrição | Status |
|---|------|-----------|--------|
| T01 | Ler GENESIS atual | Entender STUB v0.10 | 🔄 |
| T02 | M0 GENESIS | Problema: Bootstrap + Visão (Inteligência Híbrida) | ⬜ |
| T03 | M1 GENESIS | Marco Teórico: Cognição Distribuída, Entropia, etc. | ⬜ |
| T04 | M2 GENESIS | Objeto: Fronteiras, o que é/não é | ⬜ |
| T05 | M3 GENESIS | Classe: Atributos, métodos, relações | ⬜ |
| T06 | M4 GENESIS | Documento final v1.0 | ⬜ |
| T07 | Mapear Módulos | Documentar módulos (Raciocínio, Catálogo, Análise) | ⬜ |
| T08 | Atualizar Índice | Refletir nova estrutura no GENESIS.md | ⬜ |

---

## CONCEITOS TEÓRICOS A INCORPORAR

| Conceito | Fonte | Aplicação no GENESIS |
|----------|-------|---------------------|
| **Cognição Distribuída** | Hutchins (1995) | Cognição não está só na mente, está no sistema |
| **Entropia** | Shannon (1948) | Estrutura reduz incerteza e degradação |
| **Autopoiesis** | Maturana & Varela | Sistema se autoproduz e gera outros |
| **Hierarquia Fractal** | Mandelbrot | Mesma estrutura em cada nível |
| **Composição sobre Herança** | SOLID | Módulos opcionais, não forçados |

---

## TESE PROPOSTA PARA GENESIS v1.0

> **GENESIS é o Framework de propósito que define a visão de Inteligência Híbrida: amplificar capacidade cognitiva humana via sistema estruturado.**
>
> **Contexto:**
> - Humanos têm energia cognitiva limitada
> - LLMs têm fluência mas não estrutura
> - Juntos, sem método, produzem entropia
>
> **Solução:**
> - GENESIS define o PROPÓSITO (porquê)
> - Epistemologia implementa o MÉTODO (como)
> - Módulos fornecem CAPACIDADES (o quê)
>
> **Resultado:** Sistema que reduz dispêndio de energia humana na execução de atividades cognitivas.

---

## DIFERENÇA STUB vs v1.0

| Aspecto | STUB v0.10 | v1.0 (após refatoração) |
|---------|------------|------------------------|
| **Natureza** | Hardcoded mínimo | Framework completo |
| **M0-M4** | Não aplicado | Aplicado |
| **Propósito** | Implícito | Explícito (Inteligência Híbrida) |
| **Módulos** | Não mapeados | Mapeados |
| **Relação Epistemologia** | Dependência mútua | Hierarquia clara |

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

Exemplo: [C1] update: M0 GENESIS - Inteligência Híbrida - S005-G/T02

---

## REFERÊNCIAS IMPORTANTES

| Arquivo | Conteúdo |
|---------|----------|
| /genesis/GENESIS.md | STUB atual v0.10 |
| /_sprints/S005-G_Sprint_Genesis.md | Sprint completa com contexto |
| /docs/00_E/00_E_Epistemologia.md | Epistemologia v3.2 (referência de M0-M4) |
| /_backlog/Modulo_Raciocinio.md | Módulo Raciocínio detalhado |
| /docs/00_I_1_1_GitHub.md | Instruções GitHub |
| /docs/00_E/00_E_1_6_Documento.md | Estrutura de documentos |

---

## SEQUÊNCIA DE SPRINTS

```
S004-E (concluída) → S005-G (atual) → S006-E (Raciocínio)
        ✅                🔄               Backlog
```

---

## COMO ACESSAR ARQUIVOS

Listar pasta:
github:get_file_contents(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", path="docs")

Ler arquivo:
github:get_file_contents(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", path="genesis/GENESIS.md")

Criar/atualizar arquivo:
github:create_or_update_file(owner="leonardokasat-cientistavenda", repo="conhecimento-zaz", branch="main", path="...", content="...", message="...")

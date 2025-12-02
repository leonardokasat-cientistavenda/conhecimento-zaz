---
nome: GENESIS
versao: "0.1"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
---

# GENESIS

## 0. PROBLEMA

| Campo | Valor |
|-------|-------|
| **sintoma** | Conversas longas com Claude perdem precisão. Conceitos rediscutidos. Decisões esquecidas. Loop. |
| **causa_raiz** | **Entropia Contextual:** Claude não persiste estado; contexto dilui conforme histórico cresce. **Bootstrap Circular:** Para definir o sistema de instruções, precisa do sistema funcionando; dependências mútuas travam inicialização. |
| **tentativas_anteriores** | Projetos "Sistema ZAZ" e "Metodologia Vendas" avançaram mas entraram em loop após várias iterações. |
| **necessidade** | Sistema que resolva bootstrap via STUB e reduza entropia via arquivos atômicos com índice versionado. |

---

## 1. DEFINIÇÃO (M1)

| Campo | Valor |
|-------|-------|
| **nome** | GENESIS |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Sistema de instruções que permite ao Claude manter contexto entre conversas, reduzindo Entropia Contextual e Bootstrap Circular. Base para o Meta Sistema Epistemológico que cataloga conhecimento da ZAZ. |
| **escopo** | Estrutura de arquivos, regras de carregamento, índice de dependências, definição de camadas |
| **fronteiras** | Não cobre: conteúdo dos domínios, regras de negócio, execução do M1-M5 (isso é do Meta Sistema) |
| **criterio_sucesso** | Claude lê GENESIS → carrega dependências → executa tarefas sem loop → Meta Sistema pode ser construído sobre ele |
| **criterio_insucesso** | Loop em 3-4 trocas OU impossibilidade de construir camada superior |

---

## 2. MARCO TEÓRICO

| Conceito | Definição |
|----------|----------|
| **POO** | Estruturação por classes, atributos, métodos, herança. Objetos encapsulam estado e comportamento. |
| **Recursividade** | Sistema que opera sobre si mesmo. Output de um ciclo vira input do próximo. |
| **Meta-Programação** | Código/instruções que geram ou modificam código/instruções. |
| **Bootstrap Circular** | Dependência mútua entre componentes na inicialização. A precisa de B, B precisa de A. |
| **STUB** | Versão mínima hardcoded que quebra o ciclo circular. Permite iniciar para depois refatorar. |
| **Entropia Contextual** | Perda de precisão em conversas longas. Informação degrada conforme contexto cresce. |
| **Epistemologia** | Estudo de como conhecer. Define classes, métodos, frameworks. Estrutura. |
| **Ontologia** | Estudo do que existe. Armazena instâncias, descobertas, catálogos. Conteúdo. |
| **Semiótica** | Estudo dos signos. Significante (forma/nome) deve alinhar com Significado (conceito). Desalinhamento gera ambiguidade. |

---

## 3. DIAGRAMA

```
┌─────────────────────────────────────────────────────────────────┐
│                          PROBLEMA                               │
│  Entropia Contextual + Bootstrap Circular                       │
│  → Conversas perdem precisão → Loops → Decisões esquecidas      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ resolve via STUB
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                          GENESIS                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Camada 0: AXIOMAS (imutável)                                   │
│  ┌─────────┬─────────────┬─────────────┬──────────┬──────────┐  │
│  │   POO   │Recursividade│Meta-Program.│Semiótica │Epist/Onto│  │
│  └─────────┴─────────────┴─────────────┴──────────┴──────────┘  │
│                           │                                     │
│  Camada 1: STUB           │                                     │
│  ┌────────────────────────┴────────────────────────────────┐    │
│  │  GENESIS.md v0.1 (este documento)                       │    │
│  └────────────────────────┬────────────────────────────────┘    │
│                           │                                     │
│  Camada 2: INFRAESTRUTURA │                                     │
│  ┌──────────┬─────────────┴───────┬──────────────────────┐      │
│  │  GitHub  │  Claude Instructions │  Estrutura Pastas   │      │
│  └──────────┴─────────────────────┴──────────────────────┘      │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │ habilita
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                 META SISTEMA EPISTEMOLÓGICO                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Camada 3: FRAMEWORK                                            │
│  ┌──────────────────┬────────────────┬─────────────────────┐    │
│  │  M1-M5 (Método)  │    Documento   │      Classes        │    │
│  └──────────────────┴────────────────┴─────────────────────┘    │
│                           │                                     │
│  Camada 4: DOMÍNIOS       │                                     │
│  ┌──────────┬─────────────┴──────┬─────────────┬───────────┐    │
│  │ Mercado  │      Produto       │   Empresa   │    GTM    │    │
│  │          │  └─ Energia        │             │           │    │
│  │          │  └─ Vouchers       │             │           │    │
│  │          │  └─ ...            │             │           │    │
│  └──────────┴────────────────────┴─────────────┴───────────┘    │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │ retroalimenta
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              GENESIS v1.0+ (refatorado)                         │
│         Stub substituído por versão informada                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. CLASSES

### 4.1 Classe: Camada

```
┌─────────────────────────────────────────────────────────────────┐
│                           CAMADA                                │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - id: int                                                      │
│  - nome: string                                                 │
│  - responsabilidade: string                                     │
│  - componentes: string[]                                        │
│  - status: enum [Imutável, Atual, Pendente, Parcial, Futuro]    │
│  - depende_de: Camada | null                                    │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - depende_de.status == "Estável" para iniciar                  │
│  - id sequencial (0, 1, 2...)                                   │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + inicializar(): void                                          │
│  + validar(): bool                                              │
│  + listar_componentes(): string[]                               │
└─────────────────────────────────────────────────────────────────┘
```

#### Instâncias

| id | nome | responsabilidade | componentes | status | depende_de |
|----|------|------------------|-------------|--------|------------|
| 0 | Axiomas | Conceitos assumidos | POO, Recursividade, Meta-Programação, Semiótica, Epistemologia, Ontologia | Imutável | null |
| 1 | Stub | Quebra bootstrap | GENESIS.md v0.1 | Atual | Camada 0 |
| 2 | Infraestrutura | Persistência e contexto | GitHub, Claude Instructions, Estrutura Pastas | Estável | Camada 1 |
| 3 | Framework | Método de conhecimento | M1-M5, Documento, Classes | Parcial | Camada 2 |
| 4 | Domínios | Aplicação em negócio | Mercado, Produto, Empresa, GTM | Futuro | Camada 3 |

---

### 4.2 Classe: Método

```
┌─────────────────────────────────────────────────────────────────┐
│                           MÉTODO                                │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - id: string                                                   │
│  - nome: string                                                 │
│  - descricao: string                                            │
│  - input: string[]                                              │
│  - output: string[]                                             │
│  - executa_em: Camada                                           │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - executa_em.status != "Futuro"                                │
│  - input deve existir antes da execução                         │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                        │
│  ────────                                                       │
│  + executar(): output                                           │
│  + validar_input(): bool                                        │
└─────────────────────────────────────────────────────────────────┘
```

#### Instâncias

| id | nome | descricao | input | output | executa_em |
|----|------|-----------|-------|--------|------------|
| G1 | carregar_contexto | Lê GENESIS.md e arquivos dependentes | path_genesis | contexto_carregado | Camada 1 |
| G2 | resolver_dependencia | Identifica e carrega arquivos referenciados | índice, path | arquivos_carregados | Camada 2 |
| G3 | validar_camada | Verifica se camada anterior está estável | camada_id | bool | Camada 2 |
| G4 | refatorar_stub | Atualiza GENESIS com conhecimento gerado | descobertas, versão_atual | GENESIS v+1 | Camada 1 |

---

## 5. SPRINT ATUAL

| Campo | Valor |
|-------|-------|
| **id** | S001 |
| **objetivo** | Finalizar GENESIS.md v0.1 e persistir no GitHub |
| **camada_foco** | Camada 1 (Stub) |
| **inicio** | 2025-12-02 |
| **status** | Em andamento |

### Tarefas

| id | tarefa | status |
|----|--------|--------|
| T1 | Definir Seção 0 (Problema) | ✅ |
| T2 | Definir Seção 1 (M1) | ✅ |
| T3 | Definir Seção 2 (Marco Teórico) | ✅ |
| T4 | Definir Seção 3 (Diagrama) | ✅ |
| T5 | Definir Seção 4.1 (Classe Camada) | ✅ |
| T6 | Definir Seção 4.2 (Classe Método) | ✅ |
| T7 | Definir Seção 5 (Sprint) | ✅ |
| T8 | Definir Seção 6 (Índice) | ✅ |
| T9 | Definir Seção 7 (Changelog) | ✅ |
| T10 | Commit GENESIS.md no GitHub | ✅ |
| T11 | Configurar Project Instructions Claude | ⏳ |

### Bloqueios

Nenhum.

---

## 6. ÍNDICE DE ARQUIVOS

```
┌─────────────────────────────────────────────────────────────────┐
│                         ARQUIVO                                 │
├─────────────────────────────────────────────────────────────────┤
│  Atributos                                                      │
│  ─────────                                                      │
│  - path: string                                                 │
│  - versao: string                                               │
│  - status: enum [Estável, Draft, Pendente]                      │
│  - updated_at: datetime                                         │
│  - camada: Camada                                               │
│  - depende_de: Arquivo[]                                        │
├─────────────────────────────────────────────────────────────────┤
│  Restrições                                                     │
│  ──────────                                                     │
│  - Claude carrega arquivo se updated_at > última leitura        │
│  - Carregar depende_de antes do arquivo                         │
└─────────────────────────────────────────────────────────────────┘
```

### Instâncias

| path | versao | status | updated_at | camada | depende_de |
|------|--------|--------|------------|--------|------------|
| /genesis/GENESIS.md | 0.1 | Draft | 2025-12-02 | 1 | null |
| /docs/00_META.md | 1.0 | Draft | 2024-11-27 | 3 | GENESIS.md |
| /docs/00_E/00_E_1_4_Documento.md | 1.4 | Draft | 2025-12-01 | 3 | 00_META.md |
| /docs/00_O/00_O_1_1_Metodo_Epistemologico.md | 1.2 | Draft | 2025-12-01 | 3 | 00_META.md |
| /docs/00_O/00_O_1_1_1_Definir_Objeto.md | 1.1 | Draft | 2025-12-01 | 3 | 00_O_1_1_Metodo_Epistemologico.md |
| /docs/00_I_1_1_Github_Instructions.md | 1.0 | Estável | 2025-12-02 | 2 | GENESIS.md |

### Regra de Carregamento

```
SE usuário menciona Camada N
   ENTÃO carregar todos Arquivos onde camada <= N
   ORDENADO por depende_de (dependências primeiro)
```

---

## 7. CHANGELOG

| versao | data | alteracao |
|--------|------|----------|
| 0.1 | 2025-12-02 | Criação. Seções 0-7 definidas. Stub inicial. |
| 0.2 | 2025-12-02 | Camada 2 estabilizada. Infraestrutura funcional. |

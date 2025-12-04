---
nome: GENESIS
versao: "0.10"
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
| **fronteiras** | Não cobre: conteúdo dos domínios, regras de negócio, execução do M0-M4 (isso é do Meta Sistema) |
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
│  Camada 3: FRAMEWORK (M0-M4)                                    │
│  ┌──────────────────┬────────────────┬─────────────────────┐    │
│  │  Problema (M0)   │  Objeto (M2)   │   Documento (M4)    │    │
│  │  MarcoTeor.(M1)  │  Classe (M3)   │                     │    │
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
| 3 | Framework | Método de conhecimento | M0-M4, Problema, MarcoTeorico, Objeto, Classe, Metodo, Documento | Estável | Camada 2 |
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
| G5 | aplicar_patch | Edita arquivo via _patches/*.md | arquivo_patch | arquivo_atualizado | Camada 2 |

---

## 5. SPRINT ATUAL

| Campo | Valor |
|-------|-------|
| **id** | S004-E |
| **camada_foco** | Camada 3 (Framework) |
| **status** | EmAndamento |
| **detalhes** | Ver /_sprints/S004-E.md |

Sprint detalhada movida para o arquivo do Meta Sistema.
Cada camada gerencia sua própria sprint.

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
│  - status: enum [Estável, Draft, Deprecated]                    │
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
| /genesis/GENESIS.md | 0.10 | Draft | 2025-12-04 | 1 | null |
| /docs/00_E/00_E_Epistemologia.md | 2.2 | Draft | 2025-12-03 | 3 | GENESIS.md |
| /docs/00_E/00_E_1_1_Problema.md | 2.1 | Draft | 2025-12-03 | 3 | 00_E_Epistemologia.md |
| /docs/00_E/00_E_1_2_MarcoTeorico.md | 2.1 | Draft | 2025-12-03 | 3 | 00_E_Epistemologia.md |
| /docs/00_E/00_E_1_3_Objeto.md | 2.0 | Draft | 2025-12-03 | 3 | 00_E_Epistemologia.md |
| /docs/00_E/00_E_1_4_Classe.md | 3.0 | Publicado | 2025-12-03 | 3 | 00_E_Epistemologia.md |
| /docs/00_E/00_E_1_4_1_Diagrama.md | 1.0 | Publicado | 2025-12-03 | 3 | 00_E_1_4_Classe.md |
| /docs/00_E/00_E_1_5_Metodo.md | 2.0 | Draft | 2025-12-03 | 3 | 00_E_Epistemologia.md |
| /docs/00_E/00_E_1_6_Documento.md | 3.0 | Publicado | 2025-12-04 | 3 | 00_E_Epistemologia.md |
| /docs/00_I_1_1_GitHub.md | 2.0 | Publicado | 2025-12-04 | 2 | GENESIS.md |

### Arquivos Deprecated

| path | redireciona_para |
|------|------------------|
| /docs/00_E/00_E_1_2_Metodo.md | 00_E_1_5_Metodo.md |
| /docs/00_E/00_E_1_3_Framework.md | 00_E_Epistemologia.md (Seção 4) |
| /docs/00_E/00_E_1_4_Documento.md | 00_E_1_6_Documento.md |
| /docs/00_I_1_1_Github_Instructions.md | 00_I_1_1_GitHub.md |
| /docs/00_O/00_O_1_2_6_Patch_System.md | 00_I_1_1_GitHub.md |

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
| 0.3 | 2025-12-02 | Adiciona método G5 (aplicar_patch). Atualiza índice com Patch_System. |
| 0.4 | 2025-12-02 | Sprint S001 concluída. T11 finalizada. |
| 0.5 | 2025-12-02 | Define Sprint S002. Handoff para integração Camada 3. |
| 0.6 | 2025-12-02 | Move Sprint para 00_E_Epistemologia.md. Cada camada gerencia própria sprint. |
| 0.7 | 2025-12-03 | Sprint S002-E concluída. Classes M0-M4 criadas. Camada 3 estabilizada. |
| 0.8 | 2025-12-03 | Sprint S003-E em andamento (T1-T6, T12-T13 concluídas). Atualiza índice: Objeto v2.0, Documento v2.3, Github_Instructions v1.2. |
| 0.9 | 2025-12-04 | T13 concluída: GitHub.md v2.0 consolida Github_Instructions + Patch_System. Atualiza índice com deprecated. Documento.md v3.0 publicado. |
| 0.10 | 2025-12-04 | S003-E fechada (16/17 tasks). S004-E iniciada: Integridade e Consistência. Adiciona Diagrama.md ao índice. |

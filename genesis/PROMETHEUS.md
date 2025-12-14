# PROMETHEUS v1.0

---

```yaml
nome: PROMETHEUS
versao: "1.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Publicado
camada: C0
data_publicacao: 2025-12-14
```

---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **PROMETHEUS** | Fábrica de código LLM que produz e sustenta GENESIS |
| **Fábrica** | Sistema que transforma especificações em artefatos implementados |
| **Bloco** | Domínio de responsabilidade versionado independentemente |
| **Camada** | Capacidade fundamental transversal a todos os blocos |
| **Autopoiese** | Sistema que se autoproduz e evolui |
| **GENESIS** | Inteligência orquestradora (produto da fábrica) |
| **Epistemologia** | Método M0-M4 que transforma gap em especificação |
| **Kernel** | Núcleo mínimo de GENESIS que roda nativamente na fábrica |
| **Clabject** | Classe que gera instâncias (ex: MS_Produto.Épico → épico concreto) |
| **Spec** | Especificação executável, output de Epistemologia |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "GENESIS hoje existe dentro do Claude.ai.                                  │
│   Como construir a infraestrutura que permite GENESIS                       │
│   existir de forma independente e evoluir autonomamente?"                   │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUBPROBLEMAS                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  DEPENDÊNCIA        │  │  PRODUÇÃO MANUAL    │  │  EVOLUÇÃO LENTA     │  │
│  │  EXTERNA            │  │                     │  │                     │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ GENESIS depende de  │  │ Artefatos são       │  │ Cada melhoria       │  │
│  │ Claude.ai para      │  │ criados manualmente │  │ exige intervenção   │  │
│  │ existir e operar    │  │ sem padronização    │  │ humana completa     │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Solução: Fábrica    │  │ Solução: Linha de   │  │ Solução: Ciclo      │  │
│  │ própria (PROMETHEUS)│  │ produção definida   │  │ autopoiético        │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **PROMETHEUS é a fábrica de código LLM que produz e sustenta GENESIS.**
>
> - PROMETHEUS fornece o "fogo" — infraestrutura, capacidades, processos produtivos
> - GENESIS usa o fogo para criar — produtos, conhecimento, soluções para usuários
> - O sistema evolui quando GENESIS especifica melhorias que PROMETHEUS implementa
>
> **Resultado:** Sistema autopoiético capaz de evoluir com menor dependência externa.

### 1.4 Relação Mitológica

```
PROMETHEUS (fábrica)
    │
    │ fornece capacidades (camadas)
    │ executa especificações (produção)
    │ hospeda o sistema (infra)
    │
    ▼
GENESIS (inteligência)
    │
    │ especifica o que construir (PO)
    │ entrega soluções (produto)
    │ coleta feedback (evolução)
    │
    ▼
USUÁRIO (humano)
```

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação no PROMETHEUS |
|----------|--------|-------------------------|
| **Autopoiese** | Maturana & Varela (1980) | Sistema que se autoproduz; PROMETHEUS + GENESIS evoluem juntos |
| **Bootstrap** | Computer Science | Usar GENESIS-Claude.ai para construir PROMETHEUS; depois migrar |
| **Camadas de Abstração** | Sistemas Operacionais | Capacidades fundamentais (C0-C4) que todos os blocos consomem |
| **Linha de Produção** | Manufatura | Entrada (spec) → processo (pipeline) → saída (artefato) |
| **Separação de Concerns** | SOLID | Blocos independentes com responsabilidades claras |
| **Versionamento Semântico** | SemVer | Blocos evoluem independentemente com versões rastreáveis |

### 2.2 Síntese: Fábrica de Código LLM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SÍNTESE: FÁBRICA DE CÓDIGO LLM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MANUFATURA TRADICIONAL          PROMETHEUS                                 │
│  ────────────────────────        ──────────────────────────────────         │
│                                                                             │
│  Matéria-prima    ─────────►     Especificação (problema estruturado)       │
│  Máquinas         ─────────►     Camadas (C0-C4)                            │
│  Linha de produção ────────►     Blocos (Infra, Produção, Genesis, Epist.)  │
│  Produto final    ─────────►     Artefato implementado                      │
│  Controle qualidade ───────►     Validação (C3)                             │
│  Melhoria contínua ────────►     Ciclo autopoiético                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 O Ciclo Bootstrap

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CICLO BOOTSTRAP                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FASE 1: Construção (agora)                                                 │
│  ─────────────────────────                                                  │
│                                                                             │
│      GENESIS-Claude.ai                                                      │
│            │                                                                │
│            │ constrói                                                       │
│            ▼                                                                │
│      PROMETHEUS v0.x                                                        │
│            │                                                                │
│            │ hospeda                                                        │
│            ▼                                                                │
│      GENESIS-Kernel v0.x                                                    │
│                                                                             │
│                                                                             │
│  FASE 2: Transição (próximo)                                                │
│  ───────────────────────────                                                │
│                                                                             │
│      GENESIS-Claude.ai ◄────► GENESIS-Kernel                                │
│            │                       │                                        │
│            │ complexo              │ contexto fechado                       │
│            │                       │                                        │
│            └───────────┬───────────┘                                        │
│                        │                                                    │
│                        ▼                                                    │
│                   PROMETHEUS                                                │
│                                                                             │
│                                                                             │
│  FASE 3: Maturidade (futuro)                                                │
│  ───────────────────────────                                                │
│                                                                             │
│      GENESIS-Nativo                                                         │
│            │                                                                │
│            │ especifica + produz                                            │
│            ▼                                                                │
│      PROMETHEUS                                                             │
│            │                                                                │
│            │ implementa + sustenta                                          │
│            ▼                                                                │
│      GENESIS-Nativo (evoluído)                                              │
│            │                                                                │
│            └──────► autopoiese ──────►                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Princípio das Camadas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PRINCÍPIO DAS CAMADAS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Inspiração: Como um Sistema Operacional funciona                           │
│                                                                             │
│  SISTEMA OPERACIONAL              PROMETHEUS                                │
│  ────────────────────             ──────────                                │
│                                                                             │
│  Hardware        ─────────►       C0 EXISTÊNCIA (repo, docker, identidade)  │
│  Drivers         ─────────►       C1 PERCEPÇÃO (logs, métricas, estado)     │
│  Kernel          ─────────►       C2 AÇÃO (escrever, executar, comunicar)   │
│  System calls    ─────────►       C3 VALIDAÇÃO (testes, gates, rollback)    │
│  Aplicações      ─────────►       C4 DECISÃO (contexto, plano, aprendizado) │
│                                                                             │
│  Cada camada superior depende das inferiores.                               │
│  Blocos não reimplementam camadas — consomem delas.                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**PROMETHEUS** é a fábrica de código LLM que:
- **Hospeda** a infraestrutura onde GENESIS roda (INFRA)
- **Produz** artefatos a partir de especificações (PRODUÇÃO)
- **Sustenta** a inteligência orquestradora (GENESIS)
- **Especifica** via método estruturado (EPISTEMOLOGIA)

### 3.2 Fronteiras

| PROMETHEUS É | PROMETHEUS NÃO É |
|--------------|------------------|
| Fábrica que produz artefatos | O produto final (isso é GENESIS para usuário) |
| Infraestrutura que hospeda | O usuário da infraestrutura |
| Camadas de capacidade | As decisões de negócio |
| Processo produtivo | O ciclo de vida do produto (isso é MS_Produto em GENESIS) |
| Quem executa specs | Quem decide prioridade de negócio |

### 3.3 Os 4 Blocos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OS 4 BLOCOS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  INFRA v.N                                                          │    │
│  │  ─────────                                                          │    │
│  │  ONDE tudo roda.                                                    │    │
│  │                                                                     │    │
│  │  • Containers (Docker)                                              │    │
│  │  • Redes e volumes                                                  │    │
│  │  • Sistemas base (Git, MM, Camunda, MongoDB, LLM Router)            │    │
│  │  • Secrets e configurações                                          │    │
│  │                                                                     │    │
│  │  Entrada: Specs de infraestrutura                                   │    │
│  │  Saída: Ambiente operacional                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PRODUÇÃO v.N                                                       │    │
│  │  ────────────                                                       │    │
│  │  COMO artefatos são produzidos.                                     │    │
│  │                                                                     │    │
│  │  • Pipelines de build                                               │    │
│  │  • Templates de artefatos (código, docs, workflows, instâncias)     │    │
│  │  • Testes automatizados                                             │    │
│  │  • Deploy e implantação                                             │    │
│  │                                                                     │    │
│  │  Entrada: Especificações (output de Epistemologia)                  │    │
│  │  Saída: Artefatos testados e implantados                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GENESIS v.N                                                        │    │
│  │  ───────────                                                        │    │
│  │  ORQUESTRA ciclo de vida e ENTREGA valor ao usuário.                │    │
│  │                                                                     │    │
│  │  • Kernel (núcleo mínimo nativo)                                    │    │
│  │  • MS_Produto (framework de ciclo de vida)                          │    │
│  │    - Classes: Produto, Épico, Release, Implantação, HealthScore...  │    │
│  │    - Estágios: Backlog → Plan → Dev → Release → Impl → Prod         │    │
│  │  • Contextos especializados (Meta Sistemas)                         │    │
│  │  • Módulos (Raciocínio, Análise, Autonomia)                         │    │
│  │                                                                     │    │
│  │  Entrada: Problema/dor do usuário                                   │    │
│  │  Saída: Solução entregue + demandas de especificação                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  EPISTEMOLOGIA v.N                                                  │    │
│  │  ─────────────────                                                  │    │
│  │  COMO especificar qualquer coisa para a fábrica.                    │    │
│  │                                                                     │    │
│  │  • Método M0-M4                                                     │    │
│  │    - M0: Problema (glossário, gap)                                  │    │
│  │    - M1: Marco Teórico (referências)                                │    │
│  │    - M2: Objeto (escopo, fronteiras)                                │    │
│  │    - M3: Classe (estrutura, métodos)                                │    │
│  │    - M4: Consolidação (artefato spec)                               │    │
│  │  • Agnóstico ao tipo de artefato                                    │    │
│  │  • Padrões de especificação                                         │    │
│  │                                                                     │    │
│  │  Entrada: Gap identificado, objeto a especificar                    │    │
│  │  Saída: Especificação executável pela PRODUÇÃO                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 As 5 Camadas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AS 5 CAMADAS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╔═════════════════════════════════════════════════════════════════════╗    │
│  ║  CAMADA 4 — DECISÃO                                                 ║    │
│  ║  "O que fazer dado o que sei?"                                      ║    │
│  ╠═════════════════════════════════════════════════════════════════════╣    │
│  ║  • Contexto (entender o problema)                                   ║    │
│  ║  • Planejamento (definir ações)                                     ║    │
│  ║  • Execução orquestrada (fazer na ordem certa)                      ║    │
│  ║  • Aprendizado (registrar o que funcionou)                          ║    │
│  ╚═════════════════════════════════════════════════════════════════════╝    │
│                              ▲                                              │
│                              │                                              │
│  ╔═════════════════════════════════════════════════════════════════════╗    │
│  ║  CAMADA 3 — VALIDAÇÃO                                               ║    │
│  ║  "Isso está certo? É seguro?"                                       ║    │
│  ╠═════════════════════════════════════════════════════════════════════╣    │
│  ║  • Testes automatizados (isso funciona?)                            ║    │
│  ║  • Ambientes isolados (testar sem quebrar prod)                     ║    │
│  ║  • Gates de qualidade (passou nos critérios?)                       ║    │
│  ║  • Rollback (desfazer se necessário)                                ║    │
│  ╚═════════════════════════════════════════════════════════════════════╝    │
│                              ▲                                              │
│                              │                                              │
│  ╔═════════════════════════════════════════════════════════════════════╗    │
│  ║  CAMADA 2 — AÇÃO                                                    ║    │
│  ║  "Executar a intenção no mundo"                                     ║    │
│  ╠═════════════════════════════════════════════════════════════════════╣    │
│  ║  • Escrita de código (criar/modificar arquivos)                     ║    │
│  ║  • Execução de comandos (build, test, run)                          ║    │
│  ║  • Comunicação (notificar, pedir ajuda)                             ║    │
│  ║  • Persistência (salvar estado/decisões)                            ║    │
│  ╚═════════════════════════════════════════════════════════════════════╝    │
│                              ▲                                              │
│                              │                                              │
│  ╔═════════════════════════════════════════════════════════════════════╗    │
│  ║  CAMADA 1 — PERCEPÇÃO                                               ║    │
│  ║  "O que está acontecendo?"                                          ║    │
│  ╠═════════════════════════════════════════════════════════════════════╣    │
│  ║  • Logs (o que aconteceu)                                           ║    │
│  ║  • Métricas (como está agora)                                       ║    │
│  ║  • Traces (como as partes se conectam)                              ║    │
│  ║  • Estado (configuração atual)                                      ║    │
│  ╚═════════════════════════════════════════════════════════════════════╝    │
│                              ▲                                              │
│                              │                                              │
│  ╔═════════════════════════════════════════════════════════════════════╗    │
│  ║  CAMADA 0 — EXISTÊNCIA                                              ║    │
│  ║  "Eu existo, tenho forma, tenho identidade"                         ║    │
│  ╠═════════════════════════════════════════════════════════════════════╣    │
│  ║  • Repositório (código existe em algum lugar)                       ║    │
│  ║  • Versionamento (histórico de mudanças)                            ║    │
│  ║  • Identidade (o sistema sabe "quem é")                             ║    │
│  ╚═════════════════════════════════════════════════════════════════════╝    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Matriz Blocos × Camadas

| | INFRA | PRODUÇÃO | GENESIS | EPISTEMOLOGIA |
|---|-------|----------|---------|---------------|
| **C4 DECISÃO** | Decide scaling, migração | Decide qual pipeline | Decide próximo passo no ciclo de vida | Decide qual fase M0-M4 |
| **C3 VALIDAÇÃO** | Testa infra (smoke) | Testa artefatos (CI/CD) | Valida entregas (aceite) | Valida spec (completa?) |
| **C2 AÇÃO** | Provisiona containers | Builda, deploya, persiste | Orquestra fluxos, entrega valor | Documenta, estrutura |
| **C1 PERCEPÇÃO** | Monitora recursos | Monitora pipelines | Monitora ciclo de vida, feedback | Observa gaps |
| **C0 EXISTÊNCIA** | Docker, configs | Templates, scripts | Kernel, MS_Produto, Contextos | Método M0-M4, padrões |

### 3.6 Dependência entre Blocos

```
                         ┌─────────────────────┐
                         │   EPISTEMOLOGIA     │
                         │   (como especificar)│
                         └──────────┬──────────┘
                                    │
               ┌────────────────────┼────────────────────┐
               │ especifica         │ especifica         │ especifica
               │                    │                    │
               ▼                    ▼                    ▼
          ┌─────────┐         ┌─────────┐         ┌─────────┐
          │ INFRA   │◄───────►│PRODUÇÃO │◄───────►│ GENESIS │
          │  v.N    │         │  v.N    │         │  v.N    │
          └────┬────┘         └────┬────┘         └────┬────┘
               │                   │                   │
               │   hospeda         │   produz          │   orquestra
               │                   │                   │
               └───────────────────┴───────────────────┘
                                   │
                                   ▼
                        ╔═══════════════════════╗
                        ║   CAMADAS (C0-C4)     ║
                        ║   compartilhadas      ║
                        ╚═══════════════════════╝
```

---

## 4. Classe (M3)

### 4.1 Classe: PROMETHEUS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: PROMETHEUS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ─────────                                                                  │
│  + nome: String = "PROMETHEUS"                                              │
│  + versao: SemVer                                                           │
│  + blocos: [INFRA, PRODUÇÃO, GENESIS, EPISTEMOLOGIA]                        │
│  + camadas: [C0, C1, C2, C3, C4]                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + receber_demanda(demanda) → spec | artefato                               │
│  + especificar(gap) → spec                                                  │
│  + produzir(spec) → artefato_implementado                                   │
│  + validar(artefato) → {passou: bool, erros?: []}                           │
│  + implantar(artefato, ambiente) → resultado                                │
│  + evoluir(bloco, versao_nova) → sistema_atualizado                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Composição                                                                 │
│  ──────────                                                                 │
│  - INFRA: Bloco                                                             │
│  - PRODUÇÃO: Bloco                                                          │
│  - GENESIS: Bloco                                                           │
│  - EPISTEMOLOGIA: Bloco                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Classe: Bloco (abstrata)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: BLOCO                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ─────────                                                                  │
│  + nome: String                                                             │
│  + versao: SemVer                                                           │
│  + status: ATIVO | INATIVO | ERRO                                           │
│  + camadas_consumidas: [Camada]                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + inicializar() → void                                                     │
│  + health_check() → {status, detalhes}                                      │
│  + consumir_camada(camada) → capacidade                                     │
│  + versionar(tipo: MAJOR|MINOR|PATCH) → nova_versao                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Implementações                                                             │
│  ───────────────                                                            │
│  - BlocoInfra extends Bloco                                                 │
│  - BlocoProducao extends Bloco                                              │
│  - BlocoGenesis extends Bloco                                               │
│  - BlocoEpistemologia extends Bloco                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Classe: Camada (abstrata)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: CAMADA                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ─────────                                                                  │
│  + nivel: 0 | 1 | 2 | 3 | 4                                                 │
│  + nome: String                                                             │
│  + capacidades: [Capacidade]                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + prover(capacidade) → interface                                           │
│  + depende_de() → [Camada]                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Implementações                                                             │
│  ───────────────                                                            │
│  - C0_Existencia: repo, versao, identidade                                  │
│  - C1_Percepcao: logs, metricas, traces, estado                             │
│  - C2_Acao: escrever, executar, comunicar, persistir                        │
│  - C3_Validacao: testar, isolar, gate, rollback                             │
│  - C4_Decisao: contexto, planejar, orquestrar, aprender                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Implementação das Camadas

| Camada | Capacidade | Implementação Concreta |
|--------|------------|------------------------|
| **C0** | repo | Git (GitHub) |
| **C0** | versao | SemVer + tags |
| **C0** | identidade | Manifesto do sistema |
| **C1** | logs | Loki / arquivos estruturados |
| **C1** | metricas | Prometheus (a ferramenta) |
| **C1** | traces | OpenTelemetry |
| **C1** | estado | MongoDB + configs |
| **C2** | escrever | Git + MCP |
| **C2** | executar | Docker + Bash |
| **C2** | comunicar | Mattermost |
| **C2** | persistir | GitHub (def) + MongoDB (trans) |
| **C3** | testar | CI/CD pipelines |
| **C3** | isolar | Docker containers |
| **C3** | gate | Camunda checkpoints |
| **C3** | rollback | Git revert + Docker rollback |
| **C4** | contexto | LLM + Meta Sistemas |
| **C4** | planejar | GENESIS + Epistemologia |
| **C4** | orquestrar | Camunda workflows |
| **C4** | aprender | Catálogo + feedback loop |

### 4.5 GENESIS contém MS_Produto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS CONTÉM MS_PRODUTO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  GENESIS                                                              │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │  MS_PRODUTO (Framework de Ciclo de Vida)                        │  │  │
│  │  │                                                                 │  │  │
│  │  │  Classes (Clabjects):                                           │  │  │
│  │  │  • Produto        → instâncias em MongoDB                       │  │  │
│  │  │  • Épico          → instâncias em MongoDB                       │  │  │
│  │  │  • Release        → instâncias em MongoDB                       │  │  │
│  │  │  • Implantação    → instâncias em MongoDB                       │  │  │
│  │  │  • Treinamento    → instâncias em MongoDB                       │  │  │
│  │  │  • HealthScore    → instâncias em MongoDB                       │  │  │
│  │  │  • Feedback       → instâncias em MongoDB                       │  │  │
│  │  │                                                                 │  │  │
│  │  │  Estágios:                                                      │  │  │
│  │  │  Backlog → Plan → Dev → Release → Impl → Prod → Sucesso         │  │  │
│  │  │                                                                 │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                                                                       │  │
│  │  Outros componentes:                                                  │  │
│  │  • Kernel                                                             │  │
│  │  • Contextos (Meta Sistemas)                                          │  │
│  │  • Módulos (Raciocínio, Análise, Autonomia)                           │  │
│  │  • Catálogo                                                           │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Fluxo Clabject: Classe → Instância

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO CLABJECT: CLASSE → INSTÂNCIA                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  EXEMPLO: Criar um Épico para MS_Seleção                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1. GENESIS identifica necessidade                                  │    │
│  │     "Preciso criar Épico 'Matching Inteligente' para MS_Seleção"    │    │
│  │                                                                     │    │
│  │     MS_Produto define que Épico TEM:                                │    │
│  │     - titulo (String)                                               │    │
│  │     - produto_ref (String)                                          │    │
│  │     - okr_ref (String?)                                             │    │
│  │     - status (Enum)                                                 │    │
│  │     - backlog_items ([String])                                      │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  2. GENESIS dispara EPISTEMOLOGIA                                   │    │
│  │                                                                     │    │
│  │     M0: Gap = "Não existe épico de matching"                        │    │
│  │     M1: Referência = MS_Produto.Epico                               │    │
│  │     M2: Escopo = este épico específico                              │    │
│  │     M3: Atributos concretos:                                        │    │
│  │         titulo: "Matching Inteligente"                              │    │
│  │         produto_ref: "ms_selecao"                                   │    │
│  │         okr_ref: "OKR-2025-Q1-03"                                   │    │
│  │     M4: Spec consolidada                                            │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  3. PRODUÇÃO recebe spec                                            │    │
│  │                                                                     │    │
│  │     - Valida spec contra schema de Épico                            │    │
│  │     - Cria documento MongoDB                                        │    │
│  │     - Executa hooks (notifica, indexa no Catálogo)                  │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  4. INSTÂNCIA existe                                                │    │
│  │                                                                     │    │
│  │     MongoDB.epicos:                                                 │    │
│  │     {                                                               │    │
│  │       id: "epico_ms_selecao_matching",                              │    │
│  │       titulo: "Matching Inteligente",                               │    │
│  │       produto_ref: "ms_selecao",                                    │    │
│  │       okr_ref: "OKR-2025-Q1-03",                                    │    │
│  │       status: "Backlog",                                            │    │
│  │       backlog_items: []                                             │    │
│  │     }                                                               │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  5. Ciclo de vida continua (MS_Produto)                             │    │
│  │                                                                     │    │
│  │     Épico recebe BacklogItems                                       │    │
│  │         ↓                                                           │    │
│  │     BacklogItems vão para Sprint                                    │    │
│  │         ↓                                                           │    │
│  │     Sprint gera Release                                             │    │
│  │         ↓                                                           │    │
│  │     Release vai para Implantação                                    │    │
│  │         ↓                                                           │    │
│  │     ...                                                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Fluxo de Produção

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUXO DE PRODUÇÃO                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. DOR DO USUÁRIO ou GAP INTERNO                                           │
│     │                                                                       │
│     ▼                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  2. GENESIS (orquestra ciclo de vida)                               │    │
│  │     │                                                               │    │
│  │     ├── Classifica: é Produto novo? Épico? Release? Melhoria?       │    │
│  │     ├── Consulta MS_Produto: qual classe preciso instanciar?        │    │
│  │     └── Dispara especificação                                       │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  3. EPISTEMOLOGIA (especifica)                                      │    │
│  │     │                                                               │    │
│  │     ├── M0: Define o problema/gap                                   │    │
│  │     ├── M1: Marco teórico (referência à classe em MS_Produto)       │    │
│  │     ├── M2: Objeto (escopo desta instância)                         │    │
│  │     ├── M3: Atributos concretos                                     │    │
│  │     └── M4: Spec consolidada                                        │    │
│  │                                                                     │    │
│  │     Saída: spec executável                                          │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  4. PRODUÇÃO (implementa)                                           │    │
│  │     │                                                               │    │
│  │     ├── Valida spec contra schema                                   │    │
│  │     ├── Seleciona template/pipeline                                 │    │
│  │     ├── Gera artefato (código, doc, instância MongoDB)              │    │
│  │     ├── Executa testes (C3)                                         │    │
│  │     └── Empacota para deploy                                        │    │
│  │                                                                     │    │
│  │     Saída: artefato testado                                         │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  5. INFRA (deploya)                                                 │    │
│  │     │                                                               │    │
│  │     ├── Provisiona ambiente (se necessário)                         │    │
│  │     ├── Deploya artefato                                            │    │
│  │     └── Ativa monitoramento (C1)                                    │    │
│  │                                                                     │    │
│  │     Saída: artefato implantado                                      │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│                                 ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  6. GENESIS (continua ciclo de vida)                                │    │
│  │     │                                                               │    │
│  │     ├── Integra artefato ao sistema                                 │    │
│  │     ├── Avança estágio no MS_Produto                                │    │
│  │     ├── Entrega valor ao usuário                                    │    │
│  │     └── Coleta feedback → pode gerar novo gap                       │    │
│  │                                                                     │    │
│  │     SE novo gap → volta para 2                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.8 Ciclo Autopoiético

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CICLO AUTOPOIÉTICO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│     ┌───────────────────────────────────────────────────────────────┐       │
│     │                                                               │       │
│     │   GENESIS v.N operando ciclo de vida (MS_Produto)             │       │
│     │       │                                                       │       │
│     │       │ detecta limitação ou feedback                         │       │
│     │       │ "Preciso de capacidade X"                             │       │
│     │       ▼                                                       │       │
│     │   EPISTEMOLOGIA v.N                                           │       │
│     │       │                                                       │       │
│     │       │ Especifica via M0-M4                                  │       │
│     │       ▼                                                       │       │
│     │   PRODUÇÃO v.N                                                │       │
│     │       │                                                       │       │
│     │       │ Implementa artefato                                   │       │
│     │       ▼                                                       │       │
│     │   INFRA v.N                                                   │       │
│     │       │                                                       │       │
│     │       │ Deploya mudança                                       │       │
│     │       ▼                                                       │       │
│     │   PROMETHEUS v.N+1                                            │       │
│     │       │                                                       │       │
│     │       │ Sistema evoluído                                      │       │
│     │       ▼                                                       │       │
│     │   GENESIS v.N+1                                               │       │
│     │       │                                                       │       │
│     │       │ Agora tem capacidade X                                │       │
│     │       │ Continua ciclo de vida com mais poder                 │       │
│     │       │                                                       │       │
│     └───────┴───────────────────────────────────────────────────────┘       │
│                                                                             │
│  O QUE PODE EVOLUIR:                                                        │
│  • GENESIS: novos módulos, contextos, classes em MS_Produto                 │
│  • EPISTEMOLOGIA: novos padrões M0-M4, templates de spec                    │
│  • PRODUÇÃO: novos pipelines, templates de artefato                         │
│  • INFRA: novos sistemas, capacidades de hosting                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.9 Interface GENESIS ↔ EPISTEMOLOGIA

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INTERFACE GENESIS ↔ EPISTEMOLOGIA                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS sabe O QUÊ precisa (via MS_Produto)                                │
│  EPISTEMOLOGIA sabe COMO especificar                                        │
│                                                                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │   GENESIS                         EPISTEMOLOGIA                     │    │
│  │   ────────                        ─────────────                     │    │
│  │                                                                     │    │
│  │   MS_Produto.Epico ─────────────► M1: Classe de referência          │    │
│  │   (classe)                                                          │    │
│  │                                                                     │    │
│  │   "Matching Inteligente" ───────► M2-M3: Instância específica       │    │
│  │   (instância desejada)                                              │    │
│  │                                                                     │    │
│  │   ◄──────────────────────────────  M4: Spec consolidada             │    │
│  │                                                                     │    │
│  │                                          │                          │    │
│  │                                          ▼                          │    │
│  │                                    PRODUÇÃO                         │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│                                                                             │
│  GENESIS como PO:                                                           │
│  • Define O QUÊ criar (qual classe, qual instância)                         │
│  • Prioriza (qual primeiro)                                                 │
│  • Valida (aceite)                                                          │
│                                                                             │
│  EPISTEMOLOGIA como Analista:                                               │
│  • Estrutura a necessidade (M0)                                             │
│  • Referencia padrões (M1)                                                  │
│  • Detalha escopo (M2-M3)                                                   │
│  • Entrega spec (M4)                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.10 Tipos de Artefato

| Classe MS_Produto | Tipo Artefato | Destino | Template |
|-------------------|---------------|---------|----------|
| **Produto** | Instância | MongoDB.produtos | schema_produto.json |
| **Épico** | Instância | MongoDB.epicos | schema_epico.json |
| **Release** | Instância + Tag | MongoDB.releases + Git tag | schema_release.json |
| **Implantação** | Instância + Checklist | MongoDB.implantacoes | schema_implantacao.json |
| **Treinamento** | Instância + Docs | MongoDB.treinamentos + GitHub | schema_treinamento.json |
| **HealthScore** | Instância | MongoDB.health_scores | schema_health.json |
| **Feedback** | Instância | MongoDB.feedbacks | schema_feedback.json |
| **BacklogItem** | Instância | MongoDB.backlog | schema_backlog.json |
| **Meta Sistema** | Definição .md | GitHub | template_ms.md |
| **Código** | Módulo | GitHub + Deploy | template_codigo |
| **Workflow** | BPMN | Camunda | template_workflow.bpmn |

### 4.11 Matriz de Influência Evolutiva

| Quando evolui → | INFRA | PRODUÇÃO | GENESIS | EPISTEMOLOGIA |
|-----------------|-------|----------|---------|---------------|
| **INFRA** | — | Habilita novos pipelines | Pode hospedar mais features | Novos artefatos possíveis |
| **PRODUÇÃO** | Pode exigir nova infra | — | Novos artefatos disponíveis | Novos mecanismos de entrega |
| **GENESIS** | Especifica necessidades | Demanda novos pipelines | — | Refina método |
| **EPISTEMOLOGIA** | Documenta padrões | Define specs de produção | Alimenta inteligência | — |

---

## 5. Referências

### 5.1 Internas

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Bloco GENESIS - especificação do produto |
| genesis/GENESIS_Arquitetura.md | Arquitetura do bloco GENESIS |
| docs/00_E/00_E_Epistemologia.md | Bloco EPISTEMOLOGIA - método M0-M4 |
| docs/04_P/MS_Produto.md | Framework de ciclo de vida dentro de GENESIS |
| docs/00_I/00_I_1_1_GitHub.md | Persistência de definições (C0) |
| docs/00_I/00_I_1_3_MongoDB.md | Persistência transacional (C0) |
| docs/00_I/00_I_2_Gestao_Projetos.md | Backlog e Sprint (usado por MS_Produto) |

### 5.2 Externas

| Fonte | Conceito |
|-------|----------|
| Maturana & Varela (1980) | Autopoiesis |
| Shannon (1948) | Entropia |
| SemVer | Versionamento Semântico |
| SOLID | Separação de responsabilidades |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-14 | Documento inicial. M0-M4 consolidados. 4 blocos (Infra, Produção, Genesis, Epistemologia), 5 camadas (C0-C4), ciclo autopoiético, fluxo clabject. |

---
arquivo_alvo: genesis/GENESIS_Arquitetura.md
tipo_patch: substituir
ancora_inicio: "### 6.1 Visão Geral"
ancora_fim: "### 6.2 Tools"
conteudo: |
  ### 6.1 Visão Geral

  ```
  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                   COMPONENTES GENESIS                                               │
  ├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │                                                                                                     │
  │  ┌───────────────────────────────────────────────────────────────────────────────────────────────┐  │
  │  │                                        SISTEMA                                                │  │
  │  │                                                                                               │  │
  │  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
  │  │  │                                     GENESIS                                             │  │  │
  │  │  │                                  (Orquestrador)                                         │  │  │
  │  │  │                                                                                         │  │  │
  │  │  │       ┌─────────────┐                              ┌─────────────┐                      │  │  │
  │  │  │       │  Contextos  │                              │    Tools    │                      │  │  │
  │  │  │       │ (Meta Sist.)│                              │  externas   │                      │  │  │
  │  │  │       └─────────────┘                              └─────────────┘                      │  │  │
  │  │  │                                                                                         │  │  │
  │  │  │  ┌───────────────────────────────────────────────────────────────────────────────────┐  │  │  │
  │  │  │  │                              MÓDULOS (opcionais)                                  │  │  │  │
  │  │  │  │                                                                                   │  │  │  │
  │  │  │  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │  │  │  │
  │  │  │  │   │ Raciocínio  │   │  Análise    │   │  Autonomia  │   │    ...      │           │  │  │  │
  │  │  │  │   │  (H→E→I→D)  │   │ (métricas)  │   │  (Guiado →  │   │  (futuros)  │           │  │  │  │
  │  │  │  │   │             │   │             │   │   Autônomo) │   │             │           │  │  │  │
  │  │  │  │   └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘           │  │  │  │
  │  │  │  │                                                                                   │  │  │  │
  │  │  │  └───────────────────────────────────────────────────────────────────────────────────┘  │  │  │
  │  │  │                                                                                         │  │  │
  │  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
  │  │                                                                                               │  │
  │  └───────────────────────────────────────────────────────────────────────────────────────────────┘  │
  │                                                                                                     │
  │  COMPONENTES:                                                                                       │
  │                                                                                                     │
  │  • Contextos: Meta Sistemas carregados (conhecimento estruturado)                                   │
  │  • Tools externas: APIs, integrações, banco de dados                                                │
  │  • Módulos: Capacidades opcionais que podem ser compostas                                           │
  │    - Raciocínio: decisão estruturada via H→E→I→D                                                    │
  │    - Análise: métricas, agregação, dados                                                            │
  │    - Autonomia: controle do loop (Guiado/Assistido/Autônomo)                                        │
  │                                                                                                     │
  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘
  ```

descricao: Corrige diagrama de componentes para incluir todos os módulos (Raciocínio, Análise, Autonomia) no mesmo nível
---

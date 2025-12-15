---
nome: GENESIS
versao: "3.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Publicado
nivel: C1
camadas: [L0, L1, L2, L3, L4]
depende_de:
  - 00_E_2_1_Modulo_Catalogo
  - 00_I_1_1_GitHub
  - 00_I_1_3_MongoDB
---

# GENESIS v3.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **GENESIS** | Inteligência Orquestradora que entende, busca, roteia e persiste |
| **Inteligência Híbrida** | Amplificação cognitiva via Humano + LLM + Sistema |
| **Entropia Contextual** | Perda de precisão em conversas longas; informação degrada |
| **Bootstrap Circular** | Dependência mútua entre componentes na inicialização |
| **STUB** | Versão mínima hardcoded que quebra ciclo circular |
| **CONHECER** | Natureza de problema: buscar/criar conhecimento estruturado |
| **DECIDIR** | Natureza de problema: tomar decisão baseada em contexto |
| **GERENCIAR** | Natureza de problema: organizar trabalho (backlog/sprint) |
| **Contexto Especializado** | LLM operando com Meta Sistema carregado |
| **Tool** | Capacidade executável que o LLM pode chamar (API, código, integração) |
| **Loop Humano** | Humano controla cada transição de contexto (padrão GENESIS) |
| **Módulo Autonomia** | Módulo opcional que controla nível de autonomia do loop |
| **Capability** | Algo que GENESIS sabe fazer (CONHECER, DECIDIR, GERENCIAR) |
| **Discovery** | Usuário descobre capabilities perguntando "o que você sabe fazer?" |
| **Persistência Híbrida** | GitHub para definições, MongoDB para transações |
| **Autopoiese** | Propriedade de sistemas que se autoproduzem e evoluem |
| **PROMETHEUS** | Fábrica que GENESIS usa para executar especificações |
| **Camadas L0-L4** | Capacidades fundamentais para autopoiese |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "Como amplificar capacidade cognitiva humana usando LLMs,                  │
│   sem que o conhecimento degrade e o progresso se perca?"                   │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUBPROBLEMAS                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │  BOOTSTRAP CIRCULAR │  │ ENTROPIA CONTEXTUAL │  │  FALTA DE PROPÓSITO │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Para definir o      │  │ Conversas longas    │  │ Para que serve      │  │
│  │ sistema, precisa    │  │ perdem precisão.    │  │ tudo isso?          │  │
│  │ do sistema.         │  │ Contexto dilui.     │  │ Qual a visão?       │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ Solução: STUB       │  │ Solução: Arquivos   │  │ Solução:            │  │
│  │ hardcoded           │  │ atômicos + índice   │  │ Inteligência        │  │
│  │                     │  │                     │  │ Híbrida             │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GENESIS                                        │
│  Inteligência Orquestradora que define Inteligência Híbrida:                │
│  Humano (intenção) + LLM (fluência) + Sistema (estrutura)                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **GENESIS é a Inteligência Orquestradora que define a visão de Inteligência Híbrida: amplificar capacidade cognitiva humana via sistema estruturado.**
>
> - GENESIS define o PROPÓSITO (porquê) e ORQUESTRA (quem faz o quê)
> - Epistemologia implementa o MÉTODO (como estruturar conhecimento)
> - Raciocínio implementa DECISÃO (como tomar decisões)
> - Catálogo fornece MEMÓRIA (como buscar/persistir)
> - Gestão de Projetos organiza TRABALHO (backlog/sprints)
> - **MS_Produto** gerencia CICLO DE VIDA (produtos criados)
> - **PROMETHEUS** executa especificações (fábrica)
>
> **Resultado:** Sistema autopoiético que reduz dispêndio de energia humana na execução de atividades cognitivas, com conhecimento que persiste e acumula.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação no GENESIS |
|----------|--------|----------------------|
| **Cognição Distribuída** | Hutchins (1995) | Cognição não está só na mente, está no sistema Humano+LLM+Sistema |
| **Entropia** | Shannon (1948) | Estrutura explícita reduz incerteza e degradação |
| **Autopoiesis** | Maturana & Varela (1980) | Sistema se autoproduz e gera outros (Meta Sistemas) |
| **Bootstrap** | Computer Science | STUB quebra dependência circular; refatora depois |
| **Composição** | SOLID Principles | Módulos opcionais, não forçados |

### 2.2 Síntese: Inteligência Híbrida

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SÍNTESE: INTELIGÊNCIA HÍBRIDA                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                      │
│  │   HUMANO    │    │     LLM     │    │   SISTEMA   │                      │
│  │  Intenção   │ +  │  Fluência   │ +  │  Estrutura  │ = AMPLIFICAÇÃO       │
│  │  Supervisão │    │  Execução   │    │  Persistên- │   COGNITIVA          │
│  │  Validação  │    │  Geração    │    │  cia        │                      │
│  └─────────────┘    └─────────────┘    └─────────────┘                      │
│                                                                             │
│  Cognição distribuída entre os três componentes.                            │
│  Sistema reduz entropia e persiste conhecimento.                            │
│  Resultado: menos energia humana, mais progresso acumulado.                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Autopoiese e Camadas L0-L4

#### O que é Autopoiese

Autopoiese (Maturana & Varela, 1980) é a propriedade de sistemas que se **autoproduzem e evoluem**. Um sistema autopoiético:
- Produz os componentes que o constituem
- Mantém sua organização enquanto muda estruturalmente
- Evolui através de interação com o ambiente

**No contexto GENESIS:** Autopoiese é a propriedade emergente da interação entre GENESIS (inteligência) e PROMETHEUS (fábrica). Nenhum dos dois é autopoiético sozinho:
- GENESIS sem PROMETHEUS: especifica mas não executa
- PROMETHEUS sem GENESIS: executa mas não sabe o quê

**Juntos** = sistema autopoiético.

#### As 5 Camadas (L0-L4)

Para ser autopoiético, um sistema precisa de 5 capacidades fundamentais:

| Camada | Nome | Capacidade | Pergunta que responde |
|--------|------|------------|----------------------|
| **L0** | Existência | Ter identidade, versão, repositório | "Eu existo?" |
| **L1** | Percepção | Observar-se (logs, métricas, estado) | "O que está acontecendo?" |
| **L2** | Ação | Executar mudanças no mundo | "Como faço algo?" |
| **L3** | Validação | Testar, verificar, reverter | "Está certo? É seguro?" |
| **L4** | Decisão | Decidir direção e prioridades | "O que fazer agora?" |

#### Como GENESIS e PROMETHEUS manifestam L0-L4

| Camada | GENESIS manifesta como | PROMETHEUS manifesta como |
|--------|------------------------|---------------------------|
| **L0 Existência** | Kernel, Catálogo, GENESIS.md | Docker configs, Git, manifesto |
| **L1 Percepção** | Monitora conversas, coleta feedback | Logs, métricas, traces, estado |
| **L2 Ação** | Orquestra fluxos, especifica artefatos | Provisiona containers, deploya |
| **L3 Validação** | Valida entregas (aceite), testa specs | CI/CD, testes automatizados, gates |
| **L4 Decisão** | Decide próximo passo, prioriza | Decide pipeline, scaling, rollback |

#### Ciclo Autopoiético

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CICLO AUTOPOIÉTICO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│     GENESIS (inteligência)              PROMETHEUS (fábrica)                │
│     ══════════════════════              ════════════════════                │
│                                                                             │
│     1. Detecta gap (L1 Percepção)                                           │
│            │                                                                │
│            ▼                                                                │
│     2. Decide solução (L4 Decisão)                                          │
│            │                                                                │
│            ▼                                                                │
│     3. Especifica via Epistemologia ────────►  4. Recebe spec               │
│                                                      │                      │
│                                                      ▼                      │
│                                               5. Executa (L2 Ação)          │
│                                                      │                      │
│                                                      ▼                      │
│                                               6. Valida (L3 Validação)      │
│                                                      │                      │
│     8. Integra artefato  ◄──────────────────  7. Entrega artefato           │
│            │                                                                │
│            ▼                                                                │
│     9. GENESIS v.N+1 (evoluído)                                             │
│            │                                                                │
│            └──────► volta para 1 (novo gap?)                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**GENESIS** é a Inteligência Orquestradora que:
- **Entende** input do usuário e classifica: CONHECER, DECIDIR ou GERENCIAR
- **Busca** no Catálogo conhecimento, decisão ou projeto existente
- **Roteia** para existente ou **Cria** novo via sistema apropriado
- **Persiste** dados no destino correto: GitHub (definições) ou MongoDB (transações)
- **Especifica** artefatos que PROMETHEUS executa
- **Resolve** Bootstrap Circular via STUB
- **Reduz** Entropia Contextual via arquivos atômicos + índice

### 3.2 Fronteiras

| GENESIS É | GENESIS NÃO É |
|-----------|---------------|
| Inteligência Orquestradora | Executor físico (isso é PROMETHEUS) |
| Classifica CONHECER vs DECIDIR vs GERENCIAR | Conteúdo de negócio |
| Fornece Catálogo como memória | O método de especificação (isso é Epistemologia) |
| Roteia ou delega criação | Implementação de M0-M4 (isso é Epistemologia) |
| Propósito (PORQUÊ) | Método (isso é Epistemologia) |
| Decide ONDE persistir (GitHub vs MongoDB) | COMO persistir (isso é responsabilidade de cada sistema) |
| Especifica o que construir | Executa construção (isso é PROMETHEUS) |
| Organismo autopoiético | Fábrica instrumental (isso é PROMETHEUS) |

### 3.3 Hierarquia de Responsabilidades

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA DE RESPONSABILIDADES                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Nível C1) ─── INTELIGÊNCIA ORQUESTRADORA                          │
│  │  • Entende: CONHECER, DECIDIR ou GERENCIAR                               │
│  │  • Busca: Catálogo                                                       │
│  │  • Roteia: existente ou cria novo                                        │
│  │  • Persiste: decide ONDE (GitHub ou MongoDB), delega COMO                │
│  │  • Especifica: envia specs para PROMETHEUS                               │
│  │                                                                          │
│  ├──► CATÁLOGO (Nível C3) ─── MEMÓRIA                                       │
│  │    • indexar(item, chave, metadata)                                      │
│  │    • buscar(query) → [{item, score}]                                     │
│  │    • Agnóstico: não sabe o que armazena                                  │
│  │                                                                          │
│  ├──► EPISTEMOLOGIA (Nível C3) ─── MÉTODO (CONHECER)                        │
│  │    • Ciclo M0-M4 obrigatório                                             │
│  │    • Cria Meta Sistemas estruturados                                     │
│  │                                                                          │
│  ├──► RACIOCÍNIO (Módulo) ─── DECISÃO (DECIDIR)                             │
│  │    • Ciclo H→E→I→D                                                       │
│  │    • Indexa decisões no Catálogo                                         │
│  │                                                                          │
│  ├──► GESTÃO DE PROJETOS (Nível C2) ─── TRABALHO (GERENCIAR)                │
│  │    • Backlog: captura, enriquece itens de trabalho                       │
│  │    • Sprint: ciclos de execução focada                                   │
│  │    • Orquestra promoção backlog → sprint                                 │
│  │                                                                          │
│  ├──► MS_PRODUTO (Nível C4) ─── CICLO DE VIDA (PRODUTO)                     │
│  │    • Gerencia: Épico → Backlog → Sprint → Release → Implantação → CS     │
│  │    • Estende: Backlog (+RICE, +épico) e Sprint (+release)                │
│  │    • Health Score: monitora sucesso do cliente                           │
│  │    • Feedback Loop: CS → Backlog → Sprint → Release                      │
│  │                                                                          │
│  ├──► PERSISTÊNCIA (Nível C2) ─── INFRAESTRUTURA                            │
│  │    ├─ GitHub: decide COMO persistir definições                           │
│  │    │   • persistir_md() → criar() | editar() | substituir()              │
│  │    │   • Ref: docs/00_I/00_I_1_1_GitHub.md                               │
│  │    │                                                                     │
│  │    └─ MongoDB: decide COMO persistir transações                          │
│  │        • persistir() → inserir() | atualizar()                           │
│  │        • Ref: docs/00_I/00_I_1_3_MongoDB.md                              │
│  │                                                                          │
│  └──► PROMETHEUS ─── FÁBRICA (EXECUÇÃO)                                     │
│       • INFRA: onde roda (Docker, redes, sistemas)                          │
│       • PRODUÇÃO: workforce (pipelines, deploy)                             │
│       • Ref: genesis/PROMETHEUS.md                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Relação com Epistemologia e PROMETHEUS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS × EPISTEMOLOGIA × PROMETHEUS                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              GENESIS                                        │
│                          (Inteligência)                                     │
│                               │                                             │
│              ┌────────────────┼────────────────┐                            │
│              │                │                │                            │
│              ▼                ▼                ▼                            │
│         CATÁLOGO       INTERPRETAÇÃO         USA                            │
│         (memória)       (roteamento)          │                             │
│                                               ▼                             │
│                                         EPISTEMOLOGIA                       │
│                                           (método)                          │
│                                               │                             │
│                                               ▼                             │
│                                    ┌───────────────────────┐                │
│                                    │   Meta Sistemas (MS)  │                │
│                                    │   ─────────────────   │                │
│                                    │   • MS_Produto        │                │
│                                    │   • MS_Seleção        │                │
│                                    │   • MS_X              │                │
│                                    └───────────────────────┘                │
│                                                                             │
│              │                                                              │
│              │ especifica                                                   │
│              ▼                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          PROMETHEUS                                 │    │
│  │                           (Fábrica)                                 │    │
│  │                                                                     │    │
│  │         ┌─────────────────┐      ┌─────────────────┐                │    │
│  │         │      INFRA      │      │    PRODUÇÃO     │                │    │
│  │         │   (onde roda)   │      │   (workforce)   │                │    │
│  │         └─────────────────┘      └─────────────────┘                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│              │                                                              │
│              │ executa                                                      │
│              ▼                                                              │
│         ARTEFATO IMPLANTADO                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Papéis

| Componente | Papel | Fornece |
|------------|-------|---------|
| **GENESIS** | Organismo (inteligência) | Catálogo + Interpretação + Decisão |
| **Epistemologia** | Método que GENESIS usa | COMO criar conhecimento (M0-M4) |
| **Meta Sistemas** | Filhos de Epistemologia | COMO conhecer domínio X |
| **PROMETHEUS** | Fábrica que GENESIS usa | INFRA + PRODUÇÃO (execução) |

#### Fluxo

1. **GENESIS** detecta gap ou recebe demanda
2. **GENESIS** usa **Epistemologia** para especificar (M0-M4)
3. **GENESIS** envia spec para **PROMETHEUS**
4. **PROMETHEUS** executa (INFRA hospeda, PRODUÇÃO constrói)
5. **PROMETHEUS** entrega artefato
6. **GENESIS** integra e evolui

---

## 4. Classe (M3)

### 4.1 Classe: GENESIS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: GENESIS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ─────────                                                                  │
│  + nome: String = "GENESIS"                                                 │
│  + versao: SemVer                                                           │
│  + visao: String = "Inteligência Híbrida"                                   │
│  + camadas: [L0, L1, L2, L3, L4]                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + entender(input) → {tipo: CONHECER|DECIDIR|GERENCIAR, contexto}           │
│  + buscar(tipo, contexto) → {existe: bool, item?, score?}                   │
│  + rotear(resultado_busca) → execução                                       │
│  + persistir(dado, tipo_dado) → {destino: GITHUB|MONGODB, resultado}        │
│  + listar_capabilities() → [Capability]                                     │
│  + especificar(gap) → spec (via Epistemologia)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dependências (Infraestrutura C2)                                           │
│  ────────────────────────────────                                           │
│  - GitHub: persistência de definições (docs/00_I/00_I_1_1_GitHub.md)        │
│  - MongoDB: persistência transacional (docs/00_I/00_I_1_3_MongoDB.md)       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dependências (Framework C3)                                                │
│  ───────────────────────────                                                │
│  - Catálogo: memória estruturada                                            │
│  - Epistemologia: criar conhecimento (M0-M4)                                │
│  - Raciocínio: tomar decisão (H→E→I→D)                                      │
│  - Gestão de Projetos: organizar trabalho (backlog/sprint)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dependências (Domínio C4)                                                  │
│  ─────────────────────────                                                  │
│  - MS_Produto: gerenciar ciclo de vida de produtos                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dependências (Execução)                                                    │
│  ───────────────────────                                                    │
│  - PROMETHEUS: fábrica que executa specs (genesis/PROMETHEUS.md)            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Fluxo de Roteamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUXO GENESIS ROUTER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  User Input                                                                 │
│       │                                                                     │
│       ▼                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 1. ENTENDER (M0/Saussure)                                           │    │
│  │    • Qual a natureza do problema?                                   │    │
│  │    • CONHECER algo  ou  DECIDIR algo  ou  GERENCIAR trabalho?       │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│        ┌────────────────────────┼────────────────────────┐                  │
│        ▼                        ▼                        ▼                  │
│  ┌────────────┐          ┌────────────┐          ┌────────────┐             │
│  │  CONHECER  │          │  DECIDIR   │          │  GERENCIAR │             │
│  └──────┬─────┘          └──────┬─────┘          └──────┬─────┘             │
│         │                       │                       │                   │
│         ▼                       ▼                       ▼                   │
│    Epistemologia           Raciocínio            Gestão Projetos            │
│    (M0-M4)                 (H→E→I→D)             (Backlog/Sprint)           │
│         │                       │                       │                   │
│         └───────────────────────┼───────────────────────┘                   │
│                                 ▼                                           │
│                          ┌────────────┐                                     │
│                          │ PERSISTIR  │                                     │
│                          └──────┬─────┘                                     │
│                    ┌────────────┴────────────┐                              │
│                    ▼                         ▼                              │
│              ┌──────────┐              ┌──────────┐                         │
│              │  GitHub  │              │ MongoDB  │                         │
│              │(definição)│              │(transação)│                        │
│              └──────────┘              └──────────┘                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Métodos

#### entender(input)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           entender(input)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: string (mensagem do usuário)                                        │
│  Output: {tipo: CONHECER|DECIDIR|GERENCIAR, contexto: string}               │
│                                                                             │
│  Aplica M0/Saussure para classificar natureza:                              │
│                                                                             │
│  CONHECER (buscar/criar conhecimento estruturado):                          │
│  ├── "Como funciona X?"                                                     │
│  ├── "O que é Y?"                                                           │
│  ├── "Documente Z"                                                          │
│  ├── "Crie um framework para W"                                             │
│  └── "Estruture conhecimento sobre V"                                       │
│                                                                             │
│  DECIDIR (tomar decisão):                                                   │
│  ├── "Devo fazer X ou Y?"                                                   │
│  ├── "Qual a melhor opção para Z?"                                          │
│  ├── "Analise prós e contras de W"                                          │
│  └── "Me ajude a decidir sobre V"                                           │
│                                                                             │
│  GERENCIAR (organizar trabalho):                                            │
│  ├── "Iniciar nova sprint"                                                  │
│  ├── "Capturar item no backlog"                                             │
│  ├── "O que tem no backlog?"                                                │
│  ├── "Promover item para sprint"                                            │
│  ├── "Concluir sprint atual"                                                │
│  ├── "Criar novo produto" → MS_Produto                                      │
│  ├── "Ver roadmap" → MS_Produto                                             │
│  ├── "Health score dos clientes" → MS_Produto                               │
│  └── "Registrar feedback" → MS_Produto                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### buscar(tipo, contexto)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        buscar(tipo, contexto)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input:                                                                     │
│  - tipo: CONHECER | DECIDIR | GERENCIAR                                     │
│  - contexto: string (extraído do entender)                                  │
│                                                                             │
│  Output: {existe: bool, item?: any, score?: float}                          │
│                                                                             │
│  Comportamento:                                                             │
│                                                                             │
│  SE tipo == CONHECER:                                                       │
│     resultados = Catalogo.buscar(contexto, tipo="MetaSistema")              │
│     SE resultados[0].score >= 0.75:                                         │
│        return {existe: true, item: resultados[0], score}                    │
│     SENÃO:                                                                  │
│        return {existe: false}                                               │
│                                                                             │
│  SE tipo == DECIDIR:                                                        │
│     resultados = Catalogo.buscar(contexto, tipo="Decisao")                  │
│     SE resultados[0].score >= 0.75:                                         │
│        return {existe: true, item: resultados[0], score}                    │
│     SENÃO:                                                                  │
│        return {existe: false}                                               │
│                                                                             │
│  SE tipo == GERENCIAR:                                                      │
│     → Roteia diretamente para Gestão de Projetos ou MS_Produto              │
│     → Não busca (ação, não conhecimento)                                    │
│                                                                             │
│  FONTE DE DADOS: MongoDB (collection: catalogo)                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### rotear(resultado_busca)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        rotear(resultado_busca)                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: {tipo, existe, item?, contexto}                                     │
│  Output: execução do caminho escolhido                                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CONHECER + EXISTE                                                  │    │
│  │  → Roteia para Meta Sistema existente                               │    │
│  │  → Carrega arquivo_raiz do Meta Sistema (GitHub)                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CONHECER + NÃO EXISTE                                              │    │
│  │  → Confirma com usuário: "Criar novo Meta Sistema?"                 │    │
│  │  → SE sim: Epistemologia.ciclo_m0_m4(contexto)                      │    │
│  │  → Indexa novo Meta Sistema no Catálogo (MongoDB)                   │    │
│  │  → Persiste definição (GitHub)                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  DECIDIR + EXISTE                                                   │    │
│  │  → Apresenta decisão existente ao usuário                           │    │
│  │  → Pergunta: "Aplicar esta decisão?"                                │    │
│  │  → SE sim: atualiza metadata (uso_count++) no MongoDB               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  DECIDIR + NÃO EXISTE                                               │    │
│  │  → Raciocinio.ciclo_heid(contexto)                                  │    │
│  │  → Indexa nova decisão no Catálogo (MongoDB)                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GERENCIAR (Gestão de Projetos)                                     │    │
│  │  → Carrega docs/00_I/00_I_2_Gestao_Projetos.md                      │    │
│  │  → Roteia para método apropriado:                                   │    │
│  │    • "listar backlog" → listar_backlog() (MongoDB)                  │    │
│  │    • "iniciar sprint" → promover() + Sprint.iniciar() (MongoDB)     │    │
│  │    • "capturar item" → Backlog.capturar() (MongoDB)                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GERENCIAR (MS_Produto) - triggers específicos                      │    │
│  │  → Carrega docs/04_P/MS_Produto.md                                  │    │
│  │  → Roteia para método apropriado:                                   │    │
│  │    • "criar produto" → Produto.criar()                              │    │
│  │    • "criar épico" → Epico.criar()                                  │    │
│  │    • "roadmap" → Portfolio.roadmap_consolidado()                    │    │
│  │    • "health score" → HealthScore.calcular()                        │    │
│  │    • "registrar feedback" → Feedback.registrar()                    │    │
│  │    • "implantar" → Implantacao.criar()                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### persistir(dado, tipo_dado)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        persistir(dado, tipo_dado)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADE: Decidir ONDE persistir (GitHub ou MongoDB)               │
│  DELEGA O "COMO" para cada sistema de infraestrutura                        │
│                                                                             │
│  Input:                                                                     │
│  - dado: conteúdo a persistir                                               │
│  - tipo_dado: classificação do dado                                         │
│                                                                             │
│  Output: {destino: GITHUB|MONGODB, resultado: sucesso/erro}                 │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    REGRA DE ROTEAMENTO                              │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                     │    │
│  │  Tipo de Dado              │ Destino  │ Sistema Responsável         │    │
│  │  ─────────────────────────────────────────────────────────────────  │    │
│  │  Definição (.md)           │ GitHub   │ GitHub.persistir_md()       │    │
│  │  Transação (outros)        │ MongoDB  │ MongoDB.persistir()         │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         FLUXO                                       │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                     │    │
│  │  SE tipo_dado == "definição" (.md):                                 │    │
│  │     → GitHub.persistir_md(arquivo, conteudo, instrucao?)            │    │
│  │     → GitHub decide internamente: criar() | editar() | substituir() │    │
│  │     → Ref: docs/00_I/00_I_1_1_GitHub.md                             │    │
│  │                                                                     │    │
│  │  SE tipo_dado == "transação":                                       │    │
│  │     → MongoDB.persistir(collection, documento)                      │    │
│  │     → MongoDB decide internamente: inserir() | atualizar()          │    │
│  │     → Ref: docs/00_I/00_I_1_3_MongoDB.md                            │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  EXEMPLOS DE ROTEAMENTO:                                                    │
│                                                                             │
│  │ Dado                       │ Tipo       │ Destino → Método            │  │
│  │ ─────────────────────────────────────────────────────────────────── │  │
│  │ Meta Sistema novo          │ definição  │ GitHub → criar()           │  │
│  │ Seção editada              │ definição  │ GitHub → editar()          │  │
│  │ Documento reescrito        │ definição  │ GitHub → substituir()      │  │
│  │ Item de backlog            │ transação  │ MongoDB → inserir()        │  │
│  │ Status de sprint           │ transação  │ MongoDB → atualizar()      │  │
│  │ Decisão nova               │ transação  │ MongoDB → inserir()        │  │
│  │ Produto                    │ transação  │ MongoDB → inserir()        │  │
│  │ Health Score               │ transação  │ MongoDB → inserir()        │  │
│  │ Feedback                   │ transação  │ MongoDB → inserir()        │  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### listar_capabilities()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        listar_capabilities()                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: nenhum                                                              │
│  Output: [Capability]                                                       │
│                                                                             │
│  Comportamento:                                                             │
│  1. Buscar no MongoDB: catalogo.find({capability: {$exists: true}})         │
│  2. Para cada item com capability, extrair:                                 │
│     - nome_amigavel                                                         │
│     - descricao                                                             │
│     - exemplos                                                              │
│  3. Retornar lista formatada para usuário                                   │
│                                                                             │
│  Exemplo de resposta:                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Posso ajudá-lo com:                                                │    │
│  │                                                                     │    │
│  │  📚 CONHECER - Criar e buscar conhecimento estruturado              │    │
│  │     "Como estruturar um processo de vendas?"                        │    │
│  │     "Documente nossa metodologia"                                   │    │
│  │                                                                     │    │
│  │  🎯 DECIDIR - Tomar decisões de forma estruturada                   │    │
│  │     "Devo contratar mais ou investir em marketing?"                 │    │
│  │     "Qual tecnologia escolher?"                                     │    │
│  │                                                                     │    │
│  │  📋 GERENCIAR - Organizar trabalho em backlog e sprints             │    │
│  │     "O que temos no backlog?"                                       │    │
│  │     "Iniciar nova sprint"                                           │    │
│  │                                                                     │    │
│  │  📦 PRODUTO - Gerenciar ciclo de vida de produtos                   │    │
│  │     "Criar novo produto"                                            │    │
│  │     "Ver roadmap do MS_Seleção"                                     │    │
│  │     "Health score dos clientes"                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Métodos: Tabela Resumo

| Método | Entrada | Saída | Responsabilidade |
|--------|---------|-------|------------------|
| `entender()` | input_usuario | {tipo, contexto} | Classificar CONHECER vs DECIDIR vs GERENCIAR |
| `buscar()` | tipo, contexto | {existe, item?, score?} | Consultar Catálogo (MongoDB) |
| `rotear()` | resultado_busca | execução | Reutilizar existente ou criar novo |
| `persistir()` | dado, tipo_dado | {destino, resultado} | Decidir ONDE (GitHub/MongoDB), delegar COMO |
| `listar_capabilities()` | - | [Capability] | Explicar o que GENESIS sabe fazer |
| `especificar()` | gap | spec | Usar Epistemologia para criar spec |

### 4.5 Como Buscar no Catálogo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COMO BUSCAR NO CATÁLOGO (MongoDB)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASSO 1: Query no MongoDB                                                  │
│  ─────────────────────────────                                              │
│  mongodb:find(                                                              │
│    database="genesis_db",                                                   │
│    collection="catalogo",                                                   │
│    filter={...}                                                             │
│  )                                                                          │
│                                                                             │
│  PASSO 2: Filtros úteis                                                     │
│  ─────────────────────────                                                  │
│  - Por tipo: {tipo: "docs"} ou {tipo: "backlog"} ou {tipo: "sprint"}        │
│  - Por status: {"metadata.status": "Publicado"}                             │
│  - Sprint ativa: {tipo: "sprint", "metadata.status": "Ativa"}               │
│  - Backlog pendente: {tipo: "backlog", "metadata.status": "Pendente"}       │
│  - Produtos: {tipo: "produto"}                                              │
│  - Health Score: {tipo: "health_score", produto_ref: "..."}                 │
│                                                                             │
│  PASSO 3: Carregar arquivo do item (se necessário)                          │
│  ─────────────────────────────────────────────────                          │
│  SE item.arquivo começa com "docs/" ou "genesis/":                          │
│     → github:get_file_contents(path=item.arquivo)                           │
│                                                                             │
│  EXEMPLO:                                                                   │
│  ─────────                                                                  │
│  Input: "como estruturar conhecimento novo"                                 │
│                                                                             │
│  1. mongodb:find(collection="catalogo", filter={tipo: "docs"})              │
│  2. Comparar input com campo "chave" e "triggers" de cada item              │
│  3. Seleciona: ms_epistemologia (match em triggers)                         │
│  4. github:get_file_contents(path="docs/00_E/00_E_Epistemologia.md")        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Comparativo: LLM Sozinho vs LLM + GENESIS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LLM SOZINHO vs LLM + GENESIS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LLM SOZINHO:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Sessão 1 → progresso → Sessão 2 → esqueceu tudo → Sessão N → loop  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  LLM + GENESIS:                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Sessão 1 → entende → busca → roteia/cria → persiste                │    │
│  │  Sessão 2 → entende → busca → encontra! → reutiliza → progresso     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  GENESIS = inteligência orquestradora + memória estruturada (Catálogo)      │
│                                                                             │
│  PERSISTÊNCIA HÍBRIDA:                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GitHub: definições lentas, versionadas, legíveis                   │    │
│  │  MongoDB: transações rápidas, queries, índices                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| **genesis/PROMETHEUS.md** | **Fábrica que GENESIS usa para executar** |
| docs/00_I/00_I_1_1_GitHub.md | Persistência de definições (COMO) |
| docs/00_I/00_I_1_3_MongoDB.md | Persistência transacional (COMO) |
| docs/00_I/00_I_1_2_Protocolo_LLM.md | Como LLM acessa GENESIS |
| docs/00_E/00_E_Epistemologia.md | Método que GENESIS usa (CONHECER) |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Toma decisão (DECIDIR) |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Memória estruturada (especificação) |
| docs/00_I/00_I_0_1_Glossario.md | Glossário Central do sistema |
| docs/00_I/00_I_2_Gestao_Projetos.md | Organiza trabalho (GERENCIAR) |
| docs/00_I/00_I_2_1_Backlog.md | Captura e enriquece itens de trabalho |
| docs/00_I/00_I_2_2_Sprint.md | Ciclos de execução focada |
| docs/04_P/MS_Produto.md | MS Epistemológico: COMO gerenciar produto |
| genesis/GENESIS_Arquitetura.md | Visão técnica detalhada |

### Externas

| Fonte | Conceito |
|-------|----------|
| Hutchins (1995) | Cognição Distribuída |
| Shannon (1948) | Entropia |
| Maturana & Varela (1980) | Autopoiesis |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-02 | STUB inicial |
| 0.10 | 2025-12-04 | Última versão STUB |
| 1.0 | 2025-12-05 | Refatoração completa M0-M4. Propósito explícito (Inteligência Híbrida). |
| 1.1 | 2025-12-05 | Inteligência Orquestradora. M2+M3 refatorados: entender → buscar → rotear. |
| 1.2 | 2025-12-06 | Referências atualizadas: Catálogo e Raciocínio publicados em docs/00_E/. |
| 1.3 | 2025-12-07 | Glossário M0.1 expandido: termos Loop/Autonomia/Tools/Contexto. |
| 1.4 | 2025-12-07 | Seção 4.5 Como Buscar no Catálogo. Sprint S006-C/T03. |
| 1.5 | 2025-12-08 | GERENCIAR adicionado: terceiro tipo de roteamento. Sprint S007. |
| 1.6 | 2025-12-08 | Capability Discovery: método listar_capabilities(). Sprint S009. |
| 1.7 | 2025-12-08 | Fix: Seções 4.5 e 4.6 separadas corretamente. Sprint S009. |
| 1.8 | 2025-12-08 | persistir(): método que roteia GitHub vs MongoDB. Persistência Híbrida. Sprint S010/T05. |
| 1.9 | 2025-12-08 | **persistir() SIMPLIFICADO**: GENESIS decide ONDE, delega COMO para GitHub/MongoDB. Sprint S011/T04. |
| 2.0 | 2025-12-08 | **Teste editar()**: método por âncora validado. Sprint S011/T05. |
| 2.1 | 2025-12-09 | **MS_Produto integrado**: roteamento para ciclo de vida de produtos, Camada 4 no índice. Sprint S014. |
| 3.0 | 2025-12-15 | **Autopoiese**: seção 2.3 com L0-L4, tabela de-para GENESIS×PROMETHEUS. Seção 3.4 Relação com Epistemologia e PROMETHEUS. Fronteiras clarificadas. GENESIS como organismo autopoiético. |

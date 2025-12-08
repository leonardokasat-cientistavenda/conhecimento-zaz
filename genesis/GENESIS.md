---
nome: GENESIS
versao: "1.7"
tipo: Framework
classe_ref: Framework
origem: interno
status: Publicado
camada: C1
depende_de:
  - 00_E_2_1_Modulo_Catalogo
---

# GENESIS v1.7

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **GENESIS** | Inteligência Orquestradora que entende, busca e roteia |
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
>
> **Resultado:** Sistema que reduz dispêndio de energia humana na execução de atividades cognitivas, com conhecimento que persiste e acumula.

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

---

## 3. Objeto (M2)

### 3.1 Definição

**GENESIS** é a Inteligência Orquestradora que:
- **Entende** input do usuário e classifica: CONHECER, DECIDIR ou GERENCIAR
- **Busca** no Catálogo conhecimento, decisão ou projeto existente
- **Roteia** para existente ou **Cria** novo via sistema apropriado
- **Resolve** Bootstrap Circular via STUB
- **Reduz** Entropia Contextual via arquivos atômicos + índice

### 3.2 Fronteiras

| GENESIS É | GENESIS NÃO É |
|-----------|---------------|
| Inteligência Orquestradora | Executor de domínios |
| Classifica CONHECER vs DECIDIR vs GERENCIAR | Conteúdo de negócio |
| Usa Catálogo como memória | O próprio Catálogo |
| Roteia ou delega criação | Implementação de M0-M4 (isso é Epistemologia) |
| Propósito (PORQUÊ) | Método (isso é Epistemologia) |

### 3.3 Hierarquia de Responsabilidades

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIERARQUIA DE RESPONSABILIDADES                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (Camada 1) ─── INTELIGÊNCIA ORQUESTRADORA                          │
│  │  • Entende: CONHECER, DECIDIR ou GERENCIAR                               │
│  │  • Busca: Catálogo                                                       │
│  │  • Roteia: existente ou cria novo                                        │
│  │                                                                          │
│  ├──► CATÁLOGO (Camada 3) ─── MEMÓRIA                                       │
│  │    • indexar(item, chave, metadata)                                      │
│  │    • buscar(query) → [{item, score}]                                     │
│  │    • Agnóstico: não sabe o que armazena                                  │
│  │                                                                          │
│  ├──► EPISTEMOLOGIA (Camada 3) ─── MÉTODO (CONHECER)                        │
│  │    • Ciclo M0-M4 obrigatório                                             │
│  │    • Cria Meta Sistemas estruturados                                     │
│  │                                                                          │
│  ├──► RACIOCÍNIO (Módulo) ─── DECISÃO (DECIDIR)                             │
│  │    • Ciclo H→E→I→D                                                       │
│  │    • Indexa decisões no Catálogo                                         │
│  │                                                                          │
│  └──► GESTÃO DE PROJETOS (Camada 2) ─── TRABALHO (GERENCIAR)                │
│       • Backlog: captura, enriquece itens de trabalho                       │
│       • Sprint: ciclos de execução focada                                   │
│       • Orquestra promoção backlog → sprint                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

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
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + entender(input) → {tipo: CONHECER|DECIDIR|GERENCIAR, contexto}           │
│  + buscar(tipo, contexto) → {existe: bool, item?, score?}                   │
│  + rotear(resultado_busca) → execução                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dependências                                                               │
│  ────────────                                                               │
│  - Catálogo: memória estruturada                                            │
│  - Epistemologia: criar conhecimento (M0-M4)                                │
│  - Raciocínio: tomar decisão (H→E→I→D)                                      │
│  - Gestão de Projetos: organizar trabalho (backlog/sprint)                  │
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
│  └── "Concluir sprint atual"                                                │
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
│     → Roteia diretamente para Gestão de Projetos                            │
│     → Não busca (ação, não conhecimento)                                    │
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
│  │  → Carrega arquivo_raiz do Meta Sistema                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CONHECER + NÃO EXISTE                                              │    │
│  │  → Confirma com usuário: "Criar novo Meta Sistema?"                 │    │
│  │  → SE sim: Epistemologia.ciclo_m0_m4(contexto)                      │    │
│  │  → Indexa novo Meta Sistema no Catálogo                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  DECIDIR + EXISTE                                                   │    │
│  │  → Apresenta decisão existente ao usuário                           │    │
│  │  → Pergunta: "Aplicar esta decisão?"                                │    │
│  │  → SE sim: atualiza metadata (uso_count++)                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  DECIDIR + NÃO EXISTE                                               │    │
│  │  → Raciocinio.ciclo_heid(contexto)                                  │    │
│  │  → Indexa nova decisão no Catálogo                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GERENCIAR                                                          │    │
│  │  → Carrega docs/00_I/00_I_2_Gestao_Projetos.md                      │    │
│  │  → Roteia para método apropriado:                                   │    │
│  │    • "listar backlog" → listar_backlog()                            │    │
│  │    • "iniciar sprint" → promover() + Sprint.iniciar()               │    │
│  │    • "capturar item" → Backlog.capturar()                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Métodos: Tabela Resumo

| Método | Entrada | Saída | Responsabilidade |
|--------|---------|-------|------------------|
| `entender()` | input_usuario | {tipo, contexto} | Classificar CONHECER vs DECIDIR vs GERENCIAR |
| `buscar()` | tipo, contexto | {existe, item?, score?} | Consultar Catálogo |
| `rotear()` | resultado_busca | execução | Reutilizar existente ou criar novo |
| `listar_capabilities()` | - | [Capability] | Explicar o que GENESIS sabe fazer |

### 4.5 Método: listar_capabilities()
│                                                                             │
│  PASSO 1: Ler índice                                                        │
│  ─────────────────────                                                      │
│  github:get_file_contents(path="_catalogo/indice.yaml")                     │
│                                                                             │
│  PASSO 2: Para cada item, comparar input com:                               │
│  ──────────────────────────────────────────────                             │
│  - chave: palavras-chave semânticas                                         │
│  - triggers: frases que ativam o item                                       │
│                                                                             │
│  PASSO 3: Selecionar item com maior relevância                              │
│  ─────────────────────────────────────────────                              │
│  - Match exato em trigger → alta relevância                                 │
│  - Match parcial em chave → média relevância                                │
│  - Sem match → criar novo                                                   │
│                                                                             │
│  PASSO 4: Carregar arquivo do item selecionado                              │
│  ─────────────────────────────────────────────                              │
│  github:get_file_contents(path=item.arquivo)                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

EXEMPLO DE BUSCA:
─────────────────
Input: "como estruturar conhecimento novo"

1. Ler _catalogo/indice.yaml
2. Comparar com cada item:
   - ms_epistemologia:
     - trigger "como estruturar conhecimento" → MATCH
     - chave "criar meta sistemas estruturados" → MATCH parcial
   - ms_raciocinio:
     - sem match
3. Seleciona: ms_epistemologia (maior relevância)
4. Carrega: docs/00_E/00_E_Epistemologia.md
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
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| _catalogo/indice.yaml | Índice de busca (implementação) |
| genesis/GENESIS_Arquitetura.md | Visão técnica detalhada (contextos, tools, posicionamento) |
| docs/00_I_1_2_Protocolo_LLM.md | Como LLM acessa GENESIS |
| docs/00_E/00_E_Epistemologia.md | Cria conhecimento (CONHECER) |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Toma decisão (DECIDIR) |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Memória estruturada (especificação) |
| docs/00_I/00_I_0_1_Glossario.md | Glossário Central do sistema |
| docs/00_I/00_I_2_Gestao_Projetos.md | Organiza trabalho (GERENCIAR) |
| docs/00_I/00_I_2_1_Backlog.md | Captura e enriquece itens de trabalho |
| docs/00_I/00_I_2_2_Sprint.md | Ciclos de execução focada |

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
| 1.3 | 2025-12-07 | Glossário M0.1 expandido: termos Loop/Autonomia/Tools/Contexto. Referências: GENESIS_Arquitetura e Glossário Central. |
| 1.4 | 2025-12-07 | Seção 4.5 Como Buscar no Catálogo: instrução prática para usar _catalogo/indice.yaml. Referência ao índice adicionada. Sprint S006-C/T03. |
| 1.5 | 2025-12-08 | **GERENCIAR adicionado:** terceiro tipo de roteamento para Gestão de Projetos. Referências: Gestão de Projetos, Backlog, Sprint. Sprint S007. |
| 1.6 | 2025-12-08 | **Capability Discovery:** método listar_capabilities() para GENESIS explicar o que sabe fazer. Glossário: Capability, Discovery. Sprint S009. |
| 1.7 | 2025-12-08 | **Fix:** Seções 4.5 (listar_capabilities) e 4.6 (Como Buscar) separadas corretamente. Sprint S009. |

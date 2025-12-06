---
nome: GENESIS
versao: "1.2"
tipo: Framework
classe_ref: Framework
origem: interno
status: Publicado
camada: C1
depende_de:
  - 00_E_2_1_Modulo_Catalogo
---

# GENESIS v1.2

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
- **Entende** input do usuário e classifica: CONHECER ou DECIDIR
- **Busca** no Catálogo conhecimento ou decisão existente
- **Roteia** para existente ou **Cria** novo via Epistemologia/Raciocínio
- **Resolve** Bootstrap Circular via STUB
- **Reduz** Entropia Contextual via arquivos atômicos + índice

### 3.2 Fronteiras

| GENESIS É | GENESIS NÃO É |
|-----------|---------------|
| Inteligência Orquestradora | Executor de domínios |
| Classifica CONHECER vs DECIDIR | Conteúdo de negócio |
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
│  │  • Entende: CONHECER ou DECIDIR                                          │
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
│  └──► RACIOCÍNIO (Módulo) ─── DECISÃO (DECIDIR)                             │
│       • Ciclo H→E→I→D                                                       │
│       • Indexa decisões no Catálogo                                         │
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
│  + entender(input) → {tipo: CONHECER|DECIDIR, contexto}                     │
│  + buscar(tipo, contexto) → {existe: bool, item?, score?}                   │
│  + rotear(resultado_busca) → execução                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dependências                                                               │
│  ────────────                                                               │
│  - Catálogo: memória estruturada                                            │
│  - Epistemologia: criar conhecimento (M0-M4)                                │
│  - Raciocínio: tomar decisão (H→E→I→D)                                      │
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
│  │    • CONHECER algo  ou  DECIDIR algo?                               │    │
│  └──────────────────────────────┬──────────────────────────────────────┘    │
│                                 │                                           │
│              ┌──────────────────┴──────────────────┐                        │
│              ▼                                     ▼                        │
│       ┌────────────┐                        ┌────────────┐                  │
│       │  CONHECER  │                        │  DECIDIR   │                  │
│       └──────┬─────┘                        └──────┬─────┘                  │
│              │                                     │                        │
│              ▼                                     ▼                        │
│  ┌─────────────────────────┐          ┌─────────────────────────┐           │
│  │ 2. BUSCAR no Catálogo   │          │ 2. BUSCAR no Catálogo   │           │
│  │    Meta Sistema que     │          │    Decisão similar      │           │
│  │    resolve              │          │    já tomada            │           │
│  └───────────┬─────────────┘          └───────────┬─────────────┘           │
│              │                                    │                         │
│       ┌──────┴──────┐                      ┌──────┴──────┐                  │
│       ▼             ▼                      ▼             ▼                  │
│    EXISTE       NÃO EXISTE              EXISTE       NÃO EXISTE             │
│       │             │                      │             │                  │
│       ▼             ▼                      ▼             ▼                  │
│    Roteia       Epistemologia           Aplica        Raciocínio            │
│    para MS      cria novo MS            decisão       gera nova             │
│    existente                            existente     decisão               │
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
│  Output: {tipo: CONHECER|DECIDIR, contexto: string}                         │
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
└─────────────────────────────────────────────────────────────────────────────┘
```

#### buscar(tipo, contexto)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        buscar(tipo, contexto)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input:                                                                     │
│  - tipo: CONHECER | DECIDIR                                                 │
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
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Métodos: Tabela Resumo

| Método | Entrada | Saída | Responsabilidade |
|--------|---------|-------|------------------|
| `entender()` | input_usuario | {tipo, contexto} | Classificar CONHECER vs DECIDIR |
| `buscar()` | tipo, contexto | {existe, item?, score?} | Consultar Catálogo |
| `rotear()` | resultado_busca | execução | Reutilizar existente ou criar novo |

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
| docs/00_I_1_2_Protocolo_LLM.md | Como LLM acessa GENESIS |
| docs/00_E/00_E_Epistemologia.md | Cria conhecimento (CONHECER) |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | Toma decisão (DECIDIR) |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | Memória estruturada |

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
| 1.2 | 2025-12-06 | **Referências atualizadas:** Catálogo e Raciocínio publicados em docs/00_E/. Sprint S005-G/T13. |

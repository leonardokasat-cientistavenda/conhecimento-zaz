# PROTOCOLO_AGENT_LOOP v2.0

---

```yaml
nome: PROTOCOLO_AGENT_LOOP
versao: "2.0"
tipo: Protocolo
status: Publicado
dominio: Execução
data_publicacao: "2026-01-06"
pai: docs/04_S/MS_Sprint.md
```

---

## 1. Problema

### 1.1 Contexto

Claude Desktop possui capacidades de execução via MCP Servers (MongoDB, GitHub, etc.), porém estas interfaces são lentas, erráticas e lotam o contexto da conversa. Para executar sprints de forma autônoma, Claude precisa de um modo de operação que combine velocidade de execução determinística com flexibilidade de raciocínio LLM.

### 1.2 Sintomas

| Sintoma | Impacto |
|---------|---------|
| MCPs demoram 5-30s por chamada | Execução lenta |
| Respostas MCP lotam contexto | Perda de foco |
| Falhas erráticas em MCPs | Fluxo interrompido |
| Claude decide tudo em tempo real | Sem padrões reutilizáveis |
| Capacidades hardcoded em docs | Manutenção difícil |

### 1.3 Necessidade

> **Como permitir que Claude execute sprints de forma autônoma, obtendo contexto dinamicamente e escolhendo entre execução determinística (rápida) ou LLM (flexível) conforme as capacidades disponíveis?**

---

## 2. Definição

### 2.1 O que é Agent Loop

**Agent Loop** é o protocolo que define como Claude entra em modo de execução autônoma, subordinado a uma sprint_session, obtendo contexto via bootstrap e alternando entre modos de execução conforme as capacidades disponíveis.

### 2.2 Fronteiras

| Agent Loop É | Agent Loop NÃO É |
|--------------|------------------|
| Protocolo de execução autônoma | Sistema de gestão de sprints |
| Modo de operação do Claude | Executor de lógica de negócio |
| Subordinado a sprint_session | Independente de contexto |
| Consumidor de contexto via bootstrap | Fonte de capacidades |
| Ciclo Reason-Act-Observe | Definição de regras de domínio |

### 2.3 Princípios

| Princípio | Descrição |
|-----------|-----------|
| **BOOTSTRAP-FIRST** | Sempre iniciar/retomar via bootstrap |
| **CONTEXTO-DINÂMICO** | Capacidades vêm do bootstrap, não hardcoded |
| **MODO-TRANSPARENTE** | Claude não precisa saber detalhes de implementação |
| **SPRINT-SUBORDINADO** | Sempre dentro de uma sprint_session |
| **SUPERVISOR-RESPEITADO** | Humano pode intervir a qualquer momento |

---

## 3. Arquitetura

### 3.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AGENT LOOP - ARQUITETURA                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                           ┌─────────────┐                                   │
│                           │   CLAUDE    │                                   │
│                           └──────┬──────┘                                   │
│                                  │                                          │
│                                  │ bootstrap                                │
│                                  ▼                                          │
│                           ┌─────────────┐                                   │
│                           │  @genesis   │                                   │
│                           └──────┬──────┘                                   │
│                                  │                                          │
│                                  ▼                                          │
│                           ┌─────────────┐                                   │
│                           │ DMN Router  │                                   │
│                           │   (SSOT)    │                                   │
│                           └──────┬──────┘                                   │
│                                  │                                          │
│                                  ▼                                          │
│                    ┌─────────────────────────┐                              │
│                    │   CONTEXTO BOOTSTRAP    │                              │
│                    │   • sprint_session      │                              │
│                    │   • capacidades         │                              │
│                    │   • instruções          │                              │
│                    │   • config              │                              │
│                    │   • supervisão          │                              │
│                    └─────────────┬───────────┘                              │
│                                  │                                          │
│                                  ▼                                          │
│                           ┌─────────────┐                                   │
│                           │   CLAUDE    │                                   │
│                           └──────┬──────┘                                   │
│                                  │                                          │
│              ┌───────────────────┴───────────────────┐                      │
│              │                                       │                      │
│              ▼                                       ▼                      │
│    ┌──────────────────┐                   ┌──────────────────┐              │
│    │      MODO        │                   │      MODO        │              │
│    │  DETERMINÍSTICO  │                   │       LLM        │              │
│    │                  │                   │                  │              │
│    │ Claude posta     │                   │ Claude executa   │              │
│    │ Bot executa      │                   │ seguindo         │              │
│    │ Claude lê resp   │                   │ instruções       │              │
│    └──────────────────┘                   └──────────────────┘              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Componentes

| Componente | Responsabilidade |
|------------|------------------|
| **Claude** | Executa Agent Loop, toma decisões, processa resultados |
| **@genesis** | Interface entre Claude e DMN Router |
| **DMN Router** | Fonte única de verdade para contexto bootstrap |
| **Bots Pantheon** | Executam capacidades determinísticas |
| **Workers Camunda** | Implementam lógica determinística |

### 3.3 DMN Router como SSOT

Toda informação dinâmica do Agent Loop vem da DMN Router:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DMN ROUTER - FONTE DE VERDADE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RESPONSABILIDADES:                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • Listar capacidades ativas (determinísticas e LLM)                 │    │
│  │ • Fornecer instruções para capacidades LLM                          │    │
│  │ • Buscar sprint_session ativa (via worker)                          │    │
│  │ • Fornecer configuração do loop (retry, timeouts)                   │    │
│  │ • Fornecer regras de supervisão                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  BENEFÍCIOS:                                                                │
│  • Capacidades crescem sem editar protocolo                                 │
│  • Migração LLM → determinístico transparente                               │
│  • Configuração centralizada                                                │
│  • Instruções atualizáveis via deploy                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Bootstrap

### 4.1 Comando

Claude inicia Agent Loop postando no canal Mattermost:

```
@genesis bootstrap
```

### 4.2 Resposta

@genesis consulta DMN Router e publica YAML com contexto completo:

```yaml
agent_loop_context:
  versao: String              # Versão do contexto
  gerado_em: DateTime         # Timestamp
  
  sprint:                     # Sprint session ativa
    codigo: String
    titulo: String
    status: String
    task_atual: String?
    tasks: [Task]
    progresso: Progresso
  
  capacidades:
    deterministicas:          # Bot executa
      - id: String
        bot: String
        descricao: String
        comandos: [Comando]
    llm:                      # Claude executa seguindo instruções
      - id: String
        descricao: String
        instrucoes: String
  
  config:
    max_tentativas: Number
    delays_retry: [Number]
    timeout_resposta: Number
    canal_id: String
  
  supervisao:
    usuario: String
    comandos: [ComandoSupervisao]
```

### 4.3 Quando fazer Bootstrap

| Situação | Ação |
|----------|------|
| Início do Agent Loop | Bootstrap obrigatório |
| Retomar sprint pausada | Bootstrap obrigatório |
| Perda de contexto detectada | Bootstrap |
| Após erro crítico recuperado | Bootstrap |
| Comando não reconhecido | Bootstrap |
| Heartbeat (a cada N ações) | Bootstrap opcional |

### 4.4 Sinais de Perda de Contexto

- Claude não lembra objetivo da sprint
- Claude usa comando que não existe nas capacidades
- Resposta incoerente com task atual
- Claude pergunta informações que estavam no contexto

---

## 5. Modos de Execução

### 5.1 Modo Determinístico

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MODO DETERMINÍSTICO                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CARACTERÍSTICAS:                                                           │
│  • Bot Pantheon executa a ação                                              │
│  • Worker Camunda implementa lógica                                         │
│  • Resposta rápida (<1s)                                                    │
│  • Resultado previsível                                                     │
│                                                                             │
│  FLUXO:                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 1. Claude identifica capacidade determinística no contexto          │    │
│  │ 2. Claude posta comando no canal: "@bot comando args"               │    │
│  │ 3. Bot recebe via outgoing webhook                                  │    │
│  │ 4. DMN Router seleciona worker                                      │    │
│  │ 5. Worker executa e retorna resultado                               │    │
│  │ 6. Bot posta resposta no canal                                      │    │
│  │ 7. Claude lê resposta e processa                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  QUANDO USAR:                                                               │
│  • Capacidade listada em capacidades.deterministicas no contexto            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Modo LLM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MODO LLM                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CARACTERÍSTICAS:                                                           │
│  • Claude executa a ação diretamente                                        │
│  • Segue instruções do contexto bootstrap                                   │
│  • Mais lento (depende de MCPs ou raciocínio)                               │
│  • Resultado flexível                                                       │
│                                                                             │
│  FLUXO:                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 1. Claude identifica capacidade LLM no contexto                     │    │
│  │ 2. Claude lê instruções associadas                                  │    │
│  │ 3. Claude executa conforme instruções                               │    │
│  │ 4. Claude processa resultado                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  QUANDO USAR:                                                               │
│  • Capacidade listada em capacidades.llm no contexto                        │
│  • Ação não tem bot determinístico ainda                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Migração LLM → Determinístico

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CICLO DE MIGRAÇÃO                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. Capacidade começa em modo LLM                                           │
│     └── Instruções no contexto, Claude executa                              │
│                                                                             │
│  2. Identificamos padrões estáveis após N sprints                           │
│     └── Edge cases mapeados, fluxo previsível                               │
│                                                                             │
│  3. Implementamos bot + worker                                              │
│     └── Lógica hardcoded, testada                                           │
│                                                                             │
│  4. Atualizamos DMN Router                                                  │
│     └── Move de capacidades.llm para capacidades.deterministicas            │
│                                                                             │
│  5. Próximo bootstrap já reflete mudança                                    │
│     └── Claude usa bot em vez de instruções                                 │
│                                                                             │
│  TRANSPARÊNCIA:                                                             │
│  Claude não precisa saber da migração. Só segue o contexto.                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Ciclo de Execução

### 6.1 Ciclo R-A-O (Reason-Act-Observe)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CICLO REASON-ACT-OBSERVE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ BOOTSTRAP                                                            │   │
│  │ • @genesis bootstrap                                                 │   │
│  │ • Receber contexto                                                   │   │
│  │ • Conhecer capacidades e sprint                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ REASON (decidir)                                                     │   │
│  │ • Qual task executar?                                                │   │
│  │ • Qual capacidade usar?                                              │   │
│  │ • Determinístico ou LLM?                                             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ ACT (executar)                                                       │   │
│  │ • Se determinístico: postar comando para bot                         │   │
│  │ • Se LLM: executar seguindo instruções                               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ OBSERVE (verificar)                                                  │   │
│  │ • Ler resultado da ação                                              │   │
│  │ • Verificar comandos do supervisor                                   │   │
│  │ • Avaliar se precisa retry                                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ ITERATE (continuar)                                                  │   │
│  │ • Atualizar estado                                                   │   │
│  │ • Próxima task ou finalizar                                          │   │
│  │ • Se perda de contexto: bootstrap                                    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                              │                                              │
│                              ▼                                              │
│                    ┌──────────────────┐                                     │
│                    │ Sprint concluída?│                                     │
│                    └────────┬─────────┘                                     │
│                             │                                               │
│              ┌──────────────┴──────────────┐                                │
│              │ NÃO                         │ SIM                            │
│              ▼                             ▼                                │
│         [REASON]                      [FINALIZAR]                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Estados do Loop

```
         iniciar_loop()
    ┌─────────────────────┐
    │                     │
    ▼                     │
┌────────┐           ┌────┴────┐
│INATIVO │──────────►│BOOTSTRAP│
└────────┘           └────┬────┘
    ▲                     │
    │                     ▼
    │               ┌──────────┐
    │               │  REASON  │◄─────────────────┐
    │               └────┬─────┘                  │
    │                    │                        │
    │                    ▼                        │
    │               ┌──────────┐                  │
    │               │   ACT    │                  │
    │               └────┬─────┘                  │
    │                    │                        │
    │                    ▼                        │
    │               ┌──────────┐                  │
    │               │ OBSERVE  │──────────────────┘
    │               └────┬─────┘      continuar
    │                    │
    │                    │ finalizar
    │                    ▼
    │               ┌──────────┐
    └───────────────│FINALIZADO│
                    └──────────┘
```

---

## 7. Supervisão

### 7.1 Conceito

O humano supervisor pode intervir a qualquer momento durante o Agent Loop via comandos especiais. Os comandos disponíveis são definidos no contexto bootstrap.

### 7.2 Verificação Obrigatória

Claude DEVE verificar comandos do supervisor:
- Após cada OBSERVE
- Antes de cada ACT
- Em qualquer leitura de mensagens do canal

### 7.3 Comportamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SUPERVISÃO                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FLUXO DE VERIFICAÇÃO:                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 1. Ler posts recentes do canal                                      │    │
│  │ 2. Filtrar posts do supervisor (definido no contexto)               │    │
│  │ 3. Verificar se contém prefixo de comando (ex: #claude)             │    │
│  │ 4. Se encontrou: extrair e executar comando                         │    │
│  │ 5. Se não: continuar ciclo normal                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  PRIORIDADE:                                                                │
│  Comandos do supervisor têm prioridade sobre qualquer ação do loop.         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Retry e Resiliência

### 8.1 Política de Retry

Configurada no contexto bootstrap (config.max_tentativas, config.delays_retry).

```
tentativas = 0
max_tentativas = config.max_tentativas
delays = config.delays_retry

enquanto tentativas < max_tentativas:
    executar_acao()
    
    se sucesso:
        break
    
    aguardar delays[tentativas]
    tentativas++

se tentativas == max_tentativas:
    reportar_falha()
    verificar_supervisor()
```

### 8.2 Tratamento de Erros

| Tipo de Erro | Ação |
|--------------|------|
| Timeout sem resposta | Retry conforme política |
| Erro do bot/worker | Retry conforme política |
| Comando não reconhecido | Bootstrap para atualizar capacidades |
| Perda de contexto | Bootstrap |
| Erro crítico não recuperável | Finalizar loop, reportar |

---

## 9. Comunicação

### 9.1 Mensagens no Canal

Claude deve manter o supervisor informado postando mensagens de progresso no canal. O formato das mensagens pode ser definido no contexto bootstrap ou seguir padrão simples:

| Momento | Mensagem |
|---------|----------|
| Início de sprint | Anunciar objetivo e tasks |
| Início de task | Indicar task sendo executada |
| Task concluída | Confirmar conclusão |
| Task falhou | Reportar erro e aguardar |
| Fim de sprint | Resumo de resultados |

### 9.2 Leitura de Respostas

Para capacidades determinísticas, Claude posta comando e aguarda resposta:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LEITURA DE RESPOSTAS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. Postar comando no canal                                                 │
│  2. Aguardar (delay inicial do retry)                                       │
│  3. Ler posts não lidos                                                     │
│  4. Filtrar resposta do bot correto                                         │
│  5. Se não encontrou: retry                                                 │
│  6. Se encontrou: processar                                                 │
│                                                                             │
│  INTERPRETAÇÃO:                                                             │
│  • Sucesso: dados esperados, indicador positivo                             │
│  • Dica/Correção: bot sugere ajuste → ajustar e retry                       │
│  • Erro: falha explícita → retry ou reportar                                │
│  • Não relacionado: resposta de outro contexto → ignorar, aguardar          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Invariantes

| Invariante | Descrição |
|------------|-----------|
| **INV-BOOTSTRAP** | Sempre iniciar/retomar via @genesis bootstrap |
| **INV-CONTEXTO** | Capacidades e config vêm do bootstrap, nunca hardcoded |
| **INV-SSOT-DMN** | DMN Router é fonte única de verdade |
| **INV-SPRINT** | Agent Loop sempre subordinado a sprint_session |
| **INV-SUPERVISOR** | Verificar comandos do supervisor antes de cada ação |
| **INV-RECUPERACAO** | Perda de contexto → bootstrap |
| **INV-MODO** | Usar modo conforme capacidade (determinístico ou LLM) |

---

## Referências

| Documento | Relação |
|-----------|---------|
| docs/04_S/MS_Sprint.md | Meta Sistema pai |
| docs/04_B/MS_Backlog.md | Domínio relacionado |
| genesis/GENESIS.md | Sistema maior |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2026-01-06 | Criação inicial. Ciclo de execução, retry, interpretação @infra, comando #claude, recuperação de contexto. |
| 2.0 | 2026-01-06 | **Refatoração completa via M0-M4**. Arquitetura híbrida: bootstrap via @genesis, DMN Router como SSOT, modos determinístico e LLM, ciclo R-A-O, documento atemporal sem hardcode de capacidades. |

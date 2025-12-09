# Servidor Gênesis para Interface de Voz

> **Status:** Backlog  
> **Criado em:** 2025-12-08  
> **Origem:** Conversa sobre alternativas ao Echo/Alexa para rodar Gênesis via voz

---

## Visão Geral

Desenvolver servidor central do Gênesis que funcione como sistema orquestrador para interface de voz, integrando múltiplos backends de LLM (local e cloud) e MCP servers para operações sobre o repositório de conhecimento.

O Gênesis evolui de **framework conceitual** para **sistema operacional de conhecimento** com múltiplas interfaces (desktop, voz, API).

---

## Contexto da Decisão

### Problema Original
- Echo/Alexa são dispositivos fechados que não permitem substituir o software
- Necessidade de interface de voz para o Gênesis sem depender de big tech

### Solução Escolhida
- **Hardware:** Home Assistant Voice Preview Edition (~$69)
- **Software:** Stack open source rodando em Mac local
- **Arquitetura:** Gênesis como servidor central que roteia para diferentes backends

### Alternativas Avaliadas
1. **Alexa Skill como ponte** — temporário, limitado (8s timeout), dependente da Amazon
2. **ESP32-S3-BOX + Willow** — mais barato (~$45), requer mais customização
3. **Raspberry Pi + OVOS** — mais flexível, mais trabalho de setup
4. **Home Assistant Voice PE** — ✅ escolhido: pronto para uso, open source, integração nativa com LLMs

---

## Arquitetura

### 1. Visão Geral do Sistema

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────────────┐
│  Voice Preview  │ ──────► │  Home Assistant  │ ──────► │   Servidor Gênesis      │
│    Edition      │         │                  │         │                         │
└─────────────────┘         └──────────────────┘         │   ┌─────────────────┐   │
                                                         │   │  MCP Client     │   │
       "Gênesis, qual foi                                │   └────────┬────────┘   │
        a última atualização                             │            │            │
        no repositório?"                                 └────────────┼────────────┘
                                                                      │
                                          ┌───────────────────────────┼───────────────────────────┐
                                          │                           │                           │
                                          ▼                           ▼                           ▼
                                   ┌─────────────┐             ┌─────────────┐             ┌─────────────┐
                                   │  MCP Server │             │  MCP Server │             │  MCP Server │
                                   │    GitHub   │             │   MongoDB   │             │   Outros    │
                                   └─────────────┘             └─────────────┘             └─────────────┘
```

### 2. Stack de Software no Mac

```
┌────────────────────────────────────────────────────────────────┐
│                        MAC (rede local)                        │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Ollama     │  │   Whisper    │  │   Piper              │  │
│  │   (LLM)      │  │   (STT)      │  │   (TTS)              │  │
│  │   :11434     │  │   :10300     │  │   :10200             │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Home Assistant                         │  │
│  │                    (orquestrador)                         │  │
│  │                    :8123                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Servidor Gênesis (Python/FastAPI)         │  │
│  │                 + MCP Clients (GitHub, MongoDB)           │  │
│  │                 :8000                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │   MongoDB    │  │   MCP        │                           │
│  │   (dados)    │  │   Servers    │                           │
│  │   :27017     │  │              │                           │
│  └──────────────┘  └──────────────┘                           │
└────────────────────────────────────────────────────────────────┘
                              │
                              │ WiFi (rede local)
                              ▼
                    ┌──────────────────┐
                    │  Voice Preview   │
                    │    Edition       │
                    └──────────────────┘
```

### 3. Gênesis como Sistema Central (Camada de Decisão)

```
┌─────────────────────────────────────────────────────────────────┐
│                         GÊNESIS                                 │
│                    (sistema central)                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Camada de Decisão                       │  │
│  │                                                           │  │
│  │   Query → Classifica → Roteia para backend apropriado     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                  │
│            ┌─────────────────┼─────────────────┐                │
│            ▼                 ▼                 ▼                │
│     ┌───────────┐     ┌───────────┐     ┌───────────┐          │
│     │  Ollama   │     │  Haiku    │     │  Opus     │          │
│     │  (local)  │     │  (API)    │     │  (API)    │          │
│     │           │     │           │     │           │          │
│     │  Grátis   │     │  Barato   │     │  Premium  │          │
│     │  Rápido   │     │  Capaz    │     │  Máximo   │          │
│     │  Simples  │     │  Médio    │     │  Complexo │          │
│     └───────────┘     └───────────┘     └───────────┘          │
│                              │                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Camada MCP                              │  │
│  │                                                           │  │
│  │         GitHub    MongoDB    Filesystem    ...            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 4. Fluxo de Processamento de Voz

```
┌─────────────────┐     WiFi      ┌──────────────────────┐
│  Voice Preview  │ ────────────► │   Home Assistant     │
│    Edition      │               │   (orquestrador)     │
│                 │ ◄──────────── │                      │
│  • Mic (STT)    │               │  • Whisper (STT)     │
│  • Speaker(TTS) │               │  • Piper (TTS)       │
└─────────────────┘               │  • Ollama/LLM        │
                                  └──────────┬───────────┘
                                             │
                                             ▼
                                  ┌──────────────────────┐
                                  │   Servidor Gênesis   │
                                  │   + Claude API       │
                                  │   + MCP Clients      │
                                  └──────────────────────┘
```

### 5. Duas Interfaces, Mesmo Sistema

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌────────────────┐              ┌────────────────┐         │
│   │ Claude Desktop │              │   Voice PE     │         │
│   │                │              │                │         │
│   │ Trabalho       │              │ Hands-free     │         │
│   │ profundo,      │              │ Comandos,      │         │
│   │ documentação   │              │ consultas      │         │
│   └───────┬────────┘              └───────┬────────┘         │
│           │                               │                  │
│           │    ┌──────────────────┐       │                  │
│           └───►│     GÊNESIS      │◄──────┘                  │
│                │                  │                          │
│                │  Metodologia     │                          │
│                │  M0-M4           │                          │
│                │                  │                          │
│                │  MCP Servers     │                          │
│                │  (Git, MongoDB)  │                          │
│                └──────────────────┘                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Componentes

### 1. Servidor API (FastAPI/Python)
- Endpoint compatível com Home Assistant
- Recebe queries em texto (pós-STT)
- Retorna respostas para TTS
- Formato compatível com OpenAI API

### 2. Camada de Decisão
Classifica complexidade da query e roteia para backend apropriado:

| Backend | Uso | Custo | Latência |
|---------|-----|-------|----------|
| Ollama (local) | Operações simples, CRUD | Grátis | Baixa |
| Haiku (API) | Conversação, consultas médias | ~$0.001/query | Média |
| Sonnet (API) | Raciocínio, análise | ~$0.01/query | Média |
| Opus (API) | Máxima complexidade | ~$0.05/query | Alta |

### 3. Integração MCP
- **GitHub:** owner=leonardokasat-cientistavenda, repo=conhecimento-zaz
- **MongoDB:** Dados estruturados do Gênesis

### 4. Infraestrutura Docker

```yaml
version: '3.8'

services:
  homeassistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    container_name: homeassistant
    restart: unless-stopped
    ports:
      - "8123:8123"
    volumes:
      - ./ha-config:/config
    network_mode: host

  whisper:
    image: rhasspy/wyoming-whisper
    container_name: whisper
    restart: unless-stopped
    ports:
      - "10300:10300"
    command: --model small --language pt

  piper:
    image: rhasspy/wyoming-piper
    container_name: piper
    restart: unless-stopped
    ports:
      - "10200:10200"
    command: --voice pt_BR-faber-medium

  mongodb:
    image: mongo:latest
    container_name: mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

**Nota:** Ollama roda melhor nativo no Mac (Metal/GPU acceleration).

---

## Hardware

### Voice Preview Edition (~$69)
- Speaker interno para feedback de voz
- Microfones duplos com XMOS audio processor
- LED ring para feedback visual
- Switch físico de mute
- Jack 3.5mm para speaker externo
- Requer Home Assistant para operar

### Mac (servidor local)
**Mínimo:**
- 8GB RAM
- macOS Ventura+

**Recomendado:**
- 16GB+ RAM
- Apple Silicon (M1/M2/M3/M4)
- SSD ~20GB livre

**Ideal:**
- 32GB+ RAM unificada
- M2 Pro/Max ou superior

---

## Tabela de Portas

| Software | Porta | Função |
|----------|-------|--------|
| Home Assistant | 8123 | Orquestrador central |
| Ollama | 11434 | LLM local |
| Whisper | 10300 | Voz → Texto (STT) |
| Piper | 10200 | Texto → Voz (TTS) |
| MongoDB | 27017 | Banco de dados |
| Gênesis API | 8000 | Servidor + MCP |

---

## Lógica de Roteamento (Pseudocódigo)

```python
def decide_backend(query: str, context: dict) -> str:
    
    # Operações triviais → Local
    if is_simple_crud(query):
        # "lista commits", "salva arquivo"
        return "ollama"
    
    # Conversação, consultas médias → Haiku
    if is_conversational(query) or is_lookup(query):
        # "o que é M3?", "resume o último sprint"
        return "haiku"
    
    # Raciocínio complexo, análise, criação → Sonnet
    if needs_reasoning(query):
        # "analisa gaps no framework"
        return "sonnet"
    
    # Máxima capacidade → Opus
    if is_critical_or_complex(query):
        # "redesenha a arquitetura do Gênesis"
        return "opus"
```

---

## Exemplos de Comandos por Voz

| Comando | Backend | Ação |
|---------|---------|------|
| "Lista os últimos 3 commits" | Ollama | MCP GitHub → list_commits |
| "O que é o framework M3?" | Haiku | Consulta conhecimento |
| "Persiste este documento no repositório" | Ollama | MCP GitHub → create_file |
| "Analisa a estrutura M3 e sugere melhorias" | Sonnet | Raciocínio + MCP |
| "Qual o status do sprint S003-E?" | Haiku | Consulta MongoDB |
| "Busca frameworks com status ativo" | Ollama | MCP MongoDB → find |

---

## Dependências

- [ ] Definição do framework Gênesis (M0-M4) — Sprint S003-E
- [ ] API key Anthropic configurada
- [ ] Mac disponível na rede local

---

## Estimativa de Custo Operacional

**Hardware (único):**
- Voice Preview Edition: ~$69

**Mensal (uso moderado ~100 queries/dia):**
- Ollama: $0 (local)
- Claude API: ~$3-15/mês (dependendo do mix de modelos)
- Infraestrutura: $0 (Mac próprio)

---

## Referências

- [Home Assistant Voice PE](https://www.home-assistant.io/voice-pe/)
- [Ollama Integration](https://www.home-assistant.io/integrations/ollama/)
- [Home-LLM Project](https://github.com/acon96/home-llm)
- [OpenVoiceOS](https://www.openvoiceos.org/)
- [Willow (ESP32-S3-BOX)](https://heywillow.io/)

---

## Próximos Passos

1. [ ] Adquirir Home Assistant Voice Preview Edition
2. [ ] Setup Docker Compose no Mac
3. [ ] Configurar Ollama com modelo base
4. [ ] Desenvolver servidor Gênesis (FastAPI)
5. [ ] Integrar MCP clients (GitHub, MongoDB)
6. [ ] Implementar camada de decisão
7. [ ] Conectar com Claude API
8. [ ] Testar fluxo completo de voz

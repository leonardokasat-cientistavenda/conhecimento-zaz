# Servidor Gênesis para Interface de Voz

> **Status:** Backlog  
> **Criado em:** 2025-12-08  
> **Atualizado em:** 2025-12-08  
> **Origem:** Conversa sobre alternativas ao Echo/Alexa para rodar Gênesis via voz

---

## Visão Geral

Desenvolver servidor central do Gênesis que funcione como sistema orquestrador para interface de voz, integrando múltiplos backends de LLM (local e cloud) e MCP servers para operações sobre o repositório de conhecimento.

O Gênesis evolui de **framework conceitual** para **sistema operacional de conhecimento** com múltiplas interfaces (desktop, voz, mobile, API).

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

### 5. Múltiplas Interfaces, Mesmo Sistema

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌────────────────┐   ┌────────────────┐   ┌────────────┐   │
│   │ Claude Desktop │   │   Voice PE     │   │  Mobile    │   │
│   │                │   │                │   │  (PWA)     │   │
│   │ Trabalho       │   │ Hands-free     │   │  Equipe    │   │
│   │ profundo,      │   │ Comandos,      │   │  Vendas    │   │
│   │ documentação   │   │ consultas      │   │            │   │
│   └───────┬────────┘   └───────┬────────┘   └─────┬──────┘   │
│           │                    │                  │          │
│           │    ┌──────────────────┐               │          │
│           └───►│     GÊNESIS      │◄──────────────┘          │
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

### Dispositivo Principal: Voice Preview Edition (~R$630)
- Speaker interno para feedback de voz
- Microfones duplos com XMOS audio processor
- LED ring para feedback visual
- Switch físico de mute
- Jack 3.5mm para speaker externo
- Requer Home Assistant para operar
- **Status:** ✅ Comprado (AliExpress, aguardando entrega)

### Estratégia de Escala para Múltiplos Cômodos

Para cobrir casa grande com ~4 pontos de voz, usar dispositivos mais baratos após validar o fluxo com Voice PE:

| Cômodo | Dispositivo | Custo | Status |
|--------|-------------|-------|--------|
| Escritório | Voice Preview Edition | R$630 | ✅ Comprado |
| Sala | ESP32-S3-BOX-3 | ~R$386 | Pendente |
| Quarto | ESP32-S3-BOX-3 | ~R$386 | Pendente |
| Cozinha | ESP32-S3-BOX-3 | ~R$386 | Pendente |

**Total estimado:** ~R$1.788 para 4 pontos de voz

**Comparativo:** 4x Voice PE custaria R$2.520 → **Economia: ~R$730**

### ESP32-S3-BOX-3 (~R$386 com impostos)
- Dual mic + speaker integrado
- Tela touch 2.4" (bônus: pode mostrar status do Gênesis)
- ESP32-S3 com suporte ESPHome
- Protocolo Wyoming (mesmo do Voice PE)
- Case pronto, qualidade de áudio boa
- **Fonte:** AliExpress (Espressif oficial) — R$257 + R$129 imposto

### Opção DIY (não recomendada para este projeto)

Montagem manual: ESP32-S3 DevKit + INMP441 (mic) + MAX98357A (amp) + speaker

| Componente | Custo |
|------------|-------|
| ESP32-S3 DevKit | ~R$50-70 |
| INMP441 (mic I2S) | ~R$15-25 |
| MAX98357A (amp I2S) | ~R$15-20 |
| Speaker 3W 4Ω | ~R$10-15 |
| Case | ~R$20-40 |
| Fios/jumpers | ~R$10 |
| **Total** | ~R$120-180 |

**Prós:** mais barato, customizável
**Contras:** precisa soldar, montar case, sem tela, qualidade inferior

**Conclusão:** Diferença de ~R$200 não justifica o trabalho para 3-4 dispositivos. BOX-3 é o sweet spot.

### Mac (servidor local)
**Mínimo:**
- 8GB RAM
- macOS Ventura+

**Recomendado:**
- 16GB+ RAM
- Apple Silicon (M1/M2/M3/M4)
- SSD ~20GB livre

**Atual:** iMac M4, 16GB RAM — ✅ Aprovado

---

## Interface Mobile (Equipe de Vendas)

### Problema
Equipe de vendas precisa acessar Gênesis pelo celular, com suporte a voz, sem depender dos dispositivos físicos.

### Solução: PWA com Voz

O mesmo backend que serve Voice PE e BOX-3 serve o celular via PWA (Progressive Web App).

```
┌─────────────────┐         ┌──────────────────┐
│  Celular        │         │                  │
│  (navegador)    │ ──────► │  Servidor        │
│                 │         │  Gênesis         │
│  PWA com mic    │ ◄────── │  + LLM + MCP     │
└─────────────────┘         └──────────────────┘
```

### Apps Open Source Avaliados

| App | Voz | Mobile | Backend Customizável | Status |
|-----|-----|--------|---------------------|--------|
| **Lobe Chat** | ✅ | PWA | ✅ OpenAI-compatible | ⭐ Recomendado |
| **LibreChat** | ✅ | PWA | ✅ Múltiplos backends | Alternativa |
| **Big-AGI** | ✅ | PWA | ✅ | Alternativa |
| **Open WebUI** | ✅ | PWA | ✅ Ollama/OpenAI | Alternativa |
| **jan.ai** | ❌ (roadmap) | ❌ (roadmap) | ✅ | Aguardar |

### Jan.ai — Análise Detalhada

**Prós:**
- Interface desktop muito polida
- Open source (38k+ stars GitHub)
- Suporta modelos locais e cloud
- MCP support nativo
- API compatível OpenAI

**Contras (dezembro 2024):**
- Voz ainda em desenvolvimento (issue #3488 aberta)
- App mobile (iOS/Android) listado como "upcoming"
- Hoje funciona apenas desktop (Mac/Windows/Linux)

**Conclusão:** Monitorar para futuro. Quando lançar mobile + voz, reavaliar.

### Estratégia de Implementação Mobile

**Fase 1 (MVP):** Open WebUI ou Lobe Chat
- Equipe acessa `https://genesis.zaz.local` do celular
- Adiciona à tela inicial (vira PWA)
- Botão de microfone nativo do browser

**Fase 2 (Evolução):** PWA customizada Gênesis
- Interface com identidade visual ZAZ
- Comandos específicos para vendas
- Integração direta com metodologia

**Fase 3 (Futuro):** App nativo (se necessário)
- Flutter/React Native
- Publicável nas stores
- Máximo controle

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
| Lobe Chat / Open WebUI | 3000 | Interface web/mobile |

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

## Estimativa de Custo

### Hardware (único)

| Item | Custo |
|------|-------|
| Voice Preview Edition | R$630 |
| 3x ESP32-S3-BOX-3 | ~R$1.158 |
| **Total hardware** | ~R$1.788 |

### Mensal (uso moderado ~100 queries/dia)
- Ollama: $0 (local)
- Claude API: ~$3-15/mês (dependendo do mix de modelos)
- Infraestrutura: $0 (Mac próprio)

---

## Referências

- [Home Assistant Voice PE](https://www.home-assistant.io/voice-pe/)
- [ESP32-S3-BOX-3](https://www.espressif.com/en/products/devkits/esp32-s3-box-3)
- [Ollama Integration](https://www.home-assistant.io/integrations/ollama/)
- [Home-LLM Project](https://github.com/acon96/home-llm)
- [OpenVoiceOS](https://www.openvoiceos.org/)
- [Willow (ESP32-S3-BOX)](https://heywillow.io/)
- [Lobe Chat](https://github.com/lobehub/lobe-chat)
- [LibreChat](https://github.com/danny-avila/LibreChat)
- [Open WebUI](https://github.com/open-webui/open-webui)
- [jan.ai](https://jan.ai/)

---

## Próximos Passos

### Fase 1: Validação (Voice PE)
1. [x] Adquirir Home Assistant Voice Preview Edition
2. [ ] Aguardar entrega (~20-40 dias AliExpress)
3. [ ] Setup Docker Compose no Mac
4. [ ] Configurar Ollama com modelo base
5. [ ] Desenvolver servidor Gênesis (FastAPI)
6. [ ] Integrar MCP clients (GitHub, MongoDB)
7. [ ] Implementar camada de decisão
8. [ ] Conectar com Claude API
9. [ ] Testar fluxo completo de voz

### Fase 2: Escala (Dispositivos adicionais)
10. [ ] Validar fluxo funcionando com Voice PE
11. [ ] Comprar 3x ESP32-S3-BOX-3
12. [ ] Configurar ESPHome + Wyoming
13. [ ] Distribuir pelos cômodos

### Fase 3: Mobile (Equipe de vendas)
14. [ ] Subir Lobe Chat ou Open WebUI
15. [ ] Configurar HTTPS para acesso externo
16. [ ] Testar PWA no celular
17. [ ] Treinar equipe de vendas
18. [ ] Avaliar necessidade de PWA customizada

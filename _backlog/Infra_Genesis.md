# Infraestrutura Genesis - Especificação Técnica

## 1. Visão Geral

Genesis é uma camada de inteligência sobre a stack ZAZ existente, não uma reconstrução.

**Princípio:** Reusar ~80% da infraestrutura existente, criar apenas lógica específica.

---

## 2. Arquitetura Consolidada

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              INTERFACES (Camada 0)                              │
│                                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │Mattermost│ │ WhatsApp │ │ Telegram │ │ Voice PE │ │  Alexa   │ │ Metabase │  │
│  │ + Zarah  │ │Meta(API) │ │   (new)  │ │  (casa)  │ │ (legado) │ │(reports) │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
└───────┼────────────┼────────────┼────────────┼────────────┼────────────┼────────┘
        │            │            │            │            │            │
        └────────────┴────────────┴─────┬──────┴────────────┴────────────┘
                                        │
                            ┌───────────▼───────────┐
                            │     GATEWAY           │
                            │  FortiClient VPN      │
                            │  (+ Cloudflare)       │
                            └───────────┬───────────┘
                                        │
┌───────────────────────────────────────┼───────────────────────────────────────┐
│                          VPS GENESIS (ProxMox/HostDime)                       │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                      GENESIS SERVER (FastAPI)                           │  │
│  │                                                                         │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │ LLM Router  │  │ MCP Server  │  │ Bot Manager │  │ Voice Stack │    │  │
│  │  │ (C2)        │  │ (C2)        │  │ (C2)        │  │ (C2)        │    │  │
│  │  │             │  │             │  │             │  │             │    │  │
│  │  │ • Seletor   │  │ • GitHub    │  │ • Mattermost│  │ • Whisper   │    │  │
│  │  │ • Executor  │  │ • MongoDB   │  │ • WhatsApp  │  │ • Piper     │    │  │
│  │  │ • Feedback  │  │ • Presto    │  │   (Meta API)│  │             │    │  │
│  │  │ • Experim.  │  │ • MinIO     │  │ • Telegram  │  │             │    │  │
│  │  └─────────────┘  │ • Airflow   │  │ • Alexa     │  └─────────────┘    │  │
│  │                   │ • Spark     │  └─────────────┘                      │  │
│  │                   │ • SuiteCRM  │                                       │  │
│  │                   │ • Metabase  │                                       │  │
│  │                   └─────────────┘                                       │  │
│  │                                                                         │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │  │
│  │  │             MÓDULOS FRAMEWORK (C3)                              │   │  │
│  │  │                                                                 │   │  │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │   │  │
│  │  │  │  Catálogo   │  │ Raciocínio  │  │  Análise    │             │   │  │
│  │  │  │  ✅ PRONTO  │  │  ✅ PRONTO  │  │  (futuro)   │             │   │  │
│  │  │  │             │  │             │  │             │             │   │  │
│  │  │  │ • Busca     │  │ • Hipótese  │  │ USA:        │             │   │  │
│  │  │  │ • Índice    │  │ • Evidência │  │ • PySpark   │             │   │  │
│  │  │  │ • Tipos     │  │ • Inferência│  │ • Presto    │             │   │  │
│  │  │  │             │  │ • Decisão   │  │ • Metabase  │             │   │  │
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘             │   │  │
│  │  └─────────────────────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────────┘
                                        │
          ┌─────────────────────────────┼─────────────────────────────────┐
          │                             │                             │
          ▼                             ▼                             ▼
┌─────────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  DADOS ZAZ (já existe)  │  │   PROCESSAMENTO ZAZ  │  │   STORAGE ZAZ        │
│                         │  │   (já existe)        │  │   (já existe)        │
│ • PostgreSQL            │  │                      │  │                      │
│ • MariaDB (CRM)         │  │ • PySpark            │  │ • MinIO (S3)         │
│ • MongoDB               │  │ • Hive               │  │ • HDFS               │
│ • Redis (cache)         │  │ • Presto             │  │                      │
│                         │  │ • Airflow            │  │                      │
└─────────────────────────┘  └──────────────────────┘  └──────────────────────┘
                                        │
                                        ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                            LLM PROVIDERS (externo)                           │
│                                                                              │
│  • Anthropic (Claude)  • OpenAI (GPT)  • Google (Gemini)  • DeepSeek  • xAI │
│  • Ollama (local/Mac)                                                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Módulos Genesis

### 3.1 Status dos Módulos

| Módulo | Camada | Status | Fonte |
|--------|--------|--------|-------|
| **Catálogo** | C3 | ✅ PUBLICADO | `docs/00_E/00_E_2_1_Modulo_Catalogo.md` |
| **Raciocínio** | C3 | ✅ PUBLICADO | `docs/00_E/00_E_2_2_Modulo_Raciocinio.md` |
| **LLM Router** | C2 | Backlog (spec completa) | MongoDB `backlog_items` |
| **Autonomia** | C3 | Backlog | `_backlog/Modulo_Autonomia.md` |
| **Persistência Híbrida** | C2 | ✅ Resolvido | `_backlog/Persistencia_Hibrida.md` |
| **MS_Seleção** | C4 | Backlog | `_backlog/MS_Selecao.md` |
| **Servidor Genesis Voice** | C2 | Backlog | `_backlog/Servidor_Genesis_Voice.md` |

### 3.2 Módulos Internos do Servidor

| Módulo | Camada | Responsabilidade |
|--------|--------|------------------|
| **Core (FastAPI)** | C2 | Servidor HTTP, roteamento, middleware |
| **LLM Router** | C2 | Seleção de modelo, execução, feedback, experimentos |
| **MCP Server** | C2 | Expõe tools para sistemas externos |
| **Bot Manager** | C2 | Gerencia conexões com interfaces |
| **Voice Stack** | C2 | STT (Whisper) + TTS (Piper) |

---

## 4. Integração com Stack ZAZ

### 4.1 Sistemas que Genesis USA (já existem)

| Sistema ZAZ | Uso no Genesis | Status |
|-------------|----------------|--------|
| **Airflow** | Scheduler do LLM Router | ✅ Disponível |
| **PySpark** | Processamento para Módulo Análise | ✅ Disponível |
| **Presto** | Queries federadas para Raciocínio | ✅ Disponível |
| **Hive/HDFS** | Dados históricos | ✅ Disponível |
| **MinIO** | Armazenamento de artefatos | ✅ Disponível |
| **Metabase** | Visualização + relatórios | ✅ Disponível |
| **MongoDB** | Estado, logs, feedback, catálogo | ✅ Disponível |
| **Redis** | Cache de seleção LLM | ✅ Disponível |
| **PostgreSQL** | Dados estruturados | ✅ Disponível |
| **MariaDB** | Dados CRM | ✅ Disponível |
| **Mattermost** | Interface time + Zarah | ✅ Disponível |
| **WhatsApp/Meta API** | Interface externa (chave própria) | ✅ Disponível |
| **SuiteCRM** | Dados de vendas | ✅ Disponível |
| **GitHub** | Persistência de definições | ✅ Disponível |
| **ProxMox** | Virtualização | ✅ Disponível |
| **HostDime** | Hospedagem | ✅ Disponível |
| **FortiClient VPN** | Acesso à infra | ✅ Disponível |
| **Bitwarden** | Secrets | ✅ Disponível |
| **Zabbix** | Monitoramento | ✅ Disponível |

### 4.2 Módulos que Genesis CRIA (não existem)

| Módulo | Camada | Dependência |
|--------|--------|-------------|
| **FastAPI Core** | C2 | Python (já tem) |
| **LLM Router** | C2 | MongoDB, Redis, Airflow |
| **MCP Server Genesis** | C2 | Python |
| **Bot Manager** | C2 | MM, Meta API |
| **Voice Stack** | C2 | **CRIAR** (Whisper/Piper) |
| **Telegram Bot** | C2 | **CRIAR** |

---

## 5. Conexões com Sistemas

| Sistema | Tipo | Protocolo | Função |
|---------|------|-----------|--------|
| **Mattermost** | Interface | Webhook/Bot API | Chat da equipe |
| **WhatsApp** | Interface | Meta Cloud API | Comunicação externa |
| **Telegram** | Interface | Bot API | Comunicação externa |
| **Airflow** | Orquestração | REST API | Pipelines, jobs |
| **Spark** | Processamento | JDBC/Thrift | Big data |
| **PrestoDB** | Analytics | JDBC/REST | Queries federadas |
| **Metabase** | BI | Embedding/API | Dashboards, relatórios |
| **GitHub** | Código | REST API (MCP) | Persistência |
| **MongoDB** | Estado | Driver nativo | Persistência transacional |
| **Home Assistant** | Voz (casa) | Wyoming | Orquestrador local |
| **Alexa** | Voz (legado) | Lambda/HTTPS | Interface voice |
| **Whisper** | STT | Wyoming/HTTP | Voz → Texto |
| **Piper** | TTS | Wyoming/HTTP | Texto → Voz |

---

## 6. Hardware

### 6.1 VPS Produção (HostDime - João Pessoa)

| Recurso | Especificação |
|---------|---------------|
| CPU | 4 vCPU |
| RAM | 8 GB |
| Disco | 50 GB SSD |
| SO | Ubuntu 24.04 LTS |
| Rede | IP fixo, portas 80/443/8000 |
| Custo | R$0 (já contratado) |

### 6.2 Estimativa de Uso

| Componente | CPU | RAM |
|------------|-----|-----|
| Genesis Core | 0.5 vCPU | 512 MB |
| LLM Router | 1.0 vCPU (pico) | 1 GB |
| Scheduler | 0.2 vCPU | 256 MB |
| Whisper | 0.5 vCPU | 1 GB |
| Piper | 0.3 vCPU | 512 MB |
| MongoDB | 0.5 vCPU | 1 GB |
| **Total** | ~3 vCPU (pico) | ~4.3 GB |
| **Sobra** | ~1 vCPU | ~3.7 GB |

### 6.3 Mac Local (Casa - opcional)

| Recurso | Especificação |
|---------|---------------|
| Modelo | iMac M4 |
| RAM | 16 GB |
| Função | Ollama, Home Assistant, Voice PE |

### 6.4 Dispositivos de Voz

| Dispositivo | Qtd | Custo | Status |
|-------------|-----|-------|--------|
| Voice Preview Edition | 1 | R$630 | ✅ Comprado |
| ESP32-S3-BOX-3 | 3 | ~R$1.158 | Pendente |

---

## 7. Segurança

### 7.1 Camadas

| Camada | Ferramenta | Função |
|--------|------------|--------|
| **Edge** | Cloudflare | SSL, DDoS, WAF, Tunnel |
| **Rede** | FortiClient VPN | Acesso à infra |
| **App** | FastAPI middleware | Auth, rate limit, logging |
| **Secrets** | Bitwarden | API keys |
| **Dados** | MongoDB auth + regra P0 | Dados sensíveis → modelo local |

### 7.2 Requisitos de Rede (Saída)

| Destino | Porta | Uso |
|---------|-------|-----|
| api.anthropic.com | 443 | Claude API |
| api.openai.com | 443 | GPT API |
| generativelanguage.googleapis.com | 443 | Gemini API |
| api.deepseek.com | 443 | DeepSeek API |
| api.x.ai | 443 | Grok API |
| graph.facebook.com | 443 | Meta/WhatsApp API |
| api.telegram.org | 443 | Telegram Bot API |
| api.github.com | 443 | GitHub MCP |
| mongodb+srv://*.mongodb.net | 27017 | MongoDB Atlas |

---

## 8. Custos Operacionais

### 8.1 Mensal

| Item | Custo/mês |
|------|-----------|
| VPS Hostdime | R$0 (já tem) |
| Cloudflare | R$0 (free tier) |
| Claude API | ~R$20-100 |
| Outras APIs LLM | ~R$10-50 |
| MongoDB Atlas | R$0 (já tem) |
| **Total** | **~R$30-150** |

### 8.2 Hardware (único)

| Item | Custo |
|------|-------|
| Voice PE | R$630 |
| 3x ESP32-S3-BOX-3 | ~R$1.158 |
| **Total** | **~R$1.788** |

---

## 9. Stack Técnica

### 9.1 Runtime

| Camada | Tecnologia |
|--------|------------|
| Linguagem | Python 3.11+ |
| Framework | FastAPI |
| ORM/Driver | Motor (async MongoDB) |
| HTTP Client | httpx |
| Scheduler | APScheduler (MVP) → Airflow (prod) |

### 9.2 Containerização

| Componente | Imagem |
|------------|--------|
| Genesis Server | Custom (Dockerfile) |
| MongoDB | mongo:latest |
| Whisper | rhasspy/wyoming-whisper |
| Piper | rhasspy/wyoming-piper |

---

## 10. Portas

| Software | Porta | Localização |
|----------|-------|-------------|
| Servidor Gênesis | 8000 | VPS |
| MongoDB | 27017 | VPS |
| Whisper (STT) | 10300 | VPS + Mac |
| Piper (TTS) | 10200 | VPS + Mac |
| Home Assistant | 8123 | Mac |
| Ollama | 11434 | Mac |

---

## 11. Interfaces e Fluxos

### 11.1 Mattermost (Interface Principal - Time)

```
Vendedor: @genesis qual status sprint?
    ↓
Mattermost (auth delegada, passa user_id)
    ↓ webhook
Bot Gênesis (VPS)
    ↓
LLM Router classifica → Haiku
    ↓
MCP GitHub/MongoDB
    ↓
Resposta no canal
```

### 11.2 WhatsApp (Meta API - Chave Própria)

```
Cliente envia mensagem
    ↓
Meta Cloud API (webhook)
    ↓
Bot Gênesis (VPS)
    ↓
LLM Router → modelo apropriado
    ↓
Resposta via Meta API
```

### 11.3 Voice PE / ESP32-S3-BOX-3 (Casa)

```
Leonardo fala: "Gênesis, lista commits"
    ↓
Voice PE (mic) → Home Assistant (Mac)
    ↓
Whisper (STT) → texto
    ↓
Servidor Gênesis (VPS ou local)
    ↓
LLM Router → Ollama local ou Claude API
    ↓
Piper (TTS) → áudio
    ↓
Voice PE (speaker)
```

### 11.4 Metabase (Relatórios)

```
Usuário solicita relatório
    ↓
Gênesis processa dados via Presto/Spark
    ↓
Gera visualização ou exporta para Metabase
    ↓
Dashboard disponível
```

---

## 12. Dependências

### 12.1 Resolvidas

- [x] VPS Hostdime disponível
- [x] MongoDB configurado
- [x] Módulo Catálogo publicado
- [x] Módulo Raciocínio publicado
- [x] Meta API (WhatsApp) com chave própria
- [x] Stack de dados ZAZ (Spark, Presto, Hive)

### 12.2 Pendentes

- [ ] API keys dos fornecedores LLM
- [ ] Voice PE entregue (20-40 dias)
- [ ] Implementação do LLM Router
- [ ] Bot Telegram
- [ ] Configuração Voice Stack

---

## 13. Próximos Passos

1. Configurar VPS Genesis no ProxMox
2. Implementar FastAPI Core
3. Implementar LLM Router (spec no MongoDB)
4. Implementar Bot Mattermost
5. Testar fluxo completo
6. Implementar Bot WhatsApp (Meta API)
7. Implementar Bot Telegram
8. Aguardar Voice PE e configurar Home Assistant
9. Escalar dispositivos de voz (ESP32-S3-BOX-3)

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-09 | Documento inicial - consolidação arquitetura |

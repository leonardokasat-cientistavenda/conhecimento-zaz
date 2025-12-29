# MS_Prometheus_Auth

---

```yaml
nome: MS_Prometheus_Auth
versao: "1.0"
tipo: Padrao_Operacional
status: Publicado
pai: genesis/PROMETHEUS.md
data: 2025-12-29
backlog_ref: BKL-065
```

---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Secret** | Credencial sensível (senha, token, chave API) |
| **Worker** | Serviço Node.js que executa tarefas (Camunda ou HTTP) |
| **Serviço Externo** | Sistema que worker acessa (ClickHouse, MongoDB, APIs) |
| **Caller Externo** | Sistema que chama worker via HTTP (MCP Server, GitHub Actions) |
| **Injeção** | Processo de disponibilizar secrets para worker em runtime |
| **HMAC** | Hash-based Message Authentication Code |

### 1.2 Sintomas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SINTOMAS OBSERVADOS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. Gabriel subiu ClickHouse → Onde ficam as credenciais?                   │
│     • Não há local padrão definido                                          │
│     • Credenciais ficaram "na cabeça" do Gabriel                            │
│                                                                             │
│  2. Worker clickhouse-api → Como consome secrets?                           │
│     • Não há convenção de nomenclatura                                      │
│     • Cada worker inventa nomes diferentes                                  │
│                                                                             │
│  3. MCP Server chamando worker → Como valida request?                       │
│     • Pipeline usa HMAC, mas workers HTTP não têm padrão                    │
│     • Risco de endpoints expostos sem autenticação                          │
│                                                                             │
│  CONSEQUÊNCIA: Sprint S-PROMETHEUS-001 bloqueada em T02                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Causa Raiz

```
SEM PADRÃO DE AUTENTICAÇÃO
         │
         ├── Variabilidade → Cada dev faz diferente
         │
         ├── Conhecimento tácito → Credenciais "na cabeça"
         │
         ├── Risco de segurança → Endpoints sem auth
         │
         └── Bloqueio de trabalho → Sprint travada
```

### 1.4 Tese

> **MS_Prometheus_Auth é o Padrão Operacional que define ONDE armazenar secrets, COMO nomear variáveis, COMO injetar em workers e COMO validar requests externos.**
>
> **Resolve:**
> - Variabilidade → Padrão único obrigatório
> - Conhecimento tácito → Documentação explícita
> - Risco de segurança → Validação padrão
> - Bloqueio de trabalho → Checklist de novo serviço

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Fonte | Aplicação |
|----------|-------|-----------|
| **12-Factor App** | Heroku (2011) | III. Config: secrets em env vars |
| **Principle of Least Privilege** | NIST | Credenciais mínimas necessárias |
| **Defense in Depth** | OWASP | Múltiplas camadas de validação |
| **Convention over Configuration** | Rails | Nomenclatura previsível reduz erros |

### 2.2 Síntese

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PILARES DO PADRÃO                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. ARMAZENAMENTO                  2. NOMENCLATURA                          │
│  ┌───────────────────────────┐     ┌───────────────────────────┐            │
│  │ • Um .env por servidor    │     │ • SERVICO_ATRIBUTO        │            │
│  │ • Nunca no Git            │     │ • SCREAMING_SNAKE_CASE    │            │
│  │ • Owner: infra team       │     │ • Prefixo = serviço       │            │
│  └───────────────────────────┘     └───────────────────────────┘            │
│                                                                             │
│  3. INJEÇÃO                        4. VALIDAÇÃO                             │
│  ┌───────────────────────────┐     ┌───────────────────────────┐            │
│  │ • env_file em compose     │     │ • Bearer token para HTTP  │            │
│  │ • PM2 ecosystem.config    │     │ • HMAC para webhooks      │            │
│  │ • Fallback explícito      │     │ • Checklist obrigatório   │            │
│  └───────────────────────────┘     └───────────────────────────┘            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Objeto (M2)

### 3.1 Definição

**MS_Prometheus_Auth** é o Padrão Operacional que:
- **Define** onde e como armazenar secrets
- **Padroniza** nomenclatura de variáveis de ambiente
- **Especifica** como workers consomem secrets
- **Determina** como validar requests externos
- **Fornece** checklist para novos serviços

### 3.2 Fronteiras

| MS_Prometheus_Auth É | MS_Prometheus_Auth NÃO É |
|----------------------|--------------------------|
| Padrão de nomenclatura | Gerenciador de secrets (Vault) |
| Convenção de injeção | Sistema de rotação de keys |
| Método de validação | Framework de autenticação |
| Checklist operacional | Política de segurança completa |

### 3.3 Escopo

| Componente | Dentro do Escopo | Fora do Escopo |
|------------|------------------|----------------|
| **Secrets** | Env vars, tokens | Certificados TLS |
| **Workers** | HTTP, Camunda | Frontend apps |
| **Validação** | Bearer, HMAC | OAuth, SAML |
| **Armazenamento** | .env no servidor | Cloud secret managers |

---

## 4. Classe (M3)

### 4.1 Padrão de Armazenamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ONDE FICAM OS SECRETS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SERVIDOR: /home/camunda-orquestrador/                                      │
│  ═════════════════════════════════════                                      │
│                                                                             │
│  /home/camunda-orquestrador/                                                │
│  │                                                                          │
│  ├── .env                          ← FONTE ÚNICA DE VERDADE                 │
│  │   │                               (não versionado)                       │
│  │   ├── # === CAMUNDA ===                                                  │
│  │   ├── CAMUNDA_URL=http://10.100.12.24:8080                               │
│  │   ├── CAMUNDA_USER=admin                                                 │
│  │   ├── CAMUNDA_PASS=***                                                   │
│  │   ├── # === CLICKHOUSE ===                                               │
│  │   ├── CLICKHOUSE_HOST=10.100.12.24                                       │
│  │   ├── CLICKHOUSE_PORT=8123                                               │
│  │   ├── CLICKHOUSE_USER=genesis                                            │
│  │   ├── CLICKHOUSE_PASS=***                                                │
│  │   ├── # === AUTH TOKENS ===                                              │
│  │   ├── AUTH_TOKEN_CLICKHOUSE_API=***                                      │
│  │   └── DEPLOY_SECRET=***                                                  │
│  │                                                                          │
│  ├── Orquestrador-Zarah/                                                    │
│  │   └── .env.example              ← Template (versionado, sem valores)     │
│  │                                                                          │
│  └── docker-compose.yml            ← Referencia .env via env_file           │
│                                                                             │
│  REGRAS:                                                                    │
│  ────────                                                                   │
│  • .env NUNCA vai para Git                                                  │
│  • .env.example vai para Git (template)                                     │
│  • Owner do .env: time de infra (Gabriel)                                   │
│  • Alterações: via PR no .env.example + comunicação no Mattermost           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Padrão de Nomenclatura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMO NOMEAR VARIÁVEIS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FORMATO: {SERVICO}_{ATRIBUTO}                                              │
│  ══════════════════════════════                                             │
│                                                                             │
│  Exemplos:                                                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  SERVICO       ATRIBUTOS                                              │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │  CAMUNDA       CAMUNDA_URL, CAMUNDA_USER, CAMUNDA_PASS                │  │
│  │  CLICKHOUSE    CLICKHOUSE_HOST, CLICKHOUSE_PORT, CLICKHOUSE_USER,     │  │
│  │                CLICKHOUSE_PASS, CLICKHOUSE_DATABASE                   │  │
│  │  MONGODB       MONGODB_URI, MONGODB_DATABASE                          │  │
│  │  ANTHROPIC     ANTHROPIC_API_KEY                                      │  │
│  │  OPENAI        OPENAI_API_KEY                                         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ATRIBUTOS PADRÃO POR TIPO:                                                 │
│  ────────────────────────────                                               │
│  • Conexão: _HOST, _PORT, _URL, _URI                                        │
│  • Credencial: _USER, _PASS, _API_KEY, _TOKEN                               │
│  • Recurso: _DATABASE, _BUCKET, _QUEUE                                      │
│                                                                             │
│  TOKENS DE AUTENTICAÇÃO:                                                    │
│  ────────────────────────                                                   │
│  Formato: AUTH_TOKEN_{WORKER}                                               │
│  Exemplo: AUTH_TOKEN_CLICKHOUSE_API                                         │
│           AUTH_TOKEN_GENESIS_API                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Padrão de Injeção

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMO WORKERS CONSOMEM SECRETS                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  OPÇÃO A: PM2 (workers Node.js standalone)                                  │
│  ═════════════════════════════════════════                                  │
│                                                                             │
│  ecosystem.config.js:                                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  module.exports = {                                                   │  │
│  │    apps: [{                                                           │  │
│  │      name: 'orquestrador',                                            │  │
│  │      script: './src/index.js',                                        │  │
│  │      env: {                                                           │  │
│  │        NODE_ENV: 'production'                                         │  │
│  │      },                                                               │  │
│  │      // PM2 carrega ../.env automaticamente                           │  │
│  │    }]                                                                 │  │
│  │  }                                                                    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  OPÇÃO B: Docker Compose (workers containerizados)                          │
│  ═════════════════════════════════════════════════                          │
│                                                                             │
│  docker-compose.yml:                                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  services:                                                            │  │
│  │    clickhouse-api:                                                    │  │
│  │      image: node:20-alpine                                            │  │
│  │      env_file:                                                        │  │
│  │        - ../.env          # Carrega .env do diretório pai             │  │
│  │      environment:                                                     │  │
│  │        - NODE_ENV=production                                          │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  NO CÓDIGO (ambas opções):                                                  │
│  ═════════════════════════                                                  │
│                                                                             │
│  config.js:                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  // Falha rápida se secret não existir                                │  │
│  │  const requiredEnv = (name) => {                                      │  │
│  │    const value = process.env[name];                                   │  │
│  │    if (!value) throw new Error(`Missing required env: ${name}`);      │  │
│  │    return value;                                                      │  │
│  │  };                                                                   │  │
│  │                                                                       │  │
│  │  module.exports = {                                                   │  │
│  │    clickhouse: {                                                      │  │
│  │      host: requiredEnv('CLICKHOUSE_HOST'),                            │  │
│  │      port: process.env.CLICKHOUSE_PORT || '8123',                     │  │
│  │      user: requiredEnv('CLICKHOUSE_USER'),                            │  │
│  │      password: requiredEnv('CLICKHOUSE_PASS'),                        │  │
│  │    }                                                                  │  │
│  │  };                                                                   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Padrão de Validação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMO VALIDAR REQUESTS EXTERNOS                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TIPO 1: Bearer Token (MCP Server → Worker HTTP)                            │
│  ═══════════════════════════════════════════════                            │
│                                                                             │
│  Caller (MCP Server):                                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  fetch('https://clickhouse-api.zaz.com.br/query', {                   │  │
│  │    method: 'POST',                                                    │  │
│  │    headers: {                                                         │  │
│  │      'Authorization': `Bearer ${process.env.AUTH_TOKEN_CLICKHOUSE_API}`,│ │
│  │      'Content-Type': 'application/json'                               │  │
│  │    },                                                                 │  │
│  │    body: JSON.stringify({ sql: 'SELECT 1' })                          │  │
│  │  });                                                                  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Worker (valida):                                                           │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  const validateBearer = (req, res, next) => {                         │  │
│  │    const auth = req.headers['authorization'];                         │  │
│  │    if (!auth || !auth.startsWith('Bearer ')) {                        │  │
│  │      return res.status(401).json({ error: 'Missing Bearer token' });  │  │
│  │    }                                                                  │  │
│  │    const token = auth.slice(7);                                       │  │
│  │    const expected = process.env.AUTH_TOKEN_CLICKHOUSE_API;            │  │
│  │    if (token !== expected) {                                          │  │
│  │      return res.status(403).json({ error: 'Invalid token' });         │  │
│  │    }                                                                  │  │
│  │    next();                                                            │  │
│  │  };                                                                   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  TIPO 2: HMAC-SHA256 (GitHub Actions → Worker)                              │
│  ═════════════════════════════════════════════                              │
│                                                                             │
│  Já implementado em MS_Prometheus_Pipeline_Arquitetura.md seção 3.          │
│  Usado para webhooks de deploy.                                             │
│                                                                             │
│  QUANDO USAR CADA TIPO:                                                     │
│  ══════════════════════                                                     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Bearer Token          │  HMAC-SHA256                               │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  • Request/Response    │  • Webhooks                                │    │
│  │  • MCP → Worker        │  • GitHub → Worker                         │    │
│  │  • Simples             │  • Replay protection                       │    │
│  │  • Stateless           │  • Timestamp validation                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Checklist de Novo Serviço

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CHECKLIST: ADICIONAR NOVO SERVIÇO                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ☐ 1. NOMENCLATURA                                                          │
│     • Definir prefixo do serviço (ex: CLICKHOUSE)                           │
│     • Listar variáveis necessárias (_HOST, _PORT, _USER, _PASS, etc)        │
│     • Se worker exposto: definir AUTH_TOKEN_{WORKER}                        │
│                                                                             │
│  ☐ 2. TEMPLATE                                                              │
│     • Adicionar variáveis ao .env.example (sem valores reais)               │
│     • Criar PR com alterações                                               │
│     • Documentar no PR quais variáveis são obrigatórias                     │
│                                                                             │
│  ☐ 3. COMUNICAÇÃO                                                           │
│     • Notificar time de infra (Gabriel) no Mattermost                       │
│     • Solicitar criação das credenciais reais                               │
│     • Confirmar quando .env do servidor foi atualizado                      │
│                                                                             │
│  ☐ 4. CÓDIGO                                                                │
│     • Usar config.js com requiredEnv() para variáveis obrigatórias          │
│     • Usar fallback (|| 'default') para opcionais                           │
│     • Falhar rápido na inicialização se faltar secret obrigatório           │
│                                                                             │
│  ☐ 5. VALIDAÇÃO (se worker HTTP exposto)                                    │
│     • Implementar middleware validateBearer ou validateHMAC                 │
│     • Aplicar em todas as rotas públicas                                    │
│     • Testar com token válido e inválido                                    │
│                                                                             │
│  ☐ 6. DOCUMENTAÇÃO                                                          │
│     • Atualizar README do worker                                            │
│     • Adicionar exemplo de chamada com autenticação                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Aplicação Imediata: ClickHouse

Aplicando o padrão para desbloquear S-PROMETHEUS-001:

### 5.1 Variáveis Necessárias

```bash
# === CLICKHOUSE ===
CLICKHOUSE_HOST=10.100.12.24
CLICKHOUSE_PORT=8123
CLICKHOUSE_USER=genesis
CLICKHOUSE_PASS=***
CLICKHOUSE_DATABASE=genesis

# === AUTH TOKEN ===
AUTH_TOKEN_CLICKHOUSE_API=***
```

### 5.2 Fluxo de Comunicação

```
Gabriel (infra) ──► .env do servidor
                     │
                     │ comunica
                     ▼
Leonardo ◄────────── Mattermost: "Credenciais ClickHouse configuradas"
    │
    │ implementa
    ▼
Worker clickhouse-api
    │
    │ valida Bearer token
    ▼
MCP Server ──► claude.ai
```

### 5.3 Próximos Passos

1. **Gabriel**: Criar usuário `genesis` no ClickHouse
2. **Gabriel**: Adicionar variáveis ao .env do servidor
3. **Gabriel**: Gerar AUTH_TOKEN_CLICKHOUSE_API (UUID v4)
4. **Gabriel**: Notificar no Mattermost
5. **Leonardo**: Retomar S-PROMETHEUS-001 task T02

---

## 6. Referências

### Internas

| Documento | Relação |
|-----------|---------|
| genesis/PROMETHEUS.md | Sistema pai |
| docs/04_P/MS_Prometheus_Pipeline.md | Deploy (usa DEPLOY_SECRET) |
| docs/04_P/MS_Prometheus_Pipeline_Arquitetura.md | HMAC detalhado |

### Externas

| Fonte | Conceito |
|-------|----------|
| 12-Factor App | Config via env vars |
| OWASP | Defense in Depth |
| NIST | Principle of Least Privilege |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-29 | Publicação inicial. Padrão de autenticação para workers: armazenamento, nomenclatura, injeção, validação. Checklist de novo serviço. BKL-065. |

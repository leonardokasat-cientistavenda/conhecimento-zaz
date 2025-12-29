# MS_Prometheus_Auth

---

```yaml
nome: MS_Prometheus_Auth
versao: "1.1"
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
> - Bloqueio de trabalho → Template de solicitação

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
│  │ • Fallback explícito      │     │ • Template de solicitação │            │
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
- **Fornece** template de solicitação para infra

### 3.2 Fronteiras

| MS_Prometheus_Auth É | MS_Prometheus_Auth NÃO É |
|----------------------|--------------------------|
| Padrão de nomenclatura | Gerenciador de secrets (Vault) |
| Convenção de injeção | Sistema de rotação de keys |
| Método de validação | Framework de autenticação |
| Template de solicitação | Política de segurança completa |

### 3.3 Escopo

| Componente | Dentro do Escopo | Fora do Escopo |
|------------|------------------|----------------|
| **Secrets** | Env vars, tokens | Certificados TLS |
| **Workers** | HTTP, Camunda | Frontend apps |
| **Validação** | Bearer, HMAC | OAuth, SAML |
| **Armazenamento** | .env no servidor | Cloud secret managers |

---

## 4. Classe (M3)

### 4.1 Padrão de Nomenclatura

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
│  TOKENS DE AUTENTICAÇÃO (para workers expostos):                            │
│  ───────────────────────────────────────────────                            │
│  Formato: AUTH_TOKEN_{WORKER}                                               │
│  Exemplo: AUTH_TOKEN_CLICKHOUSE_API                                         │
│           AUTH_TOKEN_GENESIS_API                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Padrão de Validação (Worker HTTP)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMO VALIDAR REQUESTS EXTERNOS                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Bearer Token (MCP Server → Worker HTTP)                                    │
│  ═══════════════════════════════════════                                    │
│                                                                             │
│  Caller (MCP Server):                                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  headers: {                                                           │  │
│  │    'Authorization': `Bearer ${AUTH_TOKEN_CLICKHOUSE_API}`             │  │
│  │  }                                                                    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Worker (middleware validateBearer):                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  const validateBearer = (req, res, next) => {                         │  │
│  │    const auth = req.headers['authorization'];                         │  │
│  │    if (!auth?.startsWith('Bearer '))                                  │  │
│  │      return res.status(401).json({ error: 'Missing Bearer token' }); │  │
│  │    if (auth.slice(7) !== process.env.AUTH_TOKEN_CLICKHOUSE_API)       │  │
│  │      return res.status(403).json({ error: 'Invalid token' });         │  │
│  │    next();                                                            │  │
│  │  };                                                                   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.3 Template de Solicitação para Infra (PRINCIPAL)

**Quando usar:** Ao precisar de um novo worker que acessa serviço externo ou é exposto via HTTP.

**Copiar e preencher, enviar no Mattermost para Gabriel:**

```
───────────────────────────────────────────────────────
🔧 SOLICITAÇÃO: Novo Worker {NOME_DO_WORKER}
───────────────────────────────────────────────────────

**O que é:** {descrição breve - 1 linha}

**Serviço que acessa:** {ClickHouse / MongoDB / Redis / etc}

**Variáveis que preciso no .env:**
# === {SERVICO} ===
{SERVICO}_HOST=
{SERVICO}_PORT=
{SERVICO}_USER=
{SERVICO}_PASS=
{SERVICO}_DATABASE=

**Worker exposto via HTTPS?** Sim / Não
  Se sim, preciso de: AUTH_TOKEN_{WORKER}=

**Precisa criar algo no serviço?**
☐ Usuário: {nome sugerido}
☐ Database/Schema: {nome sugerido}
☐ Permissões: {read / write / admin}

**Subdomínio (se exposto):** {worker}.zaz.com.br

**Urgência:** {Alta / Média / Baixa}
**Contexto:** {sprint ou motivo}

Me avisa quando estiver pronto!
───────────────────────────────────────────────────────
```

---

### 4.4 Exemplo: Solicitação ClickHouse

```
───────────────────────────────────────────────────────
🔧 SOLICITAÇÃO: Novo Worker clickhouse-api
───────────────────────────────────────────────────────

**O que é:** API HTTP que recebe queries SQL e executa no ClickHouse

**Serviço que acessa:** ClickHouse

**Variáveis que preciso no .env:**
# === CLICKHOUSE ===
CLICKHOUSE_HOST=
CLICKHOUSE_PORT=
CLICKHOUSE_USER=
CLICKHOUSE_PASS=
CLICKHOUSE_DATABASE=

**Worker exposto via HTTPS?** Sim
  Preciso de: AUTH_TOKEN_CLICKHOUSE_API=

**Precisa criar algo no serviço?**
☑ Usuário: genesis
☑ Database: genesis
☑ Permissões: read/write (não admin)

**Subdomínio:** clickhouse-api.zaz.com.br

**Urgência:** Alta
**Contexto:** Bloqueia sprint S-PROMETHEUS-001

Me avisa quando estiver pronto!
───────────────────────────────────────────────────────
```

---

### 4.5 Resposta Esperada do Gabriel

Após configurar, Gabriel deve responder com:

```
✅ Configurado!

CLICKHOUSE_HOST=10.100.12.24
CLICKHOUSE_PORT=8123
CLICKHOUSE_USER=genesis
CLICKHOUSE_PASS=(configurado no .env)
CLICKHOUSE_DATABASE=genesis
AUTH_TOKEN_CLICKHOUSE_API=(configurado no .env)

Subdomínio: clickhouse-api.zaz.com.br → pronto para apontar

Pode seguir!
```

---

## 5. Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO: NOVO WORKER COM AUTENTICAÇÃO                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. LEONARDO especifica worker                                              │
│     └── Define: nome, serviço, variáveis, se exposto                        │
│                                                                             │
│  2. LEONARDO envia template (seção 4.3) para Gabriel no Mattermost          │
│                                                                             │
│  3. GABRIEL executa:                                                        │
│     ├── Cria usuário/database no serviço (se necessário)                    │
│     ├── Adiciona variáveis ao .env do servidor                              │
│     ├── Gera AUTH_TOKEN se worker exposto (uuidgen)                         │
│     └── Configura DNS/proxy se subdomínio                                   │
│                                                                             │
│  4. GABRIEL responde (seção 4.5) com valores configurados                   │
│                                                                             │
│  5. LEONARDO implementa worker:                                             │
│     ├── config.js com requiredEnv() para vars obrigatórias                  │
│     ├── middleware validateBearer se exposto                                │
│     └── Deploy via pipeline                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

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
| 1.0 | 2025-12-29 | Publicação inicial. Padrão completo M0-M4. BKL-065. |
| 1.1 | 2025-12-29 | **Foco prático**: Template de solicitação (4.3) como seção principal. Exemplo preenchido (4.4). Resposta esperada (4.5). Fluxo completo (seção 5). Removidas seções redundantes. |

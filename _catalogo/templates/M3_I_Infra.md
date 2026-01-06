---
nome: Template M3.I - Infraestrutura
id: template_spec_infra
versao: "1.0"
tipo: Template
vertente: M3.I
origem: interno
status: Publicado
etapa: M4
sprint_ref: S-MM-EDIT-001
camada: C3
artefatos_produzidos:
  - "ecosystem.config.js"
  - ".env"
  - "docker-compose.yml"
schema_tdd_obrigatorio: false
---

# Template M3.I - Especificação Infraestrutura v1.0

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Template M3.I** | Modelo de especificação para vertente Infraestrutura |
| **PM2** | Process Manager para Node.js em produção |
| **ClickHouse** | Database analítico para logs e métricas |
| **Variável ENV** | Variável de ambiente que configura serviço |

### 1.2 Tese

> **Template M3.I é conhecimento catalogado que define REGRAS INVARIANTES de infraestrutura.**
>
> - **Objetivo:** Prevenir crashes e conflitos de recursos
> - **Origem:** Incidentes reais em produção
> - **Aplicação:** Todo código que interage com infra DEVE consultar este template

---

## 2. Marco Teórico (M1)

### 2.1 Referências

| Conceito | Fonte | Aplicação |
|----------|-------|-----------|
| **12-Factor App** | Heroku | Config via ENV, Port binding |
| **Principle of Least Privilege** | Security Best Practices | Usuários ClickHouse |
| **PM2 Ecosystem** | PM2 Docs | Configuração de processos |

---

## 3. Objeto (M2)

### 3.1 Fronteiras

| É | NÃO É |
|---|-------|
| Regras de configuração de infra | Código de aplicação |
| Invariantes de deploy | Lógica de negócio |
| Prevenção de conflitos | Implementação de features |
| Checklist obrigatório | Sugestões opcionais |

---

## 4. Classe (M3)

### 4.1 REGRA 1: Portas PM2 - NUNCA Reutilizar

#### Invariante

> **Cada serviço PM2 DEVE ter variável de ambiente ÚNICA para porta.**

#### Registro de Portas

| App | Variável ENV | Porta | Descrição |
|-----|--------------|-------|----------|
| index | `PORT` | 8000 | Workers Camunda |
| pantheon | `PANTHEON_PORT` | 3100 | Agentes MM |
| infra-bot | `INFRA_BOT_PORT` | 3101 | Bot @infra |

#### Ao Criar Novo Serviço

1. **Escolher porta** na faixa 3102-3199 (reservada para novos serviços)
2. **Criar variável ENV** com nome único: `{SERVICO}_PORT`
3. **Atualizar esta tabela** com o novo registro
4. **Nunca usar** `PORT` genérico (reservado para index)

#### Incidente de Referência

```
Data: 2026-01-06
Causa: PORT=8000 compartilhada entre index e pantheon no PM2
Impacto: Crash do sistema ZAZ (EADDRINUSE)
Fix: commits f37b1a0, 30e9008
Lição: Variáveis de porta DEVEM ser únicas por serviço
```

---

### 4.2 REGRA 2: ClickHouse - Separação Read/Write

#### Invariante

> **Operações de WRITE (INSERT, CREATE, ALTER) DEVEM usar credenciais ADMIN.**
> **Operações de READ (SELECT) PODEM usar credenciais padrão.**

#### Credenciais

| Operação | Variável User | Variável Password | Permissões |
|----------|---------------|-------------------|------------|
| READ | `CLICKHOUSE_USER` | `CLICKHOUSE_PASSWORD` | SELECT apenas |
| WRITE | `CLICKHOUSE_ADMIN_USER` | `CLICKHOUSE_ADMIN_PASSWORD` | INSERT, CREATE, ALTER, DROP |

#### Padrão de Código

```javascript
// ✅ CORRETO - Write com admin
async function insertLog(data) {
  const creds = {
    user: process.env.CLICKHOUSE_ADMIN_USER,      // 'infrabot'
    password: process.env.CLICKHOUSE_ADMIN_PASSWORD
  };
  return chQuery(insertSQL, creds);
}

// ✅ CORRETO - Read com user padrão
async function queryLogs(filter) {
  const creds = {
    user: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD
  };
  return chQuery(selectSQL, creds);
}

// ❌ ERRADO - Write sem admin (vai falhar com permission denied)
async function insertLog(data) {
  const creds = {
    user: process.env.CLICKHOUSE_USER,  // NÃO tem permissão de INSERT!
    password: process.env.CLICKHOUSE_PASSWORD
  };
  return chQuery(insertSQL, creds);  // FALHA
}
```

#### Implementação Helper

```javascript
// lib/clickhouse.js - Padrão recomendado

function getReadCredentials() {
  return {
    user: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD
  };
}

function getWriteCredentials() {
  return {
    user: process.env.CLICKHOUSE_ADMIN_USER,
    password: process.env.CLICKHOUSE_ADMIN_PASSWORD
  };
}

async function chQuery(query, useAdmin = false) {
  const creds = useAdmin ? getWriteCredentials() : getReadCredentials();
  // ... executa query com creds
}

// Uso:
await chQuery('SELECT * FROM logs', false);           // READ
await chQuery('INSERT INTO logs VALUES ...', true);   // WRITE
await chQuery('CREATE TABLE ...', true);              // DDL
```

#### Checklist ao Gerar Código ClickHouse

| ID | Verificação | Obrigatório |
|----|-------------|-------------|
| CH01 | SELECT usa `useAdmin = false` | ✓ |
| CH02 | INSERT usa `useAdmin = true` | ✓ |
| CH03 | CREATE/ALTER/DROP usa `useAdmin = true` | ✓ |
| CH04 | Variáveis ENV corretas no .env | ✓ |

---

### 4.3 REGRA 3: Faixa de Portas Reservadas

| Faixa | Uso | Responsável |
|-------|-----|-------------|
| 8000 | Workers Camunda (index) | Sistema |
| 8080 | Camunda Engine | Sistema |
| 3100-3199 | Pantheon e bots | Pantheon |
| 5432 | PostgreSQL | Database |
| 27017 | MongoDB | Database |
| 8123 | ClickHouse HTTP | Database |
| 9000 | ClickHouse Native | Database |

---

## 5. Checklist de Validação

| ID | Verificação | Obrigatório |
|----|-------------|-------------|
| CK01 | Porta não conflita com tabela 4.1 | ✓ |
| CK02 | Variável ENV única para porta | ✓ |
| CK03 | ClickHouse write usa admin | ✓ |
| CK04 | Novo serviço registrado neste doc | ✓ |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2026-01-06 | Versão inicial. Regras PM2 + ClickHouse. Origem: incidente crash porta 8000. |

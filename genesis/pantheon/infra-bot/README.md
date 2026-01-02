# Infra Bot

**Sprint:** S-INFRA-BOT-001  
**Status:** Em desenvolvimento

Bot de infraestrutura para execução de comandos via Mattermost, permitindo que o Claude Desktop tenha visibilidade completa do ciclo de desenvolvimento.

## Arquitetura

```
MM @infra → Webhook → Express (porta 3101) → Executa comando → Responde no MM
```

## Comandos

| Comando | Descrição |
|---------|------------|
| `@infra help` | Lista comandos disponíveis |
| `@infra status` | Status de todos os processos PM2 |
| `@infra logs {app}` | Últimas 50 linhas de log |
| `@infra restart {app}` | Reinicia um app no PM2 |
| `@infra test {path}` | Executa npm test |
| `@infra lint {path}` | Executa npm run lint |
| `@infra git-status` | Status do repositório Git |
| `@infra git-pull` | Executa git pull origin main |
| `@infra health` | Health check do servidor |

## Deploy

### 1. Instalar dependências

```bash
cd /home/camunda-orquestrador/Orquestrador-Zarah/pantheon/infra-bot
npm install
```

### 2. Configurar ambiente

```bash
cp .env.example .env
# Editar .env se necessário
```

### 3. Iniciar com PM2

```bash
pm2 start index.js --name infra-bot
pm2 save
```

### 4. Configurar Nginx

Adicionar ao nginx:

```nginx
location /api/infra/webhook {
    proxy_pass http://127.0.0.1:3101/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## Credenciais

| Item | Valor |
|------|-------|
| Bot User ID | `dfe3pwbozibctywofrtg9dnf5h` |
| Bot Token | `o1qwmucs7ifd8p8gxr8aezm4go` |
| Webhook Token | `ybw99n76f7nax85zpqxj1dz3dw` |
| Porta | `3101` |

## Fluxo Claude Desktop

```
Claude Desktop
    │
    ├── mm: post("@infra status") 
    │         │
    │         ▼
    │   Mattermost detecta @infra
    │         │
    │         ▼
    │   Webhook → https://zaz.vc/api/infra/webhook
    │         │
    │         ▼
    │   Infra Bot executa pm2 jlist
    │         │
    │         ▼
    │   Infra Bot posta resultado no canal
    │         │
    └── mm: get_posts() ← Claude lê resultado
```

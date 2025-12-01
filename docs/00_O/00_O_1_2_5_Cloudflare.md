---
nome: "00_O_1_2_5_Cloudflare"
versao: "1.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_O_1_2_5_Cloudflare

**Versão:** 1.0
**Tipo:** Classe
**Classe_ref:** Classe
**Origem:** interno
**Status:** Draft

---

## 1. Definição

Cloudflare é a classe que define configuração de segurança para permitir automações (GitHub Actions) enquanto protege contra bots maliciosos.

Componente de segurança do Pipeline de Documentação.

---

## 2. Diagrama
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  REQUISIÇÃO                                                     │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  CLOUDFLARE                                             │    │
│  │                                                         │    │
│  │  1. WAF Custom Rules (primeira verificação)             │    │
│  │     │                                                   │    │
│  │     ├── IP na lista GitHub? ──► SIM ──► SKIP SBFM       │    │
│  │     │                                                   │    │
│  │     └── NÃO                                             │    │
│  │          │                                              │    │
│  │          ▼                                              │    │
│  │  2. Super Bot Fight Mode                                │    │
│  │     │                                                   │    │
│  │     ├── Definitely automated ──► Managed Challenge      │    │
│  │     ├── Likely automated ──► Allow                      │    │
│  │     └── Verified bots ──► Allow                         │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│       │                                                         │
│       ▼                                                         │
│  OUTLINE (wiki.zaz.vc)                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Atributos

### 3.1 Plano

| Atributo | Valor | Descrição |
|----------|-------|-----------|
| plano | Pro | $20/mês, permite SBFM com skip |
| dominio | zaz.vc | Domínio principal |
| subdomain | wiki.zaz.vc | Outline wiki |

### 3.2 Super Bot Fight Mode

| Atributo | Valor | Descrição |
|----------|-------|-----------|
| definitely_automated | Managed Challenge | Desafia bots confirmados |
| likely_automated | Allow | Permite bots prováveis |
| verified_bots | Allow | Permite bots verificados |
| static_resource_protection | Off | Não protege assets estáticos |
| javascript_detections | On | Detecção JS ativa |

### 3.3 IP List

| Atributo | Valor |
|----------|-------|
| nome | bypass_cloudflare_for_github_action_list |
| id | 2ba877563c76486785c9cb060e74023a |
| tipo | Dinâmica (atualizada pelo workflow) |

---

## 4. Regras WAF

### 4.1 Regra: Bypass GitHub Actions

| Campo | Valor |
|-------|-------|
| Nome | Bypass GitHub Actions |
| Posição | 1 (topo) |
| Expressão | `(ip.src in $bypass_cloudflare_for_github_action_list)` |
| Action | Skip |
| Skip | All Super Bot Fight Mode Rules |

### 4.2 Ordem de Regras (importante)
```
1. Bypass GitHub Actions     ◄── TOPO (processa primeiro)
2. Bloqueio de scanners conhecidos
3. Liberação Telegram, Safira, WhatsApp
4. Asia, Europa, Africa e Oceania
5. America, Antartica e TOR
```

---

## 5. GitHub Secrets

| Secret | Descrição |
|--------|-----------|
| CF_ACCOUNT_ID | Account ID do Cloudflare |
| CF_ZONE_ID | Zone ID do domínio zaz.vc |
| CF_API_TOKEN | Token com permissões: Account Filter Lists Edit, Zone WAF Edit |

---

## 6. Workflow: Bypass Dinâmico
```yaml
- name: Bypass Cloudflare
  uses: xiaotianxt/bypass-cloudflare-for-github-action@v2.0.1
  with:
    cf_account_id: ${{ secrets.CF_ACCOUNT_ID }}
    cf_zone_id: ${{ secrets.CF_ZONE_ID }}
    cf_api_token: ${{ secrets.CF_API_TOKEN }}

- name: Aguardar propagação Cloudflare
  run: sleep 10
```

### 6.1 Funcionamento
```
1. Workflow inicia
2. Action obtém IP público do runner
3. Adiciona IP à lista bypass_cloudflare_for_github_action_list
4. Aguarda propagação (10s)
5. Executa sync com Outline
6. Cleanup: remove IP da lista (automático)
```

---

## 7. Troubleshooting

### 7.1 Erro: Cloudflare blocking (HTML challenge)

| Verificar | Solução |
|-----------|---------|
| Regra Skip no topo? | Arrastar para posição 1 |
| SBFM ativo? | Security → Bots → Super Bot Fight Mode |
| IP List existe? | Manage Account → Configurations → Lists |
| Secrets corretos? | GitHub → Settings → Secrets |

### 7.2 Erro: 403 Forbidden
```
1. Verificar se workflow executou step "Bypass Cloudflare"
2. Verificar se sleep é suficiente (aumentar para 30s se necessário)
3. Verificar logs do step Bypass no GitHub Actions
```

### 7.3 Rollback: Desabilitar proteção
```
Security → Bots → Super Bot Fight Mode
  → Definitely automated → Allow (temporário)
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_1_GitHub | Irmão (repositório) |
| 00_O_1_2_2_GitHub_Actions | Irmão (workflow) |
| 00_O_1_2_3_Outline | Irmão (destino) |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-01 | Criação; SBFM Pro; WAF bypass; IP List dinâmica |

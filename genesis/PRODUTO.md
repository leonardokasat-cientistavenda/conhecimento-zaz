---
titulo: "Genesis - Visão de Produto"
versao: "0.1.0"
tipo: Produto
status: Planejamento
camada: C1
owner: Leonardo
data_criacao: 2025-12-13
---

# Genesis - Visão de Produto

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **id** | `genesis` |
| **nome** | Genesis |
| **owner** | Leonardo |
| **estágio** | Planejamento |
| **versão atual** | v0.1.0 (não iniciada) |

---

## 2. Dor do Cliente

> "Preciso resolver dores de forma estruturada, mas não tenho sistema para criar e reusar soluções. Cada problema é resolvido do zero, sem absorver aprendizado."

---

## 3. Métricas de Sucesso

| Métrica | Meta |
|---------|------|
| Tempo para primeira resposta | < 5s |
| Taxa de resolução sem construção | > 60% |
| Produtos absorvidos/mês | > 2 |
| NPS usuários internos | > 8 |

---

## 4. Roadmap

| Release | Épico | Objetivo | Status |
|---------|-------|----------|--------|
| v0.1.0 | [Kernel](epicos/kernel.md) | Conversar no MM | Planejado |
| v0.2.0 | [Memória](epicos/memoria.md) | Lembrar usuário | Backlog |
| v0.3.0 | [Consciência](epicos/consciencia.md) | Saber capacidades | Backlog |
| v0.4.0 | [Roteamento](epicos/roteamento.md) | Decidir ação | Backlog |
| v0.5.0 | [Construção](epicos/construcao.md) | Gerar artefatos | Backlog |
| v0.6.0 | [MCP](epicos/mcp.md) | Autonomia LLM | Backlog |
| v1.0.0 | [Auto-recursão](epicos/auto-recursao.md) | Melhorar a si | Backlog |

---

## 5. Stack Técnica

| Componente | Tecnologia |
|------------|------------|
| Interface | Mattermost (self-hosted) |
| Orquestração | Camunda 8 |
| LLM | Anthropic API (Opus 4.5) |
| Persistência | MongoDB Atlas + GitHub |
| Workers | Python |
| CI/CD | Camunda (interno) |

---

## 6. Decisões Arquiteturais

| # | Decisão | Motivo |
|---|---------|--------|
| 1 | MM como interface | Self-hosted, threads nativas, já em uso |
| 2 | Camunda como orquestrador | BPMN visual, DMN, external tasks |
| 3 | Workers reusáveis | Mesmo worker serve MCP e pipelines |
| 4 | MCP via Camunda | Reuso total, observabilidade única |
| 5 | CI/CD via Camunda | Genesis controla próprio deploy |
| 6 | Kernel imutável | Bootstrap resolvido, limites claros |

Detalhes técnicos em [GENESIS_Arquitetura.md](GENESIS_Arquitetura.md)

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| [GENESIS.md](GENESIS.md) | Visão conceitual e propósito |
| [GENESIS_Arquitetura.md](GENESIS_Arquitetura.md) | Arquitetura técnica |
| [MS_Produto](../docs/04_P/MS_Produto.md) | Framework de produto aplicado |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1.0 | 2025-12-13 | Criação, migração de docs/04_P/Genesis |

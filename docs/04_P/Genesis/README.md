---
titulo: "Genesis"
versao: "0.1.0"
tipo: Produto
status: Planejamento
camada: 4
dominio: Produto
data_criacao: 2025-12-13
owner: Leonardo
---

# Produto: Genesis

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

## 3. Visão

Genesis é um sistema autopoiético que:
1. Recebe dores de usuários via conversa
2. Identifica se já tem solução (produto existente)
3. Se não tem, constrói junto com o usuário (M0-M4)
4. Absorve o que construiu como nova capacidade
5. Melhora a si mesmo recursivamente

---

## 4. Métricas de Sucesso

| Métrica | Meta |
|---------|------|
| Tempo para primeira resposta | < 5s |
| Taxa de resolução sem construção | > 60% |
| Produtos absorvidos/mês | > 2 |
| NPS usuários internos | > 8 |

---

## 5. Roadmap

| Release | Épico | Objetivo | Status |
|---------|-------|----------|--------|
| v0.1.0 | Kernel | Conversar no MM | Planejado |
| v0.2.0 | Memória | Lembrar usuário | Backlog |
| v0.3.0 | Consciência | Saber capacidades | Backlog |
| v0.4.0 | Roteamento | Decidir ação | Backlog |
| v0.5.0 | Construção | Gerar artefatos | Backlog |
| v0.6.0 | MCP | Autonomia LLM | Backlog |
| v1.0.0 | Auto-recursão | Melhorar a si | Backlog |

---

## 6. Épicos

| Épico | Descrição | Backlog Items |
|-------|-----------|---------------|
| [Kernel](epicos/kernel.md) | Conversa básica MM + Camunda + LLM | 4 |
| [Memória](epicos/memoria.md) | Persistir usuário e histórico | 3 |
| [Consciência](epicos/consciencia.md) | Indexar capacidades | 3 |
| [Roteamento](epicos/roteamento.md) | Intent + capability match | 3 |
| [Construção](epicos/construcao.md) | Pipeline M0-M4 + CI/CD | 5 |
| [MCP](epicos/mcp.md) | Tools para autonomia LLM | 3 |
| [Auto-recursão](epicos/auto-recursao.md) | Meta-análise e evolução | 2 |

---

## 7. Stack Técnica

| Componente | Tecnologia |
|------------|------------|
| Interface | Mattermost (self-hosted) |
| Orquestração | Camunda 8 |
| LLM | Anthropic API (Opus 4.5) |
| Persistência | MongoDB Atlas + GitHub |
| Workers | Python |
| CI/CD | Camunda (interno) |

---

## 8. Decisões Arquiteturais

Decisões consolidadas de design:

| # | Decisão | Motivo |
|---|---------|--------|
| 1 | MM como interface | Self-hosted, threads nativas, já em uso |
| 2 | Camunda como orquestrador | BPMN visual, DMN, external tasks |
| 3 | Workers reusáveis | Mesmo worker serve MCP e pipelines |
| 4 | MCP via Camunda | Reuso total, observabilidade única |
| 5 | CI/CD via Camunda | Genesis controla próprio deploy |
| 6 | Kernel imutável | Bootstrap resolvido, limites claros |

Detalhes técnicos em [arquitetura.md](arquitetura.md)

---

## 9. Referências

| Documento | Relação |
|-----------|---------|
| [MS_Produto](../MS_Produto.md) | Framework que rege este produto |
| [arquitetura.md](arquitetura.md) | Documentação técnica detalhada |
| [Backlog Genesis](_backlog/) | Itens de trabalho |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1.0 | 2025-12-13 | Criação do Produto, migração de architecture/ |

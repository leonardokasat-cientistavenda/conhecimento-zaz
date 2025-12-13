# Genesis Architecture

## Versão Atual: v0.3.0

**Data:** 2024-12-13

**Status:** Em descoberta

---

## Visão

Sistema autopoiético que resolve dores via produtos existentes ou construção de novos. Genesis se auto-constrói recursivamente, aumentando sua capacidade de resolver problemas através de produtos.

---

## Stack

| Componente | Função |
|------------|--------|
| Mattermost | Interface do usuário |
| Camunda | Orquestração |
| Workers Python | Execução |
| MongoDB | Estado, capacidades, histórico |
| GitHub | Código e versionamento |
| Anthropic API | LLM (Opus 4.5) + web search |

---

## Decisões Vigentes

| ADR | Título | Status |
|-----|--------|--------|
| [001](decisions/001-mm-interface.md) | Mattermost como interface | Aceito |
| [002](decisions/002-camunda-orquestrador.md) | Camunda como orquestrador | Aceito |
| [003](decisions/003-workers-reusaveis.md) | Workers reusáveis | Aceito |
| [004](decisions/004-mcp-via-camunda.md) | MCP como adapter para Camunda | Aceito |
| [005](decisions/005-ci-cd-via-camunda.md) | CI/CD via Camunda | Aceito |
| [006](decisions/006-kernel-imutavel.md) | Kernel imutável | Aceito |

---

## Fase Atual

**Fase 0: Kernel** — Em planejamento

---

## Histórico de Versões

| Versão | Data | Mudanças principais |
|--------|------|---------------------|
| [v0.3.0](versions/v0.3.0.md) | 2024-12-13 | Arquitetura completa com MCP, CI/CD, roadmap 6 fases |

---

## Como usar este documento

1. **Nova sessão?** Leia VERSION.md para contexto atual
2. **Decisão tomada?** Crie um ADR em `decisions/`
3. **Mudança significativa?** Atualize a versão em `versions/`
4. **Pivot?** Marque ADR anterior como "Superseded" e crie novo

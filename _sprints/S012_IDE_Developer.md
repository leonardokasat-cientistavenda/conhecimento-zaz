# Sprint S012: IDE Developer - Cursor

## Metadata

| Campo | Valor |
|-------|-------|
| **Sprint** | S012 |
| **Tipo** | Spike Técnico |
| **Status** | Ativa |
| **Início** | 2025-12-08 |
| **Origem** | bl_ide_developer |

---

## Objetivo

Validar Cursor como IDE de desenvolvimento para GENESIS, eliminando o gargalo de edição via API GitHub.

---

## Tasks

| # | Task | Descrição | Status |
|---|------|-----------|--------|
| T01 | Instalar Cursor | Download e instalação | ✅ |
| T02 | Clonar repositório | conhecimento-zaz local | ⬜ |
| T03 | Configurar Claude | Modelo default nas settings | ⬜ |
| T04 | Testar edição inline | Cmd+K em arquivo .md | ⬜ |
| T05 | Testar Git integrado | Commit + push pela IDE | ⬜ |
| T06 | Testar @codebase | Indexação da estrutura GENESIS | ⬜ |
| T07 | Documentar resultado | Criar guia de uso | ⬜ |

---

## Critérios de Sucesso

| Critério | Métrica | Resultado |
|----------|---------|-----------|
| Edição funciona | Editar linha específica sem reescrever | ⬜ |
| Git funciona | Commit + push sem sair da IDE | ⬜ |
| Contexto funciona | @codebase encontra arquivos | ⬜ |
| Tempo setup | < 30 min | ⬜ |
| Tempo edição | < 2 min por modificação | ⬜ |

---

## Guia Rápido de Setup

### T01-T03: Instalação

```
1. Acessar: cursor.com
2. Download (macOS/Windows/Linux)
3. Instalar (processo padrão)
4. Abrir Cursor
5. Settings (Cmd+,) → Models → Claude como default
6. Fazer login (conta Cursor ou GitHub)
```

### T04: Edição Inline

```
1. Abrir arquivo .md
2. Selecionar texto a editar
3. Cmd+K (ou Ctrl+K)
4. Descrever mudança em linguagem natural
5. Revisar diff proposto
6. Aceitar (Enter) ou rejeitar (Esc)
```

### T05: Git Integrado

```
1. Source Control (Cmd+Shift+G)
2. Stage changes (+)
3. Commit message
4. Commit (✓)
5. Push (...)  → Push
```

### T06: @codebase

```
1. Abrir chat (Cmd+L)
2. Digitar: @codebase como funciona o GENESIS?
3. Cursor indexa repositório e responde com contexto
```

---

## Notas

- Cursor Pro: $20/mês (necessário para Claude)
- É fork do VS Code - extensões compatíveis
- Composer mode: edita múltiplos arquivos coordenadamente

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-08 | Sprint criada, promovida do backlog |

# Sprint S012: IDE Developer - Cursor

## Metadata

| Campo | Valor |
|-------|-------|
| **Sprint** | S012 |
| **Tipo** | Spike Técnico |
| **Status** | ✅ Concluída |
| **Início** | 2025-12-08 |
| **Fim** | 2025-12-08 |
| **Origem** | bl_ide_developer |

---

## Objetivo

Validar Cursor como IDE de desenvolvimento para GENESIS, eliminando o gargalo de edição via API GitHub.

**Resultado: VALIDADO ✅**

---

## Tasks

| # | Task | Descrição | Status |
|---|------|-----------|--------|
| T01 | Instalar Cursor | Download e instalação | ✅ |
| T02 | Clonar repositório | conhecimento-zaz local | ✅ |
| T03 | Configurar Claude | Modelo default (Opus 4.5) | ✅ |
| T04 | Testar edição inline | Cmd+K em arquivo .md | ✅ |
| T05 | Testar Git integrado | Commit + push pela IDE | ✅ |
| T06 | Testar @codebase | Indexação da estrutura GENESIS | ✅ |
| T07 | Documentar resultado | Este documento | ✅ |

---

## Critérios de Sucesso

| Critério | Métrica | Resultado |
|----------|---------|-----------|
| Edição funciona | Editar linha específica sem reescrever | ✅ |
| Git funciona | Commit + push sem sair da IDE | ✅ |
| Contexto funciona | @codebase encontra arquivos | ✅ |
| Tempo setup | < 30 min | ✅ (~15 min) |
| Tempo edição | < 2 min por modificação | ✅ (~30 seg) |

---

## Guia Rápido de Setup

### Instalação

```
1. Acessar: cursor.com
2. Download (macOS/Windows/Linux)
3. Instalar (processo padrão)
4. Abrir Cursor
5. Settings → Models → Claude (Opus 4.5 recomendado)
6. Fazer login + Cursor Pro ($20/mês)
```

### Clonar Repositório

```bash
git clone https://github.com/leonardokasat-cientistavenda/conhecimento-zaz.git
```

Depois: File → Open Folder → selecionar pasta

### Configurar Git (primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Edição Inline (Cmd+K)

```
1. Abrir arquivo .md
2. Selecionar texto a editar
3. Cmd+K (ou Ctrl+K)
4. Descrever mudança em linguagem natural
5. Revisar diff (vermelho=remove, verde=adiciona)
6. Aceitar (Keep/Cmd+Y) ou rejeitar (Undo/Cmd+N)
7. Cmd+S para salvar
```

### Git: Commit + Push

```
1. Cmd+Shift+G (Source Control)
2. Digitar mensagem de commit
3. Clicar Commit
4. Clicar Sync Changes (push)
```

### @codebase (Contexto do Projeto)

```
1. Cmd+L (abrir chat)
2. Digitar: @codebase [sua pergunta sobre o projeto]
3. Cursor responde com contexto indexado
```

---

## Conclusão

**Cursor validado como IDE para desenvolvimento GENESIS.**

Benefícios confirmados:
- Edição cirúrgica (só linhas específicas, não arquivo inteiro)
- Git integrado (sem sair da IDE)
- Contexto do projeto via @codebase
- Tempo de edição ~30 seg vs ~2 min no fluxo anterior
- Zero erros de SHA/merge

**Recomendação:** Usar Cursor para todas as edições de arquivos do sistema.

---

## Histórico

| Data | Evento |
|------|--------|
| 2025-12-08 | Sprint criada, promovida do backlog |
| 2025-12-08 | Sprint concluída - Cursor validado |

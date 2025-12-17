# Sprint (DEPRECADO)

---

```yaml
nome: Sprint
versao: "1.1-deprecated"
status: Deprecado
camada: 2
data_deprecacao: "2025-12-17"
substituido_por: docs/04_S/MS_Sprint.md
```

---

> ⚠️ **ESTE DOCUMENTO FOI DEPRECADO**
>
> **Novo documento:** [docs/04_S/MS_Sprint.md](../../docs/04_S/MS_Sprint.md)
>
> **Motivo:** Migração para Meta Sistema com:
> - Persistência em MongoDB (collection: `sprint_sessions`)
> - Controle de variação de escopo
> - Guia do usuário com 17 comandos
> - Integração com MS_Backlog
>
> **Arquivo original:** [_deprecated/00_I_2_2_Sprint.md](../../_deprecated/00_I_2_2_Sprint.md)

---

## Migração

| Antes (Legado) | Depois (MS_Sprint) |
|----------------|--------------------|
| Sprint.iniciar() | MS_Sprint.iniciar() |
| Sprint.arquivar() | MS_Sprint.concluir() |
| Sprint.publicar() | MS_Sprint.task-concluir() |
| Workspace: _drafts/ | Persistência: MongoDB |
| WIP limit = 1 | WIP limit = 1 (mantido) |

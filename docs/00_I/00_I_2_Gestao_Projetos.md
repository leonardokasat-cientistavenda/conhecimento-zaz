# Gestão de Projetos (DEPRECADO)

---

```yaml
nome: Gestao_Projetos
versao: "1.0-deprecated"
status: Deprecado
camada: 2
data_deprecacao: "2025-12-17"
substituido_por:
  - docs/04_B/MS_Backlog.md
  - docs/04_S/MS_Sprint.md
```

---

> ⚠️ **ESTE DOCUMENTO FOI DEPRECADO**
>
> **Novos documentos:**
> - [docs/04_B/MS_Backlog.md](../../docs/04_B/MS_Backlog.md) - Gestão de fila (Message Broker)
> - [docs/04_S/MS_Sprint.md](../../docs/04_S/MS_Sprint.md) - Gestão de execução
>
> **Motivo:** Separação de responsabilidades em Meta Sistemas distintos:
> - MS_Backlog = Prateleira infinita (captura, organização, roteamento)
> - MS_Sprint = Carrinho finito (execução, pausabilidade, rastreabilidade)
>
> **Arquivo original:** [_deprecated/00_I_2_Gestao_Projetos.md](../../_deprecated/00_I_2_Gestao_Projetos.md)

---

## Migração

| Antes (Legado) | Depois |
|----------------|--------|
| Gestao_Projetos.listar_backlog() | MS_Backlog.metricas_fila() |
| Gestao_Projetos.listar_sprints() | MS_Sprint.carregar_sessao() |
| Gestao_Projetos.promover() | MS_Sprint.iniciar() |
| Backlog + Sprint acoplados | MS_Backlog + MS_Sprint desacoplados |

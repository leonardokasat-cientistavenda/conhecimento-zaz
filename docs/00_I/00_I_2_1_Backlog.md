# Backlog - DEPRECATED

---

```yaml
nome: Backlog
versao: "DEPRECATED"
tipo: Documento
status: Deprecated
camada: 2
data_publicacao: "2025-12-16"
migrado_para: docs/04_B/MS_Backlog.md
```

---

## ⚠️ DOCUMENTO DEPRECADO

Este documento foi **migrado** para:

### → [docs/04_B/MS_Backlog.md](../04_B/MS_Backlog.md)

---

## Motivo da Migração

Em **S017 (2025-12-16)**, o Backlog foi promovido de **Infraestrutura (C2)** para **Meta Sistema (C4)** como **MS_Backlog**.

### Mudanças:

| Aspecto | Antes (C2) | Depois (C4) |
|---------|-----------|-------------|
| **Papel** | Lista de trabalho | Message Broker entre MS |
| **Comunicação** | Passiva | Ativa (polling/routing) |
| **Tipagem** | Genérica | Event-Driven (saga_id, tipos) |
| **Rastreabilidade** | Parcial | Total (Event Sourcing) |

---

## Referências

| Novo Documento | Descrição |
|----------------|-----------|
| [docs/04_B/MS_Backlog.md](../04_B/MS_Backlog.md) | Definição do MS_Backlog |
| [docs/04_B/MS_Backlog_Arquitetura.md](../04_B/MS_Backlog_Arquitetura.md) | Arquitetura técnica |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.x | até 2025-12-16 | Versões anteriores |
| DEPRECATED | 2025-12-16 | Migrado para MS_Backlog (C4) |

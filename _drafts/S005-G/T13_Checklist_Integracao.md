---
nome: T13_Checklist_Integracao
versao: "0.1"
tipo: Checklist
origem: interno
status: Pendente
sprint_ref: S005-G
task_ref: T13
---

# T13: Checklist de Integração Pós-Catálogo

## Objetivo

Após publicar Módulo Catálogo em `docs/00_E/00_E_2_1_Modulo_Catalogo.md`, verificar integridade e refatorar dependentes.

---

## Pré-requisitos

- [ ] Módulo Catálogo publicado (M4 completo)
- [ ] Interface definida: `indexar()`, `buscar()`, `match()`

---

## 1. Verificar GENESIS

| Item | Arquivo | Verificação | Status |
|------|---------|-------------|--------|
| 1.1 | `genesis/GENESIS.md` | Método `carregar_contexto()` usa Catálogo? | ⬜ |
| 1.2 | `genesis/GENESIS.md` | Seção "Índice de Meta Sistemas" compatível? | ⬜ |
| 1.3 | `genesis/GENESIS.md` | Referência ao Catálogo adicionada? | ⬜ |

**Ações se necessário:**
- Atualizar `carregar_contexto()` para usar `Catalogo.match()`
- Adicionar dependência: `depende_de: [Catalogo]`

---

## 2. Verificar Epistemologia

| Item | Arquivo | Verificação | Status |
|------|---------|-------------|--------|
| 2.1 | `docs/00_E/00_E_Epistemologia.md` | Catálogo listado como módulo filho? | ⬜ |
| 2.2 | `docs/00_E/00_E_Epistemologia.md` | Hierarquia de módulos atualizada? | ⬜ |

**Ações se necessário:**
- Adicionar Catálogo à seção de módulos
- Indicar que Catálogo é infraestrutura (outros dependem dele)

---

## 3. Refatorar Módulo Raciocínio

| Item | Arquivo | Verificação | Status |
|------|---------|-------------|--------|
| 3.1 | `_drafts/S005-G/T11_Modulo_Raciocinio.md` | Adicionar dependência de Catálogo | ⬜ |
| 3.2 | `_drafts/S005-G/T11_Modulo_Raciocinio.md` | Método `buscar_decisao_similar()` usa Catálogo | ⬜ |
| 3.3 | `_drafts/S005-G/T11_Modulo_Raciocinio.md` | Persistência indexa decisão no Catálogo | ⬜ |

**Ações:**
```
Antes:
  ciclo_raciocinio(problema)
  └── executa H→E→I→D
  └── persistir(decisao)

Depois:
  ciclo_raciocinio(problema)
  └── Catalogo.match(problema, contexto) → decisão existente?
      └── SE sim: retorna decisão
      └── SE não: executa H→E→I→D
  └── persistir(decisao)
  └── Catalogo.indexar(decisao, chave_semantica)
```

---

## 4. Publicar Raciocínio

| Item | Ação | Status |
|------|------|--------|
| 4.1 | Mover `_drafts/S005-G/T11_Modulo_Raciocinio.md` para `docs/00_E/00_E_2_2_Modulo_Raciocinio.md` | ⬜ |
| 4.2 | Atualizar versão para 1.0 | ⬜ |
| 4.3 | Atualizar índice da Epistemologia | ⬜ |

---

## 5. Validação Final

| Item | Verificação | Status |
|------|-------------|--------|
| 5.1 | GENESIS roteia usando Catálogo | ⬜ |
| 5.2 | Raciocínio busca decisões usando Catálogo | ⬜ |
| 5.3 | Epistemologia lista ambos módulos | ⬜ |
| 5.4 | Sem referências quebradas | ⬜ |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | Checklist inicial |

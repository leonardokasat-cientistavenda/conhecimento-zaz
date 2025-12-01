# 00_O_1_2_Pipeline_Documentacao
**Versão:** 1.1  
**Tipo:** Framework  
**Classe_ref:** Framework  
**Origem:** interno  
**Status:** Draft

---

## 1. Definição

Pipeline de Documentação é o framework que orquestra o ciclo completo: do repositório Git até a publicação no Outline.

Opera após M5 (Documentar) do Método Epistemológico.

---

## 2. Classes

| Classe | Responsabilidade | Status |
|--------|------------------|--------|
| GitHub | Estrutura de pastas, convenções, versionamento | 00_O_1_2_1_GitHub |
| GitHub_Actions | Validação automática, sync | Pendente |
| Outline | Publicação, collections, hierarquia | 00_O_1_2_3_Outline |

---

## 3. Diagrama

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                      PIPELINE DE DOCUMENTAÇÃO                               │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  REPOSITÓRIO (GitHub)                                               │   │
│   │      _drafts/ → trabalho em progresso (M1-M4)                       │   │
│   │      docs/    → publicado (pós-M5)                                  │   │
│   │      Detalhe: ver 00_O_1_2_1_GitHub                                 │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             │ git push (só docs/)                           │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  VERSÃO (Git)                                                       │   │
│   │      Commit por etapa (M1, M2, M3, M4, M5)                          │   │
│   │      Histórico imutável                                             │   │
│   │      Critério de parada: sistema estável                            │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             │ trigger: push to docs/                        │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  VALIDAÇÃO (GitHub Actions)                                         │   │
│   │      Verifica frontmatter                                           │   │
│   │      Valida links internos                                          │   │
│   │      Verifica encoding UTF-8                                        │   │
│   │      Ignora _drafts/                                                │   │
│   │                                                                     │   │
│   └─────────────────────────┬───────────────────────────────────────────┘   │
│                             │                                               │
│                             │ se válido                                     │
│                             ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  PUBLICAÇÃO (Outline)                                               │   │
│   │      Resolve links Git → Outline                                    │   │
│   │      Sync para collection apropriada                                │   │
│   │      Atualiza frontmatter com outline_id                            │   │
│   │      Detalhe: ver 00_O_1_2_3_Outline                                │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Mapeamento Git → Outline

| Pasta Git | Collection Outline |
|-----------|-------------------|
| docs/00_E/ | Epistemologia |
| docs/00_O/ | Ontologia |
| docs/01/ | Domínios |

### Regra de Hierarquia

Pai = prefixo mais curto que contém o atual.

```
Collection: Ontologia
└── 00_O_Ontologia (root)
    ├── 00_O_1_1_Metodo_Epistemologico
    │   └── 00_O_1_1_1_Definir_Objeto
    └── 00_O_1_2_Pipeline_Documentacao
        ├── 00_O_1_2_1_GitHub
        ├── 00_O_1_2_2_GitHub_Actions
        └── 00_O_1_2_3_Outline
```

---

## 5. Escopo do Sync

| Pasta | Sincroniza? | Razão |
|-------|-------------|-------|
| docs/ | ✅ Sim | Documentos publicados |
| _drafts/ | ❌ Não | Trabalho em progresso |
| _edits/ | ❌ Não | Instruções internas |

---

## 6. Regras de Validação

| Regra | Descrição |
|-------|-----------|
| Frontmatter | YAML válido com campos obrigatórios |
| Links | Referências internas existem |
| Diagrama | Seção obrigatória presente |
| Histórico | Tabela de versões presente |
| Encoding | UTF-8 |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_1_GitHub | Filho (estrutura) |
| 00_O_1_2_2_GitHub_Actions | Filho (validação) |
| 00_O_1_2_3_Outline | Filho (publicação) |
| 00_O_1_1_Metodo_Epistemologico | Pipeline opera após M5 |
| 00_E_1_4_Documento | Define estrutura validada |
| 00_E_1_3_Framework | Pipeline é instância |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-11-30 | Criação; 4 classes; 4 métodos |
| 1.1 | 2025-12-01 | Escopo sync (só docs/); Mapeamento Git→Outline; Referências filhos |

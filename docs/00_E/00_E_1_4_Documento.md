---
nome: 00_E_1_4_Documento
versao: "1.4"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
outline_id: 
outline_url: 
---

# 00_E_1_4_Documento

## 1. Definição

Documento é a classe que define como armazenar conhecimento em arquivos.

Todo conhecimento gerado pelo Método Científico é persistido como instância de Documento.

---

## 2. Frontmatter (Schema YAML)

### 2.1 Schema Obrigatório

```yaml
---
nome: string           # Identificador único (ex: 00_O_1_1_Metodo)
versao: string         # SemVer (ex: "1.3")
tipo: enum             # Classe | Framework | Catalogo | Introducao | Metodo
classe_ref: string     # Classe epistemológica de referência
origem: enum           # interno | externo
status: enum           # Draft | Revisao | Publicado
---
```

### 2.2 Schema Opcional (Sync)

```yaml
---
outline_id: string     # UUID do documento no Outline
outline_url: string    # URL do documento no Outline
---
```

### 2.3 Schema Opcional (Pipeline)

```yaml
---
etapa: enum            # M1 | M2 | M3 | M4 | M5 (para _drafts/)
---
```

---

## 3. Estrutura Padrão

| Seção | Obrigatório | Conteúdo |
|-------|-------------|----------|
| Frontmatter | Sim | Metadados YAML |
| Definição | Sim | O que é |
| Diagrama | Sim | ASCII estrutura/fluxo |
| Atributos | Se Classe | Schema |
| Relacionamentos | Se Classe | Conexões |
| Métodos | Se Framework | Sequência |
| Referências | Sim | Links relacionados |
| Histórico | Sim | Registro versões |

---

## 4. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                        DOCUMENTO                                │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                     Frontmatter                         │   │
│   │   nome | versao | tipo | status | origem                │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                      Conteúdo                           │   │
│   │   Definição | Diagrama | Atributos | Referências        │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                      Histórico                          │   │
│   │   Versão | Data | Alteração                             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Tipos de Documento

| Tipo | Descrição | Template |
|------|-----------|----------|
| Classe | Define estrutura | Atributos + Relacionamentos |
| Framework | Orquestra métodos | Sequência + Métodos |
| Catalogo | Lista instâncias | Tabela de objetos |
| Introducao | Visão geral | Estrutura + Componentes |
| Metodo | Define processo | Input/Output + Submétodos |

---

## 6. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_1_Classe | Irmão |
| 00_E_1_2_Metodo | Irmão |
| 00_E_1_3_Framework | Irmão |
| 00_O_1_2_Pipeline_Documentacao | Define ciclo de vida |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação |
| 1.1 | 2024-11-27 | Regras de Formatação |
| 1.2 | 2024-11-27 | Seção Diagrama |
| 1.3 | 2025-12-01 | Migração para Frontmatter YAML |
| 1.4 | 2025-12-01 | Ajuste estrutura; campo etapa |

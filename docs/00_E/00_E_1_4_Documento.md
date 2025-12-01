---
nome: 00_E_1_4_Documento
versao: "1.3"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# 00_E_1_4_Documento
**Versão:** 1.3  
**Tipo:** Classe Epistemológica  
**Status:** Draft

---

## 1. Definição

Documento é a classe que define como armazenar conhecimento em arquivos.

Todo conhecimento gerado pelo Método Científico é persistido como instância de Documento.

---

## 2. Frontmatter (Schema YAML)

A partir de v1.3, documentos usam frontmatter YAML para metadados.

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
outline_id: string     # UUID do documento no Outline (preenchido no sync)
outline_url: string    # URL do documento no Outline (preenchido no sync)
---
```

### 2.3 Schema Opcional (Pipeline)

```yaml
---
etapa: enum            # M1 | M2 | M3 | M4 | M5 (para rascunhos em _drafts/)
---
```

### 2.4 Exemplo Completo

```yaml
---
nome: 00_O_1_2_3_Outline
versao: "1.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Draft
etapa: M3
outline_id: 
outline_url: 
---
```

---

## 3. Atributos (Legado)

Para compatibilidade, atributos também podem aparecer em cabeçalho markdown:

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|
| nome | string | Sim | Identificador único |
| versão | string | Sim | SemVer (vX.Y) |
| tipo | enum | Sim | Classe, Catalogo, Framework, Introducao |
| status | enum | Sim | Draft, Revisao, Publicado |
| depende_de | Documento[] | Não | Referências pai |
| usado_por | Documento[] | Não | Referências filho |

---

## 4. Estrutura Padrão

| Seção | Obrigatório | Conteúdo |
|-------|-------------|----------|
| Frontmatter | Sim | Metadados YAML |
| Definição | Sim | O que é |
| Diagrama | Sim | ASCII que sintetiza estrutura ou fluxo |
| Atributos | Se Classe | Schema |
| Relacionamentos | Se Classe | Conexões |
| Métodos | Se Framework | Sequência |
| Referências | Sim | Links para documentos relacionados |
| Histórico | Sim | Registro de versões |

---

## 5. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                        DOCUMENTO                                │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                     Frontmatter                         │   │
│   │                                                         │   │
│   │   nome: string                                          │   │
│   │   versao: string                                        │   │
│   │   tipo: enum                                            │   │
│   │   status: enum                                          │   │
│   │   etapa: enum (opcional)                                │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                     Conteúdo                            │   │
│   │                                                         │   │
│   │   Definição                                             │   │
│   │   Atributos (se Classe)                                 │   │
│   │   Métodos (se Framework)                                │   │
│   │   Objetos (se Catálogo)                                 │   │
│   │   Estrutura (se Introdução)                             │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    Referências                          │   │
│   │                                                         │   │
│   │   depende_de[]: Documento[]                             │   │
│   │   usado_por[]: Documento[]                              │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                     Histórico                           │   │
│   │                                                         │   │
│   │   versões[]: {versão, data, alteração}                  │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Templates

### 6.1 Template Classe

```markdown
---
nome: [ID]_[Nome]
versao: "X.Y"
tipo: Classe
classe_ref: Classe
origem: interno
status: Draft
---

# [ID]_[Nome]

## 1. Definição

[O que é esta classe]

---

## 2. Atributos

| Atributo | Tipo | Obrigatório | Descrição |
|----------|------|-------------|-----------|

---

## 3. Relacionamentos

| Relação | Tipo | Descrição |
|---------|------|-----------|

---

## 4. Referências

| Documento | Relação |
|-----------|---------|

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
```

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia | Pai |
| 00_E_1_1_Classe | Documento é instância de Classe |
| 00_E_1_2_Metodo | Documentar é instância de Método |
| 00_O_1_2_Pipeline_Documentacao | Define ciclo de vida |
| Todos os outros | Usam Documento como template |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2024-11-27 | Criação; Templates Classe, Framework, Catálogo, Introdução |
| 1.1 | 2024-11-27 | Adicionado seção Regras de Formatação |
| 1.2 | 2024-11-27 | Adicionado seção 4. Diagrama |
| 1.3 | 2025-12-01 | Migração para Frontmatter YAML; Campo etapa; Templates atualizados |

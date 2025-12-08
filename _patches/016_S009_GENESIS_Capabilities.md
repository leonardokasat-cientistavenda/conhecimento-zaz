# Patch 016: Método listar_capabilities no GENESIS

**Sprint:** S009
**Task:** T05
**Arquivo alvo:** `genesis/GENESIS.md`

---

## Patch 1: Adicionar método na seção 4.4

**Localizar:**
```markdown
### 4.4 Métodos: Tabela Resumo

| Método | Entrada | Saída | Responsabilidade |
|--------|---------|-------|------------------|
| `entender()` | input_usuario | {tipo, contexto} | Classificar CONHECER vs DECIDIR vs GERENCIAR |
| `buscar()` | tipo, contexto | {existe, item?, score?} | Consultar Catálogo |
| `rotear()` | resultado_busca | execução | Reutilizar existente ou criar novo |
```

**Substituir por:**
```markdown
### 4.4 Métodos: Tabela Resumo

| Método | Entrada | Saída | Responsabilidade |
|--------|---------|-------|------------------|
| `entender()` | input_usuario | {tipo, contexto} | Classificar CONHECER vs DECIDIR vs GERENCIAR |
| `buscar()` | tipo, contexto | {existe, item?, score?} | Consultar Catálogo |
| `rotear()` | resultado_busca | execução | Reutilizar existente ou criar novo |
| `listar_capabilities()` | - | [Capability] | Explicar o que GENESIS sabe fazer |
```

---

## Patch 2: Adicionar seção 4.6 com detalhamento do método

**Localizar:**
```markdown
### 4.5 Como Buscar no Catálogo (Implementação)
```

**Inserir ANTES:**
```markdown
### 4.6 Método: listar_capabilities()

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        listar_capabilities()                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Input: -                                                                   │
│  Output: Lista formatada de capabilities                                    │
│                                                                             │
│  Trigger: "O que você sabe fazer?", "Me ajuda com o quê?", "Capabilities"   │
│                                                                             │
│  Implementação:                                                             │
│  1. Ler _catalogo/indice.yaml                                               │
│  2. Filtrar itens que têm atributo `capability`                             │
│  3. Formatar resposta amigável                                              │
│                                                                             │
│  Exemplo de resposta:                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Posso ajudar você a:                                               │    │
│  │                                                                     │    │
│  │  • CONHECER - Criar e buscar conhecimento estruturado               │    │
│  │    Ex: "Como estruturar um processo de vendas?"                     │    │
│  │                                                                     │    │
│  │  • DECIDIR - Tomar decisões de forma estruturada                    │    │
│  │    Ex: "Devo contratar mais ou investir em marketing?"              │    │
│  │                                                                     │    │
│  │  • GERENCIAR - Organizar trabalho em backlog e sprints              │    │
│  │    Ex: "O que temos no backlog?"                                    │    │
│  │                                                                     │    │
│  │  Quer saber mais sobre alguma dessas?                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

```

---

## Patch 3: Atualizar Glossário

**Localizar:**
```markdown
| **Módulo Autonomia** | Módulo opcional que controla nível de autonomia do loop |

### 1.2 Diagrama do Problema
```

**Substituir por:**
```markdown
| **Módulo Autonomia** | Módulo opcional que controla nível de autonomia do loop |
| **Capability** | Algo que GENESIS sabe fazer (CONHECER, DECIDIR, GERENCIAR) |
| **Discovery** | Usuário descobre capabilities perguntando "o que você sabe fazer?" |

### 1.2 Diagrama do Problema
```

---

## Patch 4: Atualizar versão e histórico

**Localizar:**
```markdown
| 1.5 | 2025-12-08 | **GERENCIAR adicionado:** terceiro tipo de roteamento para Gestão de Projetos. Referências: Gestão de Projetos, Backlog, Sprint. Sprint S007. |
```

**Substituir por:**
```markdown
| 1.5 | 2025-12-08 | **GERENCIAR adicionado:** terceiro tipo de roteamento para Gestão de Projetos. Referências: Gestão de Projetos, Backlog, Sprint. Sprint S007. |
| 1.6 | 2025-12-08 | **Capability Discovery:** método listar_capabilities() para GENESIS explicar o que sabe fazer. Glossário: Capability, Discovery. Sprint S009. |
```

**Localizar no frontmatter:**
```yaml
versao: "1.5"
```

**Substituir por:**
```yaml
versao: "1.6"
```

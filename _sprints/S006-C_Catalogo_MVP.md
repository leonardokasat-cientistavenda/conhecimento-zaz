# Sprint S006-C: Catálogo MVP

## CONTEXTO

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Arquivo raiz: /genesis/GENESIS.md
Branch: main

IMPORTANTE: Todos os arquivos estão no GitHub, NÃO no Google Drive.
Usar ferramenta github:get_file_contents para leitura.

GitHub: owner=leonardokasat-cientistavenda, repo=conhecimento-zaz, branch=main

---

## SPRINT ATUAL: S006-C

**Objetivo:** Implementar Catálogo MVP - índice persistido com busca funcional

**Prioridade:** 🔴 BLOQUEADOR CRÍTICO

**Por quê:** Catálogo é infraestrutura que desbloqueia:
- GENESIS fazendo busca real (não "mental")
- Raciocínio persistindo decisões
- Meta Sistemas de domínio sendo criados

**Escopo:** Fase 1 (Índice Persistido) do documento Evolucao_Catalogo.md

**Marco:** Última sprint com autonomia expandida no GitHub

---

## PROBLEMA (M0)

### M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **Catálogo** | Repositório com busca para armazenar e recuperar itens |
| **buscar()** | Método que retorna itens relevantes para uma query |
| **indice.yaml** | Arquivo persistido com chaves semânticas dos itens |
| **MVP** | Minimum Viable Product - implementação mínima funcional |
| **Chave Semântica** | Descrição textual que permite busca por significado |

### M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| GENESIS não consegue buscar Meta Sistemas | Catálogo especificado mas não implementado | Implementar buscar() funcional |
| LLM navega múltiplos diretórios | Sem índice centralizado | Arquivo único de consulta |
| Raciocínio não persiste decisões | Sem repositório para indexar | Catálogo como infraestrutura |

### M0.3 Origem

- **Backlog:** `_backlog/BACKLOG.md` - Item #1
- **Detalhes técnicos:** `_backlog/Evolucao_Catalogo.md`
- **Especificação:** `docs/00_E/00_E_2_1_Modulo_Catalogo.md`

---

## TASKS

| # | Task | Descrição | Entregável | Status |
|---|------|-----------|------------|--------|
| T01 | Criar estrutura | Diretório `_catalogo/` | Pasta criada | ⬜ |
| T02 | Criar índice | `indice.yaml` com itens existentes | Arquivo com Meta Sistemas indexados | ⬜ |
| T03 | Atualizar GENESIS | Seção de como ler índice | GENESIS v1.4 com instrução de busca | ⬜ |
| T04 | Testar fluxo | Simular busca → rotear | Validação funcional | ⬜ |
| T05 | Documentar | Atualizar Catálogo v1.0 → v1.1 | Módulo com implementação documentada | ⬜ |
| T06 | Remover do Backlog | Limpar item do BACKLOG.md | Backlog atualizado | ⬜ |

---

## DETALHAMENTO DAS TASKS

### T01: Criar Estrutura

```
_catalogo/
├── indice.yaml          # Índice principal
└── README.md            # Instruções de uso
```

### T02: Criar Índice

**Formato:**

```yaml
# _catalogo/indice.yaml
versao: "1.0"
atualizado: "2025-12-07"

items:
  # Meta Sistemas
  - id: "ms_epistemologia"
    tipo: MetaSistema
    nome: "Epistemologia"
    chave: "criar meta sistemas estruturados anti-entrópicos M0-M4 conhecimento"
    arquivo: "docs/00_E/00_E_Epistemologia.md"
    triggers:
      - "como estruturar conhecimento"
      - "criar meta sistema"
      - "aplicar M0-M4"
    metadata:
      versao: "3.4"
      camada: C3
      
  - id: "ms_raciocinio"
    tipo: MetaSistema
    nome: "Raciocínio"
    chave: "tomar decisões estruturadas hipótese evidência inferência"
    arquivo: "docs/00_E/00_E_2_2_Modulo_Raciocinio.md"
    triggers:
      - "como decidir"
      - "tomar decisão"
      - "avaliar opções"
    metadata:
      versao: "1.0"
      camada: C3
      
  - id: "ms_catalogo"
    tipo: MetaSistema
    nome: "Catálogo"
    chave: "buscar indexar armazenar recuperar itens memória"
    arquivo: "docs/00_E/00_E_2_1_Modulo_Catalogo.md"
    triggers:
      - "buscar conhecimento"
      - "encontrar meta sistema"
      - "indexar item"
    metadata:
      versao: "1.0"
      camada: C3
```

**Itens a indexar:**
- Epistemologia (docs/00_E/00_E_Epistemologia.md)
- Raciocínio (docs/00_E/00_E_2_2_Modulo_Raciocinio.md)
- Catálogo (docs/00_E/00_E_2_1_Modulo_Catalogo.md)
- GitHub (docs/00_I_1_1_GitHub.md)
- Protocolo LLM (docs/00_I_1_2_Protocolo_LLM.md)

### T03: Atualizar GENESIS

Adicionar em GENESIS.md seção sobre como usar o índice:

```markdown
## Como Buscar no Catálogo

1. Ler `_catalogo/indice.yaml`
2. Comparar input do usuário com `chave` e `triggers` de cada item
3. Selecionar item com maior relevância
4. Carregar arquivo do item selecionado
```

### T04: Testar Fluxo

**Cenário de teste:**

```
Input: "como estruturar conhecimento novo"
Esperado: Retorna Epistemologia (match em chave + trigger)

Input: "preciso tomar uma decisão importante"
Esperado: Retorna Raciocínio (match em trigger)

Input: "onde encontro informações sobre X"
Esperado: Busca no índice, se não achar → criar novo
```

### T05: Documentar

Atualizar `docs/00_E/00_E_2_1_Modulo_Catalogo.md`:
- Seção de implementação atual (índice YAML)
- Referência ao `_catalogo/indice.yaml`
- Versão 1.0 → 1.1

### T06: Remover do Backlog

Editar `_backlog/BACKLOG.md`:
- Remover seção "1. Catálogo MVP"
- Atualizar índice de itens
- Commit: `[C0] promote: Catálogo MVP concluído`

---

## DECISÕES TOMADAS

| Decisão | Opção Escolhida | Razão |
|---------|-----------------|-------|
| Escopo | Fase 1 apenas | MVP primeiro, evoluir depois |
| Formato | YAML | Legível, fácil de editar |
| Busca | Manual pelo LLM | Sem dependências externas |
| Persistência | Arquivo estático | Simplicidade |

---

## CRITÉRIOS DE CONCLUSÃO

| Critério | Verificação |
|----------|-------------|
| Índice existe | `_catalogo/indice.yaml` criado |
| Itens indexados | Pelo menos 5 Meta Sistemas no índice |
| GENESIS atualizado | Instrução de busca documentada |
| Teste passou | Fluxo buscar→rotear funcional |
| Backlog limpo | Item removido do BACKLOG.md |

---

## REGRAS DE OPERAÇÃO

### Regra de Carregamento
Antes de qualquer resposta:
1. Ler github:get_file_contents(path="genesis/GENESIS.md")
2. Ler github:get_file_contents(path="_sprints/S006-C_Catalogo_MVP.md")
3. Identificar task atual

### Regra de Criação de Arquivos
Antes de criar/editar, ler:
- /docs/00_I_1_1_GitHub.md (regras GitHub + token efficiency)
- /docs/00_E/00_E_1_6_Documento.md (estrutura pastas + ciclo M0-M4)

Resumo:
1. Criar arquivos DIRETO no GitHub (sem preview no chat)
2. Informar apenas: "Arquivo criado: [path] - [resumo]"
3. Usuário valida pelo link do GitHub

### Convenção de Commit
Padrão: [CAMADA] ação: descrição - Sprint/Task

Exemplos:
- `[C3] add: índice catálogo - S006-C/T02`
- `[C1] update: GENESIS busca catálogo - S006-C/T03`

---

## REFERÊNCIAS

| Arquivo | Conteúdo |
|---------|----------|
| /genesis/GENESIS.md | Orquestrador v1.3 |
| /docs/00_E/00_E_2_1_Modulo_Catalogo.md | Especificação Catálogo v1.0 |
| /_backlog/Evolucao_Catalogo.md | Fases de evolução |
| /_backlog/BACKLOG.md | Backlog geral |
| /docs/00_I_1_1_GitHub.md | Instruções GitHub v2.1 |

---

## SEQUÊNCIA DE SPRINTS

```
S005-G (concluída) → S006-C (atual) → S007-? (restaurar autonomia Git)
        ✅                🔄               Backlog
```

---

## NOTA: AUTONOMIA TEMPORÁRIA

Esta é a **última sprint** com autonomia expandida no GitHub.

Após S006-C:
- ✅ Restaurar branch obrigatório
- ✅ Restaurar PR antes de merge
- ✅ Documentar processo em GitHub.md

Ver: `docs/00_I_1_1_GitHub.md` - Seção 6

---

## HISTÓRICO

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-07 | Criação da sprint. Promovido do BACKLOG.md. |

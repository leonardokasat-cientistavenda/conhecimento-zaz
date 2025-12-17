# GENESIS Bootstrap v6.0

---

```yaml
nome: GENESIS_Bootstrap
versao: "6.0"
tipo: Especificação
status: Publicado
sprint: S024
task: T03
data_publicacao: "2025-12-17"
```

---

## 1. Propósito

Este documento especifica o **novo bootstrap de GENESIS** via `db.capacidades`, substituindo o conhecimento hardcoded de sistemas por discovery dinâmico.

---

## 2. Princípio Anti-Entrópico

```
ANTES (entrópico):                    DEPOIS (anti-entrópico):
─────────────────                     ─────────────────────────

GENESIS.md contém:                    db.capacidades contém:
  - Seção 10: Bootstrap Sprint        - Todos MS e capacidades
  - (amanhã) Seção 11: Produto?       - Uma query retorna tudo
  - (depois) Seção 12: CRM?           - GENESIS só roteia
  → Explode com cada MS               → O(1) para qualquer MS
```

---

## 3. Fluxo de Bootstrap

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GENESIS BOOTSTRAP v6.0                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AO INICIAR CONVERSA:                                                       │
│  ════════════════════                                                       │
│                                                                             │
│  1. Carregar capacidades:                                                   │
│     capacidades = db.capacidades.find({tipo: "meta_sistema"})               │
│                                     .sort({ordem: 1})                       │
│                                                                             │
│  2. Verificar sprint ativa:                                                 │
│     sessao = db.sprint_sessions.findOne({status: {$in: ["ativa","pausada"]}})│
│                                                                             │
│  3. Apresentar:                                                             │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │  🌟 GENESIS - Inteligência Híbrida                              │     │
│     │                                                                 │     │
│     │  [SE sprint pausada/ativa: mostrar contexto]                    │     │
│     │                                                                 │     │
│     │  O que você gostaria de fazer?                                  │     │
│     │                                                                 │     │
│     │  1. 📚 Conhecer     → Criar conhecimento estruturado            │     │
│     │  2. 📋 Executar     → Gerenciar sprints e tarefas               │     │
│     │  3. 📦 Organizar    → Ver e gerenciar backlog                   │     │
│     │  4. ✅ Aprovar      → Releases e aprovações                     │     │
│     │                                                                 │     │
│     │  💡 genesis ajuda   → Ver todos os comandos                     │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Menu Multinível

### 4.1 Nível 1: Meta Sistemas

```
USUÁRIO: "oi" ou "1"
         │
         ▼
db.capacidades.find({tipo: "meta_sistema", pai_id: null})
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│  🌟 GENESIS                                                     │
│                                                                 │
│  1. 📚 Conhecer      → Criar conhecimento estruturado           │
│  2. 📋 Executar      → Gerenciar sprints e tarefas              │
│  3. 📦 Organizar     → Ver e gerenciar backlog                  │
│  4. ✅ Aprovar       → Releases e aprovações                    │
│                                                                 │
│  [número] para selecionar │ genesis ajuda │ comando direto      │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Nível 2: Capacidades do MS

```
USUÁRIO: "1" (selecionou Conhecer)
         │
         ▼
cap = db.capacidades.findOne({id: "ms_epistemologia"})
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│  📚 CONHECER (Epistemologia)                                    │
│                                                                 │
│  1.1 Criar nova Dor       → Entrevistar e documentar problema   │
│  1.2 Executar M0-M4       → Transformar problema em documento   │
│  1.3 Buscar conhecimento  → Pesquisar na documentação           │
│                                                                 │
│  ← voltar │ genesis ajuda conhecer │ comando direto             │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Execução

```
USUÁRIO: "1.1" (selecionou Criar nova Dor)
         │
         ▼
cap = db.capacidades.findOne({"capacidades.id": "criar_dor"})
         │
         ▼
GENESIS.rotear(cap, "criar_dor")
         │
         ├── if maturidade.fase in ["draft", "spec"]:
         │       executar_llm(cap.path)  → LLM lê MS_Epistemologia.md
         │
         └── if maturidade.fase in ["code", "prod"]:
                 executar_codigo(cap.maturidade.prometheus_ref)  → STUB
```

---

## 5. Algoritmo apresentar_menu()

```python
def apresentar_menu(nivel: int = 1, pai_id: str = None):
    """
    Apresenta menu de capacidades para o usuário.
    
    Args:
        nivel: 1 = raiz (MS), 2+ = capacidades do MS
        pai_id: ID do MS pai (para nível 2+)
    """
    
    if nivel == 1:
        # Nível 1: Lista de Meta Sistemas
        capacidades = db.capacidades.find({
            "tipo": "meta_sistema",
            "pai_id": None
        }).sort("ordem", 1)
        
        print("🌟 GENESIS - Inteligência Híbrida\n")
        
        # Verificar sprint ativa
        sessao = db.sprint_sessions.findOne({
            "status": {"$in": ["ativa", "pausada"]}
        })
        
        if sessao:
            if sessao.status == "pausada":
                print(f"📋 Sprint pausada: {sessao.titulo}")
                print(f"   Contexto: {sessao.contexto_pausa}")
                print(f"   → genesis sprint retomar\n")
            else:
                print(f"📋 Sprint ativa: {sessao.titulo}")
                print(f"   Task atual: {sessao.task_atual}\n")
        
        print("O que você gostaria de fazer?\n")
        
        for i, cap in enumerate(capacidades, 1):
            print(f"{i}. {cap.icone} {cap.nome}")
            print(f"   → {cap.descricao_curta}")
        
        print("\n💡 genesis ajuda → Ver todos os comandos")
    
    else:
        # Nível 2+: Capacidades de um MS
        ms = db.capacidades.findOne({"id": pai_id})
        
        print(f"{ms.icone} {ms.nome.upper()} ({ms.id})\n")
        
        for i, cap in enumerate(ms.capacidades, 1):
            numero = f"{nivel-1}.{i}"
            print(f"{numero} {cap.nome}")
            print(f"    → {cap.descricao}")
            print(f"    comando: {cap.comando}")
        
        print("\n← voltar │ genesis ajuda │ comando direto")
```

---

## 6. Algoritmo rotear()

```python
def rotear(comando: str):
    """
    Roteia comando para capacidade correta.
    Roteamento transparente: usuário não sabe se é LLM ou código.
    """
    
    # Buscar capacidade pelo comando
    resultado = db.capacidades.findOne({
        "capacidades.comando": comando
    })
    
    if not resultado:
        return erro_comando_nao_encontrado(comando)
    
    # Encontrar a capacidade específica
    ms = resultado
    capacidade = next(c for c in ms.capacidades if c.comando == comando)
    
    # Roteamento por fase de maturidade
    if ms.maturidade.fase in ["draft", "spec"]:
        # LLM-based: carregar documento e executar
        return executar_llm(
            path=ms.path,
            capacidade=capacidade
        )
    
    elif ms.maturidade.fase in ["code", "prod"]:
        # Code-based: executar worker
        return executar_codigo(
            ref=ms.maturidade.prometheus_ref,
            capacidade=capacidade
        )


def executar_llm(path: str, capacidade: dict):
    """
    Executa capacidade via LLM lendo documento.
    """
    # Carregar documento do MS
    doc = github.get_file_contents(path)
    
    # LLM executa conforme instruções do documento
    # ... lógica específica do MS
    
    # Se capacidade gera backlog
    if capacidade.get("gera_backlog"):
        item = criar_backlog_item(capacidade)
        perguntar_iniciar_sprint(item)
    
    return resultado


def executar_codigo(ref: str, capacidade: dict):
    """
    Executa capacidade via código/worker.
    STUB: Será implementado com PROMETHEUS.
    """
    raise NotImplementedError(
        f"Capacidade '{capacidade.id}' está em fase code/prod "
        f"mas PROMETHEUS ainda não está implementado. "
        f"Ref: {ref}"
    )
```

---

## 7. Navegação

### 7.1 Comandos de Navegação

| Input | Ação |
|-------|------|
| `1`, `2`, `3`, `4` | Selecionar MS no nível 1 |
| `1.1`, `1.2`, etc | Selecionar capacidade no nível 2 |
| `voltar`, `←` | Voltar ao nível anterior |
| `menu`, `inicio` | Voltar ao nível 1 |
| `genesis ajuda` | Listar todos os comandos |
| `genesis ajuda <cmd>` | Ajuda específica |
| `genesis <comando>` | Executar comando direto |

### 7.2 Atalhos

Usuário pode pular menu e executar comando direto:

```
USUÁRIO: "genesis dor"
         │
         ▼
GENESIS.rotear("genesis dor")  → executa diretamente
```

---

## 8. Integração com Sprint

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BOOTSTRAP COM SPRINT ATIVA                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🌟 GENESIS - Inteligência Híbrida                                          │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────┐      │
│  │  📋 SPRINT ATIVA: S024 - Hello World de GENESIS                   │      │
│  │  Progresso: 29% │ Task atual: T03                                 │      │
│  │  → genesis sprint status                                          │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                                                             │
│  O que você gostaria de fazer?                                              │
│                                                                             │
│  1. 📚 Conhecer     → Criar conhecimento estruturado                        │
│  2. 📋 Executar     → Gerenciar sprints e tarefas                           │
│  3. 📦 Organizar    → Ver e gerenciar backlog                               │
│  4. ✅ Aprovar      → Releases e aprovações                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Invariantes

| Invariante | Descrição |
|------------|-----------|
| **DISCOVERY-DINAMICO** | GENESIS não tem conhecimento hardcoded de MS |
| **SSOT-CAPACIDADES** | `db.capacidades` é fonte única de verdade |
| **ROTEAMENTO-TRANSPARENTE** | Usuário não sabe se é LLM ou código |
| **MENU-NAVEGAVEL** | Sempre há caminho de volta |
| **COMANDO-DIRETO** | Atalhos funcionam em qualquer contexto |

---

## 10. Migração de GENESIS.md

A seção 10 do GENESIS.md (Bootstrap com Sprint) será **deprecada** em favor deste documento. O novo fluxo:

```
GENESIS.md
    │
    │ referencia
    ▼
GENESIS_Bootstrap.md (este documento)
    │
    │ consulta
    ▼
db.capacidades
```

---

## Referências

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Documento principal |
| docs/schemas/capacidades.md | Schema de db.capacidades |
| _sprints/S024_Genesis_Hello_World.md | Sprint que criou este documento |
| _backlog/BKL-G01_Genesis_Hello_World.md | Item de backlog |

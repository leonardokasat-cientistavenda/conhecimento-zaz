---
titulo: "Genesis: MM Bot (websocket)"
data_criacao: 2025-12-13
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: Genesis
produto_ref: genesis
epico_ref: kernel
release_alvo: v0.1.0
---

# Genesis: MM Bot (websocket)

## Contexto

Implementar bot Mattermost que escuta mensagens via websocket e publica respostas.

**Decisão arquitetural:** ADR-001 (MM como interface)

---

## M0.1 Glossário

| Significante | Significado |
|--------------|-------------|
| **MM Bot** | Processo Python que conecta ao Mattermost |
| **Websocket** | Conexão persistente para eventos em tempo real |
| **Listener** | Componente que escuta mensagens |
| **Publisher** | Componente que publica respostas |

## M0.2 Problema

| Sintoma | Causa | Necessidade |
|---------|-------|-------------|
| Usuário não consegue falar com Genesis | Não há interface | Bot que escuta |
| Respostas não chegam | Não há publicador | Bot que publica |

---

## Especificação Técnica

**Linguagem:** Python

**Biblioteca:** mattermostdriver

**Responsabilidades:**
- Conectar ao MM via websocket
- Escutar eventos de mensagem em canais configurados
- Filtrar mensagens (ignorar próprias, ignorar bots)
- Disparar processo Camunda via REST
- Publicar resposta na thread correta

**NÃO faz:**
- Lógica de negócio
- Chamadas diretas ao LLM
- Persistência

---

## Plano de Execução

| # | Arquivo | Método | Descrição |
|---|---------|--------|-----------|
| 1 | `genesis/bot/__init__.py` | Criar | Package |
| 2 | `genesis/bot/listener.py` | Criar | Websocket listener |
| 3 | `genesis/bot/publisher.py` | Criar | Publica respostas |
| 4 | `genesis/bot/config.py` | Criar | Configurações (env vars) |
| 5 | `genesis/bot/main.py` | Criar | Entry point |
| 6 | `genesis/bot/requirements.txt` | Criar | Dependências |

---

## Critérios de Aceite

- [ ] Bot conecta ao MM via websocket
- [ ] Bot escuta mensagens em canal configurado
- [ ] Bot ignora próprias mensagens
- [ ] Bot dispara evento para Camunda
- [ ] Bot publica resposta na thread correta
- [ ] Logs estruturados para debugging

---

## Referências

- [Épico Kernel](docs/04_P/Genesis/epicos/kernel.md)
- [Arquitetura Genesis](docs/04_P/Genesis/arquitetura.md)

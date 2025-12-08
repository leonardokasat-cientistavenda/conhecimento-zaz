---
titulo: "Arquitetura de Persistência Híbrida"
data_criacao: 2025-12-08
status: Pendente
promovido_em: null
data_promocao: null
resolvido_em: null
data_resolucao: null
tipo: Feature
prioridade: 🔴
sistema_afetado: Infraestrutura
---

# Arquitetura de Persistência Híbrida

## Contexto

### Origem: S009 (2025-12-08)

**Problema identificado:** Persistência atual (100% GitHub) está causando problemas recorrentes que impactam velocidade de desenvolvimento.

#### Incidentes nas Últimas 3 Sprints

| Sprint | Problema | Impacto | Causa Raiz |
|--------|----------|---------|------------|
| **S007** | Patch aplicou parcialmente - diagrama truncado | Retrabalho, debug de 15+ min | Blocos ``` dentro de patch conflitam com delimitadores |
| **S007** | M1 não aplicou | Sprint travada até diagnóstico | Mesmo problema de sintaxe |
| **S008** | Patch grande (~80 linhas) forçou substituição | Perda da vantagem do patch | Sistema não escala para edições médias |
| **S005-G** | Patch para Sprint não atualizou | Progresso não persistiu | Falha silenciosa do GitHub Action |
| **S003-E** | Dois docs sobre persistência (violação SSOT) | Confusão sobre qual usar | Complexidade acumulada |

#### Análise de Urgência

- **Frequência:** Alta (problemas em 3 de 3 sprints recentes)
- **Severidade:** Média-Alta (retrabalho, debug, progresso perdido)
- **Tendência:** Piorando (sistema cresce, mais transações)

```
HOJE:     ~10 operações/sprint  →  problemas gerenciáveis
PRÓXIMO:  ~30 operações/sprint  →  gargalo crítico
ESCALA:   ~100 operações/sprint →  sistema quebra
```

---

## Proposta de Solução

### Arquitetura Híbrida: GitHub + MongoDB

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA HÍBRIDA                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  GITHUB (mantém)                   MONGODB (novo)               │
│  ─────────────                     ─────────────────            │
│  • GENESIS.md                      • Decisões tomadas           │
│  • Epistemologia.md                • Itens de backlog           │
│  • Módulos (Raciocínio, etc)       • Histórico de sprints       │
│  • Prompts de projeto              • Logs de execução           │
│  • Estrutura de pastas             • Catálogo (índice)          │
│                                                                 │
│  NATUREZA: Definições             NATUREZA: Transações          │
│  FREQUÊNCIA: Baixa                FREQUÊNCIA: Alta              │
│  FORMATO: Markdown legível        FORMATO: JSON/BSON            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Classificação de Dados

| Dado | Localização atual | Destino proposto |
|------|-------------------|------------------|
| GENESIS.md, Epistemologia.md | GitHub | GitHub (mantém) |
| `_catalogo/indice.yaml` | GitHub | **MongoDB** — queries frequentes |
| `_backlog/*.md` | GitHub | **MongoDB** — CRUD frequente |
| `_sprints/*.md` | GitHub | **Híbrido** — ativa em MongoDB, concluídas em GitHub |
| Decisões (Raciocínio) | GitHub | **MongoDB** — busca semântica |
| Patches (`_patches/`) | GitHub | **Eliminar** — MongoDB não precisa |

### Benefícios Esperados

| Aspecto | GitHub (atual) | MongoDB (proposto) |
|---------|----------------|-------------------|
| **Velocidade** | ~2-3s por operação | ~50-100ms |
| **Patches** | Frágil, sintaxe problemática | Não precisa |
| **Queries** | Inexistente | Nativo |
| **Escalabilidade** | Linear com tamanho do arquivo | Constante |

### Opções de Implementação

**Opção A: MongoDB Atlas (managed)**
- Zero infra para gerenciar
- Free tier generoso (512MB)
- Integração via MCP ou API direta

**Opção B: Self-hosted (Docker)**
- Controle total
- Mais trabalho de manutenção

**Recomendação:** Atlas para MVP, validar arquitetura primeiro.

---

## Escopo MVP

1. Migrar `_catalogo/indice.yaml` para MongoDB
2. Migrar `_backlog/*.md` para MongoDB
3. Criar interface de persistência unificada
4. Manter GitHub para definições (GENESIS, Epistemologia, etc.)

---

## Referências

- Padrão arquitetural: CQRS simplificado
- Teoria: Separar writes transacionais de reads de definições
- Contexto: Conversa S009 sobre problemas de persistência

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

## 1. Contexto

### 1.1 Origem: S009 (2025-12-08)

**Problema identificado:** Persistência atual (100% GitHub) está causando problemas recorrentes que impactam velocidade de desenvolvimento.

### 1.2 Incidentes nas Últimas 3 Sprints

| Sprint | Problema | Impacto | Causa Raiz |
|--------|----------|---------|------------|
| **S007** | Patch aplicou parcialmente - diagrama truncado | Retrabalho, debug 15+ min | Blocos ``` dentro de patch conflitam |
| **S007** | M1 não aplicou | Sprint travada até diagnóstico | Mesmo problema de sintaxe |
| **S008** | Patch grande (~80 linhas) forçou substituição | Perda da vantagem do patch | Sistema não escala |
| **S005-G** | Patch para Sprint não atualizou | Progresso não persistiu | Falha silenciosa GitHub Action |
| **S003-E** | Dois docs sobre persistência | Confusão sobre qual usar | Violação SSOT |

### 1.3 Análise de Urgência

```
FREQUÊNCIA:  Alta (problemas em 3 de 3 sprints recentes)
SEVERIDADE:  Média-Alta (retrabalho, debug, progresso perdido)
TENDÊNCIA:   Piorando (sistema cresce, mais transações)

HOJE:     ~10 operações/sprint  →  problemas gerenciáveis
PRÓXIMO:  ~30 operações/sprint  →  gargalo crítico
ESCALA:   ~100 operações/sprint →  sistema quebra
```

---

## 2. Visão Estratégica: Convivência de Dois Mundos

### 2.1 Insight Principal

A arquitetura LLM + Markdown é **imbatível para prototipação**. Depois evolui para **híbrida**, depois para **código** (quando escalar).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      EVOLUÇÃO NATURAL DA ARQUITETURA                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FASE 1: MVP (atual)                                                        │
│  ───────────────────                                                        │
│  • Markdown + LLM + GitHub                                                  │
│  • Latência alta, custo alto                                                │
│  • MAS: iteração rápida, validação de conceitos                             │
│  • IMBATÍVEL para prototipar Meta Sistemas                                  │
│                                                                             │
│                            │                                                │
│                            ▼                                                │
│                                                                             │
│  FASE 2: HÍBRIDO (S010 - MongoDB)                                           │
│  ────────────────────────────────                                           │
│  • Persistência transacional → MongoDB                                      │
│  • Definições (framework) → GitHub                                          │
│  • LLM ainda processa, mas dados rápidos                                    │
│  • RESOLVE ~70% dos problemas atuais                                        │
│                                                                             │
│                            │                                                │
│                            ▼                                                │
│                                                                             │
│  FASE 3: CÓDIGO (quando escalar)                                            │
│  ───────────────────────────────                                            │
│  • Operações frequentes → Python/Node                                       │
│  • Operações criativas → LLM                                                │
│  • Latência ~10ms, custo marginal                                           │
│  • RESOLVE os 30% restantes                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Comparativo Honesto: LLM vs Tradicional

| Aspecto | Arquitetura Tradicional | Nossa (LLM) | Veredito |
|---------|------------------------|-------------|----------|
| **Latência** | ~10-50ms | ~2-5s | ❌ Perdemos 100x |
| **Custo por operação** | ~$0.0001 | ~$0.01-0.10 | ❌ Perdemos 100-1000x |
| **Escalabilidade** | Milhões req/s | ~100 req/min | ❌ Perdemos muito |
| **Flexibilidade** | Precisa dev para mudar | Muda com prompt | ✅ Ganhamos muito |
| **Tempo para MVP** | Semanas/meses | Dias | ✅ Ganhamos muito |
| **Validação de ideias** | Lenta | Rápida | ✅ Ganhamos muito |

**Conclusão:** Enquanto Meta Sistemas estão em protótipo, LLM é imbatível. Quando estabilizam, migram para código.

---

## 3. Tipos de Persistência

### 3.1 Mapeamento Completo

| # | Tipo | O que é | Hoje | Destino |
|---|------|---------|------|---------|
| 1 | **Framework** | GENESIS, Epistemologia, Módulos | GitHub | GitHub (mantém) |
| 2 | **Catálogo** | Índice semântico, busca | `_catalogo/*.yaml` | MongoDB |
| 3 | **Trabalho** | Backlog items, Sprints | `_backlog/`, `_sprints/` | MongoDB |
| 4 | **Decisões** | Histórico de decisões (Raciocínio) | Não existe | MongoDB |
| 5 | **Logs** | Execuções, auditoria | Não existe | MongoDB |

### 3.2 Por que Schema não é um tipo separado?

No desenvolvimento tradicional, **o código É o schema**. Classes e métodos são definidos no próprio código-fonte.

No nosso contexto (LLM), **os docs Markdown SÃO o "código"**. O schema já está nas definições do Framework (tipo 1).

O que precisamos é um **índice rápido** para o LLM saber onde cada classe/método está. Isso é função do **Catálogo** (tipo 2).

```
TRADICIONAL                         NÓS
───────────                         ───
class Genesis:                      # GENESIS.md
    def entender(input):            ## Método entender()
        # código executa            [diagrama explicando]
                                    [LLM "executa" lendo]

COMPILADOR entende                  LLM entende
RUNTIME executa                     LLM "executa"
Schema = código                     Schema = documentação estruturada
```

---

## 4. Arquitetura Proposta (Fase 2)

### 4.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE PERSISTÊNCIA v1.0                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GITHUB (Definições)                 MONGODB (Transações + Índices)         │
│  ────────────────────                ──────────────────────────────         │
│                                                                             │
│  ┌─────────────────────┐             ┌─────────────────────┐                │
│  │ 1. FRAMEWORK        │             │ 2. CATALOGO         │                │
│  │    • GENESIS.md     │             │    Collection:      │                │
│  │    • Epistemologia  │             │    catalogo         │                │
│  │    • Módulos        │             │    • docs           │                │
│  │    • Prompts        │             │    • backlog        │                │
│  └─────────────────────┘             │    • sprints        │                │
│                                      │    • classes        │                │
│  NATUREZA:                           └─────────────────────┘                │
│  • Muda pouco                                                               │
│  • Precisa versionar                 ┌─────────────────────┐                │
│  • Legível p/ humanos                │ 3. TRABALHO         │                │
│  • "Código" do sistema               │    Collections:     │                │
│                                      │    backlog_items    │                │
│                                      │    sprints          │                │
│                                      │    tasks            │                │
│                                      └─────────────────────┘                │
│                                                                             │
│                                      ┌─────────────────────┐                │
│                                      │ 4. DECISOES         │                │
│                                      │    Collection:      │                │
│                                      │    decisoes         │                │
│                                      │    • hipóteses      │                │
│                                      │    • evidências     │                │
│                                      │    • decisão final  │                │
│                                      └─────────────────────┘                │
│                                                                             │
│                                      ┌─────────────────────┐                │
│                                      │ 5. LOGS             │                │
│                                      │    Collection:      │                │
│                                      │    execucoes        │                │
│                                      │    • timestamps     │                │
│                                      │    • sessões        │                │
│                                      └─────────────────────┘                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 O que MongoDB Resolve (vs. não resolve)

| Problema Atual | MongoDB Resolve? | Observação |
|----------------|------------------|------------|
| Latência de busca (YAML lento) | ✅ Sim | ~50ms vs ~2s |
| Patches frágeis | ✅ Sim | Update atômico |
| CRUD backlog/sprint | ✅ Sim | Insert/update nativo |
| Queries complexas | ✅ Sim | "Backlog prioridade alta do sistema X" |
| Histórico decisões | ✅ Sim | Collection nova |
| Logs de execução | ✅ Sim | Collection nova |
| **Latência da API LLM** | ❌ Não | LLM continua ~2-5s |
| **Custo de tokens** | ❌ Não | Tokens continuam sendo consumidos |
| **Rate limit** | ❌ Não | Limite da API continua |

**MongoDB resolve ~70% dos problemas. Os 30% restantes precisam de código (Fase 3).**

---

## 5. Collections MongoDB

### 5.1 catalogo

```javascript
{
  _id: ObjectId,
  id: "ms_epistemologia",
  tipo: "docs" | "backlog" | "sprint" | "classe",
  nome: "Epistemologia",
  chave: "criar meta sistemas estruturados...",
  arquivo: "docs/00_E/00_E_Epistemologia.md",
  triggers: ["como estruturar conhecimento", ...],
  metadata: {
    versao: "3.4",
    camada: "C3",
    status: "Publicado"
  },
  capability: {
    id: "cap_conhecer",
    nome_amigavel: "CONHECER",
    descricao: "...",
    exemplos: [...]
  },
  updated_at: ISODate
}
```

### 5.2 backlog_items

```javascript
{
  _id: ObjectId,
  titulo: "Arquitetura de Persistência Híbrida",
  slug: "persistencia-hibrida",
  status: "Pendente" | "Promovido" | "Resolvido",
  tipo: "Feature" | "Bug" | "Minor",
  prioridade: "alta" | "media" | "baixa",
  sistema_afetado: "Infraestrutura",
  origens: [
    { sprint: "S009", data: ISODate, contexto: "..." }
  ],
  promovido_em: null,
  resolvido_em: null,
  created_at: ISODate,
  updated_at: ISODate
}
```

### 5.3 sprints

```javascript
{
  _id: ObjectId,
  codigo: "S010",
  nome: "Persistência Híbrida",
  status: "Ativa" | "Concluida",
  backlog_origem: ["persistencia-hibrida"],
  tasks: [
    { id: "T01", descricao: "Setup MongoDB Atlas", status: "Pendente" },
    { id: "T02", descricao: "Migrar catálogo", status: "Pendente" }
  ],
  entregavel: "MongoDB integrado ao GENESIS",
  data_inicio: ISODate,
  data_fim: null,
  created_at: ISODate,
  updated_at: ISODate
}
```

### 5.4 decisoes

```javascript
{
  _id: ObjectId,
  contexto: "Qual banco usar para persistência?",
  hipoteses: [
    { id: "H1", descricao: "PostgreSQL", evidencias: [...] },
    { id: "H2", descricao: "MongoDB", evidencias: [...] }
  ],
  decisao: {
    escolha: "H2",
    justificativa: "Schema flexível, melhor para MVP",
    data: ISODate
  },
  sprint_origem: "S009",
  uso_count: 0,
  created_at: ISODate
}
```

### 5.5 execucoes

```javascript
{
  _id: ObjectId,
  sessao_id: "uuid",
  operacao: "GENESIS.entender",
  input: "...",
  output: "...",
  duracao_ms: 2340,
  tokens_usados: 1250,
  timestamp: ISODate
}
```

---

## 6. Quando Migrar para Código (Fase 3)

### 6.1 Sinais de que é hora

| Sinal | Ação |
|-------|------|
| Mesma operação repetida 100x/dia | Extrair para código |
| Latência impactando usuário | Cachear ou codificar |
| Custo de API > $500/mês | Otimizar hot paths |
| Schema estabilizou | Codificar classes core |

### 6.2 O que migra vs. o que fica LLM

| Componente | Fase 2 (MongoDB) | Fase 3 (Código) |
|------------|------------------|-----------------|
| `Catalogo.buscar()` | LLM + MongoDB query | Python + MongoDB |
| `Backlog.capturar()` | LLM + MongoDB insert | API REST + MongoDB |
| `GENESIS.entender()` | LLM classifica | Classifier ML ou regras |
| `Epistemologia.ciclo_m0_m4()` | LLM executa | **Mantém LLM** (criativo) |

**Regra:** Operações determinísticas → código. Operações criativas → LLM.

---

## 7. Escopo da Sprint S010 (MVP)

### 7.1 Tasks Propostas

| # | Task | Descrição |
|---|------|-----------|
| T01 | Setup MongoDB Atlas | Criar cluster free tier |
| T02 | Definir schemas | Collections conforme seção 5 |
| T03 | Migrar Catálogo | `_catalogo/indice.yaml` → MongoDB |
| T04 | Migrar Backlog | `_backlog/*.md` → MongoDB |
| T05 | Criar interface | Módulo de persistência unificado |
| T06 | Atualizar GENESIS | Usar MongoDB para buscar() |
| T07 | Eliminar patches | Remover `_patches/` e GitHub Action |
| T08 | Documentar | Atualizar docs de infraestrutura |

### 7.2 Fora de Escopo (Fase 3)

- Migrar operações para código Python/Node
- Eliminar chamadas LLM para operações simples
- Otimização de latência < 100ms
- Cache de respostas

---

## 8. Opções de Implementação

### 8.1 MongoDB Atlas (Recomendado para MVP)

**Prós:**
- Zero infra para gerenciar
- Free tier: 512MB storage
- Integração via MCP ou API direta
- Backup automático

**Contras:**
- Vendor lock-in leve
- Latência de rede (~20-50ms)

### 8.2 Self-hosted (Docker)

**Prós:**
- Controle total
- Latência local (~5ms)
- Sem limites de storage

**Contras:**
- Manutenção de infra
- Backup manual

**Recomendação:** Atlas para MVP. Se volume crescer muito, migra para self-hosted.

---

## 9. Referências

- **Padrão arquitetural:** CQRS simplificado
- **Teoria:** Separar writes transacionais de reads de definições
- **Contexto:** Conversa S009 sobre problemas de persistência
- **Comparativo:** Desenvolvimento tradicional vs. LLM-first

---

## Histórico

| Data | Sprint | Alteração |
|------|--------|-----------|
| 2025-12-08 | S009 | Criação com incidentes e proposta inicial |
| 2025-12-08 | S009 | Visão completa: fases de evolução, tipos de persistência, collections MongoDB |

# MS_Produto v1.1

---

```yaml
nome: MS_Produto
versao: "1.1"
tipo: Meta Sistema
classe_ref: MS_Epistemologico
status: Publicado
nivel: C4
camadas: [L0, L1]
dominio: Produto
data_publicacao: 2025-12-15
sprint_origem: S014
```

---

## 1. Visão Geral

**MS_Produto** é um Meta Sistema Epistemológico que define o **COMO conhecer e gerenciar produto**. Gerencia o ciclo completo de vida de Produtos, desde a captura estruturada de demandas até o sucesso contínuo do usuário.

### O que é um MS Epistemológico?

MS_Produto é filho de Epistemologia. Foi criado via ciclo M0-M4 e define **COMO** estruturar conhecimento sobre um domínio específico (Produto). Outros exemplos de MS Epistemológicos:
- MS_Seleção (COMO conhecer seleção de pessoas)
- MS_CI/CD (COMO conhecer deploy)
- MS_X (COMO conhecer X)

### Tese

> Produtos sem gestão de ciclo completo geram gaps entre desenvolvimento e uso real. MS_Produto resolve isso orquestrando: Planejamento → Desenvolvimento → Implantação → Sucesso.

### Problema que Resolve

- Sem processo definido: MS pronto → usuário usando
- Falta visibilidade do portfólio (estágios)
- Sem método para feedback pós-implantação
- Backlog/Sprint insuficientes para captura/priorização estratégica

---

## 2. Fronteiras

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MS_PRODUTO É                          MS_PRODUTO NÃO É                     │
│  ─────────────                         ────────────────                     │
│                                                                             │
│  ✅ MS Epistemológico (COMO produto)  ❌ Executor técnico (deploy k8s)      │
│  ✅ Orquestrador do ciclo de vida     ❌ Ferramenta de CI/CD                 │
│  ✅ Gestão de Épicos e Roadmap        ❌ Substituto de Backlog/Sprint        │
│  ✅ Extensão de Backlog/Sprint        ❌ Código de produto                   │
│  ✅ Framework de priorização          ❌ Infraestrutura técnica              │
│  ✅ Processo de Implantação           ❌ CRM de vendas                       │
│  ✅ Framework de CS                   ❌ Sistema de tickets (Zendesk)        │
│  ✅ Feedback Loop estruturado         ❌ Dashboard de métricas técnicas      │
│  ✅ Visibilidade de Portfólio         ❌ Fábrica de execução (isso é         │
│                                          PROMETHEUS)                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Arquitetura

### 3.1 Posição no Ecossistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MS_PRODUTO NO ECOSSISTEMA                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS (inteligência)                                                     │
│      │                                                                      │
│      │ usa                                                                  │
│      ▼                                                                      │
│  EPISTEMOLOGIA (método M0-M4)                                               │
│      │                                                                      │
│      │ gera                                                                 │
│      ▼                                                                      │
│  MS_PRODUTO (COMO conhecer produto) ◄─── você está aqui                     │
│      │                                                                      │
│      │ especifica                                                           │
│      ▼                                                                      │
│  PROMETHEUS (fábrica) ───► Artefatos de produto implantados                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Diagrama de Escopo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MS_PRODUTO                                     │
│                        (Ciclo Completo A→G)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FASE 1: PLANEJAMENTO                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PRODUTO            ÉPICO              ROADMAP                      │    │
│  │  ┌─────────┐        ┌─────────┐        ┌─────────┐                  │    │
│  │  │ MS como │        │Agrupa   │        │Timeline │                  │    │
│  │  │ unidade │───────▶│backlog  │───────▶│releases │                  │    │
│  │  │ de valor│        │items    │        │e épicos │                  │    │
│  │  └─────────┘        └─────────┘        └─────────┘                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                   │                                         │
│                                   ▼                                         │
│  FASE 2: DESENVOLVIMENTO (Usa Backlog + Sprint existentes)                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  BACKLOG            SPRINT             RELEASE                      │    │
│  │  ┌─────────┐        ┌─────────┐        ┌─────────┐                  │    │
│  │  │Existente│        │Existente│        │Versão   │                  │    │
│  │  │+ RICE   │───────▶│+ Release│───────▶│entregue │                  │    │
│  │  │scoring  │        │tracking │        │(v0, v1) │                  │    │
│  │  └─────────┘        └─────────┘        └─────────┘                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                   │                                         │
│                                   ▼                                         │
│  FASE 3: PÓS-VENDA                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  IMPLANTAÇÃO        TREINAMENTO        CUSTOMER SUCCESS             │    │
│  │  ┌─────────┐        ┌─────────┐        ┌─────────┐                  │    │
│  │  │Setup    │        │Capacitar│        │Health   │                  │    │
│  │  │ambiente │───────▶│usuário  │───────▶│Score    │                  │    │
│  │  │+ config │        │+ docs   │        │+ NPS    │                  │    │
│  │  └─────────┘        └─────────┘        └─────────┘                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                   │                                         │
│                                   ▼                                         │
│  FEEDBACK LOOP                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CS identifica gap ──▶ Cria Backlog Item ──▶ Prioriza ──▶ Sprint   │    │
│  │         ▲                                                    │      │    │
│  │         └────────────────────────────────────────────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Diagrama de Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DIAGRAMA DE CLASSES MS_PRODUTO                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                            ┌─────────────┐                                  │
│                            │  PORTFÓLIO  │                                  │
│                            │─────────────│                                  │
│                            │ produtos[]  │                                  │
│                            │─────────────│                                  │
│                            │ dashboard() │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:N                                     │
│                                   ▼                                         │
│                            ┌─────────────┐                                  │
│                            │   PRODUTO   │                                  │
│                            │─────────────│                                  │
│                            │ nome        │                                  │
│                            │ estagio     │                                  │
│                            │ epicos[]    │                                  │
│                            │─────────────│                                  │
│                            │ avancar()   │                                  │
│                            └──────┬──────┘                                  │
│                                   │ 1:N                                     │
│              ┌────────────────────┼────────────────────┐                    │
│              ▼                    ▼                    ▼                    │
│       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐             │
│       │    ÉPICO    │      │  RELEASE    │      │ IMPLANTAÇÃO │             │
│       │─────────────│      │─────────────│      │─────────────│             │
│       │ titulo      │      │ versao      │      │ cliente     │             │
│       │ okr_ref     │      │ changelog   │      │ checklist   │             │
│       │ backlog[]   │      │ status      │      │ status      │             │
│       │─────────────│      │─────────────│      │─────────────│             │
│       │ priorizar() │      │ publicar()  │      │ executar()  │             │
│       └──────┬──────┘      └─────────────┘      └──────┬──────┘             │
│              │ 1:N                                     │ 1:1                 │
│              ▼                                         ▼                    │
│       ┌─────────────┐                           ┌─────────────┐             │
│       │BACKLOG ITEM │                           │ TREINAMENTO │             │
│       │ (existente) │                           │─────────────│             │
│       │─────────────│                           │ materiais[] │             │
│       │ +epico_ref  │                           │ sessoes[]   │             │
│       │ +rice_score │                           │ status      │             │
│       └──────┬──────┘                           │─────────────│             │
│              │ N:1                              │ concluir()  │             │
│              ▼                                  └─────────────┘             │
│       ┌─────────────┐                                                       │
│       │   SPRINT    │                                                       │
│       │ (existente) │      ┌─────────────┐      ┌─────────────┐             │
│       │─────────────│      │HEALTH SCORE │      │  FEEDBACK   │             │
│       │ +release_ref│      │─────────────│      │─────────────│             │
│       └─────────────┘      │ produto_ref │      │ produto_ref │             │
│                            │ score       │      │ tipo        │             │
│                            │ indicadores │      │ conteudo    │             │
│                            │─────────────│      │ status      │             │
│                            │ calcular()  │      │─────────────│             │
│                            │ alertar()   │      │ processar() │             │
│                            └─────────────┘      └─────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Camadas Autopoiéticas (L0-L4)

MS_Produto manifesta parcialmente as camadas L0-L4:

| Camada | Manifesta? | Como |
|--------|------------|------|
| **L0 Existência** | ✅ | Documento .md, versão, frontmatter |
| **L1 Percepção** | ✅ | Health Score, feedback, histórico |
| **L2 Ação** | ⚪ Parcial | Via PROMETHEUS |
| **L3 Validação** | ⚪ Parcial | Via PROMETHEUS |
| **L4 Decisão** | ⚪ Parcial | Via GENESIS |

**Definição completa de L0-L4:** genesis/GENESIS.md seção 2.3

---

## 4. Classes

### 4.1 Produto

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | String | Identificador único (slug) |
| nome | String | Nome do produto/MS |
| descricao | String | O que o produto resolve |
| dor_cliente | String | Problema claro que alivia |
| estagio | Enum | Backlog\|Plan\|Dev\|Release\|Impl\|Prod |
| owner | String | Responsável pelo produto |
| epicos | [Epico] | Lista de épicos |
| releases | [Release] | Histórico de releases |
| metricas_sucesso | Object | KPIs definidos |

**Métodos:**
- `criar(nome, descricao, dor)` → Produto
- `avancar_estagio()` → Produto
- `adicionar_epico(epico)` → Produto
- `criar_release(versao)` → Release
- `implantar(cliente)` → Implantacao

**Restrições:**
- `dor_cliente` obrigatório
- `estagio` só avança se critérios atendidos

### 4.2 Épico

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | String | Identificador único |
| titulo | String | Nome do épico |
| produto_ref | String | Produto pai |
| okr_ref | String? | OKR associado |
| status | Enum | Backlog\|EmProgresso\|Concluido |
| backlog_items | [String] | IDs dos backlog items |
| release_alvo | String? | Release planejada |

**Métodos:**
- `criar(titulo, produto_ref, descricao)` → Epico
- `adicionar_item(backlog_item_id)` → Epico
- `priorizar(posicao)` → Epico
- `calcular_progresso()` → Number

### 4.3 Release

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| versao | String | SemVer (v1.0.0) |
| produto_ref | String | Produto pai |
| tipo | Enum | Major\|Minor\|Patch |
| status | Enum | Planejada\|EmDesenv\|Publicada |
| changelog | String | O que mudou |
| epicos_incluidos | [String] | Épicos desta release |

**Métodos:**
- `criar(produto_ref, tipo)` → Release
- `gerar_versao()` → String
- `publicar()` → Release

### 4.4 Implantação

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | String | Identificador único |
| produto_ref | String | Produto sendo implantado |
| release_ref | String | Versão sendo implantada |
| cliente | String | Nome/ID do cliente |
| tipo_cliente | Enum | Interno\|Externo |
| checklist | [ChecklistItem] | Passos de setup |
| status | Enum | Pendente\|EmAndamento\|Concluida |

**Métodos:**
- `criar(produto_ref, release_ref, cliente)` → Implantacao
- `marcar_item(item_id, status)` → Implantacao
- `concluir()` → Implantacao
- `iniciar_treinamento()` → Treinamento

### 4.5 Treinamento

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | String | Identificador único |
| implantacao_ref | String | Implantação pai |
| tipo | Enum | Presencial\|Online\|Autoguiado |
| materiais | [Material] | Docs, vídeos, guias |
| sessoes | [Sessao] | Sessões agendadas |
| avaliacao | Number? | Nota (1-5) |

**Métodos:**
- `criar(implantacao_ref, tipo)` → Treinamento
- `agendar_sessao(sessao)` → Treinamento
- `concluir(avaliacao)` → Treinamento

### 4.6 HealthScore

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | String | Identificador único |
| produto_ref | String | Produto avaliado |
| cliente | String | Cliente avaliado |
| score | Number | 0-100 |
| status | Enum | Saudavel\|Atencao\|Risco |
| indicadores | [Indicador] | Métricas que compõem |
| tendencia | Enum | Subindo\|Estavel\|Descendo |

**Thresholds:**
- Saudavel: score >= 70
- Atencao: score >= 40 AND < 70
- Risco: score < 40

**Métodos:**
- `calcular(produto_ref, cliente)` → HealthScore
- `alertar()` → void
- `sugerir_acoes()` → [String]

### 4.7 Feedback

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | String | Identificador único |
| produto_ref | String | Produto relacionado |
| cliente | String | Quem deu o feedback |
| tipo | Enum | Bug\|Melhoria\|Elogio\|Reclamacao |
| canal | Enum | NPS\|CSAT\|Entrevista\|Ticket |
| conteudo | String | O que foi dito |
| sentimento | Enum | Positivo\|Neutro\|Negativo |
| status | Enum | Novo\|Analisado\|Backlog\|Resolvido |
| backlog_item_ref | String? | Se virou backlog |

**Métodos:**
- `registrar(produto_ref, cliente, tipo, conteudo)` → Feedback
- `converter_backlog()` → BacklogItem (O CICLO QUE NUNCA PARA)
- `responder(resposta)` → Feedback

---

## 5. Extensões em Classes Existentes

### 5.1 Backlog Item (+campos opcionais)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| epico_ref | String? | Épico ao qual pertence |
| rice_score | Number? | Score RICE calculado |
| rice_reach | Number? | R - Alcance |
| rice_impact | Number? | I - Impacto (0.25-3) |
| rice_confidence | Number? | C - Confiança (0-100%) |
| rice_effort | Number? | E - Esforço (pessoa-semanas) |
| feedback_origem | String? | ID do feedback origem |

**Novo método:** `calcular_rice()` → (R × I × C) / E

### 5.2 Sprint (+campos opcionais)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| release_ref | String? | Release alvo |
| produto_ref | String? | Produto relacionado |

**Novo método:** `vincular_release(release_id)`

---

## 6. Dependências

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DEPENDÊNCIAS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MS_Produto É GERADO POR (pai direto):                                      │
│  ─────────────────────────────────────                                      │
│  • Epistemologia (via M0-M4)                                                │
│                                                                             │
│  MS_Produto USA (infraestrutura):                                           │
│  ────────────────────────────────                                           │
│  • Backlog (00_I_2_1) - estende com campos opcionais                        │
│  • Sprint (00_I_2_2) - estende com campos opcionais                         │
│  • Catálogo - busca semântica                                               │
│  • MongoDB - persistência de instâncias                                     │
│  • GitHub - persistência de definições                                      │
│                                                                             │
│  MS_Produto ESPECIFICA PARA:                                                │
│  ───────────────────────────                                                │
│  • PROMETHEUS - executa artefatos de produto                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Persistência

### 7.1 GitHub (Definições)

| Arquivo | Conteúdo |
|---------|----------|
| `docs/04_P/MS_Produto.md` | Este documento |
| `docs/04_P/templates/checklist_implantacao.md` | Modelo de checklist |
| `docs/04_P/playbooks/*.md` | Ações por situação CS |
| `docs/04_P/treinamento/*.md` | Materiais base |

### 7.2 MongoDB (Instâncias)

| Collection | Documento |
|------------|-----------|
| `produtos` | `{ id, nome, dor_cliente, estagio, owner, ... }` |
| `epicos` | `{ id, produto_ref, titulo, status, backlog_items[], ... }` |
| `releases` | `{ versao, produto_ref, tipo, changelog, status, ... }` |
| `implantacoes` | `{ id, produto_ref, release_ref, cliente, checklist[], ... }` |
| `treinamentos` | `{ id, implantacao_ref, tipo, materiais[], sessoes[], ... }` |
| `health_scores` | `{ id, produto_ref, cliente, score, indicadores[], ... }` |
| `feedbacks` | `{ id, produto_ref, tipo, conteudo, sentimento, status, ... }` |

### 7.3 Regra de Ouro

```
SE é DEFINIÇÃO (como fazer, template, playbook) → GitHub
SE é INSTÂNCIA (dado real, transação, estado) → MongoDB
```

---

## 8. Invariantes

| Invariante | Descrição |
|------------|-----------|
| PRODUTO-DOR | Todo Produto deve ter dor_cliente definida |
| EPICO-PRODUTO | Todo Épico pertence a exatamente um Produto |
| RELEASE-SEMVER | Versões seguem SemVer estrito |
| FEEDBACK-LOOP | Feedback tipo Bug/Melhoria deve ser analisado para backlog |
| HEALTH-PERIODICO | HealthScore recalculado semanalmente em Produção |
| IMPLANTACAO-TREINAMENTO | Toda Implantação deve ter Treinamento |

---

## 9. Triggers de Roteamento

```yaml
problema_que_resolve: "Como gerenciar ciclo completo de vida de Produtos"
triggers:
  - criar produto
  - novo produto
  - roadmap
  - épico
  - release
  - implantar
  - implantação
  - treinamento
  - customer success
  - health score
  - feedback
  - portfólio
exemplos_uso:
  - "quero criar um novo produto"
  - "mostrar roadmap do MS_Seleção"
  - "qual o health score dos clientes"
  - "registrar feedback do cliente X"
  - "ver portfólio de produtos"
```

---

## 10. Estágios do Produto

| Estágio | Critério de Transição |
|---------|----------------------|
| Backlog → Planejamento | M0 definido, owner atribuído |
| Planejamento → Desenvolvimento | ≥1 épico criado, roadmap definido |
| Desenvolvimento → Release | Sprint concluída, testes OK |
| Release → Implantação | Release publicada |
| Implantação → Produção | ≥1 cliente com setup concluído |
| Produção → Sucesso | Health Score calculado |

---

## 11. Referências

### 11.1 Internas

| Documento | Relação |
|-----------|---------|
| genesis/GENESIS.md | Avô (C1) - Inteligência que roteia |
| genesis/GENESIS.md seção 2.3 | Definição de Autopoiese e L0-L4 |
| docs/00_E/00_E_Epistemologia.md | Pai (C3) - Método que gerou MS_Produto |
| **genesis/PROMETHEUS.md** | **Fábrica que executa artefatos de produto** |
| docs/00_I/00_I_2_1_Backlog.md | Infraestrutura estendida |
| docs/00_I/00_I_2_2_Sprint.md | Infraestrutura estendida |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-09 | M0 - Problema |
| 0.2 | 2025-12-09 | M1 - Marco Teórico |
| 0.3 | 2025-12-09 | M2 - Objeto |
| 0.4 | 2025-12-09 | M3 - Classes |
| 1.0 | 2025-12-09 | M4 - Documento Final Publicado |
| 1.1 | 2025-12-15 | **Reconciliação**: clarifica MS Epistemológico, seção 3.1 Posição no Ecossistema, seção 3.4 Camadas L0-L4, frontmatter atualizado (nivel: C4, camadas: [L0, L1]), referência a PROMETHEUS.md. |

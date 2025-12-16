# Backlog: Propagação GENESIS v4.0

---

```yaml
nome: BKL_Propagacao_Genesis_v4
versao: "1.0"
tipo: Backlog
status: Pendente
criado_em: 2025-12-16
origem: Refatoração GENESIS v4.0
```

---

## Contexto

GENESIS v4.0 foi publicado com:
- Propósito Autopoiético (agente que evolui)
- Fluxo Produto-First (dor → feature → release → avaliação)
- Avaliação de Efetividade (adoção → threshold → iteração)
- Padrão de Catalogação (cada sistema cataloga para GENESIS)
- Hierarquia Produto → Feature → Épico → BacklogItem

Este backlog lista todos os arquivos que precisam ser atualizados para refletir essas mudanças.

---

## Arquivos de Referência

| Arquivo | Versão | Link |
|---------|--------|------|
| GENESIS.md | v4.0 | genesis/GENESIS.md |
| GENESIS_Arquitetura.md | v2.0 | genesis/GENESIS_Arquitetura.md |

---

## Itens de Backlog

### BKL-P01: MS_Produto v2.0

**Arquivo:** `docs/04_P/MS_Produto.md`
**Prioridade:** Alta (Bloqueante)
**Estimativa:** 2h

**Mudanças Necessárias:**

1. **Adicionar classe Feature**
```yaml
Feature:
  id: String
  produto_ref: String
  titulo: String
  hipotese: String  # "SE X, ENTÃO Y"
  criterios_sucesso:
    - metrica: String
      baseline: String
      meta: String
      prazo_dias: Number
  epicos: [String]
  status: backlog | em_desenvolvimento | em_producao | avaliando | concluida | iterando
```

2. **Adicionar classe AvaliacaoEfetividade**
```yaml
AvaliacaoEfetividade:
  id: String
  feature_ref: String
  release_ref: String
  data_avaliacao: datetime
  criterios_avaliados:
    - criterio_ref: String
      valor_atingido: String
      meta: String
      status: atingido | parcial | nao_atingido
  conclusao: sucesso | parcial | falha
  aprendizados: String
  proximos_passos: [BacklogItem]?
```

3. **Atualizar classe Épico**
   - Adicionar: `feature_ref: String`

4. **Atualizar classe Produto**
   - Adicionar: `threshold_adocao: Number`
   - Adicionar: `features: [Feature]`

5. **Adicionar seção de Catalogação**
   - O que MS_Produto cataloga para GENESIS
   - Schema do catálogo

6. **Atualizar diagrama de classes**

7. **Atualizar frontmatter para v2.0**

**Critérios de Aceite:**
- [ ] Feature como classe documentada
- [ ] AvaliacaoEfetividade documentada
- [ ] Hierarquia Produto → Feature → Épico clara
- [ ] Seção de catalogação presente

---

### BKL-P02: Epistemologia v4.0

**Arquivo:** `docs/00_E/00_E_Epistemologia.md`
**Prioridade:** Alta (Bloqueante)
**Estimativa:** 3h

**Mudanças Necessárias:**

1. **Adicionar vertentes M3.***
```
M3.E (Estrutural/POO) - OBRIGATÓRIO
M3.P (Processual/BPMN) - opcional
M3.D (Decisional/DMN) - opcional
M3.I (Infraestrutural/IaC) - opcional
M3.C (Configuracional/Schema) - opcional
```

2. **DAG de dependências M3**
```
M2 → M3.E → [M3.P ∥ M3.D] → M3.I → M3.C → M4
```

3. **Schemas TDD orientados**
   - classes_equivalencia por atributo
   - criterios_aceite por método
   - cobertura: cartesiano | pairwise

4. **Recursividade de ciclos**
   - Quando atributo gera ciclo filho
   - Como GENESIS cria backlog para ciclo filho

5. **Seção de Catalogação**
   - O que Epistemologia cataloga para GENESIS
   - Schema do catálogo

6. **Alinhar com fluxo produto-first**
   - Epistemologia recebe Feature, não dor diretamente

**Critérios de Aceite:**
- [ ] M3.* vertentes documentadas
- [ ] DAG de dependências claro
- [ ] Schemas TDD presentes
- [ ] Seção de catalogação presente

---

### BKL-P03: PROMETHEUS v3.0

**Arquivo:** `genesis/PROMETHEUS.md`
**Prioridade:** Alta (Bloqueante)
**Estimativa:** 2h

**Mudanças Necessárias:**

1. **Atualizar arquitetura de Workers**
```
WORKER_E: M3.E → .py + test_.py + .feature (se exposto)
WORKER_P: M3.P → .bpmn + Karate
WORKER_D: M3.D → .dmn + Karate
WORKER_I: M3.I → Dockerfile, .yaml
WORKER_C: M3.C → .yaml, .env
WORKER_DOC: M4 → .md
```

2. **Fluxo TDD embutido**
   - Recebe M3.E.yaml
   - Extrai classes_equivalencia
   - Gera testes primeiro
   - Gera código
   - Valida

3. **Contrato com GENESIS**
   - executar_spec(spec_id, vertentes)
   - obter_release(job_id)

4. **Seção de Catalogação**
   - O que PROMETHEUS cataloga para GENESIS
   - Schema do catálogo

5. **Responsabilidade de validação técnica**
   - PROMETHEUS garante código funcionando
   - GENESIS avalia efetividade (não técnica)

**Critérios de Aceite:**
- [ ] Workers por vertente documentados
- [ ] Fluxo TDD claro
- [ ] Contrato com GENESIS definido
- [ ] Seção de catalogação presente

---

### BKL-P04: Backlog v2.0

**Arquivo:** `docs/00_I/00_I_2_1_Backlog.md`
**Prioridade:** Média
**Estimativa:** 1h

**Mudanças Necessárias:**

1. **Adicionar campo tipo**
```yaml
tipo: ciclo_epistemologico | desenvolvimento | bug | melhoria | documentacao
```

2. **Adicionar timestamps**
```yaml
timestamps:
  criado_em: datetime
  promovido_em: datetime?
  iniciado_em: datetime?
  validado_em: datetime?
  concluido_em: datetime?
```

3. **Adicionar origem (para ciclos filhos)**
```yaml
origem:
  ms_pai: string?
  etapa: string?
  atributo: string?
```

4. **Adicionar métricas derivadas**
```yaml
metricas:
  lead_time_min: number
  cycle_time_min: number
  wait_time_min: number
```

5. **Adicionar feature_ref**
   - BacklogItem vinculado a Feature

**Critérios de Aceite:**
- [ ] Novos campos documentados
- [ ] Exemplos atualizados
- [ ] Relação com Feature clara

---

### BKL-P05: Sprint v2.0

**Arquivo:** `docs/00_I/00_I_2_2_Sprint.md`
**Prioridade:** Média
**Estimativa:** 1h

**Mudanças Necessárias:**

1. **Adicionar métricas agregadas**
```yaml
metricas:
  total_itens: number
  concluidos: number
  rejeitados: number
  lead_time_medio_min: number
  cycle_time_medio_min: number
  throughput_dia: number
  por_tipo:
    ciclo_epistemologico: { total, concluidos, lead_time_medio }
    desenvolvimento: { total, concluidos, lead_time_medio }
```

2. **Adicionar release_ref**
   - Sprint vinculada a Release (se aplicável)

3. **Método agregar_metricas()**

**Critérios de Aceite:**
- [ ] Métricas agregadas documentadas
- [ ] Relação com Release clara

---

### BKL-P06: MongoDB v2.0

**Arquivo:** `docs/00_I/00_I_1_3_MongoDB.md`
**Prioridade:** Média
**Estimativa:** 2h

**Mudanças Necessárias:**

1. **Novas collections**
```yaml
features:
  - id, produto_ref, hipotese, criterios_sucesso, status

avaliacoes_efetividade:
  - id, feature_ref, release_ref, criterios_avaliados, conclusao

specs:
  - id, ms_ref, vertente, versao, conteudo, status

catalogo_universal:
  - id, sistema_origem, tipo, embedding, tags, score_reuso
```

2. **Campos novos em collections existentes**
   - backlog_items: +tipo, +timestamps, +origem, +metricas
   - sprints: +metricas, +release_ref

3. **Índices para busca semântica**
   - catalogo_universal: índice vetorial para embedding

**Critérios de Aceite:**
- [ ] Novas collections documentadas
- [ ] Schemas completos
- [ ] Índices definidos

---

### BKL-P07: Glossário v2.0

**Arquivo:** `docs/00_I/00_I_0_1_Glossario.md`
**Prioridade:** Baixa
**Estimativa:** 30min

**Mudanças Necessárias:**

Adicionar termos:
- **Feature**: Hipótese testável com critérios de sucesso
- **Avaliação de Efetividade**: Verificação se produto entregou JTD
- **Threshold de Adoção**: Limite mínimo de adoção esperado
- **Ciclo Filho**: Ciclo epistemológico derivado de atributo complexo
- **Catalogação Universal**: Padrão para indexar artefatos para reuso
- **Fluxo Produto-First**: Sequência Dor → Feature → Spec → Release → Avaliação
- **M3.E, M3.P, M3.D, M3.I, M3.C**: Vertentes de especificação

**Critérios de Aceite:**
- [ ] Todos os termos novos presentes
- [ ] Definições alinhadas com GENESIS v4.0

---

### BKL-P08: Módulo Catálogo v2.0

**Arquivo:** `docs/00_E/00_E_2_1_Modulo_Catalogo.md`
**Prioridade:** Média
**Estimativa:** 1.5h

**Mudanças Necessárias:**

1. **Catálogo distribuído**
   - Cada sistema tem seu catálogo
   - GENESIS consulta todos

2. **Schema de catalogação universal**
   - Campos obrigatórios para reuso
   - Embedding para busca semântica

3. **Métodos de busca cross-sistema**
   - buscar_similar(query, sistemas: [])
   - ranquear_por_reuso(items)

4. **Integração com avaliação**
   - Atualizar score_reuso após avaliação de efetividade

**Critérios de Aceite:**
- [ ] Catálogo distribuído documentado
- [ ] Schema universal definido
- [ ] Métodos cross-sistema presentes

---

### BKL-P09: Gestão de Projetos

**Arquivo:** `docs/00_I/00_I_2_Gestao_Projetos.md`
**Prioridade:** Baixa
**Estimativa:** 30min

**Mudanças Necessárias:**

1. **Referenciar Backlog v2.0 e Sprint v2.0**

2. **Adicionar fluxo de ciclo filho**
   - Como Epistemologia gera backlog de ciclo filho
   - Como GENESIS prioriza

3. **Métricas de projeto**
   - Lead time, cycle time, throughput

**Critérios de Aceite:**
- [ ] Referências atualizadas
- [ ] Fluxo ciclo filho documentado

---

## Ordem de Execução Sugerida

### Sprint S016: Fundação (Prioridade Alta)

| Task | Item | Arquivo | Estimativa |
|------|------|---------|------------|
| T01 | BKL-P01 | MS_Produto v2.0 | 2h |
| T02 | BKL-P02 | Epistemologia v4.0 | 3h |
| T03 | BKL-P03 | PROMETHEUS v3.0 | 2h |

**Total:** ~7h

### Sprint S017: Infraestrutura

| Task | Item | Arquivo | Estimativa |
|------|------|---------|------------|
| T01 | BKL-P04 | Backlog v2.0 | 1h |
| T02 | BKL-P05 | Sprint v2.0 | 1h |
| T03 | BKL-P06 | MongoDB v2.0 | 2h |
| T04 | BKL-P08 | Módulo Catálogo v2.0 | 1.5h |

**Total:** ~5.5h

### Sprint S018: Consolidação

| Task | Item | Arquivo | Estimativa |
|------|------|---------|------------|
| T01 | BKL-P07 | Glossário v2.0 | 30min |
| T02 | BKL-P09 | Gestão Projetos | 30min |
| T03 | - | Validação cruzada | 1h |

**Total:** ~2h

---

## Dependências

```
BKL-P01 (MS_Produto) ──┐
                      ├──► BKL-P04 (Backlog) ──► BKL-P06 (MongoDB)
BKL-P02 (Epistemologia)┘                              │
        │                                             │
        └──► BKL-P03 (PROMETHEUS)                     │
                                                      │
BKL-P08 (Catálogo) ◄──────────────────────────────────┘
        │
        └──► BKL-P07 (Glossário)
             BKL-P09 (Gestão Projetos)
```

---

## Prompt para Iniciar Sprint

```
Contexto: GENESIS v4.0 foi publicado. Preciso propagar as mudanças.

Carregar:
1. genesis/GENESIS.md (propósito)
2. genesis/GENESIS_Arquitetura.md (contratos)
3. _backlog/BKL_Propagacao_Genesis_v4.md (este arquivo)

Sprint: S016
Objetivo: Atualizar MS_Produto, Epistemologia e PROMETHEUS

Iniciar pela Task T01: BKL-P01 (MS_Produto v2.0)
```

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | Criação. 9 itens de backlog para propagar GENESIS v4.0. |

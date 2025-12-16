# MS_Produto Arquitetura v1.1

---

```yaml
nome: MS_Produto_Arquitetura
versao: "1.1"
tipo: Documento
status: Publicado
camada: 4
data_publicacao: "2025-12-16"
pai: docs/04_P/MS_Produto.md
depende_de:
  - docs/04_P/MS_Produto.md
  - docs/04_B/MS_Backlog.md
  - docs/04_B/MS_Backlog_Arquitetura.md
```

---

Este documento detalha a arquitetura técnica do MS_Produto v2.1. Para visão de propósito, ver MS_Produto.md.

---

## 1. Integração via MS_Backlog

### 1.1 Mudança Arquitetural v1.1

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ANTES (v1.0) vs DEPOIS (v1.1)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ANTES: Contratos diretos com outros sistemas                               │
│  ─────────────────────────────────────────────                              │
│                                                                             │
│  MS_Produto ──► solicitar_especificacao() ──► Epistemologia                 │
│  MS_Produto ──► solicitar_desenvolvimento() ──► PROMETHEUS                  │
│  MS_Produto ◄── GENESIS.avaliar_efetividade() ◄── GENESIS                   │
│                                                                             │
│  Problema: Acoplamento, sistemas se conhecem diretamente                    │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  DEPOIS: Comunicação exclusiva via MS_Backlog                               │
│  ────────────────────────────────────────────                               │
│                                                                             │
│  MS_Produto.consumir() ◄── MS_Backlog ◄── GENESIS.produzir()                │
│  MS_Produto.produzir() ──► MS_Backlog ──► Epistemologia.consumir()          │
│  MS_Produto.produzir() ──► MS_Backlog ──► GENESIS.consumir()                │
│                                                                             │
│  Benefício: Desacoplamento total, rastreabilidade, human-in-the-loop        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Tipos Consumidos/Produzidos

```yaml
# MS_Produto consome estes tipos do MS_Backlog:
tipos_consumidos:
  - estruturar_produto   # GENESIS produz após entrevistar
  - criar_feature        # Usuário ou GENESIS solicita
  - implantar            # PO aprova release

# MS_Produto produz estes tipos para MS_Backlog:
tipos_produzidos:
  - ciclo_epistemologico # Feature precisa de spec
  - avaliar_efetividade  # Release implantada, precisa validar
```

---

## 2. Fluxo Completo via Backlog

### 2.1 Saga Completa

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      FLUXO COMPLETO MS_PRODUTO v2.1                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 1: ENTRADA (GENESIS)                                                  │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  USUÁRIO: "Tenho uma dor"                                                   │
│       │                                                                     │
│       ▼                                                                     │
│  GENESIS.consumir([entrevistar_dor])                                        │
│       │                                                                     │
│       └──► entrevistar_dor()                                                │
│            → Cria Prontuário                                                │
│            → MS_Backlog.concluir(resultado, [                               │
│                {tipo: estruturar_produto, prontuario_ref}                   │
│              ])                                                             │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 2: ESTRUTURAÇÃO (MS_PRODUTO)                                          │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  MS_PRODUTO.consumir([estruturar_produto]) ◄── AQUI                         │
│       │                                                                     │
│       └──► Buscar Prontuário                                                │
│            → Criar Produto (dor_cliente, threshold)                         │
│            → Criar Feature (hipótese, critérios)                            │
│            → MS_Backlog.concluir(resultado, [                               │
│                {tipo: ciclo_epistemologico, feature_ref}                    │
│              ])                                                             │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 3: ESPECIFICAÇÃO (EPISTEMOLOGIA)                                      │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  EPISTEMOLOGIA.consumir([ciclo_epistemologico])                             │
│       │                                                                     │
│       └──► Executar M0-M4                                                   │
│            │                                                                │
│            ├── SE não-folha:                                                │
│            │   → MS_Backlog.concluir([], [                                  │
│            │       {tipo: ciclo_epistemologico, pai_ref}                    │
│            │     ])  # Recursivo                                            │
│            │                                                                │
│            └── Spec pronta:                                                 │
│                → MS_Backlog.concluir(resultado, [                           │
│                    {tipo: desenvolvimento, spec_ref}                        │
│                  ])                                                         │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 4: DESENVOLVIMENTO (PROMETHEUS)                                       │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  PROMETHEUS.consumir([desenvolvimento])                                     │
│       │                                                                     │
│       └──► Executar TDD                                                     │
│            → Internamente: worker_* items                                   │
│            → Release publicada                                              │
│            → MS_Backlog.concluir(resultado, [                               │
│                {tipo: aprovar_release, release_ref}                         │
│              ])                                                             │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 5: APROVAÇÃO (PO)                                                     │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  PO.consumir([aprovar_release])                                             │
│       │                                                                     │
│       └──► Valida release                                                   │
│            → MS_Backlog.concluir(resultado, [                               │
│                {tipo: implantar, release_ref}                               │
│              ])                                                             │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 6: IMPLANTAÇÃO (MS_PRODUTO)                                           │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  MS_PRODUTO.consumir([implantar]) ◄── AQUI                                  │
│       │                                                                     │
│       └──► Setup ambiente                                                   │
│            → Executar checklist                                             │
│            → Iniciar treinamento                                            │
│            → MS_Backlog.concluir(resultado, [                               │
│                {tipo: avaliar_efetividade, release_ref, produto_ref}        │
│              ])                                                             │
│                                                                             │
│  ══════════════════════════════════════════════════════════════════════     │
│  FASE 7: VALIDAÇÃO (GENESIS)                                                │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                             │
│  GENESIS.consumir([avaliar_efetividade])                                    │
│       │                                                                     │
│       └──► Coleta métricas                                                  │
│            → Compara com thresholds                                         │
│            │                                                                │
│            ├── SUCESSO: aprender(sucesso)                                   │
│            │            DOR RESOLVIDA                                       │
│            │                                                                │
│            ├── BUG: MS_Backlog.concluir([], [                               │
│            │          {tipo: corrigir_bug, feature_ref}                     │
│            │        ])                                                      │
│            │                                                                │
│            └── ITERAR: MS_Backlog.concluir([], [                            │
│                          {tipo: iterar_feature, feature_ref}                │
│                        ])                                                   │
│                        → Volta para EPISTEMOLOGIA                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Árvore de BacklogItems (Exemplo)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SAGA: "Reporte por Voz" (saga_001)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  bkl_001 (entrevistar_dor) ────────────────── GENESIS                       │
│      │                                                                      │
│      └─► bkl_002 (estruturar_produto) ─────── MS_Produto ◄──                │
│          │ prontuario_ref: pron_001                                         │
│          │                                                                  │
│          └─► bkl_003 (ciclo_epistemologico) ── Epistemologia                │
│              │ feature_ref: feat_001                                        │
│              │                                                              │
│              └─► bkl_004 (desenvolvimento) ──── PROMETHEUS                  │
│                  │ spec_ref: spec_001                                       │
│                  │                                                          │
│                  └─► bkl_005 (aprovar_release) ─ PO                         │
│                      │                                                      │
│                      └─► bkl_006 (implantar) ──── MS_Produto ◄──            │
│                          │ release_ref: rel_001                             │
│                          │                                                  │
│                          └─► bkl_007 (avaliar) ── GENESIS                   │
│                              conclusao: SUCESSO                             │
│                                                                             │
│  MS_Produto participou em: bkl_002, bkl_006                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Contratos via MS_Backlog

### 3.1 Consumindo estruturar_produto

```yaml
estruturar_produto:
  produtor: GENESIS
  consumidor: MS_Produto
  
  contexto_recebido:
    prontuario_ref: string
  
  processamento: |
    1. prontuario = MongoDB.prontuarios.find(prontuario_ref)
    2. produto = criar_produto(prontuario)
    3. feature = criar_feature(produto, prontuario.criterio_esperado)
    4. criterios = criar_criterios(feature, prontuario)
  
  resultado:
    produto_id: string
    feature_id: string
  
  items_gerados:
    - tipo: ciclo_epistemologico
      feature_ref: feature_id
      contexto:
        problema: prontuario.sintoma
        criterios: criterios[]
```

### 3.2 Consumindo implantar

```yaml
implantar:
  produtor: PO
  consumidor: MS_Produto
  
  contexto_recebido:
    release_ref: string
    produto_ref: string
  
  processamento: |
    1. release = MongoDB.releases.find(release_ref)
    2. checklist = obter_checklist(produto_ref)
    3. PARA CADA item em checklist:
         executar(item)
    4. treinamento = agendar_treinamento(produto_ref)
  
  resultado:
    implantacao_id: string
    treinamento_id: string
  
  items_gerados:
    - tipo: avaliar_efetividade
      release_ref: release_ref
      produto_ref: produto_ref
      feature_refs: release.feature_refs
      periodo: "30 dias"
```

### 3.3 Produzindo ciclo_epistemologico

```yaml
ciclo_epistemologico:
  produtor: MS_Produto
  consumidor: Epistemologia
  
  quando: "Feature criada precisa de especificação"
  
  payload_produzido:
    tipo: ciclo_epistemologico
    titulo: "Especificar Feature: {feature.titulo}"
    feature_ref: feature.id
    produto_ref: feature.produto_ref
    contexto:
      problema: produto.dor_cliente
      hipotese: feature.hipotese
      criterios: feature.criterios_sucesso
      restricoes: []
```

### 3.4 Produzindo avaliar_efetividade

```yaml
avaliar_efetividade:
  produtor: MS_Produto
  consumidor: GENESIS
  
  quando: "Release implantada, período de avaliação atingido"
  
  payload_produzido:
    tipo: avaliar_efetividade
    titulo: "Avaliar efetividade: {produto.nome}"
    release_ref: release.id
    produto_ref: produto.id
    feature_refs: release.feature_refs
    contexto:
      periodo: "30 dias"
      threshold_produto: produto.threshold_adocao
      criterios_features: [...criterios de cada feature]
```

---

## 4. Loop de Consumo

### 4.1 Implementação

```python
class MSProduto:
    tipos_consumidos = ["estruturar_produto", "criar_feature", "implantar"]
    
    def run(self):
        while True:
            # Buscar próximo item
            item = MS_Backlog.consumir(self.tipos_consumidos)
            
            if item is None:
                aguardar()
                continue
            
            # Human-in-the-loop
            if not humano.aprova(item):
                MS_Backlog.cancelar(item.id, "Rejeitado pelo usuário")
                continue
            
            # Processar conforme tipo
            try:
                if item.tipo == "estruturar_produto":
                    resultado, novos_items = self.processar_estruturar(item)
                
                elif item.tipo == "criar_feature":
                    resultado, novos_items = self.processar_criar_feature(item)
                
                elif item.tipo == "implantar":
                    resultado, novos_items = self.processar_implantar(item)
                
                MS_Backlog.concluir(item.id, resultado, novos_items)
                
            except Exception as e:
                MS_Backlog.falhar(item.id, str(e))
    
    def processar_estruturar(self, item):
        prontuario = MongoDB.prontuarios.find(item.contexto.prontuario_ref)
        
        produto = Produto.criar(
            nome=f"MS_{inferir_nome(prontuario)}",
            dor_cliente=prontuario.sintoma_principal,
            prontuario_ref=prontuario.id,
            threshold_adocao=0.8  # 80% default
        )
        
        feature = Feature.criar(
            produto_ref=produto.id,
            hipotese=f"SE {inferir_acao(prontuario)} ENTÃO {prontuario.criterio_esperado}",
            criterios=[...]
        )
        
        resultado = {
            "produto_id": produto.id,
            "feature_id": feature.id
        }
        
        novos_items = [{
            "tipo": "ciclo_epistemologico",
            "titulo": f"Especificar: {feature.hipotese}",
            "feature_ref": feature.id,
            "contexto": {
                "problema": produto.dor_cliente,
                "criterios": feature.criterios_sucesso
            }
        }]
        
        return resultado, novos_items
```

---

## 5. Persistência

### 5.1 Regra de Ouro

```
SE é DEFINIÇÃO (framework, template, playbook) → GitHub
SE é INSTÂNCIA (dado real, transação, estado) → MongoDB
```

### 5.2 Collections MongoDB

| Collection | Schema | Quando Muda |
|------------|--------|-------------|
| `prontuarios` | `{id, sintoma, afetados[], impacto, criterio_esperado, status, produto_ref}` | GENESIS entrevista |
| `produtos` | `{id, nome, dor_cliente, prontuario_ref, threshold_adocao, estagio, features[], owner}` | MS_Produto estrutura |
| `features` | `{id, produto_ref, hipotese, criterios[], status, spec_ref}` | MS_Produto cria |
| `criterios_sucesso` | `{id, feature_ref, nome, baseline, meta, atual, status}` | MS_Produto define |
| `implantacoes` | `{id, produto_ref, release_ref, checklist[], status}` | MS_Produto implanta |

### 5.3 Relação com backlog_items

```yaml
# BacklogItems criados por MS_Produto
backlog_items:
  produtor: MS_Produto
  tipos_criados:
    - ciclo_epistemologico
    - avaliar_efetividade
  refs_usados:
    - prontuario_ref
    - produto_ref
    - feature_ref
    - release_ref
```

---

## 6. Métricas

### 6.1 Métricas de Produto

| Métrica | Cálculo | Uso |
|---------|---------|-----|
| **Taxa de Adoção** | usuarios_ativos / usuarios_implantados | Threshold de sucesso |
| **Time to Value** | data_primeiro_uso - data_implantacao | Eficiência de onboarding |
| **Health Score** | média ponderada de indicadores | Saúde do cliente |

### 6.2 Métricas de Feature

| Métrica | Cálculo | Uso |
|---------|---------|-----|
| **Taxa de Atingimento** | criterios_atingidos / total_criterios | Validação |
| **Tempo de Ciclo** | data_validacao - data_criacao | Velocidade |

### 6.3 Métricas de Processo

| Métrica | Cálculo | Uso |
|---------|---------|-----|
| **Lead Time Saga** | data_sucesso - data_entrevistar_dor | Eficiência E2E |
| **Items por Saga** | count(backlog_items WHERE saga_id) | Complexidade |

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| docs/04_P/MS_Produto.md | Documento pai - propósito |
| docs/04_B/MS_Backlog.md | Message Broker |
| docs/04_B/MS_Backlog_Arquitetura.md | Contratos de comunicação |
| genesis/GENESIS_Arquitetura.md | Entrada e avaliação |
| docs/00_E/00_E_Epistemologia.md | Consome ciclo_epistemologico |
| genesis/PROMETHEUS.md | Consome desenvolvimento |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-16 | Criação inicial |
| 1.1 | 2025-12-16 | **Refatoração arquitetural**: Comunicação exclusiva via MS_Backlog. Contratos de consumo/produção. Loop de consumo. Fluxo de saga documentado. Remoção de contratos diretos com outros sistemas. |

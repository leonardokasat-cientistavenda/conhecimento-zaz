# PROMETHEUS v2.0

---

```yaml
nome: PROMETHEUS
versao: "2.0"
tipo: Framework
classe_ref: Framework
origem: interno
status: Publicado
nivel: C2
camadas: [L0, L1, L2, L3, L4]
data_publicacao: 2025-12-15
```

---

## 1. Problema (M0)

### 1.1 Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **PROMETHEUS** | Fábrica que executa especificações de GENESIS |
| **Fábrica** | Sistema que transforma specs em artefatos implantados |
| **Bloco** | Domínio de responsabilidade (INFRA ou PRODUÇÃO) |
| **INFRA** | Onde tudo roda (containers, redes, sistemas) |
| **PRODUÇÃO** | Workforce que constrói (pipelines, deploy, testes) |
| **Spec** | Especificação executável, output de Epistemologia via GENESIS |
| **L0-L4** | Camadas de capacidade autopoiética (definidas em GENESIS) |

### 1.2 Diagrama do Problema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROBLEMA CENTRAL                                  │
│                                                                             │
│  "GENESIS especifica artefatos. Quem executa?"                              │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SUBPROBLEMAS                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐                           │
│  │  ONDE RODAR?        │  │  COMO CONSTRUIR?    │                           │
│  ├─────────────────────┤  ├─────────────────────┤                           │
│  │ Containers, redes,  │  │ Pipelines, testes,  │                           │
│  │ sistemas base       │  │ deploy, templates   │                           │
│  ├─────────────────────┤  ├─────────────────────┤                           │
│  │ Solução: INFRA      │  │ Solução: PRODUÇÃO   │                           │
│  └─────────────────────┘  └─────────────────────┘                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Tese

> **PROMETHEUS é a fábrica que executa especificações de GENESIS.**
>
> - GENESIS especifica O QUÊ construir
> - PROMETHEUS executa COMO construir
> - INFRA fornece ONDE rodar
> - PRODUÇÃO fornece workforce para construir
>
> **Resultado:** Artefatos implantados a partir de specs.

---

## 2. Marco Teórico (M1)

### 2.1 Fundamentos

| Conceito | Teoria | Aplicação no PROMETHEUS |
|----------|--------|-------------------------|
| **Separação de Concerns** | SOLID | INFRA e PRODUÇÃO são independentes |
| **Linha de Produção** | Manufatura | Spec → pipeline → artefato |
| **Versionamento Semântico** | SemVer | Blocos evoluem independentemente |

### 2.2 Síntese: Fábrica Instrumental

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SÍNTESE: FÁBRICA INSTRUMENTAL                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MANUFATURA TRADICIONAL          PROMETHEUS                                 │
│  ────────────────────────        ──────────────────────────────────         │
│                                                                             │
│  Projeto (spec)       ─────────►     Especificação (via GENESIS)            │
│  Fábrica              ─────────►     INFRA + PRODUÇÃO                       │
│  Produto final        ─────────►     Artefato implantado                    │
│  Controle qualidade   ─────────►     Validação (L3)                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Papel Instrumental

PROMETHEUS é **instrumental**, não autônomo:

| Aspecto | GENESIS | PROMETHEUS |
|---------|---------|------------|
| **Papel** | Organismo (inteligência) | Ferramenta (fábrica) |
| **Decide** | O QUÊ construir | COMO executar |
| **Natureza** | Sujeito que evolui | Meio de execução |
| **Autopoiese** | Dono da propriedade | Viabiliza a propriedade |

A autopoiese é propriedade de GENESIS. PROMETHEUS viabiliza essa propriedade ao executar as especificações que permitem GENESIS evoluir.

**Referência completa:** genesis/GENESIS.md seção 2.3 (Autopoiese e Camadas L0-L4)

---

## 3. Objeto (M2)

### 3.1 Definição

**PROMETHEUS** é a fábrica que:
- **Recebe** especificações de GENESIS
- **Executa** via INFRA (hospedagem) e PRODUÇÃO (construção)
- **Entrega** artefatos implantados

### 3.2 Fronteiras

| PROMETHEUS É | PROMETHEUS NÃO É |
|--------------|------------------|
| Fábrica que executa specs | Quem decide o que construir (isso é GENESIS) |
| INFRA + PRODUÇÃO | Método de especificação (isso é Epistemologia) |
| Meio instrumental | Organismo autônomo |
| Executa o COMO | Define o PORQUÊ |

### 3.3 Os 2 Blocos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              OS 2 BLOCOS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  INFRA                                                              │    │
│  │  ─────                                                              │    │
│  │  ONDE tudo roda.                                                    │    │
│  │                                                                     │    │
│  │  • Containers (Docker)                                              │    │
│  │  • Redes e volumes                                                  │    │
│  │  • Sistemas base (Git, Mattermost, Camunda, MongoDB, LLM Router)    │    │
│  │  • Secrets e configurações                                          │    │
│  │                                                                     │    │
│  │  Entrada: Specs de infraestrutura                                   │    │
│  │  Saída: Ambiente operacional                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PRODUÇÃO                                                           │    │
│  │  ────────                                                           │    │
│  │  COMO artefatos são construídos.                                    │    │
│  │                                                                     │    │
│  │  • Pipelines de build                                               │    │
│  │  • Templates de artefatos                                           │    │
│  │  • Testes automatizados                                             │    │
│  │  • Deploy e implantação                                             │    │
│  │                                                                     │    │
│  │  Entrada: Especificações (via GENESIS)                              │    │
│  │  Saída: Artefatos testados e implantados                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 As 5 Camadas (L0-L4)

PROMETHEUS manifesta as 5 camadas autopoiéticas definidas em GENESIS:

| Camada | Nome | PROMETHEUS manifesta como |
|--------|------|---------------------------|
| **L0** | Existência | Docker configs, Git, manifesto |
| **L1** | Percepção | Logs, métricas, traces, estado |
| **L2** | Ação | Provisiona containers, deploya |
| **L3** | Validação | CI/CD, testes automatizados, gates |
| **L4** | Decisão | Decide pipeline, scaling, rollback |

**Definição completa de L0-L4:** genesis/GENESIS.md seção 2.3

### 3.5 Matriz Blocos × Camadas

| Camada | INFRA | PRODUÇÃO |
|--------|-------|----------|
| **L4 Decisão** | Decide scaling, migração | Decide qual pipeline usar |
| **L3 Validação** | Testa infra (smoke tests) | Testa artefatos (CI/CD) |
| **L2 Ação** | Provisiona containers | Builda, deploya, persiste |
| **L1 Percepção** | Monitora recursos | Monitora pipelines |
| **L0 Existência** | Docker, configs | Templates, scripts |

---

## 4. Classe (M3)

### 4.1 Classe: PROMETHEUS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: PROMETHEUS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ─────────                                                                  │
│  + nome: String = "PROMETHEUS"                                              │
│  + versao: SemVer                                                           │
│  + blocos: [INFRA, PRODUÇÃO]                                                │
│  + camadas: [L0, L1, L2, L3, L4]                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + receber_spec(spec) → validação                                           │
│  + executar(spec) → artefato                                                │
│  + validar(artefato) → {passou: bool, erros?: []}                           │
│  + implantar(artefato, ambiente) → resultado                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Composição                                                                 │
│  ──────────                                                                 │
│  - INFRA: Bloco                                                             │
│  - PRODUÇÃO: Bloco                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Dependências                                                               │
│  ────────────                                                               │
│  - GENESIS: quem especifica (genesis/GENESIS.md)                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Classe: Bloco (abstrata)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLASSE: BLOCO                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Atributos                                                                  │
│  ─────────                                                                  │
│  + nome: String                                                             │
│  + versao: SemVer                                                           │
│  + status: ATIVO | INATIVO | ERRO                                           │
│  + camadas_consumidas: [L0, L1, L2, L3, L4]                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  Métodos                                                                    │
│  ────────                                                                   │
│  + inicializar() → void                                                     │
│  + health_check() → {status, detalhes}                                      │
│  + consumir_camada(camada) → capacidade                                     │
│  + versionar(tipo: MAJOR|MINOR|PATCH) → nova_versao                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Implementações                                                             │
│  ───────────────                                                            │
│  - BlocoInfra extends Bloco                                                 │
│  - BlocoProducao extends Bloco                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Implementação das Camadas

| Camada | Capacidade | Implementação Concreta |
|--------|------------|------------------------|
| **L0** | repo | Git (GitHub) |
| **L0** | versao | SemVer + tags |
| **L0** | identidade | Manifesto do sistema |
| **L1** | logs | Loki / arquivos estruturados |
| **L1** | metricas | Prometheus (ferramenta) |
| **L1** | traces | OpenTelemetry |
| **L1** | estado | MongoDB + configs |
| **L2** | escrever | Git + MCP |
| **L2** | executar | Docker + Bash |
| **L2** | comunicar | Mattermost |
| **L2** | persistir | GitHub (def) + MongoDB (trans) |
| **L3** | testar | CI/CD pipelines |
| **L3** | isolar | Docker containers |
| **L3** | gate | Camunda checkpoints |
| **L3** | rollback | Git revert + Docker rollback |
| **L4** | contexto | LLM + Meta Sistemas (via GENESIS) |
| **L4** | planejar | GENESIS + Epistemologia |
| **L4** | orquestrar | Camunda workflows |
| **L4** | aprender | Catálogo + feedback loop |

### 4.4 Fluxo de Execução

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUXO DE EXECUÇÃO                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GENESIS                           PROMETHEUS                               │
│  ═══════                           ══════════                               │
│                                                                             │
│  1. Detecta gap                                                             │
│         │                                                                   │
│         ▼                                                                   │
│  2. Usa Epistemologia (M0-M4)                                               │
│         │                                                                   │
│         ▼                                                                   │
│  3. Gera spec ─────────────────────►  4. Recebe spec                        │
│                                              │                              │
│                                              ▼                              │
│                                       5. Valida spec                        │
│                                              │                              │
│                                              ▼                              │
│                                       6. Seleciona pipeline (PRODUÇÃO)      │
│                                              │                              │
│                                              ▼                              │
│                                       7. Provisiona ambiente (INFRA)        │
│                                              │                              │
│                                              ▼                              │
│                                       8. Executa build                      │
│                                              │                              │
│                                              ▼                              │
│                                       9. Testa (L3)                         │
│                                              │                              │
│                                              ▼                              │
│                                      10. Deploya                            │
│                                              │                              │
│  12. Integra  ◄─────────────────────  11. Entrega artefato                  │
│         │                                                                   │
│         ▼                                                                   │
│  13. GENESIS evoluído                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Persistência

PROMETHEUS segue a regra de persistência híbrida:

| Tipo de Dado | Destino | Responsável |
|--------------|---------|-------------|
| Definições (.md) | GitHub | Git + MCP |
| Transações (schemas, estado) | MongoDB | MongoDB driver |

**Regra:** Cada MS define o que é definição vs transação para seu domínio.

---

## 5. Referências

### 5.1 Internas

| Documento | Relação |
|-----------|---------|
| **genesis/GENESIS.md** | **Quem especifica para PROMETHEUS executar** |
| genesis/GENESIS.md seção 2.3 | Definição de Autopoiese e L0-L4 |
| docs/00_E/00_E_Epistemologia.md | Método que GENESIS usa para especificar |
| docs/04_P/MS_Produto.md | MS Epistemológico: COMO gerenciar produto |
| docs/00_I/00_I_1_1_GitHub.md | Persistência de definições |
| docs/00_I/00_I_1_3_MongoDB.md | Persistência transacional |

### 5.2 Externas

| Fonte | Conceito |
|-------|----------|
| SemVer | Versionamento Semântico |
| SOLID | Separação de responsabilidades |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-14 | Documento inicial. 4 blocos, 5 camadas C0-C4, ciclo autopoiético. |
| 2.0 | 2025-12-15 | **Simplificação**: 2 blocos (INFRA, PRODUÇÃO). Camadas renomeadas L0-L4. Autopoiese movida para GENESIS. PROMETHEUS como fábrica instrumental. Removidas seções obsoletas (4.5-4.11 da v1.0). |

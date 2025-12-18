---
id: BKL-060
nome: M0 - Problema Pipeline PROMETHEUS
versao: "1.0"
tipo: Problema
etapa: M0
status: Draft
sprint_ref: S028
itens_origem: [BKL-050, BKL-051, BKL-052]
---

# M0 - Problema: Pipeline PROMETHEUS

## 1. Glossário

| Significante | Significado no Contexto |
|--------------|-------------------------|
| **Pipeline** | Fluxo automatizado de Teste → Deploy |
| **Artefato** | Output de PROMETHEUS: .js, .bpmn, .dmn, scripts |
| **Deploy** | Disponibilizar artefato para execução em produção |
| **Gate** | Ponto de validação/aprovação no fluxo |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **Entropia Cognitiva** | Carga mental de operar fluxos manuais |

---

## 2. Sintoma

```
┌─────────────────────────────────────────────────────────────────┐
│                         SINTOMA                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROMETHEUS gera artefatos em _artefatos/S027/                   │
│                    │                                             │
│                    ▼                                             │
│              E AGORA?                                            │
│                                                                  │
│  • Como testar? (cada tipo de artefato é diferente)              │
│  • Como publicar no repo ZAZ-vendas?                             │
│  • Commit = deploy? Ou precisa de mais passos?                   │
│  • Quem aprova? Quando?                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Contexto do Usuário

### 3.1 Perfil

- **Não é desenvolvedor** - Cientista/empreendedor
- **Alta entropia cognitiva** operacionalizar fluxos manuais no Git
- **Preferência:** Especificar processo 1x e persistir, não executar manual repetidamente

### 3.2 Implicações

| Aspecto | Implicação |
|---------|------------|
| Operação manual | Gera atrito, erros, desistência |
| Múltiplos repos | Confusão sobre onde vive o quê |
| Comandos Git | Barreira técnica desnecessária |
| Restart serviços | Requer acesso e conhecimento de infra |

### 3.3 Desejo

> "Quero especificar O QUÊ fazer uma vez, e o sistema executa."
> "Não quero lembrar de 10 passos manuais para cada deploy."
> "Contexto deve ficar persistido para próximos deploys."

---

## 4. Problema Estruturado

### 4.1 Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                     PROBLEMA CENTRAL                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROMETHEUS v3.0 define:                                         │
│    Precificar → Desenvolver → Testar → Deployar                  │
│                                                                  │
│  MAS:                                                            │
│    • "Testar" não tem framework definido                         │
│    • "Deployar" não tem pipeline definido                        │
│    • Ambos requerem operação manual hoje                         │
│    • Cada tipo de artefato (JS, BPMN, DMN, Collection)           │
│      tem necessidades diferentes                                 │
│                                                                  │
│  RESULTADO:                                                      │
│    • Fluxo incompleto                                            │
│    • Entropia cognitiva alta                                     │
│    • Deploy não acontece (atrito > valor)                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Subproblemas

| # | Subproblema | BKL Origem |
|---|-------------|------------|
| P1 | **Onde vivem artefatos?** conhecimento-zaz vs ZAZ-vendas | BKL-050 |
| P2 | **Como testar cada tipo?** JS ≠ BPMN ≠ DMN ≠ Collection | BKL-051 |
| P3 | **O que é deploy?** Commit? Sync? Restart? | BKL-052 |
| P4 | **Como automatizar?** CI/CD? GitHub Actions? Camunda? | BKL-050 |
| P5 | **Quem aprova?** Gates de qualidade | BKL-052 |

### 4.3 Restrições

| Restrição | Implicação |
|-----------|------------|
| Usuário não é dev | Solução não pode depender de comandos manuais |
| MVP | Solução deve ser simples, não over-engineering |
| Infra ZAZ existente | Deve usar Camunda, MongoDB, GitHub já disponíveis |
| Contexto LLM | Processo deve ser especificável via conversa |

---

## 5. Critério de Sucesso

| # | Critério | Métrica |
|---|----------|----------|
| C1 | Zero comandos manuais para deploy | Passos manuais = 0 |
| C2 | Pipeline especificado 1x, executado N vezes | Reuso > 0 |
| C3 | Cada tipo de artefato tem estratégia de teste | Cobertura = 100% tipos |
| C4 | Gates claros entre etapas | Gates documentados |
| C5 | Contexto persistido | Próximo deploy usa contexto anterior |

---

## 6. Hipóteses Iniciais

| # | Hipótese | A validar em M1 |
|---|----------|------------------|
| H1 | CI/CD via GitHub Actions pode deployar workers + BPMN | Pesquisar Camunda deploy API |
| H2 | Testes podem ser gerados a partir do Schema TDD | Pesquisar geradores de teste |
| H3 | Um BPMN pode orquestrar o próprio deploy | Meta-BPMN? |
| H4 | Processo de deploy pode ser "mais um processo Camunda" | Autopoiese PROMETHEUS |

---

## 7. Perguntas para M1

1. Quais frameworks de teste existem para cada tipo de artefato?
2. Como Camunda deploya novos processos programaticamente?
3. GitHub Actions pode fazer deploy em Camunda/MongoDB?
4. Existe padrão de "deployment pipeline como BPMN"?
5. Como Schema TDD se transforma em código de teste?

---

## 8. Tese (Rascunho)

> **Pipeline PROMETHEUS é a especificação de como artefatos são testados e deployados, eliminando operação manual.**
>
> - **Teste:** Framework por vertente (E, P, D, C) que transforma Schema TDD em testes executáveis
> - **Deploy:** Pipeline automatizado que publica artefatos nos ambientes ZAZ
> - **Princípio:** Especificar 1x, executar N vezes
>
> **Output esperado:** Atualização de PROMETHEUS.md + novos templates de teste/deploy

---

## Referências para M1

### Internas
- genesis/PROMETHEUS.md (fluxo atual)
- _catalogo/templates/M3_*.md (templates existentes)
- _artefatos/S027/ (exemplo de release)

### Externas (a pesquisar)
- Camunda REST API (deploy)
- GitHub Actions + Camunda
- Jest, Karate, Camunda Test
- Schema-to-test generators

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-17 | M0 definido. BKL-050/051/052 mergeados. Sprint S028. |

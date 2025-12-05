---
nome: T15_Forca_Decisao_Raciocinio
versao: "0.1"
tipo: Draft
classe_ref: Instrucao
origem: interno
status: Backlog
sprint_ref: S005-G
task_ref: T15
---

# T15: Força da Decisão no Módulo Raciocínio

## Contexto

Durante discussão sobre responsabilidades Catálogo ↔ Raciocínio, surgiu insight:

> "Decisões utilizadas repetidamente e confirmadas deveriam ficar 'mais fortes'."

### Análise do Insight

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIPÓTESE: FORÇA DA DECISÃO                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Cenário:                                                                   │
│  1. Raciocínio cria decisão: "Cliente grande pede desconto → dar 10%"       │
│  2. Decisão é indexada no Catálogo                                          │
│  3. Situação similar aparece novamente                                      │
│  4. Catálogo retorna decisão anterior                                       │
│  5. Usuário CONFIRMA que funcionou                                          │
│  6. Decisão ganha +1 de "força"                                             │
│                                                                             │
│  Intuição: Decisões validadas repetidamente são mais confiáveis             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Problemas Potenciais (Crítica)

| Problema | Descrição |
|----------|-----------|
| **Contexto muda** | "10% para ACME" funcionou em 2024, mas ACME cresceu |
| **Viés de confirmação** | Decisão "forte" pode ser apenas a mais usada |
| **Quantidade ≠ Qualidade** | Usada 100x não significa que é boa |
| **Echo chamber** | Se sempre o mesmo usuário confirma |

### Decisão de Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ONDE MORA A "FORÇA"?                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✗ OPÇÃO A: No Catálogo                                                     │
│     Catálogo teria lógica específica de "força"                             │
│     → Viola princípio de Catálogo genérico/agnóstico                        │
│                                                                             │
│  ✓ OPÇÃO B: Na Metadata (armazenada no Catálogo, interpretada pelo Racio.)  │
│     Catálogo armazena: { uso_count, confirmacoes, ultima_revisao }          │
│     Raciocínio interpreta: "esta decisão é forte o suficiente?"             │
│     → Catálogo permanece genérico                                           │
│     → Inteligência fica no módulo que entende de decisões                   │
│                                                                             │
│  DECISÃO: OPÇÃO B                                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Especificação

### Metadata de Força (na Decisão)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    METADATA DE FORÇA DA DECISÃO                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Atributos adicionais na classe Decisão:                                    │
│                                                                             │
│  + uso_count: number          # Quantas vezes foi consultada/reutilizada    │
│  + confirmacoes: number       # Quantas vezes usuário confirmou sucesso     │
│  + rejeicoes: number          # Quantas vezes usuário rejeitou              │
│  + ultima_revisao: datetime   # Quando foi revisada/atualizada              │
│  + contexto_validade: string  # Condições em que a decisão é válida         │
│                                                                             │
│  Método calculado:                                                          │
│  + calcular_forca(): float                                                  │
│    └─ Fórmula sugerida:                                                     │
│       forca = (confirmacoes - rejeicoes) / uso_count                        │
│       └─ Range: -1.0 (sempre rejeitada) a 1.0 (sempre confirmada)           │
│       └─ Considera decaimento temporal? (decisões antigas perdem força)     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Fluxo de Atualização

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO: RACIOCÍNIO USA E ATUALIZA FORÇA                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. BUSCAR DECISÃO SIMILAR                                                  │
│     └─ raciocinio busca via catalogo.buscar(problema)                       │
│     └─ recebe: { decisao, score, metadata }                                 │
│                                                                             │
│  2. AVALIAR FORÇA                                                           │
│     └─ forca = decisao.calcular_forca()                                     │
│     └─ SE forca >= 0.7 E contexto_validade compatível:                      │
│        → Sugerir reutilizar decisão existente                               │
│     └─ SE forca < 0.7 OU contexto diferente:                                │
│        → Iniciar novo ciclo H→E→I→D                                         │
│                                                                             │
│  3. INCREMENTAR USO                                                         │
│     └─ catalogo.atualizar_metadata(decisao_id, {                            │
│          uso_count: uso_count + 1                                           │
│        })                                                                   │
│                                                                             │
│  4. AGUARDAR FEEDBACK DO USUÁRIO                                            │
│     └─ SE usuário confirma que funcionou:                                   │
│        catalogo.atualizar_metadata(decisao_id, {                            │
│          confirmacoes: confirmacoes + 1                                     │
│        })                                                                   │
│     └─ SE usuário rejeita:                                                  │
│        catalogo.atualizar_metadata(decisao_id, {                            │
│          rejeicoes: rejeicoes + 1                                           │
│        })                                                                   │
│                                                                             │
│  5. REVISAR PERIODICAMENTE                                                  │
│     └─ SE ultima_revisao > 90 dias E uso_count > 10:                        │
│        → Sugerir revisão da decisão                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Impacto em Documentos

| Documento | Ação Necessária |
|-----------|-----------------|
| **T11_Modulo_Raciocinio.md** | Adicionar atributos de força na classe Decisão |
| **T11_Modulo_Raciocinio.md** | Adicionar método calcular_forca() |
| **T11_Modulo_Raciocinio.md** | Documentar fluxo de feedback |
| **T12_Modulo_Catalogo.md** | Já suporta metadata genérica ✅ |

---

## Perguntas Abertas

| Pergunta | Impacto |
|----------|---------|
| Decaimento temporal? | Decisões antigas devem perder força automaticamente? |
| Threshold de força? | 0.7 é bom default? Configurável por Meta Sistema? |
| Quem pode confirmar? | Qualquer usuário ou só quem criou? |
| Revisão obrigatória? | Forçar revisão após N usos ou N dias? |

---

## Dependências

| Pré-requisito | Status |
|---------------|--------|
| T11 Raciocínio M0-M3 | ✅ Concluído |
| T12 Catálogo M0-M3 | ✅ Concluído (suporta metadata) |

---

## Critérios de Aceite

- [ ] Classe Decisão tem atributos de força (uso_count, confirmacoes, rejeicoes)
- [ ] Método calcular_forca() implementado
- [ ] Fluxo de feedback documentado
- [ ] Raciocínio usa força para decidir se reutiliza decisão
- [ ] Perguntas abertas respondidas

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 0.1 | 2025-12-05 | Instrução criada a partir de discussão T12 |

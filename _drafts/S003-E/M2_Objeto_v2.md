---
nome: M2_Objeto_v2
versao: "1.0"
tipo: Objeto
classe_ref: Objeto
origem: interno
status: Draft
etapa: M2
data_inicio: 2025-12-03
problema_ref: M0_Objeto_v2
marco_ref: M1_Objeto_v2
---

# M2: Definição do Objeto para Objeto v2

## 1. Tabela Principal

| Campo | Valor |
|-------|-------|
| **nome** | Objeto_Classe_v2 |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Reestruturar a classe Objeto (00_E_1_3_Objeto.md) para: conectar com M0/M1, usar diagramas corretos (Círculo/Venn + Caixa Contextual), adicionar método de descoberta, garantir função de ponte M1→M3 |
| **escopo** | Atributos, métodos, diagramas, restrições e instruções da classe Objeto |
| **fronteiras** | Não cobre: outras classes do Meta Sistema, implementação em código, domínios de negócio |
| **requisitos** | M0 e M1 concluídos; Matriz de Seleção de Diagramas disponível; 00_E_1_3_Objeto.md v1.0 existente |
| **criterio_sucesso** | M3 consegue gerar Classes/Métodos diretamente do Objeto, sem voltar a M1 para buscar informação |
| **criterio_insucesso** | M3 precisa perguntar ou voltar a M1 porque Objeto está incompleto |

---

## 2. Diagrama 1: Círculo de Escopo/Fronteiras

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CONTEXTO: META SISTEMA                        │
│                                                                         │
│                                                                         │
│      FRONTEIRAS (excluído)          ┌─────────────────────┐             │
│      ─────────────────────          │                     │             │
│      • Outras classes               │   ESCOPO (incluído) │             │
│        (Problema, Marco,            │   ─────────────────  │             │
│         Classe, Metodo,             │                     │             │
│         Documento)                  │   • Atributos       │             │
│      • Implementação código         │   • Métodos         │             │
│      • Domínios negócio             │   • Diagramas       │             │
│      • UI/Interface                 │   • Restrições      │             │
│                                     │   • Instruções      │             │
│                                     │   • Conexão M0/M1   │             │
│                                     │   • Função ponte    │             │
│                                     │                     │             │
│                                     └─────────────────────┘             │
│                                                                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Metodologia:** 1 (Semiótica) + 3 (Estrutural)

**Justificativa:** Círculo representa limite bem-definido; dentro = incluído, fora = excluído. Conforme Matriz de Seleção de Diagramas para classe Objeto.

---

## 3. Diagrama 2: Caixa Contextual (Posição no Fluxo)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRAMEWORK M0-M4                            │
│                                                                         │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐          │
│  │     M0       │      │     M1       │      │     M3       │          │
│  │   Problema   │      │    Marco     │      │   Classes    │          │
│  │              │      │   Teórico    │      │   Métodos    │          │
│  │  • sintoma   │      │  • conceitos │      │  • atributos │          │
│  │  • glossário │      │  • fontes    │      │  • métodos   │          │
│  │  • causa     │      │  • premissas │      │  • restrições│          │
│  └──────┬───────┘      └──────┬───────┘      └──────▲───────┘          │
│         │                     │                     │                   │
│         │    input            │    input            │   output          │
│         └─────────┐   ┌───────┘                     │                   │
│                   │   │                             │                   │
│                   ▼   ▼                             │                   │
│         ┌─────────────────────────────────┐        │                   │
│         │                                 │        │                   │
│         │      M2: OBJETO (este doc)      │────────┘                   │
│         │                                 │                            │
│         │  Recebe:                        │                            │
│         │  • glossário validado (M0)      │                            │
│         │  • conceitos operacionais (M1)  │                            │
│         │                                 │                            │
│         │  Produz:                        │                            │
│         │  • escopo delimitado            │                            │
│         │  • fronteiras claras            │                            │
│         │  • critérios verificáveis       │                            │
│         │                                 │                            │
│         │  Para que M3 possa:             │                            │
│         │  • gerar Classes sem ambiguidade│                            │
│         │  • derivar Métodos do escopo    │                            │
│         │                                 │                            │
│         └─────────────────────────────────┘                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Metodologia:** 3 (Estrutural)

**Justificativa:** Mostra Objeto no contexto do framework, com inputs (M0/M1) e output (M3). Evidencia função de ponte.

---

## 4. Diagrama 3: Funil de Afunilamento (processo M2)

```
        ┌───────────────────────────────────────┐
        │         CONCEITOS DE M1               │
        │   (escopo, fronteiras, delimitação,   │
        │    afunilamento, ponte, critérios)    │
        └───────────────────┬───────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   GLOSSÁRIO DE M0     │
                │  (termos validados)   │
                └───────────┬───────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   DELIMITAR   │
                    │    ESCOPO     │
                    └───────┬───────┘
                            │
                            ▼
                      ┌───────────┐
                      │  DEFINIR  │
                      │FRONTEIRAS │
                      └─────┬─────┘
                            │
                            ▼
                        ┌───────┐
                        │OBJETO │
                        │DEFINIDO│
                        └───────┘
                            │
                            ▼
                    (input para M3)
```

**Metodologia:** 2 (Carga Cognitiva) + 3 (Estrutural)

**Justificativa:** Visualiza processo de afunilamento; mostra redução progressiva até Objeto definido.

---

## 5. Especificação do que será atualizado em 00_E_1_3_Objeto.md

### 5.1 Seções a adicionar

| Seção | Conteúdo |
|-------|----------|
| **2. Marco Teórico** | Conceitos: Escopo, Fronteiras, Delimitação, Afunilamento, Ponte M1→M3 (de M1_Objeto_v2) |
| **Diagrama Círculo/Venn** | Substituir Caixa POO por Círculo de Escopo (conforme Matriz) |
| **Diagrama Caixa Contextual** | Adicionar posição no framework M0-M4 |
| **Método delimitar()** | Processo de descoberta: conceitos M1 → escopo/fronteiras |

### 5.2 Atributos a adicionar/modificar

| Atributo | Ação | Justificativa |
|----------|------|---------------|
| problema_ref | Adicionar | Rastrear origem (M0) |
| glossario_ref | Adicionar | Conectar com termos validados de M0 |
| conceitos_usados | Adicionar | Listar conceitos de M1 aplicados |

### 5.3 Métodos a adicionar

| Método | Input | Output | Descrição |
|--------|-------|--------|-----------|
| delimitar() | MarcoTeorico, Problema | Objeto | Processo de afunilamento |
| validarCompletude() | Objeto | bool | Verifica se M3 pode prosseguir |
| verificarConexaoM1() | Objeto, MarcoTeorico | string[] | Lista conceitos não utilizados |

### 5.4 Restrições a adicionar

| Código | Restrição | Validação |
|--------|-----------|-----------|
| R1 | Termos do objetivo devem estar em M0.glossario ou M1.conceitos | objetivo.termos ⊆ (glossario ∪ conceitos) |
| R2 | Escopo e fronteiras mutuamente exclusivos | escopo ∩ fronteiras = ∅ |
| R3 | Critérios devem ser verificáveis | criterio contém verbo mensurável |
| R4 | Objeto deve permitir M3 sem retorno a M1 | validarCompletude() == true |

---

## 6. Checklist M2

- [x] Nome definido (Objeto_Classe_v2)
- [x] Tipo de pesquisa definido (Prescritivo)
- [x] Objetivo claro e acionável
- [x] Escopo lista o que cobre
- [x] Fronteiras lista o que NÃO cobre
- [x] Requisitos identificados
- [x] Critério de sucesso verificável
- [x] Critério de insucesso verificável
- [x] Diagrama 1: Círculo de Escopo
- [x] Diagrama 2: Caixa Contextual
- [x] Diagrama 3: Funil de Afunilamento
- [x] Especificação do que será atualizado

---

## 7. Referências

| Documento | Relação |
|-----------|---------|
| M0_Objeto_v2.md | Problema (input) |
| M1_Objeto_v2.md | Marco Teórico (input) |
| 00_E_1_3_Objeto.md | Arquivo a ser atualizado |
| Matriz_Selecao_Diagramas.md | Guia para diagramas |
| 00_E_1_4_Classe.md | Próximo (M3) |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 19:00 | Criação. M2 completo com 3 diagramas, especificação de atualizações, checklist. |

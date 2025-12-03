---
nome: M1_Objeto_v2
versao: "1.0"
tipo: MarcoTeorico
classe_ref: MarcoTeorico
origem: interno
status: Draft
etapa: M1
data_inicio: 2025-12-03
problema_ref: M0_Objeto_v2
---

# M1: Marco Teórico para Objeto v2

## 1. Fonte Interna

| Documento | Achado Relevante |
|-----------|------------------|
| 00_O_1_1_1_Definir_Objeto.md | Schema de output com: nome, tipo_pesquisa, objetivo, escopo, fronteiras, requisitos, criterio_sucesso, criterio_insucesso. Submétodos: Extrair Objetivo → Delimitar Escopo → Especificar Critérios → Validar |
| 00_O_1_1_Metodo_Epistemologico.md | Versão anterior M1-M5 (diverge de M0-M4 atual). M1 = Definir Objeto, input = Problema, output = Objeto Definido |
| GENESIS.md (Seção 2) | Conceitos base: Epistemologia, Ontologia, Semiótica |

---

## 2. Fonte Externa

| Conceito | Definição | Fonte |
|----------|-----------|-------|
| **Escopo** | Domínio da pesquisa; descreve até que ponto a pergunta será explorada; o que está INCLUÍDO | AJE (aje.com) |
| **Delimitação** | Fatores e variáveis NÃO incluídos; limites sob controle do pesquisador | AJE (aje.com) |
| **Afunilamento** | Processo de especificar tema amplo em objeto específico; "funil" de redução | Mettzer, Núcleo do Conhecimento |
| **Objeto de Estudo** | Especificação do tema; ponto de vista pelo qual se analisa; afunilamento que deriva de temáticas amplas | Mettzer (blog.mettzer.com) |
| **Viabilidade** | Verificar se existem fontes suficientes e meios disponíveis para investigação | Guia da Monografia, Lakatos/Marconi |

---

## 3. Conceitos Consolidados

| Conceito | Definição | Origem | Aplicação em ZAZ |
|----------|-----------|--------|------------------|
| **Escopo** | O que está INCLUÍDO no objeto de pesquisa; domínio investigado | Externa (AJE) | Atributo obrigatório de Objeto |
| **Fronteiras** | O que está EXCLUÍDO; limites deliberados | Externa (AJE) | Atributo obrigatório de Objeto |
| **Delimitação** | Ato de definir escopo + fronteiras; afunilamento | Externa (múltiplas) | Método central de M2 |
| **Afunilamento** | Redução progressiva: Tema → Objeto específico | Externa (Mettzer) | Analogia visual para diagrama |
| **Ponte M1→M3** | Função de conectar conceitos teóricos a especificação estruturada | Interna (GENESIS) | Critério de sucesso de Objeto |
| **Critério de Sucesso** | Condição verificável de completude | Interna + Externa | Atributo obrigatório |
| **Critério de Insucesso** | Condição verificável de falha | Interna | Atributo obrigatório |

---

## 4. Referências Conceituais

| Framework | Descrição | Aplicação no ZAZ |
|-----------|-----------|------------------|
| **Funil de Delimitação** | Processo de afunilamento: Tema amplo → Objeto específico | Diagrama visual para M2; mostra redução progressiva |
| **Escopo vs Delimitação (AJE)** | Escopo = incluído, Delimitação = excluído | Clarifica diferença escopo/fronteiras |
| **Double Diamond** | Divergir→Convergir (Design Council) | M0-M1 = Discover/Define; M2 = início do Develop |

---

## 5. Diagrama: Posição de Objeto no Double Diamond

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DOUBLE DIAMOND + ZAZ                            │
│                                                                         │
│     DISCOVER          DEFINE           DEVELOP          DELIVER         │
│    (Divergir)       (Convergir)       (Divergir)      (Convergir)       │
│                                                                         │
│        ╱╲               ╱╲               ╱╲               ╱╲            │
│       ╱  ╲             ╱  ╲             ╱  ╲             ╱  ╲           │
│      ╱    ╲           ╱    ╲           ╱    ╲           ╱    ╲          │
│     ╱      ╲         ╱      ╲         ╱      ╲         ╱      ╲         │
│    ╱        ╲       ╱        ╲       ╱        ╲       ╱        ╲        │
│   ╱──────────╲     ╱──────────╲     ╱──────────╲     ╱──────────╲       │
│                                                                         │
│   ├─── M0 ───┤     ├─── M1 ───┤     ├─── M2 ───┤     ├─ M3/M4 ─┤       │
│   │ Problema │     │  Marco   │     │  OBJETO  │     │ Classes │       │
│   │          │     │ Teórico  │     │          │     │ Persist │       │
│                                                                         │
│   Sintoma ──────► Conceitos ──────► Escopo ──────► Especificação       │
│                                     Delimitado                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Diagrama: Funil de Delimitação

```
┌─────────────────────────────────────────┐
│           TEMA AMPLO (M0)               │
│         "Conhecimento ZAZ"              │
└───────────────────┬─────────────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │   CONCEITOS (M1)    │
          │  Marco Teórico      │
          └─────────┬───────────┘
                    │
                    ▼
            ┌───────────────┐
            │  OBJETO (M2)  │
            │   Escopo +    │
            │  Fronteiras   │
            └───────┬───────┘
                    │
                    ▼
              ┌───────────┐
              │CLASSES(M3)│
              │ Métodos   │
              └─────┬─────┘
                    │
                    ▼
                ┌───────┐
                │DOC(M4)│
                └───────┘

    ◄─── AFUNILAMENTO ───►
    (cada etapa reduz escopo)
```

---

## 7. Premissas

1. Objeto é saída de M1 e entrada para M3 (função de ponte)
2. Escopo e fronteiras são mutuamente exclusivos
3. Critérios devem ser verificáveis (não subjetivos)
4. Delimitação bem feita reduz retrabalho em M3
5. Afunilamento é progressivo - cada etapa reduz escopo

---

## 8. Lacunas

1. Como validar se Objeto está "completo o suficiente" para M3?
2. Como garantir que todos os conceitos de M1 foram considerados na delimitação?

---

## 9. Checklist M1

- [x] Problema (M0) definido com necessidade clara
- [x] Ontologia interna consultada primeiro (docs/00_O/)
- [x] Fontes externas consultadas para lacunas
- [x] Conceitos com definição operacional
- [x] Fontes rastreáveis (path ou url)
- [x] Validação: Seletividade ✓ Profundidade ✓ Coerência ✓ Rastreabilidade ✓

---

## 10. Referências

| Documento | Relação |
|-----------|---------|
| M0_Objeto_v2.md | Problema (input) |
| 00_O_1_1_1_Definir_Objeto.md | Fonte interna |
| 00_O_1_1_Metodo_Epistemologico.md | Fonte interna |
| 00_E_1_2_MarcoTeorico.md | Classe base |

### Referências Externas

| Fonte | URL | Conceito utilizado |
|-------|-----|-------------------|
| AJE - Escopo e Delimitações | https://www.aje.com/br/arc/scope-and-delimitations-in-research | Escopo, Delimitação |
| Mettzer - Objeto de Estudo | https://blog.mettzer.com/objeto-de-estudo/ | Afunilamento, Objeto |
| Design Council | (referência clássica) | Double Diamond |
| Lakatos & Marconi | Fundamentos de Metodologia Científica | Viabilidade, Delimitação |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 18:45 | Criação. M1 completo com pesquisa interna + externa, 7 conceitos, 2 diagramas, premissas e lacunas. |

# Sprint S005-G: Refatoração do GENESIS

## CONTEXTO

Repositório GitHub: leonardokasat-cientistavenda/conhecimento-zaz
Arquivo raiz: /genesis/GENESIS.md

---

## SPRINT S005-G - CONCLUÍDA ✅

**Objetivo:** Refatorar GENESIS de STUB (v0.10) para Framework completo (v1.2), aplicando M0-M4 e incorporando o propósito maior: **Inteligência Híbrida para amplificar capacidade cognitiva humana**.

**Resultado:** Framework GENESIS completo com módulos Catálogo e Raciocínio integrados e publicados.

---

## HIERARQUIA DE RESPONSABILIDADES

```
GENESIS (Camada 1) ─── INTELIGÊNCIA ORQUESTRADORA
│  Tese: "Amplificar capacidade cognitiva humana via Inteligência
│        Híbrida: Humano (intenção) + LLM (fluência) + Sistema (estrutura)"
│  Função: entender(CONHECER|DECIDIR) → buscar(Catálogo) → rotear(reutiliza|cria)
│
├──► CATÁLOGO (Camada 3) ─── MEMÓRIA ESTRUTURADA
│    Função: Repositório com busca semântica (indexar/buscar/atualizar)
│    Arquivo: docs/00_E/00_E_2_1_Modulo_Catalogo.md
│
├──► EPISTEMOLOGIA (Camada 3) ─── MÉTODO (CONHECER)
│    Tese: "Criar Meta Sistemas anti-entrópicos via M0-M4"
│    Arquivo: docs/00_E/00_E_Epistemologia.md
│
└──► RACIOCÍNIO (Módulo) ─── ESTRUTURAR DECISÃO (DECIDIR)
     Função: Ciclo H→E→I→D para tomar decisões
     Usa: Catálogo para buscar/indexar decisões
     Arquivo: docs/00_E/00_E_2_2_Modulo_Raciocinio.md
```

---

## TASKS DA SPRINT

| # | Task | Descrição | Status |
|---|------|-----------|--------|
| T01 | Ler GENESIS atual | Entender STUB v0.10 | ✅ |
| T02 | M0 GENESIS | Problema: Bootstrap + Visão | ✅ |
| T03 | M1 GENESIS | Marco Teórico | ✅ |
| T04 | M2 GENESIS | Objeto: Fronteiras | ✅ |
| T05 | M3 GENESIS | Classe: Atributos, métodos | ✅ |
| T06 | M4 GENESIS | Documento final v1.0 | ✅ |
| T07 | Atualizar Índice | GENESIS.md v1.1 | ✅ |
| T08-T10 | Reserva | - | ✅ |
| T11 | Módulo Raciocínio | M0-M3 → M4 publicado | ✅ |
| T12 | Módulo Catálogo | M0-M3 → M4 publicado | ✅ |
| T13 | Integração | Verificar integridade + publicar módulos | ✅ |
| T14 | Refatorar GENESIS Router | GENESIS v1.1 → v1.2 | ✅ |
| T15 | Força Decisão Raciocínio | Incorporado em T13 (metadata) | ✅ |

---

## ENTREGÁVEIS FINAIS

| Arquivo | Versão | Descrição |
|---------|--------|-----------|
| `genesis/GENESIS.md` | **v1.2** | Inteligência Orquestradora com referências corretas |
| `docs/00_E/00_E_Epistemologia.md` | v3.4 | Framework de criação de Meta Sistemas |
| `docs/00_E/00_E_2_1_Modulo_Catalogo.md` | **v1.0** | Memória estruturada com busca semântica |
| `docs/00_E/00_E_2_2_Modulo_Raciocinio.md` | **v1.0** | Ciclo H→E→I→D integrado com Catálogo |

---

## DESCOBERTAS DA SPRINT

### 1. GENESIS = Inteligência, CATÁLOGO = Memória

```
GENESIS (Inteligência):
├─ entender(): classifica CONHECER vs DECIDIR
├─ buscar(): consulta Catálogo
└─ rotear(): reutiliza existente ou cria novo

CATÁLOGO (Memória):
├─ indexar(item, chave, metadata)
├─ buscar(query) → [{item, score, metadata}]
└─ Agnóstico: não sabe o que armazena
```

### 2. Raciocínio Integrado com Catálogo

```
ANTES: problema → ciclo H→E→I→D → decisão → persiste arquivo
       (sempre cria nova decisão, nunca reutiliza)

DEPOIS: problema
        → Catalogo.buscar(problema)
        → EXISTE? aplica + atualiza metadata
        → NÃO EXISTE? ciclo H→E→I→D → indexa no Catálogo
```

### 3. Força da Decisão = Metadata

Decisões reutilizadas e confirmadas ficam "mais fortes":
- `uso_count`: quantas vezes foi consultada
- `confirmacoes`: quantas vezes usuário confirmou
- `rejeicoes`: quantas vezes usuário rejeitou

---

## PRÓXIMA SPRINT

**S006-E: Implementação do Catálogo**
- Implementar busca semântica real (BM25 + Embeddings + RRF)
- Criar pasta `_catalogo/` para índice persistido
- Testar fluxo completo GENESIS → Catálogo → Raciocínio

---

## REFERÊNCIAS

| Arquivo | Conteúdo |
|---------|----------|
| genesis/GENESIS.md | v1.2 - Inteligência Orquestradora |
| docs/00_E/00_E_Epistemologia.md | v3.4 - Framework M0-M4 |
| docs/00_E/00_E_2_1_Modulo_Catalogo.md | v1.0 - Memória estruturada |
| docs/00_E/00_E_2_2_Modulo_Raciocinio.md | v1.0 - Ciclo H→E→I→D |
| docs/00_I_1_1_GitHub.md | v2.0 - Instruções de persistência |

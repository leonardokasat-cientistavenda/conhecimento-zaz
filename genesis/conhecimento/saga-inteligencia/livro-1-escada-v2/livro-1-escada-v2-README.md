# Livro 1 - A Escada (V2)

> Memórias refatoradas através da LENTE-REVISAO

```yaml
versao: "2.0"
status: "em_producao"
origem: "livro-1-escada/ (V1)"
controle: "MS_Backlog + MS_Sprint"
data_inicio: "2025-12-26"
```

---

## 1. Propósito

Esta pasta contém as memórias V2 do Livro 1 — versões refatoradas e padronizadas para publicação.

**V1** (livro-1-escada/): Memórias orgânicas produzidas durante descoberta. PRESERVADA.

**V2** (livro-1-escada-v2/): Memórias processadas através da LENTE. PUBLICÁVEIS.

---

## 2. Bootstrap

### 2.1 Carregar Metodologia

```
1. LENTE-REVISAO.md     → Template + Estilo + Regras
2. MAPA-CRUZAMENTOS.md  → Conexões históricas + Ecos
3. COINCIDENCIAS-MORBIDAS.md → Ironias de vida/morte
```

Localização: `genesis/conhecimento/saga-inteligencia/metodologia/`

### 2.2 Verificar Backlog

```javascript
// MongoDB: genesis.backlog
db.backlog.find({ 
  "tags": "livro-1-v2" 
}).sort({ prioridade: 1 })
```

### 2.3 Verificar Sprint Ativo

```javascript
// MongoDB: genesis.sprint_sessions  
db.sprint_sessions.findOne({ 
  status: "ativo",
  "tags": "livro-1-v2"
})
```

---

## 3. Fluxo de Produção

### 3.1 Por Memória

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. BUSCAR ITEM NO BACKLOG                                      │
│     db.backlog.findOne({ id: "L1V2-XXX" })                      │
│                                                                 │
│  2. CARREGAR MEMÓRIA V1                                         │
│     github:get_file_contents → livro-1-escada/memoria-XX.md     │
│                                                                 │
│  3. APLICAR LENTE                                               │
│     - Verificar Checklist (LENTE seção 6)                       │
│     - Aplicar Transformações (LENTE seção 5)                    │
│     - Enriquecer com MAPA-CRUZAMENTOS                           │
│     - Adicionar COINCIDENCIAS-MORBIDAS                          │
│     - Validar Estilo (LENTE seção 7)                            │
│                                                                 │
│  4. PRODUZIR V2                                                 │
│     Salvar em livro-1-escada-v2/memoria-XX.md                   │
│                                                                 │
│  5. ATUALIZAR BACKLOG                                           │
│     db.backlog.updateOne({ id: "L1V2-XXX" },                    │
│       { $set: { status: "concluido" }})                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Ordem de Processamento

| Fase | Memórias | Critério |
|------|----------|----------|
| 1. Pilotos | I.3, I.1 | Maior gap biográfico |
| 2. Divisões | H.1, H.2, I.1 | Precisam virar múltiplas |
| 3. Refinamento | A.1-A.3, B.1-B.3 | Já boas, ajustes finos |
| 4. Técnicas | H.*, I.* | Enriquecer biografias |
| 5. Síntese | J.1-J.3 | Dependem das anteriores |

---

## 4. Estrutura de Backlog

### 4.1 Schema do Item

```javascript
{
  id: "L1V2-001",           // Prefixo L1V2 + sequencial
  tipo: "refatoracao_memoria",
  titulo: "Refatorar A.1 Sócrates V1→V2",
  
  // Referências
  memoria_v1: "memoria-A1-socrates.md",
  memoria_v2: "memoria-A1-socrates.md",  // mesmo nome, pasta diferente
  
  // Checklist da LENTE
  checklist: {
    cena_rica: false,
    biografia_humana: false,
    diagramas_3_7: false,
    espelho_separado: false,
    estilo_murakami: false,
    coincidencia_morbida: false,
    ecos_verificados: false
  },
  
  // Controle
  prioridade: "🔴",         // 🔴 alta, 🟡 média, 🟢 baixa
  status: "backlog",        // backlog, em_andamento, concluido
  tags: ["livro-1-v2", "bloco-A"],
  
  // Timestamps
  created_at: ISODate(),
  updated_at: ISODate()
}
```

### 4.2 Itens Iniciais (30 memórias)

```
L1V2-001 → A.1 Sócrates
L1V2-002 → A.2 Platão
L1V2-003 → A.3 Aristóteles
L1V2-004 → B.1 Descartes
L1V2-005 → B.2 Hume
L1V2-006 → B.3 Kant
L1V2-007 → C.1 Frege
L1V2-008 → C.2 Wittgenstein I
L1V2-009 → C.3 Wittgenstein II
L1V2-010 → D.1 Turing
L1V2-011 → D.2 Searle
L1V2-012 → D.3 Dennett
L1V2-013 → E.1 Bertalanffy
L1V2-014 → E.2 Ashby
L1V2-015 → E.3 Luhmann
L1V2-016 → F.1 Gödel
L1V2-017 → F.2 Turing (computação)
L1V2-018 → F.3 Shannon
L1V2-019 → G.1 Prigogine
L1V2-020 → G.2 Kauffman
L1V2-021 → G.3 Holland
L1V2-022 → H.1 McCulloch-Pitts (DIVIDIR)
L1V2-023 → H.2 Rumelhart-Hinton (DIVIDIR)
L1V2-024 → H.3 Hopfield
L1V2-025 → I.1 Vaswani (DIVIDIR)
L1V2-026 → I.2 Scaling Laws
L1V2-027 → I.3 Emergência
L1V2-028 → J.1 Entropia
L1V2-029 → J.2 Híbrido
L1V2-030 → J.3 Espelho
```

---

## 5. Comandos Úteis

### 5.1 Popular Backlog Inicial

```javascript
// Executar no MongoDB para criar os 30 itens
const memorias = [
  { id: "L1V2-001", titulo: "A.1 Sócrates", v1: "memoria-A1-socrates.md", bloco: "A" },
  { id: "L1V2-002", titulo: "A.2 Platão", v1: "memoria-A2-platao.md", bloco: "A" },
  // ... completar
];

memorias.forEach(m => {
  db.backlog.insertOne({
    id: m.id,
    tipo: "refatoracao_memoria",
    titulo: `Refatorar ${m.titulo} V1→V2`,
    memoria_v1: m.v1,
    memoria_v2: m.v1,
    checklist: {
      cena_rica: false,
      biografia_humana: false,
      diagramas_3_7: false,
      espelho_separado: false,
      estilo_murakami: false,
      coincidencia_morbida: false,
      ecos_verificados: false
    },
    prioridade: "🟡",
    status: "backlog",
    tags: ["livro-1-v2", `bloco-${m.bloco}`],
    created_at: new Date(),
    updated_at: new Date()
  });
});
```

### 5.2 Criar Sprint

```javascript
db.sprint_sessions.insertOne({
  id: "S-L1V2-001",
  titulo: "Sprint 1: Pilotos V2",
  objetivo: "Validar LENTE com 2-3 memórias piloto",
  items: ["L1V2-027", "L1V2-025"],  // I.3 e I.1
  status: "ativo",
  tags: ["livro-1-v2"],
  data_inicio: new Date(),
  data_fim_prevista: new Date(Date.now() + 7*24*60*60*1000)
});
```

### 5.3 Consultas de Acompanhamento

```javascript
// Progresso geral
db.backlog.aggregate([
  { $match: { tags: "livro-1-v2" }},
  { $group: { _id: "$status", count: { $sum: 1 }}}
]);

// Pendentes por bloco
db.backlog.find({ 
  tags: "livro-1-v2",
  status: { $ne: "concluido" }
}).sort({ id: 1 });
```

---

## 6. Métricas de Qualidade

### 6.1 Por Memória

| Métrica | Alvo | Verificação |
|---------|------|-------------|
| Tamanho | 40-70KB | `wc -c memoria.md` |
| CENA | 300-700 palavras | Contagem manual |
| Diagramas | 3-7 | `grep -c "╔═" memoria.md` |
| ESPELHO | 200-500 palavras | Contagem manual |

### 6.2 Global

| Métrica | Alvo |
|---------|------|
| Memórias V2 completas | 33-35 |
| Ecos implementados | 8+ |
| Coincidências mórbidas | 15+ |
| Cruzamentos narrativos | 7+ |

---

## 7. Estrutura de Arquivos

```
livro-1-escada-v2/
├── README.md                    # Este arquivo
├── _progresso.md                # Tracker de progresso
│
├── memoria-A1-socrates.md       # Bloco A: Fundações
├── memoria-A2-platao.md
├── memoria-A3-aristoteles.md
│
├── memoria-B1-descartes.md      # Bloco B: Conhecimento
├── memoria-B2-hume.md
├── memoria-B3-kant.md
│
├── memoria-C1-frege.md          # Bloco C: Linguagem
├── memoria-C2-wittgenstein.md
├── memoria-C3-wittgenstein-ii.md
│
├── ...                          # Demais blocos
│
└── memoria-J3-espelho.md        # Final
```

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-26 | Criação inicial com estrutura de backlog |

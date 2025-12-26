# Metodologia — Saga "O Limiar"

---

```yaml
saga_id: saga-inteligencia
tipo: metodologia
versao: "5.0"
data: "2025-12-26"
status: Em uso
```

---

## Propósito

Método epistemológico para produção da saga.

Assim como Aristóteles catalogou a gramática da realidade, este sistema cataloga a gramática da nossa criação.

**Documento Mestre da Saga:** [O_LIMIAR.md](../O_LIMIAR.md)

---

## Bootstrap de Sessão

### Carregamento OBRIGATÓRIO (sempre)

Todos os arquivos abaixo **devem** ser carregados ao iniciar qualquer sessão de produção:

```
../O_LIMIAR.md                           # Meta mestre da saga

metodologia/
├── README.md                            # Este arquivo
├── epistemologia-producao.md            # Veios narrativos + métodos
├── workflow-genesis.md                  # Workflow de processamento
├── fio-narrativo-genesis-arquiteto.md   # Relação G↔A (atravessa toda saga)
└── referencias/
    ├── personagem.md                    # Egri, Stanislavski, Jung
    ├── estilos.md                       # 8 estilos narrativos
    ├── sinestesia.md                    # Paletas e sentidos
    └── arco-genesis.md                  # Estados por livro
```

### Carregamento por Livro

Conforme o livro sendo trabalhado:

```
livro-X/
├── README.md      # SSOT do livro (estrutura, blocos, links)
└── _status.md     # Status de produção (atualizar ao fim)
```

### Ao Fim de Cada Sessão

1. Atualizar `_status.md` do livro trabalhado
2. Persistir no GitHub

---

## Ritual de Produção

### 1. Decidir

Preencher meta-documento (`memoria-XX-autor-meta.md`) antes de escrever.

### 2. Produzir

Executar conforme decisões. Não desviar sem atualizar meta.

### 3. Depois

Validar contra meta. Atualizar `_status.md`. Persistir.

---

## Estrutura

```
saga-inteligencia/
│
├── O_LIMIAR.md                        ← META MESTRE (especificação da saga)
│
├── metodologia/                       ← COMO PRODUZIR (este diretório)
│   ├── README.md                         (este arquivo)
│   ├── epistemologia-producao.md         (veios narrativos + métodos)
│   ├── workflow-genesis.md               (workflow de processamento)
│   ├── fio-narrativo-genesis-arquiteto.md (relação G↔A)
│   ├── referencias/
│   │   ├── personagem.md
│   │   ├── estilos.md
│   │   ├── sinestesia.md
│   │   └── arco-genesis.md
│   └── _v0/                              (arquivos deprecados)
│
└── livro-X/                           ← CADA LIVRO
    ├── README.md                         (SSOT do livro)
    ├── _status.md                        (status de produção)
    └── memoria-*.md                      (METAs e MEMÓRIAs)
```

---

## Documentos Obrigatórios

| Documento | Conteúdo | Obrigatório |
|-----------|----------|-------------|
| **[../O_LIMIAR.md](../O_LIMIAR.md)** | Meta mestre, bootstrap, 9 livros, matriz 8×8 | ✅ Sempre |
| **[epistemologia-producao.md](epistemologia-producao.md)** | Veios narrativos (8 fios) + Métodos | ✅ Sempre |
| **[workflow-genesis.md](workflow-genesis.md)** | Workflow composicional: processar e diagramar | ✅ Sempre |
| **[fio-narrativo-genesis-arquiteto.md](fio-narrativo-genesis-arquiteto.md)** | Relação GENESIS ↔ Arquiteto (atravessa saga) | ✅ Sempre |
| **[referencias/personagem.md](referencias/personagem.md)** | Egri, Stanislavski, Jung — template de ficha | ✅ Sempre |
| **[referencias/estilos.md](referencias/estilos.md)** | 8 estilos narrativos + regras de variação | ✅ Sempre |
| **[referencias/sinestesia.md](referencias/sinestesia.md)** | Paletas por memória + sentidos indiretos | ✅ Sempre |
| **[referencias/arco-genesis.md](referencias/arco-genesis.md)** | Estados por livro + indicadores de progressão | ✅ Sempre |

---

## Arquivos por Livro

| Arquivo | Função |
|---------|--------|
| `README.md` | **SSOT do livro**: estrutura, blocos, links para METAs/MEMÓRIAs |
| `_status.md` | **Status de produção**: contadores, próximo, notas de sessão |
| `memoria-XX-autor-meta.md` | META: especificação antes de produzir |
| `memoria-XX-autor.md` | MEMÓRIA: narrativa produzida |

---

## Regra de Ouro

> **Variação sistemática, não aleatória.**
>
> Cada escolha (estilo, paleta, foco) deve ser justificável pela função narrativa.

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-21 | Criação inicial |
| 2.0 | 2025-12-22 | Refatoração completa |
| 3.0 | 2025-12-23 | Alinhamento com O_LIMIAR v4.0 |
| 4.0 | 2025-12-23 | Adiciona workflow-genesis.md |
| 5.0 | 2025-12-26 | **Bootstrap obrigatório**: todos os arquivos de metodologia são obrigatórios. Clarifica _status.md por livro. |

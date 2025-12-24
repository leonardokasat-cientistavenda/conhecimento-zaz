# Metodologia — Saga "O Limiar"

---

```yaml
saga_id: saga-inteligencia
tipo: metodologia
versao: "3.0"
data: "2025-12-23"
status: Em uso
```

---

## Propósito

Método epistemológico para produção da saga. 

Assim como Aristóteles catalogou a gramática da realidade, este sistema cataloga a gramática da nossa criação.

**Documento Mestre da Saga:** [O_LIMIAR.md](../O_LIMIAR.md)

---

## Ritual de Produção

### Antes de Produzir

```yaml
CARREGAR:
  sempre:
    - ../O_LIMIAR.md                           # Meta mestre da saga
    - epistemologia-producao.md                # Método de produção
  se_existir:
    - ../livro-X/README.md                     # Meta do livro
    - ../livro-X/meta/MN-personagem.md         # Meta da memória específica
  conforme_necessidade:
    - referencias/personagem.md
    - referencias/estilos.md
    - referencias/sinestesia.md
    - referencias/arco-genesis.md
```

### Decidir

Preencher meta-documento (`livro-X/meta/MN-personagem.md`) antes de escrever.

### Produzir

Executar conforme decisões. Não desviar sem atualizar meta.

### Depois

Validar contra meta. Atualizar com aprendizados. Propagar se necessário.

---

## Estrutura

```
saga-inteligencia/
│
├── O_LIMIAR.md                        ← META MESTRE (especificação da saga)
│
├── metodologia/                       ← COMO PRODUZIR (este diretório)
│   ├── README.md                         (este arquivo)
│   ├── epistemologia-producao.md         (documento mestre de produção)
│   ├── referencias/
│   │   ├── personagem.md                 (Egri, Stanislavski, Jung)
│   │   ├── estilos.md                    (Catálogo de 8 estilos)
│   │   ├── sinestesia.md                 (Paletas e sentidos indiretos)
│   │   └── arco-genesis.md               (Estados por livro)
│   └── _v0/                              (arquivos deprecados)
│
└── livro-X/                           ← CADA LIVRO
    ├── README.md                         (meta do livro)
    ├── meta/                             (meta por memória)
    │   ├── M1-personagem.md
    │   ├── M2-personagem.md
    │   └── ...
    └── memorias/                         (narrativa)
        ├── M1-personagem.md
        ├── M2-personagem.md
        └── ...
```

---

## Documento Mestre

**[epistemologia-producao.md](epistemologia-producao.md)**

Contém:
- **Parte I**: Veios Narrativos (8 fios que atravessam a saga)
- **Parte II**: Métodos (técnicas de construção)
- **Parte III**: Processo (ritual passo a passo)

---

## Referências

| Documento | Conteúdo |
|-----------|----------|
| [referencias/personagem.md](referencias/personagem.md) | Egri, Stanislavski, Jung — template de ficha |
| [referencias/estilos.md](referencias/estilos.md) | 8 estilos narrativos + regras de variação |
| [referencias/sinestesia.md](referencias/sinestesia.md) | Paletas por memória + sentidos indiretos |
| [referencias/arco-genesis.md](referencias/arco-genesis.md) | Estados por livro + indicadores de progressão |

---

## Onde Ficam os Meta-Documentos

A partir da v4.0, meta-documentos por memória ficam **dentro de cada livro**:

| Livro | Local dos Meta |
|-------|----------------|
| L1 Epistemologia | `livro-1-escada/meta/` |
| L2 Propósito | `livro-2-proposito/meta/` |
| L3 Autopoiese | `livro-3-autopoiese/meta/` |
| ... | ... |

Isso permite que cada livro seja auto-contido.

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
| 2.0 | 2025-12-22 | Refatoração completa: documento mestre + referências + meta |
| 3.0 | 2025-12-23 | Alinhamento com O_LIMIAR v4.0: meta por livro, não centralizado |

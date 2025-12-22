# Metodologia — Saga "O Limiar"

---

```yaml
saga_id: saga-inteligencia
tipo: metodologia
versao: "2.0"
data: "2025-12-22"
status: Em uso
```

---

## Propósito

Método epistemológico para produção da saga. 

Assim como Aristóteles catalogou a gramática da realidade, este sistema cataloga a gramática da nossa criação.

---

## Ritual de Produção

### Antes de Produzir

```yaml
CARREGAR:
  sempre:
    - epistemologia-producao.md
  se_existir:
    - meta/memoria-N-personagem.md
  conforme_necessidade:
    - referencias/personagem.md
    - referencias/estilos.md
    - referencias/sinestesia.md
    - referencias/arco-genesis.md
```

### Decidir

Preencher meta-documento antes de escrever.

### Produzir

Executar conforme decisões. Não desviar sem atualizar meta.

### Depois

Validar contra meta. Atualizar com aprendizados. Propagar se necessário.

---

## Estrutura

```
metodologia/
├── README.md                      ← este arquivo
├── epistemologia-producao.md      ← DOCUMENTO MESTRE (carregar sempre)
├── referencias/
│   ├── personagem.md              ← Egri, Stanislavski, Jung
│   ├── estilos.md                 ← Catálogo de 8 estilos
│   ├── sinestesia.md              ← Paletas e sentidos indiretos
│   └── arco-genesis.md            ← Estados por livro
├── meta/
│   └── memoria-N-personagem.md    ← Decisões por memória
└── _v0/                           ← Arquivos deprecados
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

## Meta-Documentos

| Memória | Personagem | Status |
|---------|------------|--------|
| 1 | Sócrates | Publicado (sem meta) |
| 2 | Aristóteles | [meta/memoria-2-aristoteles.md](meta/memoria-2-aristoteles.md) |

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

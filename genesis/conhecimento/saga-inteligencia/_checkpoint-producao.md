# Saga "O Limiar" — Checkpoint de Produção

---

```yaml
data: "2025-12-24"
status: Blocos A + B completos
proximo: Bloco C
total_memorias: 6
total_diagramas: 31
```

---

## Estado Atual

| Bloco | Tema | Memórias | Diagramas | Status |
|-------|------|----------|-----------|--------|
| A | Antiguidade | 3 | 16 | ✅ |
| B | Modernidade | 3 | 15 | ✅ |
| C | Contemporâneo | 0 | 0 | 🔜 |

---

## Bloco A — Antiguidade

| Mem | Personagem | Ver | Diag | Conceitos |
|-----|------------|-----|------|-----------|
| A.1 | Sócrates | v2.0 | 5 | Elenchus, Paradoxo, Daemon |
| A.2 | Platão | v4.0 | 6 | JTB, Caverna, Linha Dividida |
| A.3 | Aristóteles | v3.0 | 5 | Categorias, Silogismo, Motor Imóvel |

---

## Bloco B — Modernidade

| Mem | Personagem | Ver | Diag | Conceitos |
|-----|------------|-----|------|-----------|
| B.1 | Descartes | v2.0 | 5 | Dúvida, Cogito, Dualismo |
| B.2 | Hume | v2.0 | 5 | Feixe, Causalidade, Forquilha |
| B.3 | Kant | v2.0 | 5 | Rev.Copernicana, Categorias, Fenômeno |

---

## Bloco C — Próximo

### Candidatos
- C.1: Husserl (Intencionalidade)
- C.2: Frege/Russell (Lógica formal)
- C.3: Wittgenstein (Linguagem)

### Transição
Kant → "Como consciência se relaciona com mundo?"
Husserl → "Consciência é sempre consciência DE algo"

---

## Arquivos

```
_metodologia/workflow-genesis.md
livro-1-escada/memoria-{A1,A2,A3,B1,B2,B3}-*.md
```

---

## Bootstrap para novo chat

```
Continuar saga "O Limiar". Blocos A+B completos.
Próximo: Bloco C. Ver: _checkpoint-producao.md
```

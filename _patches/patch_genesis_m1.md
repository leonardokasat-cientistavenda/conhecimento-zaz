# Patch: GENESIS M1 - Remover redundâncias com Epistemologia

## Arquivo Alvo
`genesis/GENESIS.md`

## Operação 1: Substituir seção 2.1 Fundamentos

### FIND
```
### 2.1 Fundamentos

| Conceito | Teoria | Aplicação no GENESIS |
|----------|--------|----------------------|
| **Cognição Distribuída** | Hutchins (1995) | Cognição não está só na mente, está no sistema Humano+LLM+Sistema |
| **Entropia** | Shannon (1948) | Estrutura explícita reduz incerteza e degradação |
| **Autopoiesis** | Maturana & Varela (1980) | Sistema se autoproduz e gera outros (Meta Sistemas) |
| **Bootstrap** | Computer Science | STUB quebra dependência circular; refatora depois |
| **Composição** | SOLID Principles | Módulos opcionais, não forçados |
```

### REPLACE
```
### 2.1 Fundamento Central

| Conceito | Teoria | Aplicação no GENESIS |
|----------|--------|----------------------|
| **Cognição Distribuída** | Hutchins (1995) | Cognição não está só na mente, está no sistema Humano+LLM+Sistema |

> **Nota:** Conceitos de método (Entropia, Autopoiesis, Fractais, Composição) pertencem à Epistemologia. GENESIS usa apenas Cognição Distribuída como fundamento do propósito.
```

## Operação 2: Atualizar versão no frontmatter

### FIND
```
versao: "1.0"
```

### REPLACE
```
versao: "1.1"
```

## Operação 3: Atualizar título

### FIND
```
# GENESIS v1.0
```

### REPLACE
```
# GENESIS v1.1
```

## Operação 4: Atualizar histórico

### FIND
```
| 1.0 | 2025-12-05 | **PUBLICAÇÃO** - Refatoração completa M0-M4. Propósito explícito (Inteligência Híbrida). Sprint S005-G concluída. |
```

### REPLACE
```
| 1.0 | 2025-12-05 | **PUBLICAÇÃO** - Refatoração completa M0-M4. Propósito explícito (Inteligência Híbrida). Sprint S005-G concluída. |
| 1.1 | 2025-12-05 | **FAXINA** - M1 enxugado: apenas Cognição Distribuída. Conceitos de método movidos para Epistemologia. Redução de redundância. |
```

## Operação 5: Atualizar Referências Externas

### FIND
```
### Externas

| Fonte | Conceito |
|-------|----------|
| Hutchins (1995) | Cognição Distribuída |
| Shannon (1948) | Entropia |
| Maturana & Varela (1980) | Autopoiesis |
```

### REPLACE
```
### Externas

| Fonte | Conceito |
|-------|----------|
| Hutchins (1995) | Cognição Distribuída |

> **Nota:** Referências de método (Shannon, Maturana & Varela, Mandelbrot, SOLID) estão na Epistemologia.
```

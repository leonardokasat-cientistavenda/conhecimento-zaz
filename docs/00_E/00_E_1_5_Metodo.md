---
nome: 00_E_1_5_Metodo
versao: "3.0"
tipo: Classe
classe_ref: Classe
origem: interno
status: Deprecated
deprecated_by: 00_E_1_4_Classe
deprecated_date: 2025-12-04
---

# Metodo v3.0 (DEPRECATED)

> ⚠️ **DEPRECATED**: Este documento foi absorvido por **00_E_1_4_Classe v3.1**.
> 
> Métodos agora são definidos como subtipo dentro de Classe.
> Ver seção 4.5 de Classe.md para especificação de métodos.

---

## Motivo da Depreciação

| Campo | Valor |
|-------|-------|
| **Sintoma** | Duplicação de conceitos entre Metodo.md e Classe.md |
| **Causa** | Classe v3.0 já define métodos completamente (I/O tipado, subtipos) |
| **Decisão** | Absorver Metodo em Classe; marcar como deprecated |
| **Data** | 2025-12-04 |
| **Sprint** | S004-E T5 |

---

## Migração

Para definir métodos, use a estrutura em **00_E_1_4_Classe.md**:

```markdown
### X.X nomeMetodo(input: Tipo): Output

| Campo | Valor |
|-------|-------|
| Input | tipo: Classe |
| Output | Classe |
| Pré-condição | ... |
| Pós-condição | ... |
```

---

## Conteúdo Original (Arquivado)

O conteúdo original está preservado abaixo para referência histórica.

<details>
<summary>Ver conteúdo original v2.1</summary>

### Definição Original

Metodo era a classe que estruturava ações com input e output tipados (M3).

### Atributos Originais

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| nome | string | Verbo infinitivo + objeto |
| objeto_ref | Objeto | Objeto que especifica |
| input | Classe | Tipo de entrada |
| output | Classe | Tipo de saída |
| descricao | string | O que faz |
| submetodos | Submetodo[] | Etapas internas |

</details>

---

## Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_4_Classe | **Substitui este documento** |
| 00_E_Epistemologia | Pai |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2024-11-27 | - | Criação |
| 2.0 | 2025-12-03 | - | Reestruturação M3 |
| 2.1 | 2025-12-03 | 23:15 | Instruções diagrama |
| 3.0 | 2025-12-04 | 13:25 | **DEPRECATED** - Absorvido por Classe v3.1. S004-E T5. |

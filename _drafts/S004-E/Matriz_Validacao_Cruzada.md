---
nome: Matriz_Validacao_Cruzada
versao: "1.0"
tipo: Analise
sprint_ref: S004-E
status: Draft
---

# Matriz de Validação Cruzada n:n

## 1. Objetivo

Identificar gaps de consistência entre os 5 documentos filhos de Epistemologia através de validação cruzada bidirecional.

---

## 2. Padrão de Referência

### 2.1 Documento v3.0 - Padrão Ouro

| Critério | Especificação |
|----------|---------------|
| **Estrutura** | 6 seções: Problema(M0), Marco(M1), Objeto(M2), Classe(M3), Referências, Histórico |
| **Diagrama-first** | Toda seção tem diagrama; prosa contextualiza |
| **Frontmatter** | nome, versao, tipo, status |
| **Seção (subtipo)** | nome + diagrama(obrigatório) + contexto(opcional) |
| **Separação concerns** | Documento(O QUE) ≠ GitHub(COMO) ≠ Diagrama(COMO visualizar) |

### 2.2 Classe v3.0 - Segundo Padrão

| Critério | Especificação |
|----------|---------------|
| **Marco POO** | 4 pilares, 5 relações, SOLID |
| **Atributos** | Tipo, Card., Visib., Obrig., Descrição |
| **Métodos** | Input/Output tipados |
| **Restrições** | Código R1, R2... com validação |

---

## 3. Matriz n:n - Estrutura

### Legenda

| Símbolo | Significado |
|---------|-------------|
| ✅ | Consistente |
| ⚠️ | Gap parcial (ajuste menor) |
| ❌ | Gap crítico (requer revisão) |
| ➖ | N/A (não aplicável) |

---

## 4. PROBLEMA v2.1 contra outros

### 4.1 Problema → Documento v3.0

| Critério Documento | Estado em Problema | Gap |
|--------------------|-------------------|-----|
| 6 seções M0-M3 | 7 seções (Definição, Marco, Atributos, Restrições, Fluxo, Instrução, Referências) | ⚠️ Numeração diferente, sem M2 explícito |
| Diagrama-first | 4 diagramas (Signo, Caixa POO, Fluxo) | ✅ |
| Seção = subtipo | Não declarado explicitamente | ⚠️ |
| Frontmatter completo | nome, versao, tipo, status | ✅ |
| Separação concerns | Referencia Diagrama.md e Documento.md | ✅ |

### 4.2 Problema → Marco Teórico

| Critério | Estado | Gap |
|----------|--------|-----|
| Cita M1 como próximo? | Seção 7: "00_E_1_2_MarcoTeorico - Próximo (M1)" | ✅ |
| Glossário alinha? | Problema define significantes; Marco usa conceitos | ✅ |
| Termos consistentes? | "Signo, Significante, Significado" em ambos | ✅ |

### 4.3 Problema → Objeto

| Critério | Estado | Gap |
|----------|--------|-----|
| Cita M2? | Não cita Objeto diretamente | ⚠️ Falta referência bidirecional |
| Atributos problema_ref em Objeto? | Objeto tem problema_ref | ✅ |

### 4.4 Problema → Classe

| Critério | Estado | Gap |
|----------|--------|-----|
| Herda de Classe? | frontmatter: classe_ref: Classe | ✅ |
| Segue estrutura Classe? | Atributos, Restrições, Métodos | ✅ |
| Tabela atributos com visibilidade? | Não tem coluna Visib. | ⚠️ |

---

## 5. MARCO TEÓRICO v2.1 contra outros

### 5.1 MarcoTeorico → Documento v3.0

| Critério Documento | Estado em MarcoTeorico | Gap |
|--------------------|------------------------|-----|
| 6 seções M0-M3 | 8 seções (Definição, Atributos, Restrições, Métodos 4x, Fluxo, Instrução, Ref) | ⚠️ Mais seções, sem M0 explícito |
| Diagrama-first | 3 diagramas (Caixa POO, Fluxos 2x) | ✅ |
| Seção = subtipo | 3 subtipos definidos (Conceito, Fonte, ReferenciaConceitual) | ✅ |
| Frontmatter | Completo | ✅ |

### 5.2 MarcoTeorico → Problema

| Critério | Estado | Gap |
|----------|--------|-----|
| Cita M0? | "00_E_1_1_Problema - Anterior (M0) - input" | ✅ |
| problema_ref obrigatório? | Atributo definido como Card. 1 | ✅ |
| Fluxo mostra conexão? | Diagrama mostra Problema → M1 | ✅ |

### 5.3 MarcoTeorico → Objeto

| Critério | Estado | Gap |
|----------|--------|-----|
| Cita M2? | "00_E_1_3_Objeto - Próximo (M2) - output" | ✅ |
| Método gerarObjeto()? | Presente | ✅ |

### 5.4 MarcoTeorico → Classe

| Critério | Estado | Gap |
|----------|--------|-----|
| Herda de Classe? | classe_ref: Classe | ✅ |
| Tabela atributos completa? | Tipo, Card., Obrig. mas SEM Visib. | ⚠️ |
| Métodos com I/O? | Tabelas Input/Output | ✅ |

---

## 6. OBJETO v2.1 contra outros

### 6.1 Objeto → Documento v3.0

| Critério Documento | Estado em Objeto | Gap |
|--------------------|------------------|-----|
| 6 seções M0-M3 | 11 seções (Definição, Marco, Atributos, UML, Escopo, Contextual, Restrições, Métodos, Tipos, Instrução, Referências) | ⚠️ Muitas seções, estrutura diferente |
| Diagrama-first | 5 diagramas (UML, Escopo/Venn, Contextual, Fluxos) | ✅ |
| Seção = subtipo | Não declarado | ⚠️ |

### 6.2 Objeto → Problema

| Critério | Estado | Gap |
|----------|--------|-----|
| Cita M0? | "problema_ref: Problema [1]" | ✅ |
| Usa termos de Problema? | "glossário validado (M0)" | ✅ |
| Ref bidirecional? | "00_E_1_1_Problema - Anterior (M0)" | ✅ |

### 6.3 Objeto → MarcoTeorico

| Critério | Estado | Gap |
|----------|--------|-----|
| Cita M1? | "marco_ref: MarcoTeorico [1]" | ✅ |
| Usa conceitos de M1? | "conceitos operacionais (M1)" | ✅ |
| conceitos_usados[]? | Atributo definido | ✅ |

### 6.4 Objeto → Classe

| Critério | Estado | Gap |
|----------|--------|-----|
| Herda de Classe? | classe_ref: Classe | ✅ |
| Método gerarClasses()? | "gerarClasses(): Classe[]" | ✅ |
| Tabela atributos? | Tipo, Card., Obrig. mas SEM Visib. | ⚠️ |

---

## 7. CLASSE v3.0 contra outros

### 7.1 Classe → Documento v3.0

| Critério Documento | Estado em Classe | Gap |
|--------------------|------------------|-----|
| 6 seções M0-M3 | 9 seções (Definição, Marco POO, Atributos, Restrições, Métodos, Ciclo Vida, Herança, Instrução, Referências) | ⚠️ Sem M0-M2 explícitos |
| Diagrama-first | 3 diagramas (Caixa POO, Fluxo, Árvore) | ✅ |
| Seção = subtipo | 3 subtipos (Atributo, Restricao, Relacao) | ✅ |

### 7.2 Classe → Problema

| Critério | Estado | Gap |
|----------|--------|-----|
| Não aplica M0 recursivo | Classe define COMO criar classes, não resolve um problema próprio | ➖ Meta-nível diferente |
| Lista Problema como filho | "00_E_1_1_Problema - Filho (herda)" | ✅ |

### 7.3 Classe → MarcoTeorico

| Critério | Estado | Gap |
|----------|--------|-----|
| Marco teórico próprio | Seção 2 completa (POO, SOLID) | ✅ |
| Lista MarcoTeorico como filho | "00_E_1_2_MarcoTeorico - Filho (herda)" | ✅ |

### 7.4 Classe → Objeto

| Critério | Estado | Gap |
|----------|--------|-----|
| Lista Objeto como filho | "00_E_1_3_Objeto - Filho (herda)" | ✅ |
| Recebe de Objeto | "gerarClasses(): Classe[] - recebe de M2" | ✅ |

---

## 8. DOCUMENTO v3.0 contra outros

### 8.1 Documento → Problema

| Critério | Estado | Gap |
|----------|--------|-----|
| M0 próprio? | Seção 1 completa (Sintoma, Glossário, Causa, Necessidade) | ✅ |
| Segue estrutura de Problema? | Usa significantes/glossário | ✅ |

### 8.2 Documento → MarcoTeorico

| Critério | Estado | Gap |
|----------|--------|-----|
| M1 próprio? | Seção 2 completa (7 conceitos com teoria e aplicação) | ✅ |
| Fontes externas? | Shannon, Hick-Hyman, SOLID, SemVer | ✅ |

### 8.3 Documento → Objeto

| Critério | Estado | Gap |
|----------|--------|-----|
| M2 próprio? | Seção 3 completa (Escopo, Fronteiras, Diagrama) | ✅ |
| Critérios verificáveis? | Implícitos nos tipos de documento | ⚠️ |

### 8.4 Documento → Classe

| Critério | Estado | Gap |
|----------|--------|-----|
| M3 próprio? | Seção 4 completa (Diagrama de Classe, Métodos) | ✅ |
| Herda de Classe? | classe_ref: Classe | ✅ |
| Tabela atributos com visibilidade? | Não, usa # inline | ⚠️ |

---

## 9. MATRIZ CONSOLIDADA

```
┌─────────────┬────────────┬────────────┬────────────┬────────────┬────────────┐
│             │  Problema  │   Marco    │   Objeto   │   Classe   │  Documento │
│             │   v2.1     │   v2.1     │   v2.1     │   v3.0     │   v3.0     │
├─────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│  Problema   │     ➖     │     ✅     │     ⚠️     │     ⚠️     │     ⚠️     │
│             │            │ ref ok     │ falta ref  │ falta visib│ struct dif │
├─────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│  Marco      │     ✅     │     ➖     │     ✅     │     ⚠️     │     ⚠️     │
│             │ ref ok     │            │ ref ok     │ falta visib│ struct dif │
├─────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│  Objeto     │     ✅     │     ✅     │     ➖     │     ⚠️     │     ⚠️     │
│             │ ref ok     │ ref ok     │            │ falta visib│ struct dif │
├─────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│  Classe     │     ✅     │     ✅     │     ✅     │     ➖     │     ⚠️     │
│             │ herança ok │ herança ok │ herança ok │            │ struct dif │
├─────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│  Documento  │     ✅     │     ✅     │     ⚠️     │     ⚠️     │     ➖     │
│             │ M0 ok      │ M1 ok      │ criterios? │ falta visib│            │
└─────────────┴────────────┴────────────┴────────────┴────────────┴────────────┘
```

---

## 10. GAPS IDENTIFICADOS

### 10.1 Gaps Estruturais (afetam todos)

| Gap | Descrição | Impacto | Ação |
|-----|-----------|---------|------|
| **G1** | Estrutura de seções inconsistente | Não segue template de Documento v3.0 | Padronizar em 6 seções M0-M4 |
| **G2** | Tabela atributos sem Visibilidade | Viola Classe v3.0 | Adicionar coluna Visib. |
| **G3** | Problema v2.1 não cita Objeto | Ref bidirecional incompleta | Adicionar em Referências |

### 10.2 Gaps por Arquivo

| Arquivo | Gaps | Prioridade |
|---------|------|------------|
| Problema v2.1 | G1, G2, G3 | Alta |
| MarcoTeorico v2.1 | G1, G2 | Alta |
| Objeto v2.1 | G1, G2 | Alta |
| Classe v3.0 | G1 (sem M0-M2 explícitos) | Média |
| Documento v3.0 | G2 (visibilidade inline) | Baixa |

---

## 11. ANÁLISE DE REDUNDÂNCIA (preparação para Epistemologia)

### 11.1 Conceitos Repetidos

| Conceito | Aparece em | Redundante? | Ação |
|----------|------------|-------------|------|
| Signo/Significante/Significado | Problema | Não | Único lugar correto |
| POO/Herança/Encapsulamento | Classe | Não | Único lugar correto |
| Lifecycle/M0-M4 | Documento | Não | Único lugar correto |
| Escopo/Fronteiras | Objeto | Não | Único lugar correto |

### 11.2 Instruções Repetidas

| Instrução | Aparece em | Redundante? | Ação |
|-----------|------------|-------------|------|
| "Ver 00_E_1_4_1_Diagrama.md" | Todos | ✅ Correto | SSOT mantido |
| "Ver 00_E_1_6_Documento.md" | Todos | ✅ Correto | SSOT mantido |
| Checklist de criação | Cada arquivo | ⚠️ Parcial | Verificar se idênticos |

### 11.3 Conclusão Preliminar

| Aspecto | Estado |
|---------|--------|
| **SSOT** | ✅ Cada conceito em único lugar |
| **Referências** | ⚠️ Alguns gaps bidirecionais |
| **Estrutura** | ❌ Inconsistente (maior gap) |

---

## 12. PRÓXIMOS PASSOS

| Prioridade | Ação | Task |
|------------|------|------|
| 1 | Padronizar Problema → 6 seções M0-M4 + Visibilidade | T1 |
| 2 | Padronizar MarcoTeorico → 6 seções + Visibilidade | T2 |
| 3 | Padronizar Objeto → 6 seções + Visibilidade | T3 |
| 4 | Verificar Classe → Adicionar M0-M2 se necessário | T4 |
| 5 | Verificar Documento → Visibilidade em tabela formal | T4 (cont.) |
| 6 | Criar Epistemologia v3.0 → M0-M4 completo | T7 |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-04 | 12:45 | Criação. Matriz n:n completa. 3 gaps estruturais identificados. |

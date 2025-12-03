---
nome: M0_Diagramas
versao: \"1.0\"
tipo: Classe
classe_ref: Problema
origem: interno
status: Draft
etapa: M0
data_inicio: 2025-12-03
---

# M0: Problema - Modelagem de Diagramas

## 1. Definição

Problema no framework epistemológico de comunicação visual: precisamos de um **sistema de classificação + seleção de diagramas** que determine qual tipo de diagrama usar em cada etapa do método M0-M4, para diferentes audiências, garantindo consistência visual e clareza de comunicação.

---

## 2. Sintoma (Observado)

Diagramas usados em GENESIS.md, 00_E_1_1_Problema.md, 00_E_Epistemologia.md e outros documentos variam em:
- Estilo visual (caixas POO vs. fluxos vs. diagramas de signo)
- Ausência de critério explícito para escolha
- Resultado: Inconsistência visual e potencial confusão de audiência

**Impacto:** Usuários (incluindo Claude) perdem tempo interpretando qual diagrama é mais apropriado para cada contexto, reduzindo clareza e aumentando revisões.

---

## 3. Significantes (Análise Semiótica)

| Significante | Significado Proposto | Ambiguidade Identificada | Resolução |
|--------------|---------------------|--------------------------|-----------|
| **diagrama** | Representação visual estruturada de conceito | Tipo específico (classe? fluxo? dependência?) vs. termo genérico | **Definir taxonomia:** Diagrama de Estrutura, Fluxo, Dependência, Semiótica, Contexto |
| **etapa do processo** | Ponto no método M0-M4 onde diagrama aparece | Qual nível? (M0 inteiro? Subfase dentro de M0?) | **Mapear:** Cada tipo de diagrama → Etapa(s) aplicável(is) |
| **melhor diagrama** | Escolha mais eficaz para comunicar | "Melhor" por qual critério? (simplicidade? precisão? audiência?) | **Definir heurística:** Critérios explícitos de seleção |
| **contexto** | Situação onde diagrama é apresentado | Contexto para quem? (desenvolvedores? gestores? pesquisadores?) | **Tipos de audiência:** Técnico, Estratégico, Aprendiz |
| **mapeamento** | Ação de documentar estrutura/fluxo/relações | Mapear o quê? Estrutura? Fluxo? Dependências? | **Especificar objetivo:** O que o diagrama comunica? |

---

## 4. Glossário (Definições Contextualizadas)

| Termo | Definição no Contexto | Referência |
|------|----------------------|-----------|
| **Diagrama** | Representação visual de conceitos, estruturas ou processos usando convenções gráficas padronizadas | UML, Linguística Visual |
| **Significante Visual** | Forma gráfica (caixa, seta, círculo, etc.) que representa um conceito | Semiótica de Peirce/Saussure |
| **Audiência** | Grupo de usuários interpretando o diagrama (técnicos, gestores, aprendizes) | Design Thinking |
| **Etapa M0-M4** | Fase do método epistemológico onde diagrama é aplicado | GENESIS.md |
| **Taxonomia** | Sistema de classificação hierárquico de tipos de diagrama | Biologia, Ontologia |
| **Heurística** | Regra ou critério prático para seleção rápida | Engenharia |

---

## 5. Causa Raiz

**Falta de meta-sistema para diagramação:**

O framework epistemológico (M0-M4) estrutura como gerar **conhecimento** (conceitos, classes, métodos), mas não estrutura como **comunicar visualmente** esse conhecimento através de diagramas.

Resultado: Cada documento improvisa, gerando inconsistência.

---

## 6. Tentativas Anteriores

1. **GENESIS.md (v0.1-0.7):** Usa caixa POO + fluxo simples. Sem justificativa de escolha.
2. **00_E_1_1_Problema.md (v1.0-2.0):** Adiciona diagrama de Signo (Saussure). Variação sem padrão.
3. **00_E_Epistemologia.md (v2.0-2.2):** Fluxo linear (M0→M1→M2→...). Novamente, sem sistema explícito.

**Resultado:** 3 estilos diferentes sem critério unificador.

---

## 7. Necessidade

Criar um **sistema de modelagem de diagramas** que:

1. **Categorize tipos** de diagrama (Estrutura, Fluxo, Dependência, Semiótica, Contexto, etc.)
2. **Defina critérios de seleção** (Qual tipo para qual etapa? Qual audiência?)
3. **Padronize convenções** (Símbolos, cores, texto, legenda)
4. **Seja aplicável recursivamente** (O próprio sistema pode ser documentado via diagrama)
5. **Seja persistido como Classe** (00_E_X_X_Diagrama.md) para reutilização

---

## 8. Contexto

- **Domínio:** Framework Epistemológico (GENESIS, Camada 3)
- **Usuários:** Desenvolvedores do framework, usuários finais consultando documentação
- **Restrição:** Usar Markdown + ASCII art (sem ferramentas gráficas externas)
- **Objetivo adicional:** Demonstrar aplicação recursiva do método M0-M4 a um meta-problema (Como diagramar vs. O que diagramar)

---

## 9. Impacto (Se não resolver)

- Novos documentos continuarão usando diagramas inconsistentes
- Usuários perderão tempo interpretando qual diagrama representa qual conceito
- Qualidade da comunicação visual degrada conforme framework cresce
- Impossível escalar para Domínios (Camada 4: Mercado, Produto, etc.)

---

## 10. Estrutura Proposta (M1 em diante)

```
M0 (Este documento)
  ↓
M1 (Marco Teórico)
  - Pesquisar: Tipos de diagramas (UML, arquitetura, fluxos)
  - Pesquisar: Semiótica visual (significante gráfico → conceito)
  - Pesquisar: Modelos mentais por audiência
  ↓
M2 (Definir Objeto: Diagrama)
  - Nome: Diagrama (classe visual)
  - Escopo: Representações de conceitos/estruturas/fluxos
  - Fronteiras: Não cobre geração automática; apenas estrutura manual
  ↓
M3 (Especificar POO)
  - Classe: Diagrama (tipos, atributos, métodos)
  - Classes relacionadas: TipoDiagrama, Elemento, Convenção
  ↓
M4 (Persistir)
  - Documento: 00_E_X_X_Diagrama.md com tipos + heurística
```

---

## 11. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_Epistemologia.md | Contexto (framework) |
| 00_E_1_1_Problema.md | Classe base (M0) |
| 00_E_1_4_Classe.md | Próximo (M3) |
| 00_E_1_6_Documento.md | Persistência (M4) |
| GENESIS.md | Exemplo de diagramas atuais |

---

## 12. Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 15:30 | Criação. M0 completo com sintoma, significantes, glossário, causa raiz, necessidade. Sprint S003-E T2. |
"
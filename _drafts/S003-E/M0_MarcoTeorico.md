---
nome: M0_MarcoTeorico
versao: "1.0"
tipo: Classe
classe_ref: Problema
origem: interno
status: Draft
etapa: M0
data_inicio: 2025-12-03
---

# M0: Problema - MarcoTeórico

## 1. Definição

Problema no framework epistemológico: a classe MarcoTeórico existe em versão superficial e não aplica recursivamente o próprio framework (Saussure, diagramas, ciclo de vida). Precisamos aprofundar a definição, criar método de pesquisa e garantir consistência com as demais classes.

---

## 2. Sintoma (Observado)

A classe `00_E_1_2_MarcoTeorico.md` foi criada como placeholder na Sprint S002-E. Não passou pelo método M0-M4 de forma rigorosa.

**Problemas identificados:**
- Falta clareza sobre **o que é** marco teórico (definição precisa)
- Não define **como buscar** conhecimento (método de pesquisa)
- Não especifica **onde buscar** (ontologia interna vs. conhecimento externo)
- Não explica **como integrar** o resultado no fluxo M0→M1→M2

**Impacto:** Usuários (incluindo Claude) não sabem como executar M1 de forma sistemática, resultando em pesquisas ad-hoc e inconsistentes.

---

## 3. Significantes (Análise Semiótica)

| Significante | Significado Proposto | Ambiguidade Identificada | Resolução |
|--------------|---------------------|--------------------------|-----------|
| **marco teórico** | Fundamentação conceitual para resolver problema | É só pesquisa bibliográfica? Inclui ontologia interna? | **Duas fontes:** interna (ontologia) + externa (conhecimento comum) |
| **pesquisar** | Buscar conhecimento relevante | Pesquisar onde? Como? Até quando? | **Método:** definir fontes, critérios, parada |
| **fundamentar** | Dar base conceitual | Base para quê? Para quem? | **Output:** conceitos + fontes que habilitam M2 (Objeto) |
| **resolver** | Encontrar solução para problema | Resolver = implementar? Ou apenas embasar? | **Escopo M1:** embasar, não implementar |

---

## 4. Glossário (Definições Contextualizadas)

| Termo | Definição no Contexto | Referência |
|-------|----------------------|------------|
| **Marco Teórico** | Etapa M1 que busca conhecimento (interno e externo) para fundamentar a resolução do Problema definido em M0 | Epistemologia |
| **Ontologia Interna** | Conhecimento já documentado em `docs/00_O/` - não reinventar | 00_O_Ontologia |
| **Conhecimento Externo** | Fontes fora do sistema (literatura, papers, práticas de mercado) | - |
| **Conceito** | Unidade de conhecimento extraída da pesquisa, com fonte rastreável | Semântica |
| **Fonte** | Origem do conhecimento (documento interno, autor externo, URL) | Epistemologia |

---

## 5. Causa Raiz

**MarcoTeórico não passou pelo próprio método que ensina.**

Sprint S002-E focou em estrutura mínima viável. A classe foi criada como placeholder funcional, mas:
- Sem aplicação recursiva do framework
- Sem método de pesquisa definido
- Sem diagramas
- Sem integração clara com Problema (M0) e Objeto (M2)

---

## 6. Tentativas Anteriores

1. **00_E_1_2_MarcoTeorico.md (v1.x):** Versão inicial com definição básica. Sem método de pesquisa, sem diagramas.

**Resultado:** Classe existe mas não ensina como executar M1.

---

## 7. Necessidade

Aplicar M0-M4 recursivamente em MarcoTeórico para:

1. **Definir o que É** marco teórico (ontologia da classe)
2. **Criar método de pesquisa** com duas fontes:
   - **Interna:** consultar `docs/00_O/` primeiro (não reinventar)
   - **Externa:** buscar conhecimento comum se necessário (atualizar o que sabemos)
3. **Definir output** que habilita M2 (lista de conceitos + fontes)
4. **Adicionar diagramas** conforme Matriz de Seleção
5. **Garantir consistência** com Problema, Objeto, Classe, Documento

---

## 8. Contexto

- **Domínio:** Framework Epistemológico (Camada 3)
- **Usuários:** Desenvolvedores do framework, usuários aplicando M0-M4
- **Restrição:** Método deve ser aplicável tanto por humanos quanto por IA
- **Objetivo adicional:** Demonstrar aplicação recursiva (usar o framework para melhorar o framework)

---

## 9. Impacto (Se não resolver)

- M1 continua sendo executado de forma ad-hoc
- Conhecimento interno (ontologia) é ignorado, reinventando a roda
- Conhecimento externo é buscado sem critério, gerando inconsistência
- Qualidade dos outputs M2-M4 degrada por falta de fundamentação

---

## 10. Estrutura Proposta (M1 em diante)

```
M0 (Este documento) ✅
  ↓
M1 (Marco Teórico)
  - Pesquisar: O que é marco teórico (epistemologia científica)
  - Pesquisar: Métodos de revisão de literatura
  - Consultar: 00_O/ para práticas existentes
  ↓
M2 (Definir Objeto: MarcoTeórico)
  - Nome: MarcoTeórico
  - Escopo: Etapa M1 do framework
  - Fronteiras: Não implementa solução, apenas fundamenta
  ↓
M3 (Especificar POO)
  - Classe: MarcoTeórico (atributos, métodos, restrições)
  - Submétodos: pesquisarInterno(), pesquisarExterno(), sintetizar()
  ↓
M4 (Persistir)
  - Atualizar: 00_E_1_2_MarcoTeorico.md com profundidade
```

---

## 11. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_2_MarcoTeorico.md | Classe a ser aprofundada |
| 00_E_1_1_Problema.md | Classe anterior (M0) |
| 00_E_1_3_Objeto.md | Classe seguinte (M2) |
| Matriz_Selecao_Diagramas.md | Guia para diagramas |
| S003-E.md | Sprint atual |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 15:45 | Criação. M0 completo: sintoma, significantes, glossário, causa raiz, necessidade. |

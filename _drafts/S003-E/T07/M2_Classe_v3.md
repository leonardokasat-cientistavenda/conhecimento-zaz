---
nome: M2_Classe_v3
versao: "1.0"
tipo: Objeto
classe_ref: Objeto
origem: interno
status: Draft
etapa: M2
data_inicio: 2025-12-03
sprint: S003-E
task: T07
problema_ref: M0_Classe_v3
marco_ref: M1_Classe_v3
---

# M2: Objeto - Classe v3.0

## 1. Definição do Objeto

| Campo | Valor |
|-------|-------|
| **nome** | Classe_v3 |
| **problema_ref** | _drafts/S003-E/T07/M0_Classe_v3.md |
| **marco_ref** | _drafts/S003-E/T07/M1_Classe_v3.md |
| **tipo_pesquisa** | Prescritivo |
| **objetivo** | Evoluir 00_E_1_4_Classe para v3.0 incorporando marco teórico POO formal e métodos de descoberta de classes, atributos e métodos |
| **escopo** | Classe Classe do Meta Sistema Epistemológico |
| **fronteiras** | Outras classes (Problema, Objeto, etc.), implementação em linguagem específica, domínios de negócio |
| **conceitos_usados** | Encapsulamento, Herança, Polimorfismo, Composição, Agregação, SOLID, CRC Cards, Noun/Verb Analysis |
| **criterio_sucesso** | 00_E_1_4_Classe v3.0 publicada com: (1) Marco teórico POO, (2) Métodos de descoberta, (3) Relações UML detalhadas |
| **criterio_insucesso** | Documento sem métodos de descoberta OU sem marco teórico POO OU incompatível com Metodo (E_1_5) |

---

## 2. Conexão com M0/M1

### 2.1 De M0 (Problema)

| Campo M0 | Valor | Impacto em M2 |
|----------|-------|---------------|
| Necessidade | POO formal + métodos descoberta | Define escopo |
| Causa Raiz | S002-E mínima | Justifica aprofundamento |
| Glossário | 8 significantes | Termos do objetivo |

### 2.2 De M1 (Marco Teórico)

| Conceito M1 | Aplicação em M2 |
|-------------|-----------------|
| Encapsulamento | Escopo: visibilidade de atributos |
| Herança | Escopo: relação "é-um" |
| Polimorfismo | Escopo: subclasses em métodos |
| Composição/Agregação | Escopo: relações "tem-um" |
| SOLID | Escopo: princípios de validação |
| CRC Cards | Escopo: método identificarClasses() |
| Noun/Verb Analysis | Escopo: métodos descobrirAtributos(), descobrirMetodos() |

---

## 3. Diagrama de Escopo (Círculo)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONTEXTO: META SISTEMA EPISTEMOLÓGICO                │
│                                                                             │
│     FRONTEIRAS (excluído)                    ┌─────────────────────────┐    │
│     ─────────────────────                    │                         │    │
│                                              │   ESCOPO: CLASSE v3.0   │    │
│     ✗ 00_E_1_1_Problema                      │   ─────────────────────  │    │
│     ✗ 00_E_1_2_MarcoTeorico                  │                         │    │
│     ✗ 00_E_1_3_Objeto                        │   ✓ Marco Teórico POO   │    │
│     ✗ 00_E_1_5_Metodo (será sync)            │     - Encapsulamento    │    │
│     ✗ 00_E_1_6_Documento                     │     - Herança           │    │
│     ✗ Implementação Python/Java              │     - Polimorfismo      │    │
│     ✗ Domínios de negócio                    │     - Composição        │    │
│     ✗ UI/Interface                           │     - Agregação         │    │
│                                              │     - SOLID             │    │
│                                              │                         │    │
│                                              │   ✓ Métodos Descoberta  │    │
│                                              │     - identificarClasses│    │
│                                              │     - descobrirAtributos│    │
│                                              │     - descobrirMetodos  │    │
│                                              │     - definirRelacoes   │    │
│                                              │                         │    │
│                                              │   ✓ Diagrama UML        │    │
│                                              │     - Caixa POO         │    │
│                                              │     - Relações          │    │
│                                              │                         │    │
│                                              │   ✓ Instruções          │    │
│                                              │     - Template classe   │    │
│                                              │     - Checklist         │    │
│                                              │                         │    │
│                                              └─────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Diagrama Contextual (Posição no Framework)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRAMEWORK EPISTEMOLÓGICO                          │
│                                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                 │
│  │ M0: Problema │     │ M1: Marco    │     │ M3: Classe   │                 │
│  │              │     │   Teórico    │     │   Método     │                 │
│  │  Glossário   │     │  Conceitos   │     │  Especif.    │                 │
│  └──────┬───────┘     └──────┬───────┘     └──────▲───────┘                 │
│         │                    │                    │                         │
│         │  8 termos          │  8 conceitos       │  output                 │
│         │                    │                    │                         │
│         └────────┬───────────┘                    │                         │
│                  │                                │                         │
│                  ▼                                │                         │
│  ┌───────────────────────────────────────────────┴──────────┐               │
│  │                    M2: OBJETO                            │               │
│  │                    Classe_v3                              │               │
│  ├──────────────────────────────────────────────────────────┤               │
│  │  Recebe:                                                 │               │
│  │  - Glossário M0: Classe, POO, Descoberta, Atributos...   │               │
│  │  - Conceitos M1: Encapsulamento, Herança, SOLID, CRC...  │               │
│  │                                                          │               │
│  │  Produz:                                                 │               │
│  │  - Escopo delimitado (marco teórico + métodos)           │               │
│  │  - Fronteiras claras (não é Problema, Objeto, etc.)      │               │
│  │  - Critérios verificáveis                                │               │
│  └──────────────────────────────────────────────────────────┘               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Escopo Detalhado

### 5.1 O que SERÁ incluído em Classe v3.0

| # | Item | Descrição | Fonte M1 |
|---|------|-----------|----------|
| 1 | **Seção Marco Teórico** | Conceitos POO com definições operacionais | Todos os 8 conceitos |
| 2 | **Atributo visibilidade** | Indicador +/-/# para cada atributo | Encapsulamento |
| 3 | **Relações UML detalhadas** | Herança (──▷), Composição (◆──), Agregação (◇──) | Herança, Composição, Agregação |
| 4 | **Método identificarClasses()** | Descobrir classes em um domínio via CRC | CRC Cards |
| 5 | **Método descobrirAtributos()** | Extrair atributos via Adjective Analysis | Noun/Verb Analysis |
| 6 | **Método descobrirMetodos()** | Extrair métodos via Verb Analysis | Noun/Verb Analysis |
| 7 | **Método definirRelacoes()** | Classificar relações entre classes | Composição, Agregação |
| 8 | **Validação SOLID** | Checklist de princípios | SOLID |
| 9 | **Diagrama Caixa POO** | Atualizado com visibilidade | UML |
| 10 | **Template atualizado** | Com visibilidade e relações | - |

### 5.2 O que NÃO será incluído (Fronteiras)

| # | Item | Razão |
|---|------|-------|
| 1 | Outras classes do framework | Escopo é apenas Classe |
| 2 | Implementação em linguagem | GENESIS é conceitual |
| 3 | Domínios de negócio | Camada 4, fora do escopo |
| 4 | Herança múltipla | Premissa de M1: herança simples |
| 5 | Design patterns específicos | Muito profundo para v3 |

---

## 6. Requisitos

| # | Requisito | Validação |
|---|-----------|-----------|
| R1 | Marco teórico POO presente | Seção 2 existe e tem 8 conceitos |
| R2 | Métodos de descoberta implementados | Seções 6.x com 4 métodos |
| R3 | Visibilidade em atributos | Convenção +/-/# documentada |
| R4 | Diagrama UML com relações | Herança, Composição, Agregação |
| R5 | Compatível com E_1_5_Metodo | Método tem input/output tipados |
| R6 | Template atualizável | Seção INSTRUÇÃO revisada |

---

## 7. Critérios de Sucesso/Insucesso

### 7.1 Critérios de Sucesso

| # | Critério | Como Verificar |
|---|----------|----------------|
| CS1 | Marco teórico POO completo | Seção 2 contém: Encapsulamento, Herança, Polimorfismo, Composição, Agregação |
| CS2 | 4 métodos de descoberta | Seções 6.x: identificarClasses, descobrirAtributos, descobrirMetodos, definirRelacoes |
| CS3 | Visibilidade padronizada | Convenção +/-/# em atributos |
| CS4 | Relações UML documentadas | Tabela com ──▷, ◆──, ◇── |
| CS5 | SOLID como validação | Checklist de princípios |
| CS6 | Sincronizado com E_1_5 | Métodos usam input/output de Metodo |

### 7.2 Critérios de Insucesso

| # | Critério | Impacto |
|---|----------|---------|
| CI1 | Sem marco teórico | T7 não concluída |
| CI2 | Sem métodos de descoberta | T8 não concluída |
| CI3 | Incompatível com Metodo | T11 falha (sync) |
| CI4 | Sem diagrama UML | Documentação incompleta |

---

## 8. Validação de Completude

### 8.1 Checklist M2

- [x] problema_ref aponta para M0 válido (M0_Classe_v3)
- [x] marco_ref aponta para M1 válido (M1_Classe_v3)
- [x] Nome único e descritivo (Classe_v3)
- [x] Tipo de pesquisa definido (Prescritivo)
- [x] Objetivo usa termos de M0/M1
- [x] Escopo lista 10 itens incluídos
- [x] Fronteiras lista 5 itens excluídos
- [x] Escopo e fronteiras não têm interseção
- [x] conceitos_usados lista 8 conceitos de M1
- [x] Critérios de sucesso verificáveis (6 CS)
- [x] Critérios de insucesso verificáveis (4 CI)

### 8.2 Perguntas de Completude

| Pergunta | Resposta |
|----------|----------|
| M3 sabe exatamente o que incluir? | ✅ Sim, 10 itens listados |
| M3 sabe exatamente o que excluir? | ✅ Sim, 5 fronteiras |
| Todos os termos do escopo têm definição? | ✅ Sim, vindos de M1 |
| M3 consegue testar sucesso/insucesso? | ✅ Sim, critérios verificáveis |

**Resultado:** `validarCompletude() == true` → Pronto para M3

---

## 9. Output para M3

### 9.1 Estrutura esperada de 00_E_1_4_Classe v3.0

```
00_E_1_4_Classe v3.0
├── 1. Definição
├── 2. Marco Teórico POO (NOVO)
│   ├── Encapsulamento
│   ├── Herança
│   ├── Polimorfismo
│   ├── Composição
│   ├── Agregação
│   └── SOLID
├── 3. Atributos (com visibilidade)
├── 4. Diagrama UML (com relações)
├── 5. Restrições
├── 6. Métodos (EXPANDIDO)
│   ├── 6.1 identificarClasses()
│   ├── 6.2 descobrirAtributos()
│   ├── 6.3 descobrirMetodos()
│   ├── 6.4 definirRelacoes()
│   ├── 6.5 instanciar()
│   ├── 6.6 validar()
│   └── 6.7 herdar()
├── 7. Relações (NOVO)
│   ├── Herança (──▷)
│   ├── Composição (◆──)
│   └── Agregação (◇──)
├── 8. INSTRUÇÃO (ATUALIZADO)
│   ├── Template com visibilidade
│   ├── Checklist SOLID
│   └── Fluxo de descoberta
├── 9. Referências
└── Histórico
```

---

## 10. Referências

| Documento | Relação |
|-----------|---------|
| M0_Classe_v3.md | Problema de origem |
| M1_Classe_v3.md | Marco teórico |
| 00_E_1_4_Classe v2.0 | Versão atual |
| 00_E_1_3_Objeto | Classe base (este documento) |
| 00_E_1_5_Metodo | Sincronização pendente (T10-T11) |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 21:45 | Criação. Objeto delimitado: escopo (10 itens), fronteiras (5), critérios (6 CS, 4 CI). Diagramas Círculo e Contextual. Output estruturado para M3. |

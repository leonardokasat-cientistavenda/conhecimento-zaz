---
nome: M0_Classe_v3
versao: "1.0"
tipo: Problema
classe_ref: Problema
origem: interno
status: Draft
etapa: M0
data_inicio: 2025-12-03
sprint: S003-E
task: T07
---

# M0: Problema - Classe v3.0

## 1. Sintoma

A classe Classe (00_E_1_4_Classe v2.0) funciona mas é **superficial**:
- Não tem marco teórico fundamentando POO
- Não tem métodos de descoberta (como identificar classes, atributos, métodos)
- A documentação é template genérico, não instrução metodológica
- Falta clareza sobre relações (herança vs composição vs agregação)

---

## 2. Análise Semiótica

### 2.1 Significantes Extraídos

| # | Significante | Contexto de Uso |
|---|--------------|-----------------|
| 1 | Classe | Termo central do documento |
| 2 | POO | Mencionado mas não definido |
| 3 | Descoberta | Processo ausente |
| 4 | Atributos | Lista sem método de identificação |
| 5 | Métodos | Lista sem método de identificação |
| 6 | Herança | Mencionado superficialmente |
| 7 | Composição | Não mencionado |
| 8 | Encapsulamento | Não mencionado |

### 2.2 Glossário

| Significante | Significado no Contexto GENESIS | Ambiguidade Resolvida |
|--------------|--------------------------------|----------------------|
| **Classe** | Molde que define estrutura de objetos. Toda entidade do sistema é instância de uma Classe. | UML Class (conceitual) - não é classe de linguagem específica |
| **POO** | Paradigma de estruturação via encapsulamento, herança, polimorfismo. Marco teórico para M3. | - |
| **Descoberta** | Processo metodológico de identificar entidades do domínio que devem ser modeladas como classes. | Criar método: identificarClasses() |
| **Atributos** | Propriedades que caracterizam o estado de uma classe. | Estado (dados), não comportamento |
| **Métodos** | Ações/comportamentos que a classe executa. Transformam input em output. | Comportamento (verbos), não estado |
| **Herança** | Relação "é-um" (is-a). Subclasse herda atributos e métodos da superclasse. | Usar quando há especialização |
| **Composição** | Relação "tem-um" forte. Parte não existe sem o todo. | Usar quando parte é dependente |
| **Agregação** | Relação "tem-um" fraca. Parte pode existir independente. | Usar quando parte é independente |
| **Encapsulamento** | Ocultar implementação, expor interface. Atributos privados, métodos públicos. | Aplicar via restrições |

---

## 3. Diagrama M0 (Signo + Fluxo)

### 3.1 Diagrama Signo (Ambiguidade Central)

```
┌─────────────────────────────────────────────┐
│                   SIGNO                     │
├─────────────────┬───────────────────────────┤
│   SIGNIFICANTE  │        SIGNIFICADO        │
│                 │                           │
│    "Classe"     │  ┌─ UML Class (conceito)  │ ← GENESIS usa este
│                 │  ├─ Python class          │
│                 │  ├─ Java Class            │
│                 │  └─ Classe social         │
└─────────────────┴───────────────────────────┘
                  │
                  ▼
         Resolução: Classe = Molde POO
         conceitual (não linguagem específica)
```

### 3.2 Diagrama Fluxo M0

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLUXO M0: CLASSE                            │
└─────────────────────────────────────────────────────────────────┘

Sintoma: "Classe v2.0 superficial"
       │
       ▼
┌─────────────────────┐
│ Extrair Significantes│ ──► Classe, POO, Descoberta, Atributos,
└─────────────────────┘     Métodos, Herança, Composição, Encapsulamento
       │
       ▼
┌─────────────────────┐
│ Mapear Significados │ ──► Glossário (Seção 2.2)
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Detectar Ambiguidade│ ──► "Classe" tem múltiplos significados
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Resolver: Classe   │ ──► Classe = Molde POO conceitual (UML)
│  = UML Class        │
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Definir Causa Raiz │ ──► S002-E focou em estrutura mínima
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│ Definir Necessidade │ ──► Aplicar M0-M4 recursivo com POO
└─────────────────────┘
       │
       ▼
Problema Definido → Input para M1
```

---

## 4. Causa Raiz

Sprint S002-E focou em **estrutura mínima viável** para as classes do Meta Sistema. A classe Classe foi criada como template genérico sem:

1. **Fundamentação teórica** - POO não está definido como marco teórico
2. **Metodologia de descoberta** - Não existe processo para identificar classes em um domínio
3. **Relações detalhadas** - Herança mencionada, composição/agregação ausentes
4. **Instruções práticas** - Template de cópia, não método de uso

---

## 5. Tentativas Anteriores

| Versão | Data | O que tentou | Por que insuficiente |
|--------|------|--------------|---------------------|
| 1.0 | 2024-11-27 | Estrutura básica | Sem diagrama, sem instruções |
| 2.0 | 2025-12-02 | Herança + instruções template | Sem marco teórico POO, sem métodos de descoberta |

---

## 6. Necessidade

Aplicar **M0-M4 recursivamente** em Classe, produzindo v3.0 com:

| Etapa | Entregável | Conteúdo |
|-------|------------|----------|
| M0 | Este documento | Problema definido, glossário, diagramas |
| M1 | M1_Classe_v3.md | Marco teórico POO (Encapsulamento, Herança, Polimorfismo, Composição, SOLID) |
| M2 | M2_Classe_v3.md | Objeto refinado: escopo, fronteiras, critérios de sucesso |
| M3 | M3_Classe_v3.md | Métodos: identificarClasses(), descobrirAtributos(), descobrirMetodos(), definirRelacoes() |
| M4 | 00_E_1_4_Classe v3.0 | Documento final publicado em docs/ |

---

## 7. Critérios de Sucesso

| # | Critério | Validação |
|---|----------|-----------|
| 1 | Marco teórico POO completo | Seção 2 com Encapsulamento, Herança, Polimorfismo, Composição |
| 2 | Método de descoberta | Seção com identificarClasses(), descobrirAtributos(), descobrirMetodos() |
| 3 | Relações detalhadas | Herança vs Composição vs Agregação com exemplos |
| 4 | Diagrama UML atualizado | Caixa POO com relações |
| 5 | Consistência com Metodo | Sincronizado com 00_E_1_5_Metodo |

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_E_1_4_Classe v2.0 | Versão atual a ser evoluída |
| 00_E_1_1_Problema | Classe base (M0) |
| 00_E_1_5_Metodo | Sincronização necessária (T10-T11) |
| S003-E | Sprint atual |

---

## Histórico

| Versão | Data | Hora | Alteração |
|--------|------|------|-----------|
| 1.0 | 2025-12-03 | 21:15 | Criação. M0 completo: sintoma, análise semiótica, glossário, diagramas, causa raiz, necessidade, critérios de sucesso. |

# Referência: Construção de Personagem

---

```yaml
tipo: referencia
versao: "1.0"
data: "2025-12-22"
origem: construcao-personagens.md (V0)
```

---

## Três Tradições

### 1. Egri (Dramaturgia)

**Fonte**: Lajos Egri, *The Art of Dramatic Writing* (1946)

| Dimensão | O que revela |
|----------|--------------|
| Fisiologia | Corpo, aparência, saúde, limitações físicas |
| Sociologia | Classe, educação, religião, política, época |
| Psicologia | Temperamento, medos, desejos, contradições |

**Força**: Completude. Nenhuma dimensão existe sozinha.

**Fraqueza**: Estático. Descreve, não movimenta.

---

### 2. Stanislavski (Atuação)

**Fonte**: Constantin Stanislavski, *A Preparação do Ator* (1936)

| Conceito | Definição |
|----------|-----------|
| Superobjetivo | O que o personagem quer acima de tudo |
| Objetivo de cena | O que quer neste momento |
| Obstáculo | O que impede |
| Ação | O que faz para superar |
| Subtexto | O que pensa mas não diz |

**Força**: Dinâmico. Personagem em movimento.

**Fraqueza**: Exige cena. Funciona melhor em ação.

---

### 3. Jung/Campbell (Arquétipos)

**Fonte**: Carl Jung + Joseph Campbell, *O Herói de Mil Faces* (1949)

| Arquétipo | Função |
|-----------|--------|
| Herói | Quem transforma |
| Mentor | Quem ensina |
| Guardião do Limiar | Quem testa |
| Sombra | O antagonista (ou o lado negado do herói) |
| Shapeshifter | Quem muda de lado |
| Trickster | Quem quebra regras |

**Força**: Ressonância. Conecta com inconsciente coletivo.

**Fraqueza**: Genérico. Pode virar clichê.

---

## Síntese Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONSTRUÇÃO DE PERSONAGEM                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   EGRI (Quem é)           STANISLAVSKI (O que quer)            │
│   ═══════════════         ═════════════════════════            │
│   Fisiologia              Superobjetivo                        │
│   Sociologia       +      Obstáculo interno                    │
│   Psicologia              Obstáculo externo                    │
│                                                                 │
│                    ╲                    ╱                       │
│                     ╲                  ╱                        │
│                      ╲                ╱                         │
│                       ▼              ▼                          │
│                    ┌──────────────────┐                         │
│                    │ JUNG/CAMPBELL    │                         │
│                    │ (Que papel joga) │                         │
│                    │                  │                         │
│                    │  Arquétipo       │                         │
│                    │  Função na saga  │                         │
│                    └──────────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Template de Ficha

```yaml
Personagem:
  nome:
  memoria:
  
  # EGRI — Quem é
  fisiologia:
    aparencia: 
    limitacao: 
    presenca: 
    
  sociologia:
    epoca: 
    classe: 
    formacao: 
    tensao_social: 
    
  psicologia:
    temperamento: # colerico | sanguineo | fleumatico | melancolico
    medo_central: 
    desejo_central: 
    contradicao:   # Como medo e desejo se opõem
    
  # STANISLAVSKI — O que quer
  dinamica:
    superobjetivo: 
    obstaculo_interno: 
    obstaculo_externo: 
    estrategia: 
    
  # JUNG/CAMPBELL — Que papel joga
  arquetipo:
    tipo: # heroi | mentor | guardiao | sombra | shapeshifter | trickster
    funcao_na_saga: 
    
  # META
  variacao:
    marco_dominante: # egri | stanislavski | jung
    tom_narrativo: # tragico | ironico | heroico | contemplativo
```

---

## Validação

| Critério | Verificar |
|----------|-----------|
| Contradição interna presente | Medo e desejo se opõem? |
| Três dimensões Egri | Físico, social, psicológico preenchidos? |
| Dinâmica Stanislavski | Superobjetivo + obstáculos + estratégia? |
| Arquétipo identificado | Função clara na saga? |
| Marco dominante claro | Um marco sobressai? |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-22 | Migração de V0 para estrutura de referências |

# Construção de Personagens

---

```yaml
tipo: metodologia
versao: "1.0"
data: "2025-12-21"
origem: Ciclo M0-M4
```

---

## Problema

Personagens criados por IA tendem à previsibilidade e superficialidade.

Sem método:
- Viram porta-vozes de ideias (sem carne)
- Variações do mesmo template (sem variação)
- Resumos de Wikipedia (sem vida interior)

---

## Marco Teórico: Três Tradições

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

## Síntese: Combinação dos Três

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
  # EGRI — Quem é
  fisiologia:
    aparencia: string
    limitacao: string
    presenca: string
    
  sociologia:
    epoca: string
    classe: string
    formacao: string
    tensao_social: string
    
  psicologia:
    temperamento: enum [colerico, sanguineo, fleumatico, melancolico]
    medo_central: string
    desejo_central: string
    contradicao: string  # Como medo e desejo se opõem
    
  # STANISLAVSKI — O que quer
  dinamica:
    superobjetivo: string
    obstaculo_interno: string
    obstaculo_externo: string
    estrategia: string
    
  # JUNG/CAMPBELL — Que papel joga
  arquetipo:
    tipo: enum [heroi, mentor, guardiao, sombra, shapeshifter, trickster]
    funcao_na_saga: string
    
  # META
  variacao:
    marco_dominante: enum [egri, stanislavski, jung]
    tom_narrativo: enum [tragico, ironico, heroico, contemplativo]
    
  # SINESTESIA
  atmosfera:
    paleta: list[string]      # palavras, não cores
    elementos: list[string]   # objetos, texturas, sons
```

---

## Sistema de Variação

Para evitar previsibilidade, cada personagem tem um **marco dominante**:

| Marco Dominante | Ênfase | Efeito narrativo |
|-----------------|--------|------------------|
| **Egri** | Descrição rica, contexto denso | Leitor "vê" o personagem |
| **Stanislavski** | Ação e conflito | Leitor "sente" a tensão |
| **Jung** | Simbolismo e arquétipo | Leitor "reconhece" o padrão |

**Regra**: Em 9 personagens, distribuir ~3 para cada marco dominante.

---

## Validação de Ficha

| Critério | Verificar |
|----------|-----------|
| Contradição interna presente | Medo e desejo se opõem? |
| Três dimensões Egri | Físico, social, psicológico preenchidos? |
| Dinâmica Stanislavski | Superobjetivo + obstáculos + estratégia? |
| Arquétipo identificado | Função clara na saga? |
| Marco dominante claro | Um marco sobressai? |
| Paleta definida | Palavras sensoriais escolhidas? |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-21 | Criação a partir do ciclo M0-M4 |

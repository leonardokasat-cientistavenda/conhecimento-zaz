---
id: BKL-037
nome: Spec dmn_entrada_genesis
versao: "1.0"
tipo: Spec
vertente: M3.D
status: Draft
sprint_ref: S026
template_ref: _catalogo/templates/M3_D_DMN.md
artefatos_produzidos:
  - "dmn_processo_iniciar_orquestrador.dmn (update)"
---

# M3.D.01 - Spec dmn_entrada_genesis

## 1. Contexto

Adicionar entrada na tabela DMN `dmn_processo_iniciar_orquestrador` para rotear mensagens do tipo "genesis" para o processo `bpmn_ms_agente`.

## 2. DMN Existente

```
dmn_processo_iniciar_orquestrador (Hit Policy: F - First)

| tipo_orquestrador | processo                    | token_orquestrador        |
|-------------------|-----------------------------|--------------------------|
| "zarah"           | bpmn_orquestrador_zarah     | MATTERMOST_TOKEN_ZARAH   |
| ...               | ...                         | ...                      |
```

## 3. Alteração Especificada

### 3.1 Nova Regra

```yaml
rule:
  input_values:
    tipo_orquestrador: "genesis"
  output_values:
    processo: "bpmn_ms_agente"
    token_orquestrador: "MATTERMOST_TOKEN_GENESIS"
```

### 3.2 DMN Atualizado

```
dmn_processo_iniciar_orquestrador (Hit Policy: F - First)

| tipo_orquestrador | processo                    | token_orquestrador        |
|-------------------|-----------------------------|--------------------------|
| "zarah"           | bpmn_orquestrador_zarah     | MATTERMOST_TOKEN_ZARAH   |
| "genesis"         | bpmn_ms_agente              | MATTERMOST_TOKEN_GENESIS | <- NOVA
| -                 | bpmn_default                | MATTERMOST_TOKEN_DEFAULT |
```

## 4. Schema TDD

### 4.1 Classes de Equivalência

| Atributo | Partição | Valores Exemplo | Válida |
|----------|----------|-----------------|--------|
| tipo_orquestrador | genesis | "genesis" | ✅ |
| tipo_orquestrador | zarah | "zarah" | ✅ (existente) |
| tipo_orquestrador | desconhecido | "xxx" | ✅ (usa default) |

### 4.2 Critérios de Aceite

| ID | Given | When | Then |
|----|-------|------|------|
| CA01 | tipo_orquestrador="genesis" | DMN avaliado | processo="bpmn_ms_agente", token="MATTERMOST_TOKEN_GENESIS" |
| CA02 | tipo_orquestrador="zarah" | DMN avaliado | processo="bpmn_orquestrador_zarah" (sem regressão) |
| CA03 | tipo_orquestrador="xxx" | DMN avaliado | processo="bpmn_default" (usa default) |

### 4.3 Cobertura

- **Estratégia:** cartesiano
- **Combinações:** 3

## 5. Implementação

Adicionar linha no arquivo `.dmn` existente:

```xml
<rule id="rule_genesis">
  <inputEntry id="input_genesis">
    <text>"genesis"</text>
  </inputEntry>
  <outputEntry id="output_processo_genesis">
    <text>"bpmn_ms_agente"</text>
  </outputEntry>
  <outputEntry id="output_token_genesis">
    <text>"MATTERMOST_TOKEN_GENESIS"</text>
  </outputEntry>
</rule>
```

## 6. Checklist

| ID | Verificação | Status |
|----|-------------|--------|
| CK01 | Hit policy mantida (F) | ✅ |
| CK02 | Inputs tipados | ✅ |
| CK03 | Outputs tipados | ✅ |
| CK04 | Sem conflito com regras existentes | ✅ |
| CK05 | Critérios de aceite cobrem nova regra | ✅ |

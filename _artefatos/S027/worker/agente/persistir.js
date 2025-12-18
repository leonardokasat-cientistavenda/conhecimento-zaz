/**
 * Worker Agente Persistir - MS_Agente
 * 
 * Topic Camunda: agente-persistir
 * Spec: _drafts/S026_M3E_agentePersistir.md
 * Sprint: S027
 */

const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");
const { insertOne } = require("../../database");

// Pricing por modelo (USD por milhão de tokens)
const PRICING = {
  "claude-sonnet-4-20250514": { input: 3, output: 15 },
  "claude-haiku-4-20250514": { input: 0.25, output: 1.25 },
  "claude-opus-4-20250514": { input: 15, output: 75 }
};

module.exports = {
  "agente-persistir": async ({ task, taskService }) => {
    try {
      // Extrair variáveis do Camunda
      const vars = getListaVariaveis(
        {
          agente_id: null,
          user_id: null,
          user_login: null,
          channel_id: null,
          input: "",
          resposta: "",
          modelo: "claude-sonnet-4-20250514",
          tokens_input: 0,
          tokens_output: 0,
          latencia_ms: 0,
          toolCalls: "[]"
        },
        task
      );

      // Validações
      if (!vars.agente_id) {
        throw new Error("agente_id obrigatório");
      }
      if (!vars.user_id) {
        throw new Error("user_id obrigatório");
      }
      if (!vars.channel_id) {
        throw new Error("channel_id obrigatório");
      }

      // Calcular custo
      const custo_usd = calcularCusto(
        vars.modelo,
        vars.tokens_input,
        vars.tokens_output
      );

      // Extrair nomes das tools chamadas
      let tool_calls = [];
      try {
        const toolCallsArray = JSON.parse(vars.toolCalls);
        tool_calls = toolCallsArray.map(t => t.name);
      } catch (e) {
        // Ignora erro de parse
      }

      // Montar documento
      const doc = {
        agente_id: vars.agente_id,
        user_id: vars.user_id,
        user_login: vars.user_login || "",
        channel_id: vars.channel_id,
        input: vars.input,
        output: vars.resposta,
        modelo: vars.modelo,
        tokens_input: parseInt(vars.tokens_input) || 0,
        tokens_output: parseInt(vars.tokens_output) || 0,
        tokens_total: (parseInt(vars.tokens_input) || 0) + (parseInt(vars.tokens_output) || 0),
        custo_usd,
        latencia_ms: parseInt(vars.latencia_ms) || 0,
        tool_calls,
        created_at: new Date()
      };

      // Inserir no MongoDB
      const result = await insertOne("agente", "execucoes", doc);

      // Completar task
      await taskService.complete(
        task,
        setarVariaveisCamunda({
          execucao_id: result.insertedId.toString()
        })
      );

    } catch (error) {
      console.error("[agente-persistir] Erro:", error.message);
      
      // Persistência não é crítica - completar mesmo com erro
      // mas logar para monitoramento
      await taskService.complete(
        task,
        setarVariaveisCamunda({
          execucao_id: "",
          persist_error: error.message
        })
      );
    }
  }
};

/**
 * Calcula custo em USD baseado no modelo e tokens
 * @param {string} modelo - Nome do modelo
 * @param {number} tokens_in - Tokens de entrada
 * @param {number} tokens_out - Tokens de saída
 * @returns {number} Custo em USD
 */
function calcularCusto(modelo, tokens_in, tokens_out) {
  const pricing = PRICING[modelo] || PRICING["claude-sonnet-4-20250514"];
  return (tokens_in * pricing.input + tokens_out * pricing.output) / 1000000;
}

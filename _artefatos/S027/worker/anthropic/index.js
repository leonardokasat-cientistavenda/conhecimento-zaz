/**
 * Worker Anthropic - MS_Agente
 * 
 * Topic Camunda: workerAnthropic
 * Spec: _drafts/S026_M3E_workerAnthropic.md
 * Sprint: S027
 */

const Anthropic = require("@anthropic-ai/sdk");
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODELOS_VALIDOS = [
  "claude-sonnet-4-20250514",
  "claude-haiku-4-20250514",
  "claude-opus-4-20250514"
];

module.exports = {
  workerAnthropic: async ({ task, taskService }) => {
    const inicio = Date.now();

    try {
      // Extrair variáveis do Camunda
      const { messages, modelo, tools, max_tokens, system_prompt } = getListaVariaveis(
        {
          messages: null,
          modelo: "claude-sonnet-4-20250514",
          tools: "[]",
          max_tokens: 8192,
          system_prompt: ""
        },
        task
      );

      // Validações
      if (!messages) {
        throw new Error("messages não pode ser vazio");
      }

      const messagesArray = JSON.parse(messages);
      if (!Array.isArray(messagesArray) || messagesArray.length === 0) {
        throw new Error("messages deve ser um array não vazio");
      }

      if (!MODELOS_VALIDOS.includes(modelo)) {
        throw new Error(`modelo não suportado: ${modelo}. Válidos: ${MODELOS_VALIDOS.join(", ")}`);
      }

      // Preparar tools
      const toolsArray = tools ? JSON.parse(tools) : [];

      // Preparar request
      const request = {
        model: modelo,
        max_tokens: max_tokens,
        messages: messagesArray
      };

      // Adicionar system prompt se fornecido
      if (system_prompt) {
        request.system = system_prompt;
      }

      // Adicionar tools se fornecidas
      if (toolsArray.length > 0) {
        request.tools = toolsArray;
      }

      // Chamada API Anthropic
      const response = await client.messages.create(request);

      const latencia_ms = Date.now() - inicio;

      // Extrair conteúdo da resposta
      let resposta = "";
      const toolCalls = [];

      for (const block of response.content) {
        if (block.type === "text") {
          resposta += block.text;
        } else if (block.type === "tool_use") {
          toolCalls.push({
            id: block.id,
            name: block.name,
            input: block.input
          });
        }
      }

      // Completar task com resultado
      await taskService.complete(
        task,
        setarVariaveisCamunda({
          resposta,
          toolCalls: JSON.stringify(toolCalls),
          stopReason: response.stop_reason,
          tokens_input: response.usage.input_tokens,
          tokens_output: response.usage.output_tokens,
          latencia_ms
        })
      );

    } catch (error) {
      console.error("[workerAnthropic] Erro:", error.message);
      
      // Falhar task com erro
      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: 30000 // 30 segundos
      });
    }
  }
};

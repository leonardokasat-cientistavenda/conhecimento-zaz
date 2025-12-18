/**
 * Worker Agente Contexto - MS_Agente
 * 
 * Topic Camunda: agente-contexto
 * Spec: _drafts/S026_M3E_agenteContexto.md
 * Sprint: S027
 */

const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");
const { findOne, find } = require("../../database");

// Limite de histórico para contexto
const HISTORICO_LIMITE = 10;

module.exports = {
  "agente-contexto": async ({ task, taskService }) => {
    try {
      // Extrair variáveis do Camunda
      const { agente_id, user_id, user_login, channel_id, input } = getListaVariaveis(
        {
          agente_id: null,
          user_id: null,
          user_login: null,
          channel_id: null,
          input: ""
        },
        task
      );

      // Validações
      if (!agente_id) {
        throw new Error("agente_id obrigatório");
      }
      if (!user_id) {
        throw new Error("user_id obrigatório");
      }
      if (!channel_id) {
        throw new Error("channel_id obrigatório");
      }

      // Buscar configuração do agente
      const agente = await findOne("genesis", "agentes", { agente_id });
      if (!agente) {
        throw new Error(`agente não encontrado: ${agente_id}`);
      }

      // Carregar system prompt do GitHub
      const system_prompt = await carregarSystemPrompt(agente.system_prompt_ref);

      // Buscar histórico do canal (ultimas N execuções)
      const historico = await find(
        "agente",
        "execucoes",
        { agente_id, channel_id },
        { 
          sort: { created_at: -1 }, 
          limit: HISTORICO_LIMITE,
          projection: { input: 1, output: 1 }
        }
      );

      // Montar array de messages para API Anthropic
      const messages = montarMessages(historico.reverse(), input);

      // Completar task com contexto montado
      await taskService.complete(
        task,
        setarVariaveisCamunda({
          messages: JSON.stringify(messages),
          modelo: agente.modelo,
          tools: JSON.stringify(agente.tools || []),
          system_prompt,
          max_tokens: agente.limites?.max_tokens || 8192
        })
      );

    } catch (error) {
      console.error("[agente-contexto] Erro:", error.message);
      
      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: 60000 // 1 minuto
      });
    }
  }
};

/**
 * Carrega system prompt do GitHub
 * @param {string} path - Caminho no repo (ex: "genesis/GENESIS.md")
 * @returns {Promise<string>} Conteúdo do arquivo
 */
async function carregarSystemPrompt(path) {
  if (!path) {
    return "";
  }

  const url = `https://raw.githubusercontent.com/leonardokasat-cientistavenda/conhecimento-zaz/main/${path}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`[agente-contexto] System prompt não encontrado: ${path}`);
      return "";
    }
    return await response.text();
  } catch (error) {
    console.warn(`[agente-contexto] Erro ao carregar system prompt: ${error.message}`);
    return "";
  }
}

/**
 * Monta array de messages para API Anthropic
 * @param {Array} historico - Execuções anteriores (ordenadas cronologicamente)
 * @param {string} input - Mensagem atual do usuário
 * @returns {Array} Messages no formato API Anthropic
 */
function montarMessages(historico, input) {
  const messages = [];

  // Adicionar histórico
  for (const exec of historico) {
    if (exec.input) {
      messages.push({ role: "user", content: exec.input });
    }
    if (exec.output) {
      messages.push({ role: "assistant", content: exec.output });
    }
  }

  // Adicionar input atual
  messages.push({ role: "user", content: input || "" });

  return messages;
}

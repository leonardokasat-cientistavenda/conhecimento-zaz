/**
 * Worker Agente GitHub - MS_Agente
 * 
 * Topics Camunda: agente-github-get, agente-github-push
 * Spec: _drafts/S026_M3E_agenteGithub.md
 * Sprint: S027
 */

const { Octokit } = require("@octokit/rest");
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports = {
  /**
   * Busca conteúdo de arquivo ou diretório do GitHub
   */
  "agente-github-get": async ({ task, taskService }) => {
    try {
      const { owner, repo, path, branch } = getListaVariaveis(
        {
          owner: null,
          repo: null,
          path: null,
          branch: "main"
        },
        task
      );

      // Validações
      if (!owner) throw new Error("owner obrigatório");
      if (!repo) throw new Error("repo obrigatório");
      if (!path) throw new Error("path obrigatório");

      // Buscar conteúdo
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      });

      let content, sha;

      if (Array.isArray(response.data)) {
        // Diretório - retorna lista de arquivos
        content = JSON.stringify(
          response.data.map(f => ({
            name: f.name,
            type: f.type,
            path: f.path,
            size: f.size
          }))
        );
        sha = "";
      } else {
        // Arquivo - decodifica conteúdo
        content = Buffer.from(response.data.content, "base64").toString("utf-8");
        sha = response.data.sha;
      }

      await taskService.complete(
        task,
        setarVariaveisCamunda({ content, sha })
      );

    } catch (error) {
      console.error("[agente-github-get] Erro:", error.message);

      if (error.status === 404) {
        await taskService.handleFailure(task, {
          errorMessage: "arquivo não encontrado",
          errorDetails: error.message,
          retries: 0,
          retryTimeout: 0
        });
      } else {
        await taskService.handleFailure(task, {
          errorMessage: error.message,
          errorDetails: error.stack,
          retries: task.retries - 1,
          retryTimeout: 10000
        });
      }
    }
  },

  /**
   * Cria ou atualiza arquivos no GitHub
   */
  "agente-github-push": async ({ task, taskService }) => {
    try {
      const { owner, repo, branch, files, message } = getListaVariaveis(
        {
          owner: null,
          repo: null,
          branch: "main",
          files: "[]",
          message: ""
        },
        task
      );

      // Validações
      if (!owner) throw new Error("owner obrigatório");
      if (!repo) throw new Error("repo obrigatório");
      if (!message) throw new Error("message obrigatório");

      const filesArray = JSON.parse(files);
      if (!Array.isArray(filesArray) || filesArray.length === 0) {
        throw new Error("files não pode ser vazio");
      }

      let commit_sha = "";

      // Criar/atualizar cada arquivo
      for (const file of filesArray) {
        if (!file.path || !file.content) {
          console.warn(`[agente-github-push] Arquivo inválido ignorado:`, file);
          continue;
        }

        // Verificar se arquivo já existe (para obter SHA)
        let sha;
        try {
          const existing = await octokit.repos.getContent({
            owner,
            repo,
            path: file.path,
            ref: branch
          });
          sha = existing.data.sha;
        } catch (e) {
          // Arquivo novo - sem SHA
        }

        // Criar ou atualizar
        const result = await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: file.path,
          message,
          content: Buffer.from(file.content).toString("base64"),
          branch,
          sha
        });

        commit_sha = result.data.commit.sha;
      }

      await taskService.complete(
        task,
        setarVariaveisCamunda({ commit_sha })
      );

    } catch (error) {
      console.error("[agente-github-push] Erro:", error.message);

      await taskService.handleFailure(task, {
        errorMessage: error.message,
        errorDetails: error.stack,
        retries: task.retries - 1,
        retryTimeout: 10000
      });
    }
  }
};

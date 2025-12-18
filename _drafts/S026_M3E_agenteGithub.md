---
id: BKL-033
nome: Spec agente-github
versao: "1.0"
tipo: Spec
vertente: M3.E
status: Draft
sprint_ref: S026
template_ref: _catalogo/templates/M3_E_POO.md
artefatos_produzidos:
  - "worker/agente/github.js"
  - "test/worker/agente/github.test.js"
---

# M3.E.04 - Spec agente-github

## 1. Classe

```
┌─────────────────────────────────────────────────────────────────┐
│                      WorkerAgenteGithub                         │
├─────────────────────────────────────────────────────────────────┤
│  topics: "agente-github-get", "agente-github-push"              │
├─────────────────────────────────────────────────────────────────┤
│  Input GET (Camunda vars)                                       │
│  - owner: string           # "leonardokasat-cientistavenda"     │
│  - repo: string            # "conhecimento-zaz"                 │
│  - path: string            # "genesis/GENESIS.md"               │
│  - branch: string          # "main" (default)                   │
├─────────────────────────────────────────────────────────────────┤
│  Output GET (Camunda vars)                                      │
│  - content: string         # Conteúdo do arquivo                │
│  - sha: string             # SHA para updates                   │
├─────────────────────────────────────────────────────────────────┤
│  Input PUSH (Camunda vars)                                      │
│  - owner: string                                                │
│  - repo: string                                                 │
│  - branch: string                                               │
│  - files: string           # JSON [{path, content}]             │
│  - message: string         # Commit message                     │
├─────────────────────────────────────────────────────────────────┤
│  Output PUSH (Camunda vars)                                     │
│  - commit_sha: string      # SHA do commit criado               │
├─────────────────────────────────────────────────────────────────┤
│  Métodos                                                         │
│  + executeGet(task, taskService): void                          │
│  + executePush(task, taskService): void                         │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Dependências

```javascript
const { Octokit } = require("@octokit/rest");
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");
```

## 3. Schema TDD

### 3.1 Classes de Equivalência

| Atributo | Partição | Valores Exemplo | Válida |
|----------|----------|-----------------|--------|
| owner | valido | "leonardokasat-cientistavenda" | ✅ |
| owner | vazio | "", null | ❌ |
| repo | valido | "conhecimento-zaz" | ✅ |
| repo | inexistente | "repo-xyz-404" | ❌ |
| path | existente | "genesis/GENESIS.md" | ✅ |
| path | inexistente | "arquivo/nao/existe.md" | ❌ |
| path | diretorio | "genesis/" | ✅ | retorna lista |
| files | valido | [{path:"x.md",content:"..."}] | ✅ |
| files | vazio | [] | ❌ |
| message | valido | "[GENESIS] docs: update" | ✅ |
| message | vazio | "" | ❌ |

### 3.2 Critérios de Aceite

| ID | Método | Given | When | Then |
|----|--------|-------|------|------|
| CA01 | executeGet | path de arquivo existente | executeGet() | task completa com {content, sha} |
| CA02 | executeGet | path de diretório | executeGet() | task completa com {content: lista de arquivos} |
| CA03 | executeGet | path inexistente | executeGet() | task falha: 'arquivo não encontrado' |
| CA04 | executePush | files válido, message válido | executePush() | task completa com {commit_sha} |
| CA05 | executePush | files vazio | executePush() | task falha: 'files não pode ser vazio' |
| CA06 | executePush | message vazio | executePush() | task falha: 'message obrigatório' |

### 3.3 Cobertura

- **Estratégia:** manual
- **Combinações estimadas:** 10

## 4. Implementação Esperada

```javascript
// worker/agente/github.js
const { Octokit } = require("@octokit/rest");
const { getListaVariaveis, setarVariaveisCamunda } = require("../../utils/validations");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports = {
  "agente-github-get": async ({ task, taskService }) => {
    const { owner, repo, path, branch } = getListaVariaveis(
      { owner: null, repo: null, path: null, branch: "main" },
      task
    );
    
    if (!owner || !repo || !path) {
      throw new Error("owner, repo e path são obrigatórios");
    }
    
    try {
      const response = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      
      let content, sha;
      if (Array.isArray(response.data)) {
        // Diretório
        content = JSON.stringify(response.data.map(f => ({ name: f.name, type: f.type, path: f.path })));
        sha = "";
      } else {
        // Arquivo
        content = Buffer.from(response.data.content, "base64").toString("utf-8");
        sha = response.data.sha;
      }
      
      await taskService.complete(task, setarVariaveisCamunda({ content, sha }));
    } catch (error) {
      if (error.status === 404) {
        throw new Error("arquivo não encontrado");
      }
      throw error;
    }
  },
  
  "agente-github-push": async ({ task, taskService }) => {
    const { owner, repo, branch, files, message } = getListaVariaveis(
      { owner: null, repo: null, branch: "main", files: "[]", message: "" },
      task
    );
    
    if (!owner || !repo) throw new Error("owner e repo são obrigatórios");
    if (!message) throw new Error("message obrigatório");
    
    const filesArray = JSON.parse(files);
    if (!filesArray.length) throw new Error("files não pode ser vazio");
    
    // Implementação simplificada - criar/atualizar arquivos
    // (em produção usar createOrUpdateFileContents ou tree API)
    
    let commit_sha = "";
    for (const file of filesArray) {
      // Buscar SHA atual se existir
      let sha;
      try {
        const existing = await octokit.repos.getContent({ owner, repo, path: file.path, ref: branch });
        sha = existing.data.sha;
      } catch (e) {
        // Arquivo novo
      }
      
      const result = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: file.path,
        message,
        content: Buffer.from(file.content).toString("base64"),
        branch,
        sha,
      });
      
      commit_sha = result.data.commit.sha;
    }
    
    await taskService.complete(task, setarVariaveisCamunda({ commit_sha }));
  },
};
```

## 5. Checklist

| ID | Verificação | Status |
|----|-------------|--------|
| CK01 | Todos atributos têm tipo definido | ✅ |
| CK02 | Todos atributos têm ≥1 partição válida | ✅ |
| CK03 | Todos atributos têm ≥1 partição inválida | ✅ |
| CK04 | Todos métodos têm ≥1 critério de aceite | ✅ |
| CK05 | Critérios cobrem happy path | ✅ |
| CK06 | Critérios cobrem casos de erro | ✅ |
| CK07 | Fronteiras identificadas | ✅ |
| CK08 | Cobertura definida | ✅ |
| CK09 | combinacoes_estimadas calculado | ✅ |

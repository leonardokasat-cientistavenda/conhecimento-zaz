/**
 * Script para criar collection genesis.agentes
 * 
 * Sprint: S027
 * 
 * Executar com: mongosh < create_collection_agentes.js
 */

// Conectar ao database genesis
use genesis;

// Criar collection agentes (sem validator rígido - config flexível)
db.createCollection("agentes");

print("Collection 'agentes' criada!");

// Criar índice único por agente_id
db.agentes.createIndex(
  { agente_id: 1 },
  { unique: true, name: "idx_agente_id_unique" }
);

print("Índice criado!");

// Inserir configuração inicial do GENESIS
db.agentes.insertOne({
  agente_id: "genesis",
  nome: "GENESIS",
  descricao: "Sistema de Inteligência Híbrida que amplifica capacidade cognitiva humana",
  system_prompt_ref: "genesis/GENESIS.md",
  modelo: "claude-sonnet-4-20250514",
  tools: [
    {
      name: "github:get_file_contents",
      description: "Busca conteúdo de arquivo no GitHub"
    },
    {
      name: "github:push_files",
      description: "Cria/atualiza arquivos no GitHub"
    },
    {
      name: "mongodb:find",
      description: "Busca documentos no MongoDB"
    },
    {
      name: "mongodb:insertOne",
      description: "Insere documento no MongoDB"
    },
    {
      name: "mongodb:updateMany",
      description: "Atualiza documentos no MongoDB"
    }
  ],
  limites: {
    max_tokens: 8192,
    contexto_maximo: 150000,
    tokens_diarios_usuario: 500000,
    historico_mensagens: 10
  },
  ativo: true,
  created_at: new Date(),
  updated_at: new Date()
});

print("\n✅ Agente GENESIS configurado!");

// Verificar
print("\nConfiguração:");
printjson(db.agentes.findOne({ agente_id: "genesis" }));

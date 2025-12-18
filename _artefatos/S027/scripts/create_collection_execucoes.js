/**
 * Script para criar collection agente.execucoes com schema validator
 * 
 * Spec: _drafts/S026_M3C_schema_execucoes.md
 * Sprint: S027
 * 
 * Executar com: mongosh < create_collection_execucoes.js
 * Ou via MongoDB Compass/Atlas
 */

// Conectar ao database agente
use agente;

// Dropar collection se existir (CUIDADO em produção!)
// db.execucoes.drop();

// Criar collection com schema validator
db.createCollection("execucoes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "agente_id",
        "user_id",
        "user_login",
        "channel_id",
        "input",
        "output",
        "modelo",
        "tokens_input",
        "tokens_output",
        "tokens_total",
        "custo_usd",
        "latencia_ms",
        "created_at"
      ],
      properties: {
        agente_id: {
          bsonType: "string",
          enum: ["genesis", "zarah"],
          description: "ID do agente - obrigatório, deve ser 'genesis' ou 'zarah'"
        },
        user_id: {
          bsonType: "string",
          description: "ID do usuário Mattermost - obrigatório"
        },
        user_login: {
          bsonType: "string",
          description: "Login do usuário - obrigatório"
        },
        channel_id: {
          bsonType: "string",
          description: "ID do canal Mattermost - obrigatório"
        },
        input: {
          bsonType: "string",
          description: "Mensagem do usuário - obrigatório"
        },
        output: {
          bsonType: "string",
          description: "Resposta do agente - obrigatório"
        },
        modelo: {
          bsonType: "string",
          enum: [
            "claude-sonnet-4-20250514",
            "claude-haiku-4-20250514",
            "claude-opus-4-20250514"
          ],
          description: "Modelo LLM utilizado - obrigatório"
        },
        tokens_input: {
          bsonType: "int",
          minimum: 0,
          description: "Tokens de entrada - obrigatório, >= 0"
        },
        tokens_output: {
          bsonType: "int",
          minimum: 0,
          description: "Tokens de saída - obrigatório, >= 0"
        },
        tokens_total: {
          bsonType: "int",
          minimum: 0,
          description: "Total de tokens - obrigatório, >= 0"
        },
        custo_usd: {
          bsonType: "double",
          minimum: 0,
          description: "Custo em USD - obrigatório, >= 0"
        },
        latencia_ms: {
          bsonType: "int",
          minimum: 0,
          description: "Latência em ms - obrigatório, >= 0"
        },
        tool_calls: {
          bsonType: "array",
          description: "Lista de tools chamadas - opcional"
        },
        created_at: {
          bsonType: "date",
          description: "Data da execução - obrigatório"
        }
      }
    }
  },
  validationLevel: "moderate",
  validationAction: "warn"
});

print("Collection 'execucoes' criada com sucesso!");

// Criar índices
print("Criando índices...");

// Índice composto para busca de histórico por agente e canal
db.execucoes.createIndex(
  { agente_id: 1, channel_id: 1 },
  { name: "idx_agente_channel" }
);

// Índice para ordenação por data (descendente)
db.execucoes.createIndex(
  { created_at: -1 },
  { name: "idx_created_at" }
);

// Índice para busca por usuário
db.execucoes.createIndex(
  { user_id: 1 },
  { name: "idx_user_id" }
);

// Índice composto para métricas por agente ordenadas por data
db.execucoes.createIndex(
  { agente_id: 1, created_at: -1 },
  { name: "idx_agente_created" }
);

print("Índices criados com sucesso!");

// Verificar
print("\nVerificando collection:");
print("Índices:");
printjson(db.execucoes.getIndexes());

print("\nSchema validator:");
printjson(db.getCollectionInfos({ name: "execucoes" })[0].options.validator);

print("\n✅ Setup completo!");

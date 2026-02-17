// Comentário: Inicializa conexão PostgreSQL apenas quando DATABASE_URL estiver configurada.
const { Pool } = require('pg');
const { databaseUrl } = require('../config');

const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;

module.exports = { pool };

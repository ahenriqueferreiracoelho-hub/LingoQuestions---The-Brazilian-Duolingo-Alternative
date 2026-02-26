// Comentário: Seleciona dinamicamente implementação do repositório (PostgreSQL ou memória).
const { pool } = require('../db/pool');
const { InMemoryRepository } = require('./inMemoryRepository');
const { PostgresRepository } = require('./postgresRepository');

const repository = pool ? new PostgresRepository(pool) : new InMemoryRepository();

module.exports = { repository };

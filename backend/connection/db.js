const { Pool } = require('pg');
require('dotenv').config();
const logger = require('../utils/logger');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.connect()
    .then(() => { logger.info(`✅ Connected to PostgreSQL`) })
    .catch((err) => { logger.error(`❌ Database Connection Error: ${err}`) })

module.exports = pool;
const mysql = require('mysql2/promise');

/**
 * Database Connection Pool
 * Manages MySQL connection pool
 */
let pool = null;

/**
 * Initialize database connection pool
 */
function initializePool() {
    if (pool) {
        return pool;
    }

    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'Lucky1verma',
            database: process.env.DB_NAME || 'sales',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
            timeout: 30000,
            reconnect: true
        });

        pool.on('error', (err) => {
            console.error('Database pool error:', err.message);
        });

        return pool;
    } catch (error) {
        console.error('Failed to create database pool:', error.message);
        return null;
    }
}

/**
 * Get connection pool
 */
function getPool() {
    if (!pool) {
        initializePool();
    }
    return pool;
}

module.exports = {
    initializePool,
    getPool
};


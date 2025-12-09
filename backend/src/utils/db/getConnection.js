const { getPool } = require('./connection');

/**
 * Get a connection from the pool
 * Returns result object: { success, connection, error }
 */
async function getConnection() {
    const pool = getPool();

    if (!pool) {
        return {
            success: false,
            error: 'Database pool not available',
            connection: null
        };
    }

    try {
        const connection = await pool.getConnection();
        return {
            success: true,
            connection: connection
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            connection: null
        };
    }
}

module.exports = getConnection;


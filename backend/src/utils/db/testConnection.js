const { getPool } = require('./connection');
const { safeDbOperation } = require('../errorHandlers');
const { DatabaseError } = require('../errors');
const { updateStatus } = require('./status');

/**
 * Test database connection
 * Returns result object: { success, data, error }
 */
async function testConnection() {
    return await safeDbOperation(async () => {
        const pool = getPool();
        
        if (!pool) {
            throw new DatabaseError('Database pool not initialized');
        }

        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        
        updateStatus(true, null);
        
        return { connected: true };
    }, 'Database Connection Test');
}

module.exports = testConnection;


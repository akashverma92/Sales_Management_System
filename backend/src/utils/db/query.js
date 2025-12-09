const { getPool } = require('./connection');
const { safeDbOperation } = require('../errorHandlers');

/**
 * Execute database query
 * Returns result object: { success, data, error }
 */
async function query(sql, params = []) {
    const pool = getPool();

    if (!pool) {
        return {
            success: false,
            error: 'Database pool not available',
            data: null
        };
    }

    return await safeDbOperation(async () => {
        const startTime = Date.now();
        const [results] = await pool.execute(sql, params);
        const duration = Date.now() - startTime;
        
        if (duration > 1000) {
            console.warn(`Slow query detected: ${duration}ms - ${sql.substring(0, 100)}...`);
        }

        return results;
    }, 'Database Query');
}

module.exports = query;


const query = require('./query');

/**
 * Check if a table exists
 * Returns boolean, never throws
 */
async function tableExists(tableName) {
    const result = await query(
        `SELECT COUNT(*) as count FROM information_schema.tables 
         WHERE table_schema = ? AND table_name = ?`,
        [process.env.DB_NAME || 'sales', tableName]
    );

    if (!result.success) {
        return false;
    }

    return result.data && result.data[0]?.count > 0;
}

module.exports = tableExists;


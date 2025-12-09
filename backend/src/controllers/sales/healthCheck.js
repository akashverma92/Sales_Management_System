const { testConnection, tableExists, getConnectionStatus, query } = require('../../utils/db');

/**
 * Health check controller
 * GET /api/sales/health
 */
async function healthCheck(req, res) {
    const connectionStatus = getConnectionStatus();
    const connectionTest = await testConnection();
    const tableExistsResult = await tableExists('sales_data');
    
    let rowCount = 0;
    if (tableExistsResult && connectionTest.success) {
        const countResult = await query('SELECT COUNT(*) as count FROM sales_data LIMIT 1');
        if (countResult.success && countResult.data) {
            rowCount = Number(countResult.data[0]?.count) || 0;
        }
    }
    
    res.json({
        success: true,
        message: 'Sales Management API is running',
        timestamp: new Date().toISOString(),
        database: {
            connected: connectionTest.success || false,
            tableExists: tableExistsResult,
            rowCount: rowCount,
            connectionStatus: connectionStatus,
            error: connectionTest.success ? null : connectionTest.error
        }
    });
}

module.exports = healthCheck;


const { query } = require('../../utils/db');

/**
 * Test query controller
 * GET /api/sales/test-query
 */
async function testQuery(req, res) {
    const countResult = await query('SELECT COUNT(*) as count FROM sales_data LIMIT 1');
    const selectResult = await query('SELECT * FROM sales_data LIMIT 1');
    const orderResult = await query('SELECT * FROM sales_data ORDER BY customer_name ASC LIMIT 10');
    
    const results = {
        success: true,
        countTest: countResult.success ? {
            success: true,
            count: Number(countResult.data[0]?.count) || 0
        } : {
            success: false,
            error: countResult.error
        },
        selectTest: selectResult.success ? {
            success: true,
            works: selectResult.data && selectResult.data.length > 0
        } : {
            success: false,
            error: selectResult.error
        },
        orderTest: orderResult.success ? {
            success: true,
            works: orderResult.data && orderResult.data.length > 0,
            count: orderResult.data?.length || 0
        } : {
            success: false,
            error: orderResult.error
        },
        message: 'Test queries completed (some may have failed)'
    };
    
    res.json(results);
}

module.exports = testQuery;


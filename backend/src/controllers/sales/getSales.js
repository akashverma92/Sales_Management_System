const { getSalesData } = require('../../services/sales');
const { handleError } = require('../../utils/errorHandlers');

/**
 * Get paginated sales data controller
 * GET /api/sales
 */
async function getSales(req, res) {
    const {
        search = '',
        region = 'all',
        gender = 'all',
        ageRange = 'all',
        category = 'all',
        tag = 'all',
        payment = 'all',
        date = '',
        engagement = 'all',
        sortBy = 'name-asc',
        page = 1,
        pageSize = 10
    } = req.query;
    
    const filters = {
        region,
        gender,
        ageRange,
        category,
        tag,
        payment,
        date,
        engagement
    };
    
    const result = await getSalesData({
        search: String(search),
        filters,
        sortBy: String(sortBy),
        page: parseInt(page) || 1,
        pageSize: parseInt(pageSize) || 10
    });
    
    if (result.success) {
        res.json({
            success: true,
            ...result.data
        });
    } else {
        handleError(result, 'Get Sales Data');
        res.status(503).json({
            success: false,
            error: result.error || 'Failed to fetch sales data',
            code: result.code || 'SERVICE_ERROR'
        });
    }
}

module.exports = getSales;


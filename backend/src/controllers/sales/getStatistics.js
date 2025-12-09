const { getStatistics: getStatisticsService } = require('../../services/sales');
const { handleError } = require('../../utils/errorHandlers');

/**
 * Get statistics controller
 * GET /api/sales/statistics
 */
async function getStatistics(req, res) {
    const {
        search = '',
        region = 'all',
        gender = 'all',
        ageRange = 'all',
        category = 'all',
        tag = 'all',
        payment = 'all',
        date = '',
        engagement = 'all'
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
    
    const result = await getStatisticsService({
        search: String(search),
        filters
    });
    
    if (result.success) {
        res.json({
            success: true,
            ...result.data
        });
    } else {
        handleError(result, 'Get Statistics');
        res.status(503).json({
            success: false,
            error: result.error || 'Failed to fetch statistics',
            code: result.code || 'SERVICE_ERROR',
            totalUnits: 0,
            totalAmount: 0,
            totalDiscount: 0,
            totalTransactions: 0
        });
    }
}

module.exports = getStatistics;


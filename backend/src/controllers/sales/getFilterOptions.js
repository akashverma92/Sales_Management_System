const { getFilterOptions: getFilterOptionsService } = require('../../services/sales');
const { handleError } = require('../../utils/errorHandlers');

/**
 * Get filter options controller
 * GET /api/sales/filter-options
 */
async function getFilterOptions(req, res) {
    const result = await getFilterOptionsService();
    
    if (result.success) {
        res.json({
            success: true,
            ...result.data
        });
    } else {
        handleError(result, 'Get Filter Options');
        res.json({
            success: true,
            regions: [],
            genders: [],
            categories: [],
            tags: [],
            paymentMethods: [],
            engagementMethods: []
        });
    }
}

module.exports = getFilterOptions;


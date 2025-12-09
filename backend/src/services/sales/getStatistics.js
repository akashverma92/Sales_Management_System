const query = require('../../utils/db/query');
const { safeDbOperation } = require('../../utils/errorHandlers');
const { DatabaseError } = require('../../utils/errors');
const buildWhereConditions = require('./helpers/buildWhereConditions');

/**
 * Get statistics for filtered data
 * Returns: { success, data: { stats }, error }
 */
async function getStatistics(options = {}) {
    return await safeDbOperation(async () => {
        const {
            search = '',
            filters = {}
        } = options;

        const { whereClause, params } = buildWhereConditions(filters, search);

        const statsSql = `
            SELECT 
                COUNT(*) as total_transactions,
                COALESCE(SUM(quantity), 0) as total_units,
                COALESCE(SUM(total_amount), 0) as total_amount,
                COALESCE(SUM(total_amount - final_amount), 0) as total_discount
            FROM sales_data
            ${whereClause}
        `;

        const result = await query(statsSql, params);
        
        if (!result.success) {
            throw new DatabaseError('Failed to fetch statistics', result.error);
        }

        const stats = result.data[0] || {};

        return {
            totalUnits: parseInt(stats.total_units) || 0,
            totalAmount: parseFloat(stats.total_amount) || 0,
            totalDiscount: parseFloat(stats.total_discount) || 0,
            totalTransactions: parseInt(stats.total_transactions) || 0
        };
    }, 'Get Statistics');
}

module.exports = getStatistics;


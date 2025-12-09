const query = require('../../utils/db/query');
const { safeDbOperation } = require('../../utils/errorHandlers');
const { DatabaseError } = require('../../utils/errors');
const buildWhereConditions = require('./helpers/buildWhereConditions');
const buildOrderByClause = require('./helpers/buildOrderByClause');
const normalizeSalesData = require('./helpers/normalizeSalesData');

/**
 * Get paginated sales data
 * Returns: { success, data: { data, pagination }, error }
 */
async function getSalesData(options = {}) {
    return await safeDbOperation(async () => {
        const {
            search = '',
            filters = {},
            sortBy = 'name-asc',
            page = 1,
            pageSize = 10
        } = options;

        const { whereClause, params } = buildWhereConditions(filters, search);
        const orderByClause = buildOrderByClause(sortBy);

        const currentPage = Math.max(1, parseInt(page) || 1);
        const limit = Math.max(1, Math.min(parseInt(pageSize) || 10, 100));
        const offset = (currentPage - 1) * limit;

        // Get total count
        const countSql = `SELECT COUNT(*) as total FROM sales_data ${whereClause}`;
        const countResult = await query(countSql, params);
        
        if (!countResult.success) {
            throw new DatabaseError('Failed to get total count', countResult.error);
        }

        const totalRecords = Number(countResult.data[0]?.total) || 0;
        const totalPages = Math.ceil(totalRecords / limit);

        // Get paginated data
        const dataSql = `
            SELECT 
                transaction_id, date, customer_id, customer_name, phone_number,
                gender, age, customer_region, product_category, tags,
                payment_method, delivery_type, quantity, price_per_unit,
                discount_percentage, total_amount, final_amount
            FROM sales_data
            ${whereClause}
            ${orderByClause}
            LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
        `;
        
        const rowsResult = await query(dataSql, params);
        
        if (!rowsResult.success) {
            throw new DatabaseError('Failed to fetch sales data', rowsResult.error);
        }

        const normalizedData = (rowsResult.data || []).map(normalizeSalesData);

        return {
            data: normalizedData,
            pagination: {
                currentPage,
                pageSize: limit,
                totalRecords,
                totalPages,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1
            }
        };
    }, 'Get Sales Data');
}

module.exports = getSalesData;


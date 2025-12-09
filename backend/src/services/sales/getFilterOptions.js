const query = require('../../utils/db/query');
const { safeDbOperation } = require('../../utils/errorHandlers');

/**
 * Get unique values for filter options
 * Returns: { success, data: { options }, error }
 */
async function getFilterOptions() {
    return await safeDbOperation(async () => {
        const queries = [
            query(`SELECT DISTINCT customer_region as value FROM sales_data WHERE customer_region IS NOT NULL AND customer_region != '' ORDER BY customer_region`),
            query(`SELECT DISTINCT gender as value FROM sales_data WHERE gender IS NOT NULL AND gender != '' ORDER BY gender`),
            query(`SELECT DISTINCT product_category as value FROM sales_data WHERE product_category IS NOT NULL AND product_category != '' ORDER BY product_category`),
            query(`SELECT DISTINCT tags as value FROM sales_data WHERE tags IS NOT NULL AND tags != '' ORDER BY tags`),
            query(`SELECT DISTINCT payment_method as value FROM sales_data WHERE payment_method IS NOT NULL AND payment_method != '' ORDER BY payment_method`),
            query(`SELECT DISTINCT delivery_type as value FROM sales_data WHERE delivery_type IS NOT NULL AND delivery_type != '' ORDER BY delivery_type`)
        ];

        const results = await Promise.all(queries);

        const processResult = (result, defaultValue = []) => {
            if (result.success && result.data) {
                return result.data.map(r => r.value).filter(Boolean);
            }
            return defaultValue;
        };

        return {
            regions: processResult(results[0], []),
            genders: processResult(results[1], []),
            categories: processResult(results[2], []),
            tags: processResult(results[3], []),
            paymentMethods: processResult(results[4], []),
            engagementMethods: processResult(results[5], [])
        };
    }, 'Get Filter Options');
}

module.exports = getFilterOptions;


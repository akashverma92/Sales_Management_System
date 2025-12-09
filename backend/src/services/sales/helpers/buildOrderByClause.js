/**
 * Build ORDER BY clause based on sortBy parameter
 * Atomic - returns safe default on error
 */
function buildOrderByClause(sortBy) {
    try {
        switch (sortBy) {
            case 'name-desc':
                return 'ORDER BY customer_name DESC';
            case 'name-asc':
                return 'ORDER BY customer_name ASC';
            case 'date-desc':
                return 'ORDER BY date DESC';
            case 'date-asc':
                return 'ORDER BY date ASC';
            case 'quantity-desc':
                return 'ORDER BY quantity DESC';
            case 'quantity-asc':
                return 'ORDER BY quantity ASC';
            default:
                return 'ORDER BY customer_name ASC';
        }
    } catch (error) {
        return 'ORDER BY customer_name ASC';
    }
}

module.exports = buildOrderByClause;


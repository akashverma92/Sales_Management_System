/**
 * Build WHERE clause conditions based on filters
 * Atomic - returns safe defaults on error
 */
function buildWhereConditions(filters, search) {
    try {
        const conditions = [];
        const params = [];

        // Search filter
        if (search && search.trim() !== '') {
            conditions.push(`(LOWER(COALESCE(customer_name, '')) LIKE ? OR REPLACE(COALESCE(phone_number, ''), ' ', '') LIKE ?)`);
            const searchPattern = `%${search.trim().toLowerCase()}%`;
            params.push(searchPattern, searchPattern.replace(/\s+/g, ''));
        }

        // Region filter
        if (filters.region && filters.region !== 'all') {
            conditions.push(`LOWER(COALESCE(customer_region, '')) = ?`);
            params.push(filters.region.toLowerCase());
        }

        // Gender filter
        if (filters.gender && filters.gender !== 'all') {
            conditions.push(`LOWER(COALESCE(gender, '')) = ?`);
            params.push(filters.gender.toLowerCase());
        }

        // Age range filter
        if (filters.ageRange && filters.ageRange !== 'all') {
            switch (filters.ageRange) {
                case '18-30':
                    conditions.push(`age >= 18 AND age <= 30`);
                    break;
                case '31-45':
                    conditions.push(`age >= 31 AND age <= 45`);
                    break;
                case '46-60':
                    conditions.push(`age >= 46 AND age <= 60`);
                    break;
                case '60+':
                    conditions.push(`age > 60`);
                    break;
            }
        }

        // Category filter
        if (filters.category && filters.category !== 'all') {
            conditions.push(`LOWER(COALESCE(product_category, '')) = ?`);
            params.push(filters.category.toLowerCase());
        }

        // Tag filter
        if (filters.tag && filters.tag !== 'all') {
            conditions.push(`LOWER(COALESCE(tags, '')) = ?`);
            params.push(filters.tag.toLowerCase());
        }

        // Payment method filter
        if (filters.payment && filters.payment !== 'all') {
            conditions.push(`LOWER(REPLACE(COALESCE(payment_method, ''), ' ', '-')) = ?`);
            params.push(filters.payment.toLowerCase().replace(/\s+/g, '-'));
        }

        // Date filter
        if (filters.date && filters.date !== 'all' && filters.date !== '') {
            if (filters.date.includes(',')) {
                const [startDate, endDate] = filters.date.split(',').map(d => d.trim());
                conditions.push(`date >= ? AND date <= ?`);
                params.push(startDate, endDate);
            } else {
                conditions.push(`date = ?`);
                params.push(filters.date);
            }
        }

        // Engagement filter
        if (filters.engagement && filters.engagement !== 'all') {
            conditions.push(`LOWER(COALESCE(delivery_type, '')) = ?`);
            params.push(filters.engagement.toLowerCase());
        }

        return {
            whereClause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
            params
        };
    } catch (error) {
        return {
            whereClause: '',
            params: []
        };
    }
}

module.exports = buildWhereConditions;


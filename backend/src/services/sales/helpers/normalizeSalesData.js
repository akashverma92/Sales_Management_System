/**
 * Normalize database row to match frontend expectations
 * Atomic - handles errors gracefully
 */
function normalizeSalesData(row) {
    try {
        return {
            transactionId: row.transaction_id || '',
            date: row.date || '',
            customerId: row.customer_id || '',
            customerName: row.customer_name || '',
            phone: row.phone_number || '',
            gender: (row.gender || '').toLowerCase(),
            age: parseInt(row.age) || 0,
            region: (row.customer_region || '').toLowerCase(),
            category: (row.product_category || '').toLowerCase(),
            tag: (row.tags || '').toLowerCase(),
            payment: (row.payment_method || '').toLowerCase().replace(/\s+/g, '-'),
            engagement: (row.delivery_type || '').toLowerCase(),
            quantity: parseInt(row.quantity) || 0,
            pricePerUnit: parseFloat(row.price_per_unit) || 0,
            discountPercentage: parseFloat(row.discount_percentage) || 0,
            totalAmount: parseFloat(row.total_amount) || 0,
            finalAmount: parseFloat(row.final_amount) || 0,
        };
    } catch (error) {
        // Return safe defaults if normalization fails
        return {
            transactionId: '',
            date: '',
            customerId: '',
            customerName: '',
            phone: '',
            gender: '',
            age: 0,
            region: '',
            category: '',
            tag: '',
            payment: '',
            engagement: '',
            quantity: 0,
            pricePerUnit: 0,
            discountPercentage: 0,
            totalAmount: 0,
            finalAmount: 0,
        };
    }
}

module.exports = normalizeSalesData;


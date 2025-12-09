const handleError = require('./handleError');

/**
 * Safe database operation wrapper
 * Returns error object instead of throwing
 */
async function safeDbOperation(operation, errorContext = 'Database Operation') {
    try {
        return {
            success: true,
            data: await operation()
        };
    } catch (error) {
        const errorInfo = handleError(error, errorContext);
        return {
            success: false,
            error: errorInfo.message,
            code: errorInfo.code,
            details: error.sqlMessage || errorInfo.details
        };
    }
}

module.exports = safeDbOperation;


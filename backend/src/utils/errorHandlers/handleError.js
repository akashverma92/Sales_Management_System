const { ServiceError } = require('../errors');

/**
 * Handle and log errors without crashing the system
 * Returns error info object instead of throwing
 */
function handleError(error, context = 'Unknown') {
    const errorInfo = {
        context,
        message: error.message || 'Unknown error',
        code: error.code || 'UNKNOWN_ERROR',
        timestamp: new Date().toISOString()
    };

    // Log based on error type
    if (error instanceof ServiceError) {
        console.error(`[${context}] Service Error:`, {
            ...errorInfo,
            statusCode: error.statusCode,
            details: error.details
        });
    } else if (error.code === 'ER_WRONG_ARGUMENTS' || error.code === 'ER_BAD_FIELD_ERROR') {
        console.error(`[${context}] Database Query Error:`, {
            ...errorInfo,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
        });
    } else {
        console.error(`[${context}] Unexpected Error:`, {
            ...errorInfo,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }

    return errorInfo;
}

module.exports = handleError;


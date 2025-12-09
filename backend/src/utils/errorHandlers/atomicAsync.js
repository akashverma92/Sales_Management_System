const handleError = require('./handleError');

/**
 * Wrap async function with atomic error handling
 * Returns error object instead of throwing
 */
function atomicAsync(fn, errorContext = 'Atomic Operation') {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            const errorInfo = handleError(error, errorContext);
            return {
                success: false,
                error: errorInfo.message,
                code: errorInfo.code,
                context: errorContext
            };
        }
    };
}

module.exports = atomicAsync;


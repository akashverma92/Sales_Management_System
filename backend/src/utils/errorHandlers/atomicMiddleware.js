const handleError = require('./handleError');

/**
 * Express middleware wrapper with atomic error handling
 * Catches errors without affecting other routes
 */
function atomicMiddleware(fn, errorContext = 'Middleware') {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            const errorInfo = handleError(error, errorContext);
            
            if (!res.headersSent) {
                res.status(errorInfo.statusCode || 500).json({
                    success: false,
                    error: errorInfo.message,
                    code: errorInfo.code
                });
            }
        }
    };
}

module.exports = atomicMiddleware;


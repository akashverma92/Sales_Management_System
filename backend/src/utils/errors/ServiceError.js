/**
 * Base Service Error Class
 * All service errors extend this
 */
class ServiceError extends Error {
    constructor(message, code = 'SERVICE_ERROR', statusCode = 500, details = null) {
        super(message);
        this.name = 'ServiceError';
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ServiceError;


const ServiceError = require('./ServiceError');

/**
 * Validation Error Class
 * Used for input validation errors
 */
class ValidationError extends ServiceError {
    constructor(message, details = null) {
        super(message, 'VALIDATION_ERROR', 400, details);
        this.name = 'ValidationError';
    }
}

module.exports = ValidationError;


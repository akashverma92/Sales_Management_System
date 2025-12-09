const ServiceError = require('./ServiceError');

/**
 * Database Error Class
 * Used for database-related errors
 */
class DatabaseError extends ServiceError {
    constructor(message, details = null) {
        super(message, 'DATABASE_ERROR', 503, details);
        this.name = 'DatabaseError';
    }
}

module.exports = DatabaseError;


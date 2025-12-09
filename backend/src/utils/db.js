const mysql = require('mysql2/promise');
const { DatabaseError, safeDbOperation } = require('./errorHandler');

// Database connection pool configuration
let pool = null;
let connectionStatus = {
    connected: false,
    lastCheck: null,
    error: null
};

/**
 * Initialize database connection pool (non-blocking)
 */
function initializePool() {
    if (pool) {
        return pool;
    }

    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'Lucky1verma',
            database: process.env.DB_NAME || 'sales',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
            timeout: 30000,
            // Handle connection errors gracefully
            reconnect: true
        });

        // Handle pool errors without crashing
        pool.on('error', (err) => {
            console.error('Database pool error:', err.message);
            connectionStatus.connected = false;
            connectionStatus.error = err.message;
            // Don't throw - let individual operations handle errors
        });

        return pool;
    } catch (error) {
        console.error('Failed to create database pool:', error.message);
        connectionStatus.error = error.message;
        return null;
    }
}

/**
 * Check database connection status (atomic - doesn't throw)
 */
async function checkConnection() {
    if (!pool) {
        initializePool();
    }

    if (!pool) {
        connectionStatus.connected = false;
        connectionStatus.lastCheck = new Date();
        return false;
    }

    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        connectionStatus.connected = true;
        connectionStatus.lastCheck = new Date();
        connectionStatus.error = null;
        return true;
    } catch (error) {
        connectionStatus.connected = false;
        connectionStatus.lastCheck = new Date();
        connectionStatus.error = error.message;
        // Don't throw - return false instead
        return false;
    }
}

/**
 * Test database connection (atomic - returns status object)
 */
async function testConnection() {
    const result = await safeDbOperation(async () => {
        if (!pool) {
            initializePool();
        }
        
        if (!pool) {
            throw new DatabaseError('Database pool not initialized');
        }

        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        
        connectionStatus.connected = true;
        connectionStatus.lastCheck = new Date();
        connectionStatus.error = null;
        
        return { connected: true };
    }, 'Database Connection Test');

    return result;
}

/**
 * Execute a query with atomic error handling (returns result object, never throws)
 */
async function query(sql, params = []) {
    // Initialize pool if needed
    if (!pool) {
        initializePool();
    }

    if (!pool) {
        return {
            success: false,
            error: 'Database pool not available',
            data: null
        };
    }

    return await safeDbOperation(async () => {
        const startTime = Date.now();
        const [results] = await pool.execute(sql, params);
        const duration = Date.now() - startTime;
        
        if (duration > 1000) {
            console.warn(`Slow query detected: ${duration}ms - ${sql.substring(0, 100)}...`);
        }

        return results;
    }, 'Database Query');
}

/**
 * Get a connection from the pool (atomic - returns error object on failure)
 */
async function getConnection() {
    if (!pool) {
        initializePool();
    }

    if (!pool) {
        return {
            success: false,
            error: 'Database pool not available',
            connection: null
        };
    }

    try {
        const connection = await pool.getConnection();
        return {
            success: true,
            connection: connection
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            connection: null
        };
    }
}

/**
 * Check if a table exists (atomic - returns boolean, never throws)
 */
async function tableExists(tableName) {
    const result = await query(
        `SELECT COUNT(*) as count FROM information_schema.tables 
         WHERE table_schema = ? AND table_name = ?`,
        [process.env.DB_NAME || 'sales', tableName]
    );

    if (!result.success) {
        return false;
    }

    return result.data && result.data[0]?.count > 0;
}

/**
 * Get connection status (atomic - never throws)
 */
function getConnectionStatus() {
    return {
        ...connectionStatus,
        poolInitialized: pool !== null
    };
}

// Initialize pool on module load (non-blocking)
initializePool();

module.exports = {
    pool: () => pool, // Return getter function to prevent direct access
    initializePool,
    checkConnection,
    testConnection,
    query,
    getConnection,
    tableExists,
    getConnectionStatus
};

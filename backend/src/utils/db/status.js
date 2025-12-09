const { getPool } = require('./connection');

/**
 * Connection Status Tracker
 */
let connectionStatus = {
    connected: false,
    lastCheck: null,
    error: null
};

/**
 * Check database connection status
 */
async function checkConnection() {
    const pool = getPool();
    
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
        return false;
    }
}

/**
 * Get connection status
 */
function getConnectionStatus() {
    return {
        ...connectionStatus,
        poolInitialized: getPool() !== null
    };
}

/**
 * Update connection status
 */
function updateStatus(connected, error = null) {
    connectionStatus.connected = connected;
    connectionStatus.lastCheck = new Date();
    connectionStatus.error = error;
}

module.exports = {
    checkConnection,
    getConnectionStatus,
    updateStatus
};


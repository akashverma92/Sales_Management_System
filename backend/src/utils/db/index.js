/**
 * Database Utilities Export
 * Central export for all database operations
 */
const { initializePool, getPool } = require('./connection');
const { checkConnection, getConnectionStatus, updateStatus } = require('./status');
const query = require('./query');
const testConnection = require('./testConnection');
const getConnection = require('./getConnection');
const tableExists = require('./tableExists');

// Initialize pool on module load
initializePool();

module.exports = {
    pool: () => getPool(),
    initializePool,
    checkConnection,
    testConnection,
    query,
    getConnection,
    tableExists,
    getConnectionStatus
};


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const salesRoutes = require('./routes/salesRoutes');
const db = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (atomic - each middleware is independent)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database connection (non-blocking - server starts even if DB fails)
async function initializeDatabase() {
    try {
        const result = await db.testConnection();
        
        if (result.success) {
            console.log('✓ Database initialized successfully');
            
            // Check if sales_data table exists (atomic - doesn't block)
            const tableExists = await db.tableExists('sales_data');
            if (!tableExists) {
                console.warn('⚠ Warning: sales_data table not found. Please ensure the table exists.');
                console.warn('   Run the Python script data/dbload.py to create and populate the table.');
            } else {
                console.log('✓ sales_data table found');
            }
        } else {
            console.warn('⚠ Database connection test failed:', result.error);
            console.warn('   Server will start but API endpoints may not work until database is available.');
        }
    } catch (error) {
        // Database initialization failed but server continues
        console.warn('⚠ Database initialization warning:', error.message);
        console.warn('   Server will start but API endpoints may not work until database is available.');
    }
}

// Initialize database on startup (non-blocking - doesn't prevent server start)
initializeDatabase().catch(err => {
    // Even if initialization fails completely, server still starts
    console.warn('⚠ Database initialization error (non-critical):', err.message);
});

// Routes (atomic - each route is independent)
app.use('/api/sales', salesRoutes);

// Root endpoint (atomic - always works)
app.get('/', (req, res) => {
    const dbStatus = db.getConnectionStatus();
    
    res.json({
        message: 'Sales Management System API',
        version: '1.0.0',
        status: 'running',
        database: {
            poolInitialized: dbStatus.poolInitialized,
            connected: dbStatus.connected
        },
        endpoints: {
            health: '/api/sales/health',
            sales: '/api/sales',
            statistics: '/api/sales/statistics',
            filterOptions: '/api/sales/filter-options',
            testQuery: '/api/sales/test-query'
        }
    });
});

// Error handling middleware (atomic - catches errors without crashing server)
app.use((err, req, res, next) => {
    // Log error but don't crash
    console.error('Unhandled error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method
    });
    
    // Send error response if headers not sent
    if (!res.headersSent) {
        res.status(err.statusCode || 500).json({
            success: false,
            error: err.message || 'Internal server error',
            code: err.code || 'INTERNAL_ERROR'
        });
    }
});

// 404 handler (atomic - always works)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path,
        availableEndpoints: {
            health: '/api/sales/health',
            sales: '/api/sales',
            statistics: '/api/sales/statistics',
            filterOptions: '/api/sales/filter-options'
        }
    });
});

// Start server (atomic - always starts, even if database is down)
app.listen(PORT, () => {
    console.log(`\n✓ Server is running on http://localhost:${PORT}`);
    console.log(`✓ API endpoints available at http://localhost:${PORT}/api/sales`);
    console.log(`✓ Health check: http://localhost:${PORT}/api/sales/health\n`);
    
    // Log database status
    const dbStatus = db.getConnectionStatus();
    if (!dbStatus.connected) {
        console.log('⚠ Database connection status: Not connected');
        console.log('   API endpoints will return errors until database is available.\n');
    }
});

// Graceful shutdown handling (atomic)
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    process.exit(0);
});

// Handle uncaught exceptions (atomic - log but don't crash)
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception (non-critical):', error.message);
    // Don't exit - let the server continue running
});

// Handle unhandled promise rejections (atomic - log but don't crash)
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection (non-critical):', reason);
    // Don't exit - let the server continue running
});

module.exports = app;

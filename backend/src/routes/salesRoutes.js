const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { atomicMiddleware } = require('../utils/errorHandler');

// Health check (atomic - always works, even if database is down)
router.get('/health', atomicMiddleware(salesController.healthCheck, 'Health Check'));

// Test query endpoint for debugging (atomic)
router.get('/test-query', atomicMiddleware(salesController.testQuery, 'Test Query'));

// Get sales data with filters, search, sorting, and pagination (atomic)
router.get('/', atomicMiddleware(salesController.getSales, 'Get Sales'));

// Get statistics (atomic)
router.get('/statistics', atomicMiddleware(salesController.getStatistics, 'Get Statistics'));

// Get filter options (atomic)
router.get('/filter-options', atomicMiddleware(salesController.getFilterOptions, 'Get Filter Options'));

module.exports = router;


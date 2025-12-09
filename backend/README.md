# Sales Management System - Backend API

Backend API for the Sales Management System that handles MySQL data processing, search, filtering, sorting, and pagination.

## Features

- ✅ MySQL database integration with connection pooling
- ✅ Full-text search (Customer Name, Phone Number)
- ✅ Multi-select filters (Region, Gender, Age Range, Category, Tags, Payment Method, Date Range)
- ✅ Sorting (Date, Quantity, Customer Name)
- ✅ Database-level pagination (10 items per page) for optimal performance
- ✅ Statistics calculation with SQL aggregation
- ✅ Filter options endpoint
- ✅ Production-ready with environment variable configuration

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MySQL Database

Ensure MySQL is installed and running. Create a database named `sales` (or use your preferred database name).

### 3. Load Data into MySQL

Use the Python script `data/dbload.py` to load your CSV data into MySQL:

```bash
# Install Python dependencies if needed
pip install pandas sqlalchemy mysql-connector-python

# Run the data loader
python data/dbload.py
```

The script will create a table `sales_data` with the following columns:
- transaction_id
- date
- customer_id
- customer_name
- phone_number
- gender
- age
- customer_region
- customer_type
- product_id
- product_name
- brand
- product_category
- tags
- quantity
- price_per_unit
- discount_percentage
- total_amount
- final_amount
- payment_method
- order_status
- delivery_type
- store_id
- store_location
- salesperson_id
- employee_name

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=sales

# Server Configuration
PORT=5000

# Environment
NODE_ENV=production
```

**Important:** Never commit your `.env` file to version control. Use environment variables in production.

### 5. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
```
GET /api/sales/health
```

### Get Sales Data
```
GET /api/sales?search=&region=all&gender=all&ageRange=all&category=all&tag=all&payment=all&date=&engagement=all&sortBy=name-asc&page=1&pageSize=10
```

**Query Parameters:**
- `search` - Search query (Customer Name or Phone Number)
- `region` - Filter by region (default: 'all')
- `gender` - Filter by gender (default: 'all')
- `ageRange` - Filter by age range: '18-30', '31-45', '46-60', '60+' (default: 'all')
- `category` - Filter by product category (default: 'all')
- `tag` - Filter by tags (default: 'all')
- `payment` - Filter by payment method (default: 'all')
- `date` - Filter by date (YYYY-MM-DD) or date range (YYYY-MM-DD,YYYY-MM-DD)
- `engagement` - Filter by engagement/delivery type (default: 'all')
- `sortBy` - Sort by: 'name-asc', 'name-desc', 'date-asc', 'date-desc', 'quantity-asc', 'quantity-desc' (default: 'name-asc')
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalRecords": 100000,
    "totalPages": 10000,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Get Statistics
```
GET /api/sales/statistics?search=&region=all&gender=all&...
```

**Response:**
```json
{
  "success": true,
  "totalUnits": 1000,
  "totalAmount": 500000,
  "totalDiscount": 50000,
  "totalTransactions": 100
}
```

### Get Filter Options
```
GET /api/sales/filter-options
```

**Response:**
```json
{
  "success": true,
  "regions": ["north", "south", "east", "west", "central"],
  "genders": ["male", "female", "other"],
  "categories": ["clothing", "electronics", "furniture", "beauty", "sports"],
  "tags": ["new", "discount", "popular", "seasonal"],
  "paymentMethods": ["cash", "upi", "card", "net-banking"],
  "engagementMethods": ["phone", "email", "in-person", "online"]
}
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   └── salesController.js
│   ├── services/        # Business logic
│   │   └── salesService.js
│   ├── routes/          # API routes
│   │   └── salesRoutes.js
│   ├── utils/           # Utility functions
│   │   └── csvParser.js
│   └── index.js         # Entry point
├── data/                # CSV data files (create this directory)
├── .env                 # Environment variables
├── package.json
└── README.md
```

## Production Deployment

### Environment Variables

Set the following environment variables in your production environment:

- `DB_HOST` - MySQL host (e.g., `localhost` or your database server IP)
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default: `sales`)
- `PORT` - Server port (default: `5000`)
- `NODE_ENV` - Set to `production` for production mode

### Performance Optimizations

- **Connection Pooling**: Uses MySQL connection pooling (max 10 connections) for efficient database access
- **Database-Level Pagination**: Only fetches 10 rows per page directly from MySQL, reducing memory usage
- **Indexed Queries**: Ensure your MySQL table has indexes on frequently filtered columns:
  ```sql
  CREATE INDEX idx_customer_name ON sales_data(customer_name);
  CREATE INDEX idx_phone_number ON sales_data(phone_number);
  CREATE INDEX idx_date ON sales_data(date);
  CREATE INDEX idx_region ON sales_data(customer_region);
  CREATE INDEX idx_category ON sales_data(product_category);
  ```

### Notes

- The API uses database-level pagination for optimal performance with large datasets
- All queries are parameterized to prevent SQL injection
- The API supports case-insensitive search and filtering
- Connection pooling ensures efficient database resource management
- All date comparisons are done as string comparisons (YYYY-MM-DD format)


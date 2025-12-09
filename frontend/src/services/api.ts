const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface SalesFilters {
    search?: string;
    region?: string;
    gender?: string;
    ageRange?: string;
    category?: string;
    tag?: string;
    payment?: string;
    date?: string;
    engagement?: string;
    sortBy?: string;
    page?: number;
    pageSize?: number;
}

export interface SalesResponse {
    success: boolean;
    data: SaleRow[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalRecords: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface StatisticsResponse {
    success: boolean;
    totalUnits: number;
    totalAmount: number;
    totalDiscount: number;
    totalTransactions: number;
}

export interface SaleRow {
    transactionId: string;
    date: string;
    customerId: string;
    customerName: string;
    phone: string;
    gender: string;
    age: number;
    region: string;
    category: string;
    tag: string;
    payment: string;
    engagement: string;
    quantity: number;
    pricePerUnit?: number;
    discountPercentage?: number;
    totalAmount?: number;
    finalAmount?: number;
}

/**
 * Fetch sales data from backend API
 */
export async function fetchSalesData(filters: SalesFilters): Promise<SalesResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, String(value));
        }
    });
    
    const response = await fetch(`${API_BASE_URL}/sales?${params.toString()}`);
    
    if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `Failed to fetch sales data: ${response.statusText}`;
        try {
            const errorData = await response.json();
            if (errorData.error) {
                errorMessage = errorData.error;
            }
            if (errorData.details && process.env.NODE_ENV === 'development') {
                console.error('Backend error details:', errorData.details);
            }
        } catch (e) {
            // If response is not JSON, use status text
        }
        throw new Error(errorMessage);
    }
    
    return response.json();
}

/**
 * Fetch statistics from backend API
 */
export async function fetchStatistics(filters: Omit<SalesFilters, 'page' | 'pageSize' | 'sortBy'>): Promise<StatisticsResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, String(value));
        }
    });
    
    const response = await fetch(`${API_BASE_URL}/sales/statistics?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch statistics: ${response.statusText}`);
    }
    
    return response.json();
}

/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-IN').format(num);
}


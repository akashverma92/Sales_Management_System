'use client';

import React, { useEffect, useState } from 'react';
import { Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { FiltersState } from '../../features/dashboard/DashboardPage';
import { fetchSalesData, type SaleRow } from '../../services/api';

interface SalesTableProps {
    filters: FiltersState & { search?: string };
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const SalesTable: React.FC<SalesTableProps> = ({ filters, currentPage, onPageChange }) => {
    const [data, setData] = useState<SaleRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalRecords: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetchSalesData({
                    search: filters.search,
                    region: filters.region,
                    gender: filters.gender,
                    ageRange: filters.ageRange,
                    category: filters.category,
                    tag: filters.tag,
                    payment: filters.payment,
                    date: filters.date,
                    engagement: filters.engagement,
                    sortBy: filters.sortBy,
                    page: currentPage,
                    pageSize: 10,
                });
                
                if (response.success) {
                    setData(response.data);
                    setPagination(response.pagination);
                } else {
                    setError('Failed to load sales data');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching sales data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [filters, currentPage]);

    const handleCopyPhone = (phone: string) => {
        navigator.clipboard.writeText(phone);
    };

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm mt-4">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-[#F9FAFB] text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap">Transaction ID</th>
                            <th className="px-6 py-4 whitespace-nowrap">Date</th>
                            <th className="px-6 py-4 whitespace-nowrap">Customer ID</th>
                            <th className="px-6 py-4 whitespace-nowrap">Customer Name</th>
                            <th className="px-6 py-4 whitespace-nowrap">Phone Number</th>
                            <th className="px-6 py-4 whitespace-nowrap">Gender</th>
                            <th className="px-6 py-4 whitespace-nowrap">Age</th>
                            <th className="px-6 py-4 whitespace-nowrap">Product Category</th>
                            <th className="px-6 py-4 whitespace-nowrap">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && (
                            <tr>
                                <td className="px-6 py-8 text-center text-gray-500" colSpan={9}>
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td className="px-6 py-8 text-center text-red-500" colSpan={9}>
                                    {error}
                                </td>
                            </tr>
                        )}
                        {!loading && !error && data.map((row) => (
                            <tr key={row.transactionId} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.transactionId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{row.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.customerId}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <span>{row.phone}</span>
                                        <Copy 
                                            className="h-3.5 w-3.5 text-gray-300 cursor-pointer hover:text-blue-500 transition-colors" 
                                            onClick={() => handleCopyPhone(row.phone)}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap capitalize">{row.gender}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{row.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 capitalize">
                                        {row.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 font-medium">
                                    {row.quantity.toString().padStart(2, '0')}
                                </td>
                            </tr>
                        ))}
                        {!loading && !error && data.length === 0 && (
                            <tr>
                                <td className="px-6 py-6 text-center text-gray-500" colSpan={9}>
                                    No records match your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Controls */}
            {!loading && !error && pagination.totalPages > 0 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{((pagination.currentPage - 1) * pagination.pageSize) + 1}</span> to{' '}
                        <span className="font-medium">
                            {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalRecords)}
                        </span> of{' '}
                        <span className="font-medium">{pagination.totalRecords}</span> results
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPreviousPage}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => onPageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNextPage}
                            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

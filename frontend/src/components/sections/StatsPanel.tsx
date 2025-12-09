'use client';

import React, { useEffect, useState } from 'react';
import { StatCard } from '../modules/StatCard';
import { fetchStatistics, formatCurrency, formatNumber } from '../../services/api';
import { FiltersState } from '../../features/dashboard/DashboardPage';

interface StatsPanelProps {
    filters: FiltersState & { search?: string };
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ filters }) => {
    const [stats, setStats] = useState({
        totalUnits: 0,
        totalAmount: 0,
        totalDiscount: 0,
        totalTransactions: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            setLoading(true);
            try {
                const response = await fetchStatistics({
                    search: filters.search,
                    region: filters.region,
                    gender: filters.gender,
                    ageRange: filters.ageRange,
                    category: filters.category,
                    tag: filters.tag,
                    payment: filters.payment,
                    date: filters.date,
                    engagement: filters.engagement,
                });
                
                if (response.success) {
                    setStats({
                        totalUnits: response.totalUnits,
                        totalAmount: response.totalAmount,
                        totalDiscount: response.totalDiscount,
                        totalTransactions: response.totalTransactions,
                    });
                }
            } catch (error) {
                console.error('Error fetching statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, [filters]);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                label="Total units sold"
                value={loading ? '...' : formatNumber(stats.totalUnits)}
            />
            <StatCard
                label="Total Amount"
                value={loading ? '...' : formatCurrency(stats.totalAmount)}
                subValue={`(${formatNumber(stats.totalTransactions)} Trans)`}
            />
            <StatCard
                label="Total Discount"
                value={loading ? '...' : formatCurrency(stats.totalDiscount)}
            />
        </div>
    );
};

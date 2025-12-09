'use client';

import React, { useMemo, useState } from 'react';
import { FilterBar } from '../../components/sections/FilterBar';
import { StatsPanel } from '../../components/sections/StatsPanel';
import { SalesTable } from '../../components/sections/SalesTable';

export type FiltersState = {
    region: string;
    gender: string;
    ageRange: string;
    category: string;
    tag: string;
    payment: string;
    date: string;
    engagement: string;
    sortBy: string;
};

const defaultFilters: FiltersState = {
    region: 'all',
    gender: 'all',
    ageRange: 'all',
    category: 'all',
    tag: 'all',
    payment: 'all',
    date: '',
    engagement: 'all',
    sortBy: 'name-asc',
};

export interface DashboardPageProps {
    searchValue?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ searchValue = '' }) => {
    const [filters, setFilters] = useState<FiltersState>(defaultFilters);
    const [currentPage, setCurrentPage] = useState(1);

    const handleFilterChange = (key: keyof FiltersState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleReset = () => {
        setFilters(defaultFilters);
        setCurrentPage(1);
    };

    const effectiveFilters = useMemo(
        () => ({ ...filters, search: searchValue }),
        [filters, searchValue]
    );

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Filters */}
            <section>
                <FilterBar
                    filters={filters}
                    onChange={handleFilterChange}
                    onReset={handleReset}
                />
            </section>

            {/* Stats */}
            <section>
                <StatsPanel filters={effectiveFilters} />
            </section>

            {/* Data Table */}
            <section>
                <SalesTable 
                    filters={effectiveFilters} 
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </section>
        </div>
    );
};

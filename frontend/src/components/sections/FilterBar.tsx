import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '../elements/Button';
import { FiltersState } from '../../features/dashboard/DashboardPage';

interface FilterBarProps {
    filters: FiltersState;
    onChange: (key: keyof FiltersState, value: string) => void;
    onReset?: () => void;
}

const selectBase = 'h-9 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20';

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange, onReset }) => {
    return (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-400 hover:text-gray-600"
                onClick={onReset}
            >
                <RotateCcw className="h-4 w-4" />
            </Button>

            <select
                className={`${selectBase} w-40`}
                value={filters.region}
                onChange={(e) => onChange('region', e.target.value)}
            >
                <option value="all">Region</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="central">Central</option>
            </select>

            <select
                className={`${selectBase} w-32`}
                value={filters.gender}
                onChange={(e) => onChange('gender', e.target.value)}
            >
                <option value="all">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <select
                className={`${selectBase} w-36`}
                value={filters.ageRange}
                onChange={(e) => onChange('ageRange', e.target.value)}
            >
                <option value="all">Age Range</option>
                <option value="18-30">18-30</option>
                <option value="31-45">31-45</option>
                <option value="46-60">46-60</option>
                <option value="60+">60+</option>
            </select>

            <select
                className={`${selectBase} w-44`}
                value={filters.category}
                onChange={(e) => onChange('category', e.target.value)}
            >
                <option value="all">Product Category</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="beauty">Beauty</option>
                <option value="sports">Sports</option>
            </select>

            <select
                className={`${selectBase} w-36`}
                value={filters.tag}
                onChange={(e) => onChange('tag', e.target.value)}
            >
                <option value="all">Tags</option>
                <option value="new">New</option>
                <option value="discount">Discount</option>
                <option value="popular">Popular</option>
                <option value="seasonal">Seasonal</option>
            </select>

            <select
                className={`${selectBase} w-48`}
                value={filters.engagement}
                onChange={(e) => onChange('engagement', e.target.value)}
            >
                <option value="all">Engagement Method</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="in-person">In-person</option>
                <option value="online">Online</option>
            </select>

            <select
                className={`${selectBase} w-36`}
                value={filters.payment}
                onChange={(e) => onChange('payment', e.target.value)}
            >
                <option value="all">Payment</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="net-banking">Net Banking</option>
            </select>

            <input
                type="date"
                className={`${selectBase} w-40`}
                value={filters.date}
                onChange={(e) => onChange('date', e.target.value)}
            />

            <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
                <select
                    className={`${selectBase} w-48 border-none bg-transparent shadow-none`}
                    value={filters.sortBy}
                    onChange={(e) => onChange('sortBy', e.target.value)}
                >
                    <option value="name-asc">Customer Name (A-Z)</option>
                    <option value="name-desc">Customer Name (Z-A)</option>
                    <option value="date-desc">Date (Newest)</option>
                    <option value="date-asc">Date (Oldest)</option>
                </select>
            </div>
        </div>
    );
};

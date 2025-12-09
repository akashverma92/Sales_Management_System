import React from 'react';
import { Info } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    subValue?: string; // For the "(19 ...)" part
    className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    subValue,
    className = ''
}) => {
    return (
        <div className={`rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] ${className}`}>
            <div className="flex items-center justify-between text-sm font-medium text-gray-500 mb-2">
                <span>{label}</span>
                <Info className="h-4 w-4 text-gray-300 cursor-help hover:text-gray-500 transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 tracking-tight">{value}</span>
                {subValue && (
                    <span className="text-xs font-semibold text-gray-400">{subValue}</span>
                )}
            </div>
        </div>
    );
};

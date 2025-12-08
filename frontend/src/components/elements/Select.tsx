import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    placeholder?: string;
    label?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
    placeholder,
    label,
    className = '',
    ...props
}) => {
    return (
        <button
            type="button"
            className={`flex h-9 items-center justify-between whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`}
            {...props}
        >
            <span className="mr-2 text-xs sm:text-sm">{label || placeholder}</span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200 group-active:translate-y-0.5" />
        </button>
    );
};

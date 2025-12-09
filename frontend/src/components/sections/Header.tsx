import React from 'react';
import { SearchField } from '../modules/SearchField';  
interface HeaderProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
    searchValue = '',
    onSearchChange,
}) => {
    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
            <h1 className="text-xl font-bold text-gray-900">Sales Management System</h1>
            <SearchField
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Name, Phone no."
                className="w-80"
            />
        </header>
    );
};

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../elements/Input';

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
    placeholder = "Search...",
    className = '',
    ...props
}) => {
    return (
        <div className={`w-full max-w-xs ${className}`}>
            <Input
                icon={<Search className="h-4 w-4" />}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

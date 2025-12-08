import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ className = '', icon, ...props }) => {
    return (
        <div className="relative flex items-center w-full">
            {icon && (
                <div className="absolute left-3 text-gray-400">
                    {icon}
                </div>
            )}
            <input
                className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${icon ? 'pl-10' : ''} ${className}`}
                {...props}
            />
        </div>
    );
};

import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

export interface SidebarItemProps {
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
    hasSubmenu?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
    className?: string;
    isSubItem?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    label,
    active = false,
    hasSubmenu = false,
    isOpen = false,
    onClick,
    className = '',
    isSubItem = false,
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
        ${active
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-white/5 hover:text-white'
                }
        ${isSubItem ? 'pl-11' : 'mx-2 w-auto'}
        ${className}
      `}
        >
            <div className="flex items-center gap-3">
                {icon && <span className={active ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'}>{icon}</span>}
                <span>{label}</span>
            </div>
            {hasSubmenu && (
                isOpen
                    ? <ChevronDown className="h-4 w-4 text-gray-400" />
                    : <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
        </button>
    );
};

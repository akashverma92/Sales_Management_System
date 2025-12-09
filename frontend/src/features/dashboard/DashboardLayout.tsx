import React from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Header } from '../../components/sections/Header';

interface DashboardLayoutProps {
    children: React.ReactNode;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    searchValue,
    onSearchChange,
}) => {
    return (
        <div className="flex min-h-screen bg-[#F5F6F8]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden bg-[#F5F6F8]">
                <Header searchValue={searchValue} onSearchChange={onSearchChange} />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

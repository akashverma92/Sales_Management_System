'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    History,
    FileText,
    Receipt,
    Settings,
    ChevronDown
} from 'lucide-react';
import { SidebarItem } from '../modules/SidebarItem';

export const Sidebar: React.FC = () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        services: true,
        invoices: true,
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className="flex h-screen w-64 flex-col bg-white text-black">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 px-6 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-black shadow-lg shadow-blue-900/20">
                    <span className="font-bold text-lg">V</span>
                </div>
                <div className="flex-1 overflow-hidden">
                    <h2 className="text-sm font-bold text-black truncate">Vault</h2>
                    <p className="text-xs text-black-400 truncate">Anurag Yadav</p>
                </div>
                <div className="h-7 w-7 rounded-full bg-purple-500 flex items-center justify-center text-black text-[10px] font-medium ring-2 ring-[#1A1C1E]">
                    J
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                <SidebarItem
                    icon={<LayoutDashboard className="h-5 w-5" />}
                    label="Dashboard"
                    active
                />
                <SidebarItem
                    icon={<Users className="h-5 w-5" />}
                    label="Nexus"
                />
                <SidebarItem
                    icon={<History className="h-5 w-5" />}
                    label="Intake"
                />

                {/* Services Section */}
                <div className="pt-4">
                    <SidebarItem
                        icon={<FileText className="h-5 w-5" />}
                        label="Services"
                        hasSubmenu
                        isOpen={openSections.services}
                        onClick={() => toggleSection('services')}
                    />
                    {openSections.services && (
                        <div className="mt-1 space-y-1">
                            <SidebarItem label="Pre-active" isSubItem icon={<div className="w-2 h-2 rounded-full border border-gray-400" />} />
                            <SidebarItem label="Active" isSubItem icon={<div className="w-2 h-2 rounded-full border border-gray-400" />} />
                            <SidebarItem label="Blocked" isSubItem icon={<div className="w-2 h-2 rounded-full border border-gray-400" />} />
                            <SidebarItem label="Closed" isSubItem icon={<div className="w-2 h-2 rounded-full border border-gray-400" />} />
                        </div>
                    )}
                </div>

                {/* Invoices Section */}
                <div className="pt-2">
                    <SidebarItem
                        icon={<Receipt className="h-5 w-5" />}
                        label="Invoices"
                        hasSubmenu
                        isOpen={openSections.invoices}
                        onClick={() => toggleSection('invoices')}
                    />
                    {openSections.invoices && (
                        <div className="mt-1 space-y-1">
                            <SidebarItem label="Proforma Invoices" isSubItem active={false} icon={<div className="w-2 h-2 rounded-full border border-gray-400" />} />
                            <SidebarItem label="Final Invoices" isSubItem icon={<div className="w-2 h-2 rounded-full border border-gray-400" />} />
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
};

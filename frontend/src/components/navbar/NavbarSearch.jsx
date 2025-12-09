"use client";

import { MagnifyingGlassIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function NavbarSearch() {
  return (
    <div className="flex items-center gap-6">

      {/* Search Icon */}
      <button className="flex items-left gap-2 text-gray-700 hover:text-blue-600 text-center">
        <MagnifyingGlassIcon className="h-6 w-6" />
        <span className="text-sm">Search</span>
      </button>

      {/* Contact */}
      <div className="flex items-right gap-2 text-gray-700">
        <PhoneIcon className="h-6 w-6" />
        <span className="text-sm font-medium">+91 98765 43210</span>
      </div>

    </div>
  );
}

"use client";

import NavbarHeader from "./NavbarHeader";
import NavbarSearch from "./NavbarSearch";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <NavbarHeader />
      <NavbarSearch />
    </nav>
  );
}

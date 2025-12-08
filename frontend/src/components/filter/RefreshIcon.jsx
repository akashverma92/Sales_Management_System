"use client";

import { RotateCcw } from "lucide-react";

export default function RefreshIcon() {
  return (
    <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600">
      <RotateCcw size={16} />
      Refresh
    </button>
  );
}

"use client";

export default function SortByName() {
  return (
    <select className="border rounded-md px-2 py-1 text-sm">
      <option>Sort A–Z</option>
      <option>Name A–Z</option>
      <option>Name Z–A</option>
    </select>
  );
}

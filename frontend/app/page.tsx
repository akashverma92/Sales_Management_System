"use client";
import { useState } from "react";
import { DashboardLayout } from "../src/features/dashboard/DashboardLayout";
import { DashboardPage } from "../src/features/dashboard/DashboardPage";

export default function Page() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <DashboardLayout
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    >
      <DashboardPage searchValue={searchValue} />
    </DashboardLayout>
  );
}

import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Retail Sales Management System",
  description: "TruEstate SDE Intern Assignment - Frontend",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#F3F4F6]`}>{children}</body>
    </html>
  );
}

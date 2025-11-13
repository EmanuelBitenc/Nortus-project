"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#071225] flex">
      <Sidebar />
      <main className="flex-1 ml-20">{children}</main>
    </div>
  );
}

"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-(--background)">
      <Sidebar />
      <main className="ml-20 flex-1">{children}</main>
    </div>
  );
}

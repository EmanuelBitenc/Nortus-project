"use client";

import DashboardLayout from "@/components/page-layout";
import HeaderPages from "@/components/header-pages";

export default function gestaoTicketsPage() {
  return (
    <DashboardLayout>
      <HeaderPages TitlePage="Gestão de Tickets" />
    </DashboardLayout>
  );
}

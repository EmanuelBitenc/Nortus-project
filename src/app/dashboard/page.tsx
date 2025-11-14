"use client";
import DashboardLayout from "@/components/page-layout";
import HeaderPages from "@/components/header-pages";
import { useDashboardData } from "@/hooks/useDashboard";
import ResumeDashboard from "./components/resumeDashboard";
import EvolucaoKpis from "./components/evolucaoKpis/evolucaokpis";
import ImpactoSegmento from "./components/impactoSegmento/ImpactoSegmento";
import MapaClientes from "./components/mapaClientes/MapaClientes";
import TabelaClientes from "./components/tabelaClientes/TabelaClientes";

export default function DashboardPage() {
  const { data: dashboardData, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <DashboardLayout>
        <HeaderPages TitlePage="Dashboard" />
        <div className="flex h-96 items-center justify-center">
          <div className="text-xl text-white">Carregando...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !dashboardData) {
    return (
      <DashboardLayout>
        <HeaderPages TitlePage="Dashboard" />
        <div className="flex h-96 items-center justify-center">
          <div className="text-xl text-red-500">
            Erro ao carregar dados do dashboard
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <HeaderPages TitlePage="Dashboard" />

      <div className="mx-auto mb-20 w-11/12 px-4 sm:px-6 lg:px-8">
        {/* Grid principal - KPIs */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          {/* Evolução dos KPI's - Ocupa 2 colunas em telas grandes */}
          <EvolucaoKpis dashboardData={dashboardData} />

          {/* Cards de resumo - 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <ResumeDashboard
              dashboardData={dashboardData}
              name="ARPU"
              type="arpu"
            />

            <ResumeDashboard
              dashboardData={dashboardData}
              name="Conversão IA"
              type="conversion"
            />

            <ResumeDashboard
              dashboardData={dashboardData}
              name="Retenção"
              type="retention"
            />

            <ResumeDashboard
              dashboardData={dashboardData}
              name="Taxa de Churn"
              type="churn"
            />
          </div>
        </div>

        {/* Grid 2 - Mapa e Impacto */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <MapaClientes />

          {/* Mapa de impacto */}
          <ImpactoSegmento dashboardData={dashboardData} />
        </div>

        {/* Clientes ativos */}
        <TabelaClientes dashboardData={dashboardData} />
      </div>
    </DashboardLayout>
  );
}

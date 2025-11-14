"use client";
import "./style.css";
import DashboardLayout from "@/components/page-layout";
import HeaderPages from "@/components/header-pages";
import { useDashboardData } from "@/hooks/useDashboard";
import ResumeDashboard from "./components/resumeDashboard";
import EvolucaoKpis from "./components/evolucaoKpis/evolucaokpis";
import ImpactoSegmento from "./components/impactoSegmento/ImpactoSegmento";
import MapaClientes from "./components/mapaClientes/MapaClientes";

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

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
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
          {/* Mapa de clientes - Ocupa 2 colunas em telas grandes */}
          <MapaClientes />

          {/* Mapa de impacto - Ocupa 1 coluna */}
          <ImpactoSegmento dashboardData={dashboardData} />
        </div>

        {/* Clientes ativos */}
        <div className="card-dashboard">
          <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
            Clientes ativos
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {dashboardData.activeClients.data.slice(0, 6).map((client) => (
              <div
                key={client.id}
                className="flex flex-col gap-2 rounded-lg bg-slate-700/30 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-semibold text-sky-400">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {client.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">{client.email}</p>
                  </div>
                </div>
                <span
                  className={`w-fit shrink-0 self-start rounded-full px-2 py-1 text-xs sm:self-center ${
                    client.status === "Ativo"
                      ? "bg-green-500/20 text-green-500"
                      : client.status === "Pendente"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

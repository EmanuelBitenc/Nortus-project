"use client";

import DashboardLayout from "@/components/page-layout";
import HeaderPages from "@/components/header-pages";
import { useDashboardData } from "@/hooks/useDashboard";
import ResumeDashboard from "./components/resumeDashboard";
import { useState } from "react";
import ArpuChart from "./components/evolucaoKpis/grafico/ArpuChart";
import ConversionChart from "./components/evolucaoKpis/grafico/ConversionChart";
import ChurnChart from "./components/evolucaoKpis/grafico/ChurnChart";
import RetentionChart from "./components/evolucaoKpis/grafico/RetentionChart";
import EvolucaoKpis from "./components/evolucaoKpis/evolucaokpis";

export default function DashboardPage() {
  const { data: dashboardData, isLoading, error } = useDashboardData();


  if (isLoading) {
    return (
      <DashboardLayout>
        <HeaderPages TitlePage="Dashboard" />
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-xl">Carregando...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !dashboardData) {
    return (
      <DashboardLayout>
        <HeaderPages TitlePage="Dashboard" />
        <div className="flex items-center justify-center h-96">
          <div className="text-red-500 text-xl">
            Erro ao carregar dados do dashboard
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <HeaderPages TitlePage="Dashboard" />

      {/* Grid Principal: 3 colunas*/}
      <div className="max-w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-none  gap-6 mb-6">
          {/* Evolução dos KPI's */}
          
        <EvolucaoKpis dashboardData={dashboardData} />

          {/* Grid interno 2x2 de Cards */}
          <div className="grid  grid-cols-2  gap-4  ">
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

        {/* Grid 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Mapa de clientes */}
          <div className="col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Mapa de clientes por região
              </h3>
              <select className="px-3 py-1 text-sm rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600">
                {dashboardData.activeClients.filters.locations.map(
                  (location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="h-64 bg-slate-900/30 rounded-lg flex items-center justify-center text-slate-400">
              <p>Mapa interativo</p>
            </div>
          </div>

          {/*  Mapa de impacto */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">
              Mapa de impacto por segmento
            </h3>
            <div className="h-48 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="w-full h-full rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400">
                  Gráfico Pizza
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {dashboardData.segments.map((segment, index) => (
                <div key={segment.nome} className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      [
                        "bg-sky-500",
                        "bg-blue-500",
                        "bg-cyan-500",
                        "bg-indigo-500",
                        "bg-purple-500",
                      ][index % 5]
                    }`}
                  ></span>
                  <span className="text-slate-300 text-xs">{segment.nome}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors">
              Analisar segmentos
            </button>
          </div>
        </div>

        {/* Clientes ativos */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">
            Clientes ativos
          </h3>
          <div className="space-y-3">
            {dashboardData.activeClients.data.slice(0, 6).map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-semibold text-xs">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {client.name}
                    </p>
                    <p className="text-slate-400 text-xs">{client.email}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
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

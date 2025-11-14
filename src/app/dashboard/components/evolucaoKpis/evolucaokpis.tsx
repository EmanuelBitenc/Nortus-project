import { useState } from "react";
import ArpuChart from "./grafico/ArpuChart";
import ConversionChart from "./grafico/ConversionChart";
import ChurnChart from "./grafico/ChurnChart";
import RetentionChart from "./grafico/RetentionChart";
import { DashboardData } from "@/services/dashboard.service";
import EvolucaoKpisButtons from "./evolucaoKpisButtons";

interface EvolucaoKpisProps {
  dashboardData: DashboardData;
}

export default function EvolucaoKpis({ dashboardData }: EvolucaoKpisProps) {
  const [activeKpi, setActiveKpi] = useState<
    "retention" | "conversion" | "churn" | "arpu"
  >("arpu");

  return (
    <div className="card-dashboard lg:col-span-2">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Evolução dos KPI&apos;s
        </h2>

        <div className="flex flex-wrap gap-2 rounded-4xl bg-slate-700/50 p-1.5 sm:p-2">
          <EvolucaoKpisButtons
            setActiveKpi={setActiveKpi}
            activeKpi={activeKpi}
            type="retention"
            nome="Retenção"
          />
          <EvolucaoKpisButtons
            setActiveKpi={setActiveKpi}
            activeKpi={activeKpi}
            type="conversion"
            nome="Conversão"
          />
          <EvolucaoKpisButtons
            setActiveKpi={setActiveKpi}
            activeKpi={activeKpi}
            type="churn"
            nome="Churn"
          />
          <EvolucaoKpisButtons
            setActiveKpi={setActiveKpi}
            activeKpi={activeKpi}
            type="arpu"
            nome="ARPU"
          />
        </div>
      </div>
      <div className="h-48 sm:h-56 lg:h-64">
        {activeKpi === "arpu" && (
          <ArpuChart kpisTrend={dashboardData.kpisTrend} />
        )}
        {activeKpi === "conversion" && (
          <ConversionChart kpisTrend={dashboardData.kpisTrend} />
        )}
        {activeKpi === "churn" && (
          <ChurnChart kpisTrend={dashboardData.kpisTrend} />
        )}
        {activeKpi === "retention" && (
          <RetentionChart kpisTrend={dashboardData.kpisTrend} />
        )}
      </div>
    </div>
  );
}

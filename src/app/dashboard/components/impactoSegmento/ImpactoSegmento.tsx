"use client";
import { DashboardData } from "@/services/dashboard.service";
import DonutChart from "./grafico/DonutChart";

interface ImpactoSegmentoProps {
  dashboardData: DashboardData;
}

export default function ImpactoSegmento({
  dashboardData,
}: ImpactoSegmentoProps) {
  const segments = dashboardData.segments;

  const series = segments.map((segment) => segment.valor);
  const labels = segments.map((segment) => segment.nome);

  // Cores correspondentes aos segmentos
  const colors = [
    "#006EFF", // Automóvel
    "#52A9FD", //Residencial
    "#00449E", //Viagem
    "#75DFFF", //Combo
    "#0881A6", //Profissional
  ];

  return (
    <div className="card-dashboard">
      <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
        Mapa de impacto por segmento
      </h3>
      <div className="flex flex-col items-center">
        <div className="flex h-48 items-center justify-center sm:h-56">
          <DonutChart series={series} labels={labels} colors={colors} />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm sm:mt-4">
          {segments.map((segmento, index) => (
            <div key={segmento.nome} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
                style={{ backgroundColor: colors[index] }}
              ></span>
              <span className="text-[10px] text-slate-300 sm:text-xs">
                {segmento.nome}
              </span>
            </div>
          ))}
        </div>
        <button className="button-shiny mt-3 w-full rounded-4xl bg-sky-500 px-4 py-2 text-sm text-white hover:bg-sky-600 sm:mt-4 sm:w-10/12 sm:text-base">
          Analisar segmentos
        </button>
      </div>
    </div>
  );
}

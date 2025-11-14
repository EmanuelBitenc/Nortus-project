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
      <h3 className="mb-4 text-lg font-semibold text-white">
        Mapa de impacto por segmento
      </h3>
      <div className="flex flex-col items-center">
        <div className="flex h-56 items-center justify-center">
          <DonutChart series={series} labels={labels} colors={colors} />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          {segments.map((segmento, index) => (
            <div key={segmento.nome} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              ></span>
              <span className="text-xs text-slate-300">{segmento.nome}</span>
            </div>
          ))}
        </div>
        <button className="button-shiny mt-4 w-8/12 rounded-4xl bg-sky-500 px-4 py-2 text-white hover:bg-sky-600">
          Analisar segmentos
        </button>
      </div>
    </div>
  );
}

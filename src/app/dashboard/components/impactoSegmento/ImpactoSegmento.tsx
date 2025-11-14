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
    <div className="card-dashboard   ">
      <h3 className="text-lg font-semibold text-white mb-4">
        Mapa de impacto por segmento
      </h3>
      <div className="flex flex-col items-center">
      <div className="h-56 flex items-center justify-center  ">
        <DonutChart series={series} labels={labels} colors={colors} />
      </div>
      <div className="mt-4 flex gap-2 flex-wrap text-sm  justify-center ">
        {segments.map((segmento, index) => (
          <div key={segmento.nome} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index] }}
            ></span>
            <span className="text-slate-300 text-xs">{segmento.nome}</span>
          </div>
        ))}
      </div>
      <button className="w-8/12 mt-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-4xl button-shiny" >
        Analisar segmentos
      </button></div>
    </div>
  );
}

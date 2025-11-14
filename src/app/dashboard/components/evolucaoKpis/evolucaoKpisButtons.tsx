import { Dispatch, SetStateAction } from "react";

interface EvolucaoKpisButtonsProps {
  setActiveKpi: Dispatch<
    SetStateAction<"retention" | "conversion" | "churn" | "arpu">
  >;
  activeKpi: "conversion" | "retention" | "churn" | "arpu";
  type: "conversion" | "retention" | "churn" | "arpu";
  nome: string;
}

export default function EvolucaoKpisButtons({
  setActiveKpi,
  activeKpi,
  type,
  nome,
}: EvolucaoKpisButtonsProps) {
  return (
    <button
      onClick={() => setActiveKpi(type)}
      className={`rounded-3xl px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
        activeKpi === type
          ? "button-shiny bg-sky-500 text-white"
          : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {nome}
    </button>
  );
}

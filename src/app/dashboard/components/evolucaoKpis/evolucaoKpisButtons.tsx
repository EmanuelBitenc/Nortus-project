import { Dispatch, SetStateAction } from "react";

interface EvolucaoKpisButtonsProps {
    setActiveKpi: Dispatch<SetStateAction<"retention" | "conversion" | "churn" | "arpu">>;
    activeKpi: "conversion" | "retention" | "churn" | "arpu";
    type: "conversion" | "retention" | "churn" | "arpu";
    nome:string;
}


export default function EvolucaoKpisButtons({ setActiveKpi, activeKpi, type, nome }: EvolucaoKpisButtonsProps) {
    return(
    <button
                          onClick={() => setActiveKpi(type)}
                          className={`px-4 py-2 text-sm rounded-3xl transition-colors  ${
                            activeKpi === type
                              ? "bg-sky-500 text-white button-shiny"
                              : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          {nome}
                        </button>)
}
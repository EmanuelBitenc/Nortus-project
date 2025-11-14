import { DashboardData } from "@/services/dashboard.service";
import Image from "next/image";
import up from "../../../../public/icons/up.svg";
import down from "../../../../public/icons/down.svg";
import "../style.css";

interface ResumeDashboardProps {
  dashboardData: DashboardData;
  name: string;
  type: "arpu" | "conversion" | "retention" | "churn";
}

export default function ResumeDashboard({
  dashboardData,
  name,
  type,
}: ResumeDashboardProps) {
  return (
    <div className="relative rounded-xl border border-slate-700/50 bg-slate-800/50 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4">
      <div className="flex h-full flex-col justify-between py-1 sm:py-2">
        <p className="font-second-display mb-1 text-[10px] text-(--white) sm:text-xs">
          {name}
        </p>
        <p className="mb-1 text-lg font-bold text-white sm:text-xl lg:text-2xl">
          {type === "arpu" ? "R$ " : ""}

          {type === "arpu" &&
            dashboardData.kpisResume[type].valor.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          {type !== "arpu" &&
            dashboardData.kpisResume[type].valor.toLocaleString("pt-BR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          {type === "arpu" ? " " : "%"}
        </p>
        <span
          className={`text-[10px] sm:text-xs ${
            dashboardData.kpisResume[type].variacao >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {dashboardData.kpisResume[type].variacao >= 0 ? "+" : ""}
          {dashboardData.kpisResume[type].variacao}% no periodo
        </span>
      </div>

      {type === "arpu" || type === "churn" ? (
        <div className="block lg:hidden 2xl:block">
          {dashboardData.kpisResume[type].variacao >= 0 ? (
            <Image
              src={up}
              alt={"icon"}
              className="absolute right-0 bottom-0 w-20 lg:w-24"
            />
          ) : (
            <Image
              src={down}
              alt={"icon"}
              className="absolute right-0 bottom-0 w-20 lg:w-24"
            />
          )}
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
}

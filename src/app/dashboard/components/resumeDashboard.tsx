import { DashboardData } from "@/services/dashboard.service";
import Image from "next/image";
import up from "../../../../public/icons/up.svg";
import down from "../../../../public/icons/down.svg";

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
    <div className="relative rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-4 backdrop-blur-sm">
      <div className="flex h-full flex-col justify-between py-2">
        <p className="font-second-display mb-1 text-xs text-(--white)">
          {name}
        </p>
        <p className="mb-1 text-xl text-white xl:text-2xl xl:font-bold">
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
          className={`text-xs ${
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
        <div>
          {dashboardData.kpisResume[type].variacao >= 0 ? (
            <Image
              src={up}
              alt={"icon"}
              className="absolute right-0 bottom-0 w-32 lg:w-32 2xl:right-5"
            />
          ) : (
            <Image
              src={down}
              alt={"icon"}
              className="absolute right-0 bottom-0 w-32 lg:w-36 2xl:right-0"
            />
          )}
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
}

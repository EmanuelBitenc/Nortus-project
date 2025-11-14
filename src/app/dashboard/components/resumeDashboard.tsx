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
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl py-4 px-4 border border-slate-700/50 relative">
      <div className=" flex flex-col justify-between h-full py-2">
        <p className="text-(--white) text-xs mb-1 font-second-display">
          {name}
        </p>
        <p className="text-xl xl:text-2xl  xl:font-bold text-white mb-1 ">
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
              className="absolute bottom-0 right-0 2xl:right-5 w-20 2xl:w-32"
            />
          ) : (
            <Image
              src={down}
              alt={"icon"}
              className="absolute bottom-0 right-0 2xl:right-0 w-20 2xl:w-36"
            />
          )}
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
}

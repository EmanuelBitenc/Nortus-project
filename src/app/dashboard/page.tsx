"use client";

import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/page-layout";
import HeaderPages from "@/components/header-pages";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <DashboardLayout>
      <HeaderPages TitlePage="Dashboard" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-sky-500/50 transition-colors">
            <h3 className="text-sky-400 text-sm font-medium mb-2">
              Total de Usuários
            </h3>
            <p className="text-3xl font-bold text-white">1,234</p>
            <p className="text-slate-400 text-xs mt-2">+12% vs mês anterior</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-sky-500/50 transition-colors">
            <h3 className="text-sky-400 text-sm font-medium mb-2">
              Sessões Ativas
            </h3>
            <p className="text-3xl font-bold text-white">89</p>
            <p className="text-slate-400 text-xs mt-2">Atualizado agora</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-sky-500/50 transition-colors">
            <h3 className="text-sky-400 text-sm font-medium mb-2">
              Taxa de Conversão
            </h3>
            <p className="text-3xl font-bold text-white">67%</p>
            <p className="text-slate-400 text-xs mt-2">+5% vs mês anterior</p>
          </div>
        </div>

        {/* Informações da sessão */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-2xl font-semibold mb-4 text-sky-400">
            Informações da Sessão
          </h2>
          <div className="space-y-3 text-slate-300">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-400 min-w-[100px]">
                Email:
              </span>
              <span>{session?.user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-400 min-w-[100px]">
                Nome:
              </span>
              <span>{session?.user?.name}</span>
            </div>
            {session?.accessToken && (
              <div className="flex items-start gap-3">
                <span className="font-semibold text-slate-400 min-w-[100px]">
                  Token:
                </span>
                <span className="text-xs bg-slate-900/50 p-3 rounded-lg block flex-1 font-mono break-all border border-slate-700">
                  {session.accessToken.substring(0, 80)}...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

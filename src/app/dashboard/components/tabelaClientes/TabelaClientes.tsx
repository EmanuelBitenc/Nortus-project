"use client";

import { useMemo } from "react";
import { DashboardData } from "@/services/dashboard.service";
import FiltersTabelaCliente from "./filtersTabelaCliente";
import { useTabelaClientesStore } from "@/stores/useTabelaClientesStore";

interface TabelaClientesProps {
  dashboardData: DashboardData;
}

export default function TabelaClientes({ dashboardData }: TabelaClientesProps) {
  const { search, statusFilter, tipoFilter, localFilter } =
    useTabelaClientesStore();

  const clientes = dashboardData.activeClients.data;

  // valores para os filtros
  const tiposUnicos = useMemo(
    () => Array.from(new Set(clientes.map((c) => c.secureType))),
    [clientes]
  );

  const locaisUnicos = useMemo(
    () => Array.from(new Set(clientes.map((c) => c.location))),
    [clientes]
  );

  const statusUnicos = useMemo(
    () => Array.from(new Set(clientes.map((c) => c.status))),
    [clientes]
  );

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((cliente) => {
      const matchSearch =
        search === "" ||
        cliente.name.toLowerCase().includes(search.toLowerCase()) ||
        cliente.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || cliente.status === statusFilter;
      const matchTipo =
        tipoFilter === "all" || cliente.secureType === tipoFilter;
      const matchLocal =
        localFilter === "all" || cliente.location === localFilter;

      return matchSearch && matchStatus && matchTipo && matchLocal;
    });
  }, [clientes, search, statusFilter, tipoFilter, localFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-(--highlight-color) text-(--background)";
      case "Pendente":
        return "bg-yellow-500/20 text-yellow-500";
      case "Inativo":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  return (
    <div className="card-board">
      <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
        Clientes ativos
      </h3>

      <FiltersTabelaCliente
        statusUnicos={statusUnicos}
        tiposUnicos={tiposUnicos}
        locaisUnicos={locaisUnicos}
      />

      {/* Tabela */}
      <div className="min-h-[450px] overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="pb-3 text-left text-xs font-medium tracking-wider text-slate-400">
                Nome
              </th>
              <th className="pb-3 text-left text-xs font-medium tracking-wider text-slate-400">
                Tipo de seguro
              </th>
              <th className="pb-3 text-left text-xs font-medium tracking-wider text-slate-400">
                Valor mensal
              </th>
              <th className="pb-3 text-left text-xs font-medium tracking-wider text-slate-400">
                Status
              </th>
              <th className="pb-3 text-left text-xs font-medium tracking-wider text-slate-400">
                Renovação
              </th>
              <th className="pb-3 text-left text-xs font-medium tracking-wider text-slate-400">
                Região
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  Nenhum cliente encontrado com os filtros aplicados.
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="transition-colors hover:bg-slate-700/20"
                >
                  <td className="py-3">
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-white">
                        {cliente.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {cliente.email}
                      </span>
                    </div>
                  </td>
                  <td className="text-white">{cliente.secureType}</td>
                  <td className="text-white">
                    {cliente.monthValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td>
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 font-medium ${getStatusColor(cliente.status)}`}
                    >
                      {cliente.status}
                    </span>
                  </td>
                  <td className="text-white">{cliente.renewalDate}</td>
                  <td className="text-white">{cliente.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Contador de resultados */}
      <div className="mt-4 text-center text-xs text-slate-400 sm:text-sm">
        Mostrando {clientesFiltrados.length} de {clientes.length} clientes
      </div>
    </div>
  );
}

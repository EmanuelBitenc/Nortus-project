"use client";

import { useMemo } from "react";
import { Client, DashboardData } from "@/services/dashboard.service";
import FiltersTabelaCliente from "./filtersTabelaCliente";
import { useTabelaClientesStore } from "@/stores/useTabelaClientesStore";
import Th from "@/components/Table/table";

interface TabelaClientesProps {
  dashboardData: DashboardData;
}

function getOptions<C extends keyof Client>(clientes: Client[], key: C) {
  return Array.from(
    new Set(
      clientes
        .map((cliente) => cliente[key])
        .filter(Boolean)
    )
  );
}

export default function TabelaClientes({ dashboardData }: TabelaClientesProps) {
  const { search, statusFilter, tipoFilter, localFilter } =
    useTabelaClientesStore();

  const clientes = dashboardData.activeClients.data;


  const statusUnicos = useMemo(() => getOptions(clientes, "status"), [clientes]);
  const tiposUnicos = useMemo(() => getOptions(clientes, "secureType"), [clientes]);
  const locaisUnicos = useMemo(() => getOptions(clientes, "location"), [clientes]);


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

      <div className="min-h-[450px] overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <Th label="Nome" />
              <Th label="Tipo de seguro" />
              <Th label="Valor mensal" />
              <Th label="Status" />
              <Th label="Renovação" />
              <Th label="Região" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-(--text-secondary-color)">
                  Nenhum cliente encontrado com os filtros aplicados.
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="transition-colors hover:bg-slate-700/20"
                >
                  <td className="py-3 px-3">
                    <div className="flex flex-col items-start ">
                      <span className="text-sm font-medium text-white">
                        {cliente.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {cliente.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 text-white max-w-[200px]">{cliente.secureType}</td>
                  <td className="px-3 text-white">
                    {cliente.monthValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td>
                    <span
                      className={` inline-block rounded-full px-3 py-1 font-medium ${cliente.status === "Ativo" ? "xl:bg-(--ativo-color) xl:text-(--background) text-(--ativo-color)" : cliente.status === "Pendente" ? "xl:bg-(--pendente-color) xl:text-(--background) text-(--pendente-color)" : "xl:bg-red-500 xl:text-(--background) text-red-500"}  `}
                    >
                      {cliente.status}
                    </span>
                  </td>
                  <td className="px-3 text-white">{cliente.renewalDate}</td>
                  <td className="px-3 text-white">{cliente.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="mt-4 text-center text-xs text-(--text-secondary-color) sm:text-sm">
        Mostrando {clientesFiltrados.length} de {clientes.length} clientes
      </div>
    </div>
  );
}

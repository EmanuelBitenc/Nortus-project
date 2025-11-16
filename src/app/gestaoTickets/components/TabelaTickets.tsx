"use client";

import { useMemo } from "react";
import { GestaoTicketsData, Ticket } from "@/services/gestaoTicket.service";
import { useTabelaTicketsStore } from "@/stores/useTabelaTicketsStore";
import { useTicketsStore } from "@/stores/useTicketsStore";
import FiltersTickets from "./FiltersTickets";
import { Edit, ChevronRight } from "@deemlol/next-icons";
import Th from "@/components/Table/table";
import Pagination from "./pagination";
import { TabelaTicketsSkeleton } from "./TabelaTicketsSkeleton";

interface TabelaTicketsProps {
    ticketsData: GestaoTicketsData;
}

function getOptions<T extends keyof Ticket>(tickets: Ticket[], key: T) {
    return Array.from(
        new Set(
            tickets
                .map((ticket) => ticket[key])
                .filter(Boolean)
        )
    );
}

export default function TabelaTickets({ ticketsData }: TabelaTicketsProps) {
    const { search, statusFilter, priorityFilter, responsibleFilter, currentPage, setCurrentPage } =
        useTabelaTicketsStore();
    const newTickets = useTicketsStore((state) => state.tickets);

    const { tickets } = ticketsData;
    const items_por_pagina = 7;


    const allTickets = useMemo(() => {
        const apiTickets = tickets;
        const localTickets = newTickets;

        return [...apiTickets, ...localTickets];
    }, [tickets, newTickets]);

    if (!allTickets || allTickets.length === 1) {
        return <TabelaTicketsSkeleton />;
    }

    const statusOptions = useMemo(() => getOptions(allTickets, "status"), [allTickets]);
    const priorityOptions = useMemo(() => getOptions(allTickets, "priority"), [allTickets]);
    const responsibleOptions = useMemo(() => getOptions(allTickets, "responsible"), [allTickets]);


    const ticketsFiltrados = useMemo(() => {
        return allTickets.filter((ticket) => {
            const matchSearch =
                search === "" ||
                ticket.id?.toLowerCase().includes(search.toLowerCase()) ||
                ticket.client?.toLowerCase().includes(search.toLowerCase()) ||
                ticket.subject?.toLowerCase().includes(search.toLowerCase());

            const matchStatus =
                statusFilter === "all" || ticket.status === statusFilter;
            const matchPriority =
                priorityFilter === "all" || ticket.priority === priorityFilter;
            const matchResponsible =
                responsibleFilter === "all" || ticket.responsible === responsibleFilter;

            return matchSearch && matchStatus && matchPriority && matchResponsible;
        });
    }, [allTickets, search, statusFilter, priorityFilter, responsibleFilter]);


    const totalPages = Math.ceil(ticketsFiltrados.length / items_por_pagina);
    const startIndex = (currentPage - 1) * items_por_pagina;
    const endIndex = startIndex + items_por_pagina;
    const ticketsPaginados = ticketsFiltrados.slice(startIndex, endIndex);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Urgente":
                return "bg-(--danger-color) text-white";
            case "Média":
                return "bg-[#B5EDFF] text-black";
            case "Baixa":
                return "bg-[#E0F7FF] text-black";
            default:
                return "text-white";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Aberto":
                return "bg-(--ativo-color) text-black";
            case "Em andamento":
                return "bg-(--pendente-color) text-black";
            case "Fechado":
                return "bg-green-500/20 text-white";
            default:
                return "bg-slate-500/20 text-white";
        }
    };

    return (
        <div className="card-board">
            <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
                Lista de Tickets
            </h3>

            <FiltersTickets
                statusOptions={statusOptions}
                priorityOptions={priorityOptions}
                responsibleOptions={responsibleOptions}
            />

            <div className="min-h-[400px] overflow-x-auto">
                <table className="w-full min-w-full">
                    <thead>
                        <tr className="border-b border-slate-700 ">
                            <Th label="ID" />
                            <Th label="Prioridade" />
                            <Th label="Cliente" />
                            <Th label="Assunto" />
                            <Th label="Status" />
                            <Th label="Criado em" />
                            <Th label="Responsável" />
                            <Th label="Ações" />
                            <Th label="" />

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {ticketsFiltrados.length === 0 ? (
                            <tr className="table-fade">
                                <td colSpan={8} className="py-8 text-center text-(--text-secondary-color)">
                                    Nenhum ticket encontrado com os filtros aplicados.
                                </td>
                            </tr>
                        ) : (
                            ticketsPaginados.map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    className="transition-colors hover:bg-slate-700/20"

                                >
                                    <td className="px-3 py-3 text-sm text-white">{ticket.id}</td>
                                    <td className="px-3 py-3">
                                        <span
                                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium  ${ticket.priority === "Urgente"
                                                ? "xl:bg-(--danger-color) xl:text-white text-(--danger-color)"
                                                : ticket.priority === "Média"
                                                    ? "xl:bg-[#B5EDFF] xl:text-black text-cyan-500"
                                                    : "xl:bg-[#E0F7FF] xl:text-black text-white"
                                                }`}
                                        >
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-white">
                                                {ticket.client}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {ticket.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-sm text-white xl:max-w-[200px]">{ticket.subject}</td>
                                    <td className="px-3 py-3">
                                        <span
                                            className={`inline-block text-center whitespace-nowrap rounded-full px-2  py-1 text-xs font-medium ${ticket.status === "Aberto"
                                                ? "xl:bg-(--ativo-color)  xl:text-black text-cyan-500"
                                                : ticket.status === "Em andamento"
                                                    ? "xl:bg-(--pendente-color) xl:text-black text-yellow-500"
                                                    : "xl:bg-green-500/20 xl:text-white text-green-500"
                                                }`}
                                        >
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 text-sm text-white">{ticket.createdAt}</td>
                                    <td className="px-3 py-3 text-sm text-white">
                                        {ticket.responsible}
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex flex-col lg:flex-row gap-2 xl:flex-row xl:items-center">
                                            <button className="flex items-center gap-2 font-light text-white transition-colors hover:text-sky-300">
                                                <span className="text-xs">Editar</span>
                                                <Edit size={16} className="text-sky-300" />
                                            </button>
                                            <button className="flex items-center gap-1 text-white transition-colors hover:text-sky-300">
                                                <span className="text-xs font-light">Ver</span>
                                                <ChevronRight size={16} className="text-sky-300" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />


        </div >
    );
}

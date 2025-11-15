"use client";

import { useMemo } from "react";
import { GestaoTicketsData, Ticket } from "@/services/gestaoTicket.service";
import { useTabelaTicketsStore } from "@/stores/useTabelaTicketsStore";
import FiltersTickets from "./FiltersTickets";
import { Edit, ChevronRight } from "@deemlol/next-icons";
import Th from "@/components/Table/table";
import Pagination from "./pagination";

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

    const { tickets } = ticketsData;
    const items_por_pagina = 7;


    const statusOptions = useMemo(() => getOptions(tickets, "status"), [tickets]);
    const priorityOptions = useMemo(() => getOptions(tickets, "priority"), [tickets]);
    const responsibleOptions = useMemo(() => getOptions(tickets, "responsible"), [tickets]);


    const ticketsFiltrados = useMemo(() => {
        return tickets.filter((ticket) => {
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
    }, [tickets, search, statusFilter, priorityFilter, responsibleFilter]);


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
                        <tr className="border-b border-slate-700">
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
                            <tr>
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
                                    <td className="py-3 text-sm text-white">{ticket.id}</td>
                                    <td className="py-3">
                                        <span
                                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getPriorityColor(ticket.priority)}`}
                                        >
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-white">
                                                {ticket.client}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {ticket.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-sm text-white max-w-[200px]">{ticket.subject}</td>
                                    <td className="py-3">
                                        <span
                                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(ticket.status)}`}
                                        >
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-sm text-white">
                                        {ticket.createdAt}
                                    </td>
                                    <td className="py-3 text-sm text-white">
                                        {ticket.responsible}
                                    </td>
                                    <td className="py-3">

                                        <button className="text-white font-light transition-colors hover:text-sky-300 flex items-center gap-2">

                                            <span className="ml-1 text-xs">Editar</span> <Edit size={16} className="text-sky-300" />
                                        </button>
                                    </td>
                                    <td className="py-3">
                                        <button className=" text-white transition-colors hover:text-sky-300">
                                            <span className="text-xs font-light ">Ver</span>
                                            <ChevronRight size={16} className="inline text-sky-300" />
                                        </button>

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

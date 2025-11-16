"use client";

import DashboardLayout from "@/components/page-layout";
import HeaderPages from "@/components/header-pages";
import { Plus } from "@deemlol/next-icons";
import { useGestaoTickets } from "@/hooks/useGestaoTickets";
import ResumoTickets from "./components/ResumoTickets";
import TabelaTickets from "./components/TabelaTickets";
import ModalNovoTicket from "./components/novoTicket/ModalNovoTicket";
import { useState } from "react";

export default function gestaoTicketsPage() {
  const { data: ticketsData, isLoading, error } = useGestaoTickets();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return (
      <DashboardLayout>
        <HeaderPages TitlePage="Gestão de Tickets">
          <button
            disabled
            className="button-shiny flex items-center gap-2 rounded-4xl"
          >
            <Plus size={24} color="#FFFFFF" />
            <span className="text-[10px]"> Novo Ticket</span>
          </button>
        </HeaderPages>
        <div className="flex h-96 items-center justify-center">
          <div className="text-xl text-white">Carregando...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !ticketsData) {
    return (
      <DashboardLayout>
        <HeaderPages TitlePage="Gestão de Tickets">
          <button
            disabled
            className="button-shiny flex items-center gap-2 rounded-4xl"
          >
            <Plus size={24} color="#FFFFFF" />
            <span className="text-[10px]"> Novo Ticket</span>
          </button>
        </HeaderPages>
        <div className="flex h-96 items-center justify-center">
          <div className="text-xl text-red-500">Erro ao carregar tickets</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <HeaderPages TitlePage="Gestão de Tickets">
        <button
          onClick={() => setModalOpen(true)}
          className="button-shiny flex items-center gap-2 rounded-4xl"
        >
          <Plus size={24} color="#FFFFFF" />
          <span> Novo Ticket</span>
        </button>
      </HeaderPages>

      <div className="mx-auto mb-20 w-11/12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          <ResumoTickets ticketsData={ticketsData} />
        </div>
        <TabelaTickets ticketsData={ticketsData} />
      </div>

      <ModalNovoTicket isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </DashboardLayout>
  );
}

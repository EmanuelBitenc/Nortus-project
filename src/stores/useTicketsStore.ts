import { Ticket } from "@/services/gestaoTicket.service";
import { create } from "zustand";

interface TicketsStore {
  tickets: Ticket[];
  ultimoTicketId: number;
  addTicket: (ticket: Omit<Ticket, "id" | "status" | "createdAt">) => void;
}

export const useTicketsStore = create<TicketsStore>((set) => ({
  tickets: [],
  ultimoTicketId: 25,

  addTicket: (ticketData) =>
    set((state) => {
      const nextNumber = state.ultimoTicketId + 1;

      return {
        tickets: [
          ...state.tickets,
          {
            ...ticketData,
            id: `TK${nextNumber.toString().padStart(3, "0")}`,
            status: "Aberto" as const,
            createdAt: new Date().toLocaleDateString("pt-BR"),
          },
        ],
        ultimoTicketId: nextNumber,
      };
    }),
}));

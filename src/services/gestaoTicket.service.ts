import api from "./api";

interface ResumoTickets {
  open: number;
  inProgress: number;
  solved: number;
  timeAverageHours: number;
}

interface Ticket {
  id: string;
  priority: "Urgente" | "Média" | "Baixa";
  client: string;
  email: string;
  subject: string;
  status: "Aberto" | "Em andamento" | "Fechado";
  createdAt: string;
  responsible: string;
}

export interface GestaoTicketsData {
  resumo: ResumoTickets;
  status: string[];
  priorities: string[];
  tickets: Ticket[];
}

export type { ResumoTickets, Ticket };

export const gestaoTicketsService = {
  getTicketsData: async (): Promise<GestaoTicketsData> => {
    const response = await api.get<GestaoTicketsData>(
      "/ticket-management.json"
    );
    return response.data;
  },
};

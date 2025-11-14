import { useQuery } from "@tanstack/react-query";
import { gestaoTicketsService } from "@/services/gestaoTicket.service";

export function useGestaoTickets() {
  return useQuery({
    queryKey: ["gestao-tickets"],
    queryFn: gestaoTicketsService.getTicketsData,
    staleTime: Infinity
  });
}

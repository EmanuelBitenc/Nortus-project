import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardService.getDashboardData,
    staleTime: Infinity,
  });
}

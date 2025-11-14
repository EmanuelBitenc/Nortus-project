"use client";

import { useQuery } from "@tanstack/react-query";
import { mapService } from "@/services/map.service";

export function useMapData() {
  return useQuery({
    queryKey: ["map"],
    queryFn: () => mapService.getMapData(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

import api from "./api";

interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  category: string;
  address: string;
  icon: string;
  color: string;
}

interface MapData {
  center: [number, number];
  zoom: number;
  locations: Location[];
}

interface MapResponse {
  data: MapData;
}

export type { Location, MapData, MapResponse };

export const mapService = {
  getMapData: async (): Promise<MapData> => {
    const response = await api.get<MapResponse>("/map.json");
    return response.data.data;
  },
};

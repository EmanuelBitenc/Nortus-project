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
    const data = response.data.data;
    
    // Inverte coordenadas  para latitude, longitude
    const center: [number, number] = [data.center[1], data.center[0]];
    const locations = data.locations.map((location) => ({
      ...location,
      coordinates: [location.coordinates[1], location.coordinates[0]] as [number, number],
    }));
    
    return {
      ...data,
      center,
      locations,
    };
  },
};

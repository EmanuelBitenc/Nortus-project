import api from "./api";

interface TrendData {
  name: string;
  data: number[];
}

interface KpisTrend {
  labels: string[];
  arpuTrend: TrendData;
  conversionTrend: TrendData;
  churnTrend: TrendData;
  retentionTrend: TrendData;
}

interface KpiMetric {
  valor: number;
  variacao: number;
}

interface KpisResume {
  arpu: KpiMetric;
  conversion: KpiMetric;
  retention: KpiMetric;
  churn: KpiMetric;
}

interface Segment {
  nome: string;
  valor: number;
}

interface ClientFilters {
  status: string[];
  secureType: string[];
  locations: string[];
}

interface Client {
  id: string;
  name: string;
  email: string;
  secureType: string;
  monthValue: number;
  status: "Ativo" | "Pendente" | "Inativo";
  renewalDate: string;
  location: string;
}

interface ActiveClients {
  filters: ClientFilters;
  data: Client[];
}

export interface DashboardData {
  kpisTrend: KpisTrend;
  kpisResume: KpisResume;
  segments: Segment[];
  activeClients: ActiveClients;
}

export type {
  KpisTrend,
  TrendData,
  KpisResume,
  KpiMetric,
  Segment,
  ActiveClients,
  Client,
  ClientFilters,
};

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>("/dash.json");
    return response.data;
  },
};

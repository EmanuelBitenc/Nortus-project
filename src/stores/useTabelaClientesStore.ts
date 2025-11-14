import { create } from "zustand";

interface TabelaClientesState {
  search: string;
  statusFilter: string;
  tipoFilter: string;
  localFilter: string;
  setSearch: (search: string) => void;
  setStatusFilter: (status: string) => void;
  setTipoFilter: (tipo: string) => void;
  setLocalFilter: (local: string) => void;
  resetFilters: () => void;
}

export const useTabelaClientesStore = create<TabelaClientesState>((set) => ({
  search: "",
  statusFilter: "all",
  tipoFilter: "all",
  localFilter: "all",
  setSearch: (search) => set({ search }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setTipoFilter: (tipoFilter) => set({ tipoFilter }),
  setLocalFilter: (localFilter) => set({ localFilter }),
  resetFilters: () =>
    set({
      search: "",
      statusFilter: "all",
      tipoFilter: "all",
      localFilter: "all",
    }),
}));

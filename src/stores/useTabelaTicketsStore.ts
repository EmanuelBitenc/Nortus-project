import { create } from "zustand";

interface TabelaTicketsState {
  search: string;
  statusFilter: string;
  priorityFilter: string;
  responsibleFilter: string;
  currentPage: number;
  setSearch: (search: string) => void;
  setStatusFilter: (status: string) => void;
  setPriorityFilter: (priority: string) => void;
  setResponsibleFilter: (responsible: string) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

export const useTabelaTicketsStore = create<TabelaTicketsState>((set) => ({
  search: "",
  statusFilter: "all",
  priorityFilter: "all",
  responsibleFilter: "all",
  currentPage: 1,
  setSearch: (search) => set({ search, currentPage: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, currentPage: 1 }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter, currentPage: 1 }),
  setResponsibleFilter: (responsibleFilter) =>
    set({ responsibleFilter, currentPage: 1 }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  resetFilters: () =>
    set({
      search: "",
      statusFilter: "all",
      priorityFilter: "all",
      responsibleFilter: "all",
      currentPage: 1,
    }),
}));

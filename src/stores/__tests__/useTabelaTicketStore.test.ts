import { beforeEach, describe, expect, it } from "vitest";
import { useTabelaTicketsStore } from "../useTabelaTicketsStore";
import { de } from "zod/locales";

describe("useTabelaTicketsStore", () => {
  beforeEach(() => {
    const { resetFilters } = useTabelaTicketsStore.getState();
    resetFilters();
  });

  describe("Filtros", () => {
    it("começar com valores padrão", () => {
      const state = useTabelaTicketsStore.getState();

      expect(state.search).toBe("");
      expect(state.statusFilter).toBe("all");
      expect(state.priorityFilter).toBe("all");
      expect(state.responsibleFilter).toBe("all");
    });

    it("Buscar dado ao pesquisar", () => {
      const { setSearch } = useTabelaTicketsStore.getState();

      setSearch("Eduardo Almeida");

      const state = useTabelaTicketsStore.getState();
      expect(state.search).toBe("Eduardo Almeida");
    });

    it("filtra por status", () => {
      const { setStatusFilter } = useTabelaTicketsStore.getState();

      setStatusFilter("Aberto");

      const state = useTabelaTicketsStore.getState();
      expect(state.statusFilter).toBe("Aberto");
    });

    it("filtra por tipo de seguro", () => {
      const { setPriorityFilter } = useTabelaTicketsStore.getState();

      setPriorityFilter("Urgente");

      const state = useTabelaTicketsStore.getState();
      expect(state.priorityFilter).toBe("Urgente");
    });

    it("filtra por responsavel", () => {
      const { setResponsibleFilter } = useTabelaTicketsStore.getState();

      setResponsibleFilter("Ana Silva");

      const state = useTabelaTicketsStore.getState();
      expect(state.responsibleFilter).toBe("Ana Silva");
    });

    it("aplica vários filtros ao mesmo tempo", () => {
      const {
        setSearch,
        setStatusFilter,
        setPriorityFilter,
        setResponsibleFilter,
      } = useTabelaTicketsStore.getState();

      setSearch("maria");
      setStatusFilter("Ativo");
      setPriorityFilter("Urgente");
      setResponsibleFilter("Ana Silva");

      const state = useTabelaTicketsStore.getState();
      expect(state.search).toBe("maria");
      expect(state.statusFilter).toBe("Ativo");
      expect(state.priorityFilter).toBe("Urgente");
      expect(state.responsibleFilter).toBe("Ana Silva");
    });
  });
});

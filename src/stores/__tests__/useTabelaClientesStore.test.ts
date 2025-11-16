import { describe, it, expect, beforeEach } from "vitest";
import { useTabelaClientesStore } from "../useTabelaClientesStore";

describe("useTabelaClientesStore", () => {
  beforeEach(() => {
    const { resetFilters } = useTabelaClientesStore.getState();
    resetFilters();
  });

  describe("Filtros", () => {
    it("começa com os valores padrão", () => {
      const state = useTabelaClientesStore.getState();

      expect(state.search).toBe("");
      expect(state.statusFilter).toBe("all");
      expect(state.tipoFilter).toBe("all");
      expect(state.localFilter).toBe("all");
    });

    it("Buscar dado ao pesquisar - input", () => {
      const { setSearch } = useTabelaClientesStore.getState();

      setSearch("Alexandre Henrique");

      const state = useTabelaClientesStore.getState();
      expect(state.search).toBe("Alexandre Henrique");
    });

    it("filtra por status", () => {
      const { setStatusFilter } = useTabelaClientesStore.getState();

      setStatusFilter("Ativo");

      const state = useTabelaClientesStore.getState();
      expect(state.statusFilter).toBe("Ativo");
    });

    it("filtra por tipo de seguro", () => {
      const { setTipoFilter } = useTabelaClientesStore.getState();

      setTipoFilter("Seguro residencial");

      const state = useTabelaClientesStore.getState();
      expect(state.tipoFilter).toBe("Seguro residencial");
    });

    it("filtra por localização", () => {
      const { setLocalFilter } = useTabelaClientesStore.getState();

      setLocalFilter("São Paulo");

      const state = useTabelaClientesStore.getState();
      expect(state.localFilter).toBe("São Paulo");
    });

    it("aplica vários filtros ao mesmo tempo", () => {
      const { setSearch, setStatusFilter, setTipoFilter, setLocalFilter } =
        useTabelaClientesStore.getState();

      setSearch("maria");
      setStatusFilter("Ativo");
      setTipoFilter("Seguro residencial");
      setLocalFilter("São Paulo");

      const state = useTabelaClientesStore.getState();
      expect(state.search).toBe("maria");
      expect(state.statusFilter).toBe("Ativo");
      expect(state.tipoFilter).toBe("Seguro residencial");
      expect(state.localFilter).toBe("São Paulo");
    });
  });
});

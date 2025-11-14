import SelectMap from "@/components/select";
import { useTabelaClientesStore } from "@/stores/useTabelaClientesStore";

interface FiltersTabelaClienteProps {
    statusUnicos: string[];
    tiposUnicos: string[];
    locaisUnicos: string[];
}

export default function FiltersTabelaCliente({
    statusUnicos,
    tiposUnicos,
    locaisUnicos,
}: FiltersTabelaClienteProps)  {
    const { 
        search, 
        setSearch, 
        statusFilter, 
        setStatusFilter, 
        tipoFilter, 
        setTipoFilter, 
        localFilter, 
        setLocalFilter 
    } = useTabelaClientesStore();
    return(
      <div className="mb-4 flex  gap-2 xl:gap-10  justify-between sm:items-center">
        {/* Busca */}
        <div className="relative flex-1 max-w-full ">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-600 bg-(--background) py-2 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 xl:gap-8">
        {/* Filtro Status */}
        
        <SelectMap value={statusFilter} change={setStatusFilter} datas={statusUnicos} label="Todos os status" />

        {/* Filtro Tipo */}
        <SelectMap value={tipoFilter} change={setTipoFilter} datas={tiposUnicos} label="Todos os tipos" />

        {/* Filtro Local */}
        <SelectMap value={localFilter} change={setLocalFilter} datas={locaisUnicos} label="Todos os locais" />
        
        </div>
        </div>)
}
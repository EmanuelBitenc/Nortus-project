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
}: FiltersTabelaClienteProps) {
    const {
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        tipoFilter,
        setTipoFilter,
        localFilter,
        setLocalFilter,
    } = useTabelaClientesStore();
    return (
        <div className="mb-4 flex justify-between gap-2 sm:items-center xl:gap-5">

            <div className="relative max-w-full flex-1">
                <svg
                    className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-(--text-secondary-color)"
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
                    className="w-full rounded-full border border-slate-600 bg-(--background) py-2 pr-4 pl-10 text-sm text-slate-300 placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-3">


                <SelectMap
                    value={statusFilter}
                    change={setStatusFilter}
                    datas={statusUnicos}
                    label="Todos os status"
                />


                <SelectMap
                    value={tipoFilter}
                    change={setTipoFilter}
                    datas={tiposUnicos}
                    label="Todos os tipos"
                />


                <SelectMap
                    value={localFilter}
                    change={setLocalFilter}
                    datas={locaisUnicos}
                    label="Todos os locais"
                />
            </div>
        </div>
    );
}

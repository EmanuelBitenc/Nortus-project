import Select from "@/components/select";
import { useTabelaTicketsStore } from "@/stores/useTabelaTicketsStore";

interface FiltersTicketsProps {
    statusOptions: string[];
    priorityOptions: string[];
    responsibleOptions: string[];
}

export default function FiltersTickets({
    statusOptions,
    priorityOptions,
    responsibleOptions,
}: FiltersTicketsProps) {
    const {
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        responsibleFilter,
        setResponsibleFilter,
    } = useTabelaTicketsStore();

    return (
        <div className="mb-4 flex justify-between gap-2 sm:items-center xl:gap-10">
            {/* Busca */}
            <div className="relative max-w-full flex-1">
                <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-secondary-color)"
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
                    placeholder="Buscar por ID, cliente ou assunto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full border border-slate-600 bg-(--background) py-2 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-8">
                {/* Filtro Status */}
                <Select
                    value={statusFilter}
                    change={setStatusFilter}
                    datas={statusOptions}
                    label="Todos os status"
                />

                {/* Filtro Prioridade */}
                <Select
                    value={priorityFilter}
                    change={setPriorityFilter}
                    datas={priorityOptions}
                    label="Todas as prioridades"
                />

                {/* Filtro Responsável */}
                <Select
                    value={responsibleFilter}
                    change={setResponsibleFilter}
                    datas={responsibleOptions}
                    label="Todos os responsáveis"
                />
            </div>
        </div>
    );
}

import Image from "next/image";
import peopleIcon from "../../../../../public/icons/peopleIcon.svg";

export function TabelaClientesSkeleton() {
    return (
        <div className="card-board">
            <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
                Clientes ativos
            </h3>
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <Image src={peopleIcon} alt="Nenhum cliente" width={64} height={64} className="mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">
                    Nenhum cliente encontrado
                </h3>
                <p className="text-(--text-secondary-color) max-w-md">
                    Não há clientes cadastrados no momento. Os clientes aparecerão aqui quando
                    forem adicionados ao sistema.
                </p>
            </div>
        </div>
    );
}

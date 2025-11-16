import Image from "next/image";
import ticketIcon from "../../../../public/icons/ticketIcon.svg"

export function TabelaTicketsSkeleton() {
    return (
        <div className="card-board">
            <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
                Tickets
            </h3>
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <Image src={ticketIcon} alt="Nenhum ticket" width={64} height={64} className="mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">
                    Nenhum ticket encontrado
                </h3>
                <p className="text-(--text-secondary-color) max-w-md mb-6">
                    Não há tickets no momento. Clique no botão "Novo Ticket" para criar seu
                    primeiro ticket de suporte.
                </p>
            </div>
        </div>
    );
}

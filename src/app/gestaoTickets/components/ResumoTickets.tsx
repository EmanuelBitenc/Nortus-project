"use client";

import { GestaoTicketsData } from "@/services/gestaoTicket.service";
import Image from "next/image";
import ticketIcon from "../../../../public/icons/ticketIcon.svg";
import andamentoIcon from "../../../../public/icons/andamentoIcon.svg";
import resolvidoIcon from "../../../../public/icons/resolvidoIcon.svg";
import tempoIcon from "../../../../public/icons/tempoIcon.svg";

interface ResumoTicketsProps {
    ticketsData: GestaoTicketsData;
}

export default function ResumoTickets({ ticketsData }: ResumoTicketsProps) {
    const { resumo } = ticketsData;

    const cards = [
        {
            title: "Tickets Abertos",
            value: resumo.open,
            icon: ticketIcon,
        },
        {
            title: "Em andamento",
            value: resumo.inProgress,
            icon: andamentoIcon,

        },
        {
            title: "Resolvidos hoje",
            value: resumo.solved,
            icon: resolvidoIcon,
        },
        {
            title: "Tempo Médio",
            value: `${resumo.timeAverageHours}h`,
            icon: tempoIcon,
        },
    ];

    return (
        <>
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="card-board"
                >
                    <div>
                        <div className="mb-4">
                            <p className="text-xs text-(--text-secondary-color) sm:text-sm">{card.title}</p>
                        </div>
                        <div className="flex justify-between items-center ">
                            <p className="text-2xl font-bold text-white sm:text-3xl">
                                {card.value}
                            </p>


                            <Image
                                src={card.icon}
                                alt={card.title}
                                width={28}
                                height={28}
                                className="sm:h-8 sm:w-8 h-12 w-12 items-center   "
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

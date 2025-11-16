"use client";

import { X } from "@deemlol/next-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputModal from "./inputModal";
import { useTicketsStore } from "@/stores/useTicketsStore";
import { toast } from "sonner";
import Image from "next/image";
import okIcon from "../../../../../public/icons/okIcon.png";
import { NovoTicketFormData, novoTicketSchema } from "../../schemaNovoTicket";

interface ModalNovoTicketProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalNovoTicket({
    isOpen,
    onClose,
}: ModalNovoTicketProps) {
    const addTicket = useTicketsStore((state) => state.addTicket);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NovoTicketFormData>({
        resolver: zodResolver(novoTicketSchema),
        defaultValues: {
            nomeCliente: "",
            email: "",
            prioridade: "",
            responsavel: "",
            assunto: "",
        },
    });

    const onSubmit = (data: NovoTicketFormData) => {
        addTicket({
            client: data.nomeCliente,
            email: data.email,
            priority: data.prioridade as "Urgente" | "Média" | "Baixa",
            responsible: data.responsavel,
            subject: data.assunto,
        });

        toast.success("Ticket criado com sucesso!", {
            description: "O ticket foi criado e já está na sua lista.",
            icon: <Image src={okIcon} alt="Sucesso" width={24} height={24} />,
            style: {
                background: 'var(--highlight-color)',
                color: '#fff',
                fontWeight: 'bold',
            },
        });

        reset();
        onClose();
    };

    const handleCancel = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-(--background) p-6 sm:p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">Novo Ticket</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-(--text-secondary-color) transition-colors hover:bg-slate-700/50 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>


                <p className="mb-6 text-sm text-(--text-secondary-color)">
                    Preencha os dados abaixo para registrar um novo ticket na plataforma.
                </p>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <InputModal label="Nome do cliente" name="nomeCliente" type="text" placeholder="Nome da pessoa ou empresa que está solicitando o suporte" register={register} errorMessage={errors.nomeCliente?.message} />

                        <InputModal label="Email" name="email" type="text" placeholder="E-mail de contato para atualizações e resposta" register={register} errorMessage={errors.email?.message} />



                        <div>
                            <label
                                htmlFor="prioridade"
                                className="mb-2 block text-sm font-medium text-(--text-secondary-color)"
                            >
                                Prioridade
                            </label>
                            <select
                                id="prioridade"
                                {...register("prioridade")}
                                className={`w-full rounded-3xl border ${errors.prioridade ? "border-(--danger-color)" : "border-slate-600"} bg-(--background-secondary) px-6 py-6 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500`}
                            >
                                <option value="" className="text-(--text-secondary-color)">Selecione o nível de urgência do atendimento</option>
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Urgente">Urgente</option>
                            </select>
                            {errors.prioridade && (
                                <p className="mt-1 text-xs text-(--danger-color)">{errors.prioridade.message}</p>
                            )}
                        </div>

                        <InputModal label="Responsável" name="responsavel" type="text" placeholder="Quem será o responsável por esse ticket" register={register} errorMessage={errors.responsavel?.message} />

                        <InputModal label="Assunto" name="assunto" type="textarea" placeholder="Resumo breve do problema ou solicitação" register={register} errorMessage={errors.assunto?.message} />
                    </div>



                    <div className="mt-8 flex justify-center gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className=" rounded-2xl border border-white px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-slate-700/50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className=" button-shiny rounded-2xl px-8 py-4 text-sm font-medium text-white"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

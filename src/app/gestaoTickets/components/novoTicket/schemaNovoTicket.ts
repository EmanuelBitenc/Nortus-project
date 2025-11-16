import { z } from "zod";

export const novoTicketSchema = z.object({
  nomeCliente: z.string().min(1, "Nome do cliente é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  prioridade: z.string().min(1, "Prioridade é obrigatória"),
  responsavel: z.string().min(1, "Responsável é obrigatório"),
  assunto: z.string().min(1, "Assunto é obrigatório"),
});

export type NovoTicketFormData = z.infer<typeof novoTicketSchema>;

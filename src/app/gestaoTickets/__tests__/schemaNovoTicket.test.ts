import { describe, it, expect } from "vitest";
import { novoTicketSchema } from "../schemaNovoTicket";

describe("Novo Ticket Schema", () => {
  const validTicket = {
    nomeCliente: "Cliente Teste",
    email: "cliente@example.com",
    prioridade: "Urgente",
    responsavel: "João Silva",
    assunto: "Assunto do ticket",
  };

  it("deve validar ticket com todos os campos preenchidos corretamente", () => {
    const result = novoTicketSchema.safeParse(validTicket);
    expect(result.success).toBe(true);
  });

  it("deve exigir nome do cliente", () => {
    const result = novoTicketSchema.safeParse({
      ...validTicket,
      nomeCliente: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Nome do cliente é obrigatório"
      );
    }
  });

  it("deve exigir email", () => {
    const result = novoTicketSchema.safeParse({
      ...validTicket,
      email: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("E-mail inválido");
    }
  });

  it("deve validar formato de email", () => {
    const result = novoTicketSchema.safeParse({
      ...validTicket,
      email: "email-invalido",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("E-mail inválido");
    }
  });

  it("deve exigir prioridade", () => {
    const result = novoTicketSchema.safeParse({
      ...validTicket,
      prioridade: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Prioridade é obrigatória");
    }
  });

  it("deve exigir responsável", () => {
    const result = novoTicketSchema.safeParse({
      ...validTicket,
      responsavel: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Responsável é obrigatório");
    }
  });

  it("deve exigir assunto", () => {
    const result = novoTicketSchema.safeParse({
      ...validTicket,
      assunto: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Assunto é obrigatório");
    }
  });

  it("deve rejeitar ticket sem nenhum campo preenchido", () => {
    const result = novoTicketSchema.safeParse({
      nomeCliente: "",
      email: "",
      prioridade: "",
      responsavel: "",
      assunto: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});

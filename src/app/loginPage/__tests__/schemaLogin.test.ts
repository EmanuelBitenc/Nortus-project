import { describe, it, expect } from "vitest";
import { loginSchema } from "../schemaLogin";

describe("Login Schema", () => {
  it("deve validar email válido", () => {
    const result = loginSchema.safeParse({
      email: "teste@example.com",
      password: "123456",
    });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar email inválido", () => {
    const result = loginSchema.safeParse({
      email: "email-invalido",
      password: "123456",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Email inválido");
  });

  it("deve exigir email obrigatório", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "123456",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Email inválido");
  });

  it("deve exigir senha obrigatória", () => {
    const result = loginSchema.safeParse({
      email: "teste@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});

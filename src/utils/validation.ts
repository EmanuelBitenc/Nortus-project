import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const emailSchema = z.string().email("Email inválido");

export const validateEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const isValidEmail = (
  email: string
): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: "Email é obrigatório" };
  }

  try {
    emailSchema.parse(email);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message };
    }
    return { isValid: false, error: "Email inválido" };
  }
};

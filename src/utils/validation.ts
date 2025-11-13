export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidEmail = (
  email: string
): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: "Email é obrigatório" };
  }

  if (!validateEmail(email)) {
    return { isValid: false, error: "Email inválido" };
  }

  return { isValid: true };
};

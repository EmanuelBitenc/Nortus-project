import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";
const USERNAME_KEY = "username";

// Configuração dos cookies
const COOKIE_OPTIONS = {
  expires: 7,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

export const cookieStorage = {
  setToken: (token: string): void => {
    Cookies.set(TOKEN_KEY, token, COOKIE_OPTIONS);
  },

  getToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  removeToken: (): void => {
    Cookies.remove(TOKEN_KEY);
  },

  setUsername: (username: string): void => {
    Cookies.set(USERNAME_KEY, username, COOKIE_OPTIONS);
  },

  getUsername: (): string | undefined => {
    return Cookies.get(USERNAME_KEY);
  },

  removeUsername: (): void => {
    Cookies.remove(USERNAME_KEY);
  },

  clearAll: (): void => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USERNAME_KEY);
  },
};

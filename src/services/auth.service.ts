import api from "./api";
import { cookieStorage } from "@/utils/cookie-storage";

export interface LoginResponse {
  data: {
    accessToken: string;
    username: string;
    user?: {
      name: string;
      email: string;
    };
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  //api mock
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.get<LoginResponse>("/login.json");
    return response.data;
  },

  logout: () => {
    cookieStorage.clearAll();
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return cookieStorage.getToken() || null;
    }
    return null;
  },

  setToken: (token: string): void => {
    if (typeof window !== "undefined") {
      cookieStorage.setToken(token);
    }
  },

  getUsername: (): string | null => {
    if (typeof window !== "undefined") {
      return cookieStorage.getUsername() || null;
    }
    return null;
  },

  setUsername: (username: string): void => {
    if (typeof window !== "undefined") {
      cookieStorage.setUsername(username);
    }
  },
};

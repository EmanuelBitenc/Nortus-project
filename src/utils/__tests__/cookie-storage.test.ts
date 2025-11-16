import { describe, it, expect, beforeEach, vi } from "vitest";
import Cookies from "js-cookie";
import { cookieStorage } from "../cookie-storage";

// Mock do js-cookie
vi.mock("js-cookie", () => ({
  default: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
  },
}));

describe("CookieStorage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Quando trabalha com tokens", () => {
    it("Guarda o token com todas as configurações", () => {
      const token = "test-token-123";
      cookieStorage.setToken(token);

      expect(Cookies.set).toHaveBeenCalledWith("accessToken", token, {
        expires: 1,
        secure: false,
        sameSite: "strict",
      });
    });

    it("Pega o token que foi guardado", () => {
      const mockToken = "stored-token-456";
      (Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(mockToken);

      const result = cookieStorage.getToken();

      expect(Cookies.get).toHaveBeenCalledWith("accessToken");
      expect(result).toBe(mockToken);
    });

    it("Apaga o token quando solicitado", () => {
      cookieStorage.removeToken();

      expect(Cookies.remove).toHaveBeenCalledWith("accessToken");
    });
  });

  describe("Quando trabalha com username", () => {
    it("Guarda o nome do usuário com todas as configurações", () => {
      const username = "test-user";
      cookieStorage.setUsername(username);

      expect(Cookies.set).toHaveBeenCalledWith("username", username, {
        expires: 1,
        secure: false,
        sameSite: "strict",
      });
    });

    it("Recuperar o nome do usuário que foi guardado", () => {
      const mockUsername = "stored-user";
      (Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(mockUsername);

      const result = cookieStorage.getUsername();

      expect(Cookies.get).toHaveBeenCalledWith("username");
      expect(result).toBe(mockUsername);
    });

    it("Retorna vazio quando não acha o username", () => {
      (Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue(undefined);

      const result = cookieStorage.getUsername();

      expect(result).toBeUndefined();
    });

    it("Apaga o username quando solicitado", () => {
      cookieStorage.removeUsername();

      expect(Cookies.remove).toHaveBeenCalledWith("username");
    });
  });

  describe("Apagar dados", () => {
    it("Apaga tanto o token quanto o username", () => {
      cookieStorage.clearAll();

      expect(Cookies.remove).toHaveBeenCalledWith("accessToken");
      expect(Cookies.remove).toHaveBeenCalledWith("username");
      expect(Cookies.remove).toHaveBeenCalledTimes(2);
    });
  });
});

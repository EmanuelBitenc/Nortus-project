const USER_KEY = "user";

interface User {
  name: string;
  email: string;
}

export const userStorage = {
  setUser: (user: User): void => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser: (): any | null => {
    if (typeof window !== "undefined") {
      const user = window.localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  removeUser: (): void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(USER_KEY);
    }
  },

  clearAll: (): void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(USER_KEY);
    }
  },
};

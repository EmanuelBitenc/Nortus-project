import axios from "axios";
import { cookieStorage } from "@/utils/cookie-storage";

const api = axios.create({
  baseURL: "https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      // Token expirou ou invalido
      cookieStorage.clearAll();
      window.location.href = "/loginPage";
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const API_URL = "/api/auth";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const login = async (userData: { email: string; password: string }) => {
  const response = await api.post("/login", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

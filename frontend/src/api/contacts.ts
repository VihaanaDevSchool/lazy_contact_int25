import axios from "axios";

const API_URL = "/api/contacts";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getContacts = async () => {
  const response = await api.get("/");
  return response.data;
};

export const createContact = async (contactData: {
  name: string;
  email: string;
  phone: string;
}) => {
  const response = await api.post("/", contactData);
  return response.data;
};

export const updateContact = async (
  id: string,
  contactData: { name: string; email: string; phone: string },
) => {
  const response = await api.put(`/${id}`, contactData);
  return response.data;
};

export const deleteContact = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

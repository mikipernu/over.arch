import axios, { AxiosInstance } from 'axios';

const createAxiosClient = (token = '') => {
  const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return client;
};

export default createAxiosClient;
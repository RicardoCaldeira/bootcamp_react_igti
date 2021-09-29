import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://tabela-brasileirao-backend.glitch.me/'
    : 'http://localhost:3001/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}
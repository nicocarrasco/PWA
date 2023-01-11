import axios, { AxiosRequestConfig } from 'axios';

export const LOCAL_URL = 'http://localhost:3001/api';
export const BASE_URL = 'https://rumorz.atiteux.fr/api';
export const NGROK_URL = 'https://4ca9-2a01-cb1c-700-cb00-243c-fc8-5d30-6e9f.ngrok.io/api';

export const api = axios.create({
  baseURL: LOCAL_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export async function request<T, R>(options: AxiosRequestConfig<R>): Promise<T> {
  return api(options);
}

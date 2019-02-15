import axios from 'axios';
import { log } from 'util';
import https from 'https';


const data = {
  url: 'https://api.adeodev.org/',
};

const api = axios.create({
  baseURL: data.url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  responseType: 'json',
});

api.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem('auth_token');
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);
api.interceptors.response.use(config => config, error => Promise.reject(error));

export default api;

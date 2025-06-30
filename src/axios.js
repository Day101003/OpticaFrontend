import axios from 'axios';
import { getToken } from './utils/auth';

const instance = axios.create({
  baseURL: 'http://localhost:5282/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e200-backend.onrender.com/api/v1/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;

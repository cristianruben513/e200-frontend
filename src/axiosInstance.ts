import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://e200-backend.onrender.com/api/v1/',
  //baseURL: 'http://localhost:3000/api/v1/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Configurar el token en el header de cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

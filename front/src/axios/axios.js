import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});


instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default instance;
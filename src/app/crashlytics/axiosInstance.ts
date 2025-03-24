import axios from 'axios';
import { logErrorToCrashlytics } from './crashlyticsLogger'; 

const api = axios.create({
  baseURL: 'https://dummyjson.com/products', 
  timeout: 10000,
});

// Axios Interceptor to Log Errors to Crashlytics
api.interceptors.response.use(
  (response) => response,
  (error) => {
    logErrorToCrashlytics(error); 
    return Promise.reject(error);
  }
);

export default api;

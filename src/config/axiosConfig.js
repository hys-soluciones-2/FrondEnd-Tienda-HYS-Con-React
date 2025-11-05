// src/config/axiosConfig.js
import axios from "axios";

// Configuración base de axios para comunicarse con el backend
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 segundos de timeout
});

// Interceptor para requests (para debugging)
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Enviando petición a:", config.baseURL + config.url);
        console.log("Datos:", config.data);
        return config;
    },
    (error) => {
        console.error("Error en el request:", error);
        return Promise.reject(error);
    }
);

// Interceptor para responses (para debugging y manejo de errores)
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Respuesta recibida:", response);
        return response;
    },
    (error) => {
        console.error("Error en la petición:", error);
        
        if (error.code === 'ECONNABORTED') {
            console.error("Timeout: El servidor no respondió a tiempo");
        } else if (error.message === 'Network Error') {
            console.error("Error de red: Verifica que el backend esté corriendo en http://localhost:8080");
            console.error("URL completa intentada:", error.config?.baseURL + error.config?.url);
        } else if (error.response) {
            // El servidor respondió con un código de error
            console.error("Error del servidor:", error.response.status, error.response.data);
        } else if (error.request) {
            // La petición se hizo pero no hubo respuesta
            console.error("No hubo respuesta del servidor:", error.request);
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;


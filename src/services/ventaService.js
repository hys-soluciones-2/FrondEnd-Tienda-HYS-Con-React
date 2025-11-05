import axiosInstance from "../config/axiosConfig";

const API = "/ventas-diarias";

export const ventaService = {
    registrar: (data) => axiosInstance.post(API, data),
    listarTodas: () => axiosInstance.get(API),
    obtenerTodas: () => axiosInstance.get(API), // alias para compatibilidad
    porFecha: (fecha) => axiosInstance.get(`${API}/dia/${fecha}`),
    enRango: (inicio, fin) =>
        axiosInstance.get(`${API}/rango?inicio=${inicio}&fin=${fin}`),
    totalEnRango: (inicio, fin) =>
        axiosInstance.get(`${API}/rango/total?inicio=${inicio}&fin=${fin}`),
    getTotalEnRango: (inicio, fin) =>
        axiosInstance.get(`${API}/rango/total?inicio=${inicio}&fin=${fin}`), // alias
    totalMesActual: () => axiosInstance.get(`${API}/total-mes-actual`),
    getTotalAcumulado: () => axiosInstance.get(`${API}/total-acumulado`), // alias
    eliminar: (fecha) => axiosInstance.delete(`${API}/fecha/${fecha}`),
    eliminarPorFecha: (fecha) => axiosInstance.delete(`${API}/fecha/${fecha}`), // alias
    registrarVenta: (data) => axiosInstance.post(API, data), // alias
};

import axiosInstance from "../config/axiosConfig";

const API = "http://localhost:8080/pedidos";

export const pedidoService = {
    crear: (data) => axiosInstance.post(API, data),
    listarTodos: () => axiosInstance.get(`${API}/listar`),
    listarPendientes: () => axiosInstance.get(`${API}/pendientes`),
    listarRecibidos: () => axiosInstance.get(`${API}/recibido`),
    listarPend: async () => {
        const res = await fetch(`${API}/pendientes`);
        return res.json();
    },
};

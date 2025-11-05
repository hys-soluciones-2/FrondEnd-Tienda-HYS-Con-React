import axiosInstance from "../config/axiosConfig";

const API = "/pedidos";

export const pedidoService = {
    crear: (data) => axiosInstance.post(API, data),
    listarTodos: () => axiosInstance.get(`${API}/listar`),
    listarPendientes: () => axiosInstance.get(`${API}/pendientes`),
    listarRecibidos: () => axiosInstance.get(`${API}/recibido`),
    recibir: (id) => axiosInstance.patch(`${API}/${id}/recibir`),
};

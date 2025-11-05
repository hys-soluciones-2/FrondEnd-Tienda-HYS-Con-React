import axiosInstance from "../config/axiosConfig";

const API = "/proveedor";

export const proveedorService = {
    getAll: () => axiosInstance.get(`${API}`),
    create: (data) => axiosInstance.post(`${API}/agregar`, data),
    update: (id, data) => axiosInstance.put(`${API}/actualizar/${id}`, data),
    delete: (id) => axiosInstance.delete(`${API}/${id}`),
    cambiarEstado: (id, estado) => axiosInstance.put(`${API}/estado/${id}`, estado),
    buscarPorNombre: (nombre) => axiosInstance.get(`${API}/buscar/nombre/${nombre}`),
    buscarPorId: (id) => axiosInstance.get(`${API}/buscar/id/${id}`),
    listarPorEstado: (estado) => axiosInstance.get(`${API}/estado/${estado}`),
};

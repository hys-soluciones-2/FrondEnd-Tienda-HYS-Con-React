import axiosInstance from "../config/axiosConfig";

const PRODUCTO_API = "/producto";
const RELACIONES_API = "/relaciones";

export const productoService = {
    getAll: () => axiosInstance.get(`${PRODUCTO_API}`),
    create: (data) => axiosInstance.post(`${PRODUCTO_API}/agregar`, data),
    // utilidades de búsqueda opcionales
    buscarPorNombre: (nombre) =>
        axiosInstance.get(`${PRODUCTO_API}/buscar/nombre/${nombre}`),
    buscarPorId: (id) => axiosInstance.get(`${PRODUCTO_API}/buscar/id/${id}`),
    // relaciones producto-proveedor
    associateProveedor: (data) =>
        axiosInstance.post(`${RELACIONES_API}/asociar`, data),
    getProveedoresByProducto: (id) =>
        axiosInstance.get(`${RELACIONES_API}/producto/${id}/proveedores`),
};

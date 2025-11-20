import axiosInstance from "../config/axiosConfig";

const API = "/compras-diarias";

export const compraService = {
    registrar: (data) => axiosInstance.post(`${API}`, data),
    registrarCompra: (data) => axiosInstance.post(`${API}`, data), // alias
    listarTodas: () => axiosInstance.get(`${API}/listar`),
    obtenerTodas: () => axiosInstance.get(`${API}/listar`), // alias
    enRango: (inicio, fin) =>
        axiosInstance.get(`${API}/rango?inicio=${inicio}&fin=${fin}`),
    totalConFacturaEnRango: (inicio, fin) =>
        axiosInstance.get(
            `${API}/rango/con-factura?inicio=${inicio}&fin=${fin}`
        ),
    totalSinFacturaEnRango: (inicio, fin) =>
        axiosInstance.get(
            `${API}/rango/sin-factura?inicio=${inicio}&fin=${fin}`
        ),
    getTotalConFacturaEnRango: (inicio, fin) =>
        axiosInstance.get(
            `${API}/rango/con-factura?inicio=${inicio}&fin=${fin}`
        ), // alias
    getTotalSinFacturaEnRango: (inicio, fin) =>
        axiosInstance.get(
            `${API}/rango/sin-factura?inicio=${inicio}&fin=${fin}`
        ), // alias
    totalMesActualConFactura: () =>
        axiosInstance.get(`${API}/MesActualConFactura`),
    totalMesActualSinFactura: () =>
        axiosInstance.get(`${API}/MesActualSinFactura`),
    eliminar: (fecha) => axiosInstance.delete(`${API}/eliminar/fecha/${fecha}`),
    //actualizar: (fecha) =>
    //    axiosInstance.put(`${API}/actualizar/fecha/${fecha}`),
    actualizar: (fecha, datos) =>
        axiosInstance.put(`${API}/actualizar/fecha/${fecha}`, datos),

    actualizarCompra: (compra) =>
        axiosInstance.put(
            `${API}/actualizar/fecha/${compra.fechaCompra}`,
            compra
        ),

    eliminarPorFecha: (fecha) =>
        axiosInstance.delete(`${API}/eliminar/fecha/${fecha}`), // alias
    obtenerPorFecha: (fecha) =>
        axiosInstance.get(`${API}/compra/fecha/${fecha}`),
};

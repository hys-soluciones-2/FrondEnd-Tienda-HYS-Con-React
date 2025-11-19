import React from "react";
import { useState, useEffect } from "react";
import Navegacion from "../components/plantilla/Navegacion";
import { proveedorService } from "../services/proveedorService";
import { pedidoService } from "../services/pedidosService";

export default function AgregarPedido() {
    const [proveedores, setProveedores] = useState([]);

    const [relacionData, setRelacionData] = useState({
        idProveedor: "",
        idProductos: [],
    });

    const cargarDatos = async () => {
        const [provRes] = await Promise.all([proveedorService.getAll()]);

        setProveedores(provRes.data);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const proveedorSeleccionado = proveedores.find(
        (p) => p.idProveedor === parseInt(relacionData.idProveedor)
    );
    // Manejar selección de productos
    const handleProductosChange = (e) => {
        if (!proveedorSeleccionado) return;
        const selectedIds = Array.from(e.target.selectedOptions).map((opt) =>
            parseInt(opt.value)
        );
        const nuevosProductos = selectedIds.map((id) => {
            const prod = proveedorSeleccionado.productos.find(
                (p) => p.idProducto === id
            );
            return {
                idProducto: prod.idProducto,
                cantidad: 1, // valor inicial
                costoUnitario: prod.precio,
            };
        });
        setRelacionData({
            ...relacionData,
            productos: nuevosProductos,
        });
    };

    // Manejar cambio de cantidad
    const handleCantidadChange = (index, nuevaCantidad) => {
        const nuevos = [...relacionData.productos];
        nuevos[index].cantidad = parseInt(nuevaCantidad);
        setRelacionData({ ...relacionData, productos: nuevos });
    };

    // Generar pedido y enviarlo al backend
    const generarPedido = async () => {
        const pedido = {
            idProveedor: parseInt(relacionData.idProveedor),
            fechaPedido: new Date().toISOString().split("T")[0], // YYYY-MM-DD
            detalles: relacionData.productos.map((p) => ({
                idProducto: p.idProducto,
                cantidad: p.cantidad,
                costoUnitario: p.costoUnitario,
            })),
        };

        try {
            await pedidoService.crear(pedido);
            alert("Pedido generado correctamente ✅");
            // reset
            setRelacionData({ idProveedor: "", productos: [] });
        } catch (error) {
            console.error(error);
            alert("Error al generar el pedido ❌");
        }
    };

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <div style={{ margin: "30px" }}>
                    <Navegacion />
                </div>
                <h3>Agregar Pedido</h3>
                <div style={{ margin: "20px" }}>
                    {/* Select de proveedores */}
                    <select
                        value={relacionData.idProveedor}
                        onChange={(e) =>
                            setRelacionData({
                                ...relacionData,
                                idProveedor: e.target.value,
                                productos: [], // reset producto al cambiar proveedor
                            })
                        }
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar Proveedor</option>
                        {proveedores.map((p) => (
                            <option key={p.idProveedor} value={p.idProveedor}>
                                {p.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select múltiple de productos */}
                {proveedorSeleccionado ? (
                    <select
                        multiple
                        value={relacionData.productos.map((p) => p.idProducto)}
                        onChange={handleProductosChange}
                        className="p-2 border rounded mt-3"
                        required
                    >
                        {proveedorSeleccionado.productos.map((prod) => (
                            <option
                                key={prod.idProducto}
                                value={prod.idProducto}
                            >
                                {prod.nombreProducto} - ${prod.precio}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p className="mt-3 text-muted">
                        Seleccione un proveedor para ver sus productos
                    </p>
                )}

                {/* Inputs de cantidad */}
                {Array.isArray(relacionData.productos) &&
                    relacionData.productos.map((prod, index) => (
                        <div key={prod.idProducto} className="mt-2">
                            <span>
                                Producto #{prod.idProducto} - Precio: $
                                {prod.costoUnitario}
                            </span>
                            <input
                                type="number"
                                min="1"
                                value={prod.cantidad}
                                onChange={(e) =>
                                    handleCantidadChange(index, e.target.value)
                                }
                                className="ms-2 p-1 border rounded"
                            />
                        </div>
                    ))}

                {/* Botón para generar pedido */}
                <button
                    onClick={generarPedido}
                    className="btn btn-primary mt-3"
                    disabled={
                        !relacionData.idProveedor ||
                        relacionData.productos.length === 0
                    }
                >
                    Generar Pedido
                </button>
            </div>
        </div>
    );
}

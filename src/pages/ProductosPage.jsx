import { useState, useEffect } from "react";
import { productoService } from "../services/productoService";
import { proveedorService } from "../services/proveedorService";

export default function ProductosPage() {
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
        nombreProducto: "",
        descripcion: "",
        precio: "",
    });
    const [relacionData, setRelacionData] = useState({
        idProducto: "",
        idProveedor: "",
        costoUnitario: "",
    });

    const cargarDatos = async () => {
        const [prodRes, provRes] = await Promise.all([
            productoService.getAll(),
            proveedorService.getAll(),
        ]);
        setProductos(prodRes.data);
        setProveedores(provRes.data);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleCrearProducto = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                nombreProducto: formData.nombreProducto,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio) || 0,
                estadoProducto: "DISPONIBLE",
            };
            await productoService.create(payload);
            cargarDatos();
            setFormData({ nombreProducto: "", descripcion: "", precio: "" });
            alert("Producto creado");
        } catch (error) {
            console.error("Error al crear producto:", error);
            alert(
                "Error al crear producto: " +
                    (error.response?.data || error.message)
            );
        }
    };

    const handleAsociar = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                idProducto: parseInt(relacionData.idProducto, 10),
                idProveedor: parseInt(relacionData.idProveedor, 10),
            };
            await productoService.associateProveedor(payload);
            alert("Proveedor asociado correctamente");
            setRelacionData({
                idProducto: "",
                idProveedor: "",
                costoUnitario: "",
            });
        } catch (error) {
            console.error("Error al asociar proveedor:", error);
            alert(
                "Error al asociar proveedor: " +
                    (error.response?.data || error.message)
            );
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Gestión de Productos
            </h1>

            {/* Crear Producto */}
            <div className="bg-white p-5 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Registrar Nuevo Producto
                </h2>
                <form
                    onSubmit={handleCrearProducto}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={formData.nombreProducto}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                nombreProducto: e.target.value,
                            })
                        }
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={formData.descripcion}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                descripcion: e.target.value,
                            })
                        }
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={formData.precio}
                        onChange={(e) =>
                            setFormData({ ...formData, precio: e.target.value })
                        }
                        className="p-2 border rounded"
                        step="0.01"
                    />

                    <button
                        type="submit"
                        className="md:col-span-3 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Registrar Producto
                    </button>
                </form>
            </div>

            {/* Asociar Proveedor */}
            <div className="bg-white p-5 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Asociar Proveedor a Producto
                </h2>
                <form
                    onSubmit={handleAsociar}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                    <select
                        value={relacionData.idProducto}
                        onChange={(e) =>
                            setRelacionData({
                                ...relacionData,
                                idProducto: e.target.value,
                            })
                        }
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar Producto</option>
                        {productos.map((p) => (
                            <option key={p.idProducto} value={p.idProducto}>
                                {p.nombreProducto}
                            </option>
                        ))}
                    </select>
                    <select
                        value={relacionData.idProveedor}
                        onChange={(e) =>
                            setRelacionData({
                                ...relacionData,
                                idProveedor: e.target.value,
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
                    <input
                        type="number"
                        placeholder="Costo unitario"
                        value={relacionData.costoUnitario}
                        onChange={(e) =>
                            setRelacionData({
                                ...relacionData,
                                costoUnitario: e.target.value,
                            })
                        }
                        className="p-2 border rounded"
                        step="0.01"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                    >
                        Asociar
                    </button>
                </form>
            </div>

            {/* Lista de Productos */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Producto
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Descripción
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Precio
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {productos.map((p) => (
                            <tr key={p.idProducto}>
                                <td className="px-4 py-2">
                                    {p.nombreProducto}
                                </td>
                                <td className="px-4 py-2">{p.descripcion}</td>
                                <td className="px-4 py-2">
                                    ${p.precio?.toFixed(2)}
                                </td>
                                <td className="px-4 py-2">
                                    {p.estadoProducto}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

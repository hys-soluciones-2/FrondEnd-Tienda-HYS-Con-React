import { useState, useEffect } from "react";
import { proveedorService } from "../services/proveedorService";

export default function ProveedoresPage() {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        contacto: "",
        telefono: "",
        email: "",
    });

    const cargarProveedores = async () => {
        const res = await proveedorService.getAll();
        setProveedores(res.data);
    };

    useEffect(() => {
        cargarProveedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await proveedorService.create(formData);
        cargarProveedores();
        setFormData({ nombre: "", contacto: "", telefono: "", email: "" });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Gestión de Proveedores
            </h1>

            <div className="bg-white p-5 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Registrar Nuevo Proveedor
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={(e) =>
                            setFormData({ ...formData, nombre: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contacto"
                        value={formData.contacto}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                contacto: e.target.value,
                            })
                        }
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                telefono: e.target.value,
                            })
                        }
                        className="p-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Registrar Proveedor
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Nombre
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Contacto
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Teléfono
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {proveedores.map((p) => (
                            <tr key={p.idProveedor}>
                                <td className="px-4 py-2">{p.nombre}</td>
                                <td className="px-4 py-2">{p.contacto}</td>
                                <td className="px-4 py-2">{p.telefono}</td>
                                <td className="px-4 py-2">{p.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

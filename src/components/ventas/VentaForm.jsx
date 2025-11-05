// src/components/VentaForm.jsx
import { useState } from "react";
import { ventaService } from "../services/ventaService";

export default function VentaForm({ onSaved }) {
    const [formData, setFormData] = useState({ fecha: "", monto: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                fecha: formData.fecha,
                monto: parseFloat(formData.monto) || 0,
            };
            console.log("Intentando registrar venta con datos:", data);
            await ventaService.registrarVenta(data);
            alert("Venta registrada exitosamente");
            onSaved();
            setFormData({ fecha: "", monto: "" });
        } catch (error) {
            console.error("Error completo al registrar venta:", error);
            let mensaje = "Error al registrar la venta: ";
            
            if (error.message === 'Network Error') {
                mensaje += "No se pudo conectar con el servidor. Verifica que:\n";
                mensaje += "1. El backend esté corriendo en http://localhost:8080\n";
                mensaje += "2. CORS esté configurado correctamente (@CrossOrigin)\n";
                mensaje += "3. El endpoint /api/ventas-diarias exista en el backend";
            } else if (error.response) {
                // El servidor respondió con un error
                mensaje += error.response.data?.message || 
                          `Error ${error.response.status}: ${error.response.statusText}`;
            } else if (error.request) {
                mensaje += "No se recibió respuesta del servidor";
            } else {
                mensaje += error.message;
            }
            
            alert(mensaje);
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow mb-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Registrar Venta Diaria
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Fecha
                        </label>
                        <input
                            type="date"
                            value={formData.fecha}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    fecha: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-green-700">
                            Monto ($)
                        </label>
                        <input
                            type="number"
                            value={formData.monto}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    monto: e.target.value,
                                })
                            }
                            className="w-full p-2 border border-green-300 rounded"
                            step="0.01"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Guardar Venta
                </button>
            </form>
        </div>
    );
}

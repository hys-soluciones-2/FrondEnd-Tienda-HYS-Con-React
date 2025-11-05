// src/components/compras/CompraForm.jsx
import { useState } from "react";
import { compraService } from "../../services/compraService";

export default function CompraForm({ onSaved }) {
    const [formData, setFormData] = useState({
        fecha: "",
        compraDelDiaConFactura: "",
        compraDelDiaSinFactura: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                fecha: formData.fecha,
                montoConFactura:
                    parseFloat(formData.compraDelDiaConFactura) || 0,
                montoSinFactura:
                    parseFloat(formData.compraDelDiaSinFactura) || 0,
            };
            await compraService.registrarCompra(data);
            alert("Compra registrada exitosamente");
            onSaved();
            setFormData({
                fecha: "",
                compraDelDiaConFactura: "",
                compraDelDiaSinFactura: "",
            });
        } catch (error) {
            console.error("Error completo:", error);
            let mensaje = "Error al registrar la compra: ";
            
            if (error.message === 'Network Error') {
                mensaje += "No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:8080";
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
        <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Registrar Compra Diaria
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha
                    </label>
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-green-700">
                            Con Factura ($)
                        </label>
                        <input
                            type="number"
                            name="compraDelDiaConFactura"
                            value={formData.compraDelDiaConFactura}
                            onChange={handleChange}
                            className="w-full p-2 border border-green-300 rounded"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-orange-700">
                            Sin Factura ($)
                        </label>
                        <input
                            type="number"
                            name="compraDelDiaSinFactura"
                            value={formData.compraDelDiaSinFactura}
                            onChange={handleChange}
                            className="w-full p-2 border border-orange-300 rounded"
                            step="0.01"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Guardar Compra
                </button>
            </form>
        </div>
    );
}

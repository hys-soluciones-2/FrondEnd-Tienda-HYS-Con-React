import { useState, useEffect } from "react";
import DateRangePicker from "../components/ui/DateRangePicker";
import { ventaService } from "../services/ventaService";

export default function VentasDiariasPage() {
    const [ventas, setVentas] = useState([]);
    const [formData, setFormData] = useState({ fecha: "", monto: "" });
    const [rango, setRango] = useState({ inicio: "", fin: "" });
    const [totalRango, setTotalRango] = useState(0);
    const [totalMes, setTotalMes] = useState(0);

    const cargarVentas = async () => {
        try {
            const res = await ventaService.listarTodas();
            setVentas(res.data || []);
        } catch (error) {
            console.error("Error al cargar ventas:", error);
            setVentas([]);
        }
    };

    const cargarTotalMes = async () => {
        try {
            const res = await ventaService.totalMesActual();
            setTotalMes(res.data || 0);
        } catch (error) {
            console.error("Error al cargar total del mes:", error);
            if (error.response?.status === 404) {
                console.warn("Endpoint /total-mes-actual no existe en el backend. Mostrando 0.");
            }
            setTotalMes(0);
        }
    };

    useEffect(() => {
        cargarVentas();
        cargarTotalMes();
    }, []);

    const handleRegistrar = async (e) => {
        e.preventDefault();
        try {
            const data = {
                fecha: formData.fecha,
                monto: parseFloat(formData.monto) || 0,
            };
            console.log("Intentando registrar venta con datos:", data);
            await ventaService.registrar(data);
            cargarVentas();
            setFormData({ fecha: "", monto: "" });
            alert("Venta registrada exitosamente");
        } catch (error) {
            console.error("Error completo al registrar venta:", error);
            let mensaje = "Error al registrar la venta: ";
            
            if (error.message === 'Network Error') {
                mensaje += "No se pudo conectar con el servidor. Verifica que:\n";
                mensaje += "1. El backend esté corriendo en http://localhost:8080\n";
                mensaje += "2. CORS esté configurado correctamente (@CrossOrigin)\n";
                mensaje += "3. El endpoint /api/ventas-diarias exista en el backend";
            } else if (error.response) {
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

    const handleBuscarRango = async (inicio, fin) => {
        setRango({ inicio, fin });
        try {
            const [ventasRes, totalRes] = await Promise.all([
                ventaService.enRango(inicio, fin),
                ventaService.totalEnRango(inicio, fin),
            ]);
            setVentas(ventasRes.data || []);
            setTotalRango(totalRes.data || 0);
        } catch (error) {
            console.error("Error al buscar por rango:", error);
            setVentas([]);
            setTotalRango(0);
        }
    };

    const handleEliminar = async (fecha) => {
        if (window.confirm(`¿Eliminar venta del ${fecha}?`)) {
            try {
                await ventaService.eliminar(fecha);
                cargarVentas();
                alert("Venta eliminada exitosamente");
            } catch (error) {
                console.error("Error al eliminar venta:", error);
                alert("Error al eliminar la venta");
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Gestión de Ventas Diarias
            </h1>

            {/* Registro */}
            <div className="bg-white p-5 rounded-lg shadow mb-6 border-l-4 border-green-500">
                <h2 className="text-xl font-semibold mb-4">
                    Registrar Venta Diaria
                </h2>
                <form
                    onSubmit={handleRegistrar}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) =>
                            setFormData({ ...formData, fecha: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                    />
                    <div>
                        <input
                            type="number"
                            placeholder="Monto ($)"
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
                    <button
                        type="submit"
                        className="md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Registrar Venta
                    </button>
                </form>
            </div>

            {/* Totales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-700">
                        Total Mes Actual
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                        ${totalMes.toFixed(2)}
                    </p>
                </div>
                {rango.inicio && (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-700">
                            Total Rango ({rango.inicio} a {rango.fin})
                        </h3>
                        <p className="text-2xl font-bold text-blue-600 mt-2">
                            ${totalRango.toFixed(2)}
                        </p>
                    </div>
                )}
            </div>

            {/* Filtro por rango */}
            <DateRangePicker onSearch={handleBuscarRango} />

            {/* Tabla de ventas */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Fecha
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Monto
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {ventas.map((v) => (
                            <tr key={v.idVenta}>
                                <td className="px-4 py-2">{v.fechaVenta}</td>
                                <td className="px-4 py-2 font-medium">
                                    ${v.ventaDelDia?.toFixed(2)}
                                </td>
                                <td className="px-4 py-2 text-right">
                                    <button
                                        onClick={() =>
                                            handleEliminar(v.fechaVenta)
                                        }
                                        className="text-red-600 hover:text-red-900 text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

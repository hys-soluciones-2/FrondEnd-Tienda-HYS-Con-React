// src/components/compras/CompraList.jsx
import { useState, useEffect } from "react";
import { compraService } from "../../services/compraService";

export default function CompraList({ rango, onEdit }) {
    const [compras, setCompras] = useState([]);
    const [totales, setTotales] = useState({ conFactura: 0, sinFactura: 0 });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Cargar lista
                const resLista = await compraService.obtenerTodas();
                setCompras(resLista.data || []);

                // Cargar totales si hay rango
                if (rango.inicio && rango.fin) {
                    const resCon =
                        await compraService.getTotalConFacturaEnRango(
                            rango.inicio,
                            rango.fin
                        );
                    const resSin =
                        await compraService.getTotalSinFacturaEnRango(
                            rango.inicio,
                            rango.fin
                        );
                    setTotales({
                        conFactura: resCon.data || 0,
                        sinFactura: resSin.data || 0,
                    });
                }
            } catch (error) {
                console.error("Error al cargar compras:", error);
                setCompras([]);
                setTotales({ conFactura: 0, sinFactura: 0 });
            }
        };
        cargarDatos();
    }, [rango]);

    const handleEliminar = async (fecha) => {
        if (window.confirm(`¿Eliminar compra del ${fecha}?`)) {
            try {
                await compraService.eliminarPorFecha(fecha);
                alert("Compra eliminada");
                window.location.reload(); // o mejor: actualiza estado
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {rango.inicio && (
                <div className="p-4 bg-gray-50 border-b">
                    <h3 className="font-semibold text-gray-700">
                        Totales en rango ({rango.inicio} a {rango.fin})
                    </h3>
                    <div className="flex space-x-6 mt-2">
                        <div>
                            <span className="text-sm text-green-600">
                                Con Factura:
                            </span>
                            <span className="ml-2 font-bold text-green-800">
                                ${totales.conFactura.toFixed(2)}
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-orange-600">
                                Sin Factura:
                            </span>
                            <span className="ml-2 font-bold text-orange-800">
                                ${totales.sinFactura.toFixed(2)}
                            </span>
                        </div>
                        <div>
                            <span className="text-sm font-bold text-blue-800">
                                Total:
                            </span>
                            <span className="ml-2 font-bold text-blue-800">
                                $
                                {(
                                    totales.conFactura + totales.sinFactura
                                ).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Fecha
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-green-600 uppercase">
                                Con Factura
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-orange-600 uppercase">
                                Sin Factura
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Total
                            </th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {compras && compras.length > 0 ? (
                            compras.map((compra) => {
                                const conFactura =
                                    compra.compraDelDiaConFactura || 0;
                                const sinFactura =
                                    compra.compraDelDiaSinFactura || 0;
                                return (
                                    <tr
                                        key={compra.idCompra}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            {compra.fechaCompra}
                                        </td>
                                        <td className="px-4 py-2 text-green-700">
                                            ${conFactura.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 text-orange-700">
                                            ${sinFactura.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 font-medium">
                                            $
                                            {(conFactura + sinFactura).toFixed(
                                                2
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-right space-x-2">
                                            <button
                                                onClick={() => onEdit(compra)}
                                                className="text-blue-600 hover:text-blue-900 text-sm"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleEliminar(
                                                        compra.fechaCompra
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-900 text-sm"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No hay compras registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

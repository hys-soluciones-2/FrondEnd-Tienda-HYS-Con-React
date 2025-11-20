import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ventaService } from "../services/ventaService";
import { compraService } from "../services/compraService";
import { NumericFormat } from "react-number-format";

export default function Dashboard() {
    const [datos, setDatos] = useState({
        ventasMes: 0,
        comprasConMes: 0,
        comprasSinMes: 0,
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [ventas, comprasCon, comprasSin] = await Promise.all([
                    ventaService.totalMesActual().catch((err) => {
                        console.warn(
                            "Endpoint total-mes-actual no disponible:",
                            err
                        );
                        return { data: 0 };
                    }),
                    compraService.totalMesActualConFactura().catch((err) => {
                        console.warn(
                            "Endpoint total-mes-actual-con-factura no disponible:",
                            err
                        );
                        return { data: 0 };
                    }),
                    compraService.totalMesActualSinFactura().catch((err) => {
                        console.warn(
                            "Endpoint total-mes-actual-sin-factura no disponible:",
                            err
                        );
                        return { data: 0 };
                    }),
                ]);
                setDatos({
                    ventasMes: ventas.data || 0,
                    comprasConMes: comprasCon.data || 0,
                    comprasSinMes: comprasSin.data || 0,
                });
            } catch (error) {
                console.error("Error al cargar dashboard:", error);
                setDatos({
                    ventasMes: 0,
                    comprasConMes: 0,
                    comprasSinMes: 0,
                });
            }
        };
        cargarDatos();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Dashboard - Resumen del Mes
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-lg font-medium text-gray-700">
                        Ventas Mes
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                        <NumericFormat
                            value={datos.ventasMes}
                            displayType="text"
                            thousandSeparator=","
                            prefix="$"
                            decimalScale={2}
                            fixedDecimalScale
                        />
                    </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-lg font-medium text-gray-700">
                        Compras (Con Factura)
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                        <NumericFormat
                            value={datos.comprasConMes}
                            displayType="text"
                            thousandSeparator=","
                            prefix="$"
                            decimalScale={2}
                            fixedDecimalScale
                        />
                    </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500">
                    <h3 className="text-lg font-medium text-gray-700">
                        Compras (Sin Factura)
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                        <NumericFormat
                            value={datos.comprasSinMes}
                            displayType="text"
                            thousandSeparator=","
                            prefix="$"
                            decimalScale={2}
                            fixedDecimalScale
                        />
                    </p>
                </div>
            </div>
            {/* Accesos rápidos */}
            <div className="bg-white p-5 rounded-lg shadow mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Accesos rápidos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Link
                        to="/proveedores"
                        className="text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
                    >
                        Gestionar Proveedores
                    </Link>
                    <Link
                        to="/productos"
                        className="text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
                    >
                        Gestionar Productos
                    </Link>
                    <Link
                        to="/pedidos"
                        className="text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
                    >
                        Gestionar Pedidos
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <Link
                        to="/compras"
                        className="text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Registrar/Ver Compras Diarias
                    </Link>
                    <Link
                        to="/ventas"
                        className="text-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Registrar/Ver Ventas Diarias
                    </Link>
                </div>
            </div>
        </div>
    );
}

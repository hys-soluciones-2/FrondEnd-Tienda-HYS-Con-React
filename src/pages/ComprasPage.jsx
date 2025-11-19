import React, { useState, useEffect } from "react";
import { compraService } from "../../services/compraService";
import EdidtComprasForm from "./EdidtComprasForm";

export default function ComprasPage() {
    const [compras, setCompras] = useState([]);
    const [compraSeleccionada, setCompraSeleccionada] = useState(null);

    const cargarCompras = async () => {
        try {
            const res = await compraService.listarTodas();
            const comprasOrdenadas = (res.data || []).sort(
                (a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra)
            );
            setCompras(comprasOrdenadas);
        } catch (error) {
            console.error("Error al cargar compras:", error);
            setCompras([]);
        }
    };

    useEffect(() => {
        cargarCompras();
    }, []);

    return (
        <div className="container">
            <h2>📑 Compras</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Con Factura</th>
                        <th>Sin Factura</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((c) => (
                        <tr key={c.idCompra}>
                            <td>
                                {new Date(c.fechaCompra).toLocaleDateString(
                                    "es-CO"
                                )}
                            </td>
                            <td>${c.compraDelDiaConFactura}</td>
                            <td>${c.compraDelDiaSinFactura}</td>
                            <td>
                                <button
                                    className="btn btn-info"
                                    onClick={() => setCompraSeleccionada(c)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {compraSeleccionada && (
                <EdidtComprasForm
                    compra={compraSeleccionada}
                    onClose={() => setCompraSeleccionada(null)}
                    onSave={cargarCompras} // refresca y ordena
                />
            )}
        </div>
    );
}

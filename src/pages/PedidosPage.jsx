import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { NumericFormat } from "react-number-format";
import Navegacion from "../components/plantilla/Navegacion";

function PedidosPage() {
    const [pedidos, setPedidos] = useState([]);

    const urlBase = "http://localhost:8080/pedidos/pendientes";

    // Cargar pedidos desde el backend
    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar pedidos pendientes");
        console.log("Resultado cargar pedidos pendientes", resultado.data);

        // Ordenar por fechaPedido descendente (más reciente primero)
        const pedidosOrdenados = resultado.data.sort(
            (a, b) => new Date(b.fechaPedido) - new Date(a.fechaPedido)
        );

        setPedidos(pedidosOrdenados);
    };

    // Función para modificar estado y fechaRecepcion
    const modificarEstado = async (idPedido) => {
        try {
            const resp = await axios.patch(
                `http://localhost:8080/pedidos/${idPedido}/recibir`
            );
            console.log(resp);
            alert("Estado actualizado ✅");
            cargarPedidos(); // refrescar lista
        } catch (error) {
            console.error("Error modificando estado:", error);
            alert("Error al modificar el estado ❌");
        }
    };

    return (
        <div className="container">
            <Navegacion />
            <div className="container text-center" style={{ margin: "30px" }}>
                <h1>📦 Gestión de Pedidos</h1>

                {/* Lista de pedidos */}
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Proveedor</th>
                            <th>Fecha Pedido</th>
                            <th>Estado</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.idPedido}>
                                <td>{pedido.idPedido}</td>
                                <td>{pedido.proveedor.nombre}</td>
                                <td>{pedido.fechaPedido}</td>
                                <td>{pedido.estado}</td>
                                <td>
                                    <NumericFormat
                                        value={pedido.totalCosto}
                                        displayType={"text"}
                                        thousandSeparator=","
                                        prefix={"$"}
                                        decimalScale={2}
                                        fixedDecimalScale
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-info"
                                        onClick={() =>
                                            modificarEstado(pedido.idPedido)
                                        }
                                    >
                                        ModificarEstado
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
export default PedidosPage;

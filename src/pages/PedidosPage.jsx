import React from "react";
import { useState, useEffect } from "react";
//import { productoService } from "../services/productoService";
//import { proveedorService } from "../services/proveedorService";
//import { pedidoService } from "../services/pedidosService";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import Navegacion from "../components/plantilla/Navegacion";

function PedidosPage() {
    const [pedidos, setPedidos] = useState([]);
    // const [filtro, setFiltro] = useState("todos");
    const [nuevoPedido, setNuevoPedido] = useState({
        proveedorId: "",
        fechaPedido: "",
        productos: [],
    });
    const urlBase = "http://localhost:8080/pedidos/pendientes";

    // Cargar pedidos desde el backend
    useEffect(() => {
        // fetch("http://localhost:8080/pedidos/recibido")
        //     .then((res) => res.json())
        //     .then((data) => setPedidos(data))
        //     .catch((err) => console.error("Error cargando pedidos:", err));
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar pedidos pendientes");
        console.log(resultado.data);
        setPedidos(resultado.data);
    };

    // Crear pedido
    const crearPedido = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPedido),
        })
            .then((res) => res.json())
            .then((pedidoCreado) => {
                setPedidos([...pedidos, pedidoCreado]);
                setNuevoPedido({
                    proveedorId: "",
                    fechaPedido: "",
                    productos: [],
                });
            })
            .catch((err) => console.error("Error creando pedido:", err));
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
                            <th>Fecha Recepción</th>
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
                                <td>{pedido.fechaRecepcion}</td>
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
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Formulario para crear pedido */}
                <h2>➕ Crear Pedido</h2>
                <form onSubmit={crearPedido}>
                    <div>
                        <label>Proveedor ID: </label>
                        <input
                            type="text"
                            value={nuevoPedido.proveedorId}
                            onChange={(e) =>
                                setNuevoPedido({
                                    ...nuevoPedido,
                                    proveedorId: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div>
                        <label>Fecha Pedido: </label>
                        <input
                            type="date"
                            value={nuevoPedido.fechaPedido}
                            onChange={(e) =>
                                setNuevoPedido({
                                    ...nuevoPedido,
                                    fechaPedido: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    {/* Aquí podrías agregar selección de productos */}
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );
}
export default PedidosPage;

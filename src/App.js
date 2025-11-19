import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/DashboardPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import ProductosPage from "./pages/ProductosPage";
import VentasDiariasPage from "./pages/VentasDiariasPage";
import ComprasDiariasPage from "./pages/ComprasDiariasPage";
import PedidosPage from "./pages/PedidosPage";
import AgregarPedido from "./pages/AgregarPedido";

function App() {
    return (
        <BrowserRouter>
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                            path="/proveedores"
                            element={<ProveedoresPage />}
                        />
                        <Route path="/productos" element={<ProductosPage />} />
                        <Route path="/ventas" element={<VentasDiariasPage />} />
                        <Route
                            path="/compras"
                            element={<ComprasDiariasPage />}
                        />
                        <Route path="/pedidos" element={<PedidosPage />} />
                        <Route
                            exact
                            path="/pedidoAgregar"
                            element={<AgregarPedido />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

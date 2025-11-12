// src/components/layout/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen">
            <div className="p-5 border-b border-gray-700">
                <h1 className="text-xl font-bold">Tienda HYS</h1>
            </div>
            <nav className="mt-5">
                <Link
                    to="/dashboard"
                    className="block px-6 py-3 hover:bg-gray-700 transition"
                >
                    📊 Dashboard
                </Link>
                <Link
                    to="/compras"
                    className="block px-6 py-3 hover:bg-gray-700 transition"
                >
                    📥 Compras Diarias
                </Link>
                <Link
                    to="/ventas"
                    className="block px-6 py-3 hover:bg-gray-700 transition"
                >
                    💰 Ventas Diarias
                </Link>
                <Link
                    to="/proveedores"
                    className="block px-6 py-3 hover:bg-gray-700 transition"
                >
                    🧩 Proveedores
                </Link>
                <Link
                    to="/productos"
                    className="block px-6 py-3 hover:bg-gray-700 transition"
                >
                    📦 Productos
                </Link>
                <Link
                    to="/pedidos"
                    className="block px-6 py-3 hover:bg-gray-700 transition"
                >
                    📝 Pedidos
                </Link>
            </nav>
        </div>
    );
}

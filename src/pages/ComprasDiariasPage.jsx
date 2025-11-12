// src/pages/ComprasDiariasPage.jsx
import { useState } from "react";
import CompraForm from "../components/compras/CompraForm";
import CompraList from "../components/compras/CompraList";
import DateRangeSelector from "../components/DateRangeSelector";

import EdidtComprasForm from "../components/editComprasForm/EdidtComprasForm";

export default function ComprasDiariasPage() {
    const [rango, setRango] = useState({ inicio: "", fin: "" });
    const [refresh, setRefresh] = useState(0);

    const [compraSeleccionada, setCompraSeleccionada] = useState(null);

    const handleRangeChange = (inicio, fin) => {
        setRango({ inicio, fin });
    };

    const handleSaved = () => {
        setRefresh((prev) => prev + 1); // fuerza recarga
    };

    const handleEdit = (compra) => {
       // alert(`Editar no implementado aún. Datos: ${JSON.stringify(compra)}`);
        // Aquí iría un modal de edición
        setCompraSeleccionada(compra);
    };

    const handleCompraActualizada = () => {
        setCompraSeleccionada(null); // Cierra el modal
        setRefresh((prev) => prev + 1); // Refresca la lista
    };
    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Gestión de Compras Diarias
            </h1>

            <CompraForm onSaved={handleSaved} />

            <DateRangeSelector onRangeChange={handleRangeChange} />

            <CompraList key={refresh} rango={rango} onEdit={handleEdit} />

            {/* Tu lista de compras */}
            {compraSeleccionada && (
                <EdidtComprasForm
                    compra={compraSeleccionada}
                    onClose={() => setCompraSeleccionada(null)}
                    onSave={handleCompraActualizada}
                />
            )}
        </div>
    );
}

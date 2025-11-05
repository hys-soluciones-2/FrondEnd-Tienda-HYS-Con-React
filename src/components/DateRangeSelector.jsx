// src/components/DateRangeSelector.jsx
import { useState } from "react";

export default function DateRangeSelector({ onRangeChange }) {
    const [inicio, setInicio] = useState("");
    const [fin, setFin] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inicio && fin) {
            onRangeChange(inicio, fin);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow mb-6"
        >
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Filtrar por rango de fechas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Fecha inicio
                    </label>
                    <input
                        type="date"
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Fecha fin
                    </label>
                    <input
                        type="date"
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex items-end">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Consultar
                    </button>
                </div>
            </div>
        </form>
    );
}

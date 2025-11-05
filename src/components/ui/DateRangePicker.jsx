import { useState } from "react";

export default function DateRangePicker({ onSearch }) {
    const [inicio, setInicio] = useState("");
    const [fin, setFin] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inicio && fin) onSearch(inicio, fin);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow mb-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
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
                    <label className="block text-sm font-medium text-gray-700">
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
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
}

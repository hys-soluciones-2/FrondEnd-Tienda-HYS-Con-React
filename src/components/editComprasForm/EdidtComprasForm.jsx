import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { compraService } from "../../services/compraService";

export default function EdidtComprasForm({ compra, onClose, onSave }) {
    const [fechaCompra, setFechaCompra] = useState(compra.fechaCompra);
    const [conFactura, setConFactura] = useState(compra.compraDelDiaConFactura);
    const [sinFactura, setSinFactura] = useState(compra.compraDelDiaSinFactura);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datosActualizados = {
                montoConFactura: conFactura,
                montoSinFactura: sinFactura,
            };

            await compraService.actualizar(fechaCompra, datosActualizados);
            onSave(); // Refresca la lista
            onClose(); // Cierra el modal
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("No se pudo actualizar la compra.");
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaCompra}
                            onChange={(e) => setFechaCompra(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Con Factura ($)</Form.Label>
                        <Form.Control
                            type="number"
                            value={conFactura}
                            onChange={(e) =>
                                setConFactura(Number(e.target.value))
                            }
                            step="0.01"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Sin Factura ($)</Form.Label>
                        <Form.Control
                            type="number"
                            value={sinFactura}
                            onChange={(e) =>
                                setSinFactura(Number(e.target.value))
                            }
                            step="0.01"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Guardar Cambios
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="ms-2"
                    >
                        Cancelar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

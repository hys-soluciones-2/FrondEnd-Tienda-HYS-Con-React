import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";

export default function Navegacion() {
    return (
        <>
            <div style={{ margin: "20px" }}>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="/pedidos">
                            Sistema de Pedidos
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/pedidos">Inicio</Nav.Link>
                            <Nav.Link href="/pedidoAgregar">
                                Agregar Pedido
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}

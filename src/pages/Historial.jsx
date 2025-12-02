import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MiNavbar from "../Components_General/MiNavbar";

function PaginaHistorialCitas() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
    setCitas(citasGuardadas);
  }, [navigate]);

  const eliminarCita = (index) => {
    if (window.confirm("¿Seguro que deseas eliminar esta cita?")) {
      const nuevasCitas = citas.filter((_, i) => i !== index);
      setCitas(nuevasCitas);
      localStorage.setItem("citas", JSON.stringify(nuevasCitas));
    }
  };

  return (
    <>
      <MiNavbar
        navItems={[
          { label: "Explorar Mascotas", path: "/explorar" },
          { label: "Buscar Veterinario", path: "/veterinarios" },
          { label: "Explorar Productos", path: "/tienda" },
          { label: "Perfil", path: "/perfil" },
        ]}
        isLoggedIn={true}
      />

      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="bg-light vh-100 p-3">
            <h5 className="mb-3">Mi Cuenta</h5>
            <Nav className="flex-column">
              <Nav.Link active>
                <i className="bi bi-calendar-week me-2"></i> Historial de Citas
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={9} lg={10} className="p-4">
            <h2 className="mb-4">Historial de Citas</h2>

            {citas.length === 0 ? (
              <p className="text-muted">No tienes citas registradas.</p>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {citas.map((cita, index) => (
                  <Col key={index}>
                    <Card className="shadow-sm h-100">
                      {cita.vetImagen && (
                        <Card.Img
                          variant="top"
                          src={cita.vetImagen}
                          alt={cita.vetNombre}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      )}
                      <Card.Body>
                        <Card.Title>{cita.vetNombre}</Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                          {cita.vetEspecialidad}
                        </Card.Subtitle>
                        <p className="mb-1">
                          <strong>Fecha:</strong> {cita.date}
                        </p>
                        <p className="mb-3">
                          <strong>Hora:</strong> {cita.time}
                        </p>
                        <Button
                          variant="danger"
                          onClick={() => eliminarCita(index)}
                        >
                          Cancelar Cita
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PaginaHistorialCitas;

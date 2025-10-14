import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import MiNavbar from '../Components_General/MiNavbar';
import ListaResenas from '../ComponentsExplorar/Lista';
import FormularioResena from '../ComponentsExplorar/Formulario';
import { predAnimalesData } from '../data/Explorar';

function PaginaResenas() {
  const [reseñas, setReseñas] = useState([]);
  const [vista, setVista] = useState('lista'); 

  useEffect(() => {
    const datosGuardados = localStorage.getItem('reseñas');
    if (datosGuardados) {
      setReseñas(JSON.parse(datosGuardados));
    } else {
      setReseñas(predAnimalesData);
      localStorage.setItem('reseñas', JSON.stringify(predAnimalesData));
    }
  }, []);


  const agregarReseña = (nuevaReseña) => {
    const nuevasReseñas = [nuevaReseña, ...reseñas];
    setReseñas(nuevasReseñas);
    localStorage.setItem('reseñas', JSON.stringify(nuevasReseñas));
    setVista('lista'); 
  };

  return (
    <>
      <MiNavbar navItems={[
    { label: "Explorar Mascotas", path: "/explorar" },
    { label: "Buscar Veterinario", path: "/veterinarios" },
    { label: "Explorar Productos", path: "/tienda" },
      ]} />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="bg-light vh-100 p-3">
            <h5 className="mb-3">Veterinarios</h5>
            <Nav className="flex-column">
              <Nav.Link onClick={() => setVista('lista')} active={vista === 'lista'}>
                <i className="bi bi-list-stars me-2"></i> Lista de Reseñas
              </Nav.Link>
              <Nav.Link onClick={() => setVista('formulario')} active={vista === 'formulario'}>
                <i className="bi bi-cloud-arrow-up me-2"></i> Subir Reseña
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={9} lg={10} className="p-4">
            {vista === 'lista' ? (
              <ListaResenas reseñas={reseñas} />
            ) : (
              <FormularioResena onAgregarReseña={agregarReseña} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PaginaResenas;
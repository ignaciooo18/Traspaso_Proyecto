import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MiNavbar from '../Components_General/MiNavbar';
import ListaResenas from '../ComponentsExplorar/Lista';
import FormularioResena from '../ComponentsExplorar/Formulario';


function PaginaResenas() {
  const navigate = useNavigate();
  const [reseñas, setReseñas] = useState([]);
  const [vista, setVista] = useState('lista'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reseñaEditando, setReseñaEditando] = useState(null);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchReseñas = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://34.198.178.4:8081//resenas');
        if (!response.ok) {
          throw new Error('No se pudo conectar a la API');
        }
        const data = await response.json();
        setReseñas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReseñas();
  }, []);

  const handleGuardarReseña = async (reseña) => {
    const isEditing = !!reseñaEditando;
    
    const url = isEditing
      ? `http://34.198.178.4:8081/resenas/${reseña.id}`
      : 'http://34.198.178.4:8081/api/resenas';
      
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reseña),
      });
      if (!response.ok) {
        throw new Error('Error al guardar la reseña');
      }
      const dataGuardada = await response.json();

      if (isEditing) {
        setReseñas((prev) =>
          prev.map(r => (r.id === dataGuardada.id ? dataGuardada : r))
        );
      } else {
        setReseñas((prev) => [dataGuardada, ...prev]);
      }
      
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setVista('lista');
      setReseñaEditando(null);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar esta reseña?');
    if (!confirmar) return;

    try {
      const response = await fetch(`http://34.198.178.4:8081/api/resenas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la reseña');
      }
      setReseñas((prev) => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  
  const handleEditarClick = (reseña) => {
    setReseñaEditando(reseña);
    setVista('formulario');
  };

  const handleNavClick = (nuevaVista) => {
    setVista(nuevaVista);
    if (nuevaVista === 'lista') {
      setReseñaEditando(null);
    }
  };

  const renderContenido = () => {
    if (loading) {
      return <p className="text-center w-100 fs-5 text-muted">Cargando reseñas...</p>;
    }
    if (error) {
      return <p className="text-center w-100 fs-5 text-danger">Error: {error}</p>;
    }
    
    if (vista === 'lista') {
      return (
        <ListaResenas
          reseñas={reseñas} 
          onEdit={handleEditarClick}  
          onDelete={handleEliminar} 
        />
      );
    }
    
    if (vista === 'formulario') {
      return (
        <FormularioResena 
          onGuardar={handleGuardarReseña} 
          reseñaInicial={reseñaEditando} 
          onVolver={() => handleNavClick('lista')}
        />
      );
    }
  };

  return (
    <>
      <MiNavbar navItems={[
        { label: "Explorar Mascotas", path: "/explorar" },
        { label: "Buscar Veterinario", path: "/veterinarios" },
        { label: "Explorar Productos", path: "/tienda" },
      ]} isLoggedIn={true} />
      <Container fluid>
        <Row>

          <Col md={3} lg={2} className="bg-light vh-100 p-3">
            <h5 className="mb-3">Veterinarios</h5>
            <Nav className="flex-column">
              <Nav.Link 
                onClick={() => handleNavClick('lista')} 
                active={vista === 'lista'}
                style={{cursor: 'pointer'}}
              >
                <i className="bi bi-list-stars me-2"></i> Lista de Reseñas
              </Nav.Link>
              <Nav.Link 
                onClick={() => handleNavClick('formulario')} 
                active={vista === 'formulario'}
                style={{cursor: 'pointer'}}
              >
                <i className="bi bi-cloud-arrow-up me-2"></i> Subir Reseña
              </Nav.Link>
            </Nav>
          </Col>
          
        
          <Col md={9} lg={10} className="p-4">
            {renderContenido()}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PaginaResenas;
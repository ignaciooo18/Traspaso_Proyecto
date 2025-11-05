import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import MiNavbar from '../Components_General/MiNavbar';
import ListaResenas from '../ComponentsExplorar/Lista'; // (Debe ser un componente "tonto")
import FormularioResena from '../ComponentsExplorar/Formulario'; // (Ya es un componente "tonto")
// 1. Ya no necesitas los datos estáticos
// import { predAnimalesData } from '../data/Explorar'; 

function PaginaResenas() {
  const [reseñas, setReseñas] = useState([]);
  const [vista, setVista] = useState('lista'); 
  
  // 2. Añadimos estados para Carga, Error y Edición
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reseñaEditando, setReseñaEditando] = useState(null);

  // 3. (LEER / GET) - Reemplazamos localStorage por fetch
  useEffect(() => {
    const fetchReseñas = async () => {
      try {
        setLoading(true); // Empezamos a cargar
        const response = await fetch('http://demo5106183.mockable.io/resenas');
        if (!response.ok) {
          throw new Error('No se pudo conectar a la API');
        }
        const data = await response.json();
        setReseñas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Terminamos de cargar
      }
    };
    fetchReseñas();
  }, []); // Se ejecuta solo una vez al cargar

  // 4. (CREAR / POST y ACTUALIZAR / PUT)
  // Esta función se pasa al FormularioResena
  const handleGuardarReseña = async (reseña) => {
    const isEditing = !!reseñaEditando; // Verificamos si estamos editando
    
    const url = isEditing
      ? `http://demo5106183.mockable.io/resenas/${reseña.id}` // URL para PUT (actualizar)
      : 'http://demo5106183.mockable.io/resenas';           // URL para POST (crear)
      
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
        // Actualizamos el estado local de React
        setReseñas((prev) =>
          prev.map(r => (r.id === dataGuardada.id ? dataGuardada : r))
        );
      } else {
        // Añadimos la nueva reseña (devuelta por la API) al estado local
        // La ponemos al inicio de la lista para que se vea primero
        setReseñas((prev) => [dataGuardada, ...prev]);
      }
      
    } catch (err) {
      setError(err.message); // Sería bueno mostrar este error al usuario
      console.error(err);
    } finally {
      // Ocultamos el formulario y limpiamos la edición
      setVista('lista');
      setReseñaEditando(null);
    }
  };

  // 5. (BORRAR / DELETE)
  // Esta función se pasa a ListaResenas
  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar esta reseña?');
    if (!confirmar) return;

    try {
      const response = await fetch(`http://demo5106183.mockable.io/resenas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la reseña');
      }
      // Si la API tuvo éxito, actualizamos el estado local
      setReseñas((prev) => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  
  // 6. (Handler para el botón de Editar)
  // Esta función se pasa a ListaResenas
  const handleEditarClick = (reseña) => {
    setReseñaEditando(reseña); // Guardamos la reseña a editar
    setVista('formulario');    // Mostramos el formulario
  };

  // 7. Handlers para la navegación
  const handleNavClick = (nuevaVista) => {
    setVista(nuevaVista);
    if (nuevaVista === 'lista') {
      setReseñaEditando(null); // Limpiamos si vuelve a la lista
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
      ]} />
      <Container fluid>
        <Row>
          {/* Sidebar */}
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
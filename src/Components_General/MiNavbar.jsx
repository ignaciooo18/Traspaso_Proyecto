import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MiNavbar({ navItems = [], isLoggedIn: isLoggedInProp }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar estado de sesión al cargar el componente
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isLoggedInProp !== undefined ? isLoggedInProp : loggedIn);
  }, [isLoggedInProp]);

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    // Redirigir al inicio (página externa)
    navigate('/');
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="white">
      <Container>

        <Navbar.Brand as={Link} to={isLoggedIn ? "/dashboard" : "/inicio"}>
          <img
            src="../img/PetSocietyLogoCopia.webp"
            alt="imagen de mi pet society"
            width="70"
            height="50"
            onError={(e) => { 
              e.target.src = 'https://placehold.co/70x50/E8F5E9/333?text=Logo'; 
              e.target.onerror = null; 
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item, index) => (
              
              <Nav.Link key={index} as={Link} to={item.path}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <div className="d-flex">
            
           
            {isLoggedIn ? (
        
              <Button
                variant="outline-secondary"
                className="rounded-pill px-4"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            ) : (
              
              <Button
                variant="outline-secondary"
                className="rounded-pill px-4"
                as={Link} 
                to="/login" 
              >
                Iniciar sesión
              </Button>
            )}

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MiNavbar;
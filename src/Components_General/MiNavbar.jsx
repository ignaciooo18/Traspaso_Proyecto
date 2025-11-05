// En tu archivo MiNavbar.jsx
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // 1. Importar useNavigate

function MiNavbar({ navItems = [] }) {
  const navigate = useNavigate(); // 2. Inicializar el hook

  // 3. Crear la función que maneja el cierre de sesión
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="white">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="../img/PetSocietyLogoCopia.webp"
            alt="imagen de mi pet society"
            width="70"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item, index) => (
              <Nav.Link key={index} href={item.path}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <div className="d-flex">
            {/* 5. Asignar la función handleLogout al onClick del botón */}
            <Button
              variant="outline-secondary"
              className="rounded-pill px-4"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MiNavbar;
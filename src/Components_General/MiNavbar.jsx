
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; 
function MiNavbar({ navItems = [] }) { 
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="white">
      <Container>
        
        <Navbar.Brand href="/"><img
          src='../public/img/PetSocietylogo - copia.webp'
          alt='imagen de mi pet society'
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
            <Button variant="outline-secondary" className="rounded-pill px-4">
            Cerrar sesión
           </Button>
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MiNavbar;
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MiNavbar from "../src/Components_General/MiNavbar";

const navItemsMock = [
  { path: "/", label: "Inicio" },
  { path: "/tienda", label: "Tienda" },
  { path: "/veterinarios", label: "Veterinarios" },
  { path: "/explorar", label: "Explorar" },
  { path: "/perfil", label: "Perfil" }
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Componente MiNavbar", () => {
  it("renderiza el componente correctamente", () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  it("muestra el logo de Pet Society", () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const logo = screen.getByAltText(/imagen de mi pet society/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src");
  });

  it("el logo tiene las dimensiones correctas", () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const logo = screen.getByAltText(/imagen de mi pet society/i);
    expect(logo).toHaveAttribute("width", "70");
    expect(logo).toHaveAttribute("height", "50");
  });

  it("muestra todos los elementos de navegación pasados por props", () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThanOrEqual(navItemsMock.length);
  });

  it('contiene el enlace "Inicio"', () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const inicioLink = screen.getByRole("link", { name: /inicio/i });
    expect(inicioLink).toBeInTheDocument();
    expect(inicioLink).toHaveAttribute("href", "/");
  });

  it('contiene el enlace "Tienda"', () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const tiendaLink = screen.getByRole("link", { name: /tienda/i });
    expect(tiendaLink).toBeInTheDocument();
    expect(tiendaLink).toHaveAttribute("href", "/tienda");
  });

  it('contiene el enlace "Veterinarios"', () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const veterinariosLink = screen.getByRole("link", { name: /veterinarios/i });
    expect(veterinariosLink).toBeInTheDocument();
    expect(veterinariosLink).toHaveAttribute("href", "/veterinarios");
  });

  it('contiene el enlace "Explorar"', () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const explorarLink = screen.getByRole("link", { name: /explorar/i });
    expect(explorarLink).toBeInTheDocument();
    expect(explorarLink).toHaveAttribute("href", "/explorar");
  });

  it('muestra el botón "Cerrar sesión"', () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const cerrarSesionBtn = screen.getByRole("button", { name: /cerrar sesión/i });
    expect(cerrarSesionBtn).toBeInTheDocument();
  });

  it('el botón "Cerrar sesión" tiene las clases correctas', () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const cerrarSesionBtn = screen.getByRole("button", { name: /cerrar sesión/i });
    expect(cerrarSesionBtn).toHaveClass("rounded-pill");
    expect(cerrarSesionBtn).toHaveClass("px-4");
  });

  it("maneja clicks en los enlaces correctamente", () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const inicioLink = screen.getByRole("link", { name: /inicio/i });
    
    fireEvent.click(inicioLink);
    
    expect(inicioLink).toBeInTheDocument();
  });

  it("renderiza correctamente sin navItems (array vacío)", () => {
    renderWithRouter(<MiNavbar navItems={[]} />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
    // Solo debería tener el logo como link
    const logo = screen.getByAltText(/imagen de mi pet society/i);
    expect(logo).toBeInTheDocument();
  });

  it("el logo enlaza a la página de inicio", () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const logoLink = screen.getByRole("link", { name: /imagen de mi pet society/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("tiene el toggle para menú móvil", () => {
    renderWithRouter(<MiNavbar navItems={navItemsMock} />);
    const toggle = screen.getByRole("button", { name: /toggle navigation/i });
    expect(toggle).toBeInTheDocument();
  });
});
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Hero from "../src/Components_General/Hero";

// para renderizar componentes que usan React Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Componente Hero", () => {
  it("renderiza el componente correctamente", () => {
    renderWithRouter(<Hero />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("muestra el título principal", () => {
    renderWithRouter(<Hero />);
    const titulo = screen.getByText(/tu comunidad de confianza para el cuidado de tu mascota/i);
    expect(titulo).toBeInTheDocument();
  });

  it("el título tiene la clase display-4", () => {
    renderWithRouter(<Hero />);
    const titulo = screen.getByText(/tu comunidad de confianza para el cuidado de tu mascota/i);
    expect(titulo).toHaveClass("display-4");
    expect(titulo).toHaveClass("fw-bold");
  });

  it("muestra el párrafo descriptivo", () => {
    renderWithRouter(<Hero />);
    const descripcion = screen.getByText(/conéctate con otros amantes de los animales/i);
    expect(descripcion).toBeInTheDocument();
  });

  it("el párrafo tiene la clase lead", () => {
    renderWithRouter(<Hero />);
    const descripcion = screen.getByText(/conéctate con otros amantes de los animales/i);
    expect(descripcion).toHaveClass("lead");
  });

  it('contiene el botón "Buscar un Veterinario"', () => {
    renderWithRouter(<Hero />);
    const boton = screen.getByRole("link", { name: /buscar un veterinario/i });
    expect(boton).toBeInTheDocument();
  });

  it('el botón tiene el href correcto a "veterinarios"', () => {
    renderWithRouter(<Hero />);
    const boton = screen.getByRole("link", { name: /buscar un veterinario/i });
    expect(boton).toHaveAttribute("href", "veterinarios");
  });

  it("el botón tiene las clases de Bootstrap correctas", () => {
    renderWithRouter(<Hero />);
    const boton = screen.getByRole("link", { name: /buscar un veterinario/i });
    expect(boton).toHaveClass("btn");
    expect(boton).toHaveClass("btn-primary");
    expect(boton).toHaveClass("btn-lg");
  });

  it("tiene la estructura correcta con container", () => {
    const { container } = renderWithRouter(<Hero />);
    const containerDiv = container.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });

  it("aplica la clase hero-section al header", () => {
    renderWithRouter(<Hero />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("hero-section");
  });

  it("aplica clases de centrado de texto", () => {
    renderWithRouter(<Hero />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("text-center");
  });

  it("aplica padding vertical py-5", () => {
    renderWithRouter(<Hero />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("py-5");
  });

  it("el contenido está dentro de un contenedor", () => {
    const { container } = renderWithRouter(<Hero />);
    const header = container.querySelector("header");
    const containerDiv = header.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });
});
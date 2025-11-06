
import React from 'react';
import { Link } from 'react-router-dom'; 
import MiNavbar from '../Components_General/MiNavbar';
import '../App.css'; 

function Externo() {
  return (
    
    <>
      <MiNavbar isLoggedIn={false} />

      <div className="main-container">
        <div id="sidebar">
          <h5 className="mb-3">Explorar</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              
              <Link className="nav-link active" to="/login" data-section="home">
                <i className="bi bi-house-door"></i>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <i className="bi bi-list-stars"></i>
                Reseñas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <i className="bi bi-search"></i>
                Buscar Veterinario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <i className="bi bi-box"></i>
                Productos
              </Link>
            </li>
          </ul>
        </div>

        <main id="content-wrapper" className="p-4">
          <section id="home" className="content-section active d-flex flex-column align-items-center text-center">
            <h1 className="section-title mb-4 poppins-font">
              Bienvenid@ a Pet Society
            </h1>
            
            {/* Los estilos en línea se convierten en objetos JS */}
            <p className="fs-5 mb-5" style={{ maxWidth: '700px' }}>
              Tu comunidad dedicada al bienestar de tus mascotas.
            </p>
            <p className="lead open-sans-font mb-4" style={{ maxWidth: '800px' }}>
              En Pet Society, te conectamos con los mejores recursos para cuidar de tus compañeros animales. Aquí, podrás encontrar reseñas de veterinarios de confianza, subir tu propia experiencia para ayudar a otros dueños, y explorar un catálogo de productos esenciales para la salud y felicidad de tu mascota.
            </p>

            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="card p-3 shadow-sm">
                  <i className="bi bi-search d-block text-center fs-2 mb-3"></i>
                  <h5 className="card-title poppins-font">Encuentra Expertos</h5>
                  <p className="card-text open-sans-font">Busca veterinarios por especialidad y lee opiniones reales.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 shadow-sm">
                  <i className="bi bi-pencil-square d-block text-center fs-2 mb-3"></i>
                  <h5 className="card-title poppins-font">Comparte tu Experiencia</h5>
                  <p className="card-text open-sans-font">Sube reseñas y califica a los profesionales para ayudar a la comunidad.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 shadow-sm">
                  <i className="bi bi-box-seam d-block text-center fs-2 mb-3"></i>
                  <h5 className="card-title poppins-font">Productos Esenciales</h5>
                  <p className="card-text open-sans-font">Descubre y explora productos recomendados para tu mascota.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Externo;
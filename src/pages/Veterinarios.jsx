
import React, { useState } from 'react';
import MiNavbar from '../Components_General/MiNavbar';
import VeterinarioLista from '../Components_vet/ListaVeterinarios';
import VeterinarioDetalle from '../Components_vet/vetDetalle';
import '../App.css'; 

function Veterinarios() {

    const [veterinarioSeleccionado, setVeterinarioSeleccionado] = useState(null);

    const navItems = [
        { label: "Explorar Mascotas", path: "/explorar" },
        { label: "Perfil", path: "/perfil" },
        { label: "Explorar Productos", path: "/tienda" }
    ];

    const handleSeleccionarVeterinario = (vet) => {
        setVeterinarioSeleccionado(vet);
    };


    const handleVolverALista = () => {
        setVeterinarioSeleccionado(null);
    };


    return (

        <>
            <MiNavbar navItems={navItems} />

            <div className="container mt-5">
                <header className="text-center mb-5">
                    <h1 className="poppins-font">Clínica Veterinaria Pet Society</h1>
                    <p className="lead open-sans-font">Encuentra al especialista perfecto para tu mascota</p>
                </header>
                
                <main>
                    {/* Renderizado Condicional: Muestra la lista o el detalle basado en el estado */}
                    {veterinarioSeleccionado ? (
                        <VeterinarioDetalle 
                            vet={veterinarioSeleccionado} 
                            onVolver={handleVolverALista} 
                        />
                    ) : (
                        <VeterinarioLista 
                            onVeterinarioSelect={handleSeleccionarVeterinario} 
                        />
                    )}
                </main>

                <footer className="text-center mt-5 text-muted">
                    <p>&copy; 2025 Pet Society. Todos los derechos reservados.</p>
                </footer>
            </div>
        </>
    );
}

export default Veterinarios;
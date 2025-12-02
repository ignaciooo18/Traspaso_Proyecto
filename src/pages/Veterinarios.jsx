
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MiNavbar from '../Components_General/MiNavbar';
import VeterinarioLista from '../Components_vet/ListaVeterinarios';
import VeterinarioDetalle from '../Components_vet/vetDetalle';
import '../App.css'; 

function Veterinarios() {
    const navigate = useNavigate();
    const [veterinarioSeleccionado, setVeterinarioSeleccionado] = useState(null);
    
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const navItems = [
        { label: "Explorar Mascotas", path: "/explorar" },
        { label: "Perfil", path: "/perfil" },
        { label: "Explorar Productos", path: "/tienda" },
        { label: "Historial de citas", path: "/Historial" }
    ];

    const handleSeleccionarVeterinario = (vet) => {
        setVeterinarioSeleccionado(vet);
    };


    const handleVolverALista = () => {
        setVeterinarioSeleccionado(null);
    };


    return (

        <>
            <MiNavbar navItems={navItems} isLoggedIn={true} />

            <div className="container mt-5">
                <header className="text-center mb-5">
                    <h1 className="poppins-font">Clínica Veterinaria Pet Society</h1>
                    <p className="lead open-sans-font">Encuentra al especialista perfecto para tu mascota</p>
                </header>
                
                <main>
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
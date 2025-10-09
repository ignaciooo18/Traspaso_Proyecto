
import React, { useState } from 'react';
import Navbar from '../Components_General/Navbar';
import VeterinarioLista from '../Components_vet/ListaVeterinarios';
import VeterinarioDetalle from '../Components_vet/vetDetalle';
import '../App.css'; 

function Veterinarios() {
    // --- ESTADO Y LÓGICA ---
    
    // Estado para saber qué veterinario está seleccionado. `null` muestra la lista.
    const [veterinarioSeleccionado, setVeterinarioSeleccionado] = useState(null);

    // Datos para pasar al componente Navbar
    const navItems = [
        { label: "Explorar Mascotas", path: "/explorar" },
        { label: "Perfil", path: "/perfil" },
        { label: "Explorar Productos", path: "/tienda" }
    ];

    // --- MANEJADORES DE EVENTOS ---

    // Función para manejar la selección de un veterinario desde la lista
    const handleSeleccionarVeterinario = (vet) => {
        setVeterinarioSeleccionado(vet);
    };

    // Función para volver a la lista desde la vista de detalle
    const handleVolverALista = () => {
        setVeterinarioSeleccionado(null);
    };

    // --- RENDERIZADO DEL COMPONENTE ---

    return (
        // Usamos un Fragment (<>) para agrupar el Navbar y el contenido principal
        <>
            <Navbar navItems={navItems} />

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
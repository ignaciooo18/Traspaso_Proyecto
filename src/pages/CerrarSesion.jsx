// src/pages/CerrarSesion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CerrarSesion() {
    const navigate = useNavigate();
    
    // Cambiamos el nombre de la función para que sea más claro
    const handleGoToLogin = () => {
        // ESTE ES EL CAMBIO CLAVE:
        // Apunta a la ruta de tu componente Login.
        navigate('/login');
    };
    
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>¡Sesión Cerrada!</h1>
            <p>Gracias por visitarnos.</p>
            
            {/* Asegúrate de que el onClick llame a la función 
              y el texto del botón sea correcto. 
            */}
            <button 
                onClick={handleGoToLogin}
            >
            Ir a Iniciar Sesión
            </button>
        </div>
    );
}

export default CerrarSesion;